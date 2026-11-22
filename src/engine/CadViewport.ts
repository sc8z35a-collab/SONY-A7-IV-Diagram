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
import { createSensorAssembly } from '../assemblies/sensor';

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
  private assembly: AssemblyController;
  private callbacks: ViewportCallbacks;

  private clippingPlane: THREE.Plane;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerDownPos = new THREE.Vector2();

  // State
  private mode: ScaleMode = 'macro';
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

    // Clean neutral studio IBL reflections (balanced intensity avoids washing out glass & silicon)
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmrem.fromScene(roomEnv, 0.04);
    this.scene.environment = envRT.texture;
    this.scene.environmentIntensity = 0.62;
    roomEnv.dispose();
    pmrem.dispose();

    // Three-point clean daylight studio rig with strong sculptural contrast
    const hemi = new THREE.HemisphereLight(0xffffff, 0xcad3e0, 0.78);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
    keyLight.position.set(78, 92, 108);
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xeef4ff, 0.72);
    fillLight.position.set(-95, 36, 54);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.95);
    rimLight.position.set(-34, -68, -104);
    this.scene.add(rimLight);

    // Camera & OrbitControls — balanced gallery framing with breathing room around dock & rail
    const aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(32, aspect, 0.2, 1200);
    this.camera.position.set(96, 52, 124);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.065;
    this.controls.minDistance = 16;
    this.controls.maxDistance = 420;
    this.controls.target.set(0, -1.5, -2.0);
    this.controls.update();
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

    // Build Sensor Assembly (Macro + Micro)
    this.assembly = createSensorAssembly(this.materials);
    this.scene.add(this.assembly.macroGroup, this.assembly.microGroup);

    // Cache original materials for render-mode switching
    for (const part of this.assembly.parts) {
      for (const mesh of part.interactiveMeshes) {
        this.originalMeshMaterials.set(mesh, {
          originalMaterial: mesh.material,
        });
      }
    }

    this.bindEvents();
    this.animate();
  }

  public getPartsForCurrentMode(): CadPart[] {
    return this.assembly.parts
      .filter((p) => p.mode === this.mode)
      .sort((a, b) => a.order - b.order);
  }

  public getSelectedPart(): CadPart | null {
    if (!this.selectedPartId) return null;
    return this.assembly.parts.find((p) => p.id === this.selectedPartId) ?? null;
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

  public setMode(nextMode: ScaleMode): void {
    if (this.mode === nextMode) return;
    this.mode = nextMode;
    this.assembly.macroGroup.visible = nextMode === 'macro';
    this.assembly.microGroup.visible = nextMode === 'micro';

    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.applyVisibilityAndStyles();
    this.assembly.setPhysicsVisible(this.physicsActive, this.mode);
    this.assembly.updateExplodeGuides(this.currentExplode, this.mode);
    this.updateClippingPlane();
    this.setCameraPreset('iso');

    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public setExplode(value: number, immediate = false): void {
    this.targetExplode = THREE.MathUtils.clamp(value, 0, 1);
    if (immediate) {
      this.currentExplode = this.targetExplode;
      this.assembly.updateExplodeGuides(this.currentExplode, this.mode);
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
    this.assembly.setPhysicsVisible(active, this.mode);
    this.markDirty();
  }

  public selectPart(partId: string | null, focusCamera = true): void {
    if (partId === this.selectedPartId) return;
    this.selectedPartId = partId;

    // Ensure selected part is visible if chosen from layer rail
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
      // Exit isolate mode first
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
    const isMacro = this.mode === 'macro';
    const d = isMacro ? 142 + this.targetExplode * 72 : 76 + this.targetExplode * 46;
    const target = new THREE.Vector3(0, -1.0, isMacro ? -2 - this.targetExplode * 14 : -1);

    let pos: THREE.Vector3;
    switch (preset) {
      case 'front':
        pos = new THREE.Vector3(0, 2, d);
        break;
      case 'side':
        pos = new THREE.Vector3(d * 1.05, 8, target.z);
        break;
      case 'back':
        pos = new THREE.Vector3(-d * 0.55, d * 0.34, -d * 0.78);
        break;
      case 'iso':
      default:
        pos = isMacro
          ? new THREE.Vector3(d * 0.64, d * 0.38, d * 0.72)
          : new THREE.Vector3(d * 0.68, d * 0.44, d * 0.66);
        break;
    }

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

    // Keep current viewing direction, shift target smoothly toward selected part
    const currentOffset = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);
    const desiredDist = this.mode === 'macro' ? Math.min(currentOffset.length(), 138) : Math.min(currentOffset.length(), 66);
    currentOffset.setLength(Math.max(desiredDist, this.mode === 'macro' ? 58 : 34));

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

    const span = this.mode === 'macro' ? 44 : 13;
    const coord = THREE.MathUtils.lerp(-span, span, this.sectionValue);

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

    for (const part of this.assembly.parts) {
      if (part.mode !== this.mode) continue;

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
      if (dist > 5) return; // Ignore orbit drag

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
    const activeGroup = this.mode === 'macro' ? this.assembly.macroGroup : this.assembly.microGroup;
    const hits = this.raycaster.intersectObjects(activeGroup.children, true);

    for (const hit of hits) {
      if (!hit.object.visible) continue;
      // Check clipping plane
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

  private animate = (): void => {
    this.rafId = requestAnimationFrame(this.animate);
    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.getElapsedTime();

    let active = this.physicsActive || this.dirtyFrames > 0;

    // Smooth critically-damped explode interpolation
    const diff = this.targetExplode - this.currentExplode;
    if (Math.abs(diff) > 0.0005) {
      this.currentExplode += diff * Math.min(1, delta * 10.0);
      this.assembly.updateExplodeGuides(this.currentExplode, this.mode);
      active = true;
    } else if (this.currentExplode !== this.targetExplode) {
      this.currentExplode = this.targetExplode;
      this.assembly.updateExplodeGuides(this.currentExplode, this.mode);
      active = true;
    }

    // Smooth camera preset / focus interpolation
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
      this.assembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        this.mode
      );
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
