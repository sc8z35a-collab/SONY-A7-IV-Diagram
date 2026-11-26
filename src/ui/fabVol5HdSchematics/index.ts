import { PartExplanation } from '../../assemblies/types';
import { FAB5_HD_GROUP_A } from './groupA';
import { FAB5_HD_GROUP_B } from './groupB';
import { FAB5_HD_GROUP_C } from './groupC';
import { FAB5_HD_GROUP_D } from './groupD';

const FAB5_HD_REGISTRY: Record<string, () => string> = {
  ...FAB5_HD_GROUP_A,
  ...FAB5_HD_GROUP_B,
  ...FAB5_HD_GROUP_C,
  ...FAB5_HD_GROUP_D,
};

/**
 * Renders any of the 38 bespoke Ultra-HD 720x470 beginner-visual museum posters for
 * Sensor Fab Vol.5 (Phase 4 Pixel Wafer BEOL — P04-001–P04-210 / All 13 Photomasks Mask #26–#38).
 */
export function renderPhase35SensorFabVol5SchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  const fn = FAB5_HD_REGISTRY[type];
  return fn ? fn() : null;
}
