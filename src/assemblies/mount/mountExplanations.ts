import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/mount.json';

/** Derived directly from pure JSON single source of truth (../../data/mount.json). */
export const MOUNT_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
