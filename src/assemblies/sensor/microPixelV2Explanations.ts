import microV2Json from '../../data/micro_v2.json';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import { PartExplanation } from '../types';

export const MICRO_V2_EXPLANATIONS: Record<string, PartExplanation> =
  explanationsFromUnitJson(microV2Json);
