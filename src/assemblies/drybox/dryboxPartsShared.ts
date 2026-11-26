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
  ceramicFritBlack: THREE.MeshPhysicalMaterial;
  paryleneVioletGlaze: THREE.MeshPhysicalMaterial;
  copperInterceptAmber: THREE.MeshPhysicalMaterial;
  flockedMatteBlack: THREE.MeshStandardMaterial;
  grayCard18Pct: THREE.MeshStandardMaterial;
  hardenedSteelHrc60: THREE.MeshPhysicalMaterial;
  pfasFreeHydroBlue: THREE.MeshPhysicalMaterial;
  linenBufferBeige: THREE.MeshStandardMaterial;
  spdTintViolet: THREE.MeshPhysicalMaterial;
  vipSilverFoil: THREE.MeshPhysicalMaterial;
  grapheneOxideIridescent: THREE.MeshPhysicalMaterial;
  farUvcQuartzBlue: THREE.MeshStandardMaterial;
  opvIndoorAmber: THREE.MeshPhysicalMaterial;
  fireMicrocapCrimson: THREE.MeshStandardMaterial;
}

export function createDryboxPalette(cp: THREE.Plane[]): DryboxPalette {
  return {
    esdPowderShell: new THREE.MeshPhysicalMaterial({
      color: 0x222936,
      metalness: 0.42,
      roughness: 0.48,
      clearcoat: 0.18,
      clearcoatRoughness: 0.52,
      clippingPlanes: cp,
    }),
    aerogelPearl: new THREE.MeshStandardMaterial({
      color: 0xe6eef6,
      metalness: 0.04,
      roughness: 0.84,
      clippingPlanes: cp,
    }),
    pcmVioletSheet: new THREE.MeshPhysicalMaterial({
      color: 0x8b6ec9,
      metalness: 0.08,
      roughness: 0.44,
      clearcoat: 0.25,
      clippingPlanes: cp,
    }),
    einkPaper: new THREE.MeshStandardMaterial({
      color: 0xe8edf2,
      metalness: 0.02,
      roughness: 0.68,
      emissive: 0xdbeafe,
      emissiveIntensity: 0.16,
      clippingPlanes: cp,
    }),
    einkInkDark: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.05,
      roughness: 0.45,
      clippingPlanes: cp,
    }),
    criLedGlow: new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xfef3c7,
      emissiveIntensity: 0.95,
      roughness: 0.25,
      metalness: 0.02,
      clippingPlanes: cp,
    }),
    uvcVioletGlow: new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x7c3aed,
      emissiveIntensity: 1.15,
      roughness: 0.22,
      metalness: 0.1,
      clippingPlanes: cp,
    }),
    blue450Glow: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.05,
      roughness: 0.24,
      metalness: 0.1,
      clippingPlanes: cp,
    }),
    mofEmerald: new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.16,
      roughness: 0.36,
      clearcoat: 0.4,
      clippingPlanes: cp,
    }),
    pemNafionCyan: new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      metalness: 0.08,
      roughness: 0.18,
      transparent: true,
      opacity: 0.72,
      clearcoat: 0.65,
      clippingPlanes: cp,
    }),
    nitiRoseWire: new THREE.MeshPhysicalMaterial({
      color: 0xf43f5e,
      metalness: 0.76,
      roughness: 0.28,
      clippingPlanes: cp,
    }),
    ptcTerracotta: new THREE.MeshStandardMaterial({
      color: 0xdc4a38,
      metalness: 0.12,
      roughness: 0.56,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.28,
      clippingPlanes: cp,
    }),
    loweGlassClear: new THREE.MeshPhysicalMaterial({
      color: 0xdbf4ff,
      metalness: 0.05,
      roughness: 0.06,
      transparent: true,
      opacity: 0.24,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      depthWrite: false,
      clippingPlanes: cp,
    }),
    arItoFilm: new THREE.MeshPhysicalMaterial({
      color: 0x7dd3fc,
      metalness: 0.12,
      roughness: 0.08,
      transparent: true,
      opacity: 0.14,
      iridescence: 0.9,
      depthWrite: false,
      clippingPlanes: cp,
    }),
    fireRedAccent: new THREE.MeshPhysicalMaterial({
      color: 0xb91c1c,
      metalness: 0.32,
      roughness: 0.38,
      clearcoat: 0.25,
      clippingPlanes: cp,
    }),
    seismicGelBlue: new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      metalness: 0.05,
      roughness: 0.24,
      transparent: true,
      opacity: 0.78,
      clearcoat: 0.55,
      clippingPlanes: cp,
    }),
    xpeCharcoalFoam: new THREE.MeshStandardMaterial({
      color: 0x1e242d,
      metalness: 0.04,
      roughness: 0.88,
      clippingPlanes: cp,
    }),
    carbonPelletDark: new THREE.MeshStandardMaterial({
      color: 0x181c22,
      metalness: 0.1,
      roughness: 0.92,
      clippingPlanes: cp,
    }),
    hepaWhitePleat: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.02,
      roughness: 0.86,
      clippingPlanes: cp,
    }),
    whiteTeleLens: new THREE.MeshPhysicalMaterial({
      color: 0xeef2f6,
      metalness: 0.14,
      roughness: 0.32,
      clearcoat: 0.45,
      clippingPlanes: cp,
    }),
    pa66ThermalBreak: new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.06,
      roughness: 0.72,
      clippingPlanes: cp,
    }),
    glazingEpdmMatte: new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.03,
      roughness: 0.85,
      clippingPlanes: cp,
    }),
    brassPrecision: new THREE.MeshPhysicalMaterial({
      color: 0xd4a137,
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.25,
      clippingPlanes: cp,
    }),
    sintered316L: new THREE.MeshStandardMaterial({
      color: 0x9ca3af,
      metalness: 0.72,
      roughness: 0.68,
      clippingPlanes: cp,
    }),
    butylCldFoil: new THREE.MeshPhysicalMaterial({
      color: 0xcbd5e1,
      metalness: 0.86,
      roughness: 0.32,
      clearcoat: 0.2,
      clippingPlanes: cp,
    }),
    ptfeCleanWhite: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.02,
      roughness: 0.36,
      clippingPlanes: cp,
    }),
    kaptonAmberFilm: new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      metalness: 0.14,
      roughness: 0.22,
      transparent: true,
      opacity: 0.84,
      clearcoat: 0.7,
      clippingPlanes: cp,
    }),
    aluminaCeramic: new THREE.MeshStandardMaterial({
      color: 0xf3f0e8,
      metalness: 0.04,
      roughness: 0.58,
      clippingPlanes: cp,
    }),
    copperIonTeal: new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      metalness: 0.14,
      roughness: 0.78,
      clippingPlanes: cp,
    }),
    rubyThermalFuse: new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      metalness: 0.18,
      roughness: 0.28,
      clearcoat: 0.55,
      clippingPlanes: cp,
    }),
    pcbEmeraldDark: new THREE.MeshStandardMaterial({
      color: 0x065f46,
      metalness: 0.12,
      roughness: 0.42,
      clippingPlanes: cp,
    }),
    ferritic430Steel: new THREE.MeshPhysicalMaterial({
      color: 0xa8b2be,
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.2,
      clippingPlanes: cp,
    }),
    ceramicFritBlack: new THREE.MeshPhysicalMaterial({
      color: 0x0b0f17,
      metalness: 0.14,
      roughness: 0.18,
      clearcoat: 0.82,
      clearcoatRoughness: 0.12,
      clippingPlanes: cp,
    }),
    paryleneVioletGlaze: new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      metalness: 0.08,
      roughness: 0.14,
      transparent: true,
      opacity: 0.34,
      clearcoat: 0.95,
      iridescence: 0.75,
      depthWrite: false,
      clippingPlanes: cp,
    }),
    copperInterceptAmber: new THREE.MeshPhysicalMaterial({
      color: 0xb45309,
      metalness: 0.52,
      roughness: 0.34,
      clearcoat: 0.35,
      clippingPlanes: cp,
    }),
    flockedMatteBlack: new THREE.MeshStandardMaterial({
      color: 0x090b0f,
      metalness: 0.01,
      roughness: 0.98,
      clippingPlanes: cp,
    }),
    grayCard18Pct: new THREE.MeshStandardMaterial({
      color: 0x777777,
      metalness: 0.0,
      roughness: 0.94,
      clippingPlanes: cp,
    }),
    hardenedSteelHrc60: new THREE.MeshPhysicalMaterial({
      color: 0x475569,
      metalness: 0.92,
      roughness: 0.24,
      clearcoat: 0.3,
      clippingPlanes: cp,
    }),
    pfasFreeHydroBlue: new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      metalness: 0.18,
      roughness: 0.12,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      clippingPlanes: cp,
    }),
    linenBufferBeige: new THREE.MeshStandardMaterial({
      color: 0xd6cfc2,
      metalness: 0.02,
      roughness: 0.9,
      clippingPlanes: cp,
    }),
    spdTintViolet: new THREE.MeshPhysicalMaterial({
      color: 0x312e81,
      metalness: 0.12,
      roughness: 0.08,
      transparent: true,
      opacity: 0.28,
      clearcoat: 1.0,
      iridescence: 0.6,
      depthWrite: false,
      clippingPlanes: cp,
    }),
    vipSilverFoil: new THREE.MeshPhysicalMaterial({
      color: 0xdbe4ee,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.45,
      clippingPlanes: cp,
    }),
    grapheneOxideIridescent: new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.68,
      roughness: 0.16,
      clearcoat: 0.9,
      iridescence: 1.0,
      clippingPlanes: cp,
    }),
    farUvcQuartzBlue: new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.25,
      roughness: 0.18,
      metalness: 0.08,
      clippingPlanes: cp,
    }),
    opvIndoorAmber: new THREE.MeshPhysicalMaterial({
      color: 0x3b0764,
      metalness: 0.35,
      roughness: 0.14,
      clearcoat: 0.92,
      iridescence: 0.85,
      clippingPlanes: cp,
    }),
    fireMicrocapCrimson: new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.08,
      roughness: 0.62,
      clippingPlanes: cp,
    }),
  };
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
