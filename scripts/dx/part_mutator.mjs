/**
 * `dx` Component 5A — Part-Data Micro-DSL Compiler, L2 Spatial Collision Checker
 * & Atomic JSON Mutator (`dx part compile | upsert | patch | scaffold | check-space`).
 *
 * Cuts AI output tokens by ~80-85% for part definitions while guaranteeing 100% V2
 * schema compliance, cross-unit ID uniqueness, order numbering, declaredPartCount sync,
 * Box3 spatial clearance checking, and dry-run-by-default safety.
 */

import fs from 'node:fs';
import path from 'node:path';
import { enforceTokenBudget, estimateTokensBpe } from './tokenizer_and_budget.mjs';
import { evaluateScopePolicy } from '../buchigire_guard/safety_scanners.mjs';

const COMPOSITE_MODES = new Set(['integrated', 'camera_body']);

function unitToDataRel(mode) {
  return `src/data/${mode === 'mishoe' ? 'mi_shoe' : mode}.json`;
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

function parseVec3(str, fallback = [0, 0, 0]) {
  if (Array.isArray(str) && str.length === 3) return str.map(Number);
  if (typeof str !== 'string') return fallback;
  const nums = str
    .replace(/[\[\]]/g, '')
    .split(/[,\s]+/)
    .filter(Boolean)
    .map(Number);
  if (nums.length !== 3 || nums.some((n) => !Number.isFinite(n))) return fallback;
  return nums;
}

/**
 * Compile ultra-compact Part Micro-DSL text into full V2-compliant part JSON objects.
 *
 * Syntax:
 *   @part <part-id>
 *   title: E106. 部品名
 *   sub: English Subtitle
 *   cat: カテゴリ / サブカテゴリ
 *   group: group_key
 *   swatch: #364152
 *   pos: 0, 39.5, -18.2
 *   exp: 0, 8, -14
 *   iexp: 0, 12, -18
 *   diag: evf_eyecup
 *   standalone: true
 *   analogy: ひとことで言うと...
 *   summary: 概要説明...
 *   phys: 物理解説1 | 物理解説2
 *   formula: F = ma | 数式の意味
 *   innov: 次世代革新ポイント
 *   spec: 材質=A6061 | 公差=±0.02mm
 *   ref: ISO 9358 | JIS H4000
 */
export function compilePartDsl(dslText) {
  const lines = String(dslText ?? '').split(/\r?\n/);
  const parts = [];
  const defaults = {
    opticsAndPhysics: [],
    specs: [],
    references: [],
  };
  let cur = null;
  let inDefaults = false;

  const flush = () => {
    if (!cur) return;
    const pos = cur.assembledPos || defaults.assembledPos || [0, 0, 0];
    const exp = cur.explodeOffset || defaults.explodeOffset || [0, 10, 0];
    const iexp = cur.integratedExplodeOffset || defaults.integratedExplodeOffset || exp;
    const mergedPhys = [...cur.opticsAndPhysics, ...defaults.opticsAndPhysics];
    const mergedSpecs = [...cur.specs, ...defaults.specs];
    const mergedRefs = [...cur.references, ...defaults.references];
    const partObj = {
      id: cur.id,
      ...(cur.order !== undefined ? { order: cur.order } : {}),
      swatchColor: cur.swatchColor || defaults.swatchColor || '#64748b',
      groupKey: cur.groupKey || defaults.groupKey || 'general',
      assembledPos: pos,
      explodeOffset: exp,
      integratedExplodeOffset: iexp,
      edgeOpacity: cur.edgeOpacity ?? defaults.edgeOpacity ?? 0.24,
      ...(cur.standaloneOnly || defaults.standaloneOnly ? { standaloneOnly: true } : {}),
      ...(cur.lensSection !== undefined ? { lensSection: cur.lensSection } : {}),
      ...(cur.fabVolume !== undefined ? { fabVolume: cur.fabVolume } : {}),
      ...(cur.miraiSubView !== undefined ? { miraiSubView: cur.miraiSubView } : {}),
      title: cur.title || '',
      subtitle: cur.subtitle || '',
      category: cur.category || defaults.category || '',
      plainAnalogy: cur.plainAnalogy || defaults.plainAnalogy || '',
      summary: cur.summary || defaults.summary || '',
      opticsAndPhysics: mergedPhys,
      ...(cur.formula || defaults.formula ? { formula: cur.formula || defaults.formula } : {}),
      nextGenInnovation: cur.nextGenInnovation || defaults.nextGenInnovation || '',
      specs: mergedSpecs,
      ...(mergedRefs.length > 0 ? { references: mergedRefs } : {}),
      diagramType: cur.diagramType || defaults.diagramType || '',
    };
    parts.push(partObj);
    cur = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;

    if (line === '@defaults' || line.startsWith('@defaults ')) {
      flush();
      inDefaults = true;
      continue;
    }

    if (line.startsWith('@part ')) {
      flush();
      inDefaults = false;
      const id = line.slice(6).trim().split(/\s+/)[0];
      cur = { id, opticsAndPhysics: [], specs: [], references: [] };
      continue;
    }

    const target = inDefaults ? defaults : cur;
    if (!target) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx < 0) continue;
    const key = line.slice(0, colonIdx).trim().toLowerCase();
    const val = line.slice(colonIdx + 1).trim();

    switch (key) {
      case 'order':
        target.order = Number(val);
        break;
      case 'title':
        target.title = val;
        break;
      case 'sub':
      case 'subtitle':
        target.subtitle = val;
        break;
      case 'cat':
      case 'category':
        target.category = val;
        break;
      case 'group':
      case 'groupkey':
        target.groupKey = val;
        break;
      case 'swatch':
      case 'swatchcolor':
        target.swatchColor = val;
        break;
      case 'pos':
      case 'assembledpos':
        target.assembledPos = parseVec3(val);
        break;
      case 'exp':
      case 'explodeoffset':
        target.explodeOffset = parseVec3(val);
        break;
      case 'iexp':
      case 'integratedexplodeoffset':
        target.integratedExplodeOffset = parseVec3(val);
        break;
      case 'edge':
      case 'edgeopacity':
        target.edgeOpacity = Number(val);
        break;
      case 'standalone':
      case 'standaloneonly':
        target.standaloneOnly = val === 'true' || val === '1' || val === 'yes';
        break;
      case 'lenssection':
        target.lensSection = Number(val);
        break;
      case 'fabvolume':
        target.fabVolume = Number(val);
        break;
      case 'miraisubview':
        target.miraiSubView = Number(val);
        break;
      case 'diag':
      case 'diagram':
      case 'diagramtype':
        target.diagramType = val;
        break;
      case 'analogy':
      case 'plainanalogy':
        target.plainAnalogy = val;
        break;
      case 'summary':
        target.summary = val;
        break;
      case 'phys':
      case 'physics':
      case 'opticsandphysics':
        for (const item of val.split('|').map((s) => s.trim()).filter(Boolean)) {
          target.opticsAndPhysics.push(item);
        }
        break;
      case 'formula': {
        const [expr, ...descParts] = val.split('|').map((s) => s.trim());
        if (expr) {
          target.formula = {
            expression: expr,
            description: descParts.join(' | ') || expr,
          };
        }
        break;
      }
      case 'innov':
      case 'innovation':
      case 'nextgeninnovation':
        target.nextGenInnovation = val;
        break;
      case 'spec':
      case 'specs':
        for (const pair of val.split('|').map((s) => s.trim()).filter(Boolean)) {
          const eq = pair.indexOf('=');
          if (eq > 0) {
            target.specs.push({
              label: pair.slice(0, eq).trim(),
              value: pair.slice(eq + 1).trim(),
            });
          }
        }
        break;
      case 'ref':
      case 'refs':
      case 'references':
        for (const r of val.split('|').map((s) => s.trim()).filter(Boolean)) {
          target.references.push(r);
        }
        break;
      default:
        break;
    }
  }
  flush();
  return parts;
}

