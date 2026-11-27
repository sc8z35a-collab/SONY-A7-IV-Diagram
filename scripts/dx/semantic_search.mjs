/**
 * `dx` Component 3A — Local Hybrid BM25 + AST + Japanese N-gram Cross-Domain Search (`dx find`)
 *
 * Searches across parts (L0/L1/L2), TS AST symbols, schematics, materials, CAD helpers,
 * and CSS rules in <80ms with zero external APIs or vector DBs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { buildCodeAtlas } from './atlas_builder.mjs';
import { enforceTokenBudget } from './tokenizer_and_budget.mjs';

function parseTsvFile(absPath) {
  if (!fs.existsSync(absPath)) return [];
  const lines = fs.readFileSync(absPath, 'utf8').split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split('\t');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.startsWith('#')) continue;
    const cols = line.split('\t');
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = cols[c] ?? '';
    }
    rows.push(obj);
  }
  return rows;
}

/**
 * Hybrid tokenizer: splits CamelCase / snake_case / kebab-case / punctuation for ASCII
 * AND emits character bigrams + runs for Japanese (Hiragana/Katakana/Kanji).
 */
export function tokenizeForSearch(text) {
  const s = String(text ?? '');
  const terms = [];

  // 1. ASCII identifier & number terms (with CamelCase sub-word splitting)
  const asciiMatches = s.match(/[A-Za-z0-9]+/g);
  if (asciiMatches) {
    for (const raw of asciiMatches) {
      const lower = raw.toLowerCase();
      if (lower.length >= 2) terms.push(lower);
      const camelSplit = raw
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .toLowerCase()
        .split(/\s+/);
      if (camelSplit.length > 1) {
        for (const sub of camelSplit) {
          if (sub.length >= 2) terms.push(sub);
        }
      }
    }
  }

  // 2. Japanese CJK / Kana runs + bigrams
  const jpMatches = s.match(/[ぁ-んァ-ヶー一-龯々]+/g);
  if (jpMatches) {
    for (const run of jpMatches) {
      terms.push(run);
      if (run.length >= 2) {
        for (let i = 0; i < run.length - 1; i++) {
          terms.push(run.slice(i, i + 2));
        }
      }
    }
  }

  return terms;
}

