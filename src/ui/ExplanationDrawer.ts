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

function makeIconBtn(inner: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'icon-btn';
  btn.appendChild(makeSvg(inner));
  return btn;
}

const DRAWER_ICONS = {
  prev: '<polyline points="15 18 9 12 15 6"/>',
  next: '<polyline points="9 18 15 12 9 6"/>',
  isolate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',
  hide: '<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
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
 * Pure-white scientific explanation drawer.
 * Hidden when no part is selected (leaving 100% zero text on screen).
 * OMEGA-13: Both the 17 SVG schematic libraries (~1.1 MB) AND all 9 subsystem Japanese explanation
 * modules (~2.0 MB) are code-split and fetched on demand, slashing initial JS bundle & V8 parse time!
 */
export class ExplanationDrawer {
  private drawerEl: HTMLElement;
  private swatchEl: HTMLElement;
  private isolateBtn: HTMLButtonElement;
  private bodyEl: HTMLElement;
  private lightboxEl: HTMLElement;
  private lightboxTitleEl: HTMLElement;
  private lightboxStageEl: HTMLElement;
  private handlers: ExplanationDrawerHandlers;
  private renderSeq = 0;

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

    const prevBtn = makeIconBtn(DRAWER_ICONS.prev);
    const nextBtn = makeIconBtn(DRAWER_ICONS.next);
    prevBtn.addEventListener('click', handlers.onPrev);
    nextBtn.addEventListener('click', handlers.onNext);
    left.append(this.swatchEl, prevBtn, nextBtn);

    const right = document.createElement('div');
    right.className = 'drawer-toolbar-right';

    this.isolateBtn = makeIconBtn(DRAWER_ICONS.isolate);
    this.isolateBtn.addEventListener('click', handlers.onToggleIsolate);

    const hideBtn = makeIconBtn(DRAWER_ICONS.hide);
    hideBtn.addEventListener('click', handlers.onHideCurrent);

    const closeBtn = makeIconBtn(DRAWER_ICONS.close);
    closeBtn.addEventListener('click', handlers.onClose);

    right.append(this.isolateBtn, hideBtn, closeBtn);
    toolbar.append(left, right);

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'drawer-body';

    this.drawerEl.append(toolbar, this.bodyEl);
    root.appendChild(this.drawerEl);

    // Fullscreen vector HD schematic zoom lightbox (allows inspecting micron-scale details at full width!)
    this.lightboxEl = document.createElement('div');
    this.lightboxEl.className = 'schematic-lightbox';
    this.lightboxEl.setAttribute('aria-hidden', 'true');

    const card = document.createElement('div');
    card.className = 'schematic-lightbox-card';

    const header = document.createElement('div');
    header.className = 'schematic-lightbox-header';

    this.lightboxTitleEl = document.createElement('div');
    this.lightboxTitleEl.className = 'schematic-lightbox-title';

    const lbCloseBtn = makeIconBtn(DRAWER_ICONS.close);
    lbCloseBtn.setAttribute('aria-label', '閉じる');
    lbCloseBtn.addEventListener('click', () => this.closeLightbox());

    header.append(this.lightboxTitleEl, lbCloseBtn);

    this.lightboxStageEl = document.createElement('div');
    this.lightboxStageEl.className = 'schematic-lightbox-stage';

    card.append(header, this.lightboxStageEl);
    this.lightboxEl.append(card);
    this.lightboxEl.addEventListener('click', (ev) => {
      if (ev.target === this.lightboxEl) this.closeLightbox();
    });
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && this.lightboxEl.classList.contains('is-open')) {
        this.closeLightbox();
      }
    });
    root.appendChild(this.lightboxEl);
  }

  private openLightbox(title: string, svgMarkup: string): void {
    if (!svgMarkup) return;
    // Suffix all SVG <defs> IDs with '-lb' so simultaneous drawer + lightbox SVGs never collide!
    const safeSvg = svgMarkup
      .replace(/\bid="([^"]+)"/g, 'id="$1-lb"')
      .replace(/url\(#([^)]+)\)/g, 'url(#$1-lb)');
    this.lightboxTitleEl.textContent = title;
    this.lightboxStageEl.innerHTML = safeSvg;
    this.lightboxEl.classList.add('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'false');
  }

  private closeLightbox(): void {
    this.lightboxEl.classList.remove('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'true');
    this.lightboxStageEl.replaceChildren();
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
    const isHdDiagram = (svg: string) =>
      svg.includes('data-evf-hd="1"') ||
      svg.includes('data-fab-hd="1"') ||
      svg.includes('data-bionz-diagram=');
    const isSyncHd = isHdDiagram(syncSvg);

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

      <div class="exp-diagram-box${isSyncHd ? ' is-hd-schematic' : ''}" data-schematic-box role="button" tabindex="0" title="クリックして図解を高精細拡大">
        <div class="exp-diagram-content" data-schematic-content>${syncSvg}</div>
        <span class="exp-diagram-zoom-pill">🔍 クリックで高精細拡大</span>
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
    let latestSvg = syncSvg;

    if (!cachedSchematicRenderer && box && contentEl) {
      void loadSchematicRenderer().then((renderFn) => {
        if (seq !== this.renderSeq || !box.isConnected) return;
        latestSvg = renderFn(exp.diagramType);
        contentEl.innerHTML = latestSvg;
        box.classList.toggle('is-hd-schematic', isHdDiagram(latestSvg));
      });
    }

    if (box) {
      const triggerZoom = () => {
        if (latestSvg) this.openLightbox(exp.title, latestSvg);
      };
      box.addEventListener('click', triggerZoom);
      box.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          triggerZoom();
        }
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
