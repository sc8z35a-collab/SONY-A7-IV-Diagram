import { PartExplanation } from '../../assemblies/types';
import { renderFh01HdSchematicSvg } from './fh01Schematics';
import { renderFh02HdSchematicSvg } from './fh02Schematics';
import { renderFh08HdSchematicSvg } from './fh08Schematics';
import { renderFh32HdSchematicSvg } from './fh32Schematics';
import { renderFh25HdSchematicSvg } from './fh25Schematics';

/**
 * Router for ALL 86 Ultra-HD 720x500 Editorial Monograph SVGs of Future History MIRAI 2028:
 *   - FH01 (16): Full-Frame Single-Photon SPAD / QIS 3D Stacked Sensor
 *   - FH02 (16): Filterless Perovskite / OPF 3-Layer Vertical RGB Sensor
 *   - FH08 (18): ASI Inverse-Design 28mm · 180g 50mm F1.4 Freeform Meta-Optics Pancake Lens
 *   - FH32 (18): IP68 Hermetically Isolated Ultrasonic MEMS Solid-State Air-Cooling Module
 *   - FH25 (18): 30,000-nit · 240Hz True-RGB Tandem Micro-OLED / MicroLED Pancake EVF Unit
 */
export function renderMiraiHdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  return (
    renderFh01HdSchematicSvg(type) ??
    renderFh02HdSchematicSvg(type) ??
    renderFh08HdSchematicSvg(type) ??
    renderFh32HdSchematicSvg(type) ??
    renderFh25HdSchematicSvg(type)
  );
}
