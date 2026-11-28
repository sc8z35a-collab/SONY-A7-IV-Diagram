import { CadPart, PartExplanation, ScaleMode, SensorFabVolume } from '../assemblies/types';
import { isLazyExplanationStub, resolvePartExplanation } from '../assemblies/lazyExplanations';
import { OpticalScenarioId } from '../assemblies/lens/lensOpticalSim';

export type DrawerViewTab = 'all' | 'diagram' | 'explanation';

export interface ExplanationDrawerHandlers {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleIsolate: () => void;
  onHideCurrent: () => void;
  onOpenOpticsMotion?: (scenario: OpticalScenarioId, partId: string) => void;
  onSwitchMode?: (mode: ScaleMode) => void;
  onSwitchFabVolume?: (vol: SensorFabVolume) => void;
  onOpenMiraiReport?: (fhId: string) => void;
  onOpenMiraiGlossary?: (glossaryId: string) => void;
  onMiraiEditionChange?: (edition: 'beginner' | 'expert') => void;
}

const MIRAI_EDITION_KEY = 'mirai_2028_edition';
const MIRAI_AXIS_LABELS = ['物理・構造突破', '量産民主化', '既存比優位性', '撮影体験革命', 'ASI/AI加速'] as const;
const MIRAI_GLOSSARY_SHORT_LABELS: Readonly<Record<string, string>> = {
  '001': 'SPAD',
  '002': 'QIS',
  '003': 'ベイヤー配列',
  '004': 'ペロブスカイト',
  '008': '暗電流',
  '009': 'kTC雑音',
  '010': 'ショット雑音',
  '012': 'ダイナミックレンジ',
  '014': 'メタサーフェス／DOE',
  '015': '群遅延限界',
  '016': 'アッベ数',
  '017': 'エタンデュ／入射瞳',
  '018': 'ナノインプリント(NIL)',
  '020': '逆設計(Inverse Design)',
  '021': '色収差',
  '022': '自由曲面光学',
  '048': '回折限界',
  '051': 'PSF(点像分布関数)',
  '055': 'Micro-OLED',
  '056': 'True-RGBタンデム',
  '057': 'MicroLED',
  '024': 'ライトフィールド',
  '027': 'イベントセンサー',
  '033': '地球自転補正IBIS',
  '034': 'シャインプルーフ',
  '036': 'リングバッファ',
  '039': '2nm/A16 GAA',
  '040': 'BSPDN裏面電源',
  '041': 'チップレット',
  '042': 'TOPS演算指標',
  '043': '光リンク/CPO',
  '044': 'Neural Physics RAW',
  '046': '1.58-bit量子化',
  '047': '視覚世界モデル',
  '054': 'ハルシネーション',
  '058': '青色PHOLED',
  '059': 'LTPOバックプレーン',
  '067': '全固体電池(ASSB)',
  '068': 'アレニウス則',
  '069': 'デンドライト',
  '070': '超音波MEMS空冷',
  '071': '水密隔離カプセル',
  '072': '熱収支(TDP)',
  '073': 'IP68防水防塵',
  '074': 'トポロジー最適化',
  '075': 'ジャイロイド格子',
  '076': '電食(ガルバニック)',
  '077': '60GHz無接点通信',
  '078': '磁気共振給電',
  '082': 'CBA 3D NAND',
  '083': 'CFexpress 5.0',
  '084': 'STT-MRAM',
  '085': 'Wi-Fi 8',
  '086': '低軌道衛星NTN',
  '087': 'リンクバジェット',
  '088': 'C2PA 2.x',
  '089': '耐量子暗号PQC',
  '090': 'PUF物理鍵',
  '092': '視聴覚AI集音',
  '098': '超知能(ASI)',
  '101': '歩留まり',
  '102': 'エージェンティックEDA',
  '103': 'TCAD',
  '106': 'Cu-Cuハイブリッド接合',
  '108': '自律ロボット実験室',
  '111': '固有色科学',
  '112': 'ポスト・カメラ統合機',
  '113': '再帰的自己改善',
};

type SchematicRendererFn = (type: PartExplanation['diagramType']) => string;

let cachedSchematicRenderer: SchematicRendererFn | null = null;
let schematicLoadPromise: Promise<SchematicRendererFn> | null = null;

function loadSchematicRenderer(): Promise<SchematicRendererFn> {
  if (cachedSchematicRenderer) return Promise.resolve(cachedSchematicRenderer);
  if (!schematicLoadPromise) {
    schematicLoadPromise = import('./schematicsRegistry')
      .then((mod) => {
        cachedSchematicRenderer = mod.renderSchematicSvg;
        return cachedSchematicRenderer;
      })
      .catch((err) => {
        schematicLoadPromise = null;
        throw err;
      });
  }
  return schematicLoadPromise;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

function makeSvg(inner: string, viewBox = '0 0 24 24'): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.innerHTML = inner;
  return svg;
}

function makeIconBtn(inner: string, title = ''): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'icon-btn';
  if (title) {
    btn.title = title;
    btn.setAttribute('aria-label', title);
  }
  btn.appendChild(makeSvg(inner));
  return btn;
}

const DRAWER_ICONS = {
  prev: '<polyline points="15 18 9 12 15 6"/>',
  next: '<polyline points="9 18 15 12 9 6"/>',
  isolate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',
  hide: '<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  rotate: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/>',
};