function loadCorpus(rootAbs, domainFilter, unitFilter) {
  const codeDir = path.join(rootAbs, 'catalog', 'code');
  if (!fs.existsSync(path.join(codeDir, 'SYMBOLS.tsv'))) {
    buildCodeAtlas({ root: rootAbs });
  }

  const allow = (d) => !domainFilter || domainFilter.size === 0 || domainFilter.has(d);
  const docs = [];

  // 1. Units (catalog/INDEX.tsv)
  if (allow('unit')) {
    const indexRows = parseTsvFile(path.join(rootAbs, 'catalog', 'INDEX.tsv'));
    for (const r of indexRows) {
      if (unitFilter && r.mode !== unitFilter) continue;
      docs.push({
        domain: 'unit',
        key: r.mode,
        location: `${r.unit_file} | ${r.data_file}`,
        detail: `${r.kind} ${r.parts}p slug=${r.slug_prefix} next=${r.next_code}`,
        unit: r.mode,
        searchText: `${r.mode} ${r.slug_prefix} ${r.code_min} ${r.code_max} ${r.next_code} ${r.unit_file} ${r.data_file}`,
      });
    }
  }

  // 2. Parts (catalog/spatial/*.tsv — individual units only to avoid composite dupes unless filtered)
  if (allow('part')) {
    const spatialDir = path.join(rootAbs, 'catalog', 'spatial');
    if (fs.existsSync(spatialDir)) {
      const files = fs.readdirSync(spatialDir).filter((f) => f.endsWith('.tsv')).sort();
      for (const f of files) {
        const mode = f.replace(/\.tsv$/, '');
        if (!unitFilter && (mode === 'integrated' || mode === 'camera_body')) continue;
        if (unitFilter && mode !== unitFilter) continue;
        const rows = parseTsvFile(path.join(spatialDir, f));
        for (const r of rows) {
          docs.push({
            domain: 'part',
            key: r.id,
            location: `src/data/${mode === 'mishoe' ? 'mi_shoe' : mode}.json`,
            detail: `[${mode}] ${r.code} ${r.name} pos=${r.pos} size=${r.size} mat=${r.mat}`,
            unit: mode,
            searchText: `${r.id} ${r.code} ${r.name} ${r.group} ${mode} ${r.mat}`,
          });
        }
      }
    }
  }

  // 3. Symbols (catalog/code/SYMBOLS.tsv)
  if (allow('symbol')) {
    const symRows = parseTsvFile(path.join(codeDir, 'SYMBOLS.tsv'));
    for (const r of symRows) {
      if (unitFilter && !r.file.includes(unitFilter)) continue;
      docs.push({
        domain: 'symbol',
        key: r.symbol,
        location: `${r.file}:${r.start}-${r.end}`,
        detail: `${r.kind} ${r.signature}`,
        unit: '-',
        searchText: `${r.symbol} ${r.file} ${r.kind} ${r.signature}`,
      });
    }
  }

  // 4. Schematics (catalog/code/SCHEMATICS.tsv)
  if (allow('schematic')) {
    const schRows = parseTsvFile(path.join(codeDir, 'SCHEMATICS.tsv'));
    for (const r of schRows) {
      if (unitFilter && !r.unit_hint.split(',').includes(unitFilter)) continue;
      docs.push({
        domain: 'schematic',
        key: r.diagram_type,
        location: `${r.file}:${r.start}-${r.end}`,
        detail: `fn=${r.func} unit=${r.unit_hint}`,
        unit: r.unit_hint,
        searchText: `${r.diagram_type} ${r.file} ${r.func} ${r.unit_hint}`,
      });
    }
  }

  // 5. Materials (catalog/code/MATERIALS.tsv)
  if (allow('material')) {
    const matRows = parseTsvFile(path.join(codeDir, 'MATERIALS.tsv'));
    for (const r of matRows) {
      docs.push({
        domain: 'material',
        key: r.key,
        location:
          r.kind === 'bucket'
            ? `src/core/resource_cache.ts:${r.line}`
            : `src/core/v2_material_catalog.ts:${r.line}`,
        detail: `${r.kind} bucket=${r.bucket} tint=${r.tint}`,
        unit: '-',
        searchText: `${r.key} ${r.bucket} ${r.kind} ${r.tint}`,
      });
    }
  }

  // 6. Helpers (catalog/code/HELPERS.tsv)
  if (allow('helper')) {
    const hRows = parseTsvFile(path.join(codeDir, 'HELPERS.tsv'));
    for (const r of hRows) {
      docs.push({
        domain: 'helper',
        key: r.symbol,
        location: `${r.file}:${r.start}-${r.end}`,
        detail: `${r.kind} ${r.signature}`,
        unit: '-',
        searchText: `${r.symbol} ${r.file} ${r.signature}`,
      });
    }
  }

  // 7. CSS Rules (catalog/code/CSS_INDEX.tsv)
  if (allow('css')) {
    const cssRows = parseTsvFile(path.join(codeDir, 'CSS_INDEX.tsv'));
    for (const r of cssRows) {
      docs.push({
        domain: 'css',
        key: r.selector,
        location: `src/styles/main.css:${r.start}-${r.end}`,
        detail: `${r.media !== '-' ? r.media + ' ' : ''}(${r.props_count} props)`,
        unit: '-',
        searchText: `${r.selector} ${r.media}`,
      });
    }
  }

  return docs;
}

/**
 * Execute hybrid BM25 + exact/prefix + Japanese N-gram search across all code & part catalogs.
 */
