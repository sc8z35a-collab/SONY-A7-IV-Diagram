import { QualityTier } from './unit_contract';

/**
 * Quality-tier geometry tessellation context shared by V2 unit builders, CadHelpers,
 * and UltraDetailBuilders. Ensures STD < HIGH < ULTRA triangle scaling across all 18 assemblies.
 */
export interface GeometryQualityScale {
  readonly curveScale: number;
  readonly radialScale: number;
  readonly bevelScale: number;
  readonly sagittaMultiplier: number;
  readonly allowMicroBevels: boolean;
  readonly maxCurveSegments: number;
  readonly maxRadialSegments: number;
  readonly minRadialSegments: number;
}

const QUALITY_GEOMETRY_SCALES: Record<QualityTier, GeometryQualityScale> = {
  standard_lite: {
    curveScale: 0.16,
    radialScale: 0.18,
    bevelScale: 0.0,
    sagittaMultiplier: 3.8,
    allowMicroBevels: false,
    maxCurveSegments: 8,
    maxRadialSegments: 9,
    minRadialSegments: 4,
  },
  standard: {
    curveScale: 0.58,
    radialScale: 0.62,
    bevelScale: 0.4,
    sagittaMultiplier: 1.3,
    allowMicroBevels: true,
    maxCurveSegments: 20,
    maxRadialSegments: 20,
    minRadialSegments: 8,
  },
  high: {
    curveScale: 0.78,
    radialScale: 0.8,
    bevelScale: 0.6,
    sagittaMultiplier: 1.05,
    allowMicroBevels: true,
    maxCurveSegments: 28,
    maxRadialSegments: 26,
    minRadialSegments: 8,
  },
  ultra: {
    curveScale: 1.05,
    radialScale: 1.05,
    bevelScale: 1.0,
    sagittaMultiplier: 0.85,
    allowMicroBevels: true,
    maxCurveSegments: 40,
    maxRadialSegments: 36,
    minRadialSegments: 10,
  },
};

let activeBuildQuality: QualityTier | null = null;
let qualityAccessCounter = 0;

export function setActiveBuildQuality(quality: QualityTier | null): void {
  activeBuildQuality = quality;
}

export function beginQualityAccessTracking(): number {
  return qualityAccessCounter;
}

export function didQualityAccessChange(mark: number): boolean {
  return qualityAccessCounter !== mark;
}

export function getActiveBuildQuality(): QualityTier | null {
  qualityAccessCounter++;
  return activeBuildQuality;
}

export function getActiveGeometryScale(): GeometryQualityScale | null {
  qualityAccessCounter++;
  return activeBuildQuality ? QUALITY_GEOMETRY_SCALES[activeBuildQuality] : null;
}

export function scaleCurveSegmentsForQuality(requested: number, minSegs = 4): number {
  const s = getActiveGeometryScale();
  if (!s) return requested;
  const scaled = Math.round(requested * s.curveScale);
  return Math.max(minSegs, Math.min(s.maxCurveSegments, scaled));
}

export function scaleRadialSegmentsForQuality(requested: number, minSegs = 5): number {
  const s = getActiveGeometryScale();
  if (!s) return requested;
  const scaled = Math.round(requested * s.radialScale);
  return Math.max(Math.min(minSegs, s.minRadialSegments), Math.min(s.maxRadialSegments, scaled));
}

export function scaleBevelSegmentsForQuality(requested: number): number {
  const s = getActiveGeometryScale();
  if (!s) return requested;
  if (!s.allowMicroBevels || s.bevelScale <= 0 || requested <= 0) return 0;
  return Math.max(1, Math.round(requested * s.bevelScale));
}

export function withQualityGeometry<T>(quality: QualityTier, fn: () => T): T {
  const prev = activeBuildQuality;
  activeBuildQuality = quality;
  try {
    return fn();
  } finally {
    activeBuildQuality = prev;
  }
}
