import * as THREE from 'three';
import { RenderMode } from '../assemblies/types';
import { HeroMaterialSpec, MaterialBucketKey, ResourceCache } from './resource_cache';
import { QualityTier } from './unit_contract';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type V2MaterialLibrary = any;

export interface MaterialBindingSpec {
  readonly bucket: MaterialBucketKey;
  readonly tint: number;
  readonly heroKey?: string;
}

export interface V2MaterialTag {
  readonly bucket: MaterialBucketKey;
  readonly tint: number;
  readonly heroKey?: string;
  readonly heroSpec?: HeroMaterialSpec;
}

export const CORE_MATERIAL_CATALOG: Readonly<Record<string, MaterialBindingSpec>> = {
  welcomeCoreSlate: { bucket: 'matte_black_anodized', tint: 0x364152 },
  welcomeCoreMid: { bucket: 'matte_chassis', tint: 0x4b586e },
  welcomeTitaniumFace: { bucket: 'titanium_machined', tint: 0xe2eaf4 },
  welcomeMagRear: { bucket: 'magnesium_cast', tint: 0x2a3446 },
  sonyAlphaCinnabar: { bucket: 'pin_carrier_gloss', tint: 0xe65a28 },
  welcomeOpticalEd: { bucket: 'optical_glass_ed', tint: 0x60a5fa },
  matteBlackAnodized: { bucket: 'matte_black_anodized', tint: 0x202328 },
  epdmGasket: { bucket: 'magnesium_cast', tint: 0x353840 },
  sswfGlass: { bucket: 'matte_chassis', tint: 0x8fd0f5 },
  pztCeramic: { bucket: 'ic_epoxy_dark', tint: 0xe6decb },
  silverElectrode: { bucket: 'solder_silver', tint: 0xb6c0cc },
  quartzOlpf: { bucket: 'matte_chassis', tint: 0xaadbf0 },
  quartzEdge: { bucket: 'optical_glass_ed', tint: 0x4b93b0 },
  irCutGlass: { bucket: 'matte_chassis', tint: 0x0e94c8 },
  coverGlass: { bucket: 'matte_chassis', tint: 0x9ecbe0 },
  kovarSeal: { bucket: 'stainless_machined', tint: 0x727c8a },
  siliconSensorDie: { bucket: 'silicon_photodiode', tint: 0x1e4d6b },
  siliconBulk: { bucket: 'silicon_hero', tint: 0x2d3542 },
  siliconLogicLayer: { bucket: 'silicon_hero', tint: 0x213a5a },
  siliconDramLayer: { bucket: 'silicon_hero', tint: 0x1c2330 },
  goldPlating: { bucket: 'gold_plating', tint: 0xe2b648 },
  ceramicAlumina: { bucket: 'ic_epoxy_dark', tint: 0x2a2e36 },
  tungstenCopper: { bucket: 'copper_thermal', tint: 0x85664e },
  sensorPcb: { bucket: 'pcb_textured', tint: 0x1b5e47 },
  pcbSide: { bucket: 'pcb_textured', tint: 0x6b6140 },
  smdCeramic: { bucket: 'ic_epoxy_dark', tint: 0x9c7b58 },
  icEpoxy: { bucket: 'ic_epoxy_dark', tint: 0x1d2026 },
  polyimideFpc: { bucket: 'polyimide_fpc', tint: 0xc76414 },
  emiShieldFilm: { bucket: 'emi_shield_metal', tint: 0x242830 },
  magnesiumCast: { bucket: 'magnesium_cast', tint: 0x7c8694 },
  stainlessMachined: { bucket: 'stainless_machined', tint: 0x98a2b0 },
  copperCoil: { bucket: 'copper_coil', tint: 0xc97643 },
  copperHeatSpreader: { bucket: 'copper_thermal', tint: 0xd07447 },
  neodymiumMagnet: { bucket: 'iron_magnetic', tint: 0xd8dee6 },
  softIronYoke: { bucket: 'iron_magnetic', tint: 0x626a75 },
  siliconNitrideBall: { bucket: 'silicon_hero', tint: 0x232730 },
  pyroGraphite: { bucket: 'carbon_fiber', tint: 0x2d343e },
  thermalPadTim: { bucket: 'elastomer_rubber', tint: 0x7aa4b8 },
  microlensGlass: { bucket: 'optical_glass_ed', tint: 0xdcf0ff },
  cfaRed: { bucket: 'optical_glass_ed', tint: 0xdc3a44 },
  cfaGreen: { bucket: 'cfa_gloss_filter', tint: 0x2ca861 },
  cfaBlue: { bucket: 'cfa_gloss_filter', tint: 0x2a6ee0 },
  tungstenGrid: { bucket: 'titanium_machined', tint: 0x565d6a },
  siliconPhotodiode: { bucket: 'membrane_translucent', tint: 0x3b638f },
  siliconDepletion: { bucket: 'silicon_photodiode', tint: 0x5c96d6 },
  ftiOxide: { bucket: 'silicon_dielectric', tint: 0xd4e4f2 },
  siliconTransistorLayer: { bucket: 'membrane_translucent', tint: 0x4b5568 },
  gatePolysilicon: { bucket: 'silicon_hero', tint: 0xd99b38 },
  memoryNodeShield: { bucket: 'emi_shield_metal', tint: 0x262a33 },
  copperHybridBond: { bucket: 'cucu_hybrid_copper', tint: 0xd87342 },
  interlayerDielectric: { bucket: 'silicon_dielectric', tint: 0xdce7f2 },
  dramCellArray: { bucket: 'silicon_hero', tint: 0x2b3648 },
  carbonFiberBlade: { bucket: 'carbon_fiber', tint: 0x2d343e },
  carbonFiberBladeRear: { bucket: 'carbon_fiber', tint: 0xcbd5e4 },
  shutterShieldBlade: { bucket: 'emi_shield_metal', tint: 0x454f5e },
  shutterChassis: { bucket: 'magnesium_cast', tint: 0x2a2e37 },
  midPlateSteel: { bucket: 'stainless_machined', tint: 0x3b424f },
  linkArmSteel: { bucket: 'stainless_machined', tint: 0xbac4d1 },
  brassGear: { bucket: 'brass_precision', tint: 0xd4a948 },
  pomGear: { bucket: 'magnesium_cast', tint: 0xebe6db },
  damperElastomer: { bucket: 'elastomer_rubber', tint: 0xc44536 },
  antiVibRubber: { bucket: 'elastomer_rubber', tint: 0x246eb9 },
  irLedLens: { bucket: 'emissive_glow', tint: 0xbe123c },
  ispSiliconDie: { bucket: 'silicon_hero', tint: 0x324c72 },
  npuSiliconDie: { bucket: 'silicon_hero', tint: 0x324c72 },
  hdiMainboardPcb: { bucket: 'pcb_textured', tint: 0x1b5e47 },
  pcbEdgeLaminate: { bucket: 'pcb_textured', tint: 0x1b5e47 },
  abfSubstrate: { bucket: 'abf_substrate', tint: 0x164a41 },
  emiShieldCan: { bucket: 'emi_shield_metal', tint: 0xc2cbd6 },
  vaporChamberCopper: { bucket: 'copper_thermal', tint: 0xd97d4e },
  thermalPadPink: { bucket: 'elastomer_rubber', tint: 0xe8798e },
  thermalPadBlue: { bucket: 'pin_carrier_gloss', tint: 0x62a8d8 },
  ferriteInductor: { bucket: 'copper_coil', tint: 0x3a3f4a },
  tantalumCapYellow: { bucket: 'titanium_machined', tint: 0xe3a82b },
  zifIvoryPlastic: { bucket: 'ic_epoxy_dark', tint: 0xece7dc },
  coaxShieldCopper: { bucket: 'copper_thermal', tint: 0xd27a44 },
  solderBallSilver: { bucket: 'solder_silver', tint: 0xd9e0e8 },
  evfEyecupRubber: { bucket: 'elastomer_rubber', tint: 0x262930 },
  evfAntiFogGlass: { bucket: 'matte_chassis', tint: 0x6ec3f0 },
  evfDichroicMirror: { bucket: 'ic_epoxy_dark', tint: 0xd9569c },
  evfLensAspheric: { bucket: 'ic_epoxy_dark', tint: 0x38bdf8 },
  evfLensEd: { bucket: 'matte_chassis', tint: 0x10b981 },
  evfLensField: { bucket: 'matte_chassis', tint: 0x6366f1 },
  evfGlassEdgeRim: { bucket: 'optical_glass_ed', tint: 0x76b8db },
  evfOledActive: { bucket: 'emissive_glow', tint: 0x2563eb },
  evfIrEmitter: { bucket: 'emissive_glow', tint: 0xbe123c },
  evfHousingMg: { bucket: 'magnesium_cast', tint: 0x4b5563 },
  mountStainlessFlange: { bucket: 'stainless_machined', tint: 0xd8dee6 },
  mountSpringSteel: { bucket: 'becu_spring', tint: 0xc98a3c },
  mountRedIndexDot: { bucket: 'pin_carrier_gloss', tint: 0xdc2626 },
  mountVelvetBaffle: { bucket: 'foam_felt_matte', tint: 0x15171c },
  mountShimBlue: { bucket: 'pin_carrier_gloss', tint: 0x2563eb },
  mountPpsInsulator: { bucket: 'matte_chassis', tint: 0x272a33 },
  mountMgBulkhead: { bucket: 'magnesium_cast', tint: 0x5c6675 },
  mountThreadLockBlue: { bucket: 'pin_carrier_gloss', tint: 0x0284c7 },
  lensXaGlass: { bucket: 'matte_chassis', tint: 0x5cc4f5 },
  lensEdGlass: { bucket: 'matte_chassis', tint: 0x10b981 },
  lensBarrelAnodized: { bucket: 'matte_black_anodized', tint: 0x282d36 },
  lensRubberGrip: { bucket: 'elastomer_rubber', tint: 0x1b1f26 },
  lensAccentRing: { bucket: 'pin_carrier_gloss', tint: 0xd97706 },
  lensFoamSeal: { bucket: 'foam_felt_matte', tint: 0x262932 },
  lensPermalloyShield: { bucket: 'iron_magnetic', tint: 0x526072 },
  lcdCoverGlass: { bucket: 'matte_chassis', tint: 0xdbeafe },
  lcdLiveViewActive: { bucket: 'emissive_glow', tint: 0x2563eb },
  lcdBacklightPrism: { bucket: 'matte_chassis', tint: 0xf1f5f9 },
  bodyMgShell: { bucket: 'magnesium_cast', tint: 0x2c323d },
  bodyLeatherette: { bucket: 'leatherette_grip', tint: 0x1b1f26 },
  bodyBatteryShell: { bucket: 'magnesium_cast', tint: 0x313846 },
  bodyBatteryCell: { bucket: 'matte_chassis', tint: 0x0284c7 },
  bodyTopSubOled: { bucket: 'emissive_glow', tint: 0x2563eb },
  bodyRecRed: { bucket: 'pin_carrier_gloss', tint: 0xdc2626 },
  beCuSpring: { bucket: 'becu_spring', tint: 0xd89143 },
  titaniumRivet: { bucket: 'titanium_machined', tint: 0xaab4c0 },
  invarScaleBar: { bucket: 'titanium_machined', tint: 0xffffff },
  lcdPolarizerFilm: { bucket: 'matte_chassis', tint: 0x3b6796 },
  evfMlaGlass: { bucket: 'matte_chassis', tint: 0x8ad6f5 },
  sinteredSilver: { bucket: 'solder_silver', tint: 0xd8e0ea },
  siliconTsvDram: { bucket: 'silicon_hero', tint: 0x324c72 },
  thermalTransferTape: { bucket: 'elastomer_rubber', tint: 0x3a4350 },
  velvetFlockTrap: { bucket: 'foam_felt_matte', tint: 0x0b0d10 },
  vaporWickCopper: { bucket: 'ic_epoxy_dark', tint: 0xc86432 },
  rfGoldCoax: { bucket: 'gold_plating', tint: 0xd4a437 },
  loficDielectric: { bucket: 'silicon_hero', tint: 0x0891b2 },
  tungstenLightShield: { bucket: 'titanium_machined', tint: 0x262c36 },
  cinnabarAnodized: { bucket: 'matte_black_anodized', tint: 0xd95b26 },
  butylDamperRubber: { bucket: 'elastomer_rubber', tint: 0x2b2624 },
  mylarInsulatorFilm: { bucket: 'optical_ar_iridescent', tint: 0xc2852a },
  pureIronArmature: { bucket: 'iron_magnetic', tint: 0xbcc6d4 },
  opticalCementClear: { bucket: 'optical_glass_clear', tint: 0xa5f3fc },
  dustCatcherGel: { bucket: 'membrane_translucent', tint: 0xf59e0b },
  aluminaHighKFilm: { bucket: 'silicon_dielectric', tint: 0x7c3aed },
  taNBarrierLiner: { bucket: 'titanium_machined', tint: 0xc8a46e },
  lcdOcaFilm: { bucket: 'matte_chassis', tint: 0xe0f2fe },
  lcdDiffuserMatte: { bucket: 'membrane_translucent', tint: 0xf8fafc },
  lcdDbefIridescent: { bucket: 'optical_dichroic', tint: 0xe2f1ff },
  vcWorkingFluidCyan: { bucket: 'matte_chassis', tint: 0x38bdf8 },
  vcCopperMeshWick: { bucket: 'ic_epoxy_dark', tint: 0xd9804c },
  evfIrWindowBlack: { bucket: 'matte_black_anodized', tint: 0x1b0814 },
  conductiveNiCuFoam: { bucket: 'ic_epoxy_dark', tint: 0x8e99a8 },
  aramidKevlarWeave: { bucket: 'carbon_fiber', tint: 0xd9b040 },
  oilTrapPorousPad: { bucket: 'elastomer_rubber', tint: 0x2c3440 },
  varistorRingBlue: { bucket: 'pin_carrier_gloss', tint: 0x1d63b8 },
  fluorineCoatCyan: { bucket: 'matte_chassis', tint: 0x38bdf8 },
  nanoArIridescent: { bucket: 'matte_chassis', tint: 0x6366f1 },
  sinteredBronzeBushing: { bucket: 'brass_precision', tint: 0xb67b3d },
  thermalPuttyPink: { bucket: 'elastomer_rubber', tint: 0xe89ca8 },
  gMasterRedBadge: { bucket: 'pin_carrier_gloss', tint: 0xd9381e },
  makeupSealViolet: { bucket: 'pin_carrier_gloss', tint: 0x6c63c9 },
  esdPowderShell: { bucket: 'magnesium_cast', tint: 0x222936 },
  aerogelPearl: { bucket: 'foam_felt_matte', tint: 0xe6eef6 },
  pcmVioletSheet: { bucket: 'pin_carrier_gloss', tint: 0x8b6ec9 },
  einkPaper: { bucket: 'matte_chassis', tint: 0xe8edf2 },
  einkInkDark: { bucket: 'matte_chassis', tint: 0x0f172a },
  criLedGlow: { bucket: 'emissive_glow', tint: 0xfffbeb },
  uvcVioletGlow: { bucket: 'emissive_glow', tint: 0x8b5cf6 },
  blue450Glow: { bucket: 'emissive_glow', tint: 0x38bdf8 },
  mofEmerald: { bucket: 'pin_carrier_gloss', tint: 0x10b981 },
  pemNafionCyan: { bucket: 'membrane_translucent', tint: 0x06b6d4 },
  nitiRoseWire: { bucket: 'metal_hero', tint: 0xf43f5e },
  ptcTerracotta: { bucket: 'matte_chassis', tint: 0xdc4a38 },
  loweGlassClear: { bucket: 'optical_ar_iridescent', tint: 0xdbf4ff },
  arItoFilm: { bucket: 'optical_ar_iridescent', tint: 0x7dd3fc },
  fireRedAccent: { bucket: 'pin_carrier_gloss', tint: 0xb91c1c },
  seismicGelBlue: { bucket: 'membrane_translucent', tint: 0x0ea5e9 },
  xpeCharcoalFoam: { bucket: 'foam_felt_matte', tint: 0x1e242d },
  carbonPelletDark: { bucket: 'carbon_fiber', tint: 0x181c22 },
  hepaWhitePleat: { bucket: 'foam_felt_matte', tint: 0xf1f5f9 },
  whiteTeleLens: { bucket: 'pin_carrier_gloss', tint: 0xeef2f6 },
  pa66ThermalBreak: { bucket: 'matte_chassis', tint: 0x475569 },
  glazingEpdmMatte: { bucket: 'elastomer_rubber', tint: 0x111827 },
  brassPrecision: { bucket: 'brass_precision', tint: 0xd4a137 },
  sintered316L: { bucket: 'solder_silver', tint: 0x9ca3af },
  butylCldFoil: { bucket: 'elastomer_rubber', tint: 0xcbd5e1 },
  ptfeCleanWhite: { bucket: 'foam_felt_matte', tint: 0xf8fafc },
  kaptonAmberFilm: { bucket: 'membrane_translucent', tint: 0xd97706 },
  aluminaCeramic: { bucket: 'ic_epoxy_dark', tint: 0xf3f0e8 },
  copperIonTeal: { bucket: 'copper_thermal', tint: 0x0f766e },
  rubyThermalFuse: { bucket: 'pin_carrier_gloss', tint: 0xe11d48 },
  pcbEmeraldDark: { bucket: 'pcb_textured', tint: 0x065f46 },
  ferritic430Steel: { bucket: 'ic_epoxy_dark', tint: 0xa8b2be },
  // Drybox 150-part MECE expansion (PR #34)
  ceramicFritBlack: { bucket: 'pin_carrier_gloss', tint: 0x0b0f17 },
  paryleneVioletGlaze: { bucket: 'optical_ar_iridescent', tint: 0x818cf8 },
  copperInterceptAmber: { bucket: 'copper_thermal', tint: 0xb45309 },
  flockedMatteBlack: { bucket: 'foam_felt_matte', tint: 0x090b0f },
  grayCard18Pct: { bucket: 'matte_chassis', tint: 0x777777 },
  hardenedSteelHrc60: { bucket: 'stainless_machined', tint: 0x475569 },
  pfasFreeHydroBlue: { bucket: 'pin_carrier_gloss', tint: 0x0ea5e9 },
  linenBufferBeige: { bucket: 'foam_felt_matte', tint: 0xd6cfc2 },
  spdTintViolet: { bucket: 'optical_dichroic', tint: 0x312e81 },
  vipSilverFoil: { bucket: 'emi_shield_metal', tint: 0xdbe4ee },
  grapheneOxideIridescent: { bucket: 'optical_ar_iridescent', tint: 0x6366f1 },
  farUvcQuartzBlue: { bucket: 'emissive_glow', tint: 0x38bdf8 },
  opvIndoorAmber: { bucket: 'silicon_photodiode', tint: 0xd97706 },
  fireMicrocapCrimson: { bucket: 'pin_carrier_gloss', tint: 0xdc2626 },
};

