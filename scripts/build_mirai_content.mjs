#!/usr/bin/env node
/**
 * Deterministic Single-Source-of-Truth Builder for Future History MIRAI 2028 (`FH MIRAI 2028`).
 * Parses `reports/fh_mirai_2028/` (16 cleared dual reports + 113-term Beginner Glossary + INDEX.md)
 * into lazy-loaded code-split JSON chunks under `src/data/mirai_library/` (outside top-level
 * `src/data/*.json` so `validate_parts.mjs` only scans true 3D V2 unit JSONs!).
 *
 * Outputs:
 *   - `src/data/mirai_library/matrix.json`   (48 technologies summary, scores, 5 axes, ETAs, modes)
 *   - `src/data/mirai_library/glossary.json` (all 113 cleared terms with chapter + A-Z/50-on keys)
 *   - `src/data/mirai_library/vol01.json` .. `vol08.json` (full dual-edition structured prose)
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, 'reports', 'fh_mirai_2028');
const OUT_DIR = path.join(ROOT, 'src', 'data', 'mirai_library');

fs.mkdirSync(OUT_DIR, { recursive: true });

// 3D-built watchmaker technology IDs (FH01, FH02, FH08, FH32, FH25 — 5 structures / 86 parts)
const BUILT_3D_TECH_IDS = new Set(['FH01', 'FH02', 'FH08', 'FH32', 'FH25']);

function readUtf8(p) {
  return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
}

function cleanMdInline(str) {
  return String(str ?? '').trim();
}

/** Parse INDEX.md table for canonical vol / category / score / eta / baselineMode */
function parseIndexTable() {
  const txt = readUtf8(path.join(REPORTS_DIR, 'INDEX.md'));
  const map = new Map();
  const re =
    /^\|\s*`(FH\d{2})`\s*\|\s*Vol\.(\d{2})\s*\|\s*`\[([^\]]+)\]`\s*\|\s*\*\*(\d+)\*\*\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|\s*(.+?)\s*\|$/gm;
  let m;
  while ((m = re.exec(txt)) !== null) {
    map.set(m[1], {
      id: m[1],
      volume: Number.parseInt(m[2], 10),
      badge: m[3].trim(),
      score: Number.parseInt(m[4], 10),
      eta: m[5].trim(),
      baselineMode: m[6].trim(),
      indexTitle: m[7].trim(),
    });
  }
  if (map.size !== 48) {
    throw new Error(`INDEX.md expected 48 technologies, parsed ${map.size}`);
  }
  return map;
}

/** Extract a top-level `## N. ...` section body */
function extractTopSection(txt, headingNum) {
  const startRe = new RegExp(`^##\\s+${headingNum}\\.[^\\n]*\\n`, 'm');
  const startM = txt.match(startRe);
  if (!startM || startM.index === undefined) return '';
  const bodyStart = startM.index + startM[0].length;
  const rest = txt.slice(bodyStart);
  const nextM = rest.match(/^##\s+\d+\./m);
  return (nextM && nextM.index !== undefined ? rest.slice(0, nextM.index) : rest).trim();
}

/** Parse comparison markdown table inside a technology block */
function parseMdTable(block) {
  const lines = block.split('\n');
  const tableLines = [];
  let inTable = false;
  for (const line of lines) {
    if (/^\s*\|.+\|\s*$/.test(line)) {
      inTable = true;
      tableLines.push(line.trim());
    } else if (inTable) {
      break;
    }
  }
  if (tableLines.length < 3) return { headers: [], rows: [] };
  const splitRow = (r) =>
    r
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
  const headers = splitRow(tableLines[0]);
  const rows = [];
  for (let i = 2; i < tableLines.length; i++) {
    const cells = splitRow(tableLines[i]);
    if (cells.length >= 3) {
      rows.push({
        metric: cells[0],
        current2026: cells[1],
        future2028: cells[2],
      });
    }
  }
  return { headers, rows };
}

/** Extract verified external URLs with their bullet descriptions */
function parseSources(block) {
  const secM = block.match(/-\s*\*\*参照サイト・根拠[^*]*\*\*[:：]?\s*\n([\s\S]*?)(?=\n-\s*\*\*(?:既存技術|今のカメラ)|$)/);
  if (!secM) return [];
  const lines = secM[1].split('\n');
  const sources = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line.startsWith('-')) continue;
    const urls = line.match(/https?:\/\/[^\s\)\]>\"'、。]+/g);
    if (!urls || urls.length === 0) continue;
    const labelPart = line
      .replace(/^-\s*/, '')
      .replace(/https?:\/\/[^\s\)\]>\"'、。]+/g, '')
      .replace(/および/g, '')
      .replace(/[:：\s]+$/g, '')
      .trim();
    for (let i = 0; i < urls.length; i++) {
      sources.push({
        label: urls.length > 1 ? `${labelPart} (${i + 1})` : labelPart || urls[i],
        url: urls[i],
      });
    }
  }
  return sources;
}

