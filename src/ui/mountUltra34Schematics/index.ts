import { PartExplanation } from '../../assemblies/types';
import { renderMountUltra34SchematicGroupA } from './groupA';
import { renderMountUltra34SchematicGroupB } from './groupB';

/**
 * Dispatcher for all 40 Phase 34 Ultra-HD Lens Mount Technical Schematics (M61–M100).
 */
export function renderPhase34MountUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  return renderMountUltra34SchematicGroupA(type) ?? renderMountUltra34SchematicGroupB(type);
}