export const ULTRA_MATERIAL_CATALOG: Readonly<Record<string, MaterialBindingSpec>> = {
  bionzEmiLid: { bucket: 'emi_shield_metal', tint: 0x444d5c },
  bionzPopDramTop: { bucket: 'silicon_hero', tint: 0x171b23 },
  bionzDieFloorplan: { bucket: 'silicon_hero', tint: 0x09162c },
  bionzIpDieTile: { bucket: 'silicon_hero', tint: 0x7b8ca8 },
  bionzCetusDie: { bucket: 'silicon_hero', tint: 0x2a0e64 },
  bionzAbfSubstrate: { bucket: 'abf_substrate', tint: 0x0b4636 },
  bionzBtCore: { bucket: 'abf_substrate', tint: 0x5a4526 },
  micDeadcatFur: { bucket: 'ic_epoxy_dark', tint: 0x13161c },
  micTopDeckMg: { bucket: 'ic_epoxy_dark', tint: 0x191d24 },
  micStainlessWovenMesh: { bucket: 'ic_epoxy_dark', tint: 0x475264 },
  micEptfeMembrane: { bucket: 'ic_epoxy_dark', tint: 0xeef2f7 },
  micMemsFaradayLid: { bucket: 'ic_epoxy_dark', tint: 0x9faab9 },
  micMemsSiliconDiaphragm: { bucket: 'silicon_hero', tint: 0x1e3a8a },
  micSh1035Flex: { bucket: 'polyimide_fpc', tint: 0xa85710 },
  micRubberBootBlack: { bucket: 'ic_epoxy_dark', tint: 0x1a1d23 },
  micAcousticFelt: { bucket: 'ic_epoxy_dark', tint: 0x14171e },
  micEcmJfetPcb: { bucket: 'pcb_textured', tint: 0xd4a135 },
  micGreenJackCollar: { bucket: 'ic_epoxy_dark', tint: 0x0f8f58 },
  batPolycarbonateShell: { bucket: 'magnesium_cast', tint: 0x2a2e36 },
  batFrontLabel: { bucket: 'pin_carrier_gloss', tint: 0x2a2e36 },
  batHologramFoil: { bucket: 'pin_carrier_gloss', tint: 0x7dd3fc },
  batRearLaser: { bucket: 'matte_chassis', tint: 0x1d2027 },
  batCellWrapGreen: { bucket: 'pin_carrier_gloss', tint: 0x145940 },
  batBmsPcb: { bucket: 'pcb_textured', tint: 0x0c472e },
  batElectrodeCoating: { bucket: 'matte_chassis', tint: 0x232830 },
  batSocLedGlow: { bucket: 'emissive_glow', tint: 0x34d399 },
  cfeTopArmorShell: { bucket: 'magnesium_cast', tint: 0x161a22 },
  cfeBackplateLaser: { bucket: 'metal_hero', tint: 0xa4b0bf },
  cfeHdiPcb: { bucket: 'pcb_textured', tint: 0x07241c },
  cfeControllerPkg: { bucket: 'ic_epoxy_dark', tint: 0x161a22 },
  cfeNandPkg: { bucket: 'ic_epoxy_dark', tint: 0x151921 },
  cfeCopperThermal: { bucket: 'copper_thermal', tint: 0xc66a32 },
  cfeBiCS10WaferDie: { bucket: 'silicon_wafer_dark', tint: 0x07192d },
  cfeGlassWeaveCore: { bucket: 'matte_chassis', tint: 0x1c3b2e },
  cfeMolyWordlineMetal: { bucket: 'titanium_machined', tint: 0x96adc4 },
  cfePqcSecurityDie: { bucket: 'silicon_hero', tint: 0x101222 },
  cfeQuantumChargeTrapStack: { bucket: 'matte_chassis', tint: 0x0f172a },
  cfeSolderImcMicrostructure: { bucket: 'ic_epoxy_dark', tint: 0xcbd5e1 },
  cfeSerdesEyeDiagramDie: { bucket: 'silicon_hero', tint: 0x071324 },
  cfeFerroelectricHzoCrystal: { bucket: 'ic_epoxy_dark', tint: 0x1e1b4b },
  icEpoxyLaser: { bucket: 'ic_epoxy_dark', tint: 0x181b22 },
  v2PixelMetasurface: { bucket: 'silicon_photodiode', tint: 0x0ea5e9 },
  v2PixelSiLattice: { bucket: 'silicon_wafer_dark', tint: 0x0b253a },
  v2PixelHybridBondCu: { bucket: 'cucu_hybrid_copper', tint: 0xfcd39d },
  v2PixelAiCircuit: { bucket: 'ic_epoxy_dark', tint: 0x132a46 },
  v2BionzGaaNanosheet: { bucket: 'silicon_wafer_dark', tint: 0x64748b },
  v2BionzSramArray: { bucket: 'silicon_hero', tint: 0x0f2942 },
  v2BionzBacksidePdn: { bucket: 'silicon_hero', tint: 0xf59e0b },
  v2BionzGlassCoreTgv: { bucket: 'matte_chassis', tint: 0xcbd5e1 },
  v2PixelPerovskiteStack: { bucket: 'silicon_photodiode', tint: 0x6c7a8e },
  v2PixelDeuteriumInterface: { bucket: 'matte_chassis', tint: 0x0f172a },
  v2Bionz2dTmdLattice: { bucket: 'silicon_wafer_dark', tint: 0x1e1b4b },
  v2BionzMicrofluidicGrid: { bucket: 'ic_epoxy_dark', tint: 0x0284c7 },
  sensorCuCuHybrid: { bucket: 'cucu_hybrid_copper', tint: 0x0b1c36 },
  sensorLogicAdcDie: { bucket: 'silicon_hero', tint: 0x0a162b },
  sensorDramDie: { bucket: 'silicon_hero', tint: 0x130f2c },
  sensorHtccCeramic: { bucket: 'ic_epoxy_dark', tint: 0x24272e },
  sensorSlvsFlex: { bucket: 'polyimide_fpc', tint: 0x9c4e12 },
  sensorOemFlexIsl: { bucket: 'polyimide_fpc', tint: 0xad5512 },
  sensorDraQrPlate: { bucket: 'matte_chassis', tint: 0x14171d },
  sensorOpticalScale: { bucket: 'ic_epoxy_dark', tint: 0xcfd8e3 },
  sensorHalbachMagnet: { bucket: 'iron_magnetic', tint: 0x1e242c },
  sensorWasherMarking: { bucket: 'metal_hero', tint: 0xc8d2de },
  sensorPztStack: { bucket: 'ceramic_alumina', tint: 0xdcd2ba },
  sensorPyroGraphite: { bucket: 'carbon_fiber', tint: 0x1b1e24 },
  sensorEptfeVent: { bucket: 'foam_felt_matte', tint: 0x181c22 },
  batSiCNanoScaffold: { bucket: 'ic_epoxy_dark', tint: 0x131720 },
  batSingleCrystalNmc: { bucket: 'matte_chassis', tint: 0x0f223d },
  batEisNyquistDie: { bucket: 'silicon_hero', tint: 0x0c1322 },
  micOpticalInterferometer: { bucket: 'ic_epoxy_dark', tint: 0x0f172a },
  micAudioDsp32Float: { bucket: 'ic_epoxy_dark', tint: 0x0d1424 },
  micAcousticDelayCloth: { bucket: 'ic_epoxy_dark', tint: 0x1e242c },
  bionzIhsNickelCu: { bucket: 'ic_epoxy_dark', tint: 0xc8b29e },
  bionzIndiumStim: { bucket: 'solder_silver', tint: 0xc6ced8 },
  bionzLpddr5xDie: { bucket: 'silicon_hero', tint: 0x0d2244 },
  bionzPopInterposer: { bucket: 'abf_substrate', tint: 0x0d4032 },
  bionzEmcSilica: { bucket: 'ic_epoxy_dark', tint: 0x1b2029 },
  bionzAbfBottomSr: { bucket: 'abf_substrate', tint: 0x0b4d2d },
  bionzFeolFinfet: { bucket: 'silicon_wafer_dark', tint: 0x132036 },
  bionzBeolDamascene: { bucket: 'cucu_hybrid_copper', tint: 0x132634 },
  bionzLsiBridge: { bucket: 'matte_chassis', tint: 0x0d2645 },
  bionzCufSilica: { bucket: 'membrane_translucent', tint: 0x333d4b },
  bionzEsicapDie: { bucket: 'silicon_hero', tint: 0x1b1848 },
  bionzPmicIc: { bucket: 'ic_epoxy_dark', tint: 0x161a21 },
  bionzInductorR47: { bucket: 'copper_coil', tint: 0x2b3039 },
  bionzTcxoGoldLid: { bucket: 'gold_plating', tint: 0xc8a654 },
  bionzNorFlashIc: { bucket: 'ic_epoxy_dark', tint: 0x181c24 },
  bionzHdmiRetimerIc: { bucket: 'ic_epoxy_dark', tint: 0x171b23 },
  batSulfideArgyrodite: { bucket: 'ceramic_alumina', tint: 0x0f172a },
  batFiberBraggOptical: { bucket: 'ic_epoxy_dark', tint: 0x09111f },
  micGrapheneHexMembrane: { bucket: 'ic_epoxy_dark', tint: 0x1e293b },
  micSpiralMetamaterial: { bucket: 'ic_epoxy_dark', tint: 0x181c24 },
  fabWafer300mmDieMap: { bucket: 'silicon_wafer_dark', tint: 0x1e3a5f },
  fabQuartzReticleMask: { bucket: 'ic_epoxy_dark', tint: 0xbae6fd },
  fabCleanroomProcessDeck: { bucket: 'matte_chassis', tint: 0xf1f5f9 },
  fabWaferBinningMap: { bucket: 'silicon_wafer_dark', tint: 0x0f172a },
  evfOledBackplaneQr: { bucket: 'matte_chassis', tint: 0xc8c4b8 },
  evfOledSiliconFront: { bucket: 'silicon_hero', tint: 0x0f172a },
  evfTandemCavityStack: { bucket: 'ic_epoxy_dark', tint: 0x071022 },
  evfTconPcb: { bucket: 'pcb_textured', tint: 0x0a442d },
  evfTconEmiCan: { bucket: 'ic_epoxy_dark', tint: 0xc6cdd6 },
  evfOemFlexRibbon: { bucket: 'polyimide_fpc', tint: 0xb45309 },
  evfMipiShieldMesh: { bucket: 'emi_shield_metal', tint: 0x202630 },
  evfVfRadiationSheet: { bucket: 'elastomer_rubber', tint: 0x4ea3d8 },
  evfGazeNirDie: { bucket: 'silicon_hero', tint: 0x2e1036 },
  evfDiopterDialCap: { bucket: 'matte_chassis', tint: 0x272c35 },
  evfFinderCoverMold: { bucket: 'matte_chassis', tint: 0x252931 },
  evfShimEtchedBrass: { bucket: 'brass_precision', tint: 0xc2922c },
  evfZeoliteBeadBed: { bucket: 'elastomer_rubber', tint: 0xfbf8f0 },
  evfAmbientRgbDie: { bucket: 'silicon_hero', tint: 0x0f172a },
  fab1ArchExhibitionDeck: { bucket: 'matte_chassis', tint: 0xf8fafc },
  fab1WaferSmartphone640: { bucket: 'silicon_wafer_dark', tint: 0x2b4368 },
  fab1WaferApsc134: { bucket: 'silicon_wafer_dark', tint: 0x2b4368 },
  fab1WaferMediumFormat26: { bucket: 'silicon_wafer_dark', tint: 0x2b4368 },
  sensorMgDieCast: { bucket: 'silicon_hero', tint: 0x5a6370 },
  sensorVcmCopperWinding: { bucket: 'copper_coil', tint: 0x4e1e07 },
  sensorSoftIronYoke: { bucket: 'iron_magnetic', tint: 0x8e98a6 },
  sensorOpticalFilterCoating: { bucket: 'cfa_gloss_filter', tint: 0x67e8f9 },
  sensorTimSiliconeWaffle: { bucket: 'silicon_hero', tint: 0x9aa8b8 },
  sensorEmiShieldNickel: { bucket: 'ic_epoxy_dark', tint: 0xc7ced6 },
  sensorCarbonCurtainWeave: { bucket: 'carbon_fiber', tint: 0x101318 },
  sensorEndLiquidCrystal: { bucket: 'membrane_translucent', tint: 0x1f2937 },
  sensorPeltierCeramic: { bucket: 'ic_epoxy_dark', tint: 0xeef2f6 },
  sensorLgaBallGrid: { bucket: 'metal_hero', tint: 0x20242c },
  sensorVelvetBaffle: { bucket: 'foam_felt_matte', tint: 0x090b0e },
  sensorHallSubPcb: { bucket: 'pcb_textured', tint: 0x0d2e24 },
  sensorCuWAlloySinter: { bucket: 'copper_thermal', tint: 0x8b6f5c },
  sensorSusSpringSteel: { bucket: 'becu_spring', tint: 0xc0c9d4 },
  sensorMemsTcxoLid: { bucket: 'stainless_machined', tint: 0xc89b32 },
  sensorFiducialTarget: { bucket: 'metal_hero', tint: 0x121a28 },
  fab2Phase1PlantDeck: { bucket: 'matte_chassis', tint: 0xeef2f7 },
  fab2IngotVgCrystalMap: { bucket: 'silicon_wafer_dark', tint: 0x1e293b },
  fab2LpdDefectMap: { bucket: 'matte_chassis', tint: 0x1e3a5f },
  fab2NanotopoMap: { bucket: 'matte_chassis', tint: 0x10b981 },
  fab3Phase2StudioDeck: { bucket: 'matte_chassis', tint: 0x0f172a },
  fab3OpcSerifMask: { bucket: 'matte_chassis', tint: 0x071c2c },
  fab3StitchVsSingleReticle: { bucket: 'ic_epoxy_dark', tint: 0x0b1120 },
  fab3ChipLayoutOasis: { bucket: 'matte_chassis', tint: 0x0ea5e9 },
  fab3MaskCdMap: { bucket: 'matte_chassis', tint: 0x0f172a },
  fab3BossungWindowMap: { bucket: 'matte_chassis', tint: 0x09111f },
  fab4Phase3FeolDeck: { bucket: 'matte_chassis', tint: 0x0d1526 },
  fab4RgbAbsorptionProfile: { bucket: 'matte_chassis', tint: 0x09101f },
  fab4FdtiWallCrossSection: { bucket: 'matte_chassis', tint: 0x0a1220 },
  fab4DualPixelSplitProfile: { bucket: 'matte_chassis', tint: 0x22d3ee },
  fab4PpdPinningBarrier: { bucket: 'matte_chassis', tint: 0xf43f5e },
  fab4SalicideBlockSplit: { bucket: 'ic_epoxy_dark', tint: 0xf8fafc },
  cfeHdiPcbRear: { bucket: 'pcb_textured', tint: 0x06211a },
  cfeToughResinMold: { bucket: 'matte_chassis', tint: 0x181b22 },
  cfeHardGoldFingers: { bucket: 'gold_plating', tint: 0xc8921c },
  cfeLpddr4Pkg: { bucket: 'ic_epoxy_dark', tint: 0x141820 },
  cfeCopperSpreaderHero: { bucket: 'copper_thermal', tint: 0xba5e28 },
  cfeTimSiliconeWaffle: { bucket: 'silicon_hero', tint: 0xe78ca8 },
  cfePyroGraphiteSheet: { bucket: 'carbon_fiber', tint: 0x181c24 },
  cfeEmiShieldCan: { bucket: 'emi_shield_metal', tint: 0xc0c7d0 },
  cfeMicroVaporWick: { bucket: 'ic_epoxy_dark', tint: 0xb95b26 },
  cfeMrwg3CncAluminum: { bucket: 'stainless_machined', tint: 0x161a22 },
  cfeInnerArmorCnc: { bucket: 'stainless_machined', tint: 0x8d98a6 },
  cfeComboSlotShell: { bucket: 'magnesium_cast', tint: 0xa6b0be },
  micOemHolderResin: { bucket: 'ic_epoxy_dark', tint: 0x1e232c },
  micTeraoka631sTape: { bucket: 'ic_epoxy_dark', tint: 0x0d1015 },
  micDrieSiliconBackplate: { bucket: 'silicon_hero', tint: 0x1e293b },
  micMemsAsicDie: { bucket: 'silicon_hero', tint: 0x0c1324 },
  micCeramicLgaSubstrate: { bucket: 'abf_substrate', tint: 0x0d3627 },
  micEcmSpunAluminum: { bucket: 'ic_epoxy_dark', tint: 0xc8d1dc },
  micEcmBrassBackplate: { bucket: 'ic_epoxy_dark', tint: 0xf6d679 },
  micAudioMainPcb: { bucket: 'pcb_textured', tint: 0x093827 },
  micCodecQfnPackage: { bucket: 'ic_epoxy_dark', tint: 0x181b21 },
  micStarGroundPcb: { bucket: 'pcb_textured', tint: 0x093827 },
  micAiNpuDie: { bucket: 'silicon_hero', tint: 0x0f1029 },
  micMiShoeDigitalFlex: { bucket: 'polyimide_fpc', tint: 0x9c4e0c },
  micScAlnPiezoDie: { bucket: 'silicon_hero', tint: 0x0d9488 },
  micVpuCombDriveDie: { bucket: 'silicon_hero', tint: 0x111827 },
  mic8CapsuleArrayFace: { bucket: 'ic_epoxy_dark', tint: 0x181c24 },
  micQuartzTcxoLid: { bucket: 'ic_epoxy_dark', tint: 0xc9972c },
  micUwbRfModule: { bucket: 'ic_epoxy_dark', tint: 0x94a3b8 },
  micBinauralHrtfMap: { bucket: 'ic_epoxy_dark', tint: 0x0f2942 },
  micLufsMeterDisplay: { bucket: 'silicon_hero', tint: 0x090e1a },
  micBoschScallopSi: { bucket: 'silicon_wafer_dark', tint: 0x94a3b8 },
  micPhotonicMziDie: { bucket: 'silicon_hero', tint: 0x09152b },
  micOemScrewSteel: { bucket: 'ic_epoxy_dark', tint: 0x9aa5b4 },
  micMgBeadBlast: { bucket: 'ic_epoxy_dark', tint: 0x333b46 },
  bionzStiffenerSteel: { bucket: 'stainless_machined', tint: 0x8d98a6 },
  bionzIpSlvsDie: { bucket: 'silicon_hero', tint: 0xf2c75c },
  bionzIpIspDie: { bucket: 'silicon_hero', tint: 0xfde68a },
  bionzIpNpuDie: { bucket: 'silicon_hero', tint: 0x0f2d52 },
  bionzIpArmDie: { bucket: 'silicon_hero', tint: 0x0c2348 },
  bionzIpSabinDie: { bucket: 'silicon_hero', tint: 0x113a3d },
  bionzIpHevcDie: { bucket: 'silicon_hero', tint: 0x9f1239 },
  bionzIpSramDie: { bucket: 'silicon_hero', tint: 0x0284c7 },
  bionzIpC2paDie: { bucket: 'silicon_hero', tint: 0x0c1018 },
  bionzSac305Solder: { bucket: 'solder_silver', tint: 0xcfd6e0 },
  bionzPdnPcb: { bucket: 'silicon_hero', tint: 0xe6faf2 },
  bionzPoscapTop: { bucket: 'matte_chassis', tint: 0x181c22 },
  bionzTcxoPcb: { bucket: 'pcb_textured', tint: 0xf2cb58 },
  bionzNorPcb: { bucket: 'pcb_textured', tint: 0xf2cb58 },
  bionzSigmaGraphite: { bucket: 'carbon_fiber', tint: 0x1e222a },
  bionzSlvsBusPcb: { bucket: 'pcb_textured', tint: 0xf2cb58 },
  bionzHdmiPcb: { bucket: 'pcb_textured', tint: 0xe0f2fe },
  bionzEsdRclampIc: { bucket: 'ic_epoxy_dark', tint: 0x161a22 },
  bionzSubPmicIc: { bucket: 'ic_epoxy_dark', tint: 0x171b22 },
  bionzInductorR24: { bucket: 'copper_coil', tint: 0x2a3039 },
  bionzSubPmicPcb: { bucket: 'pcb_textured', tint: 0x07221c },
  bionzAteJtagPcb: { bucket: 'pcb_textured', tint: 0xf0fdf4 },
  // Sensor Fab Vol.5 BEOL (PR #33)
  fab5Phase4BeolDeck: { bucket: 'matte_chassis', tint: 0x0d1526 },
  fab5FsiVsBsiBeolCutaway: { bucket: 'silicon_wafer_dark', tint: 0x162b4a },
  fab5DualDamasceneCrossSection: { bucket: 'cucu_hybrid_copper', tint: 0xc26d38 },
  fab5M2M4RoutingGrid: { bucket: 'cucu_hybrid_copper', tint: 0xd97706 },
  fab5HbCuPadArray50m: { bucket: 'cucu_hybrid_copper', tint: 0xe59a4a },
  fab5CuRecessWindowMap: { bucket: 'silicon_dielectric', tint: 0x38bdf8 },
  // LCD 150-part Ultra-HD overhaul (PR #36)
  lcdMaHingeMg: { bucket: 'magnesium_cast', tint: 0x3c4452 },
  lcdSilverBezelBus: { bucket: 'solder_silver', tint: 0xc8d1dc },
  lcdQwpRetarderFilm: { bucket: 'optical_dichroic', tint: 0x6366f1 },
  lcdLtpsTftSilicon: { bucket: 'silicon_wafer_dark', tint: 0x1e3a5f },
  lcdPcbPd1072HiRes: { bucket: 'pcb_textured', tint: 0x093827 },
  lcdDdicSiliconDie: { bucket: 'silicon_hero', tint: 0x172554 },
  lcdNanoEtchGlass: { bucket: 'optical_glass_clear', tint: 0xdbeafe },
  lcdQdefQuantumFilm: { bucket: 'optical_ar_iridescent', tint: 0x10b981 },
  lcdMiniLedMatrix: { bucket: 'emissive_glow', tint: 0x93c5fd },
  lcdTandemOledCgl: { bucket: 'optical_ar_iridescent', tint: 0x818cf8 },
  lcdVaporChamberWick: { bucket: 'copper_thermal', tint: 0xb95b26 },
  lcdPvaIodineStretch: { bucket: 'optical_dichroic', tint: 0x312e81 },
  lcdLgpDotGradient: { bucket: 'optical_glass_clear', tint: 0xe0f2fe },
  lcdDualDomainChevron: { bucket: 'cfa_gloss_filter', tint: 0x2563eb },
  lcdCoePollessOled: { bucket: 'optical_ar_iridescent', tint: 0x4f46e5 },
  lcdTfeAldBarrier: { bucket: 'silicon_dielectric', tint: 0xbae6fd },
  lcdMicroLedGanArray: { bucket: 'emissive_glow', tint: 0x38bdf8 },
  lcdMlaDomeLens: { bucket: 'optical_glass_ed', tint: 0x93c5fd },
  lcdFrontBezelGlass: { bucket: 'glass_clear_housing', tint: 0x0f172a },
  lcdRearShellMgLabel: { bucket: 'magnesium_cast', tint: 0x262d38 },
  lcdItoDiamondTouchGrid: { bucket: 'optical_ar_iridescent', tint: 0x7dd3fc },
  lcdColorFilterBmMosaic: { bucket: 'cfa_gloss_filter', tint: 0x1e293b },
  lcdBefPrismGroovesV: { bucket: 'optical_glass_clear', tint: 0xe2e8f0 },
  lcdBefPrismGroovesH: { bucket: 'optical_glass_clear', tint: 0xf1f5f9 },
  lcdDbefOpticalPrism: { bucket: 'optical_dichroic', tint: 0x93c5fd },
  lcdDiffuserMicroBeads: { bucket: 'membrane_translucent', tint: 0xf8fafc },
  lcdPiPhotoAlignment: { bucket: 'polyimide_fpc', tint: 0xd97706 },
  lcdNematicLiquidCrystal: { bucket: 'membrane_translucent', tint: 0x38bdf8 },
  lcdAcfGoldMicrospheres: { bucket: 'gold_plating', tint: 0xeab308 },
  lcdFpcFlexCircuit: { bucket: 'polyimide_fpc', tint: 0xb45309 },
  lcdNiCuConductiveFoam: { bucket: 'emi_shield_metal', tint: 0x8e99a8 },
  lcdPoronAcousticFoam: { bucket: 'foam_felt_matte', tint: 0x1f242d },
  lcdBrushedSus304Blu: { bucket: 'stainless_machined', tint: 0xb8c2ce },
  lcdLaserDimpleFriction: { bucket: 'stainless_machined', tint: 0x64748b },
  lcdSinteredBronzePore: { bucket: 'brass_precision', tint: 0xb67b3d },
  lcdCarbonWeaveStiffener: { bucket: 'carbon_fiber', tint: 0x1c212b },
  lcdLcmFactoryQrLabel: { bucket: 'matte_chassis', tint: 0xe2e8f0 },
  lcdAudioDisplayChipDie: { bucket: 'silicon_hero', tint: 0x1e293b },
  lcdPcmAerogelThermal: { bucket: 'foam_felt_matte', tint: 0xdbeafe },
  lcdYoctaMetalMesh: { bucket: 'emi_shield_metal', tint: 0x94a3b8 },
  lcdPrivacyMicroLouver: { bucket: 'matte_black_anodized', tint: 0x181c24 },
  lcdBluePholedStack: { bucket: 'emissive_glow', tint: 0x2563eb },
  lcdRearBayEptfeVent: { bucket: 'membrane_translucent', tint: 0xf1f5f9 },
  lcdMicroLedCuCuBond: { bucket: 'cucu_hybrid_copper', tint: 0xd97706 },
  lcdPiezoHaptTile: { bucket: 'ceramic_alumina', tint: 0xe2d8c3 },
  lcdSideLedMcpcb: { bucket: 'pcb_textured', tint: 0xf1f5f9 },
  // Mic 150-part Ultra36 expansion (PR #37)
  mc36Jk1028AudioFlex: { bucket: 'polyimide_fpc', tint: 0xb45309 },
  mc36Mis2006ShoeFpc: { bucket: 'polyimide_fpc', tint: 0x9c4e0c },
  mc36MagneticCutPlate: { bucket: 'iron_magnetic', tint: 0x475569 },
  mc36BottomPortSolderRing: { bucket: 'solder_silver', tint: 0xcbd5e1 },
  mc36GlobTopLightShield: { bucket: 'ic_epoxy_dark', tint: 0x11151d },
  mc36NegGetterVacuumSeal: { bucket: 'titanium_machined', tint: 0x64748b },
  mc36EcmAcousticCloth: { bucket: 'foam_felt_matte', tint: 0x1e242e },
  mc36ThinFilmResistorArray: { bucket: 'ceramic_alumina', tint: 0x1e293b },
  mc36C7701EmiShieldCan: { bucket: 'emi_shield_metal', tint: 0xc0c7d0 },
  mc36EcmM1ControlDial: { bucket: 'matte_black_anodized', tint: 0x181c24 },
  mc36XlrA4AudioPanel: { bucket: 'matte_black_anodized', tint: 0x1e242e },
  mc36HdmiUacSyncDeck: { bucket: 'pcb_textured', tint: 0x0a3a2a },
  // BIONZ XR 70-part expansion (PR #38)
  bionzDieIoEsdRing: { bucket: 'silicon_hero', tint: 0x3b82f6 },
  bionzMtcmosGateRing: { bucket: 'silicon_wafer_dark', tint: 0x1e3a8a },
  bionzMbistDummySi: { bucket: 'silicon_wafer_dark', tint: 0x334155 },
  bionzMgChassisPedestal: { bucket: 'magnesium_cast', tint: 0x475569 },
  bionzSy1122Mainboard: { bucket: 'pcb_textured', tint: 0x064e3b },
  bionzRearEmiShield: { bucket: 'emi_shield_metal', tint: 0xb8c2ce },
  bionzAiCoprocPkg: { bucket: 'ic_epoxy_dark', tint: 0x1e1b4b },
  bionzWifi6eSipCan: { bucket: 'emi_shield_metal', tint: 0xcbd5e1 },
  bionzUsbcPdPcb: { bucket: 'pcb_textured', tint: 0x065f46 },
  bionzChargerEfusePcb: { bucket: 'pcb_textured', tint: 0x065f46 },
  bionzPcieCfxMuxPcb: { bucket: 'pcb_textured', tint: 0x064e3b },
  bionzMipiEvfBridgePcb: { bucket: 'pcb_textured', tint: 0x064e3b },
  bionzAkmAudioPcb: { bucket: 'pcb_textured', tint: 0x065f46 },
  bionzIbisServoPcb: { bucket: 'pcb_textured', tint: 0x064e3b },
  bionzEpsonGyroPcb: { bucket: 'pcb_textured', tint: 0x065f46 },
  bionzShutterDriverPcb: { bucket: 'pcb_textured', tint: 0x064e3b },
  bionzRtcCoinBackupPcb: { bucket: 'pcb_textured', tint: 0x065f46 },
  bionzTelemetryGuardPcb: { bucket: 'pcb_textured', tint: 0x065f46 },
  bionzTiQfnIc: { bucket: 'ic_epoxy_dark', tint: 0x181c22 },
  bionzAkmCodecIc: { bucket: 'ic_epoxy_dark', tint: 0x1c212b },
  bionzRenesasBonoboIc: { bucket: 'ic_epoxy_dark', tint: 0x161a22 },
  bionzSeikoCoinTop: { bucket: 'stainless_machined', tint: 0xd1d8e0 },
  bionzEpsonQuartzLid: { bucket: 'gold_plating', tint: 0xd4a442 },
};

