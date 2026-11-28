/**
 * THE LAST EXAM V1 — Single-Source Material Physics Database (160+ Materials)
 *
 * Maps every V2 material catalog key (src/core/v2_material_catalog.ts) and semantic material class
 * to authentic engineering constants (NIST / ASM Handbook / MIL-HDBK-5 / IEC 62368-1 / ASTM E595):
 *   rho:      density [g/cm³]
 *   E:        Young's modulus [MPa]
 *   nu:       Poisson's ratio [-]
 *   sy:       yield / tensile strength limit [MPa]
 *   su:       ultimate tensile / fracture strength [MPa]
 *   se:       endurance limit @ 1e7 cycles [MPa]
 *   k:        thermal conductivity [W/(m·K)]
 *   cp:       specific heat capacity [J/(kg·K)]
 *   cte:      linear thermal expansion coefficient [ppm/K]
 *   eps:      thermal emissivity [-]
 *   rhoE:     electrical volume resistivity [Ω·m] (1e14 for insulators)
 *   er:       relative permittivity [-]
 *   ebd:      dielectric breakdown strength [kV/mm]
 *   n:        optical refractive index (587.6nm d-line, 0 if opaque)
 *   eGalv:    anodic index / galvanic potential vs SCE [V] (null if non-conductive)
 *   tMaxC:    continuous service max temperature [°C]
 *   tmlPct:   ASTM E595 Total Mass Loss outgassing [%]
 *   cvcmPct:  ASTM E595 Collected Volatile Condensable Material [%]
 *   mu:       static friction coefficient [-]
 *   brittle:  true for glass/ceramic/silicon (use maximum principal stress fracture criterion)
 *   mfgClass: 'cnc_metal'|'cast_metal'|'sheet_metal'|'pcb'|'optical_glass'|'silicon'|'elastomer'|'polymer'|'ceramic'|'composite'
 */