/** Extract bullet list under a `- **Heading**:` section */
function extractBullets(block, headingPattern) {
  const re = new RegExp(`-\\s*\\*\\*${headingPattern}[^*]*\\*\\*[:：]?\\s*([\\s\\S]*?)(?=\\n-\\s*\\*\\*|$)`);
  const m = block.match(re);
  if (!m) return [];
  const raw = m[1].trim();
  const lines = raw.split('\n');
  const out = [];
  for (const l of lines) {
    const t = l.trim();
    if (!t) continue;
    if (t.startsWith('- ')) out.push(t.slice(2).trim());
    else if (out.length === 0) out.push(t);
    else out[out.length - 1] += ' ' + t;
  }
  return out;
}

function extractInlineBullet(block, labelRegex) {
  const re = new RegExp(`-\\s*\\*\\*(?:${labelRegex})\\*\\*[:：]?\\s*(.+)`);
  const m = block.match(re);
  return m ? m[1].trim() : '';
}

function parseScores(block, fid) {
  const scPos = block.indexOf('革新性');
  const scBlock = scPos >= 0 ? block.slice(scPos) : block;
  const totalM = scBlock.match(/(\d{2,3})\s*\/\s*100/);
  const score = totalM ? Number.parseInt(totalM[1], 10) : 0;
  const axes = Array.from(
    scBlock.matchAll(/(?<![/\d])(\d{1,2})\s*\/\s*20(?!\s*(?:秒|fps|Hz|mm|nm))/g),
    (m) => Number.parseInt(m[1], 10)
  ).slice(0, 5);
  if (axes.length !== 5 || axes.reduce((a, b) => a + b, 0) !== score) {
    throw new Error(`Score/axes mismatch on ${fid}: score=${score}, axes=${JSON.stringify(axes)}`);
  }
  const rationale = extractInlineBullet(scBlock, '具体的採点根拠|採点の具体的根拠|なぜこの点数？');
  return { score, axes, rationale };
}

