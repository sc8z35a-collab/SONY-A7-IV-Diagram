import { PartExplanation } from '../../assemblies/types';
import { renderLcdHdGroupA } from './groupA';
import { renderLcdHdGroupB } from './groupB';
import { renderLcdHdGroupC } from './groupC';
import { renderLcdHdGroupD } from './groupD';
import { renderLcdHdGroupE } from './groupE';

/**
 * Render Ultra-HD 720x470 Beginner-Friendly Technical Infographic SVG
 * for all 99 Phase 34 + Phase 35 Rear 4-Axis LCD Monitor Ultra-Dissection parts (D52–D150).
 */
export function renderLcdHdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  return (
    renderLcdHdGroupA(type) ??
    renderLcdHdGroupB(type) ??
    renderLcdHdGroupC(type) ??
    renderLcdHdGroupD(type) ??
    renderLcdHdGroupE(type)
  );
}