export function runSemanticSearch(query, opts = {}) {
  const t0 = performance.now();
  const rootAbs = path.resolve(opts.root || process.cwd());
  const topK = Math.max(1, Number(opts.top) || 12);
  const budget = opts.budget !== undefined ? Number(opts.budget) : 600;
  const domainFilter = opts.domain
    ? new Set(String(opts.domain).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean))
    : null;
  const unitFilter = opts.unit ? String(opts.unit).trim() : null;

  const qRaw = String(query ?? '').trim();
  const qLower = qRaw.toLowerCase();
  const qTerms = [...new Set(tokenizeForSearch(qRaw))];
  if (!qRaw || qTerms.length === 0) {
    return {
      exitCode: 2,
      query: qRaw,
      elapsedMs: 0,
      totalMatches: 0,
      hits: [],
      formatted: '[dx find] ERROR: empty query. Usage: node scripts/dx.mjs find "<query>" [--top=12] [--domain=part,symbol,schematic,material,helper,css]',
    };
  }

  const docs = loadCorpus(rootAbs, domainFilter, unitFilter);
  const N = Math.max(1, docs.length);

  // Document frequency only for query terms (super fast O(N * |qTerms|))
  const qTermSet = new Set(qTerms);
  const df = new Map();
  const docTokensList = new Array(docs.length);
  let totalLen = 0;

  for (let i = 0; i < docs.length; i++) {
    const toks = tokenizeForSearch(docs[i].searchText);
    docTokensList[i] = toks;
    totalLen += toks.length;
    const seen = new Set();
    for (const t of toks) {
      if (qTermSet.has(t) && !seen.has(t)) {
        seen.add(t);
        df.set(t, (df.get(t) || 0) + 1);
      }
    }
  }

  const avgdl = totalLen / N || 1;
  const k1 = 1.5;
  const b = 0.75;

  const scored = [];
  for (let i = 0; i < docs.length; i++) {
    const d = docs[i];
    const keyLower = d.key.toLowerCase();
    const hayLower = d.searchText.toLowerCase();

    // BM25 score
    let score = 0;
    const toks = docTokensList[i];
    const dl = toks.length || 1;
    const tfMap = new Map();
    for (const t of toks) {
      if (qTermSet.has(t)) tfMap.set(t, (tfMap.get(t) || 0) + 1);
    }

    for (const [term, tf] of tfMap.entries()) {
      const nDf = df.get(term) || 0;
      const idf = Math.log(1 + (N - nDf + 0.5) / (nDf + 0.5));
      score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * dl) / avgdl)));
    }

    // Exact / prefix / direct substring boosts
    if (keyLower === qLower) score += 40;
    else if (keyLower.startsWith(qLower)) score += 18;
    else if (keyLower.includes(qLower)) score += 12;
    else if (hayLower.includes(qLower)) score += 7;

    // Slight domain preference when tied (parts & symbols & schematics surface crisply)
    if (score > 0) {
      scored.push({
        score: Number(score.toFixed(2)),
        domain: d.domain,
        key: d.key,
        location: d.location,
        detail: d.detail,
        unit: d.unit,
      });
    }
  }

  scored.sort((a, b2) =>
    b2.score !== a.score ? b2.score - a.score : a.key < b2.key ? -1 : 1
  );
  const hits = scored.slice(0, topK);
  const elapsedMs = Math.round(performance.now() - t0);

  const lines = [
    `[dx find] q="${qRaw}" hits=${hits.length}/${scored.length} corpus=${docs.length} ${elapsedMs}ms`,
  ];
  for (const h of hits) {
    lines.push(
      `  [${h.domain.padEnd(9)}] ${String(h.score).padStart(5)} | ${h.key} | ${h.location} | ${h.detail}`
    );
  }
  if (hits.length === 0) {
    lines.push('  (no matches; try broader keywords or remove --domain/--unit filter)');
  }

  const budgeted = enforceTokenBudget(lines.join('\n'), { budget, tag: 'dx_find' });

  return {
    exitCode: 0,
    query: qRaw,
    elapsedMs,
    corpusSize: docs.length,
    totalMatches: scored.length,
    hits,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}
