import miShoeJson from '../../data/mi_shoe.json';
import { PartExplanation } from '../types';

/**
 * Phase 25B / V2 Pure Data Separation — Sony Multi Interface (MI) Shoe Explanations (71 Parts: MI01–MI71).
 * Single source of truth loaded directly from `src/data/mi_shoe.json` so zero explanation text is duplicated.
 */
export const MISHOE_EXPLANATIONS: Record<string, PartExplanation> = Object.fromEntries(
  miShoeJson.parts.map((p) => [
    p.id,
    {
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      plainAnalogy: p.plainAnalogy,
      summary: p.summary,
      opticsAndPhysics: [...p.opticsAndPhysics],
      ...(p.formula
        ? {
            formula: {
              expression: p.formula.expression,
              description: p.formula.description,
            },
          }
        : {}),
      nextGenInnovation: p.nextGenInnovation,
      specs: p.specs.map((s) => ({ label: s.label, value: s.value })),
      diagramType: p.diagramType as PartExplanation['diagramType'],
    },
  ])
);
