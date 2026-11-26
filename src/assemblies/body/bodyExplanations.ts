import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/body.json';

/** Derived directly from pure JSON single source of truth (../../data/body.json). */
export const BODY_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
