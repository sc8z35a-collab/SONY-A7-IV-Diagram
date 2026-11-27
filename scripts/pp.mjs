#!/usr/bin/env node
/**
 * `pp1.1` — Hyper-Accelerated Lossless Visual Artifact Capture Engine
 * (Zero external npm dependencies: Pure Node 22 + Single-Process Multi-Tab Chrome CDP
 *  + LRU 3D Tab Affinity + Dedicated 0-WebGL Meta Tab + Binary PMREM LUT Cache
 *  + SwiftShader Contention-Free Raster Scheduler + Optional Warm Daemon)
 *
 * 6 Capture Modes (--mode or comma-separated --modes):
 *   ui | cad | diagram | explanation | full | custom
 *
 * Full AI Agent Manual: scripts/PP1_1_MANUAL.md
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = process.cwd();
const PMREM_CACHE_DIR = '/tmp/antigravity-pp-pmrem-v1';
const GLCACHE_BASE_DIR = '/tmp/antigravity-pp-glcache-v1';

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

const RES_PRESETS = {
  '720p': { viewport: [1280, 720], dpr: 1, mobile: false },
  '1080p': { viewport: [1920, 1080], dpr: 1, mobile: false },
  '1440p': { viewport: [2560, 1440], dpr: 1, mobile: false },
  '4k': { viewport: [3840, 2160], dpr: 1, mobile: false },
  mobile: { viewport: [390, 844], dpr: 2, mobile: true },
  tablet: { viewport: [820, 1180], dpr: 2, mobile: true },
  square: { viewport: [1080, 1080], dpr: 1, mobile: false },
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
  ortho: [
    { name: 'pp_ortho_front', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'front' } },
    { name: 'pp_ortho_back', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'back' } },
    { name: 'pp_ortho_left', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'left' } },
    { name: 'pp_ortho_right', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'right' } },
    { name: 'pp_ortho_top', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'top' } },
    { name: 'pp_ortho_iso', mode: 'cad', viewport: [1366, 820], options: { unit: 'welcome', quality: 'high', explode: 0, preset: 'iso' } },
  ],
};

function parseNumTuple(str, expectedLen) {
  const parts = str.split(',').map((s) => Number(s.trim()));
  if (parts.length !== expectedLen || parts.some((n) => !Number.isFinite(n))) {
    throw new Error(`Expected ${expectedLen} comma-separated numbers, got '${str}'`);
  }
  return parts;
}

function listUnitsCli(jsonMode) {
  const dataDir = path.join(ROOT, 'src', 'data');
  const files = fs.existsSync(dataDir)
    ? fs.readdirSync(dataDir).filter((f) => f.endsWith('.json')).sort()
    : [];
  const units = [];
  for (const f of files) {
    try {
      const parsed = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));
      if (parsed && parsed.unitId) {
        units.push({
          unitId: parsed.unitId,
          nameJa: parsed.nameJa || '',
          nameEn: parsed.nameEn || '',
          partCount: Array.isArray(parsed.parts) ? parsed.parts.length : parsed.declaredPartCount || 0,
        });
      }
    } catch {
      // ignore non-unit json
    }
  }
  if (jsonMode) {
    console.log(JSON.stringify({ engine: 'pp1.1', unitCount: units.length, units }, null, 2));
  } else {
    console.log(`pp1.1 Registered Units (${units.length}):`);
    for (const u of units) {
      console.log(`  ${u.unitId.padEnd(14)} ${String(u.partCount).padStart(4)}p  ${u.nameJa} (${u.nameEn})`);
    }
  }
}

function listPartsCli(unitId, jsonMode) {
  const dataDir = path.join(ROOT, 'src', 'data');
  const fileMap = { mishoe: 'mi_shoe.json' };
  const filePath = path.join(dataDir, fileMap[unitId] || `${unitId}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Unit metadata JSON not found for '${unitId}' (${filePath})`);
  }
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const parts = (parsed.parts || []).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    groupKey: p.groupKey,
    subView: p.miraiSubView ?? p.fabVolume ?? p.lensSection ?? null,
  }));
  if (jsonMode) {
    console.log(JSON.stringify({ engine: 'pp1.1', unitId, count: parts.length, parts }, null, 2));
  } else {
    console.log(`pp1.1 Parts for '${unitId}' (${parts.length}):`);
    for (const p of parts) {
      console.log(`  ${p.id.padEnd(36)} [${p.category}] ${p.title}`);
    }
  }
}

function printHelp() {
  console.log(`
pp1.1 — Hyper-Accelerated Lossless Visual Artifact Capture Engine
Full AI Manual: scripts/PP1_1_MANUAL.md

Usage: npm run pp -- [options]

[Modes & Packs]
  --mode=<mode>              ui | cad | diagram | explanation | full | custom
  --modes=<m1,m2,...>        Capture multiple modes in one run
  --preset=<pack>            audit | welcome | mobile | playground | tiers | ortho
                             (or camera preset name)
  --batch=<jobs.json>        Execute JSON job array across parallel tabs
  --custom='<json>'          Arbitrary CaptureCustomOptions JSON

[Unit, Quality & Rendering]
  --unit=<unitId>            welcome | integrated | camera_body | body | lens | evf | sensor | ...
  --quality=<tier>           standard_lite | standard | high | ultra
  --render=<mode>            solid | xray | cad
  --explode=<0..1>           Explode factor (0..1)
  --part=<partId>            Select part ID
  --no-drawer                Force hide explanation drawer even when part selected
  --section=<axis:val|off>   Axis section cut, e.g. x:0.52 or y:0.45 or off
  --clip-plane=nx,ny,nz,d    Arbitrary 3D world clipping plane
  --isolate                  Isolate --part=<id>
  --only=<id1,id2,...>       Show ONLY listed part IDs
  --hide=<id1,id2,...>       Hide listed part IDs
  --bg=<#hex|transparent>    Studio background hex color or transparent alpha
  --annotate[=N]             Render 2D callout labels for up to N visible parts (default 12)

[Free-Form 6-DoF Camera Work]
  --cam=<preset>             iso | front | side | back | top | bottom | left | right |
                             iso_back | iso_top | iso_low | hero_macro
  --az=<deg> --el=<deg>      Spherical azimuth (deg) & elevation (-89..89 deg)
  --d-az=<deg> --d-el=<deg>  Relative azimuth/elevation delta from preset
  --dist=<mm> --zoom=<x>     Camera distance (mm) or zoom multiplier (>1 closer)
  --cam-pos=x,y,z            Direct 6-DoF camera position (mm)
  --cam-target=x,y,z         Direct 6-DoF camera lookAt target (mm)
  --cam-up=x,y,z             Custom camera up vector
  --fov=<deg> --roll=<deg>   Vertical FOV (5..120 deg) and camera roll angle (deg)
  --pan=dx,dy                Screen-space pan offset (mm)
  --fit-part=<id>            Exact analytical bounding-box auto-fit on single part
  --fit-parts=<id1,id2,...>  Exact union-AABB auto-fit on multiple parts
  --fit-pad=<ratio>          Auto-fit margin multiplier (default 1.18)

[Multi-Angle Sweeps & Studio Views]
  --turntable=<N>            Auto-generate N evenly spaced 360° orbit shots
  --ortho-pack               Auto-generate 6-view CAD pack (front/back/left/right/top/iso)
  --explode-sweep=<v1,v2..>  Auto-generate multi-stage explode sequence (e.g. 0,0.4,0.8,1.0)
  --angles='<json>'          JSON array of per-shot camera/explode overrides
  --lens-section=1|2|3       Lens dissection section (1=Rear, 2=Mid, 3=Front)
  --fab-vol=0..5             Sensor Fab volume
  --fab-stage=<stage>        Sensor Fab stage focus
  --optics-studio            Open Lens Optics Studio
  --optics-scenario=<id>     Lens Optics Studio scenario ID
  --mirai-subview=1..5       FH MIRAI 2028 structure (1..5)
  --mirai-edition=<ed>       beginner | expert
  --mirai-studio=<tab>       reports | matrix | glossary
  --playground --report      Open Play Ground 1.1 (+ 1000-pt Chief Engineer report)
  --lightbox --rotate        Open schematic lightbox (+ 90deg landscape rotation)
  --physics --physics-time=t Physics state & deterministic time step (sec)
  --perf                     Show V2 Perf HUD

[Resolution, Output, Quality Proof & Acceleration]
  --mobile                   Shortcut for 390x844 DPR 2 mobile
  --res=<preset>             720p | 1080p | 1440p | 4k | mobile | tablet | square
  --viewport=<WxH>           Custom CSS viewport (default 1366x820)
  --dpr=<n>                  Device pixel ratio
  --ssaa=2                   2x2 supersampled lossless downsample (ultra-crisp AA!)
  --format=<ext>             png (default lossless) | webp | jpeg
  --q=<1..100>               WebP/JPEG quality (default 92)
  --fast                     WebP q=90 fast encode
  --direct-gl                Zero-compositor WebGL canvas readback for pure 'cad'
  --workers=<auto|N>         Max concurrent tabs (default auto = min(cpus, 4))
  --warm                     Use/start persistent 1-Chrome multi-tab warm daemon (0ms cold boot!)
  --daemon=<status|stop>     Inspect or stop background warm daemon
  --daemon-ttl=<sec>         Warm daemon idle auto-exit timeout (default 180)
  --fresh-cache              Bypass persistent PMREM/HTTP disk cache
  --contact-sheet[=cols]     Stitch all captured shots into pp_contact_sheet.png
  --diff=<baselineDir>       Exact pixel RMSE/PSNR/SSIM comparison vs baseline PNGs
  --manifest                 Write pp_manifest.json (always written with --diff)
  --json                     Print machine-readable JSON summary to stdout
  --out=<dir>                Output directory (use /tmp/... to keep repo clean!)
  --prefix=<name>            Filename prefix
  --dir=<staticDir>          Static build directory (default docs/ or dist/)
  --list-units               Instant zero-Chrome unit inventory
  --list-parts=<unit>        Instant zero-Chrome part ID listing
`);
}

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
    dpr: null,
    ssaa: 1,
    lightbox: false,
    rotate: false,
    playground: false,
    report: false,
    perfHud: undefined,
    noDrawer: false,
    azimuthDeg: undefined,
    elevationDeg: undefined,
    dAzimuthDeg: undefined,
    dElevationDeg: undefined,
    distance: undefined,
    zoom: undefined,
    camPos: undefined,
    camTarget: undefined,
    camUp: undefined,
    rollDeg: undefined,
    fov: undefined,
    panX: undefined,
    panY: undefined,
    fitParts: undefined,
    fitPadding: undefined,
    turntable: 0,
    orthoPack: false,
    explodeSweep: null,
    anglesJson: null,
    sectionAxis: undefined,
    sectionValue: undefined,
    clipPlane: undefined,
    isolate: false,
    onlyParts: undefined,
    hideParts: undefined,
    lensSection: undefined,
    fabVolume: undefined,
    fabStage: undefined,
    opticsStudio: false,
    opticsScenario: undefined,
    miraiSubView: undefined,
    miraiEdition: undefined,
    miraiStudioTab: undefined,
    physicsActive: undefined,
    physicsTime: undefined,
    bgColor: undefined,
    annotate: undefined,
    contactSheet: 0,
    diffDir: null,
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
    json: false,
    workers: 'auto',
    warm: false,
    daemonCmd: null,
    daemonTtl: 180,
    freshCache: false,
    listUnits: false,
    listParts: null,
    isDaemonServer: false,
    daemonStateFile: null,
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg === '--list-units') {
      opts.listUnits = true;
    } else if (arg.startsWith('--list-parts=')) {
      opts.listParts = arg.slice(13);
    } else if (arg === '--__daemon-server') {
      opts.isDaemonServer = true;
    } else if (arg.startsWith('--__daemon-state=')) {
      opts.daemonStateFile = arg.slice(17);
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
    } else if (arg === '--no-drawer') {
      opts.noDrawer = true;
    } else if (arg.startsWith('--az=')) {
      opts.azimuthDeg = Number(arg.slice(5));
    } else if (arg.startsWith('--el=')) {
      opts.elevationDeg = Number(arg.slice(5));
    } else if (arg.startsWith('--d-az=')) {
      opts.dAzimuthDeg = Number(arg.slice(7));
    } else if (arg.startsWith('--d-el=')) {
      opts.dElevationDeg = Number(arg.slice(7));
    } else if (arg.startsWith('--dist=')) {
      opts.distance = Number(arg.slice(7));
    } else if (arg.startsWith('--zoom=')) {
      opts.zoom = Number(arg.slice(7));
    } else if (arg.startsWith('--cam-pos=')) {
      opts.camPos = parseNumTuple(arg.slice(10), 3);
    } else if (arg.startsWith('--cam-target=')) {
      opts.camTarget = parseNumTuple(arg.slice(13), 3);
    } else if (arg.startsWith('--cam-up=')) {
      opts.camUp = parseNumTuple(arg.slice(9), 3);
    } else if (arg.startsWith('--roll=')) {
      opts.rollDeg = Number(arg.slice(7));
    } else if (arg.startsWith('--fov=')) {
      opts.fov = Number(arg.slice(6));
    } else if (arg.startsWith('--pan=')) {
      const [px, py] = parseNumTuple(arg.slice(6), 2);
      opts.panX = px;
      opts.panY = py;
    } else if (arg.startsWith('--fit-part=')) {
      opts.fitParts = [arg.slice(11)];
    } else if (arg.startsWith('--fit-parts=')) {
      opts.fitParts = arg.slice(12).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (arg.startsWith('--fit-pad=')) {
      opts.fitPadding = Number(arg.slice(10));
    } else if (arg.startsWith('--turntable=')) {
      opts.turntable = Math.max(2, Math.min(72, Math.round(Number(arg.slice(12)) || 8)));
    } else if (arg === '--ortho-pack') {
      opts.orthoPack = true;
    } else if (arg.startsWith('--explode-sweep=')) {
      opts.explodeSweep = arg.slice(16).split(',').map((s) => Number(s.trim())).filter(Number.isFinite);
    } else if (arg.startsWith('--angles=')) {
      opts.anglesJson = JSON.parse(arg.slice(9));
    } else if (arg.startsWith('--section=')) {
      const raw = arg.slice(10).toLowerCase();
      if (raw === 'off') {
        opts.sectionAxis = 'off';
      } else {
        const [ax, valStr] = raw.split(':');
        if (ax === 'x' || ax === 'y') {
          opts.sectionAxis = ax;
          opts.sectionValue = valStr !== undefined ? Number(valStr) : 0.5;
        }
      }
    } else if (arg.startsWith('--clip-plane=')) {
      opts.clipPlane = parseNumTuple(arg.slice(13), 4);
    } else if (arg === '--isolate') {
      opts.isolate = true;
    } else if (arg.startsWith('--only=')) {
      opts.onlyParts = arg.slice(7).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (arg.startsWith('--hide=')) {
      opts.hideParts = arg.slice(7).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (arg.startsWith('--lens-section=')) {
      opts.lensSection = Number(arg.slice(15));
    } else if (arg.startsWith('--fab-vol=')) {
      opts.fabVolume = Number(arg.slice(10));
    } else if (arg.startsWith('--fab-stage=')) {
      opts.fabStage = arg.slice(12);
    } else if (arg === '--optics-studio') {
      opts.opticsStudio = true;
    } else if (arg.startsWith('--optics-scenario=')) {
      opts.opticsStudio = true;
      opts.opticsScenario = arg.slice(18);
    } else if (arg.startsWith('--mirai-subview=')) {
      opts.miraiSubView = Number(arg.slice(16));
    } else if (arg.startsWith('--mirai-edition=')) {
      opts.miraiEdition = arg.slice(16);
    } else if (arg.startsWith('--mirai-studio=')) {
      opts.miraiStudioTab = arg.slice(15);
    } else if (arg === '--physics') {
      opts.physicsActive = true;
    } else if (arg.startsWith('--physics-time=')) {
      opts.physicsActive = true;
      opts.physicsTime = Number(arg.slice(15));
    } else if (arg.startsWith('--bg=')) {
      opts.bgColor = arg.slice(5);
    } else if (arg === '--annotate') {
      opts.annotate = 12;
    } else if (arg.startsWith('--annotate=')) {
      opts.annotate = Math.max(1, Math.min(48, Number(arg.slice(11)) || 12));
    } else if (arg === '--mobile') {
      opts.mobile = true;
      opts.viewport = [390, 844];
      opts.dpr = 2;
    } else if (arg.startsWith('--res=')) {
      const rp = RES_PRESETS[arg.slice(6).toLowerCase()];
      if (rp) {
        opts.viewport = [...rp.viewport];
        opts.dpr = rp.dpr;
        opts.mobile = rp.mobile;
      }
    } else if (arg.startsWith('--viewport=')) {
      const [w, h] = arg.slice(11).split('x').map(Number);
      if (w > 0 && h > 0) opts.viewport = [w, h];
    } else if (arg.startsWith('--dpr=')) {
      opts.dpr = Number(arg.slice(6)) || 1;
    } else if (arg.startsWith('--ssaa=')) {
      opts.ssaa = Number(arg.slice(7)) >= 2 ? 2 : 1;
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
    } else if (arg === '--json') {
      opts.json = true;
    } else if (arg.startsWith('--workers=')) {
      const raw = arg.slice(10);
      opts.workers = raw === 'auto' ? 'auto' : Math.max(1, Math.min(8, Number(raw) || 1));
    } else if (arg === '--warm') {
      opts.warm = true;
    } else if (arg.startsWith('--daemon=')) {
      opts.daemonCmd = arg.slice(9);
    } else if (arg.startsWith('--daemon-ttl=')) {
      opts.daemonTtl = Math.max(15, Number(arg.slice(13)) || 180);
    } else if (arg === '--fresh-cache') {
      opts.freshCache = true;
    } else if (arg === '--contact-sheet') {
      opts.contactSheet = -1;
    } else if (arg.startsWith('--contact-sheet=')) {
      opts.contactSheet = Math.max(1, Math.min(8, Number(arg.slice(16)) || 3));
    } else if (arg.startsWith('--diff=')) {
      opts.diffDir = path.resolve(arg.slice(7));
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
  if (opts.dpr === null) opts.dpr = opts.mobile ? 2 : 1;
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

function buildOptionsFromFlags(opts) {
  const o = { ...opts.custom };
  if (opts.unit) o.unit = opts.unit;
  if (opts.quality) o.quality = opts.quality;
  if (opts.renderMode) o.renderMode = opts.renderMode;
  if (opts.camPreset) o.preset = opts.camPreset;
  if (typeof opts.explode === 'number') o.explode = opts.explode;
  if (opts.partId !== undefined) o.partId = opts.partId;
  if (opts.noDrawer) o.noDrawer = true;
  if (opts.lightbox) o.showLightbox = true;
  if (opts.rotate) o.lightboxRotate = true;
  if (opts.playground) o.playground = true;
  if (opts.report) o.playgroundReport = true;
  if (opts.perfHud !== undefined) o.showPerfHud = opts.perfHud;
  if (typeof opts.azimuthDeg === 'number') o.azimuthDeg = opts.azimuthDeg;
  if (typeof opts.elevationDeg === 'number') o.elevationDeg = opts.elevationDeg;
  if (typeof opts.dAzimuthDeg === 'number') o.dAzimuthDeg = opts.dAzimuthDeg;
  if (typeof opts.dElevationDeg === 'number') o.dElevationDeg = opts.dElevationDeg;
  if (typeof opts.distance === 'number') o.distance = opts.distance;
  if (typeof opts.zoom === 'number') o.zoom = opts.zoom;
  if (opts.camPos) o.camPos = opts.camPos;
  if (opts.camTarget) o.camTarget = opts.camTarget;
  if (opts.camUp) o.camUp = opts.camUp;
  if (typeof opts.rollDeg === 'number') o.rollDeg = opts.rollDeg;
  if (typeof opts.fov === 'number') o.fov = opts.fov;
  if (typeof opts.panX === 'number') o.panX = opts.panX;
  if (typeof opts.panY === 'number') o.panY = opts.panY;
  if (opts.fitParts) o.fitParts = opts.fitParts;
  if (typeof opts.fitPadding === 'number') o.fitPadding = opts.fitPadding;
  if (opts.sectionAxis) o.sectionAxis = opts.sectionAxis;
  if (typeof opts.sectionValue === 'number') o.sectionValue = opts.sectionValue;
  if (opts.clipPlane) o.clipPlane = opts.clipPlane;
  if (opts.isolate && opts.partId) o.isolatePart = opts.partId;
  if (opts.onlyParts) o.onlyParts = opts.onlyParts;
  if (opts.hideParts) o.hideParts = opts.hideParts;
  if (typeof opts.lensSection === 'number') o.lensSection = opts.lensSection;
  if (typeof opts.fabVolume === 'number') o.fabVolume = opts.fabVolume;
  if (opts.fabStage) o.fabStage = opts.fabStage;
  if (opts.opticsStudio) o.opticsStudio = true;
  if (opts.opticsScenario) o.opticsScenario = opts.opticsScenario;
  if (typeof opts.miraiSubView === 'number') o.miraiSubView = opts.miraiSubView;
  if (opts.miraiEdition) o.miraiEdition = opts.miraiEdition;
  if (opts.miraiStudioTab) o.miraiStudioTab = opts.miraiStudioTab;
  if (typeof opts.physicsActive === 'boolean') o.physicsActive = opts.physicsActive;
  if (typeof opts.physicsTime === 'number') o.physicsTime = opts.physicsTime;
  if (opts.bgColor !== undefined) o.bgColor = opts.bgColor;
  if (opts.annotate !== undefined) o.annotate = opts.annotate;
  return o;
}

function buildJobsFromOpts(opts) {
  if (opts.batchFile) {
    const loaded = JSON.parse(fs.readFileSync(opts.batchFile, 'utf8'));
    return loaded.map((j, idx) => {
      const mobile = Boolean(j.mobile);
      const flatOpts = {};
      const passthrough = [
        'unit', 'quality', 'renderMode', 'preset', 'explode', 'partId', 'noDrawer',
        'azimuthDeg', 'elevationDeg', 'dAzimuthDeg', 'dElevationDeg', 'distance', 'zoom',
        'camPos', 'camTarget', 'camUp', 'rollDeg', 'fov', 'panX', 'panY', 'fitParts', 'fitPadding',
        'sectionAxis', 'sectionValue', 'clipPlane', 'onlyParts', 'hideParts', 'isolatePart',
        'lensSection', 'fabVolume', 'fabStage', 'opticsStudio', 'opticsScenario',
        'miraiSubView', 'miraiEdition', 'miraiStudioTab', 'physicsActive', 'physicsTime',
        'bgColor', 'annotate', 'showCad', 'showUi', 'showDrawer', 'drawerTab', 'clipSelector',
      ];
      for (const k of passthrough) {
        if (j[k] !== undefined) flatOpts[k] = j[k];
      }
      if (j.camPreset !== undefined) flatOpts.preset = j.camPreset;
      if (j.lightbox) flatOpts.showLightbox = true;
      if (j.rotate) flatOpts.lightboxRotate = true;
      if (j.playground) flatOpts.playground = true;
      if (j.report) flatOpts.playgroundReport = true;
      if (j.perfHud !== undefined) flatOpts.showPerfHud = j.perfHud;
      return {
        name: j.name || `shot_${idx + 1}`,
        mode: j.mode || 'full',
        viewport: j.viewport || (mobile ? [390, 844] : opts.viewport),
        dpr: j.dpr || (mobile ? 2 : opts.dpr),
        mobile,
        ssaa: j.ssaa || opts.ssaa,
        fullViewport: Boolean(j.fullViewport),
        options: { ...flatOpts, ...(j.options || {}) },
      };
    });
  }

  if (opts.packPreset) {
    return BUILTIN_PRESETS[opts.packPreset].map((j) => {
      const mergedOptions = { ...j.options };
      if (opts.unit) mergedOptions.unit = opts.unit;
      if (opts.quality) mergedOptions.quality = opts.quality;
      if (opts.bgColor !== undefined) mergedOptions.bgColor = opts.bgColor;
      if (opts.annotate !== undefined) mergedOptions.annotate = opts.annotate;
      if (opts.packPreset === 'ortho' && opts.fitParts) mergedOptions.fitParts = opts.fitParts;
      if (opts.packPreset === 'ortho' && typeof opts.explode === 'number') mergedOptions.explode = opts.explode;
      return {
        ...j,
        ssaa: opts.ssaa,
        name: opts.prefix ? `${opts.prefix}_${j.name}` : j.name,
        options: mergedOptions,
      };
    });
  }

  const baseOpts = buildOptionsFromFlags(opts);
  const mode = opts.modes[0] || 'cad';
  const unitTag = opts.unit || 'default';
  const qualTag = opts.quality || 'default';
  const prefixBase = [opts.prefix, unitTag, qualTag].filter(Boolean).join('_');

  if (opts.orthoPack) {
    const views = ['front', 'back', 'left', 'right', 'top', 'iso'];
    return views.map((v) => ({
      name: `${prefixBase}_ortho_${v}`,
      mode,
      viewport: opts.viewport,
      dpr: opts.dpr,
      mobile: opts.mobile,
      ssaa: opts.ssaa,
      options: { ...baseOpts, preset: v },
    }));
  }

  if (opts.turntable > 0) {
    const jobs = [];
    for (let i = 0; i < opts.turntable; i++) {
      const az = Math.round((i * 360) / opts.turntable);
      jobs.push({
        name: `${prefixBase}_tt_${String(i).padStart(2, '0')}_az${String(az).padStart(3, '0')}`,
        mode,
        viewport: opts.viewport,
        dpr: opts.dpr,
        mobile: opts.mobile,
        ssaa: opts.ssaa,
        options: {
          ...baseOpts,
          azimuthDeg: az,
          elevationDeg: typeof opts.elevationDeg === 'number' ? opts.elevationDeg : 18,
        },
      });
    }
    return jobs;
  }

  if (opts.explodeSweep && opts.explodeSweep.length > 0) {
    return opts.explodeSweep.map((val, idx) => ({
      name: `${prefixBase}_exp_${String(idx).padStart(2, '0')}_${Math.round(val * 100)}`,
      mode,
      viewport: opts.viewport,
      dpr: opts.dpr,
      mobile: opts.mobile,
      ssaa: opts.ssaa,
      options: { ...baseOpts, explode: val },
    }));
  }

  if (Array.isArray(opts.anglesJson) && opts.anglesJson.length > 0) {
    return opts.anglesJson.map((entry, idx) => {
      const clean = { ...entry };
      delete clean.name;
      delete clean.mode;
      delete clean.viewport;
      delete clean.dpr;
      delete clean.mobile;
      delete clean.ssaa;
      return {
        name: entry.name || `${prefixBase}_angle_${String(idx + 1).padStart(2, '0')}`,
        mode: entry.mode || mode,
        viewport: entry.viewport || opts.viewport,
        dpr: entry.dpr || opts.dpr,
        mobile: entry.mobile ?? opts.mobile,
        ssaa: entry.ssaa || opts.ssaa,
        options: { ...baseOpts, ...clean },
      };
    });
  }

  return opts.modes.map((m) => ({
    name: [opts.prefix, opts.unit || 'default', opts.quality || 'default', opts.mobile ? 'mobile' : 'desktop', m]
      .filter(Boolean)
      .join('_'),
    mode: m,
    viewport: opts.viewport,
    dpr: opts.dpr,
    mobile: opts.mobile,
    ssaa: opts.ssaa,
    options: { ...baseOpts },
  }));
}

function isJobNeeds3d(job) {
  if (job.options?.playground || job.options?.opticsStudio) return true;
  if (job.mode === 'ui' || job.mode === 'diagram' || job.mode === 'explanation') return false;
  if (job.mode === 'custom') return job.options?.showCad !== false;
  return true;
}

function getJobAffinityKey(job) {
  if (job.options?.playground) return 'pg:studio';
  if (!isJobNeeds3d(job)) return 'meta:zero_gl';
  return `3d:${job.options?.unit || 'welcome'}:${job.options?.quality || 'high'}`;
}

function startCachedStaticServer(staticDir, allowPmremCache = true) {
  const memCache = new Map();
  const pmremMemCache = new Map();
  if (allowPmremCache) {
    fs.mkdirSync(PMREM_CACHE_DIR, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = (req.url || '/').split('?')[0];

      if (urlPath.startsWith('/__pp_pmrem/')) {
        const tier = path.basename(urlPath, '.bin').replace(/[^a-z0-9_]/gi, '');
        const diskPath = path.join(PMREM_CACHE_DIR, `${tier}.bin`);
        if (req.method === 'GET') {
          if (!allowPmremCache) {
            res.writeHead(204);
            res.end();
            return;
          }
          let buf = pmremMemCache.get(tier);
          if (!buf && fs.existsSync(diskPath)) {
            buf = fs.readFileSync(diskPath);
            pmremMemCache.set(tier, buf);
          }
          if (!buf) {
            res.writeHead(204);
            res.end();
            return;
          }
          res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Length': buf.length,
            'Cache-Control': 'public, max-age=3600',
          });
          res.end(buf);
          return;
        }
        if (req.method === 'POST') {
          const chunks = [];
          req.on('data', (c) => chunks.push(c));
          req.on('end', () => {
            const full = Buffer.concat(chunks);
            if (allowPmremCache && full.length >= 16 && full.readUInt32LE(0) === 0x504d5231) {
              pmremMemCache.set(tier, full);
              const tmp = `${diskPath}.${process.pid}.${Date.now()}.tmp`;
              fsp.writeFile(tmp, full).then(() => fsp.rename(tmp, diskPath)).catch(() => {});
            }
            res.writeHead(204);
            res.end();
          });
          return;
        }
      }

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
      resolve({ server, port: server.address().port });
    });
  });
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

class AsyncMutex {
  constructor() {
    this.queue = [];
    this.locked = false;
  }
  async run(fn) {
    if (this.locked) {
      await new Promise((r) => this.queue.push(r));
    }
    this.locked = true;
    try {
      return await fn();
    } finally {
      this.locked = false;
      const next = this.queue.shift();
      if (next) next();
    }
  }
}

function acquireCacheSlotDir(slotName, freshCache) {
  if (freshCache) {
    return { dir: fs.mkdtempSync('/tmp/antigravity-pp-chrome-fresh-'), ephemeral: true };
  }
  const slotDir = path.join(GLCACHE_BASE_DIR, slotName);
  const lockFile = path.join(slotDir, 'SingletonLock');
  fs.mkdirSync(slotDir, { recursive: true });
  if (fs.existsSync(lockFile)) {
    try {
      const target = fs.readlinkSync(lockFile);
      const pidMatch = target.match(/-(\d+)$/);
      if (pidMatch) {
        try {
          process.kill(Number(pidMatch[1]), 0);
          return { dir: fs.mkdtempSync('/tmp/antigravity-pp-chrome-ovf-'), ephemeral: true };
        } catch {
          try { fs.unlinkSync(lockFile); } catch {}
        }
      }
    } catch {
      try { fs.unlinkSync(lockFile); } catch {}
    }
  }
  return { dir: slotDir, ephemeral: false };
}

/**
 * Single-Process Multi-Tab Chrome Browser Pool:
 * - Launches ONE Chrome process (ONE shared GPU process & in-memory SwiftShader JIT shader cache!)
 * - Manages multiple CDP page tabs with LRU `(unit, quality)` affinity + a dedicated 0-WebGL meta tab!
 * - Serializes heavy 3D SwiftShader rasterization on <=2-core CPUs while overlapping JS builds,
 *   0-WebGL DOM/SVG captures, and async disk writes cleanly!
 */
