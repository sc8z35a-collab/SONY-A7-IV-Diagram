//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol4Parts.ts|unit=sensorFab|lines=23|exports=buildSensorFabVol4Parts
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildSensorFabVol4UpperParts } from './sensorFabVol4UpperParts';
import { buildSensorFabVol4LowerParts } from './sensorFabVol4LowerParts';

/**
 * Assemble all 45 standalone 3D CAD sculptures (`F4-01` – `F4-45`) for
 * **第4巻：フェーズ3 ── 画素ウェーハ前工程（FEOL）：光を受け止める心臓部（P03-001〜380）**:
 * - `F4-01` – `F4-02`: Giant 3D Completed 4T-PPD Pixel Heart Cutaway + Stepped Two-Tier FEOL Cleanroom Terrace
 * - `F4-03` – `F4-10` (Block 3-A): Incoming Clean, Pad Ox, Mask #01 Align, SiN, Mask #02 STI, HDP Fill, Mask #03, CMP/Strip (`P03-001`–`058`)
 * - `F4-11` – `F4-14` (Block 3-B): DTI Hardmask, Mask #04 Deep F-DTI, Sidewall Passivation, Optical Mirror Fill (`P03-059`–`084`)
 * - `F4-15` – `F4-27` (Block 3-C): Masks #05–#10 Wells/Vt, Masks #11–#13 RGB 3-Depth MeV PD, Mask #14 Dual-Pixel, Masks #15–#16, Recovery Anneal (`P03-085`–`248`)
 * - `F4-28` – `F4-33` (Block 3-D): Mask #17 VTG Straw, 3.3V Gate Ox, Mask #18 Dual Ox, 2–3nm Ox + Poly-Si, Mask #19 Gate Etch, Re-Ox/CD-SEM (`P03-249`–`296`)
 * - `F4-34` – `F4-40` (Block 3-E): Offset Spacer, Masks #20–#24 including Crown Jewel Mask #22 Surface P+ Pinning Lid (`P03-297`–`364`)
 * - `F4-41` – `F4-45` (Block 3-F): Spike RTA Flash, Mask #25 Salicide Block (SAB), CoSi2/NiSi Silicide, H2 Sintering, Vol.5 BEOL 210-Step Portal (`P03-365`–`380`)
 */
export function buildSensorFabVol4Parts(mats: MaterialLibrary): CadPart[] {
  return [
    ...buildSensorFabVol4UpperParts(mats),
    ...buildSensorFabVol4LowerParts(mats),
  ];
}
