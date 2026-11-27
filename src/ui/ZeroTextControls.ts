import {
  CadPart,
  CameraPreset,
  GraphicsQuality,
  LensSection,
  RenderMode,
  ScaleMode,
  SectionAxis,
  SensorFabStage,
  SensorFabVolume,
} from '../assemblies/types';

export interface ZeroTextUIHandlers {
  onModeChange: (mode: ScaleMode) => void;
  onLensSectionChange: (section: LensSection) => void;
  onSensorFabVolumeChange: (vol: SensorFabVolume) => void;
  onSensorFabStageChange: (stage: SensorFabStage) => void;
  onExplodeChange: (value: number) => void;
  onSectionAxisChange: (axis: SectionAxis) => void;
  onSectionValueChange: (value: number) => void;
  onRenderModeChange: (mode: RenderMode) => void;
  onQualityChange: (quality: GraphicsQuality) => void;
  onKineToggle?: (enabled: boolean) => void;
  onPhysicsToggle: (active: boolean) => void;
  onOpticsStudioToggle: () => void;
  onOpenPlayground?: () => void;
  onMiraiSubViewChange?: (subView: number) => void;
  onOpenMiraiStudio?: (tab: 'reports' | 'matrix' | 'glossary') => void;
  onResetVisibility: () => void;
  onFullscreenToggle: () => void;
  onCameraPreset: (preset: CameraPreset) => void;
  onSelectPart: (partId: string) => void;
  onHoverPart: (partId: string | null) => void;
  onToggleHidePart: (partId: string) => void;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgIcon(inner: string, viewBox = '0 0 24 24'): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = inner;
  return svg;
}

const ICONS = {
  welcome: '<path d="M12 3l2.4 5.2L20 10.5l-5.6 2.3L12 18l-2.4-5.2L4 10.5l5.6-2.3z"/><circle cx="19" cy="18" r="1.6"/>',
  completeCamera:
    '<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="3.6"/><circle cx="12" cy="13.5" r="1.2" fill="currentColor" stroke="none"/>',
  cameraBodyOnly:
    '<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><rect x="9.4" y="11.6" width="5.2" height="3.6" rx="0.6"/>',
  lens: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7.5 6.5c1.6 3.2 1.6 7.8 0 11"/><path d="M16.5 6.5c-1.6 3.2-1.6 7.8 0 11"/>',
  mount: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="5.5" r="1" fill="currentColor" stroke="none"/>',
  shutter: '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/>',
  sensor: '<rect x="4" y="6" width="16" height="12" rx="2"/><rect x="8" y="9" width="8" height="6" rx="0.8"/>',
  mainboard: '<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/><line x1="8.5" y1="12" x2="5" y2="12"/><line x1="15.5" y1="12" x2="19" y2="12"/>',
  evf: '<path d="M5 17V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8z"/><circle cx="12" cy="12" r="3.2"/>',
  lcd: '<rect x="4" y="5" width="16" height="11" rx="1.6"/><path d="M9 19h6"/><path d="M12 16v3"/>',
  body: '<path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 6.5V5h10v1.5"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="1.8"/><rect x="9.5" y="9.5" width="5" height="5" rx="0.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  pixel: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  fab: '<circle cx="12" cy="12" r="8"/><line x1="4.5" y1="12" x2="19.5" y2="12"/><line x1="12" y1="4.5" x2="12" y2="19.5"/><circle cx="12" cy="12" r="3"/>',
  battery: '<rect x="3" y="7" width="16" height="10" rx="2"/><line x1="21" y1="10" x2="21" y2="14"/><path d="M12 9.2l-1.8 3h2.4l-1.4 2.8"/>',
  card: '<path d="M6 3h9l4 4v14H6z"/><line x1="9" y1="8" x2="9" y2="11"/><line x1="12" y1="8" x2="12" y2="11"/><line x1="15" y1="8" x2="15" y2="11"/>',
  mishoe: '<path d="M4 17h16v2.5H4z"/><path d="M6 17V9h12v8"/><line x1="9" y1="12.5" x2="15" y2="12.5"/>',
  mic: '<rect x="9" y="3.5" width="6" height="10" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><line x1="12" y1="17" x2="12" y2="20.5"/><line x1="8.5" y1="20.5" x2="15.5" y2="20.5"/>',
  drybox: '<rect x="4" y="3.5" width="16" height="17" rx="2"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="16.5" cy="7.5" r="1.2"/>',
  mirai: '<path d="M12 2.8l7.6 4.4v9.6L12 21.2l-7.6-4.4V7.2z"/><path d="M12 7.2l3.8 2.2v4.4L12 16l-3.8-2.2V9.4z"/><circle cx="12" cy="11.6" r="1.3" fill="currentColor" stroke="none"/>',
  playground: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  assembled: '<rect x="7" y="7" width="10" height="10" rx="1.6"/>',
  exploded: '<rect x="3" y="4" width="5" height="5" rx="1"/><rect x="16" y="4" width="5" height="5" rx="1"/><rect x="3" y="15" width="5" height="5" rx="1"/><rect x="16" y="15" width="5" height="5" rx="1"/><circle cx="12" cy="12" r="2"/>',
  physics: '<polygon points="7 5 19 12 7 19 7 5"/>',
  optics: '<path d="M3 7h5l4 5 4-4h5"/><path d="M3 17h5l4-5 4 4h5"/>',
  resetVis: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  fullscreenEnter: '<path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/>',
  fullscreenExit: '<path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/>',
};

