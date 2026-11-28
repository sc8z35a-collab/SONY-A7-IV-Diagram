/**
 * PLYA V2 (EXAM-Inherited) — Browser-Side Single-Source Material Physics Database
 * Synchronized directly with THE LAST EXAM V1 (`scripts/exam/shared/material_physics_db.mjs`).
 */

import type { CatalogPartEntry } from '../PartGeometryExtractor';

export interface MaterialPhysicsRecord {
  readonly preset: string;
  readonly name: string;
  readonly rho: number;       // g/cm³
  readonly E: number;         // MPa
  readonly nu: number;        // -
  readonly sy: number;        // MPa (yield / allowable)
  readonly su: number;        // MPa (ultimate / fracture)
  readonly se: number;        // MPa (endurance @ 1e7)
  readonly k: number;         // W/(m·K)
  readonly cp: number;        // J/(kg·K)
  readonly cte: number;       // ppm/K
  readonly eps: number;       // emissivity
  readonly rhoE: number;      // Ω·m
  readonly n: number;         // refractive index (0 if opaque)
  readonly eGalv: number | null; // V vs SCE (null if insulator)
  readonly tMaxC: number;     // °C
  readonly tmlPct: number;    // ASTM E595 TML %
  readonly cvcmPct: number;   // ASTM E595 CVCM %
  readonly mu: number;        // static friction
  readonly brittle: boolean;
  readonly mfgClass: 'cnc_metal' | 'cast_metal' | 'sheet_metal' | 'pcb' | 'optical_glass' | 'silicon' | 'elastomer' | 'polymer' | 'ceramic' | 'composite';
}

