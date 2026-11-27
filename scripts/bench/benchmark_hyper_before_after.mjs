#!/usr/bin/env node
/**
 * Real-Chrome WebGL2 BEFORE/AFTER Benchmark Suite:
 *   1. Play Ground 1.1 (11 Load Metrics: Cold Open/Template Build, Draw Calls, Triangles, VBO MB,
 *      Active GPU Frame ms, Idle Render Calls/500ms, Click Raycast Pick ms, PLYA Cold & Steady Eval ms,
 *      Undo/Redo Latency ms, Catalog 2,404-Part Search+DOM ms)
 *   2. STD LITE (8 Load Metrics + Luminance/Crushed-Black Visual Audit across 6 Units:
 *      integrated, mic, cfexpress, bionz, welcome, mishoe)
 *
 * Works identically on unmodified `main` (0106392) and any optimized build in `docs/`.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const REPO = process.cwd();
const STATIC_DIR = path.join(REPO, 'docs');
const SCRATCH_DIR = path.resolve(REPO, 'scripts/bench');

const argOut = process.argv.find((a) => a.startsWith('--out='))?.slice('--out='.length);
const argCompare = process.argv.find((a) => a.startsWith('--compare='))?.slice('--compare='.length);
const OUT_JSON = path.join(SCRATCH_DIR, argOut || 'benchmark_hyper_latest.json');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let rel = decodeURIComponent((req.url || '/').split('?')[0]);
      if (rel === '/') rel = '/index.html';
      const fp = path.join(STATIC_DIR, rel);
      if (!fs.existsSync(fp)) {
        res.writeHead(404);
        res.end('404');
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
      fs.createReadStream(fp).pipe(res);
    });
    srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port }));
  });
}

async function launchChrome() {
  const dir = fs.mkdtempSync('/tmp/ag-hyper-bench-');
  const proc = spawn(
    '/usr/bin/google-chrome',
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${dir}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--use-gl=angle',
      '--use-angle=swiftshader-webgl',
      '--enable-webgl',
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  let buf = '';
  const wsUrl = await new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('Chrome launch timeout')), 20000);
    proc.stderr.on('data', (c) => {
      buf += c.toString();
      const m = buf.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (m) {
        clearTimeout(t);
        res(m[1]);
      }
    });
  });
  const port = new URL(wsUrl).port;
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((t) => t.type === 'page') || targets[0];
  return {
    wsUrl: page.webSocketDebuggerUrl,
    cleanup: () => {
      try {
        proc.kill('SIGKILL');
      } catch {}
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch {}
    },
  };
}

class CDP {
  constructor(url) {
    this.url = url;
    this.id = 1;
    this.map = new Map();
  }
  connect() {
    return new Promise((res, rej) => {
      this.ws = new WebSocket(this.url);
      this.ws.addEventListener('open', res);
      this.ws.addEventListener('error', rej);
      this.ws.addEventListener('message', (e) => {
        const m = JSON.parse(String(e.data));
        if (m.id && this.map.has(m.id)) {
          const { res: r, rej: j } = this.map.get(m.id);
          this.map.delete(m.id);
          if (m.error) j(new Error(m.error.message));
          else r(m.result);
        }
      });
    });
  }
  send(method, params = {}) {
    const id = this.id++;
    return new Promise((res, rej) => {
      this.map.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evalAsync(expr) {
    const r = await this.send('Runtime.evaluate', {
      expression: expr,
      awaitPromise: true,
      returnByValue: true,
    });
    if (r.exceptionDetails) {
      throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    }
    return r.result?.value;
  }
  close() {
    try {
      this.ws?.close();
    } catch {}
  }
}

const { srv, port } = await startServer();
const chrome = await launchChrome();
const cdp = new CDP(chrome.wsUrl);

try {
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 760,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // =========================================================================
  // PART 1: PLAY GROUND 1.1 COMPREHENSIVE BENCHMARK (COLD PAGE LOAD!)
  // =========================================================================
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });
  await cdp.evalAsync(
    `new Promise((r,j)=>{const s=performance.now();const p=()=>{if(window.__cad?.playground)return r(1);if(performance.now()-s>20000)return j('timeout');setTimeout(p,30);};p();})`
  );
  await cdp.evalAsync(
    `window.__benchErrors = []; window.addEventListener('error', e => window.__benchErrors.push(e.message)); window.addEventListener('unhandledrejection', e => window.__benchErrors.push(String(e.reason)));`
  );

  const playgroundMetrics = await cdp.evalAsync(`(async () => {
    const cad = window.__cad;
    const renderer = cad.viewport.getRenderer();
    const gl = renderer.getContext();

    // Non-invasive render spy to capture Play Ground's real scene/camera/calls/idle frames!
    let lastScene = null;
    let lastCamera = null;
    let spyActive = false;
    let spyRenderCount = 0;
    let spyRenderMs = 0;
    const origRender = renderer.render.bind(renderer);
    renderer.render = function(scene, camera) {
      lastScene = scene;
      lastCamera = camera;
      const t0 = performance.now();
      const out = origRender(scene, camera);
      if (spyActive) {
        spyRenderCount++;
        spyRenderMs += performance.now() - t0;
      }
      return out;
    };

    // 1. Cold Play Ground Open (Catalog Load + 17-Part a7iv Template Extraction & Placement)
    const tOpen0 = performance.now();
    await cad.playground.open(false);
    const pgColdOpenAndTemplateMs = performance.now() - tOpen0;

    // Wait 2 rAFs so customSceneRenderer runs at least once and exposes scene/camera
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    // 2. Measure Play Ground Scene Geometry VRAM (VBO + IBO bytes) & Active Draw Calls / Triangles
    let vboBytes = 0;
    let pgMeshCount = 0;
    let pgMatSet = new Set();
    const seenGeos = new Set();
    if (lastScene) {
      lastScene.traverse(o => {
        if (o.isMesh || o.isBatchedMesh || o.isInstancedMesh || o.isLine || o.isLineSegments) {
          pgMeshCount++;
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach(m => pgMatSet.add(m));
            else pgMatSet.add(o.material);
          }
          const g = o.geometry;
          if (g && !seenGeos.has(g)) {
            seenGeos.add(g);
            for (const a of Object.values(g.attributes)) {
              if (a && a.array) vboBytes += a.array.byteLength;
            }
            if (g.index && g.index.array) vboBytes += g.index.array.byteLength;
          }
        }
      });
    }

    // Warmup + TRUE GPU Active Frame Time (with gl.readPixels fence!)
    const px = new Uint8Array(4);
    if (lastScene && lastCamera) {
      origRender(lastScene, lastCamera);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    }
    const gpuSamples = [];
    let pgDrawCalls = 0;
    let pgTriangles = 0;
    for (let i = 0; i < 5; i++) {
      const t0 = performance.now();
      if (lastScene && lastCamera) origRender(lastScene, lastCamera);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      gpuSamples.push(performance.now() - t0);
      pgDrawCalls = renderer.info.render.calls;
      pgTriangles = renderer.info.render.triangles;
    }
    gpuSamples.sort((a, b) => a - b);
    const pgActiveGpuMs = gpuSamples[Math.floor(gpuSamples.length / 2)];

    // 3. Measure IDLE GPU Load over 450ms when user is NOT touching anything!
    await new Promise(r => setTimeout(r, 250)); // let any damping settle
    spyRenderCount = 0;
    spyRenderMs = 0;
    spyActive = true;
    await new Promise(r => setTimeout(r, 450));
    spyActive = false;
    const pgIdleDrawsPerSec = +(spyRenderCount / 0.45).toFixed(1);
    const pgIdleCpuMsPerSec = +(spyRenderMs / 0.45).toFixed(2);

    // 4. Measure Canvas Click Picking Latency (30 pointer clicks across viewport)
    const dom = renderer.domElement;
    const rect = dom.getBoundingClientRect();
    const origSetPC = dom.setPointerCapture?.bind(dom);
    const origRelPC = dom.releasePointerCapture?.bind(dom);
    dom.setPointerCapture = () => {};
    dom.releasePointerCapture = () => {};
    let pickTotalMs = 0;
    try {
      for (let i = 0; i < 30; i++) {
        const cx = rect.left + rect.width * (0.28 + (i % 6) * 0.088);
        const cy = rect.top + rect.height * (0.28 + Math.floor(i / 6) * 0.09);
        dom.dispatchEvent(new PointerEvent('pointerdown', { clientX: cx, clientY: cy, bubbles: true }));
        const tp0 = performance.now();
        dom.dispatchEvent(new PointerEvent('pointerup', { clientX: cx, clientY: cy, bubbles: true }));
        pickTotalMs += performance.now() - tp0;
      }
    } finally {
      if (origSetPC) dom.setPointerCapture = origSetPC;
      if (origRelPC) dom.releasePointerCapture = origRelPC;
    }
    const pgPickRaycastMs = pickTotalMs / 30;

    // 5. Measure PLYA 8-Engine Evaluation Latency (both dirty-move & steady-state!)
    const placed = cad.playground.getPlaced();
    const firstUid = placed[0]?.uid;
    const firstPos = placed[0]?.pos || [0, 0, 0];
    // Dirty PLYA eval (position changes each iteration)
    const tPlyaDirty0 = performance.now();
    for (let i = 0; i < 8; i++) {
      if (firstUid) cad.playground.movePart(firstUid, firstPos[0] + (i % 2 === 0 ? 0.5 : 0), firstPos[1], firstPos[2]);
    }
    const pgPlyaDirtyMs = (performance.now() - tPlyaDirty0) / 8;

    // Steady-state PLYA eval (re-running PLYA without moving parts)
    const tPlyaSteady0 = performance.now();
    let lastPlya = null;
    for (let i = 0; i < 12; i++) {
      lastPlya = cad.playground.runPlya(false);
    }
    const pgPlyaSteadyMs = (performance.now() - tPlyaSteady0) / 12;

    // 6. Measure Undo / Redo Round-Trip Latency!
    const alignBtn = document.querySelector('[data-action="autoAlignOptics"]');
    const undoBtn = document.querySelector('[data-action="undo"]');
    const redoBtn = document.querySelector('[data-action="redo"]');
    const toastEl = document.querySelector('[data-field="toast"]');
    // Make sure we have a transform change in undo stack via inspector px input
    const pxInput = document.querySelector('input[data-prop="px"]');
    if (pxInput) {
      pxInput.value = String((Number(pxInput.value) || 0) + 5);
      pxInput.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (alignBtn) {
      alignBtn.click();
    }
    await new Promise(r => setTimeout(r, 60));

    const waitToast = (expectedSub) => new Promise((resolve) => {
      const check = () => {
        if (toastEl && toastEl.textContent && toastEl.textContent.includes(expectedSub)) {
          resolve(performance.now());
          return;
        }
        setTimeout(check, 0);
      };
      check();
    });

    const undoTimes = [];
    for (let i = 0; i < 4; i++) {
      if (toastEl) toastEl.textContent = '';
      const tu0 = performance.now();
      const pDone = waitToast('元に戻しました');
      undoBtn.click();
      const tu1 = await pDone;
      undoTimes.push(tu1 - tu0);

      if (toastEl) toastEl.textContent = '';
      const tr0 = performance.now();
      const pRedo = waitToast('やり直しました');
      redoBtn.click();
      const tr1 = await pRedo;
      undoTimes.push(tr1 - tr0);
    }
    const pgUndoRedoMs = undoTimes.reduce((a, b) => a + b, 0) / Math.max(1, undoTimes.length);

    // 7. Measure 2,404-Part Catalog Search + Filter + DOM Update Latency (20 queries)
    const searchEl = document.querySelector('[data-field="searchInput"]');
    const catListEl = document.querySelector('[data-field="catalogList"]');
    const queries = ['lens', 'bionz', 'sensor', 'shutter', 'w01', 'battery', 'mi', 'cfexpress', 'evf', 'lcd', 'copper', 'gold', 'pcb', 'prism', 'screw', 'gasket', 'coil', 'motor', 'glass', ''];
    const tSearch0 = performance.now();
    for (const q of queries) {
      searchEl.value = q;
      searchEl.dispatchEvent(new Event('input', { bubbles: true }));
      void catListEl.offsetHeight; // force real layout cost!
    }
    const pgSearchFilterMs = (performance.now() - tSearch0) / queries.length;

    // 8. Measure Cold Second Template Switch (wlk220 25-part optical kit)
    const tWlk0 = performance.now();
    await cad.playground.loadTemplate('wlk220');
    const pgWlk220LoadMs = performance.now() - tWlk0;

    // Restore orig render and close playground cleanly
    renderer.render = origRender;
    cad.playground.close();

    return {
      pgColdOpenAndTemplateMs: +pgColdOpenAndTemplateMs.toFixed(1),
      pgWlk220LoadMs: +pgWlk220LoadMs.toFixed(1),
      pgDrawCalls,
      pgTriangles,
      pgMeshCount,
      pgUniqueMaterials: pgMatSet.size,
      pgVboMB: +(vboBytes / 1048576).toFixed(3),
      pgActiveGpuMs: +pgActiveGpuMs.toFixed(2),
      pgIdleDrawsPerSec,
      pgIdleCpuMsPerSec,
      pgPickRaycastMs: +pgPickRaycastMs.toFixed(3),
      pgPlyaDirtyMs: +pgPlyaDirtyMs.toFixed(3),
      pgPlyaSteadyMs: +pgPlyaSteadyMs.toFixed(3),
      pgUndoRedoMs: +pgUndoRedoMs.toFixed(3),
      pgSearchFilterMs: +pgSearchFilterMs.toFixed(3),
      pgA7ivScore: lastPlya?.engineeringReport?.totalScore ?? null,
      pgA7ivPartCount: placed.length,
    };
  })()`);

  console.log('\n=== PLAY GROUND 1.1 METRICS ===');
  console.table(playgroundMetrics);

  // =========================================================================
  // PART 2: STD LITE BENCHMARK ACROSS 6 REPRESENTATIVE UNITS
  // =========================================================================
  const units = ['integrated', 'mic', 'cfexpress', 'bionz', 'welcome', 'mishoe'];
  const stdLiteResults = {};

  for (const unit of units) {
    const m = await cdp.evalAsync(`(async () => {
      const cad = window.__cad;
      await cad.capture.prepare('cad', { unit: ${JSON.stringify(unit)}, quality: 'standard_lite', explode: 0, preset: 'iso' });
      const rt = cad.viewport.getV2Runtime();
      const diag = rt.getDiagnostics();
      const renderer = cad.viewport.getRenderer();
      const gl = renderer.getContext();
      const cam = cad.viewport.camera;
      const activeUnit = rt.activeUnit;

      // VBO + IBO bytes
      let vboBytes = 0;
      const seenG = new Set();
      rt.scene.traverse(o => {
        if (o.geometry && !seenG.has(o.geometry)) {
          seenG.add(o.geometry);
          for (const a of Object.values(o.geometry.attributes)) {
            if (a && a.array) vboBytes += a.array.byteLength;
          }
          if (o.geometry.index && o.geometry.index.array) vboBytes += o.geometry.index.array.byteLength;
        }
      });

      const px = new Uint8Array(4);
      for (let w = 0; w < 2; w++) rt.render(cam);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);

      const gpuSamples = [];
      for (let i = 0; i < 4; i++) {
        const t0 = performance.now();
        rt.render(cam);
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        gpuSamples.push(performance.now() - t0);
      }
      gpuSamples.sort((a, b) => a - b);
      const trueGpuMs = gpuSamples[Math.floor(gpuSamples.length / 2)];

      // Visual quality audit: luminance & crushed black ratio
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const fullPx = new Uint8Array(w * h * 4);
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, fullPx);
      const lumas = [];
      let crushed = 0;
      for (let y = 0; y < h; y += 4) {
        for (let x = 0; x < w; x += 4) {
          const o = (y * w + x) * 4;
          const r = fullPx[o], g = fullPx[o + 1], b = fullPx[o + 2];
          if (r > 248 && g > 248 && b > 248) continue;
          const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          lumas.push(l);
          if (l < 8) crushed++;
        }
      }
      lumas.sort((a, b) => a - b);
      const meanLuma = lumas.length ? lumas.reduce((a, b) => a + b, 0) / lumas.length : 255;
      const p05Luma = lumas.length ? lumas[Math.floor(lumas.length * 0.05)] : 255;
      const crushPct = lumas.length ? (crushed / lumas.length) * 100 : 0;

      // Explode 30 steps CPU ms
      const te0 = performance.now();
      for (let i = 0; i < 30; i++) activeUnit.updateExplode(i / 29);
      const explodeMs = (performance.now() - te0) / 30;
      activeUnit.updateExplode(0, true);

      // Raycast 30 picks CPU ms
      const rc = rt.raycaster;
      const ptr = cad.viewport.pointer;
      const tr0 = performance.now();
      for (let i = 0; i < 30; i++) {
        rc.resetHoverThrottle();
        ptr.set(((i % 6) - 2.5) * 0.14, (Math.floor(i / 6) - 2.0) * 0.14);
        rc.pickHover(ptr, cam, rt.buildResult.raycastIndex, () => false, null, 1000 + i * 100);
      }
      const raycastMs = (performance.now() - tr0) / 30;

      return {
        trueGpuMs: +trueGpuMs.toFixed(1),
        drawCalls: diag.drawCalls,
        triangles: diag.triangles,
        batchItems: diag.buildStats?.totalBatchedItems ?? 0,
        vboMB: +(vboBytes / 1048576).toFixed(3),
        buildMs: +(diag.buildStats?.buildTimeMs ?? 0).toFixed(1),
        explodeMs: +explodeMs.toFixed(4),
        raycastMs: +raycastMs.toFixed(4),
        meanLuma: +meanLuma.toFixed(1),
        p05Luma: +p05Luma.toFixed(1),
        crushPct: +crushPct.toFixed(2),
      };
    })()`);
    stdLiteResults[unit] = m;
    console.log(
      `[STD_LITE ${unit.padEnd(10)}] GPU=${String(m.trueGpuMs).padStart(6)}ms | DC=${String(m.drawCalls).padStart(2)} | Tris=${String(m.triangles).padStart(7)} | Batch=${String(m.batchItems).padStart(4)} | VBO=${String(m.vboMB).padStart(6)}MB | Build=${String(m.buildMs).padStart(6)}ms | Exp=${m.explodeMs}ms | RC=${m.raycastMs}ms | Luma=${m.meanLuma}/crush=${m.crushPct}%`
    );
  }

  const errors = await cdp.evalAsync(`window.__benchErrors`);
  const payload = {
    timestamp: new Date().toISOString(),
    playgroundMetrics,
    stdLiteResults,
    errors,
  };

  if (argCompare) {
    const basePath = path.join(SCRATCH_DIR, argCompare);
    const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));

    // Play Ground BEFORE / AFTER multipliers
    const pgMetricKeys = [
      'pgColdOpenAndTemplateMs',
      'pgWlk220LoadMs',
      'pgDrawCalls',
      'pgTriangles',
      'pgVboMB',
      'pgActiveGpuMs',
      'pgPickRaycastMs',
      'pgPlyaDirtyMs',
      'pgPlyaSteadyMs',
      'pgUndoRedoMs',
      'pgSearchFilterMs',
    ];
    const pgRatios = {};
    for (const k of pgMetricKeys) {
      const bVal = base.playgroundMetrics[k];
      const aVal = playgroundMetrics[k];
      const floor = k.endsWith('Ms') ? 0.002 : k === 'pgVboMB' ? 0.005 : 1;
      pgRatios[k] = {
        before: bVal,
        after: aVal,
        speedupX: +(bVal / Math.max(floor, aVal)).toFixed(2),
      };
    }
    // Idle GPU reduction
    const idleBefore = base.playgroundMetrics.pgIdleDrawsPerSec;
    const idleAfter = playgroundMetrics.pgIdleDrawsPerSec;
    pgRatios.pgIdleDrawsPerSec = {
      before: idleBefore,
      after: idleAfter,
      speedupX: idleAfter === 0 ? Infinity : +(idleBefore / idleAfter).toFixed(2),
    };
    const finitePgRatios = pgMetricKeys.map((k) => pgRatios[k].speedupX);
    const pgArithMeanX = +(finitePgRatios.reduce((a, b) => a + b, 0) / finitePgRatios.length).toFixed(2);
    const pgGeoMeanX = +Math.exp(
      finitePgRatios.reduce((a, b) => a + Math.log(Math.max(0.01, b)), 0) / finitePgRatios.length
    ).toFixed(2);

    // STD LITE BEFORE / AFTER multipliers across all 6 units and 8 metrics
    const liteKeys = [
      'trueGpuMs',
      'drawCalls',
      'triangles',
      'batchItems',
      'vboMB',
      'buildMs',
      'explodeMs',
      'raycastMs',
    ];
    const litePerMetric = {};
    for (const k of liteKeys) {
      const floor = k === 'explodeMs' || k === 'raycastMs' ? 0.002 : k === 'vboMB' ? 0.01 : 0.1;
      const ratios = units.map(
        (u) => base.stdLiteResults[u][k] / Math.max(floor, stdLiteResults[u][k])
      );
      litePerMetric[k] = +(ratios.reduce((a, b) => a + b, 0) / ratios.length).toFixed(2);
    }
    const liteArithMeanX = +(
      Object.values(litePerMetric).reduce((a, b) => a + b, 0) / liteKeys.length
    ).toFixed(2);
    const liteGeoMeanX = +Math.exp(
      Object.values(litePerMetric).reduce((a, b) => a + Math.log(Math.max(0.01, b)), 0) / liteKeys.length
    ).toFixed(2);

    payload.comparison = {
      pgRatios,
      pgArithMeanX,
      pgGeoMeanX,
      litePerMetric,
      liteArithMeanX,
      liteGeoMeanX,
    };

    console.log('\n================ PLAY GROUND BEFORE vs AFTER ================');
    console.table(pgRatios);
    console.log(
      `PLAY GROUND AVERAGE REDUCTION: ArithMean = ${pgArithMeanX}x | GeoMean = ${pgGeoMeanX}x | Idle Draws = ${idleBefore}/s -> ${idleAfter}/s (ZERO LOAD!)`
    );

    console.log('\n================ STD LITE v1 vs STD LITE v2 ================');
    console.table(litePerMetric);
    console.log(
      `STD LITE FURTHER REDUCTION: ArithMean = ${liteArithMeanX}x | GeoMean = ${liteGeoMeanX}x (Target >= 3.00x!)`
    );
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2));
  console.log(`\nSaved benchmark report -> ${OUT_JSON} (Console errors: ${errors.length})`);
} finally {
  cdp.close();
  chrome.cleanup();
  srv.close();
}
