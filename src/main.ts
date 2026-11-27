import './styles/main.css';
import { GraphicsQuality, SectionAxis } from './assemblies/types';
import { sharedLensOpticalSim } from './assemblies/lens/lensOpticalSim';
import { CadViewport } from './engine/CadViewport';
import { ZeroTextControls } from './ui/ZeroTextControls';
import { ExplanationDrawer } from './ui/ExplanationDrawer';
import { ArtifactCaptureBridge } from './core/capture_bridge';
import type { LensOpticsStudio } from './ui/LensOpticsStudio';
import type { OpticalScenarioId } from './assemblies/lens/lensOpticalSim';
import type { CadPlaygroundStudio } from './playground/CadPlaygroundStudio';
import type { MiraiEdition, MiraiLibraryStudio, MiraiStudioTab } from './ui/MiraiLibraryStudio';

const appRoot = document.getElementById('app')!;
const viewportEl = document.getElementById('viewport')!;

let hoveredPartId: string | null = null;
let currentSectionAxis: SectionAxis = 'off';
let zenFullscreen = false;

let drawer!: ExplanationDrawer;
let controls!: ZeroTextControls;
let viewport!: CadViewport;
let realOpticsStudio: LensOpticsStudio | null = null;
let opticsStudioLoadPromise: Promise<LensOpticsStudio> | null = null;
let pendingOpticsOpen = false;
let realPlayground: CadPlaygroundStudio | null = null;
let playgroundLoadPromise: Promise<CadPlaygroundStudio> | null = null;
let realMiraiStudio: MiraiLibraryStudio | null = null;
let miraiStudioLoadPromise: Promise<MiraiLibraryStudio> | null = null;

const handleOpticsOpenChange = (open: boolean) => {
  controls.syncOpticsStudio(open);
  if (open) {
    viewport.setMode('lens', true);
    controls.syncMode('lens');
    controls.syncOpticsStudio(true);
    viewport.setExplode(0);
    controls.setExplodeValue(0);
    viewport.setPhysicsActive(true);
    controls.syncPhysics(true);
    viewport.frameLensForOpticsStudio(false);
    syncRail();
  } else {
    if (viewport.getMode() === 'lens') {
      viewport.refreshVisibility();
      controls.syncLensSection(viewport.getLensSection());
      viewport.setCameraPreset('iso', false);
      syncRail();
    }
    viewport.requestRenderFrame();
  }
};

const ensureRealOpticsStudio = (): Promise<LensOpticsStudio> => {
  if (realOpticsStudio) return Promise.resolve(realOpticsStudio);
  if (!opticsStudioLoadPromise) {
    opticsStudioLoadPromise = import('./ui/LensOpticsStudio').then((mod) => {
      realOpticsStudio = new mod.LensOpticsStudio(appRoot, {
        onOpenChange: handleOpticsOpenChange,
        onHoverPart: (partId) => {
          hoveredPartId = partId;
          viewport.setHoveredPartFromUI(partId);
          controls.syncHighlight(viewport.getSelectedPart()?.id ?? null, hoveredPartId);
        },
        onSelectPart: (partId) => {
          viewport.selectPart(partId, false);
        },
        onRequestRenderFrame: () => {
          viewport.requestRenderFrame();
        },
      });
      return realOpticsStudio;
    });
  }
  return opticsStudioLoadPromise;
};

// Synchronous facade so keyboard shortcuts, URL presets, and `window.__cad.opticsStudio` work immediately!
const opticsStudio = {
  getIsOpen: (): boolean => realOpticsStudio ? realOpticsStudio.getIsOpen() : pendingOpticsOpen || sharedLensOpticalSim.studioOpen,
  open: (scenario?: OpticalScenarioId, highlightPartId?: string | null): void => {
    const resolvedPartId = highlightPartId ?? undefined;
    if (realOpticsStudio) {
      realOpticsStudio.open(scenario, resolvedPartId);
      return;
    }
    pendingOpticsOpen = true;
    if (scenario) sharedLensOpticalSim.setScenario(scenario);
    if (highlightPartId !== undefined) sharedLensOpticalSim.setHoveredElement(highlightPartId);
    sharedLensOpticalSim.setStudioOpen(true);
    handleOpticsOpenChange(true);
    void ensureRealOpticsStudio().then((inst) => {
      if (pendingOpticsOpen) {
        inst.open(scenario, resolvedPartId);
      }
    });
  },
  close: (): void => {
    pendingOpticsOpen = false;
    if (realOpticsStudio) {
      realOpticsStudio.close();
    } else if (sharedLensOpticalSim.studioOpen) {
      sharedLensOpticalSim.setStudioOpen(false);
      handleOpticsOpenChange(false);
    }
  },
  toggle: (): void => {
    if (opticsStudio.getIsOpen()) {
      opticsStudio.close();
    } else {
      opticsStudio.open();
    }
  },
};

const isNativeFullscreen = (): boolean => {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return Boolean(document.fullscreenElement || doc.webkitFullscreenElement);
};

const syncFullscreenState = (): void => {
  const active = isNativeFullscreen() || zenFullscreen;
  appRoot.classList.toggle('is-zen-fullscreen', zenFullscreen);
  controls.syncFullscreen(active);
  viewport.handleResize();
};

const toggleFullscreen = async (): Promise<void> => {
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void> | void;
    webkitFullscreenElement?: Element | null;
  };
  const rootEl = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };

  if (isNativeFullscreen()) {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
    } catch {
      // Ignore browser exit rejections
    }
    zenFullscreen = false;
    syncFullscreenState();
    return;
  }

  if (zenFullscreen) {
    zenFullscreen = false;
    syncFullscreenState();
    return;
  }

  let enteredNative = false;
  try {
    if (document.fullscreenEnabled !== false && rootEl.requestFullscreen) {
      await rootEl.requestFullscreen();
      enteredNative = isNativeFullscreen();
    } else if (rootEl.webkitRequestFullscreen) {
      await rootEl.webkitRequestFullscreen();
      enteredNative = isNativeFullscreen();
    }
  } catch {
    enteredNative = false;
  }

  if (!enteredNative) {
    zenFullscreen = true;
  }
  syncFullscreenState();
};

const syncRail = () => {
  const parts = viewport.getPartsForCurrentMode();
  const selectedId = viewport.getSelectedPart()?.id ?? null;
  controls.renderLayerRail(
    parts,
    selectedId,
    hoveredPartId,
    (id) => viewport.isPartHidden(id),
    viewport.hasAnyHidden()
  );
};