function parseVolumeEdition(filePath, edition) {
  const txt = readUtf8(filePath);
  const titleM = txt.match(/^#\s+(.+)$/m);
  const volTitle = titleM ? titleM[1].trim() : '';
  const intent = extractTopSection(txt, 1);
  const preface = extractTopSection(txt, 2);
  const intro = extractTopSection(txt, 4);
  const summarySection = extractTopSection(txt, 6);

  const sec5 = extractTopSection(txt, 5);
  const techMatches = [...sec5.matchAll(/^###\s+(FH\d{2})[:：\s]+(.+)$/gm)];
  const techs = {};

  for (let i = 0; i < techMatches.length; i++) {
    const m = techMatches[i];
    const fid = m[1];
    const title = m[2].trim();
    const start = m.index;
    const end = i + 1 < techMatches.length ? techMatches[i + 1].index : sec5.length;
    const body = sec5.slice(start, end).trim();

    const { score, axes, rationale } = parseScores(body, fid);
    const table = parseMdTable(body);
    const sources = parseSources(body);

    if (edition === 'expert') {
      const metaLine = extractInlineBullet(body, 'メタ情報');
      const features = extractBullets(body, '特徴');
      const changes = extractInlineBullet(body, '変化');
      const pros = extractInlineBullet(body, 'メリット');
      const cons = extractInlineBullet(body, 'デメリット・技術課題|デメリット');
      const edge = extractInlineBullet(body, '既存技術に対する優位性|優位性');
      const cadMemo = extractInlineBullet(body, '次フェーズ3D CAD可視化メモ');
      techs[fid] = {
        id: fid,
        title,
        metaLine,
        features,
        sources,
        comparisonHeaders: table.headers,
        comparisonRows: table.rows,
        changes,
        pros,
        cons,
        edge,
        score,
        axes,
        scoreRationale: rationale,
        cadMemo,
      };
    } else {
      const oneLiner = extractInlineBullet(body, 'ひとことで言うと');
      const features = extractBullets(body, '特徴');
      const changes = extractInlineBullet(body, '何がどう変わる？|変化');
      const pros = extractInlineBullet(body, 'うれしいメリット|メリット');
      const cons = extractInlineBullet(body, 'まだある弱点・注意点（デメリット）|デメリット');
      const edge = extractInlineBullet(body, '今のカメラより圧倒的に有利なポイント（優位性）|優位性');
      techs[fid] = {
        id: fid,
        title,
        oneLiner,
        features,
        sources,
        comparisonHeaders: table.headers,
        comparisonRows: table.rows,
        changes,
        pros,
        cons,
        edge,
        score,
        axes,
        scoreRationale: rationale,
      };
    }
  }

  return { volTitle, intent, preface, intro, summarySection, techs };
}

/** Parse 113-term Beginner Technical Glossary */
function parseGlossary() {
  const txt = readUtf8(path.join(REPORTS_DIR, 'FH_2028_Glossary_Beginner.md'));
  const sec6Pos = txt.indexOf('## 6.');
  const sec5 = txt.slice(txt.indexOf('## 5.'), sec6Pos);
  const sec6 = txt.slice(sec6Pos);

  // Build lookup of index group (alpha vs kana + initial key) from Section 6 tables
  const indexGroupByNum = new Map();
  const alphaBlock = sec6.split('### 数字・アルファベット順')[1].split('### 50音順')[0];
  const kanaBlock = sec6.split('### 50音順')[1];
  for (const m of alphaBlock.matchAll(/^\|\s*\*\*([^|]+?)\*\*\s*\|[^|]+\|[^|]+\|\s*`#(\d{3})`/gm)) {
    indexGroupByNum.set(m[2], { script: 'alpha', key: m[1].trim() });
  }
  for (const m of kanaBlock.matchAll(/^\|\s*\*\*([^|]+?)\*\*\s*\|[^|]+\|[^|]+\|\s*`#(\d{3})`/gm)) {
    indexGroupByNum.set(m[2], { script: 'kana', key: m[1].trim() });
  }

  // Track chapter headings
  const chapterMatches = [...sec5.matchAll(/^###\s+第(\d+)章：([^（]+)（/gm)];
  const getChapterForPos = (pos) => {
    let ch = { num: 1, title: '' };
    for (const cm of chapterMatches) {
      if (cm.index <= pos) {
        ch = { num: Number.parseInt(cm[1], 10), title: cm[2].trim() };
      }
    }
    return ch;
  };

  const entryMatches = [...sec5.matchAll(/^####\s+(\d{3})\.\s+(.+?)（読み：([^）]+)）$/gm)];
  const terms = [];
  for (let i = 0; i < entryMatches.length; i++) {
    const m = entryMatches[i];
    const num = m[1];
    const term = m[2].trim();
    const reading = m[3].trim();
    const start = m.index;
    const end = i + 1 < entryMatches.length ? entryMatches[i + 1].index : sec5.length;
    const body = sec5.slice(start, end);
    const ch = getChapterForPos(start);

    const oneLine = extractInlineBullet(body, 'ひとことで言うと');
    const analogy = extractInlineBullet(body, '身近なたとえ話');
    const cameraImpact = extractInlineBullet(body, 'カメラでどう効く？（2028年への意味＆注意点）');
    const refsRaw = extractInlineBullet(body, '登場巻・関連技術');
    const fhIds = Array.from(new Set(refsRaw.match(/FH\d{2}/g) ?? []));
    const vols = Array.from(new Set(refsRaw.match(/Vol\.\d{2}/g) ?? []));
    const idxInfo = indexGroupByNum.get(num) ?? { script: 'kana', key: 'あ' };

    terms.push({
      id: num,
      term,
      reading,
      chapter: ch.num,
      chapterTitle: ch.title,
      script: idxInfo.script,
      indexKey: idxInfo.key,
      oneLine,
      analogy,
      cameraImpact,
      vols,
      fhIds,
    });
  }

  if (terms.length !== 113) {
    throw new Error(`Expected 113 glossary terms, parsed ${terms.length}`);
  }
  return terms;
}

// ============================================================================
// Execute Build
// ============================================================================
const indexMap = parseIndexTable();
const glossaryTerms = parseGlossary();
const matrixEntries = [];

const VOL_THEMES = [
  '',
  '次世代撮像素子・光電変換ブレイクスルー',
  'メタ光学・無可動ソリッドステートレンズ革命',
  'イベント駆動・時間軸解放・超高精度AF＆磁気IBIS',
  'インセンサーAI・2nm/A16 GAAチップレット＆光インターコネクト',
  '次世代EVF/ARファインダー・ニューロモーターUI＆裸眼3Dディスプレイ',
  '次世代電池・水密MEMS空冷＆タフネス複合ボディ',
  '超高速ストレージ・宇宙直結通信・量子真正性＆空間音響エコシステム',
  '2028超知能（ASI）による量産民主化革命＆ポスト・カメラ総括',
];

for (let v = 1; v <= 8; v++) {
  const vv = String(v).padStart(2, '0');
  const expPath = path.join(REPORTS_DIR, 'expert', `FH_2028_Vol${vv}_Expert.md`);
  const begPath = path.join(REPORTS_DIR, 'beginner', `FH_2028_Vol${vv}_Beginner.md`);
  const exp = parseVolumeEdition(expPath, 'expert');
  const beg = parseVolumeEdition(begPath, 'beginner');

  const fhIds = Object.keys(exp.techs).sort();
  if (fhIds.length !== 6) {
    throw new Error(`Vol.${vv} expected 6 technologies, got ${fhIds.length}`);
  }

  const combinedTechs = fhIds.map((fid) => {
    const idx = indexMap.get(fid);
    const e = exp.techs[fid];
    const b = beg.techs[fid];
    if (!b) throw new Error(`Missing beginner entry for ${fid}`);
    if (e.score !== b.score || e.score !== idx.score) {
      throw new Error(`Score drift on ${fid}: expert=${e.score}, beginner=${b.score}, index=${idx.score}`);
    }
    // Collect related glossary term IDs
    const relatedGlossaryIds = glossaryTerms
      .filter((gt) => gt.fhIds.includes(fid))
      .map((gt) => gt.id)
      .slice(0, 8);

    matrixEntries.push({
      id: fid,
      volume: v,
      volumeTheme: VOL_THEMES[v],
      badge: idx.badge,
      score: e.score,
      axes: e.axes,
      eta: idx.eta,
      baselineMode: idx.baselineMode,
      has3dPrototype: BUILT_3D_TECH_IDS.has(fid),
      expertTitle: e.title,
      beginnerTitle: b.title,
      oneLiner: cleanMdInline(b.oneLiner.split('｜分類')[0]),
      glossaryIds: relatedGlossaryIds,
    });

    return {
      id: fid,
      volume: v,
      badge: idx.badge,
      eta: idx.eta,
      baselineMode: idx.baselineMode,
      has3dPrototype: BUILT_3D_TECH_IDS.has(fid),
      score: e.score,
      axes: e.axes,
      glossaryIds: relatedGlossaryIds,
      expert: e,
      beginner: b,
    };
  });

  const volPayload = {
    volume: v,
    theme: VOL_THEMES[v],
    expertHeader: {
      title: exp.volTitle,
      intent: exp.intent,
      preface: exp.preface,
      intro: exp.intro,
      summary: exp.summarySection,
    },
    beginnerHeader: {
      title: beg.volTitle,
      intent: beg.intent,
      preface: beg.preface,
      intro: beg.intro,
      summary: beg.summarySection,
    },
    technologies: combinedTechs,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, `vol${vv}.json`),
    JSON.stringify(volPayload),
    'utf8'
  );
}

const avgScore = +(matrixEntries.reduce((acc, it) => acc + it.score, 0) / matrixEntries.length).toFixed(2);
const matrixPayload = {
  version: '2.0-cleared',
  timeline: '2026-12-01 ~ 2028-12-01',
  totalTechnologies: matrixEntries.length,
  averageScore: avgScore,
  built3dIds: [...BUILT_3D_TECH_IDS],
  volumes: VOL_THEMES.slice(1).map((theme, i) => ({
    volume: i + 1,
    theme,
    range: `FH${String(i * 6 + 1).padStart(2, '0')}–FH${String((i + 1) * 6).padStart(2, '0')}`,
  })),
  technologies: matrixEntries,
};

fs.writeFileSync(path.join(OUT_DIR, 'matrix.json'), JSON.stringify(matrixPayload), 'utf8');
fs.writeFileSync(
  path.join(OUT_DIR, 'glossary.json'),
  JSON.stringify({
    version: '2.0-cleared',
    totalTerms: glossaryTerms.length,
    alphaCount: glossaryTerms.filter((t) => t.script === 'alpha').length,
    kanaCount: glossaryTerms.filter((t) => t.script === 'kana').length,
    terms: glossaryTerms,
  }),
  'utf8'
);

console.log(
  `[OK] Generated FH MIRAI 2028 library JSONs -> ${path.relative(ROOT, OUT_DIR)}/ ` +
    `(48 technologies, avg=${avgScore}/100, 8 volumes, ${glossaryTerms.length} glossary terms)`
);
