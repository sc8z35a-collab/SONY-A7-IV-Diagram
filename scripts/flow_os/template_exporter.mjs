/**
 * FLOW V1 OS — Portable Template Exporter & 30-Second Repository Initializer
 * Enables copying `scripts/flow_os/` into ANY Git repository (Node/TS/Python/Go/Rust/C++)
 * and bootstrapping the full 2-book AI OS + 12-layer security + parallel kernel + human-report in <30s.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  DEFAULT_FLOW_CONFIG,
  EXIT_OK,
  FLOW_OS_VERSION,
  atomicWriteSync,
  detectRepoProfile,
} from './kernel_config.mjs';

const FLOW_OS_DIR = path.dirname(new URL(import.meta.url).pathname);

function copyDirRecursive(srcDir, dstDir) {
  fs.mkdirSync(dstDir, { recursive: true });
  for (const e of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, e.name);
    const d = path.join(dstDir, e.name);
    if (e.isDirectory()) copyDirRecursive(s, d);
    else if (e.isFile()) fs.copyFileSync(s, d);
  }
}

function renderTemplate(tmplText, vars) {
  let out = tmplText;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{{${k}}}`, String(v));
  }
  return out;
}

/**
 * Initialize FLOW V1 OS inside `targetRoot` (auto-detecting language, build/test commands & branch).
 */
export function initFlowRepo(targetRoot, opts = {}) {
  const rootAbs = path.resolve(targetRoot);
  fs.mkdirSync(rootAbs, { recursive: true });
  const profile = detectRepoProfile(rootAbs);
  const projectName = opts.projectName || profile.projectName;
  const tmplDir = path.join(FLOW_OS_DIR, 'templates');

  const cfg = JSON.parse(JSON.stringify(DEFAULT_FLOW_CONFIG));
  cfg.projectName = projectName;
  cfg.defaultBranch = profile.defaultBranch;
  cfg.policies.integrator.checks = profile.checks;

  const rcPath = path.join(rootAbs, '.flowrc.json');
  if (opts.force || !fs.existsSync(rcPath)) {
    atomicWriteSync(rcPath, JSON.stringify(cfg, null, 2) + '\n');
  }

  const vars = {
    PROJECT_NAME: projectName,
    OS_VERSION: FLOW_OS_VERSION,
    DEFAULT_BRANCH: profile.defaultBranch,
    LANGS: profile.langs.join(',') || 'generic',
    CHECKS: profile.checks.join(' && ') || 'none',
  };

  const agentsPath = path.join(rootAbs, 'AGENTS.md');
  if (opts.force || !fs.existsSync(agentsPath)) {
    const t1 = fs.readFileSync(path.join(tmplDir, 'AGENTS.tmpl.md'), 'utf8');
    atomicWriteSync(agentsPath, renderTemplate(t1, vars));
  }

  const readmePath = path.join(rootAbs, 'README.md');
  if (opts.force || !fs.existsSync(readmePath)) {
    const t2 = fs.readFileSync(path.join(tmplDir, 'README.tmpl.md'), 'utf8');
    atomicWriteSync(readmePath, renderTemplate(t2, vars));
  }

  return {
    ok: true,
    exitCode: EXIT_OK,
    rootAbs,
    projectName,
    profile,
    filesWritten: ['.flowrc.json', 'AGENTS.md', 'README.md'],
  };
}

/**
 * Export a 100% repo-agnostic standalone FLOW V1 OS starter package to `outDir`.
 */
export function exportFlowTemplate(outDir, opts = {}) {
  const dstRoot = path.resolve(outDir);
  fs.mkdirSync(dstRoot, { recursive: true });
  const dstFlowOs = path.join(dstRoot, 'scripts', 'flow_os');
  copyDirRecursive(FLOW_OS_DIR, dstFlowOs);

  const initRes = initFlowRepo(dstRoot, {
    projectName: opts.projectName || 'flow-portable-starter',
    force: true,
  });

  // Minimal package.json so `node scripts/flow_os/flow.mjs` works as ESM immediately
  const pkgPath = path.join(dstRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    atomicWriteSync(
      pkgPath,
      JSON.stringify(
        {
          name: initRes.projectName,
          version: '1.0.0',
          private: true,
          type: 'module',
          scripts: {
            flow: 'node scripts/flow_os/flow.mjs',
          },
        },
        null,
        2
      ) + '\n'
    );
  }

  return {
    ok: true,
    exitCode: EXIT_OK,
    outDir: dstRoot,
    files: ['package.json', '.flowrc.json', 'AGENTS.md', 'README.md', 'scripts/flow_os/*'],
  };
}
