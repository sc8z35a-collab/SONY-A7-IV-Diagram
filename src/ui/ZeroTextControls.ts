import { CadPart, CameraPreset, RenderMode, ScaleMode, SectionAxis } from '../assemblies/types';

export interface ZeroTextUIHandlers {
  onModeChange: (mode: ScaleMode) => void;
  onExplodeChange: (value: number) => void;
  onSectionAxisChange: (axis: SectionAxis) => void;
  onSectionValueChange: (value: number) => void;
  onRenderModeChange: (mode: RenderMode) => void;
  onPhysicsToggle: (active: boolean) => void;
  onOpticsStudioToggle: () => void;
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

function createIconButton(svgContent: string, className = 'icon-btn'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = className;
  btn.appendChild(svgIcon(svgContent));
  return btn;
}

// Crisp industrial CAD SVG pictograms — strictly zero letters or numbers
const ICONS = {
  // Complete Flagship Mirrorless Camera (Body + Pentaprism EVF + Grip + 50mm F1.2 Lens)
  completeCamera:
    '<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="3.8"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/><line x1="17" y1="10.2" x2="18.6" y2="10.2"/>',

  // Complete Camera Body Only (NO lens attached — open bayonet throat revealing rectangular 3:2 sensor!)
  cameraBodyOnly:
    '<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="4.1" stroke-dasharray="2.4 1.6"/><rect x="9.6" y="11.8" width="4.8" height="3.4" rx="0.6"/>',

  // 50mm F1.2 Prime Lens & XD Linear Motors: side cross-section barrel with curved XA/ED lens elements
  lensModule:
    '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6.5c1.8 3.2 1.8 7.8 0 11"/><path d="M12.5 6.5c-1.5 3.2-1.5 7.8 0 11"/><path d="M17 6.5c1.6 3.2 1.6 7.8 0 11"/><line x1="10.2" y1="6" x2="10.2" y2="18" stroke-dasharray="2 2"/>',

  // Large-Diameter Bayonet Lens Mount: outer flange ring + inner throat + 4 bayonet lugs + top index dot + bottom contact dots
  mountModule:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.3"/><circle cx="12" cy="5.1" r="1.05" fill="currentColor" stroke="none"/><line x1="8.3" y1="8.3" x2="9.7" y2="9.7"/><line x1="15.7" y1="8.3" x2="14.3" y2="9.7"/><line x1="8.3" y1="15.7" x2="9.7" y2="14.3"/><line x1="15.7" y1="15.7" x2="14.3" y2="14.3"/><circle cx="10" cy="18.6" r="0.7" fill="currentColor" stroke="none"/><circle cx="12" cy="18.9" r="0.7" fill="currentColor" stroke="none"/><circle cx="14" cy="18.6" r="0.7" fill="currentColor" stroke="none"/>',

  // Focal-plane shutter: upper & lower horizontal curtain blades with central exposure slit
  shutterModule:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/><line x1="3" y1="6.8" x2="21" y2="6.8" opacity="0.45"/><line x1="3" y1="17.2" x2="21" y2="17.2" opacity="0.45"/><line x1="17.5" y1="4" x2="17.5" y2="20" opacity="0.5"/>',

  // Macro sensor frame icon
  macroSensor:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><rect x="7" y="8.5" width="10" height="7" rx="1"/><line x1="7" y1="3" x2="7" y2="5"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="17" y1="3" x2="17" y2="5"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/>',

  // Mainboard & ISP Engine: SoC die + PCB bus traces + peripheral chip nodes (zero text!)
  mainboardIsp:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/><line x1="8.5" y1="12" x2="5.5" y2="12"/><line x1="15.5" y1="12" x2="18.5" y2="12"/><line x1="12" y1="8.5" x2="12" y2="5.5"/><line x1="12" y1="15.5" x2="12" y2="18.5"/><circle cx="5.5" cy="7.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.5" cy="7.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.5" cy="16.5" r="0.9" fill="currentColor" stroke="none"/>',

  // EVF Optical & Eye-Control Viewfinder: pentaprism hump + eyepiece reticle + optical cone (zero text!)
  evfModule:
    '<path d="M4 17v-5l3.5-5h9L20 12v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M7.5 13.5c1.2-2.2 3-3.3 4.5-3.3s3.3 1.1 4.5 3.3c-1.2 2.2-3 3.3-4.5 3.3s-3.3-1.1-4.5-3.3z"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/><line x1="9" y1="4.5" x2="15" y2="4.5"/>',

  // 4-Axis Multi-Angle Rear LCD Monitor: side-hinged articulated display panel with dual motion arcs
  lcdModule:
    '<rect x="6.5" y="6" width="14" height="10.5" rx="1.6"/><line x1="4" y1="7.5" x2="4" y2="15"/><line x1="4" y1="11.2" x2="6.5" y2="11.2"/><path d="M8.5 19.2c2.5 1.1 5.5 1.1 8 0"/><polyline points="15.2 18 17 19.1 15.6 20.6"/>',

  // Battery, Magnesium Monocoque Body & Dials: battery power cell + top rotary dial contour
  bodyModule:
    '<rect x="4" y="6.5" width="9.5" height="13" rx="1.8"/><line x1="6.8" y1="4" x2="10.7" y2="4"/><path d="M9.6 10.2l-2 3.2h2.4l-1.8 3.2"/><circle cx="17.8" cy="9.5" r="2.7"/><rect x="15.5" y="14.2" width="4.6" height="5.3" rx="1.2"/>',

  // Micro 2x2 microlens & stacked wafer icon
  microPixel:
    '<path d="M4 10c0-2.5 2-4 4-4s4 1.5 4 4"/><path d="M12 10c0-2.5 2-4 4-4s4 1.5 4 4"/><rect x="4" y="10" width="16" height="3.5" rx="0.5"/><rect x="4" y="15.5" width="16" height="3.5" rx="0.5"/>',

  // Assembled compact stack
  assembled:
    '<polygon points="12 5 20 9.5 12 14 4 9.5 12 5"/><polyline points="4 13 12 17.5 20 13"/>',

  // Exploded separated layers
  exploded:
    '<polygon points="12 2.5 20 6.5 12 10.5 4 6.5 12 2.5"/><polyline points="4 12 12 16 20 12"/><polyline points="4 17.5 12 21.5 20 17.5"/>',

  // Section cut off (full cube)
  sectionOff:
    '<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2.5 2.5"/>',

  // Section cut vertical slice (X plane)
  sectionX:
    '<path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"/><line x1="12" y1="2" x2="12" y2="22"/><path d="M15 8l4 4-4 4" opacity="0.55"/>',

  // Section cut horizontal slice (Y plane)
  sectionY:
    '<path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M8 9l4-4 4 4" opacity="0.55"/>',

  // Solid PBR shading
  renderSolid:
    '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/>',

  // X-ray translucent dissection
  renderXray:
    '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke-dasharray="2.5 2"/><circle cx="12" cy="12" r="3"/>',

  // Technical CAD wireframe/line art
  renderCad:
    '<polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="4" y1="7.5" x2="20" y2="16.5" opacity="0.45"/><line x1="20" y1="7.5" x2="4" y2="16.5" opacity="0.45"/>',

  // Optical rays / slit exposure / ISP signal-flow physics toggle
  physicsRays:
    '<line x1="3" y1="6" x2="12" y2="12"/><line x1="3" y1="12" x2="12" y2="12"/><line x1="3" y1="18" x2="12" y2="12"/><line x1="12" y1="12" x2="21" y2="7"/><line x1="12" y1="12" x2="21" y2="12"/><line x1="12" y1="12" x2="21" y2="17"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>',

  // Interactive Optical Mechanism Motion Lab: double-convex lens element refracting rays to a crisp focal point (zero text!)
  opticsStudio:
    '<path d="M9.8 4.2c2.8 4.6 2.8 11 0 15.6c-2.8-4.6-2.8-11 0-15.6z"/><path d="M2.5 8h6.4l11.6 4"/><path d="M2.5 16h6.4l11.6-4"/><line x1="2.5" y1="12" x2="20.5" y2="12" opacity="0.45"/><circle cx="20.5" cy="12" r="1.6" fill="currentColor" stroke="none"/>',

  // Reset all visibility (show all)
  eyeAll:
    '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>',

  eyeClosed:
    '<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',

  // Fullscreen expand / compress (pure 4-corner geometric brackets, zero text!)
  fullscreenEnter:
    '<polyline points="4 9 4 4 9 4"/><polyline points="15 4 20 4 20 9"/><polyline points="20 15 20 20 15 20"/><polyline points="9 20 4 20 4 15"/>',

  fullscreenExit:
    '<polyline points="9 4 9 9 4 9"/><polyline points="20 9 15 9 15 4"/><polyline points="15 20 15 15 20 15"/><polyline points="4 15 9 15 9 20"/>',

  // Camera viewpoints (pure geometric cube faces, zero letters)
  viewIso:
    '<path d="M12 3l7.5 4.2v8.6L12 20l-7.5-4.2V7.2L12 3z"/><path d="M12 11.5L19.5 7.2"/><path d="M12 11.5V20"/><path d="M12 11.5L4.5 7.2"/>',
  viewFront:
    '<rect x="5" y="5" width="14" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/>',
  viewSide:
    '<rect x="9" y="4" width="6" height="16" rx="1.5"/><line x1="4" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="20" y2="12"/>',
  viewBack:
    '<rect x="5" y="5" width="14" height="14" rx="2"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/><line x1="15.5" y1="8.5" x2="8.5" y2="15.5"/>',
};

/**
 * Strictly Zero-Text CAD HUD:
 * Contains ONLY SVG pictograms, geometric sliders, and color/bar layer strips.
 * Zero visible letters, zero numbers, zero text tooltips.
 */
export class ZeroTextControls {
  private root: HTMLElement;
  private handlers: ZeroTextUIHandlers;

