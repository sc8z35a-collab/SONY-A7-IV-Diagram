/**
 * Type-only re-export of the unified V2 MaterialLibrary backed by `ResourceCache`.
 * All 3,303 lines of legacy eager material & CanvasTexture allocation have been replaced
 * by zero-bloat V2 shared semantic PBR buckets (`src/core/resource_cache.ts` + `src/core/v2_material_catalog.ts`).
 */
export type { V2MaterialLibrary as MaterialLibrary } from '../core/v2_material_catalog';
