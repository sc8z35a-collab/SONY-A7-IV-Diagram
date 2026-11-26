import { PartExplanation } from '../assemblies/types';
import { renderPhase36MicUltraSchematicSvgA } from './phase36MicUltraSchematicsA';
import { renderPhase36MicUltraSchematicSvgB } from './phase36MicUltraSchematicsB';

/**
 * Phase 36 Ultra-Detailed Full-Width 320x118 Scientific Cutaway Schematic SVGs (MC111–MC150).
 */
export function renderPhase36MicUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return renderPhase36MicUltraSchematicSvgA(type) ?? renderPhase36MicUltraSchematicSvgB(type);
}
