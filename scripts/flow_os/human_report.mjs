/**
 * FLOW V1 OS — HUMAN-ONLY Live Telemetry & Repository Audit Report Generator (`flow human-report`)
 *
 * STRICT POLICY: AI agents MUST NEVER invoke this autonomously; ONLY execute upon explicit
 * human request. Computes 100% live, zero-cache exact metrics:
 *   - Real-time LOC (total / code / comment / blank) by language & subsystem
 *   - Exact project / mode / tool / solver counts
 *   - Exact per-unit part counts (via domain adapter if configured)
 *   - Exact storage capacity breakdown (working tree, subdirs, .git, build bundle, gzip)
 *   - AI token efficiency & FLOW V1 OS savings telemetry
 * Saves a crisp human-readable Japanese Markdown report and hands the saved path to the user.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { getGitMeta } from './kernel_config.mjs';
import { auditTwoBooks } from './doc_compiler.mjs';
import { readReceiptStore } from './receipt_chain.mjs';
import { readTokenTelemetry } from './wire_protocol.mjs';

const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', '.vite', '__pycache__', '.cache']);
const BUILD_ARTIFACT_DIRS = new Set(['docs', 'android']);

const LANG_BY_EXT = {
  '.ts': 'TypeScript',
  '.tsx': 'TypeScript',
  '.mjs': 'JavaScript (ESM)',
  '.js': 'JavaScript',
  '.cjs': 'JavaScript',
  '.py': 'Python',
  '.cpp': 'C++17',
  '.cc': 'C++17',
  '.hpp': 'C++17',
  '.h': 'C/C++ Header',
  '.css': 'CSS',
  '.html': 'HTML',
  '.json': 'JSON',
  '.jsonl': 'JSONL',
  '.tsv': 'TSV (Index/Pose)',
  '.sh': 'Shell',
  '.xml': 'XML / MJCF',
  '.md': 'Markdown',
  '.yml': 'YAML',
  '.yaml': 'YAML',
  '.v': 'Verilog RTL',
  '.sv': 'SystemVerilog',
  '.cir': 'SPICE Netlist',
  '.inp': 'CalculiX FEA',
};

const CODE_LANGS = new Set([
  'TypeScript',
  'JavaScript (ESM)',
  'JavaScript',
  'Python',
  'C++17',
  'C/C++ Header',
  'CSS',
  'HTML',
  'Shell',
  'Verilog RTL',
  'SystemVerilog',
]);

function countLineKinds(text, ext) {
  const lines = text.length === 0 ? [] : text.split(/\r?\n/);
  let blank = 0;
  let comment = 0;
  let code = 0;
  let inBlock = false;
  const isHashLang = ext === '.py' || ext === '.sh' || ext === '.yml' || ext === '.yaml' || ext === '.tsv';
  const isSlashLang = ext === '.ts' || ext === '.tsx' || ext === '.mjs' || ext === '.js' || ext === '.cjs' || ext === '.cpp' || ext === '.hpp' || ext === '.css' || ext === '.v';

  for (const raw of lines) {
    const t = raw.trim();
    if (!t) {
      blank++;
      continue;
    }
    if (isSlashLang) {
      if (inBlock) {
        comment++;
        if (t.includes('*/')) inBlock = false;
        continue;
      }
      if (t.startsWith('//')) {
        comment++;
        continue;
      }
      if (t.startsWith('/*')) {
        comment++;
        if (!t.includes('*/')) inBlock = true;
        continue;
      }
    } else if (isHashLang && t.startsWith('#')) {
      comment++;
      continue;
    }
    code++;
  }
  return { total: lines.length, code, comment, blank };
}

