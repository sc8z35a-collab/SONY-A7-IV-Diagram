import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import {
  CatalogPartEntry,
  EngineeringRole,
  ExtractedPartBlueprint,
  PartGeometryExtractor,
} from './PartGeometryExtractor';
import {
  CAMERA_PROFILE_LABELS,
  CameraDesignProfile,
  CameraEngineeringReport,
  PlacedPartSnapshot,
  renderEngineeringRadarSvg,
} from './CameraEngineeringGrader';
import {
  generatePlaygroundKiCadSchematic,
  generatePlaygroundNgspiceNetlist,
  PlyaPipelineReport,
  runPlyaVerificationPipeline,
} from './PlyaVerificationPipeline';

export interface PlaygroundHostBridge {
  readonly renderer: THREE.WebGLRenderer;
  readonly container: HTMLElement;
  setCustomSceneRenderer: (
    renderFn: ((renderer: THREE.WebGLRenderer, dt: number) => void) | null
  ) => void;
  requestRender: () => void;
  onClosePlayground: () => void;
}

export type PlaygroundTemplateId = 'a7iv' | 'zve1' | 'fx3' | 'wlk220' | 'empty';
export type PlaygroundCameraView = 'iso' | 'front' | 'side' | 'top' | 'back';
export type PlaygroundShadingMode = 'solid' | 'xray' | 'wireframe';

interface PlacedInstance {
  readonly uid: string;
  readonly entry: CatalogPartEntry;
  readonly blueprint: ExtractedPartBlueprint;
  readonly group: THREE.Group;
  diagHelper: THREE.Box3Helper | null;
  hidden: boolean;
  locked: boolean;
}

interface SerializedPartState {
  uid: string;
  key: string;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: [number, number, number];
  hidden?: boolean;
  locked?: boolean;
}

type RoleFilterKey =
  | 'all'
  | 'optics'
  | 'sensor'
  | 'shutter'
  | 'processor'
  | 'power'
  | 'storage'
  | 'body'
  | 'viewfinder'
  | 'audio_io'
  | 'welcome';

const ROLE_FILTER_CHIPS: ReadonlyArray<{ readonly key: RoleFilterKey; readonly label: string }> = [
  { key: 'all', label: 'すべて' },
  { key: 'optics', label: '光学' },
  { key: 'sensor', label: '撮像' },
  { key: 'shutter', label: '露光' },
  { key: 'processor', label: '基板' },
  { key: 'power', label: '電源' },
  { key: 'storage', label: '記録' },
  { key: 'body', label: '筐体' },
  { key: 'viewfinder', label: 'EVF/LCD' },
  { key: 'audio_io', label: '音響/I/O' },
  { key: 'welcome', label: 'ようこそ220p' },
];

const MAX_UNDO_STEPS = 60;

