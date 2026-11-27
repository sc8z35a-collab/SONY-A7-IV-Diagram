import { ScaleMode } from '../assemblies/types';

export type MiraiStudioTab = 'reports' | 'matrix' | 'glossary';
export type MiraiEdition = 'beginner' | 'expert';

export interface MiraiLibraryStudioCallbacks {
  onJumpTo3d: (subView: number) => void;
  onJumpToBaseline: (mode: ScaleMode) => void;
  onEditionChange?: (edition: MiraiEdition) => void;
}

interface MatrixEntry {
  id: string;
  volume: number;
  volumeTheme: string;
  badge: string;
  score: number;
  axes: [number, number, number, number, number];
  eta: string;
  baselineMode: ScaleMode;
  has3dPrototype: boolean;
  expertTitle: string;
  beginnerTitle: string;
  oneLiner: string;
  glossaryIds: string[];
}

interface MatrixPayload {
  version: string;
  timeline: string;
  totalTechnologies: number;
  averageScore: number;
  built3dIds: string[];
  volumes: Array<{ volume: number; theme: string; count: number; avgScore: number }>;
  technologies: MatrixEntry[];
}

interface GlossaryTerm {
  id: string;
  term: string;
  reading: string;
  chapter: number;
  chapterTitle: string;
  script: 'alpha' | 'kana';
  indexKey: string;
  oneLine: string;
  analogy: string;
  cameraImpact: string;
  vols: number[];
  fhIds: string[];
}

interface GlossaryPayload {
  version: string;
  totalTerms: number;
  alphaCount: number;
  kanaCount: number;
  terms: GlossaryTerm[];
}

interface VolTechEdition {
  id: string;
  title: string;
  metaLine?: string;
  oneLiner?: string;
  features: string[];
  sources: Array<{ label: string; url: string }>;
  comparisonHeaders: string[];
  comparisonRows: Array<{ metric: string; current2026: string; future2028: string }>;
  changes: string;
  pros: string;
  cons: string;
  edge: string;
  score: number;
  axes: [number, number, number, number, number];
  scoreRationale: string;
  cadMemo?: string;
}

interface VolumePayload {
  volume: number;
  theme: string;
  expertHeader: { title: string; intent: string; preface: string; intro: string; summary: string };
  beginnerHeader: { title: string; intent: string; preface: string; intro: string; summary: string };
  technologies: Array<{
    id: string;
    volume: number;
    badge: string;
    eta: string;
    baselineMode: ScaleMode;
    has3dPrototype: boolean;
    score: number;
    axes: [number, number, number, number, number];
    glossaryIds: string[];
    expert: VolTechEdition;
    beginner: VolTechEdition;
  }>;
}

const EDITION_STORAGE_KEY = 'mirai_2028_edition';
const AXIS_LABELS = ['物理・構造突破', '量産民主化', '既存比優位性', '撮影体験革命', 'ASI/AI加速'] as const;

