import {
  evalSurfaceZ,
  IRIS_Z,
  LensOpticalSim,
  OPTICAL_ELEMENTS,
  OPTICAL_SCENARIOS,
  OpticalElementSpec,
  OpticalScenarioId,
  SENSOR_Z,
  sharedLensOpticalSim,
} from '../assemblies/lens/lensOpticalSim';

export interface LensOpticsStudioHandlers {
  onOpenChange: (open: boolean) => void;
  onHoverPart: (partId: string | null) => void;
  onSelectPart: (partId: string) => void;
  onRequestRenderFrame: () => void;
}

interface ElementHitBox {
  el: OpticalElementSpec;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/**
 * Interactive 60fps Optical Mechanism Motion Studio for the 50mm F1.2 Prime Lens.
 * Features:
 *  - Real-time surface-by-surface Snell's-law 14-element ray tracing
 *  - Smooth animated photon wavepackets & 10x magnified aberration / wave-interference loupe
 *  - Live 11-blade circular iris + physically styled Bokeh PSF simulator (size, onion-ring, LoCA, cat's-eye)
 *  - Direct canvas dragging of Subject Point (Focus Distance & Field Angle) + hover/click sync with 3D CAD
 *  - Strictly zero DOM text when closed (mounts content dynamically on open & cleans up on close)
 */
export class LensOpticsStudio {
  private root: HTMLElement;
  private panelEl: HTMLElement;
  private handlers: LensOpticsStudioHandlers;
  private sim: LensOpticalSim;

  private isOpen = false;
  private isExpanded = false;
  private rafId = 0;
  private clearDomTimer: number | null = null;
  private lastTime = 0;
  private animElapsed = 0;

  // Dynamic DOM references (present only while open)
  private benchCanvas: HTMLCanvasElement | null = null;
  private bokehCanvas: HTMLCanvasElement | null = null;
  private benchCssW = 520;
  private benchCssH = 260;
  private bokehCssW = 220;
  private bokehCssH = 96;
  private canvasResizeObserver: ResizeObserver | null = null;
  private scenarioBtns = new Map<OpticalScenarioId, HTMLButtonElement>();
  private playBtn: HTMLButtonElement | null = null;
  private expandBtn: HTMLButtonElement | null = null;
  private apertureSlider: HTMLInputElement | null = null;
  private focusSlider: HTMLInputElement | null = null;
  private angleSlider: HTMLInputElement | null = null;
  private apertureValEl: HTMLElement | null = null;
  private focusValEl: HTMLElement | null = null;
  private angleValEl: HTMLElement | null = null;
  private compareWrapEl: HTMLElement | null = null;
  private compareBtn: HTMLButtonElement | null = null;
  private captionEl: HTMLElement | null = null;
  private hoverInfoEl: HTMLElement | null = null;

  // Interactive bench hit-testing & subject dragging
  private elementHitBoxes: ElementHitBox[] = [];
  private subjectHandlePx = { x: 40, y: 120 };
  private benchTransform = {
    xLeft: 50,
    xRight: 450,
    yCenter: 120,
    zMax: 136,
    zMin: -6,
    pxPerMmY: 2.8,
  };
  private draggingSubject = false;

  constructor(root: HTMLElement, handlers: LensOpticsStudioHandlers) {
    this.root = root;
    this.handlers = handlers;
    this.sim = sharedLensOpticalSim;

    this.panelEl = document.createElement('section');
    this.panelEl.className = 'optics-studio';
    this.panelEl.setAttribute('aria-hidden', 'true');
    this.root.appendChild(this.panelEl);
  }

  public getIsOpen(): boolean {
    return this.isOpen;
  }

  public open(scenario?: OpticalScenarioId, highlightPartId?: string): void {
    if (this.clearDomTimer !== null) {
      clearTimeout(this.clearDomTimer);
      this.clearDomTimer = null;
    }
    if (scenario) {
      this.sim.setScenario(scenario);
    }
    if (highlightPartId) {
      this.sim.setHoveredElement(highlightPartId);
    }
    if (!this.isOpen) {
      this.isOpen = true;
      this.sim.setStudioOpen(true);
      this.buildDom();
      this.panelEl.classList.add('is-open');
      this.panelEl.setAttribute('aria-hidden', 'false');
      this.root.classList.add('has-optics-studio');
      this.handlers.onOpenChange(true);
      this.lastTime = performance.now();
      this.startLoop();
    } else {
      this.syncControlsUi();
    }
  }

  public close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.isExpanded = false;
    this.draggingSubject = false;
    this.sim.setStudioOpen(false);
    this.sim.setHoveredElement(null);
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this.canvasResizeObserver?.disconnect();
    this.canvasResizeObserver = null;

    this.panelEl.classList.remove('is-open', 'is-expanded');
    this.panelEl.setAttribute('aria-hidden', 'true');
    this.root.classList.remove('has-optics-studio', 'has-optics-expanded');
    this.handlers.onOpenChange(false);

    // Clear all DOM text after slide-out animation so zero text exists in pure CAD view
    if (this.clearDomTimer !== null) clearTimeout(this.clearDomTimer);
    this.clearDomTimer = window.setTimeout(() => {
      this.clearDomTimer = null;
      if (!this.isOpen) {
        this.panelEl.replaceChildren();
        this.benchCanvas = null;
        this.bokehCanvas = null;
        this.scenarioBtns.clear();
      }
    }, 360);
  }

  public toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

