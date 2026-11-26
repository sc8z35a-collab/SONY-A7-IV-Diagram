import { CadPart, PartExplanation } from './types';

/**
 * OMEGA-13: Per-Subsystem On-Demand Japanese Scientific Explanation Code-Splitter.
 *
 * All 932 parts across all 14 subsystems retain 100% of their rich Japanese prose, analogies,
 * formulas, specs, and SVG schematic types, loaded dynamically per subsystem on first drawer
 * inspection and cached permanently on `part.explanation`!
 */

const LAZY_STUB: PartExplanation & { readonly __isLazyStub: true } = Object.freeze({
  __isLazyStub: true,
  title: '',
  subtitle: '',
  category: '',
  summary: '',
  opticsAndPhysics: [],
  nextGenInnovation: '',
  specs: [],
  diagramType: 'baffle',
});

export function lazyExplanationStub(_partId?: string): PartExplanation {
  return LAZY_STUB;
}

export function isLazyExplanationStub(exp: PartExplanation | undefined | null): boolean {
  return !exp || (exp as { __isLazyStub?: boolean }).__isLazyStub === true;
}

type SubsystemId = CadPart['subsystem'];

const subsystemTableCache = new Map<SubsystemId, Record<string, PartExplanation>>();
const subsystemInflight = new Map<SubsystemId, Promise<Record<string, PartExplanation>>>();