const VOL_LOADERS: Record<number, () => Promise<{ default: VolumePayload }>> = {
  1: () => import('../data/mirai_library/vol01.json') as unknown as Promise<{ default: VolumePayload }>,
  2: () => import('../data/mirai_library/vol02.json') as unknown as Promise<{ default: VolumePayload }>,
  3: () => import('../data/mirai_library/vol03.json') as unknown as Promise<{ default: VolumePayload }>,
  4: () => import('../data/mirai_library/vol04.json') as unknown as Promise<{ default: VolumePayload }>,
  5: () => import('../data/mirai_library/vol05.json') as unknown as Promise<{ default: VolumePayload }>,
  6: () => import('../data/mirai_library/vol06.json') as unknown as Promise<{ default: VolumePayload }>,
  7: () => import('../data/mirai_library/vol07.json') as unknown as Promise<{ default: VolumePayload }>,
  8: () => import('../data/mirai_library/vol08.json') as unknown as Promise<{ default: VolumePayload }>,
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Lightweight safe inline markdown renderer (**bold**, `code`, *italic*) */
function fmtInline(raw: string): string {
  return esc(raw)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n\n+/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

function get3dSubViewForFh(fhId: string): number | null {
  if (fhId === 'FH01') return 1;
  if (fhId === 'FH02') return 2;
  if (fhId === 'FH08') return 3;
  if (fhId === 'FH32') return 4;
  if (fhId === 'FH25') return 5;
  if (fhId === 'FH20') return 6;
  if (fhId === 'FH17') return 7;
  if (fhId === 'FH48') return 8;
  return null;
}

export function loadSavedMiraiEdition(): MiraiEdition {
  try {
    const v = window.localStorage.getItem(EDITION_STORAGE_KEY);
    if (v === 'beginner' || v === 'expert') return v;
  } catch {
    // ignore storage restriction
  }
  return 'beginner';
}

export function saveMiraiEdition(ed: MiraiEdition): void {
  try {
    window.localStorage.setItem(EDITION_STORAGE_KEY, ed);
  } catch {
    // ignore
  }
}

/**
 * Lazy-Loaded Future History MIRAI 2028 Library Studio Overlay.
 * Strictly zero DOM nodes exist while closed; mounts cleanly on open() and tears down on close().
 */
export class MiraiLibraryStudio {
  private readonly callbacks: MiraiLibraryStudioCallbacks;
  private root: HTMLElement | null = null;
  private isOpenFlag = false;
  private activeTab: MiraiStudioTab = 'reports';
  private edition: MiraiEdition = loadSavedMiraiEdition();
  private activeVol = 1;
  private focusFhId: string | null = null;
  private focusGlossaryId: string | null = null;

  // Filter / sort states
  private matrixQuery = '';
  private matrixBadge = 'all';
  private matrixVol = 0;
  private matrixSort: 'id' | 'score' = 'id';
  private glossaryQuery = '';
  private glossaryMode: 'chapters' | 'alpha' | 'kana' = 'chapters';

  // Cached JSON payloads
  private matrixData: MatrixPayload | null = null;
  private glossaryData: GlossaryPayload | null = null;
  private volumeCache = new Map<number, VolumePayload>();
  private boundKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpenFlag) {
      e.preventDefault();
      this.close();
    }
  };

  constructor(callbacks: MiraiLibraryStudioCallbacks) {
    this.callbacks = callbacks;
  }

  public isOpen(): boolean {
    return this.isOpenFlag;
  }

  public getEdition(): MiraiEdition {
    return this.edition;
  }

  public setEdition(ed: MiraiEdition, notify = true): void {
    this.edition = ed;
    saveMiraiEdition(ed);
    if (notify) this.callbacks.onEditionChange?.(ed);
    if (this.isOpenFlag) this.render();
  }

  public async open(opts?: {
    tab?: MiraiStudioTab;
    volume?: number;
    fhId?: string;
    glossaryId?: string;
    edition?: MiraiEdition;
  }): Promise<void> {
    if (opts?.tab) this.activeTab = opts.tab;
    if (opts?.volume && opts.volume >= 1 && opts.volume <= 8) this.activeVol = opts.volume;
    if (opts?.fhId) {
      this.focusFhId = opts.fhId;
      const num = parseInt(opts.fhId.replace(/^FH0*/i, ''), 10);
      if (!Number.isNaN(num) && num >= 1 && num <= 48) {
        this.activeVol = Math.ceil(num / 6);
      }
    } else {
      this.focusFhId = null;
    }
    this.focusGlossaryId = opts?.glossaryId ?? null;
    if (opts?.edition) {
      this.edition = opts.edition;
      saveMiraiEdition(opts.edition);
      this.callbacks.onEditionChange?.(opts.edition);
    }

    this.ensureMounted();
    this.isOpenFlag = true;
    await this.ensureDataForCurrentTab();
    this.render();
    this.scrollToFocusedTarget();
  }

  public close(): void {
    this.isOpenFlag = false;
    window.removeEventListener('keydown', this.boundKeyDown);
    if (this.root) {
      this.root.remove();
      this.root = null;
    }
  }

  private ensureMounted(): void {
    if (this.root) return;
    const overlay = document.createElement('div');
    overlay.className = 'mirai-studio-backdrop';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Future History MIRAI 2028 ライブラリ');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });
    document.body.appendChild(overlay);
    this.root = overlay;
    window.addEventListener('keydown', this.boundKeyDown);
  }

  private async ensureMatrix(): Promise<MatrixPayload> {
    if (!this.matrixData) {
      const mod = (await import('../data/mirai_library/matrix.json')) as unknown as {
        default: MatrixPayload;
      };
      this.matrixData = mod.default;
    }
    return this.matrixData;
  }

  private async ensureGlossary(): Promise<GlossaryPayload> {
    if (!this.glossaryData) {
      const mod = (await import('../data/mirai_library/glossary.json')) as unknown as {
        default: GlossaryPayload;
      };
      this.glossaryData = mod.default;
    }
    return this.glossaryData;
  }

  private async ensureVolume(vol: number): Promise<VolumePayload> {
    const cached = this.volumeCache.get(vol);
    if (cached) return cached;
    const loader = VOL_LOADERS[vol] ?? VOL_LOADERS[1];
    const mod = await loader();
    this.volumeCache.set(vol, mod.default);
    return mod.default;
  }

  private async ensureDataForCurrentTab(): Promise<void> {
    if (this.activeTab === 'reports') {
      await Promise.all([this.ensureMatrix(), this.ensureVolume(this.activeVol), this.ensureGlossary()]);
    } else if (this.activeTab === 'matrix') {
      await this.ensureMatrix();
    } else {
      await this.ensureGlossary();
    }
  }

  private scrollToFocusedTarget(): void {
    if (!this.root) return;
    const targetId = this.focusFhId
      ? `mirai-tech-card-${this.focusFhId}`
      : this.focusGlossaryId
        ? `mirai-gloss-card-${this.focusGlossaryId}`
        : null;
    if (!targetId) return;
    requestAnimationFrame(() => {
      const el = this.root?.querySelector(`#${CSS.escape(targetId)}`) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('mirai-focus-pulse');
        setTimeout(() => el.classList.remove('mirai-focus-pulse'), 1800);
      }
    });
  }

  private render(): void {
    if (!this.root) return;
    const avg = this.matrixData?.averageScore?.toFixed(2) ?? '81.63';

    this.root.innerHTML = `
      <div class="mirai-studio-modal">
        <header class="mirai-studio-header">
          <div class="mirai-studio-brand">
            <span class="mirai-studio-emblem">FH 2028</span>
            <div class="mirai-studio-titles">
              <h2>Future History MIRAI 2028</h2>
              <p>2026.12.01 — 2028.12.01 ｜ 全48技術・16レポート＋別冊用語辞典113語（平均 ${avg}点）</p>
            </div>
          </div>

          <div class="mirai-studio-header-right">
            <div class="mirai-edition-toggle" role="group" aria-label="解説エディション切替">
              <button type="button" class="mirai-ed-btn ${this.edition === 'beginner' ? 'active' : ''}" data-ed="beginner">やさしい</button>
              <button type="button" class="mirai-ed-btn ${this.edition === 'expert' ? 'active' : ''}" data-ed="expert">専門</button>
            </div>
            <button type="button" class="mirai-studio-close" aria-label="閉じる">✕</button>
          </div>
        </header>

        <nav class="mirai-studio-tabs" role="tablist">
          <button type="button" class="mirai-tab-btn ${this.activeTab === 'reports' ? 'active' : ''}" data-tab="reports">レポート全8巻（16冊）</button>
          <button type="button" class="mirai-tab-btn ${this.activeTab === 'matrix' ? 'active' : ''}" data-tab="matrix">48技術比較マトリクス</button>
          <button type="button" class="mirai-tab-btn ${this.activeTab === 'glossary' ? 'active' : ''}" data-tab="glossary">別冊・専門用語辞典（113語）</button>
        </nav>

        <div class="mirai-studio-body">
          ${this.activeTab === 'reports' ? this.renderReportsTab() : this.activeTab === 'matrix' ? this.renderMatrixTab() : this.renderGlossaryTab()}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private renderReportsTab(): string {
    const volData = this.volumeCache.get(this.activeVol);
    const vols = this.matrixData?.volumes ?? [];
    const glossMap = new Map((this.glossaryData?.terms ?? []).map((t) => [t.id, t]));

    const volStrip = vols
      .map(
        (v) => `
        <button type="button" class="mirai-vol-pill ${v.volume === this.activeVol ? 'active' : ''}" data-vol="${v.volume}">
          <span class="mirai-vol-num">Vol.0${v.volume}</span>
          <span class="mirai-vol-theme">${esc(v.theme.slice(0, 14))}${v.theme.length > 14 ? '…' : ''}</span>
        </button>`
      )
      .join('');

    if (!volData) {
      return `<div class="mirai-vol-strip">${volStrip}</div><div class="mirai-loading">Vol.0${this.activeVol} を読み込み中…</div>`;
    }

    const header = this.edition === 'beginner' ? volData.beginnerHeader : volData.expertHeader;

    const techCards = volData.technologies
      .map((tech) => {
        const ed = this.edition === 'beginner' ? tech.beginner : tech.expert;
        const subView = get3dSubViewForFh(tech.id);
        const badgeCls =
          tech.badge === '量産民主化'
            ? 'badge-demo'
            : tech.badge === '超知能加速'
              ? 'badge-asi'
              : 'badge-wish';

        const axesHtml = AXIS_LABELS.map(
          (lbl, idx) => `
          <div class="mirai-axis-row">
            <span class="mirai-axis-lbl">${lbl}</span>
            <div class="mirai-axis-track"><div class="mirai-axis-fill" style="width:${(tech.axes[idx] / 20) * 100}%"></div></div>
            <span class="mirai-axis-val">${tech.axes[idx]}/20</span>
          </div>`
        ).join('');

        const rowsHtml = ed.comparisonRows
          .map(
            (r) => `
            <tr>
              <td><strong>${esc(r.metric)}</strong></td>
              <td>${fmtInline(r.current2026)}</td>
              <td class="mirai-td-future">${fmtInline(r.future2028)}</td>
            </tr>`
          )
          .join('');

        const sourcesHtml = ed.sources
          .map(
            (s) => `
            <li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${fmtInline(s.label)}</a></li>`
          )
          .join('');

        const glossChips = tech.glossaryIds
          .map((gid) => {
            const term = glossMap.get(gid);
            if (!term) return '';
            return `<button type="button" class="mirai-gloss-chip" data-gloss="${esc(gid)}">${esc(term.term)}</button>`;
          })
          .join('');

        return `
          <article class="mirai-tech-article" id="mirai-tech-card-${esc(tech.id)}">
            <div class="mirai-tech-head">
              <div class="mirai-tech-id-row">
                <span class="mirai-fh-code">${esc(tech.id)}</span>
                <span class="mirai-badge ${badgeCls}">${esc(tech.badge)}</span>
                <span class="mirai-eta-pill">到達目安: ${esc(tech.eta)}</span>
                ${
                  subView
                    ? `<button type="button" class="mirai-3d-jump-btn" data-jump-3d="${subView}">3D構造モデルを見る (${esc(tech.id)})</button>`
                    : `<span class="mirai-3d-soon-pill">3D構造：試作評価後に順次展開</span>`
                }
                <button type="button" class="mirai-base-jump-btn" data-jump-base="${esc(tech.baselineMode)}">現行2026実機と比較</button>
              </div>
              <h3 class="mirai-tech-title">${esc(ed.title)}</h3>
              ${ed.oneLiner ? `<p class="mirai-tech-oneliner">${fmtInline(ed.oneLiner)}</p>` : ''}
            </div>

            <div class="mirai-tech-grid">
              <div class="mirai-tech-main">
                <div class="mirai-subsec">
                  <h4>${this.edition === 'beginner' ? 'わかりやすくポイント解説' : '技術的特徴・物理メカニズム'}</h4>
                  <ul class="mirai-feature-list">
                    ${ed.features.map((f) => `<li>${fmtInline(f)}</li>`).join('')}
                  </ul>
                </div>

                ${
                  rowsHtml
                    ? `<div class="mirai-subsec">
                        <h4>2026年現行技術 vs 2028年未来技術</h4>
                        <table class="mirai-compare-table">
                          <thead><tr><th>${esc(ed.comparisonHeaders[0] || '項目')}</th><th>${esc(ed.comparisonHeaders[1] || '2026現行')}</th><th>${esc(ed.comparisonHeaders[2] || '2028未来')}</th></tr></thead>
                          <tbody>${rowsHtml}</tbody>
                        </table>
                      </div>`
                    : ''
                }

                <div class="mirai-procon-grid">
                  <div class="mirai-pc-box"><strong>変化</strong><p>${fmtInline(ed.changes)}</p></div>
                  <div class="mirai-pc-box pc-pro"><strong>メリット・優位性</strong><p>${fmtInline(ed.pros)} ${fmtInline(ed.edge)}</p></div>
                  <div class="mirai-pc-box pc-con"><strong>デメリット・残る壁</strong><p>${fmtInline(ed.cons)}</p></div>
                </div>

                ${
                  glossChips
                    ? `<div class="mirai-subsec"><h4>関連専門用語（別冊113語）</h4><div class="mirai-glossary-chips">${glossChips}</div></div>`
                    : ''
                }

                <div class="mirai-subsec">
                  <h4>一次情報・検証根拠リンク</h4>
                  <ul class="mirai-source-list">${sourcesHtml}</ul>
                </div>
              </div>

              <aside class="mirai-score-card">
                <div class="mirai-score-head">
                  <span class="mirai-score-lbl">革新性スコア</span>
                  <div class="mirai-score-big">${tech.score}<span> / 100</span></div>
                </div>
                <div class="mirai-axes-list">${axesHtml}</div>
                <p class="mirai-score-rationale">${fmtInline(ed.scoreRationale)}</p>
              </aside>
            </div>
          </article>
        `;
      })
      .join('');

    return `
      <div class="mirai-vol-strip">${volStrip}</div>
      <section class="mirai-vol-intro-card">
        <div class="mirai-vol-intro-tag">Vol.0${volData.volume} ｜ ${this.edition === 'beginner' ? 'やさしい解説版' : '技術者向け専門版'}</div>
        <h3>${esc(header.title)}</h3>
        <details class="mirai-preamble-details" open>
          <summary>企画意図・まえがき・導入</summary>
          <div class="mirai-preamble-body">
            <p>${fmtInline(header.intent)}</p>
            <p>${fmtInline(header.preface)}</p>
            <p>${fmtInline(header.intro)}</p>
          </div>
        </details>
      </section>
      <div class="mirai-tech-list">${techCards}</div>
    `;
  }

  private renderMatrixTab(): string {
    const data = this.matrixData;
    if (!data) return `<div class="mirai-loading">48技術マトリクスを読み込み中…</div>`;
    const q = this.matrixQuery.trim().toLowerCase();
    let list = data.technologies.filter((t) => {
      if (this.matrixBadge !== 'all' && t.badge !== this.matrixBadge) return false;
      if (this.matrixVol > 0 && t.volume !== this.matrixVol) return false;
      if (q) {
        const hay = `${t.id} ${t.expertTitle} ${t.beginnerTitle} ${t.volumeTheme} ${t.oneLiner}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (this.matrixSort === 'score') {
      list = [...list].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
    }

    const rows = list
      .map((t) => {
        const subView = get3dSubViewForFh(t.id);
        const title = this.edition === 'beginner' ? t.beginnerTitle : t.expertTitle;
        return `
          <tr class="mirai-matrix-row">
            <td><span class="mirai-fh-code">${esc(t.id)}</span></td>
            <td>Vol.0${t.volume}</td>
            <td>
              <button type="button" class="mirai-matrix-title-btn" data-open-fh="${esc(t.id)}">${esc(title)}</button>
            </td>
            <td><span class="mirai-badge ${t.badge === '量産民主化' ? 'badge-demo' : t.badge === '超知能加速' ? 'badge-asi' : 'badge-wish'}">${esc(t.badge)}</span></td>
            <td class="mirai-matrix-score"><strong>${t.score}</strong>/100</td>
            <td>${esc(t.eta)}</td>
            <td>
              ${
                subView
                  ? `<button type="button" class="mirai-3d-mini-btn" data-jump-3d="${subView}">3D表示</button>`
                  : `<button type="button" class="mirai-read-mini-btn" data-open-fh="${esc(t.id)}">解説</button>`
              }
            </td>
          </tr>`;
      })
      .join('');

    return `
      <div class="mirai-filter-bar">
        <input type="search" class="mirai-search-input" data-search="matrix" placeholder="48技術をキーワード検索（例：SPAD, ペロブスカイト, メタレンズ, 全固体電池…）" value="${esc(this.matrixQuery)}" />
        <select class="mirai-select" data-filter="badge">
          <option value="all" ${this.matrixBadge === 'all' ? 'selected' : ''}>全分類 (48)</option>
          <option value="量産民主化" ${this.matrixBadge === '量産民主化' ? 'selected' : ''}>量産民主化</option>
          <option value="超知能加速" ${this.matrixBadge === '超知能加速' ? 'selected' : ''}>超知能加速</option>
          <option value="願望ブレイクスルー" ${this.matrixBadge === '願望ブレイクスルー' ? 'selected' : ''}>願望ブレイクスルー</option>
        </select>
        <select class="mirai-select" data-filter="vol">
          <option value="0" ${this.matrixVol === 0 ? 'selected' : ''}>全8巻</option>
          ${[1, 2, 3, 4, 5, 6, 7, 8].map((v) => `<option value="${v}" ${this.matrixVol === v ? 'selected' : ''}>Vol.0${v}</option>`).join('')}
        </select>
        <select class="mirai-select" data-filter="sort">
          <option value="id" ${this.matrixSort === 'id' ? 'selected' : ''}>FH01→FH48順</option>
          <option value="score" ${this.matrixSort === 'score' ? 'selected' : ''}>革新性スコア高い順</option>
        </select>
      </div>
      <div class="mirai-matrix-meta">表示中：<strong>${list.length}</strong> / ${data.totalTechnologies} 技術 ｜ 全体平均スコア：<strong>${data.averageScore.toFixed(2)} / 100点</strong> ｜ 3D試作公開中：<strong>FH01・FH02</strong></div>
      <div class="mirai-matrix-wrap">
        <table class="mirai-matrix-table">
          <thead>
            <tr><th>ID</th><th>巻</th><th>技術名（${this.edition === 'beginner' ? 'やさしい' : '専門'}）</th><th>分類</th><th>スコア</th><th>到達目安</th><th>操作</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  private renderGlossaryTab(): string {
    const data = this.glossaryData;
    if (!data) return `<div class="mirai-loading">別冊・専門用語辞典（113語）を読み込み中…</div>`;
    const q = this.glossaryQuery.trim().toLowerCase();

    let terms = data.terms.filter((t) => {
      if (this.glossaryMode === 'alpha' && t.script !== 'alpha') return false;
      if (this.glossaryMode === 'kana' && t.script !== 'kana') return false;
      if (q) {
        const hay = `${t.id} ${t.term} ${t.reading} ${t.oneLine} ${t.analogy} ${t.fhIds.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (this.glossaryMode === 'alpha') {
      terms = [...terms].sort((a, b) => a.indexKey.localeCompare(b.indexKey) || a.term.localeCompare(b.term));
    } else if (this.glossaryMode === 'kana') {
      terms = [...terms].sort((a, b) => a.reading.localeCompare(b.reading, 'ja'));
    }

    const cards = terms
      .map(
        (t) => `
        <article class="mirai-gloss-card" id="mirai-gloss-card-${esc(t.id)}">
          <div class="mirai-gloss-card-head">
            <span class="mirai-gloss-num">#${esc(t.id)}</span>
            <h4>${esc(t.term)}</h4>
            <span class="mirai-gloss-reading">${esc(t.reading)}</span>
            <span class="mirai-gloss-ch">第${t.chapter}章</span>
          </div>
          <p class="mirai-gloss-oneline">${fmtInline(t.oneLine)}</p>
          ${t.analogy ? `<p class="mirai-gloss-analogy"><strong>たとえると：</strong>${fmtInline(t.analogy)}</p>` : ''}
          ${t.cameraImpact ? `<p class="mirai-gloss-impact"><strong>カメラでどう効く？：</strong>${fmtInline(t.cameraImpact)}</p>` : ''}
          <div class="mirai-gloss-links">
            ${t.fhIds
              .map(
                (fh) => `<button type="button" class="mirai-fh-mini-chip" data-open-fh="${esc(fh)}">${esc(fh)}</button>`
              )
              .join('')}
          </div>
        </article>`
      )
      .join('');

    return `
      <div class="mirai-filter-bar">
        <input type="search" class="mirai-search-input" data-search="glossary" placeholder="全113語を検索（例：SPAD, ペロブスカイト, エタンデュ, Cu-Cu, 超知能…）" value="${esc(this.glossaryQuery)}" />
        <div class="mirai-gloss-mode-group">
          <button type="button" class="mirai-gm-btn ${this.glossaryMode === 'chapters' ? 'active' : ''}" data-gmode="chapters">分野別 8章 (${data.totalTerms})</button>
          <button type="button" class="mirai-gm-btn ${this.glossaryMode === 'alpha' ? 'active' : ''}" data-gmode="alpha">数字・A–Z (${data.alphaCount})</button>
          <button type="button" class="mirai-gm-btn ${this.glossaryMode === 'kana' ? 'active' : ''}" data-gmode="kana">50音 (${data.kanaCount})</button>
        </div>
      </div>
      <div class="mirai-gloss-grid">${cards}</div>
    `;
  }

  private bindEvents(): void {
    if (!this.root) return;
    this.root.querySelector('.mirai-studio-close')?.addEventListener('click', () => this.close());

    this.root.querySelectorAll<HTMLButtonElement>('.mirai-ed-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ed = btn.dataset.ed === 'expert' ? 'expert' : 'beginner';
        this.setEdition(ed, true);
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('.mirai-tab-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const next = (btn.dataset.tab as MiraiStudioTab) ?? 'reports';
        this.activeTab = next;
        this.focusFhId = null;
        this.focusGlossaryId = null;
        await this.ensureDataForCurrentTab();
        this.render();
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('.mirai-vol-pill').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const v = Number(btn.dataset.vol || '1');
        this.activeVol = v;
        this.focusFhId = null;
        await this.ensureVolume(v);
        this.render();
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-jump-3d]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sv = Number(btn.dataset.jump3d || '1');
        this.close();
        this.callbacks.onJumpTo3d(sv);
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-jump-base]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = (btn.dataset.jumpBase as ScaleMode) || 'sensor';
        this.close();
        this.callbacks.onJumpToBaseline(mode);
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-open-fh]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const fhId = btn.dataset.openFh;
        if (!fhId) return;
        await this.open({ tab: 'reports', fhId });
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-gloss]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const gid = btn.dataset.gloss;
        if (!gid) return;
        await this.open({ tab: 'glossary', glossaryId: gid });
      });
    });

    const mSearch = this.root.querySelector<HTMLInputElement>('[data-search="matrix"]');
    mSearch?.addEventListener('input', () => {
      this.matrixQuery = mSearch.value;
      const pos = mSearch.selectionStart ?? mSearch.value.length;
      this.render();
      const nextEl = this.root?.querySelector<HTMLInputElement>('[data-search="matrix"]');
      nextEl?.focus();
      nextEl?.setSelectionRange(pos, pos);
    });

    const gSearch = this.root.querySelector<HTMLInputElement>('[data-search="glossary"]');
    gSearch?.addEventListener('input', () => {
      this.glossaryQuery = gSearch.value;
      const pos = gSearch.selectionStart ?? gSearch.value.length;
      this.render();
      const nextEl = this.root?.querySelector<HTMLInputElement>('[data-search="glossary"]');
      nextEl?.focus();
      nextEl?.setSelectionRange(pos, pos);
    });

    this.root.querySelector<HTMLSelectElement>('[data-filter="badge"]')?.addEventListener('change', (e) => {
      this.matrixBadge = (e.target as HTMLSelectElement).value;
      this.render();
    });
    this.root.querySelector<HTMLSelectElement>('[data-filter="vol"]')?.addEventListener('change', (e) => {
      this.matrixVol = Number((e.target as HTMLSelectElement).value || '0');
      this.render();
    });
    this.root.querySelector<HTMLSelectElement>('[data-filter="sort"]')?.addEventListener('change', (e) => {
      this.matrixSort = (e.target as HTMLSelectElement).value === 'score' ? 'score' : 'id';
      this.render();
    });

    this.root.querySelectorAll<HTMLButtonElement>('.mirai-gm-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const gm = btn.dataset.gmode as 'chapters' | 'alpha' | 'kana';
        this.glossaryMode = gm || 'chapters';
        this.render();
      });
    });
  }
}
