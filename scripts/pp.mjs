#!/usr/bin/env node
/**
 * `pp` — Hyper-Optimized Dedicated Visual Artifact Capture Engine
 * (Zero external npm dependencies: Pure Node 22 + Direct Chrome CDP + In-Memory Static Cache)
 *
 * 6 Capture Modes (--mode or comma-separated --modes):
 *   - ui          : UIのみ (HUD chrome isolated over clean studio backdrop)
 *   - cad         : 3D CADのみ (Pure 3D WebGL CAD canvas, zero UI)
 *   - diagram     : 図説のみ (Auto-selects part, awaits SVG hydration, clips schematic stage)
 *   - explanation : 解説のみ (Auto-selects part, clips explanation drawer)
 *   - full        : 全体 (Full integrated studio view)
 *   - custom      : カスタマイズ (Fine-grained JSON via --custom='{...}')
 *
 * Speed Optimizations:
 *   1. Single Warm Headless Chrome session + Direct CDP WebSocket (zero Puppeteer/Playwright boot tax)
 *   2. In-Memory Static Asset Cache with immutable HTTP caching (zero repeated disk I/O)
 *   3. Smart Batch Pipeline Grouping by (playground, unit, quality) -> eliminates redundant WebGL rebuilds
 *   4. Overlapped Async Disk Writes (PNG/WebP/JPEG written concurrently while next shot prepares)
 *   5. Event-Driven 1-Frame Settle + Optional `--fast` (WebP q=90, ~3x smaller/faster) & `--direct-gl`
 *   6. Built-in 1-word presets: --preset=audit | welcome | mobile | playground | tiers
 *
 * Examples:
 *   npm run pp -- --preset=audit --out=./captures
 *   npm run pp -- --modes=full,cad,ui,diagram,explanation --unit=welcome --quality=ultra
 *   npm run pp -- --mode=diagram --mobile --lightbox --rotate --unit=integrated --fast
 *   npm run pp -- --mode=custom --playground --report --out=./captures
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const BUILTIN_PRESETS = {
  audit: [
    { name: 'pp_welcome_full', mode: 'full', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'iso' } },
    { name: 'pp_welcome_cad_exploded', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0.65, preset: 'iso' } },
    { name: 'pp_ui_only', mode: 'ui', viewport: [1366, 820], options: { unit: 'integrated', quality: 'standard_lite' } },
    { name: 'pp_cad_integrated_lite', mode: 'cad', viewport: [1366, 820], options: { unit: 'integrated', quality: 'standard_lite', explode: 0, preset: 'iso' } },
    { name: 'pp_diagram_only', mode: 'diagram', viewport: [1366, 820], options: { unit: 'integrated', quality: 'standard_lite', partId: 'lens-front-xa' } },
    { name: 'pp_explanation_only', mode: 'explanation', viewport: [1366, 820], options: { unit: 'integrated', quality: 'standard_lite', partId: 'lens-front-xa' } },
  ],
  welcome: [
    { name: 'pp_welcome_ultra_full', mode: 'full', viewport: [1366, 820], options: { unit: 'welcome', quality: 'ultra', explode: 0, preset: 'iso' } },
    { name: 'pp_welcome_ultra_exploded', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'ultra', explode: 0.72, preset: 'iso' } },
    { name: 'pp_welcome_mobile_full', mode: 'full', viewport: [390, 844], dpr: 2, mobile: true, options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'iso' } },
  ],
  mobile: [
    { name: 'pp_mobile_welcome', mode: 'full', viewport: [390, 844], dpr: 2, mobile: true, options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'iso' } },
    { name: 'pp_mobile_diagram_drawer', mode: 'custom', viewport: [390, 844], dpr: 2, mobile: true, options: { unit: 'integrated', quality: 'standard_lite', showCad: true, showUi: true, showDrawer: true, drawerTab: 'diagram', partId: 'lens-front-xa' } },
    { name: 'pp_mobile_diagram_90deg', mode: 'diagram', viewport: [390, 844], dpr: 2, mobile: true, options: { unit: 'integrated', quality: 'standard_lite', partId: 'lens-front-xa', showLightbox: true, lightboxRotate: true } },
  ],
  playground: [
    { name: 'pp_playground_studio', mode: 'custom', viewport: [1366, 820], options: { playground: true, playgroundReport: false, showCad: true, showUi: true } },
    { name: 'pp_playground_1000pt_report', mode: 'custom', viewport: [1366, 820], options: { playground: true, playgroundReport: true, showCad: true, showUi: true } },
  ],
  tiers: [
    { name: 'pp_tier_std_lite', mode: 'cad', viewport: [1366, 820], options: { unit: 'integrated', quality: 'standard_lite', explode: 0, preset: 'iso' } },
    { name: 'pp_tier_std', mode: 'cad', viewport: [1366, 820], options: { unit: 'integrated', quality: 'standard', explode: 0, preset: 'iso' } },
    { name: 'pp_tier_high', mode: 'cad', viewport: [1366, 820], options: { unit: 'integrated', quality: 'high', explode: 0, preset: 'iso' } },
    { name: 'pp_tier_ultra', mode: 'cad', viewport: [1366, 820], options: { unit: 'integrated', quality: 'ultra', explode: 0, preset: 'iso' } },
  ],
};

function parseArgs(argv) {
  const opts = {
    modes: ['full'],
    unit: undefined,
    quality: undefined,
    renderMode: undefined,
    camPreset: undefined,
    packPreset: null,
    explode: undefined,
    partId: undefined,
    mobile: false,
    viewport: null,
    dpr: 1,
    lightbox: false,
    rotate: false,
    playground: false,
    report: false,
    perfHud: undefined,
    custom: {},
    outDir: path.join(ROOT, 'captures'),
    dir: fs.existsSync(path.join(ROOT, 'docs', 'index.html'))
      ? path.join(ROOT, 'docs')
      : path.join(ROOT, 'dist'),
    prefix: '',
    batchFile: null,
    format: 'png',
    imgQuality: 92,
    fast: false,
    directGl: false,
    optimizeOrder: true,
    manifest: false,
    auditMetrics: false,
    diffDir: null,
    roiDiff: false,
    sheet: false,
    sheetGrid: null,
    sheetOnlyDir: null,
    ai: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      console.log(`
pp — Hyper-Optimized 6-Mode Visual Artifact Capture Engine
Usage: npm run pp -- [options]
  --mode=<mode>          ui | cad | diagram | explanation | full | custom
  --modes=<m1,m2,...>    Capture multiple modes in ONE warm Chrome session
  --preset=<pack>        Built-in shot pack: audit | welcome | mobile | playground | tiers
                         (or camera angle: iso | front | side | back)
  --cam=<angle>          Camera angle preset: iso | front | side | back
  --unit=<unitId>        welcome | integrated | body | mishoe | mic | lens | ...
  --quality=<tier>       standard_lite | standard | high | ultra
  --render=<mode>        solid | xray | cad
  --explode=<0..1>       Explode factor (e.g. 0.65)
  --part=<partId>        Specific part ID to select
  --mobile               Smartphone viewport (390x844, DPR 2)
  --viewport=<WxH>       Custom viewport (default 1366x820)
  --dpr=<n>              Device pixel ratio (default 1 desktop / 2 mobile)
  --lightbox             Open schematic fullscreen lightbox
  --rotate               Rotate lightbox 90deg landscape (smartphone mode)
  --playground           Open Play Ground 1.1 3D CAD Studio
  --report               Open Chief Engineer 1,000-point grading modal in Play Ground
  --perf                 Show V2 Perf HUD
  --format=<ext>         png (default lossless) | webp | jpeg
  --q=<1..100>           WebP/JPEG quality (default 92)
  --fast                 Turbo mode: WebP q=90 + pipeline ordering (~3x faster encode)
  --direct-gl            Direct zero-compositor WebGL canvas readback for pure 'cad' mode
  --no-sort              Preserve exact batch job order instead of grouping by unit/quality
  --manifest             Write pp_manifest.json timing & metadata report to --out
  --audit-metrics        Zero-Vision numerical pre-judge (consoleErr, blank, crush, blow, fg, svgOk, overflow)
  --diff-dir=<dir>       Compare shots against baseline dir (0.00% diff -> VISION_NEEDED=0)
  --roi-diff             When diff > 0, save tight Before/After/Diff ROI crop WebP
  --sheet[=<C>x<R>]      Composite all shots + badges into 1 WebP contact sheet (pp_sheet.webp)
  --sheet-only=<dir>     Composite existing image directory into 1 WebP contact sheet
  --ai                   Compact 1-line-per-shot metrics + VISION_NEEDED verdict for AI agents
  --custom='<json>'      Custom CaptureCustomOptions JSON
  --batch=<jobs.json>    Run an array of capture jobs in ONE warm Chrome session
  --out=<dir>            Output directory (default ./captures)
  --prefix=<name>        Optional filename prefix
  --dir=<staticDir>      Static build directory (default docs/ or dist/)
`);
      process.exit(0);
    } else if (arg.startsWith('--mode=')) {
      opts.modes = [arg.slice(7)];
    } else if (arg.startsWith('--modes=')) {
      opts.modes = arg.slice(8).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (arg.startsWith('--unit=')) {
      opts.unit = arg.slice(7);
    } else if (arg.startsWith('--quality=')) {
      opts.quality = arg.slice(10);
    } else if (arg.startsWith('--render=')) {
      opts.renderMode = arg.slice(9);
    } else if (arg.startsWith('--cam=')) {
      opts.camPreset = arg.slice(6);
    } else if (arg.startsWith('--preset=')) {
      const val = arg.slice(9);
      if (BUILTIN_PRESETS[val]) opts.packPreset = val;
      else opts.camPreset = val;
    } else if (arg.startsWith('--explode=')) {
      opts.explode = Number(arg.slice(10));
    } else if (arg.startsWith('--part=')) {
      opts.partId = arg.slice(7);
    } else if (arg === '--mobile') {
      opts.mobile = true;
      opts.viewport = [390, 844];
      opts.dpr = 2;
    } else if (arg.startsWith('--viewport=')) {
      const [w, h] = arg.slice(11).split('x').map(Number);
      if (w > 0 && h > 0) opts.viewport = [w, h];
    } else if (arg.startsWith('--dpr=')) {
      opts.dpr = Number(arg.slice(6)) || 1;
    } else if (arg === '--lightbox') {
      opts.lightbox = true;
    } else if (arg === '--rotate') {
      opts.rotate = true;
    } else if (arg === '--playground') {
      opts.playground = true;
    } else if (arg === '--report') {
      opts.report = true;
    } else if (arg === '--perf') {
      opts.perfHud = true;
    } else if (arg.startsWith('--format=')) {
      const fmt = arg.slice(9).toLowerCase();
      if (fmt === 'png' || fmt === 'webp' || fmt === 'jpeg') opts.format = fmt;
    } else if (arg.startsWith('--q=')) {
      opts.imgQuality = Math.max(10, Math.min(100, Number(arg.slice(4)) || 92));
    } else if (arg === '--fast') {
      opts.fast = true;
      opts.format = 'webp';
      opts.imgQuality = 90;
    } else if (arg === '--direct-gl') {
      opts.directGl = true;
    } else if (arg === '--no-sort') {
      opts.optimizeOrder = false;
    } else if (arg === '--manifest') {
      opts.manifest = true;
    } else if (arg === '--audit-metrics') {
      opts.auditMetrics = true;
    } else if (arg.startsWith('--diff-dir=')) {
      opts.diffDir = path.resolve(arg.slice(11));
      opts.auditMetrics = true;
    } else if (arg === '--roi-diff') {
      opts.roiDiff = true;
      opts.auditMetrics = true;
    } else if (arg === '--sheet') {
      opts.sheet = true;
    } else if (arg.startsWith('--sheet=')) {
      opts.sheet = true;
      const m = arg.slice(8).match(/^(\d+)x(\d+)$/i);
      if (m) opts.sheetGrid = [Number(m[1]), Number(m[2])];
    } else if (arg.startsWith('--sheet-only=')) {
      opts.sheetOnlyDir = path.resolve(arg.slice(13));
      opts.sheet = true;
    } else if (arg === '--ai') {
      opts.ai = true;
    } else if (arg.startsWith('--custom=')) {
      opts.custom = JSON.parse(arg.slice(9));
    } else if (arg.startsWith('--batch=')) {
      opts.batchFile = path.resolve(arg.slice(8));
    } else if (arg.startsWith('--out=')) {
      opts.outDir = path.resolve(arg.slice(6));
    } else if (arg.startsWith('--prefix=')) {
      opts.prefix = arg.slice(9);
    } else if (arg.startsWith('--dir=')) {
      opts.dir = path.resolve(arg.slice(6));
    }
  }

  if (!opts.viewport) opts.viewport = [1366, 820];
  return opts;
}

function findChromeBinary() {
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
  throw new Error('Chrome/Chromium binary not found. Set CHROME_PATH env variable.');
}

function startCachedStaticServer(staticDir) {
  const memCache = new Map();
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = (req.url || '/').split('?')[0];
      let rel = decodeURIComponent(urlPath === '/' ? '/index.html' : urlPath);
      if (rel.endsWith('/')) rel += 'index.html';
      const filePath = path.join(staticDir, rel);
      if (!filePath.startsWith(staticDir)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      let cached = memCache.get(filePath);
      if (!cached) {
        if (!fs.existsSync(filePath)) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        cached = {
          buf: fs.readFileSync(filePath),
          mime: MIME_TYPES[ext] || 'application/octet-stream',
        };
        memCache.set(filePath, cached);
      }
      res.writeHead(200, {
        'Content-Type': cached.mime,
        'Content-Length': cached.buf.length,
        'Cache-Control': 'public, max-age=3600',
      });
      res.end(cached.buf);
    });
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, port: addr.port });
    });
  });
}

async function launchWarmChrome(chromeBin) {
  const userDataDir = fs.mkdtempSync('/tmp/antigravity-pp-chrome-');
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
      '--disable-sync',
      '--disable-translate',
      '--metrics-recording-only',
      '--no-first-run',
      '--use-gl=angle',
      '--use-angle=swiftshader-webgl',
      '--enable-webgl',
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
      '--hide-scrollbars',
      '--mute-audio',
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  let stderrBuf = '';
  const wsUrl = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Chrome launch timeout:\n${stderrBuf}`)), 15000);
    proc.stderr.on('data', (chunk) => {
      stderrBuf += chunk.toString('utf8');
      const m = stderrBuf.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (m) {
        clearTimeout(timer);
        resolve(m[1]);
      }
    });
    proc.on('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited early (${code}):\n${stderrBuf}`));
    });
  });

  const debugPort = new URL(wsUrl).port;
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error('Could not find Chrome page DevTools WebSocket target.');
  }

  return {
    proc,
    pageWsUrl: pageTarget.webSocketDebuggerUrl,
    cleanup: () => {
      try { proc.kill('SIGKILL'); } catch {}
      try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}
    },
  };
}

class CdpSession {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    this.ws = null;
  }

  on(method, fn) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(fn);
  }

  connect() {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(this.wsUrl);
      this.ws = ws;
      ws.addEventListener('open', () => resolve());
      ws.addEventListener('error', (err) => reject(err));
      ws.addEventListener('message', (ev) => {
        const msg = JSON.parse(String(ev.data));
        if (msg.id && this.pending.has(msg.id)) {
          const { res, rej } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) rej(new Error(`CDP ${msg.error.code}: ${msg.error.message}`));
          else res(msg.result);
        } else if (msg.method && this.listeners.has(msg.method)) {
          for (const fn of this.listeners.get(msg.method)) {
            try { fn(msg.params); } catch {}
          }
        }
      });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evalAsync(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (res.exceptionDetails) {
      throw new Error(
        `Page exception: ${res.exceptionDetails.exception?.description || res.exceptionDetails.text}`
      );
    }
    return res.result?.value;
  }

  close() {
    try { this.ws?.close(); } catch {}
  }
}

function findBaselineImage(diffDir, shotName) {
  if (!diffDir || !fs.existsSync(diffDir)) return null;
  for (const ext of ['webp', 'png', 'jpg', 'jpeg']) {
    const p = path.join(diffDir, `${shotName}.${ext}`);
    if (fs.existsSync(p)) {
      const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
      return { file: p, mime, b64: fs.readFileSync(p).toString('base64') };
    }
  }
  return null;
}

/**
 * Zero-dependency pixel metrics, baseline diff & ROI diff crop executed inside the warm Chrome CDP session.
 */
