import sensorJson from '../../data/sensor.json';
import microJson from '../../data/micro.json';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import { PartExplanation } from '../types';

export const MACRO_EXPLANATIONS: Record<string, PartExplanation> =
  explanationsFromUnitJson(sensorJson);

export const MICRO_EXPLANATIONS: Record<string, PartExplanation> =
  explanationsFromUnitJson(microJson);
