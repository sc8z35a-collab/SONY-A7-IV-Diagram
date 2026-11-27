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
    this.ws = null;
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

async function run() {
  const tBoot = performance.now();
  const opts = parseArgs(process.argv);
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

  try {
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

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
    let curVpKey = `${firstVp[0]}x${firstVp[1]}@${firstDpr}:${Boolean(jobs[0]?.mobile)}`;
    const ext = opts.format === 'jpeg' ? 'jpg' : opts.format;

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const tShot = performance.now();
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
      });
      console.log(
        `[pp ${i + 1}/${jobs.length}] ${job.name}.${ext} (${job.mode} | ${prep?.activeUnit}/${prep?.activeQuality} | ${vp[0]}x${vp[1]} | ${(imgBuf.length / 1024).toFixed(0)}KB | ${elapsedMs}ms)`
      );
    }

    await Promise.all(writePromises);
    const totalMs = Math.round(performance.now() - tBoot);

    if (opts.manifest) {
      const manifestPath = path.join(opts.outDir, 'pp_manifest.json');
      await fsp.writeFile(
        manifestPath,
        JSON.stringify({ engine: 'pp', totalMs, count: results.length, shots: results }, null, 2)
      );
    }

    console.log(
      `\n[pp] Done: ${results.length} artifact(s) saved to ${opts.outDir} in ${totalMs}ms.`
    );
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
