import { CameraPreset, GraphicsQuality, RenderMode, ScaleMode } from '../assemblies/types';

export type CaptureMode = 'ui' | 'cad' | 'diagram' | 'explanation' | 'full' | 'custom';

export interface CaptureCustomOptions {
  readonly showCad?: boolean;
  readonly showUi?: boolean;
  readonly showDrawer?: boolean;
  readonly showDiagram?: boolean;
  readonly showPerfHud?: boolean;
  readonly showLightbox?: boolean;
  readonly lightboxRotate?: boolean;
  readonly drawerTab?: 'all' | 'diagram' | 'explanation';
  readonly playground?: boolean;
  readonly playgroundReport?: boolean;
  readonly unit?: ScaleMode;
  readonly quality?: GraphicsQuality;
  readonly renderMode?: RenderMode;
  readonly preset?: CameraPreset;
  readonly explode?: number;
  readonly partId?: string | null;
  readonly clipSelector?: string | null;
  readonly miraiSubView?: number;
  readonly miraiEdition?: 'beginner' | 'expert';
  readonly miraiStudioTab?: 'reports' | 'matrix' | 'glossary' | null;
  readonly originalStudioTab?: 'principles' | 'bom' | 'power_rl' | null;
  readonly physics?: boolean;
}

export interface CapturePrepareResult {
  readonly mode: CaptureMode;
  readonly clip: { x: number; y: number; width: number; height: number } | null;
  readonly activeUnit: string;
  readonly activeQuality: string;
  readonly selectedPartId: string | null;
  readonly readyMs: number;
}

export interface CaptureHostAdapter {
  readonly appRoot: HTMLElement;
  setMode: (mode: ScaleMode, immediateCamera?: boolean) => void;
  getMode: () => ScaleMode;
  setQuality: (quality: GraphicsQuality) => void;
  getQuality: () => GraphicsQuality;
  setRenderMode: (mode: RenderMode) => void;
  setExplode: (val: number, immediate?: boolean) => void;
  setCameraPreset: (preset: CameraPreset, immediate?: boolean) => void;
  selectPart: (partId: string | null, focusCamera?: boolean) => void;
  getFirstPartId: () => string | null;
  getSelectedPartId: () => string | null;
  isUnitReady: () => boolean;
  setPerfHudVisible: (visible: boolean) => void;
  setDrawerViewTab: (tab: 'all' | 'diagram' | 'explanation') => void;
  setLightboxOpen: (open: boolean, rotated?: boolean) => void;
  openPlayground: (showReport?: boolean) => Promise<void>;
  closePlayground: () => void;
  setMiraiSubView?: (subView: number, immediateCamera?: boolean) => void;
  setMiraiEdition?: (edition: 'beginner' | 'expert') => void;
  openMiraiStudio?: (tab: 'reports' | 'matrix' | 'glossary') => Promise<void>;
  closeMiraiStudio?: () => void;
  openOriginalStudio?: (tab: 'principles' | 'bom' | 'power_rl') => Promise<void>;
  closeOriginalStudio?: () => void;
  setPhysicsActive?: (active: boolean) => void;
  requestRenderFrame: () => void;
}

