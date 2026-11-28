//@FLOW_MAP|file=src/assemblies/original/originalShared.ts|unit=original|lines=512|exports=E1_CHASSIS_W,E1_CHASSIS_D,E1_CHASSIS_Y0,E1_CHASSIS_Y1,E1_FEMUR_LEN,E1_TIBIA_LEN
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { HeroMaterialSpec } from '../../core/resource_cache';
import {
  attachCadEdges,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  extrudeHiRes,
  hiResCyl,
} from '../../engine/UltraDetailBuilders';
import {
  scaleCurveSegmentsForQuality,
  scaleRadialSegmentsForQuality,
} from '../../core/geometry_quality';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Shared CAD builder utilities & 1024px procedural HeroMaterialSpec textures
 * for the `Original` real-world manufacturable showcase (#01 RIIMOS E1).
 *
 * Strictly zero direct `new THREE.Mesh*Material` allocations — every surface
 * flows through `ResourceCache` 38 PBR buckets & managed `HeroMaterialSpec`
 * textures so all 4 quality tiers (LITE / STD / HIGH / ULTRA) scale cleanly.
 */

export const E1_CHASSIS_W = 216; // X: [-108, +108]
export const E1_CHASSIS_D = 130; // Z: [-65, +65]
export const E1_CHASSIS_Y0 = 84; // Bottom skid surface (standing clearance = 84 mm)
export const E1_CHASSIS_Y1 = 232; // Top deck surface (H = 148 mm)
export const E1_FEMUR_LEN = 68;
export const E1_TIBIA_LEN = 88;

export interface InstanceTransform {
  readonly pos: readonly [number, number, number];
  readonly rot?: readonly [number, number, number];
  readonly scale?: readonly [number, number, number];
}

export function finalizeOriginalPart(
  id: string,
  originalSubView: number,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);
  return {
    id,
    subsystem: 'original',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    originalSubView,
  };
}

export function makeOrigInstanced(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  transforms: readonly InstanceTransform[],
  noEdges = true
): THREE.InstancedMesh {
  const inst = new THREE.InstancedMesh(geo, mat, transforms.length);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < transforms.length; i++) {
    const t = transforms[i];
    dummy.position.set(t.pos[0], t.pos[1], t.pos[2]);
    if (t.rot) dummy.rotation.set(t.rot[0], t.rot[1], t.rot[2]);
    else dummy.rotation.set(0, 0, 0);
    if (t.scale) dummy.scale.set(t.scale[0], t.scale[1], t.scale[2]);
    else dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.instanceMatrix.needsUpdate = true;
  inst.matrixAutoUpdate = false;
  inst.updateMatrix();
  if (noEdges) inst.userData.noEdges = true;
  return inst;
}

export function makeBoxMesh(
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  uvTile = 24
): THREE.Mesh {
  const geo = new THREE.BoxGeometry(w, h, d);
  applyBoxUVs(geo, uvTile);
  return new THREE.Mesh(geo, mat);
}

export function makePlanarTopBox(
  w: number,
  h: number,
  d: number,
  mat: THREE.Material
): THREE.Mesh {
  const geo = new THREE.BoxGeometry(w, h, d);
  // Map top (+Y) face 1:1 to [0..1] UVs while giving sides clean box UVs
  applyBoxUVs(geo, 30);
  const pos = geo.attributes.position;
  const norm = geo.attributes.normal;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    if (norm.getY(i) > 0.7) {
      const u = (pos.getX(i) + w * 0.5) / w;
      const v = 1.0 - (pos.getZ(i) + d * 0.5) / d;
      uv.setXY(i, u, v);
    }
  }
  uv.needsUpdate = true;
  return new THREE.Mesh(geo, mat);
}

export function makeRoundedPlateY(
  w: number,
  h: number,
  d: number,
  radius: number,
  mat: THREE.Material,
  planarTop = false
): THREE.Mesh {
  const shape = createRoundedRectShape(w, d, Math.min(radius, Math.min(w, d) * 0.42));
  const segs = scaleCurveSegmentsForQuality(10);
  const geo = extrudeHiRes(shape, h, 0.25, 0.25, 1, segs);
  geo.rotateX(-Math.PI / 2);
  geo.center();
  if (planarTop) {
    applyPlanarUVs(geo, w, d, 'xz');
  } else {
    applyBoxUVs(geo, 28);
  }
  return new THREE.Mesh(geo, mat);
}

export function makeCylMesh(
  rTop: number,
  rBot: number,
  h: number,
  mat: THREE.Material,
  baseSegs = 20
): THREE.Mesh {
  const geo = hiResCyl(rTop, rBot, h, scaleRadialSegmentsForQuality(baseSegs));
  return new THREE.Mesh(geo, mat);
}

