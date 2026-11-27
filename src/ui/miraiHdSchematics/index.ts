import { PartExplanation } from '../../assemblies/types';
import { renderFh01HdSchematicSvg } from './fh01Schematics';
import { renderFh02HdSchematicSvg } from './fh02Schematics';

/**
 * Router for ALL 32 Ultra-HD 720x500 Editorial Monograph SVGs of Future History MIRAI 2028
 * (Prototype Structures FH01-01..FH01-16 & FH02-01..FH02-16).
 */
export function renderMiraiHdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  return renderFh01HdSchematicSvg(type) ?? renderFh02HdSchematicSvg(type);
}