class ChromeTabPool {
  constructor(chromeBin, staticPort, opts = {}) {
    this.chromeBin = chromeBin;
    this.staticPort = staticPort;
    this.freshCache = Boolean(opts.freshCache);
    this.wantAlpha = Boolean(opts.wantAlpha);
    this.max3dTabs = Math.max(1, Math.min(4, opts.max3dTabs || 3));
    this.slotName = opts.slotName || 'main';
    this.proc = null;
    this.debugPort = 0;
    this.browserCdp = null;
    this.userDataDir = '';
    this.ephemeral = true;
    this.tabs = []; // { id, cdp, affinityKey, lastUsed, curVpKey, isMetaTab }
    this.rasterMutex = os.cpus().length <= 2 ? new AsyncMutex() : null;
    this.useTick = 0;
  }

  async start() {
    const slot = acquireCacheSlotDir(this.slotName, this.freshCache);
    this.userDataDir = slot.dir;
    this.ephemeral = slot.ephemeral;

    const proc = spawn(
      this.chromeBin,
      [
        '--headless=new',
        '--remote-debugging-port=0',
        `--user-data-dir=${this.userDataDir}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-sync',
        '--disable-translate',
        '--disable-component-update',
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
    this.proc = proc;

    let stderrBuf = '';
    const browserWsUrl = await new Promise((resolve, reject) => {
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

    this.debugPort = Number(new URL(browserWsUrl).port);
    this.browserCdp = new CdpSession(browserWsUrl);
    await this.browserCdp.connect();

    // Attach initial blank tab as slot 0
    const targets = await (await fetch(`http://127.0.0.1:${this.debugPort}/json/list`)).json();
    const first = targets.find((t) => t.type === 'page') || targets[0];
    if (!first?.webSocketDebuggerUrl) {
      throw new Error('Could not find initial Chrome page target.');
    }
    const tab0 = await this.attachPageTarget(first.id, first.webSocketDebuggerUrl, false);
    this.tabs.push(tab0);
  }

  async attachPageTarget(targetId, wsUrl, isMetaTab) {
    const cdp = new CdpSession(wsUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1366,
      height: 820,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const query = this.wantAlpha ? '?pp=1&alpha=1' : '?pp=1';
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${this.staticPort}/${query}` });
    await cdp.evalAsync(`
      new Promise((resolve, reject) => {
        const start = performance.now();
        const poll = () => {
          if (window.__cad && (window.__cad.pp || window.__cad.capture)) return resolve(true);
          if (performance.now() - start > 20000) return reject(new Error('window.__cad.pp did not initialize'));
          setTimeout(poll, 8);
        };
        poll();
      })
    `);
    return {
      targetId,
      cdp,
      affinityKey: isMetaTab ? 'meta:zero_gl' : null,
      lastUsed: ++this.useTick,
      curVpKey: '1366x820@1:false',
      isMetaTab,
      busy: false,
    };
  }

  async createNewTab(isMetaTab) {
    const { targetId } = await this.browserCdp.send('Target.createTarget', { url: 'about:blank' });
    const targets = await (await fetch(`http://127.0.0.1:${this.debugPort}/json/list`)).json();
    const tgt = targets.find((t) => t.id === targetId);
    if (!tgt?.webSocketDebuggerUrl) {
      throw new Error(`Created tab ${targetId} missing websocket URL`);
    }
    const tab = await this.attachPageTarget(targetId, tgt.webSocketDebuggerUrl, isMetaTab);
    this.tabs.push(tab);
    return tab;
  }

  async acquireTabForGroup(affinityKey, allowMultiTab) {
    const isMeta = affinityKey === 'meta:zero_gl';
    if (isMeta) {
      const existingMeta = this.tabs.find((t) => t.isMetaTab && !t.busy);
      if (existingMeta) {
        existingMeta.busy = true;
        existingMeta.lastUsed = ++this.useTick;
        return existingMeta;
      }
      if (allowMultiTab) {
        const tab = await this.createNewTab(true);
        tab.busy = true;
        tab.lastUsed = ++this.useTick;
        return tab;
      }
      const unused = this.tabs.find((t) => !t.busy && t.affinityKey === null);
      if (unused) {
        unused.busy = true;
        unused.isMetaTab = true;
        unused.affinityKey = 'meta:zero_gl';
        unused.lastUsed = ++this.useTick;
        return unused;
      }
      const fallback = this.tabs.find((t) => !t.busy) || this.tabs[0];
      fallback.busy = true;
      fallback.lastUsed = ++this.useTick;
      return fallback;
    }

    // Exact warm affinity hit! (0ms unit rebuild!)
    const exact = this.tabs.find((t) => !t.isMetaTab && !t.busy && t.affinityKey === affinityKey);
    if (exact) {
      exact.busy = true;
      exact.lastUsed = ++this.useTick;
      return exact;
    }

    // Idle pristine tab
    const pristine = this.tabs.find((t) => !t.isMetaTab && !t.busy && t.affinityKey === null);
    if (pristine) {
      pristine.busy = true;
      pristine.affinityKey = affinityKey;
      pristine.lastUsed = ++this.useTick;
      return pristine;
    }

    // Spawn a new resident 3D tab up to max3dTabs (for warm LRU persistence!)
    const threeDTabs = this.tabs.filter((t) => !t.isMetaTab);
    if (allowMultiTab && threeDTabs.length < this.max3dTabs) {
      const tab = await this.createNewTab(false);
      tab.busy = true;
      tab.affinityKey = affinityKey;
      tab.lastUsed = ++this.useTick;
      return tab;
    }

    // LRU evict oldest idle 3D tab
    const idle3d = threeDTabs.filter((t) => !t.busy).sort((a, b) => a.lastUsed - b.lastUsed);
    const victim = idle3d[0] || this.tabs[0];
    victim.busy = true;
    victim.affinityKey = affinityKey;
    victim.lastUsed = ++this.useTick;
    return victim;
  }

  async executeJobOnTab(tab, job, opts) {
    const tShot = performance.now();
    const vp = job.viewport || [1366, 820];
    const baseDpr = job.dpr || (job.mobile ? 2 : 1);
    const ssaa = job.ssaa >= 2 ? 2 : 1;
    const effectiveDpr = baseDpr * ssaa;
    const vpKey = `${vp[0]}x${vp[1]}@${effectiveDpr}:${Boolean(job.mobile)}`;

    // Ensure foreground focus so rAF fires at full 60Hz with zero background throttling
    if (this.tabs.length > 1) {
      await tab.cdp.send('Page.bringToFront');
    }

    if (vpKey !== tab.curVpKey) {
      await tab.cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp[0],
        height: vp[1],
        deviceScaleFactor: effectiveDpr,
        mobile: Boolean(job.mobile),
      });
      tab.curVpKey = vpKey;
    }

    const prep = await tab.cdp.evalAsync(
      `(window.__cad.pp || window.__cad.capture).prepare(${JSON.stringify(job.mode)}, ${JSON.stringify(job.options || {})})`
    );

    const ext = opts.format === 'jpeg' ? 'jpg' : opts.format;
    const mime =
      opts.format === 'webp' ? 'image/webp' : opts.format === 'jpeg' ? 'image/jpeg' : 'image/png';

    let imgBuf = null;
    if (opts.directGl && job.mode === 'cad' && !prep?.clip && !job.options?.annotate && ssaa === 1) {
      const dataUrl = await tab.cdp.evalAsync(
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
        ...(opts.format === 'png'
          ? { optimizeForSpeed: true }
          : { quality: opts.imgQuality }),
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
      const shot = await tab.cdp.send('Page.captureScreenshot', shotParams);
      if (ssaa >= 2) {
        const outW = Math.round((prep?.clip && !job.fullViewport ? prep.clip.width : vp[0]) * baseDpr);
        const outH = Math.round((prep?.clip && !job.fullViewport ? prep.clip.height : vp[1]) * baseDpr);
        imgBuf = await downsampleImageInBrowser(tab.cdp, shot.data, mime, outW, outH, opts.imgQuality / 100);
      } else {
        imgBuf = Buffer.from(shot.data, 'base64');
      }
    }

    const outFile = path.join(opts.outDir, `${job.name}.${ext}`);
    const writePromise = fsp.writeFile(outFile, imgBuf);
    const elapsedMs = Math.round(performance.now() - tShot);

    return {
      result: {
        name: job.name,
        mode: job.mode,
        unit: prep?.activeUnit,
        quality: prep?.activeQuality,
        part: prep?.selectedPartId,
        partCount: prep?.partCount ?? null,
        metaOnly: Boolean(prep?.metaOnly),
        renderCount: prep?.renderCount ?? null,
        viewport: `${vp[0]}x${vp[1]}`,
        dpr: baseDpr,
        ssaa,
        format: opts.format,
        bytes: imgBuf.length,
        clip: prep?.clip ? `${prep.clip.width}x${prep.clip.height}` : 'full',
        cameraState: prep?.cameraState ?? null,
        unitWorldBox: prep?.unitWorldBox ?? null,
        gpuStats: prep?.gpuStats ?? null,
        readyMs: prep?.readyMs ?? null,
        ms: elapsedMs,
        file: outFile,
      },
      buf: imgBuf,
      mime,
      writePromise,
    };
  }

  getPrimaryCdp() {
    return this.tabs[0].cdp;
  }

  async dispose() {
    try {
      await Promise.race([
        this.browserCdp?.send('Browser.close').catch(() => {}),
        new Promise((r) => setTimeout(r, 350)),
      ]);
    } catch {}
    for (const t of this.tabs) t.cdp?.close();
    this.browserCdp?.close();
    await new Promise((r) => {
      if (!this.proc || this.proc.exitCode !== null) return r();
      const tm = setTimeout(() => {
        try { this.proc.kill('SIGKILL'); } catch {}
        r();
      }, 350);
      this.proc.once('exit', () => {
        clearTimeout(tm);
        r();
      });
    });
    if (this.ephemeral && this.userDataDir) {
      try { fs.rmSync(this.userDataDir, { recursive: true, force: true, maxRetries: 4, retryDelay: 30 }); } catch {}
    } else if (this.userDataDir) {
      try { fs.unlinkSync(path.join(this.userDataDir, 'SingletonLock')); } catch {}
    }
  }
}

async function downsampleImageInBrowser(cdp, rawB64, mime, targetW, targetH, quality) {
  const outUrl = await cdp.evalAsync(`
    (async () => {
      const img = new Image();
      img.src = 'data:${mime};base64,${rawB64}';
      await img.decode();
      const c = document.createElement('canvas');
      c.width = ${targetW};
      c.height = ${targetH};
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, ${targetW}, ${targetH});
      return c.toDataURL(${JSON.stringify(mime)}, ${quality});
    })()
  `);
  return Buffer.from(outUrl.split(',')[1], 'base64');
}

async function computePixelDiffInBrowser(cdp, basePngBuf, currPngBuf) {
  const baseB64 = basePngBuf.toString('base64');
  const currB64 = currPngBuf.toString('base64');
  return await cdp.evalAsync(`
    (async () => {
      const load = (b64) => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = 'data:image/png;base64,' + b64;
      });
      const [a, b] = await Promise.all([load(${JSON.stringify(baseB64)}), load(${JSON.stringify(currB64)})]);
      const w = Math.max(a.width, b.width);
      const h = Math.max(a.height, b.height);
      const ca = document.createElement('canvas'); ca.width = w; ca.height = h;
      const cb = document.createElement('canvas'); cb.width = w; cb.height = h;
      const xa = ca.getContext('2d'); xa.drawImage(a, 0, 0);
      const xb = cb.getContext('2d'); xb.drawImage(b, 0, 0);
      const da = xa.getImageData(0, 0, w, h).data;
      const db = xb.getImageData(0, 0, w, h).data;
      const diffCanvas = document.createElement('canvas'); diffCanvas.width = w; diffCanvas.height = h;
      const xd = diffCanvas.getContext('2d');
      const dd = xd.createImageData(w, h);
      const out = dd.data;

      const nPix = w * h;
      let sumSq = 0;
      let changedPix = 0;
      let sumA = 0, sumB = 0;
      for (let i = 0; i < da.length; i += 4) {
        const dr = Math.abs(da[i] - db[i]);
        const dg = Math.abs(da[i + 1] - db[i + 1]);
        const dbv = Math.abs(da[i + 2] - db[i + 2]);
        const maxD = Math.max(dr, dg, dbv);
        sumSq += (dr * dr + dg * dg + dbv * dbv) / 3;
        const la = 0.299 * da[i] + 0.587 * da[i + 1] + 0.114 * da[i + 2];
        const lb = 0.299 * db[i] + 0.587 * db[i + 1] + 0.114 * db[i + 2];
        sumA += la;
        sumB += lb;
        if (maxD > 2) {
          changedPix++;
          out[i] = 255;
          out[i + 1] = Math.min(255, maxD * 4);
          out[i + 2] = 48;
          out[i + 3] = 255;
        } else {
          const g = Math.round(lb * 0.25 + 190);
          out[i] = g; out[i + 1] = g; out[i + 2] = g; out[i + 3] = 255;
        }
      }
      const meanA = sumA / nPix;
      const meanB = sumB / nPix;
      let varA = 0, varB = 0, cov = 0;
      for (let i = 0; i < da.length; i += 4) {
        const la = 0.299 * da[i] + 0.587 * da[i + 1] + 0.114 * da[i + 2] - meanA;
        const lb = 0.299 * db[i] + 0.587 * db[i + 1] + 0.114 * db[i + 2] - meanB;
        varA += la * la;
        varB += lb * lb;
        cov += la * lb;
      }
      varA /= nPix; varB /= nPix; cov /= nPix;
      const C1 = (0.01 * 255) ** 2;
      const C2 = (0.03 * 255) ** 2;
      const ssim = ((2 * meanA * meanB + C1) * (2 * cov + C2)) / ((meanA * meanA + meanB * meanB + C1) * (varA + varB + C2));
      const mse = sumSq / nPix;
      const rmse = Math.sqrt(mse);
      const psnr = mse === 0 ? 999 : 20 * Math.log10(255 / rmse);
      const changedPct = (changedPix / nPix) * 100;
      let diffDataUrl = null;
      if (changedPix > 0) {
        xd.putImageData(dd, 0, 0);
        diffDataUrl = diffCanvas.toDataURL('image/png');
      }
      return {
        width: w,
        height: h,
        sameDimensions: a.width === b.width && a.height === b.height,
        rmse: Number(rmse.toFixed(4)),
        psnrDb: Number(psnr.toFixed(2)),
        ssim: Number(ssim.toFixed(6)),
        changedPixels: changedPix,
        changedPct: Number(changedPct.toFixed(4)),
        diffDataUrl,
      };
    })()
  `);
}

async function stitchContactSheetInBrowser(cdp, entries, requestedCols) {
  const n = entries.length;
  const cols = requestedCols > 0 ? requestedCols : Math.min(4, Math.ceil(Math.sqrt(n)));
  const rows = Math.ceil(n / cols);
  const cellW = 640;
  const cellH = 384;
  const labelH = 32;
  const pad = 12;
  const totalW = cols * (cellW + pad) + pad;
  const totalH = rows * (cellH + labelH + pad) + pad;

  const payload = entries.map((e) => ({
    label: `${e.name} (${e.unit}/${e.quality} | ${e.ms}ms)`,
    dataUrl: `data:${e.mime};base64,${e.buf.toString('base64')}`,
  }));

  const dataUrl = await cdp.evalAsync(`
    (async () => {
      const items = ${JSON.stringify(payload)};
      const c = document.createElement('canvas');
      c.width = ${totalW};
      c.height = ${totalH};
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, c.width, c.height);
      const cols = ${cols};
      const cellW = ${cellW}, cellH = ${cellH}, labelH = ${labelH}, pad = ${pad};
      for (let i = 0; i < items.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = pad + col * (cellW + pad);
        const y = pad + row * (cellH + labelH + pad);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, cellW, cellH);
        const img = new Image();
        img.src = items[i].dataUrl;
        await img.decode();
        const scale = Math.min(cellW / img.width, cellH / img.height);
        const dw = Math.round(img.width * scale);
        const dh = Math.round(img.height * scale);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, x + Math.floor((cellW - dw) / 2), y + Math.floor((cellH - dh) / 2), dw, dh);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x, y + cellH, cellW, labelH);
        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 13px system-ui, -apple-system, sans-serif';
        ctx.fillText(items[i].label, x + 10, y + cellH + 21);
      }
      return c.toDataURL('image/png');
    })()
  `);
  return Buffer.from(dataUrl.split(',')[1], 'base64');
}

async function runDirectCapture(opts, existingDaemon = null) {
  const tBoot = performance.now();
  if (!fs.existsSync(path.join(opts.dir, 'index.html'))) {
    throw new Error(`No built index.html found at ${opts.dir}. Run 'npm run build' first.`);
  }
  fs.mkdirSync(opts.outDir, { recursive: true });

  const rawJobs = buildJobsFromOpts(opts);
  const wantAlpha = rawJobs.some(
    (j) => j.options?.bgColor === 'transparent' || j.options?.bgColor === null
  );

  // Group jobs by (playground | meta:zero_gl | 3d:unit:quality) so unit builds are 100% reused!
  const groupMap = new Map();
  for (let i = 0; i < rawJobs.length; i++) {
    const job = rawJobs[i];
    const key = opts.optimizeOrder ? getJobAffinityKey(job) : `seq:${i}`;
    if (!groupMap.has(key)) groupMap.set(key, []);
    groupMap.get(key).push({ job, origIdx: i });
  }

  let serverObj = existingDaemon?.serverObj ?? null;
  const ownServer = !serverObj;
  if (!serverObj) {
    serverObj = await startCachedStaticServer(opts.dir, !opts.freshCache);
  }

  let pool = existingDaemon?.pool ?? null;
  const ownPool = !pool;
  if (!pool) {
    const maxTabs = opts.workers === 'auto' ? Math.min(4, Math.max(2, os.cpus().length)) : Number(opts.workers);
    pool = new ChromeTabPool(findChromeBinary(), serverObj.port, {
      freshCache: opts.freshCache,
      wantAlpha,
      max3dTabs: maxTabs,
      slotName: 'direct',
    });
    await pool.start();
  }

  try {
    const totalJobs = rawJobs.length;
    let completedCount = 0;
    const allResults = new Array(totalJobs);
    const capturedBuffers = new Array(totalJobs);
    const writePromises = [];

    const metaItems = groupMap.get('meta:zero_gl') || [];
    const threeDGroups = [...groupMap.entries()].filter(([k]) => k !== 'meta:zero_gl');
    const allowMultiTab = Boolean(existingDaemon);

    const runGroupOnTab = async (affinityKey, items) => {
      if (items.length === 0) return;
      const tab = await pool.acquireTabForGroup(affinityKey, allowMultiTab);
      try {
        for (const { job, origIdx } of items) {
          const { result, buf, mime, writePromise } = await pool.executeJobOnTab(tab, job, opts);
          writePromises.push(writePromise);
          allResults[origIdx] = result;
          capturedBuffers[origIdx] = {
            name: job.name,
            unit: result.unit,
            quality: result.quality,
            ms: result.ms,
            buf,
            mime,
          };
          completedCount++;
          if (!opts.json && !existingDaemon) {
            const tag = result.metaOnly ? '0-GL' : `${result.renderCount}f`;
            console.log(
              `[pp1.1 ${completedCount}/${totalJobs}] ${job.name}.${opts.format === 'jpeg' ? 'jpg' : opts.format} (${job.mode}/${tag} | ${result.unit}/${result.quality} | ${result.viewport}${result.ssaa > 1 ? ` SSAA${result.ssaa}x` : ''} | ${(result.bytes / 1024).toFixed(0)}KB | ${result.ms}ms)`
            );
          }
        }
      } finally {
        tab.busy = false;
      }
    };

    // Execute 3D affinity groups on warm LRU tabs (zero SwiftShader contention, zero background rAF stall!)
    for (const [key, items] of threeDGroups) {
      await runGroupOnTab(key, items);
    }
    // Execute 0-WebGL meta-only shots on dedicated meta tab (never evicts warm 3D units!)
    if (metaItems.length > 0) {
      await runGroupOnTab('meta:zero_gl', metaItems);
    }

    let diffSummary = null;
    if (opts.diffDir) {
      const diffCdp = pool.getPrimaryCdp();
      const diffEntries = [];
      for (let i = 0; i < allResults.length; i++) {
        const r = allResults[i];
        const baseFile = path.join(opts.diffDir, path.basename(r.file));
        if (!fs.existsSync(baseFile)) continue;
        const baseBuf = fs.readFileSync(baseFile);
        const currBuf = capturedBuffers[i].buf;
        const stats = await computePixelDiffInBrowser(diffCdp, baseBuf, currBuf);
        let diffPath = null;
        if (stats.diffDataUrl) {
          diffPath = path.join(opts.outDir, `${r.name}_diff.png`);
          writePromises.push(fsp.writeFile(diffPath, Buffer.from(stats.diffDataUrl.split(',')[1], 'base64')));
        }
        const entry = {
          name: r.name,
          sameDimensions: stats.sameDimensions,
          rmse: stats.rmse,
          psnrDb: stats.psnrDb,
          ssim: stats.ssim,
          changedPixels: stats.changedPixels,
          changedPct: stats.changedPct,
          diffFile: diffPath,
        };
        r.diff = entry;
        diffEntries.push(entry);
      }
      if (diffEntries.length > 0) {
        const avgSsim = diffEntries.reduce((a, b) => a + b.ssim, 0) / diffEntries.length;
        const maxRmse = Math.max(...diffEntries.map((d) => d.rmse));
        diffSummary = {
          baselineDir: opts.diffDir,
          comparedCount: diffEntries.length,
          avgSsim: Number(avgSsim.toFixed(6)),
          maxRmse: Number(maxRmse.toFixed(4)),
          entries: diffEntries,
        };
      }
    }

    let contactSheetPath = null;
    if (opts.contactSheet !== 0 && capturedBuffers.length > 0) {
      const sheetBuf = await stitchContactSheetInBrowser(pool.getPrimaryCdp(), capturedBuffers, opts.contactSheet);
      contactSheetPath = path.join(opts.outDir, 'pp_contact_sheet.png');
      writePromises.push(fsp.writeFile(contactSheetPath, sheetBuf));
    }

    await Promise.all(writePromises);
    const totalMs = Math.round(performance.now() - tBoot);

    const payload = {
      engine: 'pp1.1',
      totalMs,
      tabsUsed: pool.tabs.length,
      warmDaemon: Boolean(existingDaemon),
      count: allResults.length,
      outDir: opts.outDir,
      contactSheet: contactSheetPath,
      diffSummary,
      shots: allResults,
    };

    if (opts.manifest) {
      await fsp.writeFile(path.join(opts.outDir, 'pp_manifest.json'), JSON.stringify(payload, null, 2));
    }

    return payload;
  } finally {
    if (ownPool && pool) {
      await pool.dispose();
    }
    if (ownServer && serverObj) {
      serverObj.server.close();
    }
  }
}

// ============================================================================
// PERSISTENT SINGLE-CHROME MULTI-TAB WARM DAEMON (`--warm`, `--daemon=status|stop`)
// ============================================================================
function getDaemonStatePath(staticDir) {
  const hash = crypto.createHash('sha1').update(path.resolve(staticDir)).digest('hex').slice(0, 10);
  return `/tmp/antigravity-pp-daemon-v1-${hash}.json`;
}

async function pingDaemon(stateFile) {
  if (!fs.existsSync(stateFile)) return null;
  try {
    const info = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    const res = await fetch(`http://127.0.0.1:${info.port}/health`, {
      signal: AbortSignal.timeout(1200),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { ...info, ...data };
  } catch {
    return null;
  }
}

async function runDaemonServer(opts) {
  const stateFile = opts.daemonStateFile || getDaemonStatePath(opts.dir);
  const serverObj = await startCachedStaticServer(opts.dir, true);
  const pool = new ChromeTabPool(findChromeBinary(), serverObj.port, {
    freshCache: false,
    wantAlpha: false,
    max3dTabs: 4,
    slotName: 'daemon',
  });
  await pool.start();

  let idleTimer = null;
  let busy = false;
  let shuttingDown = false;
  const runMutex = new AsyncMutex();

  const shutdown = async () => {
    if (shuttingDown) return;
    shuttingDown = true;
    clearTimeout(idleTimer);
    try { fs.unlinkSync(stateFile); } catch {}
    await pool.dispose();
    serverObj.server.close();
    rpcServer.close();
    process.exit(0);
  };

  const resetIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => void shutdown(), opts.daemonTtl * 1000);
  };

  const rpcServer = http.createServer(async (req, res) => {
    resetIdle();
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          ok: true,
          pid: process.pid,
          tabs: pool.tabs.map((t) => ({ affinity: t.affinityKey, isMeta: t.isMetaTab })),
          busy,
          dir: opts.dir,
        })
      );
      return;
    }
    if (req.url === '/stop' && req.method === 'POST') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, stopping: true }));
      setTimeout(() => void shutdown(), 20);
      return;
    }
    if (req.url === '/run' && req.method === 'POST') {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', async () => {
        try {
          const reqOpts = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const payload = await runMutex.run(async () => {
            busy = true;
            clearTimeout(idleTimer);
            try {
              return await runDirectCapture(reqOpts, { serverObj, pool });
            } finally {
              busy = false;
              resetIdle();
            }
          });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(payload));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: String(err?.stack || err) }));
        }
      });
      return;
    }
    res.writeHead(404);
    res.end();
  });
  rpcServer.requestTimeout = 0;
  rpcServer.headersTimeout = 0;
  rpcServer.keepAliveTimeout = 0;

  process.on('SIGTERM', () => void shutdown());
  process.on('SIGINT', () => void shutdown());

  await new Promise((resolve, reject) => {
    rpcServer.on('error', reject);
    rpcServer.listen(0, '127.0.0.1', () => resolve());
  });
  const port = rpcServer.address().port;
  fs.writeFileSync(
    stateFile,
    JSON.stringify({ pid: process.pid, port, dir: opts.dir, startedAt: Date.now() })
  );
  resetIdle();
}

