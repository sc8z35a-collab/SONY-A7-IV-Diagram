/**
 * `dx` Component 3B — Context Capsule Compiler (`dx brief`) &
 * Cross-Session Delta Memory (`dx checkpoint` / `dx resume`) integrated with `bg`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { buildCodeAtlas } from './atlas_builder.mjs';
import { runSemanticSearch } from './semantic_search.mjs';
import { enforceTokenBudget, estimateTokensBpe } from './tokenizer_and_budget.mjs';
import { getPorcelainStatus, getRepoContext } from '../buchigire_guard/git_plumbing.mjs';
import { readFlightRecorder, writeFlightRecorder } from '../buchigire_guard/vault_engine.mjs';

const DX_CAPSULE_FILE = 'dx_capsule.json';

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
  const symPath = path.join(rootAbs, 'catalog', 'code', 'SYMBOLS.tsv');
  if (!fs.existsSync(symPath)) {
    buildCodeAtlas({ root: rootAbs });
  }
}

function loadBgrcPolicy(rootAbs, policyName) {
  const p = path.join(rootAbs, '.bgrc.json');
  if (!fs.existsSync(p)) return { protectedPaths: [], checks: [] };
  try {
    const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
    return cfg.policies?.[policyName] || { protectedPaths: [], checks: [] };
  } catch {
    return { protectedPaths: [], checks: [] };
  }
}

/**
 * Compile an ultra-compact <=1.5-2.5 KB zero-explore task capsule (`dx brief`).
 */
