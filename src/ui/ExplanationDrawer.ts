import { CadPart, PartExplanation } from '../assemblies/types';
import { isLazyExplanationStub, resolvePartExplanation } from '../assemblies/lazyExplanations';
import { OpticalScenarioId } from '../assemblies/lens/lensOpticalSim';

export interface ExplanationDrawerHandlers {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleIsolate: () => void;
  onHideCurrent: () => void;
  onOpenOpticsMotion?: (scenario: OpticalScenarioId, partId: string) => void;
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

    const syncSvg = cachedSchematicRenderer ? cachedSchematicRenderer(exp.diagramType) : '';

    this.bodyEl.innerHTML = `
      <div>
        <div class="exp-category">${exp.category}</div>
        <h2 class="exp-title">${exp.title}</h2>
        <div class="exp-subtitle">${exp.subtitle}</div>
      </div>

      ${opticsMotionBtnHtml}

      ${analogyHtml}

      <div class="exp-diagram-box" data-schematic-box>
        ${syncSvg}
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

    if (!cachedSchematicRenderer) {
      const box = this.bodyEl.querySelector<HTMLElement>('[data-schematic-box]');
      void loadSchematicRenderer().then((renderFn) => {
        if (seq !== this.renderSeq || !box || !box.isConnected) return;
        box.innerHTML = renderFn(exp.diagramType);
      });
    }

    const ctaBtn = this.bodyEl.querySelector<HTMLButtonElement>('[data-open-optics-motion]');
    if (ctaBtn && this.handlers.onOpenOpticsMotion) {
      ctaBtn.addEventListener('click', () => {
        this.handlers.onOpenOpticsMotion?.(recommendedScenarioForLensPart(part.id), part.id);
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
    this.drawerEl.classList.remove('is-open');
    this.drawerEl.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      if (!this.drawerEl.classList.contains('is-open')) {
        this.bodyEl.replaceChildren();
      }
    }, 360);
  }
}
