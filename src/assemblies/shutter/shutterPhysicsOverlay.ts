import * as THREE from 'three';
import { CadPart } from '../types';
import { ShutterDynamicRig } from './shutterParts';
import { createRadialTrajectoryGuides } from '../../engine/CadHelpers';

export interface ShutterPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (
    elapsed: number,
    physicsActive: boolean,
    integrated: boolean,
    parts: CadPart[],
    rig: ShutterDynamicRig
  ) => void;
}

interface IncidentBeam {
  x: number;
  y: number;
  line: THREE.Line;
  hitDot: THREE.Mesh;
  photon: THREE.Mesh;
  phase: number;
}

/**
 * Interactive 3D optical slit-exposure & IR photo-interrupter physics visualizer
 * synchronized in real time with the 4-bar parallelogram shutter blades.
 *
 * Visually teaches beginners:
 * 1. How incoming lens rays are blocked by 1st/2nd curtains except inside the narrow moving slit.
 * 2. How a glowing golden-white "light ribbon" sweeps down across the 36x24mm image plane.
 * 3. How the twin 940nm IR photo-interrupter beams detect exact curtain passage speed.
 */
export function createShutterPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): ShutterPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();

  // =========================================================================
  // 1. CAD EXPLODED-VIEW AXIS ALIGNMENT GUIDES (4 mounting-screw corners)
  // =========================================================================
  const guideCorners: Array<[number, number]> = [
    [-25.0, 22.5],
    [40.0, 22.5],
    [-25.0, -22.5],
    [40.0, -22.5],
  ];
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x9aa3b2,
    dashSize: 1.8,
    gapSize: 1.4,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const guideLines: THREE.Line[] = [];
  for (const [gx, gy] of guideCorners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(gx, gy, 20),
      new THREE.Vector3(gx, gy, 10),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    guideLines.push(line);
  }
  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 64);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  // =========================================================================
  // 2. INCIDENT OPTICAL BEAMS & DYNAMIC SLIT TRANSMISSION
  // =========================================================================
  const beams: IncidentBeam[] = [];
  const beamXs = [-12.5, 0, 12.5];
  const beamYs = [10.2, 6.8, 3.4, 0.0, -3.4, -6.8, -10.2];

  const dotGeo = new THREE.SphereGeometry(0.42, 10, 8);
  const photonGeo = new THREE.SphereGeometry(0.48, 12, 10);

  for (let xi = 0; xi < beamXs.length; xi++) {
    for (let yi = 0; yi < beamYs.length; yi++) {
      const bx = beamXs[xi];
      const by = beamYs[yi];

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.45,
        clippingPlanes,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(bx, by, 38),
        new THREE.Vector3(bx, by, 15),
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      overlayGroup.add(line);

      const hitDot = new THREE.Mesh(
        dotGeo,
        new THREE.MeshBasicMaterial({
          color: 0x94a3b8,
          transparent: true,
          opacity: 0.65,
          clippingPlanes,
        })
      );
      overlayGroup.add(hitDot);

      const photon = new THREE.Mesh(
        photonGeo,
        new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.95,
          clippingPlanes,
        })
      );
      overlayGroup.add(photon);

      beams.push({
        x: bx,
        y: by,
        line,
        hitDot,
        photon,
        phase: (xi * 0.29 + yi * 0.17) % 1,
      });
    }
  }

  // =========================================================================
  // 3. VOLUMETRIC SLIT LIGHT RIBBON & PROJECTED SCAN STRIPE ON IMAGE PLANE
  // =========================================================================
  const slitVolumeMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false,
    clippingPlanes,
  });
  const slitVolume = new THREE.Mesh(new THREE.BoxGeometry(36.0, 1.0, 1.0), slitVolumeMat);
  overlayGroup.add(slitVolume);

  // Crisp luminous orange-gold slit-projection stripe at the virtual / real sensor plane
  const slitStripeMat = new THREE.MeshBasicMaterial({
    color: 0xea580c,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false,
    clippingPlanes,
  });
  const slitStripe = new THREE.Mesh(new THREE.PlaneGeometry(36.0, 1.0), slitStripeMat);
  overlayGroup.add(slitStripe);

  // Crisp glowing slit volume edge wireframe so the narrow light sheet reads razor-sharp on #FFFFFF
  const slitWireMat = new THREE.LineBasicMaterial({
    color: 0xd97706,
    transparent: true,
    opacity: 0.85,
    clippingPlanes,
  });
  const slitWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(36.0, 1.0, 1.0)),
    slitWireMat
  );
  overlayGroup.add(slitWire);

  // Thin reference outline of the 36x24mm image plane when in standalone shutter mode
  const sensorPlaneOutline = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(36.0, 24.0)),
    new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.52,
      clippingPlanes,
    })
  );
  overlayGroup.add(sensorPlaneOutline);

  // =========================================================================
  // 4. TWIN 940 nm IR PHOTO-INTERRUPTER DIAGNOSTIC BEAMS
  // =========================================================================
  const irBeams: Array<{ line: THREE.Line; pulse: THREE.Mesh; y: number }> = [];
  for (const irY of [10.6, -10.6]) {
    const irGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(18.0, irY, 12.1),
      new THREE.Vector3(18.0, irY, 11.1),
    ]);
    const irMat = new THREE.LineBasicMaterial({
      color: 0xe11d48,
      transparent: true,
      opacity: 0.85,
      clippingPlanes,
    });
    const irLine = new THREE.Line(irGeo, irMat);
    overlayGroup.add(irLine);

    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.85, 1.35, 24),
      new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        clippingPlanes,
      })
    );
    pulse.position.set(18.0, irY, 12.4);
    overlayGroup.add(pulse);

    irBeams.push({ line: irLine, pulse, y: irY });
  }

  overlayGroup.visible = false;

  const setVisible = (visible: boolean) => {
    overlayGroup.visible = visible;
  };

  const updateGuides = (explodeFactor: number, visible: boolean, parts: CadPart[]) => {
    const opacity = THREE.MathUtils.clamp((explodeFactor - 0.04) * 0.55, 0, 0.42);
    explodeGuides.visible = visible && opacity > 0.01;
    guideMat.opacity = opacity;

    if (!explodeGuides.visible) return;
    const front = parts.find((p) => p.id === 'shutter-front-cover');
    const back =
      parts.find((p) => p.id === 'shutter-rear-mask-gasket') ??
      parts.find((p) => p.id === 'shutter-base-damper');
    const zFront = (front ? front.group.position.z : 17.6) + 2.5;
    const zBack = (back ? back.group.position.z : 9.85) - 2.5;

    guideLines.forEach((line, i) => {
      const [gx, gy] = guideCorners[i];
      const attr = line.geometry.attributes.position as THREE.BufferAttribute;
      attr.setXYZ(0, gx, gy, zFront);
      attr.setXYZ(1, gx, gy, zBack);
      attr.needsUpdate = true;
      line.computeLineDistances();
    });
    radialGuides.update(explodeFactor, visible, parts);
  };

  const update = (
    elapsed: number,
    physicsActive: boolean,
    integrated: boolean,
    parts: CadPart[],
    rig: ShutterDynamicRig
  ) => {
    if (!physicsActive) return;

    const frontPart = parts.find((p) => p.id === 'shutter-front-cover');
    const c1Part = parts.find((p) => p.id === 'shutter-curtain-1');
    const c2Part = parts.find((p) => p.id === 'shutter-curtain-2');
    const optPart = parts.find((p) => p.id === 'shutter-optical-sensor');
    const basePart = parts.find((p) => p.id === 'shutter-base-damper');

    const zFront = frontPart ? frontPart.group.position.z : 17.6;
    const zC1 = c1Part ? c1Part.group.position.z : 15.3;
    const zC2 = c2Part ? c2Part.group.position.z : 12.9;
    const zOpt = optPart ? optPart.group.position.z : 11.6;
    const zBase = basePart ? basePart.group.position.z : 10.8;

    const zRayStart = zFront + 18.0;
    const zImagePlane = integrated ? Math.min(zBase - 6.0, 2.0) : zBase - 9.5;

    const apHalfH = 12.4;
    const c1Edge = rig.slitState.curtain1EdgeY;
    const c2Edge = rig.slitState.curtain2EdgeY;

    const slitBottom = THREE.MathUtils.clamp(c1Edge, -apHalfH, apHalfH);
    const slitTop = THREE.MathUtils.clamp(c2Edge, -apHalfH, apHalfH);
    const slitH = Math.max(0, slitTop - slitBottom);

    sensorPlaneOutline.visible = !integrated;
    sensorPlaneOutline.position.set(0, 0, zImagePlane);

    // Update glowing slit light volume, wireframe, & scan stripe
    if (slitH > 0.25) {
      const slitCenterY = (slitBottom + slitTop) * 0.5;
      const spanZ = Math.max(1.0, zC1 - zImagePlane);
      slitVolume.visible = true;
      slitVolume.scale.set(1, slitH, spanZ);
      slitVolume.position.set(0, slitCenterY, zImagePlane + spanZ * 0.5);
      slitVolumeMat.opacity = 0.28 + Math.min(0.16, slitH * 0.02);

      slitWire.visible = true;
      slitWire.scale.set(1, slitH, spanZ);
      slitWire.position.set(0, slitCenterY, zImagePlane + spanZ * 0.5);

      slitStripe.visible = true;
      slitStripe.scale.set(1, slitH, 1);
      slitStripe.position.set(0, slitCenterY, zImagePlane + 0.08);
    } else {
      slitVolume.visible = false;
      slitWire.visible = false;
      slitStripe.visible = false;
    }

    // Update each incident optical ray: either blocked at curtain 1/2 or transmitted through the slit!
    for (const beam of beams) {
      const blockedByC1 = beam.y < c1Edge;
      const blockedByC2 = beam.y > c2Edge;
      const passesSlit = !blockedByC1 && !blockedByC2;

      const zEnd = passesSlit ? zImagePlane : blockedByC1 ? zC1 + 0.3 : zC2 + 0.3;

      const posAttr = beam.line.geometry.attributes.position as THREE.BufferAttribute;
      posAttr.setXYZ(0, beam.x * 1.12, beam.y * 1.12, zRayStart);
      posAttr.setXYZ(1, beam.x, beam.y, zEnd);
      posAttr.needsUpdate = true;

      const lMat = beam.line.material as THREE.LineBasicMaterial;
      const dMat = beam.hitDot.material as THREE.MeshBasicMaterial;
      if (passesSlit) {
        lMat.color.setHex(0xea8c00);
        lMat.opacity = 0.85;
        dMat.color.setHex(0xf59e0b);
        dMat.opacity = 0.95;
      } else {
        lMat.color.setHex(0x64748b);
        lMat.opacity = 0.24;
        dMat.color.setHex(0x475569);
        dMat.opacity = 0.48;
      }

      beam.hitDot.position.set(beam.x, beam.y, zEnd);

      // Animate glowing golden photons flying exclusively through the open slit!
      if (passesSlit) {
        beam.photon.visible = true;
        const u = (elapsed * 1.15 + beam.phase) % 1;
        beam.photon.position.set(
          THREE.MathUtils.lerp(beam.x * 1.12, beam.x, u),
          THREE.MathUtils.lerp(beam.y * 1.12, beam.y, u),
          THREE.MathUtils.lerp(zRayStart, zImagePlane, u)
        );
      } else {
        beam.photon.visible = false;
      }
    }

    // Update IR Photo-Interrupter sensor beams & detection pulses
    const optX = (optPart ? optPart.group.position.x : 0) + 18.0;
    irBeams.forEach((ir, idx) => {
      const triggered = idx === 0 ? rig.slitState.irTrigger1 : rig.slitState.irTrigger2;
      const attr = ir.line.geometry.attributes.position as THREE.BufferAttribute;
      attr.setXYZ(0, optX, ir.y, zOpt + 1.2);
      attr.setXYZ(1, optX, ir.y, zOpt - 1.2);
      attr.needsUpdate = true;

      ir.pulse.position.set(optX, ir.y, zOpt + 1.35);
      const pulseMat = ir.pulse.material as THREE.MeshBasicMaterial;
      if (triggered) {
        const sc = 1.0 + ((elapsed * 4.5) % 1) * 1.15;
        ir.pulse.scale.set(sc, sc, 1);
        pulseMat.opacity = 0.92;
      } else {
        ir.pulse.scale.set(1, 1, 1);
        pulseMat.opacity = 0.18;
      }
    });
  };

  return {
    overlayGroup,
    explodeGuides,
    setVisible,
    updateGuides,
    update,
  };
}
