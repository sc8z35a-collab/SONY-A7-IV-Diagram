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
      inflight = import('./mount/mountExplanations').then((m) => finish(m.MOUNT_EXPLANATIONS));
      break;
    case 'shutter':
      inflight = import('./shutter/shutterExplanations').then((m) => finish(m.SHUTTER_EXPLANATIONS));
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
      inflight = import('./lcd/lcdExplanations').then((m) => finish(m.LCD_EXPLANATIONS));
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
      ]).then(([mBase, mU27]) =>
        finish({
          ...mBase.BATTERY_EXPLANATIONS,
          ...mU27.BATTERY_ULTRA27_EXPLANATIONS,
        })
      );
      break;
    case 'cfexpress':
      inflight = Promise.all([
        import('./cfexpress/cfexpressExplanations'),
        import('./cfexpress/cfexpressUltra27Explanations'),
        import('./cfexpress/cfexpressUltra28Explanations'),
      ]).then(([mBase, mU27, mU28]) =>
        finish({
          ...mBase.CFEXPRESS_EXPLANATIONS,
          ...mU27.CFEXPRESS_ULTRA27_EXPLANATIONS,
          ...mU28.CFEXPRESS_ULTRA28_EXPLANATIONS,
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
      inflight = import('./mic/micExplanations').then((m) => finish(m.MIC_EXPLANATIONS));
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