export function compileBrief(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  ensureAtlas(rootAbs);

  const policyName = opts.policy || 'worker';
  const budget = opts.budget !== undefined ? Number(opts.budget) : 780;
  const policy = loadBgrcPolicy(rootAbs, policyName);
  const outLines = [];

  outLines.push(`# DX BRIEF CAPSULE (policy=${policyName})`);

  // 1. Unit-focused capsule
  if (opts.unit) {
    const mode = String(opts.unit).trim();
    const indexRows = readTsv(path.join(rootAbs, 'catalog', 'INDEX.tsv'));
    const idx = indexRows.find((r) => r.mode === mode);
    if (!idx) {
      return {
        exitCode: 2,
        formatted: `[dx brief] ERROR: unknown unit '${mode}'. Available: ${indexRows.map((r) => r.mode).join(', ')}`,
      };
    }

    outLines.push(
      `## Unit: ${mode} (${idx.kind} | ${idx.parts}p | slug=${idx.slug_prefix}* | codes=${idx.code_min}..${idx.code_max} | next=${idx.next_code})`
    );
    outLines.push(`- Entry: ${idx.unit_file} | Data: ${idx.data_file}`);
    outLines.push(`- Catalogs: L1=${idx.l1_file} | L2=${idx.l2_file}`);

    // Find assembly & unit files + key symbols
    const symbols = readTsv(path.join(rootAbs, 'catalog', 'code', 'SYMBOLS.tsv'));
    const unitHintDir = mode === 'mishoe' ? 'mishoe' : mode === 'sensor_fab' ? 'sensorFab' : mode === 'mirai_2028' ? 'mirai2028' : mode;
    const relatedSyms = symbols.filter(
      (s) =>
        s.file === idx.unit_file ||
        s.file.startsWith(`src/assemblies/${unitHintDir}/`)
    );
    const byFile = new Map();
    for (const s of relatedSyms) {
      if (!byFile.has(s.file)) byFile.set(s.file, []);
      if (byFile.get(s.file).length < 6) {
        byFile.get(s.file).push(`${s.symbol}:${s.start}-${s.end}`);
      }
    }
    if (byFile.size > 0) {
      outLines.push('## Key Source Files & AST Symbols');
      for (const [f, syms] of [...byFile.entries()].slice(0, 8)) {
        outLines.push(`- ${f} -> ${syms.join(', ')}`);
      }
    }

    // L1 compact tail/group summary
    const l1Abs = path.join(rootAbs, idx.l1_file);
    if (fs.existsSync(l1Abs)) {
      const l1Lines = fs.readFileSync(l1Abs, 'utf8').trim().split('\n');
      outLines.push(`## L1 Roster Summary (${l1Lines.length - 1} groups)`);
      for (const l of l1Lines.slice(1, 7)) {
        outLines.push(`- ${l.slice(0, 110)}${l.length > 110 ? '…' : ''}`);
      }
      if (l1Lines.length > 7) {
        outLines.push(`- ... (${l1Lines.length - 7} more groups in ${idx.l1_file})`);
      }
    }

    // Spatial bounds overview from L2
    const l2Rows = readTsv(path.join(rootAbs, idx.l2_file));
    if (l2Rows.length > 0) {
      const mats = new Map();
      for (const r of l2Rows) {
        if (r.mat && r.mat !== '-') mats.set(r.mat, (mats.get(r.mat) || 0) + 1);
      }
      const topMats = [...mats.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([k, v]) => `${k}(${v})`)
        .join(', ');
      outLines.push(`## Spatial/Material Snapshot: ${l2Rows.length} rows | topBuckets: ${topMats || '-'}`);
    }

    outLines.push('## Zero-Token Action Commands');
    outLines.push(`- Read symbol: node scripts/dx.mjs read ${idx.unit_file}#<Symbol>`);
    outLines.push(`- Scaffold/Upsert part: node scripts/dx.mjs part scaffold --unit=${mode} --count=1`);
    outLines.push(`- Pre-flight (<250ms): node scripts/dx.mjs preflight --unit=${mode} --ai`);
    outLines.push(`- Targeted gate: node scripts/dx.mjs check --unit=${mode} --ai`);
  }

  // 2. Part-focused capsule
  if (opts.part) {
    const partId = String(opts.part).trim();
    const spatialDir = path.join(rootAbs, 'catalog', 'spatial');
    let found = null;
    if (fs.existsSync(spatialDir)) {
      for (const f of fs.readdirSync(spatialDir).filter((x) => x.endsWith('.tsv')).sort()) {
        const mode = f.replace(/\.tsv$/, '');
        if (mode === 'integrated' || mode === 'camera_body') continue;
        const rows = readTsv(path.join(spatialDir, f));
        const hit = rows.find((r) => r.id === partId);
        if (hit) {
          found = { mode, row: hit };
          break;
        }
      }
    }
    if (!found) {
      outLines.push(`## Part: ${partId} (not found in individual spatial catalogs; try dx find "${partId}")`);
    } else {
      const { mode, row } = found;
      const dataFile = `src/data/${mode === 'mishoe' ? 'mi_shoe' : mode}.json`;
      let diagramType = '-';
      try {
        const j = JSON.parse(fs.readFileSync(path.join(rootAbs, dataFile), 'utf8'));
        const pObj = j.parts?.find((p) => p.id === partId);
        if (pObj?.diagramType) diagramType = pObj.diagramType;
      } catch {
        // ignore
      }
      const schRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'SCHEMATICS.tsv'));
      const sch = schRows.find((r) => r.diagram_type === diagramType);
      outLines.push(`## Part: ${partId} (${mode} | ${row.code})`);
      outLines.push(`- Name: ${row.name} | Group: ${row.group} | Mat: ${row.mat}`);
      outLines.push(`- Pos: [${row.pos}] | Size: [${row.size}] | Explode: [${row.exp}]`);
      outLines.push(`- Data: ${dataFile} (inspect: node scripts/dx.mjs read --part=${partId})`);
      outLines.push(
        `- Schematic: ${diagramType} -> ${sch ? `${sch.file}:${sch.start}-${sch.end} (${sch.func})` : 'UNMAPPED'}`
      );
    }
  }

  // 3. Area-focused capsule
  if (opts.area) {
    const area = String(opts.area).trim().toLowerCase();
    const mapRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'MAP.tsv')).filter(
      (r) => r.area === area || r.dir.includes(area)
    );
    const symRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'SYMBOLS.tsv')).filter((s) =>
      area === 'render'
        ? s.file.startsWith('src/core/') || s.file.startsWith('src/engine/')
        : s.file.includes(`/${area}/`) || s.file.startsWith(`${area}/`)
    );
    outLines.push(`## Area: ${area} (${mapRows.length} dirs)`);
    for (const m of mapRows.slice(0, 8)) {
      outLines.push(`- ${m.dir}: ${m.files} files, ${m.lines}L (${m.key_files})`);
    }
    const topSyms = symRows
      .filter((s) => s.kind === 'class' || s.kind === 'func' || s.kind === 'interface')
      .slice(0, 14);
    if (topSyms.length > 0) {
      outLines.push('## Key Exported Symbols');
      for (const s of topSyms) {
        outLines.push(`- ${s.file}:${s.start}-${s.end} | ${s.kind} ${s.symbol}`);
      }
    }
  }

  // 4. Query-focused capsule
  if (opts.query) {
    const searchRes = runSemanticSearch(opts.query, { root: rootAbs, top: 8, budget: 350 });
    outLines.push(`## Semantic Hits for "${opts.query}"`);
    for (const h of searchRes.hits) {
      outLines.push(`- [${h.domain}] ${h.key} @ ${h.location} (${h.detail})`);
    }
  }

  // 5. Explicit files blast-radius & outline
  if (opts.files) {
    const files = String(opts.files).split(',').map((s) => s.trim()).filter(Boolean);
    const graphRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'GRAPH.tsv'));
    const symRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'SYMBOLS.tsv'));
    const graphByFile = new Map(graphRows.map((r) => [r.file, r]));
    outLines.push(`## Explicit Files Blast-Radius (${files.length})`);
    for (const f of files) {
      const g = graphByFile.get(f);
      const syms = symRows
        .filter((s) => s.file === f && s.kind !== 'method')
        .slice(0, 6)
        .map((s) => `${s.symbol}:${s.start}-${s.end}`);
      outLines.push(
        `- ${f} | affected_units=${g?.affected_units || '-'} | syms=[${syms.join(', ')}]`
      );
    }
  }

  // Default overview if no target flag was passed
  if (!opts.unit && !opts.part && !opts.area && !opts.query && !opts.files) {
    const mapRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'MAP.tsv'));
    const idxRows = readTsv(path.join(rootAbs, 'catalog', 'INDEX.tsv'));
    outLines.push(`## Repo L0 Overview: ${idxRows.length} units, ${mapRows.length} code dirs`);
    outLines.push('Use --unit=<mode> | --part=<id> | --area=<core|engine|ui|playground|scripts> | --query="<q>" | --files=<a,b>');
  }

  // Scope Guard summary from .bgrc.json
  outLines.push(
    `## Scope Policy (${policyName}): protected=[${(policy.protectedPaths || []).join(', ') || 'none'}] | checks=[${(policy.checks || []).join(' && ')}]`
  );

  const raw = outLines.join('\n') + '\n';
  const budgeted = enforceTokenBudget(raw, { budget, tag: 'dx_brief' });

  if (opts.out) {
    const outAbs = path.resolve(opts.out);
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, budgeted.text, 'utf8');
    return {
      exitCode: 0,
      outPath: outAbs,
      bytes: Buffer.byteLength(budgeted.text, 'utf8'),
      tokens: budgeted.tokens,
      truncated: budgeted.truncated,
      formatted: `[dx brief] WROTE ${outAbs} (${Buffer.byteLength(budgeted.text, 'utf8')} B / ${budgeted.tokens} tok | policy=${policyName})`,
    };
  }

  return {
    exitCode: 0,
    bytes: Buffer.byteLength(budgeted.text, 'utf8'),
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text.trimEnd(),
  };
}