viewport = new CadViewport(viewportEl, {
  onSelectPart: (part) => {
    appRoot.classList.toggle('has-drawer', Boolean(part));
    if (part) {
      drawer.show(part, viewport.isIsolated());
    } else {
      drawer.hide();
    }
    syncRail();
  },
  onHoverPart: (partId) => {
    hoveredPartId = partId;
    sharedLensOpticalSim.setHoveredElement(partId);
    controls.syncHighlight(viewport.getSelectedPart()?.id ?? null, hoveredPartId);
  },
  onVisibilityChanged: () => {
    drawer.setIsolatedState(viewport.isIsolated());
    syncRail();
  },
  onQualityChanged: (quality) => {
    if (controls) controls.syncQuality(quality);
  },
});

controls = new ZeroTextControls(appRoot, {
  onModeChange: (mode) => {
    if (mode !== 'lens' && mode !== 'integrated' && opticsStudio.getIsOpen()) {
      opticsStudio.close();
    }
    viewport.setMode(mode);
    controls.syncLensSection(viewport.getLensSection());
    controls.setExplodeValue(viewport.getExplode());
    syncRail();
  },
  onLensSectionChange: (section) => {
    if (opticsStudio.getIsOpen()) {
      opticsStudio.close();
    }
    viewport.setLensSection(section);
    syncRail();
  },
  onSensorFabVolumeChange: (vol) => {
    viewport.setSensorFabVolume(vol, false);
    controls.syncFabVolume(vol);
    controls.syncFabStage(
      vol === 0
        ? 'overview'
        : vol === 1
          ? 'v1_overview'
          : vol === 2
            ? 'v2_overview'
            : vol === 3
              ? 'v3_overview'
              : vol === 4
                ? 'v4_overview'
                : 'v5_overview'
    );
    syncRail();
  },
  onSensorFabStageChange: (stage) => {
    viewport.focusSensorFabStage(stage, false);
  },
  onExplodeChange: (val) => {
    viewport.setExplode(val);
  },
  onSectionAxisChange: (axis) => {
    currentSectionAxis = axis;
    viewport.setSection(axis);
  },
  onSectionValueChange: (val) => {
    viewport.setSection(currentSectionAxis, val);
  },
  onRenderModeChange: (mode) => {
    viewport.setRenderMode(mode);
  },
  onQualityChange: (quality) => {
    viewport.setQuality(quality);
  },
  onPhysicsToggle: (active) => {
    viewport.setPhysicsActive(active);
  },
  onOpticsStudioToggle: () => {
    opticsStudio.toggle();
  },
  onOpenPlayground: () => {
    void playgroundApi.open();
  },
  onMiraiSubViewChange: (subView) => {
    viewport.setMiraiSubView(subView, false);
    controls.syncMiraiSubView(viewport.getMiraiSubView());
    syncRail();
  },
  onOpenMiraiStudio: (tab) => {
    void miraiStudioApi.open({ tab });
  },
  onResetVisibility: () => {
    viewport.resetAllVisibility();
  },
  onFullscreenToggle: () => {
    void toggleFullscreen();
  },
  onCameraPreset: (preset) => {
    viewport.setCameraPreset(preset);
  },
  onSelectPart: (partId) => {
    const currentId = viewport.getSelectedPart()?.id ?? null;
    if (currentId === partId) {
      viewport.selectPart(null, false);
    } else {
      viewport.selectPart(partId, !opticsStudio.getIsOpen());
    }
  },
  onHoverPart: (partId) => {
    hoveredPartId = partId;
    sharedLensOpticalSim.setHoveredElement(partId);
    viewport.setHoveredPartFromUI(partId);
    controls.syncHighlight(viewport.getSelectedPart()?.id ?? null, hoveredPartId);
  },
  onToggleHidePart: (partId) => {
    viewport.togglePartHidden(partId);
  },
});

const ensurePlayground = (): Promise<CadPlaygroundStudio> => {
  if (realPlayground) return Promise.resolve(realPlayground);
  if (!playgroundLoadPromise) {
    playgroundLoadPromise = import('./playground/CadPlaygroundStudio').then((mod) => {
      realPlayground = new mod.CadPlaygroundStudio(appRoot, {
        renderer: viewport.getRenderer(),
        container: viewport.getContainer(),
        setCustomSceneRenderer: (fn) => viewport.setCustomSceneRenderer(fn),
        requestRender: () => viewport.requestRenderFrame(),
        onClosePlayground: () => {
          appRoot.classList.remove('is-playground');
          controls.syncPlaygroundActive(false);
          viewport.handleResize();
        },
      });
      return realPlayground;
    });
  }
  return playgroundLoadPromise;
};

const playgroundApi = {
  isOpen: () => realPlayground?.isOpen() ?? false,
  open: async (showReport = false): Promise<void> => {
    if (opticsStudio.getIsOpen()) opticsStudio.close();
    viewport.selectPart(null, false);
    const pg = await ensurePlayground();
    appRoot.classList.add('is-playground');
    controls.syncPlaygroundActive(true);
    await pg.open();
    if (showReport) {
      pg.openEvaluationReport();
    }
  },
  close: (): void => {
    realPlayground?.close();
    appRoot.classList.remove('is-playground');
    controls.syncPlaygroundActive(false);
  },
  evaluate: () => realPlayground?.openEvaluationReport() ?? null,
  runPlya: (openModal = true) => realPlayground?.runPlyaPipeline(openModal) ?? null,
  getPlaced: () => realPlayground?.getPlacedSummary() ?? [],
  movePart: (uid: string, x: number, y: number, z: number) =>
    realPlayground?.movePartByUid(uid, x, y, z) ?? false,
  setProfile: (profile: 'auto' | 'mirrorless' | 'compact' | 'cinema' | 'action' | 'custom') =>
    realPlayground?.setDesignProfile(profile) ?? null,
  loadTemplate: async (tpl: 'a7iv' | 'zve1' | 'fx3' | 'empty') => {
    const pg = await ensurePlayground();
    await pg.loadTemplate(tpl);
  },
  setCameraView: (view: 'iso' | 'front' | 'side' | 'top' | 'back') =>
    realPlayground?.setCameraView(view),
  setShadingMode: (mode: 'solid' | 'xray' | 'wireframe') =>
    realPlayground?.setShadingMode(mode),
};

