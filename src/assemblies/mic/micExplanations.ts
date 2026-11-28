//@FLOW_MAP|file=src/assemblies/mic/micExplanations.ts|unit=mic|lines=7|exports=MIC_EXPLANATIONS
import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/mic.json';

/** Derived directly from pure JSON single source of truth (../../data/mic.json). */
export const MIC_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
