import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  AssemblyController,
  CadPart,
  CameraPreset,
  RenderMode,
  ScaleMode,
  SectionAxis,
} from '../assemblies/types';
import { createMaterialLibrary, MaterialLibrary } from './Materials';
import { createLensAssembly } from '../assemblies/lens';
import { sharedLensOpticalSim } from '../assemblies/lens/lensOpticalSim';
import { createMountAssembly } from '../assemblies/mount';
import { createShutterAssembly } from '../assemblies/shutter';
import { createSensorAssemblies } from '../assemblies/sensor';
import { createMainboardAssembly } from '../assemblies/mainboard';
import { createEvfAssembly } from '../assemblies/evf';
import { createLcdAssembly } from '../assemblies/lcd';
import { createBodyAssembly } from '../assemblies/body';

export interface ViewportCallbacks {
  onSelectPart: (part: CadPart | null) => void;
  onHoverPart: (partId: string | null) => void;
  onVisibilityChanged: () => void;
}

interface StoredMaterialState {
  originalMaterial: THREE.Material | THREE.Material[];
}

export class CadViewport {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private materials: MaterialLibrary;
  private lensAssembly: AssemblyController;
  private mountAssembly: AssemblyController;
  private shutterAssembly: AssemblyController;
  private sensorAssembly: AssemblyController;
  private mainboardAssembly: AssemblyController;
  private evfAssembly: AssemblyController;
  private lcdAssembly: AssemblyController;
  private bodyAssembly: AssemblyController;
  private microAssembly: AssemblyController;
  private allParts: CadPart[];
  private partById = new Map<string, CadPart>();
  private callbacks: ViewportCallbacks;

  private clippingPlane: THREE.Plane;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerDownPos = new THREE.Vector2();

  // State — opens directly onto the COMPLETE 96-layer assembled flagship mirrorless camera!
  private mode: ScaleMode = 'integrated';
  private renderMode: RenderMode = 'solid';
  private sectionAxis: SectionAxis = 'off';
  private sectionValue = 0.5;
  private targetExplode = 0;
  private currentExplode = 0;
  private physicsActive = false;

  private selectedPartId: string | null = null;
  private hoveredPartId: string | null = null;
  private isolatedPartId: string | null = null;
  private hiddenPartIds = new Set<string>();

  // Smooth camera transition
  private camAnimActive = false;
  private camStartPos = new THREE.Vector3();
  private camEndPos = new THREE.Vector3();
  private camStartTarget = new THREE.Vector3();
  private camEndTarget = new THREE.Vector3();
  private camAnimT = 0;

  // Render mode override caches
  private originalMeshMaterials = new Map<THREE.Mesh, StoredMaterialState>();
  private xrayMaterial: THREE.MeshPhysicalMaterial;
  private cadWhiteMaterial: THREE.MeshStandardMaterial;
  private resizeObserver: ResizeObserver | null = null;
  private boundHandleResize = () => this.handleResize();

  private clock = new THREE.Clock();
  private rafId = 0;
  private dirtyFrames = 2;

  constructor(container: HTMLElement, callbacks: ViewportCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    // Renderer configured for crisp industrial CAD look on pure white (#FFFFFF)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.localClippingEnabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.09;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    // Pure solid white scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Clean neutral studio IBL reflections
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmrem.fromScene(roomEnv, 0.04);
    this.scene.environment = envRT.texture;
    this.scene.environmentIntensity = 0.66;
    roomEnv.dispose();
    pmrem.dispose();

    // Balanced studio CAD lighting rig illuminating front lens/grip (+Z/-X), rear LCD (-Z), top dials (+Y), and crisp edge rim highlights
    const hemi = new THREE.HemisphereLight(0xffffff, 0xcad3e0, 0.84);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.56);
    keyLight.position.set(-96, 118, 134);
    this.scene.add(keyLight);

    const rearKeyLight = new THREE.DirectionalLight(0xffffff, 1.38);
    rearKeyLight.position.set(-92, 92, -138);
    this.scene.add(rearKeyLight);

    const fillLight = new THREE.DirectionalLight(0xeef4ff, 0.74);
    fillLight.position.set(112, 42, 76);
    this.scene.add(fillLight);

    const rearFillLight = new THREE.DirectionalLight(0xf2f6ff, 0.66);
    rearFillLight.position.set(96, -42, -88);
    this.scene.add(rearFillLight);

