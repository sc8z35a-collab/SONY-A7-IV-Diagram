import { QualityTier, UnitBuildStats } from './unit_contract';
import { VramLeakVerification } from './dispose';

export interface PerfHudSnapshot {
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
  frameTimeMs: number;
  avgFrameTimeMs: number;
  quality: QualityTier;
  pixelRatio: number;
  idle: boolean;
  shaderWarmupMs: number;
  buildStats: UnitBuildStats | null;
  vramCheck: VramLeakVerification | null;
  vramSwitchCount: number;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Toggleable Developer Performance HUD exclusively mounted while in MI Shoe V2 mode.
 * Displays real-time drawCalls, triangles, geometries, textures, frameTime(ms),
 * quality tier, DPR, idle GPU status, batching counts, and VRAM leak verification.
 */
export class MiShoePerfHud {
  private readonly host: HTMLElement;
  private readonly toggleBtn: HTMLButtonElement;
  private readonly panelEl: HTMLElement;
  private readonly fields: Record<string, HTMLElement> = {};
  private mounted = false;
  private expanded = false;
  private lastDomUpdateMs = -Infinity;

  constructor(host: HTMLElement, initialExpanded = false) {
    this.host = host;
    this.expanded = initialExpanded;

    this.toggleBtn = document.createElement('button');
    this.toggleBtn.type = 'button';
    this.toggleBtn.className = 'mishoe-v2-perf-toggle is-hidden';
    this.toggleBtn.setAttribute('aria-label', 'MIシュー V2 パフォーマンスHUD切替 (P)');
    this.toggleBtn.setAttribute('title', 'MIシュー V2 Perf HUD (P)');

    const icon = document.createElementNS(SVG_NS, 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML =
      '<path d="M4.5 16.5a8.5 8.5 0 1 1 15 0"/><line x1="12" y1="13" x2="16.2" y2="8.8"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/>';
    const label = document.createElement('span');
    label.textContent = 'V2 HUD';
    this.toggleBtn.append(icon, label);
    this.toggleBtn.addEventListener('click', () => this.toggle());

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'mishoe-v2-perf-panel is-hidden';
    this.panelEl.setAttribute('role', 'status');
    this.panelEl.setAttribute('aria-live', 'off');

    const header = document.createElement('div');
    header.className = 'mishoe-v2-perf-header';
    header.innerHTML =
      '<span class="mishoe-v2-perf-title">MI SHOE V2 OPT</span><span class="mishoe-v2-perf-state" data-field="loopState">IDLE 0%</span>';
    this.panelEl.appendChild(header);

    const rows: Array<[string, string]> = [
      ['drawCalls', 'Draw Calls'],
      ['triangles', 'Triangles'],
      ['geometries', 'Geometries'],
      ['textures', 'Textures'],
      ['frameTime', 'Frame Time'],
      ['quality', 'Tier / DPR'],
      ['batches', 'Batching'],
      ['parts', 'Parts (JSON=3D)'],
      ['build', 'Build / Warmup'],
      ['vram', 'VRAM Leak'],
    ];

    const grid = document.createElement('div');
    grid.className = 'mishoe-v2-perf-grid';
    for (let i = 0; i < rows.length; i++) {
      const [key, title] = rows[i];
      const row = document.createElement('div');
      row.className = 'mishoe-v2-perf-row';
      const kEl = document.createElement('span');
      kEl.className = 'mishoe-v2-perf-key';
      kEl.textContent = title;
      const vEl = document.createElement('span');
      vEl.className = 'mishoe-v2-perf-val';
      vEl.dataset.field = key;
      vEl.textContent = '-';
      row.append(kEl, vEl);
      grid.appendChild(row);
      this.fields[key] = vEl;
    }
    this.fields.loopState = header.querySelector('[data-field="loopState"]') as HTMLElement;
    this.panelEl.appendChild(grid);

    this.host.append(this.toggleBtn, this.panelEl);
  }

  public setModeVisible(visible: boolean): void {
    this.mounted = visible;
    this.toggleBtn.classList.toggle('is-hidden', !visible);
    this.toggleBtn.classList.toggle('is-active', visible && this.expanded);
    this.panelEl.classList.toggle('is-hidden', !visible || !this.expanded);
  }

  public toggle(): boolean {
    this.expanded = !this.expanded;
    this.toggleBtn.classList.toggle('is-active', this.mounted && this.expanded);
    this.panelEl.classList.toggle('is-hidden', !this.mounted || !this.expanded);
    return this.expanded;
  }

  public setExpanded(expanded: boolean): void {
    this.expanded = expanded;
    this.toggleBtn.classList.toggle('is-active', this.mounted && this.expanded);
    this.panelEl.classList.toggle('is-hidden', !this.mounted || !this.expanded);
  }

  public isExpanded(): boolean {
    return this.expanded;
  }

  public update(snap: PerfHudSnapshot, force = false): void {
    if (!this.mounted || !this.expanded) return;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (!force && now - this.lastDomUpdateMs < 90) return;
    this.lastDomUpdateMs = now;

    const dc = snap.drawCalls;
    this.fields.drawCalls.textContent = `${dc} / 100`;
    this.fields.drawCalls.className =
      dc <= 100 ? 'mishoe-v2-perf-val is-ok' : 'mishoe-v2-perf-val is-warn';

    this.fields.triangles.textContent = snap.triangles.toLocaleString('en-US');
    this.fields.geometries.textContent = String(snap.geometries);
    this.fields.textures.textContent = String(snap.textures);
    this.fields.frameTime.textContent = `${snap.frameTimeMs.toFixed(2)} ms (avg ${snap.avgFrameTimeMs.toFixed(2)})`;
    this.fields.quality.textContent = `${snap.quality.toUpperCase()} · DPR ${snap.pixelRatio.toFixed(2)}`;

    if (snap.buildStats) {
      const s = snap.buildStats;
      this.fields.batches.textContent = `${s.instancedMeshCount} Inst(${s.totalInstances}) · ${s.batchedMeshCount} Batch(${s.totalBatchedItems})`;
      this.fields.parts.textContent = `${s.registeredPartCount} / ${s.declaredPartCount}`;
      this.fields.build.textContent = `${s.buildTimeMs.toFixed(1)}ms (max ${s.maxChunkMs.toFixed(1)}ms) · W ${snap.shaderWarmupMs.toFixed(1)}ms`;
    }

    if (snap.vramCheck) {
      const v = snap.vramCheck;
      this.fields.vram.textContent = v.passed
        ? `PASS Δg:${v.deltaGeometries} Δt:${v.deltaTextures} (#${snap.vramSwitchCount})`
        : `LEAK Δg:${v.deltaGeometries} Δt:${v.deltaTextures}`;
      this.fields.vram.className = v.passed
        ? 'mishoe-v2-perf-val is-ok'
        : 'mishoe-v2-perf-val is-warn';
    } else {
      this.fields.vram.textContent = 'BASELINE ARMED';
      this.fields.vram.className = 'mishoe-v2-perf-val';
    }

    this.fields.loopState.textContent = snap.idle ? 'IDLE 0% GPU' : 'ACTIVE';
    this.fields.loopState.className = snap.idle
      ? 'mishoe-v2-perf-state is-idle'
      : 'mishoe-v2-perf-state is-active';
  }

  public dispose(): void {
    this.toggleBtn.remove();
    this.panelEl.remove();
  }
}
