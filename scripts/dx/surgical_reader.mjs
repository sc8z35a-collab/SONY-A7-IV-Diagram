/**
 * `dx` Component 4A — Surgical AST / JSON / CSS / SVG Reader (`dx read`, `dx slice`, `dx diff`)
 *
 * Eliminates 12x–305x over-reading by slicing exact AST symbol ranges, folding giant unions
 * (`src/assemblies/types.ts` -95%+), extracting single parts from multi-megabyte JSONs with exact
 * 1-indexed line numbers, extracting individual SVG schematic cases and CSS rules, and
 * summarizing `git diff` strictly at the symbol/part level while ignoring generated artifacts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { buildCodeAtlas } from './atlas_builder.mjs';
import { enforceTokenBudget } from './tokenizer_and_budget.mjs';

const GENERATED_DIFF_PREFIXES = [
  'docs/',
  'dist/',
  'android/',
  'src/playground/playground_index.json',
  'src/playground/playground_templates.json',
  'package-lock.json',
  'catalog/ALL_NAMES.txt',
];

function isGeneratedPath(rel) {
  return GENERATED_DIFF_PREFIXES.some((p) => (p.endsWith('/') ? rel.startsWith(p) : rel === p));
}

function readTsv(absPath) {
  if (!fs.existsSync(absPath)) return [];
  const lines = fs.readFileSync(absPath, 'utf8').split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split('\t');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    if (!l || l.startsWith('#')) continue;
    const cols = l.split('\t');
    const obj = {};
    for (let c = 0; c < headers.length; c++) obj[headers[c]] = cols[c] ?? '';
    rows.push(obj);
  }
  return rows;
}

function ensureAtlas(rootAbs) {
  if (!fs.existsSync(path.join(rootAbs, 'catalog', 'code', 'SYMBOLS.tsv'))) {
    buildCodeAtlas({ root: rootAbs });
  }
}

function formatNumberedLines(allLines, startLine, endLine) {
  const s = Math.max(1, startLine);
  const e = Math.min(allLines.length, endLine);
  const width = String(e).length;
  const out = [];
  for (let ln = s; ln <= e; ln++) {
    out.push(`${String(ln).padStart(width, ' ')}: ${allLines[ln - 1]}`);
  }
  return out.join('\n');
}

function resolveFile(rootAbs, filePath) {
  return path.isAbsolute(filePath) ? filePath : path.resolve(rootAbs, filePath);
}

/**
 * `dx slice <path> <start>-<end>`
 */