async function analyzeImageInChrome(cdp, imgB64, imgMime, baseline, wantRoiDiff) {
  const payload = JSON.stringify({
    imgUrl: `data:${imgMime};base64,${imgB64}`,
    baseUrl: baseline ? `data:${baseline.mime};base64,${baseline.b64}` : null,
    wantRoiDiff: Boolean(wantRoiDiff),
  });
  return cdp.evalAsync(`(async () => {
    const cfg = ${payload};
    const loadBmp = async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return createImageBitmap(blob);
    };
    const bmp = await loadBmp(cfg.imgUrl);
    const maxW = 360;
    const scale = Math.min(1, maxW / Math.max(1, bmp.width));
    const sw = Math.max(1, Math.round(bmp.width * scale));
    const sh = Math.max(1, Math.round(bmp.height * scale));
    const c = document.createElement('canvas');
    c.width = sw;
    c.height = sh;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bmp, 0, 0, sw, sh);
    const data = ctx.getImageData(0, 0, sw, sh).data;
    const total = sw * sh;
    let sumL = 0, sumL2 = 0, crush = 0, blow = 0, fg = 0;
    const bgR = data[0], bgG = data[1], bgB = data[2];
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sumL += lum;
      sumL2 += lum * lum;
      if (r <= 4 && g <= 4 && b <= 4) crush++;
      if (r >= 252 && g >= 252 && b >= 252) blow++;
      if (Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB) > 22) fg++;
    }
    const mean = sumL / total;
    const std = Math.sqrt(Math.max(0, sumL2 / total - mean * mean));
    const metrics = {
      width: bmp.width,
      height: bmp.height,
      blankFrame: std < 2.2,
      lumaStd: Number(std.toFixed(2)),
      crushPct: Number(((crush / total) * 100).toFixed(2)),
      blowoutPct: Number(((blow / total) * 100).toFixed(2)),
      fgCoveragePct: Number(((fg / total) * 100).toFixed(1)),
      diffPct: null,
      roi: null,
      roiDataUrl: null,
    };

    if (cfg.baseUrl) {
      const bBmp = await loadBmp(cfg.baseUrl);
      const dw = Math.min(640, Math.max(bmp.width, bBmp.width));
      const dScale = dw / Math.max(1, bmp.width);
      const dh = Math.max(1, Math.round(bmp.height * dScale));
      const cA = document.createElement('canvas'); cA.width = dw; cA.height = dh;
      const ctxA = cA.getContext('2d', { willReadFrequently: true });
      ctxA.drawImage(bBmp, 0, 0, dw, dh);
      const dA = ctxA.getImageData(0, 0, dw, dh).data;

      const cB = document.createElement('canvas'); cB.width = dw; cB.height = dh;
      const ctxB = cB.getContext('2d', { willReadFrequently: true });
      ctxB.drawImage(bmp, 0, 0, dw, dh);
      const dB = ctxB.getImageData(0, 0, dw, dh).data;

      let diffPx = 0;
      let minX = dw, minY = dh, maxX = -1, maxY = -1;
      for (let y = 0; y < dh; y++) {
        for (let x = 0; x < dw; x++) {
          const idx = (y * dw + x) * 4;
          const dr = Math.abs(dA[idx] - dB[idx]);
          const dg = Math.abs(dA[idx + 1] - dB[idx + 1]);
          const db = Math.abs(dA[idx + 2] - dB[idx + 2]);
          if (Math.max(dr, dg, db) > 6) {
            diffPx++;
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }
      metrics.diffPct = Number(((diffPx / (dw * dh)) * 100).toFixed(2));
      if (diffPx > 0 && maxX >= minX && maxY >= minY) {
        const pad = 16;
        const rx = Math.max(0, minX - pad);
        const ry = Math.max(0, minY - pad);
        const rw = Math.min(dw - rx, maxX - minX + 1 + pad * 2);
        const rh = Math.min(dh - ry, maxY - minY + 1 + pad * 2);
        metrics.roi = { x: rx, y: ry, w: rw, h: rh };
        if (cfg.wantRoiDiff) {
          const panelW = Math.min(260, Math.max(120, rw));
          const panelH = Math.min(240, Math.max(90, Math.round((rh / Math.max(1, rw)) * panelW)));
          const outC = document.createElement('canvas');
          outC.width = panelW * 3 + 16;
          outC.height = panelH + 24;
          const octx = outC.getContext('2d');
          octx.fillStyle = '#0b1220';
          octx.fillRect(0, 0, outC.width, outC.height);
          octx.drawImage(cA, rx, ry, rw, rh, 4, 22, panelW, panelH);
          octx.drawImage(cB, rx, ry, rw, rh, panelW + 8, 22, panelW, panelH);
          // Diff heat tile
          const heatC = document.createElement('canvas'); heatC.width = rw; heatC.height = rh;
          const hctx = heatC.getContext('2d');
          const hImg = hctx.createImageData(rw, rh);
          for (let y = 0; y < rh; y++) {
            for (let x = 0; x < rw; x++) {
              const sIdx = ((ry + y) * dw + (rx + x)) * 4;
              const tIdx = (y * rw + x) * 4;
              const delta = Math.max(Math.abs(dA[sIdx] - dB[sIdx]), Math.abs(dA[sIdx + 1] - dB[sIdx + 1]), Math.abs(dA[sIdx + 2] - dB[sIdx + 2]));
              if (delta > 6) {
                hImg.data[tIdx] = 244; hImg.data[tIdx + 1] = 63; hImg.data[tIdx + 2] = 94; hImg.data[tIdx + 3] = 255;
              } else {
                hImg.data[tIdx] = dB[sIdx] * 0.35; hImg.data[tIdx + 1] = dB[sIdx + 1] * 0.35; hImg.data[tIdx + 2] = dB[sIdx + 2] * 0.35; hImg.data[tIdx + 3] = 255;
              }
            }
          }
          hctx.putImageData(hImg, 0, 0);
          octx.drawImage(heatC, 0, 0, rw, rh, panelW * 2 + 12, 22, panelW, panelH);
          octx.fillStyle = '#e2e8f0';
          octx.font = 'bold 12px monospace';
          octx.fillText('BEFORE', 8, 15);
          octx.fillText('AFTER', panelW + 12, 15);
          octx.fillStyle = '#fb7185';
          octx.fillText('DIFF ' + metrics.diffPct + '%', panelW * 2 + 16, 15);
          metrics.roiDataUrl = outC.toDataURL('image/webp', 0.85);
        }
      }
      bBmp.close();
    }
    bmp.close();
    return metrics;
  })()`);
}

