//@FLOW_MAP|file=src/assemblies/bionz/bionzExplanations.ts|unit=bionz|lines=7|exports=BIONZ_EXPLANATIONS
import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/bionz.json';

/** Derived directly from pure JSON single source of truth (../../data/bionz.json). */
export const BIONZ_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
