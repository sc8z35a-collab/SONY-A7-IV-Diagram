import welcomeJson from '../data/welcome.json';
import { buildWelcomeParts } from '../assemblies/welcome/welcomeParts';
import { buildWelcomeGlyphPrecisionParts } from '../assemblies/welcome/welcomeGlyphPrecisionParts';
import { buildWelcomePlinthPrecisionParts } from '../assemblies/welcome/welcomePlinthPrecisionParts';
import { buildWelcomeGlyphUltraDetailParts } from '../assemblies/welcome/welcomeGlyphUltraDetailParts';
import { buildWelcomePlinthUltraDetailParts } from '../assemblies/welcome/welcomePlinthUltraDetailParts';
import { buildWelcomeGlyphMetrologyParts } from '../assemblies/welcome/welcomeGlyphMetrologyParts';
import { buildWelcomePlinthInstrumentationParts } from '../assemblies/welcome/welcomePlinthInstrumentationParts';
import { buildWelcomeGlyphWaveCParts } from '../assemblies/welcome/welcomeGlyphWaveCParts';
import { buildWelcomePlinthWaveCParts } from '../assemblies/welcome/welcomePlinthWaveCParts';
import { buildWelcomeGlyphWaveDParts } from '../assemblies/welcome/welcomeGlyphWaveDParts';
import { buildWelcomePlinthWaveDParts } from '../assemblies/welcome/welcomePlinthWaveDParts';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const WELCOME_META: UnitMeta = {
  unitId: welcomeJson.unitId,
  version: welcomeJson.version,
  nameJa: welcomeJson.nameJa,
  nameEn: welcomeJson.nameEn,
  declaredPartCount: welcomeJson.declaredPartCount,
  parts: welcomeJson.parts as unknown as readonly UnitPartMeta[],
};

export function createWelcomeUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'welcome',
    subsystem: 'welcome',
    meta: WELCOME_META,
    buildRaw: (mats) => {
      const parts = [
        ...buildWelcomeParts(mats),
        ...buildWelcomeGlyphPrecisionParts(mats),
        ...buildWelcomePlinthPrecisionParts(mats),
        ...buildWelcomeGlyphUltraDetailParts(mats),
        ...buildWelcomePlinthUltraDetailParts(mats),
        ...buildWelcomeGlyphMetrologyParts(mats),
        ...buildWelcomePlinthInstrumentationParts(mats),
        ...buildWelcomeGlyphWaveCParts(mats),
        ...buildWelcomePlinthWaveCParts(mats),
        ...buildWelcomeGlyphWaveDParts(mats),
        ...buildWelcomePlinthWaveDParts(mats),
      ];
      return { parts };
    },
  });
}
