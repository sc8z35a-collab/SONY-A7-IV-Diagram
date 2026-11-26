import { PartExplanation } from '../../assemblies/types';
import { renderVol3GroupASvg } from './groupA';
import { renderVol3GroupBSvg } from './groupB';
import { renderVol3GroupCSvg } from './groupC';
import { renderVol3GroupDSvg } from './groupD';
import { renderVol3GroupESvg } from './groupE';

/**
 * Dispatcher for all 52 Phase 33 Sensor Fab Vol.3 Ultra-HD 720x470 Vector Infographic Posters
 * (`F3-01` – `F3-52`, covering 50/50 steps `P02-001` – `P02-050` with click-to-zoom Fullscreen Lightbox).
 */
export function renderPhase33SensorFabVol3SchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return (
    renderVol3GroupASvg(type) ??
    renderVol3GroupBSvg(type) ??
    renderVol3GroupCSvg(type) ??
    renderVol3GroupDSvg(type) ??
    renderVol3GroupESvg(type)
  );
}