/**
 * Validate a part object against the exact V2 rules enforced by `scripts/validate_parts.mjs`.
 */
export function validateV2Part(part, contextLabel = 'part') {
  const errors = [];
  if (!part || typeof part !== 'object') return [`${contextLabel}: must be an object`];
  if (!part.id || typeof part.id !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/.test(part.id)) {
    errors.push(`${contextLabel}: invalid/missing kebab id '${part.id}'`);
  }

  const checkVec = (vec, name) => {
    if (!Array.isArray(vec) || vec.length !== 3) {
      errors.push(`${part.id || contextLabel}: ${name} must be a 3-number array`);
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (typeof vec[i] !== 'number' || !Number.isFinite(vec[i]) || Math.abs(vec[i]) > 2000) {
        errors.push(`${part.id || contextLabel}: ${name}[${i}] out of range (${vec[i]})`);
      }
    }
  };
  checkVec(part.assembledPos, 'assembledPos');
  checkVec(part.explodeOffset, 'explodeOffset');
  if (part.integratedExplodeOffset !== undefined) {
    checkVec(part.integratedExplodeOffset, 'integratedExplodeOffset');
  }

  const requiredStrings = [
    'title',
    'subtitle',
    'category',
    'plainAnalogy',
    'summary',
    'nextGenInnovation',
    'diagramType',
    'swatchColor',
    'groupKey',
  ];
  for (const field of requiredStrings) {
    if (typeof part[field] !== 'string' || part[field].trim().length === 0) {
      errors.push(`${part.id || contextLabel}: missing/empty '${field}'`);
    }
  }

  if (!Array.isArray(part.opticsAndPhysics) || part.opticsAndPhysics.length === 0) {
    errors.push(`${part.id || contextLabel}: opticsAndPhysics must be non-empty array`);
  }
  if (!Array.isArray(part.specs) || part.specs.length === 0) {
    errors.push(`${part.id || contextLabel}: specs must be non-empty array`);
  } else {
    for (const sp of part.specs) {
      if (!sp || typeof sp.label !== 'string' || typeof sp.value !== 'string') {
        errors.push(`${part.id || contextLabel}: spec item must have {label, value} strings`);
      }
    }
  }
  return errors;
}

function loadPartsFromFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const trimmed = raw.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    return {
      rawText: raw,
      isDsl: false,
      parts: Array.isArray(parsed) ? parsed : Array.isArray(parsed.parts) ? parsed.parts : [parsed],
    };
  }
  return {
    rawText: raw,
    isDsl: true,
    parts: compilePartDsl(raw),
  };
}

function checkPolicyWriteAllowed(rootAbs, relPath, policyName) {
  const bgrcPath = path.join(rootAbs, '.bgrc.json');
  if (!fs.existsSync(bgrcPath)) return { allowed: true, violations: [] };
  try {
    const cfg = JSON.parse(fs.readFileSync(bgrcPath, 'utf8'));
    const scope = evaluateScopePolicy([relPath], cfg, policyName);
    return { allowed: scope.violations.length === 0, violations: scope.violations };
  } catch {
    return { allowed: true, violations: [] };
  }
}

/**
 * Check 3D AABB overlaps against `catalog/spatial/<mode>.tsv`.
 */
export function runCheckSpace(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const mode = String(opts.unit || '').trim();
  if (!mode) {
    return { exitCode: 2, formatted: '[dx part check-space] ERROR: --unit=<mode> required.' };
  }
  const l2Path = path.join(rootAbs, 'catalog', 'spatial', `${mode}.tsv`);
  if (!fs.existsSync(l2Path)) {
    return { exitCode: 2, formatted: `[dx part check-space] ERROR: missing ${l2Path}. Run npm run catalog.` };
  }

  const parseTriple = (s) => {
    if (!s || s === '-') return null;
    const a = s.split(',').map(Number);
    return a.length === 3 && a.every(Number.isFinite) ? a : null;
  };

  const existing = [];
  for (const r of readTsv(l2Path)) {
    const pos = parseTriple(r.pos);
    const size = parseTriple(r.size);
    if (!pos || !size) continue;
    existing.push({
      id: r.id,
      pos,
      size,
      min: [pos[0] - size[0] / 2, pos[1] - size[1] / 2, pos[2] - size[2] / 2],
      max: [pos[0] + size[0] / 2, pos[1] + size[1] / 2, pos[2] + size[2] / 2],
    });
  }

  let candidates = [];
  if (opts.from) {
    const loaded = loadPartsFromFile(path.resolve(rootAbs, opts.from));
    for (const p of loaded.parts) {
      const pos = p.assembledPos || [0, 0, 0];
      const size = Array.isArray(p.approxSize)
        ? p.approxSize
        : opts.size
          ? parseTriple(opts.size) || [6, 6, 6]
          : [6, 6, 6];
      candidates.push({
        id: p.id,
        pos,
        size,
        min: [pos[0] - size[0] / 2, pos[1] - size[1] / 2, pos[2] - size[2] / 2],
        max: [pos[0] + size[0] / 2, pos[1] + size[1] / 2, pos[2] + size[2] / 2],
      });
    }
  } else if (opts.pos) {
    const pos = parseTriple(opts.pos) || [0, 0, 0];
    const size = parseTriple(opts.size || '6,6,6') || [6, 6, 6];
    candidates.push({
      id: opts.id || 'candidate',
      pos,
      size,
      min: [pos[0] - size[0] / 2, pos[1] - size[1] / 2, pos[2] - size[2] / 2],
      max: [pos[0] + size[0] / 2, pos[1] + size[1] / 2, pos[2] + size[2] / 2],
    });
  } else {
    // Self-audit existing parts for identical-origin heavy overlaps
    candidates = existing.slice(0, 60);
  }

  const collisions = [];
  for (const c of candidates) {
    for (const ex of existing) {
      if (ex.id === c.id) continue;
      const ox = Math.min(c.max[0], ex.max[0]) - Math.max(c.min[0], ex.min[0]);
      const oy = Math.min(c.max[1], ex.max[1]) - Math.max(c.min[1], ex.min[1]);
      const oz = Math.min(c.max[2], ex.max[2]) - Math.max(c.min[2], ex.min[2]);
      if (ox > 0.05 && oy > 0.05 && oz > 0.05) {
        const vol = ox * oy * oz;
        const dist = Math.hypot(c.pos[0] - ex.pos[0], c.pos[1] - ex.pos[1], c.pos[2] - ex.pos[2]);
        collisions.push({
          candidate: c.id,
          other: ex.id,
          overlap: [Number(ox.toFixed(2)), Number(oy.toFixed(2)), Number(oz.toFixed(2))],
          overlapVol: Number(vol.toFixed(2)),
          centerDist: Number(dist.toFixed(2)),
        });
      }
    }
  }

  collisions.sort((a, b) => b.overlapVol - a.overlapVol);
  const lines = [
    `[dx part check-space] unit=${mode} checked=${candidates.length} vs ${existing.length} Box3 parts | overlaps=${collisions.length}`,
  ];
  for (const col of collisions.slice(0, 12)) {
    lines.push(
      `  OVERLAP ${col.candidate} <-> ${col.other} | box=[${col.overlap.join(',')}] vol=${col.overlapVol} dist=${col.centerDist}mm`
    );
  }
  const budgeted = enforceTokenBudget(lines.join('\n'), {
    budget: opts.budget ?? 600,
    tag: 'dx_check_space',
  });
  return {
    exitCode: 0,
    unit: mode,
    overlapCount: collisions.length,
    collisions: collisions.slice(0, 20),
    formatted: budgeted.text,
  };
}

