import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/shutter.json';

/** Derived directly from pure JSON single source of truth (../../data/shutter.json). */
export const SHUTTER_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