interface AssemblyPaletteItem {
  readonly mode: ScaleMode;
  readonly label: string;
  readonly sub: string;
  readonly icon: string;
}

interface AssemblyPaletteGroup {
  readonly heading: string;
  readonly items: readonly AssemblyPaletteItem[];
}

const ASSEMBLY_GROUPS: readonly AssemblyPaletteGroup[] = [
  {
    heading: 'イントロダクション',
    items: [
      { mode: 'welcome', label: 'ようこそ 3D立体', sub: '220パーツ実動作CNC光学装置', icon: ICONS.welcome },
    ],
  },
  {
    heading: 'Future History MIRAI 2028',
    items: [
      { mode: 'mirai_2028', label: 'FH MIRAI 2028', sub: '未来技術48選・精密3D 5体', icon: ICONS.mirai },
    ],
  },
  {
    heading: 'カメラ全体ビュー',
    items: [
      { mode: 'integrated', label: 'α7 IV 完成カメラ', sub: 'レンズ装着・全統合', icon: ICONS.completeCamera },
      { mode: 'camera_body', label: 'カメラボディ全体', sub: 'マウント開放・内部透視', icon: ICONS.cameraBodyOnly },
    ],
  },
  {
    heading: '主要光学・メカユニット',
    items: [
      { mode: 'lens', label: '50mm F1.2 GM', sub: '大口径単焦点レンズ', icon: ICONS.lens },
      { mode: 'mount', label: 'Eマウント機構', sub: '18mmフランジ・接点', icon: ICONS.mount },
      { mode: 'shutter', label: 'シャッター機構', sub: 'フォーカルプレーン', icon: ICONS.shutter },
      { mode: 'sensor', label: 'CMOS & IBIS', sub: '33MP裏面照射・5軸', icon: ICONS.sensor },
      { mode: 'mainboard', label: 'メイン基板', sub: 'HDI多層・高速I/O', icon: ICONS.mainboard },
      { mode: 'evf', label: 'EVFファインダー', sub: '368万ドットOLED', icon: ICONS.evf },
      { mode: 'lcd', label: '背面液晶LCD', sub: 'バリアングル機構', icon: ICONS.lcd },
      { mode: 'body', label: 'マグネシウム筐体', sub: '防塵防滴フレーム', icon: ICONS.body },
    ],
  },
  {
    heading: '半導体・極超解剖',
    items: [
      { mode: 'bionz', label: 'BIONZ XR (V1)', sub: '画像処理SoC解剖', icon: ICONS.chip },
      { mode: 'bionz_v2', label: 'BIONZ XR (V2)', sub: '2nm GAA・裏面電源', icon: ICONS.chip },
      { mode: 'micro', label: 'ピクセル構造 (V1)', sub: 'マイクロレンズ・PD', icon: ICONS.pixel },
      { mode: 'micro_v2', label: 'ピクセル構造 (V2)', sub: '原子・ナノ構造拡大', icon: ICONS.pixel },
      { mode: 'sensor_fab', label: 'センサー製造工程', sub: '全6巻・2,110工程', icon: ICONS.fab },
    ],
  },
  {
    heading: '電源・周辺・保管',
    items: [
      { mode: 'battery', label: 'NP-FZ100電源', sub: 'リチウムイオン電池', icon: ICONS.battery },
      { mode: 'cfexpress', label: 'CFexpress 4.0', sub: 'PCIe高速メモリー', icon: ICONS.card },
      { mode: 'mishoe', label: 'MIシュー', sub: '21ピン電子インターフェース', icon: ICONS.mishoe },
      { mode: 'mic', label: 'ECMマイク', sub: 'デジタル音響収録', icon: ICONS.mic },
      { mode: 'drybox', label: '防湿庫', sub: '光学機材保存環境', icon: ICONS.drybox },
    ],
  },
];

const ITEM_BY_MODE = new Map<ScaleMode, AssemblyPaletteItem>();
for (const g of ASSEMBLY_GROUPS) {
  for (const it of g.items) {
    ITEM_BY_MODE.set(it.mode, it);
  }
}

