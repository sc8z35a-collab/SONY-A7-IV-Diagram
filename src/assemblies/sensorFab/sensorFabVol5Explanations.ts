import { PartExplanation } from '../types';
import { SENSOR_FAB_VOL5_EXPLANATIONS_A } from './sensorFabVol5ExplanationsA';
import { SENSOR_FAB_VOL5_EXPLANATIONS_B } from './sensorFabVol5ExplanationsB';

/**
 * Complete 38-part beginner-to-engineer Japanese technical encyclopedia for
 * Sensor Fab Vol.5 (Phase 4 Pixel Wafer BEOL — P04-001–P04-210 / All 13 Photomasks Mask #26–#38).
 */
export const SENSOR_FAB_VOL5_EXPLANATIONS: Record<string, PartExplanation> = {
  ...SENSOR_FAB_VOL5_EXPLANATIONS_A,
  ...SENSOR_FAB_VOL5_EXPLANATIONS_B,
};