function waitFrames(n = 3): Promise<void> {
  return new Promise((resolve) => {
    let count = 0;
    const step = () => {
      count++;
      if (count >= n) resolve();
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/**
 * High-Speed Dedicated Artifact Capture Bridge (`window.__cad.capture`).
 * Supports 6 deterministic visual verification modes:
 *   - 'ui'          (UIのみ: hides WebGL canvas, isolates HUD over clean studio backdrop)
 *   - 'cad'         (3D CADのみ: hides all HUD/drawers/overlays for pure 3D WebGL frame)
 *   - 'diagram'     (図説のみ: auto-selects part, awaits SVG hydration, isolates schematic stage)
 *   - 'explanation' (解説のみ: auto-selects part, isolates explanation drawer card)
 *   - 'full'        (全体: full integrated studio view)
 *   - 'custom'      (カスタマイズ: arbitrary layer toggles, unit/tier/explode/lightbox/playground)
 */
export class ArtifactCaptureBridge {
  private readonly host: CaptureHostAdapter;

  constructor(host: CaptureHostAdapter) {
    this.host = host;
  }

  private async waitUnitReady(timeoutMs = 15000): Promise<void> {
    const start = performance.now();
    while (!this.host.isUnitReady() && performance.now() - start < timeoutMs) {
      await new Promise((r) => setTimeout(r, 12));
    }
    await waitFrames(1);
  }

  private async waitSchematicHydrated(timeoutMs = 8000): Promise<void> {
    const start = performance.now();
    while (performance.now() - start < timeoutMs) {
      const content = this.host.appRoot.querySelector('.schematic-stage .exp-diagram-content');
      if (content && content.querySelector('svg')) break;
      await new Promise((r) => setTimeout(r, 15));
    }
    await waitFrames(1);
  }

  /**
   * Direct zero-compositor WebGL2 canvas capture for pure `cad` mode (`pp --direct-gl`).
   * Triggers a single synchronous frame commit and encodes directly off the WebGL canvas.
   */
  public async captureDirectCanvasDataUrl(
    format: 'png' | 'webp' | 'jpeg' = 'png',
    quality = 0.92
  ): Promise<string | null> {
    const canvas = this.host.appRoot.querySelector('#viewport canvas') as HTMLCanvasElement | null;
    if (!canvas) return null;
    this.host.requestRenderFrame();
    await waitFrames(1);
    const mime =
      format === 'webp' ? 'image/webp' : format === 'jpeg' ? 'image/jpeg' : 'image/png';
    return canvas.toDataURL(mime, quality);
  }

  private measureClip(selector: string | null): { x: number; y: number; width: number; height: number } | null {
    if (!selector) return null;
    const el = this.host.appRoot.querySelector(selector) as HTMLElement | null;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return null;
    const pad = 4;
    const x = Math.max(0, Math.floor(rect.left - pad));
    const y = Math.max(0, Math.floor(rect.top - pad));
    const right = Math.min(window.innerWidth, Math.ceil(rect.right + pad));
    const bottom = Math.min(window.innerHeight, Math.ceil(rect.bottom + pad));
    return {
      x,
      y,
      width: Math.max(1, right - x),
      height: Math.max(1, bottom - y),
    };
  }

  public reset(): void {
    const root = this.host.appRoot;
    delete root.dataset.captureMode;
    delete root.dataset.captureCad;
    delete root.dataset.captureUi;
    delete root.dataset.captureDrawer;
    delete root.dataset.captureDiagram;
    delete root.dataset.capturePerf;
    this.host.setLightboxOpen(false, false);
    this.host.setDrawerViewTab('all');
    this.host.requestRenderFrame();
  }

  public async prepare(
    mode: CaptureMode,
    options: CaptureCustomOptions = {}
  ): Promise<CapturePrepareResult> {
    const t0 = performance.now();
    const root = this.host.appRoot;

    // 1. Optional scene state setup
    if (options.playground) {
      await this.host.openPlayground(Boolean(options.playgroundReport));
    } else {
      this.host.closePlayground();
    }
    if (options.miraiStudioTab && this.host.openMiraiStudio) {
      await this.host.openMiraiStudio(options.miraiStudioTab);
    } else if (this.host.closeMiraiStudio) {
      this.host.closeMiraiStudio();
    }
    if (options.originalStudioTab && this.host.openOriginalStudio) {
      await this.host.openOriginalStudio(options.originalStudioTab);
    } else if (this.host.closeOriginalStudio) {
      this.host.closeOriginalStudio();
    }

    if (options.quality && options.quality !== this.host.getQuality()) {
      this.host.setQuality(options.quality);
    }
    if (typeof options.miraiSubView === 'number' && this.host.setMiraiSubView) {
      this.host.setMiraiSubView(options.miraiSubView, true);
    }
    if (options.unit && options.unit !== this.host.getMode()) {
      this.host.setMode(options.unit, true);
    }
    if (!options.playground) {
      await this.waitUnitReady();
    }
    if (typeof options.miraiSubView === 'number' && this.host.setMiraiSubView) {
      this.host.setMiraiSubView(options.miraiSubView, true);
      await waitFrames(1);
    }
    if (options.miraiEdition && this.host.setMiraiEdition) {
      this.host.setMiraiEdition(options.miraiEdition);
    }
    if (typeof options.explode === 'number') {
      this.host.setExplode(options.explode, true);
    }
    if (typeof options.physics === 'boolean' && this.host.setPhysicsActive) {
      this.host.setPhysicsActive(options.physics);
    }
    if (options.renderMode) {
      this.host.setRenderMode(options.renderMode);
    }
    if (options.preset) {
      this.host.setCameraPreset(options.preset, true);
    }
    if (typeof options.showPerfHud === 'boolean') {
      this.host.setPerfHudVisible(options.showPerfHud);
    }

    // 2. Apply capture mode visibility & isolation rules
    this.reset();
    root.dataset.captureMode = mode;

    let clipSelector: string | null = options.clipSelector ?? null;

    if (mode === 'ui') {
      root.dataset.captureCad = '0';
      root.dataset.captureUi = '1';
      root.dataset.captureDrawer = options.showDrawer ? '1' : '0';
      if (options.partId) this.host.selectPart(options.partId, false);
      else if (!options.showDrawer) this.host.selectPart(null, false);
    } else if (mode === 'cad') {
      root.dataset.captureCad = '1';
      root.dataset.captureUi = '0';
      root.dataset.captureDrawer = '0';
      root.dataset.capturePerf = '0';
      this.host.selectPart(null, false);
    } else if (mode === 'diagram') {
      root.dataset.captureCad = '0';
      root.dataset.captureUi = '0';
      root.dataset.captureDrawer = '1';
      root.dataset.captureDiagram = '1';
      const targetPart = options.partId ?? this.host.getSelectedPartId() ?? this.host.getFirstPartId();
      if (targetPart) this.host.selectPart(targetPart, false);
      this.host.setDrawerViewTab('diagram');
      await this.waitSchematicHydrated();
      const dBody = this.host.appRoot.querySelector('.explanation-drawer .drawer-body') as HTMLElement | null;
      if (dBody) dBody.scrollTop = 0;
      if (options.showLightbox) {
        this.host.setLightboxOpen(true, Boolean(options.lightboxRotate));
        await waitFrames(3);
        clipSelector = clipSelector ?? '.schematic-lightbox-panel';
      } else {
        await waitFrames(3);
        clipSelector = clipSelector ?? '.schematic-stage';
      }
    } else if (mode === 'explanation') {
      root.dataset.captureCad = '0';
      root.dataset.captureUi = '0';
      root.dataset.captureDrawer = '1';
      const targetPart = options.partId ?? this.host.getSelectedPartId() ?? this.host.getFirstPartId();
      if (targetPart) this.host.selectPart(targetPart, false);
      this.host.setDrawerViewTab(options.drawerTab ?? 'explanation');
      const dBody = this.host.appRoot.querySelector('.explanation-drawer .drawer-body') as HTMLElement | null;
      if (dBody) dBody.scrollTop = 0;
      await waitFrames(3);
      clipSelector = clipSelector ?? '.explanation-drawer';
    } else if (mode === 'full') {
      root.dataset.captureCad = '1';
      root.dataset.captureUi = '1';
      root.dataset.captureDrawer = '1';
      if (options.partId) {
        this.host.selectPart(options.partId, false);
        if (options.drawerTab) this.host.setDrawerViewTab(options.drawerTab);
        await this.waitSchematicHydrated();
      } else if (options.partId === null) {
        this.host.selectPart(null, false);
      }
      if (options.showLightbox) {
        this.host.setLightboxOpen(true, Boolean(options.lightboxRotate));
      }
    } else if (mode === 'custom') {
      root.dataset.captureCad = options.showCad === false ? '0' : '1';
      root.dataset.captureUi = options.showUi === false ? '0' : '1';
      root.dataset.captureDrawer = options.showDrawer === false ? '0' : '1';
      root.dataset.capturePerf = options.showPerfHud === false ? '0' : '1';
      if (options.partId) {
        this.host.selectPart(options.partId, false);
        if (options.drawerTab) this.host.setDrawerViewTab(options.drawerTab);
        await this.waitSchematicHydrated();
      } else if (options.partId === null) {
        this.host.selectPart(null, false);
      }
      if (options.showLightbox) {
        this.host.setLightboxOpen(true, Boolean(options.lightboxRotate));
      }
    }

    this.host.requestRenderFrame();
    await waitFrames(mode === 'cad' ? 1 : 2);

    return {
      mode,
      clip: this.measureClip(clipSelector),
      activeUnit: this.host.getMode(),
      activeQuality: this.host.getQuality(),
      selectedPartId: this.host.getSelectedPartId(),
      readyMs: Math.round(performance.now() - t0),
    };
  }
}
