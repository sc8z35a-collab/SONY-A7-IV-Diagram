//@FLOW_MAP|file=src/assemblies/sensor/microPixelV2Explanations.ts|unit=sensor|lines=7|exports=MICRO_V2_EXPLANATIONS
import microV2Json from '../../data/micro_v2.json';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import { PartExplanation } from '../types';

export const MICRO_V2_EXPLANATIONS: Record<string, PartExplanation> =
  explanationsFromUnitJson(microV2Json);