export function runDxSlice(filePath, rangeSpec, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 1400;
  const abs = resolveFile(rootAbs, filePath);
  if (!fs.existsSync(abs)) {
    return { exitCode: 2, formatted: `[dx slice] ERROR: file not found: ${filePath}` };
  }
  const m = String(rangeSpec || '').match(/^(\d+)(?:[-:](\d+))?$/);
  if (!m) {
    return {
      exitCode: 2,
      formatted: `[dx slice] ERROR: invalid range '${rangeSpec}'. Expected <start>-<end> (e.g. 1-120).`,
    };
  }
  const allLines = fs.readFileSync(abs, 'utf8').split('\n');
  const start = Math.max(1, Number(m[1]));
  const end = Math.min(allLines.length, m[2] ? Number(m[2]) : start + 79);
  const header = `[dx slice] ${filePath}:${start}-${end} (total ${allLines.length}L)`;
  const raw = `${header}\n${formatNumberedLines(allLines, start, end)}`;
  const budgeted = enforceTokenBudget(raw, { budget, tag: 'dx_slice' });
  return {
    exitCode: 0,
    file: filePath,
    start,
    end,
    totalLines: allLines.length,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}

/**
 * `dx read <file>#<Symbol>` — AST exact symbol extraction.
 */
export function readAstSymbol(fileRef, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 1200;
  const hashIdx = fileRef.indexOf('#');
  if (hashIdx < 0) {
    return {
      exitCode: 2,
      formatted: `[dx read] ERROR: expected <file>#<Symbol> (got '${fileRef}'). Use --outline or --head for whole-file views.`,
    };
  }
  const filePart = fileRef.slice(0, hashIdx);
  const symName = fileRef.slice(hashIdx + 1).trim();
  const abs = resolveFile(rootAbs, filePart);
  if (!fs.existsSync(abs)) {
    return { exitCode: 2, formatted: `[dx read] ERROR: file not found: ${filePart}` };
  }

  const text = fs.readFileSync(abs, 'utf8');
  const lines = text.split('\n');
  const sf = ts.createSourceFile(filePart, text, ts.ScriptTarget.Latest, true);
  const matches = [];

  function pushMatch(name, kind, node) {
    const start = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
    const end = sf.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
    matches.push({ name, kind, start, end });
  }

  function visit(node, classCtx) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      pushMatch(node.name.text, 'func', node);
    } else if (ts.isClassDeclaration(node) && node.name) {
      pushMatch(node.name.text, 'class', node);
      for (const mem of node.members) {
        if ((ts.isMethodDeclaration(mem) || ts.isGetAccessorDeclaration(mem)) && mem.name) {
          const mn = mem.name.getText(sf);
          pushMatch(`${node.name.text}.${mn}`, 'method', mem);
          pushMatch(mn, 'method', mem);
        }
      }
      return;
    } else if (ts.isInterfaceDeclaration(node)) {
      pushMatch(node.name.text, 'interface', node);
    } else if (ts.isTypeAliasDeclaration(node)) {
      pushMatch(node.name.text, 'type', node);
    } else if (ts.isEnumDeclaration(node)) {
      pushMatch(node.name.text, 'enum', node);
    } else if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          pushMatch(decl.name.text, 'var', node);
        }
      }
    }
    ts.forEachChild(node, (c) => visit(c, classCtx));
  }
  visit(sf, null);

  let exact = matches.filter((m) => m.name === symName);
  if (exact.length === 0) {
    const low = symName.toLowerCase();
    exact = matches.filter((m) => m.name.toLowerCase().includes(low));
  }
  if (exact.length === 0) {
    const avail = [...new Set(matches.map((m) => m.name))].slice(0, 20).join(', ');
    return {
      exitCode: 2,
      formatted: `[dx read] ERROR: symbol '${symName}' not found in ${filePart}. Available: ${avail}`,
    };
  }

  // Prefer the first exact match (deduping Class.method vs method)
  const hit = exact[0];
  const header = `[dx read] ${filePart}#${hit.name} (${hit.kind} L${hit.start}-${hit.end} / ${lines.length}L)`;
  const raw = `${header}\n${formatNumberedLines(lines, hit.start, hit.end)}`;
  const budgeted = enforceTokenBudget(raw, { budget, tag: 'dx_read_sym' });
  return {
    exitCode: 0,
    file: filePart,
    symbol: hit.name,
    start: hit.start,
    end: hit.end,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}

/**
 * `dx read --outline <file>`
 */
