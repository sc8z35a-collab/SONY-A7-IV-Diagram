import { PartExplanation } from '../../assemblies/types';
import { FAB4_HD_GROUP_A } from './groupA';
import { FAB4_HD_GROUP_B } from './groupB';
import { FAB4_HD_GROUP_C } from './groupC';
import { FAB4_HD_GROUP_D } from './groupD';
import { FAB4_HD_GROUP_E } from './groupE';

const FAB4_HD_REGISTRY: Record<string, () => string> = {
  ...FAB4_HD_GROUP_A,
  ...FAB4_HD_GROUP_B,
  ...FAB4_HD_GROUP_C,
  ...FAB4_HD_GROUP_D,
  ...FAB4_HD_GROUP_E,
};

/**
 * Renders any of the 45 bespoke Ultra-HD 720x470 beginner-visual museum posters for
 * Sensor Fab Vol.4 (Phase 3 Pixel Wafer FEOL — P03-001–P03-380 / All 25 Photomasks).
 */
export function renderPhase34SensorFabVol4SchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  const fn = FAB4_HD_REGISTRY[type];
  return fn ? fn() : null;
}