function loadSubsystemExplanations(subsystem: SubsystemId): Promise<Record<string, PartExplanation>> {
  const cached = subsystemTableCache.get(subsystem);
  if (cached) return Promise.resolve(cached);

  let inflight = subsystemInflight.get(subsystem);
  if (inflight) return inflight;

  const finish = (table: Record<string, PartExplanation>) => {
    subsystemTableCache.set(subsystem, table);
    subsystemInflight.delete(subsystem);
    return table;
  };

  switch (subsystem) {
    case 'lens':
      inflight = import('./lens/lensExplanations').then((m) => finish(m.LENS_EXPLANATIONS));
      break;
    case 'mount':
      inflight = Promise.all([
        import('./mount/mountExplanations'),
        import('./mount/mountUltra34ExplanationsA'),
        import('./mount/mountUltra34ExplanationsB'),
      ]).then(([mBase, mU34A, mU34B]) =>
        finish({
          ...mBase.MOUNT_EXPLANATIONS,
          ...mU34A.MOUNT_ULTRA34_EXPLANATIONS_A,
          ...mU34B.MOUNT_ULTRA34_EXPLANATIONS_B,
        })
      );
      break;
    case 'shutter':
      inflight = Promise.all([
        import('./shutter/shutterExplanations'),
        import('./shutter/shutterUltra34ExplanationsA'),
        import('./shutter/shutterUltra34ExplanationsB'),
      ]).then(([mBase, mU34A, mU34B]) =>
        finish({
          ...mBase.SHUTTER_EXPLANATIONS,
          ...mU34A.SHUTTER_ULTRA34_EXPLANATIONS_A,
          ...mU34B.SHUTTER_ULTRA34_EXPLANATIONS_B,
        })
      );
      break;
    case 'sensor':
      inflight = Promise.all([
        import('./sensor/explanations'),
        import('./sensor/sensorNextGenExplanations'),
      ]).then(([mBase, mNext]) =>
        finish({
          ...mBase.MACRO_EXPLANATIONS,
          ...mNext.SENSOR_NEXTGEN_EXPLANATIONS,
        })
      );
      break;
    case 'micro':
      inflight = Promise.all([
        import('./sensor/explanations'),
        import('./sensor/microPixelNextGenExplanations'),
      ]).then(([mBase, mNext]) =>
        finish({
          ...mBase.MICRO_EXPLANATIONS,
          ...mNext.MICRO_NEXTGEN_EXPLANATIONS,
        })
      );
      break;
    case 'micro_v2':
      inflight = Promise.all([
        import('./sensor/microPixelV2Explanations'),
        import('./sensor/microPixelV2DeepExplanations'),
      ]).then(([mBase, mDeep]) =>
        finish({
          ...mBase.MICRO_V2_EXPLANATIONS,
          ...mDeep.MICRO_V2_DEEP_EXPLANATIONS,
        })
      );
      break;
    case 'mainboard':
      inflight = import('./mainboard/mainboardExplanations').then((m) =>
        finish(m.MAINBOARD_EXPLANATIONS)
      );
      break;
    case 'evf':
      inflight = import('./evf/evfExplanations').then((m) => finish(m.EVF_EXPLANATIONS));
      break;
    case 'lcd':
      inflight = Promise.all([
        import('./lcd/lcdExplanations'),
        import('./lcd/lcdUltraOemExplanations'),
        import('./lcd/lcdUltraTechExplanations'),
        import('./lcd/lcdUltraDeepExplanations'),
      ]).then(([mBase, mOem, mTech, mDeep]) =>
        finish({
          ...mBase.LCD_EXPLANATIONS,
          ...mOem.LCD_ULTRA_OEM_EXPLANATIONS,
          ...mTech.LCD_ULTRA_TECH_EXPLANATIONS,
          ...mDeep.LCD_ULTRA_DEEP_EXPLANATIONS,
        })
      );
      break;
    case 'body':
      inflight = Promise.all([
        import('./body/bodyExplanations'),
        import('./body/bodyNextGenExplanations'),
        import('./body/bodyUltra25Explanations'),
      ]).then(([mBase, mNext, mU25]) =>
        finish({
          ...mBase.BODY_EXPLANATIONS,
          ...mNext.BODY_NEXTGEN_EXPLANATIONS,
          ...mU25.BODY_ULTRA25_EXPLANATIONS,
        })
      );
      break;
    case 'battery':
      inflight = Promise.all([
        import('./battery/batteryExplanations'),
        import('./battery/batteryUltra27Explanations'),
        import('./battery/batteryUltra30Explanations'),
        import('./battery/batteryUltra31Explanations'),
      ]).then(([mBase, mU27, mU30, mU31]) =>
        finish({
          ...mBase.BATTERY_EXPLANATIONS,
          ...mU27.BATTERY_ULTRA27_EXPLANATIONS,
          ...mU30.BATTERY_ULTRA30_EXPLANATIONS,
          ...mU31.BATTERY_ULTRA31_EXPLANATIONS,
        })
      );
      break;
    case 'cfexpress':
      inflight = Promise.all([
        import('./cfexpress/cfexpressExplanations'),
        import('./cfexpress/cfexpressUltra27Explanations'),
        import('./cfexpress/cfexpressUltra28Explanations'),
        import('./cfexpress/cfexpressUltra29Explanations'),
        import('./cfexpress/cfexpressUltra35Explanations'),
      ]).then(([mBase, mU27, mU28, mU29, mU35]) =>
        finish({
          ...mBase.CFEXPRESS_EXPLANATIONS,
          ...mU27.CFEXPRESS_ULTRA27_EXPLANATIONS,
          ...mU28.CFEXPRESS_ULTRA28_EXPLANATIONS,
          ...mU29.CFEXPRESS_ULTRA29_EXPLANATIONS,
          ...mU35.CFEXPRESS_ULTRA35_EXPLANATIONS,
        })
      );
      break;
    case 'bionz':
      inflight = import('./bionz/bionzExplanations').then((m) => finish(m.BIONZ_EXPLANATIONS));
      break;
    case 'bionz_v2':
      inflight = Promise.all([
        import('./bionz/bionzV2Explanations'),
        import('./bionz/bionzV2DeepExplanations'),
      ]).then(([mBase, mDeep]) =>
        finish({
          ...mBase.BIONZ_V2_EXPLANATIONS,
          ...mDeep.BIONZ_V2_DEEP_EXPLANATIONS,
        })
      );
      break;
    case 'mishoe':
      inflight = import('./mishoe/miShoeExplanations').then((m) => finish(m.MISHOE_EXPLANATIONS));
      break;
    case 'mic':
      inflight = Promise.all([
        import('./mic/micExplanations'),
        import('./mic/micUltra30Explanations'),
        import('./mic/micUltra31Explanations'),
      ]).then(([mBase, mU30, mU31]) =>
        finish({
          ...mBase.MIC_EXPLANATIONS,
          ...mU30.MIC_ULTRA30_EXPLANATIONS,
          ...mU31.MIC_ULTRA31_EXPLANATIONS,
        })
      );
      break;
    case 'sensor_fab':
      inflight = Promise.all([
        import('./sensorFab/sensorFabExplanations'),
        import('./sensorFab/sensorFabVol1Explanations'),
        import('./sensorFab/sensorFabVol2Explanations'),
        import('./sensorFab/sensorFabVol3Explanations'),
        import('./sensorFab/sensorFabVol4Explanations'),
        import('./sensorFab/sensorFabVol5Explanations'),
      ]).then(([mVol0, mVol1, mVol2, mVol3, mVol4, mVol5]) =>
        finish({
          ...mVol0.SENSOR_FAB_EXPLANATIONS,
          ...mVol1.SENSOR_FAB_VOL1_EXPLANATIONS,
          ...mVol2.SENSOR_FAB_VOL2_EXPLANATIONS,
          ...mVol3.SENSOR_FAB_VOL3_EXPLANATIONS,
          ...mVol4.SENSOR_FAB_VOL4_EXPLANATIONS,
          ...mVol5.SENSOR_FAB_VOL5_EXPLANATIONS,
        })
      );
      break;
    case 'drybox':
      inflight = Promise.all([
        import('./drybox/dryboxExplanationsA'),
        import('./drybox/dryboxExplanationsB'),
        import('./drybox/dryboxExplanationsC'),
        import('./drybox/dryboxExplanationsD'),
        import('./drybox/dryboxExplanationsE'),
        import('./drybox/dryboxExplanationsF'),
        import('./drybox/dryboxExplanationsG'),
      ]).then(([mA, mB, mC, mD, mE, mF, mG]) =>
        finish({
          ...mA.DRYBOX_EXPLANATIONS_A,
          ...mB.DRYBOX_EXPLANATIONS_B,
          ...mC.DRYBOX_EXPLANATIONS_C,
          ...mD.DRYBOX_EXPLANATIONS_D,
          ...mE.DRYBOX_EXPLANATIONS_E,
          ...mF.DRYBOX_EXPLANATIONS_F,
          ...mG.DRYBOX_EXPLANATIONS_G,
        })
      );
      break;
  }

  subsystemInflight.set(subsystem, inflight);
  return inflight;
}

export async function resolvePartExplanation(part: CadPart): Promise<PartExplanation> {
  if (!isLazyExplanationStub(part.explanation)) {
    return part.explanation;
  }
  const table = await loadSubsystemExplanations(part.subsystem);
  const resolved = table[part.id];
  if (resolved) {
    part.explanation = resolved;
    return resolved;
  }
  return part.explanation;
}
