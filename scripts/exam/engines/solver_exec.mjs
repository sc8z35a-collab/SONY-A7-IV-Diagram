/**
 * Shared external solver executor & strict environment verifier for THE LAST EXAM V1.
 * Guarantees `/usr/bin/python3` (system apt scientific stack) and resolves OpenFOAM paths cleanly.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, '../../..');
export const NATIVE_BIN_DIR = path.join(REPO_ROOT, 'scripts/exam/native/bin');
export const ENGINES_DIR = __dirname;
export const SYS_PY = fs.existsSync('/usr/bin/python3') ? '/usr/bin/python3' : 'python3';
export const MANIFEST_PATH = '/tmp/tlx_env_manifest.json';

export function getNativeBin(name) {
  return path.join(NATIVE_BIN_DIR, name);
}

/**
 * Resolve OpenFOAM environment variables dynamically from Ubuntu 24.04 openfoam package.
 */
export function resolveOpenFoamEnv() {
  const candidates = [
    '/usr/lib/openfoam/openfoam1912',
    '/usr/share/openfoam',
  ];
  let foamRoot = null;
  let binDir = null;
  for (const base of candidates) {
    const bd = path.join(base, 'platforms/linux64GccDPInt32Opt/bin');
    if (fs.existsSync(path.join(bd, 'buoyantSimpleFoam'))) {
      foamRoot = base;
      binDir = bd;
      break;
    }
  }
  if (!binDir && fs.existsSync('/usr/lib/openfoam')) {
    const subdirs = fs.readdirSync('/usr/lib/openfoam');
    for (const sd of subdirs) {
      const base = path.join('/usr/lib/openfoam', sd);
      const bd = path.join(base, 'platforms/linux64GccDPInt32Opt/bin');
      if (fs.existsSync(path.join(bd, 'buoyantSimpleFoam'))) {
        foamRoot = base;
        binDir = bd;
        break;
      }
    }
  }
  const env = { ...process.env };
  if (foamRoot && binDir) {
    const libDir = path.join(foamRoot, 'platforms/linux64GccDPInt32Opt/lib');
    env.WM_PROJECT_DIR = foamRoot;
    env.FOAM_ETC = path.join(foamRoot, 'etc');
    env.PATH = `${binDir}:${env.PATH || ''}`;
    env.LD_LIBRARY_PATH = `${libDir}:${path.join(libDir, 'dummy')}:${path.join(libDir, 'openmpi-system')}:${env.LD_LIBRARY_PATH || ''}`;
  }
  return { found: Boolean(binDir), foamRoot, binDir, env };
}

export async function runExternal(cmd, args, opts = {}) {
  const timeout = (opts.timeoutSec || 180) * 1000;
  const maxBuffer = opts.maxBuffer || 32 * 1024 * 1024;
  try {
    const { stdout, stderr } = await execFileAsync(cmd, args, {
      cwd: opts.cwd || REPO_ROOT,
      env: opts.env || process.env,
      timeout,
      maxBuffer,
      encoding: 'utf8',
    });
    return { ok: true, code: 0, stdout, stderr };
  } catch (err) {
    return {
      ok: false,
      code: typeof err.code === 'number' ? err.code : 1,
      stdout: err.stdout || '',
      stderr: err.stderr || String(err.message || err),
    };
  }
}

export async function runSysPyJson(scriptName, args, opts = {}) {
  const scriptPath = path.isAbsolute(scriptName)
    ? scriptName
    : path.join(ENGINES_DIR, scriptName);
  const res = await runExternal(SYS_PY, [scriptPath, ...args], opts);
  if (!res.ok) {
    throw new Error(`Python solver ${scriptName} failed (code=${res.code}): ${(res.stderr || res.stdout).slice(0, 600)}`);
  }
  const trimmed = res.stdout.trim();
  const lastBrace = trimmed.lastIndexOf('}');
  const firstBrace = trimmed.indexOf('{');
  if (firstBrace < 0 || lastBrace < firstBrace) {
    throw new Error(`Python solver ${scriptName} emitted non-JSON output: ${trimmed.slice(0, 300)}`);
  }
  return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
}

export function loadEnvManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return null;
  }
}

export const REQUIRED_SOLVER_COUNT = 48;

export function assertAllSolversReady() {
  const m = loadEnvManifest();
  if (!m || !m.all_ready || (m.total_count || 0) < REQUIRED_SOLVER_COUNT || (m.ok_count || 0) < REQUIRED_SOLVER_COUNT) {
    const missing = m?.solvers
      ? Object.entries(m.solvers).filter(([, v]) => !v.ok).map(([k]) => k)
      : ['manifest_missing'];
    if (m && (m.total_count || 0) < REQUIRED_SOLVER_COUNT) missing.push(`need_${REQUIRED_SOLVER_COUNT}_solvers`);
    return { ok: false, ready: m?.ok_count || 0, total: Math.max(REQUIRED_SOLVER_COUNT, m?.total_count || REQUIRED_SOLVER_COUNT), missing };
  }
  return { ok: true, ready: m.ok_count, total: m.total_count, missing: [] };
}