export function readFileOutline(filePath, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 900;
  const abs = resolveFile(rootAbs, filePath);
  if (!fs.existsSync(abs)) {
    return { exitCode: 2, formatted: `[dx read --outline] ERROR: file not found: ${filePath}` };
  }

  const ext = path.extname(abs).toLowerCase();
  const text = fs.readFileSync(abs, 'utf8');
  const lines = text.split('\n');
  const out = [`[dx outline] ${filePath} (${lines.length}L, ${(Buffer.byteLength(text, 'utf8') / 1024).toFixed(1)}KB)`];

  if (ext === '.json') {
    const j = JSON.parse(text);
    const keys = Object.keys(j);
    out.push(`  keys: ${keys.join(', ')}`);
    if (Array.isArray(j.parts)) {
      out.push(`  unitId=${j.unitId || '-'} declaredPartCount=${j.declaredPartCount} parts.length=${j.parts.length}`);
      out.push(`  first=${j.parts[0]?.id || '-'} last=${j.parts[j.parts.length - 1]?.id || '-'}`);
    }
  } else if (ext === '.css') {
    ensureAtlas(rootAbs);
    const cssRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'CSS_INDEX.tsv'));
    out.push(`  CSS rules: ${cssRows.length}`);
    for (const r of cssRows.slice(0, 45)) {
      out.push(`  L${r.start}-${r.end} | ${r.selector}${r.media !== '-' ? ` [${r.media}]` : ''}`);
    }
    if (cssRows.length > 45) out.push(`  ... (+${cssRows.length - 45} more; use dx read --css="<selector>")`);
  } else {
    const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true);
    let importCount = 0;
    for (const stmt of sf.statements) {
      if (ts.isImportDeclaration(stmt)) {
        importCount++;
        continue;
      }
      const start = sf.getLineAndCharacterOfPosition(stmt.getStart(sf)).line + 1;
      const end = sf.getLineAndCharacterOfPosition(stmt.getEnd()).line + 1;
      if (ts.isFunctionDeclaration(stmt) && stmt.name) {
        out.push(`  L${start}-${end} | func ${stmt.name.text}`);
      } else if (ts.isClassDeclaration(stmt) && stmt.name) {
        out.push(`  L${start}-${end} | class ${stmt.name.text}`);
        for (const mem of stmt.members) {
          if ((ts.isMethodDeclaration(mem) || ts.isGetAccessorDeclaration(mem)) && mem.name) {
            const ms = sf.getLineAndCharacterOfPosition(mem.getStart(sf)).line + 1;
            const me = sf.getLineAndCharacterOfPosition(mem.getEnd()).line + 1;
            out.push(`    L${ms}-${me} | .${mem.name.getText(sf)}()`);
          }
        }
      } else if (ts.isInterfaceDeclaration(stmt)) {
        out.push(`  L${start}-${end} | interface ${stmt.name.text}`);
      } else if (ts.isTypeAliasDeclaration(stmt)) {
        const extra = ts.isUnionTypeNode(stmt.type) ? ` (${stmt.type.types.length} union members)` : '';
        out.push(`  L${start}-${end} | type ${stmt.name.text}${extra}`);
      } else if (ts.isVariableStatement(stmt)) {
        const names = stmt.declarationList.declarations
          .map((d) => (ts.isIdentifier(d.name) ? d.name.text : ''))
          .filter(Boolean)
          .join(', ');
        if (names) out.push(`  L${start}-${end} | const ${names}`);
      }
    }
    out.splice(1, 0, `  imports: ${importCount}`);
  }

  const budgeted = enforceTokenBudget(out.join('\n'), { budget, tag: 'dx_outline' });
  return {
    exitCode: 0,
    file: filePath,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}

/**
 * `dx read --head <file>` — Extracts core interfaces/signatures while automatically
 * folding giant union lists (>14 members, e.g., `diagramType` in `src/assemblies/types.ts`)
 * and huge literal arrays/objects (>30 lines).
 */
