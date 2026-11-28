//@FLOW_MAP|file=src/assemblies/bionz/bionzV2Explanations.ts|unit=bionz|lines=7|exports=BIONZ_V2_EXPLANATIONS
import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/bionz_v2.json';

/** Derived directly from pure JSON single source of truth (../../data/bionz_v2.json). */
export const BIONZ_V2_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
