import { KineCullingStats, MotionStage, QualityTier, UnitBuildStats } from './unit_contract';
import { VramLeakVerification } from './dispose';

export interface PerfHudSnapshot {
  unitId: string;
  drawCalls: number;
  maxDrawCallsBudget?: number;
  triangles: number;
  geometries: number;
  textures: number;
  frameTimeMs: number;
  avgFrameTimeMs: number;
  quality: QualityTier;
  motionStage?: MotionStage;
  pixelRatio: number;
  idle: boolean;
  shaderWarmupMs: number;
  buildStats: UnitBuildStats | null;
  vramCheck: VramLeakVerification | null;
  vramSwitchCount: number;
  kineStats?: KineCullingStats | null;
  bokehStatus?: string;
  bokehMs?: number;
}

/**
 * Toggleable Developer Performance HUD mounted for ALL V2-optimized units.
 * Toggle button removed from UI per minimalist HUD redesign; accessible via `P` key,
 * `?perfhud=1` URL parameter, or `window.__cad.v2.togglePerfHud()`.
 */
export class UnitPerfHud {
  private readonly host: HTMLElement;
  private readonly panelEl: HTMLElement;
  private readonly fields: Record<string, HTMLElement> = {};
  private mounted = false;
  private expanded = false;
  private lastDomUpdateMs = -Infinity;

  constructor(host: HTMLElement, initialExpanded = false) {
    this.host = host;
    this.expanded = initialExpanded;

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'unit-v2-perf-panel mishoe-v2-perf-panel is-hidden';
    this.panelEl.setAttribute('role', 'status');
    this.panelEl.setAttribute('aria-live', 'off');

    const header = document.createElement('div');
    header.className = 'unit-v2-perf-header';
    header.innerHTML =
      '<span class="unit-v2-perf-title" data-field="unitTitle">V2 OPT</span><span class="unit-v2-perf-state" data-field="loopState">IDLE 0%</span>';
    this.panelEl.appendChild(header);

    const rows: Array<[string, string]> = [
      ['drawCalls', 'Draw Calls'],
      ['triangles', 'Triangles'],
      ['geometries', 'Geometries'],
      ['textures', 'Textures'],
      ['frameTime', 'Frame Time'],
      ['quality', 'Tier / Stage'],
      ['kine', 'KINE Culling'],
      ['bokeh', 'F1.2 Bokeh'],
      ['batches', 'Batching'],
      ['parts', 'Parts (JSON=3D)'],
      ['build', 'Build / Warmup'],
      ['vram', 'VRAM Leak'],
    ];

    const grid = document.createElement('div');
    grid.className = 'unit-v2-perf-grid';
    for (let i = 0; i < rows.length; i++) {
      const [key, title] = rows[i];
      const row = document.createElement('div');
      row.className = 'unit-v2-perf-row';
      const kEl = document.createElement('span');
      kEl.className = 'unit-v2-perf-key';
      kEl.textContent = title;
      const vEl = document.createElement('span');
      vEl.className = 'unit-v2-perf-val';
      vEl.dataset.field = key;
      vEl.textContent = '-';
      row.append(kEl, vEl);
      grid.appendChild(row);
      this.fields[key] = vEl;
    }
    this.fields.unitTitle = header.querySelector('[data-field="unitTitle"]') as HTMLElement;
    this.fields.loopState = header.querySelector('[data-field="loopState"]') as HTMLElement;
    this.panelEl.appendChild(grid);

    this.host.append(this.panelEl);
  }

  public setModeVisible(visible: boolean): void {
    this.mounted = visible;
    this.panelEl.classList.toggle('is-hidden', !visible || !this.expanded);
  }

  public toggle(): boolean {
    this.expanded = !this.expanded;
    this.panelEl.classList.toggle('is-hidden', !this.mounted || !this.expanded);
    return this.expanded;
  }

  public setExpanded(expanded: boolean): void {
    this.expanded = expanded;
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

    this.fields.unitTitle.textContent = `${snap.unitId.toUpperCase()} · V3 OPT`;

    const dc = snap.drawCalls;
    const budget = snap.maxDrawCallsBudget ?? 100;
    this.fields.drawCalls.textContent = `${dc} / ${budget}`;
    this.fields.drawCalls.className =
      dc <= budget ? 'unit-v2-perf-val is-ok' : 'unit-v2-perf-val is-warn';

    this.fields.triangles.textContent = snap.triangles.toLocaleString('en-US');
    this.fields.geometries.textContent = String(snap.geometries);
    this.fields.textures.textContent = String(snap.textures);
    const safeFrameMs = Number.isFinite(snap.frameTimeMs) ? snap.frameTimeMs : 0;
    const safeAvgMs = Number.isFinite(snap.avgFrameTimeMs) ? snap.avgFrameTimeMs : 0;
    const safeDpr = Number.isFinite(snap.pixelRatio) ? snap.pixelRatio : 1;
    this.fields.frameTime.textContent = `${safeFrameMs.toFixed(2)} ms (avg ${safeAvgMs.toFixed(2)})`;
    const stageStr = snap.motionStage ? snap.motionStage.toUpperCase() : snap.quality.toUpperCase();
    this.fields.quality.textContent = `${snap.quality.toUpperCase()} → ${stageStr} · DPR ${safeDpr.toFixed(2)}`;

    if (snap.kineStats) {
      const k = snap.kineStats;
      this.fields.kine.textContent = k.enabled
        ? `ON · -${k.totalCulled}/${k.totalParts} (F:${k.frustumCulled} S:${k.subpixelCulled} O:${k.occlusionCulled}) ${k.evalMs.toFixed(2)}ms`
        : 'OFF';
      this.fields.kine.className = k.enabled ? 'unit-v2-perf-val is-ok' : 'unit-v2-perf-val';
    } else {
      this.fields.kine.textContent = 'OFF';
    }

    const bk = snap.bokehStatus ?? 'disabled';
    this.fields.bokeh.textContent =
      bk === 'active'
        ? `F1.2 ON (${(snap.bokehMs ?? 0).toFixed(1)}ms)`
        : bk.toUpperCase();

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
        ? 'unit-v2-perf-val is-ok'
        : 'unit-v2-perf-val is-warn';
    } else {
      this.fields.vram.textContent = 'BASELINE ARMED';
      this.fields.vram.className = 'unit-v2-perf-val';
    }

    this.fields.loopState.textContent = snap.idle ? 'IDLE 0% GPU' : stageStr;
    this.fields.loopState.className = snap.idle
      ? 'unit-v2-perf-state is-idle'
      : 'unit-v2-perf-state is-active';
  }

  public dispose(): void {
    this.panelEl.remove();
  }
}

/** Backward-compatible alias */
export const MiShoePerfHud = UnitPerfHud;