/**
 * `dx part scaffold --unit=<mode> --count=<N>`
 */
export function runPartScaffold(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const mode = String(opts.unit || '').trim();
  const count = Math.max(1, Math.min(20, Number(opts.count) || 1));
  const indexRows = readTsv(path.join(rootAbs, 'catalog', 'INDEX.tsv'));
  const idx = indexRows.find((r) => r.mode === mode);
  if (!idx) {
    return { exitCode: 2, formatted: `[dx part scaffold] ERROR: unknown unit '${mode}'.` };
  }

  const m = idx.next_code.match(/^([A-Z][A-Z0-9]*-|[A-Z]{1,3})(\d+)$/);
  const codePrefix = m ? m[1] : `${mode.toUpperCase()}-`;
  const startNum = m ? Number(m[2]) : Number(idx.parts) + 1;
  const padLen = m ? m[2].length : 2;
  const slugPrefix = idx.slug_prefix && idx.slug_prefix !== '-' ? idx.slug_prefix : `${mode}-`;

  const blocks = [];
  for (let i = 0; i < count; i++) {
    const code = `${codePrefix}${String(startNum + i).padStart(padLen, '0')}`;
    blocks.push(
      [
        `@part ${slugPrefix}new-part-${startNum + i}`,
        `title: ${code}. 部品名称（日本語）`,
        `sub: English Technical Subtitle`,
        `cat: ${mode} / サブ機構`,
        `group: main`,
        `swatch: #4b5563`,
        `pos: 0, 0, 0`,
        `exp: 0, 12, 0`,
        `diag: <existing_or_new_diagramType>`,
        `standalone: true`,
        `analogy: 初心者向けひとこと例え`,
        `summary: 構造と機能の簡潔な技術概要。`,
        `phys: 物理・光学メカニズム1 | 物理・光学メカニズム2`,
        `innov: 次世代設計・加工の工夫`,
        `spec: 材質=A6061-T6 | 公差=±0.02mm`,
      ].join('\n')
    );
  }
  const text = blocks.join('\n\n') + '\n';
  return {
    exitCode: 0,
    unit: mode,
    count,
    tokens: estimateTokensBpe(text),
    formatted: text.trimEnd(),
  };
}