const ensureMiraiStudio = (): Promise<MiraiLibraryStudio> => {
  if (realMiraiStudio) return Promise.resolve(realMiraiStudio);
  if (!miraiStudioLoadPromise) {
    miraiStudioLoadPromise = import('./ui/MiraiLibraryStudio').then((mod) => {
      realMiraiStudio = new mod.MiraiLibraryStudio({
        onJumpTo3d: (subView) => {
          if (opticsStudio.getIsOpen()) opticsStudio.close();
          viewport.setMiraiSubView(subView, true);
          viewport.setMode('mirai_2028', true);
          viewport.setMiraiSubView(subView, true);
          controls.syncMode('mirai_2028');
          controls.syncMiraiSubView(subView);
          controls.setExplodeValue(viewport.getExplode());
          syncRail();
        },
        onJumpToBaseline: (mode) => {
          if (opticsStudio.getIsOpen()) opticsStudio.close();
          viewport.setMode(mode, true);
          controls.syncMode(mode);
          controls.setExplodeValue(viewport.getExplode());
          syncRail();
        },
        onEditionChange: (edition) => {
          drawer.setMiraiEdition(edition, false);
        },
      });
      return realMiraiStudio;
    });
  }
  return miraiStudioLoadPromise;
};

const miraiStudioApi = {
  isOpen: () => realMiraiStudio?.isOpen() ?? false,
  open: async (opts?: {
    tab?: MiraiStudioTab;
    volume?: number;
    fhId?: string;
    glossaryId?: string;
    edition?: MiraiEdition;
  }): Promise<void> => {
    const studio = await ensureMiraiStudio();
    await studio.open({ ...opts, edition: opts?.edition ?? drawer.getMiraiEdition() });
  },
  close: (): void => {
    realMiraiStudio?.close();
  },
  setEdition: (edition: MiraiEdition): void => {
    drawer.setMiraiEdition(edition, false);
    realMiraiStudio?.setEdition(edition, false);
  },
};

drawer = new ExplanationDrawer(appRoot, {
  onClose: () => viewport.selectPart(null, false),
  onPrev: () => viewport.stepSelectedPart(-1),
  onNext: () => viewport.stepSelectedPart(1),
  onToggleIsolate: () => viewport.toggleIsolateSelected(),
  onHideCurrent: () => {
    const sel = viewport.getSelectedPart();
    if (sel) viewport.togglePartHidden(sel.id);
  },
  onOpenOpticsMotion: (scenario, partId) => {
    viewport.selectPart(null, false);
    opticsStudio.open(scenario, partId);
  },
  onSwitchMode: (nextMode) => {
    if (opticsStudio.getIsOpen()) {
      opticsStudio.close();
    }
    viewport.setMode(nextMode);
    controls.syncMode(nextMode);
    controls.setExplodeValue(viewport.getExplode());
    syncRail();
  },
  onSwitchFabVolume: (vol) => {
    viewport.setMode('sensor_fab', false);
    viewport.setSensorFabVolume(vol, false);
    controls.syncFabVolume(vol);
    controls.syncFabStage(
      vol === 0
        ? 'overview'
        : vol === 1
          ? 'v1_overview'
          : vol === 2
            ? 'v2_overview'
            : vol === 3
              ? 'v3_overview'
              : vol === 4
                ? 'v4_overview'
                : 'v5_overview'
    );
    controls.syncMode('sensor_fab');
    syncRail();
  },
  onOpenMiraiReport: (fhId) => {
    void miraiStudioApi.open({ tab: 'reports', fhId });
  },
  onOpenMiraiGlossary: (glossaryId) => {
    void miraiStudioApi.open({ tab: 'glossary', glossaryId });
  },
  onMiraiEditionChange: (edition) => {
    realMiraiStudio?.setEdition(edition, false);
  },
});

document.addEventListener('fullscreenchange', () => {
  if (!isNativeFullscreen()) zenFullscreen = false;
  syncFullscreenState();
});
document.addEventListener('webkitfullscreenchange', () => {
  if (!isNativeFullscreen()) zenFullscreen = false;
  syncFullscreenState();
});

const setQuality = (q: GraphicsQuality): void => {
  viewport.setQuality(q);
  controls.syncQuality(viewport.getQuality());
};

window.addEventListener('keydown', (e) => {
  if (playgroundApi.isOpen() || miraiStudioApi.isOpen()) return;
  if (e.key === 'Escape') {
    if (zenFullscreen) {
      zenFullscreen = false;
      syncFullscreenState();
    }
    if (viewport.getSelectedPart()) {
      viewport.selectPart(null, false);
    } else if (opticsStudio.getIsOpen()) {
      opticsStudio.close();
    }
  } else if (
    (e.key === '1' || e.key === '2' || e.key === '3') &&
    viewport.getMode() === 'lens' &&
    !opticsStudio.getIsOpen() &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    const sec = Number(e.key) as 1 | 2 | 3;
    viewport.setLensSection(sec);
    controls.syncLensSection(sec);
    syncRail();
  } else if (
    (e.key === '1' || e.key === '2') &&
    viewport.getMode() === 'mirai_2028' &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    const sv = Number(e.key);
    viewport.setMiraiSubView(sv, false);
    controls.syncMiraiSubView(sv);
    syncRail();
  } else if (
    (e.key === 'v' || e.key === 'V') &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    const curMode = viewport.getMode();
    const toggledMode =
      curMode === 'micro'
        ? 'micro_v2'
        : curMode === 'micro_v2'
          ? 'micro'
          : curMode === 'bionz'
            ? 'bionz_v2'
            : curMode === 'bionz_v2'
              ? 'bionz'
              : null;
    if (toggledMode) {
      viewport.setMode(toggledMode);
      controls.syncMode(toggledMode);
      controls.setExplodeValue(viewport.getExplode());
      syncRail();
    }
  } else if (
    (e.key === 'f' || e.key === 'F') &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    void toggleFullscreen();
  } else if (
    (e.key === 'u' || e.key === 'U') &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    const cur = viewport.getQuality();
    const next: GraphicsQuality =
      cur === 'standard_lite'
        ? 'standard'
        : cur === 'standard'
          ? 'high'
          : cur === 'high'
            ? 'ultra'
            : 'standard_lite';
    setQuality(next);
  } else if (
    (e.key === 'p' || e.key === 'P') &&
    viewport.isV2Mode() &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    viewport.getV2Runtime().togglePerfHud();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if (viewport.getSelectedPart()) viewport.stepSelectedPart(1);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if (viewport.getSelectedPart()) viewport.stepSelectedPart(-1);
  }
});

