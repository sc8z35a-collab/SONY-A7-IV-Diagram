/**
 * FLOW V1 OS — Layer G Declarative Pose & Constraint Runtime Loader (Zero-GC)
 * Guarantees bit-exact 0.000mm coordinate parity across CompiledV2Unit (22 units),
 * MiShoeV2Unit (mi_shoe.ts), and headless EXAM V1 / sp scene_extractor.mjs.
 */

import * as THREE from 'three';
import { FLOW_UNIT_POSES, FlowPoseEntry } from '../units/flow_poses.gen';

export type { FlowPoseEntry };

export function getUnitPoseTable(unitId: string): Readonly<Record<string, FlowPoseEntry>> | undefined {
  return FLOW_UNIT_POSES[unitId];
}

export function getPartPoseOverride(unitId: string, partId: string): FlowPoseEntry | undefined {
  return FLOW_UNIT_POSES[unitId]?.[partId];
}

/**
 * Apply Layer G pose delta in-place to assembledPos, explodeOffset, and optional local group rotation/scale.
 * Strictly zero heap allocations on hot paths.
 */
export function applyPartPoseOverride(
  entry: FlowPoseEntry | undefined,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  group?: THREE.Object3D
): void {
  if (!entry) return;
  if (entry.d) {
    assembledPos.x += entry.d[0];
    assembledPos.y += entry.d[1];
    assembledPos.z += entry.d[2];
  }
  if (entry.e) {
    explodeOffset.x += entry.e[0];
    explodeOffset.y += entry.e[1];
    explodeOffset.z += entry.e[2];
  }
  if (group) {
    if (entry.r && (entry.r[0] !== 0 || entry.r[1] !== 0 || entry.r[2] !== 0)) {
      group.rotation.x += entry.r[0];
      group.rotation.y += entry.r[1];
      group.rotation.z += entry.r[2];
    }
    if (entry.s && (entry.s[0] !== 1 || entry.s[1] !== 1 || entry.s[2] !== 1)) {
      group.scale.x *= entry.s[0];
      group.scale.y *= entry.s[1];
      group.scale.z *= entry.s[2];
    }
  }
}
