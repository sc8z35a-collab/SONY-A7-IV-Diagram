import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Shared dimensions for the 2026 Flagship 160L Dual-Zone Hybrid Electronic Dry Cabinet
 * Scale: 1 CAD unit = 8 mm real-world (54 x 104 x 48 CAD units ≈ 432 x 832 x 384 mm)
 * Axes: +Z = Front Glass Door, -Z = Rear Hybrid Dehumidifier Engine,
 *       +Y = Top / Upper Optical Zone (40% RH), -Y = Bottom / Lower Cine+Battery Zone (35% RH),
 *       -X = Left (Hinges / ePTFE Vent), +X = Right (Biometric Lock / N2 Purge).
 */
export const DB_DIM = {
  W: 54.0,
  H: 104.0,
  D: 48.0,
  HW: 27.0,
  HH: 52.0,
  HD: 24.0,
  WALL: 1.3,
  // Front door opening & frame
  DOOR_Y_MIN: -49.5,
  DOOR_Y_MAX: 43.2,
  DOOR_CY: -3.15,
  DOOR_H: 92.7,
  DOOR_W: 49.2,
  // Dual-zone divider elevation
  DIVIDER_Y: -12.0,
  // 3 sliding tray elevations
  SHELF_TOP_Y: 21.5,
  SHELF_MID_Y: 2.5,
  SHELF_LOW_Y: -28.0,
  // Fireproof battery drawer center Y
  BATT_DRAWER_Y: -42.5,
  // Rear dehumidifier bay center X/Y
  ENGINE_Z: -25.6,
};

export interface DryboxPalette {
  esdPowderShell: THREE.MeshPhysicalMaterial;
  aerogelPearl: THREE.MeshStandardMaterial;
  pcmVioletSheet: THREE.MeshPhysicalMaterial;
  einkPaper: THREE.MeshStandardMaterial;
  einkInkDark: THREE.MeshStandardMaterial;
  criLedGlow: THREE.MeshStandardMaterial;
  uvcVioletGlow: THREE.MeshStandardMaterial;
  blue450Glow: THREE.MeshStandardMaterial;
  mofEmerald: THREE.MeshPhysicalMaterial;
  pemNafionCyan: THREE.MeshPhysicalMaterial;
  nitiRoseWire: THREE.MeshPhysicalMaterial;
  ptcTerracotta: THREE.MeshStandardMaterial;
  loweGlassClear: THREE.MeshPhysicalMaterial;
  arItoFilm: THREE.MeshPhysicalMaterial;
  fireRedAccent: THREE.MeshPhysicalMaterial;
  seismicGelBlue: THREE.MeshPhysicalMaterial;
  xpeCharcoalFoam: THREE.MeshStandardMaterial;
  carbonPelletDark: THREE.MeshStandardMaterial;
  hepaWhitePleat: THREE.MeshStandardMaterial;
  whiteTeleLens: THREE.MeshPhysicalMaterial;
  pa66ThermalBreak: THREE.MeshStandardMaterial;
  glazingEpdmMatte: THREE.MeshStandardMaterial;
  brassPrecision: THREE.MeshPhysicalMaterial;
  sintered316L: THREE.MeshStandardMaterial;
  butylCldFoil: THREE.MeshPhysicalMaterial;
  ptfeCleanWhite: THREE.MeshStandardMaterial;
  kaptonAmberFilm: THREE.MeshPhysicalMaterial;
  aluminaCeramic: THREE.MeshStandardMaterial;
  copperIonTeal: THREE.MeshStandardMaterial;
  rubyThermalFuse: THREE.MeshPhysicalMaterial;
  pcbEmeraldDark: THREE.MeshStandardMaterial;
  ferritic430Steel: THREE.MeshPhysicalMaterial;
}

export function finalizeDryboxPart(
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
    subsystem: 'drybox',
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

/** Extrude a horizontal plate (normal along +Y) from a 2D XY shape. */
export function makeHorizBoxPlate(
  w: number,
  d: number,
  thickness: number,
  radius: number,
  mat: THREE.Material,
  bevel = 0.12
): THREE.Mesh {
  const shape = createRoundedRectShape(w, d, radius);
  const geo = extrudeCentered(shape, thickness, bevel, bevel, 12);
  geo.rotateX(Math.PI / 2);
  return new THREE.Mesh(geo, mat);
}

/** Build a precision recessed hex/Torx cabinet fastener bolt. */
export function makeCabinetBolt(
  radius: number,
  height: number,
  mat: THREE.Material
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.95, height, 6), mat);
  m.rotation.x = Math.PI / 2;
  m.userData.noEdges = true;
  return m;
}

export type DryboxPartBuilderCtx = {
  mats: MaterialLibrary;
  pal: DryboxPalette;
  cp: THREE.Plane[];
};