/**
 * Compute affected units from current dirty git paths via GRAPH.tsv.
 */
export function inferAffectedUnitsFromFiles(rootAbs, relFiles) {
  ensureAtlas(rootAbs);
  const graphRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'GRAPH.tsv'));
  const byFile = new Map(graphRows.map((r) => [r.file, r.affected_units]));
  const units = new Set();
  let allAffected = false;
  for (const rel of relFiles) {
    const aff = byFile.get(rel);
    if (!aff || aff === '-') continue;
    if (aff.startsWith('*ALL')) {
      allAffected = true;
    } else {
      for (const u of aff.split(',')) if (u) units.add(u);
    }
  }
  return { allAffected, units: [...units].sort() };
}

/**
 * Save compact work-state delta capsule to `.git/bg_vault/dx_capsule.json`
 * and synchronize with `bg` Flight Recorder (`dx checkpoint`).
 */
export function runDxCheckpoint(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const ctx = getRepoContext(rootAbs);
  const por = getPorcelainStatus(rootAbs);
  const dirtyPaths = por.allDirty.map((d) => d.path).sort();
  const { allAffected, units } = inferAffectedUnitsFromFiles(rootAbs, dirtyPaths);

  const capsulePath = path.join(ctx.vaultDir, DX_CAPSULE_FILE);
  let prev = {};
  if (fs.existsSync(capsulePath)) {
    try {
      prev = JSON.parse(fs.readFileSync(capsulePath, 'utf8'));
    } catch {
      prev = {};
    }
  }

  const completed = [...new Set([...(prev.completed || []), ...(opts.completed ? [opts.completed] : [])])];
  const pitfalls = [...new Set([...(prev.pitfalls || []), ...(opts.pitfall ? [opts.pitfall] : [])])];
  const nextCapsule = {
    schema: 'dx-capsule/v1',
    branch: ctx.branch,
    headSha: ctx.headSha,
    goal: opts.goal || prev.goal || '',
    completed,
    next: opts.next || prev.next || '',
    pitfalls,
    note: opts.note || prev.note || '',
    dirtyCount: dirtyPaths.length,
    dirtySample: dirtyPaths.slice(0, 15),
    affectedUnits: allAffected ? ['*ALL'] : units,
    updatedAt: new Date().toISOString(),
  };

  fs.mkdirSync(ctx.vaultDir, { recursive: true });
  const tmpPath = `${capsulePath}.tmp.${process.pid}`;
  fs.writeFileSync(tmpPath, JSON.stringify(nextCapsule, null, 2) + '\n', 'utf8');
  fs.renameSync(tmpPath, capsulePath);

  // Also sync into bg Flight Recorder when metadata flags are supplied
  const frPatch = {};
  if (opts.goal) frPatch.goal = opts.goal;
  if (opts.next) frPatch.nextStep = opts.next;
  if (opts.completed) frPatch.addCompleted = opts.completed;
  if (opts.pitfall) frPatch.addPitfall = opts.pitfall;
  if (Object.keys(frPatch).length > 0) {
    writeFlightRecorder(ctx, frPatch);
  }

  const summary = `[dx checkpoint] SAVED ${path.relative(rootAbs, capsulePath)} | branch=${ctx.branch} dirty=${dirtyPaths.length} affected=[${nextCapsule.affectedUnits.join(',') || 'none'}] next="${nextCapsule.next || '-'}"`;
  return {
    exitCode: 0,
    capsulePath,
    capsule: nextCapsule,
    tokens: estimateTokensBpe(summary),
    formatted: summary,
  };
}

