import * as THREE from 'three';
import { CadPart } from '../assemblies/types';
import { buildLensParts } from '../assemblies/lens/lensParts';
import { createLensPhysicsOverlay } from '../assemblies/lens/lensPhysicsOverlay';
import { sharedLensOpticalSim } from '../assemblies/lens/lensOpticalSim';
import { buildMountParts } from '../assemblies/mount/mountParts';
import { createMountPhysicsOverlay } from '../assemblies/mount/mountPhysicsOverlay';
import { buildBodyParts } from '../assemblies/body/bodyParts';
import { createBodyPhysicsOverlay } from '../assemblies/body/bodyPhysicsOverlay';
import { buildEvfParts } from '../assemblies/evf/evfParts';
import { createEvfPhysicsOverlay } from '../assemblies/evf/evfPhysicsOverlay';
import { buildShutterParts } from '../assemblies/shutter/shutterParts';
import { createShutterPhysicsOverlay } from '../assemblies/shutter/shutterPhysicsOverlay';
import { buildMacroSensorParts } from '../assemblies/sensor/macroParts';
import { createPhysicsOverlay } from '../assemblies/sensor/physicsOverlay';
import { buildMainboardParts } from '../assemblies/mainboard/mainboardParts';
import { createMainboardPhysicsOverlay } from '../assemblies/mainboard/mainboardPhysicsOverlay';
import { buildLcdParts } from '../assemblies/lcd/lcdParts';
import { createLcdPhysicsOverlay } from '../assemblies/lcd/lcdPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { V2MaterialLibrary } from '../core/v2_material_catalog';
import { CompiledUnitRawBuild } from '../core/v2_unit_compiler';

/**
 * Lazy hero textures for the 5 key macro camera surfaces (body OLED, EVF OLED, LCD live view,
 * BIONZ XR ISP die, 33MP Exmor R CMOS die). All capped to tier max-res (256/512/1024)
 * and ref-counted by ResourceCache so exiting integrated/camera_body frees 100% of VRAM.
 */
export const CAMERA_MACRO_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  bodyTopSubOled: {
    bucket: 'emissive_glow',
    width: 256,
    height: 128,
    baseColor: 0xffffff,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.45,
    fallbackColor: 0x0f172a,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#090d14';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, w - 8, h - 8);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('1/4000  F1.2', 14, 46);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('ISO 100   RAW+J', 14, 86);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(14, 100, 128, 12);
    },
  },
  evfOledActive: {
    bucket: 'emissive_glow',
    width: 512,
    height: 384,
    baseColor: 0xffffff,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.42,
    fallbackColor: 0x0b1628,
    painter: (ctx, w, h) => {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#0f294a');
      sky.addColorStop(0.6, '#1e40af');
      sky.addColorStop(1, '#0c1322');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.72)';
      ctx.lineWidth = 3;
      ctx.strokeRect(w * 0.32, h * 0.28, w * 0.36, h * 0.38);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.strokeRect(w * 0.44, h * 0.36, w * 0.12, h * 0.16);
      ctx.fillStyle = '#090d14';
      ctx.fillRect(0, h - 54, w, 54);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('1/2000  F1.2  ISO100  AF-C  EYE', 24, h - 20);
    },
  },
  lcdLiveViewActive: {
    bucket: 'emissive_glow',
    width: 512,
    height: 340,
    baseColor: 0xffffff,
    emissive: 0x1e3a8a,
    emissiveIntensity: 0.35,
    fallbackColor: 0x10203a,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0f2847');
      grad.addColorStop(0.55, '#1d4ed8');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w / 3, 0); ctx.lineTo(w / 3, h);
      ctx.moveTo((w * 2) / 3, 0); ctx.lineTo((w * 2) / 3, h);
      ctx.moveTo(0, h / 3); ctx.lineTo(w, h / 3);
      ctx.moveTo(0, (h * 2) / 3); ctx.lineTo(w, (h * 2) / 3);
      ctx.stroke();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.strokeRect(w * 0.42, h * 0.32, w * 0.16, h * 0.24);
      ctx.fillStyle = 'rgba(9,13,20,0.88)';
      ctx.fillRect(0, h - 46, w, 46);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('1/1000   F1.2   ISO 100   4K60 10bit', 18, h - 16);
    },
  },
  ispSiliconDie: {
    bucket: 'silicon_hero',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.48,
    roughness: 0.18,
    fallbackColor: 0x1b365d,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0f1f3d');
      grad.addColorStop(0.5, '#1e3a6e');
      grad.addColorStop(1, '#112240');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      const blocks: Array<[number, number, number, number, string, string]> = [
        [24, 24, 210, 180, '#2563eb', 'SLVS-EC / RAW ISP'],
        [254, 24, 234, 180, '#7c3aed', 'AI NPU SYSTOLIC'],
        [24, 224, 210, 140, '#0891b2', '8K HEVC CODEC'],
        [254, 224, 234, 140, '#0d9488', 'SRAM L2/L3 CACHE'],
        [24, 384, 464, 104, '#1d4ed8', 'BIONZ XR / LPDDR5X PHY'],
      ];
      for (const [x, y, bw, bh, c, label] of blocks) {
        ctx.fillStyle = c;
        ctx.globalAlpha = 0.52;
        ctx.fillRect(x, y, bw, bh);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, bw, bh);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(label, x + 12, y + bh * 0.55);
      }
    },
  },
  siliconSensorDie: {
    bucket: 'silicon_photodiode',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.72,
    roughness: 0.14,
    fallbackColor: 0x1e4d6b,
    painter: (ctx, w, h) => {
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#0a263d');
      bg.addColorStop(0.35, '#164d6d');
      bg.addColorStop(0.7, '#1d3e6f');
      bg.addColorStop(1, '#0e2240');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      const step = Math.max(4, Math.floor(w / 64));
      for (let y = 24; y < h - 24; y += step) {
        for (let x = 24; x < w - 24; x += step) {
          const evenX = ((x / step) & 1) === 0;
          const evenY = ((y / step) & 1) === 0;
          ctx.fillStyle =
            evenX && evenY
              ? 'rgba(239, 68, 68, 0.14)'
              : !evenX && !evenY
                ? 'rgba(59, 130, 246, 0.16)'
                : 'rgba(34, 197, 94, 0.14)';
          ctx.fillRect(x, y, step - 1, step - 1);
        }
      }
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.72)';
      ctx.lineWidth = Math.max(2, w / 160);
      ctx.strokeRect(12, 12, w - 24, h - 24);
    },
  },
};

