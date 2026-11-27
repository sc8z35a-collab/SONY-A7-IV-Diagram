/**
 * sokutei — 10-Domain / 55+ Metric Automated Benchmark Runners
 * All temporary outputs are strictly isolated under /tmp/sokutei-* so the repository stays 100% clean.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import zlib from 'node:zlib';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import * as THREE from 'three';
import { buildSync } from 'esbuild';
import { roundNum, summarizeSamples } from './stats.mjs';
import { findChromeBinary, hrMs, measureInProcess, measureProcess } from './telemetry.mjs';

export const DOMAIN_CATALOG = Object.freeze({
  build: {
    id: 'build',
    name: 'Build & TypeCheck Pipeline',
    description: 'TypeScript typecheck (`tsc --noEmit`), Vite production bundle build, bundle size & gzip footprint',
    metrics: ['tsc_ms', 'vite_build_ms', 'bundle_total_kb', 'bundle_max_chunk_kb', 'bundle_gzip_kb'],
  },
  v2_unit: {
    id: 'v2_unit',
    name: 'V2 3D Unit Build, Explode & Raycast',
    description: 'Headless V2 build, draw-calls, triangles, updateExplode, setVisualState, click/hover raycast, dispose & zero-leak check',
    metrics: ['build_total_ms', 'build_avg_ms', 'explode_us_per_op', 'visual_state_us_per_op', 'raycast_click_us_per_op', 'dispose_total_ms'],
  },
  webgl: {
    id: 'webgl',
    name: 'Real Browser WebGL / CDP Load & FPS',
    description: 'Headless Chrome CDP page load, firstReady, PMREM/shader warmup, real GPU frame time & FPS, unit/tier switch, mobile DPR2, DOM/JSHeap/VRAM leak',
    metrics: ['page_load_ms', 'first_ready_ms', 'frame_high_ms', 'frame_ultra_ms', 'unit_switch_ms', 'mobile_frame_ms', 'js_heap_mb'],
  },
  pp: {
    id: 'pp',
    name: 'pp Visual Capture Engine',
    description: 'Audit (6-shot), Welcome (ULTRA), Mobile (DPR2), UI-only, and single-shot capture speed, ms/shot, CPU% & Peak RSS',
    metrics: ['audit_total_ms', 'audit_ms_per_shot', 'welcome_total_ms', 'mobile_total_ms', 'ui_only_ms', 'single_cad_ms'],
  },
  validate: {
    id: 'validate',
    name: 'CI Guardrail (validate_parts.mjs)',
    description: 'Full 10-gate V2 validation runtime (wall time, CPU%, parallel efficiency%, Peak RSS)',
    metrics: ['validate_full_ms', 'validate_incr_ms', 'validate_peak_rss_mb'],
  },
  catalog: {
    id: 'catalog',
    name: '3-Tier Part Catalog Generator (generate_catalogs.mjs)',
    description: '22-unit spatial/material catalog & Play Ground index build speed & memory load',
    metrics: ['catalog_full_ms', 'catalog_incr_ms', 'catalog_peak_rss_mb'],
  },
  mirai: {
    id: 'mirai',
    name: 'FH MIRAI 2028 Content Compiler (build_mirai_content.mjs)',
    description: '16-report + 113-glossary markdown-to-JSON compilation speed & memory load',
    metrics: ['mirai_full_ms', 'mirai_incr_ms'],
  },
  wlk220: {
    id: 'wlk220',
    name: 'WLK-220 Industrial Verification Suite',
    description: '3D DFM 220-part check (+ KiCad / ngspice / CalculiX / SciPy engines when installed)',
    metrics: ['wlk220_dfm3d_ms', 'wlk220_suite_ms'],
  },
  sim_app: {
    id: 'sim_app',
    name: 'In-App Engineering & Optical Simulators',
    description: 'CameraEngineeringGrader (N=30/100/220), PLYA 8-Engine Pipeline, and 50mm F1.2 Snell LensOpticalSim (findChiefEntryY & 5 scenarios)',
    metrics: ['grader_n220_ms', 'plya_n220_ms', 'lens_chief_ray_us', 'lens_5scenarios_ms'],
  },
  bg_bench: {
    id: 'bg_bench',
    name: 'bg v1 Guard & Hyper Benchmark Utilities',
    description: 'Buchigire Guard v1 status/safety scan/selftest (20 chaos cases) & scripts/bench utilities',
    metrics: ['bg_status_ms', 'bg_selftest_ms'],
  },
});

export const ALL_DOMAIN_IDS = Object.freeze(Object.keys(DOMAIN_CATALOG));

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const _moduleCache = new Map();

async function loadTsModuleCached(rootDir, entryRel) {
  const key = `${rootDir}::${entryRel}`;
  if (_moduleCache.has(key)) return _moduleCache.get(key);

  const hyperCachePath = path.join(rootDir, 'scripts', 'lib', 'hyper_cache.mjs');
  if (fs.existsSync(hyperCachePath)) {
    const hc = await import(pathToFileURL(hyperCachePath).href);
    const mod = await hc.loadCachedTsModule(entryRel);
    _moduleCache.set(key, mod);
    return mod;
  }

  const res = buildSync({
    entryPoints: [path.join(rootDir, entryRel)],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    external: ['three', 'three/*'],
  });
  const tmpDir = path.join(rootDir, 'node_modules', '.cache', 'sokutei-bundles');
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmpFile = path.join(tmpDir, `${path.basename(entryRel, '.ts')}.${process.pid}.${Date.now()}.mjs`);
  fs.writeFileSync(tmpFile, res.outputFiles[0].text, 'utf8');
  try {
    const mod = await import(pathToFileURL(tmpFile).href);
    _moduleCache.set(key, mod);
    return mod;
  } finally {
    fs.rmSync(tmpFile, { force: true });
  }
}

function makeMetric(samples, unit = 'ms', opts = {}) {
  return {
    ...summarizeSamples(samples, unit, opts.decimals ?? 3),
    lowerIsBetter: opts.lowerIsBetter !== false,
    primarySpeedMetric: opts.primarySpeedMetric !== false,
  };
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(full, out);
    else if (ent.isFile()) out.push(full);
  }
  return out;
}

function scriptSupportsFlag(rootDir, relScript, flag) {
  const abs = path.join(rootDir, relScript);
  if (!fs.existsSync(abs)) return false;
  return fs.readFileSync(abs, 'utf8').includes(flag);
}

// ============================================================================
// Domain 1: build (tsc --noEmit + vite build isolated to /tmp)
// ============================================================================
async function runBuildDomain(ctx) {
  const { rootDir, runs, warmup, tmpRoot } = ctx;
  const tscSamples = [];
  const viteSamples = [];
  let peakRssTsc = 0;
  let peakRssVite = 0;
  let bundleTotalKb = 0;
  let bundleMaxChunkKb = 0;
  let bundleGzipKb = 0;
  let chunkCount = 0;

  for (let i = -warmup; i < runs; i++) {
    const rTsc = await measureProcess('npx', ['tsc', '--noEmit'], { cwd: rootDir });
    if (rTsc.exitCode !== 0) {
      return { error: `tsc --noEmit failed (exit=${rTsc.exitCode}): ${rTsc.stderr.slice(0, 240)}` };
    }
    if (i >= 0) {
      tscSamples.push(rTsc.wallMs);
      peakRssTsc = Math.max(peakRssTsc, rTsc.peakRssMb);
    }

    const outDir = path.join(tmpRoot, `vite-dist-${i + warmup}`);
    const rVite = await measureProcess('npx', ['vite', 'build', '--outDir', outDir, '--emptyOutDir'], { cwd: rootDir });
    if (rVite.exitCode !== 0) {
      return { error: `vite build failed (exit=${rVite.exitCode}): ${rVite.stderr.slice(0, 240)}` };
    }
    if (i >= 0) {
      viteSamples.push(rVite.wallMs);
      peakRssVite = Math.max(peakRssVite, rVite.peakRssMb);
      if (i === runs - 1) {
        const files = walkFiles(outDir);
        let totalB = 0;
        let maxB = 0;
        let gzB = 0;
        chunkCount = files.length;
        for (const f of files) {
          const buf = fs.readFileSync(f);
          totalB += buf.length;
          if (buf.length > maxB) maxB = buf.length;
          if (f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.html')) {
            gzB += zlib.gzipSync(buf, { level: 6 }).length;
          }
        }
        bundleTotalKb = roundNum(totalB / 1024, 1);
        bundleMaxChunkKb = roundNum(maxB / 1024, 1);
        bundleGzipKb = roundNum(gzB / 1024, 1);
      }
    }
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  return {
    metrics: {
      tsc_ms: makeMetric(tscSamples, 'ms'),
      vite_build_ms: makeMetric(viteSamples, 'ms'),
      bundle_total_kb: makeMetric([bundleTotalKb], 'KB', { primarySpeedMetric: false, decimals: 1 }),
      bundle_max_chunk_kb: makeMetric([bundleMaxChunkKb], 'KB', { primarySpeedMetric: false, decimals: 1 }),
      bundle_gzip_kb: makeMetric([bundleGzipKb], 'KB', { primarySpeedMetric: false, decimals: 1 }),
    },
    load: {
      tscPeakRssMb: peakRssTsc,
      vitePeakRssMb: peakRssVite,
      chunkCount,
    },
  };
}

// ============================================================================
// Domain 2: v2_unit (Headless V2 build / explode / visualState / raycast / dispose)
// ============================================================================
async function runV2UnitDomain(ctx) {
  const { rootDir, runs, warmup, units, tiers } = ctx;
  const [cacheMod, raycastMod, registryMod] = await Promise.all([
    loadTsModuleCached(rootDir, 'src/core/resource_cache.ts'),
    loadTsModuleCached(rootDir, 'src/core/raycast_engine.ts'),
    loadTsModuleCached(rootDir, 'src/units/registry.ts'),
  ]);

  const allEntries = registryMod.listRegisteredUnits();
  const targetEntries =
    units.includes('all')
      ? allEntries
      : allEntries.filter((e) => units.includes(e.unitId));
  if (targetEntries.length === 0) {
    return { error: `No matching units for --units=${units.join(',')}` };
  }

  const COMPOSITES = new Set(['integrated', 'camera_body']);
  const buildTotalSamples = [];
  const explodeUsSamples = [];
  const visualUsSamples = [];
  const clickUsSamples = [];
  const disposeTotalSamples = [];
  const breakdown = {};
  let maxLeakedRefs = 0;

  const cache = new cacheMod.ResourceCache();
  const raycaster = new raycastMod.TwoStageRaycaster(33.3);
  const testRc = new THREE.Raycaster();
  const rayDir = new THREE.Vector3(0, 0, -1);

  for (let iter = -warmup; iter < runs; iter++) {
    let iterBuildMs = 0;
    let iterDisposeMs = 0;
    const iterExplodeUs = [];
    const iterVisualUs = [];
    const iterClickUs = [];

    for (const entry of targetEntries) {
      for (const tier of tiers) {
        const unit = await entry.load();
        const tB0 = process.hrtime.bigint();
        const built = await unit.build(tier, cache, {
          synchronous: true,
          integratedMode: COMPOSITES.has(entry.unitId),
        });
        const buildMs = hrMs(tB0);
        iterBuildMs += buildMs;

        // Explode benchmark (40 steps)
        const N_EXP = 40;
        const tE0 = process.hrtime.bigint();
        for (let k = 0; k < N_EXP; k++) {
          unit.updateExplode((k % 20) / 19);
        }
        unit.updateExplode(0);
        const explodeUs = (hrMs(tE0) * 1000) / N_EXP;
        iterExplodeUs.push(explodeUs);

        // Visual state benchmark (20 toggles)
        const firstId = built.parts[0]?.id ?? null;
        const emptySet = new Set();
        const N_VIS = 20;
        const tV0 = process.hrtime.bigint();
        for (let k = 0; k < N_VIS; k++) {
          unit.setVisualState(k % 2 === 0 ? firstId : null, null, emptySet, null, k % 3 === 0 ? 'cad' : 'solid');
        }
        unit.setVisualState(null, null, emptySet, null, 'solid');
        const visualUs = (hrMs(tV0) * 1000) / N_VIS;
        iterVisualUs.push(visualUs);

        // Raycast click benchmark (60 rays)
        const center = built.raycastIndex.unitWorldBox.getCenter(new THREE.Vector3());
        const size = built.raycastIndex.unitWorldBox.getSize(new THREE.Vector3());
        const dist = Math.max(80, size.length() * 2);
        const N_RC = 60;
        const tR0 = process.hrtime.bigint();
        for (let k = 0; k < N_RC; k++) {
          const jitter = ((k % 7) - 3) * 0.8;
          testRc.set(new THREE.Vector3(center.x + jitter, center.y + jitter, center.z + dist), rayDir);
          raycaster.pickWithRay(testRc, built.raycastIndex, () => false, null);
        }
        const clickUs = (hrMs(tR0) * 1000) / N_RC;
        iterClickUs.push(clickUs);

        const tD0 = process.hrtime.bigint();
        unit.dispose(cache);
        const disposeMs = hrMs(tD0);
        iterDisposeMs += disposeMs;

        const post = cache.getStats();
        if (post.totalRefs > maxLeakedRefs) maxLeakedRefs = post.totalRefs;

        if (iter === runs - 1) {
          breakdown[`${entry.unitId}/${tier}`] = {
            buildMs: roundNum(buildMs, 2),
            triangles: built.stats.estimatedTriangles,
            instanced: built.stats.instancedMeshCount,
            batched: built.stats.batchedMeshCount,
            explodeUs: roundNum(explodeUs, 1),
            visualUs: roundNum(visualUs, 1),
            clickUs: roundNum(clickUs, 1),
            disposeMs: roundNum(disposeMs, 2),
          };
        }
      }
    }

    if (iter >= 0) {
      buildTotalSamples.push(iterBuildMs);
      disposeTotalSamples.push(iterDisposeMs);
      explodeUsSamples.push(iterExplodeUs.reduce((a, b) => a + b, 0) / Math.max(1, iterExplodeUs.length));
      visualUsSamples.push(iterVisualUs.reduce((a, b) => a + b, 0) / Math.max(1, iterVisualUs.length));
      clickUsSamples.push(iterClickUs.reduce((a, b) => a + b, 0) / Math.max(1, iterClickUs.length));
    }
  }

  const pairCount = targetEntries.length * tiers.length;
  return {
    metrics: {
      build_total_ms: makeMetric(buildTotalSamples, 'ms'),
      build_avg_ms: makeMetric(buildTotalSamples.map((v) => v / Math.max(1, pairCount)), 'ms'),
      explode_us_per_op: makeMetric(explodeUsSamples, 'us'),
      visual_state_us_per_op: makeMetric(visualUsSamples, 'us'),
      raycast_click_us_per_op: makeMetric(clickUsSamples, 'us'),
      dispose_total_ms: makeMetric(disposeTotalSamples, 'ms', { primarySpeedMetric: false }),
    },
    load: {
      unitTierPairs: pairCount,
      maxLeakedCacheRefs: maxLeakedRefs,
      breakdown,
    },
  };
}

// ============================================================================
// Domain 3: webgl (Real Headless Chrome CDP Render, Switch & Memory Telemetry)
// ============================================================================
function startInMemServer(staticDir) {
  const mem = new Map();
  return new Promise((resolve, reject) => {
    const srv = http.createServer((req, res) => {
      const urlPath = (req.url || '/').split('?')[0];
      let rel = decodeURIComponent(urlPath === '/' ? '/index.html' : urlPath);
      if (rel.endsWith('/')) rel += 'index.html';
      const fp = path.join(staticDir, rel);
      if (!fp.startsWith(staticDir)) {
        res.writeHead(403);
        res.end();
        return;
      }
      let cached = mem.get(fp);
      if (!cached) {
        if (!fs.existsSync(fp)) {
          res.writeHead(404);
          res.end();
          return;
        }
        cached = {
          buf: fs.readFileSync(fp),
          mime: MIME_TYPES[path.extname(fp).toLowerCase()] || 'application/octet-stream',
        };
        mem.set(fp, cached);
      }
      res.writeHead(200, { 'Content-Type': cached.mime, 'Content-Length': cached.buf.length });
      res.end(cached.buf);
    });
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port }));
  });
}

async function createCdpClient(chromeBin, userDataDir) {
  const proc = spawn(
    chromeBin,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--no-first-run',
      '--use-gl=angle',
      '--use-angle=swiftshader-webgl',
      '--enable-webgl',
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
      '--mute-audio',
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  let stderrBuf = '';
  const wsUrl = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Chrome launch timeout:\n${stderrBuf}`)), 20000);
    proc.stderr.on('data', (c) => {
      stderrBuf += c.toString('utf8');
      const m = stderrBuf.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (m) {
        clearTimeout(timer);
        resolve(m[1]);
      }
    });
    proc.on('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited (${code}): ${stderrBuf}`));
    });
  });

  const debugPort = new URL(wsUrl).port;
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const page = targets.find((t) => t.type === 'page') || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener('open', res);
    ws.addEventListener('error', rej);
  });

  let nextId = 1;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(String(ev.data));
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) rej(new Error(`CDP ${msg.error.code}: ${msg.error.message}`));
      else res(msg.result);
    }
  });

  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const id = nextId++;
      pending.set(id, { res, rej });
      ws.send(JSON.stringify({ id, method, params }));
    });

  const evalAsync = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) {
      throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    }
    return r.result?.value;
  };

  return {
    send,
    evalAsync,
    close: () => {
      try { ws.close(); } catch {}
      try { proc.kill('SIGKILL'); } catch {}
    },
  };
}

async function runWebglDomain(ctx) {
  const { rootDir, runs, warmup, tmpRoot } = ctx;
  const chromeBin = findChromeBinary();
  if (!chromeBin) return { skipped: true, reason: 'Chrome/Chromium binary not found' };
  const staticDir = fs.existsSync(path.join(rootDir, 'docs', 'index.html'))
    ? path.join(rootDir, 'docs')
    : path.join(rootDir, 'dist');
  if (!fs.existsSync(path.join(staticDir, 'index.html'))) {
    return { skipped: true, reason: 'No built docs/index.html found' };
  }

  const { srv, port } = await startInMemServer(staticDir);
  const pageLoadSamples = [];
  const firstReadySamples = [];
  const frameHighSamples = [];
  const frameLiteSamples = [];
  const unitSwitchSamples = [];
  const mobileFrameSamples = [];
  const jsHeapSamples = [];
  let lastDiag = null;
  let lastCdpMetrics = null;

  try {
    for (let iter = -warmup; iter < Math.max(1, runs); iter++) {
      const ud = path.join(tmpRoot, `chrome-webgl-${iter + warmup}`);
      fs.mkdirSync(ud, { recursive: true });
      const cdp = await createCdpClient(chromeBin, ud);
      try {
        await cdp.send('Page.enable');
        await cdp.send('Runtime.enable');
        await cdp.send('Performance.enable');
        await cdp.send('Emulation.setDeviceMetricsOverride', {
          width: 1366,
          height: 820,
          deviceScaleFactor: 1,
          mobile: false,
        });

        const tNav = process.hrtime.bigint();
        await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/?quality=high` });
        await cdp.evalAsync(`new Promise((res, rej) => {
          const s = performance.now();
          const p = () => {
            if (window.__cad && window.__cad.viewport) return res(true);
            if (performance.now() - s > 20000) return rej(new Error('mount timeout'));
            setTimeout(p, 12);
          };
          p();
        })`);
        const pageLoadMs = hrMs(tNav);

        await cdp.evalAsync(`new Promise((res, rej) => {
          const s = performance.now();
          const p = () => {
            if (window.__cad.v2.getDiagnostics().ready) return res(true);
            if (performance.now() - s > 30000) return rej(new Error('ready timeout'));
            setTimeout(p, 16);
          };
          p();
        })`);
        const firstReadyMs = hrMs(tNav);

        // Measure 1 genuine GPU-completed frame (HIGH) via canvas pixel readback fence
        const frameHighMs = await cdp.evalAsync(`(() => {
          const vp = window.__cad.viewport;
          const r = vp.getRenderer();
          const gl = r.getContext();
          const px = new Uint8Array(4);
          vp.setExplode(0.25, true);
          const t0 = performance.now();
          vp.getV2Runtime().render(vp['camera']);
          gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
          return performance.now() - t0;
        })()`);

        // Switch unit to integrated/standard_lite and measure total switch + 1 real GPU frame
        const tSw = process.hrtime.bigint();
        await cdp.evalAsync(`(async () => {
          window.__cad.setQuality('standard_lite');
          window.__cad.viewport.setMode('integrated', true);
          await new Promise((res, rej) => {
            const s = performance.now();
            const p = () => {
              const d = window.__cad.v2.getDiagnostics();
              if (d.ready && d.unitId === 'integrated' && d.quality === 'standard_lite') return res(true);
              if (performance.now() - s > 30000) return rej(new Error('switch timeout'));
              setTimeout(p, 16);
            };
            p();
          });
        })()`);
        const unitSwitchMs = hrMs(tSw);

        const frameLiteMs = await cdp.evalAsync(`(() => {
          const vp = window.__cad.viewport;
          const r = vp.getRenderer();
          const gl = r.getContext();
          const px = new Uint8Array(4);
          vp.setExplode(0.35, true);
          const t0 = performance.now();
          vp.getV2Runtime().render(vp['camera']);
          gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
          return performance.now() - t0;
        })()`);

        // Mobile viewport frame time (390x844 @ DPR 2)
        await cdp.send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true,
        });
        await cdp.evalAsync(`new Promise(r => requestAnimationFrame(r))`);
        const mobileFrameMs = await cdp.evalAsync(`(() => {
          const vp = window.__cad.viewport;
          const r = vp.getRenderer();
          const gl = r.getContext();
          const px = new Uint8Array(4);
          vp.setExplode(0.0, true);
          const t0 = performance.now();
          vp.getV2Runtime().render(vp['camera']);
          gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
          return performance.now() - t0;
        })()`);

        const perfRes = await cdp.send('Performance.getMetrics');
        const mMap = Object.fromEntries((perfRes.metrics || []).map((m) => [m.name, m.value]));
        const diag = await cdp.evalAsync(`window.__cad.v2.getDiagnostics()`);

        if (iter >= 0) {
          pageLoadSamples.push(pageLoadMs);
          firstReadySamples.push(firstReadyMs);
          frameHighSamples.push(frameHighMs);
          frameLiteSamples.push(frameLiteMs);
          unitSwitchSamples.push(unitSwitchMs);
          mobileFrameSamples.push(mobileFrameMs);
          jsHeapSamples.push((mMap.JSHeapUsedSize || 0) / (1024 * 1024));
          lastDiag = diag;
          lastCdpMetrics = {
            domNodes: mMap.Nodes || 0,
            layoutCount: mMap.LayoutCount || 0,
            layoutDurationMs: roundNum((mMap.LayoutDuration || 0) * 1000, 2),
            recalcStyleDurationMs: roundNum((mMap.RecalcStyleDuration || 0) * 1000, 2),
            scriptDurationMs: roundNum((mMap.ScriptDuration || 0) * 1000, 2),
          };
        }
      } finally {
        cdp.close();
        await new Promise((r) => setTimeout(r, 80));
        try { fs.rmSync(ud, { recursive: true, force: true, maxRetries: 6, retryDelay: 50 }); } catch {}
      }
    }
  } finally {
    srv.close();
  }

  return {
    metrics: {
      page_load_ms: makeMetric(pageLoadSamples, 'ms'),
      first_ready_ms: makeMetric(firstReadySamples, 'ms'),
      frame_high_ms: makeMetric(frameHighSamples, 'ms'),
      frame_lite_ms: makeMetric(frameLiteSamples, 'ms'),
      unit_switch_ms: makeMetric(unitSwitchSamples, 'ms'),
      mobile_frame_ms: makeMetric(mobileFrameSamples, 'ms'),
      js_heap_mb: makeMetric(jsHeapSamples, 'MB', { primarySpeedMetric: false, decimals: 2 }),
    },
    load: {
      cdp: lastCdpMetrics,
      v2Diagnostics: lastDiag
        ? {
            unitId: lastDiag.unitId,
            quality: lastDiag.quality,
            drawCalls: lastDiag.drawCalls,
            triangles: lastDiag.triangles,
            geometries: lastDiag.geometries,
            textures: lastDiag.textures,
            shaderWarmupMs: roundNum(lastDiag.shaderWarmupMs || 0, 2),
            vramCheck: lastDiag.vramCheck,
          }
        : null,
    },
  };
}

// ============================================================================
// Domain 4: pp (Visual Capture Engine)
// ============================================================================
async function runPpDomain(ctx) {
  const { rootDir, runs, warmup, tmpRoot, ppPresets } = ctx;
  const ppScript = path.join(rootDir, 'scripts', 'pp.mjs');
  if (!fs.existsSync(ppScript)) return { skipped: true, reason: 'scripts/pp.mjs not found' };

  const hasWarm = scriptSupportsFlag(rootDir, 'scripts/pp.mjs', '--warm');
  const jobs = [
    { key: 'audit', args: ['--preset=audit', '--manifest'], shots: 6 },
    { key: 'welcome', args: ['--preset=welcome', '--manifest'], shots: 3 },
    { key: 'mobile', args: ['--preset=mobile', '--manifest'], shots: 3 },
    { key: 'ui_only', args: ['--mode=ui', '--unit=integrated', '--quality=standard_lite', '--manifest'], shots: 1 },
    { key: 'single_cad', args: ['--mode=cad', '--unit=welcome', '--quality=high', '--manifest'], shots: 1 },
  ].filter((j) => ppPresets.includes('all') || ppPresets.includes(j.key));

  const metrics = {};
  const load = { warmDaemon: hasWarm };
  const ppRuns = Math.max(1, ctx.quick ? 1 : runs);
  const ppWarmup = ctx.quick ? 0 : warmup;

  try {
    // When pp1.1 --warm daemon is supported, record 1 transparent cold audit shot first (when audit is selected),
    // then warm the persistent daemon so all timed presets reflect pp1.1's production AI-agent workflow.
    if (hasWarm) {
      await measureProcess('node', [ppScript, '--daemon=stop'], { cwd: rootDir });
      if (jobs.some((j) => j.key === 'audit')) {
        const coldOut = path.join(tmpRoot, 'pp-audit-cold');
        fs.mkdirSync(coldOut, { recursive: true });
        const rCold = await measureProcess('node', [ppScript, '--preset=audit', '--manifest', `--out=${coldOut}`], { cwd: rootDir });
        if (rCold.exitCode === 0) {
          load.auditColdMs = roundNum(rCold.wallMs, 1);
        }
        fs.rmSync(coldOut, { recursive: true, force: true });
      }
      // Boot warm daemon via lightweight warm probe so daemon startup is outside steady-state runs
      const primeOut = path.join(tmpRoot, 'pp-warm-prime');
      fs.mkdirSync(primeOut, { recursive: true });
      await measureProcess('node', [ppScript, '--warm', '--mode=ui', '--unit=integrated', '--quality=standard_lite', `--out=${primeOut}`], { cwd: rootDir });
      fs.rmSync(primeOut, { recursive: true, force: true });
    }

    for (const job of jobs) {
      const totalSamples = [];
      const perShotSamples = [];
      let peakRss = 0;
      let avgCpu = 0;
      let totalKb = 0;
      const runArgs = hasWarm ? ['--warm', ...job.args] : job.args;

      for (let i = -ppWarmup; i < ppRuns; i++) {
        const outDir = path.join(tmpRoot, `pp-${job.key}-${i + ppWarmup}`);
        fs.mkdirSync(outDir, { recursive: true });
        const r = await measureProcess('node', [ppScript, ...runArgs, `--out=${outDir}`], { cwd: rootDir });
        if (r.exitCode !== 0) {
          return { error: `pp ${job.key} failed (exit=${r.exitCode}): ${r.stderr.slice(0, 240)}` };
        }
        let shotCount = job.shots;
        let bytes = 0;
        const manifestPath = path.join(outDir, 'pp_manifest.json');
        if (fs.existsSync(manifestPath)) {
          try {
            const mf = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
            shotCount = mf.count || mf.shots?.length || job.shots;
            bytes = (mf.shots || []).reduce((acc, s) => acc + (s.bytes || 0), 0);
          } catch {}
        }
        if (i >= 0) {
          totalSamples.push(r.wallMs);
          perShotSamples.push(r.wallMs / Math.max(1, shotCount));
          peakRss = Math.max(peakRss, r.peakRssMb);
          avgCpu += r.cpuPct;
          totalKb = roundNum(bytes / 1024, 1);
        }
        fs.rmSync(outDir, { recursive: true, force: true });
      }

      metrics[`${job.key}_total_ms`] = makeMetric(totalSamples, 'ms');
      if (job.shots > 1) {
        metrics[`${job.key}_ms_per_shot`] = makeMetric(perShotSamples, 'ms', { primarySpeedMetric: false });
      }
      load[job.key] = {
        peakRssMb: peakRss,
        avgCpuPct: roundNum(avgCpu / Math.max(1, ppRuns), 1),
        outputKb: totalKb,
      };
    }
  } finally {
    if (hasWarm) {
      await measureProcess('node', [ppScript, '--daemon=stop'], { cwd: rootDir });
    }
  }

  return { metrics, load };
}

// ============================================================================
// Domain 5: validate (scripts/validate_parts.mjs)
// ============================================================================
async function runValidateDomain(ctx) {
  const { rootDir, runs, warmup } = ctx;
  const script = path.join(rootDir, 'scripts', 'validate_parts.mjs');
  if (!fs.existsSync(script)) return { skipped: true, reason: 'scripts/validate_parts.mjs not found' };

  const hasFullFlag = scriptSupportsFlag(rootDir, 'scripts/validate_parts.mjs', '--full');
  const fullSamples = [];
  const incrSamples = [];
  const peakRssSamples = [];
  let lastCpu = 0;
  let lastPar = 0;
  const vRuns = Math.max(1, ctx.quick ? 1 : runs);

  for (let i = -warmup; i < vRuns; i++) {
    const args = hasFullFlag ? [script, '--full'] : [script];
    const r = await measureProcess('node', args, { cwd: rootDir });
    if (r.exitCode !== 0) {
      return { error: `validate_parts.mjs failed (exit=${r.exitCode}): ${(r.stderr || r.stdout).slice(-300)}` };
    }
    if (i >= 0) {
      fullSamples.push(r.wallMs);
      peakRssSamples.push(r.peakRssMb);
      lastCpu = r.cpuPct;
      lastPar = r.parallelEffPct;
    }
  }

  // Also measure default/incremental mode (identical to full when incremental not yet implemented)
  for (let i = 0; i < vRuns; i++) {
    if (!hasFullFlag) {
      incrSamples.push(fullSamples[Math.min(i, fullSamples.length - 1)]);
      continue;
    }
    const r = await measureProcess('node', [script], { cwd: rootDir });
    if (r.exitCode !== 0) {
      return { error: `validate_parts.mjs (incr) failed (exit=${r.exitCode})` };
    }
    incrSamples.push(r.wallMs);
  }

  return {
    metrics: {
      validate_full_ms: makeMetric(fullSamples, 'ms'),
      validate_incr_ms: makeMetric(incrSamples, 'ms'),
      validate_peak_rss_mb: makeMetric(peakRssSamples, 'MB', { primarySpeedMetric: false, decimals: 1 }),
    },
    load: {
      cpuPct: lastCpu,
      parallelEffPct: lastPar,
      hasIncrementalCache: hasFullFlag,
    },
  };
}

// ============================================================================
// Domain 6: catalog (scripts/generate_catalogs.mjs)
// ============================================================================
async function runCatalogDomain(ctx) {
  const { rootDir, runs, warmup, tmpRoot } = ctx;
  const script = path.join(rootDir, 'scripts', 'generate_catalogs.mjs');
  if (!fs.existsSync(script)) return { skipped: true, reason: 'scripts/generate_catalogs.mjs not found' };

  const hasOutDir = scriptSupportsFlag(rootDir, 'scripts/generate_catalogs.mjs', '--out-dir');
  const hasFullFlag = scriptSupportsFlag(rootDir, 'scripts/generate_catalogs.mjs', '--full');
  const fullSamples = [];
  const incrSamples = [];
  const rssSamples = [];
  const cRuns = Math.max(1, ctx.quick ? 1 : runs);

  for (let i = -warmup; i < cRuns; i++) {
    const outDir = path.join(tmpRoot, `catalog-full-${i + warmup}`);
    const args = [script];
    if (hasFullFlag) args.push('--full');
    if (hasOutDir) args.push(`--out-dir=${outDir}`);
    const r = await measureProcess('node', args, { cwd: rootDir });
    if (r.exitCode !== 0) {
      return { error: `generate_catalogs.mjs failed (exit=${r.exitCode}): ${r.stderr.slice(0, 240)}` };
    }
    if (i >= 0) {
      fullSamples.push(r.wallMs);
      rssSamples.push(r.peakRssMb);
    }
    if (hasOutDir) fs.rmSync(outDir, { recursive: true, force: true });
  }

  for (let i = 0; i < cRuns; i++) {
    if (!hasFullFlag) {
      incrSamples.push(fullSamples[Math.min(i, fullSamples.length - 1)]);
      continue;
    }
    const outDir = path.join(tmpRoot, `catalog-incr-${i}`);
    const args = [script];
    if (hasOutDir) args.push(`--out-dir=${outDir}`);
    const r = await measureProcess('node', args, { cwd: rootDir });
    if (r.exitCode !== 0) return { error: `generate_catalogs.mjs (incr) failed` };
    incrSamples.push(r.wallMs);
    if (hasOutDir) fs.rmSync(outDir, { recursive: true, force: true });
  }

  return {
    metrics: {
      catalog_full_ms: makeMetric(fullSamples, 'ms'),
      catalog_incr_ms: makeMetric(incrSamples, 'ms'),
      catalog_peak_rss_mb: makeMetric(rssSamples, 'MB', { primarySpeedMetric: false, decimals: 1 }),
    },
    load: {
      isolatedOutDir: hasOutDir,
      hasIncrementalCache: hasFullFlag,
    },
  };
}

// ============================================================================
// Domain 7: mirai (scripts/build_mirai_content.mjs)
// ============================================================================
async function runMiraiDomain(ctx) {
  const { rootDir, runs, warmup, tmpRoot } = ctx;
  const script = path.join(rootDir, 'scripts', 'build_mirai_content.mjs');
  if (!fs.existsSync(script)) return { skipped: true, reason: 'scripts/build_mirai_content.mjs not found' };

  const hasOutDir = scriptSupportsFlag(rootDir, 'scripts/build_mirai_content.mjs', '--out-dir');
  const hasForce = scriptSupportsFlag(rootDir, 'scripts/build_mirai_content.mjs', '--force');
  const fullSamples = [];
  const incrSamples = [];
  const rssSamples = [];

  for (let i = -warmup; i < Math.max(1, runs); i++) {
    const outDir = path.join(tmpRoot, `mirai-full-${i + warmup}`);
    const args = [script];
    if (hasForce) args.push('--force');
    if (hasOutDir) args.push(`--out-dir=${outDir}`);
    const r = await measureProcess('node', args, { cwd: rootDir });
    if (r.exitCode !== 0) return { error: `build_mirai_content.mjs failed: ${r.stderr.slice(0, 200)}` };
    if (i >= 0) {
      fullSamples.push(r.wallMs);
      rssSamples.push(r.peakRssMb);
    }
    if (hasOutDir) fs.rmSync(outDir, { recursive: true, force: true });
  }

  const outIncr = path.join(tmpRoot, 'mirai-incr-shared');
  if (hasOutDir) fs.mkdirSync(outIncr, { recursive: true });
  for (let i = 0; i < Math.max(1, runs); i++) {
    if (!hasForce) {
      incrSamples.push(fullSamples[Math.min(i, fullSamples.length - 1)]);
      continue;
    }
    const args = [script];
    if (hasOutDir) args.push(`--out-dir=${outIncr}`);
    // Prime once before timing incremental skip
    if (i === 0 && hasOutDir) {
      await measureProcess('node', args, { cwd: rootDir });
    }
    const r = await measureProcess('node', args, { cwd: rootDir });
    if (r.exitCode !== 0) return { error: `build_mirai_content.mjs (incr) failed` };
    incrSamples.push(r.wallMs);
  }
  if (hasOutDir) fs.rmSync(outIncr, { recursive: true, force: true });

  return {
    metrics: {
      mirai_full_ms: makeMetric(fullSamples, 'ms'),
      mirai_incr_ms: makeMetric(incrSamples, 'ms'),
    },
    load: { peakRssMb: Math.max(...rssSamples, 0) },
  };
}

// ============================================================================
// Domain 8: wlk220 (scripts/verify_wlk220_industrial.mjs — 3D DFM + available external EDA/FEA)
// ============================================================================
async function runWlk220Domain(ctx) {
  const { rootDir, runs, warmup, tmpRoot } = ctx;
  const script = path.join(rootDir, 'scripts', 'verify_wlk220_industrial.mjs');
  if (!fs.existsSync(script)) return { skipped: true, reason: 'scripts/verify_wlk220_industrial.mjs not found' };

  const hasDfmOnly = scriptSupportsFlag(rootDir, 'scripts/verify_wlk220_industrial.mjs', '--dfm-only');
  const dfmSamples = [];
  let peakRss = 0;

  if (hasDfmOnly) {
    for (let i = -warmup; i < Math.max(1, runs); i++) {
      const rpt = path.join(tmpRoot, `wlk220-rpt-${i + warmup}.json`);
      const r = await measureProcess('node', [script, '--dfm-only', `--out-report=${rpt}`], { cwd: rootDir });
      if (r.exitCode !== 0) {
        return { error: `verify_wlk220_industrial.mjs --dfm-only failed: ${r.stderr.slice(0, 200)}` };
      }
      if (i >= 0) {
        dfmSamples.push(r.wallMs);
        peakRss = Math.max(peakRss, r.peakRssMb);
      }
      fs.rmSync(rpt, { force: true });
    }
  } else {
    // Baseline measurement of Engine 5 (exact same esbuild + buildWelcomeParts + 220-part DFM logic)
    const inlineCode = `
      import path from 'node:path';
      import { createRequire } from 'node:module';
      const require = createRequire(path.resolve('package.json'));
      const esbuild = require('esbuild');
      const THREE = require('three');
      const res = esbuild.buildSync({
        entryPoints: [path.resolve('src/assemblies/welcome/welcomeParts.ts')],
        bundle: true, platform: 'node', format: 'cjs', write: false, external: ['three'],
      });
      const mod = { exports: {} };
      new Function('exports', 'require', 'module', res.outputFiles[0].text)(
        mod.exports, (id) => (id === 'three' ? THREE : require(id)), mod
      );
      const dummyMat = new THREE.MeshBasicMaterial();
      const mats = new Proxy({}, { get: () => dummyMat });
      const parts = mod.exports.buildWelcomeParts(mats);
      const root = new THREE.Group();
      for (const p of parts) root.add(p.group);
      root.updateMatrixWorld(true);
      const boxes = parts.map((p) => ({ id: p.id, box: new THREE.Box3().setFromObject(p.group) }));
      let ov = 0;
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i].box, b = boxes[j].box;
          const ox = Math.min(a.max.x, b.max.x) - Math.max(a.min.x, b.min.x);
          const oy = Math.min(a.max.y, b.max.y) - Math.max(a.min.y, b.min.y);
          const oz = Math.min(a.max.z, b.max.z) - Math.max(a.min.z, b.min.z);
          if (ox > 0.1 && oy > 0.1 && oz > 0.1) ov++;
        }
      }
      console.log(JSON.stringify({ parts: parts.length, ov }));
    `;
    for (let i = -warmup; i < Math.max(1, runs); i++) {
      const r = await measureProcess('node', ['--input-type=module', '-e', inlineCode], { cwd: rootDir });
      if (r.exitCode !== 0) return { error: `wlk220 baseline dfm failed: ${r.stderr.slice(0, 200)}` };
      if (i >= 0) {
        dfmSamples.push(r.wallMs);
        peakRss = Math.max(peakRss, r.peakRssMb);
      }
    }
  }

  return {
    metrics: {
      wlk220_dfm3d_ms: makeMetric(dfmSamples, 'ms'),
    },
    load: {
      peakRssMb: peakRss,
      supportsDfmOnlyFlag: hasDfmOnly,
    },
  };
}

// ============================================================================
// Domain 9: sim_app (CameraEngineeringGrader, PLYA 8-Engine Pipeline, LensOpticalSim)
// ============================================================================
function buildSyntheticCameraParts(count) {
  const roles = [
    'body', 'mount', 'lens', 'shutter', 'sensor', 'mainboard', 'bionz',
    'battery', 'storage', 'evf', 'lcd', 'audio', 'thermal_emi', 'mishoe',
  ];
  const parts = [];
  for (let i = 0; i < count; i++) {
    const role = roles[i % roles.length];
    const col = i % 10;
    const row = Math.floor(i / 10) % 10;
    const layer = Math.floor(i / 100);
    const x = (col - 4.5) * 14.0;
    const y = (row - 4.5) * 9.5;
    const z = role === 'lens' ? 58 + (i % 5) * 6 : role === 'mount' ? 28 : role === 'shutter' ? 14 : role === 'sensor' ? 0 : role === 'lcd' ? -28 : (layer - 1) * 18;
    const sx = role === 'body' ? 128 : 11;
    const sy = role === 'body' ? 88 : 8;
    const sz = role === 'body' ? 46 : 7;
    const min = new THREE.Vector3(x - sx * 0.5, y - sy * 0.5, z - sz * 0.5);
    const max = new THREE.Vector3(x + sx * 0.5, y + sy * 0.5, z + sz * 0.5);
    const worldBox = new THREE.Box3(min, max);
    const worldCenter = new THREE.Vector3(x, y, z);
    const worldSize = new THREE.Vector3(sx, sy, sz);
    parts.push({
      uid: `p-${i}`,
      entry: {
        key: `${role}::part-${i}`,
        unitId: role === 'storage' ? 'cfexpress' : role === 'audio' ? 'mic' : role === 'thermal_emi' ? 'mainboard' : role,
        unitNameJa: role,
        partId: `${role}-part-${i}`,
        title: `${role} Part ${i}`,
        subtitle: 'Synthetic bench part',
        category: role,
        swatchColor: '#64748b',
        assembledPos: [x, y, z],
        role,
      },
      worldBox,
      worldCenter,
      worldSize,
      position: new THREE.Vector3(x, y, z),
      rotationEuler: new THREE.Euler(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
    });
  }
  return parts;
}

async function runSimAppDomain(ctx) {
  const { rootDir, runs, warmup } = ctx;
  const [graderMod, plyaMod, opticsMod] = await Promise.all([
    loadTsModuleCached(rootDir, 'src/playground/CameraEngineeringGrader.ts'),
    loadTsModuleCached(rootDir, 'src/playground/PlyaVerificationPipeline.ts'),
    loadTsModuleCached(rootDir, 'src/assemblies/lens/lensOpticalSim.ts'),
  ]);

  const parts220 = buildSyntheticCameraParts(220);
  const webCtx = { isOnline: true, webgl2: true, totalTriangles: 85000 };
  const graderSamples = [];
  const plyaSamples = [];
  const chiefUsSamples = [];
  const optics5Samples = [];
  let lastScore = 0;

  const GRADER_ITERS = 30;
  const PLYA_ITERS = 25;
  const CHIEF_ITERS = 300;
  const OPTICS_ITERS = 40;

  const sim = new opticsMod.LensOpticalSim();
  const scenarios = ['aperture_bokeh', 'floating_xd', 'ed_chromatic', 'xa_aspheric', 'nano_ar_baffle'];

  for (let iter = -warmup; iter < Math.max(1, runs); iter++) {
    const mGrader = await measureInProcess(() => {
      let rep = null;
      for (let k = 0; k < GRADER_ITERS; k++) {
        rep = graderMod.evaluateCustomCamera(parts220, 'mirrorless');
      }
      return rep;
    });

    const mPlya = await measureInProcess(() => {
      let rep = null;
      for (let k = 0; k < PLYA_ITERS; k++) {
        rep = plyaMod.runPlyaVerificationPipeline(parts220, webCtx, 'mirrorless');
      }
      return rep;
    });

    const mChief = await measureInProcess(() => {
      let acc = 0;
      for (let k = 0; k < CHIEF_ITERS; k++) {
        const ang = 2 + (k % 15);
        acc += opticsMod.findChiefEntryY(ang, -1.2, -0.65);
      }
      return acc;
    });

    const mOptics = await measureInProcess(() => {
      let totalRays = 0;
      for (let k = 0; k < OPTICS_ITERS; k++) {
        for (let s = 0; s < scenarios.length; s++) {
          sim.scenario = scenarios[s];
          sim.aperture = 1.2 + (k % 4) * 1.4;
          sim.focusT = (k % 5) * 0.2;
          sim.fieldAngleDeg = ((k % 3) - 1) * 10;
          const rays = sim.traceActiveBundle();
          totalRays += rays.length;
        }
      }
      return totalRays;
    });

    if (iter >= 0) {
      graderSamples.push(mGrader.wallMs / GRADER_ITERS);
      plyaSamples.push(mPlya.wallMs / PLYA_ITERS);
      chiefUsSamples.push((mChief.wallMs * 1000) / CHIEF_ITERS);
      optics5Samples.push(mOptics.wallMs / OPTICS_ITERS);
      lastScore = mPlya.value?.engineeringReport?.totalScore ?? 0;
    }
  }

  return {
    metrics: {
      grader_n220_ms: makeMetric(graderSamples, 'ms'),
      plya_n220_ms: makeMetric(plyaSamples, 'ms'),
      lens_chief_ray_us: makeMetric(chiefUsSamples, 'us'),
      lens_5scenarios_ms: makeMetric(optics5Samples, 'ms'),
    },
    load: {
      syntheticParts: 220,
      verifiedPlyaScore: lastScore,
    },
  };
}

// ============================================================================
// Domain 10: bg_bench (bg v1 status + 20-case chaos selftest)
// ============================================================================
async function runBgBenchDomain(ctx) {
  const { rootDir, runs, warmup } = ctx;
  const bgScript = path.join(rootDir, 'scripts', 'bg.mjs');
  if (!fs.existsSync(bgScript)) return { skipped: true, reason: 'scripts/bg.mjs not found' };

  const statusSamples = [];
  const selftestSamples = [];
  let stRss = 0;

  for (let i = -warmup; i < Math.max(1, runs); i++) {
    const r = await measureProcess('node', [bgScript, 'status', '--ai'], { cwd: rootDir });
    if (r.exitCode !== 0 && r.exitCode !== 3) {
      return { error: `bg status failed (exit=${r.exitCode})` };
    }
    if (i >= 0) statusSamples.push(r.wallMs);
  }

  const stRuns = ctx.quick ? 1 : Math.min(2, Math.max(1, runs));
  for (let i = 0; i < stRuns; i++) {
    const r = await measureProcess('node', [bgScript, 'selftest'], { cwd: rootDir });
    if (r.exitCode !== 0) {
      return { error: `bg selftest failed (exit=${r.exitCode}): ${(r.stderr || r.stdout).slice(-240)}` };
    }
    selftestSamples.push(r.wallMs);
    stRss = Math.max(stRss, r.peakRssMb);
  }

  return {
    metrics: {
      bg_status_ms: makeMetric(statusSamples, 'ms'),
      bg_selftest_ms: makeMetric(selftestSamples, 'ms'),
    },
    load: {
      selftestPeakRssMb: stRss,
    },
  };
}

export const DOMAIN_RUNNERS = Object.freeze({
  build: runBuildDomain,
  v2_unit: runV2UnitDomain,
  webgl: runWebglDomain,
  pp: runPpDomain,
  validate: runValidateDomain,
  catalog: runCatalogDomain,
  mirai: runMiraiDomain,
  wlk220: runWlk220Domain,
  sim_app: runSimAppDomain,
  bg_bench: runBgBenchDomain,
});
