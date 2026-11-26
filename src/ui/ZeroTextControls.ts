import {
  CadPart,
  CameraPreset,
  GraphicsQuality,
  LensSection,
  RenderMode,
  ScaleMode,
  SectionAxis,
  SensorFabStage,
  SensorFabVolume,
} from '../assemblies/types';

export interface ZeroTextUIHandlers {
  onModeChange: (mode: ScaleMode) => void;
  onLensSectionChange: (section: LensSection) => void;
  onSensorFabVolumeChange: (vol: SensorFabVolume) => void;
  onSensorFabStageChange: (stage: SensorFabStage) => void;
  onExplodeChange: (value: number) => void;
  onSectionAxisChange: (axis: SectionAxis) => void;
  onSectionValueChange: (value: number) => void;
  onRenderModeChange: (mode: RenderMode) => void;
  onQualityChange: (quality: GraphicsQuality) => void;
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

function createIconButton(svgContent: string, className = 'icon-btn', viewBox = '0 0 24 24'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = className;
  btn.appendChild(svgIcon(svgContent, viewBox));
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

  // 3-Section Lightweight GM Lens Switcher Icons (viewBox="0 0 46 24", strictly zero text!):
  // Shows 3-block side silhouette [Rear Mount | Mid Iris/XD | Front XA+Hood] + 3 indicator dots below
  lensSec1:
    '<rect x="3" y="4" width="2.2" height="11" rx="0.6" fill="currentColor" stroke="none"/><rect x="6" y="3.5" width="10.5" height="12" rx="1.6" fill="currentColor"/><rect x="18.5" y="3" width="10.5" height="13" rx="1.4" opacity="0.32"/><path d="M31 3h8.5l3 1.8v9.4l-3 1.8H31z" opacity="0.32"/><circle cx="11.2" cy="20.2" r="2.0" fill="currentColor" stroke="none"/><circle cx="23.8" cy="20.2" r="1.4" opacity="0.34"/><circle cx="36.2" cy="20.2" r="1.4" opacity="0.34"/>',

  lensSec2:
    '<rect x="3" y="4" width="2.2" height="11" rx="0.6" opacity="0.32"/><rect x="6" y="3.5" width="10.5" height="12" rx="1.6" opacity="0.32"/><rect x="18.5" y="3" width="10.5" height="13" rx="1.4" fill="currentColor"/><path d="M31 3h8.5l3 1.8v9.4l-3 1.8H31z" opacity="0.32"/><circle cx="11.2" cy="20.2" r="1.4" opacity="0.34"/><circle cx="23.8" cy="20.2" r="2.0" fill="currentColor" stroke="none"/><circle cx="36.2" cy="20.2" r="1.4" opacity="0.34"/>',

  lensSec3:
    '<rect x="3" y="4" width="2.2" height="11" rx="0.6" opacity="0.32"/><rect x="6" y="3.5" width="10.5" height="12" rx="1.6" opacity="0.32"/><rect x="18.5" y="3" width="10.5" height="13" rx="1.4" opacity="0.32"/><path d="M31 3h8.5l3 1.8v9.4l-3 1.8H31z" fill="currentColor"/><circle cx="11.2" cy="20.2" r="1.4" opacity="0.34"/><circle cx="23.8" cy="20.2" r="1.4" opacity="0.34"/><circle cx="36.2" cy="20.2" r="2.0" fill="currentColor" stroke="none"/>',

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

  // Standalone Battery Pack Ultra-Dissection (NP-FZ100 twin-cell pack + lightning bolt, zero text!)
  batteryPack:
    '<rect x="5" y="5.5" width="14" height="15.5" rx="2"/><rect x="8.5" y="2.8" width="7" height="2.7" rx="0.7"/><path d="M13.2 8.8l-3.4 4.7h2.7l-1.5 4.7 3.7-5.4h-2.7z" fill="currentColor" stroke="none"/>',

  // Standalone CFexpress 4.0 Card Ultra-Dissection (Type A card silhouette + pull-tab ridges + PCIe edge pins, zero text!)
  cfexpressCard:
    '<path d="M5.5 5.2a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v12.3L16.5 20h-9a2 2 0 0 1-2-2V5.2z"/><line x1="8.2" y1="6.4" x2="15.8" y2="6.4"/><line x1="8.2" y1="8.8" x2="15.8" y2="8.8" opacity="0.55"/><line x1="8.5" y1="15.4" x2="8.5" y2="18.2"/><line x1="11.0" y1="15.4" x2="11.0" y2="18.2"/><line x1="13.5" y1="15.4" x2="13.5" y2="18.2"/><line x1="15.8" y1="15.4" x2="15.8" y2="18.2"/>',

  // BIONZ XR / XR2 Package Internal Ultra-Dissection: stacked PoP chip die + BGA ball array (strictly zero text!)
  bionzModule:
    '<rect x="5" y="4.5" width="14" height="4" rx="1"/><rect x="3.5" y="10.5" width="17" height="5.5" rx="1.2"/><rect x="8" y="11.8" width="8" height="2.9" rx="0.5"/><line x1="8" y1="8.5" x2="8" y2="10.5"/><line x1="16" y1="8.5" x2="16" y2="10.5"/><circle cx="6.5" cy="18.8" r="1.05" fill="currentColor" stroke="none"/><circle cx="10.2" cy="18.8" r="1.05" fill="currentColor" stroke="none"/><circle cx="13.8" cy="18.8" r="1.05" fill="currentColor" stroke="none"/><circle cx="17.5" cy="18.8" r="1.05" fill="currentColor" stroke="none"/>',

  // Sony Multi Interface (MI) Shoe: ISO-518 U-rail frame + central X-sync pad + hidden 21-pin front row (strictly zero text!)
  miShoeModule:
    '<path d="M4 19V7.5h4.5v2.2H6.4v6.8h11.2V9.7h-2.1V7.5H20V19H4z"/><circle cx="12" cy="13.4" r="2.1"/><circle cx="8" cy="5.2" r="0.85" fill="currentColor" stroke="none"/><circle cx="10.6" cy="5.2" r="0.85" fill="currentColor" stroke="none"/><circle cx="13.4" cy="5.2" r="0.85" fill="currentColor" stroke="none"/><circle cx="16" cy="5.2" r="0.85" fill="currentColor" stroke="none"/>',

  // Internal Stereo / 3-Capsule MEMS & ECM Microphone: capsule silhouette + twin acoustic wave arcs (strictly zero text!)
  micModule:
    '<rect x="9" y="5" width="6" height="9.5" rx="3"/><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0"/><line x1="12" y1="17" x2="12" y2="20"/><line x1="9" y1="20" x2="15" y2="20"/><path d="M4.2 7.5a5.2 5.2 0 0 0 0 6.2" opacity="0.72"/><path d="M19.8 7.5a5.2 5.2 0 0 1 0 6.2" opacity="0.72"/>',

  // Sensor Manufacturing Process (300mm Silicon Wafer + Full-Frame Reticle Die Grid + V-Notch)
  sensorFab:
    '<circle cx="12" cy="12" r="8.6"/><line x1="6.4" y1="9.2" x2="17.6" y2="9.2"/><line x1="6.4" y1="14.8" x2="17.6" y2="14.8"/><line x1="9.2" y1="6.2" x2="9.2" y2="17.8"/><line x1="14.8" y1="6.2" x2="14.8" y2="17.8"/><rect x="9.8" y="9.8" width="4.4" height="4.4" rx="0.5" fill="currentColor" stroke="none"/><path d="M10.8 20.5 L12 18.8 L13.2 20.5" fill="currentColor" stroke="none"/>',

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
  // ULTRA Ray Tracing + HDR 4-point specular star
  ultraRayStar:
    '<path d="M12 2.5l2.1 6.2 6.4 3.3-6.4 3.3L12 21.5l-2.1-6.2-6.4-3.3 6.4-3.3z"/>',
};

/**
 * CAD HUD Controls:
 * Crisp industrial SVG pictograms, geometric sliders, layer strips, and 3-tier STD/HIGH/ULTRA quality selector.
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
  private batteryBtn: HTMLButtonElement;
  private cfexpressBtn: HTMLButtonElement;
  private bionzBtn: HTMLButtonElement;
  private mishoeBtn: HTMLButtonElement;
  private micBtn: HTMLButtonElement;
  private sensorFabBtn: HTMLButtonElement;

  private lensSectionBar: HTMLElement;
  private lensSec1Btn: HTMLButtonElement;
  private lensSec2Btn: HTMLButtonElement;
  private lensSec3Btn: HTMLButtonElement;

  private v2PhaseBar: HTMLElement;
  private v1PhaseBtn: HTMLButtonElement;
  private v2PhaseBtn: HTMLButtonElement;

  private fabStageBar: HTMLElement;
  private fabVolBtns: Record<SensorFabVolume, HTMLButtonElement>;
  private fabStageGroups: Record<SensorFabVolume, HTMLElement>;
  private fabStageBtns: Record<SensorFabStage, HTMLButtonElement>;

  private qualityStdBtn: HTMLButtonElement;
  private qualityHighBtn: HTMLButtonElement;
  private qualityUltraBtn: HTMLButtonElement;

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
  private layerEyeMap = new Map<string, { btn: HTMLButtonElement; hidden: boolean }>();
  private renderedPartIds: string[] = [];
  private lastDelegatedHoverId: string | null = null;
  private prevSelectedRow: HTMLElement | null = null;
  private prevHoveredRow: HTMLElement | null = null;

  private currentMode: ScaleMode = 'integrated';
  private currentLensSection: LensSection = 1;
  private currentFabVolume: SensorFabVolume = 0;
  private currentFabStage: SensorFabStage = 'overview';
  private currentSectionAxis: SectionAxis = 'off';
  private currentRenderMode: RenderMode = 'solid';
  private currentQuality: GraphicsQuality = 'ultra';
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
    // 1A. Top-Right 3-Tier Graphics Quality Switcher Pill (STD / HIGH / ULTRA)
    // -----------------------------------------------------------------------
    const qualityCluster = document.createElement('div');
    qualityCluster.className = 'quality-cluster';
    qualityCluster.setAttribute('role', 'group');
    qualityCluster.setAttribute('aria-label', '画質設定');

    const makeQualityBtn = (q: GraphicsQuality, label: string, withStar = false): HTMLButtonElement => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = q === 'ultra' ? 'quality-btn is-ultra' : 'quality-btn';
      btn.dataset.quality = q;
      if (withStar) {
        btn.appendChild(svgIcon(ICONS.ultraRayStar));
      }
      const span = document.createElement('span');
      span.textContent = label;
      btn.appendChild(span);
      btn.addEventListener('click', () => this.setQuality(q));
      return btn;
    };

    this.qualityStdBtn = makeQualityBtn('standard', 'STD');
    this.qualityHighBtn = makeQualityBtn('high', 'HIGH');
    this.qualityUltraBtn = makeQualityBtn('ultra', 'ULTRA', true);
    this.qualityUltraBtn.classList.add('is-active');

    qualityCluster.append(this.qualityStdBtn, this.qualityHighBtn, this.qualityUltraBtn);
    this.root.appendChild(qualityCluster);

    // -----------------------------------------------------------------------
    // 1B. Top-Center 3-Section Lightweight GM Lens Switcher Pill (1: Rear, 2: Mid, 3: Front)
    //     Strictly Zero-Text SVG Icons; shown ONLY in standalone 'lens' mode!
    // -----------------------------------------------------------------------
    this.lensSectionBar = document.createElement('div');
    this.lensSectionBar.className = 'lens-section-bar is-hidden';

    this.lensSec1Btn = createIconButton(ICONS.lensSec1, 'lens-section-btn is-active', '0 0 46 24');
    this.lensSec1Btn.dataset.lensSection = '1';
    this.lensSec1Btn.setAttribute('aria-label', 'レンズ後部 1/3');

    this.lensSec2Btn = createIconButton(ICONS.lensSec2, 'lens-section-btn', '0 0 46 24');
    this.lensSec2Btn.dataset.lensSection = '2';
    this.lensSec2Btn.setAttribute('aria-label', 'レンズ中央部 2/3');

    this.lensSec3Btn = createIconButton(ICONS.lensSec3, 'lens-section-btn', '0 0 46 24');
    this.lensSec3Btn.dataset.lensSection = '3';
    this.lensSec3Btn.setAttribute('aria-label', 'レンズ前部 3/3');

    this.lensSec1Btn.addEventListener('click', () => this.setLensSection(1));
    this.lensSec2Btn.addEventListener('click', () => this.setLensSection(2));
    this.lensSec3Btn.addEventListener('click', () => this.setLensSection(3));

    this.lensSectionBar.append(this.lensSec1Btn, this.lensSec2Btn, this.lensSec3Btn);
    this.root.appendChild(this.lensSectionBar);

    // -----------------------------------------------------------------------
    // 1C. Top-Center [ V1 | V2 ] Ultra-Microscopic Dissection Switcher Pill
    //     Visible ONLY in Pixel ('micro' / 'micro_v2') and BIONZ XR ('bionz' / 'bionz_v2') modes!
    // -----------------------------------------------------------------------
    this.v2PhaseBar = document.createElement('div');
    this.v2PhaseBar.className = 'v2-phase-bar is-hidden';
    this.v2PhaseBar.setAttribute('role', 'group');
    this.v2PhaseBar.setAttribute('aria-label', '極超解剖 V1 / V2 切替');

    this.v1PhaseBtn = document.createElement('button');
    this.v1PhaseBtn.type = 'button';
    this.v1PhaseBtn.className = 'v2-phase-btn is-v1 is-active';
    this.v1PhaseBtn.dataset.phaseVersion = 'v1';
    this.v1PhaseBtn.setAttribute('aria-label', 'V1 個別解剖図');
    const v1Span = document.createElement('span');
    v1Span.textContent = 'V1';
    this.v1PhaseBtn.appendChild(v1Span);

    this.v2PhaseBtn = document.createElement('button');
    this.v2PhaseBtn.type = 'button';
    this.v2PhaseBtn.className = 'v2-phase-btn is-v2';
    this.v2PhaseBtn.dataset.phaseVersion = 'v2';
    this.v2PhaseBtn.setAttribute('aria-label', 'V2 さらに微細な部品極超解剖図');
    this.v2PhaseBtn.appendChild(svgIcon(ICONS.ultraRayStar));
    const v2Span = document.createElement('span');
    v2Span.textContent = 'V2';
    this.v2PhaseBtn.appendChild(v2Span);

    this.v1PhaseBtn.addEventListener('click', () => {
      if (this.currentMode === 'micro_v2') this.setMode('micro');
      else if (this.currentMode === 'bionz_v2') this.setMode('bionz');
    });
    this.v2PhaseBtn.addEventListener('click', () => {
      if (this.currentMode === 'micro') this.setMode('micro_v2');
      else if (this.currentMode === 'bionz') this.setMode('bionz_v2');
    });

    this.v2PhaseBar.append(this.v1PhaseBtn, this.v2PhaseBtn);
    this.root.appendChild(this.v2PhaseBar);

    // -----------------------------------------------------------------------
    // 1D. Top-Center Sensor Manufacturing Process Volume & Stage Navigator Pill
    //     Visible ONLY in standalone 'sensor_fab' mode!
    // -----------------------------------------------------------------------
    this.fabStageBar = document.createElement('div');
    this.fabStageBar.className = 'fab-stage-bar is-hidden';
    this.fabStageBar.setAttribute('role', 'group');
    this.fabStageBar.setAttribute('aria-label', 'センサー製造工程 巻・ステージ切替');

    const makeFabVolBtn = (vol: SensorFabVolume, label: string): HTMLButtonElement => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = vol === 0 ? 'fab-vol-btn is-active' : 'fab-vol-btn';
      btn.dataset.fabVol = String(vol);
      const span = document.createElement('span');
      span.textContent = label;
      btn.appendChild(span);
      btn.addEventListener('click', () => this.setFabVolume(vol));
      return btn;
    };

    const volGroup = document.createElement('div');
    volGroup.className = 'fab-vol-group';
    this.fabVolBtns = {
      0: makeFabVolBtn(0, '第0巻 総目次'),
      1: makeFabVolBtn(1, '第1巻 超入門'),
      2: makeFabVolBtn(2, '第2巻 砂→ウェーハ'),
    };
    volGroup.append(this.fabVolBtns[0], this.fabVolBtns[1], this.fabVolBtns[2]);

    const barDivider = document.createElement('div');
    barDivider.className = 'fab-stage-divider';

    const makeFabStageBtn = (stage: SensorFabStage, label: string): HTMLButtonElement => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        stage === 'overview' || stage === 'v1_overview' || stage === 'v2_overview'
          ? 'fab-stage-btn is-active'
          : 'fab-stage-btn';
      btn.dataset.fabStage = stage;
      const span = document.createElement('span');
      span.textContent = label;
      btn.appendChild(span);
      btn.addEventListener('click', () => this.setFabStage(stage));
      return btn;
    };

    this.fabStageBtns = {
      overview: makeFabStageBtn('overview', '全体'),
      phases: makeFabStageBtn('phases', 'P1–P12'),
      litho: makeFabStageBtn('litho', 'L01–L12'),
      variants: makeFabStageBtn('variants', '5方式比較'),
      v1_overview: makeFabStageBtn('v1_overview', '全体'),
      v1_photonics: makeFabStageBtn('v1_photonics', '1.光→写真'),
      v1_archs: makeFabStageBtn('v1_archs', '2.6大構造'),
      v1_duel: makeFabStageBtn('v1_duel', '3.Sony対Canon'),
      v1_wall: makeFabStageBtn('v1_wall', '4.露光の壁'),
      v2_overview: makeFabStageBtn('v2_overview', '全体'),
      v2_refine: makeFabStageBtn('v2_refine', '1A-B 11N精製'),
      v2_mcz: makeFabStageBtn('v2_mcz', '1C MCZ単結晶'),
      v2_wafer: makeFabStageBtn('v2_wafer', '1D-E 切断・CMP'),
      v2_epi_ship: makeFabStageBtn('v2_epi_ship', '1F-G ゲッタ・出荷'),
    };

    const vol0StageGroup = document.createElement('div');
    vol0StageGroup.className = 'fab-stage-group';
    vol0StageGroup.append(
      this.fabStageBtns.overview,
      this.fabStageBtns.phases,
      this.fabStageBtns.litho,
      this.fabStageBtns.variants
    );

    const vol1StageGroup = document.createElement('div');
    vol1StageGroup.className = 'fab-stage-group is-hidden';
    vol1StageGroup.append(
      this.fabStageBtns.v1_overview,
      this.fabStageBtns.v1_photonics,
      this.fabStageBtns.v1_archs,
      this.fabStageBtns.v1_duel,
      this.fabStageBtns.v1_wall
    );

    const vol2StageGroup = document.createElement('div');
    vol2StageGroup.className = 'fab-stage-group is-hidden';
    vol2StageGroup.append(
      this.fabStageBtns.v2_overview,
      this.fabStageBtns.v2_refine,
      this.fabStageBtns.v2_mcz,
      this.fabStageBtns.v2_wafer,
      this.fabStageBtns.v2_epi_ship
    );

    this.fabStageGroups = {
      0: vol0StageGroup,
      1: vol1StageGroup,
      2: vol2StageGroup,
    };

    this.fabStageBar.append(volGroup, barDivider, vol0StageGroup, vol1StageGroup, vol2StageGroup);
    this.root.appendChild(this.fabStageBar);

    // -----------------------------------------------------------------------
    // 2. Left Vertical Layer Dissection Strip (Single Event Delegation — 0 per-row closures!)
    // -----------------------------------------------------------------------
    this.layerRail = document.createElement('div');
    this.layerRail.className = 'layer-rail';
    this.layerRail.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const row = target.closest<HTMLElement>('.layer-item');
      const partId = row?.dataset.partId;
      if (!partId) return;
      if (target.closest('.layer-eye-btn')) {
        e.stopPropagation();
        this.handlers.onToggleHidePart(partId);
      } else {
        this.handlers.onSelectPart(partId);
      }
    });
    this.layerRail.addEventListener('pointerover', (e) => {
      const target = e.target as HTMLElement | null;
      const row = target?.closest<HTMLElement>('.layer-item');
      const partId = row?.dataset.partId ?? null;
      if (partId !== this.lastDelegatedHoverId) {
        this.lastDelegatedHoverId = partId;
        this.handlers.onHoverPart(partId);
      }
    });
    this.layerRail.addEventListener('pointerleave', () => {
      if (this.lastDelegatedHoverId !== null) {
        this.lastDelegatedHoverId = null;
        this.handlers.onHoverPart(null);
      }
    });
    this.root.appendChild(this.layerRail);

    // -----------------------------------------------------------------------
    // 3. Bottom Floating CAD Dock
    // -----------------------------------------------------------------------
    const dock = document.createElement('div');
    dock.className = 'cad-dock';

    // Group A: 17-Mode Architecture Switch
    // Primary 3 Views: [Complete Camera | Body All Only | Lens Standalone]
    // 7 Camera Subsystems: [Mount | Shutter | Sensor | Mainboard | EVF | LCD | Body Shell]
    // 6 Ultra-Dissection Standalone Views: [Micro Pixel | Battery Pack | CFexpress 4.0 | BIONZ XR Package | MI Shoe | Internal Mic]
    // Manufacturing Process Anatomy: [センサー製造工程 (Sensor Fab Vol.0 — 2,110-Step 3D CAD Map)]
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

    const ultraSep = document.createElement('div');
    ultraSep.className = 'cad-sub-divider';

    this.microBtn = createIconButton(ICONS.microPixel);
    this.microBtn.dataset.mode = 'micro';
    this.microBtn.setAttribute('aria-label', 'ピクセル個別超解剖');

    this.batteryBtn = createIconButton(ICONS.batteryPack);
    this.batteryBtn.dataset.mode = 'battery';
    this.batteryBtn.setAttribute('aria-label', 'バッテリーパック超解剖');

    this.cfexpressBtn = createIconButton(ICONS.cfexpressCard);
    this.cfexpressBtn.dataset.mode = 'cfexpress';
    this.cfexpressBtn.setAttribute('aria-label', 'CFexpressカード超解剖');

    this.bionzBtn = createIconButton(ICONS.bionzModule);
    this.bionzBtn.dataset.mode = 'bionz';
    this.bionzBtn.setAttribute('aria-label', 'BIONZ XRパッケージ内部超解剖');

    this.mishoeBtn = createIconButton(ICONS.miShoeModule);
    this.mishoeBtn.dataset.mode = 'mishoe';
    this.mishoeBtn.setAttribute('aria-label', 'MIシュー超解剖');

    this.micBtn = createIconButton(ICONS.micModule);
    this.micBtn.dataset.mode = 'mic';
    this.micBtn.setAttribute('aria-label', '内蔵マイク超解剖');

    const fabSep = document.createElement('div');
    fabSep.className = 'cad-sub-divider';

    this.sensorFabBtn = document.createElement('button');
    this.sensorFabBtn.type = 'button';
    this.sensorFabBtn.className = 'icon-btn is-fab-pill';
    this.sensorFabBtn.dataset.mode = 'sensor_fab';
    this.sensorFabBtn.setAttribute('aria-label', 'センサー製造工程');
    this.sensorFabBtn.title = 'センサー製造工程（第0巻：全2,110工程 3D CAD解剖図）';
    this.sensorFabBtn.appendChild(svgIcon(ICONS.sensorFab));
    const fabLabel = document.createElement('span');
    fabLabel.textContent = 'センサー製造工程';
    this.sensorFabBtn.appendChild(fabLabel);

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
    this.batteryBtn.addEventListener('click', () => this.setMode('battery'));
    this.cfexpressBtn.addEventListener('click', () => this.setMode('cfexpress'));
    this.bionzBtn.addEventListener('click', () => this.setMode('bionz'));
    this.mishoeBtn.addEventListener('click', () => this.setMode('mishoe'));
    this.micBtn.addEventListener('click', () => this.setMode('mic'));
    this.sensorFabBtn.addEventListener('click', () => this.setMode('sensor_fab'));
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
      ultraSep,
      this.microBtn,
      this.batteryBtn,
      this.cfexpressBtn,
      this.bionzBtn,
      this.mishoeBtn,
      this.micBtn,
      fabSep,
      this.sensorFabBtn
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

  private isV2CapableMode(mode: ScaleMode): boolean {
    return mode === 'micro' || mode === 'micro_v2' || mode === 'bionz' || mode === 'bionz_v2';
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
    this.microBtn.classList.toggle('is-active', mode === 'micro' || mode === 'micro_v2');
    this.batteryBtn.classList.toggle('is-active', mode === 'battery');
    this.cfexpressBtn.classList.toggle('is-active', mode === 'cfexpress');
    this.bionzBtn.classList.toggle('is-active', mode === 'bionz' || mode === 'bionz_v2');
    this.mishoeBtn.classList.toggle('is-active', mode === 'mishoe');
    this.micBtn.classList.toggle('is-active', mode === 'mic');
    this.sensorFabBtn.classList.toggle('is-active', mode === 'sensor_fab');
    this.lensSectionBar.classList.toggle('is-hidden', mode !== 'lens');
    this.fabStageBar.classList.toggle('is-hidden', mode !== 'sensor_fab');

    const showV2Bar = this.isV2CapableMode(mode);
    this.v2PhaseBar.classList.toggle('is-hidden', !showV2Bar);
    if (showV2Bar) {
      const isV2 = mode === 'micro_v2' || mode === 'bionz_v2';
      const isMicroFamily = mode === 'micro' || mode === 'micro_v2';
      this.v2PhaseBar.dataset.phaseFamily = isMicroFamily ? 'micro' : 'bionz';
      this.v1PhaseBtn.classList.toggle('is-active', !isV2);
      this.v2PhaseBtn.classList.toggle('is-active', isV2);
      this.v1PhaseBtn.setAttribute(
        'aria-label',
        isMicroFamily ? 'V1 ピクセル配列図' : 'V1 BIONZ XR パッケージ図'
      );
      this.v2PhaseBtn.setAttribute(
        'aria-label',
        isMicroFamily ? 'V2 ピクセル原子・量子極超解剖図' : 'V2 BIONZ XR 2nm GAA極超解剖図'
      );
    }
  }

  private applyFabVolumeButtons(vol: SensorFabVolume): void {
    ([0, 1, 2] as SensorFabVolume[]).forEach((v) => {
      this.fabVolBtns[v].classList.toggle('is-active', v === vol);
      this.fabStageGroups[v].classList.toggle('is-hidden', v !== vol);
    });
  }

  private applyFabStageButtons(stage: SensorFabStage): void {
    (Object.keys(this.fabStageBtns) as SensorFabStage[]).forEach((key) => {
      this.fabStageBtns[key].classList.toggle('is-active', key === stage);
    });
  }

  private setFabVolume(vol: SensorFabVolume): void {
    const changed = this.currentFabVolume !== vol;
    this.currentFabVolume = vol;
    this.currentFabStage = vol === 0 ? 'overview' : vol === 1 ? 'v1_overview' : 'v2_overview';
    this.applyFabVolumeButtons(vol);
    this.applyFabStageButtons(this.currentFabStage);
    if (changed || this.currentMode === 'sensor_fab') {
      this.handlers.onSensorFabVolumeChange(vol);
    }
  }

  public syncFabVolume(vol: SensorFabVolume): void {
    this.currentFabVolume = vol;
    this.applyFabVolumeButtons(vol);
  }

  private setFabStage(stage: SensorFabStage): void {
    this.currentFabStage = stage;
    this.applyFabStageButtons(stage);
    this.handlers.onSensorFabStageChange(stage);
  }

  public syncFabStage(stage: SensorFabStage): void {
    this.currentFabStage = stage;
    this.applyFabStageButtons(stage);
  }

  private applyLensSectionButtons(section: LensSection): void {
    this.lensSec1Btn.classList.toggle('is-active', section === 1);
    this.lensSec2Btn.classList.toggle('is-active', section === 2);
    this.lensSec3Btn.classList.toggle('is-active', section === 3);
  }

  private setLensSection(section: LensSection): void {
    if (this.currentLensSection === section && this.currentMode === 'lens') return;
    this.currentLensSection = section;
    this.applyLensSectionButtons(section);
    this.handlers.onLensSectionChange(section);
  }

  public syncLensSection(section: LensSection): void {
    this.currentLensSection = section;
    this.applyLensSectionButtons(section);
  }

  private setMode(mode: ScaleMode): void {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    if (mode === 'lens') {
      // Entering standalone lens always starts on Section 1 (Rear-most 1/3 block)
      this.currentLensSection = 1;
      this.applyLensSectionButtons(1);
    } else if (mode === 'sensor_fab') {
      this.currentFabStage =
        this.currentFabVolume === 0
          ? 'overview'
          : this.currentFabVolume === 1
            ? 'v1_overview'
            : 'v2_overview';
      this.applyFabVolumeButtons(this.currentFabVolume);
      this.applyFabStageButtons(this.currentFabStage);
    }
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

  private applyQualityButtons(quality: GraphicsQuality): void {
    this.qualityStdBtn.classList.toggle('is-active', quality === 'standard');
    this.qualityHighBtn.classList.toggle('is-active', quality === 'high');
    this.qualityUltraBtn.classList.toggle('is-active', quality === 'ultra');
  }

  private setQuality(quality: GraphicsQuality): void {
    if (this.currentQuality === quality) return;
    this.currentQuality = quality;
    this.applyQualityButtons(quality);
    this.handlers.onQualityChange(quality);
  }

  public syncQuality(quality: GraphicsQuality): void {
    this.currentQuality = quality;
    this.applyQualityButtons(quality);
  }

  public setExplodeValue(v: number): void {
    this.explodeRange.value = String(Math.round(v * 1000));
    this.updateExplodeButtons(v);
  }

  public syncMode(mode: ScaleMode): void {
    this.currentMode = mode;
    if (mode === 'lens') {
      this.applyLensSectionButtons(this.currentLensSection);
    } else if (mode === 'sensor_fab') {
      this.applyFabVolumeButtons(this.currentFabVolume);
      this.applyFabStageButtons(this.currentFabStage);
      this.sensorFabBtn.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
    }
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
    this.lensSectionBar.classList.toggle('is-hidden', active || this.currentMode !== 'lens');
    this.v2PhaseBar.classList.toggle('is-hidden', active || !this.isV2CapableMode(this.currentMode));
    this.fabStageBar.classList.toggle('is-hidden', active || this.currentMode !== 'sensor_fab');
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
    this.resetVisBtn.disabled = !hasAnyHidden;

    // Fast incremental DOM diff: if the exact part list is already mounted, patch classes & eye icon in-place!
    let sameList = parts.length === this.renderedPartIds.length;
    if (sameList) {
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].id !== this.renderedPartIds[i]) {
          sameList = false;
          break;
        }
      }
    }

    if (sameList) {
      let selectedRowEl: HTMLElement | null = null;
      let hoveredRowEl: HTMLElement | null = null;
      for (let i = 0; i < parts.length; i++) {
        const id = parts[i].id;
        const row = this.layerRowMap.get(id);
        if (!row) continue;
        const hidden = isHidden(id);
        const isSel = id === selectedId;
        const isHov = id === hoveredId;
        row.classList.toggle('is-selected', isSel);
        row.classList.toggle('is-hovered', isHov);
        row.classList.toggle('is-hidden', hidden);
        if (isSel) selectedRowEl = row;
        if (isHov) hoveredRowEl = row;

        const eye = this.layerEyeMap.get(id);
        if (eye && eye.hidden !== hidden) {
          eye.hidden = hidden;
          eye.btn.replaceChildren(svgIcon(hidden ? ICONS.eyeClosed : ICONS.eyeAll));
        }
      }
      this.prevSelectedRow = selectedRowEl;
      this.prevHoveredRow = hoveredRowEl;
      if (selectedRowEl) {
        selectedRowEl.scrollIntoView({ block: 'nearest' });
      }
      return;
    }

    this.layerRowMap.clear();
    this.layerEyeMap.clear();
    this.prevSelectedRow = null;
    this.prevHoveredRow = null;
    this.renderedPartIds = parts.map((p) => p.id);
    const frag = document.createDocumentFragment();

    let prevSubsystem: CadPart['subsystem'] | null = null;
    let prevStandaloneOnly = false;
    let selectedRowEl: HTMLElement | null = null;
    let hoveredRowEl: HTMLElement | null = null;

    parts.forEach((part) => {
      const isStandaloneOnly = Boolean(part.standaloneOnly);
      if (
        (prevSubsystem && prevSubsystem !== part.subsystem) ||
        (prevSubsystem === part.subsystem && !prevStandaloneOnly && isStandaloneOnly) ||
        (prevSubsystem === 'sensor_fab' &&
          part.subsystem === 'sensor_fab' &&
          ((part.fabVolume ?? 0) === 2
            ? part.order === 3 ||
              part.order === 7 ||
              part.order === 12 ||
              part.order === 18 ||
              part.order === 22 ||
              part.order === 27 ||
              part.order === 32
            : (part.fabVolume ?? 0) === 1
              ? part.order === 3 || part.order === 10 || part.order === 17 || part.order === 24
              : part.order === 4 || part.order === 16 || part.order === 28))
      ) {
        const sep = document.createElement('div');
        sep.className = 'layer-sep';
        frag.appendChild(sep);
      }
      prevSubsystem = part.subsystem;
      prevStandaloneOnly = isStandaloneOnly;

      const row = document.createElement('div');
      row.className = 'layer-item';
      row.dataset.partId = part.id;
      const hidden = isHidden(part.id);
      if (part.id === selectedId) {
        row.classList.add('is-selected');
        selectedRowEl = row;
      }
      if (part.id === hoveredId) {
        row.classList.add('is-hovered');
        hoveredRowEl = row;
      }
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
          part.order === 62 ||
          part.order === 69 ||
          part.order === 70 ||
          part.order === 76 ||
          part.order === 77 ||
          part.order === 88 ||
          part.order === 92 ||
          part.order === 97 ||
          part.order === 98
            ? 32
            : part.order === 8 ||
                part.order === 10 ||
                part.order === 16 ||
                part.order === 21 ||
                part.order === 24 ||
                part.order === 26 ||
                part.order === 35 ||
                part.order === 40 ||
                part.order === 53 ||
                part.order === 63 ||
                part.order === 66 ||
                part.order === 75 ||
                part.order === 78 ||
                part.order === 81 ||
                part.order === 83 ||
                part.order === 84 ||
                part.order === 86 ||
                part.order === 89 ||
                part.order === 90 ||
                part.order === 95 ||
                part.order === 96
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
                  part.order === 54 ||
                  part.order === 64 ||
                  part.order === 67 ||
                  part.order === 71 ||
                  part.order === 74 ||
                  part.order >= 75
                ? 21
                : 16;
      } else if (part.subsystem === 'lcd') {
        widthPx =
          part.order === 1 ||
          part.order === 4 ||
          part.order === 9 ||
          part.order === 14 ||
          part.order === 16 ||
          part.order === 18 ||
          part.order === 22 ||
          part.order === 29 ||
          part.order === 33 ||
          part.order === 36 ||
          part.order === 38 ||
          part.order === 42 ||
          part.order === 43 ||
          part.order === 47
            ? 30
            : part.order === 2 ||
                part.order === 6 ||
                part.order === 10 ||
                part.order === 11 ||
                part.order === 17 ||
                part.order === 21 ||
                part.order === 23 ||
                part.order === 27 ||
                part.order === 28 ||
                part.order === 31 ||
                part.order === 32 ||
                part.order === 34 ||
                part.order === 37 ||
                part.order === 39 ||
                part.order === 40 ||
                part.order === 41 ||
                part.order === 44 ||
                part.order === 48 ||
                part.order === 50 ||
                part.order === 51
              ? 24
              : 18;
      } else if (part.subsystem === 'body') {
        widthPx =
          part.order === 3 ||
          part.order === 7 ||
          part.order === 8 ||
          part.order === 9 ||
          part.order === 12 ||
          part.order === 26 ||
          part.order === 29 ||
          part.order === 33 ||
          part.order === 35 ||
          part.order === 38 ||
          part.order === 39 ||
          part.order === 40 ||
          part.order === 45 ||
          part.order === 51 ||
          part.order === 64 ||
          part.order === 68 ||
          part.order === 71 ||
          part.order === 74 ||
          part.order === 79 ||
          part.order === 80 ||
          part.order === 82 ||
          part.order === 88 ||
          part.order === 93 ||
          part.order === 97 ||
          part.order === 100 ||
          part.order === 101 ||
          part.order === 104 ||
          part.order === 106 ||
          part.order === 107 ||
          part.order === 108 ||
          part.order === 109 ||
          part.order === 111 ||
          part.order === 112
            ? 32
            : part.order === 1 ||
                part.order === 5 ||
                part.order === 6 ||
                part.order === 14 ||
                part.order === 16 ||
                part.order === 17 ||
                part.order === 18 ||
                part.order === 20 ||
                part.order === 27 ||
                part.order === 34 ||
                part.order === 37 ||
                part.order === 41 ||
                part.order === 42 ||
                part.order === 44 ||
                part.order === 48 ||
                part.order === 53 ||
                part.order === 54 ||
                part.order === 57 ||
                part.order === 60 ||
                part.order === 61 ||
                part.order === 62 ||
                part.order === 65 ||
                part.order === 67 ||
                part.order === 69 ||
                part.order === 72 ||
                part.order === 75 ||
                part.order === 77 ||
                part.order === 81 ||
                part.order === 84 ||
                part.order === 85 ||
                part.order === 86 ||
                part.order === 89 ||
                part.order === 90 ||
                part.order === 92 ||
                part.order === 94 ||
                part.order === 95 ||
                part.order === 96 ||
                part.order === 98 ||
                part.order === 102 ||
                part.order === 103 ||
                part.order === 105 ||
                part.order === 110 ||
                part.order === 113 ||
                part.order === 115 ||
                part.order === 116
              ? 25
              : part.order >= 39
                ? 19
                : 18;
      } else if (part.subsystem === 'mount') {
        widthPx =
          part.order === 1 ||
          part.order === 11 ||
          part.order === 12 ||
          part.order === 13 ||
          part.order === 18 ||
          part.order === 22 ||
          part.order === 24 ||
          part.order === 27 ||
          part.order === 32 ||
          part.order === 36 ||
          part.order === 42 ||
          part.order === 43 ||
          part.order === 45 ||
          part.order === 48 ||
          part.order === 50 ||
          part.order === 52 ||
          part.order === 53 ||
          part.order === 56
            ? 32
            : part.order === 3 ||
                part.order === 4 ||
                part.order === 5 ||
                part.order === 9 ||
                part.order === 10 ||
                part.order === 15 ||
                part.order === 17 ||
                part.order === 20 ||
                part.order === 23 ||
                part.order === 26 ||
                part.order === 29 ||
                part.order === 31 ||
                part.order === 33 ||
                part.order === 37 ||
                part.order === 40 ||
                part.order === 44 ||
                part.order === 46 ||
                part.order === 49 ||
                part.order === 51 ||
                part.order === 55 ||
                part.order === 58 ||
                part.order === 59
              ? 25
              : part.order >= 27
                ? 19
                : 18;
      } else if (part.subsystem === 'evf') {
        widthPx =
          part.order === 1 ||
          part.order === 14 ||
          part.order === 18 ||
          part.order === 19 ||
          part.order === 23 ||
          part.order === 27 ||
          part.order === 32 ||
          part.order === 39 ||
          part.order === 40 ||
          part.order === 48 ||
          part.order === 52
            ? 32
            : part.order === 6 ||
                part.order === 8 ||
                part.order === 9 ||
                part.order === 11 ||
                part.order === 12 ||
                part.order === 16 ||
                part.order === 22 ||
                part.order === 24 ||
                part.order === 26 ||
                part.order === 29 ||
                part.order === 33 ||
                part.order === 35 ||
                part.order === 38 ||
                part.order === 42 ||
                part.order === 44 ||
                part.order === 47 ||
                part.order === 50 ||
                part.order === 54
              ? 26
              : part.order === 2 ||
                  part.order === 3 ||
                  part.order === 10 ||
                  part.order === 13 ||
                  part.order === 15 ||
                  part.order === 17 ||
                  part.order === 20 ||
                  part.order === 21 ||
                  part.order === 25 ||
                  part.order === 28 ||
                  part.order === 31 ||
                  part.order >= 32
                ? 21
                : 17;
      } else if (part.subsystem === 'mainboard') {
        widthPx =
          part.order === 14 ||
          part.order === 16 ||
          part.order === 18 ||
          part.order === 29 ||
          part.order === 31 ||
          part.order === 32 ||
          part.order === 39 ||
          part.order === 45
            ? 32
            : part.order === 1 ||
                part.order === 2 ||
                part.order === 17 ||
                part.order === 19 ||
                part.order === 20 ||
                part.order === 27 ||
                part.order === 33 ||
                part.order === 34 ||
                part.order === 36 ||
                part.order === 38 ||
                part.order === 40 ||
                part.order === 42 ||
                part.order === 47 ||
                part.order === 49 ||
                part.order === 52
              ? 27
              : part.order === 4 ||
                  part.order === 6 ||
                  part.order === 9 ||
                  part.order === 12 ||
                  part.order === 21 ||
                  part.order === 26 ||
                  part.order === 28 ||
                  part.order === 30 ||
                  part.order >= 31
                ? 22
                : 17;
      } else if (part.subsystem === 'shutter') {
        widthPx =
          part.order === 1 ||
          part.order === 25 ||
          part.order === 26 ||
          part.order === 27 ||
          part.order === 33 ||
          part.order === 38 ||
          part.order === 40 ||
          part.order === 43 ||
          part.order === 49 ||
          part.order === 51 ||
          part.order === 60 ||
          part.order === 66 ||
          part.order === 73 ||
          part.order === 74 ||
          part.order === 75
            ? 32
            : part.order === 4 ||
                part.order === 8 ||
                part.order === 12 ||
                part.order === 14 ||
                part.order === 16 ||
                part.order === 20 ||
                part.order === 29 ||
                part.order === 32 ||
                part.order === 34 ||
                part.order === 36 ||
                part.order === 41 ||
                part.order === 44 ||
                part.order === 46 ||
                part.order === 50 ||
                part.order === 54 ||
                part.order === 56 ||
                part.order === 59 ||
                part.order === 61 ||
                part.order === 65 ||
                part.order === 68 ||
                part.order === 69 ||
                part.order === 71 ||
                part.order === 76
              ? 26
              : part.order === 2 ||
                  part.order === 5 ||
                  part.order === 9 ||
                  part.order === 13 ||
                  part.order === 15 ||
                  part.order === 17 ||
                  part.order === 22 ||
                  part.order === 24 ||
                  part.order === 28 ||
                  part.order === 30 ||
                  part.order === 31 ||
                  part.order === 35 ||
                  part.order === 37 ||
                  part.order === 39 ||
                  part.order === 42 ||
                  part.order === 45 ||
                  part.order === 47 ||
                  part.order === 52 ||
                  part.order === 55 ||
                  part.order >= 58
                ? 21
                : 16;
      } else if (part.subsystem === 'sensor') {
        if (part.order <= 40) {
          const ratio = (part.order - 1) / 39;
          widthPx = Math.round(14 + Math.sin(ratio * Math.PI * 0.85) * 10 + (part.order >= 18 ? 8 : 0));
        } else {
          // Phase 14 (S41–S64) + Phase 19C (S65–S70) + Phase 25A (S71–S90) standalone sensor/IBIS parts
          widthPx =
            part.order === 41 ||
            part.order === 47 ||
            part.order === 50 ||
            part.order === 53 ||
            part.order === 58 ||
            part.order === 60 ||
            part.order === 64 ||
            part.order === 71 ||
            part.order === 72 ||
            part.order === 73 ||
            part.order === 75 ||
            part.order === 76 ||
            part.order === 83 ||
            part.order === 86 ||
            part.order === 88
              ? 30
              : part.order === 43 ||
                  part.order === 44 ||
                  part.order === 48 ||
                  part.order === 49 ||
                  part.order === 51 ||
                  part.order === 52 ||
                  part.order === 54 ||
                  part.order === 55 ||
                  part.order === 56 ||
                  part.order === 59 ||
                  part.order === 74 ||
                  part.order === 77 ||
                  part.order === 79 ||
                  part.order === 81 ||
                  part.order === 82 ||
                  part.order === 85 ||
                  part.order === 87 ||
                  part.order === 90
                ? 24
                : 18;
        }
      } else if (part.subsystem === 'battery') {
        // Standalone NP-FZ100 & 2026 Silicon-Carbon Battery Pack Ultra-Dissection (P01–P100)
        widthPx =
          part.order === 1 ||
          part.order === 4 ||
          part.order === 6 ||
          part.order === 7 ||
          part.order === 9 ||
          part.order === 17 ||
          part.order === 19 ||
          part.order === 22 ||
          part.order === 23 ||
          part.order === 24 ||
          part.order === 28 ||
          part.order === 36 ||
          part.order === 45 ||
          part.order === 46 ||
          part.order === 47 ||
          part.order === 56 ||
          part.order === 59 ||
          part.order === 71 ||
          part.order === 72 ||
          part.order === 73 ||
          part.order === 78 ||
          part.order === 80 ||
          part.order === 85 ||
          part.order === 91 ||
          part.order === 93 ||
          part.order === 97 ||
          part.order === 100
            ? 32
            : part.order === 2 ||
                part.order === 8 ||
                part.order === 11 ||
                part.order === 12 ||
                part.order === 13 ||
                part.order === 14 ||
                part.order === 20 ||
                part.order === 21 ||
                part.order === 25 ||
                part.order === 29 ||
                part.order === 30 ||
                part.order === 31 ||
                part.order === 37 ||
                part.order === 39 ||
                part.order === 41 ||
                part.order === 50 ||
                part.order === 52 ||
                part.order === 53 ||
                part.order === 57 ||
                part.order === 58 ||
                part.order === 61 ||
                part.order === 64 ||
                part.order === 66 ||
                part.order === 68 ||
                part.order === 74 ||
                part.order === 75 ||
                part.order === 76 ||
                part.order === 79 ||
                part.order === 82 ||
                part.order === 84 ||
                part.order === 87 ||
                part.order === 89 ||
                part.order === 92 ||
                part.order === 94 ||
                part.order === 96 ||
                part.order === 98 ||
                part.order === 99
              ? 25
              : 19;
      } else if (part.subsystem === 'cfexpress') {
        widthPx =
          part.order === 1 ||
          part.order === 3 ||
          part.order === 5 ||
          part.order === 7 ||
          part.order === 8 ||
          part.order === 10 ||
          part.order === 12 ||
          part.order === 14 ||
          part.order === 15 ||
          part.order === 16 ||
          part.order === 25 ||
          part.order === 32 ||
          part.order === 36 ||
          part.order === 38 ||
          part.order === 48 ||
          part.order === 50 ||
          part.order === 54 ||
          part.order === 56 ||
          part.order === 57 ||
          part.order === 61 ||
          part.order === 63 ||
          part.order === 64 ||
          part.order === 70 ||
          part.order === 78 ||
          part.order === 79 ||
          part.order === 80 ||
          part.order === 81 ||
          part.order === 86 ||
          part.order === 88 ||
          part.order === 89 ||
          part.order === 92 ||
          part.order === 93 ||
          part.order === 99 ||
          part.order === 100 ||
          part.order === 101 ||
          part.order === 103 ||
          part.order === 106 ||
          part.order === 108 ||
          part.order === 109 ||
          part.order === 112 ||
          part.order === 115 ||
          part.order === 118 ||
          part.order === 122 ||
          part.order === 125 ||
          part.order === 126 ||
          part.order === 128 ||
          part.order === 130
            ? 32
            : part.order === 2 ||
                part.order === 4 ||
                part.order === 9 ||
                part.order === 13 ||
                part.order === 17 ||
                part.order === 19 ||
                part.order === 20 ||
                part.order === 21 ||
                part.order === 24 ||
                part.order === 26 ||
                part.order === 28 ||
                part.order === 29 ||
                part.order === 34 ||
                part.order === 35 ||
                part.order === 39 ||
                part.order === 40 ||
                part.order === 42 ||
                part.order === 43 ||
                part.order === 49 ||
                part.order === 51 ||
                part.order === 52 ||
                part.order === 53 ||
                part.order === 55 ||
                part.order === 58 ||
                part.order === 59 ||
                part.order === 60 ||
                part.order === 62 ||
                part.order === 65 ||
                part.order === 66 ||
                part.order === 67 ||
                part.order === 68 ||
                part.order === 69 ||
                part.order === 71 ||
                part.order === 72 ||
                part.order === 73 ||
                part.order === 74 ||
                part.order === 75 ||
                part.order === 82 ||
                part.order === 83 ||
                part.order === 84 ||
                part.order === 90 ||
                part.order === 91 ||
                part.order === 94 ||
                part.order === 95 ||
                part.order === 96 ||
                part.order === 102 ||
                part.order === 104 ||
                part.order === 105 ||
                part.order === 107 ||
                part.order === 110 ||
                part.order === 111 ||
                part.order === 113 ||
                part.order === 116 ||
                part.order === 117 ||
                part.order === 119 ||
                part.order === 121 ||
                part.order === 123 ||
                part.order === 124 ||
                part.order === 127 ||
                part.order === 129
              ? 25
              : 19;
      } else if (part.subsystem === 'bionz') {
        // BIONZ XR / XR2 Package Internal Ultra-Dissection (XR01–XR36)
        widthPx =
          part.order === 1 ||
          part.order === 2 ||
          part.order === 4 ||
          part.order === 9 ||
          part.order === 14 ||
          part.order === 28 ||
          part.order === 33 ||
          part.order === 36
            ? 32
            : part.order === 5 ||
                part.order === 7 ||
                part.order === 10 ||
                part.order === 11 ||
                part.order === 15 ||
                part.order === 16 ||
                part.order === 17 ||
                part.order === 20 ||
                part.order === 26 ||
                part.order === 27 ||
                part.order === 30 ||
                part.order === 34
              ? 25
              : 18;
      } else if (part.subsystem === 'mishoe') {
        // Sony Multi Interface (MI) Shoe Ultra-Dissection (MI01–MI32)
        widthPx =
          part.order === 1 ||
          part.order === 3 ||
          part.order === 10 ||
          part.order === 11 ||
          part.order === 15 ||
          part.order === 18 ||
          part.order === 22 ||
          part.order === 24 ||
          part.order === 25 ||
          part.order === 32
            ? 32
            : part.order === 2 ||
                part.order === 7 ||
                part.order === 12 ||
                part.order === 13 ||
                part.order === 19 ||
                part.order === 21 ||
                part.order === 23 ||
                part.order === 27 ||
                part.order === 28 ||
                part.order === 30
              ? 25
              : 18;
      } else if (part.subsystem === 'mic') {
        // Internal Stereo / 3-Capsule MEMS, ECM & 2026 Optical MEMS Microphone Ultra-Dissection (MC01–MC80)
        widthPx =
          part.order === 1 ||
          part.order === 2 ||
          part.order === 4 ||
          part.order === 8 ||
          part.order === 13 ||
          part.order === 14 ||
          part.order === 17 ||
          part.order === 21 ||
          part.order === 22 ||
          part.order === 26 ||
          part.order === 27 ||
          part.order === 29 ||
          part.order === 32 ||
          part.order === 34 ||
          part.order === 35 ||
          part.order === 47 ||
          part.order === 53 ||
          part.order === 55 ||
          part.order === 56 ||
          part.order === 58 ||
          part.order === 60 ||
          part.order === 62 ||
          part.order === 63 ||
          part.order === 71 ||
          part.order === 75 ||
          part.order === 78 ||
          part.order === 80
            ? 32
            : part.order === 3 ||
                part.order === 5 ||
                part.order === 6 ||
                part.order === 9 ||
                part.order === 16 ||
                part.order === 18 ||
                part.order === 19 ||
                part.order === 23 ||
                part.order === 25 ||
                part.order === 30 ||
                part.order === 31 ||
                part.order === 36 ||
                part.order === 37 ||
                part.order === 38 ||
                part.order === 40 ||
                part.order === 42 ||
                part.order === 43 ||
                part.order === 45 ||
                part.order === 46 ||
                part.order === 50 ||
                part.order === 52 ||
                part.order === 54 ||
                part.order === 57 ||
                part.order === 59 ||
                part.order === 61 ||
                part.order === 65 ||
                part.order === 67 ||
                part.order === 69 ||
                part.order === 72 ||
                part.order === 76 ||
                part.order === 77 ||
                part.order === 79
              ? 25
              : 18;
      } else if (part.subsystem === 'micro_v2') {
        // Pixel V2 Ultra-Microscopic Atomic & 2026 Quantum Dissection (55 parts: P2-01–P2-55)
        widthPx =
          part.order === 1 ||
          part.order === 2 ||
          part.order === 7 ||
          part.order === 9 ||
          part.order === 13 ||
          part.order === 16 ||
          part.order === 19 ||
          part.order === 23 ||
          part.order === 24 ||
          part.order === 26 ||
          part.order === 30 ||
          part.order === 31 ||
          part.order === 37 ||
          part.order === 38 ||
          part.order === 42 ||
          part.order === 45 ||
          part.order === 46 ||
          part.order === 49 ||
          part.order === 54
            ? 32
            : part.order === 3 ||
                part.order === 5 ||
                part.order === 8 ||
                part.order === 10 ||
                part.order === 12 ||
                part.order === 14 ||
                part.order === 17 ||
                part.order === 20 ||
                part.order === 22 ||
                part.order === 25 ||
                part.order === 27 ||
                part.order === 29 ||
                part.order === 32 ||
                part.order === 34 ||
                part.order === 36 ||
                part.order === 39 ||
                part.order === 41 ||
                part.order === 44 ||
                part.order === 48 ||
                part.order === 51 ||
                part.order === 52 ||
                part.order === 55
              ? 25
              : 19;
      } else if (part.subsystem === 'bionz_v2') {
        // BIONZ XR / XR2 V2 Ultra-Microscopic 2nm GAA / A16 BSPDN / Ångström Dissection (55 parts: X2-01–X2-55)
        widthPx =
          part.order === 1 ||
          part.order === 3 ||
          part.order === 4 ||
          part.order === 7 ||
          part.order === 12 ||
          part.order === 13 ||
          part.order === 16 ||
          part.order === 18 ||
          part.order === 20 ||
          part.order === 26 ||
          part.order === 27 ||
          part.order === 30 ||
          part.order === 31 ||
          part.order === 33 ||
          part.order === 37 ||
          part.order === 38 ||
          part.order === 39 ||
          part.order === 40 ||
          part.order === 45 ||
          part.order === 50 ||
          part.order === 52 ||
          part.order === 55
            ? 32
            : part.order === 2 ||
                part.order === 5 ||
                part.order === 6 ||
                part.order === 8 ||
                part.order === 10 ||
                part.order === 14 ||
                part.order === 15 ||
                part.order === 17 ||
                part.order === 19 ||
                part.order === 21 ||
                part.order === 24 ||
                part.order === 25 ||
                part.order === 28 ||
                part.order === 29 ||
                part.order === 32 ||
                part.order === 34 ||
                part.order === 35 ||
                part.order === 36 ||
                part.order === 44 ||
                part.order === 46 ||
                part.order === 47 ||
                part.order === 48 ||
                part.order === 49 ||
                part.order === 51 ||
                part.order === 53
              ? 25
              : 19;
      } else if (part.subsystem === 'sensor_fab') {
        if ((part.fabVolume ?? 0) === 2) {
          // Sensor Manufacturing Process Vol.2 (36 parts: F2-01–F2-36, Phase 1 Sand-to-Epi-Wafer)
          widthPx =
            part.order === 1 ||
            part.order === 5 ||
            part.order === 8 ||
            part.order === 10 ||
            part.order === 12 ||
            part.order === 14 ||
            part.order === 16 ||
            part.order === 20 ||
            part.order === 24 ||
            part.order === 25 ||
            part.order === 28 ||
            part.order === 29 ||
            part.order === 30 ||
            part.order === 32 ||
            part.order === 35 ||
            part.order === 36
              ? 32
              : part.order === 2 ||
                  part.order === 3 ||
                  part.order === 7 ||
                  part.order === 11 ||
                  part.order === 15 ||
                  part.order === 19 ||
                  part.order === 23 ||
                  part.order === 26 ||
                  part.order === 31 ||
                  part.order === 33 ||
                  part.order === 34
                ? 25
                : 19;
        } else {
          // Sensor Manufacturing Process Vol.0 & Vol.1 (32 parts each)
          widthPx =
            part.order === 1 ||
            part.order === 3 ||
            part.order === 6 ||
            part.order === 8 ||
            part.order === 9 ||
            part.order === 14 ||
            part.order === 15 ||
            part.order === 20 ||
            part.order === 23 ||
            part.order === 24 ||
            part.order === 31 ||
            part.order === 32
              ? 32
              : part.order === 2 ||
                  part.order === 4 ||
                  part.order === 5 ||
                  part.order === 7 ||
                  part.order === 10 ||
                  part.order === 12 ||
                  part.order === 27 ||
                  part.order === 29 ||
                  part.order === 30
                ? 25
                : 19;
        }
      } else {
        // Micro pixel cross-section (15 core M01–M15 + 60 standalone-only ultra-nano M16–M75)
        if (part.order <= 15) {
          const ratio = (part.order - 1) / 14;
          widthPx = Math.round(17 + Math.sin(ratio * Math.PI) * 13);
        } else if (
          part.order === 16 ||
          part.order === 21 ||
          part.order === 23 ||
          part.order === 26 ||
          part.order === 29 ||
          part.order === 31 ||
          part.order === 36 ||
          part.order === 37 ||
          part.order === 39 ||
          part.order === 46 ||
          part.order === 50 ||
          part.order === 51 ||
          part.order === 56 ||
          part.order === 59 ||
          part.order === 62 ||
          part.order === 66 ||
          part.order === 70 ||
          part.order === 71 ||
          part.order === 73
        ) {
          widthPx = 30;
        } else {
          const ratio = ((part.order - 16) % 12) / 11;
          widthPx = Math.round(18 + Math.sin(ratio * Math.PI) * 8);
        }
      }
      bar.style.width = `${widthPx}px`;

      const eyeBtn = document.createElement('button');
      eyeBtn.type = 'button';
      eyeBtn.className = 'layer-eye-btn';
      eyeBtn.appendChild(svgIcon(hidden ? ICONS.eyeClosed : ICONS.eyeAll));

      row.append(swatch, bar, eyeBtn);
      frag.appendChild(row);
      this.layerRowMap.set(part.id, row);
      this.layerEyeMap.set(part.id, { btn: eyeBtn, hidden });
    });

    this.layerRail.replaceChildren(frag);
    this.prevSelectedRow = selectedRowEl;
    this.prevHoveredRow = hoveredRowEl;

    if (selectedRowEl) {
      (selectedRowEl as HTMLElement).scrollIntoView({ block: 'nearest' });
    }
  }

  public syncHighlight(selectedId: string | null, hoveredId: string | null): void {
    const nextSel = selectedId ? (this.layerRowMap.get(selectedId) ?? null) : null;
    if (this.prevSelectedRow !== nextSel) {
      if (this.prevSelectedRow) this.prevSelectedRow.classList.remove('is-selected');
      if (nextSel) nextSel.classList.add('is-selected');
      this.prevSelectedRow = nextSel;
    }

    const nextHov = hoveredId ? (this.layerRowMap.get(hoveredId) ?? null) : null;
    if (this.prevHoveredRow !== nextHov) {
      if (this.prevHoveredRow) this.prevHoveredRow.classList.remove('is-hovered');
      if (nextHov) nextHov.classList.add('is-hovered');
      this.prevHoveredRow = nextHov;
    }
  }
}
