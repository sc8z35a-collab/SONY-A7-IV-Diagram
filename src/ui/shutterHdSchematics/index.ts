import { PartExplanation } from '../../assemblies/types';
import { renderShutterHdGroupA } from './groupA';
import { renderShutterHdGroupB } from './groupB';
import { renderShutterHdGroupC } from './groupC';
import { renderShutterHdGroupD } from './groupD';
import { renderShutterHdGroupE } from './groupE';
import { renderShutterHdGroupF } from './groupF';

/**
 * Render Phase 34 + Phase 36 Ultra-Detailed Shutter Technical Schematics
 * (SH78–SH180, 103 bespoke 360x176 HD SVGs).
 */
export function renderPhase34ShutterHdSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return (
    renderShutterHdGroupA(type) ??
    renderShutterHdGroupB(type) ??
    renderShutterHdGroupC(type) ??
    renderShutterHdGroupD(type) ??
    renderShutterHdGroupE(type) ??
    renderShutterHdGroupF(type)
  );
}
