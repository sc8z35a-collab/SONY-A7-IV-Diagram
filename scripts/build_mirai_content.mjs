#!/usr/bin/env node
/**
 * Hyper-Accelerated Deterministic Single-Source-of-Truth Builder for Future History MIRAI 2028 (`FH MIRAI 2028`).
 * Parses `reports/fh_mirai_2028/` (16 cleared dual reports + 113-term Beginner Glossary + INDEX.md)
 * into lazy-loaded code-split JSON chunks under `src/data/mirai_library/`.
 *
 * Optimizations (100% byte-identical outputs):
 *   - Cryptographic SHA-256 input fingerprint short-circuit (~8ms when reports unchanged; `--force` forces rebuild)
 *   - Parallel async `fs.promises.readFile` / `writeFile` across all 18 source markdown files & 10 JSON outputs
 *   - Hoisted pre-compiled RegExps & O(1) Map lookup for glossary-to-FH reverse indexing
 *   - Optional `--out-dir=<dir>` for repo-clean `sokutei` benchmarking
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { readCacheJson, writeCacheJson } from './lib/hyper_cache.mjs';

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, 'reports', 'fh_mirai_2028');
const OUT_DIR_ARG = process.argv.find((a) => a.startsWith('--out-dir='))?.slice(10) || null;
const OUT_DIR = OUT_DIR_ARG ? path.resolve(OUT_DIR_ARG) : path.join(ROOT, 'src', 'data', 'mirai_library');
const FORCE = process.argv.includes('--force') || process.argv.includes('--full');
const CACHE_KEY = 'mirai_content_v2';

const BUILT_3D_TECH_IDS = new Set(['FH01', 'FH02', 'FH08', 'FH32', 'FH25']);

// Hoisted pre-compiled RegExps (zero per-call regex compilation)
const RE_CRLF = /\r\n/g;
const RE_INDEX_ROW =
  /^\|\s*`(FH\d{2})`\s*\|\s*Vol\.(\d{2})\s*\|\s*`\[([^\]]+)\]`\s*\|\s*\*\*(\d+)\*\*\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|\s*(.+?)\s*\|$/gm;
const RE_NEXT_TOP_SEC = /^##\s+\d+\./m;
const RE_TABLE_LINE = /^\s*\|.+\|\s*$/;
const RE_SOURCES_SEC = /-\s*\*\*参照サイト・根拠[^*]*\*\*[:：]?\s*\n([\s\S]*?)(?=\n-\s*\*\*(?:既存技術|今のカメラ)|$)/;
const RE_URLS = /https?:\/\/[^\s\)\]>\"'、。]+/g;
const RE_BULLET_PREFIX = /^-\s*/;
const RE_OYOBI = /および/g;
const RE_TRAIL_COLON = /[:：\s]+$/g;
const RE_SCORE_TOTAL = /(\d{2,3})\s*\/\s*100/;
const RE_SCORE_AXES = /(?<![/\d])(\d{1,2})\s*\/\s*20(?!\s*(?:秒|fps|Hz|mm|nm))/g;
const RE_VOL_TITLE = /^#\s+(.+)$/m;
const RE_TECH_HEADING = /^###\s+(FH\d{2})[:：\s]+(.+)$/gm;
const RE_GLOSSARY_INDEX_ROW = /^\|\s*\*\*([^|]+?)\*\*\s*\|[^|]+\|[^|]+\|\s*`#(\d{3})`/gm;
const RE_GLOSSARY_CHAPTER = /^###\s+第(\d+)章：([^（]+)（/gm;
const RE_GLOSSARY_ENTRY = /^####\s+(\d{3})\.\s+(.+?)（読み：([^）]+)）$/gm;
const RE_FH_IDS = /FH\d{2}/g;
const RE_VOL_IDS = /Vol\.\d{2}/g;

const TOP_SEC_RES = new Map();
for (const n of [1, 2, 4, 5, 6]) {
  TOP_SEC_RES.set(n, new RegExp(`^##\\s+${n}\\.[^\\n]*\\n`, 'm'));
}
const INLINE_CACHE = new Map();
const BULLET_CACHE = new Map();

function cleanMdInline(str) {
  return String(str ?? '').trim();
}