  private integratedBtn: HTMLButtonElement;
  private cameraBodyBtn: HTMLButtonElement;
  private lensBtn: HTMLButtonElement;
  private mountBtn: HTMLButtonElement;
  private shutterBtn: HTMLButtonElement;
  private sensorBtn: HTMLButtonElement;
  private mainboardBtn: HTMLButtonElement;
  private evfBtn: HTMLButtonElement;
  private lcdBtn: HTMLButtonElement;
  private bodyBtn: HTMLButtonElement;
  private microBtn: HTMLButtonElement;
  private explodeRange: HTMLInputElement;
  private assembleBtn: HTMLButtonElement;
  private explodeBtn: HTMLButtonElement;

  private sectionBtn: HTMLButtonElement;
  private sectionRange: HTMLInputElement;

  private solidBtn: HTMLButtonElement;
  private xrayBtn: HTMLButtonElement;
  private cadBtn: HTMLButtonElement;

  private physicsBtn: HTMLButtonElement;
  private opticsStudioBtn: HTMLButtonElement;
  private resetVisBtn: HTMLButtonElement;
  private fullscreenBtn: HTMLButtonElement;

  private layerRail: HTMLElement;
  private layerRowMap = new Map<string, HTMLElement>();

  private currentMode: ScaleMode = 'integrated';
  private currentSectionAxis: SectionAxis = 'off';
  private currentRenderMode: RenderMode = 'solid';
  private physicsActive = false;