export function makeSphereMesh(r: number, mat: THREE.Material, baseSegs = 14): THREE.Mesh {
  const segs = scaleRadialSegmentsForQuality(baseSegs);
  const geo = new THREE.SphereGeometry(r, segs, Math.max(8, Math.round(segs * 0.75)));
  return new THREE.Mesh(geo, mat);
}

/**
 * Create a front/rear chassis faceplate extruded along Z with 4 square muzzle
 * cutouts (at ±78, Y=114 & 166) and 1 upper-center circular camera cutout (X=0, Y=167).
 * Center of returned mesh sits at local (0, 0, 0) representing Y=158.8 (span Y=86.6..231.0).
 */
export function makeMuzzleFaceplateMesh(
  w: number,
  h: number,
  thickness: number,
  mat: THREE.Material,
  centerY: number
): THREE.Mesh {
  const shape = createRoundedRectShape(w, h, 4.5);

  const addRectHole = (cx: number, cyWorld: number, hw: number, hh: number) => {
    const cy = cyWorld - centerY;
    const hole = new THREE.Path();
    hole.moveTo(cx - hw, cy - hh);
    hole.lineTo(cx + hw, cy - hh);
    hole.lineTo(cx + hw, cy + hh);
    hole.lineTo(cx - hw, cy + hh);
    hole.closePath();
    shape.holes.push(hole);
  };

  // 4 square gun port cutouts (32x30mm clear opening around ±78, Y=114 & Y=166)
  addRectHole(-78, 166, 16.5, 15.0);
  addRectHole(78, 166, 16.5, 15.0);
  addRectHole(-78, 114, 16.5, 15.0);
  addRectHole(78, 114, 16.5, 15.0);

  // Upper-center circular camera dome cutout (R=17.5mm at X=0, Y=167)
  const camHole = new THREE.Path();
  camHole.absarc(0, 167 - centerY, 17.5, 0, Math.PI * 2, true);
  shape.holes.push(camHole);

  const segs = scaleCurveSegmentsForQuality(14);
  const geo = extrudeHiRes(shape, thickness, 0.2, 0.2, 1, segs);
  geo.center();
  applyBoxUVs(geo, 32);
  return new THREE.Mesh(geo, mat);
}

/**
 * Create the iconic L-shaped 300-round BB magazine profile (matching image.png top sketch).
 * Extruded along Y, centered at its bounding box center in X/Z/Y.
 */
export function makeLShapeMagGeometry(height: number, inset = 0): THREE.BufferGeometry {
  // World-space L polygon in XZ plane (X in [-102, +8], Z in [-56, +56]):
  // Rear-left main leg: X in [-102, -8], Z in [-56, +56]
  // Front-center L-wing: X in [-8, +8], Z in [+29, +56] (clears red battery Z in [-56, +25] by 4mm!)
  const xMin = -102 + inset;
  const xMid = -8 - inset;
  const xMax = 8 - inset;
  const zMin = -56 + inset;
  const zStep = 29 + inset;
  const zMax = 56 - inset;

  const shape = new THREE.Shape();
  shape.moveTo(xMin, -zMin);
  shape.lineTo(xMid, -zMin);
  shape.lineTo(xMid, -zStep);
  shape.lineTo(xMax, -zStep);
  shape.lineTo(xMax, -zMax);
  shape.lineTo(xMin, -zMax);
  shape.closePath();

  const segs = scaleCurveSegmentsForQuality(8);
  const geo = extrudeHiRes(shape, height, 0.18, 0.18, 1, segs);
  geo.rotateX(-Math.PI / 2);
  // Shift Y so bottom is at -height/2 and top is at +height/2; keep XZ in exact world offsets
  geo.computeBoundingBox();
  if (geo.boundingBox) {
    const midY = (geo.boundingBox.min.y + geo.boundingBox.max.y) * 0.5;
    geo.translate(0, -midY, 0);
  }
  applyPlanarUVs(geo, 112, 112, 'xz');
  return geo;
}

/**
 * Build a compact MG996R metal-gear servo body (40.7 x 19.7 x 42.9 mm scaled cleanly to 38 x 19 x 34 mm envelope)
 * centered at local (0, 0, 0) with output spline hub protruding along +Y.
 */
