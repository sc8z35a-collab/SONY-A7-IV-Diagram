import { PartExplanation } from '../types';
import { MIC_ULTRA36_EXPLANATIONS_A } from './micUltra36ExplanationsA';
import { MIC_ULTRA36_EXPLANATIONS_B } from './micUltra36ExplanationsB';

/**
 * Phase 36 — Standalone Sony Microphone Ultra-Complete 150-Part Expansion (+40 brand-new real-world parts: MC111–MC150).
 * Barrel merging Group 1–2 (MC111–MC130) and Group 3–4 (MC131–MC150).
 */
export const MIC_ULTRA36_EXPLANATIONS: Record<string, PartExplanation> = {
  ...MIC_ULTRA36_EXPLANATIONS_A,
  ...MIC_ULTRA36_EXPLANATIONS_B,
};