  constructor(root: HTMLElement, handlers: ZeroTextUIHandlers) {
    this.root = root;
    this.handlers = handlers;

    // -----------------------------------------------------------------------
    // 1. Top-Left Camera Viewpoint Cluster
    // -----------------------------------------------------------------------
    const viewCluster = document.createElement('div');
    viewCluster.className = 'view-cluster';

    const vIso = createIconButton(ICONS.viewIso);
    const vFront = createIconButton(ICONS.viewFront);
    const vSide = createIconButton(ICONS.viewSide);
    const vBack = createIconButton(ICONS.viewBack);

    vIso.addEventListener('click', () => this.handlers.onCameraPreset('iso'));
    vFront.addEventListener('click', () => this.handlers.onCameraPreset('front'));
    vSide.addEventListener('click', () => this.handlers.onCameraPreset('side'));
    vBack.addEventListener('click', () => this.handlers.onCameraPreset('back'));

    viewCluster.append(vIso, vFront, vSide, vBack);
    this.root.appendChild(viewCluster);

    // -----------------------------------------------------------------------
    // 2. Left Vertical Layer Dissection Strip (Swatches + Geometric Bars)
    // -----------------------------------------------------------------------
    this.layerRail = document.createElement('div');
    this.layerRail.className = 'layer-rail';
    this.root.appendChild(this.layerRail);

    // -----------------------------------------------------------------------
    // 3. Bottom Floating CAD Dock
    // -----------------------------------------------------------------------
    const dock = document.createElement('div');
    dock.className = 'cad-dock';

    // Group A: 11-Mode Architecture Switch
    // Primary 3 Views: [Complete Camera (138) | Body All Only (98) | Lens Standalone (40)]
    // Sub-divider -> 8 Drill-down Subsystems: [Mount | Shutter | Sensor | Mainboard | EVF | LCD | Body Shell | Micro]
    const scaleGroup = document.createElement('div');
    scaleGroup.className = 'cad-dock-group';

    this.integratedBtn = createIconButton(ICONS.completeCamera);
    this.integratedBtn.classList.add('is-active');
    this.cameraBodyBtn = createIconButton(ICONS.cameraBodyOnly);
    this.lensBtn = createIconButton(ICONS.lensModule);

    const primarySep = document.createElement('div');
    primarySep.className = 'cad-sub-divider';

    this.mountBtn = createIconButton(ICONS.mountModule);
    this.shutterBtn = createIconButton(ICONS.shutterModule);
    this.sensorBtn = createIconButton(ICONS.macroSensor);
    this.mainboardBtn = createIconButton(ICONS.mainboardIsp);
    this.evfBtn = createIconButton(ICONS.evfModule);
    this.lcdBtn = createIconButton(ICONS.lcdModule);
    this.bodyBtn = createIconButton(ICONS.bodyModule);
    this.microBtn = createIconButton(ICONS.microPixel);

    this.integratedBtn.addEventListener('click', () => this.setMode('integrated'));
    this.cameraBodyBtn.addEventListener('click', () => this.setMode('camera_body'));
    this.lensBtn.addEventListener('click', () => this.setMode('lens'));
    this.mountBtn.addEventListener('click', () => this.setMode('mount'));
    this.shutterBtn.addEventListener('click', () => this.setMode('shutter'));
    this.sensorBtn.addEventListener('click', () => this.setMode('sensor'));
    this.mainboardBtn.addEventListener('click', () => this.setMode('mainboard'));
    this.evfBtn.addEventListener('click', () => this.setMode('evf'));
    this.lcdBtn.addEventListener('click', () => this.setMode('lcd'));
    this.bodyBtn.addEventListener('click', () => this.setMode('body'));
    this.microBtn.addEventListener('click', () => this.setMode('micro'));
    scaleGroup.append(
      this.integratedBtn,
      this.cameraBodyBtn,
      this.lensBtn,
      primarySep,
      this.mountBtn,
      this.shutterBtn,
      this.sensorBtn,
      this.mainboardBtn,
      this.evfBtn,
      this.lcdBtn,
      this.bodyBtn,
      this.microBtn
    );

    // Group B: Exploded View Dissection Slider
    const explodeGroup = document.createElement('div');
    explodeGroup.className = 'slider-cluster';

    this.assembleBtn = createIconButton(ICONS.assembled);
    this.explodeRange = document.createElement('input');
    this.explodeRange.type = 'range';
    this.explodeRange.min = '0';
    this.explodeRange.max = '1000';
    this.explodeRange.value = '0';
    this.explodeRange.className = 'cad-range';
    this.explodeBtn = createIconButton(ICONS.exploded);

    this.assembleBtn.addEventListener('click', () => {
      this.explodeRange.value = '0';
      this.handlers.onExplodeChange(0);
      this.updateExplodeButtons(0);
    });
    this.explodeBtn.addEventListener('click', () => {
      this.explodeRange.value = '1000';
      this.handlers.onExplodeChange(1);
      this.updateExplodeButtons(1);
    });
    this.explodeRange.addEventListener('input', () => {
      const v = Number(this.explodeRange.value) / 1000;
      this.handlers.onExplodeChange(v);
      this.updateExplodeButtons(v);
    });
    this.updateExplodeButtons(0);
    explodeGroup.append(this.assembleBtn, this.explodeRange, this.explodeBtn);

    // Group C: Real-Time CAD Section Cut (Off -> X -> Y + Slider)
    const sectionGroup = document.createElement('div');
    sectionGroup.className = 'slider-cluster';

    this.sectionBtn = createIconButton(ICONS.sectionOff);
    this.sectionRange = document.createElement('input');
    this.sectionRange.type = 'range';
    this.sectionRange.min = '0';
    this.sectionRange.max = '1000';
    this.sectionRange.value = '500';
    this.sectionRange.className = 'cad-range is-disabled';

    this.sectionBtn.addEventListener('click', () => {
      const next: SectionAxis =
        this.currentSectionAxis === 'off'
          ? 'x'
          : this.currentSectionAxis === 'x'
            ? 'y'
            : 'off';
      this.setSectionAxis(next);
    });

    this.sectionRange.addEventListener('input', () => {
      this.handlers.onSectionValueChange(Number(this.sectionRange.value) / 1000);
    });
    sectionGroup.append(this.sectionBtn, this.sectionRange);

    // Group D: Render Shading Modes (Solid / X-Ray / CAD Line)
    const renderGroup = document.createElement('div');
    renderGroup.className = 'cad-dock-group';

    this.solidBtn = createIconButton(ICONS.renderSolid);
    this.solidBtn.classList.add('is-active');
    this.xrayBtn = createIconButton(ICONS.renderXray);
    this.cadBtn = createIconButton(ICONS.renderCad);

    this.solidBtn.addEventListener('click', () => this.setRenderMode('solid'));
    this.xrayBtn.addEventListener('click', () => this.setRenderMode('xray'));
    this.cadBtn.addEventListener('click', () => this.setRenderMode('cad'));
    renderGroup.append(this.solidBtn, this.xrayBtn, this.cadBtn);

    // Group E: Physics Simulation, Optical Motion Lab, Visibility Reset & Fullscreen Toggle
    const actionGroup = document.createElement('div');
    actionGroup.className = 'cad-dock-group';

    this.physicsBtn = createIconButton(ICONS.physicsRays);
    this.physicsBtn.classList.add('is-accent');
    this.physicsBtn.addEventListener('click', () => {
      this.physicsActive = !this.physicsActive;
      this.physicsBtn.classList.toggle('is-active', this.physicsActive);
      this.handlers.onPhysicsToggle(this.physicsActive);
    });

    this.opticsStudioBtn = createIconButton(ICONS.opticsStudio);
    this.opticsStudioBtn.classList.add('is-accent');
    this.opticsStudioBtn.addEventListener('click', () => {
      this.handlers.onOpticsStudioToggle();
    });

    this.resetVisBtn = createIconButton(ICONS.eyeAll);
    this.resetVisBtn.disabled = true;
    this.resetVisBtn.addEventListener('click', () => {
      this.handlers.onResetVisibility();
    });

    this.fullscreenBtn = createIconButton(ICONS.fullscreenEnter);
    this.fullscreenBtn.addEventListener('click', () => {
      this.handlers.onFullscreenToggle();
    });

    actionGroup.append(this.physicsBtn, this.opticsStudioBtn, this.resetVisBtn, this.fullscreenBtn);

    const div1 = document.createElement('div');
    div1.className = 'cad-divider';
    const div2 = document.createElement('div');
    div2.className = 'cad-divider';
    const div3 = document.createElement('div');
    div3.className = 'cad-divider';
    const div4 = document.createElement('div');
    div4.className = 'cad-divider';

    dock.append(
      scaleGroup,
      div1,
      explodeGroup,
      div2,
      sectionGroup,
      div3,
      renderGroup,
      div4,
      actionGroup
    );
    this.root.appendChild(dock);
  }