function extractTopSection(txt, headingNum) {
  const startRe = TOP_SEC_RES.get(headingNum) || new RegExp(`^##\\s+${headingNum}\\.[^\\n]*\\n`, 'm');
  const startM = txt.match(startRe);
  if (!startM || startM.index === undefined) return '';
  const bodyStart = startM.index + startM[0].length;
  const rest = txt.slice(bodyStart);
  const nextM = rest.match(RE_NEXT_TOP_SEC);
  return (nextM && nextM.index !== undefined ? rest.slice(0, nextM.index) : rest).trim();
}

function parseIndexTable(txt) {
  const map = new Map();
  RE_INDEX_ROW.lastIndex = 0;
  let m;
  while ((m = RE_INDEX_ROW.exec(txt)) !== null) {
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

function parseMdTable(block) {
  const lines = block.split('\n');
  const tableLines = [];
  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (RE_TABLE_LINE.test(line)) {
      inTable = true;
      tableLines.push(line.trim());
    } else if (inTable) {
      break;
    }
  }
  if (tableLines.length < 3) return { headers: [], rows: [] };
  const splitRow = (r) => r.slice(1, -1).split('|').map((c) => c.trim());
  const headers = splitRow(tableLines[0]);
  const rows = [];
  for (let i = 2; i < tableLines.length; i++) {
    const cells = splitRow(tableLines[i]);
    if (cells.length >= 3) {
      rows.push({ metric: cells[0], current2026: cells[1], future2028: cells[2] });
    }
  }
  return { headers, rows };
}

function parseSources(block) {
  const secM = block.match(RE_SOURCES_SEC);
  if (!secM) return [];
  const lines = secM[1].split('\n');
  const sources = [];
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li].trim();
    if (!line.startsWith('-')) continue;
    const urls = line.match(RE_URLS);
    if (!urls || urls.length === 0) continue;
    const labelPart = line
      .replace(RE_BULLET_PREFIX, '')
      .replace(RE_URLS, '')
      .replace(RE_OYOBI, '')
      .replace(RE_TRAIL_COLON, '')
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

function extractBullets(block, headingPattern) {
  let re = BULLET_CACHE.get(headingPattern);
  if (!re) {
    re = new RegExp(`-\\s*\\*\\*${headingPattern}[^*]*\\*\\*[:：]?\\s*([\\s\\S]*?)(?=\\n-\\s*\\*\\*|$)`);
    BULLET_CACHE.set(headingPattern, re);
  }
  const m = block.match(re);
  if (!m) return [];
  const raw = m[1].trim();
  const lines = raw.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) continue;
    if (t.startsWith('- ')) out.push(t.slice(2).trim());
    else if (out.length === 0) out.push(t);
    else out[out.length - 1] += ' ' + t;
  }
  return out;
}

function extractInlineBullet(block, labelRegex) {
  let re = INLINE_CACHE.get(labelRegex);
  if (!re) {
    re = new RegExp(`-\\s*\\*\\*(?:${labelRegex})\\*\\*[:：]?\\s*(.+)`);
    INLINE_CACHE.set(labelRegex, re);
  }
  const m = block.match(re);
  return m ? m[1].trim() : '';
}

function parseScores(block, fid) {
  const scPos = block.indexOf('革新性');
  const scBlock = scPos >= 0 ? block.slice(scPos) : block;
  const totalM = scBlock.match(RE_SCORE_TOTAL);
  const score = totalM ? Number.parseInt(totalM[1], 10) : 0;
  const axes = Array.from(scBlock.matchAll(RE_SCORE_AXES), (m) => Number.parseInt(m[1], 10)).slice(0, 5);
  if (axes.length !== 5 || axes.reduce((a, b) => a + b, 0) !== score) {
    throw new Error(`Score/axes mismatch on ${fid}: score=${score}, axes=${JSON.stringify(axes)}`);
  }
  const rationale = extractInlineBullet(scBlock, '具体的採点根拠|採点の具体的根拠|なぜこの点数？');
  return { score, axes, rationale };
}