async function runViaWarmDaemon(opts) {
  const stateFile = getDaemonStatePath(opts.dir);
  let info = await pingDaemon(stateFile);
  if (!info) {
    const child = spawn(
      process.execPath,
      [
        __filename,
        '--__daemon-server',
        `--__daemon-state=${stateFile}`,
        `--dir=${opts.dir}`,
        `--daemon-ttl=${opts.daemonTtl}`,
      ],
      { detached: true, stdio: 'ignore' }
    );
    child.unref();
    const t0 = performance.now();
    while (performance.now() - t0 < 15000) {
      await new Promise((r) => setTimeout(r, 100));
      info = await pingDaemon(stateFile);
      if (info) break;
    }
    if (!info) {
      return await runDirectCapture(opts, null);
    }
  }
  const resp = await fetch(`http://127.0.0.1:${info.port}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts),
  });
  const data = await resp.json();
  if (!resp.ok || data.error) {
    throw new Error(data.error || `Warm daemon failed with status ${resp.status}`);
  }
  return data;
}

async function main() {
  const opts = parseArgs(process.argv);

  if (opts.listUnits) {
    listUnitsCli(opts.json);
    return;
  }
  if (opts.listParts) {
    listPartsCli(opts.listParts, opts.json);
    return;
  }
  if (opts.isDaemonServer) {
    await runDaemonServer(opts);
    return;
  }
  if (opts.daemonCmd) {
    const stateFile = getDaemonStatePath(opts.dir);
    const info = await pingDaemon(stateFile);
    if (opts.daemonCmd === 'status') {
      console.log(JSON.stringify(info ? { running: true, ...info } : { running: false, stateFile }, null, 2));
      return;
    }
    if (opts.daemonCmd === 'stop') {
      if (info) {
        try {
          await fetch(`http://127.0.0.1:${info.port}/stop`, { method: 'POST' });
        } catch {}
        console.log(`[pp1.1] Stopped warm daemon (pid=${info.pid}).`);
      } else {
        try { fs.unlinkSync(stateFile); } catch {}
        console.log('[pp1.1] No active warm daemon running.');
      }
      return;
    }
  }

  const wantAlpha = opts.bgColor === 'transparent' || opts.bgColor === null;
  const payload =
    opts.warm && !wantAlpha && !opts.freshCache
      ? await runViaWarmDaemon(opts)
      : await runDirectCapture(opts, null);

  if (opts.json) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    if (payload.warmDaemon) {
      for (let i = 0; i < payload.shots.length; i++) {
        const s = payload.shots[i];
        const tag = s.metaOnly ? '0-GL' : `${s.renderCount}f`;
        console.log(
          `[pp1.1 ${i + 1}/${payload.shots.length}] ${path.basename(s.file)} (${s.mode}/${tag} | ${s.unit}/${s.quality} | ${s.viewport} | ${(s.bytes / 1024).toFixed(0)}KB | ${s.ms}ms)`
        );
      }
    }
    if (payload.diffSummary) {
      console.log(
        `[pp1.1 diff] Compared ${payload.diffSummary.comparedCount} shot(s) vs ${payload.diffSummary.baselineDir} | avgSSIM=${payload.diffSummary.avgSsim} | maxRMSE=${payload.diffSummary.maxRmse}`
      );
      for (const d of payload.diffSummary.entries) {
        console.log(
          `  - ${d.name}: SSIM=${d.ssim} | PSNR=${d.psnrDb >= 999 ? 'INF' : d.psnrDb + 'dB'} | RMSE=${d.rmse} | changed=${d.changedPct}%`
        );
      }
    }
    if (payload.contactSheet) {
      console.log(`[pp1.1] Contact sheet saved: ${payload.contactSheet}`);
    }
    console.log(
      `\n[pp1.1] Done: ${payload.count} artifact(s) saved to ${payload.outDir} in ${payload.totalMs}ms (${payload.tabsUsed} tab(s)${payload.warmDaemon ? ', warm daemon' : ''}).`
    );
  }
}

main().catch((err) => {
  console.error('[pp1.1 ERROR]', err);
  process.exit(1);
});
