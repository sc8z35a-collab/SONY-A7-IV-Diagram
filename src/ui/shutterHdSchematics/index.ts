import { PartExplanation } from '../../assemblies/types';
import { renderShutterHdGroupA } from './groupA';
import { renderShutterHdGroupB } from './groupB';
import { renderShutterHdGroupC } from './groupC';

/**
 * Render Phase 34 Ultra-Detailed Shutter Technical Schematics (SH78–SH130, 53 bespoke 360x176 HD SVGs).
 */
export function renderPhase34ShutterHdSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return (
    renderShutterHdGroupA(type) ??
    renderShutterHdGroupB(type) ??
    renderShutterHdGroupC(type)
  );
}