function disposeUnusedGroup(group: THREE.Object3D): void {
  const seenMats = new Set<THREE.Material>();
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        for (const m of mesh.material) seenMats.add(m);
      } else {
        seenMats.add(mesh.material);
      }
    }
  });
  for (const m of seenMats) m.dispose();
  group.clear();
}

/**
 * Shared composite macro camera builder for both `'integrated'` (8 subsystems / 305 parts)
 * and `'camera_body'` (7 subsystems / 231 parts without lens).
 */
export async function buildCameraMacroRaw(
  mats: V2MaterialLibrary,
  clippingPlanes: THREE.Plane[],
  includeLens: boolean,
  yieldChunk?: () => Promise<void>
): Promise<CompiledUnitRawBuild> {
  const lensBuilt = includeLens ? buildLensParts(mats, false) : null;
  if (yieldChunk) await yieldChunk();
  const mountBuilt = buildMountParts(mats, false);
  if (yieldChunk) await yieldChunk();
  const bodyBuilt = buildBodyParts(mats, false);
  if (yieldChunk) await yieldChunk();
  const evfBuilt = buildEvfParts(mats, false);
  if (yieldChunk) await yieldChunk();
  const shutterBuilt = buildShutterParts(mats, false);
  if (yieldChunk) await yieldChunk();
  const sensorPartsRaw = buildMacroSensorParts(mats, false);
  if (yieldChunk) await yieldChunk();
  const mainboardBuilt = buildMainboardParts(mats, false);
  if (yieldChunk) await yieldChunk();
  const lcdBuilt = buildLcdParts(mats, false);
  if (yieldChunk) await yieldChunk();

  // Match canonical part-rail ordering (mainboard reversed in integrated/camera_body)
  const mainboardOrdered = [...mainboardBuilt.parts].sort((a, b) => b.order - a.order);
  const allParts: CadPart[] = [
    ...(lensBuilt ? lensBuilt.parts : []),
    ...mountBuilt.parts,
    ...bodyBuilt.parts,
    ...evfBuilt.parts,
    ...shutterBuilt.parts,
    ...sensorPartsRaw,
    ...mainboardOrdered,
    ...lcdBuilt.parts,
  ];

  // Build physics overlays & explode guides for all included subsystems
  const lensOv = includeLens ? createLensPhysicsOverlay(clippingPlanes) : null;
  const mountOv = createMountPhysicsOverlay(clippingPlanes);
  const bodyOv = createBodyPhysicsOverlay(clippingPlanes);
  const evfOv = createEvfPhysicsOverlay(clippingPlanes);
  const shutterOv = createShutterPhysicsOverlay(clippingPlanes);
  const sensorOv = createPhysicsOverlay(clippingPlanes);
  disposeUnusedGroup(sensorOv.microOverlay);
  disposeUnusedGroup(sensorOv.microExplodeGuides);
  const mainboardOv = createMainboardPhysicsOverlay(clippingPlanes);
  const lcdOv = createLcdPhysicsOverlay(clippingPlanes);
  if (yieldChunk) await yieldChunk();

  const overlayRoot = new THREE.Group();
  overlayRoot.name = includeLens ? 'integrated-overlays' : 'camera-body-overlays';
  const guidesRoot = new THREE.Group();
  guidesRoot.name = includeLens ? 'integrated-guides' : 'camera-body-guides';

  if (lensOv) {
    overlayRoot.add(lensOv.overlayGroup);
    guidesRoot.add(lensOv.explodeGuides);
  }
  overlayRoot.add(
    mountOv.overlayGroup,
    bodyOv.overlayGroup,
    evfOv.overlayGroup,
    shutterOv.overlayGroup,
    sensorOv.macroOverlay,
    mainboardOv.overlayGroup,
    lcdOv.overlayGroup
  );
  guidesRoot.add(
    mountOv.explodeGuides,
    bodyOv.explodeGuides,
    evfOv.explodeGuides,
    shutterOv.explodeGuides,
    sensorOv.macroExplodeGuides,
    mainboardOv.explodeGuides,
    lcdOv.explodeGuides
  );

  // Collect all dynamic rig animated nodes across all active camera subsystems
  const animatedNodes = new Set<THREE.Object3D>([
    ...(lensBuilt
      ? [
          ...lensBuilt.rig.irisBlades,
          lensBuilt.rig.irisCamRing,
          lensBuilt.rig.irisPinionGear,
          lensBuilt.rig.irisSpurGear,
          ...lensBuilt.rig.focusGroupAParts.map((p) => p.group),
          ...lensBuilt.rig.focusGroupBParts.map((p) => p.group),
          ...lensBuilt.rig.moverCarriages,
          ...lensBuilt.rig.mrScaleCarriages,
          lensBuilt.rig.focusRingMesh,
          lensBuilt.rig.apertureRingMesh,
          lensBuilt.rig.mfEncoderWheel,
          lensBuilt.rig.apertureHallRotor,
        ]
      : []),
    mountBuilt.rig.lockPinPlunger,
    mountBuilt.rig.releaseButtonGroup,
    mountBuilt.rig.rockerLever,
    bodyBuilt.rig.shutterButtonCap,
    bodyBuilt.rig.frontDialMesh,
    bodyBuilt.rig.rearDialMesh,
    bodyBuilt.rig.afJoystickCap,
    evfBuilt.rig.edLensPart.group,
    evfBuilt.rig.diopterDialGroup,
    evfBuilt.rig.leadScrewGroup,
    evfBuilt.rig.oledScreenMesh,
    ...evfBuilt.rig.irLedMeshes,
    ...shutterBuilt.rig.curtain1Blades,
    ...shutterBuilt.rig.curtain2Blades,
    ...shutterBuilt.rig.shieldBlades,
    ...shutterBuilt.rig.chargeGears,
    shutterBuilt.rig.link1Main,
    shutterBuilt.rig.link1Sub,
    shutterBuilt.rig.link2Main,
    shutterBuilt.rig.link2Sub,
    shutterBuilt.rig.chargeCam,
    shutterBuilt.rig.counterweightLever,
    shutterBuilt.rig.armatureLever1,
    shutterBuilt.rig.armatureLever2,
    shutterBuilt.rig.dualBoostCoilGlow,
    shutterBuilt.rig.magnet1Glow,
    shutterBuilt.rig.magnet2Glow,
    mainboardBuilt.rig.npuSystolicGlow,
    mainboardBuilt.rig.ispActiveGlow,
    mainboardBuilt.rig.cfexActivityLed,
    ...lcdBuilt.rig.monitorParts.map((p) => p.group),
    ...lcdBuilt.rig.tiltCradleLinks,
  ]);

  for (const p of sensorPartsRaw) {
    if (p.ibisMovable || p.ultrasonicElement) {
      animatedNodes.add(p.group);
    }
  }

  // Zero-GC cached per-subsystem buckets populated lazily on first step/guide call
  let cachedPartsCount = -1;
  const subLens: CadPart[] = [];
  const subMount: CadPart[] = [];
  const subBody: CadPart[] = [];
  const subEvf: CadPart[] = [];
  const subShutter: CadPart[] = [];
  const subSensor: CadPart[] = [];
  const subMainboard: CadPart[] = [];
  const subLcd: CadPart[] = [];

  const ensurePartitioned = (activeParts: CadPart[]): void => {
    if (cachedPartsCount === activeParts.length) return;
    cachedPartsCount = activeParts.length;
    subLens.length = 0;
    subMount.length = 0;
    subBody.length = 0;
    subEvf.length = 0;
    subShutter.length = 0;
    subSensor.length = 0;
    subMainboard.length = 0;
    subLcd.length = 0;
    for (let i = 0; i < activeParts.length; i++) {
      const p = activeParts[i];
      switch (p.subsystem) {
        case 'lens':
          subLens.push(p);
          break;
        case 'mount':
          subMount.push(p);
          break;
        case 'body':
          subBody.push(p);
          break;
        case 'evf':
          subEvf.push(p);
          break;
        case 'shutter':
          subShutter.push(p);
          break;
        case 'sensor':
          subSensor.push(p);
          break;
        case 'mainboard':
          subMainboard.push(p);
          break;
        case 'lcd':
          subLcd.push(p);
          break;
      }
    }
  };

  return {
    parts: allParts,
    animatedNodes,
    overlayGroup: overlayRoot,
    explodeGuides: guidesRoot,
    setOverlayVisible: (visible: boolean) => {
      if (lensOv) lensOv.setVisible(visible);
      mountOv.setVisible(visible);
      bodyOv.setVisible(visible);
      evfOv.setVisible(visible);
      shutterOv.setVisible(visible);
      sensorOv.setMacroVisible(visible);
      mainboardOv.setVisible(visible);
      lcdOv.setVisible(visible);
      if (!visible) {
        for (let i = 0; i < sensorPartsRaw.length; i++) {
          if (sensorPartsRaw[i].ibisMovable) {
            sensorPartsRaw[i].group.rotation.z = 0;
          }
        }
      }
    },
    updateGuides: (explodeFactor: number, visible: boolean, activeParts: CadPart[]) => {
      ensurePartitioned(activeParts);
      if (lensOv) lensOv.updateGuides(explodeFactor, visible, subLens);
      mountOv.updateGuides(explodeFactor, visible, subMount);
      bodyOv.updateGuides(explodeFactor, visible, subBody);
      evfOv.updateGuides(explodeFactor, visible, subEvf);
      shutterOv.updateGuides(explodeFactor, visible, subShutter);
      sensorOv.updateMacroGuides(explodeFactor, visible, subSensor);
      mainboardOv.updateGuides(explodeFactor, visible, subMainboard);
      lcdOv.updateGuides(explodeFactor, visible, subLcd);
    },
    stepRigAndOverlay: (elapsed, delta, explodeFactor, physicsActive, integrated, activeParts) => {
      if (!physicsActive) return false;
      ensurePartitioned(activeParts);
      if (lensBuilt && lensOv) {
        sharedLensOpticalSim.step(elapsed, delta, physicsActive);
        lensBuilt.rig.applyDynamics(sharedLensOpticalSim, explodeFactor, integrated);
        lensOv.update(elapsed, physicsActive, subLens, integrated, sharedLensOpticalSim);
      }
      mountBuilt.rig.applyDynamics(elapsed, physicsActive);
      mountOv.update(elapsed, physicsActive, subMount, integrated);

      bodyBuilt.rig.applyDynamics(elapsed, physicsActive);
      bodyOv.update(elapsed, physicsActive, subBody, integrated);

      evfBuilt.rig.applyDynamics(elapsed, physicsActive, explodeFactor, integrated);
      evfOv.update(elapsed, physicsActive, subEvf);

      shutterBuilt.rig.applyKinematics(elapsed, physicsActive);
      shutterOv.update(elapsed, physicsActive, integrated, subShutter, shutterBuilt.rig);

      sensorOv.updateMacro(elapsed, explodeFactor, physicsActive, integrated, subSensor);

      mainboardBuilt.rig.applyDynamics(elapsed, physicsActive);
      mainboardOv.update(elapsed, physicsActive, subMainboard);

      lcdBuilt.rig.applyDynamics(elapsed, physicsActive, explodeFactor, integrated);
      lcdOv.update(elapsed, physicsActive, subLcd, integrated);
      return true;
    },
  };
}
