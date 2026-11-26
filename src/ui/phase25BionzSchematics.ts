import { PartExplanation } from '../assemblies/types';
import { renderBionzUpperSvg } from './bionzSchematicsUpper';
import { renderBionzMidSvg } from './bionzSchematicsMid';
import { renderBionzLowerSvg } from './bionzSchematicsLower';
import { renderBionzExtraSvg } from './bionzSchematicsExtra';

/**
 * Phase 33 High-Precision 560x400 Beginner-Friendly Japanese Technical Schematic SVGs (70/70 unique):
 *   - Sony BIONZ XR / BIONZ XR2 Package & SY-1122 Mainboard Companion Ultra-Dissection (XR01–XR70)
 *   - Every single one of all 70 parts has its own bespoke cross-section, zoom loupe,
 *     Before/After visual comparison, waveform, and everyday Japanese analogy!
 */
export function renderPhase25BionzSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return (
    renderBionzUpperSvg(type) ??
    renderBionzMidSvg(type) ??
    renderBionzLowerSvg(type) ??
    renderBionzExtraSvg(type)
  );
}
