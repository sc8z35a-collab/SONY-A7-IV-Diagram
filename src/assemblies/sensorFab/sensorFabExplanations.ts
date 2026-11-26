import sensorFabJson from '../../data/sensor_fab.json';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import { PartExplanation } from '../types';

export const SENSOR_FAB_EXPLANATIONS: Record<string, PartExplanation> =
  explanationsFromUnitJson(sensorFabJson);
