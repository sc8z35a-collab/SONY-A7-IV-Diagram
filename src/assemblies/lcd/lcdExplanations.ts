import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/lcd.json';

/** Derived directly from pure JSON single source of truth (../../data/lcd.json). */
export const LCD_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