const FAB_STAGE_PRESETS: Record<SensorFabVolume, ReadonlyArray<{ id: SensorFabStage; label: string }>> = {
  0: [
    { id: 'overview', label: '全景' },
    { id: 'phases', label: '工程列' },
    { id: 'litho', label: '露光機' },
    { id: 'variants', label: '方式比較' },
  ],
  1: [
    { id: 'v1_overview', label: '全景' },
    { id: 'v1_photonics', label: '光電変換' },
    { id: 'v1_archs', label: '世代構造' },
    { id: 'v1_duel', label: 'BSI対決' },
    { id: 'v1_wall', label: '微細限界' },
  ],
  2: [
    { id: 'v2_overview', label: '全景' },
    { id: 'v2_refine', label: '高純度精製' },
    { id: 'v2_mcz', label: 'MCZ引上' },
    { id: 'v2_wafer', label: '研磨加工' },
    { id: 'v2_epi_ship', label: 'エピ成長' },
  ],
  3: [
    { id: 'v3_overview', label: '全景' },
    { id: 'v3_tcad', label: 'TCAD' },
    { id: 'v3_layout', label: '設計検証' },
    { id: 'v3_opc', label: 'OPC補正' },
    { id: 'v3_maskfab', label: 'マスク製造' },
  ],
  4: [
    { id: 'v4_overview', label: '全景' },
    { id: 'v4_sti_dti', label: 'DTI分離' },
    { id: 'v4_ppd_mev', label: '埋込PD' },
    { id: 'v4_vtg_gate', label: '縦型TG' },
    { id: 'v4_pin_sab', label: 'ピニング' },
  ],
  5: [
    { id: 'v5_overview', label: '全景' },
    { id: 'v5_w_m1', label: 'W/M1配線' },
    { id: 'v5_m2_m4', label: 'Cu多層' },
    { id: 'v5_m5_wat', label: '最上層WAT' },
    { id: 'v5_hb_cmp', label: 'Cu-Cu接合' },
  ],
};

/**
 * Overhauled Industrial Precision Studio CAD HUD.
 * - Left visibility rail (`.layer-rail`) completely removed for an unobstructed 3D studio stage!
 * - Clean 3-zone floating Top Bar:
 *     Left   : Assembly Selector Pill + Categorized Assembly Palette Popover + Play Ground CTA
 *     Center : Contextual sub-view switcher (Lens 3-Section / V1-V2 / Sensor Fab Vol.0-5)
 *     Right  : 4-Tier Quality Switcher (`LITE | STD | HIGH | ULTRA`) + Camera Angle Pill
 * - Streamlined Bottom Workbench Dock with Explode slider + live `%` badge, Render mode,
 *   auto-expanding Section Cut slider, Physics, Optics Studio, Reset Visibility, and Fullscreen.
 */
export class ZeroTextControls {
  private readonly handlers: ZeroTextUIHandlers;
  private currentMode: ScaleMode = 'welcome';
  private currentFabVol: SensorFabVolume = 0;
  private currentMiraiSubView: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 1;
  private paletteOpen = false;

  // Top Bar Elements
  private assemblyTriggerBtn: HTMLButtonElement;
  private assemblyIconHost: HTMLElement;
  private assemblyLabelEl: HTMLElement;
  private assemblyCountEl: HTMLElement;
  private paletteEl: HTMLElement;
  private paletteBtns = new Map<ScaleMode, HTMLButtonElement>();
  private playgroundBtn: HTMLButtonElement;
  private miraiCtaBtn: HTMLButtonElement;

  private subViewHost: HTMLElement;
  private lensSubBar: HTMLElement;
  private lensSecBtns: Record<LensSection, HTMLButtonElement>;
  private v2SubBar: HTMLElement;
  private v2ToggleBtn: HTMLButtonElement;
  private fabSubBar: HTMLElement;
  private fabVolBtns: Record<SensorFabVolume, HTMLButtonElement>;
  private fabStageRow: HTMLElement;
  private fabStageBtns = new Map<SensorFabStage, HTMLButtonElement>();
  private miraiSubBar: HTMLElement;
  private miraiSubBtns: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, HTMLButtonElement>;

  private qualityBtns: Partial<Record<GraphicsQuality, HTMLButtonElement>>;
  private kineToggleBtn: HTMLButtonElement;
  private kineEnabled = true;

  // Bottom Workbench Dock Elements
  private explodeSlider: HTMLInputElement;
  private explodePctEl: HTMLElement;
  private sectionAxisBtns: Record<SectionAxis, HTMLButtonElement>;
  private sectionSliderWrap: HTMLElement;
  private sectionSlider: HTMLInputElement;
  private resetVisBtn: HTMLButtonElement;