export function buildMg996rServoSubGroup(
  mats: V2MaterialLibrary,
  withPotTap = true
): THREE.Group {
  const g = new THREE.Group();
  // Main black nylon-glass body
  const body = makeBoxMesh(34, 24, 18.5, mats.matteBlackAnodized, 18);
  g.add(body);
  // Side mounting flanges
  const flange = makeBoxMesh(44, 2.4, 18.5, mats.shutterChassis, 16);
  flange.position.set(0, 6.5, 0);
  g.add(flange);
  // Metal gearbox top cap (MG996R signature)
  const cap = makeBoxMesh(33.2, 4.2, 17.8, mats.stainlessMachined, 16);
  cap.position.set(0, 14.1, 0);
  g.add(cap);
  // Brass 25T output spline + aluminum round servo horn
  const spline = makeCylMesh(3.2, 3.2, 3.6, mats.brassGear, 14);
  spline.position.set(8.5, 17.6, 0);
  g.add(spline);
  const horn = makeCylMesh(8.2, 8.2, 2.2, mats.mountRedIndexDot, 16);
  horn.position.set(8.5, 20.1, 0);
  g.add(horn);
  // 90-yen internal potentiometer 4th feedback wire tap (orange lead)
  if (withPotTap) {
    const tap = makeBoxMesh(3.2, 2.4, 2.4, mats.sonyAlphaCinnabar, 10);
    tap.position.set(-18.2, -7.5, 0);
    g.add(tap);
  }
  return g;
}

/**
 * Procedural 1024px HeroMaterialSpec textures for RIIMOS E1 (zero direct material allocations).
 */
