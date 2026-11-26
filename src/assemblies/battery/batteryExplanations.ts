import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/battery.json';

/** Derived directly from pure JSON single source of truth (../../data/battery.json). */
export const BATTERY_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
