import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface MicPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface AudioFlow {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D acoustic sound-wave propagation, 3-capsule beamforming directivity rings,
 * and MEMS/ECM -> SH-1035 -> 24-bit Codec -> BIONZ XR2 AI Noise-Cut audio pipeline overlay (MC01–MC32).
 */
export function createMicPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): MicPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();

  // 4 Vertical Corner Explode Axis Guides + Radial Guides
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 2.0,
    gapSize: 1.5,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const cornerLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [-24.0, -15.0],
    [24.0, -15.0],
    [-24.0, 14.0],
    [24.0, 14.0],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -12, cz),
      new THREE.Vector3(cx, 16, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 90);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  // Animated descending acoustic sound-wave rings entering L MEMS, R ECM & Rear 3rd Capsule
  interface WaveRing {
    mesh: THREE.Mesh;
    mat: THREE.MeshBasicMaterial;
    targetPartId: string;
    phaseOffset: number;
    dx: number;
    dz: number;
  }
  const waveRings: WaveRing[] = [];
  const ringGeo = new THREE.TorusGeometry(3.2, 0.16, 8, 28);
  ringGeo.rotateX(Math.PI / 2);

  const waveSources: Array<[string, number, number, number]> = [
    ['mc-mems-si-diaphragm', 0x0ea5e9, 0, 0],
    ['mc-ecm-electret-diaphragm', 0xeab308, 0, 0],
    ['mc-rear-3rd-voicememo-capsule', 0x06b6d4, 0, 0],
  ];
  for (const [pid, color, dx, dz] of waveSources) {
    for (let k = 0; k < 3; k++) {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.72,
        clippingPlanes,
      });
      const mesh = new THREE.Mesh(ringGeo, mat);
      overlayGroup.add(mesh);
      waveRings.push({ mesh, mat, targetPartId: pid, phaseOffset: k / 3, dx, dz });
    }
  }

  // Real-time audio signal paths through SH-1035 -> RF Filter -> Codec -> HPF / Beamforming -> AI DSP
  const flows: AudioFlow[] = [];
  const packetGeo = new THREE.SphereGeometry(0.56, 10, 8);

  const registerFlow = (
    color: number,
    speed: number,
    packetCount: number,
    dashed: boolean,
    getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3]
  ) => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, 0),
    ]);
    const mat = dashed
      ? new THREE.LineDashedMaterial({
          color,
          dashSize: 1.4,
          gapSize: 0.9,
          transparent: true,
          opacity: 0.88,
          clippingPlanes,
        })
      : new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.86,
          clippingPlanes,
        });
    const line = new THREE.Line(geo, mat);
    overlayGroup.add(line);

    const pMat = new THREE.MeshBasicMaterial({ color, clippingPlanes });
    const packets: THREE.Mesh[] = [];
    for (let i = 0; i < packetCount; i++) {
      const m = new THREE.Mesh(packetGeo, pMat);
      overlayGroup.add(m);
      packets.push(m);
    }
    flows.push({ line, packets, speed, getEndpoints });
  };

  const _def = new THREE.Vector3();
  const _a = new THREE.Vector3();
  const _b = new THREE.Vector3();
  const _pair: [THREE.Vector3, THREE.Vector3] = [_a, _b];
  const _posMap: Record<string, THREE.Vector3> = {};

  const pt = (out: THREE.Vector3, map: Record<string, THREE.Vector3>, id: string, dx = 0, dy = 0, dz = 0) => {
    const p = map[id] ?? _def;
    return out.set(p.x + dx, p.y + dy, p.z + dz);
  };

  // 1. Left Silicon MEMS PDM Digital Output -> SH-1035 Flex
  registerFlow(0x0ea5e9, 1.25, 3, false, (m) => {
    pt(_a, m, 'mc-mems-readout-asic');
    pt(_b, m, 'mc-sh1035-diff-flex', -10.0, 0.2, 4.2);
    return _pair;
  });
  // 2. Right ECM JFET Analog Output -> SH-1035 Flex
  registerFlow(0xf59e0b, 1.15, 3, false, (m) => {
    pt(_a, m, 'mc-ecm-jfet-pcb');
    pt(_b, m, 'mc-sh1035-diff-flex', 10.0, 0.2, 4.2);
    return _pair;
  });
  // 3. Rear 3rd Beamforming / Voice-Memo Capsule -> SH-1035 Flex
  registerFlow(0x06b6d4, 1.1, 2, true, (m) => {
    pt(_a, m, 'mc-rear-3rd-voicememo-capsule');
    pt(_b, m, 'mc-sh1035-diff-flex', 0, 0.2, -9.0);
    return _pair;
  });
  // 4. SH-1035 -> RF Ferrite/ESD Filter -> 24-bit Codec & PGA
  registerFlow(0x10b981, 1.2, 2, false, (m) => {
    pt(_a, m, 'mc-sh1035-diff-flex', -4.0, -1.5, 4.2);
    pt(_b, m, 'mc-rf-ferrite-esd-filter', 0, 1.0, 0);
    return _pair;
  });
  registerFlow(0x0284c7, 1.3, 3, false, (m) => {
    pt(_a, m, 'mc-rf-ferrite-esd-filter', 6.0, 1.0, 0);
    pt(_b, m, 'mc-audio-codec-adc-pga', -5.0, 1.0, 0);
    return _pair;
  });
  // 5. Codec -> Wind-Cut HPF & 3-Capsule Phase Beamforming DSP
  registerFlow(0x3b82f6, 1.25, 2, true, (m) => {
    pt(_a, m, 'mc-audio-codec-adc-pga', -2.0, 1.0, -3.0);
    pt(_b, m, 'mc-windcut-hpf-circuit', 3.0, 1.0, 2.0);
    return _pair;
  });
  registerFlow(0x14b8a6, 1.3, 2, false, (m) => {
    pt(_a, m, 'mc-audio-codec-adc-pga', 0, 1.0, -3.0);
    pt(_b, m, 'mc-beamforming-phase-dsp', 0, 1.2, 2.0);
    return _pair;
  });
  // 6. HPF + Beamforming -> BIONZ XR2 In-Camera AI Audio Noise Cut & AGC
  registerFlow(0x8b5cf6, 1.4, 3, false, (m) => {
    pt(_a, m, 'mc-beamforming-phase-dsp', -2.0, 1.2, 0);
    pt(_b, m, 'mc-ai-noise-cut-agc', 4.0, 1.6, 0);
    return _pair;
  });
  registerFlow(0xa855f7, 1.35, 3, false, (m) => {
    pt(_a, m, 'mc-windcut-hpf-circuit', 2.0, 1.2, 0);
    pt(_b, m, 'mc-ai-noise-cut-agc', -4.0, 1.6, 0);
    return _pair;
  });
  // 7. 2026 sensiBel Optical MEMS VCSEL Laser Interferometer -> 32-Bit Float Dual-ADC
  registerFlow(0xf43f5e, 1.5, 3, false, (m) => {
    pt(_a, m, 'mc-optical-mems-vcsel-2026', 0, 1.2, 0);
    pt(_b, m, 'mc-32bit-float-dual-adc-2026', -1.2, 0.8, 0);
    return _pair;
  });
  // 8. 2026 32-Bit Float Dual-ADC -> Dual-Path PGA Stitcher -> TinyML 3-Stem Transformer
  registerFlow(0x10b981, 1.45, 3, true, (m) => {
    pt(_a, m, 'mc-32bit-float-dual-adc-2026', 1.5, 0.6, 0);
    pt(_b, m, 'mc-dual-stage-pga-stitch', -1.5, 0.6, 0);
    return _pair;
  });
  registerFlow(0xc026d3, 1.4, 3, false, (m) => {
    pt(_a, m, 'mc-32bit-float-dual-adc-2026', 0, 0.6, -1.2);
    pt(_b, m, 'mc-tinyml-transformer-sep-2026', 0, 0.8, 1.2);
    return _pair;
  });

  overlayGroup.visible = false;

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => {
      const show = visible && explodeFactor > 0.02;
      explodeGuides.visible = show;
      if (!show) return;
      guideMat.opacity = Math.min(0.42, explodeFactor * 0.55);
      const yTop = 14 + explodeFactor * 22;
      const yBot = -12 - explodeFactor * 24;
      for (let i = 0; i < corners.length; i++) {
        const [cx, cz] = corners[i];
        updateLine2PtsInPlace(cornerLines[i], cx, yBot, cz, cx, yTop, cz, true);
      }
      radialGuides.update(explodeFactor, visible, parts);
    },
    update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => {
      overlayGroup.visible = physicsActive;
      if (!physicsActive) return;

      for (const p of parts) {
        _posMap[p.id] = p.group.position;
      }

      // Update descending acoustic wave rings converging onto L MEMS, R ECM & 3rd capsule
      const travelSpan = 9.0 + explodeFactor * 8.0;
      for (const wr of waveRings) {
        const base = _posMap[wr.targetPartId] ?? _def;
        const phase = ((elapsed * 0.65 + wr.phaseOffset) % 1 + 1) % 1;
        wr.mesh.position.set(
          base.x + wr.dx,
          base.y + (1 - phase) * travelSpan + 1.2,
          base.z + wr.dz
        );
        const s = 1.65 - phase * 0.85;
        wr.mesh.scale.set(s, 1, s);
        wr.mat.opacity = Math.sin(phase * Math.PI) * 0.78;
      }

      // Update audio signal streams
      for (let fi = 0; fi < flows.length; fi++) {
        const flow = flows[fi];
        const [a, b] = flow.getEndpoints(_posMap);
        updateLine2PtsInPlace(
          flow.line,
          a.x,
          a.y,
          a.z,
          b.x,
          b.y,
          b.z,
          flow.line.material instanceof THREE.LineDashedMaterial
        );
        const count = flow.packets.length;
        for (let i = 0; i < count; i++) {
          const t = ((elapsed * flow.speed + i / count + fi * 0.14) % 1 + 1) % 1;
          flow.packets[i].position.lerpVectors(a, b, t);
          const pulse = 0.8 + 0.35 * Math.sin(elapsed * 8.0 + i * 2.0 + fi);
          flow.packets[i].scale.setScalar(pulse);
        }
      }
    },
  };
}