/**
 * `dx part compile --dsl=<file.dsl>`
 */
export function runPartCompile(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const srcPath = opts.dsl || opts.from;
  if (!srcPath) {
    return { exitCode: 2, formatted: '[dx part compile] ERROR: --dsl=<file.dsl> required.' };
  }
  const abs = path.resolve(rootAbs, srcPath);
  if (!fs.existsSync(abs)) {
    return { exitCode: 2, formatted: `[dx part compile] ERROR: file not found: ${srcPath}` };
  }
  const raw = fs.readFileSync(abs, 'utf8');
  const parts = compilePartDsl(raw);
  const errors = [];
  for (let i = 0; i < parts.length; i++) {
    errors.push(...validateV2Part(parts[i], `part[${i}]`));
  }
  const compiledJson = JSON.stringify(parts, null, 2);
  const dslTok = estimateTokensBpe(raw);
  const jsonTok = estimateTokensBpe(compiledJson);
  const reductionPct = jsonTok > 0 ? Number((100 * (1 - dslTok / jsonTok)).toFixed(1)) : 0;

  if (errors.length > 0) {
    return {
      exitCode: 2,
      errors,
      dslTokens: dslTok,
      jsonTokens: jsonTok,
      formatted: `[dx part compile] FAIL (${errors.length} schema error(s)):\n  - ${errors.join('\n  - ')}`,
    };
  }

  const header = `[dx part compile] OK parts=${parts.length} dslTok=${dslTok} -> jsonTok=${jsonTok} (output reduction -${reductionPct}%)`;
  const budgeted = enforceTokenBudget(`${header}\n${compiledJson}`, {
    budget: opts.budget ?? 1500,
    tag: 'dx_part_compile',
  });
  return {
    exitCode: 0,
    parts,
    compiledJson,
    dslTokens: dslTok,
    jsonTokens: jsonTok,
    reductionPct,
    formatted: budgeted.text,
  };
}

