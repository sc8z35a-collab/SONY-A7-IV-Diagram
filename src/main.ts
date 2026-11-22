import './styles/main.css';
import { SectionAxis } from './assemblies/types';
import { CadViewport } from './engine/CadViewport';
import { ZeroTextControls } from './ui/ZeroTextControls';
import { ExplanationDrawer } from './ui/ExplanationDrawer';

const appRoot = document.getElementById('app')!;
const viewportEl = document.getElementById('viewport')!;

let hoveredPartId: string | null = null;
let currentSectionAxis: SectionAxis = 'off';

let drawer!: ExplanationDrawer;
let controls!: ZeroTextControls;
let viewport!: CadViewport;

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
    controls.syncHighlight(viewport.getSelectedPart()?.id ?? null, hoveredPartId);
  },
  onVisibilityChanged: () => {
    drawer.setIsolatedState(viewport.isIsolated());
    syncRail();
  },
});

controls = new ZeroTextControls(appRoot, {
  onModeChange: (mode) => {
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
  onResetVisibility: () => {
    viewport.resetAllVisibility();
  },
  onCameraPreset: (preset) => {
    viewport.setCameraPreset(preset);
  },
  onSelectPart: (partId) => {
    const currentId = viewport.getSelectedPart()?.id ?? null;
    if (currentId === partId) {
      viewport.selectPart(null, false);
    } else {
      viewport.selectPart(partId, true);
    }
  },
  onHoverPart: (partId) => {
    hoveredPartId = partId;
    viewport.setHoveredPartFromUI(partId);
    controls.syncHighlight(viewport.getSelectedPart()?.id ?? null, hoveredPartId);
  },
  onToggleHidePart: (partId) => {
    viewport.togglePartHidden(partId);
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
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    viewport.selectPart(null, false);
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
};

syncRail();

// Optional URL preset for reproducible views (default startup has no params and zero text in Mainboard mode)
const preset = new URLSearchParams(window.location.search).get('preset');
if (preset === 'mainboard_exploded') {
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
}