export function readHeadFolded(filePath, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 1600;
  const abs = resolveFile(rootAbs, filePath);
  if (!fs.existsSync(abs)) {
    return { exitCode: 2, formatted: `[dx read --head] ERROR: file not found: ${filePath}` };
  }

  const text = fs.readFileSync(abs, 'utf8');
  const lines = text.split('\n');
  const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true);

  // Collect line ranges to fold
  const folds = []; // { startLine, endLine, summary }

  function findFolds(node) {
    if (ts.isUnionTypeNode(node) && node.types.length >= 15) {
      const startLine = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
      const endLine = sf.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
      if (endLine - startLine >= 12) {
        const firstLit = node.types[0].getText(sf);
        const lastLit = node.types[node.types.length - 1].getText(sf);
        folds.push({
          startLine,
          endLine,
          summary: `    /* ... [FOLDED ${node.types.length} union members, L${startLine}-${endLine}: ${firstLit} .. ${lastLit} | use 'dx schematic find <id>' or 'dx slice ${filePath} ${startLine}-${Math.min(endLine, startLine + 40)}'] ... */`,
        });
        return;
      }
    }
    if (ts.isArrayLiteralExpression(node) && node.elements.length >= 30) {
      const startLine = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
      const endLine = sf.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
      if (endLine - startLine >= 25) {
        folds.push({
          startLine: startLine + 1,
          endLine: endLine - 1,
          summary: `  /* ... [FOLDED ${node.elements.length} array items, L${startLine + 1}-${endLine - 1}] ... */`,
        });
        return;
      }
    }
    ts.forEachChild(node, findFolds);
  }
  findFolds(sf);

  folds.sort((a, b) => a.startLine - b.startLine);
  // Deduplicate overlapping folds
  const cleanFolds = [];
  for (const f of folds) {
    const prev = cleanFolds[cleanFolds.length - 1];
    if (prev && f.startLine <= prev.endLine) continue;
    cleanFolds.push(f);
  }

  const outLines = [];
  let foldIdx = 0;
  let foldedTotal = 0;
  const width = String(lines.length).length;
  for (let ln = 1; ln <= lines.length; ln++) {
    const f = cleanFolds[foldIdx];
    if (f && ln === f.startLine) {
      outLines.push(`${String(ln).padStart(width, ' ')}: ${f.summary}`);
      foldedTotal += f.endLine - f.startLine + 1;
      ln = f.endLine;
      foldIdx++;
      continue;
    }
    outLines.push(`${String(ln).padStart(width, ' ')}: ${lines[ln - 1]}`);
  }

  const header = `[dx head] ${filePath} (${lines.length}L -> ${outLines.length}L shown, ${foldedTotal}L folded across ${cleanFolds.length} giant union/array block(s))`;
  const raw = `${header}\n${outLines.join('\n')}`;
  const budgeted = enforceTokenBudget(raw, { budget, tag: 'dx_head' });
  return {
    exitCode: 0,
    file: filePath,
    totalLines: lines.length,
    shownLines: outLines.length,
    foldedLines: foldedTotal,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}

/**
 * Locate exact 1-indexed line span of a part object inside a pretty-printed unit JSON.
 */
function findPartLineSpan(jsonText, partId) {
  const escaped = partId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rx = new RegExp(`"id"\\s*:\\s*"${escaped}"`);
  const m = rx.exec(jsonText);
  if (!m) return null;
  const idx = m.index;
  // Walk backward to opening '{' of this part object
  let openIdx = idx;
  while (openIdx > 0 && jsonText[openIdx] !== '{') openIdx--;
  // Walk forward balancing braces to closing '}'
  let depth = 0;
  let inStr = false;
  let closeIdx = openIdx;
  for (let i = openIdx; i < jsonText.length; i++) {
    const ch = jsonText[i];
    if (inStr) {
      if (ch === '\\') i++;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') {
      inStr = true;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        closeIdx = i;
        break;
      }
    }
  }
  const startLine = jsonText.slice(0, openIdx).split('\n').length;
  const endLine = jsonText.slice(0, closeIdx + 1).split('\n').length;
  return { startLine, endLine, slice: jsonText.slice(openIdx, closeIdx + 1) };
}

/**
 * `dx read --part=<partId> [--unit=<mode>]`
 */
export function readPartSurgical(partId, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 1200;
  const dataDir = path.join(rootAbs, 'src', 'data');

  let candidates = [];
  if (opts.unit) {
    const fname = opts.unit === 'mishoe' ? 'mi_shoe.json' : `${opts.unit}.json`;
    candidates = [fname];
  } else {
    // Prefer individual unit JSONs first, then composites
    const all = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json')).sort();
    const indiv = all.filter((f) => f !== 'integrated.json' && f !== 'camera_body.json');
    const comp = all.filter((f) => f === 'integrated.json' || f === 'camera_body.json');
    candidates = [...indiv, ...comp];
  }

  for (const fname of candidates) {
    const abs = path.join(dataDir, fname);
    if (!fs.existsSync(abs)) continue;
    const rawText = fs.readFileSync(abs, 'utf8');
    if (!rawText.includes(`"${partId}"`)) continue;
    const span = findPartLineSpan(rawText, partId);
    if (span) {
      const rel = `src/data/${fname}`;
      const lines = rawText.split('\n');
      const header = `[dx read --part] ${partId} @ ${rel}:${span.startLine}-${span.endLine} (file total ${lines.length}L)`;
      const raw = `${header}\n${formatNumberedLines(lines, span.startLine, span.endLine)}`;
      const budgeted = enforceTokenBudget(raw, { budget, tag: 'dx_part_read' });
      return {
        exitCode: 0,
        partId,
        file: rel,
        start: span.startLine,
        end: span.endLine,
        tokens: budgeted.tokens,
        truncated: budgeted.truncated,
        spillPath: budgeted.spillPath,
        formatted: budgeted.text,
      };
    }
  }

  return {
    exitCode: 2,
    formatted: `[dx read --part] ERROR: part '${partId}' not found in src/data/*.json`,
  };
}

