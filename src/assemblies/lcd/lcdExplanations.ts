//@FLOW_MAP|file=src/assemblies/lcd/lcdExplanations.ts|unit=lcd|lines=7|exports=LCD_EXPLANATIONS
import lcdJson from '../../data/lcd.json';
import { explanationsFromUnitJson } from '../../core/unit_explanations';
import { PartExplanation } from '../types';

export const LCD_EXPLANATIONS: Record<string, PartExplanation> =
  explanationsFromUnitJson(lcdJson);
