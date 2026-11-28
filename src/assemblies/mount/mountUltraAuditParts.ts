//@FLOW_MAP|file=src/assemblies/mount/mountUltraAuditParts.ts|unit=mount|lines=275|exports=buildMountUltraAuditParts
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

function createArcSectorShape(
  rInner: number,
  rOuter: number,
  aStart: number,
  aEnd: number
): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOuter, aStart, aEnd, false);
  s.absarc(0, 0, rInner, aEnd, aStart, true);
  s.closePath();
  return s;
}

function finalizeStandaloneMountAuditPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.26
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'mount',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Build 6 Phase 18B standalone-only deep-audit completion CAD parts for the 55mm Lens Mount (M43–M48).
 * Strictly omitted in whole-camera modes ('integrated', 'camera_body'); visible ONLY in standalone 'mount' mode!
 */
export function buildMountUltraAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const LUG_ANGLES_DEG = [42, 132, 225, 312];
  const LOCK_PIN_ANGLE_RAD = THREE.MathUtils.degToRad(-24);
  const LOCK_PIN_R = 30.8;
  const lockPinX = Math.cos(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;
  const lockPinY = Math.sin(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;

  // =========================================================================
  // M43. Bayonet Lug 12° Lead-In Micro-Chamfer Ramps & Anti-Galling DLC Surface Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const deg of LUG_ANGLES_DEG) {
      const a0 = THREE.MathUtils.degToRad(deg - 16);
      const a1 = THREE.MathUtils.degToRad(deg + 16);
      const dlcArc = new THREE.Mesh(
        extrudeCentered(createArcSectorShape(26.6, 28.8, a0, a1), 0.72, 0.08, 0.24, 16),
        mats.titaniumRivet
      );
      g.add(dlcArc);
    }

    parts.push(
      finalizeStandaloneMountAuditPart(
        'mount-bayonet-leadin-dlc',
        43,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 32.1),
        new THREE.Vector3(0, 22, 118),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M44. Lens-Power Overcurrent Load-Switch Protection IC (eFuse) & Hot-Swap ESD TVS Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const subPcb = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(24.0, 27.4, -Math.PI * 0.68, -Math.PI * 0.32), 0.72, 0.04, 0.04, 20),
      mats.hdiMainboardPcb
    );
    g.add(subPcb);

    // Center smart eFuse load-switch QFN IC + flanking bidirectional TVS ESD diodes
    const efuseIc = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.2, 0.85), mats.icEpoxy);
    efuseIc.position.set(0, -25.7, -0.68);
    g.add(efuseIc);

    for (const offset of [-0.14, -0.08, 0.08, 0.14]) {
      const a = -Math.PI * 0.5 + offset;
      const tvs = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 0.55), mats.smdCeramic);
      tvs.position.set(Math.cos(a) * 25.7, Math.sin(a) * 25.7, -0.58);
      tvs.rotation.z = a;
      g.add(tvs);
    }

    parts.push(
      finalizeStandaloneMountAuditPart(
        'mount-power-load-switch',
        44,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 23.8),
        new THREE.Vector3(36, -54, -22),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M45. 3-Point CNC Laser-Interferometer Flange-Focal Datum Pads (18.000 mm Reference)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(i * 120 + 30);
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(3.1, 3.1, 0.62, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      pad.position.set(Math.cos(a) * 31.3, Math.sin(a) * 31.3, 0);

      const blueRing = new THREE.Mesh(new THREE.TorusGeometry(3.15, 0.24, 8, 20), mats.mountShimBlue);
      blueRing.position.set(Math.cos(a) * 31.3, Math.sin(a) * 31.3, 0.22);
      blueRing.userData.noEdges = true;
      g.add(pad, blueRing);
    }

    parts.push(
      finalizeStandaloneMountAuditPart(
        'mount-flange-datum-pads',
        45,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 27.6),
        new THREE.Vector3(0, 48, 36),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M46. Lens-Release Button 3-Stage Bellows Silicone Waterproof Boot & Dust Skirt
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3-fold bellows rings encircling the front lens-release plunger shaft cleanly inside boss
    for (let k = 0; k < 3; k++) {
      const fold = new THREE.Mesh(
        new THREE.TorusGeometry(3.15 + (k % 2) * 0.45, 0.45, 10, 22),
        mats.epdmGasket
      );
      fold.position.set(lockPinX + 6.8, lockPinY - 0.1, -1.0 + k * 0.95);
      fold.userData.noEdges = true;
      g.add(fold);
    }
    const skirt = new THREE.Mesh(
      new THREE.CylinderGeometry(4.0, 4.0, 0.55, 22).rotateX(Math.PI / 2),
      mats.antiVibRubber
    );
    skirt.position.set(lockPinX + 6.8, lockPinY - 0.1, -1.55);
    g.add(skirt);

    parts.push(
      finalizeStandaloneMountAuditPart(
        'mount-release-wp-boot',
        46,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 27.6),
        new THREE.Vector3(56, -34, 64),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M47. 60° Bayonet Rotational End-Stop Elastomer Cushion & Anti-Over-Twist Catch
  // =========================================================================
  {
    const g = new THREE.Group();
    const stopAngle = THREE.MathUtils.degToRad(62);
    const sx = Math.cos(stopAngle) * 28.8;
    const sy = Math.sin(stopAngle) * 28.8;

    const cushion = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.4, 2.8, 0.6), 2.1, 0.08, 0.08, 10),
      mats.butylDamperRubber
    );
    cushion.position.set(sx, sy, 0);
    cushion.rotation.z = stopAngle;

    const steelBacking = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.0, 2.2), mats.mountSpringSteel);
    steelBacking.position.set(sx + Math.cos(stopAngle) * 2.2, sy + Math.sin(stopAngle) * 2.2, 0);
    steelBacking.rotation.z = stopAngle;

    g.add(cushion, steelBacking);

    parts.push(
      finalizeStandaloneMountAuditPart(
        'mount-overtravel-bumper',
        47,
        '#b45309',
        g,
        new THREE.Vector3(0, 0, 28.8),
        new THREE.Vector3(46, 52, 72),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M48. Inner Mount Multi-Point BeCu High-Frequency EMI & Thermal Grounding Fingers (8x)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 8 gold-plated CuBe2 spring fingers spaced every 45° inside mount throat
    for (let i = 0; i < 8; i++) {
      const a = THREE.MathUtils.degToRad(i * 45 + 22.5);
      const finger = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.8, 0.35), mats.beCuSpring);
      finger.position.set(Math.cos(a) * 27.6, Math.sin(a) * 27.6, 0);
      finger.rotation.z = a;
      finger.rotation.y = 0.22;

      const goldTip = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), mats.goldPlating);
      goldTip.position.set(Math.cos(a) * 26.5, Math.sin(a) * 26.5, 0.35);
      goldTip.userData.noEdges = true;
      g.add(finger, goldTip);
    }

    parts.push(
      finalizeStandaloneMountAuditPart(
        'mount-thermal-emi-fingers',
        48,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 25.4),
        new THREE.Vector3(-48, 36, 14),
        cp,
        0.28
      )
    );
  }

  return parts;
}