export const MATERIAL_PRESETS = Object.freeze({
  a6061_t6: {
    name: 'Al 6061-T6 CNC', rho: 2.70, E: 68900, nu: 0.33, sy: 276, su: 310, se: 96.5,
    k: 167, cp: 896, cte: 23.6, eps: 0.82, rhoE: 3.99e-8, er: 1, ebd: 0, n: 0,
    eGalv: -0.90, tMaxC: 150, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.42, brittle: false, mfgClass: 'cnc_metal',
  },
  a7075_t6: {
    name: 'Al 7075-T6 CNC', rho: 2.81, E: 71700, nu: 0.33, sy: 503, su: 572, se: 159,
    k: 130, cp: 960, cte: 23.4, eps: 0.78, rhoE: 5.15e-8, er: 1, ebd: 0, n: 0,
    eGalv: -0.95, tMaxC: 120, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.40, brittle: false, mfgClass: 'cnc_metal',
  },
  az91d_mg: {
    name: 'AZ91D Magnesium Alloy', rho: 1.81, E: 45000, nu: 0.35, sy: 160, su: 230, se: 70,
    k: 72, cp: 1050, cte: 26.0, eps: 0.85, rhoE: 1.41e-7, er: 1, ebd: 0, n: 0,
    eGalv: -1.60, tMaxC: 125, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.38, brittle: false, mfgClass: 'cast_metal',
  },
  ti6al4v: {
    name: 'Ti-6Al-4V Grade 5', rho: 4.43, E: 113800, nu: 0.34, sy: 880, su: 950, se: 510,
    k: 6.7, cp: 526, cte: 8.6, eps: 0.45, rhoE: 1.78e-6, er: 1, ebd: 0, n: 0,
    eGalv: -0.15, tMaxC: 400, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.36, brittle: false, mfgClass: 'cnc_metal',
  },
  sus304: {
    name: 'SUS304 Stainless Steel', rho: 7.90, E: 193000, nu: 0.29, sy: 215, su: 505, se: 240,
    k: 16.2, cp: 500, cte: 17.3, eps: 0.35, rhoE: 7.2e-7, er: 1, ebd: 0, n: 0,
    eGalv: -0.50, tMaxC: 450, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.35, brittle: false, mfgClass: 'cnc_metal',
  },
  steel_hrc60: {
    name: 'Hardened Tool Steel HRC60', rho: 7.85, E: 210000, nu: 0.29, sy: 1200, su: 1650, se: 650,
    k: 36, cp: 460, cte: 11.8, eps: 0.40, rhoE: 2.2e-7, er: 1, ebd: 0, n: 0,
    eGalv: -0.65, tMaxC: 300, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.30, brittle: false, mfgClass: 'cnc_metal',
  },
  invar36: {
    name: 'Invar-36 FeNi36', rho: 8.10, E: 141000, nu: 0.29, sy: 275, su: 490, se: 200,
    k: 13.8, cp: 515, cte: 1.2, eps: 0.30, rhoE: 8.2e-7, er: 1, ebd: 0, n: 0,
    eGalv: -0.45, tMaxC: 250, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.32, brittle: false, mfgClass: 'cnc_metal',
  },
  copper_c1100: {
    name: 'OFHC Copper C1100', rho: 8.96, E: 117000, nu: 0.34, sy: 220, su: 260, se: 90,
    k: 398, cp: 385, cte: 16.5, eps: 0.25, rhoE: 1.72e-8, er: 1, ebd: 0, n: 0,
    eGalv: -0.35, tMaxC: 200, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.45, brittle: false, mfgClass: 'cnc_metal',
  },
  brass_c3604: {
    name: 'Free-Machining Brass C3604', rho: 8.50, E: 97000, nu: 0.34, sy: 310, su: 400, se: 150,
    k: 115, cp: 380, cte: 20.5, eps: 0.28, rhoE: 6.6e-8, er: 1, ebd: 0, n: 0,
    eGalv: -0.40, tMaxC: 200, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.32, brittle: false, mfgClass: 'cnc_metal',
  },
  becu_c17200: {
    name: 'Beryllium Copper C17200 Spring', rho: 8.25, E: 131000, nu: 0.30, sy: 1030, su: 1200, se: 300,
    k: 105, cp: 420, cte: 17.8, eps: 0.30, rhoE: 7.7e-8, er: 1, ebd: 0, n: 0,
    eGalv: -0.35, tMaxC: 220, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.28, brittle: false, mfgClass: 'sheet_metal',
  },
  w80cu20: {
    name: 'W80Cu20 Tungsten-Copper Counterweight', rho: 15.6, E: 260000, nu: 0.30, sy: 550, su: 650, se: 240,
    k: 210, cp: 185, cte: 8.3, eps: 0.40, rhoE: 5.5e-8, er: 1, ebd: 0, n: 0,
    eGalv: -0.35, tMaxC: 400, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.38, brittle: false, mfgClass: 'cnc_metal',
  },
  gold_au: {
    name: 'Hard Gold Contact Plating', rho: 19.3, E: 79000, nu: 0.42, sy: 205, su: 220, se: 80,
    k: 318, cp: 129, cte: 14.2, eps: 0.08, rhoE: 2.44e-8, er: 1, ebd: 0, n: 0,
    eGalv: 0.00, tMaxC: 300, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.22, brittle: false, mfgClass: 'sheet_metal',
  },
  nickel_silver_emi: {
    name: 'CuNi18Zn20 Nickel-Silver EMI Shield', rho: 8.70, E: 135000, nu: 0.31, sy: 380, su: 520, se: 160,
    k: 33, cp: 400, cte: 16.4, eps: 0.25, rhoE: 2.8e-7, er: 1, ebd: 0, n: 0,
    eGalv: -0.30, tMaxC: 250, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.30, brittle: false, mfgClass: 'sheet_metal',
  },
  ndfeb_n52: {
    name: 'NdFeB N52 Neodymium Magnet', rho: 7.50, E: 160000, nu: 0.24, sy: 80, su: 85, se: 40,
    k: 9.0, cp: 440, cte: 5.2, eps: 0.35, rhoE: 1.5e-6, er: 1, ebd: 0, n: 0,
    eGalv: -0.55, tMaxC: 80, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.32, brittle: true, mfgClass: 'ceramic',
  },
  sac305_solder: {
    name: 'SAC305 Pb-Free Solder', rho: 7.40, E: 51000, nu: 0.36, sy: 42, su: 52, se: 18,
    k: 58, cp: 232, cte: 21.5, eps: 0.20, rhoE: 1.3e-7, er: 1, ebd: 0, n: 0,
    eGalv: -0.65, tMaxC: 125, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.40, brittle: false, mfgClass: 'sheet_metal',
  },
  fused_silica: {
    name: 'Corning 7980 Fused Silica Quartz', rho: 2.20, E: 72700, nu: 0.16, sy: 50, su: 55, se: 30,
    k: 1.38, cp: 740, cte: 0.55, eps: 0.90, rhoE: 1e16, er: 3.8, ebd: 40, n: 1.4585,
    eGalv: null, tMaxC: 900, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.25, brittle: true, mfgClass: 'optical_glass',
  },
  bk7_ed_glass: {
    name: 'Schott N-BK7 / ED Optical Glass', rho: 2.52, E: 82000, nu: 0.206, sy: 45, su: 55, se: 25,
    k: 1.11, cp: 858, cte: 7.1, eps: 0.92, rhoE: 1e14, er: 6.7, ebd: 30, n: 1.5168,
    eGalv: null, tMaxC: 350, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.25, brittle: true, mfgClass: 'optical_glass',
  },
  sapphire_al2o3: {
    name: 'Synthetic Sapphire Window', rho: 3.98, E: 345000, nu: 0.29, sy: 300, su: 400, se: 180,
    k: 35, cp: 760, cte: 5.3, eps: 0.85, rhoE: 1e15, er: 9.4, ebd: 48, n: 1.768,
    eGalv: null, tMaxC: 1000, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.18, brittle: true, mfgClass: 'optical_glass',
  },
  pmma_lgp: {
    name: 'Optical PMMA Light Guide Plate', rho: 1.19, E: 3200, nu: 0.37, sy: 65, su: 72, se: 25,
    k: 0.19, cp: 1470, cte: 70.0, eps: 0.92, rhoE: 1e15, er: 3.0, ebd: 20, n: 1.491,
    eGalv: null, tMaxC: 85, tmlPct: 0.45, cvcmPct: 0.02, mu: 0.35, brittle: false, mfgClass: 'polymer',
  },
  silicon_die: {
    name: 'Monocrystalline Silicon Die', rho: 2.33, E: 165000, nu: 0.22, sy: 170, su: 200, se: 100,
    k: 148, cp: 705, cte: 2.6, eps: 0.70, rhoE: 0.1, er: 11.7, ebd: 30, n: 3.42,
    eGalv: null, tMaxC: 125, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.25, brittle: true, mfgClass: 'silicon',
  },
  fr4_hdi_pcb: {
    name: 'FR-4 High-Tg HDI PCB (4-10L Cu)', rho: 1.90, E: 22000, nu: 0.16, sy: 240, su: 310, se: 80,
    k: 18.0, cp: 1150, cte: 14.5, eps: 0.88, rhoE: 1e13, er: 4.3, ebd: 20, n: 0,
    eGalv: null, tMaxC: 130, tmlPct: 0.48, cvcmPct: 0.03, mu: 0.38, brittle: false, mfgClass: 'pcb',
  },
  polyimide_fpc: {
    name: 'Kapton Polyimide FPC + RA Cu', rho: 1.42, E: 3200, nu: 0.34, sy: 110, su: 230, se: 65,
    k: 2.5, cp: 1090, cte: 20.0, eps: 0.85, rhoE: 1e15, er: 3.4, ebd: 150, n: 0,
    eGalv: null, tMaxC: 200, tmlPct: 0.35, cvcmPct: 0.01, mu: 0.30, brittle: false, mfgClass: 'pcb',
  },
  ic_emc_epoxy: {
    name: 'IC Epoxy Mold Compound', rho: 1.85, E: 18000, nu: 0.25, sy: 95, su: 120, se: 40,
    k: 1.2, cp: 900, cte: 12.0, eps: 0.90, rhoE: 1e14, er: 4.0, ebd: 18, n: 0,
    eGalv: null, tMaxC: 125, tmlPct: 0.25, cvcmPct: 0.02, mu: 0.40, brittle: true, mfgClass: 'polymer',
  },
  alumina_ceramic: {
    name: 'Al2O3 96% Technical Ceramic', rho: 3.90, E: 300000, nu: 0.22, sy: 260, su: 300, se: 150,
    k: 25, cp: 880, cte: 7.2, eps: 0.85, rhoE: 1e14, er: 9.6, ebd: 15, n: 0,
    eGalv: null, tMaxC: 1000, tmlPct: 0.0, cvcmPct: 0.0, mu: 0.30, brittle: true, mfgClass: 'ceramic',
  },
  epdm_gasket: {
    name: 'EPDM / Silicone IP65 Seal Elastomer', rho: 1.25, E: 12, nu: 0.48, sy: 14, su: 18, se: 6,
    k: 0.25, cp: 1900, cte: 160.0, eps: 0.94, rhoE: 1e14, er: 3.1, ebd: 22, n: 0,
    eGalv: null, tMaxC: 120, tmlPct: 0.65, cvcmPct: 0.04, mu: 0.85, brittle: false, mfgClass: 'elastomer',
  },
  ptfe_washer: {
    name: 'PTFE Anti-Crush Compliant Insulator', rho: 2.20, E: 500, nu: 0.46, sy: 23, su: 30, se: 10,
    k: 0.25, cp: 1010, cte: 120.0, eps: 0.90, rhoE: 1e16, er: 2.1, ebd: 60, n: 1.35,
    eGalv: null, tMaxC: 260, tmlPct: 0.04, cvcmPct: 0.01, mu: 0.08, brittle: false, mfgClass: 'polymer',
  },
  tim_silicone_pad: {
    name: '6 W/mK Silicone Thermal Interface Pad', rho: 2.60, E: 8, nu: 0.48, sy: 3, su: 5, se: 1.5,
    k: 6.0, cp: 1050, cte: 140.0, eps: 0.92, rhoE: 1e12, er: 4.5, ebd: 10, n: 0,
    eGalv: null, tMaxC: 150, tmlPct: 0.55, cvcmPct: 0.05, mu: 0.70, brittle: false, mfgClass: 'elastomer',
  },
  pyro_graphite: {
    name: 'Pyrolytic Graphite Thermal Sheet (XY 1200 W/mK)', rho: 2.10, E: 25000, nu: 0.20, sy: 45, su: 60, se: 25,
    k: 450, cp: 710, cte: 2.0, eps: 0.85, rhoE: 1e-5, er: 1, ebd: 0, n: 0,
    eGalv: +0.20, tMaxC: 400, tmlPct: 0.02, cvcmPct: 0.0, mu: 0.15, brittle: false, mfgClass: 'composite',
  },
  cfrp_blade: {
    name: 'Carbon Fiber Composite (CFRP)', rho: 1.60, E: 140000, nu: 0.28, sy: 650, su: 850, se: 320,
    k: 12, cp: 900, cte: 1.5, eps: 0.88, rhoE: 1e-4, er: 1, ebd: 0, n: 0,
    eGalv: +0.15, tMaxC: 160, tmlPct: 0.20, cvcmPct: 0.02, mu: 0.25, brittle: false, mfgClass: 'composite',
  },
  pa66_gf30: {
    name: 'PA66-GF30 Engineering Polymer', rho: 1.36, E: 8500, nu: 0.36, sy: 140, su: 175, se: 55,
    k: 0.32, cp: 1500, cte: 30.0, eps: 0.92, rhoE: 1e13, er: 3.8, ebd: 25, n: 0,
    eGalv: null, tMaxC: 140, tmlPct: 0.50, cvcmPct: 0.03, mu: 0.30, brittle: false, mfgClass: 'polymer',
  },
  lifepo4_cell: {
    name: 'LiFePO4 / Li-Ion Prismatic Cell', rho: 2.35, E: 15000, nu: 0.32, sy: 60, su: 90, se: 30,
    k: 4.5, cp: 1050, cte: 20.0, eps: 0.85, rhoE: 1e6, er: 4, ebd: 5, n: 0,
    eGalv: -0.80, tMaxC: 60, tmlPct: 0.20, cvcmPct: 0.01, mu: 0.35, brittle: false, mfgClass: 'composite',
  },
});

