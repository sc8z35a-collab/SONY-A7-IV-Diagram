import { PartExplanation } from '../types';
import { SENSOR_FAB_VOL4_EXPLANATIONS_A } from './sensorFabVol4ExplanationsA';
import { SENSOR_FAB_VOL4_EXPLANATIONS_B } from './sensorFabVol4ExplanationsB';

/**
 * Complete 45-part beginner-to-engineer Japanese technical encyclopedia for
 * Sensor Fab Vol.4 (Phase 3 Pixel Wafer FEOL — P03-001–P03-380 / All 25 Photomasks).
 */
export const SENSOR_FAB_VOL4_EXPLANATIONS: Record<string, PartExplanation> = {
  ...SENSOR_FAB_VOL4_EXPLANATIONS_A,
  ...SENSOR_FAB_VOL4_EXPLANATIONS_B,
};