/**
 * `dx part upsert --unit=<mode> --from=<file.json|file.dsl> [--dry-run|--apply]`
 */
export function runPartUpsert(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const mode = String(opts.unit || '').trim();
  const fromPath = opts.from || opts.dsl;
  const apply = Boolean(opts.apply) && !Boolean(opts['dry-run']);
  const policyName = opts.policy || 'worker';

  if (!mode || !fromPath) {
    return {
      exitCode: 2,
      formatted: '[dx part upsert] ERROR: --unit=<mode> and --from=<file.dsl|file.json> required.',
    };
  }

  const dataRel = unitToDataRel(mode);
  const dataAbs = path.join(rootAbs, dataRel);
  if (!fs.existsSync(dataAbs)) {
    return { exitCode: 2, formatted: `[dx part upsert] ERROR: data file not found: ${dataRel}` };
  }

  // Scope guard for worker policy
  if (apply) {
    const scope = checkPolicyWriteAllowed(rootAbs, dataRel, policyName);
    if (!scope.allowed) {
      return {
        exitCode: 2,
        formatted: `[dx part upsert] BLOCKED by policy '${policyName}': ${scope.violations.map((v) => v.path).join(', ')}`,
      };
    }
  }

  const srcAbs = path.resolve(rootAbs, fromPath);
  if (!fs.existsSync(srcAbs)) {
    return { exitCode: 2, formatted: `[dx part upsert] ERROR: input not found: ${fromPath}` };
  }

  const { rawText, isDsl, parts: incoming } = loadPartsFromFile(srcAbs);
  if (incoming.length === 0) {
    return { exitCode: 2, formatted: '[dx part upsert] ERROR: 0 parts parsed from input.' };
  }

  // Validate all incoming parts
  const valErrors = [];
  for (let i = 0; i < incoming.length; i++) {
    valErrors.push(...validateV2Part(incoming[i], `incoming[${i}]`));
  }

  // Cross-unit duplicate ID check (non-composite units)
  if (!COMPOSITE_MODES.has(mode)) {
    const dataDir = path.join(rootAbs, 'src', 'data');
    const otherIds = new Map();
    for (const f of fs.readdirSync(dataDir).filter((x) => x.endsWith('.json'))) {
      const relF = `src/data/${f}`;
      if (relF === dataRel || f === 'integrated.json' || f === 'camera_body.json') continue;
      try {
        const j = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));
        for (const p of j.parts || []) otherIds.set(p.id, relF);
      } catch {
        // ignore non-unit JSON
      }
    }
    for (const p of incoming) {
      if (otherIds.has(p.id)) {
        valErrors.push(`Cross-unit duplicate ID '${p.id}' already exists in ${otherIds.get(p.id)}`);
      }
    }
  }

  if (valErrors.length > 0) {
    return {
      exitCode: 2,
      errors: valErrors,
      formatted: `[dx part upsert] FAIL (${valErrors.length} error(s)):\n  - ${valErrors.join('\n  - ')}`,
    };
  }

  const unitJson = JSON.parse(fs.readFileSync(dataAbs, 'utf8'));
  const existingIdxById = new Map(unitJson.parts.map((p, i) => [p.id, i]));
  let added = 0;
  let updated = 0;
  let maxOrder = unitJson.parts.reduce((acc, p) => Math.max(acc, Number(p.order) || 0), 0);

  for (const p of incoming) {
    if (existingIdxById.has(p.id)) {
      const idx = existingIdxById.get(p.id);
      const prevOrder = unitJson.parts[idx].order;
      unitJson.parts[idx] = { ...p, order: p.order ?? prevOrder };
      updated++;
    } else {
      maxOrder++;
      unitJson.parts.push({ ...p, order: p.order ?? maxOrder });
      existingIdxById.set(p.id, unitJson.parts.length - 1);
      added++;
    }
  }
  unitJson.declaredPartCount = unitJson.parts.length;

  const compiledTok = estimateTokensBpe(JSON.stringify(incoming, null, 2));
  const inputTok = estimateTokensBpe(rawText);
  const savedPct = isDsl && compiledTok > 0 ? Number((100 * (1 - inputTok / compiledTok)).toFixed(1)) : 0;

  if (apply) {
    const tmp = `${dataAbs}.tmp.${process.pid}`;
    fs.writeFileSync(tmp, JSON.stringify(unitJson, null, 2) + '\n', 'utf8');
    fs.renameSync(tmp, dataAbs);
  }

  const modeTag = apply ? 'APPLIED' : 'DRY_RUN';
  const formatted =
    `[dx part upsert] ${modeTag} unit=${mode} file=${dataRel} added=${added} updated=${updated} declaredPartCount=${unitJson.declaredPartCount}` +
    (isDsl ? ` | DSL ${inputTok} tok -> JSON ${compiledTok} tok (-${savedPct}%)` : '') +
    (apply ? '' : ' | pass --apply to write atomically');

  return {
    exitCode: 0,
    applied: apply,
    unit: mode,
    dataFile: dataRel,
    added,
    updated,
    declaredPartCount: unitJson.declaredPartCount,
    inputTokens: inputTok,
    compiledTokens: compiledTok,
    savedPct,
    formatted,
  };
}

