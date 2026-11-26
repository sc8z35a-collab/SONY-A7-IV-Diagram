import { renderDryboxGroupASvg } from './groupA';
import { renderDryboxGroupBSvg } from './groupB';
import { renderDryboxGroupCSvg } from './groupC';
import { renderDryboxGroupDSvg } from './groupD';

/**
 * Render any of the 44 Ultra-HD 720x470 Museum-Poster SVG schematics
 * for Phase 34: 2026 Flagship Dual-Zone Hybrid Electronic Camera Dry Cabinet (DB01–DB44).
 */
export function renderDryboxHdSchematicSvg(diagramType: string): string | null {
  if (!diagramType.startsWith('db_')) return null;
  return (
    renderDryboxGroupASvg(diagramType) ??
    renderDryboxGroupBSvg(diagramType) ??
    renderDryboxGroupCSvg(diagramType) ??
    renderDryboxGroupDSvg(diagramType)
  );
}
