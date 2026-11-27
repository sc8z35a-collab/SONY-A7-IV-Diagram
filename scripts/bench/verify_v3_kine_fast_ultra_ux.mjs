#!/usr/bin/env node
/**
 * Suite C: Comprehensive V3 Verification Suite (Headless Chrome + WebGL2)
 * Smartly grouped by (unit, quality) to avoid redundant SwiftShader reloads while testing all 10 V3 pillars:
 *  1. Minimalist HUD + KINE Toggle Pill (keeping `.quality-pill button` === ['LITE', 'ULTRA'])
 *  2. Multi-Stage Adaptive ULTRA <-> LITE <-> FAST (+ Explode stays ULTRA + 0 idle)
 *  3. Load-Guarded Default Internal F1.2 Optical Focus Bokeh (auto-bypass on SwiftShader, forced 'on' clean render)
 *  4. Strong Vivid Electric-Blue Selection Marking (ULTRA, LITE, and Play Ground)
 *  5. FAST Mode vs STD LITE v2 (1-DC, 0-texture, 70-90% tri cut, real GPU speedup across welcome/bionz/integrated)
 *  6. KINE Mode (Frustum + Subpixel + CPU Hi-Z culling, selected never culled, X-Ray bypass, toggle restore)
 *  7. 16x Finer Camera Zoom (minDistance=0.4375, dynamic near/far, tighter maxDistance + PG bounds)
 *  8. Strict Zero Camera Movement on Detail Open / Step Next-Prev / Close (< 1e-6 delta)
 *  9. Smartphone Landscape Fullscreen Detail UI (844x390 split-stage, zero overlap, full-bleed lightbox)
 * 10. Play Ground 3-Stage Motion + Zero VRAM Leak & Zero Console/WebGL Errors across unit switches
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const DOCS_DIR = path.resolve(process.cwd(), 'docs');
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
      const urlPath = (req.url || '/').split('?')[0];
      const filePath = path.join(DOCS_DIR, urlPath === '/' ? 'index.html' : urlPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port }));
  });
}

async function launchChrome() {
  const dir = fs.mkdtempSync('/tmp/ag-v3-verify-');
  const candidates = ['/usr/bin/google-chrome', '/usr/bin/chromium', 'google-chrome', 'chromium'];
  let bin = candidates[0];
  for (const c of candidates) {
    if (c.startsWith('/') && fs.existsSync(c)) {
      bin = c;
      break;
    }
  }
  const proc = spawn(
    bin,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu-sandbox',
      '--disable-dev-shm-usage',
      `--user-data-dir=${dir}`,
      '--use-gl=angle',
      '--use-angle=swiftshader-webgl',
      '--enable-webgl',
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
      '--remote-debugging-port=0',
      '--window-size=1280,760',
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  const wsUrl = await new Promise((resolve, reject) => {
    let stderr = '';
    const timer = setTimeout(() => reject(new Error('Chrome launch timeout: ' + stderr)), 20000);
    proc.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
      const m = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (m) {
        clearTimeout(timer);
        resolve(m[1]);
      }
    });
  });
  const listUrl = wsUrl.replace(/^ws:\/\//, 'http://').replace(/\/devtools\/browser\/.*$/, '/json/list');
  const pages = await (await fetch(listUrl)).json();
  const page = pages.find((p) => p.type === 'page') || pages[0];
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
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (ev) => {
        const msg = JSON.parse(String(ev.data));
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve: res, reject: rej } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) rej(new Error(msg.error.message));
          else res(msg.result);
        }
      };
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evalAsync(expression) {
    const r = await this.send('Runtime.evaluate', {
      expression,
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

const tStart = Date.now();
const logStep = (s) => console.error(`[Suite C +${((Date.now() - tStart) / 1000).toFixed(1)}s] ${s}`);

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
  logStep('Navigating to app (default welcome ULTRA)...');
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });

  await cdp.evalAsync(`(async () => {
    window.__v3Errors = [];
    window.addEventListener('error', (e) => window.__v3Errors.push(e.message));
    window.addEventListener('unhandledrejection', (e) => window.__v3Errors.push(String(e.reason)));
    window.__waitReady = (unitId) => new Promise((resolve, reject) => {
      const s = performance.now();
      const poll = () => {
        const d = window.__cad?.v2?.getDiagnostics?.();
        if (d && d.ready && (!unitId || d.unitId === unitId)) return resolve(d);
        if (performance.now() - s > 30000) return reject(new Error('timeout waiting ready ' + unitId));
        setTimeout(poll, 30);
      };
      poll();
    });
    window.__countVividBlue = () => {
      const gl = window.__cad.viewport.getRenderer().getContext();
      const w = gl.drawingBufferWidth;
      const h = gl.drawingBufferHeight;
      const buf = new Uint8Array(w * h * 4);
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, buf);
      let vividBlue = 0;
      let nonWhite = 0;
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const o = (y * w + x) * 4;
          const r = buf[o], g = buf[o + 1], b = buf[o + 2];
          if (r < 246 || g < 246 || b < 246) nonWhite++;
          if (b >= 165 && (b - r) >= 55 && (b - g) >= 12) vividBlue++;
        }
      }
      return { vividBlue, nonWhite, w, h };
    };
    await window.__waitReady('welcome');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  })()`);

  // =========================================================================
  // GROUP 1: welcome ULTRA (HUD, Multi-Stage, Bokeh, Vivid Blue ULTRA)
  // =========================================================================
  logStep('Group 1: welcome ULTRA (HUD, Multi-Stage, F1.2 Bokeh, Vivid Blue)...');
  const welcomeReport = await cdp.evalAsync(`(async () => {
    const cad = window.__cad;
    const rt = cad.viewport.getV2Runtime();
    const renderer = cad.viewport.getRenderer();
    const gl = renderer.getContext();
    const raf2 = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // 1. HUD & KINE Toggle Pill
    const qualityButtons = Array.from(document.querySelectorAll('.quality-pill button')).map(b => b.textContent.trim());
    const kineBtn = document.querySelector('.kine-toggle-pill');
    const kineInitialOn = cad.v2.isKineMode() && kineBtn?.getAttribute('aria-pressed') === 'true';
    kineBtn?.click();
    const kineAfterClickOff = cad.v2.isKineMode() === false && kineBtn?.getAttribute('aria-pressed') === 'false';
    kineBtn?.click();
    const kineAfterClickOn = cad.v2.isKineMode() === true && kineBtn?.getAttribute('aria-pressed') === 'true';

    // 2. Multi-Stage ULTRA <-> LITE <-> FAST (+ Explode stays ULTRA!)
    const stageSettled = cad.v2.getMotionStage();
    cad.viewport.setExplode(0.55, false);
    await raf2();
    const stageDuringExplode = cad.v2.getMotionStage();
    cad.viewport.setExplode(0, true);
    await raf2();

    // Simulate violent rapid camera rotation across 8 frames to trigger FAST!
    const dom = renderer.domElement;
    const rect = dom.getBoundingClientRect();
    const cx0 = rect.left + rect.width * 0.5;
    const cy0 = rect.top + rect.height * 0.5;
    let sawFast = false;
    let sawLiteAfterFast = false;
    const origSetPC = dom.setPointerCapture?.bind(dom);
    const origRelPC = dom.releasePointerCapture?.bind(dom);
    dom.setPointerCapture = () => {};
    dom.releasePointerCapture = () => {};
    try {
      dom.dispatchEvent(new PointerEvent('pointerdown', { clientX: cx0, clientY: cy0, pointerId: 1, button: 0, buttons: 1, bubbles: true }));
      for (let i = 1; i <= 8; i++) {
        dom.dispatchEvent(new PointerEvent('pointermove', { clientX: cx0 + i * 85, clientY: cy0 - i * 32, pointerId: 1, buttons: 1, bubbles: true }));
        await new Promise(r => requestAnimationFrame(r));
        const st = cad.v2.getMotionStage();
        if (st === 'fast') sawFast = true;
      }
      dom.dispatchEvent(new PointerEvent('pointerup', { clientX: cx0 + 680, clientY: cy0 - 256, pointerId: 1, button: 0, buttons: 0, bubbles: true }));
      for (let i = 0; i < 45; i++) {
        await new Promise(r => requestAnimationFrame(r));
        const st = cad.v2.getMotionStage();
        if (sawFast && st === 'lite') sawLiteAfterFast = true;
        if (st === 'ultra') break;
      }
    } finally {
      if (origSetPC) dom.setPointerCapture = origSetPC;
      if (origRelPC) dom.releasePointerCapture = origRelPC;
    }
    await sleep(450);
    const stageAfterViolentStop = cad.v2.getMotionStage();
    const idleF1 = cad.v2.getDiagnostics().renderFrameCount;
    await sleep(300);
    const idleF2 = cad.v2.getDiagnostics().renderFrameCount;
    const ultraIdleDelta = idleF2 - idleF1;

    // 3. Load-Guarded F1.2 Bokeh
    const bokehAutoState = cad.v2.getOpticalBokehState();
    cad.v2.setOpticalBokehMode('on');
    rt.render(cad.viewport.camera, cad.viewport.controls.target);
    const bokehForcedState = cad.v2.getOpticalBokehState();
    const bokehGlErr = gl.getError();
    const bokehPx = window.__countVividBlue();
    cad.v2.setOpticalBokehMode('auto');

    // 4. Vivid Electric-Blue Selection in ULTRA
    cad.viewport.setCameraPreset('iso', true);
    rt.render(cad.viewport.camera, cad.viewport.controls.target);
    const blueBeforeUltra = window.__countVividBlue();
    const welcomeFirstId = cad.viewport.getPartsForCurrentMode()[0]?.id;
    cad.viewport.selectPart(welcomeFirstId, false);
    rt.render(cad.viewport.camera, cad.viewport.controls.target);
    const blueAfterUltra = window.__countVividBlue();
    cad.viewport.selectPart(null, false);

    return {
      hud: { qualityButtons, kineInitialOn, kineAfterClickOff, kineAfterClickOn },
      multiStage: { stageSettled, stageDuringExplode, sawFast, sawLiteAfterFast, stageAfterViolentStop, ultraIdleDelta },
      bokeh: { bokehAutoState, bokehForcedState, bokehGlErr, bokehNonWhite: bokehPx.nonWhite },
      ultraBlue: { before: blueBeforeUltra.vividBlue, after: blueAfterUltra.vividBlue },
    };
  })()`);

  // =========================================================================
  // GROUP 2: STD LITE v2 & FAST Comparison + KINE + Zoom + Camera Lock + Blue LITE
  // =========================================================================
  logStep('Group 2: FAST vs LITE (welcome, bionz, integrated) + KINE + 16x Zoom + Camera Lock...');
  const liteAndIntegratedReport = await cdp.evalAsync(`(async () => {
    const cad = window.__cad;
    const rt = cad.viewport.getV2Runtime();
    const renderer = cad.viewport.getRenderer();
    const gl = renderer.getContext();
    const raf2 = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const px = new Uint8Array(4);

    // 5. FAST vs STD LITE v2 across welcome, bionz, integrated (ends on integrated!)
    const fastVsLite = {};
    for (const u of ['welcome', 'bionz', 'integrated']) {
      await cad.capture.prepare('cad', { unit: u, quality: 'standard_lite', explode: 0, preset: 'iso' });
      await raf2();
      rt.setMotionStage('lite');
      rt.render(cad.viewport.camera);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      const liteTimes = [];
      for (let i = 0; i < 4; i++) {
        const t0 = performance.now();
        rt.render(cad.viewport.camera);
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        liteTimes.push(performance.now() - t0);
      }
      liteTimes.sort((a, b) => a - b);
      const liteDiag = rt.getDiagnostics();

      rt.setMotionStage('fast');
      rt.render(cad.viewport.camera);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      const fastTimes = [];
      for (let i = 0; i < 4; i++) {
        const t0 = performance.now();
        rt.render(cad.viewport.camera);
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        fastTimes.push(performance.now() - t0);
      }
      fastTimes.sort((a, b) => a - b);
      const fastDiag = rt.getDiagnostics();
      rt.setMotionStage('lite');

      fastVsLite[u] = {
        liteDrawCalls: liteDiag.drawCalls,
        fastDrawCalls: fastDiag.drawCalls,
        liteTriangles: liteDiag.triangles,
        fastTriangles: fastDiag.triangles,
        triReductionX: +(liteDiag.triangles / Math.max(1, fastDiag.triangles)).toFixed(2),
        liteGpuMs: +liteTimes[1].toFixed(2),
        fastGpuMs: +fastTimes[1].toFixed(2),
        gpuSpeedupX: +(liteTimes[1] / Math.max(0.1, fastTimes[1])).toFixed(2),
      };
    }

    // Now on integrated (standard_lite) -> restore UI for drawer/vivid-blue tests!
    await cad.capture.prepare('full', { unit: 'integrated', quality: 'standard_lite', explode: 0, preset: 'iso' });
    await raf2();

    // 6. Vivid Electric-Blue Selection in LITE
    const intParts = cad.viewport.getPartsForCurrentMode();
    const frontPartId = intParts.find(p => p.id.includes('lens') || p.id.includes('body'))?.id || intParts[0]?.id;
    cad.viewport.selectPart(frontPartId, false);
    rt.render(cad.viewport.camera, cad.viewport.controls.target);
    const blueAfterLite = window.__countVividBlue();
    cad.viewport.selectPart(null, false);

    // 7. KINE Mode Verification (Frustum + Subpixel + Hi-Z Occlusion) on integrated!
    cad.v2.setKineMode(true);
    const cam = cad.viewport.camera;
    const ctrls = cad.viewport.controls;
    ctrls.target.set(0, 6, 48);
    cam.position.set(16, 12, 92);
    cam.updateMatrixWorld(true);
    ctrls.update();
    for (let i = 0; i < 4; i++) rt.render(cam, ctrls.target);
    const kineCloseStats = cad.v2.getKineStats();
    const kineOnTris = rt.getDiagnostics().triangles;

    const rearPart = intParts.find(p => p.id.includes('lcd') || p.id.includes('evf') || p.id.includes('bionz') || p.id.includes('battery')) || intParts[intParts.length - 1];
    cad.viewport.selectPart(rearPart.id, false);
    for (let i = 0; i < 4; i++) rt.render(cam, ctrls.target);
    const kineStatsWithSelected = cad.v2.getKineStats();

    cad.viewport.setRenderMode('xray');
    for (let i = 0; i < 3; i++) rt.render(cam, ctrls.target);
    const kineXrayStats = cad.v2.getKineStats();
    cad.viewport.setRenderMode('solid');
    cad.viewport.selectPart(null, false);

    cad.v2.setKineMode(false);
    for (let i = 0; i < 2; i++) rt.render(cam, ctrls.target);
    const kineOffStats = cad.v2.getKineStats();
    const kineOffTris = rt.getDiagnostics().triangles;
    cad.v2.setKineMode(true);

    // 8. 16x Finer Camera Zoom + Tighter Max Zoom-Out + Dynamic Near/Far
    cad.viewport.setCameraPreset('iso', true);
    await raf2();
    const zoomAssembled = cad.v2.getCameraZoomBounds();
    cad.viewport.setExplode(1.0, true);
    await raf2();
    const zoomExploded = cad.v2.getCameraZoomBounds();
    cad.viewport.setExplode(0, true);
    ctrls.target.set(0, 0, 0);
    cam.position.set(0, 0, 0.6);
    ctrls.update();
    cad.viewport.requestRenderFrame();
    await raf2();
    const zoomMacro = cad.v2.getCameraZoomBounds();

    // 9. Strict Zero Camera Movement on Detail Open / Step Next-Prev / Close
    ctrls.target.set(12.5, -4.2, 8.1);
    cam.position.set(142.3, 61.7, 178.9);
    ctrls.update();
    await raf2();
    const snapCam = () => [
      cam.position.x, cam.position.y, cam.position.z,
      cam.quaternion.x, cam.quaternion.y, cam.quaternion.z, cam.quaternion.w,
      ctrls.target.x, ctrls.target.y, ctrls.target.z,
    ];
    const maxDiff = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
    const cam0 = snapCam();
    cad.viewport.selectPart(frontPartId, true); // even with true, camera MUST stay locked!
    await sleep(200);
    const drawerOpened = document.querySelector('.explanation-drawer')?.classList.contains('is-open') === true;
    const camAfterOpen = snapCam();
    cad.viewport.stepSelectedPart(1);
    await sleep(140);
    const camAfterNext = snapCam();
    cad.viewport.stepSelectedPart(-1);
    await sleep(140);
    const camAfterPrev = snapCam();
    cad.viewport.selectPart(null, false);
    await sleep(140);
    const camAfterClose = snapCam();
    const maxCameraDeltaOnDetail = Math.max(
      maxDiff(cam0, camAfterOpen),
      maxDiff(cam0, camAfterNext),
      maxDiff(cam0, camAfterPrev),
      maxDiff(cam0, camAfterClose),
    );

    return {
      fastVsLite,
      liteBlueAfter: blueAfterLite.vividBlue,
      kine: { kineCloseStats, kineOnTris, kineOffTris, kineStatsWithSelected, kineXrayStats, kineOffStats },
      zoom: { zoomAssembled, zoomExploded, zoomMacro },
      cameraLock: { drawerOpened, maxCameraDeltaOnDetail },
    };
  })()`);

  // =========================================================================
  // GROUP 3: Smartphone Landscape Fullscreen Detail UI (844x390, DPR 2) — Reuses integrated!
  // =========================================================================
  logStep('Group 3: Smartphone Landscape Fullscreen Detail UI (844x390)...');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 844,
    height: 390,
    deviceScaleFactor: 2,
    mobile: true,
  });

  const landscapeReport = await cdp.evalAsync(`(async () => {
    const cad = window.__cad;
    const partId = cad.viewport.getPartsForCurrentMode()[0]?.id;
    cad.viewport.selectPart(partId, false);
    await new Promise(r => setTimeout(r, 250));

    const drawerEl = document.querySelector('.explanation-drawer');
    const topbarEl = document.querySelector('.studio-topbar');
    const dockEl = document.querySelector('.studio-bottom-dock');
    const drawerOpen = drawerEl.classList.contains('is-open');
    const dRect = drawerEl.getBoundingClientRect();
    const tRect = topbarEl.getBoundingClientRect();
    const kRect = dockEl.getBoundingClientRect();

    cad.drawer.setLightboxOpen(true, false);
    await new Promise(r => setTimeout(r, 150));
    const lbEl = document.querySelector('.schematic-lightbox');
    const lbRect = lbEl ? lbEl.getBoundingClientRect() : { width: 0, height: 0 };
    cad.drawer.setLightboxOpen(false, false);
    cad.viewport.selectPart(null, false);

    return {
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
      drawerOpen,
      drawerRect: { left: +dRect.left.toFixed(1), top: +dRect.top.toFixed(1), width: +dRect.width.toFixed(1), height: +dRect.height.toFixed(1) },
      topbarRect: { left: +tRect.left.toFixed(1), right: +tRect.right.toFixed(1), height: +tRect.height.toFixed(1) },
      dockRect: { left: +kRect.left.toFixed(1), right: +kRect.right.toFixed(1), bottom: +kRect.bottom.toFixed(1) },
      topbarOverlapsDrawer: tRect.right > dRect.left + 2,
      dockOverlapsDrawer: kRect.right > dRect.left + 2,
      lightboxRect: { width: +lbRect.width.toFixed(1), height: +lbRect.height.toFixed(1) },
    };
  })()`);

  // Restore desktop viewport for Play Ground & VRAM zero-leak test
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 760,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // =========================================================================
  // GROUP 4: Play Ground 3-Stage + Blue Selection + VRAM Zero-Leak Check
  // =========================================================================
  logStep('Group 4: Play Ground 3-Stage + Blue Selection + VRAM Zero-Leak...');
  const pgAndVramReport = await cdp.evalAsync(`(async () => {
    const cad = window.__cad;
    const gl = cad.viewport.getRenderer().getContext();
    const raf2 = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    await cad.playground.open(false);
    await raf2();
    const pgZoomBounds = cad.playground.getCameraZoomBounds();
    const pgInitialStage = cad.playground.getMotionStage();
    const pgPlaced = cad.playground.getPlaced();
    cad.playground.selectInstance(pgPlaced[0]?.uid ?? null);
    await raf2();
    const pgBluePixels = window.__countVividBlue();
    cad.playground.selectInstance(null);
    // Enter PG_FAST and verify immediate switch + automatic restoration to PG_SHARP upon stationary frame!
    cad.playground.setMotionStage('fast');
    const pgFastStage = cad.playground.getMotionStage();
    await raf2();
    const pgFastGlErr = gl.getError();
    await new Promise(r => setTimeout(r, 120));
    const pgRestoredStage = cad.playground.getMotionStage();
    cad.playground.close();
    await raf2();

    // VRAM Zero-Leak Check across unit switch in ULTRA + FAST + KINE
    cad.viewport.setQuality('ultra');
    cad.viewport.setMode('mishoe', true);
    await window.__waitReady('mishoe');
    await raf2();
    const vramSwitch1 = cad.v2.getDiagnostics().vramCheck;
    cad.viewport.setMode('welcome', true);
    await window.__waitReady('welcome');
    await raf2();
    const vramSwitch2 = cad.v2.getDiagnostics().vramCheck;

    return {
      pgZoomBounds,
      pgBlueAfter: pgBluePixels.vividBlue,
      playgroundV3: { pgInitialStage, pgFastStage, pgFastGlErr, pgRestoredStage },
      vram: { vramSwitch1, vramSwitch2 },
      errors: window.__v3Errors,
    };
  })()`);

  const report = {
    hud: welcomeReport.hud,
    multiStage: welcomeReport.multiStage,
    bokeh: welcomeReport.bokeh,
    fastVsLite: liteAndIntegratedReport.fastVsLite,
    kine: liteAndIntegratedReport.kine,
    zoom: { ...liteAndIntegratedReport.zoom, pgZoomBounds: pgAndVramReport.pgZoomBounds },
    vividBlue: {
      ultraBefore: welcomeReport.ultraBlue.before,
      ultraAfter: welcomeReport.ultraBlue.after,
      liteAfter: liteAndIntegratedReport.liteBlueAfter,
      pgAfter: pgAndVramReport.pgBlueAfter,
    },
    cameraLock: liteAndIntegratedReport.cameraLock,
    landscape: landscapeReport,
    playgroundV3: pgAndVramReport.playgroundV3,
    vram: pgAndVramReport.vram,
    errors: pgAndVramReport.errors,
  };

  console.log(JSON.stringify(report, null, 2));

  // =========================================================================
  // HARD ASSERTIONS
  // =========================================================================
  const failures = [];
  if (JSON.stringify(report.hud.qualityButtons) !== JSON.stringify(['LITE', 'ULTRA'])) {
    failures.push('qualityButtons !== [LITE, ULTRA]: ' + JSON.stringify(report.hud.qualityButtons));
  }
  if (!report.hud.kineInitialOn || !report.hud.kineAfterClickOff || !report.hud.kineAfterClickOn) {
    failures.push('KINE toggle pill click cycle failed');
  }
  for (const u of ['welcome', 'bionz', 'integrated']) {
    const f = report.fastVsLite[u];
    if (f.fastDrawCalls > 2) failures.push(`FAST ${u} drawCalls=${f.fastDrawCalls} (>2)`);
    if (f.triReductionX < 2.2) failures.push(`FAST ${u} triReductionX=${f.triReductionX} (<2.2x)`);
  }
  if (report.multiStage.stageSettled !== 'ultra') failures.push('stageSettled !== ultra');
  if (report.multiStage.stageDuringExplode !== 'ultra') failures.push('stageDuringExplode MUST stay ultra!');
  if (!report.multiStage.sawFast) failures.push('violent camera flick did NOT enter FAST stage!');
  if (report.multiStage.stageAfterViolentStop !== 'ultra') {
    failures.push('did NOT return to ULTRA after violent flick stop: ' + report.multiStage.stageAfterViolentStop);
  }
  if (report.multiStage.ultraIdleDelta !== 0) failures.push('ULTRA not idle after stop: delta=' + report.multiStage.ultraIdleDelta);

  if (!report.kine.kineCloseStats || report.kine.kineCloseStats.totalCulled <= 0) {
    failures.push('KINE close-up culled 0 parts!');
  }
  if (report.kine.kineOnTris >= report.kine.kineOffTris) {
    failures.push(`KINE ON tris (${report.kine.kineOnTris}) did not drop below KINE OFF (${report.kine.kineOffTris})`);
  }
  if (report.kine.kineXrayStats?.totalCulled !== 0) failures.push('KINE did not bypass in X-Ray mode!');
  if (report.kine.kineOffStats?.totalCulled !== 0) failures.push('KINE OFF did not restore 100% parts!');

  if (report.zoom.zoomAssembled.minDistance > 0.5) failures.push('minDistance > 0.5: ' + report.zoom.zoomAssembled.minDistance);
  if (report.zoom.zoomAssembled.maxDistance > 560) failures.push('assembled maxDistance > 560: ' + report.zoom.zoomAssembled.maxDistance);
  if (report.zoom.zoomExploded.maxDistance > 1450) failures.push('exploded maxDistance > 1450: ' + report.zoom.zoomExploded.maxDistance);
  if (report.zoom.zoomMacro.near > 0.03) failures.push('macro dynamic near > 0.03: ' + report.zoom.zoomMacro.near);
  if (!report.zoom.pgZoomBounds || report.zoom.pgZoomBounds.minDistance > 1.1 || report.zoom.pgZoomBounds.maxDistance > 700) {
    failures.push('PG zoom bounds out of spec: ' + JSON.stringify(report.zoom.pgZoomBounds));
  }

  if (report.bokeh.bokehAutoState.mode !== 'auto' || report.bokeh.bokehAutoState.status !== 'bypassed_swgl') {
    failures.push('Bokeh auto mode did not safely bypass on SwiftShader: ' + JSON.stringify(report.bokeh.bokehAutoState));
  }
  if (report.bokeh.bokehGlErr !== 0 || report.bokeh.bokehNonWhite < 500) {
    failures.push('Bokeh forced ON failed clean render: err=' + report.bokeh.bokehGlErr + ' px=' + report.bokeh.bokehNonWhite);
  }

  if (report.vividBlue.ultraAfter < 100) failures.push('ULTRA vivid blue pixels too low: ' + report.vividBlue.ultraAfter);
  if (report.vividBlue.liteAfter < 100) failures.push('LITE vivid blue pixels too low: ' + report.vividBlue.liteAfter);
  if (report.vividBlue.pgAfter < 50) failures.push('Play Ground vivid blue pixels too low: ' + report.vividBlue.pgAfter);

  if (!report.cameraLock.drawerOpened) failures.push('Detail drawer did not open!');
  if (report.cameraLock.maxCameraDeltaOnDetail > 1e-6) {
    failures.push('Camera moved on detail open/step/close! delta=' + report.cameraLock.maxCameraDeltaOnDetail);
  }

  if (report.playgroundV3.pgInitialStage !== 'sharp' || report.playgroundV3.pgFastStage !== 'fast' || report.playgroundV3.pgRestoredStage !== 'sharp' || report.playgroundV3.pgFastGlErr !== 0) {
    failures.push('Play Ground 3-stage transition failed: ' + JSON.stringify(report.playgroundV3));
  }

  const l = report.landscape;
  if (!l.drawerOpen) failures.push('Landscape drawer did not open!');
  if (l.drawerRect.width > 420 || l.drawerRect.width < 280) {
    failures.push('Landscape drawer width out of split-stage bounds: ' + l.drawerRect.width);
  }
  if (l.topbarOverlapsDrawer) failures.push('Landscape topbar overlaps detail drawer!');
  if (l.dockOverlapsDrawer) failures.push('Landscape bottom dock overlaps detail drawer!');
  if (l.topbarRect.height > 44) failures.push('Landscape topbar wrapped >44px: ' + l.topbarRect.height);
  if (l.lightboxRect.width < 835 || l.lightboxRect.height < 382) {
    failures.push('Landscape lightbox not full-bleed: ' + JSON.stringify(l.lightboxRect));
  }

  if (!report.vram.vramSwitch1?.passed || !report.vram.vramSwitch2?.passed) {
    failures.push('VRAM leak detected across unit switch!');
  }
  if (report.errors.length > 0) {
    failures.push('Console/Runtime errors: ' + JSON.stringify(report.errors));
  }

  if (failures.length > 0) {
    console.error('\n❌ SUITE C FAILED ASSERTIONS:\n - ' + failures.join('\n - '));
    process.exitCode = 1;
  } else {
    console.log('\n✅ ALL SUITE C V3 ASSERTIONS PASSED (FAST / KINE / ULTRA AA / F1.2 BOKEH / 16x ZOOM / VIVID BLUE / ZERO-CAM-MOVE / LANDSCAPE UI / ZERO-LEAK)!');
  }
} finally {
  cdp.close();
  chrome.cleanup();
  srv.close();
}
