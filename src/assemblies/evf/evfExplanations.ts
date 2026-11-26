import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/evf.json';

/** Derived directly from pure JSON single source of truth (../../data/evf.json). */
export const EVF_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