  private toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
    this.panelEl.classList.toggle('is-expanded', this.isExpanded);
    this.root.classList.toggle('has-optics-expanded', this.isExpanded);
    if (this.expandBtn) {
      this.expandBtn.textContent = this.isExpanded ? '分割表示' : '拡大表示';
    }
  }

  private buildDom(): void {
    this.panelEl.replaceChildren();
    this.scenarioBtns.clear();

    // -----------------------------------------------------------------------
    // 1. Header Bar: Title + 5 Interactive Scenario Pills + Actions
    // -----------------------------------------------------------------------
    const header = document.createElement('div');
    header.className = 'optics-header';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'optics-title-wrap';
    titleWrap.innerHTML = `
      <span class="optics-title-dot"></span>
      <span class="optics-title">50mm F1.2 光学メカニズム・モーションラボ</span>
    `;

    const tabs = document.createElement('div');
    tabs.className = 'optics-tabs';
    for (const sc of OPTICAL_SCENARIOS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'optics-tab-btn';
      const numSpan = document.createElement('span');
      numSpan.className = 'optics-tab-num';
      numSpan.textContent = sc.badge;
      const titleSpan = document.createElement('span');
      titleSpan.textContent = sc.shortTitle;
      btn.append(numSpan, titleSpan);
      btn.addEventListener('click', () => {
        this.sim.setScenario(sc.id);
        this.syncControlsUi();
        this.handlers.onRequestRenderFrame();
      });
      tabs.appendChild(btn);
      this.scenarioBtns.set(sc.id, btn);
    }

    const actions = document.createElement('div');
    actions.className = 'optics-actions';

    this.playBtn = document.createElement('button');
    this.playBtn.type = 'button';
    this.playBtn.className = 'optics-action-btn is-primary';
    this.playBtn.addEventListener('click', () => {
      this.sim.setAutoPlay(!this.sim.autoPlay);
      this.syncControlsUi();
    });

    this.expandBtn = document.createElement('button');
    this.expandBtn.type = 'button';
    this.expandBtn.className = 'optics-action-btn';
    this.expandBtn.textContent = this.isExpanded ? '分割表示' : '拡大表示';
    this.expandBtn.addEventListener('click', () => this.toggleExpanded());

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'optics-close-btn';
    closeBtn.setAttribute('aria-label', '閉じる');
    closeBtn.innerHTML =
      '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    closeBtn.addEventListener('click', () => this.close());

    actions.append(this.playBtn, this.expandBtn, closeBtn);
    header.append(titleWrap, tabs, actions);

    // -----------------------------------------------------------------------
    // 2. Main Split Content: Left Interactive Ray-Tracing Bench + Right Controls/Bokeh
    // -----------------------------------------------------------------------
    const body = document.createElement('div');
    body.className = 'optics-body';

    // Left: Optical Bench Canvas Container
    const benchWrap = document.createElement('div');
    benchWrap.className = 'optics-bench-wrap';

    this.benchCanvas = document.createElement('canvas');
    this.benchCanvas.className = 'optics-bench-canvas';
    benchWrap.appendChild(this.benchCanvas);

    this.hoverInfoEl = document.createElement('div');
    this.hoverInfoEl.className = 'optics-hover-pill';
    benchWrap.appendChild(this.hoverInfoEl);

    this.bindBenchInteractions(this.benchCanvas);

    // Right: Bokeh PSF + Live Sliders + Comparison Toggle + Dynamic Caption
    const side = document.createElement('div');
    side.className = 'optics-side';

    // Top row of side panel: Live 11-Blade Iris & Bokeh PSF mini-canvas
    const bokehCard = document.createElement('div');
    bokehCard.className = 'optics-bokeh-card';
    this.bokehCanvas = document.createElement('canvas');
    this.bokehCanvas.className = 'optics-bokeh-canvas';
    bokehCard.appendChild(this.bokehCanvas);

    // Comparison Toggle (ED / XA / Nano AR II)
    this.compareWrapEl = document.createElement('div');
    this.compareWrapEl.className = 'optics-compare-wrap';
    this.compareBtn = document.createElement('button');
    this.compareBtn.type = 'button';
    this.compareBtn.className = 'optics-compare-btn';
    this.compareBtn.addEventListener('click', () => {
      this.sim.toggleComparison();
      this.syncControlsUi();
      this.handlers.onRequestRenderFrame();
    });
    this.compareWrapEl.appendChild(this.compareBtn);

    // Interactive Smooth Sliders
    const slidersBox = document.createElement('div');
    slidersBox.className = 'optics-sliders';

    const makeSliderRow = (
      label: string,
      min: string,
      max: string,
      step: string,
      val: string,
      onInput: (num: number) => void
    ) => {
      const row = document.createElement('div');
      row.className = 'optics-slider-row';
      const head = document.createElement('div');
      head.className = 'optics-slider-head';
      const lbl = document.createElement('span');
      lbl.className = 'optics-slider-label';
      lbl.textContent = label;
      const valSpan = document.createElement('span');
      valSpan.className = 'optics-slider-val';
      head.append(lbl, valSpan);

      const input = document.createElement('input');
      input.type = 'range';
      input.className = 'optics-range';
      input.min = min;
      input.max = max;
      input.step = step;
      input.value = val;
      input.addEventListener('input', () => {
        const parsed = Number(input.value);
        if (!Number.isFinite(parsed)) return;
        onInput(parsed);
        this.syncControlsUi();
        this.handlers.onRequestRenderFrame();
      });

      row.append(head, input);
      return { row, input, valSpan };
    };

    // Logarithmic F-stop slider 0..1000 -> F1.2..F16
    const ap = makeSliderRow('絞り値 (F1.2 ↔ F16)', '0', '1000', '1', '0', (v) => {
      const f = 1.2 * Math.pow(16 / 1.2, v / 1000);
      this.sim.setManualAperture(f);
    });
    this.apertureSlider = ap.input;
    this.apertureValEl = ap.valSpan;

    // Focus distance slider 0..1000 -> Infinity..0.40m
    const foc = makeSliderRow('ピント距離 (∞ ↔ 0.40m)', '0', '1000', '1', '0', (v) => {
      this.sim.setManualFocusT(v / 1000);
    });
    this.focusSlider = foc.input;
    this.focusValEl = foc.valSpan;

    // Field angle slider -18..+18 deg
    const ang = makeSliderRow('入射画角 (中央 0° ↔ 周辺 ±18°)', '-180', '180', '1', '0', (v) => {
      this.sim.setManualFieldAngle(v / 10);
    });
    this.angleSlider = ang.input;
    this.angleValEl = ang.valSpan;

    slidersBox.append(ap.row, foc.row, ang.row);

    // Beginner-Friendly Live Optical Phenomenon Caption
    this.captionEl = document.createElement('div');
    this.captionEl.className = 'optics-caption';

    side.append(bokehCard, this.compareWrapEl, slidersBox, this.captionEl);
    body.append(benchWrap, side);

    this.panelEl.append(header, body);
    if (typeof ResizeObserver !== 'undefined') {
      this.canvasResizeObserver?.disconnect();
      this.canvasResizeObserver = new ResizeObserver(() => {
        if (this.benchCanvas) {
          const r = this.benchCanvas.getBoundingClientRect();
          if (r.width > 0) this.benchCssW = Math.max(240, Math.round(r.width));
          if (r.height > 0) this.benchCssH = Math.max(180, Math.round(r.height));
        }
        if (this.bokehCanvas) {
          const r = this.bokehCanvas.getBoundingClientRect();
          if (r.width > 0) this.bokehCssW = Math.max(180, Math.round(r.width));
          if (r.height > 0) this.bokehCssH = Math.max(84, Math.round(r.height));
        }
      });
      if (this.benchCanvas) this.canvasResizeObserver.observe(this.benchCanvas);
      if (this.bokehCanvas) this.canvasResizeObserver.observe(this.bokehCanvas);
    }
    this.syncControlsUi();
  }

  private bindBenchInteractions(canvas: HTMLCanvasElement): void {
    const getLocalPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    canvas.addEventListener('pointerdown', (e) => {
      const pos = getLocalPos(e);
      const distHandle = Math.hypot(pos.x - this.subjectHandlePx.x, pos.y - this.subjectHandlePx.y);
      // Allow dragging either near subject handle or in the left object zone!
      if (distHandle < 28 || pos.x < this.benchTransform.xLeft + 26) {
        this.draggingSubject = true;
        canvas.setPointerCapture(e.pointerId);
        this.applyDragFromCanvasPos(pos.x, pos.y);
        return;
      }

      // Otherwise check click on any of the 14 glass elements -> inspect in 3D CAD!
      const hit = this.hitTestElement(pos.x, pos.y);
      if (hit) {
        this.handlers.onSelectPart(hit.partId);
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      const pos = getLocalPos(e);
      if (this.draggingSubject) {
        this.applyDragFromCanvasPos(pos.x, pos.y);
        canvas.style.cursor = 'grabbing';
        return;
      }

      const distHandle = Math.hypot(pos.x - this.subjectHandlePx.x, pos.y - this.subjectHandlePx.y);
      if (distHandle < 24) {
        canvas.style.cursor = 'grab';
        if (this.sim.hoveredElementId !== null) {
          this.sim.setHoveredElement(null);
          this.handlers.onHoverPart(null);
        }
        return;
      }

      const hit = this.hitTestElement(pos.x, pos.y);
      canvas.style.cursor = hit ? 'pointer' : 'default';
      const nextId = hit ? hit.partId : null;
      if (nextId !== this.sim.hoveredElementId) {
        this.sim.setHoveredElement(nextId);
        this.handlers.onHoverPart(nextId);
      }
    });

    const endDrag = () => {
      this.draggingSubject = false;
      canvas.style.cursor = 'default';
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('pointerleave', () => {
      if (!this.draggingSubject && this.sim.hoveredElementId !== null) {
        this.sim.setHoveredElement(null);
        this.handlers.onHoverPart(null);
      }
    });
  }

  private applyDragFromCanvasPos(x: number, y: number): void {
    const bt = this.benchTransform;
    // Vertical position maps to field angle (-18 .. +18 deg)
    const relY = (bt.yCenter - y) / (bt.pxPerMmY * 26);
    const angleDeg = Math.max(-18, Math.min(18, relY * 18));
    // Horizontal position in the left object zone maps to focusT (left=Infinity, closer to lens=0.40m)
    const xStart = 28;
    const xEnd = bt.xLeft + 10;
    const fracX = Math.max(0, Math.min(1, (x - xStart) / Math.max(24, xEnd - xStart)));

    this.sim.setManualFieldAngle(angleDeg);
    this.sim.setManualFocusT(fracX);
    this.syncControlsUi();
    this.handlers.onRequestRenderFrame();
  }

  private hitTestElement(x: number, y: number): OpticalElementSpec | null {
    for (const b of this.elementHitBoxes) {
      if (x >= b.xMin - 3 && x <= b.xMax + 3 && y >= b.yMin && y <= b.yMax) {
        return b.el;
      }
    }
    return null;
  }

  private syncControlsUi(): void {
    const desc = this.sim.getScenarioDescriptor();

    this.scenarioBtns.forEach((btn, id) => {
      btn.classList.toggle('is-active', id === this.sim.scenario);
    });

    if (this.playBtn) {
      this.playBtn.innerHTML = this.sim.autoPlay
        ? '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="3" width="3.2" height="10" rx="0.8" fill="currentColor"/><rect x="9.3" y="3" width="3.2" height="10" rx="0.8" fill="currentColor"/></svg><span>モーション一時停止</span>'
        : '<svg viewBox="0 0 16 16" aria-hidden="true"><polygon points="4,2.8 13.5,8 4,13.2" fill="currentColor"/></svg><span>自動モーション再生</span>';
      this.playBtn.classList.toggle('is-active', this.sim.autoPlay);
    }

    if (this.compareWrapEl && this.compareBtn) {
      if (desc.hasComparisonToggle) {
        this.compareWrapEl.style.display = 'flex';
        const isOn =
          this.sim.scenario === 'ed_chromatic'
            ? this.sim.targetEdStrength > 0.5
            : this.sim.scenario === 'xa_aspheric'
              ? this.sim.targetXaStrength > 0.5
              : this.sim.targetNanoArStrength > 0.5;
        this.compareBtn.classList.toggle('is-on', isOn);
        this.compareBtn.innerHTML = `
          <span class="optics-compare-lbl">${desc.toggleLabel}</span>
          <span class="optics-compare-pill">${isOn ? desc.toggleOnText : desc.toggleOffText}</span>
        `;
      } else {
        this.compareWrapEl.style.display = 'none';
      }
    }
  }

  private updateLiveReadouts(): void {
    const iris = this.sim.getIrisMetrics();
    const strokes = this.sim.getFloatingStrokes();

    if (this.apertureSlider && document.activeElement !== this.apertureSlider) {
      this.apertureSlider.value = String(Math.round(iris.closure01 * 1000));
    }
    if (this.focusSlider && document.activeElement !== this.focusSlider) {
      this.focusSlider.value = String(Math.round(this.sim.focusT * 1000));
    }
    if (this.angleSlider && document.activeElement !== this.angleSlider) {
      this.angleSlider.value = String(Math.round(this.sim.fieldAngleDeg * 10));
    }

    if (this.apertureValEl) {
      const fStr = iris.fNumber < 10 ? iris.fNumber.toFixed(1) : Math.round(iris.fNumber).toString();
      this.apertureValEl.textContent = `F${fStr}  ·  口径 φ${iris.entrancePupilMm.toFixed(1)}mm`;
    }
    if (this.focusValEl) {
      this.focusValEl.textContent = `${this.sim.getFocusDistanceLabel()}  ·  A:${strokes.dzA.toFixed(1)} / B:${strokes.dzB.toFixed(1)}mm`;
    }
    if (this.angleValEl) {
      const sign = this.sim.fieldAngleDeg > 0.2 ? '+' : '';
      this.angleValEl.textContent = `${sign}${this.sim.fieldAngleDeg.toFixed(1)}°`;
    }

    if (this.captionEl) {
      const desc = this.sim.getScenarioDescriptor();
      const dynamicText = desc.getDynamicCaption(this.sim);
      const captionKey = `${desc.accentColor}|${desc.fullTitle}|${dynamicText}`;
      if (this.captionEl.dataset.lastHtml !== captionKey) {
        this.captionEl.dataset.lastHtml = captionKey;
        const headEl = document.createElement('div');
        headEl.className = 'optics-caption-head';
        headEl.style.color = desc.accentColor;
        headEl.textContent = desc.fullTitle;
        const textEl = document.createElement('p');
        textEl.className = 'optics-caption-text';
        textEl.textContent = dynamicText;
        this.captionEl.replaceChildren(headEl, textEl);
      }
    }

    // Update live hover glass info badge
    if (this.hoverInfoEl) {
      const hoveredKey = this.sim.hoveredElementId ?? '';
      if (this.hoverInfoEl.dataset.lastId !== hoveredKey) {
        this.hoverInfoEl.dataset.lastId = hoveredKey;
        const hoveredEl = OPTICAL_ELEMENTS.find((e) => e.partId === this.sim.hoveredElementId);
        if (hoveredEl) {
          this.hoverInfoEl.style.opacity = '1';
          const titleEl = document.createElement('strong');
          titleEl.textContent = `${hoveredEl.code} ${hoveredEl.jaName}`;
          const metaEl = document.createElement('span');
          const sub1 = document.createElement('sub');
          sub1.textContent = 'd';
          const sub2 = document.createElement('sub');
          sub2.textContent = 'd';
          metaEl.append(
            'n',
            sub1,
            `=${hoveredEl.nd.toFixed(3)} · ν`,
            sub2,
            `=${hoveredEl.vd.toFixed(1)} — ${hoveredEl.role}`
          );
          this.hoverInfoEl.replaceChildren(titleEl, metaEl);
        } else {
          this.hoverInfoEl.style.opacity = '0';
        }
      }
    }

    // Keep comparison pill state fresh during autoPlay cycles!
    if (this.sim.autoPlay && this.compareBtn && this.compareWrapEl?.style.display !== 'none') {
      const desc = this.sim.getScenarioDescriptor();
      const isOn =
        this.sim.scenario === 'ed_chromatic'
          ? this.sim.edStrength > 0.5
          : this.sim.scenario === 'xa_aspheric'
            ? this.sim.xaStrength > 0.5
            : this.sim.nanoArStrength > 0.5;
      this.compareBtn.classList.toggle('is-on', isOn);
      const pill = this.compareBtn.querySelector('.optics-compare-pill');
      const nextPillText = isOn ? (desc.toggleOnText ?? 'ON') : (desc.toggleOffText ?? 'OFF');
      if (pill && pill.textContent !== nextPillText) pill.textContent = nextPillText;
    }
  }

  private startLoop(): void {
    const tick = (now: number) => {
      if (!this.isOpen) return;
      this.rafId = requestAnimationFrame(tick);
      const dt = Math.min(0.05, Math.max(0.001, (now - this.lastTime) / 1000));
      this.lastTime = now;
      this.animElapsed += dt;

      // Ensure 3D viewport also receives continuous frames while studio is open
      this.handlers.onRequestRenderFrame();
      this.updateLiveReadouts();
      this.renderOpticalBench();
      this.renderBokehAndIrisSimulator();
    };
    this.rafId = requestAnimationFrame(tick);
  }

  // ==========================================================================
  // RETINA 60FPS INTERACTIVE 14-ELEMENT OPTICAL BENCH CANVAS
  // ==========================================================================
  private renderOpticalBench(): void {
    const canvas = this.benchCanvas;
    if (!canvas) return;
    const w = this.benchCssW;
    const h = this.benchCssH;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.scale(dpr, dpr);

    // Pure bright studio optical-bench backdrop
    ctx.fillStyle = '#fbfcfe';
    ctx.fillRect(0, 0, w, h);

    // Coordinate mapping: zMax (+136mm, object side) -> left, zMin (-8mm, behind sensor) -> right
    const padL = Math.max(54, w * 0.085);
    const padR = Math.max(38, w * 0.065);
    const zMax = 136;
    const zMin = -6;
    const usableW = w - padL - padR;
    const pxPerMmZ = usableW / (zMax - zMin);
    // Keep clean optical aspect ratio so curved lenses look authentic & never squashed!
    const pxPerMmY = Math.min(pxPerMmZ * 1.06, (h * 0.42) / 36);
    const yCenter = h * 0.51;

    const toX = (z: number) => padL + (zMax - z) * pxPerMmZ;
    const toY = (y: number) => yCenter - y * pxPerMmY;

    this.benchTransform = {
      xLeft: toX(128),
      xRight: toX(0),
      yCenter,
      zMax,
      zMin,
      pxPerMmY,
    };

    // Subtle precision millimeter optical bench ruler along bottom
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(toX(zMax), yCenter);
    ctx.lineTo(toX(zMin), yCenter);
    ctx.stroke();

    // Subtle barrel silhouette outline (hood -> barrel -> mount)
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.16)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(
      toX(116),
      toY(35.5),
      toX(33.5) - toX(116),
      toY(-35.5) - toY(35.5)
    );
    ctx.setLineDash([]);

    // Hood & Rear 3:2 Baffle silhouettes
    ctx.fillStyle = '#334155';
    const drawHoodRib = (z: number, rIn: number, rOut: number) => {
      const rx = toX(z);
      ctx.fillRect(rx - 2, toY(rOut), 4, toY(rIn) - toY(rOut));
      ctx.fillRect(rx - 2, toY(-rIn), 4, toY(-rOut) - toY(-rIn));
    };
    drawHoodRib(126, 33.8, 38.0);
    drawHoodRib(120, 33.4, 37.6);
    // Rear 3:2 stray-light flare mask (L42 at z=38.2, opening ±13.5mm)
    ctx.fillStyle = '#1e293b';
    const xRearMask = toX(35.5);
    ctx.fillRect(xRearMask - 1.8, toY(25.5), 3.6, toY(14.5) - toY(25.5));
    ctx.fillRect(xRearMask - 1.8, toY(-14.5), 3.6, toY(-25.5) - toY(-14.5));

    // Compute live kinematics
    const strokes = this.sim.getFloatingStrokes();
    const iris = this.sim.getIrisMetrics();

    // -----------------------------------------------------------------------
    // Floating Focus Group A & B Highlight Brackets + Quad XD Thrust Arrows
    // -----------------------------------------------------------------------
    const drawFocusGroupCage = (
      zFront: number,
      zRear: number,
      label: string,
      color: string,
      vel: number,
      labelOffsetX: number
    ) => {
      const x1 = toX(zFront);
      const x2 = toX(zRear);
      const yTop = toY(28.5);
      const yBot = toY(-28.5);
      const pad = 3.5;

      ctx.save();
      ctx.fillStyle = `${color}10`;
      ctx.strokeStyle = `${color}88`;
      ctx.lineWidth = this.sim.scenario === 'floating_xd' ? 1.8 : 1.1;
      ctx.beginPath();
      ctx.roundRect(x1 - pad, yTop, x2 - x1 + pad * 2, yBot - yTop, 6);
      ctx.fill();
      ctx.stroke();

      // Clean non-overlapping label above cage
      ctx.font = '700 9px ui-monospace, SFMono-Regular, monospace';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(label, (x1 + x2) * 0.5 + labelOffsetX, yTop - 6);

      // Animated Quad XD Electromagnetic Lorentz Thrust Arrow when moving or in floating_xd mode!
      if (this.sim.scenario === 'floating_xd' || Math.abs(vel) > 0.15) {
        const dir = Math.abs(vel) > 0.08 ? Math.sign(vel) : -1; // positive dz = left (-x in canvas), negative dz = right (+x)
        const arrowDirX = -dir;
        const cx = (x1 + x2) * 0.5;
        const ay = yBot + 11;
        const arrowLen = 14 + Math.min(12, Math.abs(vel) * 1.4);

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(cx - arrowDirX * arrowLen * 0.5, ay);
        ctx.lineTo(cx + arrowDirX * arrowLen * 0.5, ay);
        ctx.stroke();

        const tipX = cx + arrowDirX * arrowLen * 0.5;
        ctx.beginPath();
        ctx.moveTo(tipX + arrowDirX * 5, ay);
        ctx.lineTo(tipX - arrowDirX * 2, ay - 3.5);
        ctx.lineTo(tipX - arrowDirX * 2, ay + 3.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    drawFocusGroupCage(
      78.0 + strokes.dzA,
      65.0 + strokes.dzA,
      `A群 ${strokes.dzA.toFixed(1)}mm`,
      '#d97706',
      this.sim.focusVelocityA,
      -6
    );
    drawFocusGroupCage(
      62.8 + strokes.dzB,
      55.0 + strokes.dzB,
      `B群 ${strokes.dzB.toFixed(1)}mm`,
      '#0d9488',
      this.sim.focusVelocityB,
      10
    );

    // -----------------------------------------------------------------------
    // Draw ALL 14 Physically Shaped Optical Glass Elements (E01–E14)
    // -----------------------------------------------------------------------
    this.elementHitBoxes = [];
    for (const el of OPTICAL_ELEMENTS) {
      const shift =
        el.focusGroup === 'A' ? strokes.dzA : el.focusGroup === 'B' ? strokes.dzB : 0;
      const zCenter = el.z + shift;
      const zF = zCenter + el.thick * 0.5;
      const zR = zCenter - el.thick * 0.5;
      const a4 = el.isXa ? el.a4F * this.sim.xaStrength : 0;
      const a6 = el.isXa ? el.a6F * this.sim.xaStrength : 0;

      const isHovered = this.sim.hoveredElementId === el.partId;
      const steps = 18;
      let xMin = Infinity;
      let xMax = -Infinity;

      ctx.beginPath();
      // Front optical surface from +ap down to -ap
      for (let i = 0; i <= steps; i++) {
        const yMm = el.ap - (2 * el.ap * i) / steps;
        const zMm = evalSurfaceZ(yMm, zF, el.rF, a4, a6);
        const px = toX(zMm);
        const py = toY(yMm);
        if (px < xMin) xMin = px;
        if (px > xMax) xMax = px;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      // Rear optical surface from -ap back up to +ap
      for (let i = 0; i <= steps; i++) {
        const yMm = -el.ap + (2 * el.ap * i) / steps;
        const zMm = evalSurfaceZ(yMm, zR, el.rR, 0, 0);
        const px = toX(zMm);
        const py = toY(yMm);
        if (px < xMin) xMin = px;
        if (px > xMax) xMax = px;
        ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Optical glass material tinting (XA = luminous sky cyan, ED = emerald, Flint = warm teal-slate, Lanthanum = crisp indigo-blue)
      const grad = ctx.createLinearGradient(xMin, toY(el.ap), xMax, toY(-el.ap));
      if (el.isXa) {
        grad.addColorStop(0, isHovered ? 'rgba(14, 165, 233, 0.42)' : 'rgba(56, 189, 248, 0.28)');
        grad.addColorStop(0.5, 'rgba(224, 242, 254, 0.42)');
        grad.addColorStop(1, isHovered ? 'rgba(2, 132, 199, 0.44)' : 'rgba(14, 165, 233, 0.26)');
      } else if (el.isEd) {
        grad.addColorStop(0, isHovered ? 'rgba(16, 185, 129, 0.44)' : 'rgba(16, 185, 129, 0.28)');
        grad.addColorStop(0.5, 'rgba(209, 250, 229, 0.42)');
        grad.addColorStop(1, isHovered ? 'rgba(5, 150, 105, 0.44)' : 'rgba(16, 185, 129, 0.24)');
      } else if (el.isFlint) {
        grad.addColorStop(0, 'rgba(99, 102, 241, 0.24)');
        grad.addColorStop(1, 'rgba(79, 70, 229, 0.16)');
      } else if (el.kind === 'lanthanum') {
        grad.addColorStop(0, 'rgba(59, 130, 246, 0.18)');
        grad.addColorStop(1, 'rgba(147, 197, 253, 0.22)');
      } else {
        grad.addColorStop(0, 'rgba(148, 163, 184, 0.20)');
        grad.addColorStop(1, 'rgba(203, 213, 225, 0.24)');
      }

      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = isHovered
        ? '#0d5bd9'
        : el.isXa
          ? '#0284c7'
          : el.isEd
            ? '#059669'
            : '#64748b';
      ctx.lineWidth = isHovered ? 2.2 : el.isXa || el.isEd ? 1.5 : 1.05;
      ctx.stroke();

      // Highlight Nano AR II shimmering coating contour on glass surfaces in Scenario 5
      if (this.sim.scenario === 'nano_ar_baffle' && this.sim.nanoArStrength > 0.2) {
        ctx.save();
        ctx.strokeStyle = `rgba(99, 102, 241, ${(this.sim.nanoArStrength * 0.55).toFixed(2)})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
        ctx.restore();
      }

      // Highlight special optical element badges (XA1, S-ED, XA2, ED2, XA3)
      if (el.isXa || el.isEd || isHovered) {
        ctx.font = '700 8.5px ui-monospace, SFMono-Regular, monospace';
        ctx.fillStyle = el.isXa ? '#0369a1' : el.isEd ? '#047857' : '#1e293b';
        ctx.textAlign = 'center';
        const labelY = el.focusGroup === 'fixed' ? toY(el.ap) - 5 : toY(-el.ap) + 11;
        ctx.fillText(el.shortLabel, (xMin + xMax) * 0.5, labelY);
      }

      this.elementHitBoxes.push({
        el,
        xMin,
        xMax,
        yMin: toY(el.ap),
        yMax: toY(-el.ap),
      });
    }

    // -----------------------------------------------------------------------
    // 11-Blade Circular Iris Stop at z = 82.0 mm
    // -----------------------------------------------------------------------
    const xIris = toX(IRIS_Z);
    const yIrisTop = toY(iris.irisRadiusMm);
    const yIrisBot = toY(-iris.irisRadiusMm);
    const yIrisOuterTop = toY(32.5);
    const yIrisOuterBot = toY(-32.5);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(xIris - 2.4, yIrisOuterTop, 4.8, Math.max(0, yIrisTop - yIrisOuterTop));
    ctx.fillRect(xIris - 2.4, yIrisBot, 4.8, Math.max(0, yIrisOuterBot - yIrisBot));
    // Crisp white tips at iris aperture edges
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(xIris - 3.2, yIrisTop - 1.5, 6.4, 3);
    ctx.fillRect(xIris - 3.2, yIrisBot - 1.5, 6.4, 3);
    ctx.font = '700 8.5px ui-monospace, SFMono-Regular, monospace';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'center';
    ctx.fillText('絞り', xIris, yIrisOuterTop - 5);

    // -----------------------------------------------------------------------
    // Full-Frame 36x24 mm Sensor Plane at z = 0.0 mm
    // -----------------------------------------------------------------------
    const xSensor = toX(SENSOR_Z);
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(xSensor - 1.5, toY(18), 5.5, toY(-18) - toY(18));
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(xSensor - 1.5, toY(18), 5.5, toY(-18) - toY(18));
    ctx.font = '700 8.5px ui-monospace, SFMono-Regular, monospace';
    ctx.fillStyle = '#0f766e';
    ctx.textAlign = 'center';
    ctx.fillText('36×24', xSensor + 1, toY(-18) + 12);
    ctx.fillText('CMOS', xSensor + 1, toY(-18) + 22);

    // -----------------------------------------------------------------------
    // Real-Time Snell-Traced Light Rays + Luminous Flowing Photon Wavepackets
    // -----------------------------------------------------------------------
    const tracedRays = this.sim.traceActiveBundle(zMax);

    // Subtle translucent light-cone fill between outermost unclipped top & bottom rays!
    const passing = tracedRays.filter((r) => !r.clippedAtIris && r.rayRole !== 'ghost' && r.rayRole !== 'stray');
    if (passing.length >= 2 && this.sim.scenario !== 'ed_chromatic') {
      const firstRay = passing[0];
      const lastRay = passing[passing.length - 1];
      ctx.save();
      ctx.beginPath();
      firstRay.points.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(toX(p.z), toY(p.y));
        else ctx.lineTo(toX(p.z), toY(p.y));
      });
      for (let idx = lastRay.points.length - 1; idx >= 0; idx--) {
        const p = lastRay.points[idx];
        ctx.lineTo(toX(p.z), toY(p.y));
      }
      ctx.closePath();
      const coneGrad = ctx.createLinearGradient(toX(zMax), yCenter, xSensor, yCenter);
      coneGrad.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
      coneGrad.addColorStop(0.55, 'rgba(14, 165, 233, 0.11)');
      coneGrad.addColorStop(1, 'rgba(2, 132, 199, 0.18)');
      ctx.fillStyle = coneGrad;
      ctx.fill();
      ctx.restore();
    }

    // Draw every individual traced ray + animated glowing photon packet!
    for (let rIdx = 0; rIdx < tracedRays.length; rIdx++) {
      const r = tracedRays[rIdx];
      if (r.opacity < 0.03) continue;
      ctx.save();
      ctx.beginPath();
      r.points.forEach((p, i) => {
        const px = toX(p.z);
        const py = toY(p.y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = r.color;
      ctx.globalAlpha = r.opacity;
      ctx.lineWidth = r.width;
      if (r.rayRole === 'ghost' || r.rayRole === 'stray' || r.clippedAtIris) {
        ctx.setLineDash([4, 3]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw animated photon wavepackets streaming smoothly along unclipped rays
      if (!r.clippedAtIris && r.points.length >= 2 && r.rayRole !== 'stray') {
        const totalSegs = r.points.length - 1;
        const packets = r.rayRole === 'ghost' ? 1 : 2;
        for (let k = 0; k < packets; k++) {
          const u = (this.animElapsed * 0.42 + k * 0.5 + rIdx * 0.08) % 1;
          const segF = u * totalSegs;
          const sIdx = Math.min(totalSegs - 1, Math.floor(segF));
          const lt = segF - sIdx;
          const p0 = r.points[sIdx];
          const p1 = r.points[sIdx + 1];
          const px = toX(p0.z + (p1.z - p0.z) * lt);
          const py = toY(p0.y + (p1.y - p0.y) * lt);

          ctx.globalAlpha = Math.min(1, r.opacity + 0.15);
          ctx.fillStyle = r.color;
          ctx.beginPath();
          ctx.arc(px, py, r.rayRole === 'ghost' ? 2.5 : 2.9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, 1.15, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // -----------------------------------------------------------------------
    // Draggable Subject Source Handle on Left Margin (Drag Up/Down = Angle, Left/Right = Focus!)
    // -----------------------------------------------------------------------
    const handleX = 28 + this.sim.focusT * Math.max(20, toX(128) - 18);
    const handleY = yCenter - (this.sim.fieldAngleDeg / 18) * (pxPerMmY * 26);
    this.subjectHandlePx = { x: handleX, y: handleY };

    ctx.save();
    // Pulsing interaction ring
    const pulseR = 11 + Math.sin(this.animElapsed * 3.8) * 2.2;
    ctx.beginPath();
    ctx.arc(handleX, handleY, pulseR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.16)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(handleX, handleY, 6.2, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.font = '700 9px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#b45309';
    ctx.textAlign = 'center';
    ctx.fillText('被写体', handleX, handleY - 14);
    ctx.font = '500 8px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('ドラッグ操作', handleX, handleY + 21);
    ctx.restore();

    // -----------------------------------------------------------------------
    // Scenario-Specific Live Scientific Loupe / Wave-Interference Inset!
    // -----------------------------------------------------------------------
    this.renderBenchScientificInset(ctx, w, h, tracedRays);

    ctx.restore();
  }

  /**
   * Renders a crisp 10x magnified scientific inset directly inside the Optical Bench Canvas
   * tailored to the active optical mechanism scenario!
   */
  private renderBenchScientificInset(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    tracedRays: ReturnType<LensOpticalSim['traceActiveBundle']>
  ): void {
    const boxW = Math.min(182, Math.max(146, w * 0.25));
    const boxH = Math.min(92, Math.max(74, h * 0.36));
    const bx = w - boxW - 10;
    const by = 10;

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 9);
    ctx.fill();
    ctx.stroke();

    const sc = this.sim.scenario;

    if (sc === 'ed_chromatic' || sc === 'xa_aspheric') {
      // 10x Magnified Focal Plane Spot Loupe (z = +8 mm .. -3 mm around Sensor Plane z = 0)
      const isEd = sc === 'ed_chromatic';
      ctx.font = '700 8.5px -apple-system, sans-serif';
      ctx.fillStyle = isEd ? '#047857' : '#0369a1';
      ctx.textAlign = 'left';
      ctx.fillText(isEd ? '10× 焦点面 RGB色ズレ拡大' : '10× 球面収差コースティクス拡大', bx + 8, by + 13);

      const ix0 = bx + 10;
      const ix1 = bx + boxW - 10;
      const iyMid = by + boxH * 0.56;
      const zHi = isEd ? 4.5 : 12.0;
      const zLo = -3.0;
      const toIx = (z: number) => ix0 + ((zHi - z) / (zHi - zLo)) * (ix1 - ix0);
      const toIy = (y: number) => iyMid - y * (isEd ? 5.2 : 2.8);

      // Sensor plane vertical line inside loupe
      const sx = toIx(0);
      ctx.strokeStyle = '#0f766e';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(sx, by + 20);
      ctx.lineTo(sx, by + boxH - 8);
      ctx.stroke();

      // Clip to loupe region and draw zoomed-in final ray segments
      ctx.save();
      ctx.beginPath();
      ctx.rect(bx + 4, by + 18, boxW - 8, boxH - 22);
      ctx.clip();
      for (const r of tracedRays) {
        if (r.clippedAtIris || r.points.length < 2) continue;
        const pPrev = r.points[r.points.length - 2];
        const pEnd = r.points[r.points.length - 1]; // at z=0
        const dz = pEnd.z - pPrev.z;
        const dy = pEnd.y - pPrev.y;
        const slope = dy / dz;
        const yAtHi = pEnd.y + slope * (zHi - 0);
        const yAtLo = pEnd.y + slope * (zLo - 0);

        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(toIx(zHi), toIy(yAtHi));
        ctx.lineTo(toIx(zLo), toIy(yAtLo));
        ctx.stroke();
      }
      ctx.restore();

      // Compute live axial spread readout
      let spreadMm = 0;
      if (isEd) {
        const red = tracedRays.find((r) => r.rayRole === 'rgb_r' && !r.clippedAtIris);
        const blu = tracedRays.find((r) => r.rayRole === 'rgb_b' && !r.clippedAtIris);
        if (red && blu) spreadMm = Math.abs(red.zFocus - blu.zFocus);
      } else {
        const par = tracedRays.find((r) => r.rayRole === 'paraxial' && !r.clippedAtIris);
        const mar = tracedRays.find((r) => r.rayRole === 'marginal' && !r.clippedAtIris);
        if (par && mar) spreadMm = Math.abs(mar.zFocus - par.zFocus);
      }
      ctx.font = '600 8px ui-monospace, monospace';
      ctx.fillStyle = spreadMm < 0.35 ? '#059669' : '#e11d48';
      ctx.textAlign = 'right';
      ctx.fillText(`Δz = ${spreadMm.toFixed(2)} mm`, bx + boxW - 8, by + boxH - 5);
    } else if (sc === 'nano_ar_baffle') {
      // Animated Nanoscale Thin-Film Destructive Wave Interference Simulator!
      ctx.font = '700 8.5px -apple-system, sans-serif';
      ctx.fillStyle = '#4f46e5';
      ctx.textAlign = 'left';
      ctx.fillText('Nano AR II 位相180°波動消滅', bx + 8, by + 13);

      const x0 = bx + 10;
      const x1 = bx + boxW - 10;
      const ym = by + boxH * 0.56;
      const amp = 14;
      const phaseShift = this.sim.nanoArStrength * Math.PI; // 0 (in-phase) -> PI (180 deg destructive!)
      const kWave = 0.22;
      const wTime = this.animElapsed * 6.0;

      const drawWave = (color: string, width: number, alpha: number, evalFn: (x: number) => number) => {
        ctx.save();
        ctx.beginPath();
        for (let px = x0; px <= x1; px += 2) {
          const y = ym - evalFn(px - x0);
          if (px === x0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.restore();
      };

      // Reflected Wave 1 (Air/Nano-AR interface)
      drawWave('#60a5fa', 1.2, 0.75, (dx) => Math.sin(dx * kWave - wTime) * amp * 0.55);
      // Reflected Wave 2 (Nano-AR/Glass interface, phase-shifted by 180 deg!)
      drawWave('#f472b6', 1.2, 0.75, (dx) => Math.sin(dx * kWave - wTime + phaseShift) * amp * 0.55);
      // Resultant Sum Wave (flattens straight to ZERO when Nano AR II is ON!)
      drawWave(
        this.sim.nanoArStrength > 0.5 ? '#10b981' : '#ef4444',
        2.2,
        0.95,
        (dx) =>
          (Math.sin(dx * kWave - wTime) + Math.sin(dx * kWave - wTime + phaseShift)) * amp * 0.55
      );

      const reflPct = (4.0 * (1 - this.sim.nanoArStrength * 0.98)).toFixed(2);
      ctx.font = '600 8px ui-monospace, monospace';
      ctx.fillStyle = this.sim.nanoArStrength > 0.5 ? '#059669' : '#dc2626';
      ctx.textAlign = 'right';
      ctx.fillText(`界面反射率 R ≈ ${reflPct}%`, bx + boxW - 8, by + boxH - 5);
    } else if (sc === 'floating_xd') {
      // Live Differential Floating Trajectory Curve Graph (dzA vs dzB across focusT)
      ctx.font = '700 8.5px -apple-system, sans-serif';
      ctx.fillStyle = '#b45309';
      ctx.textAlign = 'left';
      ctx.fillText('A群/B群 独立フローティング曲線', bx + 8, by + 13);

      const gx0 = bx + 14;
      const gx1 = bx + boxW - 12;
      const gyTop = by + 24;
      const gyBot = by + boxH - 16;

      ctx.strokeStyle = 'rgba(100,116,139,0.28)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(gx0, gyTop);
      ctx.lineTo(gx0, gyBot);
      ctx.lineTo(gx1, gyBot);
      ctx.stroke();

      // Curve A (amber) and Curve B (teal)
      const plotCurve = (color: string, fn: (t: number) => number) => {
        ctx.beginPath();
        for (let i = 0; i <= 24; i++) {
          const t = i / 24;
          const px = gx0 + t * (gx1 - gx0);
          const py = gyTop + (Math.abs(fn(t)) / 6.0) * (gyBot - gyTop);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      };
      plotCurve('#d97706', (t) => -(6.85 * t - 1.35 * t * t));
      plotCurve('#0d9488', (t) => -(3.45 * t - 0.49 * t * t));

      // Live indicator dots
      const st = this.sim.getFloatingStrokes();
      const lx = gx0 + this.sim.focusT * (gx1 - gx0);
      const lyA = gyTop + (Math.abs(st.dzA) / 6.0) * (gyBot - gyTop);
      const lyB = gyTop + (Math.abs(st.dzB) / 6.0) * (gyBot - gyTop);
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(lx, lyA, 3.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0d9488';
      ctx.beginPath();
      ctx.arc(lx, lyB, 3.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '600 7.5px ui-monospace, monospace';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'left';
      ctx.fillText('∞', gx0, by + boxH - 4);
      ctx.textAlign = 'right';
      ctx.fillText('0.40m (比率 1.86:1)', gx1, by + boxH - 4);
    } else {
      // Scenario 1: Aperture & Telecentric CRA + Depth of Field Live Telemetry
      const iris = this.sim.getIrisMetrics();
      const chief = tracedRays.find((r) => r.rayRole === 'chief') ?? tracedRays[0];
      const cra = chief ? chief.craDeg : 0;
      ctx.font = '700 8.5px -apple-system, sans-serif';
      ctx.fillStyle = '#0369a1';
      ctx.textAlign = 'left';
      ctx.fillText('リアルタイム光学テレメトリ', bx + 8, by + 14);

      ctx.font = '600 8.5px ui-monospace, monospace';
      ctx.fillStyle = '#334155';
      ctx.fillText(`有効口径 D : φ${iris.entrancePupilMm.toFixed(1)} mm`, bx + 10, by + 31);
      const dofText = iris.dofMm > 1000 ? `${(iris.dofMm / 1000).toFixed(2)} m` : `${iris.dofMm.toFixed(1)} mm`;
      ctx.fillText(`被写界深度 : ±${dofText}`, bx + 10, by + 46);
      ctx.fillText(`主光線角 CRA: ${cra.toFixed(1)}° (<11°)`, bx + 10, by + 61);
      ctx.fillStyle = '#0284c7';
      ctx.fillText(`EFL = 50.07 mm · 14枚10群`, bx + 10, by + 76);
    }

    ctx.restore();
  }

  // ==========================================================================
  // LIVE 11-BLADE CIRCULAR IRIS + REALISTIC BOKEH PSF SIMULATOR MINI-CANVAS
  // ==========================================================================
  private renderBokehAndIrisSimulator(): void {
    const canvas = this.bokehCanvas;
    if (!canvas) return;
    const w = this.bokehCssW;
    const h = this.bokehCssH;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.scale(dpr, dpr);

    // Subtle crisp laboratory surface
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    const iris = this.sim.getIrisMetrics();
    const midX = w * 0.46;
    const cy = h * 0.54;
    const maxR = Math.min(h * 0.34, midX * 0.36);

    // -----------------------------------------------------------------------
    // Left Half: Live Animated 11-Blade Circular Iris Diaphragm
    // -----------------------------------------------------------------------
    const ix = midX * 0.5;
    ctx.save();
    // Outer iris metallic housing ring
    ctx.beginPath();
    ctx.arc(ix, cy, maxR + 5, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();

    // Inner bright aperture opening (11 curved blades -> nearly circular at F1.2-F2.8, subtle 11-gon at F11-F16!)
    const openR = Math.max(3.5, maxR * (1.2 / iris.fNumber));
    const nBlades = 11;
    const bladeCurvature = 1 - iris.closure01 * 0.14;

    ctx.beginPath();
    for (let i = 0; i < nBlades; i++) {
      const a0 = (i / nBlades) * Math.PI * 2 + iris.closure01 * 0.4;
      const a1 = ((i + 1) / nBlades) * Math.PI * 2 + iris.closure01 * 0.4;
      const aMid = (a0 + a1) * 0.5;
      const x0 = ix + Math.cos(a0) * openR;
      const y0 = cy + Math.sin(a0) * openR;
      const x1 = ix + Math.cos(a1) * openR;
      const y1 = cy + Math.sin(a1) * openR;
      const xc = ix + Math.cos(aMid) * openR * (1.035 * bladeCurvature);
      const yc = cy + Math.sin(aMid) * openR * (1.035 * bladeCurvature);
      if (i === 0) ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(xc, yc, x1, y1);
    }
    ctx.closePath();
    const apGrad = ctx.createRadialGradient(ix, cy, 1, ix, cy, openR);
    apGrad.addColorStop(0, '#e0f2fe');
    apGrad.addColorStop(1, '#7dd3fc');
    ctx.fillStyle = apGrad;
    ctx.fill();

    // Subtle 11 curved carbon-blade seam lines radiating outward
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 0.85;
    for (let i = 0; i < nBlades; i++) {
      const a = (i / nBlades) * Math.PI * 2 + iris.closure01 * 0.4;
      const x0 = ix + Math.cos(a) * openR;
      const y0 = cy + Math.sin(a) * openR;
      const aOut = a + 0.65;
      const x1 = ix + Math.cos(aOut) * (maxR + 4);
      const y1 = cy + Math.sin(aOut) * (maxR + 4);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    ctx.font = '700 8.5px -apple-system, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'center';
    ctx.fillText('11枚円形絞り', ix, 12);
    ctx.restore();

    // Vertical soft divider
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.08)';
    ctx.beginPath();
    ctx.moveTo(midX, 10);
    ctx.lineTo(midX, h - 10);
    ctx.stroke();

    // -----------------------------------------------------------------------
    // Right Half: Physically Styled Bokeh Disc PSF Simulator (玉ボケプレビュー)
    // -----------------------------------------------------------------------
    const bx = midX + (w - midX) * 0.5;
    // Dark twilight backdrop pill so luminous bokeh disc pops vividly!
    const bgW = w - midX - 18;
    const bgH = h - 22;
    ctx.save();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(midX + 9, 16, bgW, bgH, 8);
    ctx.fill();

    // Clip to dark bokeh stage
    ctx.beginPath();
    ctx.roundRect(midX + 9, 16, bgW, bgH, 8);
    ctx.clip();

    const bokehR = Math.max(4.5, (bgH * 0.41) * (1.2 / iris.fNumber) * (0.72 + 0.28 * this.sim.focusT));
    // Cat's-eye optical vignetting toward frame corners when wide open (F1.2 -> vanishes by F2.8!)
    const cornerFrac = Math.min(1, Math.abs(this.sim.fieldAngleDeg) / 18);
    const catsEyeSquash = 1 - cornerFrac * Math.max(0, 1 - (iris.fNumber - 1.2) / 1.8) * 0.34;

    ctx.translate(bx, cy + 4);
    ctx.scale(catsEyeSquash, 1);

    // Chromatic LoCA color fringe halo when ED is OFF!
    const locaAmt = 1 - this.sim.edStrength;
    if (locaAmt > 0.06) {
      ctx.beginPath();
      ctx.arc(0, 0, bokehR + 2.4 * locaAmt, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168, 85, 247, ${(0.85 * locaAmt).toFixed(2)})`;
      ctx.lineWidth = 2.6 * locaAmt;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, Math.max(2, bokehR - 1.5 * locaAmt), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34, 197, 94, ${(0.72 * locaAmt).toFixed(2)})`;
      ctx.lineWidth = 2.0 * locaAmt;
      ctx.stroke();
    }

    // Creamy G Master Bokeh Disc gradient (soft melted edge with XA ON vs hard bright edge + onion rings when XA OFF!)
    const xaOffAmt = 1 - this.sim.xaStrength;
    const discGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, bokehR);
    if (xaOffAmt < 0.35) {
      discGrad.addColorStop(0.0, 'rgba(255, 251, 235, 0.96)');
      discGrad.addColorStop(0.68, 'rgba(254, 240, 138, 0.78)');
      discGrad.addColorStop(0.92, 'rgba(253, 224, 71, 0.42)');
      discGrad.addColorStop(1.0, 'rgba(253, 224, 71, 0.0)');
    } else {
      discGrad.addColorStop(0.0, 'rgba(254, 249, 195, 0.65)');
      discGrad.addColorStop(0.82, 'rgba(253, 224, 71, 0.72)');
      discGrad.addColorStop(0.96, 'rgba(255, 255, 255, 0.92)'); // Hard double-edge spherical ring!
      discGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    }
    ctx.fillStyle = discGrad;
    ctx.beginPath();
    ctx.arc(0, 0, bokehR, 0, Math.PI * 2);
    ctx.fill();

    // Concentric Onion-Ring Bokeh Artifacts appearing vividly when XA is toggled OFF!
    if (xaOffAmt > 0.08 && bokehR > 7) {
      ctx.strokeStyle = `rgba(15, 23, 42, ${(0.42 * xaOffAmt).toFixed(2)})`;
      ctx.lineWidth = 1.1;
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        ctx.arc(0, 0, bokehR * (ring / 4.6), 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // 22-ray Starburst diffraction spikes at small apertures (F11-F16, 11 odd blades -> 22 rays!)
    if (iris.fNumber >= 8.0) {
      const starAlpha = Math.min(0.85, (iris.fNumber - 8.0) / 7.5);
      ctx.strokeStyle = `rgba(254, 240, 138, ${starAlpha.toFixed(2)})`;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 22; i++) {
        const a = (i / 22) * Math.PI * 2;
        const rLen = bokehR + (i % 2 === 0 ? 15 : 10) * starAlpha;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * rLen, Math.sin(a) * rLen);
        ctx.stroke();
      }
    }

    ctx.restore();

    ctx.font = '700 8.5px -apple-system, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'center';
    const bokehBadge =
      xaOffAmt > 0.5
        ? '玉ボケ（年輪発生）'
        : locaAmt > 0.5
          ? '玉ボケ（色滲み発生）'
          : '玉ボケ PSF（とろける描写）';
    ctx.fillText(bokehBadge, bx, 12);

    ctx.restore();
  }
}
