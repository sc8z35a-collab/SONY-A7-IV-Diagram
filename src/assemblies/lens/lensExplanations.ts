import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/lens.json';

/** Derived directly from pure JSON single source of truth (../../data/lens.json). */
export const LENS_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
