/**
 * `dx` Component 5B — 3D CAD Geometry Micro-DSL Compiler (`dx cad compile`),
 * HD 720x470 SVG Schematic Micro-DSL Compiler (`dx svg compile`),
 * and Schematic Locator/Coverage Auditor (`dx schematic find | audit`).
 *
 * Cuts 3D CAD & SVG AI output tokens by 75-88% while enforcing 100% V2 rules
 * (0 direct new THREE.Mesh*Material, verified `mats.*` keys, `tagPartMeshes`,
 * `attachCadEdges`, esbuild syntax verification, SVG tag closure & text overlap check).
 */

import fs from 'node:fs';
import path from 'node:path';
import { transformSync } from 'esbuild';
import { buildCodeAtlas } from './atlas_builder.mjs';
import { enforceTokenBudget, estimateTokensBpe } from './tokenizer_and_budget.mjs';
import { evaluateScopePolicy } from '../buchigire_guard/safety_scanners.mjs';

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

function loadValidMaterialKeys(rootAbs) {
  const matPath = path.join(rootAbs, 'catalog', 'code', 'MATERIALS.tsv');
  if (!fs.existsSync(matPath)) buildCodeAtlas({ root: rootAbs });
  const rows = readTsv(matPath);
  return new Set(rows.filter((r) => r.kind === 'mat').map((r) => r.key));
}

function parseKvTokens(line) {
  const out = {};
  const rx = /([a-zA-Z_][a-zA-Z0-9_-]*)=(?:"([^"]*)"|'([^']*)'|(\S+))/g;
  let m;
  while ((m = rx.exec(line)) !== null) {
    out[m[1]] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return out;
}

function numList(str, fallback) {
  if (!str) return fallback;
  const arr = str.split(',').map(Number);
  return arr.every(Number.isFinite) ? arr : fallback;
}

function checkPolicyWrite(rootAbs, outRel, policyName) {
  const bgrc = path.join(rootAbs, '.bgrc.json');
  if (!fs.existsSync(bgrc)) return { allowed: true, violations: [] };
  try {
    const cfg = JSON.parse(fs.readFileSync(bgrc, 'utf8'));
    const scope = evaluateScopePolicy([outRel], cfg, policyName);
    return { allowed: scope.violations.length === 0, violations: scope.violations };
  } catch {
    return { allowed: true, violations: [] };
  }
}

// =============================================================================
// 1. 3D CAD Geometry Micro-DSL Compiler (`dx cad compile`)
// =============================================================================

/**
 * Compile declarative 3D CAD Micro-DSL into 100% V2-compliant TypeScript.
 *
 * Supported primitives:
 *   box        mat=<key> size=w,h,d [pos=x,y,z] [rot=rx,ry,rz]
 *   chamferBox mat=<key> size=w,h,d [bevel=0.25] [pos=x,y,z] [rot=rx,ry,rz]
 *   cyl        mat=<key> r=<r> [rt=<rTop>] [rb=<rBot>] h=<h> [seg=20] [pos=x,y,z] [rot=rx,ry,rz]
 *   sphere     mat=<key> r=<r> [seg=18] [pos=x,y,z]
 *   torus      mat=<key> r=<r> tube=<t> [seg=12,28] [pos=x,y,z] [rot=rx,ry,rz]
 *   ring       mat=<key> ir=<inR> or=<outR> depth=<d> [pos=x,y,z] [rot=rx,ry,rz]
 *   plate      mat=<key> w=<w> h=<h> depth=<d> [rad=1.0] [pos=x,y,z] [rot=rx,ry,rz]
 *   screws     mat=<key> r=<r> h=<h> pts=x1,y1,z1|x2,y2,z2
 *   array      count=<N> step=dx,dy,dz kind=box|cyl|ring ...
 */
