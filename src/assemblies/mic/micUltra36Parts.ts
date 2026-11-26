import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { applyPlanarUVs, extrudeHiRes } from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { buildMicUltra36PartsA } from './micUltra36PartsA';
import { buildMicUltra36PartsB } from './micUltra36PartsB';

export function finalizeMicUltra36Part(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  targetExplodedPos: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.2
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 32, edgeOpacity);
  const explodeOffset = targetExplodedPos.clone().sub(assembledPos);

  return {
    id,
    subsystem: 'mic',
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

export function makeTexturedHorizRect36(
  w: number,
  d: number,
  h: number,
  r: number,
  mat: THREE.Material,
  bevel = 0.04
): THREE.Mesh {
  const geo = extrudeHiRes(createRoundedRectShape(w, d, r), h, bevel, bevel, 2, 18);
  geo.rotateX(-Math.PI / 2);
  applyPlanarUVs(geo, w, d, 'xz');
  return new THREE.Mesh(geo, mat);
}

/**
 * Phase 36 — Standalone Sony Microphone Ultra-Complete 150-Part Expansion (+40 brand-new real-world parts: MC111–MC150).
 *
 * Strictly enclosed inside the assembled Sony Mic Bay housing (|x| <= 17.0, y in [-9.0, +6.6],
 * z in [-10.8, +7.0], local radius <= 2.55 mm) so the assembled exterior stays 100% spotless,
 * while exploding cleanly (>= 17.8 mm clearance from all 149 other parts) into 4 outer museum constellations:
 *  - MC111–MC120 (Far-Left Outer Wing, X = -88): Sony ILCE-7M4 Service Manual OEM Audio/Jack/MI-Shoe/Speaker Hardware
 *  - MC121–MC130 (Far-Right Outer Wing, X = +88): MEMS Solder-Seal, PCB Slots, ASIC Glob-Top, NEG Getter, UBM, BIST, PDM Mux & ECM Internals
 *  - MC131–MC140 (Lower Gallery Terrace, Y = -64..-66): SY-1122 Mainboard Audio AFE, Anti-Microphonic C0G, Thin-Film 0.05%, Capless Rail, C7701 Can & Chokes
 *  - MC141–MC150 (Upper Crown Showcase, Y = +64): Sony ECM-M1, XLR-K3M / XLR-A4 (32-bit/96kHz), ECM-W3 LC3plus, HDMI ACR, USB-C UAC 2.0, XAVC DMA & Shutter Inpainter
 */
export function buildMicUltra36Parts(mats: MaterialLibrary): CadPart[] {
  return [...buildMicUltra36PartsA(mats), ...buildMicUltra36PartsB(mats)];
}
