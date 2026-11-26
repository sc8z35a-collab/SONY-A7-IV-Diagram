import { PartExplanation } from '../types';
import { SENSOR_FAB_VOL3_EXPLANATIONS_A } from './sensorFabVol3ExplanationsA';
import { SENSOR_FAB_VOL3_EXPLANATIONS_B } from './sensorFabVol3ExplanationsB';

/**
 * Complete 52-part Japanese technical & beginner-friendly encyclopedia for
 * **第3巻：フェーズ2 ── センサー設計と「ナノの型紙」フォトマスク製造（P02-001〜050）**:
 * Every single one of the 50 process steps (`P02-001` – `P02-050`) is mapped 1-to-1
 * to its own 3D CAD station (`F3-03` – `F3-52`) plus Hero (`F3-01`) & Terrace (`F3-02`).
 */
export const SENSOR_FAB_VOL3_EXPLANATIONS: Record<string, PartExplanation> = {
  ...SENSOR_FAB_VOL3_EXPLANATIONS_A,
  ...SENSOR_FAB_VOL3_EXPLANATIONS_B,
};