/**
 * Composite multiple screenshots + color-coded metric badges into ONE lightweight WebP contact sheet.
 */
async function buildContactSheetInChrome(cdp, tiles, gridOverride) {
  const count = tiles.length;
  const cols = gridOverride ? gridOverride[0] : Math.min(3, Math.max(1, count));
  const rows = gridOverride ? gridOverride[1] : Math.max(1, Math.ceil(count / cols));
  // 3x2 default => 1440x640 (480x320 per tile -> Claude ~1228 tok / Gemini 516 tok)
  const tileW = 480;
  const tileH = 320;
  const payload = JSON.stringify({ tiles, cols, rows, tileW, tileH });

  const dataUrl = await cdp.evalAsync(`(async () => {
    const cfg = ${payload};
    const canvas = document.createElement('canvas');
    canvas.width = cfg.cols * cfg.tileW;
    canvas.height = cfg.rows * cfg.tileH;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#090f1d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const headerH = 26;
    for (let i = 0; i < cfg.tiles.length && i < cfg.cols * cfg.rows; i++) {
      const t = cfg.tiles[i];
      const col = i % cfg.cols;
      const row = Math.floor(i / cfg.cols);
      const x = col * cfg.tileW;
      const y = row * cfg.tileH;

      // Tile frame
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 2, y + 2, cfg.tileW - 4, cfg.tileH - 4);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 2, y + 2, cfg.tileW - 4, cfg.tileH - 4);

      // Header bar
      ctx.fillStyle = '#131f36';
      ctx.fillRect(x + 2, y + 2, cfg.tileW - 4, headerH);

      // Status pill
      const stColor = t.status === 'FAIL' ? '#ef4444' : t.status === 'WARN' ? '#f59e0b' : '#10b981';
      ctx.fillStyle = stColor;
      ctx.fillRect(x + 6, y + 6, 42, 17);
      ctx.fillStyle = '#041019';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(t.status || 'PASS', x + 11, y + 18);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(t.label.slice(0, 48), x + 54, y + 18);

      // Draw image aspect-fit inside body region
      const res = await fetch(t.dataUrl);
      const blob = await res.blob();
      const bmp = await createImageBitmap(blob);
      const availW = cfg.tileW - 12;
      const availH = cfg.tileH - headerH - 10;
      const scale = Math.min(availW / bmp.width, availH / bmp.height);
      const dw = Math.round(bmp.width * scale);
      const dh = Math.round(bmp.height * scale);
      const dx = x + 6 + Math.round((availW - dw) / 2);
      const dy = y + headerH + 4 + Math.round((availH - dh) / 2);
      ctx.drawImage(bmp, dx, dy, dw, dh);
      bmp.close();
    }
    return {
      width: canvas.width,
      height: canvas.height,
      dataUrl: canvas.toDataURL('image/webp', 0.86),
    };
  })()`);
  return {
    width: dataUrl.width,
    height: dataUrl.height,
    buf: Buffer.from(dataUrl.dataUrl.split(',')[1], 'base64'),
  };
}

