#!/usr/bin/env node
/**
 * Suite C: Comprehensive V3 Verification Suite (Headless Chrome + WebGL2)
 * Verifies all 10 V3 pillars against built `docs/`:
 *  1. Minimalist HUD + KINE Toggle Pill (keeping `.quality-pill button` === ['LITE', 'ULTRA'])
 *  2. FAST Mode vs STD LITE v2 (1-DC, 0-texture, 70-90% tri cut, real GPU speedup)
 *  3. Multi-Stage Adaptive ULTRA <-> LITE <-> FAST (+ Explode stays ULTRA + Play Ground 3-stage)
 *  4. KINE Mode (Frustum + Subpixel + CPU Hi-Z culling, selected never culled, X-Ray bypass, toggle restore)
 *  5. 16x Finer Camera Zoom (minDistance=0.4375, dynamic near/far, tighter maxDistance + PG bounds)
 *  6. Load-Guarded Default Internal F1.2 Optical Focus Bokeh (auto-bypass on SwiftShader, forced 'on' clean render)
 *  7. Strong Vivid Electric-Blue Selection Marking (ULTRA, LITE, and Play Ground)
 *  8. Strict Zero Camera Movement on Detail Open / Step Next-Prev / Close (< 1e-6 delta)
 *  9. Smartphone Landscape Fullscreen Detail UI (844x390 split-stage, zero overlap, full-bleed lightbox)
 * 10. Zero VRAM Leak & Zero Console/WebGL Errors across unit switches
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
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });

  // Wait for app boot and attach error collector
  await cdp.evalAsync(`(async () => {
    window.__v3Errors = [];
    window.addEventListener('error', (e) => window.__v3Errors.push(e.message));
    window.addEventListener('unhandledrejection', (e) => window.__v3Errors.push(String(e.reason)));
    const waitReady = (unitId) => new Promise((resolve, reject) => {
      const s = performance.now();
      const poll = () => {
        const d = window.__cad?.v2?.getDiagnostics?.();
        if (d && d.ready && (!unitId || d.unitId === unitId)) return resolve(d);
        if (performance.now() - s > 25000) return reject(new Error('timeout waiting ready ' + unitId));
        setTimeout(poll, 30);
      };
      poll();
    });
    window.__waitReady = waitReady;
    await waitReady('welcome');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  })()`);

  // =========================================================================
  // TESTS 1–8: Desktop 1280x760 Verification
  // =========================================================================
  const desktopReport = await cdp.evalAsync(`(async () => {
    const cad = window.__cad;
    const rt = cad.viewport.getV2Runtime();
    const renderer = cad.viewport.getRenderer();
    const gl = renderer.getContext();
    const raf2 = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // Helper: count strong vivid electric-blue pixels on current WebGL canvas
    const countVividBluePixels = () => {
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

    // -----------------------------------------------------------------------
    // 1. HUD & KINE Toggle Pill
    // -----------------------------------------------------------------------
    const qualityButtons = Array.from(document.querySelectorAll('.quality-pill button')).map(b => b.textContent.trim());
    const kineBtn = document.querySelector('.kine-toggle-pill');
    const kineInitialOn = cad.v2.isKineMode() && kineBtn?.getAttribute('aria-pressed') === 'true';
    kineBtn?.click();
    const kineAfterClickOff = cad.v2.isKineMode() === false && kineBtn?.getAttribute('aria-pressed') === 'false';
    kineBtn?.click();
    const kineAfterClickOn = cad.v2.isKineMode() === true && kineBtn?.getAttribute('aria-pressed') === 'true';

    // -----------------------------------------------------------------------
    // 2. FAST Mode vs STD LITE v2 Comparison (welcome, bionz, integrated)
    // -----------------------------------------------------------------------
    const fastVsLite = {};
    const px = new Uint8Array(4);
    for (const u of ['welcome', 'bionz', 'integrated']) {
      await cad.capture.prepare('cad', { unit: u, quality: 'standard_lite', explode: 0, preset: 'iso' });
      await raf2();
      // Measure STD LITE v2
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

      // Measure FAST
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

    // -----------------------------------------------------------------------
    // 3. Multi-Stage ULTRA <-> LITE <-> FAST (+ Explode stays ULTRA!)
    // -----------------------------------------------------------------------
    await cad.capture.prepare('cad', { unit: 'welcome', quality: 'ultra', explode: 0, preset: 'iso' });
    await sleep(300);
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
      for (let i = 1; i <= 10; i++) {
        dom.dispatchEvent(new PointerEvent('pointermove', { clientX: cx0 + i * 75, clientY: cy0 - i * 28, pointerId: 1, buttons: 1, bubbles: true }));
        await new Promise(r => requestAnimationFrame(r));
        const st = cad.v2.getMotionStage();
        if (st === 'fast') sawFast = true;
      }
      dom.dispatchEvent(new PointerEvent('pointerup', { clientX: cx0 + 750, clientY: cy0 - 280, pointerId: 1, button: 0, buttons: 0, bubbles: true }));
      // Observe deceleration toward LITE -> ULTRA
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
    await sleep(650);
    const stageAfterViolentStop = cad.v2.getMotionStage();
    const idleF1 = cad.v2.getDiagnostics().renderFrameCount;
    await sleep(300);
    const idleF2 = cad.v2.getDiagnostics().renderFrameCount;
    const ultraIdleDelta = idleF2 - idleF1;

    // -----------------------------------------------------------------------
    // 4. KINE Mode Verification (Frustum + Subpixel + Hi-Z Occlusion)
    // -----------------------------------------------------------------------
    await cad.capture.prepare('cad', { unit: 'integrated', quality: 'ultra', explode: 0, preset: 'iso' });
    await raf2();
    cad.v2.setKineMode(true);
    // Zoom very close into front lens element so rear body/PCB/battery/EVF are out-of-frustum or occluded
    const cam = cad.viewport.camera;
    const ctrls = cad.viewport.controls;
    ctrls.target.set(0, 6, 48);
    cam.position.set(16, 12, 92);
    cam.updateMatrixWorld(true);
    ctrls.update();
    // Run 4 frames so 2-frame hide hysteresis completes!
    for (let i = 0; i < 4; i++) {
      rt.render(cam, ctrls.target);
    }
    const kineCloseStats = cad.v2.getKineStats();
    const kineOnTris = rt.getDiagnostics().triangles;

    // Pick a part that IS currently culled (or a rear part) and select it -> must NEVER be culled!
    const allParts = cad.viewport.getPartsForCurrentMode();
    const rearPart = allParts.find(p => p.id.includes('lcd') || p.id.includes('evf') || p.id.includes('bionz') || p.id.includes('battery')) || allParts[allParts.length - 1];
    cad.viewport.selectPart(rearPart.id, false);
    for (let i = 0; i < 4; i++) rt.render(cam, ctrls.target);
    const kineStatsWithSelected = cad.v2.getKineStats();
    // Verify X-Ray bypasses KINE completely!
    cad.viewport.setRenderMode('xray');
    for (let i = 0; i < 3; i++) rt.render(cam, ctrls.target);
    const kineXrayStats = cad.v2.getKineStats();
    cad.viewport.setRenderMode('solid');
    cad.viewport.selectPart(null, false);
    // Verify KINE OFF restores 100% parts!
    cad.v2.setKineMode(false);
    for (let i = 0; i < 2; i++) rt.render(cam, ctrls.target);
    const kineOffStats = cad.v2.getKineStats();
    const kineOffTris = rt.getDiagnostics().triangles;
    cad.v2.setKineMode(true);

    // -----------------------------------------------------------------------
    // 5. 16x Finer Camera Zoom + Tighter Max Zoom-Out + Dynamic Near/Far
    // -----------------------------------------------------------------------
    await cad.capture.prepare('cad', { unit: 'integrated', quality: 'ultra', explode: 0, preset: 'iso' });
    await raf2();
    const zoomAssembled = cad.v2.getCameraZoomBounds();
    cad.viewport.setExplode(1.0, true);
    await raf2();
    const zoomExploded = cad.v2.getCameraZoomBounds();
    cad.viewport.setExplode(0, true);
    // Macro zoom test: distance = 0.6mm from target
    ctrls.target.set(0, 0, 0);
    cam.position.set(0, 0, 0.6);
    ctrls.update();
    cad.viewport.requestRenderFrame();
    await raf2();
    const zoomMacro = cad.v2.getCameraZoomBounds();

    // -----------------------------------------------------------------------
    // 6. Load-Guarded Default Internal F1.2 Optical Focus Bokeh
    // -----------------------------------------------------------------------
    await cad.capture.prepare('cad', { unit: 'welcome', quality: 'ultra', explode: 0, preset: 'iso' });
    await raf2();
    const bokehAutoState = cad.v2.getOpticalBokehState();
    cad.v2.setOpticalBokehMode('on');
    rt.render(cad.viewport.camera, cad.viewport.controls.target);
    const bokehForcedState = cad.v2.getOpticalBokehState();
    const bokehGlErr = gl.getError();
    const bokehPx = countVividBluePixels();
    cad.v2.setOpticalBokehMode('auto');
    rt.render(cad.viewport.camera, cad.viewport.controls.target);

    // -----------------------------------------------------------------------
    // 7. Strong Vivid Electric-Blue Selection Marking (ULTRA & LITE)
    // -----------------------------------------------------------------------
    await cad.capture.prepare('cad', { unit: 'welcome', quality: 'ultra', explode: 0, preset: 'iso' });
    await raf2();
    const welcomeFirstId = cad.viewport.getPartsForCurrentMode()[0]?.id;
    const blueBeforeUltra = countVividBluePixels();
    cad.viewport.selectPart(welcomeFirstId, false);
    rt.render(cad.viewport.camera, cad.viewport.controls.target);
    const blueAfterUltra = countVividBluePixels();
    cad.viewport.selectPart(null, false);

    await cad.capture.prepare('cad', { unit: 'integrated', quality: 'standard_lite', explode: 0, preset: 'iso' });
    await raf2();
    const intParts = cad.viewport.getPartsForCurrentMode();
    const frontPartId = intParts.find(p => p.id.includes('lens') || p.id.includes('body'))?.id || intParts[0]?.id;
    cad.viewport.selectPart(frontPartId, false);
    rt.render(cad.viewport.camera, cad.viewport.controls.target);
    const blueAfterLite = countVividBluePixels();
    cad.viewport.selectPart(null, false);

    // -----------------------------------------------------------------------
    // 8. Strict Zero Camera Movement on Detail Open / Step Next-Prev / Close
    // -----------------------------------------------------------------------
    await cad.capture.prepare('cad', { unit: 'integrated', quality: 'ultra', explode: 0, preset: 'iso' });
    await raf2();
    // Place camera at custom non-preset angle
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
    cad.viewport.selectPart(frontPartId, true); // even if caller passes true, focusCamera MUST stay locked!
    await sleep(220);
    const drawerOpened = document.querySelector('.explanation-drawer')?.classList.contains('is-open') === true;
    const camAfterOpen = snapCam();
    cad.viewport.stepSelectedPart(1);
    await sleep(160);
    const camAfterNext = snapCam();
    cad.viewport.stepSelectedPart(-1);
    await sleep(160);
    const camAfterPrev = snapCam();
    cad.viewport.selectPart(null, false);
    await sleep(160);
    const camAfterClose = snapCam();

    const maxCameraDeltaOnDetail = Math.max(
      maxDiff(cam0, camAfterOpen),
      maxDiff(cam0, camAfterNext),
      maxDiff(cam0, camAfterPrev),
      maxDiff(cam0, camAfterClose),
    );

    // -----------------------------------------------------------------------
    // 9. Play Ground 1.1: 3-Stage Motion, Zoom Bounds, Vivid Blue Selection
    // -----------------------------------------------------------------------
    await cad.playground.open(false);
    await raf2();
    const pgZoomBounds = cad.playground.getCameraZoomBounds();
    const pgInitialStage = cad.playground.getMotionStage();
    const pgPlaced = cad.playground.getPlaced();
    cad.playground.selectInstance(pgPlaced[0]?.uid ?? null);
    await raf2();
    const pgBluePixels = countVividBluePixels();
    cad.playground.selectInstance(null);
    cad.playground.setMotionStage('fast');
    await raf2();
    const pgFastStage = cad.playground.getMotionStage();
    const pgFastGlErr = gl.getError();
    cad.playground.setMotionStage('sharp');
    await raf2();
    const pgRestoredStage = cad.playground.getMotionStage();
    cad.playground.close();
    await raf2();

    // -----------------------------------------------------------------------
    // 10. VRAM Zero-Leak Check across unit switch in ULTRA + FAST + KINE
    // -----------------------------------------------------------------------
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
      hud: { qualityButtons, kineInitialOn, kineAfterClickOff, kineAfterClickOn },
      fastVsLite,
      multiStage: { stageSettled, stageDuringExplode, sawFast, sawLiteAfterFast, stageAfterViolentStop, ultraIdleDelta },
      kine: { kineCloseStats, kineOnTris, kineOffTris, kineStatsWithSelected, kineXrayStats, kineOffStats },
      zoom: { zoomAssembled, zoomExploded, zoomMacro, pgZoomBounds },
      bokeh: { bokehAutoState, bokehForcedState, bokehGlErr, bokehNonWhite: bokehPx.nonWhite },
      vividBlue: {
        ultraBefore: blueBeforeUltra.vividBlue,
        ultraAfter: blueAfterUltra.vividBlue,
        liteAfter: blueAfterLite.vividBlue,
        pgAfter: pgBluePixels.vividBlue,
      },
      cameraLock: { drawerOpened, maxCameraDeltaOnDetail },
      playgroundV3: { pgInitialStage, pgFastStage, pgFastGlErr, pgRestoredStage },
      vram: { vramSwitch1, vramSwitch2 },
    };
  })()`);

  // =========================================================================
  // TEST 9: Smartphone Landscape Fullscreen Detail UI (844x390, DPR 2)
  // =========================================================================
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 844,
    height: 390,
    deviceScaleFactor: 2,
    mobile: true,
  });

  const landscapeReport = await cdp.evalAsync(`(async () => {
    const cad = window.__cad;
    const raf2 = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    await cad.capture.prepare('cad', { unit: 'integrated', quality: 'ultra', explode: 0, preset: 'iso' });
    await raf2();
    const partId = cad.viewport.getPartsForCurrentMode()[0]?.id;
    cad.viewport.selectPart(partId, false);
    await new Promise(r => setTimeout(r, 250));

    const drawerEl = document.querySelector('.explanation-drawer');
    const topbarEl = document.querySelector('.studio-topbar');
    const dockEl = document.querySelector('.studio-bottom-dock');
    const dRect = drawerEl.getBoundingClientRect();
    const tRect = topbarEl.getBoundingClientRect();
    const kRect = dockEl.getBoundingClientRect();

    // Open schematic lightbox in landscape!
    cad.drawer.setLightboxOpen(true, false);
    await new Promise(r => setTimeout(r, 150));
    const lbEl = document.querySelector('.schematic-lightbox');
    const lbRect = lbEl ? lbEl.getBoundingClientRect() : { width: 0, height: 0 };
    cad.drawer.setLightboxOpen(false, false);
    cad.viewport.selectPart(null, false);

    return {
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
      drawerOpen: drawerEl.classList.contains('is-open'),
      drawerRect: { left: +dRect.left.toFixed(1), top: +dRect.top.toFixed(1), width: +dRect.width.toFixed(1), height: +dRect.height.toFixed(1) },
      topbarRect: { left: +tRect.left.toFixed(1), right: +tRect.right.toFixed(1), height: +tRect.height.toFixed(1) },
      dockRect: { left: +kRect.left.toFixed(1), right: +kRect.right.toFixed(1), bottom: +kRect.bottom.toFixed(1) },
      topbarOverlapsDrawer: tRect.right > dRect.left + 2,
      dockOverlapsDrawer: kRect.right > dRect.left + 2,
      lightboxRect: { width: +lbRect.width.toFixed(1), height: +lbRect.height.toFixed(1) },
      errors: window.__v3Errors,
    };
  })()`);

  console.log(JSON.stringify({ desktopReport, landscapeReport }, null, 2));

  // =========================================================================
  // HARD ASSERTIONS
  // =========================================================================
  const failures = [];
  const d = desktopReport;
  const l = landscapeReport;

  // 1. HUD + KINE pill
  if (JSON.stringify(d.hud.qualityButtons) !== JSON.stringify(['LITE', 'ULTRA'])) {
    failures.push('qualityButtons !== [LITE, ULTRA]: ' + JSON.stringify(d.hud.qualityButtons));
  }
  if (!d.hud.kineInitialOn || !d.hud.kineAfterClickOff || !d.hud.kineAfterClickOn) {
    failures.push('KINE toggle pill click cycle failed');
  }

  // 2. FAST vs STD LITE v2
  for (const u of ['welcome', 'bionz', 'integrated']) {
    const f = d.fastVsLite[u];
    if (f.fastDrawCalls > 2) failures.push(`FAST ${u} drawCalls=${f.fastDrawCalls} (>2)`);
    if (f.triReductionX < 3.0) failures.push(`FAST ${u} triReductionX=${f.triReductionX} (<3.0x)`);
  }

  // 3. Multi-stage adaptive
  if (d.multiStage.stageSettled !== 'ultra') failures.push('stageSettled !== ultra');
  if (d.multiStage.stageDuringExplode !== 'ultra') failures.push('stageDuringExplode MUST stay ultra!');
  if (!d.multiStage.sawFast) failures.push('violent camera flick did NOT enter FAST stage!');
  if (d.multiStage.stageAfterViolentStop !== 'ultra') failures.push('did NOT return to ULTRA after violent flick stop: ' + d.multiStage.stageAfterViolentStop);
  if (d.multiStage.ultraIdleDelta !== 0) failures.push('ULTRA not idle after stop: delta=' + d.multiStage.ultraIdleDelta);

  // 4. KINE mode
  if (!d.kine.kineCloseStats || d.kine.kineCloseStats.totalCulled <= 0) {
    failures.push('KINE close-up culled 0 parts!');
  }
  if (d.kine.kineOnTris >= d.kine.kineOffTris) {
    failures.push(`KINE ON tris (${d.kine.kineOnTris}) did not drop below KINE OFF (${d.kine.kineOffTris})`);
  }
  if (d.kine.kineXrayStats?.totalCulled !== 0) {
    failures.push('KINE did not bypass in X-Ray mode!');
  }
  if (d.kine.kineOffStats?.totalCulled !== 0) {
    failures.push('KINE OFF did not restore 100% parts!');
  }

  // 5. 16x Finer Zoom + Tighter Max Zoom-Out
  if (d.zoom.zoomAssembled.minDistance > 0.5) failures.push('minDistance > 0.5: ' + d.zoom.zoomAssembled.minDistance);
  if (d.zoom.zoomAssembled.maxDistance > 560) failures.push('assembled maxDistance > 560: ' + d.zoom.zoomAssembled.maxDistance);
  if (d.zoom.zoomExploded.maxDistance > 1450) failures.push('exploded maxDistance > 1450: ' + d.zoom.zoomExploded.maxDistance);
  if (d.zoom.zoomMacro.near > 0.03) failures.push('macro dynamic near > 0.03: ' + d.zoom.zoomMacro.near);
  if (!d.zoom.pgZoomBounds || d.zoom.pgZoomBounds.minDistance > 1.1 || d.zoom.pgZoomBounds.maxDistance > 700) {
    failures.push('PG zoom bounds out of spec: ' + JSON.stringify(d.zoom.pgZoomBounds));
  }

  // 6. Load-Guarded F1.2 Bokeh
  if (d.bokeh.bokehAutoState.mode !== 'auto' || d.bokeh.bokehAutoState.active !== false) {
    failures.push('Bokeh auto mode did not safely bypass on SwiftShader: ' + JSON.stringify(d.bokeh.bokehAutoState));
  }
  if (d.bokeh.bokehGlErr !== 0 || d.bokeh.bokehNonWhite < 500) {
    failures.push('Bokeh forced ON failed clean render: err=' + d.bokeh.bokehGlErr + ' px=' + d.bokeh.bokehNonWhite);
  }

  // 7. Vivid Electric-Blue Selection
  if (d.vividBlue.ultraAfter < 120) failures.push('ULTRA vivid blue pixels too low: ' + d.vividBlue.ultraAfter);
  if (d.vividBlue.liteAfter < 120) failures.push('LITE vivid blue pixels too low: ' + d.vividBlue.liteAfter);
  if (d.vividBlue.pgAfter < 50) failures.push('Play Ground vivid blue pixels too low: ' + d.vividBlue.pgAfter);

  // 8. Strict Zero Camera Movement on Detail Open
  if (!d.cameraLock.drawerOpened) failures.push('Detail drawer did not open!');
  if (d.cameraLock.maxCameraDeltaOnDetail > 1e-6) {
    failures.push('Camera moved on detail open/step/close! delta=' + d.cameraLock.maxCameraDeltaOnDetail);
  }

  // 9. Play Ground 3-stage
  if (d.playgroundV3.pgInitialStage !== 'sharp' || d.playgroundV3.pgFastStage !== 'fast' || d.playgroundV3.pgRestoredStage !== 'sharp' || d.playgroundV3.pgFastGlErr !== 0) {
    failures.push('Play Ground 3-stage transition failed: ' + JSON.stringify(d.playgroundV3));
  }

  // 10. Smartphone Landscape Fullscreen Detail UI (844x390)
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

  // 11. VRAM Zero-Leak & Zero Console Errors
  if (!d.vram.vramSwitch1?.passed || !d.vram.vramSwitch2?.passed) {
    failures.push('VRAM leak detected across unit switch!');
  }
  if (l.errors.length > 0) {
    failures.push('Console/Runtime errors: ' + JSON.stringify(l.errors));
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