export const ORIGINAL_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  /** Top-right Red Anodized Aluminum Battery & Power Deck Cover (matching image.png red block) */
  origRedBatteryDeck: {
    bucket: 'pin_carrier_gloss',
    width: 1024,
    height: 1024,
    baseColor: 0xffffff,
    metalness: 0.42,
    roughness: 0.34,
    fallbackColor: 0xdc2626,
    painter: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#dc2626');
      g.addColorStop(0.5, '#b91c1c');
      g.addColorStop(1, '#991b1b');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Brushed red aluminum cooling fin grooves
      ctx.strokeStyle = 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 4;
      for (let y = 40; y < h - 40; y += 36) {
        ctx.beginPath();
        ctx.moveTo(32, y);
        ctx.lineTo(w - 32, y);
        ctx.stroke();
      }
      // Crisp engineering frame
      ctx.strokeStyle = 'rgba(255,255,255,0.72)';
      ctx.lineWidth = 6;
      ctx.strokeRect(24, 24, w - 48, h - 48);

      // Spec silkscreen
      ctx.fillStyle = '#fef2f2';
      ctx.font = 'bold 58px monospace';
      ctx.fillText('RIIMOS E1 · PWR', 64, 128);
      ctx.font = 'bold 40px monospace';
      ctx.fillStyle = '#fde68a';
      ctx.fillText('5S1P 21700 x5 · 92.5Wh', 64, 212);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px monospace';
      ctx.fillText('RECHARGEABLE · BMS 40A · USB-C PD', 64, 286);
      ctx.fillText('MAX 3.86h CONTINUOUS · 0.135J CAP', 64, 344);

      // 5-cell visual indicator bar
      for (let i = 0; i < 5; i++) {
        const bx = 68 + i * 176;
        ctx.fillStyle = 'rgba(15,23,42,0.45)';
        ctx.fillRect(bx, 430, 152, 420);
        ctx.strokeStyle = '#fecaca';
        ctx.lineWidth = 4;
        ctx.strokeRect(bx, 430, 152, 420);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(bx + 14, 466, 124, 340);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px monospace';
        ctx.fillText(`C${i + 1}`, bx + 48, 650);
      }

      ctx.fillStyle = '#fee2e2';
      ctx.font = 'bold 30px monospace';
      ctx.fillText('WARNING: HUMAN-SAFE INTERLOCK ACTIVE', 64, 940);
    },
  },

  /** Top-left Smoke-Black Translucent Polycarbonate L-Shaped 300-Round Magazine Hatch */
  origSmokeMagHatch: {
    bucket: 'glass_clear_housing',
    width: 1024,
    height: 1024,
    baseColor: 0xffffff,
    metalness: 0.15,
    roughness: 0.16,
    fallbackColor: 0x111827,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, w, h);

      // Subtle visible BB grid behind smoke tint
      ctx.fillStyle = 'rgba(226, 232, 240, 0.22)';
      for (let y = 80; y < h - 80; y += 54) {
        for (let x = 80; x < w - 80; x += 54) {
          ctx.beginPath();
          ctx.arc(x + ((y / 54) % 2) * 24, y, 18, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Perimeter calibration gauge & text
      ctx.strokeStyle = 'rgba(248, 250, 252, 0.55)';
      ctx.lineWidth = 6;
      ctx.strokeRect(22, 22, w - 44, h - 44);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 50px monospace';
      ctx.fillText('MAG-L · 300 RDS', 56, 114);
      ctx.fillStyle = '#fb923c';
      ctx.font = 'bold 34px monospace';
      ctx.fillText('ZERO-WASTE FOLLOWER SYSTEM', 56, 178);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 30px monospace';
      ctx.fillText('6mm 0.12g ULTRA-LOW-COST BB', 56, 232);
      ctx.fillText('N20 FWD/REV 8-BARREL AUTO FEED', 56, 280);
    },
  },

  /** Internal Protected Motorola moto g52j 5G Core Compute Plate */
  origG52jChassisScreen: {
    bucket: 'silicon_hero',
    width: 1024,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.55,
    roughness: 0.24,
    fallbackColor: 0x0f172a,
    painter: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#0b1120');
      g.addColorStop(0.5, '#1e293b');
      g.addColorStop(1, '#0f172a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.strokeRect(18, 18, w - 36, h - 36);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 46px monospace';
      ctx.fillText('MOTOROLA moto g52j 5G (0 JPY CORE)', 48, 96);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 32px monospace';
      ctx.fillText('Snapdragon 695 · Adreno 619 GPU EIS · 6GB RAM', 48, 162);
      ctx.fillStyle = '#4ade80';
      ctx.fillText('120Hz NNAPI TARGET VISION · 400Hz BUILT-IN IMU', 48, 224);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('5GHz Wi-Fi Direct FPV · REAR CAM SEALED INSIDE', 48, 286);
      ctx.fillStyle = '#f87171';
      ctx.fillText('HUMAN-SAFE INTERLOCK + L4 MJX POLICY <1.2ms', 48, 356);

      // Thermal pad grid markings
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      for (let x = 52; x < w - 52; x += 64) {
        ctx.strokeRect(x, 396, 48, 72);
      }
    },
  },

  /** Chassis Spec & Safety Compliance Nameplate */
  origRiimosSpecPlate: {
    bucket: 'matte_black_anodized',
    width: 1024,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.65,
    roughness: 0.28,
    fallbackColor: 0x18181b,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 8;
      ctx.strokeRect(16, 16, w - 32, h - 32);

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 54px monospace';
      ctx.fillText('ORIGINAL #01 · RIIMOS E1', 44, 96);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 34px monospace';
      ctx.fillText('BOM: 9,700 JPY (ex. Cells/BB/Phone) | MASS: 2.48 kg', 44, 166);
      ctx.fillText('POWER: <0.135J SAFE CLASS | 6mm 0.12g BB x 300', 44, 226);
      ctx.fillText('LOCOMOTION: XYZ + 360° DIAG CRAB (12x MG996R FB)', 44, 286);
      ctx.fillStyle = '#34d399';
      ctx.fillText('SAFETY: NON-HUMAN TARGETS ONLY · 4x FAIL-SAFE E-STOP', 44, 356);
      ctx.fillStyle = '#93c5fd';
      ctx.fillText('PRINCIPLES: REAL-WORK · ULTRA-CHEAP · NO-COMPROMISE', 44, 426);
    },
  },

  /** Lower Spinal PCB Silkscreen (ESP32-S3 + PCA9685 + CD74HC4067 12-Ch Pot FB) */
  origSpinalPcb: {
    bucket: 'pcb_textured',
    width: 1024,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.25,
    roughness: 0.42,
    fallbackColor: 0x064e3b,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, w, h);

      // Copper trace bus lines
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
      ctx.lineWidth = 4;
      for (let i = 0; i < 16; i++) {
        const y = 40 + i * 28;
        ctx.beginPath();
        ctx.moveTo(30, y);
        ctx.lineTo(w - 30, y);
        ctx.stroke();
      }
      // Gold via array
      ctx.fillStyle = '#eab308';
      for (let x = 60; x < w - 60; x += 64) {
        for (let y = 60; y < h - 60; y += 90) {
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = '#ecfdf5';
      ctx.font = 'bold 42px monospace';
      ctx.fillText('RIIMOS-E1 SPINE · ESP32-S3 + PCA9685 + CD74HC4067', 40, 96);
      ctx.font = 'bold 30px monospace';
      ctx.fillStyle = '#fde047';
      ctx.fillText('12-CH SERVO POT ANGLE FB (90 JPY) · HARDWARE MOSFET CUTOFF', 40, 464);
    },
  },
};