  private applyModeButtons(mode: ScaleMode): void {
    this.integratedBtn.classList.toggle('is-active', mode === 'integrated');
    this.cameraBodyBtn.classList.toggle('is-active', mode === 'camera_body');
    this.lensBtn.classList.toggle('is-active', mode === 'lens');
    this.mountBtn.classList.toggle('is-active', mode === 'mount');
    this.shutterBtn.classList.toggle('is-active', mode === 'shutter');
    this.sensorBtn.classList.toggle('is-active', mode === 'sensor');
    this.mainboardBtn.classList.toggle('is-active', mode === 'mainboard');
    this.evfBtn.classList.toggle('is-active', mode === 'evf');
    this.lcdBtn.classList.toggle('is-active', mode === 'lcd');
    this.bodyBtn.classList.toggle('is-active', mode === 'body');
    this.microBtn.classList.toggle('is-active', mode === 'micro');
  }

  private setMode(mode: ScaleMode): void {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    this.applyModeButtons(mode);
    this.handlers.onModeChange(mode);
  }

  private updateExplodeButtons(v: number): void {
    this.assembleBtn.classList.toggle('is-active', v < 0.04);
    this.explodeBtn.classList.toggle('is-active', v > 0.96);
  }

  private setSectionAxis(axis: SectionAxis): void {
    this.currentSectionAxis = axis;
    this.sectionBtn.replaceChildren(
      svgIcon(
        axis === 'off' ? ICONS.sectionOff : axis === 'x' ? ICONS.sectionX : ICONS.sectionY
      )
    );
    this.sectionBtn.classList.toggle('is-active', axis !== 'off');
    this.sectionRange.classList.toggle('is-disabled', axis === 'off');
    this.handlers.onSectionAxisChange(axis);
  }

