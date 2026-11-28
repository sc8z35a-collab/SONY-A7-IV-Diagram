/**
 * THE LAST EXAM V1.1 — Full Transitive Kernel & Physics Dependency Closure (`kernel_closure.mjs`)
 *
 * Closes the transitive dependency hash gap where editing an engine file, Python solver script,
 * C++17 native binary, shared physics table (`material_physics.mjs`), spatial extractor, or
 * shared CAD primitive (`cad_primitives.ts`, `flow_pose_loader.ts`) previously did not invalidate
 * existing「V1.1証明」certificates!
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const KERNEL_CLOSURE_ROOTS = Object.freeze([
  'scripts/exam.mjs',
  'scripts/exam_setup.sh',
  'scripts/exam',
  'scripts/spatial_engine',
  'src/core/cad_primitives.ts',
  'src/core/flow_pose_loader.ts',
  'src/core/v2_unit_compiler.ts',
  'src/core/v11_seal_verifier.ts',
]);

const SKIP_NAMES = new Set(['__pycache__', '.build_hashes.json', 'node_modules', '.DS_Store']);

function collectFilesSorted(absPath, repoRoot, out) {
  if (!fs.existsSync(absPath)) return;
  const st = fs.lstatSync(absPath);
  if (st.isFile()) {
    out.push(path.relative(repoRoot, absPath).replace(/\\/g, '/'));
    return;
  }
  if (!st.isDirectory()) return;
  const entries = fs.readdirSync(absPath, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const e of entries) {
    if (SKIP_NAMES.has(e.name) || e.name.endsWith('.pyc')) continue;
    const child = path.join(absPath, e.name);
    if (e.isDirectory()) collectFilesSorted(child, repoRoot, out);
    else if (e.isFile()) out.push(path.relative(repoRoot, child).replace(/\\/g, '/'));
  }
}

/**
 * Compute full deterministic SHA-256 over the entire transitive EXAM V1.1 verification kernel
 * (all JS/MJS/PY/C++17 sources + compiled native binaries + spatial extractor + shared core primitives).
 */
export function computeFullExamKernelClosure(repoRoot) {
  const rels = [];
  for (const rootRel of KERNEL_CLOSURE_ROOTS) {
    collectFilesSorted(path.resolve(repoRoot, rootRel), repoRoot, rels);
  }
  // Exclude compiled binaries only if missing (when present, ALWAYS hash all 6 native binaries too!)
  const uniq = [...new Set(rels)].sort();
  const h = crypto.createHash('sha256');
  h.update(`TLX11_KERNEL_CLOSURE|v1.1|files=${uniq.length}\n`);
  for (const rel of uniq) {
    const abs = path.join(repoRoot, rel);
    try {
      const buf = fs.readFileSync(abs);
      const fSha = crypto.createHash('sha256').update(buf).digest('hex');
      h.update(`${rel}|${buf.length}|${fSha}\n`);
    } catch {
      h.update(`ERR|${rel}\n`);
    }
  }
  return {
    sha256: h.digest('hex'),
    fileCount: uniq.length,
    files: uniq,
  };
}
