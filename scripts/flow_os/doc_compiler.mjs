/**
 * FLOW V1 OS — Strict 2-Book AI Documentation Validator & Surgical Section Reader
 * Enforces:
 *   1. Exactly 2 operational/design `.md` manuals exist in the repo (excluding app-content assets)
 *   2. Book 1 (envManual) covers 100% of required tools, rules, security layers & Human-Only lock
 *   3. Both books stay strictly within their calibrated BPE token budgets
 */

import fs from 'node:fs';
import path from 'node:path';
import { EXIT_BLOCKED, EXIT_OK } from './kernel_config.mjs';
import { estimateTokens } from './wire_protocol.mjs';
import { verifyAutoDocBlocks } from './doc_sync.mjs';

function walkMarkdown(dirAbs, rootAbs, skipDirs, out = []) {
  if (!fs.existsSync(dirAbs)) return out;
  for (const e of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    if (e.name.startsWith('.git')) continue;
    const p = path.join(dirAbs, e.name);
    const rel = path.relative(rootAbs, p).replace(/\\/g, '/');
    if (e.isDirectory()) {
      const top = rel.split('/')[0];
      if (skipDirs.has(top) || skipDirs.has(e.name)) continue;
      walkMarkdown(p, rootAbs, skipDirs, out);
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) {
      // Skip portable OS starter templates under scripts/flow_os/templates/
      if (rel.startsWith('scripts/flow_os/templates/')) continue;
      out.push(rel);
    }
  }
  return out;
}

export async function auditTwoBooks(ctx, { strict = false } = {}) {
  const books = ctx.cfg.books || {};
  const envRel = books.envManual || 'AGENTS.md';
  const domRel = books.domainManual || 'README.md';
  const maxEnvTok = Number(books.maxEnvTokens || 4500);
  const maxDomTok = Number(books.maxDomainTokens || 5500);
  const skipDirs = new Set(books.contentAssetDirs || ['reports', 'blueprints', 'docs', 'node_modules', 'dist', '.git']);
  const requiredTokens = books.requiredEnvTokens || [];

  const mdFiles = walkMarkdown(ctx.repoRoot, ctx.repoRoot, skipDirs).sort();
  const expected = new Set([envRel, domRel]);
  const extraManuals = mdFiles.filter((f) => !expected.has(f));
  const missingBooks = [...expected].filter((f) => !fs.existsSync(path.join(ctx.repoRoot, f)));

  const stats = {};
  for (const rel of [envRel, domRel]) {
    const abs = path.join(ctx.repoRoot, rel);
    if (fs.existsSync(abs)) {
      const raw = fs.readFileSync(abs, 'utf8');
      stats[rel] = {
        exists: true,
        bytes: Buffer.byteLength(raw, 'utf8'),
        lines: raw.split('\n').length,
        tokens: estimateTokens(raw),
      };
    } else {
      stats[rel] = { exists: false, bytes: 0, lines: 0, tokens: 0 };
    }
  }

  const missingRequired = [];
  if (stats[envRel]?.exists) {
    const envRaw = fs.readFileSync(path.join(ctx.repoRoot, envRel), 'utf8');
    for (const tok of requiredTokens) {
      if (!envRaw.includes(tok)) missingRequired.push(tok);
    }
  }

  const violations = [];
  if (missingBooks.length > 0) violations.push(`MISSING_BOOKS:${missingBooks.join(',')}`);
  if (extraManuals.length > 0) violations.push(`EXTRA_MANUALS(${extraManuals.length}):${extraManuals.join(',')}`);
  if (stats[envRel].tokens > maxEnvTok) violations.push(`ENV_TOK_OVER:${stats[envRel].tokens}>${maxEnvTok}`);
  if (stats[domRel].tokens > maxDomTok) violations.push(`DOM_TOK_OVER:${stats[domRel].tokens}>${maxDomTok}`);
  if (missingRequired.length > 0) violations.push(`ENV_MISSING_KEYS:${missingRequired.join(',')}`);
  if (strict && mdFiles.length !== 2) violations.push(`STRICT_BOOK_COUNT:${mdFiles.length}!=2`);

  // Autonomous code-vs-doc metric drift verification (`@FLOW_AUTO:*` markers -> EXIT 2 on ANY mismatch!)
  const driftRes = await verifyAutoDocBlocks(ctx);
  if (!driftRes.ok) {
    for (const d of driftRes.drifts) violations.push(d);
  }

  return {
    ok: violations.length === 0,
    exitCode: violations.length === 0 ? EXIT_OK : EXIT_BLOCKED,
    bookCount: mdFiles.length,
    books: [envRel, domRel],
    foundManuals: mdFiles,
    extraManuals,
    missingBooks,
    missingRequired,
    checkedAutoBlocks: driftRes.checkedBlocks,
    stats,
    totalTokens: stats[envRel].tokens + stats[domRel].tokens,
    totalBytes: stats[envRel].bytes + stats[domRel].bytes,
    violations,
  };
}

/**
 * Surgical section reader for Book 1 or Book 2 by `@SECTION_TAG` (< 250 tokens).
 */
export function readBookSection(ctx, bookNum, tag) {
  const books = ctx.cfg.books || {};
  const rel = String(bookNum) === '2' ? (books.domainManual || 'README.md') : (books.envManual || 'AGENTS.md');
  const abs = path.join(ctx.repoRoot, rel);
  if (!fs.existsSync(abs)) {
    return { ok: false, text: `DOC_ERR|missing=${rel}` };
  }
  const lines = fs.readFileSync(abs, 'utf8').split('\n');
  if (!tag || tag === 'toc') {
    const headers = lines
      .map((l, idx) => ({ l, line: idx + 1 }))
      .filter((x) => x.l.startsWith('## ') || x.l.startsWith('@'));
    return {
      ok: true,
      file: rel,
      text: headers.map((h) => `L${h.line}:${h.l}`).join('\n'),
    };
  }
  const needle = tag.toUpperCase();
  let start = -1;
  let end = lines.length;
  for (let i = 0; i < lines.length; i++) {
    const up = lines[i].toUpperCase();
    if (start < 0) {
      if ((lines[i].startsWith('## ') || lines[i].startsWith('@')) && up.includes(needle)) {
        start = i;
      }
    } else if (i > start && (lines[i].startsWith('## ') || (lines[i].startsWith('@') && !lines[i].startsWith('@INV') && !lines[i].startsWith('@RULE')))) {
      end = i;
      break;
    }
  }
  if (start < 0) {
    return { ok: false, file: rel, text: `DOC_ERR|section_not_found=${tag}|file=${rel}` };
  }
  return {
    ok: true,
    file: rel,
    start: start + 1,
    end,
    text: lines.slice(start, end).join('\n'),
  };
}