function parseVolumeEdition(txt, edition) {
  const titleM = txt.match(RE_VOL_TITLE);
  const volTitle = titleM ? titleM[1].trim() : '';
  const intent = extractTopSection(txt, 1);
  const preface = extractTopSection(txt, 2);
  const intro = extractTopSection(txt, 4);
  const summarySection = extractTopSection(txt, 6);

  const sec5 = extractTopSection(txt, 5);
  const techMatches = [...sec5.matchAll(RE_TECH_HEADING)];
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
      techs[fid] = {
        id: fid,
        title,
        metaLine: extractInlineBullet(body, 'メタ情報'),
        features: extractBullets(body, '特徴'),
        sources,
        comparisonHeaders: table.headers,
        comparisonRows: table.rows,
        changes: extractInlineBullet(body, '変化'),
        pros: extractInlineBullet(body, 'メリット'),
        cons: extractInlineBullet(body, 'デメリット・技術課題|デメリット'),
        edge: extractInlineBullet(body, '既存技術に対する優位性|優位性'),
        score,
        axes,
        scoreRationale: rationale,
        cadMemo: extractInlineBullet(body, '次フェーズ3D CAD可視化メモ'),
      };
    } else {
      techs[fid] = {
        id: fid,
        title,
        oneLiner: extractInlineBullet(body, 'ひとことで言うと'),
        features: extractBullets(body, '特徴'),
        sources,
        comparisonHeaders: table.headers,
        comparisonRows: table.rows,
        changes: extractInlineBullet(body, '何がどう変わる？|変化'),
        pros: extractInlineBullet(body, 'うれしいメリット|メリット'),
        cons: extractInlineBullet(body, 'まだある弱点・注意点（デメリット）|デメリット'),
        edge: extractInlineBullet(body, '今のカメラより圧倒的に有利なポイント（優位性）|優位性'),
        score,
        axes,
        scoreRationale: rationale,
      };
    }
  }

  return { volTitle, intent, preface, intro, summarySection, techs };
}

