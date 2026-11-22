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
import { createSensorAssemblies } from '../assemblies/sensor';
import { createShutterAssembly } from '../assemblies/shutter';
import { createMainboardAssembly } from '../assemblies/mainboard';
import { createEvfAssembly } from '../assemblies/evf';
import { createMountAssembly } from '../assemblies/mount';

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
  private mountAssembly: AssemblyController;
  private shutterAssembly: AssemblyController;
  private sensorAssembly: AssemblyController;
  private mainboardAssembly: AssemblyController;
  private evfAssembly: AssemblyController;
  private microAssembly: AssemblyController;
  private allParts: CadPart[];
  private callbacks: ViewportCallbacks;

  private clippingPlane: THREE.Plane;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerDownPos = new THREE.Vector2();

  // State — opens directly onto the newly implemented Large-Diameter Lens Mount super-anatomy
  private mode: ScaleMode = 'mount';
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
  private hoverHighlightMeshes = new Set<THREE.Mesh>();

  private clock = new THREE.Clock();
  private rafId = 0;
  private dirtyFrames = 4;

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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.localClippingEnabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
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
    this.scene.environmentIntensity = 0.62;
    roomEnv.dispose();
    pmrem.dispose();

    // Balanced dual-sided daylight studio rig illuminating both +Z (front optical) and -Z (rear ISP mainboard)
    const hemi = new THREE.HemisphereLight(0xffffff, 0xcad3e0, 0.8);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.55);
    keyLight.position.set(78, 92, 108);
    this.scene.add(keyLight);

    const rearKeyLight = new THREE.DirectionalLight(0xffffff, 1.38);
    rearKeyLight.position.set(-82, 86, -118);
    this.scene.add(rearKeyLight);

    const fillLight = new THREE.DirectionalLight(0xeef4ff, 0.68);
    fillLight.position.set(-95, 34, 58);
    this.scene.add(fillLight);

    const rearFillLight = new THREE.DirectionalLight(0xf2f6ff, 0.62);
    rearFillLight.position.set(92, -38, -74);
    this.scene.add(rearFillLight);

    // Camera & OrbitControls
    const aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(32, aspect, 0.2, 2400);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.065;
    this.controls.minDistance = 16;
    this.controls.maxDistance = 880;
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

    // Build all 6 CAD subsystems: Mount (12), Shutter (12), Sensor/IBIS (14), Mainboard/ISP (16), EVF (14), Micro Pixel (7) = 75 parts!
    this.mountAssembly = createMountAssembly(this.materials);
    this.shutterAssembly = createShutterAssembly(this.materials);
    const { sensor, micro } = createSensorAssemblies(this.materials);
    this.sensorAssembly = sensor;
    this.microAssembly = micro;
    this.mainboardAssembly = createMainboardAssembly(this.materials);
    this.evfAssembly = createEvfAssembly(this.materials);

    this.scene.add(
      this.mountAssembly.rootGroup,
      this.shutterAssembly.rootGroup,
      this.sensorAssembly.rootGroup,
      this.mainboardAssembly.rootGroup,
      this.evfAssembly.rootGroup,
      this.microAssembly.rootGroup
    );

    this.allParts = [
      ...this.mountAssembly.parts,
      ...this.shutterAssembly.parts,
      ...this.sensorAssembly.parts,
      ...this.mainboardAssembly.parts,
      ...this.evfAssembly.parts,
      ...this.microAssembly.parts,
    ];

    // Cache original materials for render-mode switching
    for (const part of this.allParts) {
      for (const mesh of part.interactiveMeshes) {
        this.originalMeshMaterials.set(mesh, {
          originalMaterial: mesh.material,
        });
      }
    }

    this.syncAssemblyVisibility();
    this.setCameraPreset('iso', true);
    this.bindEvents();
    this.animate();
  }

  private isPartInCurrentMode(part: CadPart): boolean {
    if (this.mode === 'integrated') {
      return (
        part.subsystem === 'mount' ||
        part.subsystem === 'shutter' ||
        part.subsystem === 'sensor' ||
        part.subsystem === 'mainboard' ||
        part.subsystem === 'evf'
      );
    }
    return part.subsystem === this.mode;
  }

  private syncAssemblyVisibility(): void {
    const showMount = this.mode === 'mount' || this.mode === 'integrated';
    const showShutter = this.mode === 'shutter' || this.mode === 'integrated';
    const showSensor = this.mode === 'sensor' || this.mode === 'integrated';
    const showMainboard = this.mode === 'mainboard' || this.mode === 'integrated';
    const showEvf = this.mode === 'evf' || this.mode === 'integrated';
    const showMicro = this.mode === 'micro';

    this.mountAssembly.rootGroup.visible = showMount;
    this.shutterAssembly.rootGroup.visible = showShutter;
    this.sensorAssembly.rootGroup.visible = showSensor;
    this.mainboardAssembly.rootGroup.visible = showMainboard;
    this.evfAssembly.rootGroup.visible = showEvf;
    this.microAssembly.rootGroup.visible = showMicro;

    this.mountAssembly.setPhysicsVisible(this.physicsActive && showMount);
    this.shutterAssembly.setPhysicsVisible(this.physicsActive && showShutter);
    this.sensorAssembly.setPhysicsVisible(this.physicsActive && showSensor);
    this.mainboardAssembly.setPhysicsVisible(this.physicsActive && showMainboard);
    this.evfAssembly.setPhysicsVisible(this.physicsActive && showEvf);
    this.microAssembly.setPhysicsVisible(this.physicsActive && showMicro);

    this.mountAssembly.updateExplodeGuides(this.currentExplode, showMount);
    this.shutterAssembly.updateExplodeGuides(this.currentExplode, showShutter);
    this.sensorAssembly.updateExplodeGuides(this.currentExplode, showSensor);
    this.mainboardAssembly.updateExplodeGuides(this.currentExplode, showMainboard);
    this.evfAssembly.updateExplodeGuides(this.currentExplode, showEvf);
    this.microAssembly.updateExplodeGuides(this.currentExplode, showMicro);
  }

  public getPartsForCurrentMode(): CadPart[] {
    const subOrder: Record<CadPart['subsystem'], number> = {
      mount: 0,
      evf: 1,
      shutter: 2,
      sensor: 3,
      mainboard: 4,
      micro: 5,
    };
    return this.allParts
      .filter((p) => this.isPartInCurrentMode(p))
      .sort((a, b) => {
        if (a.subsystem !== b.subsystem) return subOrder[a.subsystem] - subOrder[b.subsystem];
        // In integrated front-to-back order, show mainboard from front frame -> PCB -> ISP -> vapor chamber
        if (this.mode === 'integrated' && a.subsystem === 'mainboard') {
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

    if (this.mode === 'mount') {
      d = 178 + e * 158;
      target = new THREE.Vector3(2.0 + e * 3.0, -2.5 - e * 4.5, 25.0 + e * 22.0);
    } else if (this.mode === 'evf') {
      d = 136 + e * 188;
      target = new THREE.Vector3(1.5 * (1 - e), 38.6 + e * 0.5, -16.5 - e * 18.0);
    } else if (this.mode === 'mainboard') {
      d = 186 + e * 124;
      target = new THREE.Vector3(0.0, -3.0, -21.5 - e * 14.5);
    } else if (this.mode === 'shutter') {
      d = 166 + e * 82;
      target = new THREE.Vector3(6.0 + e * 5.0, -3.2, 14.0 - e * 1.5);
    } else if (this.mode === 'integrated') {
      d = 264 + e * 490;
      target = new THREE.Vector3(2.0, 5.5 + e * 10.5, 2.5 + e * 24.0);
    } else if (this.mode === 'sensor') {
      d = 142 + e * 72;
      target = new THREE.Vector3(0, -1.0, -2 - e * 14);
    } else {
      d = 76 + e * 46;
      target = new THREE.Vector3(0, -1.0, -1);
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
    } else if (this.mode === 'mainboard') {
      // Mainboard component side faces -Z (rear of camera); diagonal 3/4 showcases all 16 exploded layers cleanly!
      const isoX = e > 0.25 ? -0.68 : -0.44;
      const isoZ = e > 0.25 ? -0.66 : -0.84;
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
          offset = new THREE.Vector3(d * isoX, d * 0.28, d * isoZ);
          break;
      }
    } else {
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 2, d);
          break;
        case 'side':
          offset = new THREE.Vector3(d * 1.04, 8, 0);
          break;
        case 'back':
          offset = new THREE.Vector3(-d * 0.55, d * 0.34, -d * 0.78);
          break;
        case 'iso':
        default:
          if (this.mode === 'mount') {
            const isoX = e > 0.25 ? 0.80 : 0.58;
            const isoZ = e > 0.25 ? 0.56 : 0.76;
            offset = new THREE.Vector3(d * isoX, d * 0.22, d * isoZ);
          } else if (this.mode === 'shutter') {
            offset = new THREE.Vector3(d * 0.52, d * 0.28, d * 0.81);
          } else if (this.mode === 'integrated') {
            const isoX = e > 0.25 ? 0.78 : 0.64;
            const isoZ = e > 0.25 ? 0.58 : 0.72;
            offset = new THREE.Vector3(d * isoX, d * 0.23, d * isoZ);
          } else if (this.mode === 'sensor') {
            offset = new THREE.Vector3(d * 0.64, d * 0.38, d * 0.72);
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
    const maxDist = isMicro ? 66 : this.mode === 'evf' ? 112 : this.mode === 'integrated' ? 240 : 148;
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
    } else if (this.mode === 'integrated') {
      if (this.sectionAxis === 'x') {
        minCoord = -50;
        maxCoord = 50;
      } else {
        minCoord = -40;
        maxCoord = 62;
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
    this.hoverHighlightMeshes.clear();

    for (const part of this.allParts) {
      if (!this.isPartInCurrentMode(part)) continue;

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

        if (isHovered || isSelected) {
          this.hoverHighlightMeshes.add(mesh);
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

    window.addEventListener('resize', () => {
      const w = Math.max(1, this.container.clientWidth);
      const h = Math.max(1, this.container.clientHeight);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.markDirty();
    });
  }

  private pickPartAtPointer(): string | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const activeObjects: THREE.Object3D[] = [];
    if (this.mountAssembly.rootGroup.visible) {
      activeObjects.push(...this.mountAssembly.rootGroup.children);
    }
    if (this.shutterAssembly.rootGroup.visible) {
      activeObjects.push(...this.shutterAssembly.rootGroup.children);
    }
    if (this.sensorAssembly.rootGroup.visible) {
      activeObjects.push(...this.sensorAssembly.rootGroup.children);
    }
    if (this.mainboardAssembly.rootGroup.visible) {
      activeObjects.push(...this.mainboardAssembly.rootGroup.children);
    }
    if (this.evfAssembly.rootGroup.visible) {
      activeObjects.push(...this.evfAssembly.rootGroup.children);
    }
    if (this.microAssembly.rootGroup.visible) {
      activeObjects.push(...this.microAssembly.rootGroup.children);
    }

    const hits = this.raycaster.intersectObjects(activeObjects, true);

    for (const hit of hits) {
      if (!hit.object.visible) continue;
      if (this.sectionAxis !== 'off' && this.clippingPlane.distanceToPoint(hit.point) < 0) {
        continue;
      }
      const partId = hit.object.userData.partId as string | undefined;
      if (partId && !this.isPartHidden(partId)) {
        return partId;
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
    const integrated = this.mode === 'integrated';
    if (this.mountAssembly.rootGroup.visible) {
      this.mountAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        integrated
      );
    }
    if (this.shutterAssembly.rootGroup.visible) {
      this.shutterAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        integrated
      );
    }
    if (this.sensorAssembly.rootGroup.visible) {
      this.sensorAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        integrated
      );
    }
    if (this.mainboardAssembly.rootGroup.visible) {
      this.mainboardAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        integrated
      );
    }
    if (this.evfAssembly.rootGroup.visible) {
      this.evfAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        integrated
      );
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

    let active = this.physicsActive || this.dirtyFrames > 0;
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
        this.mountAssembly.updateExplodeGuides(
          this.currentExplode,
          this.mountAssembly.rootGroup.visible
        );
        this.shutterAssembly.updateExplodeGuides(
          this.currentExplode,
          this.shutterAssembly.rootGroup.visible
        );
        this.sensorAssembly.updateExplodeGuides(
          this.currentExplode,
          this.sensorAssembly.rootGroup.visible
        );
        this.mainboardAssembly.updateExplodeGuides(
          this.currentExplode,
          this.mainboardAssembly.rootGroup.visible
        );
        this.evfAssembly.updateExplodeGuides(
          this.currentExplode,
          this.evfAssembly.rootGroup.visible
        );
        this.microAssembly.updateExplodeGuides(
          this.currentExplode,
          this.microAssembly.rootGroup.visible
        );
      }
      this.renderer.render(this.scene, this.camera);
      if (this.dirtyFrames > 0) this.dirtyFrames--;
    }
  };

  public dispose(): void {
    cancelAnimationFrame(this.rafId);
    this.controls.dispose();
    this.renderer.dispose();
  }
}