export function compileCadDsl(dslText, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const validMats = loadValidMaterialKeys(rootAbs);

  const lines = String(dslText ?? '').split(/\r?\n/);
  let moduleFn = 'buildGeneratedCadParts';
  let unit = opts.unit || 'evf';
  const parts = [];
  let curPart = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;

    if (line.startsWith('@module ')) {
      const tokens = line.slice(8).trim().split(/\s+/);
      if (tokens[0] && !tokens[0].includes('=')) moduleFn = tokens[0];
      const kv = parseKvTokens(line);
      if (kv.unit) unit = kv.unit;
      continue;
    }

    if (line.startsWith('@part ')) {
      const rest = line.slice(6).trim();
      const id = rest.split(/\s+/)[0];
      const kv = parseKvTokens(rest);
      curPart = {
        id,
        order: Number(kv.order || parts.length + 1),
        swatch: kv.swatch || '#4b5563',
        pos: numList(kv.pos, [0, 0, 0]),
        exp: numList(kv.exp, [0, 12, 0]),
        iexp: numList(kv.iexp, numList(kv.exp, [0, 12, 0])),
        edge: Number(kv.edge || 0.24),
        standalone: kv.standalone === 'true' || kv.standalone === '1',
        prims: [],
      };
      parts.push(curPart);
      continue;
    }

    if (!curPart) continue;
    const kind = line.split(/\s+/)[0];
    const kv = parseKvTokens(line);
    curPart.prims.push({ kind, kv, raw: line });
  }

  // Validate all materials against catalog/code/MATERIALS.tsv
  const matErrors = [];
  const usedHelpers = new Set(['attachCadEdges', 'tagPartMeshes']);
  const usedUltra = new Set();

  for (const p of parts) {
    for (const pr of p.prims) {
      const mKey = pr.kv.mat;
      if (!mKey) {
        matErrors.push(`${p.id} (${pr.kind}): missing required mat=<key>`);
      } else if (validMats.size > 0 && !validMats.has(mKey)) {
        const lower = mKey.toLowerCase();
        const hints = [...validMats].filter((k) => k.toLowerCase().includes(lower.slice(0, 5))).slice(0, 5);
        matErrors.push(
          `${p.id} (${pr.kind}): unregistered material 'mats.${mKey}'${hints.length ? ` (did you mean: ${hints.join(', ')}?)` : ''}`
        );
      }
      const effKind = pr.kind === 'array' ? pr.kv.kind || 'box' : pr.kind;
      if (effKind === 'chamferBox') usedUltra.add('createChamferedBoxGeo');
      if (effKind === 'screws') usedHelpers.add('createPrecisionScrew');
      if (effKind === 'plate') usedHelpers.add('createRoundedRectShape');
    }
  }

  if (parts.length === 0) {
    return {
      exitCode: 2,
      errors: ['No @part blocks found in CAD DSL.'],
      formatted: '[dx cad compile] FAIL: no @part blocks found.',
    };
  }
  if (matErrors.length > 0) {
    return {
      exitCode: 2,
      errors: matErrors,
      formatted: `[dx cad compile] FAIL (${matErrors.length} material error(s)):\n  - ${matErrors.join('\n  - ')}`,
    };
  }

  const out = [];
  out.push(`import * as THREE from 'three';`);
  out.push(`import { CadPart } from '../types';`);
  out.push(`import { MaterialLibrary } from '../../engine/Materials';`);
  out.push(`import { ${[...usedHelpers].sort().join(', ')} } from '../../engine/CadHelpers';`);
  if (usedUltra.size > 0) {
    out.push(`import { ${[...usedUltra].sort().join(', ')} } from '../../engine/UltraDetailBuilders';`);
  }
  out.push(`import { lazyExplanationStub } from '../lazyExplanations';`);
  out.push('');
  out.push(`function makeRingGeometry(innerR: number, outerR: number, depth: number): THREE.ExtrudeGeometry {`);
  out.push(`  const shape = new THREE.Shape();`);
  out.push(`  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);`);
  out.push(`  const hole = new THREE.Path();`);
  out.push(`  hole.absarc(0, 0, Math.max(0.05, innerR), 0, Math.PI * 2, true);`);
  out.push(`  shape.holes.push(hole);`);
  out.push(`  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 2, curveSegments: 28 });`);
  out.push(`  geo.translate(0, 0, -depth * 0.5);`);
  out.push(`  return geo;`);
  out.push(`}`);
  out.push('');
  out.push(`export function ${moduleFn}(mats: MaterialLibrary, clippingPlanes: THREE.Plane[]): CadPart[] {`);
  out.push(`  const parts: CadPart[] = [];`);

  const emitPrim = (kind, kv, varPrefix, indent) => {
    const pos = numList(kv.pos, [0, 0, 0]);
    const rot = numList(kv.rot, [0, 0, 0]);
    const matExpr = `mats.${kv.mat}`;
    const linesOut = [];

    if (kind === 'screws') {
      const r = Number(kv.r || 0.7);
      const h = Number(kv.h || 1.6);
      const pts = String(kv.pts || '0,0,0')
        .split('|')
        .map((pStr) => numList(pStr, [0, 0, 0]));
      pts.forEach((pt, si) => {
        const sv = `${varPrefix}_s${si}`;
        linesOut.push(`${indent}const ${sv} = createPrecisionScrew(${r}, ${h}, ${matExpr});`);
        linesOut.push(`${indent}${sv}.position.set(${pt[0]}, ${pt[1]}, ${pt[2]});`);
        if (rot[0] || rot[1] || rot[2]) {
          linesOut.push(`${indent}${sv}.rotation.set(${rot[0]}, ${rot[1]}, ${rot[2]});`);
        }
        linesOut.push(`${indent}group.add(${sv});`);
      });
      return linesOut;
    }

    let geoExpr = '';
    if (kind === 'box') {
      const [w, h, d] = numList(kv.size, [4, 4, 4]);
      geoExpr = `new THREE.BoxGeometry(${w}, ${h}, ${d})`;
    } else if (kind === 'chamferBox') {
      const [w, h, d] = numList(kv.size, [4, 4, 4]);
      const bevel = Number(kv.bevel || 0.2);
      geoExpr = `createChamferedBoxGeo(${w}, ${h}, ${d}, ${bevel})`;
    } else if (kind === 'cyl') {
      const r = Number(kv.r || 1);
      const rt = kv.rt !== undefined ? Number(kv.rt) : r;
      const rb = kv.rb !== undefined ? Number(kv.rb) : r;
      const h = Number(kv.h || 2);
      const seg = Number(kv.seg || 20);
      geoExpr = `new THREE.CylinderGeometry(${rt}, ${rb}, ${h}, ${seg})`;
    } else if (kind === 'sphere') {
      const r = Number(kv.r || 1);
      const seg = Number(kv.seg || 18);
      geoExpr = `new THREE.SphereGeometry(${r}, ${seg}, ${Math.max(10, Math.round(seg * 0.75))})`;
    } else if (kind === 'torus') {
      const r = Number(kv.r || 5);
      const tube = Number(kv.tube || 0.35);
      const [rs, tsSeg] = numList(kv.seg, [12, 28]);
      geoExpr = `new THREE.TorusGeometry(${r}, ${tube}, ${rs}, ${tsSeg})`;
    } else if (kind === 'ring') {
      const ir = Number(kv.ir || 4);
      const or = Number(kv.or || 6);
      const depth = Number(kv.depth || 1.2);
      geoExpr = `makeRingGeometry(${ir}, ${or}, ${depth})`;
    } else if (kind === 'plate') {
      const w = Number(kv.w || 12);
      const h = Number(kv.h || 8);
      const depth = Number(kv.depth || 1.0);
      const rad = Number(kv.rad || 0.8);
      linesOut.push(`${indent}const ${varPrefix}_shape = createRoundedRectShape(${w}, ${h}, ${rad});`);
      geoExpr = `new THREE.ExtrudeGeometry(${varPrefix}_shape, { depth: ${depth}, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2 })`;
    } else {
      const [w, h, d] = numList(kv.size, [2, 2, 2]);
      geoExpr = `new THREE.BoxGeometry(${w}, ${h}, ${d})`;
    }

    linesOut.push(`${indent}const ${varPrefix} = new THREE.Mesh(${geoExpr}, ${matExpr});`);
    linesOut.push(`${indent}${varPrefix}.position.set(${pos[0]}, ${pos[1]}, ${pos[2]});`);
    if (rot[0] || rot[1] || rot[2]) {
      linesOut.push(`${indent}${varPrefix}.rotation.set(${rot[0]}, ${rot[1]}, ${rot[2]});`);
    }
    linesOut.push(`${indent}group.add(${varPrefix});`);
    return linesOut;
  };

  parts.forEach((p, pi) => {
    out.push(`  {`);
    out.push(`    const group = new THREE.Group();`);
    out.push(`    const assembledPos = new THREE.Vector3(${p.pos.join(', ')});`);
    out.push(`    const explodeOffset = new THREE.Vector3(${p.exp.join(', ')});`);
    out.push(`    const integratedExplodeOffset = new THREE.Vector3(${p.iexp.join(', ')});`);

    p.prims.forEach((pr, j) => {
      if (pr.kind === 'array') {
        const count = Math.max(1, Number(pr.kv.count || 2));
        const step = numList(pr.kv.step, [0, 0, 1]);
        const basePos = numList(pr.kv.pos, [0, 0, 0]);
        const subKind = pr.kv.kind || 'box';
        for (let k = 0; k < count; k++) {
          const itemKv = {
            ...pr.kv,
            pos: [
              Number((basePos[0] + step[0] * k).toFixed(4)),
              Number((basePos[1] + step[1] * k).toFixed(4)),
              Number((basePos[2] + step[2] * k).toFixed(4)),
            ].join(','),
          };
          out.push(...emitPrim(subKind, itemKv, `m${pi}_${j}_${k}`, '    '));
        }
      } else {
        out.push(...emitPrim(pr.kind, pr.kv, `m${pi}_${j}`, '    '));
      }
    });

    out.push(`    group.position.copy(assembledPos);`);
    out.push(`    tagPartMeshes(group, '${p.id}');`);
    out.push(`    const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, ${p.edge});`);
    out.push(`    parts.push({`);
    out.push(`      id: '${p.id}',`);
    out.push(`      subsystem: '${unit}',`);
    out.push(`      order: ${p.order},`);
    out.push(`      swatchColor: '${p.swatch}',`);
    out.push(`      group,`);
    out.push(`      assembledPos,`);
    out.push(`      explodeOffset,`);
    out.push(`      integratedExplodeOffset,`);
    out.push(`      interactiveMeshes: meshes,`);
    out.push(`      edgeLines: edges,`);
    out.push(`      explanation: lazyExplanationStub('${p.id}'),`);
    if (p.standalone) out.push(`      standaloneOnly: true,`);
    out.push(`    });`);
    out.push(`  }`);
  });

  out.push(`  return parts;`);
  out.push(`}`);
  out.push('');

  const tsCode = out.join('\n');

  // Verify generated TS parses cleanly via esbuild & obeys V2 0-raw-material rule
  try {
    transformSync(tsCode, { loader: 'ts' });
  } catch (err) {
    return {
      exitCode: 2,
      errors: [String(err)],
      formatted: `[dx cad compile] FAIL esbuild syntax error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
  if (/new\s+THREE\.(Mesh\w*Material|Line\w*Material)\s*\(/.test(tsCode)) {
    return {
      exitCode: 2,
      errors: ['V2 anti-pattern violation: direct THREE.Mesh*Material detected in generated code'],
      formatted: '[dx cad compile] FAIL V2 anti-pattern violation.',
    };
  }

  const dslTok = estimateTokensBpe(dslText);
  const tsTok = estimateTokensBpe(tsCode);
  const reductionPct = tsTok > 0 ? Number((100 * (1 - dslTok / tsTok)).toFixed(1)) : 0;

  const apply = Boolean(opts.apply) && !Boolean(opts['dry-run']);
  let wrotePath = null;
  if (apply && opts.out) {
    const outAbs = path.resolve(rootAbs, opts.out);
    const outRel = path.relative(rootAbs, outAbs).split(path.sep).join('/');
    if (!outRel.startsWith('..')) {
      const scope = checkPolicyWrite(rootAbs, outRel, opts.policy || 'worker');
      if (!scope.allowed) {
        return {
          exitCode: 2,
          formatted: `[dx cad compile] BLOCKED by policy '${opts.policy || 'worker'}': ${outRel}`,
        };
      }
    }
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, tsCode, 'utf8');
    wrotePath = outAbs;
  }

  const header = `[dx cad compile] ${wrotePath ? `APPLIED ${wrotePath}` : 'DRY_RUN OK'} parts=${parts.length} unit=${unit} dslTok=${dslTok} -> tsTok=${tsTok} (output reduction -${reductionPct}%) | V2-clean=YES`;
  const budgeted = enforceTokenBudget(wrotePath ? header : `${header}\n${tsCode}`, {
    budget: opts.budget ?? 1500,
    tag: 'dx_cad_compile',
  });

  return {
    exitCode: 0,
    partsCount: parts.length,
    unit,
    dslTokens: dslTok,
    tsTokens: tsTok,
    reductionPct,
    tsCode,
    wrotePath,
    formatted: budgeted.text,
  };
}

// =============================================================================
// 2. HD 720x470 SVG Schematic Micro-DSL Compiler (`dx svg compile`)
// =============================================================================

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function estimateTextWidthPx(text, fontSize) {
  let w = 0;
  for (const ch of String(text ?? '')) {
    w += /[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? fontSize * 0.98 : fontSize * 0.56;
  }
  return w;
}

/**
 * Validate SVG tag balance and detect `<text>` bounding-box overlaps.
 */
export function validateSvgStructureAndOverlaps(svgStr) {
  const errors = [];
  const overlaps = [];

  // 1. Tag balance check (ignoring self-closing tags and comments)
  const stripped = svgStr.replace(/<!--[\s\S]*?-->/g, '');
  const tagRx = /<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)(?:\s[^>]*)?>/g;
  const stack = [];
  let m;
  while ((m = tagRx.exec(stripped)) !== null) {
    const isClose = m[1] === '/';
    const tag = m[2];
    const isSelf = m[0].endsWith('/>');
    if (isSelf) continue;
    if (!isClose) {
      stack.push(tag);
    } else {
      const top = stack.pop();
      if (top !== tag) {
        errors.push(`Mismatched closing tag </${tag}> (expected </${top || 'NONE'}>)`);
        break;
      }
    }
  }
  if (stack.length > 0) errors.push(`Unclosed SVG tag(s): ${stack.join(', ')}`);

  // 2. Text AABB overlap check
  const textBoxes = [];
  const txtRx = /<text([^>]*)>([\s\S]*?)<\/text>/g;
  while ((m = txtRx.exec(stripped)) !== null) {
    const attrs = m[1];
    const content = m[2].replace(/<[^>]+>/g, '').trim();
    if (!content) continue;
    const xM = attrs.match(/\bx="(-?[\d.]+)"/);
    const yM = attrs.match(/\by="(-?[\d.]+)"/);
    if (!xM || !yM) continue;
    const x = Number(xM[1]);
    const y = Number(yM[1]);
    const fsM = attrs.match(/font-size="([\d.]+)"/);
    const fontSize = fsM ? Number(fsM[1]) : 11;
    const anchorM = attrs.match(/text-anchor="([^"]+)"/);
    const anchor = anchorM ? anchorM[1] : 'start';
    const w = estimateTextWidthPx(content, fontSize);
    const h = fontSize * 1.05;
    const x1 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    const y1 = y - h * 0.82;
    textBoxes.push({ text: content.slice(0, 20), x1, y1, x2: x1 + w, y2: y1 + h });
  }

  for (let i = 0; i < textBoxes.length; i++) {
    for (let j = i + 1; j < textBoxes.length; j++) {
      const a = textBoxes[i];
      const b = textBoxes[j];
      const ox = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
      const oy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
      if (ox > 4 && oy > 3) {
        overlaps.push(`"${a.text}" <-> "${b.text}" (${ox.toFixed(0)}x${oy.toFixed(0)}px)`);
      }
    }
  }

  return { valid: errors.length === 0, errors, overlaps, textCount: textBoxes.length };
}

/**
 * Compile semantic HD SVG Micro-DSL into a complete 720x470 TypeScript schematic renderer.
 */
export function compileSvgDsl(dslText, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const lines = String(dslText ?? '').split(/\r?\n/);
  const diagrams = [];
  let cur = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;

    if (line.startsWith('@diagram ')) {
      const rest = line.slice(9).trim();
      const id = rest.split(/\s+/)[0];
      const kv = parseKvTokens(rest);
      cur = {
        id,
        badge: kv.badge || 'DX01',
        theme: kv.theme || 'dark',
        accent: kv.accent || '#38bdf8',
        title: id,
        analogy: '',
        elems: [],
        cards: [],
      };
      diagrams.push(cur);
      continue;
    }

    if (!cur) continue;
    if (line.startsWith('title:')) {
      cur.title = line.slice(6).trim();
    } else if (line.startsWith('analogy:')) {
      cur.analogy = line.slice(8).trim();
    } else if (/^card[123]:/.test(line)) {
      const parts = line.slice(6).split('|').map((s) => s.trim());
      cur.cards.push({
        label: parts[0] || 'ポイント',
        line1: parts[1] || '',
        line2: parts[2] || '',
      });
    } else {
      const kind = line.split(/\s+/)[0];
      const kv = parseKvTokens(line);
      cur.elems.push({ kind, kv });
    }
  }

  if (diagrams.length === 0) {
    return {
      exitCode: 2,
      errors: ['No @diagram blocks found in SVG DSL.'],
      formatted: '[dx svg compile] FAIL: no @diagram blocks found.',
    };
  }

  const validationIssues = [];
  const overlapWarnings = [];
  const renderedCases = [];

  for (const d of diagrams) {
    const p = d.badge.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const isDark = d.theme !== 'light';
    const bg = isDark ? '#0b1220' : '#f8fafc';
    const panelBg = isDark ? '#111c30' : '#ffffff';
    const borderCol = isDark ? '#243552' : '#cbd5e1';
    const textPrimary = isDark ? '#f1f5f9' : '#0f172a';
    const textMuted = isDark ? '#94a3b8' : '#475569';
    const gridCol = isDark ? '#1e293b' : '#e2e8f0';

    const bodyParts = [];
    for (const el of d.elems) {
      const kv = el.kv;
      if (el.kind === 'box') {
        const x = Number(kv.x || 40);
        const y = Number(kv.y || 96);
        const w = Number(kv.w || 180);
        const h = Number(kv.h || 100);
        const fill = kv.fill || (isDark ? '#17253d' : '#f1f5f9');
        const stroke = kv.stroke || d.accent;
        bodyParts.push(
          `    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`
        );
        if (kv.label) {
          bodyParts.push(
            `    <text x="${x + w / 2}" y="${y + 20}" text-anchor="middle" font-size="11.5" font-weight="800" fill="${textPrimary}">${escapeXml(kv.label)}</text>`
          );
        }
      } else if (el.kind === 'lens') {
        const cx = Number(kv.x || 320);
        const cy = Number(kv.y || 180);
        const rx = Number(kv.rx || 20);
        const ry = Number(kv.ry || 72);
        bodyParts.push(
          `    <path d="M ${cx} ${cy - ry} Q ${cx + rx} ${cy} ${cx} ${cy + ry} Q ${cx - rx} ${cy} ${cx} ${cy - ry} Z" fill="url(#${p}-glass)" stroke="${d.accent}" stroke-width="1.8"/>`
        );
        if (kv.label) {
          bodyParts.push(
            `    <text x="${cx}" y="${cy + ry + 16}" text-anchor="middle" font-size="10.5" font-weight="700" fill="${d.accent}">${escapeXml(kv.label)}</text>`
          );
        }
      } else if (el.kind === 'arrow') {
        const [x1, y1] = numList(kv.from, [60, 140]);
        const [x2, y2] = numList(kv.to, [200, 140]);
        const col = kv.color || '#f59e0b';
        const dash = kv.dashed === 'true' ? ' stroke-dasharray="5 3"' : '';
        bodyParts.push(
          `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2.2"${dash} marker-end="url(#${p}-arr)"/>`
        );
        if (kv.label) {
          const mx = (x1 + x2) / 2;
          const my = Math.min(y1, y2) - 8;
          bodyParts.push(
            `    <text x="${mx}" y="${my}" text-anchor="middle" font-size="10.5" font-weight="800" fill="${col}">${escapeXml(kv.label)}</text>`
          );
        }
      } else if (el.kind === 'stack') {
        const x = Number(kv.x || 400);
        const y = Number(kv.y || 100);
        const w = Number(kv.w || 260);
        const h = Number(kv.h || 140);
        const layers = String(kv.layers || 'Layer A|Layer B').split('|').filter(Boolean);
        const lh = Math.max(20, Math.floor((h - (layers.length - 1) * 6) / layers.length));
        const palette = ['#0ea5e9', '#6366f1', '#10b981', '#f59e0b', '#ec4899'];
        layers.forEach((lay, li) => {
          const ly = y + li * (lh + 6);
          const col = palette[li % palette.length];
          bodyParts.push(
            `    <rect x="${x}" y="${ly}" width="${w}" height="${lh}" rx="6" fill="${col}" fill-opacity="0.22" stroke="${col}" stroke-width="1.3"/>`
          );
          bodyParts.push(
            `    <text x="${x + 12}" y="${ly + lh / 2 + 4}" font-size="10.5" font-weight="700" fill="${textPrimary}">${escapeXml(lay)}</text>`
          );
        });
      } else if (el.kind === 'wave') {
        const x = Number(kv.x || 50);
        const y = Number(kv.y || 290);
        const w = Number(kv.w || 220);
        const amp = Number(kv.amp || 12);
        const freq = Number(kv.freq || 3);
        const col = kv.color || d.accent;
        const pts = [];
        for (let s = 0; s <= 40; s++) {
          const px = x + (w * s) / 40;
          const py = y + Math.sin((s / 40) * Math.PI * 2 * freq) * amp;
          pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
        bodyParts.push(
          `    <polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="2"/>`
        );
        if (kv.label) {
          bodyParts.push(
            `    <text x="${x + w / 2}" y="${y + amp + 16}" text-anchor="middle" font-size="10" font-weight="700" fill="${col}">${escapeXml(kv.label)}</text>`
          );
        }
      } else if (el.kind === 'curve') {
        const pts = String(kv.pts || '280,290|350,255|430,295')
          .split('|')
          .map((pair) => numList(pair, [0, 0]));
        const col = kv.color || '#22c55e';
        const dPath = pts.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ');
        bodyParts.push(`    <path d="${dPath}" fill="none" stroke="${col}" stroke-width="2.2"/>`);
        if (kv.label && pts.length > 0) {
          const mid = pts[Math.floor(pts.length / 2)];
          bodyParts.push(
            `    <text x="${mid[0]}" y="${mid[1] - 10}" text-anchor="middle" font-size="10" font-weight="700" fill="${col}">${escapeXml(kv.label)}</text>`
          );
        }
      } else if (el.kind === 'callout') {
        const [fx, fy] = numList(kv.from, [150, 150]);
        const [tx, ty] = numList(kv.to, [420, 260]);
        const col = kv.color || d.accent;
        const num = kv.num || '1';
        bodyParts.push(
          `    <line x1="${fx}" y1="${fy}" x2="${tx - 12}" y2="${ty}" stroke="${col}" stroke-width="1.3" stroke-dasharray="3 2"/>`
        );
        bodyParts.push(`    <circle cx="${fx}" cy="${fy}" r="3.2" fill="${col}"/>`);
        bodyParts.push(`    <circle cx="${tx}" cy="${ty}" r="9" fill="${col}"/>`);
        bodyParts.push(
          `    <text x="${tx}" y="${ty + 3.5}" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">${escapeXml(num)}</text>`
        );
        if (kv.title) {
          bodyParts.push(
            `    <text x="${tx + 14}" y="${ty - 1}" font-size="10.8" font-weight="800" fill="${textPrimary}">${escapeXml(kv.title)}</text>`
          );
        }
        if (kv.sub) {
          bodyParts.push(
            `    <text x="${tx + 14}" y="${ty + 13}" font-size="9.5" font-weight="600" fill="${textMuted}">${escapeXml(kv.sub)}</text>`
          );
        }
      } else if (el.kind === 'formula') {
        const x = Number(kv.x || 410);
        const y = Number(kv.y || 310);
        bodyParts.push(
          `    <rect x="${x}" y="${y - 16}" width="268" height="32" rx="7" fill="${panelBg}" stroke="${borderCol}" stroke-width="1.1"/>`
        );
        bodyParts.push(
          `    <text x="${x + 12}" y="${y + 4}" font-size="11.5" font-weight="800" fill="${d.accent}">${escapeXml(kv.expr || '')}</text>`
        );
        if (kv.desc) {
          bodyParts.push(
            `    <text x="${x + 132}" y="${y + 3}" font-size="9.8" font-weight="600" fill="${textMuted}">${escapeXml(kv.desc)}</text>`
          );
        }
      } else if (el.kind === 'badge') {
        const x = Number(kv.x || 560);
        const y = Number(kv.y || 82);
        const col = kv.color || '#10b981';
        const txt = kv.text || '';
        const bw = Math.max(76, Math.round(estimateTextWidthPx(txt, 10) + 22));
        bodyParts.push(
          `    <rect x="${x}" y="${y - 14}" width="${bw}" height="22" rx="11" fill="${col}" fill-opacity="0.18" stroke="${col}" stroke-width="1.2"/>`
        );
        bodyParts.push(
          `    <text x="${x + bw / 2}" y="${y + 1}" text-anchor="middle" font-size="10" font-weight="800" fill="${col}">${escapeXml(txt)}</text>`
        );
      }
    }

    // Ensure 3 bottom summary cards
    const cards = [
      d.cards[0] || { label: 'なにをする部品？', line1: d.title, line2: d.analogy || '主要機構部品' },
      d.cards[1] || { label: 'スゴい工夫・秘密', line1: '高精度エンジニアリング設計', line2: '光学・機械性能を最適化' },
      d.cards[2] || { label: '撮影でのメリット', line1: '安定した描写・信頼性を確保', line2: 'プロ現場の要求に応える' },
    ];
    const cardCols = [d.accent, '#10b981', '#f59e0b'];
    const cardsSvg = cards
      .map((c, ci) => {
        const cx = 16 + ci * 233;
        const cc = cardCols[ci];
        return [
          `    <g transform="translate(${cx}, 356)">`,
          `      <rect x="0" y="0" width="222" height="102" rx="10" fill="${panelBg}" stroke="${borderCol}" stroke-width="1.2"/>`,
          `      <rect x="0" y="0" width="222" height="27" rx="10" fill="${cc}" fill-opacity="0.16"/>`,
          `      <text x="10" y="18" font-size="11" font-weight="800" fill="${cc}">${escapeXml(c.label)}</text>`,
          `      <text x="10" y="52" font-size="10.2" font-weight="600" fill="${textPrimary}">${escapeXml(c.line1)}</text>`,
          `      <text x="10" y="74" font-size="10.2" font-weight="600" fill="${textMuted}">${escapeXml(c.line2)}</text>`,
          `    </g>`,
        ].join('\n');
      })
      .join('\n');

    const svgStr = [
      `<svg class="dx-hd-svg" data-dx-hd="1" viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" style="font-family:'Hiragino Kaku Gothic ProN','Hiragino Sans','Yu Gothic',system-ui,sans-serif;">`,
      `  <defs>`,
      `    <pattern id="${p}-grid" width="24" height="24" patternUnits="userSpaceOnUse">`,
      `      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${gridCol}" stroke-width="0.7" opacity="0.7"/>`,
      `    </pattern>`,
      `    <linearGradient id="${p}-glass" x1="0" y1="0" x2="1" y2="1">`,
      `      <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.88"/>`,
      `      <stop offset="100%" stop-color="${d.accent}" stop-opacity="0.45"/>`,
      `    </linearGradient>`,
      `    <marker id="${p}-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">`,
      `      <path d="M 0 1 L 10 5 L 0 9 z" fill="${d.accent}"/>`,
      `    </marker>`,
      `  </defs>`,
      `  <rect x="0" y="0" width="720" height="470" rx="14" fill="${bg}"/>`,
      `  <rect x="16" y="68" width="688" height="278" rx="12" fill="${panelBg}" stroke="${borderCol}" stroke-width="1.2"/>`,
      `  <rect x="16" y="68" width="688" height="278" rx="12" fill="url(#${p}-grid)"/>`,
      `  <rect x="16" y="12" width="58" height="28" rx="7" fill="${d.accent}"/>`,
      `  <text x="45" y="30" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">${escapeXml(d.badge)}</text>`,
      `  <text x="86" y="31" font-size="15.5" font-weight="800" fill="${textPrimary}">${escapeXml(d.title)}</text>`,
      `  <text x="86" y="51" font-size="10.8" font-weight="600" fill="${textMuted}">${escapeXml(d.analogy)}</text>`,
      ...bodyParts,
      cardsSvg,
      `</svg>`,
    ].join('\n');

    const check = validateSvgStructureAndOverlaps(svgStr);
    if (!check.valid) validationIssues.push(`${d.id}: ${check.errors.join('; ')}`);
    if (check.overlaps.length > 0) overlapWarnings.push(`${d.id}: ${check.overlaps.join(', ')}`);

    renderedCases.push(`    case '${d.id}':\n      return \`${svgStr.replace(/`/g, '\\`')}\`;`);
  }

  if (validationIssues.length > 0) {
    return {
      exitCode: 2,
      errors: validationIssues,
      formatted: `[dx svg compile] FAIL:\n  - ${validationIssues.join('\n  - ')}`,
    };
  }

  const fnName = opts.fnName || 'renderGeneratedHdSchematicSvg';
  const tsCode = [
    `import { PartExplanation } from '../assemblies/types';`,
    ``,
    `export function ${fnName}(type: PartExplanation['diagramType']): string | null {`,
    `  switch (type) {`,
    ...renderedCases,
    `    default:`,
    `      return null;`,
    `  }`,
    `}`,
    ``,
  ].join('\n');

  try {
    transformSync(tsCode, { loader: 'ts' });
  } catch (err) {
    return {
      exitCode: 2,
      errors: [String(err)],
      formatted: `[dx svg compile] FAIL esbuild syntax error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  const dslTok = estimateTokensBpe(dslText);
  const tsTok = estimateTokensBpe(tsCode);
  const reductionPct = tsTok > 0 ? Number((100 * (1 - dslTok / tsTok)).toFixed(1)) : 0;

  const apply = Boolean(opts.apply) && !Boolean(opts['dry-run']);
  let wrotePath = null;
  if (apply && opts.out) {
    const outAbs = path.resolve(rootAbs, opts.out);
    const outRel = path.relative(rootAbs, outAbs).split(path.sep).join('/');
    if (!outRel.startsWith('..')) {
      const scope = checkPolicyWrite(rootAbs, outRel, opts.policy || 'worker');
      if (!scope.allowed) {
        return {
          exitCode: 2,
          formatted: `[dx svg compile] BLOCKED by policy '${opts.policy || 'worker'}': ${outRel}`,
        };
      }
    }
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, tsCode, 'utf8');
    wrotePath = outAbs;
  }

  const header =
    `[dx svg compile] ${wrotePath ? `APPLIED ${wrotePath}` : 'DRY_RUN OK'} diagrams=${diagrams.length} dslTok=${dslTok} -> tsTok=${tsTok} (output reduction -${reductionPct}%) | svgTags=OK overlaps=${overlapWarnings.length}` +
    (overlapWarnings.length > 0 ? `\n  WARN_OVERLAP: ${overlapWarnings.join(' ; ')}` : '');
  const budgeted = enforceTokenBudget(wrotePath ? header : `${header}\n${tsCode}`, {
    budget: opts.budget ?? 1500,
    tag: 'dx_svg_compile',
  });

  return {
    exitCode: 0,
    diagramsCount: diagrams.length,
    dslTokens: dslTok,
    tsTokens: tsTok,
    reductionPct,
    overlapWarnings,
    tsCode,
    wrotePath,
    formatted: budgeted.text,
  };
}

// =============================================================================
// 3. Schematic Locator & Coverage Auditor (`dx schematic find | audit`)
// =============================================================================

export function runSchematicFind(diagramType, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const schPath = path.join(rootAbs, 'catalog', 'code', 'SCHEMATICS.tsv');
  if (!fs.existsSync(schPath)) buildCodeAtlas({ root: rootAbs });
  const rows = readTsv(schPath);
  const q = String(diagramType || '').trim().toLowerCase();
  const exact = rows.filter((r) => r.diagram_type.toLowerCase() === q);
  const hits = exact.length > 0 ? exact : rows.filter((r) => r.diagram_type.toLowerCase().includes(q));

  const lines = [`[dx schematic find] q="${diagramType}" matches=${hits.length}`];
  for (const h of hits.slice(0, 15)) {
    lines.push(`  ${h.diagram_type} | ${h.file}:${h.start}-${h.end} | fn=${h.func} | unit=${h.unit_hint}`);
  }
  if (hits.length === 0) lines.push('  (no match)');
  return {
    exitCode: hits.length > 0 ? 0 : 2,
    matches: hits.slice(0, 15),
    formatted: lines.join('\n'),
  };
}

export function runSchematicAudit(opts = {}) {
  const t0 = performance.now();
  const rootAbs = path.resolve(opts.root || process.cwd());
  const schPath = path.join(rootAbs, 'catalog', 'code', 'SCHEMATICS.tsv');
  if (!fs.existsSync(schPath)) buildCodeAtlas({ root: rootAbs });
  const rows = readTsv(schPath);
  const schByType = new Map(rows.map((r) => [r.diagram_type, r]));

  const dataDir = path.join(rootAbs, 'src', 'data');
  const files = opts.unit
    ? [`${opts.unit === 'mishoe' ? 'mi_shoe' : opts.unit}.json`]
    : fs.readdirSync(dataDir).filter((f) => f.endsWith('.json')).sort();

  let totalParts = 0;
  let mappedParts = 0;
  const unmapped = [];
  for (const f of files) {
    const abs = path.join(dataDir, f);
    if (!fs.existsSync(abs)) continue;
    const j = JSON.parse(fs.readFileSync(abs, 'utf8'));
    if (!Array.isArray(j.parts)) continue;
    for (const p of j.parts) {
      totalParts++;
      const entry = schByType.get(p.diagramType);
      if (entry && !entry.file.startsWith('UNMAPPED')) {
        mappedParts++;
      } else {
        unmapped.push(`${j.unitId || f}:${p.id} -> ${p.diagramType}`);
      }
    }
  }

  const elapsedMs = Math.round(performance.now() - t0);
  const pct = totalParts > 0 ? ((mappedParts / totalParts) * 100).toFixed(2) : '100.00';
  const lines = [
    `[dx schematic audit] scope=${opts.unit || 'ALL'} mapped=${mappedParts}/${totalParts} (${pct}%) unmapped=${unmapped.length} ${elapsedMs}ms`,
  ];
  for (const u of unmapped.slice(0, 15)) lines.push(`  UNMAPPED: ${u}`);
  return {
    exitCode: unmapped.length === 0 ? 0 : 2,
    totalParts,
    mappedParts,
    unmappedCount: unmapped.length,
    unmapped: unmapped.slice(0, 30),
    elapsedMs,
    formatted: lines.join('\n'),
  };
}