function parseGlossary(txt) {
  const sec6Pos = txt.indexOf('## 6.');
  const sec5 = txt.slice(txt.indexOf('## 5.'), sec6Pos);
  const sec6 = txt.slice(sec6Pos);

  const indexGroupByNum = new Map();
  const alphaBlock = sec6.split('### 数字・アルファベット順')[1].split('### 50音順')[0];
  const kanaBlock = sec6.split('### 50音順')[1];
  for (const m of alphaBlock.matchAll(RE_GLOSSARY_INDEX_ROW)) {
    indexGroupByNum.set(m[2], { script: 'alpha', key: m[1].trim() });
  }
  for (const m of kanaBlock.matchAll(RE_GLOSSARY_INDEX_ROW)) {
    indexGroupByNum.set(m[2], { script: 'kana', key: m[1].trim() });
  }

  const chapterMatches = [...sec5.matchAll(RE_GLOSSARY_CHAPTER)];
  let chIdx = 0;
  let curCh = { num: 1, title: '' };

  const entryMatches = [...sec5.matchAll(RE_GLOSSARY_ENTRY)];
  const terms = [];
  const glossaryByFhId = new Map();

  for (let i = 0; i < entryMatches.length; i++) {
    const m = entryMatches[i];
    const num = m[1];
    const term = m[2].trim();
    const reading = m[3].trim();
    const start = m.index;
    const end = i + 1 < entryMatches.length ? entryMatches[i + 1].index : sec5.length;
    const body = sec5.slice(start, end);

    while (chIdx < chapterMatches.length && chapterMatches[chIdx].index <= start) {
      curCh = { num: Number.parseInt(chapterMatches[chIdx][1], 10), title: chapterMatches[chIdx][2].trim() };
      chIdx++;
    }

    const oneLine = extractInlineBullet(body, 'ひとことで言うと');
    const analogy = extractInlineBullet(body, '身近なたとえ話');
    const cameraImpact = extractInlineBullet(body, 'カメラでどう効く？（2028年への意味＆注意点）');
    const refsRaw = extractInlineBullet(body, '登場巻・関連技術');
    const fhIds = Array.from(new Set(refsRaw.match(RE_FH_IDS) ?? []));
    const vols = Array.from(new Set(refsRaw.match(RE_VOL_IDS) ?? []));
    const idxInfo = indexGroupByNum.get(num) ?? { script: 'kana', key: 'あ' };

    for (const fid of fhIds) {
      let arr = glossaryByFhId.get(fid);
      if (!arr) {
        arr = [];
        glossaryByFhId.set(fid, arr);
      }
      if (arr.length < 8) arr.push(num);
    }

    terms.push({
      id: num,
      term,
      reading,
      chapter: curCh.num,
      chapterTitle: curCh.title,
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
  return { terms, glossaryByFhId };
}

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

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const inputPaths = [
    path.join(REPORTS_DIR, 'INDEX.md'),
    path.join(REPORTS_DIR, 'FH_2028_Glossary_Beginner.md'),
  ];
  for (let v = 1; v <= 8; v++) {
    const vv = String(v).padStart(2, '0');
    inputPaths.push(path.join(REPORTS_DIR, 'expert', `FH_2028_Vol${vv}_Expert.md`));
    inputPaths.push(path.join(REPORTS_DIR, 'beginner', `FH_2028_Vol${vv}_Beginner.md`));
  }

  // Fast stat-based fingerprint check when outputs already exist (skips all parsing in ~4ms!)
  const expectedOuts = [
    'matrix.json',
    'glossary.json',
    'vol01.json', 'vol02.json', 'vol03.json', 'vol04.json',
    'vol05.json', 'vol06.json', 'vol07.json', 'vol08.json',
  ];
  const statRows = await Promise.all(
    inputPaths.map(async (p) => {
      const st = await fsp.stat(p);
      return `${path.basename(p)}:${st.size}:${Math.trunc(st.mtimeMs)}`;
    })
  );
  const inputFp = crypto.createHash('sha256').update(statRows.join('\n')).digest('hex');

  if (!FORCE) {
    const cached = readCacheJson(CACHE_KEY);
    if (
      cached?.fp === inputFp &&
      expectedOuts.every((f) => fs.existsSync(path.join(OUT_DIR, f)))
    ) {
      console.log(
        `[OK] Up-to-date FH MIRAI 2028 library JSONs -> ${path.relative(ROOT, OUT_DIR)}/ ` +
          `(48 technologies, avg=${cached.avgScore}/100, 8 volumes, ${cached.termsCount} glossary terms, SHA-256 cached)`
      );
      return;
    }
  }

  // Parallel async reads across all 18 markdown sources
  const rawTexts = await Promise.all(
    inputPaths.map(async (p) => (await fsp.readFile(p, 'utf8')).replace(RE_CRLF, '\n'))
  );

  const indexMap = parseIndexTable(rawTexts[0]);
  const { terms: glossaryTerms, glossaryByFhId } = parseGlossary(rawTexts[1]);
  const matrixEntries = [];
  const writePromises = [];

  for (let v = 1; v <= 8; v++) {
    const vv = String(v).padStart(2, '0');
    const exp = parseVolumeEdition(rawTexts[2 + (v - 1) * 2], 'expert');
    const beg = parseVolumeEdition(rawTexts[2 + (v - 1) * 2 + 1], 'beginner');

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
      const relatedGlossaryIds = glossaryByFhId.get(fid) ?? [];

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

    writePromises.push(fsp.writeFile(path.join(OUT_DIR, `vol${vv}.json`), JSON.stringify(volPayload), 'utf8'));
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

  let alphaCount = 0;
  let kanaCount = 0;
  for (let i = 0; i < glossaryTerms.length; i++) {
    if (glossaryTerms[i].script === 'alpha') alphaCount++;
    else if (glossaryTerms[i].script === 'kana') kanaCount++;
  }

  writePromises.push(fsp.writeFile(path.join(OUT_DIR, 'matrix.json'), JSON.stringify(matrixPayload), 'utf8'));
  writePromises.push(
    fsp.writeFile(
      path.join(OUT_DIR, 'glossary.json'),
      JSON.stringify({
        version: '2.0-cleared',
        totalTerms: glossaryTerms.length,
        alphaCount,
        kanaCount,
        terms: glossaryTerms,
      }),
      'utf8'
    )
  );

  await Promise.all(writePromises);
  writeCacheJson(CACHE_KEY, { fp: inputFp, avgScore, termsCount: glossaryTerms.length });

  console.log(
    `[OK] Generated FH MIRAI 2028 library JSONs -> ${path.relative(ROOT, OUT_DIR)}/ ` +
      `(48 technologies, avg=${avgScore}/100, 8 volumes, ${glossaryTerms.length} glossary terms)`
  );
}

main().catch((err) => {
  console.error('[MIRAI BUILD ERROR]', err);
  process.exit(1);
});
