import { PartExplanation } from '../assemblies/types';

interface JsonPartEntry {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly plainAnalogy?: string;
  readonly summary: string;
  readonly opticsAndPhysics: readonly string[];
  readonly formula?: { readonly expression: string; readonly description: string };
  readonly nextGenInnovation: string;
  readonly specs: ReadonlyArray<{ readonly label: string; readonly value: string }>;
  readonly diagramType: string;
}

/**
 * Derive a `Record<partId, PartExplanation>` directly from a pure `src/data/<unit>.json` module
 * so every explanation file stays a 10-line single-source-of-truth wrapper.
 */
export function explanationsFromUnitJson(data: {
  readonly parts: readonly JsonPartEntry[];
}): Record<string, PartExplanation> {
  const out: Record<string, PartExplanation> = {};
  for (let i = 0; i < data.parts.length; i++) {
    const p = data.parts[i];
    out[p.id] = {
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      plainAnalogy: p.plainAnalogy,
      summary: p.summary,
      opticsAndPhysics: [...p.opticsAndPhysics],
      formula: p.formula
        ? { expression: p.formula.expression, description: p.formula.description }
        : undefined,
      nextGenInnovation: p.nextGenInnovation,
      specs: p.specs.map((s) => ({ label: s.label, value: s.value })),
      diagramType: p.diagramType as PartExplanation['diagramType'],
    };
  }
  return out;
}