  private setRenderMode(mode: RenderMode): void {
    if (this.currentRenderMode === mode) return;
    this.currentRenderMode = mode;
    this.solidBtn.classList.toggle('is-active', mode === 'solid');
    this.xrayBtn.classList.toggle('is-active', mode === 'xray');
    this.cadBtn.classList.toggle('is-active', mode === 'cad');
    this.handlers.onRenderModeChange(mode);
  }

  public setExplodeValue(v: number): void {
    this.explodeRange.value = String(Math.round(v * 1000));
    this.updateExplodeButtons(v);
  }

  public syncMode(mode: ScaleMode): void {
    this.currentMode = mode;
    this.applyModeButtons(mode);
  }

  public syncSectionAxis(axis: SectionAxis, value = 0.5): void {
    this.currentSectionAxis = axis;
    this.sectionBtn.replaceChildren(
      svgIcon(
        axis === 'off' ? ICONS.sectionOff : axis === 'x' ? ICONS.sectionX : ICONS.sectionY
      )
    );
    this.sectionBtn.classList.toggle('is-active', axis !== 'off');
    this.sectionRange.classList.toggle('is-disabled', axis === 'off');
    this.sectionRange.value = String(Math.round(value * 1000));
  }

  public syncPhysics(active: boolean): void {
    this.physicsActive = active;
    this.physicsBtn.classList.toggle('is-active', active);
  }

