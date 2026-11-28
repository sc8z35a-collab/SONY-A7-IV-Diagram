//@FLOW_MAP|file=src/assemblies/drybox/dryboxExplanationsA.ts|unit=drybox|lines=7|exports=DRYBOX_EXPLANATIONS_A
import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/drybox.json';

/** Derived directly from pure JSON single source of truth (../../data/drybox.json). */
export const DRYBOX_EXPLANATIONS_A: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