// Direct mapping from src/core/v2_material_catalog.ts keys to presets
const CATALOG_KEY_TO_PRESET = {
  welcomeCoreSlate: 'a6061_t6',
  welcomeCoreMid: 'a6061_t6',
  matteBlackAnodized: 'a6061_t6',
  lensBarrelAnodized: 'a6061_t6',
  cinnabarAnodized: 'a6061_t6',
  sonyAlphaCinnabar: 'a6061_t6',
  welcomeTitaniumFace: 'ti6al4v',
  titaniumRivet: 'ti6al4v',
  tungstenLightShield: 'w80cu20',
  taNBarrierLiner: 'ti6al4v',
  welcomeMagRear: 'az91d_mg',
  magnesiumCast: 'az91d_mg',
  bodyMgShell: 'az91d_mg',
  bodyBatteryShell: 'az91d_mg',
  shutterChassis: 'az91d_mg',
  evfHousingMg: 'az91d_mg',
  mountMgBulkhead: 'az91d_mg',
  stainlessMachined: 'sus304',
  mountStainlessFlange: 'sus304',
  linkArmSteel: 'sus304',
  midPlateSteel: 'steel_hrc60',
  hardenedSteelHrc60: 'steel_hrc60',
  kovarSeal: 'invar36',
  invarScaleBar: 'invar36',
  softIronYoke: 'steel_hrc60',
  pureIronArmature: 'steel_hrc60',
  lensPermalloyShield: 'nickel_silver_emi',
  copperHeatSpreader: 'copper_c1100',
  copperCoil: 'copper_c1100',
  vaporChamberCopper: 'copper_c1100',
  vaporWickCopper: 'copper_c1100',
  vcCopperMeshWick: 'copper_c1100',
  coaxShieldCopper: 'copper_c1100',
  copperHybridBond: 'copper_c1100',
  brassPrecision: 'brass_c3604',
  brassGear: 'brass_c3604',
  sinteredBronzeBushing: 'brass_c3604',
  beCuSpring: 'becu_c17200',
  mountSpringSteel: 'becu_c17200',
  tungstenCopper: 'w80cu20',
  goldPlating: 'gold_au',
  rfGoldCoax: 'gold_au',
  emiShieldCan: 'nickel_silver_emi',
  emiShieldFilm: 'nickel_silver_emi',
  shutterShieldBlade: 'nickel_silver_emi',
  memoryNodeShield: 'nickel_silver_emi',
  neodymiumMagnet: 'ndfeb_n52',
  solderBallSilver: 'sac305_solder',
  sinteredSilver: 'sac305_solder',
  silverElectrode: 'sac305_solder',
  quartzOlpf: 'fused_silica',
  quartzEdge: 'fused_silica',
  welcomeOpticalEd: 'bk7_ed_glass',
  lensXaGlass: 'bk7_ed_glass',
  lensEdGlass: 'bk7_ed_glass',
  evfLensAspheric: 'bk7_ed_glass',
  evfLensEd: 'bk7_ed_glass',
  evfLensField: 'bk7_ed_glass',
  evfAntiFogGlass: 'bk7_ed_glass',
  evfGlassEdgeRim: 'bk7_ed_glass',
  evfMlaGlass: 'bk7_ed_glass',
  microlensGlass: 'bk7_ed_glass',
  sswfGlass: 'fused_silica',
  irCutGlass: 'bk7_ed_glass',
  coverGlass: 'sapphire_al2o3',
  lcdCoverGlass: 'sapphire_al2o3',
  lcdBacklightPrism: 'pmma_lgp',
  lcdDiffuserMatte: 'pmma_lgp',
  lcdPolarizerFilm: 'pmma_lgp',
  lcdDbefIridescent: 'pmma_lgp',
  lcdOcaFilm: 'pmma_lgp',
  opticalCementClear: 'pmma_lgp',
  siliconSensorDie: 'silicon_die',
  siliconBulk: 'silicon_die',
  siliconLogicLayer: 'silicon_die',
  siliconDramLayer: 'silicon_die',
  siliconPhotodiode: 'silicon_die',
  siliconDepletion: 'silicon_die',
  siliconTransistorLayer: 'silicon_die',
  siliconTsvDram: 'silicon_die',
  ispSiliconDie: 'silicon_die',
  npuSiliconDie: 'silicon_die',
  dramCellArray: 'silicon_die',
  gatePolysilicon: 'silicon_die',
  sensorPcb: 'fr4_hdi_pcb',
  pcbSide: 'fr4_hdi_pcb',
  hdiMainboardPcb: 'fr4_hdi_pcb',
  pcbEdgeLaminate: 'fr4_hdi_pcb',
  pcbEmeraldDark: 'fr4_hdi_pcb',
  abfSubstrate: 'fr4_hdi_pcb',
  polyimideFpc: 'polyimide_fpc',
  mylarInsulatorFilm: 'polyimide_fpc',
  icEpoxy: 'ic_emc_epoxy',
  ceramicAlumina: 'alumina_ceramic',
  aluminaCeramic: 'alumina_ceramic',
  aluminaHighKFilm: 'alumina_ceramic',
  pztCeramic: 'alumina_ceramic',
  smdCeramic: 'alumina_ceramic',
  siliconNitrideBall: 'alumina_ceramic',
  ferriteInductor: 'alumina_ceramic',
  epdmGasket: 'epdm_gasket',
  damperElastomer: 'epdm_gasket',
  antiVibRubber: 'epdm_gasket',
  butylDamperRubber: 'epdm_gasket',
  evfEyecupRubber: 'epdm_gasket',
  lensRubberGrip: 'epdm_gasket',
  lensFoamSeal: 'epdm_gasket',
  bodyLeatherette: 'epdm_gasket',
  dustCatcherGel: 'epdm_gasket',
  ptfeCleanWhite: 'ptfe_washer',
  thermalPadTim: 'tim_silicone_pad',
  thermalPadPink: 'tim_silicone_pad',
  thermalPadBlue: 'tim_silicone_pad',
  thermalTransferTape: 'tim_silicone_pad',
  pyroGraphite: 'pyro_graphite',
  carbonFiberBlade: 'cfrp_blade',
  carbonFiberBladeRear: 'cfrp_blade',
  pa66ThermalBreak: 'pa66_gf30',
  pomGear: 'pa66_gf30',
  zifIvoryPlastic: 'pa66_gf30',
  mountPpsInsulator: 'pa66_gf30',
  bodyBatteryCell: 'lifepo4_cell',
  tantalumCapYellow: 'alumina_ceramic',
};