/**
 * `dx part patch --unit=<mode> --id=<partId> --set='<json>' [--dry-run|--apply]`
 */
export function runPartPatch(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const mode = String(opts.unit || '').trim();
  const partId = String(opts.id || '').trim();
  const apply = Boolean(opts.apply) && !Boolean(opts['dry-run']);
  const policyName = opts.policy || 'worker';

  if (!mode || !partId || !opts.set) {
    return {
      exitCode: 2,
      formatted: "[dx part patch] ERROR: --unit=<mode> --id=<partId> --set='<json>' required.",
    };
  }

  const dataRel = unitToDataRel(mode);
  const dataAbs = path.join(rootAbs, dataRel);
  if (!fs.existsSync(dataAbs)) {
    return { exitCode: 2, formatted: `[dx part patch] ERROR: not found: ${dataRel}` };
  }
  if (apply) {
    const scope = checkPolicyWriteAllowed(rootAbs, dataRel, policyName);
    if (!scope.allowed) {
      return {
        exitCode: 2,
        formatted: `[dx part patch] BLOCKED by policy '${policyName}': ${dataRel}`,
      };
    }
  }

  const patchObj = JSON.parse(opts.set);
  const unitJson = JSON.parse(fs.readFileSync(dataAbs, 'utf8'));
  const idx = unitJson.parts.findIndex((p) => p.id === partId);
  if (idx < 0) {
    return { exitCode: 2, formatted: `[dx part patch] ERROR: part '${partId}' not found in ${dataRel}` };
  }

  const merged = { ...unitJson.parts[idx], ...patchObj, id: partId };
  const valErrors = validateV2Part(merged, partId);
  if (valErrors.length > 0) {
    return {
      exitCode: 2,
      errors: valErrors,
      formatted: `[dx part patch] FAIL:\n  - ${valErrors.join('\n  - ')}`,
    };
  }

  unitJson.parts[idx] = merged;
  if (apply) {
    const tmp = `${dataAbs}.tmp.${process.pid}`;
    fs.writeFileSync(tmp, JSON.stringify(unitJson, null, 2) + '\n', 'utf8');
    fs.renameSync(tmp, dataAbs);
  }

  const keys = Object.keys(patchObj).join(',');
  return {
    exitCode: 0,
    applied: apply,
    unit: mode,
    partId,
    patchedKeys: Object.keys(patchObj),
    formatted: `[dx part patch] ${apply ? 'APPLIED' : 'DRY_RUN'} ${dataRel}#${partId} keys=[${keys}]${apply ? '' : ' | pass --apply to write'}`,
  };
}