/**
 * `dx read --schematic=<diagramType>`
 */
export function readSchematicSurgical(diagramType, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 1200;
  ensureAtlas(rootAbs);
  const rows = readTsv(path.join(rootAbs, 'catalog', 'code', 'SCHEMATICS.tsv'));
  const hit = rows.find((r) => r.diagram_type === diagramType);
  if (!hit) {
    const suggestions = rows
      .filter((r) => r.diagram_type.includes(diagramType))
      .slice(0, 8)
      .map((r) => r.diagram_type);
    return {
      exitCode: 2,
      formatted: `[dx read --schematic] ERROR: '${diagramType}' not found.${suggestions.length ? ` Similar: ${suggestions.join(', ')}` : ''}`,
    };
  }
  if (hit.file.startsWith('UNMAPPED')) {
    return {
      exitCode: 2,
      formatted: `[dx read --schematic] '${diagramType}' is declared in ${hit.file} (unit=${hit.unit_hint}) but has no mapped switch/object implementation.`,
    };
  }
  const abs = path.join(rootAbs, hit.file);
  const lines = fs.readFileSync(abs, 'utf8').split('\n');
  const start = Number(hit.start) || 1;
  const end = Number(hit.end) || start;
  const header = `[dx read --schematic] ${diagramType} @ ${hit.file}:${start}-${end} (fn=${hit.func}, unit=${hit.unit_hint})`;
  const raw = `${header}\n${formatNumberedLines(lines, start, end)}`;
  const budgeted = enforceTokenBudget(raw, { budget, tag: 'dx_schematic_read' });
  return {
    exitCode: 0,
    diagramType,
    file: hit.file,
    func: hit.func,
    start,
    end,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}

/**
 * `dx read --css="<selector>"`
 */
export function readCssSurgical(selectorQuery, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 1000;
  ensureAtlas(rootAbs);
  const q = String(selectorQuery || '').trim().toLowerCase();
  const rows = readTsv(path.join(rootAbs, 'catalog', 'code', 'CSS_INDEX.tsv'));
  const exact = rows.filter((r) => r.selector.toLowerCase() === q);
  const matched =
    exact.length > 0 ? exact : rows.filter((r) => r.selector.toLowerCase().includes(q));

  if (matched.length === 0) {
    return {
      exitCode: 2,
      formatted: `[dx read --css] ERROR: no CSS rule matching '${selectorQuery}' in src/styles/main.css`,
    };
  }

  const cssAbs = path.join(rootAbs, 'src', 'styles', 'main.css');
  const lines = fs.readFileSync(cssAbs, 'utf8').split('\n');
  const blocks = [
    `[dx read --css] query="${selectorQuery}" matches=${matched.length} (showing up to 6 rules from src/styles/main.css, total ${lines.length}L)`,
  ];
  for (const r of matched.slice(0, 6)) {
    const s = Number(r.start);
    const e = Number(r.end);
    blocks.push(`\n--- ${r.selector}${r.media !== '-' ? ` [${r.media}]` : ''} (L${s}-${e}) ---`);
    blocks.push(formatNumberedLines(lines, s, e));
  }

  const budgeted = enforceTokenBudget(blocks.join('\n'), { budget, tag: 'dx_css_read' });
  return {
    exitCode: 0,
    query: selectorQuery,
    matchCount: matched.length,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}

/**
 * `dx diff [--base=<ref>] [--ai]`
 * Excludes generated artifacts (docs/, minified playground JSONs, lockfiles) and maps
 * changed line hunks directly to AST symbols and JSON part IDs.
 */
export function runDxDiff(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 800;
  ensureAtlas(rootAbs);

  const base = opts.base || null;
  const numstatArgs = base ? ['diff', '--numstat', base] : ['diff', '--numstat', 'HEAD'];
  const res = spawnSync('git', numstatArgs, { cwd: rootAbs, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const untrackedRes = spawnSync('git', ['ls-files', '--others', '--exclude-standard'], {
    cwd: rootAbs,
    encoding: 'utf8',
  });

  const symbols = readTsv(path.join(rootAbs, 'catalog', 'code', 'SYMBOLS.tsv'));
  const symsByFile = new Map();
  for (const s of symbols) {
    if (!symsByFile.has(s.file)) symsByFile.set(s.file, []);
    symsByFile.get(s.file).push({
      symbol: s.symbol,
      start: Number(s.start),
      end: Number(s.end),
    });
  }

  const changedFiles = [];
  let omittedGenerated = 0;
  let totalAdded = 0;
  let totalDeleted = 0;

  for (const line of (res.stdout || '').split('\n').filter(Boolean)) {
    const parts = line.split('\t');
    if (parts.length < 3) continue;
    const add = parts[0] === '-' ? 0 : Number(parts[0]) || 0;
    const del = parts[1] === '-' ? 0 : Number(parts[1]) || 0;
    const rel = parts[2];
    if (isGeneratedPath(rel)) {
      omittedGenerated++;
      continue;
    }
    totalAdded += add;
    totalDeleted += del;

    // Inspect changed hunk line numbers to resolve impacted AST symbols
    let detail = '';
    if (rel.endsWith('.ts') && symsByFile.has(rel)) {
      const hRes = spawnSync(
        'git',
        base ? ['diff', '-U0', base, '--', rel] : ['diff', '-U0', 'HEAD', '--', rel],
        { cwd: rootAbs, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 }
      );
      const hitSyms = new Set();
      const fileSyms = symsByFile.get(rel);
      const rx = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm;
      let m;
      while ((m = rx.exec(hRes.stdout || '')) !== null) {
        const sLine = Number(m[1]);
        const eLine = sLine + Math.max(1, Number(m[2] || 1)) - 1;
        for (const sym of fileSyms) {
          if (sym.start <= eLine && sym.end >= sLine) hitSyms.add(sym.symbol);
        }
      }
      if (hitSyms.size > 0) detail = ` syms=[${[...hitSyms].slice(0, 6).join(',')}]`;
    } else if (rel.startsWith('src/data/') && rel.endsWith('.json')) {
      const hRes = spawnSync(
        'git',
        base ? ['diff', '-U2', base, '--', rel] : ['diff', '-U2', 'HEAD', '--', rel],
        { cwd: rootAbs, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 }
      );
      const partIds = new Set();
      const rx = /^[+-].*"id"\s*:\s*"([^"]+)"/gm;
      let m;
      while ((m = rx.exec(hRes.stdout || '')) !== null) partIds.add(m[1]);
      if (partIds.size > 0) detail = ` parts=[${[...partIds].slice(0, 8).join(',')}]`;
    }

    changedFiles.push({ file: rel, add, del, detail });
  }

  const untracked = (untrackedRes.stdout || '')
    .split('\n')
    .filter((p) => p && !isGeneratedPath(p));

  const lines = [
    `[dx diff] base=${base || 'HEAD'} sourceFiles=${changedFiles.length} untracked=${untracked.length} (+${totalAdded}/-${totalDeleted}) omittedGenerated=${omittedGenerated}`,
  ];
  for (const c of changedFiles) {
    lines.push(`  M ${c.file} (+${c.add}/-${c.del})${c.detail}`);
  }
  for (const u of untracked.slice(0, 20)) {
    lines.push(`  ? ${u}`);
  }
  if (untracked.length > 20) lines.push(`  ... (+${untracked.length - 20} more untracked)`);

  const budgeted = enforceTokenBudget(lines.join('\n'), { budget, tag: 'dx_diff' });
  return {
    exitCode: 0,
    sourceFiles: changedFiles.length,
    untrackedCount: untracked.length,
    omittedGenerated,
    totalAdded,
    totalDeleted,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}
