import './styles/main.css';
import { SectionAxis } from './assemblies/types';
import { sharedLensOpticalSim } from './assemblies/lens/lensOpticalSim';
import { CadViewport } from './engine/CadViewport';
import { ZeroTextControls } from './ui/ZeroTextControls';
import { ExplanationDrawer } from './ui/ExplanationDrawer';
import { LensOpticsStudio } from './ui/LensOpticsStudio';

const appRoot = document.getElementById('app')!;
const viewportEl = document.getElementById('viewport')!;

let hoveredPartId: string | null = null;
let currentSectionAxis: SectionAxis = 'off';
let zenFullscreen = false;

let drawer!: ExplanationDrawer;
let controls!: ZeroTextControls;
let viewport!: CadViewport;
let opticsStudio!: LensOpticsStudio;

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

  // Try native browser Fullscreen API first; seamlessly fall back to Zen Fullscreen if restricted (e.g. iframe)
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
});

controls = new ZeroTextControls(appRoot, {
  onModeChange: (mode) => {
    if (mode !== 'lens' && mode !== 'integrated' && opticsStudio?.getIsOpen()) {
      opticsStudio.close();
    }
    viewport.setMode(mode);
    controls.setExplodeValue(viewport.getExplode());
    syncRail();
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
  onPhysicsToggle: (active) => {
    viewport.setPhysicsActive(active);
  },
  onOpticsStudioToggle: () => {
    opticsStudio.toggle();
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
      viewport.selectPart(partId, !opticsStudio?.getIsOpen());
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

opticsStudio = new LensOpticsStudio(appRoot, {
  onOpenChange: (open) => {
    controls.syncOpticsStudio(open);
    if (open) {
      viewport.setMode('lens', true);
      controls.syncMode('lens');
      viewport.setExplode(0);
      controls.setExplodeValue(0);
      viewport.setPhysicsActive(true);
      controls.syncPhysics(true);
      viewport.frameLensForOpticsStudio(false);
      syncRail();
    } else {
      if (viewport.getMode() === 'lens') {
        viewport.setCameraPreset('iso', false);
      }
      viewport.requestRenderFrame();
    }
  },
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
});

document.addEventListener('fullscreenchange', () => {
  if (!isNativeFullscreen()) zenFullscreen = false;
  syncFullscreenState();
});
document.addEventListener('webkitfullscreenchange', () => {
  if (!isNativeFullscreen()) zenFullscreen = false;
  syncFullscreenState();
});

window.addEventListener('keydown', (e) => {
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
    (e.key === 'f' || e.key === 'F') &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    void toggleFullscreen();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if (viewport.getSelectedPart()) viewport.stepSelectedPart(1);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if (viewport.getSelectedPart()) viewport.stepSelectedPart(-1);
  }
});

// Expose lightweight inspection hooks on window
(window as unknown as Record<string, unknown>).__cad = {
  viewport,
  controls,
  opticsStudio,
  toggleFullscreen,
};

syncRail();

// Optional URL preset for reproducible views (default startup has no params and zero text in Complete 160-part Camera mode)
const preset = new URLSearchParams(window.location.search).get('preset');
if (preset === 'complete_assembled') {
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
} else if (preset === 'phase18_lens') {
  viewport.setMode('lens', true);
  controls.syncMode('lens');
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
}