export const PG_MATERIAL_PRESETS: Readonly<Record<string, MaterialPhysicsRecord>> = Object.freeze({
  a6061_t6: {
    preset: 'a6061_t6', name: 'Al 6061-T6 CNC', rho: 2.70, E: 68900, nu: 0.33, sy: 276, su: 310, se: 96.5,
    k: 167, cp: 896, cte: 23.6, eps: 0.82, rhoE: 3.99e-8, n: 0, eGalv: -0.90, tMaxC: 150, tmlPct: 0, cvcmPct: 0, mu: 0.42, brittle: false, mfgClass: 'cnc_metal',
  },
  az91d_mg: {
    preset: 'az91d_mg', name: 'AZ91D Magnesium Alloy', rho: 1.81, E: 45000, nu: 0.35, sy: 160, su: 230, se: 70,
    k: 72, cp: 1050, cte: 26.0, eps: 0.85, rhoE: 1.41e-7, n: 0, eGalv: -1.60, tMaxC: 125, tmlPct: 0, cvcmPct: 0, mu: 0.38, brittle: false, mfgClass: 'cast_metal',
  },
  ti6al4v: {
    preset: 'ti6al4v', name: 'Ti-6Al-4V Grade 5', rho: 4.43, E: 113800, nu: 0.34, sy: 880, su: 950, se: 510,
    k: 6.7, cp: 526, cte: 8.6, eps: 0.45, rhoE: 1.78e-6, n: 0, eGalv: -0.15, tMaxC: 400, tmlPct: 0, cvcmPct: 0, mu: 0.36, brittle: false, mfgClass: 'cnc_metal',
  },
  sus304: {
    preset: 'sus304', name: 'SUS304 Stainless Steel', rho: 7.90, E: 193000, nu: 0.29, sy: 215, su: 505, se: 240,
    k: 16.2, cp: 500, cte: 17.3, eps: 0.35, rhoE: 7.2e-7, n: 0, eGalv: -0.50, tMaxC: 450, tmlPct: 0, cvcmPct: 0, mu: 0.35, brittle: false, mfgClass: 'cnc_metal',
  },
  copper_c1100: {
    preset: 'copper_c1100', name: 'OFHC Copper C1100', rho: 8.96, E: 117000, nu: 0.34, sy: 220, su: 260, se: 90,
    k: 398, cp: 385, cte: 16.5, eps: 0.25, rhoE: 1.72e-8, n: 0, eGalv: -0.35, tMaxC: 200, tmlPct: 0, cvcmPct: 0, mu: 0.45, brittle: false, mfgClass: 'cnc_metal',
  },
  brass_c3604: {
    preset: 'brass_c3604', name: 'Brass C3604', rho: 8.50, E: 97000, nu: 0.34, sy: 310, su: 400, se: 150,
    k: 115, cp: 380, cte: 20.5, eps: 0.28, rhoE: 6.6e-8, n: 0, eGalv: -0.40, tMaxC: 200, tmlPct: 0, cvcmPct: 0, mu: 0.32, brittle: false, mfgClass: 'cnc_metal',
  },
  w80cu20: {
    preset: 'w80cu20', name: 'W80Cu20 Counterweight', rho: 15.6, E: 260000, nu: 0.30, sy: 550, su: 650, se: 240,
    k: 210, cp: 185, cte: 8.3, eps: 0.40, rhoE: 5.5e-8, n: 0, eGalv: -0.35, tMaxC: 400, tmlPct: 0, cvcmPct: 0, mu: 0.38, brittle: false, mfgClass: 'cnc_metal',
  },
  nickel_silver_emi: {
    preset: 'nickel_silver_emi', name: 'CuNi18Zn20 EMI Shield', rho: 8.70, E: 135000, nu: 0.31, sy: 380, su: 520, se: 160,
    k: 33, cp: 400, cte: 16.4, eps: 0.25, rhoE: 2.8e-7, n: 0, eGalv: -0.30, tMaxC: 250, tmlPct: 0, cvcmPct: 0, mu: 0.30, brittle: false, mfgClass: 'sheet_metal',
  },
  fused_silica: {
    preset: 'fused_silica', name: 'Fused Silica Quartz', rho: 2.20, E: 72700, nu: 0.16, sy: 50, su: 55, se: 30,
    k: 1.38, cp: 740, cte: 0.55, eps: 0.90, rhoE: 1e16, n: 1.4585, eGalv: null, tMaxC: 900, tmlPct: 0, cvcmPct: 0, mu: 0.25, brittle: true, mfgClass: 'optical_glass',
  },
  bk7_ed_glass: {
    preset: 'bk7_ed_glass', name: 'Optical ED/XA Glass', rho: 2.52, E: 82000, nu: 0.206, sy: 45, su: 55, se: 25,
    k: 1.11, cp: 858, cte: 7.1, eps: 0.92, rhoE: 1e14, n: 1.5168, eGalv: null, tMaxC: 350, tmlPct: 0, cvcmPct: 0, mu: 0.25, brittle: true, mfgClass: 'optical_glass',
  },
  sapphire_al2o3: {
    preset: 'sapphire_al2o3', name: 'Sapphire Optical Window', rho: 3.98, E: 345000, nu: 0.29, sy: 300, su: 400, se: 180,
    k: 35, cp: 760, cte: 5.3, eps: 0.85, rhoE: 1e15, n: 1.768, eGalv: null, tMaxC: 1000, tmlPct: 0, cvcmPct: 0, mu: 0.18, brittle: true, mfgClass: 'optical_glass',
  },
  pmma_lgp: {
    preset: 'pmma_lgp', name: 'Optical PMMA LGP', rho: 1.19, E: 3200, nu: 0.37, sy: 65, su: 72, se: 25,
    k: 0.19, cp: 1470, cte: 70.0, eps: 0.92, rhoE: 1e15, n: 1.491, eGalv: null, tMaxC: 85, tmlPct: 0.45, cvcmPct: 0.02, mu: 0.35, brittle: false, mfgClass: 'polymer',
  },
  silicon_die: {
    preset: 'silicon_die', name: 'Monocrystalline Silicon', rho: 2.33, E: 165000, nu: 0.22, sy: 170, su: 200, se: 100,
    k: 148, cp: 705, cte: 2.6, eps: 0.70, rhoE: 0.1, n: 3.42, eGalv: null, tMaxC: 125, tmlPct: 0, cvcmPct: 0, mu: 0.25, brittle: true, mfgClass: 'silicon',
  },
  fr4_hdi_pcb: {
    preset: 'fr4_hdi_pcb', name: 'FR-4 High-Tg HDI PCB', rho: 1.90, E: 22000, nu: 0.16, sy: 240, su: 310, se: 80,
    k: 18.0, cp: 1150, cte: 14.5, eps: 0.88, rhoE: 1e13, n: 0, eGalv: null, tMaxC: 130, tmlPct: 0.48, cvcmPct: 0.03, mu: 0.38, brittle: false, mfgClass: 'pcb',
  },
  polyimide_fpc: {
    preset: 'polyimide_fpc', name: 'Kapton Polyimide FPC', rho: 1.42, E: 3200, nu: 0.34, sy: 110, su: 230, se: 65,
    k: 2.5, cp: 1090, cte: 20.0, eps: 0.85, rhoE: 1e15, n: 0, eGalv: null, tMaxC: 200, tmlPct: 0.35, cvcmPct: 0.01, mu: 0.30, brittle: false, mfgClass: 'pcb',
  },
  ic_emc_epoxy: {
    preset: 'ic_emc_epoxy', name: 'IC Epoxy Mold Compound', rho: 1.85, E: 18000, nu: 0.25, sy: 95, su: 120, se: 40,
    k: 1.2, cp: 900, cte: 12.0, eps: 0.90, rhoE: 1e14, n: 0, eGalv: null, tMaxC: 125, tmlPct: 0.25, cvcmPct: 0.02, mu: 0.40, brittle: true, mfgClass: 'polymer',
  },
  epdm_gasket: {
    preset: 'epdm_gasket', name: 'EPDM IP65 Seal Elastomer', rho: 1.25, E: 12, nu: 0.48, sy: 14, su: 18, se: 6,
    k: 0.25, cp: 1900, cte: 160.0, eps: 0.94, rhoE: 1e14, n: 0, eGalv: null, tMaxC: 120, tmlPct: 0.65, cvcmPct: 0.04, mu: 0.85, brittle: false, mfgClass: 'elastomer',
  },
  tim_silicone_pad: {
    preset: 'tim_silicone_pad', name: 'Silicone TIM 6W/mK', rho: 2.60, E: 8, nu: 0.48, sy: 3, su: 5, se: 1.5,
    k: 6.0, cp: 1050, cte: 140.0, eps: 0.92, rhoE: 1e12, n: 0, eGalv: null, tMaxC: 150, tmlPct: 0.55, cvcmPct: 0.05, mu: 0.70, brittle: false, mfgClass: 'elastomer',
  },
  pyro_graphite: {
    preset: 'pyro_graphite', name: 'Pyrolytic Graphite Sheet', rho: 2.10, E: 25000, nu: 0.20, sy: 45, su: 60, se: 25,
    k: 450, cp: 710, cte: 2.0, eps: 0.85, rhoE: 1e-5, n: 0, eGalv: 0.20, tMaxC: 400, tmlPct: 0.02, cvcmPct: 0, mu: 0.15, brittle: false, mfgClass: 'composite',
  },
  cfrp_blade: {
    preset: 'cfrp_blade', name: 'CFRP Carbon Blade', rho: 1.60, E: 140000, nu: 0.28, sy: 650, su: 850, se: 320,
    k: 12, cp: 900, cte: 1.5, eps: 0.88, rhoE: 1e-4, n: 0, eGalv: 0.15, tMaxC: 160, tmlPct: 0.20, cvcmPct: 0.02, mu: 0.25, brittle: false, mfgClass: 'composite',
  },
  pa66_gf30: {
    preset: 'pa66_gf30', name: 'PA66-GF30 Polymer', rho: 1.36, E: 8500, nu: 0.36, sy: 140, su: 175, se: 55,
    k: 0.32, cp: 1500, cte: 30.0, eps: 0.92, rhoE: 1e13, n: 0, eGalv: null, tMaxC: 140, tmlPct: 0.50, cvcmPct: 0.03, mu: 0.30, brittle: false, mfgClass: 'polymer',
  },
  lifepo4_cell: {
    preset: 'lifepo4_cell', name: 'Li-Ion / LiFePO4 Cell', rho: 2.35, E: 15000, nu: 0.32, sy: 60, su: 90, se: 30,
    k: 4.5, cp: 1050, cte: 20.0, eps: 0.85, rhoE: 1e6, n: 0, eGalv: -0.80, tMaxC: 60, tmlPct: 0.20, cvcmPct: 0.01, mu: 0.35, brittle: false, mfgClass: 'composite',
  },
});

