import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';

export interface RegisteredUnitEntry {
  readonly unitId: string;
  readonly declaredPartCount: number;
  /** Lazy metadata loader so unit JSON stays out of initial startup bundle */
  readonly loadMeta: () => Promise<UnitMeta>;
  /** Dynamic import loader for Lazy Loading unit 3D builder on mode switch */
  readonly load: () => Promise<OptimizedUnit>;
}

let cachedMiShoeMeta: UnitMeta | null = null;

/**
 * Central V2 Optimized Unit Registry.
 * Scoped strictly to the experimental MI Shoe individual phase ('mishoe') —
 * non-MI-Shoe camera anatomy phases remain untouched.
 * Both 3D builder (`units/mi_shoe.ts`) and pure data (`data/mi_shoe.json`)
 * are dynamically imported on demand (0 KB initial load cost!).
 */
const REGISTRY: Readonly<Record<string, RegisteredUnitEntry>> = Object.freeze({
  mishoe: {
    unitId: 'mishoe',
    declaredPartCount: 32,
    loadMeta: async (): Promise<UnitMeta> => {
      if (cachedMiShoeMeta) return cachedMiShoeMeta;
      const mod = await import('../data/mi_shoe.json');
      const data = mod.default;
      cachedMiShoeMeta = {
        unitId: data.unitId,
        version: data.version,
        nameJa: data.nameJa,
        nameEn: data.nameEn,
        declaredPartCount: data.declaredPartCount,
        parts: data.parts as unknown as readonly UnitPartMeta[],
      };
      return cachedMiShoeMeta;
    },
    load: async (): Promise<OptimizedUnit> => {
      const mod = await import('./mi_shoe');
      return mod.createMiShoeUnit();
    },
  },
});

export function hasRegisteredUnit(unitId: string): boolean {
  return Object.prototype.hasOwnProperty.call(REGISTRY, unitId);
}

export function listRegisteredUnits(): readonly RegisteredUnitEntry[] {
  return Object.values(REGISTRY);
}

export async function loadRegisteredUnitMeta(unitId: string): Promise<UnitMeta | null> {
  const entry = REGISTRY[unitId];
  return entry ? entry.loadMeta() : null;
}

export async function loadRegisteredUnit(unitId: string): Promise<OptimizedUnit> {
  const entry = REGISTRY[unitId];
  if (!entry) {
    throw new Error(`Unit '${unitId}' is not registered in V2 registry.`);
  }
  return entry.load();
}
