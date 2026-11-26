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
  standard: {
    curveScale: 0.42,
    radialScale: 0.45,
    bevelScale: 0,
    sagittaMultiplier: 1.85,
    allowMicroBevels: false,
    maxCurveSegments: 8,
    maxRadialSegments: 12,
    minRadialSegments: 5,
  },
  high: {
    curveScale: 0.72,
    radialScale: 0.75,
    bevelScale: 0.5,
    sagittaMultiplier: 1.15,
    allowMicroBevels: true,
    maxCurveSegments: 16,
    maxRadialSegments: 22,
    minRadialSegments: 6,
  },
  ultra: {
    curveScale: 1.0,
    radialScale: 1.0,
    bevelScale: 1.0,
    sagittaMultiplier: 0.85,
    allowMicroBevels: true,
    maxCurveSegments: 28,
    maxRadialSegments: 36,
    minRadialSegments: 8,
  },
};

let activeBuildQuality: QualityTier | null = null;

export function setActiveBuildQuality(quality: QualityTier | null): void {
  activeBuildQuality = quality;
}

export function getActiveBuildQuality(): QualityTier | null {
  return activeBuildQuality;
}

export function getActiveGeometryScale(): GeometryQualityScale | null {
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