function fmtBytes(b) {
  if (b >= 1024 * 1024 * 1024) return `${(b / (1024 ** 3)).toFixed(2)} GB`;
  if (b >= 1024 * 1024) return `${(b / (1024 ** 2)).toFixed(2)} MB`;
  if (b >= 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${b} B`;
}

function fmtNum(n) {
  return Number(n || 0).toLocaleString('en-US');
}

function measureDirSize(absDir) {
  if (!fs.existsSync(absDir)) return { bytes: 0, files: 0 };
  let bytes = 0;
  let files = 0;
  const stack = [absDir];
  while (stack.length > 0) {
    const cur = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) {
        try {
          bytes += fs.statSync(p).size;
          files++;
        } catch { /* ignore */ }
      }
    }
  }
  return { bytes, files };
}

function walkLiveFiles(rootAbs) {
  const sourceFiles = [];
  const buildFiles = [];
  const stack = [{ abs: rootAbs, rel: '', isBuild: false }];

  while (stack.length > 0) {
    const { abs, rel, isBuild } = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(abs, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const childRel = rel ? `${rel}/${e.name}` : e.name;
      const childAbs = path.join(abs, e.name);
      if (e.isDirectory()) {
        if (EXCLUDE_DIRS.has(e.name)) continue;
        const childIsBuild = isBuild || (!rel && BUILD_ARTIFACT_DIRS.has(e.name));
        stack.push({ abs: childAbs, rel: childRel, isBuild: childIsBuild });
      } else if (e.isFile()) {
        let size = 0;
        try { size = fs.statSync(childAbs).size; } catch { continue; }
        const rec = { abs: childAbs, rel: childRel, size, ext: path.extname(e.name).toLowerCase() };
        if (isBuild) buildFiles.push(rec);
        else sourceFiles.push(rec);
      }
    }
  }
  return { sourceFiles, buildFiles };
}

function classifySubsystem(rel) {
  const parts = rel.split('/');
  if (parts.length === 1) return '(root)';
  if (parts[0] === 'src' && parts.length >= 2) return `src/${parts[1]}`;
  if (parts[0] === 'scripts' && parts.length >= 2) {
    return parts[1].includes('.') ? 'scripts/(root)' : `scripts/${parts[1]}`;
  }
  return parts[0];
}

export async function generateHumanReport(ctx, adapter, opts = {}) {
  const t0 = performance.now();
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g, '').replace('T', '_').slice(0, 15);
  const outPath = opts.out
    ? path.resolve(opts.out)
    : path.join('/tmp/flow_reports', `HUMAN_REPORT_${stamp}.md`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const git = getGitMeta(ctx.repoRoot);
  const { sourceFiles, buildFiles } = walkLiveFiles(ctx.repoRoot);

  const byLang = {};
  const bySub = {};
  let totalFiles = 0;
  let totalBytes = 0;
  let totalLines = 0;
  let totalCodeLines = 0;
  let totalCommentLines = 0;
  let totalBlankLines = 0;
  let progFiles = 0;
  let progTotalLines = 0;
  let progCodeLines = 0;
  let progBytes = 0;

  for (const f of sourceFiles) {
    totalFiles++;
    totalBytes += f.size;
    const lang = LANG_BY_EXT[f.ext] || (f.ext ? `Other (${f.ext})` : 'Other');
    const sub = classifySubsystem(f.rel);
    if (!byLang[lang]) byLang[lang] = { files: 0, lines: 0, code: 0, comment: 0, blank: 0, bytes: 0 };
    if (!bySub[sub]) bySub[sub] = { files: 0, lines: 0, code: 0, bytes: 0 };

    byLang[lang].files++;
    byLang[lang].bytes += f.size;
    bySub[sub].files++;
    bySub[sub].bytes += f.size;

    const isText = Boolean(LANG_BY_EXT[f.ext]) && f.size <= 16 * 1024 * 1024;
    if (isText) {
      const text = fs.readFileSync(f.abs, 'utf8');
      const lc = countLineKinds(text, f.ext);
      byLang[lang].lines += lc.total;
      byLang[lang].code += lc.code;
      byLang[lang].comment += lc.comment;
      byLang[lang].blank += lc.blank;
      bySub[sub].lines += lc.total;
      bySub[sub].code += lc.code;
      totalLines += lc.total;
      totalCodeLines += lc.code;
      totalCommentLines += lc.comment;
      totalBlankLines += lc.blank;
      if (CODE_LANGS.has(lang)) {
        progFiles++;
        progTotalLines += lc.total;
        progCodeLines += lc.code;
        progBytes += f.size;
      }
    }
  }

  // Build output (docs/) & .git & node_modules storage breakdown
  let buildBytes = 0;
  let docsJsBytes = 0;
  let docsJsGzipBytes = 0;
  let docsMaxChunkBytes = 0;
  let docsMaxChunkName = '-';
  for (const f of buildFiles) {
    buildBytes += f.size;
    if (f.rel.startsWith('docs/assets/') && (f.ext === '.js' || f.ext === '.css')) {
      docsJsBytes += f.size;
      if (f.size > docsMaxChunkBytes) {
        docsMaxChunkBytes = f.size;
        docsMaxChunkName = path.basename(f.rel);
      }
      if (f.size <= 4 * 1024 * 1024) {
        docsJsGzipBytes += zlib.gzipSync(fs.readFileSync(f.abs), { level: 6 }).length;
      }
    }
  }

  const gitSize = measureDirSize(path.join(ctx.repoRoot, '.git'));
  const nmSize = measureDirSize(path.join(ctx.repoRoot, 'node_modules'));
  const docsSize = measureDirSize(path.join(ctx.repoRoot, 'docs'));
  const androidSize = measureDirSize(path.join(ctx.repoRoot, 'android'));

  // Domain adapter real-time project & part statistics
  const domainStats = adapter?.collectHumanReportMetrics
    ? await adapter.collectHumanReportMetrics()
    : null;

  const docAudit = auditTwoBooks(ctx);
  const receipts = readReceiptStore(ctx.stateDir);
  const telemetry = readTokenTelemetry(ctx.stateDir);

  let commitCount = 0;
  try {
    commitCount = Number(
      execFileSync('git', ['rev-list', '--count', 'HEAD'], { cwd: ctx.repoRoot, encoding: 'utf8' }).trim()
    );
  } catch { /* ignore */ }

  const elapsedMs = Math.round(performance.now() - t0);

  // Build crisp, richly detailed Japanese Markdown for human reading
  const md = [];
  md.push(`# 📊 ${ctx.cfg.projectName} — リアルタイム完全計測レポート（FLOW V1 OS ヒューマン専用コマンド）`);
  md.push('');
  md.push(`> **計測日時 (UTC)**: \`${now.toISOString()}\` ｜ **ブランチ**: \`${git.branch}\` (\`${git.head}\`, コミット数 ${fmtNum(commitCount)}) ｜ **未コミット変更**: ${git.dirtyCount}件 ｜ **実測所要時間**: ${elapsedMs} ms`);
  md.push('> *本レポートはキャッシュを一切使用せず、ローカルファイルシステムを全数実走査してリアルタイム算出しています。*');
  md.push('');
  md.push('---');
  md.push('');
  md.push('## 1. 全体エグゼクティブ・サマリ');
  md.push('');
  md.push('| 計測カテゴリ | 実測値 | 補足詳細 |');
  md.push('|---|---:|---|');
  md.push(`| **全テキスト総行数（データ・設定・文書含む）** | **${fmtNum(totalLines)} 行** | 実行/有効行 ${fmtNum(totalCodeLines)} / コメント ${fmtNum(totalCommentLines)} / 空行 ${fmtNum(totalBlankLines)} |`);
  md.push(`| **純粋プログラムコード行数（TS/JS/Py/C++/CSS/HTML/SH/RTL）** | **${fmtNum(progTotalLines)} 行** | 実コード行 ${fmtNum(progCodeLines)} 行（${fmtNum(progFiles)} ファイル / ${fmtBytes(progBytes)}） |`);
  md.push(`| **ソース作業ツリー ファイル数 / 総容量** | **${fmtNum(totalFiles)} 件 / ${fmtBytes(totalBytes)}** | \`node_modules\`・\`.git\`・ビルド出力 \`docs/\`・\`android/\` 除外 |`);
  if (domainStats) {
    md.push(`| **登録プロジェクト / ユニット総数** | **${domainStats.totalModes} モード** | 個別ユニット ${domainStats.individualModes} ＋ 統合アセンブリ ${domainStats.compositeModes}（＋ ${domainStats.subProjects.join(' / ')}） |`);
    md.push(`| **3D CAD 独自パーツ総数（統合含む延べ総数）** | **${fmtNum(domainStats.uniqueParts)} パーツ** | 統合モード含む延べ登録数 **${fmtNum(domainStats.totalPartEntries)} パーツ**（JSON↔宣言整合 ${domainStats.parityOk}/${domainStats.totalModes}） |`);
  }
  md.push(`| **リポジトリ全体ディスク容量（\`docs/\`+\`android/\`含む）** | **${fmtBytes(totalBytes + buildBytes)}** | \`docs/\` ビルド成果物 ${fmtBytes(docsSize.bytes)}、\`android/\` ${fmtBytes(androidSize.bytes)}、\`.git/\` ${fmtBytes(gitSize.bytes)} |`);
  md.push(`| **AI 説明書 2冊統合ステータス** | **${docAudit.bookCount} 冊 / ${fmtNum(docAudit.totalTokens)} tok** | 合計 ${fmtBytes(docAudit.totalBytes)}（旧10冊 188KB・約55,000 tok 比 **${(100 * (1 - docAudit.totalTokens / 55000)).toFixed(1)}% 削減**） |`);
  md.push('');

  // Section 2: Language Breakdown
  md.push('## 2. 言語別 プログラムコード行数・容量内訳');
  md.push('');
  md.push('| 言語 / 種別 | ファイル数 | 総行数 | 実コード/有効行 | コメント行 | 空行 | 容量 |');
  md.push('|---|---:|---:|---:|---:|---:|---:|');
  const langRows = Object.entries(byLang).sort((a, b) => b[1].lines - a[1].lines || b[1].bytes - a[1].bytes);
  for (const [lang, s] of langRows) {
    md.push(`| ${lang} | ${fmtNum(s.files)} | ${fmtNum(s.lines)} | ${fmtNum(s.code)} | ${fmtNum(s.comment)} | ${fmtNum(s.blank)} | ${fmtBytes(s.bytes)} |`);
  }
  md.push(`| **合計（ソースツリー全体）** | **${fmtNum(totalFiles)}** | **${fmtNum(totalLines)}** | **${fmtNum(totalCodeLines)}** | **${fmtNum(totalCommentLines)}** | **${fmtNum(totalBlankLines)}** | **${fmtBytes(totalBytes)}** |`);
  md.push('');

  // Section 3: Directory / Subsystem Breakdown
  md.push('## 3. ディレクトリ・サブシステム別 行数・容量内訳');
  md.push('');
  md.push('| サブシステム / ディレクトリ | ファイル数 | 総行数 | 実コード/有効行 | 容量 |');
  md.push('|---|---:|---:|---:|---:|');
  const subRows = Object.entries(bySub).sort((a, b) => b[1].bytes - a[1].bytes);
  for (const [sub, s] of subRows) {
    md.push(`| \`${sub}\` | ${fmtNum(s.files)} | ${fmtNum(s.lines)} | ${fmtNum(s.code)} | ${fmtBytes(s.bytes)} |`);
  }
  md.push('');

  // Section 4: Projects & Parts Detailed Table (if adapter provides)
  if (domainStats && Array.isArray(domainStats.units)) {
    md.push('## 4. 全プロジェクト・ユニット別 パーツ数完全明細');
    md.push('');
    md.push(`- **個別ユニット数**: ${domainStats.individualModes}（独自パーツ合計 **${fmtNum(domainStats.uniqueParts)}**）`);
    md.push(`- **統合アセンブリ数**: ${domainStats.compositeModes}（統合パーツ合計 **${fmtNum(domainStats.compositeParts)}**）`);
    md.push(`- **全モード延べ合計**: **${domainStats.totalModes} モード / ${fmtNum(domainStats.totalPartEntries)} パーツ**`);
    md.push(`- **搭載検証・解析システム**: ${domainStats.toolSummary}`);
    md.push('');
    md.push('| # | unitId | 種別 | パーツ数 | コード範囲 | pose.tsv補正数 | JSON容量 | 名称 |');
    md.push('|---:|---|---|---:|---|---:|---:|---|');
    domainStats.units.forEach((u, idx) => {
      md.push(`| ${idx + 1} | \`${u.unitId}\` | ${u.kind === 'composite' ? '統合' : '個別'} | **${fmtNum(u.actualParts)}** | \`${u.codeRange}\` | ${fmtNum(u.poseOverrides || 0)} | ${fmtBytes(u.jsonBytes)} | ${u.nameJa || u.nameEn} |`);
    });
    md.push('');
  }

  // Section 5: Storage & Bundle Capacity
  md.push('## 5. ストレージ容量・ビルドバンドル詳細');
  md.push('');
  md.push('| 領域 | ファイル数 | 容量 | 備考 |');
  md.push('|---|---:|---:|---|');
  md.push(`| ソース作業ツリー（\`src/\`, \`scripts/\`, \`catalog/\`, \`reports/\` 等） | ${fmtNum(totalFiles)} | **${fmtBytes(totalBytes)}** | Git管理対象コア |`);
  md.push(`| 本番ビルド出力（\`docs/\`） | ${fmtNum(docsSize.files)} | **${fmtBytes(docsSize.bytes)}** | JS/CSS計 ${fmtBytes(docsJsBytes)}（gzip ${fmtBytes(docsJsGzipBytes)} / 最大チャンク \`${docsMaxChunkName}\` ${fmtBytes(docsMaxChunkBytes)}） |`);
  md.push(`| Android Capacitor プロジェクト（\`android/\`） | ${fmtNum(androidSize.files)} | ${fmtBytes(androidSize.bytes)} | APKビルドプロジェクト |`);
  md.push(`| Git オブジェクトストア（\`.git/\`） | ${fmtNum(gitSize.files)} | ${fmtBytes(gitSize.bytes)} | 全履歴＋bg-vault |`);
  md.push(`| Node 依存パッケージ（\`node_modules/\`） | ${fmtNum(nmSize.files)} | ${fmtBytes(nmSize.bytes)} | ローカル依存（Git除外） |`);
  md.push('');

  // Section 6: FLOW V1 OS Token & Security Telemetry
  md.push('## 6. FLOW V1 OS 稼働・トークン削減・セキュリティ状態');
  md.push('');
  md.push(`- **2冊統合マニュアル監査**: \`${docAudit.ok ? 'PASS' : 'FAIL'}\`（検出冊数 ${docAudit.bookCount}冊: \`${docAudit.books.join('`, `')}\` / 合計 **${fmtNum(docAudit.totalTokens)} tok**）`);
  md.push(`- **最新セキュリティレシート**: \`${receipts.security?.receipt || '未発行'}\``);
  const domRcpts = Object.values(receipts.domain || {});
  md.push(`- **最新ドメイン検証レシート（EXAM V1）**: ${domRcpts.length > 0 ? domRcpts.map((r) => `\`${r.target}: ${r.receipt}\``).join(', ') : '未発行'}`);
  md.push(`- **最新 3者暗号連鎖 \`FLOW-RECEIPT\`**: \`${receipts.flow?.receipt || '未発行'}\``);
  if (telemetry) {
    const pct = telemetry.totalEstimatedLegacyTokens > 0
      ? ((telemetry.totalSavedTokens / telemetry.totalEstimatedLegacyTokens) * 100).toFixed(1)
      : '0.0';
    md.push(`- **FLOW V1 OS 累計トークン削減実績**: コマンド ${fmtNum(telemetry.totalCommands)}回実行 / 実出力 ${fmtNum(telemetry.totalEmittedTokens)} tok vs 従来推定 ${fmtNum(telemetry.totalEstimatedLegacyTokens)} tok → **累計 ${fmtNum(telemetry.totalSavedTokens)} tok 削減（-${pct}%）**`);
    if (telemetry.healRuns > 0) {
      md.push(`- **\`flow heal\` 0トークン自動修復累計**: ${telemetry.healRuns}回実行 / 自動解決パーツ **${fmtNum(telemetry.healAutoSolvedParts)} 件** / Tier-B切り出し ${fmtNum(telemetry.healTierBParts)} 件`);
    }
  }
  md.push('');

  const content = md.join('\n');
  fs.writeFileSync(outPath, content, 'utf8');

  let artifactCopyPath = null;
  if (opts.artifacts && fs.existsSync(opts.artifacts)) {
    artifactCopyPath = path.join(path.resolve(opts.artifacts), path.basename(outPath));
    fs.writeFileSync(artifactCopyPath, content, 'utf8');
  }

  return {
    ok: true,
    outPath,
    artifactCopyPath,
    elapsedMs,
    summary: {
      totalFiles,
      totalLines,
      progTotalLines,
      progCodeLines,
      totalBytes,
      buildBytes,
      uniqueParts: domainStats?.uniqueParts ?? null,
      totalModes: domainStats?.totalModes ?? null,
      docTokens: docAudit.totalTokens,
    },
  };
}
