//@FLOW_MAP|file=src/assemblies/mount/mountExplanations.ts|unit=mount|lines=7|exports=MOUNT_EXPLANATIONS
import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/mount.json';

/** Derived directly from pure JSON single source of truth (../../data/mount.json). */
export const MOUNT_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