function estimateSheetVisionTokens(w, h) {
  const claude = Math.max(1, Math.round((Math.min(w, 1568) * Math.min(h, 1568)) / 750));
  const gemini = 258 * Math.ceil(w / 768) * Math.ceil(h / 768);
  return { claude, gemini };
}

function buildSmartExecutionOrder(rawJobs) {
  // Group consecutive shots sharing (playground, unit, quality) to minimize expensive WebGL unit rebuilds
  return rawJobs
    .map((job, origIdx) => ({ job, origIdx }))
    .sort((a, b) => {
      const pgA = a.job.options?.playground ? 1 : 0;
      const pgB = b.job.options?.playground ? 1 : 0;
      if (pgA !== pgB) return pgA - pgB;
      const uA = String(a.job.options?.unit || 'welcome');
      const uB = String(b.job.options?.unit || 'welcome');
      if (uA !== uB) {
        if (uA === 'welcome') return -1;
        if (uB === 'welcome') return 1;
        return uA.localeCompare(uB);
      }
      const qA = String(a.job.options?.quality || 'high');
      const qB = String(b.job.options?.quality || 'high');
      if (qA !== qB) return qA.localeCompare(qB);
      return a.origIdx - b.origIdx;
    })
    .map((x) => x.job);
}

async function runSheetOnly(opts, tBoot) {
  const srcDir = opts.sheetOnlyDir;
  if (!fs.existsSync(srcDir)) throw new Error(`--sheet-only directory not found: ${srcDir}`);
  const imgFiles = fs
    .readdirSync(srcDir)
    .filter((f) => /\.(webp|png|jpe?g)$/i.test(f) && !f.startsWith('pp_sheet') && !f.startsWith('roi_diff_'))
    .sort();
  if (imgFiles.length === 0) throw new Error(`No image files found in ${srcDir}`);

  fs.mkdirSync(opts.outDir, { recursive: true });
  const chromeBin = findChromeBinary();
  const chrome = await launchWarmChrome(chromeBin);
  const cdp = new CdpSession(chrome.pageWsUrl);
  try {
    await cdp.connect();
    await cdp.send('Runtime.enable');
    const tiles = imgFiles.map((f, idx) => {
      const ext = path.extname(f).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
      const b64 = fs.readFileSync(path.join(srcDir, f)).toString('base64');
      return {
        label: `#${idx + 1} ${f}`,
        status: 'PASS',
        dataUrl: `data:${mime};base64,${b64}`,
      };
    });
    const sheet = await buildContactSheetInChrome(cdp, tiles, opts.sheetGrid);
    const sheetPath = path.join(opts.outDir, 'pp_sheet.webp');
    await fsp.writeFile(sheetPath, sheet.buf);
    const tok = estimateSheetVisionTokens(sheet.width, sheet.height);
    const ms = Math.round(performance.now() - tBoot);
    console.log(
      `[pp-sheet] OK tiles=${tiles.length} ${sheet.width}x${sheet.height} (${(sheet.buf.length / 1024).toFixed(0)}KB) estTok=claude:${tok.claude}/gemini:${tok.gemini} out=${sheetPath} ${ms}ms`
    );
  } finally {
    cdp.close();
    chrome.cleanup();
  }
}