// Sync initial quality pill with GPU_PROFILE default and optional ?quality= param
const urlParams = new URLSearchParams(window.location.search);
const qualityParam = urlParams.get('quality')?.toLowerCase();
if (qualityParam === 'standard_lite' || qualityParam === 'lite' || qualityParam === 'std_lite') {
  setQuality('standard_lite');
} else if (qualityParam === 'standard' || qualityParam === 'std') {
  setQuality('standard');
} else if (qualityParam === 'high') {
  setQuality('high');
} else if (qualityParam === 'ultra') {
  setQuality('ultra');
} else {
  controls.syncQuality(viewport.getQuality());
}

const v2InspectApi = {
  getDiagnostics: () => viewport.getV2Runtime().getDiagnostics(),
  togglePerfHud: () => viewport.getV2Runtime().togglePerfHud(),
  setPerfHudVisible: (visible: boolean) => viewport.getV2Runtime().setPerfHudVisible(visible),
  isV2Mode: () => viewport.isV2Mode(),
};

const captureBridge = new ArtifactCaptureBridge({
  appRoot,
  setMode: (mode, immediate) => {
    viewport.setMode(mode, immediate);
    controls.syncMode(mode);
    syncRail();
  },
  getMode: () => viewport.getMode(),
  setQuality: (q) => setQuality(q),
  getQuality: () => viewport.getQuality(),
  setRenderMode: (rm) => viewport.setRenderMode(rm),
  setExplode: (val, immediate) => {
    viewport.setExplode(val, immediate);
    controls.setExplodeValue(val);
  },
  setCameraPreset: (p, immediate) => viewport.setCameraPreset(p, immediate),
  selectPart: (partId, focusCamera) => viewport.selectPart(partId, focusCamera),
  getFirstPartId: () => viewport.getPartsForCurrentMode()[0]?.id ?? null,
  getSelectedPartId: () => viewport.getSelectedPart()?.id ?? null,
  isUnitReady: () => viewport.getV2Runtime().isReady(),
  setPerfHudVisible: (v) => viewport.getV2Runtime().setPerfHudVisible(v),
  setDrawerViewTab: (tab) => drawer.setViewTab(tab),
  setLightboxOpen: (open, rotated) => drawer.setLightboxOpen(open, rotated),
  openPlayground: (showReport) => playgroundApi.open(showReport),
  closePlayground: () => playgroundApi.close(),
  setMiraiSubView: (sv, immediate) => {
    viewport.setMiraiSubView(sv, immediate);
    controls.syncMiraiSubView(sv);
    syncRail();
  },
  setMiraiEdition: (ed) => miraiStudioApi.setEdition(ed),
  openMiraiStudio: (tab) => miraiStudioApi.open({ tab }),
  closeMiraiStudio: () => miraiStudioApi.close(),
  requestRenderFrame: () => viewport.requestRenderFrame(),
});

// Expose lightweight inspection, Play Ground 1.1, FH MIRAI 2028, and High-Speed Capture Engine (`pp`) hooks on window
(window as unknown as Record<string, unknown>).__cad = {
  viewport,
  controls,
  drawer,
  opticsStudio,
  playground: playgroundApi,
  miraiStudio: miraiStudioApi,
  pp: captureBridge,
  capture: captureBridge,
  toggleFullscreen,
  setQuality,
  v2: v2InspectApi,
  /** Backward-compatible alias for MI Shoe V2 inspection scripts */
  mishoeV2: v2InspectApi,
};

syncRail();

