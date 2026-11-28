//@FLOW_MAP|file=src/assemblies/shutter/shutterExplanations.ts|unit=shutter|lines=7|exports=SHUTTER_EXPLANATIONS
import { PartExplanation } from '../types';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import unitData from '../../data/shutter.json';

/** Derived directly from pure JSON single source of truth (../../data/shutter.json). */
export const SHUTTER_EXPLANATIONS: Record<string, PartExplanation> = explanationsFromUnitJson(unitData);
