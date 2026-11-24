import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides } from '../../engine/CadHelpers';

export interface PhysicsOverlayController {
  macroOverlay: THREE.Group;
  microOverlay: THREE.Group;
  macroExplodeGuides: THREE.Group;
  microExplodeGuides: THREE.Group;
  setMacroVisible: (visible: boolean) => void;
  setMicroVisible: (visible: boolean) => void;
  updateMacro: (
    elapsed: number,
    explodeFactor: number,
    physicsActive: boolean,
    integrated: boolean,
    macroParts: CadPart[]
  ) => void;
  updateMicro: (
    elapsed: number,
    explodeFactor: number,
    physicsActive: boolean,
    microParts: CadPart[]
  ) => void;
  updateMacroGuides: (explodeFactor: number, visible: boolean, macroParts: CadPart[]) => void;
  updateMicroGuides: (explodeFactor: number, visible: boolean) => void;
}

interface RayPacket {
  mesh: THREE.Mesh;
  startZ: number;
  endZ: number;
  speed: number;
  phase: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  reflectAtZ?: number;
}

/**
 * Create 3D optical ray tracing beams, IR reflection rays, birefringent 16-point split beams,
 * IBIS Lorentz force arrows, ultrasonic ripple waves, micro-lens refraction rays,
 * photoelectron flow particles, and crisp CAD exploded-view axis guide lines.
 */