// Optional URL preset for reproducible views (default startup shows the 50-part 3D Japanese "ようこそ" welcome view!)
const preset = urlParams.get('preset');
if (preset === 'welcome') {
  viewport.setMode('welcome', true);
  controls.syncMode('welcome');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'playground') {
  void playgroundApi.open(false);
} else if (preset === 'complete_assembled') {
  viewport.setMode('integrated', true);
  controls.syncMode('integrated');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'complete_back') {
  viewport.setMode('integrated', true);
  controls.syncMode('integrated');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('back', true);
  syncRail();
} else if (preset === 'complete_exploded') {
  viewport.setMode('integrated', true);
  controls.syncMode('integrated');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'complete_section') {
  viewport.setMode('integrated', true);
  controls.syncMode('integrated');
  viewport.setExplode(0, true);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.54);
  controls.syncSectionAxis('x', 0.54);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'camera_body_assembled') {
  viewport.setMode('camera_body', true);
  controls.syncMode('camera_body');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'camera_body_exploded') {
  viewport.setMode('camera_body', true);
  controls.syncMode('camera_body');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'lens_assembled') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'lens_exploded') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'lens_drawer') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0.88, true);
  controls.setExplodeValue(0.88);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-xd-motors', false);
  syncRail();
} else if (preset === 'lens_super_drawer') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-mcu-pcb', false);
  syncRail();
} else if (preset === 'lens_ultra_drawer') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-bayonet-shims', false);
  syncRail();
} else if (preset === 'lens_ultra62_exploded') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'lens_ultra62_drawer') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0.9, true);
  controls.setExplodeValue(0.9);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-front-tilt-shims', false);
  syncRail();
} else if (preset === 'lens_optics_motion') {
  opticsStudio.open('aperture_bokeh');
  viewport.frameLensForOpticsStudio(true);
} else if (preset === 'lens_optics_floating') {
  opticsStudio.open('floating_xd');
  viewport.frameLensForOpticsStudio(true);
} else if (preset === 'lens_optics_ed') {
  opticsStudio.open('ed_chromatic');
  viewport.frameLensForOpticsStudio(true);
} else if (preset === 'lens_optics_xa') {
  opticsStudio.open('xa_aspheric');
  viewport.frameLensForOpticsStudio(true);
} else if (preset === 'lens_optics_nano') {
  opticsStudio.open('nano_ar_baffle');
  viewport.frameLensForOpticsStudio(true);
} else if (preset === 'sensor_super_drawer') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('sensor-hall-pcb', false);
  syncRail();
} else if (preset === 'lcd_assembled') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'lcd_exploded') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'lcd_drawer') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0.85, true);
  controls.setExplodeValue(0.85);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lcd-4axis-tilt-frame', false);
  syncRail();
} else if (preset === 'body_assembled') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'body_exploded') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'body_drawer') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.88, true);
  controls.setExplodeValue(0.88);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('body-battery-pack', false);
  syncRail();
} else if (preset === 'body_ultra_drawer') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('body-card-ejectors', false);
  syncRail();
} else if (preset === 'shutter_ultra_drawer') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('shutter-counterweight', false);
  syncRail();
} else if (preset === 'lcd_ultra_drawer') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lcd-swivel-clutch', false);
  syncRail();
} else if (preset === 'mount_assembled') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mount_exploded') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mount_section') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0, true);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.52);
  controls.syncSectionAxis('x', 0.52);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mount_drawer') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0.85, true);
  controls.setExplodeValue(0.85);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mount-flange-ring', false);
  syncRail();
} else if (preset === 'mount_contacts_drawer') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0.88, true);
  controls.setExplodeValue(0.88);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mount-contact-pins', false);
  syncRail();
} else if (preset === 'evf_assembled') {
  viewport.setMode('evf', true);
  controls.syncMode('evf');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'evf_exploded') {
  viewport.setMode('evf', true);
  controls.syncMode('evf');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'evf_section') {
  viewport.setMode('evf', true);
  controls.syncMode('evf');
  viewport.setExplode(0, true);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.52);
  controls.syncSectionAxis('x', 0.52);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'evf_drawer') {
  viewport.setMode('evf', true);
  controls.syncMode('evf');
  viewport.setExplode(0.88, true);
  controls.setExplodeValue(0.88);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('evf-oled-panel', false);
  syncRail();
} else if (preset === 'evf_eye_af_drawer') {
  viewport.setMode('evf', true);
  controls.syncMode('evf');
  viewport.setExplode(0.85, true);
  controls.setExplodeValue(0.85);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('evf-dichroic-mirror', false);
  syncRail();
} else if (preset === 'mainboard_exploded') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mainboard_section') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0, true);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.54);
  controls.syncSectionAxis('x', 0.54);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mainboard_drawer') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0.85, true);
  controls.setExplodeValue(0.85);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mb-isp-die', false);
  syncRail();
} else if (preset === 'mainboard_npu_drawer') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0.82, true);
  controls.setExplodeValue(0.82);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mb-ai-npu', false);
  syncRail();
} else if (preset === 'mainboard_back') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0.65, true);
  controls.setExplodeValue(0.65);
  viewport.setCameraPreset('back', true);
  syncRail();
} else if (preset === 'shutter_assembled') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0, true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'shutter_exploded') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'shutter_section') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0, true);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.56);
  controls.syncSectionAxis('x', 0.56);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'shutter_drawer') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.82, true);
  controls.setExplodeValue(0.82);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('shutter-curtain-2', false);
  syncRail();
} else if (preset === 'integrated_exploded') {
  viewport.setMode('integrated', true);
  controls.syncMode('integrated');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'integrated_assembled') {
  viewport.setMode('integrated', true);
  controls.syncMode('integrated');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_exploded' || preset === 'exploded') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'back') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.72, true);
  controls.setExplodeValue(0.72);
  viewport.setCameraPreset('back', true);
  syncRail();
} else if (preset === 'section') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0, true);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.48);
  controls.syncSectionAxis('x', 0.48);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'drawer') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.82, true);
  controls.setExplodeValue(0.82);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('cmos-die', false);
  syncRail();
} else if (preset === 'micro') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.72, true);
  controls.setExplodeValue(0.72);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'micro_drawer') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.65, true);
  controls.setExplodeValue(0.65);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('micro-2layer-gs', false);
  syncRail();
} else if (preset === 'phase11_mount') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mount-esd-ground-clips', false);
  syncRail();
} else if (preset === 'phase11_sensor') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('sensor-dram-wafer', false);
  syncRail();
} else if (preset === 'phase11_micro') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.85, true);
  controls.setExplodeValue(0.85);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('micro-fdti-doping', false);
  syncRail();
} else if (preset === 'phase11_shutter') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('shutter-x-sync-contact', false);
  syncRail();
} else if (preset === 'phase11_evf') {
  viewport.setMode('evf', true);
  controls.syncMode('evf');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('evf-oled-mla-stack', false);
  syncRail();
} else if (preset === 'phase11_lcd') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lcd-lgp-led-bar', false);
  syncRail();
} else if (preset === 'phase11_lens') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-mr-magnet-scales', false);
  syncRail();
} else if (preset === 'phase12_mainboard') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mb-hdmi-daughterboard', false);
  syncRail();
} else if (preset === 'phase12_body') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('body-evf-tie-bracket', false);
  syncRail();
} else if (preset === 'phase12_micro') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.9, true);
  controls.setExplodeValue(0.9);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('micro-lofic-cap', false);
  syncRail();
} else if (preset === 'phase13_mount') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mount-im-adjust-washer', false);
  syncRail();
} else if (preset === 'phase13_shutter') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('shutter-mb-floating-shaft', false);
  syncRail();
} else if (preset === 'phase13_body') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('body-gyro-sensor-unit', false);
  syncRail();
} else if (preset === 'phase14_sensor') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('sensor-imager-fix-shafts', false);
  syncRail();
} else if (preset === 'phase14_micro') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('micro-fd-dcg-switch', false);
  syncRail();
} else if (preset === 'phase15_lcd') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lcd-fine-coaxial-bundle', false);
  syncRail();
} else if (preset === 'phase34_lcd') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lcd-tandem-oled-stack', false);
  syncRail();
} else if (preset === 'phase35_lcd') {
  viewport.setMode('lcd', true);
  controls.syncMode('lcd');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lcd-microled-gan-array', false);
  syncRail();
} else if (preset === 'phase16_mainboard') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mb-vc-evaporator-plate', false);
  syncRail();
} else if (preset === 'phase16_evf') {
  viewport.setMode('evf', true);
  controls.syncMode('evf');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('evf-oem-finder-cover', false);
  syncRail();
} else if (preset === 'phase16_body') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('body-dl1008-rtc-flex', false);
  syncRail();
} else if (preset === 'phase17_shutter') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('shutter-rivet-reinforce-collars', false);
  syncRail();
} else if (preset === 'phase34_shutter') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.96, true);
  controls.setExplodeValue(0.96);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('shutter-coaxial-friction-brake', false);
  syncRail();
} else if (preset === 'phase36_shutter') {
  viewport.setMode('shutter', true);
  controls.syncMode('shutter');
  viewport.setExplode(0.96, true);
  controls.setExplodeValue(0.96);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('shutter-eddy-current-self-brake', false);
  syncRail();
} else if (preset === 'phase18_lens') {
  viewport.setMode('lens', true);
  viewport.setLensSection(3, true);
  controls.syncMode('lens');
  controls.syncLensSection(3);
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-nano-ar-ii-layer', false);
  syncRail();
} else if (preset === 'phase18_mount') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mount-bayonet-leadin-dlc', false);
  syncRail();
} else if (preset === 'phase19_lens_s1') {
  viewport.setMode('lens', true);
  viewport.setLensSection(1, true);
  controls.syncMode('lens');
  controls.syncLensSection(1);
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-iris-click-wedge-lever', false);
  syncRail();
} else if (preset === 'phase19_lens_s2') {
  viewport.setMode('lens', true);
  viewport.setLensSection(2, true);
  controls.syncMode('lens');
  controls.syncLensSection(2);
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-mid-block-core-frame', false);
  syncRail();
} else if (preset === 'phase19_lens_s3') {
  viewport.setMode('lens', true);
  viewport.setLensSection(3, true);
  controls.syncMode('lens');
  controls.syncLensSection(3);
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('lens-hood-release-lock-pin', false);
  syncRail();
} else if (preset === 'phase19_micro') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('micro-column-cds-sh', false);
  syncRail();
} else if (preset === 'phase19_sensor') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('sensor-birefringent-olpf', false);
  syncRail();
} else if (preset === 'phase19_mainboard') {
  viewport.setMode('mainboard', true);
  controls.syncMode('mainboard');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mb-card-detect-heartcam', false);
  syncRail();
} else if (preset === 'phase20_micro') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('micro-inpixel-dram-gs', false);
  syncRail();
} else if (preset === 'phase20_mount') {
  viewport.setMode('mount', true);
  controls.syncMode('mount');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mount-screw-orange-orings', false);
  syncRail();
} else if (preset === 'phase23_micro') {
  viewport.setMode('micro', true);
  controls.syncMode('micro');
  viewport.setExplode(0.86, true);
  controls.setExplodeValue(0.86);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('micro-mpcr-color-router', false);
  syncRail();
} else if (preset === 'phase24_body') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.85, true);
  controls.setExplodeValue(0.85);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('body-active-cooling-fan-duct', false);
  syncRail();
} else if (preset === 'phase25_sensor') {
  viewport.setMode('sensor', true);
  controls.syncMode('sensor');
  viewport.setExplode(0.88, true);
  controls.setExplodeValue(0.88);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('sensor-electronic-vnd', false);
  syncRail();
} else if (preset === 'phase25_body') {
  viewport.setMode('body', true);
  controls.syncMode('body');
  viewport.setExplode(0.86, true);
  controls.setExplodeValue(0.86);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('body-gnss-ceramic-antenna', false);
  syncRail();
} else if (preset === 'battery') {
  viewport.setMode('battery', true);
  controls.syncMode('battery');
  viewport.setExplode(0.88, true);
  controls.setExplodeValue(0.88);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('bat-infolithium-fuelgauge', false);
  syncRail();
} else if (preset === 'battery_assembled') {
  viewport.setMode('battery', true);
  controls.syncMode('battery');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'battery_ultra100') {
  viewport.setMode('battery', true);
  controls.syncMode('battery');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('bat-cvd-sic-porous-scaffold', false);
  syncRail();
} else if (preset === 'battery_ultra130') {
  viewport.setMode('battery', true);
  controls.syncMode('battery');
  viewport.setExplode(0.94, true);
  controls.setExplodeValue(0.94);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('bat-argyrodite-li6ps5cl-2026', false);
  syncRail();
} else if (preset === 'cfexpress') {
  viewport.setMode('cfexpress', true);
  controls.syncMode('cfexpress');
  viewport.setExplode(0.88, true);
  controls.setExplodeValue(0.88);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('cfe-pcie4-controller-soc', false);
  syncRail();
} else if (preset === 'cfexpress_assembled') {
  viewport.setMode('cfexpress', true);
  controls.syncMode('cfexpress');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'cfexpress_back') {
  viewport.setMode('cfexpress', true);
  controls.syncMode('cfexpress');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('back', true);
  syncRail();
} else if (preset === 'cfexpress_exploded') {
  viewport.setMode('cfexpress', true);
  controls.syncMode('cfexpress');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'cfexpress_ultra100') {
  viewport.setMode('cfexpress', true);
  controls.syncMode('cfexpress');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('cfe-multiplane-6plane-mpir', false);
  syncRail();
} else if (preset === 'cfexpress_ultra130') {
  viewport.setMode('cfexpress', true);
  controls.syncMode('cfexpress');
  viewport.setExplode(0.94, true);
  controls.setExplodeValue(0.94);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('cfe-fenand-hzo-igzo-2026', false);
  syncRail();
} else if (preset === 'cfexpress_ultra170') {
  viewport.setMode('cfexpress', true);
  controls.syncMode('cfexpress');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('cfe-bwwpc-wafer-power-grid', false);
  syncRail();
} else if (preset === 'bionz_assembled') {
  viewport.setMode('bionz', true);
  controls.syncMode('bionz');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'bionz_exploded') {
  viewport.setMode('bionz', true);
  controls.syncMode('bionz');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'bionz_drawer') {
  viewport.setMode('bionz', true);
  controls.syncMode('bionz');
  viewport.setExplode(0.86, true);
  controls.setExplodeValue(0.86);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('xr-ai-npu-systolic', false);
  syncRail();
} else if (preset === 'mishoe_assembled') {
  viewport.setMode('mishoe', true);
  controls.syncMode('mishoe');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mishoe_exploded') {
  viewport.setMode('mishoe', true);
  controls.syncMode('mishoe');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mishoe_drawer') {
  viewport.setMode('mishoe', true);
  controls.syncMode('mishoe');
  viewport.setExplode(0.86, true);
  controls.setExplodeValue(0.86);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mi-pins-8to12-digital-audio', false);
  syncRail();
} else if (preset === 'mic_assembled') {
  viewport.setMode('mic', true);
  controls.syncMode('mic');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mic_exploded') {
  viewport.setMode('mic', true);
  controls.syncMode('mic');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mic_drawer') {
  viewport.setMode('mic', true);
  controls.syncMode('mic');
  viewport.setExplode(0.86, true);
  controls.setExplodeValue(0.86);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mc-mems-sdm-vacuum-cell', false);
  syncRail();
} else if (preset === 'mic_ultra80') {
  viewport.setMode('mic', true);
  controls.syncMode('mic');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mc-optical-mems-vcsel-2026', false);
  syncRail();
} else if (preset === 'mic_ultra110') {
  viewport.setMode('mic', true);
  controls.syncMode('mic');
  viewport.setExplode(0.94, true);
  controls.setExplodeValue(0.94);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mc-graphene-2d-membrane-2026', false);
  syncRail();
} else if (preset === 'mic_ultra150') {
  viewport.setMode('mic', true);
  controls.syncMode('mic');
  viewport.setExplode(0.95, true);
  controls.setExplodeValue(0.95);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('mc-jk1028-audio-jack-flex', false);
  syncRail();
} else if (preset === 'micro_v2_assembled') {
  viewport.setMode('micro_v2', true);
  controls.syncMode('micro_v2');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'micro_v2_exploded') {
  viewport.setMode('micro_v2', true);
  controls.syncMode('micro_v2');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'micro_v2_drawer') {
  viewport.setMode('micro_v2', true);
  controls.syncMode('micro_v2');
  viewport.setExplode(0.76, true);
  controls.setExplodeValue(0.76);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('pv2-lofic-3d-pillar-cap', false);
  syncRail();
} else if (preset === 'bionz_v2_assembled') {
  viewport.setMode('bionz_v2', true);
  controls.syncMode('bionz_v2');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'bionz_v2_exploded') {
  viewport.setMode('bionz_v2', true);
  controls.syncMode('bionz_v2');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'bionz_v2_drawer') {
  viewport.setMode('bionz_v2', true);
  controls.syncMode('bionz_v2');
  viewport.setExplode(0.76, true);
  controls.setExplodeValue(0.76);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('xv2-gaa-si-nanosheets', false);
  syncRail();
} else if (preset === 'sensor_fab_assembled') {
  viewport.setMode('sensor_fab', true);
  controls.syncMode('sensor_fab');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_exploded') {
  viewport.setMode('sensor_fab', true);
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.92, true);
  controls.setExplodeValue(0.92);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_drawer') {
  viewport.setMode('sensor_fab', true);
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.45, true);
  controls.setExplodeValue(0.45);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('fab0-p06-cucu-bond-bsi', false);
  syncRail();
} else if (preset === 'sensor_fab_litho') {
  viewport.setMode('sensor_fab', true);
  controls.syncMode('sensor_fab');
  controls.syncFabStage('litho');
  viewport.setExplode(0.55, true);
  controls.setExplodeValue(0.55);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.focusSensorFabStage('litho', true);
  syncRail();
} else if (preset === 'sensor_fab_variants') {
  viewport.setMode('sensor_fab', true);
  controls.syncMode('sensor_fab');
  controls.syncFabStage('variants');
  viewport.setExplode(0.42, true);
  controls.setExplodeValue(0.42);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.focusSensorFabStage('variants', true);
  syncRail();
} else if (preset === 'sensor_fab_section') {
  viewport.setMode('sensor_fab', true);
  controls.syncMode('sensor_fab');
  viewport.setExplode(0, true);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.52);
  controls.syncSectionAxis('x', 0.52);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol1_assembled') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(1, true);
  controls.syncFabVolume(1);
  controls.syncFabStage('v1_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol1_exploded') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(1, true);
  controls.syncFabVolume(1);
  controls.syncFabStage('v1_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.75, true);
  controls.setExplodeValue(0.75);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol1_drawer') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(1, true);
  controls.syncFabVolume(1);
  controls.syncFabStage('v1_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.35, true);
  controls.setExplodeValue(0.35);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('fab1-gs-pixel-adc-isscc2025', false);
  syncRail();
} else if (preset === 'sensor_fab_vol1_archs') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(1, true);
  controls.syncFabVolume(1);
  controls.syncFabStage('v1_archs');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.12, true);
  controls.setExplodeValue(0.12);
  viewport.focusSensorFabStage('v1_archs', true);
  syncRail();
} else if (preset === 'sensor_fab_vol1_duel') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(1, true);
  controls.syncFabVolume(1);
  controls.syncFabStage('v1_duel');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.12, true);
  controls.setExplodeValue(0.12);
  viewport.focusSensorFabStage('v1_duel', true);
  syncRail();
} else if (preset === 'sensor_fab_vol1_wall') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(1, true);
  controls.syncFabVolume(1);
  controls.syncFabStage('v1_wall');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.12, true);
  controls.setExplodeValue(0.12);
  viewport.focusSensorFabStage('v1_wall', true);
  syncRail();
} else if (preset === 'sensor_fab_vol2_assembled') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(2, true);
  controls.syncFabVolume(2);
  controls.syncFabStage('v2_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol2_exploded') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(2, true);
  controls.syncFabVolume(2);
  controls.syncFabStage('v2_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.75, true);
  controls.setExplodeValue(0.75);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol2_drawer') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(2, true);
  controls.syncFabVolume(2);
  controls.syncFabStage('v2_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.28, true);
  controls.setExplodeValue(0.28);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('fab2-ci-complex-gettering-cutaway', false);
  syncRail();
} else if (preset === 'sensor_fab_vol2_refine') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(2, true);
  controls.syncFabVolume(2);
  controls.syncFabStage('v2_refine');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.1, true);
  controls.setExplodeValue(0.1);
  viewport.focusSensorFabStage('v2_refine', true);
  syncRail();
} else if (preset === 'sensor_fab_vol2_mcz') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(2, true);
  controls.syncFabVolume(2);
  controls.syncFabStage('v2_mcz');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.1, true);
  controls.setExplodeValue(0.1);
  viewport.focusSensorFabStage('v2_mcz', true);
  syncRail();
} else if (preset === 'sensor_fab_vol2_wafer') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(2, true);
  controls.syncFabVolume(2);
  controls.syncFabStage('v2_wafer');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.1, true);
  controls.setExplodeValue(0.1);
  viewport.focusSensorFabStage('v2_wafer', true);
  syncRail();
} else if (preset === 'sensor_fab_vol2_epi_ship') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(2, true);
  controls.syncFabVolume(2);
  controls.syncFabStage('v2_epi_ship');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.1, true);
  controls.setExplodeValue(0.1);
  viewport.focusSensorFabStage('v2_epi_ship', true);
  syncRail();
} else if (preset === 'sensor_fab_vol3_assembled') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(3, true);
  controls.syncFabVolume(3);
  controls.syncFabStage('v3_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol3_exploded') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(3, true);
  controls.syncFabVolume(3);
  controls.syncFabStage('v3_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.72, true);
  controls.setExplodeValue(0.72);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol3_drawer') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(3, true);
  controls.syncFabVolume(3);
  controls.syncFabStage('v3_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.24, true);
  controls.setExplodeValue(0.24);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('fab3-p28-opc-serif-correction', false);
  syncRail();
} else if (preset === 'sensor_fab_vol3_tcad') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(3, true);
  controls.syncFabVolume(3);
  controls.syncFabStage('v3_tcad');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v3_tcad', true);
  syncRail();
} else if (preset === 'sensor_fab_vol3_layout') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(3, true);
  controls.syncFabVolume(3);
  controls.syncFabStage('v3_layout');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v3_layout', true);
  syncRail();
} else if (preset === 'sensor_fab_vol3_opc') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(3, true);
  controls.syncFabVolume(3);
  controls.syncFabStage('v3_opc');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v3_opc', true);
  syncRail();
} else if (preset === 'sensor_fab_vol3_maskfab') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(3, true);
  controls.syncFabVolume(3);
  controls.syncFabStage('v3_maskfab');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v3_maskfab', true);
  syncRail();
} else if (preset === 'sensor_fab_vol4_assembled') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(4, true);
  controls.syncFabVolume(4);
  controls.syncFabStage('v4_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol4_exploded') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(4, true);
  controls.syncFabVolume(4);
  controls.syncFabStage('v4_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.72, true);
  controls.setExplodeValue(0.72);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol4_drawer') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(4, true);
  controls.syncFabVolume(4);
  controls.syncFabStage('v4_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.24, true);
  controls.setExplodeValue(0.24);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('fab4-m22-surface-pinning-ppd', false);
  syncRail();
} else if (preset === 'sensor_fab_vol4_sti_dti') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(4, true);
  controls.syncFabVolume(4);
  controls.syncFabStage('v4_sti_dti');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v4_sti_dti', true);
  syncRail();
} else if (preset === 'sensor_fab_vol4_ppd_mev') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(4, true);
  controls.syncFabVolume(4);
  controls.syncFabStage('v4_ppd_mev');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v4_ppd_mev', true);
  syncRail();
} else if (preset === 'sensor_fab_vol4_vtg_gate') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(4, true);
  controls.syncFabVolume(4);
  controls.syncFabStage('v4_vtg_gate');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v4_vtg_gate', true);
  syncRail();
} else if (preset === 'sensor_fab_vol4_pin_sab') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(4, true);
  controls.syncFabVolume(4);
  controls.syncFabStage('v4_pin_sab');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v4_pin_sab', true);
  syncRail();
} else if (preset === 'sensor_fab_vol5_assembled') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(5, true);
  controls.syncFabVolume(5);
  controls.syncFabStage('v5_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'drybox_assembled') {
  viewport.setMode('drybox', true);
  controls.syncMode('drybox');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setPhysicsActive(false);
  controls.syncPhysics(false);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'drybox_exploded') {
  viewport.setMode('drybox', true);
  controls.syncMode('drybox');
  viewport.setExplode(0.86, true);
  controls.setExplodeValue(0.86);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol5_exploded') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(5, true);
  controls.syncFabVolume(5);
  controls.syncFabStage('v5_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.72, true);
  controls.setExplodeValue(0.72);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'sensor_fab_vol5_drawer') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(5, true);
  controls.syncFabVolume(5);
  controls.syncFabStage('v5_overview');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.24, true);
  controls.setExplodeValue(0.24);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('fab5-p206-hb-recess-cmp', false);
  syncRail();
} else if (preset === 'sensor_fab_vol5_w_m1') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(5, true);
  controls.syncFabVolume(5);
  controls.syncFabStage('v5_w_m1');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v5_w_m1', true);
  syncRail();
} else if (preset === 'sensor_fab_vol5_m2_m4') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(5, true);
  controls.syncFabVolume(5);
  controls.syncFabStage('v5_m2_m4');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v5_m2_m4', true);
  syncRail();
} else if (preset === 'sensor_fab_vol5_m5_wat') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(5, true);
  controls.syncFabVolume(5);
  controls.syncFabStage('v5_m5_wat');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v5_m5_wat', true);
  syncRail();
} else if (preset === 'sensor_fab_vol5_hb_cmp') {
  viewport.setMode('sensor_fab', true);
  viewport.setSensorFabVolume(5, true);
  controls.syncFabVolume(5);
  controls.syncFabStage('v5_hb_cmp');
  controls.syncMode('sensor_fab');
  viewport.setExplode(0.08, true);
  controls.setExplodeValue(0.08);
  viewport.focusSensorFabStage('v5_hb_cmp', true);
  syncRail();
} else if (preset === 'drybox_back') {
  viewport.setMode('drybox', true);
  controls.syncMode('drybox');
  viewport.setExplode(0.45, true);
  controls.setExplodeValue(0.45);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('back', true);
  syncRail();
} else if (preset === 'drybox_section') {
  viewport.setMode('drybox', true);
  controls.syncMode('drybox');
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  currentSectionAxis = 'x';
  viewport.setSection('x', 0.52);
  controls.syncSectionAxis('x', 0.52);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'drybox_drawer') {
  viewport.setMode('drybox', true);
  controls.syncMode('drybox');
  viewport.setExplode(0.55, true);
  controls.setExplodeValue(0.55);
  viewport.setPhysicsActive(true);
  controls.syncPhysics(true);
  viewport.setCameraPreset('iso', true);
  viewport.selectPart('db-pem-nafion-membrane', false);
  syncRail();
} else if (preset === 'mirai_fh01' || preset === 'mirai_2028') {
  viewport.setMiraiSubView(1, true);
  viewport.setMode('mirai_2028', true);
  controls.syncMode('mirai_2028');
  controls.syncMiraiSubView(1);
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mirai_fh01_exploded') {
  viewport.setMiraiSubView(1, true);
  viewport.setMode('mirai_2028', true);
  controls.syncMode('mirai_2028');
  controls.syncMiraiSubView(1);
  viewport.setExplode(0.72, true);
  controls.setExplodeValue(0.72);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mirai_fh02') {
  viewport.setMiraiSubView(2, true);
  viewport.setMode('mirai_2028', true);
  controls.syncMode('mirai_2028');
  controls.syncMiraiSubView(2);
  viewport.setExplode(0, true);
  controls.setExplodeValue(0);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mirai_fh02_exploded') {
  viewport.setMiraiSubView(2, true);
  viewport.setMode('mirai_2028', true);
  controls.syncMode('mirai_2028');
  controls.syncMiraiSubView(2);
  viewport.setExplode(0.72, true);
  controls.setExplodeValue(0.72);
  viewport.setCameraPreset('iso', true);
  syncRail();
} else if (preset === 'mirai_library') {
  viewport.setMiraiSubView(1, true);
  viewport.setMode('mirai_2028', true);
  controls.syncMode('mirai_2028');
  controls.syncMiraiSubView(1);
  syncRail();
  void miraiStudioApi.open({ tab: 'reports' });
} else if (preset === 'mirai_glossary') {
  viewport.setMiraiSubView(1, true);
  viewport.setMode('mirai_2028', true);
  controls.syncMode('mirai_2028');
  controls.syncMiraiSubView(1);
  syncRail();
  void miraiStudioApi.open({ tab: 'glossary' });
}




