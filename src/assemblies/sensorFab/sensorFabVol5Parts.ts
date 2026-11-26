import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildSensorFabVol5UpperParts } from './sensorFabVol5UpperParts';
import { buildSensorFabVol5LowerParts } from './sensorFabVol5LowerParts';

/**
 * Builds all 38 beginner-visual museum-grade 3D CAD sculptures (F5-01–F5-38) for
 * **Sensor Fab Vol.5: フェーズ4 ── 画素ウェーハ配線工程（BEOL）：銅の立体高速道路と接合面（P04-001〜210 / 全13マスク）**:
 * - Covers 100% of all 210 BEOL steps (13 Photomasks Mask #26–#38 × 12 Litho = 156 + 54 Non-Litho = 210)
 * - Arranged on a Two-Tier Stepped BEOL Cleanroom Terrace with zero lower-deck explode clipping.
 */
export function buildSensorFabVol5Parts(mats: MaterialLibrary): CadPart[] {
  return [...buildSensorFabVol5UpperParts(mats), ...buildSensorFabVol5LowerParts(mats)];
}