  constructor(root: HTMLElement, handlers: ZeroTextUIHandlers) {
    this.handlers = handlers;

    // =========================================================================
    // TOP FLOATING PRECISION BAR
    // =========================================================================
    const topBar = document.createElement('header');
    topBar.className = 'studio-topbar';

    // --- LEFT: Assembly Selector Pill + Popover + Play Ground CTA ---
    const topLeft = document.createElement('div');
    topLeft.className = 'studio-topbar-left';

    const selectorWrap = document.createElement('div');
    selectorWrap.className = 'assembly-selector-wrap';

    this.assemblyTriggerBtn = document.createElement('button');
    this.assemblyTriggerBtn.type = 'button';
    this.assemblyTriggerBtn.className = 'assembly-trigger-pill';
    this.assemblyTriggerBtn.setAttribute('aria-haspopup', 'true');
    this.assemblyTriggerBtn.setAttribute('aria-expanded', 'false');

    this.assemblyIconHost = document.createElement('span');
    this.assemblyIconHost.className = 'assembly-trigger-icon';
    this.assemblyLabelEl = document.createElement('span');
    this.assemblyLabelEl.className = 'assembly-trigger-label';
    this.assemblyCountEl = document.createElement('span');
    this.assemblyCountEl.className = 'assembly-trigger-badge';
    const chev = svgIcon(ICONS.chevronDown);
    chev.classList.add('assembly-trigger-chev');
    this.assemblyTriggerBtn.append(
      this.assemblyIconHost,
      this.assemblyLabelEl,
      this.assemblyCountEl,
      chev
    );
    this.assemblyTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setPaletteOpen(!this.paletteOpen);
    });

    // Categorized Assembly Palette Popover
    this.paletteEl = document.createElement('div');
    this.paletteEl.className = 'assembly-palette-popover';
    this.paletteEl.setAttribute('aria-hidden', 'true');

    for (const group of ASSEMBLY_GROUPS) {
      const sec = document.createElement('div');
      sec.className = 'assembly-palette-section';
      const head = document.createElement('div');
      head.className = 'assembly-palette-heading';
      head.textContent = group.heading;
      const grid = document.createElement('div');
      grid.className = 'assembly-palette-grid';

      for (const item of group.items) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'assembly-palette-item';
        btn.dataset.mode = item.mode;
        const ic = document.createElement('span');
        ic.className = 'assembly-palette-ic';
        ic.appendChild(svgIcon(item.icon));
        const txt = document.createElement('span');
        txt.className = 'assembly-palette-txt';
        txt.innerHTML = `<strong>${item.label}</strong><em>${item.sub}</em>`;
        btn.append(ic, txt);
        btn.addEventListener('click', () => {
          this.setPaletteOpen(false);
          this.syncMode(item.mode);
          handlers.onModeChange(item.mode);
        });
        this.paletteBtns.set(item.mode, btn);
        grid.appendChild(btn);
      }

      sec.append(head, grid);
      this.paletteEl.appendChild(sec);
    }

    selectorWrap.append(this.assemblyTriggerBtn, this.paletteEl);

    // Play Ground CAD Studio Button
    this.playgroundBtn = document.createElement('button');
    this.playgroundBtn.type = 'button';
    this.playgroundBtn.className = 'playground-cta-pill';
    this.playgroundBtn.title = 'Play Ground — 全パーツ自由CAD組立＆技術者1000点採点';
    this.playgroundBtn.append(svgIcon(ICONS.playground));
    const pgTxt = document.createElement('span');
    pgTxt.textContent = 'Play Ground';
    this.playgroundBtn.appendChild(pgTxt);
    this.playgroundBtn.addEventListener('click', () => {
      this.setPaletteOpen(false);
      this.handlers.onOpenPlayground?.();
    });

    // Future History MIRAI 2028 Quick-Launch CTA Pill
    this.miraiCtaBtn = document.createElement('button');
    this.miraiCtaBtn.type = 'button';
    this.miraiCtaBtn.className = 'mirai-cta-pill';
    this.miraiCtaBtn.title = 'Future History MIRAI 2028 — 2028未来技術48選＆精密3D試作(FH01/FH02)';
    this.miraiCtaBtn.append(svgIcon(ICONS.mirai));
    const miraiTxt = document.createElement('span');
    miraiTxt.textContent = 'FH 2028';
    this.miraiCtaBtn.append(miraiTxt);
    this.miraiCtaBtn.addEventListener('click', () => {
      this.setPaletteOpen(false);
      if (this.currentMode !== 'mirai_2028') {
        this.syncMode('mirai_2028');
        handlers.onModeChange('mirai_2028');
      } else {
        this.handlers.onOpenMiraiStudio?.('reports');
      }
    });

    topLeft.append(selectorWrap, this.playgroundBtn, this.miraiCtaBtn);

    // --- CENTER: Contextual Sub-View Bar ---
    this.subViewHost = document.createElement('div');
    this.subViewHost.className = 'studio-topbar-center';

    // Lens 3-Section bar
    this.lensSubBar = document.createElement('div');
    this.lensSubBar.className = 'studio-subbar is-hidden';
    const makeLensSec = (sec: LensSection, label: string) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `studio-sub-btn${sec === 1 ? ' is-active' : ''}`;
      b.textContent = label;
      b.addEventListener('click', () => {
        this.syncLensSection(sec);
        handlers.onLensSectionChange(sec);
      });
      return b;
    };
    this.lensSecBtns = {
      1: makeLensSec(1, '1: 後群・マウント'),
      2: makeLensSec(2, '2: 中群・絞りXD'),
      3: makeLensSec(3, '3: 前群・XAフード'),
    };
    this.lensSubBar.append(this.lensSecBtns[1], this.lensSecBtns[2], this.lensSecBtns[3]);

    // V1 / V2 Deep-Zoom Switcher (micro <-> micro_v2, bionz <-> bionz_v2)
    this.v2SubBar = document.createElement('div');
    this.v2SubBar.className = 'studio-subbar is-hidden';
    this.v2ToggleBtn = document.createElement('button');
    this.v2ToggleBtn.type = 'button';
    this.v2ToggleBtn.className = 'studio-sub-btn is-accent';
    this.v2ToggleBtn.textContent = 'V2 極超解剖へ切替';
    this.v2ToggleBtn.addEventListener('click', () => {
      const next: ScaleMode | null =
        this.currentMode === 'micro'
          ? 'micro_v2'
          : this.currentMode === 'micro_v2'
            ? 'micro'
            : this.currentMode === 'bionz'
              ? 'bionz_v2'
              : this.currentMode === 'bionz_v2'
                ? 'bionz'
                : null;
      if (next) {
        this.syncMode(next);
        handlers.onModeChange(next);
      }
    });
    this.v2SubBar.appendChild(this.v2ToggleBtn);

    // Sensor Fab Vol.0 - Vol.5 + Stage bar
    this.fabSubBar = document.createElement('div');
    this.fabSubBar.className = 'studio-fab-subbar is-hidden';
    const fabVolRow = document.createElement('div');
    fabVolRow.className = 'studio-subbar';
    const makeFabVol = (vol: SensorFabVolume) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `studio-sub-btn${vol === 0 ? ' is-active' : ''}`;
      b.textContent = `Vol.${vol}`;
      b.addEventListener('click', () => {
        this.syncFabVolume(vol);
        handlers.onSensorFabVolumeChange(vol);
      });
      return b;
    };
    this.fabVolBtns = {
      0: makeFabVol(0),
      1: makeFabVol(1),
      2: makeFabVol(2),
      3: makeFabVol(3),
      4: makeFabVol(4),
      5: makeFabVol(5),
    };
    fabVolRow.append(
      this.fabVolBtns[0],
      this.fabVolBtns[1],
      this.fabVolBtns[2],
      this.fabVolBtns[3],
      this.fabVolBtns[4],
      this.fabVolBtns[5]
    );
    this.fabStageRow = document.createElement('div');
    this.fabStageRow.className = 'studio-subbar studio-fab-stages';
    this.fabSubBar.append(fabVolRow, this.fabStageRow);
    this.rebuildFabStages(0);

    // Future History MIRAI 2028 contextual sub-bar (8 Watchmaker 3D Structures + Library Studio launchers)
    this.miraiSubBar = document.createElement('div');
    this.miraiSubBar.className = 'studio-subbar mirai-subbar is-hidden';
    const miraiStructRail = document.createElement('div');
    miraiStructRail.className = 'mirai-struct-rail';
    const makeMiraiSub = (
      sv: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      label: string,
      tip: string,
      extraClass = ''
    ) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `studio-sub-btn mirai-sub-struct${extraClass ? ` ${extraClass}` : ''}${sv === 1 ? ' is-active' : ''}`;
      b.textContent = label;
      b.title = tip;
      b.addEventListener('click', () => {
        this.syncMiraiSubView(sv);
        handlers.onMiraiSubViewChange?.(sv);
      });
      return b;
    };
    this.miraiSubBtns = {
      1: makeMiraiSub(1, 'FH01 SPAD', 'FH01 フルサイズ単一光子SPAD/QIS 3D積層センサー（16パーツ）'),
      2: makeMiraiSub(2, 'FH02 3層RGB', 'FH02 ペロブスカイト/OPF 3層垂直RGBセンサー（16パーツ）'),
      3: makeMiraiSub(3, 'FH08 メタ50', 'FH08 ASI逆設計 28mm・180g 50mm F1.4 自由曲面メタ光学レンズ（18パーツ）'),
      4: makeMiraiSub(4, 'FH32 MEMS空冷', 'FH32 IP68水密隔離・超音波MEMSソリッドステート空冷モジュール（18パーツ）'),
      5: makeMiraiSub(5, 'FH25 3万nit', 'FH25 30,000ニット・240Hz True-RGBタンデム パンケーキEVF（18パーツ）'),
      6: makeMiraiSub(6, 'FH20 2nm頭脳', 'FH20 2nm/A16 GAA＋BSPDN 1,000 TOPS チップレットSoC（18パーツ）'),
      7: makeMiraiSub(7, 'FH17 磁気IBIS', 'FH17 地球自転補正(15.04"/s)＋磁気浮上10–11段IBIS＆±2°チルト（18パーツ）'),
      8: makeMiraiSub(
        8,
        'FH48 2028統合機',
        'FH48 2028年12月到達点 約800g・持続10–15W ポスト・カメラ統合機（18パーツ）',
        'mirai-sub-flagship'
      ),
    };
    miraiStructRail.append(
      this.miraiSubBtns[1],
      this.miraiSubBtns[2],
      this.miraiSubBtns[3],
      this.miraiSubBtns[4],
      this.miraiSubBtns[5],
      this.miraiSubBtns[6],
      this.miraiSubBtns[7],
      this.miraiSubBtns[8]
    );
    const miraiSep = document.createElement('span');
    miraiSep.className = 'mirai-subbar-sep';
    const miraiLibGroup = document.createElement('div');
    miraiLibGroup.className = 'mirai-lib-group';
    const makeMiraiLib = (tab: 'reports' | 'matrix' | 'glossary', label: string) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'studio-sub-btn mirai-sub-lib';
      b.textContent = label;
      b.addEventListener('click', () => handlers.onOpenMiraiStudio?.(tab));
      return b;
    };
    miraiLibGroup.append(
      makeMiraiLib('reports', 'レポート'),
      makeMiraiLib('matrix', '48技術'),
      makeMiraiLib('glossary', '用語113')
    );
    this.miraiSubBar.append(miraiStructRail, miraiSep, miraiLibGroup);

    this.subViewHost.append(this.lensSubBar, this.v2SubBar, this.fabSubBar, this.miraiSubBar);

    // --- RIGHT: Minimalist 2-Tier Quality Switcher (LITE | ULTRA) ---
    // (STD & HIGH remain fully intact in the rendering engine & URL ?quality= API; buttons removed per UX design)
    const topRight = document.createElement('div');
    topRight.className = 'studio-topbar-right';

    // Standalone KINE Mode ON/OFF Toggle Pill (sibling of .quality-pill so quality buttons remain strictly LITE | ULTRA)
    this.kineToggleBtn = document.createElement('button');
    this.kineToggleBtn.type = 'button';
    this.kineToggleBtn.className = 'kine-toggle-pill is-active';
    this.kineToggleBtn.setAttribute('aria-pressed', 'true');
    this.kineToggleBtn.title =
      'KINEモード ON/OFF — カメラ視界外・完全遮蔽の不可視パーツを非表示にしてさらに軽量化（選択・ホバー・X-Ray・断面は常時保護）';
    const kineDot = document.createElement('span');
    kineDot.className = 'kine-toggle-dot';
    const kineLbl = document.createElement('span');
    kineLbl.textContent = 'KINE';
    this.kineToggleBtn.append(kineDot, kineLbl);
    this.kineToggleBtn.addEventListener('click', () => {
      this.kineEnabled = !this.kineEnabled;
      this.syncKineMode(this.kineEnabled);
      this.handlers.onKineToggle?.(this.kineEnabled);
    });

    const qualityGroup = document.createElement('div');
    qualityGroup.className = 'studio-seg-pill quality-pill';
    qualityGroup.setAttribute('role', 'group');
    qualityGroup.setAttribute('aria-label', '描画品質ティア');

    const makeQual = (q: GraphicsQuality, label: string, tip: string) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `studio-seg-item quality-tier-${q}`;
      b.textContent = label;
      b.title = tip;
      b.addEventListener('click', () => {
        this.syncQuality(q);
        handlers.onQualityChange(q);
      });
      return b;
    };
    this.qualityBtns = {
      standard_lite: makeQual(
        'standard_lite',
        'LITE',
        'STD LITE v2 — 超軽量Dual-Atlas MatCap＋GPU分解（激しい移動時はFASTへ自動切替）'
      ),
      ultra: makeQual(
        'ultra',
        'ULTRA',
        'ULTRA V3 — 多段階自動切替（静止ULTRA無ジャギーAA＋F1.2ボケ / 移動LITE / 激動FAST）'
      ),
    };
    qualityGroup.append(this.qualityBtns.standard_lite!, this.qualityBtns.ultra!);

    topRight.append(this.kineToggleBtn, qualityGroup);
    topBar.append(topLeft, this.subViewHost, topRight);

    // =========================================================================
    // BOTTOM FLOATING WORKBENCH DOCK (Minimalist: Explode + Section Cut + Reset Vis)
    // =========================================================================
    const bottomDock = document.createElement('footer');
    bottomDock.className = 'studio-bottom-dock';

    // 1. Explode slider + live % badge (flanking shape buttons removed per minimalist UX)
    const explodeCluster = document.createElement('div');
    explodeCluster.className = 'dock-cluster dock-explode';

    this.explodeSlider = document.createElement('input');
    this.explodeSlider.type = 'range';
    this.explodeSlider.className = 'dock-slider';
    this.explodeSlider.min = '0';
    this.explodeSlider.max = '100';
    this.explodeSlider.step = '1';
    this.explodeSlider.value = '0';
    this.explodeSlider.setAttribute('aria-label', '分解度スライダー');
    this.explodeSlider.addEventListener('input', () => {
      const v = Number(this.explodeSlider.value) / 100;
      this.explodePctEl.textContent = `${Math.round(v * 100)}%`;
      handlers.onExplodeChange(v);
    });

    this.explodePctEl = document.createElement('span');
    this.explodePctEl.className = 'dock-pct-badge';
    this.explodePctEl.textContent = '0%';
    explodeCluster.append(this.explodeSlider, this.explodePctEl);

    // 2. Section Cut Cluster (OFF | X | Y + auto-expanding slider)
    const secCluster = document.createElement('div');
    secCluster.className = 'dock-cluster dock-section';
    const secSeg = document.createElement('div');
    secSeg.className = 'studio-seg-pill dock-seg';
    const makeSec = (ax: SectionAxis, label: string) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `studio-seg-item${ax === 'off' ? ' is-active' : ''}`;
      b.textContent = label;
      b.title = ax === 'off' ? '断面カット OFF' : `${label}軸 断面カット`;
      b.addEventListener('click', () => {
        this.syncSectionAxis(ax, Number(this.sectionSlider.value) / 100);
        handlers.onSectionAxisChange(ax);
      });
      return b;
    };
    this.sectionAxisBtns = {
      off: makeSec('off', '断面OFF'),
      x: makeSec('x', 'X断面'),
      y: makeSec('y', 'Y断面'),
    };
    secSeg.append(this.sectionAxisBtns.off, this.sectionAxisBtns.x, this.sectionAxisBtns.y);

    this.sectionSliderWrap = document.createElement('div');
    this.sectionSliderWrap.className = 'dock-section-slider-wrap is-collapsed';
    this.sectionSlider = document.createElement('input');
    this.sectionSlider.type = 'range';
    this.sectionSlider.className = 'dock-slider dock-slider-sm';
    this.sectionSlider.min = '0';
    this.sectionSlider.max = '100';
    this.sectionSlider.value = '50';
    this.sectionSlider.setAttribute('aria-label', '断面位置');
    this.sectionSlider.addEventListener('input', () => {
      handlers.onSectionValueChange(Number(this.sectionSlider.value) / 100);
    });
    this.sectionSliderWrap.appendChild(this.sectionSlider);
    secCluster.append(secSeg, this.sectionSliderWrap);

    // 3. Reset Visibility icon button (only visible when parts are hidden/isolated)
    this.resetVisBtn = document.createElement('button');
    this.resetVisBtn.type = 'button';
    this.resetVisBtn.className = 'dock-icon-btn is-hidden-btn';
    this.resetVisBtn.title = '非表示パーツをすべて再表示';
    this.resetVisBtn.setAttribute('aria-label', '非表示パーツをすべて再表示');
    this.resetVisBtn.appendChild(svgIcon(ICONS.resetVis));
    this.resetVisBtn.disabled = true;
    this.resetVisBtn.addEventListener('click', () => handlers.onResetVisibility());

    bottomDock.append(explodeCluster, secCluster, this.resetVisBtn);

    // Close assembly palette on outside click or Escape
    document.addEventListener('click', (e) => {
      if (this.paletteOpen && !selectorWrap.contains(e.target as Node)) {
        this.setPaletteOpen(false);
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.paletteOpen) {
        this.setPaletteOpen(false);
      }
    });

    root.append(topBar, bottomDock);
    this.syncMode('welcome');
  }

  private setPaletteOpen(open: boolean): void {
    this.paletteOpen = open;
    this.paletteEl.classList.toggle('is-open', open);
    this.paletteEl.setAttribute('aria-hidden', open ? 'false' : 'true');
    this.assemblyTriggerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    this.assemblyTriggerBtn.classList.toggle('is-open', open);
  }

  private rebuildFabStages(vol: SensorFabVolume): void {
    this.fabStageRow.replaceChildren();
    this.fabStageBtns.clear();
    const stages = FAB_STAGE_PRESETS[vol] ?? FAB_STAGE_PRESETS[0];
    for (let i = 0; i < stages.length; i++) {
      const st = stages[i];
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `studio-sub-btn${i === 0 ? ' is-active' : ''}`;
      b.textContent = st.label;
      b.addEventListener('click', () => {
        this.syncFabStage(st.id);
        this.handlers.onSensorFabStageChange(st.id);
      });
      this.fabStageBtns.set(st.id, b);
      this.fabStageRow.appendChild(b);
    }
  }

  public syncFabVolume(vol: SensorFabVolume): void {
    this.currentFabVol = vol;
    ([0, 1, 2, 3, 4, 5] as const).forEach((v) => {
      this.fabVolBtns[v].classList.toggle('is-active', v === vol);
    });
    this.rebuildFabStages(vol);
  }

  public syncFabStage(stage: SensorFabStage): void {
    for (const [id, btn] of this.fabStageBtns.entries()) {
      btn.classList.toggle('is-active', id === stage);
    }
  }

  public syncLensSection(section: LensSection): void {
    ([1, 2, 3] as const).forEach((s) => {
      this.lensSecBtns[s].classList.toggle('is-active', s === section);
    });
  }

  public syncMiraiSubView(subView: number): void {
    const active = Math.max(1, Math.min(8, Math.round(subView || 1))) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    this.currentMiraiSubView = active;
    ([1, 2, 3, 4, 5, 6, 7, 8] as const).forEach((sv) => {
      this.miraiSubBtns[sv].classList.toggle('is-active', active === sv);
    });
    this.scrollActiveMiraiBtnIntoView(active);
  }

  private scrollActiveMiraiBtnIntoView(active: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): void {
    const btn = this.miraiSubBtns[active];
    const rail = btn?.parentElement;
    if (!btn || !rail) return;
    requestAnimationFrame(() => {
      if (rail.scrollWidth > rail.clientWidth + 2) {
        const targetLeft = btn.offsetLeft - (rail.clientWidth - btn.offsetWidth) * 0.5;
        rail.scrollLeft = Math.max(0, Math.min(rail.scrollWidth - rail.clientWidth, targetLeft));
      }
    });
  }

  public syncQuality(quality: GraphicsQuality): void {
    (['standard_lite', 'standard', 'high', 'ultra'] as const).forEach((q) => {
      this.qualityBtns[q]?.classList.toggle('is-active', q === quality);
    });
  }

  public syncKineMode(enabled: boolean): void {
    this.kineEnabled = enabled;
    this.kineToggleBtn.classList.toggle('is-active', enabled);
    this.kineToggleBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }

  public setExplodeValue(v: number): void {
    const pct = Math.round(Math.max(0, Math.min(1, v)) * 100);
    this.explodeSlider.value = String(pct);
    this.explodePctEl.textContent = `${pct}%`;
  }

  public syncMode(mode: ScaleMode): void {
    this.currentMode = mode;
    const item = ITEM_BY_MODE.get(mode) ?? ITEM_BY_MODE.get('welcome')!;
    this.assemblyIconHost.replaceChildren(svgIcon(item.icon));
    this.assemblyLabelEl.textContent = item.label;

    for (const [m, btn] of this.paletteBtns.entries()) {
      btn.classList.toggle('is-active', m === mode);
    }

    // Contextual center sub-bars
    this.lensSubBar.classList.toggle('is-hidden', mode !== 'lens');
    const isV2Pair =
      mode === 'micro' || mode === 'micro_v2' || mode === 'bionz' || mode === 'bionz_v2';
    this.v2SubBar.classList.toggle('is-hidden', !isV2Pair);
    if (isV2Pair) {
      const isV2 = mode === 'micro_v2' || mode === 'bionz_v2';
      this.v2ToggleBtn.textContent = isV2 ? 'V1 標準解剖へ戻る' : 'V2 極超解剖へ拡大';
      this.v2ToggleBtn.classList.toggle('is-active', isV2);
    }
    this.fabSubBar.classList.toggle('is-hidden', mode !== 'sensor_fab');
    if (mode === 'sensor_fab') {
      this.syncFabVolume(this.currentFabVol);
    }
    this.miraiSubBar.classList.toggle('is-hidden', mode !== 'mirai_2028');
    this.miraiCtaBtn.classList.toggle('is-active', mode === 'mirai_2028');
    if (mode === 'mirai_2028') {
      this.scrollActiveMiraiBtnIntoView(this.currentMiraiSubView);
    }
  }

  public syncSectionAxis(axis: SectionAxis, value = 0.5): void {
    (['off', 'x', 'y'] as const).forEach((ax) => {
      this.sectionAxisBtns[ax].classList.toggle('is-active', ax === axis);
    });
    this.sectionSliderWrap.classList.toggle('is-collapsed', axis === 'off');
    this.sectionSlider.value = String(Math.round(Math.max(0, Math.min(1, value)) * 100));
  }

  public syncPhysics(_active: boolean): void {
    // Physics button intentionally removed from HUD; API retained for compatibility.
  }

  public syncOpticsStudio(_active: boolean): void {
    // Optics studio button intentionally removed from HUD; API retained for compatibility.
  }

  public syncPlaygroundActive(active: boolean): void {
    this.playgroundBtn.classList.toggle('is-active', active);
  }

  public syncFullscreen(_active: boolean): void {
    // Fullscreen button intentionally removed from HUD (auto-fullscreen on tap); API retained.
  }

  /**
   * Left-side visibility rail was intentionally removed per UX redesign.
   * Updates only the part-count badge on the top Assembly Selector Pill and the
   * Reset Visibility dock button state so all callers remain 100% compatible.
   */
  public renderLayerRail(
    parts: CadPart[],
    _selectedId: string | null,
    _hoveredId: string | null,
    _isHidden: (id: string) => boolean,
    hasAnyHidden: boolean
  ): void {
    this.assemblyCountEl.textContent = parts.length > 0 ? `${parts.length}p` : '';
    this.resetVisBtn.disabled = !hasAnyHidden;
    this.resetVisBtn.classList.toggle('is-hidden-btn', !hasAnyHidden);
  }

  public syncHighlight(_selectedId: string | null, _hoveredId: string | null): void {
    // No left-side layer rail to update
  }
}
