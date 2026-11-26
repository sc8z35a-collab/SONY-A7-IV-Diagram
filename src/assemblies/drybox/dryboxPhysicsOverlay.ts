import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface DryboxPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface DryboxFlow {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D Dry Cabinet Microclimate, PEM Proton Pumping, Zr-MOF Regeneration,
 * Dual-Zone Laminar Dry Air Circulation, UV-C/TiO2 Sterilization, Low-E IR Rejection,
 * and ESD Earth Grounding Physics Overlay (DB01–DB44).
 */
export function createDryboxPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): DryboxPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();
  explodeGuides.userData.__isExplodeGuides = true;

  // 4 Longitudinal Z-axis corner explode guide rails
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 2.8,
    gapSize: 2.0,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const cornerLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [-27.0, 52.0],
    [27.0, 52.0],
    [-27.0, -52.0],
    [27.0, -52.0],
  ];
  for (const [cx, cy] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, cy, -32),
      new THREE.Vector3(cx, cy, 32),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 96);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const flows: DryboxFlow[] = [];
  const packetGeo = new THREE.SphereGeometry(0.82, 10, 8);

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
          dashSize: 2.2,
          gapSize: 1.4,
          transparent: true,
          opacity: 0.85,
          clippingPlanes,
        })
      : new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.85,
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

  const pt = (
    out: THREE.Vector3,
    map: Record<string, THREE.Vector3>,
    id: string,
    dx = 0,
    dy = 0,
    dz = 0
  ) => {
    const p = map[id] ?? _def;
    return out.set(p.x + dx, p.y + dy, p.z + dz);
  };

  // 1. Cyan Laminar Dry-Air Circulation (Plenum -> Upper Optical Zone 40% RH)
  registerFlow(0x06b6d4, 0.72, 4, false, (m) => {
    pt(_a, m, 'db-laminar-air-plenum', -8.0, 26.0, 2.0);
    pt(_b, m, 'db-camera-lens-showcase', -8.0, 24.0, 12.0);
    return _pair;
  });
  registerFlow(0x0ea5e9, 0.75, 4, false, (m) => {
    pt(_a, m, 'db-laminar-air-plenum', 8.0, 6.0, 2.0);
    pt(_b, m, 'db-camera-lens-showcase', 10.0, 5.0, 12.0);
    return _pair;
  });
  // Lower Zone 35% RH Dry-Air Circulation
  registerFlow(0x38bdf8, 0.68, 3, false, (m) => {
    pt(_a, m, 'db-laminar-air-plenum', 0, -24.0, 2.0);
    pt(_b, m, 'db-camera-lens-showcase', 0, -24.0, 14.0);
    return _pair;
  });

  // 2. PEM Solid Polymer Electrolyte Proton (H+) Moisture Pumping (Plenum -> PEM -> Heatsink)
  registerFlow(0x0284c7, 0.92, 4, false, (m) => {
    pt(_a, m, 'db-laminar-air-plenum', 0, 11.5, -2.0);
    pt(_b, m, 'db-pem-nafion-membrane', 0, 0, 0);
    return _pair;
  });
  registerFlow(0x22d3ee, 1.0, 4, true, (m) => {
    pt(_a, m, 'db-pem-nafion-membrane', 0, 0, -1.0);
    pt(_b, m, 'db-rear-skived-heatsink', 0, 13.5, -3.5);
    return _pair;
  });

  // 3. 2026 Zr-MOF + Zeolite 4A Desorption & PTC Thermal Vapor Exhaust
  registerFlow(0x10b981, 0.85, 3, false, (m) => {
    pt(_a, m, 'db-mof-zeolite-rotor-bed', 0, 0, 1.5);
    pt(_b, m, 'db-rear-skived-heatsink', 0, -1.5, -3.5);
    return _pair;
  });

  // 4. Peltier TEC Cold-Plate -> Capillary PTFE Wick -> 3D Al2O3 Ceramic Metasurface Evaporator
  registerFlow(0x3b82f6, 0.78, 3, true, (m) => {
    pt(_a, m, 'db-hydrophilic-wick-drain', 0, -5.0, 1.5);
    pt(_b, m, 'db-ceramic-metasurface-evap', 0, 0, -1.0);
    return _pair;
  });

  // 5. Violet Deep UV-C 265/280nm Fused Silica Cavity -> Solar-Blind SiC Monitor PD & TiO2 Vortex
  registerFlow(0x8b5cf6, 1.15, 3, false, (m) => {
    pt(_a, m, 'db-uvc-fused-silica-cavity', -7.5, 0, 1.0);
    pt(_b, m, 'db-uvc-sic-monitor-pd', 0, 0, 0.5);
    return _pair;
  });
  registerFlow(0x6366f1, 1.05, 3, true, (m) => {
    pt(_a, m, 'db-tio2-photocatalyst-mesh', -8.0, 0, 1.5);
    pt(_b, m, 'db-tio2-photocatalyst-mesh', 8.0, 0, 1.5);
    return _pair;
  });

  // 6. Amber Solar/Thermal IR Radiation Rejection off Low-E Tempered Glass
  registerFlow(0xf59e0b, 0.9, 3, true, (m) => {
    pt(_a, m, 'db-door-lowe-glass', -10.0, 14.0, 16.0);
    pt(_b, m, 'db-door-lowe-glass', -10.0, 14.0, 1.2);
    return _pair;
  });
  registerFlow(0xef4444, 0.9, 3, true, (m) => {
    pt(_a, m, 'db-door-lowe-glass', -10.0, 14.0, 1.2);
    pt(_b, m, 'db-door-lowe-glass', 8.0, 24.0, 18.0);
    return _pair;
  });

  // 7. Emerald ESD Static Dissipation Drain along 1MΩ Copper Grounding Busbar
  registerFlow(0x22c55e, 1.1, 4, true, (m) => {
    pt(_a, m, 'db-esd-copper-ground-bus', 0, 38.0, 0);
    pt(_b, m, 'db-esd-copper-ground-bus', 0, -44.5, -2.0);
    return _pair;
  });

  // 8. Digital Telemetry Bus (SHT45 / SGP41 -> Matter over Thread IoT PCB -> External RF Radome)
  registerFlow(0x14b8a6, 0.95, 3, true, (m) => {
    pt(_a, m, 'db-sht45-upper-sensor', 0, 2.0, 0);
    pt(_b, m, 'db-matter-thread-iot-soc', -10.0, 0, -3.0);
    return _pair;
  });
  registerFlow(0xf59e0b, 0.95, 3, true, (m) => {
    pt(_a, m, 'db-sgp41-voc-sensor', 0, 2.0, 0);
    pt(_b, m, 'db-matter-thread-iot-soc', 10.0, 0, -3.0);
    return _pair;
  });
  // 9. Faraday-Cage Bypass: Matter SoC Coax -> External 2.4GHz RF Radome Antenna Radiation
  registerFlow(0x38bdf8, 1.25, 3, true, (m) => {
    pt(_a, m, 'db-matter-thread-iot-soc', 8.0, 1.5, -4.0);
    pt(_b, m, 'db-external-rf-radome-ant', 0, 5.5, 0);
    return _pair;
  });

  // 10. Automated Proportional N2 Purge Solenoid -> Cabinet Chamber Positive-Pressure Flow
  registerFlow(0x0ea5e9, 0.88, 3, false, (m) => {
    pt(_a, m, 'db-n2-auto-solenoid-valve', 0, 0, -3.0);
    pt(_b, m, 'db-laminar-air-plenum', -14.0, -32.0, 2.0);
    return _pair;
  });

  // 11. Li-Ion Early H2/CO Thermal-Runaway Off-Gas Safety Interlock (Battery Dock -> Sensor -> Flame Arrestor)
  registerFlow(0xf43f5e, 1.12, 3, true, (m) => {
    pt(_a, m, 'db-battery-h2co-offgas-sensor', 0, 0, 0);
    pt(_b, m, 'db-battery-flame-arrestor', 0, 0, -1.5);
    return _pair;
  });

  // 12. Clean Power Bus: Locking IEC C14 Dual-Stage EMI Inlet -> GaN PSU -> Ideal-Diode ORing BMS
  registerFlow(0xeab308, 1.05, 3, false, (m) => {
    pt(_a, m, 'db-iec-c14-emi-inlet', 0, 0, 1.0);
    pt(_b, m, 'db-gan-power-supply', 0, 0, 0);
    return _pair;
  });
  registerFlow(0x10b981, 1.05, 3, true, (m) => {
    pt(_a, m, 'db-gan-power-supply', 0, 0, 1.0);
    pt(_b, m, 'db-ideal-diode-oring-bms', 0, 0, 0);
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
      const zMin = -32 - explodeFactor * 52;
      const zMax = 28 + explodeFactor * 48;
      for (let i = 0; i < cornerLines.length; i++) {
        const [cx, cy] = corners[i];
        updateLine2PtsInPlace(cornerLines[i], cx, cy, zMin, cx, cy, zMax, true);
      }
      radialGuides.update(explodeFactor, show, parts);
    },
    update: (elapsed: number, _explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => {
      if (!physicsActive || !overlayGroup.visible || parts.length === 0) return;
      for (const p of parts) {
        _posMap[p.id] = p.group.position;
      }
      for (const fl of flows) {
        const [a, b] = fl.getEndpoints(_posMap);
        updateLine2PtsInPlace(fl.line, a.x, a.y, a.z, b.x, b.y, b.z, fl.line.material instanceof THREE.LineDashedMaterial);
        const n = fl.packets.length;
        for (let i = 0; i < n; i++) {
          const t = (elapsed * fl.speed + i / n) % 1;
          fl.packets[i].position.lerpVectors(a, b, t);
        }
      }
    },
  };
}