function recommendedScenarioForLensPart(partId: string): OpticalScenarioId {
  if (
    partId.includes('ed') ||
    partId.includes('flint') ||
    partId.includes('focus-b-front') ||
    partId.includes('uv-cement')
  ) {
    return 'ed_chromatic';
  }
  if (
    partId.includes('xa') ||
    partId.includes('rear-element') ||
    partId.includes('rear-cell-spacer') ||
    partId.includes('front-meniscus') ||
    partId.includes('retaining-rings') ||
    partId.includes('potting') ||
    partId.includes('phase-align')
  ) {
    return 'xa_aspheric';
  }
  if (
    partId.includes('xd') ||
    partId.includes('focus-') ||
    partId.includes('guide') ||
    partId.includes('antirot') ||
    partId.includes('mr-') ||
    partId.includes('af-origin') ||
    partId.includes('mf-') ||
    partId.includes('control-rings') ||
    partId.includes('iris-iso-fpc') ||
    partId.includes('reinforcing-plates') ||
    partId.includes('center-join-ring') ||
    partId.includes('clutch-ball-rollers')
  ) {
    return 'floating_xd';
  }
  if (
    partId.includes('hood') ||
    partId.includes('baffle') ||
    partId.includes('filter') ||
    partId.includes('optical-spacers') ||
    partId.includes('lighttrap-tube') ||
    partId.includes('fluorine') ||
    partId.includes('nano-ar') ||
    partId.includes('sumi') ||
    partId.includes('lightfoil')
  ) {
    return 'nano_ar_baffle';
  }
  return 'aperture_bokeh';
}

/**
 * Mobile-First Scientific Explanation & Interactive Schematic Viewer Drawer.
 * Features:
 * - Segmented view tabs (`すべて` / `図説` / `解説`) for effortless mobile reading & focused Capture Engine output
 * - Edge-to-edge full-bleed schematic card on smartphones with 1-tap fullscreen & 90-deg landscape rotate triggers
 * - Full-screen 100vw×100dvh interactive schematic Lightbox with multi-touch pinch-to-zoom (0.8x–4.5x),
 *   1-finger smooth pan, double-tap 1.8x readable zoom, mouse-wheel zoom, and 1-tap 90-deg landscape rotation!
 */
export class ExplanationDrawer {
  private drawerEl: HTMLElement;
  private swatchEl: HTMLElement;
  private isolateBtn: HTMLButtonElement;
  private tabBtns: Record<DrawerViewTab, HTMLButtonElement>;
  private bodyEl: HTMLElement;

  // Interactive Mobile-First Fullscreen Lightbox
  private lightboxEl: HTMLElement;
  private lightboxPanelEl: HTMLElement;
  private lightboxTitleEl: HTMLElement;
  private lightboxViewportEl: HTMLElement;
  private lightboxCanvasEl: HTMLElement;
  private lightboxZoomLabelEl: HTMLButtonElement;
  private lightboxRotateBtn: HTMLButtonElement;

  private handlers: ExplanationDrawerHandlers;
  private renderSeq = 0;
  private activeTab: DrawerViewTab = 'all';
  private miraiEdition: 'beginner' | 'expert' = (() => {
    try {
      const saved = window.localStorage.getItem(MIRAI_EDITION_KEY);
      if (saved === 'beginner' || saved === 'expert') return saved;
    } catch {
      // ignore storage errors
    }
    return 'beginner';
  })();
  private currentPart: CadPart | null = null;
  private currentExp: PartExplanation | null = null;
  private latestTitle = '';
  private latestSvg = '';

  // Lightbox pan/zoom/rotate state
  private lbScale = 1;
  private lbPanX = 0;
  private lbPanY = 0;
  private lbRotated = false;
  private activePointers = new Map<number, { x: number; y: number }>();
  private pinchStartDist = 0;
  private pinchStartScale = 1;
  private dragLastX = 0;
  private dragLastY = 0;
  private lastTapMs = 0;
  private hideTimer: number | null = null;
  private boundKeyDown: ((ev: KeyboardEvent) => void) | null = null;

  constructor(root: HTMLElement, handlers: ExplanationDrawerHandlers) {
    this.handlers = handlers;
    this.drawerEl = document.createElement('aside');
    this.drawerEl.className = 'explanation-drawer';
    this.drawerEl.dataset.viewTab = 'all';
    this.drawerEl.setAttribute('aria-hidden', 'true');

    const dragHandle = document.createElement('div');
    dragHandle.className = 'drawer-mobile-handle';
    dragHandle.setAttribute('aria-hidden', 'true');

    const toolbar = document.createElement('div');
    toolbar.className = 'drawer-toolbar';

    const left = document.createElement('div');
    left.className = 'drawer-toolbar-left';

    this.swatchEl = document.createElement('span');
    this.swatchEl.className = 'drawer-swatch-pill';

    const prevBtn = makeIconBtn(DRAWER_ICONS.prev, '前のパーツ');
    const nextBtn = makeIconBtn(DRAWER_ICONS.next, '次のパーツ');
    prevBtn.addEventListener('click', handlers.onPrev);
    nextBtn.addEventListener('click', handlers.onNext);
    left.append(this.swatchEl, prevBtn, nextBtn);

    const right = document.createElement('div');
    right.className = 'drawer-toolbar-right';

    this.isolateBtn = makeIconBtn(DRAWER_ICONS.isolate, 'このパーツのみ単独表示');
    this.isolateBtn.addEventListener('click', handlers.onToggleIsolate);

    const hideBtn = makeIconBtn(DRAWER_ICONS.hide, 'このパーツを一時非表示');
    hideBtn.addEventListener('click', handlers.onHideCurrent);

    const closeBtn = makeIconBtn(DRAWER_ICONS.close, '閉じる');
    closeBtn.addEventListener('click', handlers.onClose);

    right.append(this.isolateBtn, hideBtn, closeBtn);
    toolbar.append(left, right);

    // Segmented mobile-first view tabs: すべて / 図説 / 解説
    const tabBar = document.createElement('div');
    tabBar.className = 'drawer-tab-bar';
    tabBar.setAttribute('role', 'tablist');
    const makeTab = (tab: DrawerViewTab, label: string): HTMLButtonElement => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `drawer-tab-btn${tab === 'all' ? ' is-active' : ''}`;
      b.setAttribute('role', 'tab');
      b.textContent = label;
      b.addEventListener('click', () => this.setViewTab(tab));
      return b;
    };
    this.tabBtns = {
      all: makeTab('all', 'すべて'),
      diagram: makeTab('diagram', '図説'),
      explanation: makeTab('explanation', '解説'),
    };
    tabBar.append(this.tabBtns.all, this.tabBtns.diagram, this.tabBtns.explanation);

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'drawer-body';

