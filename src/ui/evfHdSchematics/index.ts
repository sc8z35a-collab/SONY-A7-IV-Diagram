import { PartExplanation } from '../../assemblies/types';
import { renderEvfHdGroup1 } from './evfHdGroup1';
import { renderEvfHdGroup2 } from './evfHdGroup2';
import { renderEvfHdGroup3 } from './evfHdGroup3';

/**
 * Render an Ultra-HD 720x470 beginner-friendly technical infographic SVG
 * for all 55 Electronic Viewfinder (EVF) parts (E01–E55).
 */
export function renderEvfHdSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return renderEvfHdGroup1(type) ?? renderEvfHdGroup2(type) ?? renderEvfHdGroup3(type);
}