  public syncOpticsStudio(active: boolean): void {
    this.opticsStudioBtn.classList.toggle('is-active', active);
  }

  public syncFullscreen(active: boolean): void {
    this.fullscreenBtn.classList.toggle('is-active', active);
    this.fullscreenBtn.replaceChildren(
      svgIcon(active ? ICONS.fullscreenExit : ICONS.fullscreenEnter)
    );
  }

  public renderLayerRail(
    parts: CadPart[],
    selectedId: string | null,
    hoveredId: string | null,
    isHidden: (id: string) => boolean,
    hasAnyHidden: boolean
  ): void {
    this.layerRail.replaceChildren();
    this.layerRowMap.clear();
    this.resetVisBtn.disabled = !hasAnyHidden;

    let prevSubsystem: CadPart['subsystem'] | null = null;
    let selectedRowEl: HTMLElement | null = null;

    parts.forEach((part, idx) => {
      if (prevSubsystem && prevSubsystem !== part.subsystem) {
        const sep = document.createElement('div');
        sep.className = 'layer-sep';
        this.layerRail.appendChild(sep);
      }
      prevSubsystem = part.subsystem;

      const row = document.createElement('div');
      row.className = 'layer-item';
      const hidden = isHidden(part.id);
      if (part.id === selectedId) {
        row.classList.add('is-selected');
        selectedRowEl = row;
      }
      if (part.id === hoveredId) row.classList.add('is-hovered');
      if (hidden) row.classList.add('is-hidden');

      const swatch = document.createElement('span');
      swatch.className = 'layer-swatch';
      swatch.style.backgroundColor = part.swatchColor;

      const bar = document.createElement('span');
      bar.className = 'layer-bar';
      let widthPx = 20;
      if (part.subsystem === 'lens') {
        widthPx =
          part.order === 1 ||
          part.order === 32 ||
          part.order === 33 ||
          part.order === 43 ||
          part.order === 46 ||
          part.order === 57 ||
          part.order === 58 ||
          part.order === 62
            ? 32
            : part.order === 8 ||
                part.order === 10 ||
                part.order === 16 ||
                part.order === 21 ||
                part.order === 24 ||
                part.order === 26 ||
                part.order === 35 ||
                part.order === 40 ||
                part.order === 53
              ? 26
              : part.order === 3 ||
                  part.order === 7 ||
                  part.order === 9 ||
                  part.order === 11 ||
                  part.order === 12 ||
                  part.order === 15 ||
                  part.order === 22 ||
                  part.order === 28 ||
                  part.order === 34 ||
                  part.order === 38 ||
                  part.order === 39 ||
                  part.order === 41 ||
                  part.order === 50 ||
                  part.order === 54
                ? 21
                : 16;
      } else if (part.subsystem === 'lcd') {
        widthPx = part.order === 1 || part.order === 4 || part.order === 6 ? 30 : 23;
      } else if (part.subsystem === 'body') {
        widthPx =
          part.order === 3 || part.order === 7 || part.order === 8 || part.order === 9 || part.order === 12
            ? 32
            : part.order === 1 || part.order === 5 || part.order === 6
              ? 25
              : 19;
      } else if (part.subsystem === 'mount') {
        widthPx =
          part.order === 1 || part.order === 11 || part.order === 12
            ? 32
            : part.order === 3 || part.order === 4 || part.order === 5 || part.order === 9 || part.order === 10
              ? 25
              : 18;
      } else if (part.subsystem === 'evf') {
        widthPx =
          part.order === 1 || part.order === 14
            ? 32
            : part.order === 5 || part.order === 7 || part.order === 8 || part.order === 11
              ? 26
              : part.order === 2 || part.order === 10 || part.order === 13
                ? 22
                : 17;
      } else if (part.subsystem === 'mainboard') {
        widthPx =
          part.order === 14 || part.order === 16
            ? 32
            : part.order === 1 || part.order === 2
              ? 28
              : part.order === 4 || part.order === 6 || part.order === 9 || part.order === 12
                ? 24
                : 17;
      } else if (part.subsystem === 'shutter') {
        widthPx =
          part.order === 1 || part.order === 12
            ? 30
            : part.order === 3 || part.order === 5 || part.order === 6
              ? 24
              : part.order >= 8 && part.order <= 10
                ? 26
                : 17;
      } else if (part.subsystem === 'sensor') {
        const ratio = (part.order - 1) / 25;
        widthPx = Math.round(14 + Math.sin(ratio * Math.PI * 0.85) * 10 + (part.order >= 15 ? 8 : 0));
      } else {
        widthPx = Math.round(18 + (idx === 3 || idx === 4 ? 10 : 4));
      }
      bar.style.width = `${widthPx}px`;

      const eyeBtn = document.createElement('button');
      eyeBtn.type = 'button';
      eyeBtn.className = 'layer-eye-btn';
      eyeBtn.appendChild(svgIcon(hidden ? ICONS.eyeClosed : ICONS.eyeAll));

      eyeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handlers.onToggleHidePart(part.id);
      });

      row.addEventListener('click', () => {
        this.handlers.onSelectPart(part.id);
      });

      row.addEventListener('pointerenter', () => {
        this.handlers.onHoverPart(part.id);
      });

      row.addEventListener('pointerleave', () => {
        this.handlers.onHoverPart(null);
      });

      row.append(swatch, bar, eyeBtn);
      this.layerRail.appendChild(row);
      this.layerRowMap.set(part.id, row);
    });

    if (selectedRowEl) {
      (selectedRowEl as HTMLElement).scrollIntoView({ block: 'nearest' });
    }
  }

  public syncHighlight(selectedId: string | null, hoveredId: string | null): void {
    this.layerRowMap.forEach((row, id) => {
      row.classList.toggle('is-selected', id === selectedId);
      row.classList.toggle('is-hovered', id === hoveredId);
    });
  }
}