    this.drawerEl.append(dragHandle, toolbar, tabBar, this.bodyEl);
    root.appendChild(this.drawerEl);

    // =========================================================================
    // Mobile-First Full-Screen Interactive Schematic Lightbox (Pinch / Pan / 90° Landscape Rotate!)
    // =========================================================================
    this.lightboxEl = document.createElement('div');
    this.lightboxEl.className = 'schematic-lightbox';
    this.lightboxEl.setAttribute('aria-hidden', 'true');

    this.lightboxPanelEl = document.createElement('div');
    this.lightboxPanelEl.className = 'schematic-lightbox-panel schematic-lightbox-card';

    const header = document.createElement('div');
    header.className = 'schematic-lightbox-header';

    this.lightboxTitleEl = document.createElement('div');
    this.lightboxTitleEl.className = 'schematic-lightbox-title';

    const lbCloseBtn = makeIconBtn(DRAWER_ICONS.close, '図説拡大を閉じる');
    lbCloseBtn.addEventListener('click', () => this.closeLightbox());
    header.append(this.lightboxTitleEl, lbCloseBtn);

    this.lightboxViewportEl = document.createElement('div');
    this.lightboxViewportEl.className = 'schematic-lightbox-viewport schematic-lightbox-stage';

    this.lightboxCanvasEl = document.createElement('div');
    this.lightboxCanvasEl.className = 'schematic-lightbox-canvas';
    this.lightboxViewportEl.appendChild(this.lightboxCanvasEl);

    // Thumb-reachable floating control pill at bottom of fullscreen schematic viewer
    const ctrlBar = document.createElement('div');
    ctrlBar.className = 'schematic-lightbox-controls';

    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.type = 'button';
    zoomOutBtn.className = 'lb-ctrl-btn';
    zoomOutBtn.textContent = '−';
    zoomOutBtn.title = '縮小';
    zoomOutBtn.addEventListener('click', () => this.stepLightboxZoom(-0.35));

    this.lightboxZoomLabelEl = document.createElement('button');
    this.lightboxZoomLabelEl.type = 'button';
    this.lightboxZoomLabelEl.className = 'lb-ctrl-btn lb-ctrl-reset';
    this.lightboxZoomLabelEl.textContent = '100%';
    this.lightboxZoomLabelEl.title = '倍率リセット';
    this.lightboxZoomLabelEl.addEventListener('click', () => this.resetLightboxTransform());

    const zoomInBtn = document.createElement('button');
    zoomInBtn.type = 'button';
    zoomInBtn.className = 'lb-ctrl-btn';
    zoomInBtn.textContent = '＋';
    zoomInBtn.title = '拡大';
    zoomInBtn.addEventListener('click', () => this.stepLightboxZoom(0.4));

    const readableBtn = document.createElement('button');
    readableBtn.type = 'button';
    readableBtn.className = 'lb-ctrl-btn lb-ctrl-accent';
    readableBtn.textContent = '見やすい 1.8×';
    readableBtn.title = 'スマホで文字が読みやすい1.8倍ズーム切替';
    readableBtn.addEventListener('click', () => {
      if (Math.abs(this.lbScale - 1.8) < 0.15) {
        this.resetLightboxTransform();
      } else {
        this.lbScale = 1.8;
        this.lbPanX = 0;
        this.lbPanY = 0;
        this.applyLightboxTransform();
      }
    });

    this.lightboxRotateBtn = document.createElement('button');
    this.lightboxRotateBtn.type = 'button';
    this.lightboxRotateBtn.className = 'lb-ctrl-btn lb-ctrl-rotate';
    this.lightboxRotateBtn.append(makeSvg(DRAWER_ICONS.rotate));
    const rotLbl = document.createElement('span');
    rotLbl.textContent = '90°回転';
    this.lightboxRotateBtn.append(rotLbl);
    this.lightboxRotateBtn.title = '縦長スマホ画面いっぱいに90°横向き回転表示';
    this.lightboxRotateBtn.addEventListener('click', () => {
      this.lbRotated = !this.lbRotated;
      this.lbScale = 1;
      this.lbPanX = 0;
      this.lbPanY = 0;
      this.applyLightboxTransform();
    });

    ctrlBar.append(
      zoomOutBtn,
      this.lightboxZoomLabelEl,
      zoomInBtn,
      readableBtn,
      this.lightboxRotateBtn
    );

    this.lightboxPanelEl.append(header, this.lightboxViewportEl, ctrlBar);
    this.lightboxEl.appendChild(this.lightboxPanelEl);

    this.bindLightboxGestures();