    const topRimLight = new THREE.DirectionalLight(0xf8fbff, 0.42);
    topRimLight.position.set(18, 165, 22);
    this.scene.add(topRimLight);

    // Camera & OrbitControls (supports ultra-close watchmaker micro-zoom down to 7 mm!)
    const aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(32, aspect, 0.12, 4800);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.065;
    this.controls.minDistance = 7;
    this.controls.maxDistance = 2600;
    this.controls.addEventListener('change', () => {
      this.dirtyFrames = Math.max(this.dirtyFrames, 2);
    });

    // Shared real-time CAD section-cut clipping plane (disabled at +Infinity when off)
    this.clippingPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 10000);
    this.materials = createMaterialLibrary([this.clippingPlane]);

    // Special render-mode materials
    this.xrayMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9fb8d4,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      side: THREE.DoubleSide,
      clippingPlanes: [this.clippingPlane],
    });

    this.cadWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xf6f7f9,
      metalness: 0.05,
      roughness: 0.85,
      side: THREE.DoubleSide,
      clippingPlanes: [this.clippingPlane],
    });

    // Build ALL 9 CAD subsystems (246 Macro Complete Camera parts + 11 Micro Pixel parts = 257 total parts!)
    this.lensAssembly = createLensAssembly(this.materials);
    this.mountAssembly = createMountAssembly(this.materials);
    this.shutterAssembly = createShutterAssembly(this.materials);
    const { sensor, micro } = createSensorAssemblies(this.materials);
    this.sensorAssembly = sensor;
    this.microAssembly = micro;
    this.mainboardAssembly = createMainboardAssembly(this.materials);
    this.evfAssembly = createEvfAssembly(this.materials);
    this.lcdAssembly = createLcdAssembly(this.materials);
    this.bodyAssembly = createBodyAssembly(this.materials);

    this.scene.add(
      this.lensAssembly.rootGroup,
      this.mountAssembly.rootGroup,
      this.shutterAssembly.rootGroup,
      this.sensorAssembly.rootGroup,
      this.mainboardAssembly.rootGroup,
      this.evfAssembly.rootGroup,
      this.lcdAssembly.rootGroup,
      this.bodyAssembly.rootGroup,
      this.microAssembly.rootGroup
    );

    this.allParts = [
      ...this.lensAssembly.parts,
      ...this.mountAssembly.parts,
      ...this.shutterAssembly.parts,
      ...this.sensorAssembly.parts,
      ...this.mainboardAssembly.parts,
      ...this.evfAssembly.parts,
      ...this.lcdAssembly.parts,
      ...this.bodyAssembly.parts,
      ...this.microAssembly.parts,
    ];

    // Cache original materials & fast lookup map for render-mode switching and mode filtering
    for (const part of this.allParts) {
      this.partById.set(part.id, part);
      for (const mesh of part.interactiveMeshes) {
        this.originalMeshMaterials.set(mesh, {
          originalMaterial: mesh.material,
        });
      }
    }

    this.syncAssemblyVisibility();
    this.applyVisibilityAndStyles();
    this.setCameraPreset('iso', true);
    this.bindEvents();
    this.animate();
  }

  private isPartInCurrentMode(part: CadPart): boolean {
    if (this.mode === 'integrated') {
      return part.subsystem !== 'micro' && !part.standaloneOnly;
    }
    if (this.mode === 'camera_body') {
      return part.subsystem !== 'micro' && part.subsystem !== 'lens' && !part.standaloneOnly;
    }
    return part.subsystem === this.mode;
  }

  private syncAssemblyVisibility(): void {
    const isAllBody = this.mode === 'integrated' || this.mode === 'camera_body';
    const showLens = this.mode === 'lens' || this.mode === 'integrated';
    const showMount = this.mode === 'mount' || isAllBody;
    const showShutter = this.mode === 'shutter' || isAllBody;
    const showSensor = this.mode === 'sensor' || isAllBody;
    const showMainboard = this.mode === 'mainboard' || isAllBody;
    const showEvf = this.mode === 'evf' || isAllBody;
    const showLcd = this.mode === 'lcd' || isAllBody;
    const showBody = this.mode === 'body' || isAllBody;
    const showMicro = this.mode === 'micro';

    this.lensAssembly.rootGroup.visible = showLens;
    this.mountAssembly.rootGroup.visible = showMount;
    this.shutterAssembly.rootGroup.visible = showShutter;
    this.sensorAssembly.rootGroup.visible = showSensor;
    this.mainboardAssembly.rootGroup.visible = showMainboard;
    this.evfAssembly.rootGroup.visible = showEvf;
    this.lcdAssembly.rootGroup.visible = showLcd;
    this.bodyAssembly.rootGroup.visible = showBody;
    this.microAssembly.rootGroup.visible = showMicro;

    // Ensure standaloneOnly micro-parts are strictly hidden in whole-camera modes ('integrated' / 'camera_body')
    for (const part of this.allParts) {
      part.group.visible = this.isPartInCurrentMode(part) && !this.isPartHidden(part.id);
    }

    this.lensAssembly.setPhysicsVisible((this.physicsActive || sharedLensOpticalSim.studioOpen) && showLens);
    this.mountAssembly.setPhysicsVisible(this.physicsActive && showMount);
    this.shutterAssembly.setPhysicsVisible(this.physicsActive && showShutter);
    this.sensorAssembly.setPhysicsVisible(this.physicsActive && showSensor);
    this.mainboardAssembly.setPhysicsVisible(this.physicsActive && showMainboard);
    this.evfAssembly.setPhysicsVisible(this.physicsActive && showEvf);
    this.lcdAssembly.setPhysicsVisible(this.physicsActive && showLcd);
    this.bodyAssembly.setPhysicsVisible(this.physicsActive && showBody);
    this.microAssembly.setPhysicsVisible(this.physicsActive && showMicro);

    this.lensAssembly.updateExplodeGuides(this.currentExplode, showLens);
    this.mountAssembly.updateExplodeGuides(this.currentExplode, showMount);
    this.shutterAssembly.updateExplodeGuides(this.currentExplode, showShutter);
    this.sensorAssembly.updateExplodeGuides(this.currentExplode, showSensor);
    this.mainboardAssembly.updateExplodeGuides(this.currentExplode, showMainboard);
    this.evfAssembly.updateExplodeGuides(this.currentExplode, showEvf);
    this.lcdAssembly.updateExplodeGuides(this.currentExplode, showLcd);
    this.bodyAssembly.updateExplodeGuides(this.currentExplode, showBody);
    this.microAssembly.updateExplodeGuides(this.currentExplode, showMicro);
  }

  public getPartsForCurrentMode(): CadPart[] {
    const subOrder: Record<CadPart['subsystem'], number> = {
      lens: 0,
      mount: 1,
      body: 2,
      evf: 3,
      shutter: 4,
      sensor: 5,
      mainboard: 6,
      lcd: 7,
      micro: 8,
    };
    return this.allParts
      .filter((p) => this.isPartInCurrentMode(p))
      .sort((a, b) => {
        if (a.subsystem !== b.subsystem) return subOrder[a.subsystem] - subOrder[b.subsystem];
        // In integrated / camera_body front-to-back order, show mainboard from front frame -> PCB -> ISP -> vapor chamber
        if ((this.mode === 'integrated' || this.mode === 'camera_body') && a.subsystem === 'mainboard') {
          return b.order - a.order;
        }
        return a.order - b.order;
      });
  }

  public getSelectedPart(): CadPart | null {
    if (!this.selectedPartId) return null;
    return this.allParts.find((p) => p.id === this.selectedPartId) ?? null;
  }

  public isPartHidden(partId: string): boolean {
    if (this.isolatedPartId && this.isolatedPartId !== partId) return true;
    return this.hiddenPartIds.has(partId);
  }

  public isIsolated(): boolean {
    return this.isolatedPartId !== null;
  }

  public hasAnyHidden(): boolean {
    return this.isolatedPartId !== null || this.hiddenPartIds.size > 0;
  }

  public getMode(): ScaleMode {
    return this.mode;
  }

  public setMode(nextMode: ScaleMode, immediateCamera = false): void {
    if (this.mode === nextMode) return;
    this.mode = nextMode;

    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();

    this.syncAssemblyVisibility();
    this.stepActiveAssemblies(this.clock.getElapsedTime(), 0);
    this.syncAssemblyVisibility();
    this.applyVisibilityAndStyles();
    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);

    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public setExplode(value: number, immediate = false): void {
    this.targetExplode = THREE.MathUtils.clamp(value, 0, 1);
    if (immediate) {
      this.currentExplode = this.targetExplode;
      this.stepActiveAssemblies(this.clock.getElapsedTime(), 0);
      this.syncAssemblyVisibility();
    }
    this.markDirty();
  }

  public getExplode(): number {
    return this.targetExplode;
  }

  public setRenderMode(mode: RenderMode): void {
    this.renderMode = mode;
    this.applyVisibilityAndStyles();
  }

  public setSection(axis: SectionAxis, normalizedValue?: number): void {
    this.sectionAxis = axis;
    if (typeof normalizedValue === 'number') {
      this.sectionValue = THREE.MathUtils.clamp(normalizedValue, 0, 1);
    }
    this.updateClippingPlane();
  }

  public setPhysicsActive(active: boolean): void {
    this.physicsActive = active;
    this.syncAssemblyVisibility();
    this.markDirty();
  }

  public selectPart(partId: string | null, focusCamera = true): void {
    if (partId) {
      const candidate = this.partById.get(partId);
      if (!candidate || !this.isPartInCurrentMode(candidate)) return;
    }
    if (partId === this.selectedPartId) return;
    this.selectedPartId = partId;

    if (partId && this.hiddenPartIds.has(partId)) {
      this.hiddenPartIds.delete(partId);
    }
    if (partId && this.isolatedPartId && this.isolatedPartId !== partId) {
      this.isolatedPartId = partId;
    }

    this.applyVisibilityAndStyles();
    const part = this.getSelectedPart();
    if (part && focusCamera) {
      this.focusOnPart(part);
    }
    this.callbacks.onSelectPart(part);
    this.callbacks.onVisibilityChanged();
  }

  public setHoveredPartFromUI(partId: string | null): void {
    if (this.hoveredPartId === partId) return;
    this.hoveredPartId = partId;
    this.applyVisibilityAndStyles();
  }

  public togglePartHidden(partId: string): void {
    if (this.isolatedPartId) {
      const prevIso = this.isolatedPartId;
      this.isolatedPartId = null;
      if (partId === prevIso) {
        this.hiddenPartIds.add(partId);
      }
    } else if (this.hiddenPartIds.has(partId)) {
      this.hiddenPartIds.delete(partId);
    } else {
      this.hiddenPartIds.add(partId);
    }

    if (this.selectedPartId && this.isPartHidden(this.selectedPartId)) {
      this.selectedPartId = null;
      this.callbacks.onSelectPart(null);
    }

    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public toggleIsolateSelected(): void {
    if (!this.selectedPartId) return;
    if (this.isolatedPartId === this.selectedPartId) {
      this.isolatedPartId = null;
    } else {
      this.isolatedPartId = this.selectedPartId;
      this.hiddenPartIds.delete(this.selectedPartId);
    }
    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public resetAllVisibility(): void {
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public stepSelectedPart(delta: -1 | 1): void {
    const list = this.getPartsForCurrentMode();
    if (list.length === 0) return;
    const idx = list.findIndex((p) => p.id === this.selectedPartId);
    const nextIdx = idx < 0 ? 0 : (idx + delta + list.length) % list.length;
    this.selectPart(list[nextIdx].id, true);
  }

  public setCameraPreset(preset: CameraPreset, immediate = false): void {
    const e = this.targetExplode;
    let d: number;
    let target: THREE.Vector3;

    if (this.mode === 'lens') {
      d = 264 + e * 745;
      target = new THREE.Vector3(0, -2.0 * (1 - e), 80.0 + e * 12.0);
    } else if (this.mode === 'camera_body') {
      // Complete 231-part camera body WITHOUT lens: bare 55mm mount & sensor front-3/4 assembled vs full 231-layer body dissection!
      d = 335 + e * 565;
      target = new THREE.Vector3(-8.0 - e * 8.0, 3.0 + e * 9.0, -10.0 - e * 18.0);
    } else if (this.mode === 'lcd') {
      d = 160 + e * 204;
      target = new THREE.Vector3(8.0 + e * 6.0, -7.0, -32.0 - e * 18.0);
    } else if (this.mode === 'body') {
      d = 290 + e * 415;
      target = new THREE.Vector3(-8.0 - e * 10.0, 4.0 - e * 2.0, 0.0 - e * 10.0);
    } else if (this.mode === 'mount') {
      d = 182 + e * 255;
      target = new THREE.Vector3(2.0 + e * 3.0, -2.0 - e * 3.5, 25.0 + e * 26.0);
    } else if (this.mode === 'evf') {
      d = 140 + e * 255;
      target = new THREE.Vector3(1.5 * (1 - e), 38.6 + e * 0.5, -16.5 - e * 22.0);
    } else if (this.mode === 'mainboard') {
      // 30-part flagship motherboard with radial I/O daughterboards, MIMO antennas, NFC & rear RF bracket
      d = 192 + e * 170;
      target = new THREE.Vector3(0.0, 0.0 + e * 2.0, -22.0 - e * 18.0);
    } else if (this.mode === 'shutter') {
      d = 186 + e * 308;
      target = new THREE.Vector3(6.0 + e * 10.0, -3.2, 14.0 - e * 4.0);
    } else if (this.mode === 'integrated') {
      // Assembled complete 305-macro-part flagship camera (231 body + 74-part 50mm F1.2 lens), vs panoramic ultra-dissection!
      d = 390 + e * 1290;
      target = new THREE.Vector3(-8.0 - e * 6.0, 6.0 + e * 10.0, 34.0 + e * 96.0);
    } else if (this.mode === 'sensor') {
      d = 152 + e * 305;
      target = new THREE.Vector3(-4.0 * e, -2.0, -4.0 - e * 42.0);
    } else {
      // 15-layer ISSCC 2025/2026 Nano-Pixel Cross-Section (with radial FDTI, D-VTG, LOFIC & GS MEM wings!)
      d = 88 + e * 92;
      target = new THREE.Vector3(0.0, -1.0, -3.0 - e * 4.0);
    }

    let offset: THREE.Vector3;
    if (this.mode === 'evf') {
      // Look from rear-left (-X, -Z) right into the architectural cutaway EVF barrel & eyepiece optics!
      const isoX = e > 0.25 ? -0.88 : -0.78;
      const isoY = e > 0.25 ? 0.17 : 0.24;
      const isoZ = e > 0.25 ? -0.44 : -0.58;
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 2, -d);
          break;
        case 'side':
          offset = new THREE.Vector3(-d * 1.05, 4, 0);
          break;
        case 'back':
          offset = new THREE.Vector3(d * 0.65, d * 0.28, d * 0.72);
          break;
        case 'iso':
        default:
          offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          break;
      }
    } else if (this.mode === 'mainboard' || this.mode === 'lcd') {
      // Rear-facing assemblies (-Z): diagonal 3/4 showcases live IPS screen, 4-axis hinge & ISP mainboard cleanly!
      const isoX = this.mode === 'lcd' ? (e > 0.25 ? 0.56 : 0.42) : e > 0.25 ? -0.68 : -0.44;
      const isoZ = this.mode === 'lcd' ? (e > 0.25 ? -0.78 : -0.86) : e > 0.25 ? -0.66 : -0.84;
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 2, -d);
          break;
        case 'side':
          offset = new THREE.Vector3(-d * 1.04, 8, 0);
          break;
        case 'back':
          offset = new THREE.Vector3(d * 0.52, d * 0.30, d * 0.80);
          break;
        case 'iso':
        default:
          offset = new THREE.Vector3(d * isoX, d * 0.26, d * isoZ);
          break;
      }
    } else {
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 4, d);
          break;
        case 'side':
          offset = new THREE.Vector3(-d * 1.04, 8, 0);
          break;
        case 'back':
          // Iconic 3/4 rear camera view showing 4-Axis Rear LCD live view, EVF eyecup, AF joystick & dials!
          offset = new THREE.Vector3(-d * 0.42, d * 0.26, -d * 0.88);
          break;
        case 'iso':
        default:
          if (this.mode === 'integrated') {
            // Iconic flagship 3/4 Front-Grip Hero Angle: shows deep -X grip, shutter, top OLED, EVF hot shoe, AND 50mm F1.2 cutaway!
            const isoX = e > 0.25 ? -0.82 : -0.62;
            const isoY = e > 0.25 ? 0.23 : 0.27;
            const isoZ = e > 0.25 ? 0.52 : 0.74;
            offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          } else if (this.mode === 'camera_body') {
            // Complete Camera Body Only (no lens): showcases open 55mm bare stainless mount & exposed 3-wafer sensor clearly!
            const isoX = e > 0.25 ? -0.78 : -0.62;
            const isoY = e > 0.25 ? 0.24 : 0.27;
            const isoZ = e > 0.25 ? 0.57 : 0.74;
            offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          } else if (this.mode === 'lens') {
            const isoX = e > 0.25 ? -0.84 : -0.68;
            const isoZ = e > 0.25 ? 0.48 : 0.69;
            offset = new THREE.Vector3(d * isoX, d * 0.25, d * isoZ);
          } else if (this.mode === 'body') {
            const isoX = e > 0.25 ? -0.74 : -0.64;
            const isoZ = e > 0.25 ? 0.62 : 0.72;
            offset = new THREE.Vector3(d * isoX, d * 0.28, d * isoZ);
          } else if (this.mode === 'mount') {
            const isoX = e > 0.25 ? 0.80 : 0.58;
            const isoZ = e > 0.25 ? 0.56 : 0.76;
            offset = new THREE.Vector3(d * isoX, d * 0.22, d * isoZ);
          } else if (this.mode === 'shutter') {
            offset = new THREE.Vector3(d * 0.52, d * 0.28, d * 0.81);
          } else if (this.mode === 'sensor') {
            const isoX = e > 0.25 ? 0.82 : 0.64;
            const isoY = e > 0.25 ? 0.26 : 0.38;
            const isoZ = e > 0.25 ? 0.51 : 0.72;
            offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          } else {
            offset = new THREE.Vector3(d * 0.68, d * 0.44, d * 0.66);
          }
          break;
      }
    }

    const pos = target.clone().add(offset);

    if (immediate) {
      this.camAnimActive = false;
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.controls.update();
      this.markDirty();
    } else {
      this.animateCameraTo(pos, target);
    }
  }

  private focusOnPart(part: CadPart): void {
    const box = new THREE.Box3().setFromObject(part.group);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const currentOffset = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);
    const isMicro = this.mode === 'micro';
    const maxDist = isMicro
      ? 66
      : this.mode === 'evf'
        ? 112
        : this.mode === 'integrated' || this.mode === 'camera_body'
          ? 280
          : 168;
    const minDist = isMicro ? 34 : this.mode === 'evf' ? 44 : 56;
    const desiredDist = Math.min(currentOffset.length(), maxDist);
    currentOffset.setLength(Math.max(desiredDist, minDist));

    const nextPos = center.clone().add(currentOffset);
    this.animateCameraTo(nextPos, center);
  }

  private animateCameraTo(pos: THREE.Vector3, target: THREE.Vector3): void {
    this.camStartPos.copy(this.camera.position);
    this.camEndPos.copy(pos);
    this.camStartTarget.copy(this.controls.target);
    this.camEndTarget.copy(target);
    this.camAnimT = 0;
    this.camAnimActive = true;
  }

  private markDirty(frames = 3): void {
    this.dirtyFrames = Math.max(this.dirtyFrames, frames);
  }

  public requestRenderFrame(): void {
    this.markDirty(2);
  }

  /**
   * Smoothly frame the 62-part 50mm F1.2 cutaway lens cleanly in the upper half of the viewport
   * so both the live-moving 3D CAD lens and the bottom 2D Optical Motion Studio shine together!
   */
  public frameLensForOpticsStudio(immediate = false): void {
    const target = new THREE.Vector3(0, -36, 74);
    const pos = new THREE.Vector3(-348, 56, 178);
    this.syncAssemblyVisibility();
    if (immediate) {
      this.camAnimActive = false;
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.controls.update();
      this.markDirty();
    } else {
      this.animateCameraTo(pos, target);
    }
  }

  public handleResize(): void {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.markDirty();
  }

  private updateClippingPlane(): void {
    if (this.sectionAxis === 'off') {
      this.clippingPlane.normal.set(-1, 0, 0);
      this.clippingPlane.constant = 10000;
      this.markDirty();
      return;
    }

    let minCoord = -48;
    let maxCoord = 48;
    if (this.mode === 'micro') {
      minCoord = -13;
      maxCoord = 13;
    } else if (this.mode === 'lens') {
      minCoord = -46;
      maxCoord = 46;
    } else if (this.mode === 'lcd') {
      if (this.sectionAxis === 'x') {
        minCoord = -34;
        maxCoord = 50;
      } else {
        minCoord = -34;
        maxCoord = 22;
      }
    } else if (this.mode === 'body' || this.mode === 'camera_body' || this.mode === 'integrated') {
      if (this.sectionAxis === 'x') {
        minCoord = -74;
        maxCoord = 60;
      } else {
        minCoord = -42;
        maxCoord = 64;
      }
    } else if (this.mode === 'mount') {
      if (this.sectionAxis === 'x') {
        minCoord = -46;
        maxCoord = 46;
      } else {
        minCoord = -40;
        maxCoord = 40;
      }
    } else if (this.mode === 'evf') {
      if (this.sectionAxis === 'x') {
        minCoord = -24;
        maxCoord = 24;
      } else {
        minCoord = 18;
        maxCoord = 60;
      }
    } else if (this.mode === 'mainboard') {
      if (this.sectionAxis === 'x') {
        minCoord = -50;
        maxCoord = 50;
      } else {
        minCoord = -36;
        maxCoord = 36;
      }
    } else if (this.mode === 'shutter') {
      if (this.sectionAxis === 'x') {
        minCoord = -48;
        maxCoord = 50;
      } else {
        minCoord = -35;
        maxCoord = 35;
      }
    }

    const coord = THREE.MathUtils.lerp(minCoord, maxCoord, this.sectionValue);

    if (this.sectionAxis === 'x') {
      this.clippingPlane.normal.set(-1, 0, 0);
      this.clippingPlane.constant = coord;
    } else {
      this.clippingPlane.normal.set(0, -1, 0);
      this.clippingPlane.constant = coord;
    }
    this.markDirty();
  }

  private applyVisibilityAndStyles(): void {
    for (const part of this.allParts) {
      if (!this.isPartInCurrentMode(part)) {
        part.group.visible = false;
        continue;
      }

      const hidden = this.isPartHidden(part.id);
      part.group.visible = !hidden;

      const isSelected = part.id === this.selectedPartId;
      const isHovered = part.id === this.hoveredPartId;

      for (const mesh of part.interactiveMeshes) {
        const stored = this.originalMeshMaterials.get(mesh);
        if (!stored) continue;

        if (this.renderMode === 'cad') {
          mesh.material = this.cadWhiteMaterial;
        } else if (this.renderMode === 'xray') {
          mesh.material = isSelected || isHovered ? stored.originalMaterial : this.xrayMaterial;
        } else {
          mesh.material = stored.originalMaterial;
        }
      }

      for (const line of part.edgeLines) {
        const mat = line.material as THREE.LineBasicMaterial;
        const baseOp = (line.userData.baseOpacity as number) ?? 0.2;

        if (isSelected) {
          mat.color.setHex(0x0d5bd9);
          mat.opacity = 0.92;
        } else if (isHovered) {
          mat.color.setHex(0x2563eb);
          mat.opacity = 0.72;
        } else if (this.renderMode === 'cad') {
          mat.color.setHex(0x14161a);
          mat.opacity = 0.72;
        } else if (this.renderMode === 'xray') {
          mat.color.setHex(0x3a516e);
          mat.opacity = 0.34;
        } else {
          mat.color.setHex(0x181c24);
          mat.opacity = baseOp;
        }
      }
    }
    this.markDirty();
  }

  private bindEvents(): void {
    const dom = this.renderer.domElement;

    dom.addEventListener('pointerdown', (e) => {
      this.pointerDownPos.set(e.clientX, e.clientY);
      this.camAnimActive = false;
      this.markDirty();
    });

    dom.addEventListener('pointermove', (e) => {
      const rect = dom.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.updateHoverFromRaycast();
    });

    dom.addEventListener('pointerleave', () => {
      if (this.hoveredPartId !== null) {
        this.hoveredPartId = null;
        this.container.classList.remove('is-hovering');
        this.applyVisibilityAndStyles();
        this.callbacks.onHoverPart(null);
      }
    });

    dom.addEventListener('pointerup', (e) => {
      const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      if (dist > 5) return;

      const rect = dom.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const hitPartId = this.pickPartAtPointer();
      if (hitPartId) {
        this.selectPart(hitPartId, true);
      } else if (this.selectedPartId) {
        this.selectPart(null, false);
      }
    });

    window.addEventListener('resize', this.boundHandleResize);
    document.addEventListener('fullscreenchange', this.boundHandleResize);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.boundHandleResize);
      this.resizeObserver.observe(this.container);
    }
  }

  private isObjectTreeVisible(obj: THREE.Object3D): boolean {
    let cur: THREE.Object3D | null = obj;
    while (cur) {
      if (!cur.visible) return false;
      cur = cur.parent;
    }
    return true;
  }

  private pickPartAtPointer(): string | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const activeObjects: THREE.Object3D[] = [];
    const visibleAssemblies = [
      this.lensAssembly,
      this.mountAssembly,
      this.shutterAssembly,
      this.sensorAssembly,
      this.mainboardAssembly,
      this.evfAssembly,
      this.lcdAssembly,
      this.bodyAssembly,
      this.microAssembly,
    ];
    for (const asm of visibleAssemblies) {
      if (asm.rootGroup.visible) {
        activeObjects.push(...asm.rootGroup.children);
      }
    }

    const hits = this.raycaster.intersectObjects(activeObjects, true);

    for (const hit of hits) {
      if (!this.isObjectTreeVisible(hit.object)) continue;
      if (this.sectionAxis !== 'off' && this.clippingPlane.distanceToPoint(hit.point) < 0) {
        continue;
      }
      const partId = hit.object.userData.partId as string | undefined;
      if (partId && !this.isPartHidden(partId)) {
        const hitPart = this.partById.get(partId);
        if (hitPart && this.isPartInCurrentMode(hitPart)) {
          return partId;
        }
      }
    }
    return null;
  }

  private updateHoverFromRaycast(): void {
    const hitId = this.pickPartAtPointer();
    if (hitId !== this.hoveredPartId) {
      this.hoveredPartId = hitId;
      this.container.classList.toggle('is-hovering', hitId !== null);
      this.applyVisibilityAndStyles();
      this.callbacks.onHoverPart(hitId);
    }
  }

  private stepActiveAssemblies(elapsed: number, delta: number): void {
    const integrated = this.mode === 'integrated' || this.mode === 'camera_body';
    const macroAssemblies = [
      this.lensAssembly,
      this.mountAssembly,
      this.shutterAssembly,
      this.sensorAssembly,
      this.mainboardAssembly,
      this.evfAssembly,
      this.lcdAssembly,
      this.bodyAssembly,
    ];
    for (const asm of macroAssemblies) {
      if (asm.rootGroup.visible) {
        const asmPhysics =
          asm === this.lensAssembly
            ? this.physicsActive || sharedLensOpticalSim.studioOpen
            : this.physicsActive;
        asm.updateAnimation(elapsed, delta, this.currentExplode, asmPhysics, integrated);
      }
    }
    if (this.microAssembly.rootGroup.visible) {
      this.microAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        false
      );
    }
  }

  private animate = (): void => {
    this.rafId = requestAnimationFrame(this.animate);
    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.getElapsedTime();

    let active = this.physicsActive || sharedLensOpticalSim.studioOpen || this.dirtyFrames > 0;
    let explodeMoved = false;

    const diff = this.targetExplode - this.currentExplode;
    if (Math.abs(diff) > 0.0005) {
      this.currentExplode += diff * Math.min(1, delta * 10.0);
      explodeMoved = true;
      active = true;
    } else if (this.currentExplode !== this.targetExplode) {
      this.currentExplode = this.targetExplode;
      explodeMoved = true;
      active = true;
    }

    if (this.camAnimActive) {
      this.camAnimT = Math.min(1, this.camAnimT + delta * 2.8);
      const ease = 1 - Math.pow(1 - this.camAnimT, 3);
      this.camera.position.lerpVectors(this.camStartPos, this.camEndPos, ease);
      this.controls.target.lerpVectors(this.camStartTarget, this.camEndTarget, ease);
      if (this.camAnimT >= 1) {
        this.camAnimActive = false;
      }
      active = true;
    }

    const controlsChanged = this.controls.update();
    if (controlsChanged) {
      active = true;
    }

    if (active) {
      this.stepActiveAssemblies(elapsed, delta);
      if (explodeMoved || this.dirtyFrames > 0) {
        const allAssemblies = [
          this.lensAssembly,
          this.mountAssembly,
          this.shutterAssembly,
          this.sensorAssembly,
          this.mainboardAssembly,
          this.evfAssembly,
          this.lcdAssembly,
          this.bodyAssembly,
          this.microAssembly,
        ];
        for (const asm of allAssemblies) {
          asm.updateExplodeGuides(this.currentExplode, asm.rootGroup.visible);
        }
      }
      this.renderer.render(this.scene, this.camera);
      if (this.dirtyFrames > 0) this.dirtyFrames--;
    }
  };

  public dispose(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.boundHandleResize);
    document.removeEventListener('fullscreenchange', this.boundHandleResize);
    this.resizeObserver?.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
  }
}
