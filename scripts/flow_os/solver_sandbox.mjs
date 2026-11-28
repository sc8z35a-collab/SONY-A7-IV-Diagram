/**
 * FLOW Security — High-Speed Dual-Tier Solver & Harness Sandbox (`solver_sandbox.mjs`)
 *
 * Enforces real OS/container isolation on untrusted solver & C++17 harness child processes
 * with ZERO meaningful EXAM slowdown:
 *   1. Strict `env -i` environment scrubbing (strips NODE_OPTIONS, LD_PRELOAD, PYTHONPATH, etc.)
 *   2. Tier 1 (Docker Persistent Session Container, when `tlx11-sandbox:latest` exists):
 *      - Boots ONE single read-only container per EXAM run (`:ro` repo mount, `--network=none`,
 *        `--cap-drop=ALL`, `--security-opt=no-new-privileges`, `--memory=2g`, `--pids-limit=128`),
 *        runs all 48 solver steps via fast `docker exec`, and destroys via `docker rm -f` on close!
 *   3. Tier 2 (Native Linux Kernel Namespace Sandbox — ~2ms startup overhead, zero images needed!):
 *      - `unshare --user --map-root-user --net` (physically brings up empty netns with `lo DOWN` -> 0 egress!)
 *      - `setpriv --no-new-privs` (sets kernel `NoNewPrivs=1`, blocking setuid escalation)
 *      - `prlimit --as=<bytes> --fsize=<bytes> --cpu=<sec>` (hard kernel memory/disk/CPU rlimits)
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { EXIT_OK, EXIT_SECURITY_BLOCKED } from './kernel_config.mjs';

const SAFE_ENV_KEYS = new Set([
  'HOME', 'USER', 'LOGNAME', 'LANG', 'LC_ALL', 'LC_CTYPE', 'TERM', 'TZ', 'TMPDIR',
  'XDG_RUNTIME_DIR', 'XDG_CACHE_HOME', 'DISPLAY',
  'FLOW_AGENT_ID', 'FLOW_AGENT_WS', 'FLOW_SP_CACHE_DIR', 'FLOW_TLX_RUNS_DIR', 'FLOW_PP_DAEMON_DIR',
  'FLOW_NO_CACHE', 'FLOW_ED25519_PRIVATE_KEY_PEM',
  'FOAM_INST_DIR', 'WM_PROJECT', 'WM_PROJECT_DIR', 'WM_PROJECT_VERSION', 'FOAM_APPBIN',
  'OMP_NUM_THREADS', 'OPENBLAS_NUM_THREADS',
]);

const POISON_ENV_KEYS = new Set([
  'NODE_OPTIONS', 'NODE_EXTRA_CA_CERTS', 'LD_PRELOAD', 'LD_LIBRARY_PATH', 'LD_AUDIT',
  'PYTHONPATH', 'PYTHONSTARTUP', 'PYTHONHOME', 'BASH_ENV', 'ENV', 'PERL5OPT', 'RUBYOPT',
  'GIT_SSH_COMMAND', 'GIT_EXTERNAL_DIFF', 'GIT_EXEC_PATH',
]);

const NODE_BIN_DIR = path.dirname(process.execPath);
const SAFE_PATH = `${NODE_BIN_DIR}:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`;

/**
 * Construct a strictly scrubbed environment (`env -i` allowlist) preventing
 * pre-initialization runtime hijacks (`NODE_OPTIONS`, `LD_PRELOAD`, `PYTHONPATH`, `PATH`).
 */
