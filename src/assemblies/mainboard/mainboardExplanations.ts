//@FLOW_MAP|file=src/assemblies/mainboard/mainboardExplanations.ts|unit=mainboard|lines=7|exports=MAINBOARD_EXPLANATIONS
import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/mainboard.json';

/** Derived directly from pure JSON single source of truth (../../data/mainboard.json). */
export const MAINBOARD_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