    this.lightboxEl.addEventListener('click', (ev) => {
      if (ev.target === this.lightboxEl) this.closeLightbox();
    });
    this.boundKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && this.lightboxEl.classList.contains('is-open')) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        this.closeLightbox();
      }
    };
    window.addEventListener('keydown', this.boundKeyDown, { capture: true });
    root.appendChild(this.lightboxEl);
  }

  private bindLightboxGestures(): void {
    const vp = this.lightboxViewportEl;

    vp.addEventListener('pointerdown', (ev) => {
      vp.setPointerCapture(ev.pointerId);
      this.activePointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

      if (this.activePointers.size === 1) {
        const now = performance.now();
        if (now - this.lastTapMs < 280) {
          // Double-tap toggles readable 1.8x zoom cleanly
          if (this.lbScale > 1.25) {
            this.resetLightboxTransform();
          } else {
            this.lbScale = 1.85;
            this.lbPanX = 0;
            this.lbPanY = 0;
            this.applyLightboxTransform();
          }
          this.lastTapMs = 0;
        } else {
          this.lastTapMs = now;
        }
        this.dragLastX = ev.clientX;
        this.dragLastY = ev.clientY;
      } else if (this.activePointers.size === 2) {
        const pts = Array.from(this.activePointers.values());
        this.pinchStartDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y) || 1;
        this.pinchStartScale = this.lbScale;
      }
    });

    vp.addEventListener('pointermove', (ev) => {
      if (!this.activePointers.has(ev.pointerId)) return;
      this.activePointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

      if (this.activePointers.size === 2) {
        const pts = Array.from(this.activePointers.values());
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y) || 1;
        this.lbScale = Math.max(0.8, Math.min(4.5, this.pinchStartScale * (dist / this.pinchStartDist)));
        this.applyLightboxTransform();
      } else if (this.activePointers.size === 1) {
        const dx = ev.clientX - this.dragLastX;
        const dy = ev.clientY - this.dragLastY;
        this.dragLastX = ev.clientX;
        this.dragLastY = ev.clientY;
        if (this.lbScale > 1.02 || this.lbRotated) {
          this.lbPanX += dx;
          this.lbPanY += dy;
          this.applyLightboxTransform();
        }
      }
    });

    const releasePointer = (ev: PointerEvent) => {
      this.activePointers.delete(ev.pointerId);
      if (this.activePointers.size === 1) {
        const remaining = Array.from(this.activePointers.values())[0];
        this.dragLastX = remaining.x;
        this.dragLastY = remaining.y;
      }
    };
    vp.addEventListener('pointerup', releasePointer);
    vp.addEventListener('pointercancel', releasePointer);

    vp.addEventListener(
      'wheel',
      (ev) => {
        ev.preventDefault();
        const delta = ev.deltaY < 0 ? 0.22 : -0.22;
        this.stepLightboxZoom(delta);
      },
      { passive: false }
    );
  }

  private stepLightboxZoom(delta: number): void {
    this.lbScale = Math.max(0.8, Math.min(4.5, this.lbScale + delta));
    if (this.lbScale <= 1.01) {
      this.lbPanX = 0;
      this.lbPanY = 0;
    }
    this.applyLightboxTransform();
  }

  private resetLightboxTransform(): void {
    this.lbScale = 1;
    this.lbPanX = 0;
    this.lbPanY = 0;
    this.applyLightboxTransform();
  }

  private applyLightboxTransform(): void {
    const maxPan = 420 * this.lbScale;
    this.lbPanX = Math.max(-maxPan, Math.min(maxPan, this.lbPanX));
    this.lbPanY = Math.max(-maxPan, Math.min(maxPan, this.lbPanY));
    this.lightboxPanelEl.classList.toggle('is-rotated', this.lbRotated);
    this.lightboxRotateBtn.classList.toggle('is-active', this.lbRotated);
    const rotStr = this.lbRotated ? ' rotate(90deg)' : '';
    this.lightboxCanvasEl.style.transform = `translate3d(${this.lbPanX.toFixed(1)}px, ${this.lbPanY.toFixed(1)}px, 0) scale(${this.lbScale.toFixed(3)})${rotStr}`;
    this.lightboxZoomLabelEl.textContent = `${Math.round(this.lbScale * 100)}%`;
  }

  public getViewTab(): DrawerViewTab {
    return this.activeTab;
  }

  public setViewTab(tab: DrawerViewTab): void {
    this.activeTab = tab;
    this.drawerEl.dataset.viewTab = tab;
    (['all', 'diagram', 'explanation'] as const).forEach((t) => {
      this.tabBtns[t].classList.toggle('is-active', t === tab);
      this.tabBtns[t].setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });
    this.bodyEl.scrollTop = 0;
  }

  public setLightboxOpen(open: boolean, rotated = false): void {
    if (!open) {
      this.closeLightbox();
      return;
    }
    if (this.latestSvg) {
      this.openLightbox(this.latestTitle, this.latestSvg, rotated);
    }
  }

  private openLightbox(title: string, svgMarkup: string, startRotated = false): void {
    if (!svgMarkup) return;
    // Suffix all SVG <defs> IDs with '-lb' so simultaneous drawer + lightbox SVGs never collide!
    const safeSvg = svgMarkup
      .replace(/\bid="([^"]+)"/g, 'id="$1-lb"')
      .replace(/url\(#([^)]+)\)/g, 'url(#$1-lb)');
    this.lightboxTitleEl.textContent = title;
    this.lightboxCanvasEl.innerHTML = safeSvg;
    this.lbScale = 1;
    this.lbPanX = 0;
    this.lbPanY = 0;
    this.lbRotated = startRotated;
    this.activePointers.clear();
    this.applyLightboxTransform();
    this.lightboxEl.classList.add('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'false');
  }

  private closeLightbox(): void {
    this.lightboxEl.classList.remove('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'true');
    this.lightboxCanvasEl.replaceChildren();
    this.activePointers.clear();
  }

  private renderPopulatedPart(part: CadPart, exp: PartExplanation, seq: number): void {
    const specsHtml = exp.specs
      .map(
        (s) => `
          <div class="exp-spec-row">
            <span class="exp-spec-label">${s.label}</span>
            <span class="exp-spec-value">${s.value}</span>
          </div>`
      )
      .join('');

    const physicsListHtml = exp.opticsAndPhysics
      .map((item) => `<li>${item}</li>`)
      .join('');

    const analogyHtml = exp.plainAnalogy
      ? `
        <div class="exp-analogy exp-block-text">
          <div class="exp-analogy-badge">やさしい解説</div>
          <p class="exp-analogy-text">${exp.plainAnalogy}</p>
        </div>`
      : '';

    const formulaHtml = exp.formula
      ? `
        <div class="exp-formula">
          <div class="exp-formula-expr">${exp.formula.expression}</div>
          <div class="exp-formula-desc">${exp.formula.description}</div>
        </div>`
      : '';

    const opticsMotionBtnHtml =
      part.subsystem === 'lens' && this.handlers.onOpenOpticsMotion
        ? `
        <button type="button" class="exp-optics-cta exp-block-text" data-open-optics-motion>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7h5l4 5 4-4h5"/>
            <path d="M3 17h5l4-5 4 4h5"/>
            <path d="M3 12h18" opacity="0.45"/>
            <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>
          </svg>
          <span>このレンズの光学メカニズムをモーションで体感する</span>
        </button>`
        : '';

    const v2SwitchConfig: { target: ScaleMode; label: string; isV2Target: boolean } | null =
      this.handlers.onSwitchMode
        ? part.subsystem === 'micro'
          ? {
              target: 'micro_v2',
              label: 'V2 極超解剖図へ（さらに微細な原子・ナノ構造を拡大）',
              isV2Target: true,
            }
          : part.subsystem === 'micro_v2'
            ? {
                target: 'micro',
                label: 'V1 ピクセル配列図へ戻る',
                isV2Target: false,
              }
            : part.subsystem === 'bionz'
              ? {
                  target: 'bionz_v2',
                  label: 'V2 極超解剖図へ（2nm GAA・裏面電源を極超拡大）',
                  isV2Target: true,
                }
              : part.subsystem === 'bionz_v2'
                ? {
                    target: 'bionz',
                    label: 'V1 BIONZ XR パッケージ図へ戻る',
                    isV2Target: false,
                  }
                : part.subsystem === 'sensor'
                  ? {
                      target: 'sensor_fab',
                      label: 'センサー製造工程（全2,110工程 3D解剖図）を見る',
                      isV2Target: true,
                    }
                  : part.subsystem === 'sensor_fab'
                    ? part.id === 'fab0-p11-sensor-unit-ibis' || part.id === 'fab0-p09-dicing-package'
                      ? {
                          target: 'sensor',
                          label: 'フルサイズセンサー ＆ 5軸IBIS 3D解剖図へ移動',
                          isV2Target: false,
                        }
                      : part.id === 'fab0-p12-camera-integration'
                        ? {
                            target: 'integrated',
                            label: '完成ミラーレス一眼カメラ全体 3D解剖図へ移動',
                            isV2Target: false,
                          }
                        : {
                            target: 'micro_v2',
                            label: 'ピクセル極超解剖図 V2（ナノ構造拡大）へ移動',
                            isV2Target: true,
                          }
                    : part.subsystem === 'drybox' && part.id === 'db-camera-lens-showcase'
                      ? {
                          target: 'integrated',
                          label: '収納カメラ本体＆50mm F1.2 全体3D解剖図へ移動',
                          isV2Target: false,
                        }
                      : null
        : null;

    const v2SwitchBtnHtml = v2SwitchConfig
      ? `
        <button type="button" class="exp-optics-cta exp-v2-cta exp-block-text${v2SwitchConfig.isV2Target ? ' is-v2-target' : ''}" data-switch-mode="${v2SwitchConfig.target}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            ${
              v2SwitchConfig.isV2Target
                ? '<path d="M12 2.5l2.1 6.2 6.4 3.3-6.4 3.3L12 21.5l-2.1-6.2-6.4-3.3 6.4-3.3z"/>'
                : '<polyline points="15 18 9 12 15 6"/><line x1="9" y1="12" x2="20" y2="12"/>'
            }
          </svg>
          <span>${v2SwitchConfig.label}</span>
        </button>`
      : '';

    const fabVolSwitchConfig: { targetVol: SensorFabVolume; label: string } | null =
      this.handlers.onSwitchFabVolume && part.subsystem === 'sensor_fab'
        ? (part.fabVolume ?? 0) === 0
          ? {
              targetVol: 1,
              label: '第1巻：超入門・センサーのしくみと2026年最新アーキテクチャへ進む',
            }
          : (part.fabVolume ?? 0) === 1
            ? {
                targetVol: 2,
                label: '第2巻：フェーズ1 砂から超純度エピタキシャルウェーハまで（全60工程）へ進む',
              }
            : (part.fabVolume ?? 0) === 2
              ? {
                  targetVol: 3,
                  label: '第3巻：フェーズ2 センサー設計とフォトマスク製造（全50工程・96枚）へ進む',
                }
              : (part.fabVolume ?? 0) === 3
                ? {
                    targetVol: 4,
                    label: '第4巻：フェーズ3 画素ウェーハ前工程FEOL（全380工程・25マスク）へ進む',
                  }
                : (part.fabVolume ?? 0) === 4
                  ? {
                      targetVol: 5,
                      label: '第5巻：フェーズ4 画素ウェーハ配線工程BEOL（全210工程・Cu5＋Al1）へ進む',
                    }
                  : {
                      targetVol: 0,
                      label: '第0巻：全2,110工程マップ（P1–P12・L01–L12）へ戻る',
                    }
        : null;

    const fabVolBtnHtml = fabVolSwitchConfig
      ? `
        <button type="button" class="exp-optics-cta exp-block-text" data-switch-fab-vol="${fabVolSwitchConfig.targetVol}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2.5"/>
            <path d="M9 8h6M9 12h6M9 16h4"/>
          </svg>
          <span>${fabVolSwitchConfig.label}</span>
        </button>`
      : '';

    const syncSvg = cachedSchematicRenderer ? cachedSchematicRenderer(exp.diagramType) : '';
    const isHdDiagram = (svg: string) =>
      svg.includes('data-original-hd="1"') ||
      svg.includes('data-mirai-hd="1"') ||
      svg.includes('data-evf-hd="1"') ||
      svg.includes('data-lcd-hd="1"') ||
      svg.includes('data-fab-hd="1"') ||
      svg.includes('data-bionz-diagram=') ||
      svg.includes('data-bionz-v2-hd="1"') ||
      svg.includes('data-bionz-tier=') ||
      svg.includes('data-sensor-hd="1"') ||
      svg.includes('data-mount-hd="1"') ||
      svg.includes('data-shutter-hd="1"') ||
      svg.includes('data-drybox-hd="1"') ||
      svg.includes('data-welcome-hd="1"');
    const isSyncHd = isHdDiagram(syncSvg);

    const buildBionzStackStrip = (svg: string): string => {
      if (part.subsystem !== 'bionz' && part.subsystem !== 'bionz_v2') return '';
      const isV2 = part.subsystem === 'bionz_v2';
      const layers = isV2
        ? [
            { id: 'pkg35d', code: '3.5D', label: '光/実装' },
            { id: 'beol', code: 'BEOL', label: '配線層' },
            { id: 'feol', code: 'FEOL', label: 'GAA/14A' },
            { id: 'isp_mem', code: 'SoC', label: 'AI/ISP' },
            { id: 'bspdn_cool', code: 'BACK', label: '裏面/冷' },
          ]
        : [
            { id: 'L1', code: 'L1', label: '蓋・PoP' },
            { id: 'L2', code: 'L2', label: 'ISP/AI' },
            { id: 'L3', code: 'L3', label: 'FEOL' },
            { id: 'L4', code: 'L4', label: 'ABF基板' },
            { id: 'L5', code: 'L5', label: '電源・基板' },
            { id: 'L6', code: 'L6', label: '周辺IC' },
          ];
      const mZone = svg.match(/data-bionz-zone="([^"]+)"/);
      const activeZone = mZone ? mZone[1] : null;
      const tierLabel = isV2 ? 'BIONZ V2 極超積層マップ (105)' : 'BIONZ V1 パッケージ階層 (70)';
      const pills = layers
        .map(
          (l) =>
            `<span class="bionz-stack-step${activeZone === l.id ? ' is-active' : ''}" data-stack-zone="${l.id}"><span class="bionz-stack-code">${l.code}</span><span class="bionz-stack-name">${l.label}</span></span>`
        )
        .join('');
      return `<div class="bionz-stack-strip"><div class="bionz-stack-strip-head">${tierLabel}</div><div class="bionz-stack-steps">${pills}</div></div>`;
    };
    const stackStripHtml = buildBionzStackStrip(syncSvg);

    const mirai = exp.mirai;
    const isMiraiBeginner = Boolean(mirai && this.miraiEdition === 'beginner');
    this.currentPart = part;
    this.currentExp = exp;

    const miraiTopBarHtml = mirai
      ? `
      <div class="mirai-drawer-top">
        <div class="mirai-drawer-meta-pills">
          <span class="mirai-fh-code">${mirai.fhId}</span>
          <span class="mirai-badge ${mirai.badge === '量産民主化' ? 'badge-demo' : mirai.badge === '超知能加速' ? 'badge-asi' : 'badge-wish'}">${mirai.badge}</span>
          <span class="mirai-eta-pill">${mirai.eta}</span>
        </div>
        <div class="mirai-edition-toggle mirai-drawer-ed-toggle" role="group" aria-label="解説切替">
          <button type="button" class="mirai-ed-btn${this.miraiEdition === 'beginner' ? ' active' : ''}" data-mirai-ed="beginner">やさしい</button>
          <button type="button" class="mirai-ed-btn${this.miraiEdition === 'expert' ? ' active' : ''}" data-mirai-ed="expert">専門</button>
        </div>
      </div>`
      : '';

    const miraiScoreCardHtml = mirai
      ? `
      <div class="mirai-drawer-score-card exp-block-text">
        <div class="mirai-drawer-score-head">
          <div>
            <div class="mirai-score-lbl">FH MIRAI 2028 革新性スコア（科学クリアリング済）</div>
            <div class="mirai-score-sub">物理・量産・優位性・体験・ASI加速の5軸評価</div>
          </div>
          <div class="mirai-score-big">${mirai.score}<span> / 100</span></div>
        </div>
        <div class="mirai-axes-list">
          ${MIRAI_AXIS_LABELS.map(
            (lbl, idx) => `
            <div class="mirai-axis-row">
              <span class="mirai-axis-lbl">${lbl}</span>
              <div class="mirai-axis-track"><div class="mirai-axis-fill" style="width:${(mirai.axes[idx] / 20) * 100}%"></div></div>
              <span class="mirai-axis-val">${mirai.axes[idx]}/20</span>
            </div>`
          ).join('')}
        </div>
        <p class="mirai-score-rationale">${mirai.scoreRationale}</p>
      </div>`
      : '';

    const miraiCompareHtml =
      mirai && mirai.comparisonRows.length > 0
        ? `
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">2026年現行技術 vs 2028年未来技術</div>
        <table class="mirai-compare-table">
          <thead><tr><th>比較項目</th><th>2026現行</th><th>2028未来 (${mirai.fhId})</th></tr></thead>
          <tbody>
            ${mirai.comparisonRows
              .map(
                (r) =>
                  `<tr><td><strong>${r.metric}</strong></td><td>${r.current2026}</td><td class="mirai-td-future">${r.future2028}</td></tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>`
        : '';

    const miraiGlossaryAndActionsHtml = mirai
      ? `
      ${
        mirai.glossaryIds.length > 0
          ? `<div class="exp-section exp-block-text">
              <div class="exp-section-heading">関連専門用語（別冊113語・タップで辞典表示）</div>
              <div class="mirai-glossary-chips">
                ${mirai.glossaryIds
                  .map(
                    (gid) =>
                      `<button type="button" class="mirai-gloss-chip" data-mirai-gloss="${gid}">#${gid} ${MIRAI_GLOSSARY_SHORT_LABELS[gid] ?? '用語解説'}</button>`
                  )
                  .join('')}
              </div>
            </div>`
          : ''
      }
      <div class="mirai-drawer-actions exp-block-text">
        <button type="button" class="mirai-drawer-cta is-primary" data-mirai-open-report="${mirai.fhId}">Vol.0${mirai.volume} レポート全文を読む (${this.miraiEdition === 'beginner' ? 'やさしい' : '専門'})</button>
        ${
          mirai.baselineMode && this.handlers.onSwitchMode
            ? `<button type="button" class="mirai-drawer-cta" data-mirai-baseline="${mirai.baselineMode}">現行2026実機 (${mirai.baselineMode}) と比較</button>`
            : ''
        }
      </div>
      ${
        mirai.sourceUrls.length > 0
          ? `<div class="exp-section exp-block-text exp-references-section">
              <div class="exp-section-heading">検証済み一次情報・根拠リンク</div>
              <ul class="mirai-source-list">
                ${mirai.sourceUrls
                  .map(
                    (s) =>
                      `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a></li>`
                  )
                  .join('')}
              </ul>
            </div>`
          : ''
      }`
      : '';

    const referencesHtml =
      !mirai && exp.references && exp.references.length > 0
        ? `
      <div class="exp-section exp-block-text exp-references-section">
        <div class="exp-section-heading">出典・準拠規格・技術リファレンス</div>
        <ol class="exp-ref-list">
          ${exp.references
            .map(
              (ref, idx) =>
                `<li class="exp-ref-item"><span class="exp-ref-idx">[${idx + 1}]</span><span class="exp-ref-text">${ref}</span></li>`
            )
            .join('')}
        </ol>
      </div>`
        : '';

    const displayTitle = isMiraiBeginner && mirai ? mirai.beginnerTitle : exp.title;
    const displaySubtitle = isMiraiBeginner && mirai ? `${exp.title} ｜ ${exp.subtitle}` : exp.subtitle;
    this.latestTitle = displayTitle;
    this.latestSvg = syncSvg;

    const mainExplanationBodyHtml =
      isMiraiBeginner && mirai
        ? `
      ${analogyHtml}
      <p class="exp-summary exp-block-text">${mirai.beginnerSummary}</p>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">やさしくわかる 3つのポイント</div>
        <ul class="exp-list">${mirai.beginnerPoints.map((pt) => `<li>${pt}</li>`).join('')}</ul>
      </div>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">正直な課題・2028年実用化へのカギ</div>
        <div class="mirai-caution-box">${mirai.beginnerCaution}</div>
      </div>
      ${miraiCompareHtml}
      ${miraiScoreCardHtml}
      ${miraiGlossaryAndActionsHtml}
    `
        : `
      ${analogyHtml}
      <p class="exp-summary exp-block-text">${exp.summary}</p>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">光学的・科学的原理</div>
        <ul class="exp-list">${physicsListHtml}</ul>
        ${formulaHtml}
      </div>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">${mirai ? '2026.12–2028.12 の技術革新' : '最新世代（2024–2026）の技術革新'}</div>
        <div class="exp-innovation">${exp.nextGenInnovation}</div>
      </div>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">主要物理・設計諸元</div>
        <div class="exp-specs">${specsHtml}</div>
      </div>
      ${miraiCompareHtml}
      ${miraiScoreCardHtml}
      ${miraiGlossaryAndActionsHtml}
      ${referencesHtml}
    `;

    this.bodyEl.innerHTML = `
      ${miraiTopBarHtml}
      <div class="exp-header-block">
        <div class="exp-category">${exp.category}</div>
        <h2 class="exp-title">${displayTitle}</h2>
        <div class="exp-subtitle">${displaySubtitle}</div>
      </div>

      <div data-stack-strip-host>${stackStripHtml}</div>

      <div class="schematic-stage exp-diagram-box${isSyncHd ? ' is-hd-schematic' : ''}" data-schematic-box>
        <div class="exp-diagram-content" data-schematic-content role="button" tabindex="0" title="タップしてピンチ拡大・横向き全画面">${syncSvg}</div>
        <div class="exp-diagram-mobile-bar">
          <button type="button" class="exp-diagram-action-btn" data-diagram-open-zoom>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            <span>ピンチ拡大表示</span>
          </button>
          <button type="button" class="exp-diagram-action-btn is-primary" data-diagram-open-landscape>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>
            <span>横向き全画面 (90°)</span>
          </button>
        </div>
      </div>

      ${opticsMotionBtnHtml}
      ${fabVolBtnHtml}
      ${v2SwitchBtnHtml}

      ${mainExplanationBodyHtml}
    `;

    const box = this.bodyEl.querySelector<HTMLElement>('[data-schematic-box]');
    const contentEl = this.bodyEl.querySelector<HTMLElement>('[data-schematic-content]');
    const stripHost = this.bodyEl.querySelector<HTMLElement>('[data-stack-strip-host]');

    if (!cachedSchematicRenderer && box && contentEl) {
      void loadSchematicRenderer().then((renderFn) => {
        if (seq !== this.renderSeq || !box.isConnected) return;
        this.latestSvg = renderFn(exp.diagramType);
        contentEl.innerHTML = this.latestSvg;
        box.classList.toggle('is-hd-schematic', isHdDiagram(this.latestSvg));
        if (stripHost) stripHost.innerHTML = buildBionzStackStrip(this.latestSvg);
      });
    }

    const triggerZoom = (rotated = false) => {
      if (this.latestSvg) this.openLightbox(displayTitle, this.latestSvg, rotated);
    };

    contentEl?.addEventListener('click', () => triggerZoom(false));
    contentEl?.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        triggerZoom(false);
      }
    });
    this.bodyEl
      .querySelector('[data-diagram-open-zoom]')
      ?.addEventListener('click', () => triggerZoom(false));
    this.bodyEl
      .querySelector('[data-diagram-open-landscape]')
      ?.addEventListener('click', () => triggerZoom(true));

    // FH MIRAI 2028 top [やさしい | 専門] edition switcher
    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-mirai-ed]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextEd = btn.dataset.miraiEd === 'expert' ? 'expert' : 'beginner';
        this.setMiraiEdition(nextEd, true);
      });
    });
    this.bodyEl.querySelectorAll<HTMLButtonElement>('[data-mirai-gloss]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const gid = btn.dataset.miraiGloss;
        if (gid) this.handlers.onOpenMiraiGlossary?.(gid);
      });
    });
    this.bodyEl.querySelector<HTMLButtonElement>('[data-mirai-open-report]')?.addEventListener('click', (e) => {
      const fhId = (e.currentTarget as HTMLButtonElement).dataset.miraiOpenReport;
      if (fhId) this.handlers.onOpenMiraiReport?.(fhId);
    });
    this.bodyEl.querySelector<HTMLButtonElement>('[data-mirai-baseline]')?.addEventListener('click', (e) => {
      const m = (e.currentTarget as HTMLButtonElement).dataset.miraiBaseline as ScaleMode | undefined;
      if (m) this.handlers.onSwitchMode?.(m);
    });

    const ctaBtn = this.bodyEl.querySelector<HTMLButtonElement>('[data-open-optics-motion]');
    if (ctaBtn && this.handlers.onOpenOpticsMotion) {
      ctaBtn.addEventListener('click', () => {
        this.handlers.onOpenOpticsMotion?.(recommendedScenarioForLensPart(part.id), part.id);
      });
    }

    const fabVolBtn = this.bodyEl.querySelector<HTMLButtonElement>('[data-switch-fab-vol]');
    if (fabVolBtn && fabVolSwitchConfig && this.handlers.onSwitchFabVolume) {
      fabVolBtn.addEventListener('click', () => {
        this.handlers.onSwitchFabVolume?.(fabVolSwitchConfig.targetVol);
      });
    }

    const v2Btn = this.bodyEl.querySelector<HTMLButtonElement>('[data-switch-mode]');
    if (v2Btn && v2SwitchConfig && this.handlers.onSwitchMode) {
      v2Btn.addEventListener('click', () => {
        this.handlers.onSwitchMode?.(v2SwitchConfig.target);
      });
    }

    this.bodyEl.scrollTop = 0;
  }

  public getMiraiEdition(): 'beginner' | 'expert' {
    return this.miraiEdition;
  }

  public setMiraiEdition(edition: 'beginner' | 'expert', notify = false): void {
    const changed = this.miraiEdition !== edition;
    this.miraiEdition = edition;
    try {
      window.localStorage.setItem(MIRAI_EDITION_KEY, edition);
    } catch {
      // ignore
    }
    if (notify) this.handlers.onMiraiEditionChange?.(edition);
    if (changed && this.currentPart && this.currentExp && this.drawerEl.classList.contains('is-open')) {
      const seq = ++this.renderSeq;
      this.renderPopulatedPart(this.currentPart, this.currentExp, seq);
    }
  }

  public isLightboxOpen(): boolean {
    return this.lightboxEl.classList.contains('is-open');
  }

  public show(part: CadPart, isIsolated: boolean): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    const seq = ++this.renderSeq;
    this.swatchEl.style.backgroundColor = part.swatchColor;
    this.isolateBtn.classList.toggle('is-active', isIsolated);
    this.drawerEl.classList.add('is-open');
    this.drawerEl.setAttribute('aria-hidden', 'false');

    if (!isLazyExplanationStub(part.explanation)) {
      this.renderPopulatedPart(part, part.explanation, seq);
      return;
    }

    void Promise.all([resolvePartExplanation(part), loadSchematicRenderer()]).then(([exp]) => {
      if (seq !== this.renderSeq || !this.drawerEl.classList.contains('is-open')) return;
      this.renderPopulatedPart(part, exp, seq);
    });
  }

  public setIsolatedState(isIsolated: boolean): void {
    this.isolateBtn.classList.toggle('is-active', isIsolated);
  }

  public hide(): void {
    this.renderSeq++;
    this.closeLightbox();
    this.drawerEl.classList.remove('is-open');
    this.drawerEl.setAttribute('aria-hidden', 'true');
    if (this.hideTimer !== null) clearTimeout(this.hideTimer);
    this.hideTimer = window.setTimeout(() => {
      this.hideTimer = null;
      if (!this.drawerEl.classList.contains('is-open')) {
        this.bodyEl.replaceChildren();
      }
    }, 360);
  }

  public dispose(): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.boundKeyDown) {
      window.removeEventListener('keydown', this.boundKeyDown, { capture: true });
      this.boundKeyDown = null;
    }
    this.drawerEl.remove();
    this.lightboxEl.remove();
  }
}