export function resolvePlaygroundMaterial(entry: Pick<CatalogPartEntry, 'partId' | 'title' | 'subtitle' | 'category' | 'role'>): MaterialPhysicsRecord {
  const hay = `${entry.partId} ${entry.title} ${entry.subtitle} ${entry.category}`.toLowerCase();
  if (/tungsten|bottom-weight|counterweight|w80/.test(hay)) return PG_MATERIAL_PRESETS.w80cu20;
  if (/vapor|heatpipe|copper|busbar|coil|spreader/.test(hay)) return PG_MATERIAL_PRESETS.copper_c1100;
  if (/graphite/.test(hay)) return PG_MATERIAL_PRESETS.pyro_graphite;
  if (/tim|thermal-pad|thermal-sheet/.test(hay)) return PG_MATERIAL_PRESETS.tim_silicone_pad;
  if (/emi|shield|can/.test(hay)) return PG_MATERIAL_PRESETS.nickel_silver_emi;
  if (/brass|collar|bushing/.test(hay)) return PG_MATERIAL_PRESETS.brass_c3604;
  if (/titanium|ti6/.test(hay)) return PG_MATERIAL_PRESETS.ti6al4v;
  if (/stainless|steel|flange|bayonet|screw|bolt|dowel|pin|shaft/.test(hay)) return PG_MATERIAL_PRESETS.sus304;
  if (/carbon|cfrp|shutter-blade/.test(hay)) return PG_MATERIAL_PRESETS.cfrp_blade;
  if (/sapphire/.test(hay)) return PG_MATERIAL_PRESETS.sapphire_al2o3;
  if (/quartz|silica|olpf/.test(hay)) return PG_MATERIAL_PRESETS.fused_silica;
  if (/lgp|pmma|diffuser|backlight/.test(hay)) return PG_MATERIAL_PRESETS.pmma_lgp;
  if (/glass|lens|prism|window|ed-|xa-|filter/.test(hay)) return PG_MATERIAL_PRESETS.bk7_ed_glass;
  if (/silicon|cmos|sensor-die|bionz|isp|npu|dram|wafer/.test(hay)) return PG_MATERIAL_PRESETS.silicon_die;
  if (/fpc|flex|kapton/.test(hay)) return PG_MATERIAL_PRESETS.polyimide_fpc;
  if (/pcb|board|mainboard|mcpcb|substrate/.test(hay)) return PG_MATERIAL_PRESETS.fr4_hdi_pcb;
  if (/gasket|seal|oring|o-ring|rubber|boot|foot|feet|damper|grip|eyecup/.test(hay)) return PG_MATERIAL_PRESETS.epdm_gasket;
  if (/battery|lifepo4|np-fz100|cell|supercap/.test(hay)) return PG_MATERIAL_PRESETS.lifepo4_cell;
  if (/magnesium|az91|mg-|body-shell|finned-backplate/.test(hay)) return PG_MATERIAL_PRESETS.az91d_mg;
  if (/cnc-chassis|aluminum|datum-plate|heatsink|barrel/.test(hay)) return PG_MATERIAL_PRESETS.a6061_t6;
  if (/ic|mcu|pmic|canfd|dac|amp|tof|lux|wifi|ble|connector/.test(hay)) return PG_MATERIAL_PRESETS.ic_emc_epoxy;

  // Fallback by engineering role
  switch (entry.role) {
    case 'body': return PG_MATERIAL_PRESETS.az91d_mg;
    case 'mount': return PG_MATERIAL_PRESETS.sus304;
    case 'lens': return PG_MATERIAL_PRESETS.bk7_ed_glass;
    case 'shutter': return PG_MATERIAL_PRESETS.cfrp_blade;
    case 'sensor': return PG_MATERIAL_PRESETS.silicon_die;
    case 'bionz': return PG_MATERIAL_PRESETS.silicon_die;
    case 'mainboard': return PG_MATERIAL_PRESETS.fr4_hdi_pcb;
    case 'battery': return PG_MATERIAL_PRESETS.lifepo4_cell;
    case 'thermal_emi': return PG_MATERIAL_PRESETS.copper_c1100;
    case 'sculpture': return PG_MATERIAL_PRESETS.a6061_t6;
    default: return PG_MATERIAL_PRESETS.pa66_gf30;
  }
}

export function computeGalvanicDeltaV(a: MaterialPhysicsRecord, b: MaterialPhysicsRecord): number | null {
  if (a.eGalv === null || b.eGalv === null) return null;
  return Math.abs(a.eGalv - b.eGalv);
}