/**
 * Tagged lightweight material proxy handle backed 100% by ResourceCache (zero direct new THREE.Mesh*Material).
 * V2UnitCompiler reads `__v2Tag` directly when compiling meshes into Tier-1 InstancedMesh & Tier-2 BatchedMesh!
 */
export interface V2MaterialProxyHandle {
  readonly library: V2MaterialLibrary;
  readonly dryboxPalette: Record<string, THREE.Material>;
  releaseAll(): void;
}

export function getV2MaterialTag(mat: THREE.Material | null | undefined): V2MaterialTag | null {
  if (!mat) return null;
  const tag = (mat as unknown as { __v2Tag?: V2MaterialTag }).__v2Tag;
  if (tag) return tag;
  const bucket = mat.userData?.__materialBucket as MaterialBucketKey | undefined;
  if (bucket) {
    const col = (mat as THREE.MeshStandardMaterial).color;
    return {
      bucket,
      tint: col ? col.getHex() : 0xffffff,
      heroKey: mat.userData?.__heroKey as string | undefined,
    };
  }
  return null;
}

export function createV2MaterialProxy(
  cache: ResourceCache,
  quality: QualityTier,
  renderMode: RenderMode,
  clippingPlanes: THREE.Plane[],
  heroSpecs?: Readonly<Record<string, HeroMaterialSpec>>
): V2MaterialProxyHandle {
  const acquiredCacheKeys: string[] = [];
  const memoCore = new Map<string, THREE.Material>();
  const memoUltra = new Map<string, THREE.Material>();

  const makeTaggedProxy = (
    prop: string,
    spec: MaterialBindingSpec,
    heroKey?: string
  ): THREE.Material => {
    const heroSpec = heroKey && heroSpecs ? heroSpecs[heroKey] : undefined;
    const baseMat = heroSpec
      ? cache.acquireHeroMaterial(heroKey!, heroSpec, quality, renderMode, clippingPlanes)
      : cache.acquireMaterial(spec.bucket, quality, renderMode, clippingPlanes);
    const cacheKey = baseMat.userData.__cacheKey as string | undefined;
    if (cacheKey) acquiredCacheKeys.push(cacheKey);

    const tag: V2MaterialTag = {
      bucket: heroSpec ? heroSpec.bucket : spec.bucket,
      tint: heroSpec ? (heroSpec.baseColor ?? 0xffffff) : spec.tint,
      heroKey: heroSpec ? heroKey : undefined,
      heroSpec,
    };

    return new Proxy(baseMat, {
      get(target, key, receiver) {
        if (key === '__v2Tag') return tag;
        if (key === '__v2Prop') return prop;
        return Reflect.get(target, key, receiver);
      },
    });
  };

  const ultraProxy = new Proxy(
    {},
    {
      get(_target, prop) {
        if (typeof prop !== 'string') return undefined;
        if (prop === 'list' || prop === 'heroList') return [];
        const cached = memoUltra.get(prop);
        if (cached) return cached;
        const spec = ULTRA_MATERIAL_CATALOG[prop] ?? { bucket: 'matte_chassis' as MaterialBucketKey, tint: 0x6b7280 };
        const heroKey = heroSpecs && Object.prototype.hasOwnProperty.call(heroSpecs, prop) ? prop : undefined;
        const mat = makeTaggedProxy(prop, spec, heroKey);
        memoUltra.set(prop, mat);
        return mat;
      },
    }
  );

  const coreProxy = new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === 'clippingPlanes') return clippingPlanes;
        if (prop === 'ultra') return ultraProxy;
        if (prop === 'allMaterials') return [];
        if (typeof prop !== 'string') return undefined;
        const cached = memoCore.get(prop);
        if (cached) return cached;
        const spec = CORE_MATERIAL_CATALOG[prop] ?? { bucket: 'matte_chassis' as MaterialBucketKey, tint: 0x6b7280 };
        const heroKey = heroSpecs && Object.prototype.hasOwnProperty.call(heroSpecs, prop) ? prop : undefined;
        const mat = makeTaggedProxy(prop, spec, heroKey);
        memoCore.set(prop, mat);
        return mat;
      },
    }
  ) as unknown as V2MaterialLibrary;

  const dryboxPalette = new Proxy(
    {},
    {
      get(_target, prop) {
        if (typeof prop !== 'string') return undefined;
        const cached = memoCore.get(prop);
        if (cached) return cached;
        const spec = CORE_MATERIAL_CATALOG[prop] ?? { bucket: 'matte_chassis' as MaterialBucketKey, tint: 0x6b7280 };
        const mat = makeTaggedProxy(prop, spec);
        memoCore.set(prop, mat);
        return mat;
      },
    }
  ) as Record<string, THREE.Material>;

  return {
    library: coreProxy,
    dryboxPalette,
    releaseAll: () => {
      for (let i = 0; i < acquiredCacheKeys.length; i++) {
        cache.releaseMaterial(acquiredCacheKeys[i]);
      }
      acquiredCacheKeys.length = 0;
      memoCore.clear();
      memoUltra.clear();
    },
  };
}
