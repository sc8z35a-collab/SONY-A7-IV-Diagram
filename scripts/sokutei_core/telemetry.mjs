/**
 * sokutei — OS / Node / V8 / GC / Event-Loop / Chrome CDP Precision Load Telemetry Sampler
 * Zero external dependencies. Samples /proc/<pid> RSS & CPU jiffies, V8 heap, GC pauses,
 * event-loop delay, and nanosecond monotonic timings.
 */

import fs from 'node:fs';
import os from 'node:os';
import v8 from 'node:v8';
import { spawn, execFileSync } from 'node:child_process';
import { PerformanceObserver, monitorEventLoopDelay } from 'node:perf_hooks';
import { roundNum, summarizeSamples } from './stats.mjs';

const CLK_TCK = 100; // Standard Linux USER_HZ (100 Hz)

export function hrMs(startNs) {
  return Number(process.hrtime.bigint() - startNs) / 1e6;
}

export function findChromeBinary() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function safeExec(cmd, args, cwd) {
  try {
    return execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

export function collectEnvironmentFingerprint(rootDir) {
  const cpus = os.cpus();
  const chromeBin = findChromeBinary();
  return {
    timestamp: new Date().toISOString(),
    platform: `${os.platform()} ${os.release()} (${os.arch()})`,
    cpuModel: cpus[0]?.model || 'unknown',
    cpuCores: cpus.length,
    totalMemGb: roundNum(os.totalmem() / (1024 ** 3), 2),
    nodeVersion: process.version,
    chromeVersion: chromeBin ? safeExec(chromeBin, ['--version'], rootDir) : null,
    gitSha: safeExec('git', ['rev-parse', '--short=10', 'HEAD'], rootDir),
    gitBranch: safeExec('git', ['rev-parse', '--abbrev-ref', 'HEAD'], rootDir),
    gitDirty: Boolean(safeExec('git', ['status', '--porcelain'], rootDir)),
  };
}

/**
 * Sample RSS (kB) and CPU ticks for a PID and its immediate children from Linux /proc.
 */
function sampleProcTree(rootPid) {
  let rssKb = 0;
  let hwmKb = 0;
  let utimeTicks = 0;
  let stimeTicks = 0;

  const pids = new Set([rootPid]);
  try {
    const childrenTxt = fs.readFileSync(`/proc/${rootPid}/task/${rootPid}/children`, 'utf8').trim();
    if (childrenTxt) {
      for (const tok of childrenTxt.split(/\s+/)) {
        const p = Number.parseInt(tok, 10);
        if (p > 0) pids.add(p);
      }
    }
  } catch {
    // Process may have exited or children file unavailable
  }

  for (const pid of pids) {
    try {
      const status = fs.readFileSync(`/proc/${pid}/status`, 'utf8');
      const mRss = status.match(/^VmRSS:\s+(\d+)\s+kB/m);
      const mHwm = status.match(/^VmHWM:\s+(\d+)\s+kB/m);
      if (mRss) rssKb += Number.parseInt(mRss[1], 10);
      if (mHwm) hwmKb += Number.parseInt(mHwm[1], 10);
    } catch {
      // ignore exited pid
    }
    try {
      const stat = fs.readFileSync(`/proc/${pid}/stat`, 'utf8');
      const rparen = stat.lastIndexOf(')');
      if (rparen > 0) {
        const fields = stat.slice(rparen + 2).split(' ');
        // fields[11]=utime, fields[12]=stime, fields[13]=cutime, fields[14]=cstime
        utimeTicks += (Number.parseInt(fields[11], 10) || 0) + (Number.parseInt(fields[13], 10) || 0);
        stimeTicks += (Number.parseInt(fields[12], 10) || 0) + (Number.parseInt(fields[14], 10) || 0);
      }
    } catch {
      // ignore exited pid
    }
  }

  return { rssKb, hwmKb, utimeTicks, stimeTicks };
}

/**
 * Execute and accurately profile a child process (wall ms, CPU user/sys ms, CPU%, Peak RSS MB).
 */
export function measureProcess(cmd, args, opts = {}) {
  const cwd = opts.cwd || process.cwd();
  const env = opts.env ? { ...process.env, ...opts.env } : process.env;
  const sampleIntervalMs = opts.sampleIntervalMs ?? 25;
  const timeoutMs = opts.timeoutMs ?? 600000;
  const maxCaptureBytes = opts.maxCaptureBytes ?? 4 * 1024 * 1024;

  return new Promise((resolve, reject) => {
    const t0 = process.hrtime.bigint();
    const child = spawn(cmd, args, {
      cwd,
      env,
      shell: Boolean(opts.shell),
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      if (stdout.length < maxCaptureBytes) stdout += chunk.toString('utf8');
    });
    child.stderr.on('data', (chunk) => {
      if (stderr.length < maxCaptureBytes) stderr += chunk.toString('utf8');
    });

    let peakRssKb = 0;
    let lastUTicks = 0;
    let lastSTicks = 0;

    const sample = () => {
      if (!child.pid) return;
      const s = sampleProcTree(child.pid);
      if (s.rssKb > peakRssKb) peakRssKb = s.rssKb;
      if (s.hwmKb > peakRssKb) peakRssKb = s.hwmKb;
      if (s.utimeTicks > lastUTicks) lastUTicks = s.utimeTicks;
      if (s.stimeTicks > lastSTicks) lastSTicks = s.stimeTicks;
    };

    const sampler = setInterval(sample, sampleIntervalMs);
    const killer = setTimeout(() => {
      try { child.kill('SIGKILL'); } catch {}
    }, timeoutMs);

    child.on('error', (err) => {
      clearInterval(sampler);
      clearTimeout(killer);
      reject(err);
    });

    child.on('close', (code, signal) => {
      sample();
      clearInterval(sampler);
      clearTimeout(killer);
      const wallMs = hrMs(t0);
      const cpuUserMs = (lastUTicks / CLK_TCK) * 1000;
      const cpuSysMs = (lastSTicks / CLK_TCK) * 1000;
      const cpuTotalMs = cpuUserMs + cpuSysMs;
      const cpuPct = wallMs > 0.1 ? (cpuTotalMs / wallMs) * 100 : 0;
      const cores = Math.max(1, os.cpus().length);
      const parallelEffPct = Math.min(100, (cpuPct / (cores * 100)) * 100);

      resolve({
        exitCode: code ?? (signal ? 128 : 1),
        signal: signal || null,
        wallMs: roundNum(wallMs, 3),
        cpuUserMs: roundNum(cpuUserMs, 2),
        cpuSysMs: roundNum(cpuSysMs, 2),
        cpuTotalMs: roundNum(cpuTotalMs, 2),
        cpuPct: roundNum(cpuPct, 1),
        parallelEffPct: roundNum(parallelEffPct, 1),
        peakRssMb: roundNum(peakRssKb / 1024, 2),
        stdout,
        stderr,
      });
    });
  });
}

/**
 * Profile an in-process async or sync workload with nanosecond wall time, CPU usage,
 * V8 heap delta, GC pause tracking, and event-loop lag monitoring.
 */
export async function measureInProcess(fn) {
  let gcCount = 0;
  let gcMs = 0;
  let obs = null;
  try {
    obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        gcCount++;
        gcMs += entry.duration;
      }
    });
    obs.observe({ entryTypes: ['gc'] });
  } catch {
    obs = null;
  }

  let elMonitor = null;
  try {
    elMonitor = monitorEventLoopDelay({ resolution: 5 });
    elMonitor.enable();
  } catch {
    elMonitor = null;
  }

  const heapBefore = v8.getHeapStatistics();
  const ruBefore = process.resourceUsage();
  const t0 = process.hrtime.bigint();

  let value;
  try {
    value = await fn();
  } finally {
    if (obs) obs.disconnect();
    if (elMonitor) elMonitor.disable();
  }

  const wallMs = hrMs(t0);
  const ruAfter = process.resourceUsage();
  const heapAfter = v8.getHeapStatistics();

  const cpuUserMs = (ruAfter.userCPUTime - ruBefore.userCPUTime) / 1000;
  const cpuSysMs = (ruAfter.systemCPUTime - ruBefore.systemCPUTime) / 1000;
  const elLagP50Ms = elMonitor ? elMonitor.percentile(50) / 1e6 : 0;
  const elLagP99Ms = elMonitor ? elMonitor.percentile(99) / 1e6 : 0;

  return {
    wallMs: roundNum(wallMs, 3),
    cpuUserMs: roundNum(cpuUserMs, 2),
    cpuSysMs: roundNum(cpuSysMs, 2),
    heapUsedMb: roundNum(heapAfter.used_heap_size / (1024 * 1024), 2),
    heapDeltaMb: roundNum((heapAfter.used_heap_size - heapBefore.used_heap_size) / (1024 * 1024), 3),
    peakRssMb: roundNum(ruAfter.maxRSS / 1024, 2),
    gcCount,
    gcMs: roundNum(gcMs, 3),
    elLagP50Ms: roundNum(elLagP50Ms, 3),
    elLagP99Ms: roundNum(elLagP99Ms, 3),
    value,
  };
}

/**
 * Run warmup + N statistical trials and return full summarized statistics + auxiliary telemetry.
 */
export async function runStatTrials({ warmup = 0, runs = 1, fn, unit = 'ms', decimals = 3 }) {
  for (let w = 0; w < warmup; w++) {
    await fn({ isWarmup: true, iter: w });
  }
  const values = [];
  const extras = [];
  for (let r = 0; r < runs; r++) {
    const res = await fn({ isWarmup: false, iter: r });
    if (typeof res === 'number') {
      values.push(res);
    } else if (res && typeof res.value === 'number') {
      values.push(res.value);
      extras.push(res);
    }
  }
  return {
    stat: summarizeSamples(values, unit, decimals),
    extras,
  };
}