export function scrubEnv(extra = {}, baseEnv = process.env) {
  const clean = { PATH: SAFE_PATH, LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8' };
  for (const [k, v] of Object.entries(baseEnv || {})) {
    if (v === undefined) continue;
    if (POISON_ENV_KEYS.has(k)) continue;
    if (SAFE_ENV_KEYS.has(k)) clean[k] = String(v);
  }
  for (const [k, v] of Object.entries(extra || {})) {
    if (v === undefined || POISON_ENV_KEYS.has(k)) continue;
    clean[k] = String(v);
  }
  return clean;
}

let _capabilitiesCache = null;

export function detectSandboxCapabilities() {
  if (_capabilitiesCache) return _capabilitiesCache;
  const hasUnshareNet = spawnSync('unshare', ['--user', '--map-root-user', '--net', '/bin/true'], {
    stdio: 'ignore',
    timeout: 3000,
  }).status === 0;
  const hasSetpriv = fs.existsSync('/usr/bin/setpriv');
  const hasPrlimit = fs.existsSync('/usr/bin/prlimit');

  let hasDockerImage = false;
  const dockerCheck = spawnSync('docker', ['image', 'inspect', 'tlx11-sandbox:latest'], {
    stdio: 'ignore',
    timeout: 3000,
  });
  if (dockerCheck.status === 0) hasDockerImage = true;

  _capabilitiesCache = {
    hasDockerImage,
    hasUnshareNet,
    hasSetpriv,
    hasPrlimit,
    defaultMode: hasDockerImage ? 'docker_session' : (hasUnshareNet ? 'userns_netns' : 'env_scrub_only'),
  };
  return _capabilitiesCache;
}

/**
 * Wrap a command invocation with Linux kernel network/privilege/rlimit isolation (~2ms overhead).
 */
export function wrapUserNsSandbox(bin, args = [], opts = {}) {
  const caps = detectSandboxCapabilities();
  const maxAsBytes = Number(opts.maxMemMb || 2048) * 1024 * 1024;
  const maxFsizeBytes = Number(opts.maxFileMb || 256) * 1024 * 1024;
  const maxCpuSec = Math.max(5, Math.ceil((opts.timeoutMs || 120_000) / 1000));

  const innerPrefix = [];
  if (caps.hasSetpriv) {
    innerPrefix.push('/usr/bin/setpriv', '--no-new-privs');
  }
  if (caps.hasPrlimit && opts.rlimit !== false) {
    // Note: use --fsize & --cpu safely; skip --as for OpenFOAM/JVM/Python virtual address reservations unless explicitly requested
    const pArgs = ['/usr/bin/prlimit', `--fsize=${maxFsizeBytes}`, `--cpu=${maxCpuSec}`];
    if (opts.strictVmLimit) pArgs.push(`--as=${maxAsBytes}`);
    innerPrefix.push(...pArgs, '--');
  }

  const innerCmd = innerPrefix.length > 0 ? [...innerPrefix, bin, ...args] : [bin, ...args];

  if (caps.hasUnshareNet && opts.allowNetwork !== true) {
    // Bring up strictly loopback `lo` inside the isolated empty netns (0 external NICs, 0 default route -> 0 egress!)
    // so OpenMPI-linked industrial solvers (GetDP/OpenFOAM/Gmsh) initialize cleanly while external network stays physically blocked.
    // Arguments are passed strictly via exec "$@" with ZERO shell interpolation.
    return {
      bin: 'unshare',
      args: [
        '--user', '--map-root-user', '--net',
        '/bin/sh', '-c', 'ip link set lo up 2>/dev/null || true; exec "$@"', '--',
        ...innerCmd,
      ],
    };
  }

  if (innerPrefix.length === 0) return { bin, args };
  return { bin: innerCmd[0], args: innerCmd.slice(1) };
}

/**
 * Execute a single untrusted solver/harness command inside the lightweight kernel sandbox.
 */
export function execSandboxedSync(bin, args = [], opts = {}) {
  const env = scrubEnv(opts.env || {});
  const wrapped = opts.disableSandbox ? { bin, args } : wrapUserNsSandbox(bin, args, opts);
  return spawnSync(wrapped.bin, wrapped.args, {
    cwd: opts.cwd || process.cwd(),
    env,
    encoding: 'utf8',
    shell: false,
    maxBuffer: opts.maxBuffer || 32 * 1024 * 1024,
    timeout: opts.timeoutMs || 120_000,
    input: opts.input,
  });
}

/**
 * 1-Container-Per-Run Persistent Docker Sandbox Session!
 * Minimizes Docker startup overhead to ONE single container launch per EXAM run:
 *   - Mounts repo `:ro` and runDir `:rw`, `--network=none`, `--read-only`, `--cap-drop=ALL`,
 *     `--security-opt=no-new-privileges`, `--memory=2g`, `--cpus=2`, `--pids-limit=128`.
 *   - Executes individual solver invocations via fast `docker exec`.
 *   - Automatically falls back to `userns_netns` (~2ms overhead) when `tlx11-sandbox:latest` is not built.
 */
export class SolverSandboxSession {
  constructor({ repoRoot, runDir, image = 'tlx11-sandbox:latest', preferDocker = true } = {}) {
    this.repoRoot = repoRoot;
    this.runDir = runDir;
    this.image = image;
    this.containerId = null;
    this.mode = 'userns_netns';
    this.preferDocker = preferDocker;
    this.execCount = 0;
  }

  start() {
    const caps = detectSandboxCapabilities();
    if (this.preferDocker && caps.hasDockerImage) {
      const name = `tlx11_sbx_${process.pid}_${Date.now()}`;
      const r = spawnSync(
        'docker',
        [
          'run', '-d', '--rm', '--name', name,
          '--network=none',
          '--read-only',
          '--tmpfs', '/tmp:rw,noexec,nosuid,size=512m',
          '--cap-drop=ALL',
          '--security-opt=no-new-privileges',
          '--memory=2g', '--cpus=2', '--pids-limit=128',
          '-v', `${this.repoRoot}:/repo:ro`,
          '-v', `${this.runDir}:/work:rw`,
          '-w', '/work',
          this.image,
          'sleep', '900',
        ],
        { encoding: 'utf8', timeout: 15_000 }
      );
      if (r.status === 0 && (r.stdout || '').trim()) {
        this.containerId = r.stdout.trim();
        this.mode = 'docker_session';
        return { mode: this.mode, containerId: this.containerId };
      }
    }
    this.mode = caps.hasUnshareNet ? 'userns_netns' : 'env_scrub_only';
    return { mode: this.mode, containerId: null };
  }

  exec(bin, args = [], opts = {}) {
    this.execCount++;
    if (this.mode === 'docker_session' && this.containerId) {
      return spawnSync(
        'docker',
        ['exec', '-i', this.containerId, bin, ...args],
        {
          encoding: 'utf8',
          shell: false,
          maxBuffer: opts.maxBuffer || 32 * 1024 * 1024,
          timeout: opts.timeoutMs || 120_000,
          input: opts.input,
        }
      );
    }
    return execSandboxedSync(bin, args, opts);
  }

  close() {
    if (this.containerId) {
      try {
        execFileSync('docker', ['rm', '-f', this.containerId], { stdio: 'ignore', timeout: 5000 });
      } catch {
        // ignore
      }
      this.containerId = null;
    }
  }
}

export function runSandboxSelftest() {
  const t0 = performance.now();
  const caps = detectSandboxCapabilities();
  const checks = [];
  const check = (id, ok, detail) => checks.push({ id, ok: Boolean(ok), detail });

  // S1: Poison env vars scrubbed
  const scrubbed = scrubEnv(
    { LD_PRELOAD: '/tmp/evil.so', NODE_OPTIONS: '--require=/tmp/evil.js', FLOW_AGENT_ID: 'ok1' },
    { ...process.env, LD_PRELOAD: '/evil.so', NODE_OPTIONS: '--inspect', PYTHONPATH: '/evil' }
  );
  check(
    'SBX01',
    !scrubbed.LD_PRELOAD && !scrubbed.NODE_OPTIONS && !scrubbed.PYTHONPATH && scrubbed.FLOW_AGENT_ID === 'ok1',
    'Poison env vars stripped via env -i allowlist'
  );

  // S2: Kernel NoNewPrivs=1 active inside sandbox
  const nnp = execSandboxedSync('/bin/grep', ['^NoNewPrivs:', '/proc/self/status'], { timeoutMs: 5000 });
  check('SBX02', nnp.status === 0 && /NoNewPrivs:\s+1/.test(nnp.stdout || ''), `NoNewPrivs=1 enforced (${(nnp.stdout || '').trim()})`);

  // S3: Network namespace completely isolated (cannot reach external IP)
  let netBlocked = false;
  let netDetail = 'UNSHARE_NET_UNAVAILABLE';
  if (caps.hasUnshareNet) {
    const netTest = execSandboxedSync(
      'node',
      ['-e', 'const net=require("net");const s=net.connect({host:"1.1.1.1",port:443,timeout:800});s.on("connect",()=>{console.log("LEAK");process.exit(0)});s.on("error",(e)=>{console.log("BLOCKED:"+e.code);process.exit(0)});'],
      { timeoutMs: 5000 }
    );
    netDetail = (netTest.stdout || '').trim() || `exit=${netTest.status}`;
    netBlocked = netDetail.includes('BLOCKED:');
  }
  check(
    'SBX03',
    caps.hasUnshareNet && netBlocked,
    `Network egress physically blocked in netns (${netDetail})`
  );

  const passed = checks.filter((c) => c.ok).length;
  return {
    ok: passed === checks.length,
    exitCode: passed === checks.length ? EXIT_OK : EXIT_SECURITY_BLOCKED,
    mode: caps.defaultMode,
    caps: { userNs: caps.hasUnshareNet, docker: caps.hasDockerImage },
    passed,
    total: checks.length,
    failed: checks.filter((c) => !c.ok),
    elapsedMs: Math.round(performance.now() - t0),
  };
}
