import { CadPart, PartExplanation, ScaleMode, SensorFabVolume } from '../assemblies/types';
import { isLazyExplanationStub, resolvePartExplanation } from '../assemblies/lazyExplanations';
import { OpticalScenarioId } from '../assemblies/lens/lensOpticalSim';

export interface ExplanationDrawerHandlers {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleIsolate: () => void;
  onHideCurrent: () => void;
  onOpenOpticsMotion?: (scenario: OpticalScenarioId, partId: string) => void;
  onSwitchMode?: (mode: ScaleMode) => void;
  onSwitchFabVolume?: (vol: SensorFabVolume) => void;
}

type SchematicRendererFn = (type: PartExplanation['diagramType']) => string;

let cachedSchematicRenderer: SchematicRendererFn | null = null;
let schematicLoadPromise: Promise<SchematicRendererFn> | null = null;

function loadSchematicRenderer(): Promise<SchematicRendererFn> {
  if (cachedSchematicRenderer) return Promise.resolve(cachedSchematicRenderer);
  if (!schematicLoadPromise) {
    schematicLoadPromise = import('./schematicsRegistry').then((mod) => {
      cachedSchematicRenderer = mod.renderSchematicSvg;
      return cachedSchematicRenderer;
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

function makeIconBtn(inner: string, label?: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'icon-btn';
  if (label) {
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }
  btn.appendChild(makeSvg(inner));
  return btn;
}

const DRAWER_ICONS = {
  prev: '<polyline points="15 18 9 12 15 6"/>',
  next: '<polyline points="9 18 15 12 9 6"/>',
  isolate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',
  hide: '<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',
  wide: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  zoomIn: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
  zoomOut: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>',
  blueprint: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/><circle cx="15" cy="15" r="2.2"/>',
  sidebar: '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="14" y1="4" x2="14" y2="20"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
};

const BIONZ_V1_STACK_LAYERS: ReadonlyArray<{ id: string; code: string; label: string }> = [
  { id: 'L1', code: 'L1', label: '蓋・PoP' },
  { id: 'L2', code: 'L2', label: 'ISP/AI' },
  { id: 'L3', code: 'L3', label: 'FEOL' },
  { id: 'L4', code: 'L4', label: 'ABF基板' },
  { id: 'L5', code: 'L5', label: '電源・基板' },
  { id: 'L6', code: 'L6', label: '周辺IC' },
];

const BIONZ_V2_STACK_LAYERS: ReadonlyArray<{ id: string; code: string; label: string }> = [
  { id: 'pkg35d', code: '3.5D', label: '光/実装' },
  { id: 'beol', code: 'BEOL', label: '配線層' },
  { id: 'feol', code: 'FEOL', label: 'GAA/14A' },
  { id: 'isp_mem', code: 'SoC', label: 'AI/ISP' },
  { id: 'bspdn_cool', code: 'BACK', label: '裏面/冷' },
];

function isHdDiagramSvg(svg: string): boolean {
  return (
    svg.includes('data-evf-hd="1"') ||
    svg.includes('data-lcd-hd="1"') ||
    svg.includes('data-fab-hd="1"') ||
    svg.includes('data-bionz-diagram=') ||
    svg.includes('data-bionz-v2-hd="1"') ||
    svg.includes('data-bionz-tier=') ||
    svg.includes('data-sensor-hd="1"') ||
    svg.includes('data-mount-hd="1"') ||
    svg.includes('data-shutter-hd="1"') ||
    svg.includes('data-drybox-hd="1"')
  );
}

function extractSvgAttr(svg: string, attrName: string): string | null {
  const m = svg.match(new RegExp(`${attrName}="([^"]+)"`));
  return m ? m[1] : null;
}

function extractPartBadge(part: CadPart, exp: PartExplanation, svg: string): string | null {
  const fromSvg = extractSvgAttr(svg, 'data-bionz-badge');
  if (fromSvg) return fromSvg;
  const titleMatch = exp.title.match(/^(X2-\d+|XR\d+|V\d+-\d+|P\d+)/i);
  if (titleMatch) return titleMatch[1].toUpperCase();
  if (part.subsystem === 'bionz') return 'BIONZ V1';
  if (part.subsystem === 'bionz_v2') return 'BIONZ V2';
  return null;
}

function buildBionzStackStripHtml(part: CadPart, svg: string): string {
  if (part.subsystem !== 'bionz' && part.subsystem !== 'bionz_v2') return '';
  const isV2 = part.subsystem === 'bionz_v2';
  const layers = isV2 ? BIONZ_V2_STACK_LAYERS : BIONZ_V1_STACK_LAYERS;
  const activeZone = extractSvgAttr(svg, 'data-bionz-zone');
  const tierLabel = isV2 ? 'BIONZ V2 極超積層マップ (105)' : 'BIONZ V1 パッケージ階層 (70)';
  const pillsHtml = layers
    .map((layer) => {
      const isActive = activeZone === layer.id;
      return `
        <span class="bionz-stack-step${isActive ? ' is-active' : ''}" data-stack-zone="${layer.id}">
          <span class="bionz-stack-code">${layer.code}</span>
          <span class="bionz-stack-name">${layer.label}</span>
        </span>`;
    })
    .join('');

  return `
    <div class="bionz-stack-strip" data-bionz-stack-strip>
      <div class="bionz-stack-header">
        <span class="bionz-stack-title">${tierLabel}</span>
        <span class="bionz-stack-hd-tag">720×500 ULTRA-HD VECTOR</span>
      </div>
      <div class="bionz-stack-rail">${pillsHtml}</div>
    </div>`;
}

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
 * Pure-white scientific explanation drawer & Interactive Schematic Atlas Lightbox.
 * Hidden when no part is selected (leaving 100% zero text on screen).
 * OMEGA-13: Both the SVG schematic libraries AND all subsystem Japanese explanation
 * modules are code-split and fetched on demand, slashing initial JS bundle & V8 parse time.
 */
export class ExplanationDrawer {
  private drawerEl: HTMLElement;
  private swatchEl: HTMLElement;
  private codeBadgeEl: HTMLElement;
  private wideBtn: HTMLButtonElement;
  private isolateBtn: HTMLButtonElement;
  private bodyEl: HTMLElement;

  // Interactive Schematic Atlas Lightbox elements
  private lightboxEl: HTMLElement;
  private lightboxBadgeEl: HTMLElement;
  private lightboxTitleEl: HTMLElement;
  private lightboxZoomReadoutEl: HTMLButtonElement;
  private lightboxBlueprintBtn: HTMLButtonElement;
  private lightboxInspectorBtn: HTMLButtonElement;
  private lightboxViewportEl: HTMLElement;
  private lightboxCanvasEl: HTMLElement;
  private lightboxSideEl: HTMLElement;

  private handlers: ExplanationDrawerHandlers;
  private renderSeq = 0;

  // Interactive state
  private isWideDrawer = false;
  private isBlueprintMode = false;
  private lightboxOpen = false;
  private lightboxInspectorOpen = true;
  private lbZoom = 1;
  private lbPanX = 0;
  private lbPanY = 0;
  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panOriginX = 0;
  private panOriginY = 0;
  private pinchStartDist = 0;
  private pinchStartZoom = 1;

  // Current active part payload (for live lightbox stepping, blueprint sync & SVG export)
  private currentPart: CadPart | null = null;
  private currentExp: PartExplanation | null = null;
  private currentSvg = '';

  constructor(root: HTMLElement, handlers: ExplanationDrawerHandlers) {
    this.handlers = handlers;
    this.drawerEl = document.createElement('aside');
    this.drawerEl.className = 'explanation-drawer';
    this.drawerEl.setAttribute('aria-hidden', 'true');

    const toolbar = document.createElement('div');
    toolbar.className = 'drawer-toolbar';

    const left = document.createElement('div');
    left.className = 'drawer-toolbar-left';

    this.swatchEl = document.createElement('span');
    this.swatchEl.className = 'drawer-swatch-pill';

    this.codeBadgeEl = document.createElement('span');
    this.codeBadgeEl.className = 'drawer-code-pill';
    this.codeBadgeEl.hidden = true;

    const prevBtn = makeIconBtn(DRAWER_ICONS.prev, '前のパーツ');
    const nextBtn = makeIconBtn(DRAWER_ICONS.next, '次のパーツ');
    prevBtn.addEventListener('click', handlers.onPrev);
    nextBtn.addEventListener('click', handlers.onNext);
    left.append(this.swatchEl, this.codeBadgeEl, prevBtn, nextBtn);

    const right = document.createElement('div');
    right.className = 'drawer-toolbar-right';

    this.wideBtn = makeIconBtn(DRAWER_ICONS.wide, '解説パネル幅を切替');
    this.wideBtn.classList.add('drawer-wide-btn');
    this.wideBtn.addEventListener('click', () => {
      this.isWideDrawer = !this.isWideDrawer;
      this.drawerEl.classList.toggle('is-wide', this.isWideDrawer);
      this.wideBtn.classList.toggle('is-active', this.isWideDrawer);
    });

    this.isolateBtn = makeIconBtn(DRAWER_ICONS.isolate, '単独表示を切替');
    this.isolateBtn.addEventListener('click', handlers.onToggleIsolate);

    const hideBtn = makeIconBtn(DRAWER_ICONS.hide, 'このパーツを一時非表示');
    hideBtn.addEventListener('click', handlers.onHideCurrent);

    const closeBtn = makeIconBtn(DRAWER_ICONS.close, '閉じる');
    closeBtn.addEventListener('click', handlers.onClose);

    right.append(this.wideBtn, this.isolateBtn, hideBtn, closeBtn);
    toolbar.append(left, right);

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'drawer-body';

    this.drawerEl.append(toolbar, this.bodyEl);
    root.appendChild(this.drawerEl);

    // =========================================================================
    // Fullscreen Interactive Schematic Atlas Lightbox
    // (Zoom/Pan/Pinch + Live Prev/Next Stepping + CAD Blueprint + Monograph Rail + SVG Export)
    // =========================================================================
    this.lightboxEl = document.createElement('div');
    this.lightboxEl.className = 'schematic-lightbox';
    this.lightboxEl.setAttribute('aria-hidden', 'true');

    const card = document.createElement('div');
    card.className = 'schematic-lightbox-card';

    // Header Bar
    const header = document.createElement('div');
    header.className = 'schematic-lightbox-header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'schematic-lightbox-nav';

    const lbPrevBtn = makeIconBtn(DRAWER_ICONS.prev, '前のパーツ (←)');
    const lbNextBtn = makeIconBtn(DRAWER_ICONS.next, '次のパーツ (→)');
    lbPrevBtn.addEventListener('click', () => this.handlers.onPrev());
    lbNextBtn.addEventListener('click', () => this.handlers.onNext());

    this.lightboxBadgeEl = document.createElement('span');
    this.lightboxBadgeEl.className = 'schematic-lightbox-badge';
    this.lightboxBadgeEl.hidden = true;

    this.lightboxTitleEl = document.createElement('div');
    this.lightboxTitleEl.className = 'schematic-lightbox-title';

    headerLeft.append(lbPrevBtn, lbNextBtn, this.lightboxBadgeEl, this.lightboxTitleEl);

    // Controls Cluster
    const headerControls = document.createElement('div');
    headerControls.className = 'schematic-lightbox-controls';

    const zoomCluster = document.createElement('div');
    zoomCluster.className = 'schematic-zoom-cluster';

    const zoomOutBtn = makeIconBtn(DRAWER_ICONS.zoomOut, '縮小 (-)');
    zoomOutBtn.addEventListener('click', () => this.setLightboxZoom(this.lbZoom - 0.35));

    this.lightboxZoomReadoutEl = document.createElement('button');
    this.lightboxZoomReadoutEl.type = 'button';
    this.lightboxZoomReadoutEl.className = 'schematic-zoom-readout';
    this.lightboxZoomReadoutEl.textContent = '100%';
    this.lightboxZoomReadoutEl.title = 'クリックで100%へリセット (0)';
    this.lightboxZoomReadoutEl.addEventListener('click', () => this.resetLightboxTransform());

    const zoomInBtn = makeIconBtn(DRAWER_ICONS.zoomIn, '拡大 (+)');
    zoomInBtn.addEventListener('click', () => this.setLightboxZoom(this.lbZoom + 0.35));

    const zoom2xBtn = document.createElement('button');
    zoom2xBtn.type = 'button';
    zoom2xBtn.className = 'schematic-pill-btn';
    zoom2xBtn.textContent = '200%';
    zoom2xBtn.title = '200%精密拡大に切替';
    zoom2xBtn.addEventListener('click', () => this.setLightboxZoom(this.lbZoom >= 1.9 ? 1.0 : 2.0));

    zoomCluster.append(zoomOutBtn, this.lightboxZoomReadoutEl, zoomInBtn, zoom2xBtn);

    this.lightboxBlueprintBtn = document.createElement('button');
    this.lightboxBlueprintBtn.type = 'button';
    this.lightboxBlueprintBtn.className = 'schematic-mode-btn';
    this.lightboxBlueprintBtn.title = 'CAD青図モード切替 (B)';
    this.lightboxBlueprintBtn.append(makeSvg(DRAWER_ICONS.blueprint), this.makeSpan('CAD青図'));
    this.lightboxBlueprintBtn.addEventListener('click', () => this.toggleBlueprintMode());

    this.lightboxInspectorBtn = document.createElement('button');
    this.lightboxInspectorBtn.type = 'button';
    this.lightboxInspectorBtn.className = 'schematic-mode-btn';
    this.lightboxInspectorBtn.title = '解説・諸元パネルを切替 (I)';
    this.lightboxInspectorBtn.append(makeSvg(DRAWER_ICONS.sidebar), this.makeSpan('解説パネル'));
    this.lightboxInspectorBtn.addEventListener('click', () => {
      this.lightboxInspectorOpen = !this.lightboxInspectorOpen;
      this.syncLightboxInspectorState();
    });

    const lbExportBtn = document.createElement('button');
    lbExportBtn.type = 'button';
    lbExportBtn.className = 'schematic-mode-btn';
    lbExportBtn.title = '高精細ベクターSVGをダウンロード';
    lbExportBtn.append(makeSvg(DRAWER_ICONS.download), this.makeSpan('SVG'));
    lbExportBtn.addEventListener('click', () => this.exportCurrentSvg());

    const lbCloseBtn = makeIconBtn(DRAWER_ICONS.close, '閉じる (ESC)');
    lbCloseBtn.addEventListener('click', () => this.closeLightbox());

    headerControls.append(
      zoomCluster,
      this.lightboxBlueprintBtn,
      this.lightboxInspectorBtn,
      lbExportBtn,
      lbCloseBtn
    );

    header.append(headerLeft, headerControls);

    // Split Workspace: Interactive Zoom/Pan Stage + Collapsible Monograph Spec Rail
    const workspace = document.createElement('div');
    workspace.className = 'schematic-lightbox-workspace';

    this.lightboxViewportEl = document.createElement('div');
    this.lightboxViewportEl.className = 'schematic-lightbox-stage';

    this.lightboxCanvasEl = document.createElement('div');
    this.lightboxCanvasEl.className = 'schematic-lightbox-canvas';
    this.lightboxViewportEl.appendChild(this.lightboxCanvasEl);

    this.lightboxSideEl = document.createElement('aside');
    this.lightboxSideEl.className = 'schematic-lightbox-side';

    workspace.append(this.lightboxViewportEl, this.lightboxSideEl);

    // Subtle Keyboard / Gesture Footer Hint
    const footer = document.createElement('div');
    footer.className = 'schematic-lightbox-footer';
    footer.textContent =
      'ホイール / ダブルクリック: 拡大縮小 · ドラッグ: 移動 · ← →: 前後パーツ切替 · B: CAD青図 · I: 解説切替 · ESC: 閉じる';

    card.append(header, workspace, footer);
    this.lightboxEl.append(card);

    this.bindLightboxInteractions();
    root.appendChild(this.lightboxEl);
  }

  private makeSpan(text: string): HTMLSpanElement {
    const s = document.createElement('span');
    s.textContent = text;
    return s;
  }

  private bindLightboxInteractions(): void {
    // Backdrop click to close
    this.lightboxEl.addEventListener('click', (ev) => {
      if (ev.target === this.lightboxEl) this.closeLightbox();
    });

    // Mouse-wheel zoom (smooth 1.0x – 4.0x)
    this.lightboxViewportEl.addEventListener(
      'wheel',
      (ev) => {
        if (!this.lightboxOpen) return;
        ev.preventDefault();
        const delta = ev.deltaY < 0 ? 0.24 : -0.24;
        this.setLightboxZoom(this.lbZoom + delta);
      },
      { passive: false }
    );

    // Double-click toggle 1.0x <-> 2.2x
    this.lightboxViewportEl.addEventListener('dblclick', () => {
      if (!this.lightboxOpen) return;
      if (this.lbZoom > 1.15) {
        this.resetLightboxTransform();
      } else {
        this.setLightboxZoom(2.2);
      }
    });

    // Pointer drag pan when zoomed
    this.lightboxViewportEl.addEventListener('pointerdown', (ev) => {
      if (!this.lightboxOpen || this.lbZoom <= 1.02) return;
      if (ev.button !== 0) return;
      this.isPanning = true;
      this.panStartX = ev.clientX;
      this.panStartY = ev.clientY;
      this.panOriginX = this.lbPanX;
      this.panOriginY = this.lbPanY;
      this.lightboxViewportEl.classList.add('is-panning');
      try {
        this.lightboxViewportEl.setPointerCapture(ev.pointerId);
      } catch {
        // Ignore if pointer capture unavailable
      }
    });

    this.lightboxViewportEl.addEventListener('pointermove', (ev) => {
      if (!this.isPanning) return;
      const dx = ev.clientX - this.panStartX;
      const dy = ev.clientY - this.panStartY;
      this.lbPanX = this.panOriginX + dx;
      this.lbPanY = this.panOriginY + dy;
      this.clampAndApplyLightboxTransform();
    });

    const endPan = () => {
      if (!this.isPanning) return;
      this.isPanning = false;
      this.lightboxViewportEl.classList.remove('is-panning');
    };
    this.lightboxViewportEl.addEventListener('pointerup', endPan);
    this.lightboxViewportEl.addEventListener('pointercancel', endPan);

    // 2-finger touch pinch-to-zoom
    this.lightboxViewportEl.addEventListener(
      'touchstart',
      (ev) => {
        if (ev.touches.length === 2) {
          const [t1, t2] = [ev.touches[0], ev.touches[1]];
          this.pinchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
          this.pinchStartZoom = this.lbZoom;
        }
      },
      { passive: true }
    );
    this.lightboxViewportEl.addEventListener(
      'touchmove',
      (ev) => {
        if (ev.touches.length === 2 && this.pinchStartDist > 0) {
          ev.preventDefault();
          const [t1, t2] = [ev.touches[0], ev.touches[1]];
          const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
          this.setLightboxZoom(this.pinchStartZoom * (dist / this.pinchStartDist));
        }
      },
      { passive: false }
    );

    // Keyboard navigation & shortcuts while Lightbox is open
    window.addEventListener('keydown', (ev) => {
      if (!this.lightboxOpen) return;
      const target = ev.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (ev.key === 'Escape') {
        ev.preventDefault();
        this.closeLightbox();
      } else if (ev.key === 'ArrowLeft') {
        ev.preventDefault();
        this.handlers.onPrev();
      } else if (ev.key === 'ArrowRight') {
        ev.preventDefault();
        this.handlers.onNext();
      } else if (ev.key === '+' || ev.key === '=') {
        ev.preventDefault();
        this.setLightboxZoom(this.lbZoom + 0.35);
      } else if (ev.key === '-') {
        ev.preventDefault();
        this.setLightboxZoom(this.lbZoom - 0.35);
      } else if (ev.key === '0') {
        ev.preventDefault();
        this.resetLightboxTransform();
      } else if (ev.key === 'b' || ev.key === 'B') {
        ev.preventDefault();
        this.toggleBlueprintMode();
      } else if (ev.key === 'i' || ev.key === 'I') {
        ev.preventDefault();
        this.lightboxInspectorOpen = !this.lightboxInspectorOpen;
        this.syncLightboxInspectorState();
      }
    });
  }

  private setLightboxZoom(nextZoom: number): void {
    this.lbZoom = Math.max(1.0, Math.min(4.0, +nextZoom.toFixed(2)));
    if (this.lbZoom <= 1.02) {
      this.lbZoom = 1.0;
      this.lbPanX = 0;
      this.lbPanY = 0;
    }
    this.clampAndApplyLightboxTransform();
  }

  private resetLightboxTransform(): void {
    this.lbZoom = 1.0;
    this.lbPanX = 0;
    this.lbPanY = 0;
    this.clampAndApplyLightboxTransform();
  }

  private clampAndApplyLightboxTransform(): void {
    const rect = this.lightboxViewportEl.getBoundingClientRect();
    const maxPanX = Math.max(0, (rect.width * (this.lbZoom - 1)) * 0.56);
    const maxPanY = Math.max(0, (rect.height * (this.lbZoom - 1)) * 0.56);
    this.lbPanX = Math.max(-maxPanX, Math.min(maxPanX, this.lbPanX));
    this.lbPanY = Math.max(-maxPanY, Math.min(maxPanY, this.lbPanY));

    this.lightboxCanvasEl.style.transform = `translate3d(${this.lbPanX.toFixed(1)}px, ${this.lbPanY.toFixed(1)}px, 0) scale(${this.lbZoom})`;
    this.lightboxZoomReadoutEl.textContent = `${Math.round(this.lbZoom * 100)}%`;
    this.lightboxViewportEl.classList.toggle('is-zoomed', this.lbZoom > 1.02);
  }

  private toggleBlueprintMode(): void {
    this.isBlueprintMode = !this.isBlueprintMode;
    this.syncBlueprintMode();
  }

  private syncBlueprintMode(): void {
    this.lightboxViewportEl.classList.toggle('is-blueprint', this.isBlueprintMode);
    this.lightboxBlueprintBtn.classList.toggle('is-active', this.isBlueprintMode);
    const inlineBox = this.bodyEl.querySelector<HTMLElement>('[data-schematic-box]');
    if (inlineBox) inlineBox.classList.toggle('is-blueprint', this.isBlueprintMode);
    const inlineBpBtn = this.bodyEl.querySelector<HTMLButtonElement>('[data-inline-blueprint]');
    if (inlineBpBtn) inlineBpBtn.classList.toggle('is-active', this.isBlueprintMode);
  }

  private syncLightboxInspectorState(): void {
    this.lightboxEl.classList.toggle('has-inspector', this.lightboxInspectorOpen);
    this.lightboxInspectorBtn.classList.toggle('is-active', this.lightboxInspectorOpen);
  }

  private exportCurrentSvg(): void {
    if (!this.currentSvg) return;
    const badge =
      (this.currentPart && this.currentExp
        ? extractPartBadge(this.currentPart, this.currentExp, this.currentSvg)
        : null) ||
      this.currentPart?.id ||
      'schematic';
    const safeName = badge.replace(/[^a-zA-Z0-9_-]+/g, '_');
    const blob = new Blob([this.currentSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SONY_A7_Diagram_${safeName}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  private populateLightboxContent(): void {
    if (!this.currentSvg || !this.currentPart || !this.currentExp) return;
    const part = this.currentPart;
    const exp = this.currentExp;

    // Suffix all SVG <defs> IDs with '-lb' so simultaneous drawer + lightbox SVGs never collide!
    const safeSvg = this.currentSvg
      .replace(/\bid="([^"]+)"/g, 'id="$1-lb"')
      .replace(/url\(#([^)]+)\)/g, 'url(#$1-lb)');

    const badge = extractPartBadge(part, exp, this.currentSvg);
    if (badge) {
      this.lightboxBadgeEl.textContent = badge;
      this.lightboxBadgeEl.hidden = false;
    } else {
      this.lightboxBadgeEl.hidden = true;
    }

    this.lightboxTitleEl.textContent = exp.title;
    this.lightboxCanvasEl.innerHTML = safeSvg;
    this.resetLightboxTransform();
    this.syncBlueprintMode();

    // Populate collapsible Side-by-Side Monograph Spec Rail
    const specsHtml = exp.specs
      .map(
        (s) => `
          <div class="lb-spec-row">
            <span class="lb-spec-label">${s.label}</span>
            <span class="lb-spec-value">${s.value}</span>
          </div>`
      )
      .join('');

    const physicsHtml = exp.opticsAndPhysics.map((item) => `<li>${item}</li>`).join('');
    const stackStripHtml = buildBionzStackStripHtml(part, this.currentSvg);

    this.lightboxSideEl.innerHTML = `
      <div class="lb-side-scroll">
        ${stackStripHtml}
        <div class="lb-side-meta">
          <div class="exp-category">${exp.category}</div>
          <div class="exp-subtitle">${exp.subtitle}</div>
        </div>
        ${
          exp.plainAnalogy
            ? `
          <div class="exp-analogy">
            <div class="exp-analogy-badge">やさしい解説</div>
            <p class="exp-analogy-text">${exp.plainAnalogy}</p>
          </div>`
            : ''
        }
        ${
          exp.formula
            ? `
          <div class="exp-formula">
            <div class="exp-formula-expr">${exp.formula.expression}</div>
            <div class="exp-formula-desc">${exp.formula.description}</div>
          </div>`
            : ''
        }
        <div class="lb-side-section">
          <div class="exp-section-heading">光学的・科学的原理</div>
          <ul class="exp-list">${physicsHtml}</ul>
        </div>
        <div class="lb-side-section">
          <div class="exp-section-heading">最新世代（2024–2026）の技術革新</div>
          <div class="exp-innovation">${exp.nextGenInnovation}</div>
        </div>
        <div class="lb-side-section">
          <div class="exp-section-heading">主要物理・設計諸元</div>
          <div class="lb-specs">${specsHtml}</div>
        </div>
      </div>
    `;
  }

  private openLightbox(): void {
    if (!this.currentSvg || !this.currentPart || !this.currentExp) return;
    const isDesktop = window.innerWidth >= 1060;
    const isBionz =
      this.currentPart.subsystem === 'bionz' || this.currentPart.subsystem === 'bionz_v2';
    // Default side-by-side monograph rail open on desktop for BIONZ parts, compact on narrow screens
    if (!this.lightboxOpen) {
      this.lightboxInspectorOpen = isDesktop && isBionz;
    }
    this.lightboxOpen = true;
    this.populateLightboxContent();
    this.syncLightboxInspectorState();
    this.lightboxEl.classList.add('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'false');
  }

  private closeLightbox(): void {
    this.lightboxOpen = false;
    this.isPanning = false;
    this.lightboxEl.classList.remove('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'true');
    this.lightboxCanvasEl.replaceChildren();
    this.lightboxSideEl.replaceChildren();
  }

  private updateToolbarCodeBadge(part: CadPart, exp: PartExplanation, svg: string): void {
    const badge = extractPartBadge(part, exp, svg);
    if (!badge) {
      this.codeBadgeEl.hidden = true;
      return;
    }
    const suffix =
      part.subsystem === 'bionz_v2'
        ? ' · V2/105'
        : part.subsystem === 'bionz'
          ? ' · V1/70'
          : '';
    this.codeBadgeEl.textContent = `${badge}${suffix}`;
    this.codeBadgeEl.hidden = false;
  }

  private renderPopulatedPart(part: CadPart, exp: PartExplanation, seq: number): void {
    this.currentPart = part;
    this.currentExp = exp;

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
        <div class="exp-analogy">
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
        <button type="button" class="exp-optics-cta" data-open-optics-motion>
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
                  label: 'V2 極超解剖図へ（105パーツ 2nm GAA・裏面電源・XR2）',
                  isV2Target: true,
                }
              : part.subsystem === 'bionz_v2'
                ? {
                    target: 'bionz',
                    label: 'V1 BIONZ XR パッケージ図（70パーツ）へ戻る',
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
        <button type="button" class="exp-optics-cta exp-v2-cta${v2SwitchConfig.isV2Target ? ' is-v2-target' : ''}" data-switch-mode="${v2SwitchConfig.target}">
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
        <button type="button" class="exp-optics-cta" data-switch-fab-vol="${fabVolSwitchConfig.targetVol}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2.5"/>
            <path d="M9 8h6M9 12h6M9 16h4"/>
          </svg>
          <span>${fabVolSwitchConfig.label}</span>
        </button>`
      : '';

    const syncSvg = cachedSchematicRenderer ? cachedSchematicRenderer(exp.diagramType) : '';
    this.currentSvg = syncSvg;
    const isSyncHd = isHdDiagramSvg(syncSvg);
    const stackStripHtml = buildBionzStackStripHtml(part, syncSvg);
    this.updateToolbarCodeBadge(part, exp, syncSvg);

    this.bodyEl.innerHTML = `
      <div>
        <div class="exp-category">${exp.category}</div>
        <h2 class="exp-title">${exp.title}</h2>
        <div class="exp-subtitle">${exp.subtitle}</div>
      </div>

      ${opticsMotionBtnHtml}
      ${fabVolBtnHtml}
      ${v2SwitchBtnHtml}

      ${analogyHtml}

      <div data-stack-strip-host>${stackStripHtml}</div>

      <div class="exp-diagram-box${isSyncHd ? ' is-hd-schematic' : ''}${this.isBlueprintMode ? ' is-blueprint' : ''}" data-schematic-box role="button" tabindex="0" title="クリックして図解を高精細アトラス拡大">
        <div class="exp-diagram-content" data-schematic-content>${syncSvg}</div>
        <div class="exp-diagram-actions" data-diagram-actions>
          <button type="button" class="exp-diagram-action-btn is-primary" data-inline-atlas>
            <svg viewBox="0 0 24 24" aria-hidden="true">${DRAWER_ICONS.zoomIn}</svg>
            <span>拡大アトラス</span>
          </button>
          <button type="button" class="exp-diagram-action-btn${this.isBlueprintMode ? ' is-active' : ''}" data-inline-blueprint title="CAD青図表示を切替">
            <svg viewBox="0 0 24 24" aria-hidden="true">${DRAWER_ICONS.blueprint}</svg>
            <span>CAD青図</span>
          </button>
          <button type="button" class="exp-diagram-action-btn" data-inline-export title="高精細ベクターSVGを保存">
            <svg viewBox="0 0 24 24" aria-hidden="true">${DRAWER_ICONS.download}</svg>
            <span>SVG保存</span>
          </button>
        </div>
      </div>

      <p class="exp-summary">${exp.summary}</p>

      <div class="exp-section">
        <div class="exp-section-heading">光学的・科学的原理</div>
        <ul class="exp-list">${physicsListHtml}</ul>
        ${formulaHtml}
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">最新世代（2024–2026）の技術革新</div>
        <div class="exp-innovation">${exp.nextGenInnovation}</div>
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">主要物理・設計諸元</div>
        <div class="exp-specs">${specsHtml}</div>
      </div>
    `;

    const box = this.bodyEl.querySelector<HTMLElement>('[data-schematic-box]');
    const contentEl = this.bodyEl.querySelector<HTMLElement>('[data-schematic-content]');
    const stripHost = this.bodyEl.querySelector<HTMLElement>('[data-stack-strip-host]');

    if (!cachedSchematicRenderer && box && contentEl) {
      void loadSchematicRenderer().then((renderFn) => {
        if (seq !== this.renderSeq || !box.isConnected) return;
        const rendered = renderFn(exp.diagramType);
        this.currentSvg = rendered;
        contentEl.innerHTML = rendered;
        box.classList.toggle('is-hd-schematic', isHdDiagramSvg(rendered));
        if (stripHost) stripHost.innerHTML = buildBionzStackStripHtml(part, rendered);
        this.updateToolbarCodeBadge(part, exp, rendered);
        if (this.lightboxOpen) this.populateLightboxContent();
      });
    } else if (this.lightboxOpen && syncSvg) {
      // Live-update open Schematic Atlas Lightbox when stepping via Prev/Next!
      this.populateLightboxContent();
    }

    if (box) {
      const triggerZoom = () => {
        if (this.currentSvg) this.openLightbox();
      };
      box.addEventListener('click', triggerZoom);
      box.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          triggerZoom();
        }
      });
    }

    const actionsEl = this.bodyEl.querySelector<HTMLElement>('[data-diagram-actions]');
    if (actionsEl) {
      actionsEl.addEventListener('click', (ev) => ev.stopPropagation());
    }
    const atlasBtn = this.bodyEl.querySelector<HTMLButtonElement>('[data-inline-atlas]');
    if (atlasBtn) {
      atlasBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (this.currentSvg) this.openLightbox();
      });
    }
    const bpBtn = this.bodyEl.querySelector<HTMLButtonElement>('[data-inline-blueprint]');
    if (bpBtn) {
      bpBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this.toggleBlueprintMode();
      });
    }
    const exportBtn = this.bodyEl.querySelector<HTMLButtonElement>('[data-inline-export]');
    if (exportBtn) {
      exportBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this.exportCurrentSvg();
      });
    }

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

  public show(part: CadPart, isIsolated: boolean): void {
    const seq = ++this.renderSeq;
    this.swatchEl.style.backgroundColor = part.swatchColor;
    this.isolateBtn.classList.toggle('is-active', isIsolated);
    this.drawerEl.classList.add('is-open');
    this.drawerEl.setAttribute('aria-hidden', 'false');

    if (!isLazyExplanationStub(part.explanation)) {
      this.renderPopulatedPart(part, part.explanation, seq);
      return;
    }

    // Fetch subsystem explanations + SVG schematic renderer concurrently in one single round-trip!
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
    this.currentPart = null;
    this.currentExp = null;
    this.currentSvg = '';
    this.closeLightbox();
    this.drawerEl.classList.remove('is-open');
    this.drawerEl.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      if (!this.drawerEl.classList.contains('is-open')) {
        this.bodyEl.replaceChildren();
      }
    }, 360);
  }
}
