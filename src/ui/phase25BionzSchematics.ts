import { PartExplanation } from '../assemblies/types';
import { renderBionzUpperSvg } from './bionzSchematicsUpper';
import { renderBionzMidSvg } from './bionzSchematicsMid';
import { renderBionzLowerSvg } from './bionzSchematicsLower';

/**
 * Phase 32 High-Precision 560x400 Beginner-Friendly Japanese Technical Schematic SVGs (46/46 unique):
 *   - Sony BIONZ XR / BIONZ XR2 Package Internal Ultra-Dissection (XR01–XR46)
 *   - Every single one of all 46 parts has its own bespoke cross-section, zoom loupe,
 *     Before/After visual comparison, waveform, and everyday Japanese analogy!
 */
export function renderPhase25BionzSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return (
    renderBionzUpperSvg(type) ??
    renderBionzMidSvg(type) ??
    renderBionzLowerSvg(type)
  );
}
