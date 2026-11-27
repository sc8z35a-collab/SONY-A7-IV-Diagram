import { PartExplanation } from '../../assemblies/types';
import { renderBionzV2GroupA } from './groupA';
import { renderBionzV2GroupB } from './groupB';
import { renderBionzV2GroupC } from './groupC';
import { renderBionzV2GroupD } from './groupD';
import { renderBionzV2GroupE } from './groupE';
import { renderBionzV2GroupF } from './groupF';
import { renderBionzV2GroupG } from './groupG';
import { renderBionzV2GroupH } from './groupH';

/**
 * Dispatcher for ALL 105 Ultra-HD 720x500 BIONZ XR / XR2 V2 Technical Schematics (X2-01 – X2-105).
 * Covers:
 *   - Group A (X2-01 – X2-15): Wafer/GAA/High-NA EUV/HKMG/Work-Function/BPR/BSPDN/MOL
 *   - Group B (X2-16 – X2-30): Air-Gap/Ru/DTCO/CFET/Cu-Hybrid/CPO/HBM4/Thermal/PDN
 *   - Group C (X2-31 – X2-43): Deep 2025-2026 Angstrom Gate/Channel/BEOL/BSPDN physics
 *   - Group D (X2-44 – X2-55): 2026 sCFET SRAM/FeFET CIM/IGZO/MRAM/GaN IVR/UCIe/COUPE
 *   - Group E (X2-56 – X2-70): A14 NanoFlex/Intel 14A PowerDirect/Forksheet/Full BDI/SDB/Mo/ADPLL/FLL
 *   - Group F (X2-71 – X2-85): BGR/350mV SRAM/IEEE1838/200nm HB/EMIB-T/eSTC/sTIM/MT-Dock/α7 V XR2 Engines
 *   - Group G (X2-86 – X2-95): 2D vdW Sb/Bi Contact, MW-ALD HfAlO, CICC Odometer, Science NbP, RuAl Supervia,
 *                              ISSCC CA-HLDO, VCO-TDC PDM Scope, CoZrTa FIVR Inductor, TSMC 4H-SiC & CoPoS
 *   - Group H (X2-96 – X2-105): OFC 400G TFLN MZM, InP-on-Si CW-DFB PIC, 4F2 VCT CoP DRAM, ECTC Angle-D CoW HB,
 *                               PQC ML-KEM/ML-DSA + C-Latch TRNG, LFI BBICS, XR2 Dynamic Active EIS, Var Shutter/Lossless RAW,
 *                               Stanford c-Axis AlN Phonon ILD, ITherm Two-Phase Jet + Capillary Wick Cooler
 */
export function renderBionzV2HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  return (
    renderBionzV2GroupA(type) ??
    renderBionzV2GroupB(type) ??
    renderBionzV2GroupC(type) ??
    renderBionzV2GroupD(type) ??
    renderBionzV2GroupE(type) ??
    renderBionzV2GroupF(type) ??
    renderBionzV2GroupG(type) ??
    renderBionzV2GroupH(type)
  );
}