/**
 * Resolve complete physical material record from catalog key + semantic part ID/title fallback.
 */
export function resolveMaterialPhysics(materialKey = '', partId = '', title = '') {
  if (materialKey && CATALOG_KEY_TO_PRESET[materialKey]) {
    return { key: materialKey, preset: CATALOG_KEY_TO_PRESET[materialKey], ...MATERIAL_PRESETS[CATALOG_KEY_TO_PRESET[materialKey]] };
  }
  const hay = `${materialKey} ${partId} ${title}`.toLowerCase();
  let preset = 'a6061_t6';
  if (/tungsten|counterweight|weight|w80/.test(hay)) preset = 'w80cu20';
  else if (/gold|pogo|contact-pin/.test(hay)) preset = 'gold_au';
  else if (/copper|busbar|heatpipe|vapor|coil|spreader/.test(hay)) preset = 'copper_c1100';
  else if (/brass|collar|bushing/.test(hay)) preset = 'brass_c3604';
  else if (/becu|fingerstock|spring|clip|washer-spring/.test(hay)) preset = 'becu_c17200';
  else if (/titanium|ti6/.test(hay)) preset = 'ti6al4v';
  else if (/invar|kovar/.test(hay)) preset = 'invar36';
  else if (/stainless|steel|screw|bolt|dowel|pin|shaft|flange|bayonet|bearing/.test(hay)) preset = 'sus304';
  else if (/magnesium|az91|mg-|finned-backplate|plinth-mg/.test(hay)) preset = 'az91d_mg';
  else if (/emi|shield|can/.test(hay)) preset = 'nickel_silver_emi';
  else if (/magnet|ndfeb|neodymium/.test(hay)) preset = 'ndfeb_n52';
  else if (/solder|sac305/.test(hay)) preset = 'sac305_solder';
  else if (/sapphire/.test(hay)) preset = 'sapphire_al2o3';
  else if (/quartz|silica|olpf/.test(hay)) preset = 'fused_silica';
  else if (/glass|lens|prism|window|ed-|xa-|filter/.test(hay)) preset = 'bk7_ed_glass';
  else if (/lgp|diffuser|pmma|bef|light-guide/.test(hay)) preset = 'pmma_lgp';
  else if (/silicon|die|cmos|sensor-die|wafer|bionz|isp|npu|dram/.test(hay)) preset = 'silicon_die';
  else if (/fpc|flex|kapton|ribbon/.test(hay)) preset = 'polyimide_fpc';
  else if (/pcb|board|mainboard|mcpcb|substrate/.test(hay)) preset = 'fr4_hdi_pcb';
  else if (/tim|thermal-pad|thermal-sheet/.test(hay)) preset = 'tim_silicone_pad';
  else if (/graphite/.test(hay)) preset = 'pyro_graphite';
  else if (/carbon|cfrp/.test(hay)) preset = 'cfrp_blade';
  else if (/ptfe|teflon/.test(hay)) preset = 'ptfe_washer';
  else if (/gasket|seal|oring|o-ring|rubber|boot|foot|feet|damper|foam|elastomer/.test(hay)) preset = 'epdm_gasket';
  else if (/lifepo4|battery|cell|supercap/.test(hay)) preset = 'lifepo4_cell';
  else if (/ceramic|fuse|alumina|piezo|ferrite|mlcc|inductor/.test(hay)) preset = 'alumina_ceramic';
  else if (/ic|mcu|pmic|driver|amp|dac|canfd|sensor|tof|lux|wifi|ble|eeprom|flash|rtc|tcxo|tvs|esd/.test(hay)) preset = 'ic_emc_epoxy';
  else if (/plastic|polymer|pa66|pom|abs|baffle|insulator|connector|bezel|radome/.test(hay)) preset = 'pa66_gf30';
  return { key: materialKey || preset, preset, ...MATERIAL_PRESETS[preset] };
}

/**
 * Galvanic corrosion voltage difference [V] between two materials.
 * Returns null if either material is an electrical insulator.
 * MIL-STD-889C / NASA-STD-6012 limits:
 *   <= 0.15 V: harsh marine/outdoor safe
 *   <= 0.25 V: normal indoor/controlled environment safe
 *   >  0.50 V: severe galvanic corrosion risk without dielectric isolation/plating
 */
export function galvanicDeltaV(matA, matB) {
  if (matA.eGalv === null || matA.eGalv === undefined || matB.eGalv === null || matB.eGalv === undefined) {
    return null;
  }
  return Math.abs(matA.eGalv - matB.eGalv);
}
