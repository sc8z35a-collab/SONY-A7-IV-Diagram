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

const PMREM_CACHE_DIR = '/tmp/antigravity-pp-pmrem-v1';

function startServer() {
  const mem = new Map();
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const urlPath = (req.url || '/').split('?')[0];
      if (urlPath.startsWith('/__pp_pmrem/')) {
        const key = path.basename(urlPath).replace(/[^a-zA-Z0-9._-]/g, '');
        const cacheFile = path.join(PMREM_CACHE_DIR, key);
        if (req.method === 'PUT' || req.method === 'POST') {
          const chunks = [];
          req.on('data', (c) => chunks.push(c));
          req.on('end', () => {
            try {
              fs.mkdirSync(PMREM_CACHE_DIR, { recursive: true });
              fs.writeFileSync(cacheFile, Buffer.concat(chunks));
              res.writeHead(204);
              res.end();
            } catch {
              res.writeHead(500);
              res.end();
            }
          });
          return;
        }
        if (fs.existsSync(cacheFile)) {
          const buf = fs.readFileSync(cacheFile);
          res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': buf.length });
          res.end(buf);
          return;
        }
        res.writeHead(404);
        res.end();
        return;
      }
      const filePath = path.join(DOCS_DIR, urlPath === '/' ? 'index.html' : urlPath);
      let cached = mem.get(filePath);
      if (!cached) {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          cached = {
            buf: fs.readFileSync(filePath),
            mime: MIME[path.extname(filePath)] || 'application/octet-stream',
          };
          mem.set(filePath, cached);
        } else {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
      }
      res.writeHead(200, { 'Content-Type': cached.mime, 'Content-Length': cached.buf.length });
      res.end(cached.buf);
    });
    srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port }));
  });
}

async function launchChrome() {
  const candidates = ['google-chrome', 'chromium', 'chromium-browser', '/usr/bin/google-chrome', '/usr/bin/chromium'];
  let bin = candidates[0];
  for (const c of candidates) {
    if (c.startsWith('/') && fs.existsSync(c)) { bin = c; break; }
  }
  const userDataDir = fs.mkdtempSync('/tmp/ag-ultra-verify-');
  const proc = spawn(
    bin,
    [
      '--headless=new',
      `--user-data-dir=${userDataDir}`,
      '--no-sandbox',
      '--disable-gpu-sandbox',
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
      '--remote-debugging-port=0',
      '--window-size=1280,760',
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  const wsUrl = await new Promise((resolve, reject) => {
    let stderr = '';
    const timer = setTimeout(() => reject(new Error('Chrome launch timeout: ' + stderr)), 15000);
    proc.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
      const m = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (m) { clearTimeout(timer); resolve(m[1]); }
    });
  });
  const listUrl = wsUrl.replace(/^ws:\/\//, 'http://').replace(/\/devtools\/browser\/.*$/, '/json/list');
  const pages = await (await fetch(listUrl)).json();
  const page = pages.find((p) => p.type === 'page') || pages[0];
  return {
    proc,
    wsUrl: page.webSocketDebuggerUrl,
    cleanup: () => {
      try { proc.kill('SIGKILL'); } catch {}
      try { fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 40 }); } catch {}
    },
  };
}

class CDP {
  constructor(wsUrl) { this.wsUrl = wsUrl; this.id = 0; this.pending = new Map(); }
  async connect() {
    await new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
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
    const r = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ': ' + JSON.stringify(r.exceptionDetails.exception));
    return r.result?.value;
  }
  close() { try { this.ws?.close(); } catch {} }
}

const { srv, port } = await startServer();
const chrome = await launchChrome();
const cdp = new CDP(chrome.wsUrl);

