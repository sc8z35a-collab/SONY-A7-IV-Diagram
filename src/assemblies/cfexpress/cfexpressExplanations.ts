import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/cfexpress.json';

/** Derived directly from pure JSON single source of truth (../../data/cfexpress.json). */
export const CFEXPRESS_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
