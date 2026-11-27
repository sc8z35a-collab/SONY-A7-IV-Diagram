import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildBionzV2Wave3PartsA } from './bionzV2Wave3PartsA';
import { buildBionzV2Wave3PartsB } from './bionzV2Wave3PartsB';

/**
 * Build the Wave-3 +20-part Ultra-High-Detail TEM/SEM Expansion for BIONZ XR / XR2 V2 (`X2-86` – `X2-105`, total 105 parts).
 *
 * Split cleanly across Group A (`X2-86` – `X2-95`: FEOL 2D vdW/MW-ALD/Odometer, BEOL NbP/RuAl/CA-HLDO/TDC/CZTB, 3.5D SiC/CoPoS)
 * and Group B (`X2-96` – `X2-105`: Silicon Photonics TFLN/InP-DFB, 4F² VCT CoP DRAM, Angle-D CoW HB, PQC NTT/TRNG, LFI BBICS,
 * BIONZ XR2 Dynamic Active EIS & Variable Shutter/RAW, Stanford c-Axis AlN Phonon ILD & LPBF Hex-Wick 3-Path Two-Phase Jet).
 */
export function buildBionzV2Wave3Parts(mats: MaterialLibrary): CadPart[] {
  return [...buildBionzV2Wave3PartsA(mats), ...buildBionzV2Wave3PartsB(mats)];
}
