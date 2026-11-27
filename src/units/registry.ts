import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';

export interface RegisteredUnitEntry {
  readonly unitId: string;
  readonly declaredPartCount: number;
  /** Lazy metadata loader so unit JSON stays out of initial startup bundle */
  readonly loadMeta: () => Promise<UnitMeta>;
  /** Dynamic import loader for Lazy Loading unit 3D builder on mode switch */
  readonly load: () => Promise<OptimizedUnit>;
}

const metaCache = new Map<string, UnitMeta>();

function makeLazyJsonMetaLoader(
  unitId: string,
  importer: () => Promise<{ default: Record<string, unknown> }>
): () => Promise<UnitMeta> {
  return async (): Promise<UnitMeta> => {
    const cached = metaCache.get(unitId);
    if (cached) return cached;
    const mod = await importer();
    const data = mod.default as {
      unitId: string;
      version: string;
      nameJa: string;
      nameEn: string;
      declaredPartCount: number;
      maxDrawCallsBudget?: number;
      budgetRationale?: string;
      parts: readonly UnitPartMeta[];
    };
    const meta: UnitMeta = {
      unitId: data.unitId,
      version: data.version,
      nameJa: data.nameJa,
      nameEn: data.nameEn,
      declaredPartCount: data.declaredPartCount,
      maxDrawCallsBudget: data.maxDrawCallsBudget,
      budgetRationale: data.budgetRationale,
      parts: data.parts,
    };
    metaCache.set(unitId, meta);
    return meta;
  };
}

/**
 * Central V2 Optimized Unit Registry.
 * Every registered unit's 3D builder (`src/units/<mode>.ts`) and pure data (`src/data/<mode>.json`)
 * are dynamically imported on demand via `await import()` into independent code-split chunks!
 */