/**
 * Reconstruct <250-token instant session resume context (`dx resume`).
 */
export function runDxResume(opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 240;
  const ctx = getRepoContext(rootAbs);
  const por = getPorcelainStatus(rootAbs);
  const flight = readFlightRecorder(ctx);

  const capsulePath = path.join(ctx.vaultDir, DX_CAPSULE_FILE);
  let cap = {};
  if (fs.existsSync(capsulePath)) {
    try {
      cap = JSON.parse(fs.readFileSync(capsulePath, 'utf8'));
    } catch {
      cap = {};
    }
  }

  const dirtyPaths = por.allDirty.map((d) => d.path).sort();
  const { allAffected, units } = inferAffectedUnitsFromFiles(rootAbs, dirtyPaths);

  const goal = cap.goal || flight.goal || '(unset)';
  const next = cap.next || flight.nextStep || '(unset)';
  const completed = [...new Set([...(flight.completed || []), ...(cap.completed || [])])].slice(-4);
  const pitfalls = [...new Set([...(flight.knownPitfalls || []), ...(cap.pitfalls || [])])].slice(-3);

  const lines = [
    `[dx resume] branch=${ctx.branch} head=${(ctx.headSha || '').slice(0, 8)} dirty=${dirtyPaths.length} affected=[${allAffected ? '*ALL' : units.join(',') || 'none'}]`,
    `  GOAL: ${goal}`,
    `  NEXT: ${next}`,
  ];
  if (completed.length > 0) lines.push(`  DONE: ${completed.join(' ; ')}`);
  if (pitfalls.length > 0) lines.push(`  PITFALLS: ${pitfalls.join(' ; ')}`);
  if (dirtyPaths.length > 0) {
    lines.push(
      `  DIRTY(${dirtyPaths.length}): ${dirtyPaths.slice(0, 8).join(', ')}${dirtyPaths.length > 8 ? ` (+${dirtyPaths.length - 8})` : ''}`
    );
  }
  lines.push(`  CMD: node scripts/dx.mjs diff --ai | node scripts/dx.mjs preflight --ai`);

  const budgeted = enforceTokenBudget(lines.join('\n'), { budget, tag: 'dx_resume' });
  return {
    exitCode: 0,
    tokens: budgeted.tokens,
    branch: ctx.branch,
    dirtyCount: dirtyPaths.length,
    affectedUnits: allAffected ? ['*ALL'] : units,
    goal,
    next,
    formatted: budgeted.text,
  };
}
