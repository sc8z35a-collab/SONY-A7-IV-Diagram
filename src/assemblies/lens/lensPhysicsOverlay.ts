import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';
import {
  IRIS_Z,
  LensOpticalSim,
  OPTICAL_ELEMENTS,
  SENSOR_Z,
} from './lensOpticalSim';

export interface LensPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (
    elapsed: number,
    active: boolean,
    parts: CadPart[],
    integrated: boolean,
    sim: LensOpticalSim
  ) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

interface PhotonBead {
  mesh: THREE.Mesh;
  rayIndex: number;
  phase: number;
  speed: number;
}

const MAX_3D_RAYS = 15;
const RAY_SAMPLE_VERTS = 16; // entry -> 14 element centers (incl. iris) -> sensor

/**
 * Real-time 3D Optical & Electromagnetic Physics Overlay for the 62-Part 50mm F1.2 Prime Lens:
 * 1. Synchronized 3D Snell-calibrated multi-element refracting rays (supports standard F1.2 cone,
 *    RGB Chromatic Dispersion split, XA Aspheric caustic comparison, and Nano AR II ghost rays).
 * 2. Translucent 3D Aperture Light Cone & live Circle-of-Confusion ring on the 36x24mm sensor plane.
 * 3. Luminous animated photon wavepackets streaming smoothly from subject to focal plane.
 * 4. Quad XD Linear Motor electromagnetic Lorentz thrust vectors & flux rings synchronized with
 *    real differential Focus Group A & B velocities.
 * 5. Axial dashed CAD explode alignment guides spanning L01–L62.
 */
