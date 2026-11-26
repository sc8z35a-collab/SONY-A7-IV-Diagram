import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/bionz.json';

/** Derived directly from pure JSON single source of truth (../../data/bionz.json). */
export const BIONZ_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