async function run() {
  const tBoot = performance.now();
  const opts = parseArgs(process.argv);

  if (opts.sheetOnlyDir) {
    await runSheetOnly(opts, tBoot);
    return;
  }

  if (!fs.existsSync(path.join(opts.dir, 'index.html'))) {
    throw new Error(`No built index.html found at ${opts.dir}. Run 'npm run build' first.`);
  }
  fs.mkdirSync(opts.outDir, { recursive: true });

  let rawJobs;
  if (opts.batchFile) {
    const loaded = JSON.parse(fs.readFileSync(opts.batchFile, 'utf8'));
    rawJobs = loaded.map((j) => {
      const mobile = Boolean(j.mobile);
      const flatOpts = {};
      if (j.unit !== undefined) flatOpts.unit = j.unit;
      if (j.quality !== undefined) flatOpts.quality = j.quality;
      if (j.renderMode !== undefined) flatOpts.renderMode = j.renderMode;
      if (j.camPreset !== undefined) flatOpts.preset = j.camPreset;
      if (j.preset !== undefined) flatOpts.preset = j.preset;
      if (typeof j.explode === 'number') flatOpts.explode = j.explode;
      if (j.partId !== undefined) flatOpts.partId = j.partId;
      if (j.lightbox) flatOpts.showLightbox = true;
      if (j.rotate) flatOpts.lightboxRotate = true;
      if (j.playground) flatOpts.playground = true;
      if (j.report) flatOpts.playgroundReport = true;
      if (j.perfHud !== undefined) flatOpts.showPerfHud = j.perfHud;
      return {
        name: j.name || 'shot',
        mode: j.mode || 'full',
        viewport: j.viewport || (mobile ? [390, 844] : [1366, 820]),
        dpr: j.dpr || (mobile ? 2 : 1),
        mobile,
        options: { ...flatOpts, ...(j.options || {}) },
      };
    });
  } else if (opts.packPreset) {
    rawJobs = BUILTIN_PRESETS[opts.packPreset].map((j) => ({
      ...j,
      name: opts.prefix ? `${opts.prefix}_${j.name}` : j.name,
    }));
  } else {
    rawJobs = opts.modes.map((mode) => ({
      name: [
        opts.prefix,
        opts.unit || 'default',
        opts.quality || 'default',
        opts.mobile ? 'mobile' : 'desktop',
        mode,
      ]
        .filter(Boolean)
        .join('_'),
      mode,
      viewport: opts.viewport,
      dpr: opts.dpr,
      mobile: opts.mobile,
      options: {
        ...opts.custom,
        ...(opts.unit ? { unit: opts.unit } : {}),
        ...(opts.quality ? { quality: opts.quality } : {}),
        ...(opts.renderMode ? { renderMode: opts.renderMode } : {}),
        ...(opts.camPreset ? { preset: opts.camPreset } : {}),
        ...(typeof opts.explode === 'number' ? { explode: opts.explode } : {}),
        ...(opts.partId !== undefined ? { partId: opts.partId } : {}),
        ...(opts.lightbox ? { showLightbox: true } : {}),
        ...(opts.rotate ? { lightboxRotate: true } : {}),
        ...(opts.playground ? { playground: true } : {}),
        ...(opts.report ? { playgroundReport: true } : {}),
        ...(opts.perfHud !== undefined ? { showPerfHud: opts.perfHud } : {}),
      },
    }));
  }

  const jobs = opts.optimizeOrder && rawJobs.length > 2 ? buildSmartExecutionOrder(rawJobs) : rawJobs;

  const chromeBin = findChromeBinary();
  const { server, port } = await startCachedStaticServer(opts.dir);
  const chrome = await launchWarmChrome(chromeBin);
  const cdp = new CdpSession(chrome.pageWsUrl);
  const writePromises = [];

  let shotConsoleErrors = 0;
  let shotPageErrors = 0;

  try {
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    cdp.on('Runtime.consoleAPICalled', (p) => {
      if (p?.type === 'error') shotConsoleErrors++;
    });
    cdp.on('Runtime.exceptionThrown', () => {
      shotPageErrors++;
    });

    const firstVp = jobs[0]?.viewport || [1366, 820];
    const firstDpr = jobs[0]?.dpr || (jobs[0]?.mobile ? 2 : 1);
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: firstVp[0],
      height: firstVp[1],
      deviceScaleFactor: firstDpr,
      mobile: Boolean(jobs[0]?.mobile),
    });

    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });

    // Wait for window.__cad.pp (or legacy capture) to mount
    await cdp.evalAsync(`
      new Promise((resolve, reject) => {
        const start = performance.now();
        const poll = () => {
          if (window.__cad && (window.__cad.pp || window.__cad.capture)) return resolve(true);
          if (performance.now() - start > 20000) return reject(new Error('window.__cad.pp did not initialize'));
          setTimeout(poll, 16);
        };
        poll();
      })
    `);

    const results = [];
    const sheetTiles = [];
    let curVpKey = `${firstVp[0]}x${firstVp[1]}@${firstDpr}:${Boolean(jobs[0]?.mobile)}`;
    const ext = opts.format === 'jpeg' ? 'jpg' : opts.format;
    const imgMime =
      opts.format === 'webp' ? 'image/webp' : opts.format === 'jpeg' ? 'image/jpeg' : 'image/png';

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const tShot = performance.now();
      shotConsoleErrors = 0;
      shotPageErrors = 0;

      const vp = job.viewport || [1366, 820];
      const dpr = job.dpr || (job.mobile ? 2 : 1);
      const vpKey = `${vp[0]}x${vp[1]}@${dpr}:${Boolean(job.mobile)}`;
      if (vpKey !== curVpKey) {
        await cdp.send('Emulation.setDeviceMetricsOverride', {
          width: vp[0],
          height: vp[1],
          deviceScaleFactor: dpr,
          mobile: Boolean(job.mobile),
        });
        await cdp.evalAsync(`new Promise(r => requestAnimationFrame(r))`);
        curVpKey = vpKey;
      }

      const prep = await cdp.evalAsync(
        `(window.__cad.pp || window.__cad.capture).prepare(${JSON.stringify(job.mode)}, ${JSON.stringify(job.options || {})})`
      );

      let imgBuf = null;
      if (opts.directGl && job.mode === 'cad' && !prep?.clip) {
        const dataUrl = await cdp.evalAsync(
          `(window.__cad.pp || window.__cad.capture).captureDirectCanvasDataUrl(${JSON.stringify(opts.format)}, ${opts.imgQuality / 100})`
        );
        if (typeof dataUrl === 'string' && dataUrl.includes(',')) {
          imgBuf = Buffer.from(dataUrl.split(',')[1], 'base64');
        }
      }

      if (!imgBuf) {
        const shotParams = {
          format: opts.format,
          fromSurface: true,
          ...(opts.format !== 'png' ? { quality: opts.imgQuality } : {}),
        };
        if (prep?.clip && !job.fullViewport) {
          shotParams.clip = {
            x: prep.clip.x,
            y: prep.clip.y,
            width: prep.clip.width,
            height: prep.clip.height,
            scale: 1,
          };
        }
        const shot = await cdp.send('Page.captureScreenshot', shotParams);
        imgBuf = Buffer.from(shot.data, 'base64');
      }

      const outFile = path.join(opts.outDir, `${job.name}.${ext}`);
      writePromises.push(fsp.writeFile(outFile, imgBuf));

      let audit = null;
      let roiFile = null;
      const imgB64 = opts.auditMetrics || opts.sheet ? imgBuf.toString('base64') : null;

      if (opts.auditMetrics) {
        const domCheck = await cdp.evalAsync(`(() => {
          const mode = ${JSON.stringify(job.mode)};
          const stage = document.querySelector('.schematic-lightbox-panel, .schematic-stage');
          const stageVisible = Boolean(stage && stage.getBoundingClientRect().width > 20 && getComputedStyle(stage).display !== 'none');
          const svgs = document.querySelectorAll('.schematic-stage svg, .schematic-lightbox-panel svg');
          let svgOk = null;
          if (mode === 'diagram' || stageVisible) {
            svgOk = false;
            for (const s of svgs) {
              const r = s.getBoundingClientRect();
              if (r.width > 40 && r.height > 40) { svgOk = true; break; }
            }
          }
          const overflowPx = Math.max(0, Math.round(document.documentElement.scrollWidth - window.innerWidth));
          return { svgOk, uiOverflowPx: overflowPx };
        })()`);

        const baseline = findBaselineImage(opts.diffDir, job.name);
        const px = await analyzeImageInChrome(cdp, imgB64, imgMime, baseline, opts.roiDiff);

        if (px.roiDataUrl) {
          roiFile = path.join(opts.outDir, `roi_diff_${job.name}.webp`);
          const roiBuf = Buffer.from(px.roiDataUrl.split(',')[1], 'base64');
          writePromises.push(fsp.writeFile(roiFile, roiBuf));
        }

        const errTotal = shotConsoleErrors + shotPageErrors;
        const failed =
          errTotal > 0 ||
          px.blankFrame ||
          (job.mode === 'diagram' && domCheck.svgOk === false);
        const warned = !failed && (px.crushPct > 5.0 || domCheck.uiOverflowPx > 4);
        const status = failed ? 'FAIL' : warned ? 'WARN' : 'PASS';

        audit = {
          consoleErrors: shotConsoleErrors,
          pageErrors: shotPageErrors,
          blankFrame: px.blankFrame,
          crushPct: px.crushPct,
          blowoutPct: px.blowoutPct,
          fgCoveragePct: px.fgCoveragePct,
          svgOk: domCheck.svgOk,
          uiOverflowPx: domCheck.uiOverflowPx,
          diffPct: px.diffPct,
          roi: px.roi,
          roiFile,
          status,
        };
      }

      if (opts.sheet) {
        const badgeTag = audit
          ? `${job.name} (${job.mode}|fg=${audit.fgCoveragePct}%${audit.diffPct !== null ? `|d=${audit.diffPct}%` : ''})`
          : `${job.name} (${job.mode}|${prep?.activeUnit}/${prep?.activeQuality})`;
        sheetTiles.push({
          label: badgeTag,
          status: audit?.status || 'PASS',
          dataUrl: `data:${imgMime};base64,${imgB64}`,
        });
      }

      const elapsedMs = Math.round(performance.now() - tShot);
      results.push({
        name: job.name,
        mode: job.mode,
        unit: prep?.activeUnit,
        quality: prep?.activeQuality,
        part: prep?.selectedPartId,
        viewport: `${vp[0]}x${vp[1]}`,
        format: opts.format,
        bytes: imgBuf.length,
        clip: prep?.clip ? `${prep.clip.width}x${prep.clip.height}` : 'full',
        ms: elapsedMs,
        file: outFile,
        ...(audit ? { audit } : {}),
      });

      if (opts.ai) {
        if (audit) {
          console.log(
            `[pp ${i + 1}/${jobs.length}] ${job.name} | ${job.mode} | err=${audit.consoleErrors + audit.pageErrors} blank=${audit.blankFrame ? 1 : 0} crush=${audit.crushPct}% blow=${audit.blowoutPct}% fg=${audit.fgCoveragePct}% svg=${audit.svgOk === null ? '-' : audit.svgOk ? 'ok' : 'FAIL'} ovf=${audit.uiOverflowPx}px${audit.diffPct !== null ? ` diff=${audit.diffPct}%` : ''} | ${audit.status} (${elapsedMs}ms)`
          );
        } else {
          console.log(
            `[pp ${i + 1}/${jobs.length}] ${job.name}.${ext} | ${job.mode} | ${prep?.activeUnit}/${prep?.activeQuality} | ${(imgBuf.length / 1024).toFixed(0)}KB ${elapsedMs}ms`
          );
        }
      } else {
        console.log(
          `[pp ${i + 1}/${jobs.length}] ${job.name}.${ext} (${job.mode} | ${prep?.activeUnit}/${prep?.activeQuality} | ${vp[0]}x${vp[1]} | ${(imgBuf.length / 1024).toFixed(0)}KB | ${elapsedMs}ms)`
        );
      }
    }

    let sheetInfo = null;
    if (opts.sheet && sheetTiles.length > 0) {
      const sheet = await buildContactSheetInChrome(cdp, sheetTiles, opts.sheetGrid);
      const sheetPath = path.join(opts.outDir, 'pp_sheet.webp');
      writePromises.push(fsp.writeFile(sheetPath, sheet.buf));
      const estTok = estimateSheetVisionTokens(sheet.width, sheet.height);
      sheetInfo = {
        file: sheetPath,
        width: sheet.width,
        height: sheet.height,
        bytes: sheet.buf.length,
        estTokens: estTok,
      };
    }

    await Promise.all(writePromises);
    const totalMs = Math.round(performance.now() - tBoot);

    // Zero-vision decision
    let visionNeeded = 1;
    let visionReason = 'initial_capture';
    if (opts.auditMetrics) {
      const anyFail = results.some((r) => r.audit?.status === 'FAIL');
      const allDiffed = opts.diffDir && results.every((r) => typeof r.audit?.diffPct === 'number');
      const maxDiff = allDiffed
        ? Math.max(...results.map((r) => r.audit.diffPct))
        : null;
      if (!anyFail && allDiffed && maxDiff === 0) {
        visionNeeded = 0;
        visionReason = 'zero_diff_all_metrics_pass';
      } else if (anyFail) {
        visionNeeded = 1;
        visionReason = 'metric_failure_detected';
      } else if (allDiffed && maxDiff > 0) {
        visionNeeded = 1;
        visionReason = `visual_diff_max_${maxDiff}pct`;
      }
    }

    if (opts.manifest) {
      const manifestPath = path.join(opts.outDir, 'pp_manifest.json');
      await fsp.writeFile(
        manifestPath,
        JSON.stringify(
          {
            engine: 'pp',
            totalMs,
            count: results.length,
            visionNeeded,
            visionReason,
            ...(sheetInfo ? { sheet: sheetInfo } : {}),
            shots: results,
          },
          null,
          2
        )
      );
    }

    if (opts.ai) {
      const sheetPart = sheetInfo
        ? ` | sheet=${sheetInfo.file} (${sheetInfo.width}x${sheetInfo.height}, ${(sheetInfo.bytes / 1024).toFixed(0)}KB, estTok=claude:${sheetInfo.estTokens.claude}/gemini:${sheetInfo.estTokens.gemini})`
        : '';
      console.log(
        `[pp SUMMARY] shots=${results.length} ${totalMs}ms | VISION_NEEDED=${visionNeeded} (${visionReason})${sheetPart}`
      );
    } else {
      console.log(
        `\n[pp] Done: ${results.length} artifact(s) saved to ${opts.outDir} in ${totalMs}ms.${sheetInfo ? ` Sheet: ${sheetInfo.file} (${sheetInfo.width}x${sheetInfo.height})` : ''}`
      );
    }
  } finally {
    cdp.close();
    chrome.cleanup();
    server.close();
  }
}

run().catch((err) => {
  console.error('[pp ERROR]', err);
  process.exit(1);
});