export function createLensPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): LensPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  // -------------------------------------------------------------------------
  // 1. Virtual 36x24 mm Full-Frame Sensor Plane & Live Focal / Bokeh Ring
  // -------------------------------------------------------------------------
  const focalPlaneGroup = new THREE.Group();
  let focalRingMesh: THREE.Mesh;
  {
    const framePts = [
      new THREE.Vector3(-18, -12, 0),
      new THREE.Vector3(18, -12, 0),
      new THREE.Vector3(18, 12, 0),
      new THREE.Vector3(-18, 12, 0),
      new THREE.Vector3(-18, -12, 0),
    ];
    const outline = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(framePts),
      new THREE.LineBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.74,
        clippingPlanes,
      })
    );
    const fill = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 24),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
        clippingPlanes,
      })
    );
    focalRingMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.6, 1.4, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        depthWrite: false,
        clippingPlanes,
      })
    );
    focalRingMesh.position.z = 0.2;
    focalPlaneGroup.add(fill, outline, focalRingMesh);
  }
  overlayGroup.add(focalPlaneGroup);

  // Translucent 3D Converging Aperture Light Cone (Rear XA at +Z -> Focal Spot on Sensor at -Z)
  const lightConeGeo = new THREE.CylinderGeometry(1.0, 0.04, 1.0, 28, 1, true);
  lightConeGeo.rotateX(Math.PI / 2);
  const lightConeMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.09,
    side: THREE.DoubleSide,
    depthWrite: false,
    clippingPlanes,
  });
  const lightConeMesh = new THREE.Mesh(lightConeGeo, lightConeMat);
  overlayGroup.add(lightConeMesh);

  // -------------------------------------------------------------------------
  // 2. Pool of 15 Dynamic 3D Optical Ray Lines + Animated Photon Packets
  // -------------------------------------------------------------------------
  const rayLines: THREE.Line[] = [];
  const rayPaths: THREE.Vector3[][] = [];
  const rayActiveFlags: boolean[] = Array(MAX_3D_RAYS).fill(false);

  for (let i = 0; i < MAX_3D_RAYS; i++) {
    const pts = Array.from({ length: RAY_SAMPLE_VERTS }, () => new THREE.Vector3());
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.82,
        clippingPlanes,
      })
    );
    overlayGroup.add(line);
    rayLines.push(line);
    rayPaths.push(pts);
  }

  const beads: PhotonBead[] = [];
  const beadGeo = new THREE.SphereGeometry(0.88, 10, 10);
  for (let r = 0; r < MAX_3D_RAYS; r++) {
    for (let k = 0; k < 2; k++) {
      const mesh = new THREE.Mesh(
        beadGeo,
        new THREE.MeshBasicMaterial({
          color: 0x0284c7,
          transparent: true,
          opacity: 0.92,
          clippingPlanes,
        })
      );
      overlayGroup.add(mesh);
      beads.push({
        mesh,
        rayIndex: r,
        phase: k * 0.5 + r * 0.09,
        speed: 0.44,
      });
    }
  }

  // -------------------------------------------------------------------------
  // 3. Quad XD Linear Motor Electromagnetic Thrust Vectors & Flux Rings
  // -------------------------------------------------------------------------
  const thrustPulses: THREE.Mesh[] = [];
  const fluxRings: THREE.Mesh[] = [];
  const motorAnglesDeg = [45, 135, 225, 315];
  const thrustGeo = new THREE.ConeGeometry(1.65, 5.4, 12);
  thrustGeo.rotateX(Math.PI / 2);
  const fluxRingGeo = new THREE.TorusGeometry(3.2, 0.34, 8, 20);

  for (let i = 0; i < 4; i++) {
    const col = i % 2 === 0 ? 0xf59e0b : 0x10b981;
    const pulse = new THREE.Mesh(
      thrustGeo,
      new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.88,
        clippingPlanes,
      })
    );
    const ring = new THREE.Mesh(
      fluxRingGeo,
      new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.45,
        clippingPlanes,
      })
    );
    overlayGroup.add(pulse, ring);
    thrustPulses.push(pulse);
    fluxRings.push(ring);
  }

  // -------------------------------------------------------------------------
  // 4. Axial + Radial Dashed CAD Explode Alignment Guides (L01–L70)
  // -------------------------------------------------------------------------
  const guideLines: THREE.Line[] = [];
  const guideOffsets: Array<[number, number]> = [
    [35, 0],
    [-35, 0],
    [0, 35],
    [0, -35],
  ];
  for (const [gx, gy] of guideOffsets) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(gx, gy, 34),
        new THREE.Vector3(gx, gy, 136),
      ]),
      new THREE.LineDashedMaterial({
        color: 0x64748b,
        dashSize: 3.2,
        gapSize: 2.2,
        transparent: true,
        opacity: 0.46,
        clippingPlanes,
      })
    );
    line.computeLineDistances();
    explodeGuides.add(line);
    guideLines.push(line);
  }
  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 136);
  explodeGuides.add(radialGuides.group);

  const tmpPos = new THREE.Vector3();

  // Helper: map a 2D Snell-traced ray point (z, y) cleanly into current exploded 3D Z coordinate!
  const mapExplodedZ = (
    zRest: number,
    zStopsRest: number[],
    zStopsLive: number[]
  ): number => {
    if (zRest >= zStopsRest[0]) {
      return zStopsLive[0] + (zRest - zStopsRest[0]);
    }
    const last = zStopsRest.length - 1;
    if (zRest <= zStopsRest[last]) {
      return zStopsLive[last] + (zRest - zStopsRest[last]);
    }
    for (let k = 0; k < last; k++) {
      if (zRest <= zStopsRest[k] && zRest >= zStopsRest[k + 1]) {
        const span = zStopsRest[k] - zStopsRest[k + 1];
        const frac = span > 1e-4 ? (zStopsRest[k] - zRest) / span : 0;
        return THREE.MathUtils.lerp(zStopsLive[k], zStopsLive[k + 1], frac);
      }
    }
    return zRest;
  };

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    update: (elapsed, active, parts, integrated, sim) => {
      if (!active || !overlayGroup.visible) return;

      const partById = new Map<string, CadPart>();
      for (const p of parts) partById.set(p.id, p);

      const pBayonet = partById.get('lens-rear-bayonet');
      const zBayonet = pBayonet ? pBayonet.group.position.z : 33.5;
      const zSensor = integrated ? 0.0 : zBayonet - 33.5;

      // Build live Z anchor stations along the 14 elements + iris + sensor (handles exploded mode cleanly!)
      const zStopsRest: number[] = [];
      const zStopsLive: number[] = [];
      for (let i = 0; i < OPTICAL_ELEMENTS.length; i++) {
        if (i === 5) {
          zStopsRest.push(IRIS_Z);
          const pIris = partById.get('lens-aperture-11');
          zStopsLive.push(pIris ? pIris.group.position.z : IRIS_Z);
        }
        const el = OPTICAL_ELEMENTS[i];
        zStopsRest.push(el.z);
        const pEl = partById.get(el.partId);
        zStopsLive.push(pEl ? pEl.group.position.z : el.z);
      }
      zStopsRest.push(SENSOR_Z);
      zStopsLive.push(zSensor);

      focalPlaneGroup.visible = !integrated;
      focalPlaneGroup.position.set(0, 0, zSensor);

      // Run real Snell-traced ray bundle from LensOpticalSim!
      const traced2D = sim.traceActiveBundle(136);
      const iris = sim.getIrisMetrics();
      const strokes = sim.getFloatingStrokes();

      // Update translucent 3D aperture cone from Rear XA (E14) to Sensor Focal Point
      const pRear = partById.get('lens-rear-element');
      const zRearLive = pRear ? pRear.group.position.z : 41.6;
      const coneLen = Math.max(4, zRearLive - zSensor);
      const coneFrontR = Math.max(2.2, iris.irisRadiusMm * 0.72);
      const chiefRay = traced2D.find((r) => r.rayRole === 'chief') ?? traced2D[0];
      const sensorSpotY = chiefRay ? chiefRay.ySensor : 0;
      lightConeMesh.visible = true;
      lightConeMesh.position.set(0, sensorSpotY * 0.5, (zRearLive + zSensor) * 0.5);
      lightConeMesh.scale.set(coneFrontR, coneFrontR, coneLen);
      lightConeMat.color.setHex(
        sim.scenario === 'ed_chromatic'
          ? 0x10b981
          : sim.scenario === 'floating_xd'
            ? 0xf59e0b
            : 0x38bdf8
      );
      lightConeMat.opacity = 0.055 + (1 - iris.closure01) * 0.055;

      // Update focal spot / bokeh halo on sensor plane
      const spotScale =
        sim.scenario === 'xa_aspheric' && sim.xaStrength < 0.5
          ? 2.8
          : sim.scenario === 'ed_chromatic' && sim.edStrength < 0.5
            ? 2.2
            : 0.7 + (1 - iris.closure01) * 0.6;
      focalRingMesh.position.set(0, sensorSpotY, 0.25);
      focalRingMesh.scale.set(spotScale, spotScale, 1);

      // Populate 3D rays:
      // In standard aperture/floating mode, project 2D rays across 3D azimuthal planes (vertical + horizontal + diagonal)
      // so the 3D cutaway lens shows a true volumetric converging light cone!
      // In RGB chromatic / XA / Nano AR modes, project all meridional rays directly in the Y-Z cutaway plane so every
      // chromatic/aspheric split is crystal clear right through the cutaway!
      const isVolumetricMode =
        sim.scenario === 'aperture_bokeh' || sim.scenario === 'floating_xd';

      let rayIdx = 0;
      const writePathFrom2D = (
        pts2D: Array<{ z: number; y: number }>,
        rotCos: number,
        rotSin: number,
        hexColor: number,
        opacity: number
      ) => {
        if (rayIdx >= MAX_3D_RAYS) return;
        const pts3D = rayPaths[rayIdx];
        const line = rayLines[rayIdx];
        const mat = line.material as THREE.LineBasicMaterial;
        mat.color.setHex(hexColor);
        mat.opacity = opacity;
        line.visible = opacity > 0.04;
        rayActiveFlags[rayIdx] = line.visible;

        // Resample pts2D cleanly to RAY_SAMPLE_VERTS vertices in-place (zero GC per frame)
        const nSrc = pts2D.length;
        const posAttr = line.geometry.getAttribute('position') as THREE.BufferAttribute;
        for (let v = 0; v < RAY_SAMPLE_VERTS; v++) {
          const u = v / (RAY_SAMPLE_VERTS - 1);
          const fIdx = u * (nSrc - 1);
          const i0 = Math.min(nSrc - 2, Math.floor(fIdx));
          const frac = fIdx - i0;
          const zr = THREE.MathUtils.lerp(pts2D[i0].z, pts2D[i0 + 1].z, frac);
          const yr = THREE.MathUtils.lerp(pts2D[i0].y, pts2D[i0 + 1].y, frac);
          const zLive = mapExplodedZ(zr, zStopsRest, zStopsLive);
          const x3 = yr * rotSin;
          const y3 = yr * rotCos;
          pts3D[v].set(x3, y3, zLive);
          posAttr.setXYZ(v, x3, y3, zLive);
        }
        posAttr.needsUpdate = true;
        rayIdx++;
      };

      if (isVolumetricMode) {
        // Vertical Y-Z meridional rays (full bundle)
        for (const r of traced2D) {
          if (r.clippedAtIris) continue;
          writePathFrom2D(r.points, 1, 0, r.hexColor, r.opacity);
        }
        // Add horizontal X-Z & diagonal symmetric rays from outer/mid meridional rays for true 3D cone depth!
        const nonClipped = traced2D.filter((r) => !r.clippedAtIris && r.rayRole !== 'chief');
        if (nonClipped.length >= 2) {
          const outerTop = nonClipped[nonClipped.length - 1];
          const outerBot = nonClipped[0];
          writePathFrom2D(outerTop.points, 0, 1, 0x0ea5e9, 0.72);
          writePathFrom2D(outerBot.points, 0, 1, 0x0ea5e9, 0.72);
          writePathFrom2D(outerTop.points, 0.707, 0.707, 0x10b981, 0.56);
          writePathFrom2D(outerBot.points, 0.707, 0.707, 0x6366f1, 0.56);
        }
      } else {
        // High-precision meridional cutaway display (RGB chromatic split / XA caustic / Nano AR ghost rays)
        for (const r of traced2D) {
          if (r.clippedAtIris && r.rayRole !== 'stray') continue;
          writePathFrom2D(r.points, 1, 0, r.hexColor, r.opacity);
        }
      }

      // Hide unused pooled ray lines
      for (let k = rayIdx; k < MAX_3D_RAYS; k++) {
        rayLines[k].visible = false;
        rayActiveFlags[k] = false;
      }

      // Stream luminous photon wavepackets along every active 3D ray
      for (const b of beads) {
        const isActiveRay = rayActiveFlags[b.rayIndex];
        b.mesh.visible = isActiveRay;
        if (!isActiveRay) continue;
        const pts = rayPaths[b.rayIndex];
        const lineMat = rayLines[b.rayIndex].material as THREE.LineBasicMaterial;
        (b.mesh.material as THREE.MeshBasicMaterial).color.copy(lineMat.color);
        (b.mesh.material as THREE.MeshBasicMaterial).opacity = Math.min(0.95, lineMat.opacity + 0.12);
        const t = (elapsed * b.speed + b.phase) % 1;
        const segFloat = t * (pts.length - 1);
        const segIdx = Math.min(pts.length - 2, Math.floor(segFloat));
        const localT = segFloat - segIdx;
        tmpPos.lerpVectors(pts[segIdx], pts[segIdx + 1], localT);
        b.mesh.position.copy(tmpPos);
      }

      // Animate 4 electromagnetic Lorentz thrust indicators & flux rings along all 4 XD Linear rails
      const pXd = partById.get('lens-xd-motors');
      const zXd = pXd ? pXd.group.position.z : 65.0;
      const pulseWave = 0.5 + 0.5 * Math.sin(elapsed * 6.0);
      for (let i = 0; i < 4; i++) {
        const isGroupA = i % 2 === 0;
        const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
        const stroke = (isGroupA ? strokes.dzA : strokes.dzB) * 0.72;
        const vel = isGroupA ? sim.focusVelocityA : sim.focusVelocityB;
        const dirSign = Math.abs(vel) > 0.05 ? Math.sign(vel) : isGroupA ? -1 : 1;

        const zBaseRail = zXd + (isGroupA ? 5.5 : -6.5) + stroke;
        const pulse = thrustPulses[i];
        pulse.position.set(
          Math.cos(a) * 35.8,
          Math.sin(a) * 35.8,
          zBaseRail + dirSign * (4.6 + pulseWave * 1.4)
        );
        pulse.rotation.x = dirSign >= 0 ? 0 : Math.PI;
        const magScale = 0.85 + Math.min(0.55, Math.abs(vel) * 0.08);
        pulse.scale.set(magScale, magScale, magScale);

        const ring = fluxRings[i];
        ring.position.set(Math.cos(a) * 33.4, Math.sin(a) * 33.4, zBaseRail);
        const rScale = 0.88 + 0.22 * Math.sin(elapsed * 5.2 + i * 1.4);
        ring.scale.set(rScale, rScale, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity =
          sim.scenario === 'floating_xd' ? 0.65 : 0.34;
      }
    },
    updateGuides: (explodeFactor, visible, parts) => {
      const show = visible && explodeFactor > 0.04;
      explodeGuides.visible = show;
      if (!show) return;

      let zMin = Infinity;
      let zMax = -Infinity;
      for (const p of parts) {
        if (!p.group.visible) continue;
        if (p.group.position.z < zMin) zMin = p.group.position.z;
        if (p.group.position.z > zMax) zMax = p.group.position.z;
      }
      if (!Number.isFinite(zMin) || !Number.isFinite(zMax)) {
        zMin = 32;
        zMax = 140;
      } else {
        zMin -= 6;
        zMax += 8;
      }

      for (let i = 0; i < guideLines.length; i++) {
        const [gx, gy] = guideOffsets[i];
        updateLine2PtsInPlace(guideLines[i], gx, gy, zMin, gx, gy, zMax, true);
      }
      radialGuides.update(explodeFactor, visible, parts);
    },
  };
}