try {
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 760, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });

  const report = await cdp.evalAsync(`(async () => {
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
    await waitReady('welcome');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    const cad = window.__cad;
    const rt = cad.viewport.getV2Runtime();

    // 1. Verify Default Quality & Minimalist HUD DOM Audit
    const qualTexts = Array.from(document.querySelectorAll('.quality-pill button')).map(b => b.textContent.trim());
    const hudAudit = {
      defaultQuality: cad.viewport.getQuality(),
      qualityButtons: qualTexts,
      camPillExists: Boolean(document.querySelector('.cam-pill')),
      explodeMiniBtnsCount: document.querySelectorAll('.dock-explode .dock-mini-ic').length,
      explodeSliderExists: Boolean(document.querySelector('.dock-explode .dock-slider')),
      renderModeButtons: Array.from(document.querySelectorAll('.studio-bottom-dock button')).map(b => b.textContent.trim()).filter(Boolean),
      fullscreenBtnExists: Boolean(document.querySelector('[title*="全画面"]')),
      physicsBtnExists: Boolean(document.querySelector('[title*="物理"]')),
      opticsBtnExists: Boolean(document.querySelector('[title*="光学モーション"]')),
      v2HudToggleBtnExists: Boolean(document.querySelector('.unit-v2-perf-toggle')),
      v2HudPanelExists: Boolean(document.querySelector('.unit-v2-perf-panel')),
      playgroundBtnExists: Boolean(document.querySelector('.playground-cta-pill')),
    };

    // Verify P-key / API Perf HUD toggle still works even though button is removed
    const wasOpen = cad.v2.togglePerfHud();
    const panelVisibleAfterToggle = !document.querySelector('.unit-v2-perf-panel').classList.contains('is-hidden');
    cad.v2.setPerfHudVisible(false);

    // 2. Verify ULTRA Settled vs Explode (STAYS ULTRA!) vs Camera Motion (INSTANT LITE!) vs Stop (INSTANT ULTRA!)
    const settledBefore = cad.v2.getDiagnostics();

    // Explode slider drag with stationary camera -> MUST stay ULTRA (motionProxyActive === false)!
    cad.viewport.setExplode(0.55, false);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))));
    const duringExplode = cad.v2.getDiagnostics();
    cad.viewport.setExplode(0, true);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    // Measure raw ULTRA <-> LITE visibility flip latency (100 toggles)
    const tSwap0 = performance.now();
    for (let i = 0; i < 100; i++) {
      rt.setUltraMotionProxyActive(true);
      rt.setUltraMotionProxyActive(false);
    }
    const avgSwapMs = (performance.now() - tSwap0) / 200;

    // Trigger camera viewpoint movement via smooth preset animation -> MUST activate LITE proxy immediately!
    cad.viewport.setCameraPreset('side', false);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const duringCamMove = cad.v2.getDiagnostics();

    // Wait for camera animation + OrbitControls damping to settle -> MUST snap back to ULTRA 2.5x!
    await new Promise((resolve) => {
      const start = performance.now();
      const poll = () => {
        const d = cad.v2.getDiagnostics();
        if (!d.motionProxyActive && d.idle) return resolve(true);
        if (performance.now() - start > 6000) return resolve(false);
        setTimeout(poll, 40);
      };
      setTimeout(poll, 350);
    });
    const afterCamStop = cad.v2.getDiagnostics();

    // Verify 0% idle GPU & disabled dynamic motion
    cad.viewport.setPhysicsActive(true);
    const continuousAnimAfterPhysicsTrue = rt.needsContinuousAnimation(true);
    const frameCount1 = cad.v2.getDiagnostics().renderFrameCount;
    await new Promise(r => setTimeout(r, 350));
    const frameCount2 = cad.v2.getDiagnostics().renderFrameCount;

    // 3. Verify Dual-Resident ULTRA VRAM Zero-Leak across unit switches (welcome -> mishoe -> welcome)
    cad.viewport.setMode('mishoe', true);
    await waitReady('mishoe');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const mishoeDiag = cad.v2.getDiagnostics();

    cad.viewport.setMode('welcome', true);
    await waitReady('welcome');
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const backWelcomeDiag = cad.v2.getDiagnostics();

    return {
      hudAudit,
      perfHudApiToggleWorks: wasOpen && panelVisibleAfterToggle,
      avgSwapMs: +avgSwapMs.toFixed(5),
      settledBefore: { quality: settledBefore.quality, motionProxyActive: settledBefore.motionProxyActive, drawCalls: settledBefore.drawCalls, triangles: settledBefore.triangles },
      duringExplode: { quality: duringExplode.quality, motionProxyActive: duringExplode.motionProxyActive, drawCalls: duringExplode.drawCalls, triangles: duringExplode.triangles },
      duringCamMove: { quality: duringCamMove.quality, motionProxyActive: duringCamMove.motionProxyActive, drawCalls: duringCamMove.drawCalls, triangles: duringCamMove.triangles },
      afterCamStop: { quality: afterCamStop.quality, motionProxyActive: afterCamStop.motionProxyActive, drawCalls: afterCamStop.drawCalls, triangles: afterCamStop.triangles, idle: afterCamStop.idle },
      continuousAnimAfterPhysicsTrue,
      idleDeltaFrames350ms: frameCount2 - frameCount1,
      vramSwitch1: mishoeDiag.vramCheck,
      vramSwitch2: backWelcomeDiag.vramCheck,
    };
  })()`);

  console.log(JSON.stringify(report, null, 2));

  // Hard Assertions!
  const failures = [];
  if (report.hudAudit.defaultQuality !== 'ultra') failures.push('defaultQuality !== ultra');
  if (JSON.stringify(report.hudAudit.qualityButtons) !== JSON.stringify(['LITE', 'ULTRA'])) failures.push('qualityButtons !== [LITE, ULTRA]');
  if (report.hudAudit.camPillExists) failures.push('camPillExists');
  if (report.hudAudit.explodeMiniBtnsCount !== 0) failures.push('explodeMiniBtnsCount !== 0');
  if (report.hudAudit.fullscreenBtnExists) failures.push('fullscreenBtnExists');
  if (report.hudAudit.physicsBtnExists) failures.push('physicsBtnExists');
  if (report.hudAudit.opticsBtnExists) failures.push('opticsBtnExists');
  if (report.hudAudit.v2HudToggleBtnExists) failures.push('v2HudToggleBtnExists');
  if (!report.perfHudApiToggleWorks) failures.push('perfHudApiToggleWorks false');
  if (report.settledBefore.motionProxyActive !== false) failures.push('settledBefore proxy should be false');
  if (report.duringExplode.motionProxyActive !== false) failures.push('duringExplode proxy MUST stay false (ULTRA maintained!)');
  if (report.duringCamMove.motionProxyActive !== true) failures.push('duringCamMove proxy MUST activate true!');
  if (report.duringCamMove.drawCalls >= report.settledBefore.drawCalls) failures.push('duringCamMove drawCalls did not drop to LITE!');
  if (report.afterCamStop.motionProxyActive !== false) failures.push('afterCamStop proxy MUST return false (ULTRA restored!)');
  if (report.avgSwapMs > 0.2) failures.push('avgSwapMs > 0.2ms: ' + report.avgSwapMs);
  if (report.continuousAnimAfterPhysicsTrue !== false) failures.push('dynamic physics still active');
  if (report.idleDeltaFrames350ms !== 0) failures.push('not idle: deltaFrames=' + report.idleDeltaFrames350ms);
  if (!report.vramSwitch1?.passed || !report.vramSwitch2?.passed) failures.push('VRAM leak on dual-resident ULTRA switch!');

  if (failures.length > 0) {
    console.error('FAILED ASSERTIONS:', failures);
    process.exitCode = 1;
  } else {
    console.log('\n✅ ALL 18 ULTRA MOTION-ADAPTIVE, MINIMALIST HUD, 0-LAG SWAP & ZERO-LEAK ASSERTIONS PASSED!');
  }
} finally {
  cdp.close();
  chrome.cleanup();
  srv.close();
}
