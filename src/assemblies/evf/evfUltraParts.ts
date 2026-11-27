import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildEvfUltraSemiParts } from './evfUltraSemiParts';
import { buildEvfUltraMechParts } from './evfUltraMechParts';

/**
 * Build 30 maximum-detail, zero-duplicate standalone-only EVF precision parts (E76–E105):
 *   - E76–E90 (evfUltraSemiParts): Micro-OLED wafer-level semiconductor & optical packaging,
 *     240Hz TCON SI/EMC (VESA DSC 3:1, RClamp0524P flow-through TVS, Murata H-core CMC,
 *     Kelvin LDO/Gamma DAC, scored sintered ferrite), Sony Ref.454/352 thermal & Permalloy shields,
 *     Thorlabs-grade 3-pt kinematic dichroic mounts, D-flat Lyot glare stop & ITO micro-mesh defogger.
 *   - E91–E105 (evfUltraMechParts): Military-optical dry-N2 purge valve with ISO V-threads &
 *     poppet core, 4x2 micro-lenslet TIR light-pipe, double-leaf omega shutter detent,
 *     L-cut manganin Kelvin shunts, 5-step pyramidal gaze hood, castellated gaze EMI micro-can,
 *     19-element hex VCSEL DOE diffuser, back-to-back Belleville + DIN 6799 E-clips,
 *     split C-collar + 3D sinusoidal wave spring, and Sony OEM Ref.313/306/269/51/307 + FOF + 3D DataMatrix.
 */
export function buildEvfUltraParts(mats: MaterialLibrary): CadPart[] {
  return [...buildEvfUltraSemiParts(mats), ...buildEvfUltraMechParts(mats)];
}