const REGISTRY: Readonly<Record<string, RegisteredUnitEntry>> = Object.freeze({
  welcome: {
    unitId: 'welcome',
    declaredPartCount: 360,
    loadMeta: makeLazyJsonMetaLoader('welcome', () => import('../data/welcome.json')),
    load: async () => (await import('./welcome')).createWelcomeUnit(),
  },
  mishoe: {
    unitId: 'mishoe',
    declaredPartCount: 99,
    loadMeta: makeLazyJsonMetaLoader('mishoe', () => import('../data/mi_shoe.json')),
    load: async () => (await import('./mi_shoe')).createMiShoeUnit(),
  },
  // --- Phase B Batch 1: Standalone Peripherals & Independent Modules ---
  battery: {
    unitId: 'battery',
    declaredPartCount: 130,
    loadMeta: makeLazyJsonMetaLoader('battery', () => import('../data/battery.json')),
    load: async () => (await import('./battery')).createBatteryUnit(),
  },
  cfexpress: {
    unitId: 'cfexpress',
    declaredPartCount: 170,
    loadMeta: makeLazyJsonMetaLoader('cfexpress', () => import('../data/cfexpress.json')),
    load: async () => (await import('./cfexpress')).createCfexpressUnit(),
  },
  mic: {
    unitId: 'mic',
    declaredPartCount: 150,
    loadMeta: makeLazyJsonMetaLoader('mic', () => import('../data/mic.json')),
    load: async () => (await import('./mic')).createMicUnit(),
  },
  drybox: {
    unitId: 'drybox',
    declaredPartCount: 186,
    loadMeta: makeLazyJsonMetaLoader('drybox', () => import('../data/drybox.json')),
    load: async () => (await import('./drybox')).createDryboxUnit(),
  },
  // --- Phase B Batch 2: Optics, Exterior & Mechanical Subsystems ---
  mount: {
    unitId: 'mount',
    declaredPartCount: 100,
    loadMeta: makeLazyJsonMetaLoader('mount', () => import('../data/mount.json')),
    load: async () => (await import('./mount')).createMountUnit(),
  },
  shutter: {
    unitId: 'shutter',
    declaredPartCount: 180,
    loadMeta: makeLazyJsonMetaLoader('shutter', () => import('../data/shutter.json')),
    load: async () => (await import('./shutter')).createShutterUnit(),
  },
  body: {
    unitId: 'body',
    declaredPartCount: 116,
    loadMeta: makeLazyJsonMetaLoader('body', () => import('../data/body.json')),
    load: async () => (await import('./body')).createBodyUnit(),
  },
  evf: {
    unitId: 'evf',
    declaredPartCount: 105,
    loadMeta: makeLazyJsonMetaLoader('evf', () => import('../data/evf.json')),
    load: async () => (await import('./evf')).createEvfUnit(),
  },
  lcd: {
    unitId: 'lcd',
    declaredPartCount: 150,
    loadMeta: makeLazyJsonMetaLoader('lcd', () => import('../data/lcd.json')),
    load: async () => (await import('./lcd')).createLcdUnit(),
  },
  lens: {
    unitId: 'lens',
    declaredPartCount: 128,
    loadMeta: makeLazyJsonMetaLoader('lens', () => import('../data/lens.json')),
    load: async () => (await import('./lens')).createLensUnit(),
  },
  // --- Phase B Batch 3: Mainboard & Image Processing Engine (V1 / V2) ---
  mainboard: {
    unitId: 'mainboard',
    declaredPartCount: 60,
    loadMeta: makeLazyJsonMetaLoader('mainboard', () => import('../data/mainboard.json')),
    load: async () => (await import('./mainboard')).createMainboardUnit(),
  },
  bionz: {
    unitId: 'bionz',
    declaredPartCount: 70,
    loadMeta: makeLazyJsonMetaLoader('bionz', () => import('../data/bionz.json')),
    load: async () => (await import('./bionz')).createBionzUnit(),
  },
  bionz_v2: {
    unitId: 'bionz_v2',
    declaredPartCount: 105,
    loadMeta: makeLazyJsonMetaLoader('bionz_v2', () => import('../data/bionz_v2.json')),
    load: async () => (await import('./bionz_v2')).createBionzV2Unit(),
  },
  // --- Phase B Batch 4: Full-Frame Sensor, Micro Pixel (V1 / V2) & 6-Volume Semiconductor Fab ---
  sensor: {
    unitId: 'sensor',
    declaredPartCount: 120,
    loadMeta: makeLazyJsonMetaLoader('sensor', () => import('../data/sensor.json')),
    load: async () => (await import('./sensor')).createSensorUnit(),
  },
  micro: {
    unitId: 'micro',
    declaredPartCount: 75,
    loadMeta: makeLazyJsonMetaLoader('micro', () => import('../data/micro.json')),
    load: async () => (await import('./micro')).createMicroUnit(),
  },
  micro_v2: {
    unitId: 'micro_v2',
    declaredPartCount: 55,
    loadMeta: makeLazyJsonMetaLoader('micro_v2', () => import('../data/micro_v2.json')),
    load: async () => (await import('./micro_v2')).createMicroV2Unit(),
  },
  sensor_fab: {
    unitId: 'sensor_fab',
    declaredPartCount: 235,
    loadMeta: makeLazyJsonMetaLoader('sensor_fab', () => import('../data/sensor_fab.json')),
    load: async () => (await import('./sensor_fab')).createSensorFabUnit(),
  },
  // --- Phase FH: Future History MIRAI 2028 (8 Watchmaker 3D Structures: FH01/02/08/32/25/20/17/48 = 140p) ---
  mirai_2028: {
    unitId: 'mirai_2028',
    declaredPartCount: 140,
    loadMeta: makeLazyJsonMetaLoader('mirai_2028', () => import('../data/mirai_2028.json')),
    load: async () => (await import('./mirai_2028')).createMirai2028Unit(),
  },
  // --- Phase C: Composite Macro Camera Modes (All 8 / 7 Core Subsystems) ---
  integrated: {
    unitId: 'integrated',
    declaredPartCount: 305,
    loadMeta: makeLazyJsonMetaLoader('integrated', () => import('../data/integrated.json')),
    load: async () => (await import('./integrated')).createIntegratedUnit(),
  },
  camera_body: {
    unitId: 'camera_body',
    declaredPartCount: 231,
    loadMeta: makeLazyJsonMetaLoader('camera_body', () => import('../data/camera_body.json')),
    load: async () => (await import('./camera_body')).createCameraBodyUnit(),
  },
});

export function hasRegisteredUnit(unitId: string): boolean {
  return Object.prototype.hasOwnProperty.call(REGISTRY, unitId);
}

export function listRegisteredUnits(): readonly RegisteredUnitEntry[] {
  return Object.values(REGISTRY);
}

export async function loadRegisteredUnitMeta(unitId: string): Promise<UnitMeta | null> {
  const entry = REGISTRY[unitId];
  return entry ? entry.loadMeta() : null;
}

export async function loadRegisteredUnit(unitId: string): Promise<OptimizedUnit> {
  const entry = REGISTRY[unitId];
  if (!entry) {
    throw new Error(`Unit '${unitId}' is not registered in V2 registry.`);
  }
  return entry.load();
}