function fmt1(v: number): string {
  const n = Math.abs(v) < 0.05 ? 0 : v;
  return n.toFixed(1);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function matchesRoleChip(entry: CatalogPartEntry, chip: RoleFilterKey): boolean {
  if (chip === 'all') return true;
  if (chip === 'welcome') return entry.unitId === 'welcome';
  const r: EngineeringRole = entry.role;
  if (chip === 'optics') return r === 'lens' || r === 'mount';
  if (chip === 'sensor') return r === 'sensor';
  if (chip === 'shutter') return r === 'shutter';
  if (chip === 'processor') return r === 'mainboard' || r === 'bionz' || r === 'thermal_emi';
  if (chip === 'power') return r === 'battery';
  if (chip === 'storage') return r === 'storage';
  if (chip === 'body') return r === 'body';
  if (chip === 'viewfinder') return r === 'evf' || r === 'lcd';
  if (chip === 'audio_io') return r === 'audio' || r === 'mishoe';
  return true;
}

/**
 * Play Ground 1.1 — Industrial-Grade 3D CAD Studio (`CAD STUDIO 1.1`) + `PLYA` Multi-Engine Pipeline.
 */
export class CadPlaygroundStudio {
  private readonly host: PlaygroundHostBridge;
  private readonly extractor = new PartGeometryExtractor();

  private active = false;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private orbit: OrbitControls;
  private transform: TransformControls;
  private transformHelper: THREE.Object3D;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerDown = new THREE.Vector2();

  private gridGroup: THREE.Group;
  private opticalAxisGroup: THREE.Group;
  private opticalConeMesh: THREE.Mesh;
  private cogGroup: THREE.Group;
  private partsGroup: THREE.Group;
  private diagGroup: THREE.Group;
  private selectionHelper: THREE.BoxHelper | null = null;

  private placed: PlacedInstance[] = [];
  private selectedUid: string | null = null;
  private uidSeq = 1;
  private lastReport: CameraEngineeringReport | null = null;
  private lastPlyaReport: PlyaPipelineReport | null = null;
  private designProfile: CameraDesignProfile = 'auto';
  private shadingMode: PlaygroundShadingMode = 'solid';
  private showDiagnostics3D = true;
  private showOpticalAxis = true;
  private showCogMarker = true;
  private showGrid = true;

  private undoStack: SerializedPartState[][] = [];
  private redoStack: SerializedPartState[][] = [];
  private isApplyingHistory = false;

  // Shared override materials for X-Ray / Wireframe / 3D Red Error / Amber Warning highlighting
  private readonly xrayMat: THREE.MeshStandardMaterial;
  private readonly wireMat: THREE.MeshBasicMaterial;
  private readonly errorPartMat: THREE.MeshStandardMaterial;
  private readonly warnPartMat: THREE.MeshStandardMaterial;
  private readonly originalMats = new WeakMap<THREE.Mesh, THREE.Material | THREE.Material[]>();

  // UI Root & Elements
  private rootEl: HTMLElement;
  private catalogListEl!: HTMLElement;
  private catalogSearchEl!: HTMLInputElement;
  private catalogUnitSelectEl!: HTMLSelectElement;
  private catalogCountEl!: HTMLElement;
  private roleChipsEl!: HTMLElement;
  private placedListEl!: HTMLElement;
  private liveStripEl!: HTMLElement;
  private viewportAlertEl!: HTMLElement;
  private inspectorBodyEl!: HTMLElement;
  private reportModalEl!: HTMLElement;
  private reportContentEl!: HTMLElement;
  private shortcutModalEl!: HTMLElement;
  private scoreBadgeEl!: HTMLElement;
  private profileSelectEl!: HTMLSelectElement;
  private templateSelectEl!: HTMLSelectElement;
  private statusToastEl!: HTMLElement;
  private loadingOverlayEl!: HTMLElement;

  private modeBtns: Record<'translate' | 'rotate' | 'scale', HTMLButtonElement> = {} as Record<
    'translate' | 'rotate' | 'scale',
    HTMLButtonElement
  >;
  private shadingBtns: Record<PlaygroundShadingMode, HTMLButtonElement> = {} as Record<
    PlaygroundShadingMode,
    HTMLButtonElement
  >;
  private spaceBtn!: HTMLButtonElement;
  private snapSelectEl!: HTMLSelectElement;
  private rotSnapSelectEl!: HTMLSelectElement;
  private axisToggleBtn!: HTMLButtonElement;
  private cogToggleBtn!: HTMLButtonElement;
  private diagToggleBtn!: HTMLButtonElement;
  private gridToggleBtn!: HTMLButtonElement;
  private undoBtn!: HTMLButtonElement;
  private redoBtn!: HTMLButtonElement;

  private activeFilterUnit = 'all';
  private activeRoleChip: RoleFilterKey = 'all';
  private activeSearch = '';
  private mobileTab: 'viewport' | 'catalog' | 'inspector' = 'viewport';
  private toastTimer = 0;

  private boundPointerDown = (e: PointerEvent) => this.onCanvasPointerDown(e);
  private boundPointerUp = (e: PointerEvent) => this.onCanvasPointerUp(e);
  private boundKeyDown = (e: KeyboardEvent) => this.onKeyDown(e);
  private boundResize = () => this.handleResize();

  constructor(appRoot: HTMLElement, host: PlaygroundHostBridge) {
    this.host = host;

    this.xrayMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.wireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.62,
    });
    this.errorPartMat = new THREE.MeshStandardMaterial({
      color: 0xff2b2b,
      emissive: 0xdc2626,
      emissiveIntensity: 0.72,
      roughness: 0.32,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });
    this.warnPartMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.45,
      roughness: 0.38,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    // 1. Setup Industrial CAD Scene & Studio Lighting
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf3f6fb);

    const w = Math.max(1, host.container.clientWidth);
    const h = Math.max(1, host.container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(34, w / h, 0.5, 4000);
    this.camera.position.set(-148, 92, 188);

    this.orbit = new OrbitControls(this.camera, host.renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.dampingFactor = 0.08;
    this.orbit.minDistance = 12;
    this.orbit.maxDistance = 1400;
    this.orbit.target.set(0, 10, 8);
    this.orbit.enabled = false;
    this.orbit.addEventListener('change', () => {
      if (this.active) this.host.requestRender();
    });

    this.transform = new TransformControls(this.camera, host.renderer.domElement);
    this.transform.setSize(0.84);
    this.transform.enabled = false;
    this.transform.addEventListener('dragging-changed', (ev) => {
      this.orbit.enabled = this.active && !(ev as unknown as { value: boolean }).value;
      if (!(ev as unknown as { value: boolean }).value) {
        this.pushHistorySnapshot();
        this.refreshInspectorValues();
        this.refreshLiveBadge(false);
      }
      this.host.requestRender();
    });
    this.transform.addEventListener('objectChange', () => {
      this.updateSelectionHelper();
      this.refreshInspectorValues();
      this.host.requestRender();
    });
    this.transformHelper = this.transform.getHelper();
    this.scene.add(this.transformHelper);

    // 4-Light Precision Studio CAD Rig
    const hemi = new THREE.HemisphereLight(0xffffff, 0xcbd5e1, 1.58);
    const key = new THREE.DirectionalLight(0xfffcf5, 1.48);
    key.position.set(145, 225, 185);
    const fill = new THREE.DirectionalLight(0xe0ecff, 0.88);
    fill.position.set(-165, 115, 125);
    const rim = new THREE.DirectionalLight(0xf1f5f9, 0.8);
    rim.position.set(0, 135, -215);
    this.scene.add(hemi, key, fill, rim);

    // Millimeter CAD Build Plate & Reference Grid (240mm x 240mm)
    this.gridGroup = new THREE.Group();
    const majorGrid = new THREE.GridHelper(240, 24, 0x94a3b8, 0xdbe2ec);
    majorGrid.position.y = -48;
    const fineGrid = new THREE.GridHelper(120, 60, 0xcbd5e1, 0xe8edf5);
    fineGrid.position.y = -47.95;
    const axisHelper = new THREE.AxesHelper(36);
    axisHelper.position.set(-112, -47.8, -112);
    this.gridGroup.add(majorGrid, fineGrid, axisHelper);
    this.scene.add(this.gridGroup);

    // Sony E-Mount Optical Axis Laser Guide + 18.0mm Flange Ring + Translucent 3D Optical Light Cone!
    this.opticalAxisGroup = new THREE.Group();
    const axisPts = [new THREE.Vector3(0, 0, -85), new THREE.Vector3(0, 0, 148)];
    const axisLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(axisPts),
      new THREE.LineDashedMaterial({
        color: 0xe65a28,
        dashSize: 4,
        gapSize: 2.5,
        transparent: true,
        opacity: 0.82,
      })
    );
    axisLine.computeLineDistances();

    // 36×24mm Full-Frame Sensor Focal Plane Frame (Z = 0)
    const sensorPlaneFrame = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-18, -12, 0),
        new THREE.Vector3(18, -12, 0),
        new THREE.Vector3(18, 12, 0),
        new THREE.Vector3(-18, 12, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.78 })
    );

    // E-Mount 18.0mm Flange Ring (Ø46.1mm, Z = +18mm)
    const mountPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      mountPts.push(new THREE.Vector3(Math.cos(a) * 23.05, Math.sin(a) * 23.05, 18.0));
    }
    const mountRing = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(mountPts),
      new THREE.LineBasicMaterial({ color: 0xe65a28, transparent: true, opacity: 0.82 })
    );

    // Translucent 3D Optical Light Frustum Cone (Sensor Z=0 -> Lens Front Z=+62)
    const coneGeo = new THREE.CylinderGeometry(23.5, 15.5, 62, 32, 1, true);
    coneGeo.rotateX(Math.PI / 2);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.opticalConeMesh = new THREE.Mesh(coneGeo, coneMat);
    this.opticalConeMesh.position.set(0, 0, 31);

    this.opticalAxisGroup.add(axisLine, sensorPlaneFrame, mountRing, this.opticalConeMesh);
    this.scene.add(this.opticalAxisGroup);

    // Industrial 3D Center-of-Gravity (CoG) Marker
    this.cogGroup = new THREE.Group();
    const cogSphere = new THREE.Mesh(
      new THREE.SphereGeometry(4.2, 18, 14),
      new THREE.MeshBasicMaterial({ color: 0xfacc15, depthTest: false, transparent: true, opacity: 0.92 })
    );
    cogSphere.renderOrder = 25;
    const cogRing = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * 7.2, Math.sin(a) * 7.2, 0);
        })
      ),
      new THREE.LineBasicMaterial({ color: 0x0f172a, depthTest: false })
    );
    cogRing.renderOrder = 26;
    const cogCross = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(0, -10, 0),
        new THREE.Vector3(0, 10, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(0, 0, 10),
      ]),
      new THREE.LineBasicMaterial({ color: 0xd97706, depthTest: false })
    );
    cogCross.renderOrder = 26;
    this.cogGroup.add(cogSphere, cogRing, cogCross);
    this.cogGroup.visible = false;
    this.scene.add(this.cogGroup);

    this.partsGroup = new THREE.Group();
    this.diagGroup = new THREE.Group();
    this.scene.add(this.partsGroup, this.diagGroup);

    // 2. Build Play Ground 1.1 Industrial CAD Studio UI Overlay
    this.rootEl = document.createElement('div');
    this.rootEl.className = 'pg-studio-overlay';
    this.rootEl.dataset.mobileTab = 'viewport';
    this.rootEl.setAttribute('aria-hidden', 'true');
    this.buildDom();
    appRoot.appendChild(this.rootEl);
  }

  private buildDom(): void {
    const profileOptions = (Object.keys(CAMERA_PROFILE_LABELS) as CameraDesignProfile[])
      .map((k) => `<option value="${k}">${CAMERA_PROFILE_LABELS[k]}</option>`)
      .join('');

    const roleChipHtml = ROLE_FILTER_CHIPS.map(
      (c) =>
        `<button type="button" class="pg-role-chip${c.key === 'all' ? ' is-active' : ''}" data-role-chip="${c.key}">${c.label}</button>`
    ).join('');

    this.rootEl.innerHTML = `
      <header class="pg-topbar">
        <div class="pg-topbar-left">
          <button type="button" class="pg-btn pg-btn-exit" data-action="exit" title="通常ビューへ戻る (Esc)">
            <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            <span>戻る</span>
          </button>
          <div class="pg-brand">
            <span class="pg-brand-badge">CAD STUDIO 1.1</span>
            <span class="pg-brand-title">Play Ground</span>
          </div>
          <div class="pg-sep"></div>
          <div class="pg-tool-seg" role="group" aria-label="トランスフォームモード">
            <button type="button" class="pg-seg-btn is-active" data-tmode="translate" title="移動 (W)">移動 <em>W</em></button>
            <button type="button" class="pg-seg-btn" data-tmode="rotate" title="回転 (E)">回転 <em>E</em></button>
            <button type="button" class="pg-seg-btn" data-tmode="scale" title="スケール (S)">拡縮 <em>S</em></button>
          </div>
          <button type="button" class="pg-btn pg-btn-sm" data-action="space" title="座標系切替 (Q)">World</button>
          <label class="pg-snap-field" title="移動グリッドスナップ">
            <span>Snap</span>
            <select data-field="gridSnap">
              <option value="0">OFF</option>
              <option value="0.5">0.5mm</option>
              <option value="1" selected>1mm</option>
              <option value="2">2mm</option>
              <option value="5">5mm</option>
              <option value="10">10mm</option>
            </select>
          </label>
          <label class="pg-snap-field" title="角度スナップ">
            <span>Rot</span>
            <select data-field="rotSnap">
              <option value="0">OFF</option>
              <option value="5">5°</option>
              <option value="15" selected>15°</option>
              <option value="45">45°</option>
            </select>
          </label>
          <div class="pg-sep"></div>
          <button type="button" class="pg-btn pg-btn-icon" data-action="undo" title="元に戻す (Ctrl+Z)" disabled>
            <svg viewBox="0 0 24 24"><path d="M9 14L4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
          </button>
          <button type="button" class="pg-btn pg-btn-icon" data-action="redo" title="やり直す (Ctrl+Y)" disabled>
            <svg viewBox="0 0 24 24"><path d="M15 14l5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
          </button>
        </div>

        <div class="pg-topbar-right">
          <label class="pg-snap-field pg-profile-field" title="カメラ設計プロファイル（採点基準を自由に切替）">
            <span>設計目標</span>
            <select data-field="profileSelect">${profileOptions}</select>
          </label>
          <label class="pg-snap-field pg-template-field" title="スターターカメラ構成を読込">
            <span>雛形</span>
            <select data-field="templateSelect">
              <option value="a7iv">α7 IV 一眼</option>
              <option value="zve1">ZV-E1 VLOG</option>
              <option value="fx3">FX3 シネマ</option>
              <option value="wlk220">ようこそ WLK-220</option>
              <option value="empty">白紙クリア</option>
            </select>
          </label>
          <button type="button" class="pg-btn pg-btn-sm" data-action="exportJson" title="設計JSONを保存">保存</button>
          <button type="button" class="pg-btn pg-btn-sm" data-action="importJson" title="設計JSONを読込">読込</button>
          <button type="button" class="pg-btn pg-btn-grade pg-btn-plya" data-action="evaluate" title="PLYA一括検査（KiCad・光線・3D干渉・熱・電源・EMC 全8ツール高速実行＆1000点採点）">
            <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>PLYA</span>
            <strong class="pg-score-pill" data-field="scoreBadge">-- / 1000</strong>
          </button>
        </div>
      </header>

      <!-- Floating Top-Center 3D Visual Error / PLYA Status Banner -->
      <button type="button" class="pg-viewport-alert" data-field="viewportAlert" title="クリックでPLYA詳細レポートを表示"></button>

      <aside class="pg-left-panel" aria-label="全パーツカタログ">
        <div class="pg-panel-head">
          <span class="pg-panel-title">全パーツライブラリ</span>
          <span class="pg-panel-meta" data-field="catalogCount">読込中...</span>
        </div>
        <div class="pg-role-chips" data-field="roleChips">${roleChipHtml}</div>
        <div class="pg-catalog-filters">
          <select class="pg-select" data-field="unitFilter"></select>
          <input type="search" class="pg-search" data-field="searchInput" placeholder="パーツ名・IDで検索 (例: lens, bionz, W01)..." />
        </div>
        <div class="pg-catalog-list" data-field="catalogList"></div>
      </aside>

      <aside class="pg-right-panel" aria-label="CADインスペクター">
        <div class="pg-live-strip" data-field="liveStrip"></div>
        <div class="pg-panel-head">
          <span class="pg-panel-title">配置ツリー &amp; 精密座標</span>
          <button type="button" class="pg-btn-mini" data-action="autoAlignOptics" title="光学系を18.0mm Eマウント基準へ自動整列">18mm自動整列</button>
        </div>
        <div class="pg-placed-list" data-field="placedList"></div>
        <div class="pg-inspector-body" data-field="inspectorBody"></div>
      </aside>

      <!-- Floating Bottom Industrial CAD Viewport HUD Bar -->
      <div class="pg-viewport-bar" role="toolbar" aria-label="3Dビューポート操作">
        <div class="pg-vbar-group">
          <button type="button" class="pg-vbar-btn" data-camview="iso" title="アイソメ図 (1)">ISO</button>
          <button type="button" class="pg-vbar-btn" data-camview="front" title="正面図 (2)">正面</button>
          <button type="button" class="pg-vbar-btn" data-camview="side" title="側面図 (3)">側面</button>
          <button type="button" class="pg-vbar-btn" data-camview="top" title="上面図 (4)">上面</button>
          <button type="button" class="pg-vbar-btn" data-camview="back" title="背面図 (5)">背面</button>
          <button type="button" class="pg-vbar-btn" data-action="fitCamera" title="全体フィット (F)">フィット</button>
        </div>
        <div class="pg-vbar-sep"></div>
        <div class="pg-vbar-group">
          <button type="button" class="pg-vbar-btn is-active" data-shade="solid" title="ソリッド表示">ソリッド</button>
          <button type="button" class="pg-vbar-btn" data-shade="xray" title="X-Ray内部透視">X-Ray</button>
          <button type="button" class="pg-vbar-btn" data-shade="wireframe" title="ワイヤーフレーム表示">ワイヤー</button>
        </div>
        <div class="pg-vbar-sep"></div>
        <div class="pg-vbar-group">
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleAxis" title="光軸・18mmフランジ・光束コーン表示">光束コーン</button>
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleCog" title="3D質量重心 (CoG) マーカー表示">重心CoG</button>
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleDiag" title="エラー部品を赤色・注意部品を黄色で3D表示">エラー赤表示</button>
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleGrid" title="ミリ基準グリッド表示">グリッド</button>
          <button type="button" class="pg-vbar-btn" data-action="toggleShortcuts" title="キーボードショートカット一覧 (?)">?</button>
        </div>
      </div>

      <!-- Mobile-Responsive Tab Switcher (<= 860px) -->
      <nav class="pg-mobile-tabs" aria-label="モバイル切替">
        <button type="button" class="pg-mob-tab is-active" data-mob-tab="viewport">3D CAD</button>
        <button type="button" class="pg-mob-tab" data-mob-tab="catalog">パーツ庫</button>
        <button type="button" class="pg-mob-tab" data-mob-tab="inspector">座標・採点</button>
      </nav>

      <!-- PLYA 8-Engine Verification & 1,000-Point Chief Engineer Report Modal 1.1 -->
      <div class="pg-report-modal" data-field="reportModal" aria-hidden="true">
        <div class="pg-report-card" role="dialog" aria-modal="true" aria-label="PLYA 一括検証 & 1000点採点レポート">
          <div class="pg-report-head">
            <div>
              <div class="pg-report-kicker">PLYA FAST MULTI-ENGINE PIPELINE · PLAY GROUND 1.1</div>
              <h2 class="pg-report-title">PLYA 全8種ツール一括検証 ＆ 1,000点満点評価レポート</h2>
            </div>
            <button type="button" class="pg-btn pg-btn-icon" data-action="closeReport" aria-label="閉じる">
              <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="pg-report-content" data-field="reportContent"></div>
        </div>
      </div>

      <!-- CAD Keyboard Shortcuts Overlay -->
      <div class="pg-shortcut-modal" data-field="shortcutModal" aria-hidden="true">
        <div class="pg-shortcut-card">
          <div class="pg-shortcut-head">
            <strong>CAD STUDIO 1.1 ショートカット</strong>
            <button type="button" class="pg-btn-mini" data-action="closeShortcuts">閉じる</button>
          </div>
          <div class="pg-shortcut-grid">
            <div><kbd>W</kbd> / <kbd>G</kbd></div><div>移動ギズモ</div>
            <div><kbd>E</kbd> / <kbd>R</kbd></div><div>回転ギズモ</div>
            <div><kbd>S</kbd></div><div>拡縮ギズモ</div>
            <div><kbd>Q</kbd></div><div>World / Local 座標系切替</div>
            <div><kbd>1</kbd>–<kbd>5</kbd></div><div>ISO / 正面 / 側面 / 上面 / 背面</div>
            <div><kbd>F</kbd></div><div>全体フィット / 選択ズーム</div>
            <div><kbd>Ctrl+D</kbd></div><div>選択パーツを複製</div>
            <div><kbd>Ctrl+Z</kbd> / <kbd>Y</kbd></div><div>元に戻す / やり直す</div>
            <div><kbd>Del</kbd></div><div>選択パーツを削除</div>
            <div><kbd>?</kbd> / <kbd>Esc</kbd></div><div>ヘルプ / 閉じる</div>
          </div>
        </div>
      </div>

      <div class="pg-toast" data-field="toast"></div>
      <div class="pg-loading" data-field="loading"><span>3D CADジオメトリ抽出中...</span></div>
      <input type="file" accept=".json,application/json" style="display:none" data-field="fileInput" />
    `;

    // Wire element references
    this.catalogListEl = this.rootEl.querySelector('[data-field="catalogList"]') as HTMLElement;
    this.catalogSearchEl = this.rootEl.querySelector('[data-field="searchInput"]') as HTMLInputElement;
    this.catalogUnitSelectEl = this.rootEl.querySelector('[data-field="unitFilter"]') as HTMLSelectElement;
    this.catalogCountEl = this.rootEl.querySelector('[data-field="catalogCount"]') as HTMLElement;
    this.roleChipsEl = this.rootEl.querySelector('[data-field="roleChips"]') as HTMLElement;
    this.placedListEl = this.rootEl.querySelector('[data-field="placedList"]') as HTMLElement;
    this.liveStripEl = this.rootEl.querySelector('[data-field="liveStrip"]') as HTMLElement;
    this.viewportAlertEl = this.rootEl.querySelector('[data-field="viewportAlert"]') as HTMLElement;
    this.inspectorBodyEl = this.rootEl.querySelector('[data-field="inspectorBody"]') as HTMLElement;
    this.reportModalEl = this.rootEl.querySelector('[data-field="reportModal"]') as HTMLElement;
    this.reportContentEl = this.rootEl.querySelector('[data-field="reportContent"]') as HTMLElement;
    this.shortcutModalEl = this.rootEl.querySelector('[data-field="shortcutModal"]') as HTMLElement;
    this.scoreBadgeEl = this.rootEl.querySelector('[data-field="scoreBadge"]') as HTMLElement;
    this.profileSelectEl = this.rootEl.querySelector('[data-field="profileSelect"]') as HTMLSelectElement;
    this.templateSelectEl = this.rootEl.querySelector('[data-field="templateSelect"]') as HTMLSelectElement;
    this.statusToastEl = this.rootEl.querySelector('[data-field="toast"]') as HTMLElement;
    this.loadingOverlayEl = this.rootEl.querySelector('[data-field="loading"]') as HTMLElement;

    this.modeBtns.translate = this.rootEl.querySelector('[data-tmode="translate"]') as HTMLButtonElement;
    this.modeBtns.rotate = this.rootEl.querySelector('[data-tmode="rotate"]') as HTMLButtonElement;
    this.modeBtns.scale = this.rootEl.querySelector('[data-tmode="scale"]') as HTMLButtonElement;
    this.shadingBtns.solid = this.rootEl.querySelector('[data-shade="solid"]') as HTMLButtonElement;
    this.shadingBtns.xray = this.rootEl.querySelector('[data-shade="xray"]') as HTMLButtonElement;
    this.shadingBtns.wireframe = this.rootEl.querySelector('[data-shade="wireframe"]') as HTMLButtonElement;

    this.spaceBtn = this.rootEl.querySelector('[data-action="space"]') as HTMLButtonElement;
    this.snapSelectEl = this.rootEl.querySelector('[data-field="gridSnap"]') as HTMLSelectElement;
    this.rotSnapSelectEl = this.rootEl.querySelector('[data-field="rotSnap"]') as HTMLSelectElement;
    this.axisToggleBtn = this.rootEl.querySelector('[data-action="toggleAxis"]') as HTMLButtonElement;
    this.cogToggleBtn = this.rootEl.querySelector('[data-action="toggleCog"]') as HTMLButtonElement;
    this.diagToggleBtn = this.rootEl.querySelector('[data-action="toggleDiag"]') as HTMLButtonElement;
    this.gridToggleBtn = this.rootEl.querySelector('[data-action="toggleGrid"]') as HTMLButtonElement;
    this.undoBtn = this.rootEl.querySelector('[data-action="undo"]') as HTMLButtonElement;
    this.redoBtn = this.rootEl.querySelector('[data-action="redo"]') as HTMLButtonElement;
    const fileInput = this.rootEl.querySelector('[data-field="fileInput"]') as HTMLInputElement;

    // Default snap values
    this.transform.setTranslationSnap(1);
    this.transform.setRotationSnap(THREE.MathUtils.degToRad(15));

    // Topbar bindings
    this.rootEl.querySelector('[data-action="exit"]')?.addEventListener('click', () => this.close());
    (['translate', 'rotate', 'scale'] as const).forEach((m) => {
      this.modeBtns[m].addEventListener('click', () => this.setTransformMode(m));
    });
    this.spaceBtn.addEventListener('click', () => this.toggleSpace());
    this.snapSelectEl.addEventListener('change', () => {
      const v = Number(this.snapSelectEl.value);
      this.transform.setTranslationSnap(v > 0 ? v : null);
    });
    this.rotSnapSelectEl.addEventListener('change', () => {
      const v = Number(this.rotSnapSelectEl.value);
      this.transform.setRotationSnap(v > 0 ? THREE.MathUtils.degToRad(v) : null);
    });
    this.undoBtn.addEventListener('click', () => void this.undo());
    this.redoBtn.addEventListener('click', () => void this.redo());

    this.profileSelectEl.addEventListener('change', () => {
      this.setDesignProfile(this.profileSelectEl.value as CameraDesignProfile);
    });
    this.templateSelectEl.addEventListener('change', () => {
      const tpl = this.templateSelectEl.value as PlaygroundTemplateId;
      void this.loadTemplate(tpl);
    });

    this.rootEl.querySelector('[data-action="exportJson"]')?.addEventListener('click', () => {
      this.exportBlueprintJson();
    });
    this.rootEl.querySelector('[data-action="importJson"]')?.addEventListener('click', () => {
      fileInput.click();
    });
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) void this.importBlueprintFile(file);
      fileInput.value = '';
    });
    this.rootEl.querySelector('[data-action="evaluate"]')?.addEventListener('click', () => {
      this.runPlyaPipeline(true);
    });
    this.viewportAlertEl.addEventListener('click', () => {
      this.runPlyaPipeline(true);
    });
    this.rootEl.querySelector('[data-action="autoAlignOptics"]')?.addEventListener('click', () => {
      this.autoAlignOpticalChain();
    });

    // Bottom viewport bar bindings
    this.rootEl.querySelectorAll<HTMLButtonElement>('[data-camview]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setCameraView(btn.dataset.camview as PlaygroundCameraView);
      });
    });
    this.rootEl.querySelector('[data-action="fitCamera"]')?.addEventListener('click', () => {
      this.fitCameraToWorkspace();
    });
    (['solid', 'xray', 'wireframe'] as const).forEach((sm) => {
      this.shadingBtns[sm].addEventListener('click', () => this.setShadingMode(sm));
    });
    this.axisToggleBtn.addEventListener('click', () => {
      this.showOpticalAxis = !this.showOpticalAxis;
      this.opticalAxisGroup.visible = this.showOpticalAxis;
      this.axisToggleBtn.classList.toggle('is-active', this.showOpticalAxis);
      this.host.requestRender();
    });
    this.cogToggleBtn.addEventListener('click', () => {
      this.showCogMarker = !this.showCogMarker;
      this.cogGroup.visible = this.showCogMarker && this.placed.length > 0;
      this.cogToggleBtn.classList.toggle('is-active', this.showCogMarker);
      this.host.requestRender();
    });
    this.diagToggleBtn.addEventListener('click', () => {
      this.showDiagnostics3D = !this.showDiagnostics3D;
      this.diagGroup.visible = this.showDiagnostics3D;
      this.diagToggleBtn.classList.toggle('is-active', this.showDiagnostics3D);
      this.applyAllVisualMaterials();
      this.host.requestRender();
    });
    this.gridToggleBtn.addEventListener('click', () => {
      this.showGrid = !this.showGrid;
      this.gridGroup.visible = this.showGrid;
      this.gridToggleBtn.classList.toggle('is-active', this.showGrid);
      this.host.requestRender();
    });
    this.rootEl.querySelector('[data-action="toggleShortcuts"]')?.addEventListener('click', () => {
      const open = !this.shortcutModalEl.classList.contains('is-open');
      this.shortcutModalEl.classList.toggle('is-open', open);
      this.shortcutModalEl.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    this.rootEl.querySelector('[data-action="closeShortcuts"]')?.addEventListener('click', () => {
      this.shortcutModalEl.classList.remove('is-open');
      this.shortcutModalEl.setAttribute('aria-hidden', 'true');
    });
    this.shortcutModalEl.addEventListener('click', (e) => {
      if (e.target === this.shortcutModalEl) {
        this.shortcutModalEl.classList.remove('is-open');
        this.shortcutModalEl.setAttribute('aria-hidden', 'true');
      }
    });

    // Report modal close
    this.rootEl.querySelector('[data-action="closeReport"]')?.addEventListener('click', () => {
      this.closeEvaluationReport();
    });
    this.reportModalEl.addEventListener('click', (e) => {
      if (e.target === this.reportModalEl) this.closeEvaluationReport();
    });

    // Left catalog filters + role chips
    this.roleChipsEl.querySelectorAll<HTMLButtonElement>('[data-role-chip]').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.activeRoleChip = chip.dataset.roleChip as RoleFilterKey;
        this.roleChipsEl.querySelectorAll('.pg-role-chip').forEach((el) => {
          el.classList.toggle('is-active', el === chip);
        });
        this.renderCatalogList();
      });
    });
    this.catalogUnitSelectEl.addEventListener('change', () => {
      this.activeFilterUnit = this.catalogUnitSelectEl.value;
      this.renderCatalogList();
    });
    this.catalogSearchEl.addEventListener('input', () => {
      this.activeSearch = this.catalogSearchEl.value.trim().toLowerCase();
      this.renderCatalogList();
    });

    // Mobile tab switcher
    this.rootEl.querySelectorAll<HTMLButtonElement>('[data-mob-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.mobileTab = btn.dataset.mobTab as 'viewport' | 'catalog' | 'inspector';
        this.rootEl.dataset.mobileTab = this.mobileTab;
        this.rootEl.querySelectorAll('[data-mob-tab]').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
        });
      });
    });

    this.renderPlacedList();
    this.renderInspector();
  }

  public isOpen(): boolean {
    return this.active;
  }

  public async open(): Promise<void> {
    if (this.active) return;
    this.active = true;
    this.rootEl.classList.add('is-open');
    this.rootEl.setAttribute('aria-hidden', 'false');

    this.orbit.enabled = true;
    this.transform.enabled = true;
    this.handleResize();

    this.host.setCustomSceneRenderer((renderer) => {
      this.orbit.update();
      renderer.render(this.scene, this.camera);
    });

    const dom = this.host.renderer.domElement;
    dom.addEventListener('pointerdown', this.boundPointerDown);
    dom.addEventListener('pointerup', this.boundPointerUp);
    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('resize', this.boundResize);

    const { units, entries } = await this.extractor.ensureCatalogLoaded();
    this.populateUnitFilter(units, entries.length);
    this.renderCatalogList();

    if (this.placed.length === 0) {
      await this.loadTemplate('a7iv');
    } else {
      this.refreshLiveBadge(false);
    }
    this.host.requestRender();
  }

  public close(): void {
    if (!this.active) return;
    this.active = false;
    this.closeEvaluationReport();
    this.shortcutModalEl.classList.remove('is-open');
    this.rootEl.classList.remove('is-open');
    this.rootEl.setAttribute('aria-hidden', 'true');
    this.orbit.enabled = false;
    this.transform.enabled = false;
    this.transform.detach();

    const dom = this.host.renderer.domElement;
    dom.removeEventListener('pointerdown', this.boundPointerDown);
    dom.removeEventListener('pointerup', this.boundPointerUp);
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('resize', this.boundResize);

    this.host.setCustomSceneRenderer(null);
    this.host.onClosePlayground();
  }

  private handleResize(): void {
    const w = Math.max(1, this.host.container.clientWidth);
    const h = Math.max(1, this.host.container.clientHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.host.requestRender();
  }

  public setDesignProfile(profile: CameraDesignProfile): CameraEngineeringReport {
    this.designProfile = profile;
    this.profileSelectEl.value = profile;
    const rep = this.runEngineeringEvaluation();
    if (this.reportModalEl.classList.contains('is-open')) {
      this.renderReportModal(rep);
    }
    this.showToast(`設計目標プロファイル: ${CAMERA_PROFILE_LABELS[profile]}`);
    return rep;
  }

  public setShadingMode(mode: PlaygroundShadingMode): void {
    this.shadingMode = mode;
    (['solid', 'xray', 'wireframe'] as const).forEach((sm) => {
      this.shadingBtns[sm].classList.toggle('is-active', sm === mode);
    });
    this.applyAllVisualMaterials();
    this.host.requestRender();
  }

  private applyAllVisualMaterials(): void {
    for (const inst of this.placed) {
      const flag = this.showDiagnostics3D ? this.lastReport?.partDiagnostics.get(inst.uid) : undefined;
      const severity = flag?.severity ?? 'ok';
      this.applyShadingToGroup(inst.group, this.shadingMode, severity);
    }
  }

  private applyShadingToGroup(
    group: THREE.Group,
    mode: PlaygroundShadingMode,
    severity: 'ok' | 'warn' | 'error' = 'ok'
  ): void {
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      if (!this.originalMats.has(mesh)) {
        this.originalMats.set(mesh, mesh.material);
      }
      if (this.showDiagnostics3D && severity === 'error') {
        mesh.material = this.errorPartMat;
      } else if (this.showDiagnostics3D && severity === 'warn') {
        mesh.material = this.warnPartMat;
      } else if (mode === 'solid') {
        mesh.material = this.originalMats.get(mesh)!;
      } else if (mode === 'xray') {
        mesh.material = this.xrayMat;
      } else {
        mesh.material = this.wireMat;
      }
    });
  }

  public setCameraView(view: PlaygroundCameraView): void {
    const box =
      this.placed.length > 0
        ? new THREE.Box3().setFromObject(this.partsGroup)
        : new THREE.Box3(new THREE.Vector3(-60, -40, -40), new THREE.Vector3(60, 50, 65));
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const dist = Math.max(115, size.length() * 1.48);

    this.orbit.target.copy(center);
    if (view === 'iso') {
      this.camera.position.set(center.x - dist * 0.62, center.y + dist * 0.36, center.z + dist * 0.74);
    } else if (view === 'front') {
      this.camera.position.set(center.x, center.y + 4, center.z + dist * 1.05);
    } else if (view === 'side') {
      this.camera.position.set(center.x - dist * 1.08, center.y + 4, center.z);
    } else if (view === 'top') {
      this.camera.position.set(center.x, center.y + dist * 1.15, center.z + 10);
    } else {
      this.camera.position.set(center.x, center.y + 4, center.z - dist * 1.05);
    }
    this.orbit.update();
    this.host.requestRender();
  }

  private populateUnitFilter(
    units: readonly { unitId: string; nameJa: string; count: number }[],
    totalParts: number
  ): void {
    if (this.catalogUnitSelectEl.options.length > 0) return;
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = `全ユニット (${totalParts.toLocaleString()}パーツ)`;
    this.catalogUnitSelectEl.appendChild(allOpt);
    for (const u of units) {
      const opt = document.createElement('option');
      opt.value = u.unitId;
      opt.textContent = `${u.nameJa} (${u.count})`;
      this.catalogUnitSelectEl.appendChild(opt);
    }
  }

  private renderCatalogList(): void {
    const all = this.extractor.getAllEntries();
    const filtered: CatalogPartEntry[] = [];
    for (let i = 0; i < all.length; i++) {
      const e = all[i];
      if (!matchesRoleChip(e, this.activeRoleChip)) continue;
      if (this.activeFilterUnit !== 'all' && e.unitId !== this.activeFilterUnit) continue;
      if (this.activeSearch) {
        const hay = `${e.title} ${e.subtitle} ${e.partId} ${e.category} ${e.unitNameJa}`.toLowerCase();
        if (!hay.includes(this.activeSearch)) continue;
      }
      filtered.push(e);
    }

    this.catalogCountEl.textContent = `${filtered.length.toLocaleString()} / ${all.length.toLocaleString()}件`;
    const maxRender = 160;
    const slice = filtered.slice(0, maxRender);
    const frag = document.createDocumentFragment();

    for (let i = 0; i < slice.length; i++) {
      const e = slice[i];
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'pg-cat-item';
      row.innerHTML = `
        <span class="pg-cat-swatch" style="background:${escapeHtml(e.swatchColor)}"></span>
        <span class="pg-cat-info">
          <span class="pg-cat-title">${escapeHtml(e.title)}</span>
          <span class="pg-cat-sub">${escapeHtml(e.unitId.toUpperCase())} · ${escapeHtml(e.category)}</span>
        </span>
        <span class="pg-cat-add">+</span>
      `;
      row.addEventListener('click', () => {
        void this.spawnPart(e.key);
      });
      frag.appendChild(row);
    }

    if (filtered.length > maxRender) {
      const more = document.createElement('div');
      more.className = 'pg-cat-more';
      more.textContent = `他 ${(filtered.length - maxRender).toLocaleString()} 件 — 検索またはロールチップで全パーツへ即アクセス`;
      frag.appendChild(more);
    }

    this.catalogListEl.innerHTML = '';
    this.catalogListEl.appendChild(frag);
  }

  private showToast(msg: string): void {
    this.statusToastEl.textContent = msg;
    this.statusToastEl.classList.add('is-visible');
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.statusToastEl.classList.remove('is-visible');
    }, 2400);
  }

  private setLoading(loading: boolean): void {
    this.loadingOverlayEl.classList.toggle('is-visible', loading);
  }

  public async spawnPart(
    key: string,
    overridePos?: [number, number, number],
    overrideRot?: [number, number, number],
    overrideScale?: [number, number, number],
    recordHistory = true,
    hidden = false,
    locked = false
  ): Promise<PlacedInstance | null> {
    this.setLoading(true);
    try {
      const uid = `pg_${this.uidSeq++}`;
      const res = await this.extractor.instantiatePartGroup(key, uid);
      if (!res) return null;

      const { group, blueprint } = res;
      if (overridePos) {
        group.position.set(overridePos[0], overridePos[1], overridePos[2]);
      } else {
        const nc = blueprint.naturalCenter;
        group.position.set(
          Math.abs(nc.x) < 160 ? nc.x : 0,
          Math.abs(nc.y) < 120 ? nc.y : 0,
          Math.abs(nc.z) < 180 ? nc.z : 0
        );
      }
      if (overrideRot) group.rotation.set(overrideRot[0], overrideRot[1], overrideRot[2]);
      if (overrideScale) group.scale.set(overrideScale[0], overrideScale[1], overrideScale[2]);
      group.visible = !hidden;

      if (this.shadingMode !== 'solid') {
        this.applyShadingToGroup(group, this.shadingMode);
      }

      this.partsGroup.add(group);
      const inst: PlacedInstance = {
        uid,
        entry: blueprint.entry,
        blueprint,
        group,
        diagHelper: null,
        hidden,
        locked,
      };
      this.placed.push(inst);
      this.selectInstance(uid);

      if (recordHistory) {
        this.pushHistorySnapshot();
        this.showToast(`配置: ${blueprint.entry.title}`);
      }
      this.renderPlacedList();
      this.refreshLiveBadge(false);
      this.host.requestRender();
      return inst;
    } finally {
      this.setLoading(false);
    }
  }

  public async loadTemplate(templateId: PlaygroundTemplateId): Promise<void> {
    this.templateSelectEl.value = templateId;
    if (templateId === 'empty') {
      this.clearAllParts(true);
      return;
    }

    this.setLoading(true);
    try {
      await this.extractor.ensureCatalogLoaded();
      const entries = this.extractor.getAllEntries();
      const pick = (unitId: string, hints: string[]): CatalogPartEntry | undefined => {
        const list = entries.filter((e) => e.unitId === unitId);
        for (const h of hints) {
          const found = list.find((e) => `${e.partId} ${e.title}`.toLowerCase().includes(h.toLowerCase()));
          if (found) return found;
        }
        return list[0];
      };
      const byId = (unitId: string, id: string, fallbackHints: string[]): CatalogPartEntry | undefined => {
        const exact = entries.find((e) => e.unitId === unitId && e.partId === id);
        return exact ?? pick(unitId, fallbackHints);
      };

      type PlanItem = {
        entry?: CatalogPartEntry;
        pos: [number, number, number];
        rot?: [number, number, number];
        scale?: [number, number, number];
      };

      let plan: PlanItem[] = [];
      let toastLabel = '';

      if (templateId === 'a7iv') {
        toastLabel = 'α7 IV 一眼ミラーレス構成';
        plan = [
          { entry: byId('body', 'body-mg-front-shell', ['mg-front', 'chassis']), pos: [0, 0, -2] },
          { entry: byId('body', 'body-top-deck', ['top-deck', 'トップ']), pos: [0, 42, -4] },
          { entry: byId('mount', 'mount-flange-ring', ['flange', 'bayonet']), pos: [0, 0, 18] },
          { entry: byId('lens', 'lens-front-cell-mount', ['front-cell', 'barrel']), pos: [0, 0, 44] },
          { entry: byId('lens', 'lens-front-xa', ['front-xa', '前玉']), pos: [0, 0, 62] },
          { entry: byId('shutter', 'shutter-curtain-1', ['curtain', '幕']), pos: [0, 0, 10] },
          { entry: pick('sensor', ['stacked', 'cmos', 'photodiode']), pos: [0, 0, 0] },
          { entry: byId('mainboard', 'mb-vapor-chamber', ['vapor', 'graphite']), pos: [0, 0, -10] },
          { entry: byId('mainboard', 'mb-sigma-graphite', ['sigma', 'graphite', 'sheet']), pos: [0, 0, -14] },
          { entry: pick('mainboard', ['hdi', 'pcb', 'substrate']), pos: [0, 0, -19] },
          { entry: byId('bionz', 'xr-nickel-cu-ihs', ['ihs', 'package']), pos: [14, 2, -26], rot: [Math.PI / 2, 0, 0] },
          { entry: byId('battery', 'bat-outer-shell-front', ['outer-shell', 'cell']), pos: [-56, -4, 4] },
          { entry: byId('cfexpress', 'cfe-top-metal-armor', ['top-metal', 'armor']), pos: [50, -2, -16] },
          { entry: byId('evf', 'evf-eyecup', ['eyecup', 'oled']), pos: [0, 44, -22] },
          { entry: byId('lcd', 'lcd-ips-panel', ['ips-panel', 'panel']), pos: [0, -4, -38] },
          { entry: byId('mishoe', 'mi-shoe-shell-plate', ['shell-plate', 'rail']), pos: [0, 58, 2] },
          { entry: byId('mic', 'mc-top-grille-holes', ['grille', 'capsule']), pos: [0, 68, 12] },
        ];
      } else if (templateId === 'zve1') {
        toastLabel = 'ZV-E1 コンパクトVLOG構成（EVFレス・電子シャッター）';
        plan = [
          { entry: byId('body', 'body-mg-front-shell', ['mg-front', 'chassis']), pos: [0, 0, -2], scale: [0.9, 0.88, 0.9] },
          { entry: byId('mount', 'mount-flange-ring', ['flange', 'bayonet']), pos: [0, 0, 18] },
          { entry: byId('lens', 'lens-front-xa', ['front-xa', '前玉']), pos: [0, 0, 40], scale: [0.85, 0.85, 0.85] },
          { entry: pick('sensor', ['stacked', 'cmos', 'photodiode']), pos: [0, 0, 0] },
          { entry: byId('mainboard', 'mb-vapor-chamber', ['vapor', 'graphite']), pos: [0, 0, -10] },
          { entry: pick('mainboard', ['hdi', 'pcb', 'substrate']), pos: [0, 0, -18] },
          { entry: byId('bionz', 'xr-nickel-cu-ihs', ['ihs', 'package']), pos: [12, 0, -25], rot: [Math.PI / 2, 0, 0] },
          { entry: byId('battery', 'bat-outer-shell-front', ['outer-shell', 'cell']), pos: [-50, -3, 2] },
          { entry: byId('cfexpress', 'cfe-top-metal-armor', ['top-metal', 'armor']), pos: [46, -2, -14] },
          { entry: byId('lcd', 'lcd-ips-panel', ['ips-panel', 'panel']), pos: [0, -2, -35] },
          { entry: byId('mishoe', 'mi-shoe-shell-plate', ['shell-plate', 'rail']), pos: [0, 40, 2] },
          { entry: byId('mic', 'mc-top-grille-holes', ['grille', 'capsule']), pos: [0, 50, 10] },
        ];
      } else if (templateId === 'fx3') {
        toastLabel = 'FX3 シネマライン構成（強化放熱・EVFレス・MI音響）';
        plan = [
          { entry: byId('body', 'body-mg-front-shell', ['mg-front', 'chassis']), pos: [0, 0, -2] },
          { entry: byId('body', 'body-top-deck', ['top-deck', 'トップ']), pos: [0, 40, -4] },
          { entry: byId('mount', 'mount-flange-ring', ['flange', 'bayonet']), pos: [0, 0, 18] },
          { entry: byId('lens', 'lens-front-cell-mount', ['front-cell', 'barrel']), pos: [0, 0, 44] },
          { entry: byId('lens', 'lens-front-xa', ['front-xa', '前玉']), pos: [0, 0, 62] },
          { entry: pick('sensor', ['stacked', 'cmos', 'photodiode']), pos: [0, 0, 0] },
          { entry: byId('mainboard', 'mb-vapor-chamber', ['vapor', 'graphite']), pos: [0, 0, -9] },
          { entry: byId('mainboard', 'mb-sigma-graphite', ['sigma', 'graphite', 'sheet']), pos: [0, 0, -14] },
          { entry: pick('mainboard', ['hdi', 'pcb', 'substrate']), pos: [0, 0, -20] },
          { entry: byId('bionz', 'xr-nickel-cu-ihs', ['ihs', 'package']), pos: [14, 2, -27], rot: [Math.PI / 2, 0, 0] },
          { entry: byId('battery', 'bat-outer-shell-front', ['outer-shell', 'cell']), pos: [-56, -4, 4] },
          { entry: byId('cfexpress', 'cfe-top-metal-armor', ['top-metal', 'armor']), pos: [50, -2, -16] },
          { entry: byId('lcd', 'lcd-ips-panel', ['ips-panel', 'panel']), pos: [0, -4, -39] },
          { entry: byId('mishoe', 'mi-shoe-shell-plate', ['shell-plate', 'rail']), pos: [0, 52, 2] },
          { entry: byId('mic', 'mc-top-grille-holes', ['grille', 'capsule']), pos: [0, 62, 12] },
        ];
      } else if (templateId === 'wlk220') {
        toastLabel = 'ようこそ WLK-220 光学キネティック装置（産業5検証適合）';
        const wIds = [
          'welcome-plinth-mg-chassis',
          'welcome-plinth-top-datum-plate',
          'welcome-plinth-bottom-weight',
          'welcome-plinth-usbc-pd-port',
          'welcome-plinth-pmic-3rail-board',
          'welcome-plinth-lifepo4-battery',
          'welcome-plinth-mainboard',
          'welcome-plinth-cortex-m7-mcu',
          'welcome-plinth-tof-presence-sensor',
          'welcome-plinth-ambient-lux-sensor',
          'welcome-plinth-cinnabar-status-bar',
          'welcome-plinth-welcome-speaker',
          'welcome-yo-cnc-chassis',
          'welcome-yo-sapphire-diffuser-lens',
          'welcome-u-cnc-chassis',
          'welcome-u-sapphire-diffuser-lens',
          'welcome-u-crest-cnc-frame',
          'welcome-u-quartz-support-post',
          'welcome-ko-cnc-chassis',
          'welcome-ko-sapphire-diffuser-lens',
          'welcome-ko-top-cnc-frame',
          'welcome-ko-quartz-col-left',
          'welcome-ko-quartz-col-right',
          'welcome-so-cnc-chassis',
          'welcome-so-sapphire-diffuser-lens',
        ];
        plan = wIds.map((wid) => ({
          entry: byId('welcome', wid, [wid]),
          pos: [NaN, NaN, NaN] as [number, number, number],
        }));
      }

      this.clearAllParts(false);
      for (const item of plan) {
        if (!item.entry) continue;
        const useNatural = Number.isNaN(item.pos[0]);
        await this.spawnPart(
          item.entry.key,
          useNatural ? undefined : item.pos,
          item.rot ?? [0, 0, 0],
          item.scale ?? [1, 1, 1],
          false
        );
      }

      this.selectInstance(this.placed[2]?.uid ?? this.placed[0]?.uid ?? null);
      this.pushHistorySnapshot();
      this.fitCameraToWorkspace();
      this.refreshLiveBadge(false);
      this.showToast(`${toastLabel} (${this.placed.length}モジュール) を配置しました`);
    } finally {
      this.setLoading(false);
    }
  }

  public async loadStarterCameraKit(): Promise<void> {
    await this.loadTemplate('a7iv');
  }

  public clearAllParts(recordHistory = true): void {
    this.transform.detach();
    this.clearSelectionHelper();
    this.clearDiagnostics3D();
    for (const inst of this.placed) {
      this.partsGroup.remove(inst.group);
    }
    this.placed = [];
    this.selectedUid = null;
    this.lastReport = null;
    this.cogGroup.visible = false;
    if (recordHistory) {
      this.pushHistorySnapshot();
      this.showToast('ワークスペースをクリアしました');
    }
    this.renderPlacedList();
    this.renderInspector();
    this.refreshLiveBadge(false);
    this.host.requestRender();
  }

  private getSelectedInstance(): PlacedInstance | null {
    if (!this.selectedUid) return null;
    return this.placed.find((p) => p.uid === this.selectedUid) ?? null;
  }

  private clearSelectionHelper(): void {
    if (this.selectionHelper) {
      this.scene.remove(this.selectionHelper);
      this.selectionHelper.dispose();
      this.selectionHelper = null;
    }
  }

  private updateSelectionHelper(): void {
    const sel = this.getSelectedInstance();
    if (!sel || sel.hidden) {
      this.clearSelectionHelper();
      return;
    }
    if (!this.selectionHelper) {
      this.selectionHelper = new THREE.BoxHelper(sel.group, 0x0284c7);
      this.scene.add(this.selectionHelper);
    } else {
      this.selectionHelper.setFromObject(sel.group);
    }
  }

  public selectInstance(uid: string | null): void {
    this.selectedUid = uid;
    const inst = this.getSelectedInstance();
    if (inst && !inst.locked && !inst.hidden) {
      this.transform.attach(inst.group);
      this.updateSelectionHelper();
    } else {
      this.transform.detach();
      this.updateSelectionHelper();
    }
    this.renderPlacedList();
    this.renderInspector();
    this.host.requestRender();
  }

  private toggleHidePart(uid: string): void {
    const inst = this.placed.find((p) => p.uid === uid);
    if (!inst) return;
    inst.hidden = !inst.hidden;
    inst.group.visible = !inst.hidden;
    if (inst.uid === this.selectedUid && inst.hidden) {
      this.transform.detach();
      this.clearSelectionHelper();
    } else if (inst.uid === this.selectedUid && !inst.locked) {
      this.transform.attach(inst.group);
      this.updateSelectionHelper();
    }
    this.renderPlacedList();
    this.host.requestRender();
  }

  private toggleLockPart(uid: string): void {
    const inst = this.placed.find((p) => p.uid === uid);
    if (!inst) return;
    inst.locked = !inst.locked;
    if (inst.uid === this.selectedUid) {
      if (inst.locked) this.transform.detach();
      else if (!inst.hidden) this.transform.attach(inst.group);
    }
    this.renderPlacedList();
    this.renderInspector();
    this.host.requestRender();
  }

  /** 1-Click Auto-Align all optical chain parts (Sensor Z=0, Shutter Z=+10, Mount Z=+18, Lens Z=+44/+62) */
  private autoAlignOpticalChain(): void {
    if (this.placed.length === 0) return;
    let lensIdx = 0;
    let moved = 0;
    for (const inst of this.placed) {
      if (inst.locked) continue;
      const r = inst.entry.role;
      if (r === 'sensor') {
        inst.group.position.set(0, 0, 0);
        inst.group.rotation.set(0, 0, 0);
        moved++;
      } else if (r === 'shutter') {
        inst.group.position.set(0, 0, 10);
        inst.group.rotation.set(0, 0, 0);
        moved++;
      } else if (r === 'mount') {
        inst.group.position.set(0, 0, 18);
        inst.group.rotation.set(0, 0, 0);
        moved++;
      } else if (r === 'lens') {
        inst.group.position.set(0, 0, 44 + lensIdx * 18);
        inst.group.rotation.set(0, 0, 0);
        lensIdx++;
        moved++;
      }
    }
    if (moved > 0) {
      this.updateSelectionHelper();
      this.refreshInspectorValues();
      this.pushHistorySnapshot();
      this.refreshLiveBadge(false);
      this.showToast(`光学系 ${moved}点を Eマウント 18.0mm フランジ光軸へ自動整列しました`);
      this.host.requestRender();
    } else {
      this.showToast('整列対象の光学パーツがありません');
    }
  }

  /** Snap selected part cleanly flush against the nearest other part with +1.5mm clearance */
  private snapSelectedAdjacent(): void {
    const sel = this.getSelectedInstance();
    if (!sel || sel.locked || this.placed.length < 2) return;
    this.partsGroup.updateMatrixWorld(true);
    const selBox = new THREE.Box3().setFromObject(sel.group);
    const selC = selBox.getCenter(new THREE.Vector3());
    const selSize = selBox.getSize(new THREE.Vector3());

    let nearest: PlacedInstance | null = null;
    let bestDist = Infinity;
    let nearBox = new THREE.Box3();
    for (const p of this.placed) {
      if (p.uid === sel.uid) continue;
      const b = new THREE.Box3().setFromObject(p.group);
      const d = b.getCenter(new THREE.Vector3()).distanceTo(selC);
      if (d < bestDist) {
        bestDist = d;
        nearest = p;
        nearBox = b;
      }
    }
    if (!nearest) return;

    const nearC = nearBox.getCenter(new THREE.Vector3());
    const nearSize = nearBox.getSize(new THREE.Vector3());
    const delta = selC.clone().sub(nearC);
    const ax = Math.abs(delta.x);
    const ay = Math.abs(delta.y);
    const az = Math.abs(delta.z);

    if (ax >= ay && ax >= az) {
      const sign = delta.x >= 0 ? 1 : -1;
      const targetX = nearC.x + sign * (nearSize.x * 0.5 + selSize.x * 0.5 + 1.5);
      sel.group.position.x += targetX - selC.x;
    } else if (ay >= ax && ay >= az) {
      const sign = delta.y >= 0 ? 1 : -1;
      const targetY = nearC.y + sign * (nearSize.y * 0.5 + selSize.y * 0.5 + 1.5);
      sel.group.position.y += targetY - selC.y;
    } else {
      const sign = delta.z >= 0 ? 1 : -1;
      const targetZ = nearC.z + sign * (nearSize.z * 0.5 + selSize.z * 0.5 + 1.5);
      sel.group.position.z += targetZ - selC.z;
    }

    this.updateSelectionHelper();
    this.refreshInspectorValues();
    this.pushHistorySnapshot();
    this.refreshLiveBadge(false);
    this.showToast(`「${nearest.entry.partId}」に隣接スナップしました (+1.5mmクリアランス)`);
    this.host.requestRender();
  }

  private setTransformMode(mode: 'translate' | 'rotate' | 'scale'): void {
    this.transform.setMode(mode);
    (['translate', 'rotate', 'scale'] as const).forEach((m) => {
      this.modeBtns[m].classList.toggle('is-active', m === mode);
    });
    this.host.requestRender();
  }

  private toggleSpace(): void {
    const next = this.transform.space === 'world' ? 'local' : 'world';
    this.transform.setSpace(next);
    this.spaceBtn.textContent = next === 'world' ? 'World' : 'Local';
    this.host.requestRender();
  }

  private renderLiveTelemetryStrip(r: CameraEngineeringReport): void {
    const ffd = r.metrics.flangeDistanceMm !== null ? `${r.metrics.flangeDistanceMm.toFixed(1)}mm` : '--';
    const cls = r.canOperate ? 'is-pass' : 'is-fail';
    this.liveStripEl.innerHTML = `
      <div class="pg-live-top ${cls}">
        <span class="pg-live-score"><strong>${r.totalScore}</strong><em>/1000</em></span>
        <span class="pg-live-rank">${escapeHtml(r.rank)}</span>
        <span class="pg-live-prof">${escapeHtml(r.resolvedProfileLabel)}</span>
      </div>
      <div class="pg-live-grid">
        <div><span>質量</span><strong>${r.telemetry.estimatedMassG}g</strong></div>
        <div><span>フランジ</span><strong>${ffd}</strong></div>
        <div><span>ケラレ</span><strong>${r.telemetry.vignettingPct}%</strong></div>
        <div><span>干渉</span><strong>${r.metrics.severeCollisionCount}件</strong></div>
      </div>
    `;
  }

  private renderPlacedList(): void {
    if (this.placed.length === 0) {
      this.placedListEl.innerHTML =
        '<div class="pg-empty-hint">上部の雛形（α7 IV / ZV-E1 / FX3）または左のカタログからパーツを追加してください。</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    for (let i = 0; i < this.placed.length; i++) {
      const p = this.placed[i];
      const diag = this.lastReport?.partDiagnostics.get(p.uid);
      const sevClass =
        diag?.severity === 'error'
          ? 'is-err'
          : diag?.severity === 'warn'
            ? 'is-warn'
            : '';

      const row = document.createElement('div');
      row.className = `pg-placed-item ${p.uid === this.selectedUid ? 'is-selected' : ''} ${sevClass} ${p.hidden ? 'is-hidden' : ''}`;
      row.innerHTML = `
        <button type="button" class="pg-placed-select" title="${escapeHtml(p.entry.title)}">
          <span class="pg-cat-swatch" style="background:${escapeHtml(p.entry.swatchColor)}"></span>
          <span class="pg-placed-name">${escapeHtml(p.entry.title)}</span>
          ${diag && diag.severity !== 'ok' ? `<span class="pg-diag-dot ${sevClass}" title="${escapeHtml(diag.reason)}">!</span>` : ''}
        </button>
        <div class="pg-placed-ctrls">
          <button type="button" class="pg-mini-ico${p.hidden ? ' is-off' : ''}" data-p-hide title="${p.hidden ? '表示する' : '一時非表示'}">${p.hidden ? '○' : '●'}</button>
          <button type="button" class="pg-mini-ico${p.locked ? ' is-locked' : ''}" data-p-lock title="${p.locked ? 'ロック解除' : '位置をロック'}">${p.locked ? '🔒' : '🔓'}</button>
        </div>
      `;
      row.querySelector('.pg-placed-select')?.addEventListener('click', () => this.selectInstance(p.uid));
      row.querySelector('[data-p-hide]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleHidePart(p.uid);
      });
      row.querySelector('[data-p-lock]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleLockPart(p.uid);
      });
      frag.appendChild(row);
    }
    this.placedListEl.innerHTML = '';
    this.placedListEl.appendChild(frag);
  }

  private renderInspector(): void {
    const sel = this.getSelectedInstance();
    if (!sel) {
      this.inspectorBodyEl.innerHTML =
        '<div class="pg-inspector-empty">3Dビューまたは上の一覧からパーツを選択すると、精密数値座標（mm / °）と自動整列ツールが使えます。</div>';
      return;
    }
    const g = sel.group;
    const rx = THREE.MathUtils.radToDeg(g.rotation.x);
    const ry = THREE.MathUtils.radToDeg(g.rotation.y);
    const rz = THREE.MathUtils.radToDeg(g.rotation.z);
    const diag = this.lastReport?.partDiagnostics.get(sel.uid);
    const dis = sel.locked ? 'disabled' : '';

    this.inspectorBodyEl.innerHTML = `
      <div class="pg-ins-head">
        <div class="pg-ins-title">${escapeHtml(sel.entry.title)}</div>
        <div class="pg-ins-sub">${escapeHtml(sel.entry.unitId.toUpperCase())} · ${escapeHtml(sel.entry.role)} · ${sel.blueprint.naturalSize.x.toFixed(1)}×${sel.blueprint.naturalSize.y.toFixed(1)}×${sel.blueprint.naturalSize.z.toFixed(1)}mm${sel.locked ? ' · 🔒LOCKED' : ''}</div>
        ${diag && diag.severity !== 'ok' ? `<div class="pg-ins-alert is-${diag.severity}">${escapeHtml(diag.reason)}</div>` : ''}
      </div>

      <div class="pg-ins-grid">
        <span class="pg-ins-lbl">位置 (mm)</span>
        <label class="pg-num-field"><em>X</em><input type="number" step="0.5" data-prop="px" value="${fmt1(g.position.x)}" ${dis}/></label>
        <label class="pg-num-field"><em>Y</em><input type="number" step="0.5" data-prop="py" value="${fmt1(g.position.y)}" ${dis}/></label>
        <label class="pg-num-field"><em>Z</em><input type="number" step="0.5" data-prop="pz" value="${fmt1(g.position.z)}" ${dis}/></label>

        <span class="pg-ins-lbl">回転 (°)</span>
        <label class="pg-num-field"><em>Rx</em><input type="number" step="5" data-prop="rx" value="${fmt1(rx)}" ${dis}/></label>
        <label class="pg-num-field"><em>Ry</em><input type="number" step="5" data-prop="ry" value="${fmt1(ry)}" ${dis}/></label>
        <label class="pg-num-field"><em>Rz</em><input type="number" step="5" data-prop="rz" value="${fmt1(rz)}" ${dis}/></label>

        <span class="pg-ins-lbl">倍率</span>
        <label class="pg-num-field"><em>Sx</em><input type="number" step="0.05" min="0.1" max="5" data-prop="sx" value="${g.scale.x.toFixed(2)}" ${dis}/></label>
        <label class="pg-num-field"><em>Sy</em><input type="number" step="0.05" min="0.1" max="5" data-prop="sy" value="${g.scale.y.toFixed(2)}" ${dis}/></label>
        <label class="pg-num-field"><em>Sz</em><input type="number" step="0.05" min="0.1" max="5" data-prop="sz" value="${g.scale.z.toFixed(2)}" ${dis}/></label>
      </div>

      <div class="pg-ins-actions">
        <button type="button" class="pg-btn pg-btn-sm" data-ins="alignAxis" ${dis}>光軸Z整列</button>
        <button type="button" class="pg-btn pg-btn-sm" data-ins="snapAdj" ${dis}>隣接スナップ</button>
        <button type="button" class="pg-btn pg-btn-sm" data-ins="mirrorX" ${dis}>X反転</button>
        <button type="button" class="pg-btn pg-btn-sm" data-ins="duplicate">複製</button>
        <button type="button" class="pg-btn pg-btn-sm" data-ins="focus">ズーム</button>
        <button type="button" class="pg-btn pg-btn-sm" data-ins="resetOrigin" ${dis}>原点戻</button>
        <button type="button" class="pg-btn pg-btn-sm pg-btn-danger-ghost" data-ins="delete">削除</button>
      </div>
    `;

    this.inspectorBodyEl.querySelectorAll<HTMLInputElement>('input[data-prop]').forEach((inp) => {
      inp.addEventListener('change', () => {
        if (sel.locked) return;
        const val = Number(inp.value);
        if (!Number.isFinite(val)) return;
        const prop = inp.dataset.prop;
        if (prop === 'px') g.position.x = val;
        else if (prop === 'py') g.position.y = val;
        else if (prop === 'pz') g.position.z = val;
        else if (prop === 'rx') g.rotation.x = THREE.MathUtils.degToRad(val);
        else if (prop === 'ry') g.rotation.y = THREE.MathUtils.degToRad(val);
        else if (prop === 'rz') g.rotation.z = THREE.MathUtils.degToRad(val);
        else if (prop === 'sx') g.scale.x = Math.max(0.1, val);
        else if (prop === 'sy') g.scale.y = Math.max(0.1, val);
        else if (prop === 'sz') g.scale.z = Math.max(0.1, val);
        this.updateSelectionHelper();
        this.pushHistorySnapshot();
        this.refreshLiveBadge(false);
        this.host.requestRender();
      });
    });

    this.inspectorBodyEl.querySelector('[data-ins="alignAxis"]')?.addEventListener('click', () => {
      if (sel.locked) return;
      g.position.x = 0;
      g.position.y = 0;
      g.rotation.set(0, 0, 0);
      this.updateSelectionHelper();
      this.refreshInspectorValues();
      this.pushHistorySnapshot();
      this.refreshLiveBadge(false);
      this.showToast('光軸中心 (X=0, Y=0) に整列しました');
      this.host.requestRender();
    });
    this.inspectorBodyEl.querySelector('[data-ins="snapAdj"]')?.addEventListener('click', () => {
      this.snapSelectedAdjacent();
    });
    this.inspectorBodyEl.querySelector('[data-ins="mirrorX"]')?.addEventListener('click', () => {
      if (sel.locked) return;
      g.position.x = -g.position.x;
      this.updateSelectionHelper();
      this.refreshInspectorValues();
      this.pushHistorySnapshot();
      this.refreshLiveBadge(false);
      this.host.requestRender();
    });
    this.inspectorBodyEl.querySelector('[data-ins="resetOrigin"]')?.addEventListener('click', () => {
      if (sel.locked) return;
      g.position.set(0, 0, 0);
      g.rotation.set(0, 0, 0);
      g.scale.set(1, 1, 1);
      this.updateSelectionHelper();
      this.refreshInspectorValues();
      this.pushHistorySnapshot();
      this.refreshLiveBadge(false);
      this.host.requestRender();
    });
    this.inspectorBodyEl.querySelector('[data-ins="duplicate"]')?.addEventListener('click', () => {
      void this.duplicateSelected();
    });
    this.inspectorBodyEl.querySelector('[data-ins="focus"]')?.addEventListener('click', () => {
      this.focusOnInstance(sel);
    });
    this.inspectorBodyEl.querySelector('[data-ins="delete"]')?.addEventListener('click', () => {
      this.deleteSelected();
    });
  }

  private refreshInspectorValues(): void {
    const sel = this.getSelectedInstance();
    if (!sel) return;
    const g = sel.group;
    const setVal = (prop: string, v: string) => {
      const inp = this.inspectorBodyEl.querySelector<HTMLInputElement>(`input[data-prop="${prop}"]`);
      if (inp && document.activeElement !== inp) inp.value = v;
    };
    setVal('px', fmt1(g.position.x));
    setVal('py', fmt1(g.position.y));
    setVal('pz', fmt1(g.position.z));
    setVal('rx', fmt1(THREE.MathUtils.radToDeg(g.rotation.x)));
    setVal('ry', fmt1(THREE.MathUtils.radToDeg(g.rotation.y)));
    setVal('rz', fmt1(THREE.MathUtils.radToDeg(g.rotation.z)));
    setVal('sx', g.scale.x.toFixed(2));
    setVal('sy', g.scale.y.toFixed(2));
    setVal('sz', g.scale.z.toFixed(2));
  }

  private async duplicateSelected(): Promise<void> {
    const sel = this.getSelectedInstance();
    if (!sel) return;
    const g = sel.group;
    await this.spawnPart(
      sel.entry.key,
      [g.position.x + 12, g.position.y, g.position.z],
      [g.rotation.x, g.rotation.y, g.rotation.z],
      [g.scale.x, g.scale.y, g.scale.z],
      true
    );
  }

  private deleteSelected(): void {
    const sel = this.getSelectedInstance();
    if (!sel) return;
    this.transform.detach();
    this.clearSelectionHelper();
    this.partsGroup.remove(sel.group);
    this.placed = this.placed.filter((p) => p.uid !== sel.uid);
    this.selectedUid = this.placed[this.placed.length - 1]?.uid ?? null;
    this.selectInstance(this.selectedUid);
    this.pushHistorySnapshot();
    this.refreshLiveBadge(false);
    this.showToast(`削除: ${sel.entry.title}`);
  }

  private focusOnInstance(inst: PlacedInstance): void {
    const box = new THREE.Box3().setFromObject(inst.group);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const dist = Math.max(45, size.length() * 2.1);
    this.orbit.target.copy(center);
    this.camera.position.set(center.x - dist * 0.55, center.y + dist * 0.35, center.z + dist * 0.78);
    this.orbit.update();
    this.host.requestRender();
  }

  public fitCameraToWorkspace(): void {
    this.setCameraView('iso');
  }

  // =========================================================================
  // Chief Engineer 1,000-Point Evaluation (v1.1) & 3D CoG / Cone / Diagnostics
  // =========================================================================
  private buildSnapshots(): PlacedPartSnapshot[] {
    this.partsGroup.updateMatrixWorld(true);
    return this.placed.map((p) => {
      const wb = new THREE.Box3().setFromObject(p.group);
      return {
        uid: p.uid,
        entry: p.entry,
        worldBox: wb,
        worldCenter: wb.getCenter(new THREE.Vector3()),
        worldSize: wb.getSize(new THREE.Vector3()),
        position: p.group.position.clone(),
        rotationEuler: p.group.rotation.clone(),
        scale: p.group.scale.clone(),
      };
    });
  }

  private clearDiagnostics3D(): void {
    while (this.diagGroup.children.length > 0) {
      const ch = this.diagGroup.children[0];
      this.diagGroup.remove(ch);
      if ((ch as THREE.Box3Helper).dispose) {
        (ch as THREE.Box3Helper).dispose();
      }
    }
    for (const p of this.placed) p.diagHelper = null;
  }

  private estimateSceneTriangles(): number {
    let tris = 0;
    for (const p of this.placed) {
      p.group.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (!m.isMesh || !m.geometry) return;
        const geo = m.geometry;
        if (geo.index) tris += geo.index.count / 3;
        else if (geo.attributes.position) tris += geo.attributes.position.count / 3;
      });
    }
    return Math.round(tris);
  }

  public getPlacedSummary(): Array<{ uid: string; partId: string; role: string; pos: [number, number, number] }> {
    return this.placed.map((p) => ({
      uid: p.uid,
      partId: p.entry.partId,
      role: p.entry.role,
      pos: [p.group.position.x, p.group.position.y, p.group.position.z],
    }));
  }

  public movePartByUid(uid: string, x: number, y: number, z: number): boolean {
    const inst = this.placed.find((p) => p.uid === uid);
    if (!inst) return false;
    inst.group.position.set(x, y, z);
    this.updateSelectionHelper();
    this.refreshInspectorValues();
    this.runEngineeringEvaluation();
    this.host.requestRender();
    return true;
  }

  public runEngineeringEvaluation(): CameraEngineeringReport {
    const snaps = this.buildSnapshots();
    const plya = runPlyaVerificationPipeline(snaps, this.designProfile, {
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine !== false : true,
      webgl2: this.host.renderer.capabilities.isWebGL2,
      totalTriangles: this.estimateSceneTriangles(),
    });
    const report = plya.engineeringReport;
    this.lastPlyaReport = plya;
    this.lastReport = report;

    // Update 3D Center-of-Gravity marker position
    const [gx, gy, gz] = report.telemetry.centerOfGravityMm;
    this.cogGroup.position.set(gx, gy, gz);
    this.cogGroup.visible = this.showCogMarker && snaps.length > 0;

    // Rebuild 3D diagnostic wireframe boxes & apply direct 3D RED / AMBER mesh error highlights!
    this.clearDiagnostics3D();
    let errorPartCount = 0;
    let warnPartCount = 0;
    for (const s of snaps) {
      const flag = report.partDiagnostics.get(s.uid);
      if (flag && flag.severity !== 'ok') {
        if (flag.severity === 'error') errorPartCount++;
        else warnPartCount++;
        const col = flag.severity === 'error' ? 0xef4444 : 0xf59e0b;
        const helper = new THREE.Box3Helper(s.worldBox, col);
        this.diagGroup.add(helper);
      }
    }
    this.diagGroup.visible = this.showDiagnostics3D;
    this.applyAllVisualMaterials();

    // Update Floating Top-Center 3D Visual Alert Banner
    if (snaps.length === 0) {
      this.viewportAlertEl.className = 'pg-viewport-alert';
    } else if (errorPartCount > 0) {
      this.viewportAlertEl.className = 'pg-viewport-alert is-visible is-error';
      this.viewportAlertEl.textContent = `🔴 エラー部品 ${errorPartCount}個を赤色表示中 — クリックでPLYA修正ヒントを表示`;
    } else if (warnPartCount > 0 || plya.failCount > 0) {
      this.viewportAlertEl.className = 'pg-viewport-alert is-visible is-warn';
      this.viewportAlertEl.textContent = `⚠️ 注意部品 ${warnPartCount}個 / 要確認 ${plya.failCount + plya.warnCount}項目 — PLYAで詳細確認`;
    } else {
      this.viewportAlertEl.className = 'pg-viewport-alert is-visible is-ok';
      this.viewportAlertEl.textContent = `✅ PLYA 全8ツール合格 · ${report.totalScore}/1000 (${report.rank})`;
    }

    this.scoreBadgeEl.textContent = `${report.totalScore} / 1000 (${report.rank})`;
    this.scoreBadgeEl.dataset.status = report.canOperate ? 'pass' : 'fail';
    this.renderLiveTelemetryStrip(report);
    this.renderPlacedList();
    this.renderInspector();
    this.host.requestRender();
    return report;
  }

  public runPlyaPipeline(openModal = true): PlyaPipelineReport {
    this.runEngineeringEvaluation();
    const plya = this.lastPlyaReport!;
    if (openModal) {
      this.renderReportModal(plya.engineeringReport, plya);
      this.reportModalEl.classList.add('is-open');
      this.reportModalEl.setAttribute('aria-hidden', 'false');
    }
    this.showToast(
      `PLYA完了 (${plya.totalDurationMs.toFixed(1)}ms): ${plya.passCount}/8合格 · ${plya.engineeringReport.totalScore}点`
    );
    return plya;
  }

  private refreshLiveBadge(openModal: boolean): void {
    const rep = this.runEngineeringEvaluation();
    if (openModal) this.renderReportModal(rep, this.lastPlyaReport);
  }

  public openEvaluationReport(): CameraEngineeringReport {
    return this.runPlyaPipeline(true).engineeringReport;
  }

  public closeEvaluationReport(): void {
    this.reportModalEl.classList.remove('is-open');
    this.reportModalEl.setAttribute('aria-hidden', 'true');
  }

  private renderReportModal(
    r: CameraEngineeringReport,
    plya: PlyaPipelineReport | null = this.lastPlyaReport
  ): void {
    const pct = Math.round((r.totalScore / r.maxScore) * 100);
    const verdictClass = r.canOperate ? 'is-pass' : 'is-fail';
    const ffdText =
      r.metrics.flangeDistanceMm !== null ? `${r.metrics.flangeDistanceMm.toFixed(1)} mm` : '未計測';
    const eccText =
      r.metrics.opticalEccentricityMm !== null
        ? `${r.metrics.opticalEccentricityMm.toFixed(1)} mm`
        : '未計測';
    const cogText = `(${r.telemetry.centerOfGravityMm.map((v) => v.toFixed(0)).join(', ')}) mm`;
    const radarSvg = renderEngineeringRadarSvg(r);

    const headlineHtml = plya
      ? `
      <div class="pg-plya-headline ${verdictClass}">
        <span>${escapeHtml(plya.simpleHeadline)}</span>
        <span class="pg-plya-speed">PLYA ${plya.totalDurationMs.toFixed(1)}ms · 全8ツール</span>
      </div>`
      : '';

    const plyaToolsHtml = plya
      ? `
      <div class="pg-plya-tools-grid">
        ${plya.tools
          .map((t) => {
            const ico = t.status === 'pass' ? '✅' : t.status === 'warn' ? '⚠️' : '❌';
            const focusBtn =
              t.flaggedUids.length > 0
                ? `<button type="button" class="pg-plya-focus-btn" data-focus-uid="${escapeHtml(t.flaggedUids[0])}">赤い部品を3Dで見る</button>`
                : '';
            return `
            <div class="pg-plya-tool is-${t.status}">
              <div class="pg-plya-tool-head">
                <span class="pg-plya-tool-icon">${ico}</span>
                <span class="pg-plya-tool-name">${escapeHtml(t.toolName)}</span>
                <span class="pg-plya-tool-domain">${escapeHtml(t.domainJa)}</span>
                <span class="pg-plya-tool-badge">${escapeHtml(t.metricBadge)}</span>
              </div>
              <div class="pg-plya-tool-verdict">${escapeHtml(t.plainVerdict)}</div>
              <div class="pg-plya-tool-foot">
                <span class="pg-plya-tool-fix">${t.status === 'pass' ? '✓ ' : '→ '}${escapeHtml(t.fixHint)}</span>
                ${focusBtn}
              </div>
            </div>`;
          })
          .join('')}
      </div>`
      : '';

    const quickFixes = plya?.quickFixes ?? r.topActions;
    const actionsHtml =
      quickFixes.length > 0
        ? `<div class="pg-rep-actions"><h4>ここだけ直せばOK（優先チェック）</h4><ul>${quickFixes
            .map((a) => `<li>${escapeHtml(a)}</li>`)
            .join('')}</ul></div>`
        : '<div class="pg-rep-actions is-ok"><h4>全検査クリア！そのまま作れる設計です</h4><p>KiCad電気配線・光線追跡・3D干渉・熱解析・電源・EMCのすべてで合格ラインを達成しています。</p></div>';

    const catHtml = r.categories
      .map(
        (c) => `
      <div class="pg-rep-cat is-${c.status}">
        <div class="pg-rep-cat-top">
          <span class="pg-rep-cat-name">${escapeHtml(c.nameJa)}</span>
          <strong class="pg-rep-cat-score">${c.score}<em>/100</em></strong>
        </div>
        <div class="pg-rep-bar"><span style="width:${c.score}%"></span></div>
        <div class="pg-rep-finding">${escapeHtml(c.finding)}</div>
      </div>
    `
      )
      .join('');

    this.reportContentEl.innerHTML = `
      ${headlineHtml}
      <div class="pg-rep-hero pg-rep-hero-v11">
        <div class="pg-rep-dial ${verdictClass}" style="--pg-pct:${pct}%">
          <div class="pg-rep-dial-inner">
            <span class="pg-rep-score-big">${r.totalScore}</span>
            <span class="pg-rep-score-max">/ 1000 点</span>
            <span class="pg-rep-rank">RANK ${escapeHtml(r.rank)}</span>
          </div>
        </div>

        <div class="pg-rep-radar-box">
          ${radarSvg}
        </div>

        <div class="pg-rep-verdict-box">
          <div class="pg-rep-pills-row">
            <div class="pg-rep-verdict-pill ${verdictClass}">${escapeHtml(r.operationalVerdict)}</div>
            <div class="pg-rep-profile-pill">設計モード: ${escapeHtml(r.resolvedProfileLabel)}</div>
          </div>
          <div class="pg-rep-telemetry pg-rep-telemetry-v11">
            <div><span>構成 / 重さ</span><strong>${r.metrics.partCount}点 · ${r.telemetry.estimatedMassG} g</strong></div>
            <div><span>3D重心 (CoG)</span><strong>${cogText}</strong></div>
            <div><span>ピント距離 / ズレ</span><strong>${ffdText} / ${eccText}</strong></div>
            <div><span>光束ケラレ率</span><strong>${r.telemetry.vignettingPct}%</strong></div>
            <div><span>電力 / 撮影枚数</span><strong>${r.telemetry.peakPowerW.toFixed(1)}W · 約${r.telemetry.estimatedBatteryShots}枚</strong></div>
            <div><span>4K耐熱 / ぶつかり</span><strong>${r.telemetry.thermal4k60pMin >= 120 ? '120分+' : `${r.telemetry.thermal4k60pMin}分`} · ${r.metrics.severeCollisionCount}件</strong></div>
          </div>
        </div>
      </div>
      ${plyaToolsHtml}
      ${actionsHtml}
      ${
        plya
          ? `<div class="pg-eda-export-row">
              <span class="pg-eda-export-label">実産業ツール連携出力（WLK-220検証ノウハウ適用）：</span>
              <button type="button" class="pg-btn pg-btn-sm" data-action="exportKiCad">KiCad回路図 (.kicad_sch) 出力</button>
              <button type="button" class="pg-btn pg-btn-sm" data-action="exportSpice">ngspice回路ネットリスト (.cir) 出力</button>
            </div>`
          : ''
      }
      <details class="pg-rep-details">
        <summary>詳細データ：技術者 10分野スコア内訳 (クリックで展開)</summary>
        <div class="pg-rep-cats">${catHtml}</div>
      </details>
    `;

    this.reportContentEl.querySelector('[data-action="exportKiCad"]')?.addEventListener('click', () => {
      if (!plya) return;
      const snaps = this.buildSnapshots();
      const sch = generatePlaygroundKiCadSchematic(snaps, plya);
      this.downloadTextFile('playground-v11-custom.kicad_sch', sch, 'text/plain;charset=utf-8');
      this.showToast('実KiCad 7.0 回路図 (.kicad_sch) を出力しました');
    });
    this.reportContentEl.querySelector('[data-action="exportSpice"]')?.addEventListener('click', () => {
      if (!plya) return;
      const snaps = this.buildSnapshots();
      const cir = generatePlaygroundNgspiceNetlist(snaps, plya);
      this.downloadTextFile('playground-v11-power-thermal.cir', cir, 'text/plain;charset=utf-8');
      this.showToast('実ngspice 電源・連成熱解析ネットリスト (.cir) を出力しました');
    });

    this.reportContentEl.querySelectorAll<HTMLButtonElement>('[data-focus-uid]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const uid = btn.dataset.focusUid;
        if (!uid) return;
        const inst = this.placed.find((p) => p.uid === uid);
        if (inst) {
          this.closeEvaluationReport();
          this.selectInstance(uid);
          this.focusOnInstance(inst);
          this.showToast(`赤色エラー部品へフォーカス: ${inst.entry.title}`);
        }
      });
    });
  }

  // =========================================================================
  // Undo / Redo & Blueprint JSON Save/Load
  // =========================================================================
  private serializeWorkspace(): SerializedPartState[] {
    return this.placed.map((p) => ({
      uid: p.uid,
      key: p.entry.key,
      pos: [p.group.position.x, p.group.position.y, p.group.position.z],
      rot: [p.group.rotation.x, p.group.rotation.y, p.group.rotation.z],
      scale: [p.group.scale.x, p.group.scale.y, p.group.scale.z],
      hidden: p.hidden,
      locked: p.locked,
    }));
  }

  private pushHistorySnapshot(): void {
    if (this.isApplyingHistory) return;
    this.undoStack.push(this.serializeWorkspace());
    if (this.undoStack.length > MAX_UNDO_STEPS) this.undoStack.shift();
    this.redoStack.length = 0;
    this.syncUndoRedoButtons();
  }

  private syncUndoRedoButtons(): void {
    this.undoBtn.disabled = this.undoStack.length <= 1;
    this.redoBtn.disabled = this.redoStack.length === 0;
  }

  private async restoreSnapshot(state: SerializedPartState[]): Promise<void> {
    this.isApplyingHistory = true;
    try {
      this.clearAllParts(false);
      for (const item of state) {
        await this.spawnPart(
          item.key,
          item.pos,
          item.rot,
          item.scale,
          false,
          Boolean(item.hidden),
          Boolean(item.locked)
        );
      }
      this.selectInstance(this.placed[this.placed.length - 1]?.uid ?? null);
      this.refreshLiveBadge(false);
    } finally {
      this.isApplyingHistory = false;
      this.syncUndoRedoButtons();
    }
  }

  private async undo(): Promise<void> {
    if (this.undoStack.length <= 1) return;
    const current = this.undoStack.pop()!;
    this.redoStack.push(current);
    const prev = this.undoStack[this.undoStack.length - 1];
    await this.restoreSnapshot(prev);
    this.showToast('元に戻しました');
  }

  private async redo(): Promise<void> {
    if (this.redoStack.length === 0) return;
    const next = this.redoStack.pop()!;
    this.undoStack.push(next);
    await this.restoreSnapshot(next);
    this.showToast('やり直しました');
  }

  private downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8'): void {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private exportBlueprintJson(): void {
    const payload = {
      format: 'sony-a7iv-playground-cad-v1.1',
      profile: this.designProfile,
      createdAt: new Date().toISOString(),
      parts: this.serializeWorkspace(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-camera-cad-v1.1-blueprint.json';
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('設計JSONブループリント (v1.1) を保存しました');
  }

  private async importBlueprintFile(file: File): Promise<void> {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as {
        profile?: CameraDesignProfile;
        parts?: SerializedPartState[];
      };
      if (!Array.isArray(parsed.parts)) throw new Error('invalid');
      if (parsed.profile && parsed.profile in CAMERA_PROFILE_LABELS) {
        this.designProfile = parsed.profile;
        this.profileSelectEl.value = parsed.profile;
      }
      await this.restoreSnapshot(parsed.parts);
      this.pushHistorySnapshot();
      this.fitCameraToWorkspace();
      this.showToast(`${parsed.parts.length}パーツの設計JSONを読み込みました`);
    } catch {
      this.showToast('設計JSONの読み込みに失敗しました');
    }
  }

  // =========================================================================
  // Canvas Picking & Industrial CAD Hotkeys
  // =========================================================================
  private onCanvasPointerDown(e: PointerEvent): void {
    this.pointerDown.set(e.clientX, e.clientY);
  }

  private onCanvasPointerUp(e: PointerEvent): void {
    if (!this.active) return;
    if ((this.transform as unknown as { dragging?: boolean }).dragging) return;
    if (Math.hypot(e.clientX - this.pointerDown.x, e.clientY - this.pointerDown.y) > 5) return;

    const rect = this.host.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const visibleGroups = this.placed.filter((p) => !p.hidden).map((p) => p.group);
    const hits = this.raycaster.intersectObjects(visibleGroups, true);
    if (hits.length > 0) {
      let cur: THREE.Object3D | null = hits[0].object;
      while (cur) {
        if (typeof cur.userData?.pgInstanceId === 'string') {
          this.selectInstance(cur.userData.pgInstanceId);
          return;
        }
        cur = cur.parent;
      }
    } else {
      this.selectInstance(null);
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (!this.active) return;
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    if (e.key === 'Escape') {
      if (this.shortcutModalEl.classList.contains('is-open')) {
        this.shortcutModalEl.classList.remove('is-open');
        this.shortcutModalEl.setAttribute('aria-hidden', 'true');
      } else if (this.reportModalEl.classList.contains('is-open')) {
        this.closeEvaluationReport();
      } else {
        this.close();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) void this.redo();
      else void this.undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      void this.redo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      void this.duplicateSelected();
      return;
    }

    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'g') this.setTransformMode('translate');
    else if (k === 'e' || k === 'r') this.setTransformMode('rotate');
    else if (k === 's') this.setTransformMode('scale');
    else if (k === 'q') this.toggleSpace();
    else if (k === '1') this.setCameraView('iso');
    else if (k === '2') this.setCameraView('front');
    else if (k === '3') this.setCameraView('side');
    else if (k === '4') this.setCameraView('top');
    else if (k === '5') this.setCameraView('back');
    else if (k === 'f') {
      const sel = this.getSelectedInstance();
      if (sel) this.focusOnInstance(sel);
      else this.fitCameraToWorkspace();
    } else if (e.key === '?') {
      const open = !this.shortcutModalEl.classList.contains('is-open');
      this.shortcutModalEl.classList.toggle('is-open', open);
      this.shortcutModalEl.setAttribute('aria-hidden', open ? 'false' : 'true');
    } else if (k === 'delete' || k === 'backspace') {
      this.deleteSelected();
    }
  }

  public dispose(): void {
    this.close();
    this.clearAllParts(false);
    this.opticalConeMesh.geometry.dispose();
    (this.opticalConeMesh.material as THREE.Material).dispose();
    this.xrayMat.dispose();
    this.wireMat.dispose();
    this.errorPartMat.dispose();
    this.warnPartMat.dispose();
    this.extractor.dispose();
    this.transform.dispose();
    this.orbit.dispose();
    this.rootEl.remove();
  }
}