export function createPhysicsOverlay(clippingPlanes: THREE.Plane[]): PhysicsOverlayController {
  const macroOverlay = new THREE.Group();
  const microOverlay = new THREE.Group();
  const macroExplodeGuides = new THREE.Group();
  const microExplodeGuides = new THREE.Group();

  // =========================================================================
  // 1. CAD EXPLODED-VIEW AXIS ALIGNMENT GUIDES (Zero-text dashed laser lines)
  // =========================================================================
  const buildGuideLines = (
    coords: Array<[number, number]>,
    zFront: number,
    zBack: number
  ): { grp: THREE.Group; lines: THREE.Line[] } => {
    const grp = new THREE.Group();
    const lines: THREE.Line[] = [];
    const mat = new THREE.LineDashedMaterial({
      color: 0x9aa3b2,
      dashSize: 1.8,
      gapSize: 1.4,
      transparent: true,
      opacity: 0.0,
      clippingPlanes,
    });

    for (const [gx, gy] of coords) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(gx, gy, zFront),
        new THREE.Vector3(gx, gy, zBack),
      ]);
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      grp.add(line);
      lines.push(line);
    }
    return { grp, lines };
  };

  const macroAxial = buildGuideLines(
    [
      [-21.5, 16.5],
      [21.5, 16.5],
      [-21.5, -16.5],
      [21.5, -16.5],
    ],
    92,
    -170
  );
  macroExplodeGuides.add(macroAxial.grp);
  const macroRadialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 112);
  macroExplodeGuides.add(macroRadialGuides.group);

  const microAxial = buildGuideLines(
    [
      [-11.0, 11.0],
      [11.0, 11.0],
      [-11.0, -11.0],
      [11.0, -11.0],
    ],
    56,
    -64
  );
  microExplodeGuides.add(microAxial.grp);
  const microRadialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 96);
  microExplodeGuides.add(microRadialGuides.group);

  // =========================================================================
  // 2. MACRO OPTICAL RAY PATH & PHOTON PACKETS
  // =========================================================================
  const macroPackets: RayPacket[] = [];
  const macroRaysGroup = new THREE.Group();
  macroOverlay.add(macroRaysGroup);

  const rayDefs: Array<{
    x: number;
    y: number;
    color: number;
    isNIR?: boolean;
  }> = [
    { x: -11.0, y: 6.5, color: 0xe63946 }, // Red visible
    { x: -3.5, y: -4.5, color: 0x22a861 }, // Green visible
    { x: 5.5, y: 5.0, color: 0x2563eb }, // Blue visible
    { x: 11.5, y: -5.5, color: 0x22a861 }, // Green visible
    { x: -9.5, y: -5.0, color: 0x9b1d68, isNIR: true }, // Near-Infrared (blocked/reflected at IR-cut!)
    { x: 9.0, y: 6.0, color: 0x9b1d68, isNIR: true }, // Near-Infrared
  ];

  // Dynamic ray line geometry containers (updated smoothly with explodeFactor)
  const macroRayLines: Array<{
    def: (typeof rayDefs)[number];
    mainLine: THREE.Line;
    splitLines: THREE.Line[];
    reflectLine?: THREE.Line;
  }> = [];

  for (const def of rayDefs) {
    const lineMat = new THREE.LineBasicMaterial({
      color: def.color,
      transparent: true,
      opacity: def.isNIR ? 0.72 : 0.65,
      clippingPlanes,
    });
    const mainGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(def.x * 1.15, def.y * 1.15, 28),
      new THREE.Vector3(def.x, def.y, 0.8),
    ]);
    const mainLine = new THREE.Line(mainGeo, lineMat);
    macroRaysGroup.add(mainLine);

    const splitLines: THREE.Line[] = [];
    let reflectLine: THREE.Line | undefined;

    if (def.isNIR) {
      // Reflected NIR ray bouncing away from Dichroic IR-Cut Filter!
      const reflMat = new THREE.LineDashedMaterial({
        color: 0xb52b79,
        dashSize: 1.2,
        gapSize: 0.9,
        transparent: true,
        opacity: 0.72,
        clippingPlanes,
      });
      const reflGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(def.x, def.y, 3.6),
        new THREE.Vector3(def.x * 1.45, def.y * 1.45 + 4, 24),
      ]);
      reflectLine = new THREE.Line(reflGeo, reflMat);
      reflectLine.computeLineDistances();
      macroRaysGroup.add(reflectLine);
    } else {
      // Birefringent 4-way visual sub-rays emerging after OLPF toward CMOS die
      const splitOffsets: Array<[number, number]> = [
        [0.85, 0.45],
        [-0.85, -0.45],
        [0.45, -0.85],
        [-0.45, 0.85],
      ];
      const splitMat = new THREE.LineBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.48,
        clippingPlanes,
      });
      for (const [ox, oy] of splitOffsets) {
        const sGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(def.x, def.y, 4.6),
          new THREE.Vector3(def.x + ox, def.y + oy, 0.8),
        ]);
        const sl = new THREE.Line(sGeo, splitMat);
        macroRaysGroup.add(sl);
        splitLines.push(sl);
      }
    }

    macroRayLines.push({ def, mainLine, splitLines, reflectLine });

    // Moving photon sphere pulse along beam
    const pulseMat = new THREE.MeshBasicMaterial({
      color: def.color,
      clippingPlanes,
    });
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.46, 12, 10), pulseMat);
    macroRaysGroup.add(pulse);
    macroPackets.push({
      mesh: pulse,
      startZ: 28,
      endZ: def.isNIR ? 3.6 : 0.9,
      speed: def.isNIR ? 0.55 : 0.72,
      phase: Math.random(),
      x0: def.x * 1.16,
      y0: def.y * 1.16,
      x1: def.x,
      y1: def.y,
      reflectAtZ: def.isNIR ? 3.6 : undefined,
    });
  }

  // Ultrasonic standing-wave cyan rings on SSWF glass (animated when physicsActive)
  const sswfWaveRings: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.RingGeometry(4 + i * 5.2, 4.32 + i * 5.2, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      clippingPlanes,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.scale.set(1.38, 0.96, 1);
    macroOverlay.add(ring);
    sswfWaveRings.push(ring);
  }

  // IBIS Lorentz Force Vector Indicators (near the 3 voice coils)
  const ibisVectors = new THREE.Group();
  const buildArrow = (dir: THREE.Vector3, origin: THREE.Vector3, length: number, color: number) => {
    const arrow = new THREE.ArrowHelper(dir.normalize(), origin, length, color, 2.2, 1.3);
    return arrow;
  };
  const arrowY1 = buildArrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-16.5, -24, -4.3), 7.5, 0x0d5bd9);
  const arrowY2 = buildArrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(16.5, -24, -4.3), 7.5, 0x0d5bd9);
  const arrowX1 = buildArrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(30.8, 4.5, -4.3), 7.5, 0xd9480f);
  ibisVectors.add(arrowY1, arrowY2, arrowX1);
  macroOverlay.add(ibisVectors);

  // =========================================================================
  // 3. MICRO PIXEL REFRACTION RAYS & PHOTOELECTRON FLOW PARTICLES
  // =========================================================================
  const microCenters: Array<{ x: number; y: number; color: number; split: 'H' | 'V' }> = [
    { x: -5.5, y: 5.5, color: 0xe63946, split: 'V' },
    { x: 5.5, y: 5.5, color: 0x22a861, split: 'H' },
    { x: -5.5, y: -5.5, color: 0x22a861, split: 'V' },
    { x: 5.5, y: -5.5, color: 0x2563eb, split: 'H' },
  ];

  const microRaySpecs: Array<{
    center: (typeof microCenters)[number];
    subOffsets: Array<[number, number]>;
    lines: THREE.Line[];
    electronDots: THREE.Mesh[];
  }> = [];

  for (const mc of microCenters) {
    const subOffsets: Array<[number, number]> =
      mc.split === 'H'
        ? [
            [-2.2, 0],
            [2.2, 0],
          ]
        : [
            [0, 2.2],
            [0, -2.2],
          ];

    const lines: THREE.Line[] = [];
    const electronDots: THREE.Mesh[] = [];

    for (const [ox, oy] of subOffsets) {
      const mat = new THREE.LineBasicMaterial({
        color: mc.color,
        transparent: true,
        opacity: 0.78,
        clippingPlanes,
      });
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(mc.x + ox * 1.55, mc.y + oy * 1.55, 24),
        new THREE.Vector3(mc.x + ox * 1.35, mc.y + oy * 1.35, 13.5),
        new THREE.Vector3(mc.x + ox * 0.6, mc.y + oy * 0.6, 2.5),
      ]);
      const line = new THREE.Line(geo, mat);
      microOverlay.add(line);
      lines.push(line);

      // Glowing cyan photoelectron sphere travelling from Photodiode -> SVG -> Memory Node -> Cu-Cu -> ADC!
      const eDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.48, 12, 10),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4, clippingPlanes })
      );
      microOverlay.add(eDot);
      electronDots.push(eDot);
    }

    microRaySpecs.push({ center: mc, subOffsets, lines, electronDots });
  }

  macroOverlay.visible = false;
  microOverlay.visible = false;

  const setMacroVisible = (visible: boolean) => {
    macroOverlay.visible = visible;
  };

  const setMicroVisible = (visible: boolean) => {
    microOverlay.visible = visible;
  };

  const macroGuideCoords: Array<[number, number]> = [
    [-21.5, 16.5],
    [21.5, 16.5],
    [-21.5, -16.5],
    [21.5, -16.5],
  ];

  const updateMacroGuides = (explodeFactor: number, visible: boolean, macroParts: CadPart[]) => {
    const opacity = THREE.MathUtils.clamp((explodeFactor - 0.04) * 0.55, 0, 0.42);
    macroExplodeGuides.visible = visible && opacity > 0.01;

    const frontPart = macroParts.find((p) => p.id === 'aperture-mask');
    const backPart =
      macroParts.find((p) => p.id === 'sensor-copper-sink') ??
      macroParts.find((p) => p.id === 'sigma-graphite');
    const zFront = (frontPart ? frontPart.group.position.z : 7.8) + 2.0;
    const zBack = (backPart ? backPart.group.position.z : -10.85) - 2.0;

    macroAxial.lines.forEach((line, idx) => {
      (line.material as THREE.LineDashedMaterial).opacity = opacity;
      const coords = macroGuideCoords[idx];
      if (coords) {
        const attr = line.geometry.attributes.position as THREE.BufferAttribute;
        attr.setXYZ(0, coords[0], coords[1], zFront);
        attr.setXYZ(1, coords[0], coords[1], zBack);
        attr.needsUpdate = true;
        line.computeLineDistances();
      }
    });
    macroRadialGuides.update(explodeFactor, visible, macroParts);
  };

  let latestMicroParts: CadPart[] = [];

  const updateMicroGuides = (explodeFactor: number, visible: boolean) => {
    const opacity = THREE.MathUtils.clamp((explodeFactor - 0.04) * 0.55, 0, 0.42);
    microExplodeGuides.visible = visible && opacity > 0.01;

    microAxial.lines.forEach((line) => {
      (line.material as THREE.LineDashedMaterial).opacity = opacity;
    });
    if (latestMicroParts.length > 0) {
      microRadialGuides.update(explodeFactor, visible, latestMicroParts);
    }
  };

  const _dirPosY = new THREE.Vector3(0, 1, 0);
  const _dirNegY = new THREE.Vector3(0, -1, 0);
  const _dirPosX = new THREE.Vector3(1, 0, 0);
  const _dirNegX = new THREE.Vector3(-1, 0, 0);
  const _splitOffsets: ReadonlyArray<readonly [number, number]> = [
    [0.9, 0.45],
    [-0.9, -0.45],
    [0.45, -0.9],
    [-0.45, 0.9],
  ];

  let cachedMacroLen = -1;
  let cSswfPart: CadPart | undefined;
  let cOlpfPart: CadPart | undefined;
  let cIrPart: CadPart | undefined;
  let cDiePart: CadPart | undefined;
  let cIbisPart: CadPart | undefined;

  let cachedMicroLen = -1;
  let cOclPart: CadPart | undefined;
  let cPdPart: CadPart | undefined;
  let cGsPart: CadPart | undefined;
  let cDramPart: CadPart | undefined;

  const updateMacro = (
    elapsed: number,
    explodeFactor: number,
    physicsActive: boolean,
    integrated: boolean,
    macroParts: CadPart[]
  ) => {
    // 1. Live IBIS 5-axis smooth motion & SSWF subtle shimmer when physics simulation is ON
    const ibisAmp = physicsActive ? 1 - explodeFactor * 0.72 : 0;
    const dx = Math.sin(elapsed * 2.4) * 1.45 * ibisAmp;
    const dy = Math.cos(elapsed * 1.9) * 1.2 * ibisAmp;
    const dRoll = Math.sin(elapsed * 1.35) * 0.032 * ibisAmp;

    for (let i = 0; i < macroParts.length; i++) {
      const p = macroParts[i];
      const offset =
        integrated && p.integratedExplodeOffset ? p.integratedExplodeOffset : p.explodeOffset;
      const baseX = p.assembledPos.x + offset.x * explodeFactor;
      const baseY = p.assembledPos.y + offset.y * explodeFactor;
      const baseZ = p.assembledPos.z + offset.z * explodeFactor;

      if (p.ibisMovable) {
        p.group.position.set(baseX + dx, baseY + dy, baseZ);
        p.group.rotation.z = dRoll;
      } else {
        p.group.position.set(baseX, baseY, baseZ);
        p.group.rotation.z = 0;
      }

      if (p.ultrasonicElement && physicsActive) {
        // Visual representation of high-frequency piezo flexural mode
        p.group.position.z += Math.sin(elapsed * 52) * 0.14;
      }
    }

    if (physicsActive) {
      if (cachedMacroLen !== macroParts.length) {
        cachedMacroLen = macroParts.length;
        cSswfPart = macroParts.find((p) => p.id === 'sswf-piezo');
        cOlpfPart = macroParts.find((p) => p.id === 'olpf-16pt');
        cIrPart = macroParts.find((p) => p.id === 'ir-cut-filter');
        cDiePart = macroParts.find((p) => p.id === 'cmos-die');
        cIbisPart =
          macroParts.find((p) => p.id === 'sensor-vcm-coils') ??
          macroParts.find((p) => p.id === 'ibis-carrier');
      }

      const zSswf = cSswfPart ? cSswfPart.group.position.z : 6.2;
      const zOlpf = cOlpfPart ? cOlpfPart.group.position.z : 4.95;
      const zIr = cIrPart ? cIrPart.group.position.z : 3.25;
      const zDie = cDiePart ? cDiePart.group.position.z + 0.15 : 1.1;
      const zStart = integrated ? zSswf + 7.5 : zSswf + 18.0;

      // Update ultrasonic wave rings on SSWF surface
      for (let idx = 0; idx < sswfWaveRings.length; idx++) {
        const ring = sswfWaveRings[idx];
        const cycle = (elapsed * 1.6 + idx * 0.33) % 1;
        ring.position.set(dx, dy, zSswf + 0.45);
        const sc = 0.35 + cycle * 1.2;
        ring.scale.set(sc * 1.42, sc * 0.96, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = (1 - cycle) * 0.48;
      }

      // Update optical ray beams dynamically to track exploded layer Z positions
      for (let idx = 0; idx < macroRayLines.length; idx++) {
        const { def, mainLine, splitLines, reflectLine } = macroRayLines[idx];
        const xStart = def.x * 1.18;
        const yStart = def.y * 1.18;
        const posAttr = mainLine.geometry.attributes.position as THREE.BufferAttribute;

        if (def.isNIR && reflectLine) {
          posAttr.setXYZ(0, xStart, yStart, zStart);
          posAttr.setXYZ(1, def.x, def.y, zIr + 0.38);
          posAttr.needsUpdate = true;

          const rPos = reflectLine.geometry.attributes.position as THREE.BufferAttribute;
          rPos.setXYZ(0, def.x, def.y, zIr + 0.38);
          rPos.setXYZ(1, def.x * 1.55, def.y * 1.45 + 3.5, zStart - 2);
          rPos.needsUpdate = true;
          reflectLine.computeLineDistances();
        } else {
          posAttr.setXYZ(0, xStart, yStart, zStart);
          posAttr.setXYZ(1, def.x, def.y, zOlpf);
          posAttr.needsUpdate = true;

          for (let si = 0; si < splitLines.length; si++) {
            const [ox, oy] = _splitOffsets[si];
            const sAttr = splitLines[si].geometry.attributes.position as THREE.BufferAttribute;
            sAttr.setXYZ(0, def.x, def.y, zOlpf);
            sAttr.setXYZ(1, def.x + ox + dx, def.y + oy + dy, zDie);
            sAttr.needsUpdate = true;
          }
        }

        // Animate photon pulse along ray
        const pkt = macroPackets[idx];
        const u = (elapsed * pkt.speed + pkt.phase) % 1;
        if (def.isNIR) {
          if (u < 0.55) {
            const t = u / 0.55;
            pkt.mesh.position.set(
              THREE.MathUtils.lerp(xStart, def.x, t),
              THREE.MathUtils.lerp(yStart, def.y, t),
              THREE.MathUtils.lerp(zStart, zIr + 0.38, t)
            );
          } else {
            const t = (u - 0.55) / 0.45;
            pkt.mesh.position.set(
              THREE.MathUtils.lerp(def.x, def.x * 1.55, t),
              THREE.MathUtils.lerp(def.y, def.y * 1.45 + 3.5, t),
              THREE.MathUtils.lerp(zIr + 0.38, zStart - 2, t)
            );
          }
        } else {
          pkt.mesh.position.set(
            THREE.MathUtils.lerp(xStart, def.x + dx, u),
            THREE.MathUtils.lerp(yStart, def.y + dy, u),
            THREE.MathUtils.lerp(zStart, zDie, u)
          );
        }
      }

      // Update IBIS Lorentz vector arrows on VCM voice coils (zero Vector3 allocations!)
      if (cIbisPart) {
        ibisVectors.position.set(dx, dy, cIbisPart.group.position.z - 0.5);
        ibisVectors.rotation.z = dRoll;
        const fy = Math.cos(elapsed * 1.9);
        const fx = Math.sin(elapsed * 2.4);
        const yDir = fy >= 0 ? _dirPosY : _dirNegY;
        const xDir = fx >= 0 ? _dirPosX : _dirNegX;
        arrowY1.setDirection(yDir);
        arrowY1.setLength(3.2 + Math.abs(fy) * 5.0, 2.0, 1.2);
        arrowY2.setDirection(yDir);
        arrowY2.setLength(3.2 + Math.abs(fy) * 5.0, 2.0, 1.2);
        arrowX1.setDirection(xDir);
        arrowX1.setLength(3.2 + Math.abs(fx) * 5.0, 2.0, 1.2);
      }
    }
  };

  let lastMicroExplode = -1;
  let lastMicroPosLen = -1;

  const updateMicro = (
    elapsed: number,
    explodeFactor: number,
    physicsActive: boolean,
    microParts: CadPart[]
  ) => {
    latestMicroParts = microParts;
    if (lastMicroExplode !== explodeFactor || lastMicroPosLen !== microParts.length) {
      lastMicroExplode = explodeFactor;
      lastMicroPosLen = microParts.length;
      for (let i = 0; i < microParts.length; i++) {
        const p = microParts[i];
        p.group.position.set(
          p.assembledPos.x + p.explodeOffset.x * explodeFactor,
          p.assembledPos.y + p.explodeOffset.y * explodeFactor,
          p.assembledPos.z + p.explodeOffset.z * explodeFactor
        );
      }
    }

    if (physicsActive) {
      if (cachedMicroLen !== microParts.length) {
        cachedMicroLen = microParts.length;
        cOclPart = microParts.find((p) => p.id === 'micro-ocl');
        cPdPart = microParts.find((p) => p.id === 'micro-pd-cross');
        cGsPart = microParts.find((p) => p.id === 'micro-2layer-gs');
        cDramPart =
          microParts.find((p) => p.id === 'micro-stacked-dram') ??
          microParts.find((p) => p.id === 'micro-adc-dram');
      }

      const zTop = (cOclPart ? cOclPart.group.position.z : 12.8) + 12.0;
      const zOcl = (cOclPart ? cOclPart.group.position.z : 12.8) + 2.4;
      const zPd = cPdPart ? cPdPart.group.position.z : 2.4;
      const zGs = cGsPart ? cGsPart.group.position.z : -3.4;
      const zDram = cDramPart ? cDramPart.group.position.z : -15.0;

      for (let sIdx = 0; sIdx < microRaySpecs.length; sIdx++) {
        const { center, subOffsets, lines, electronDots } = microRaySpecs[sIdx];
        for (let subIdx = 0; subIdx < subOffsets.length; subIdx++) {
          const [ox, oy] = subOffsets[subIdx];
          const posAttr = lines[subIdx].geometry.attributes.position as THREE.BufferAttribute;
          posAttr.setXYZ(0, center.x + ox * 1.65, center.y + oy * 1.65, zTop);
          posAttr.setXYZ(1, center.x + ox * 1.45, center.y + oy * 1.45, zOcl);
          posAttr.setXYZ(2, center.x + ox * 0.72, center.y + oy * 0.72, zPd);
          posAttr.needsUpdate = true;

          const phase = (elapsed * 0.65 + sIdx * 0.21 + subIdx * 0.47) % 1;
          const dot = electronDots[subIdx];
          if (phase < 0.35) {
            const t = phase / 0.35;
            dot.position.set(
              THREE.MathUtils.lerp(center.x + ox * 0.7, center.x + 2.2, t),
              THREE.MathUtils.lerp(center.y + oy * 0.7, center.y + 2.0, t),
              THREE.MathUtils.lerp(zPd, zGs + 0.4, t)
            );
          } else {
            const t = (phase - 0.35) / 0.65;
            dot.position.set(
              THREE.MathUtils.lerp(center.x + 2.2, center.x + 2.7, t),
              THREE.MathUtils.lerp(center.y + 2.0, center.y + 2.7, t),
              THREE.MathUtils.lerp(zGs + 0.4, zDram + 1.2, t)
            );
          }
        }
      }
    }
  };

  return {
    macroOverlay,
    microOverlay,
    macroExplodeGuides,
    microExplodeGuides,
    setMacroVisible,
    setMicroVisible,
    updateMacro,
    updateMicro,
    updateMacroGuides,
    updateMicroGuides,
  };
}
