import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildSensorFabVol3DesignParts } from './sensorFabVol3DesignParts';
import { buildSensorFabVol3MaskParts } from './sensorFabVol3MaskParts';

/**
 * Assemble all 52 standalone 3D CAD sculptures (`F3-01` – `F3-52`) for
 * **第3巻：フェーズ2 ── センサー設計と「ナノの型紙」フォトマスク製造（P02-001〜050）**:
 * - `F3-01` – `F3-02`: Floating 6" Quartz Reticle & 96-Mask Hero Monument + Stepped Two-Tier Cleanroom Terrace
 * - `F3-03` – `F3-12` (Block 2-A): Product Spec, Pixel Arch, 3D TCAD, Optical FDTD, CRA, PDAF, TEG (`P02-001`–`010`)
 * - `F3-13` – `F3-24` (Block 2-B): 14-bit ADC, AFE/DCG, SLVS-EC SerDes, 3D Cu-Cu Floorplan, OASIS (`P02-011`–`022`)
 * - `F3-25` – `F3-34` (Block 2-C): DRC/LVS/ERC, 3D Mirror, Single-Shot vs Stitching, OPC, 96-Layer Tape-Out (`P02-023`–`032`)
 * - `F3-35` – `F3-44` (Block 2-D): 6" Synthetic Quartz, MoSi PSM, 260k Multi-Beam EB, CD-SEM, KLA IPRO (`P02-033`–`042`)
 * - `F3-45` – `F3-52` (Block 2-E): Die-to-DB, Carl Zeiss MeRiT/AIMS, 0.8µm Pellicle, SMIF Pod, 96-Mask Stocker (`P02-043`–`050`)
 */
export function buildSensorFabVol3Parts(mats: MaterialLibrary): CadPart[] {
  return [
    ...buildSensorFabVol3DesignParts(mats),
    ...buildSensorFabVol3MaskParts(mats),
  ];
}
