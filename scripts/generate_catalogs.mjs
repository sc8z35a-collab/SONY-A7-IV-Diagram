#!/usr/bin/env node
/**
 * Hyper-Accelerated Deterministic 3-Tier AI Part Catalog Generator (L0 / L1 / L2 + Play Ground Index/Templates)
 * Single Source of Truth: `src/data/*.json` + `src/units/registry.ts` + Headless V2 STD Build.
 *
 * Outputs (100% byte-identical parity):
 *   - L0: `catalog/INDEX.tsv`
 *   - L1: `catalog/names/<mode>.txt` & `catalog/ALL_NAMES.txt`
 *   - L2: `catalog/spatial/<mode>.tsv`
 *   - Play Ground: `src/playground/playground_index.json` & `src/playground/playground_templates.json`
 *
 * Flags:
 *   --sync-registry   Synchronize `declaredPartCount` in `src/units/registry.ts` from `src/data/*.json`
 *   --full / --no-cache  Bypass transitive SHA-256 spatial/template cache and rebuild all 22 units from scratch
 *   --out-dir=<dir>   Redirect output root (useful for repo-clean `sokutei` benchmarking)
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { Worker } from 'node:worker_threads';
import {
  computeFilesSha256,
  ensureUnifiedV2RuntimeBundlePath,
  loadCachedTsModule,
  readCacheJson,
  writeCacheJson,
} from './lib/hyper_cache.mjs';

const ROOT = process.cwd();
const REGISTRY_REL = 'src/units/registry.ts';
const COMPOSITE_MODES = new Set(['integrated', 'camera_body']);
const SYNC_REGISTRY = process.argv.includes('--sync-registry');
const FORCE_FULL = process.argv.includes('--full') || process.argv.includes('--no-cache');
const OUT_DIR_ARG = process.argv.find((a) => a.startsWith('--out-dir='))?.slice(10) || null;

const OUT_ROOT = OUT_DIR_ARG ? path.resolve(OUT_DIR_ARG) : ROOT;
const CATALOG_DIR = path.join(OUT_ROOT, 'catalog');
const NAMES_DIR = path.join(CATALOG_DIR, 'names');
const SPATIAL_DIR = path.join(CATALOG_DIR, 'spatial');
const PG_OUT_DIR = path.join(OUT_ROOT, 'src', 'playground');

const SPATIAL_CACHE_KEY = 'catalog_spatial_v2';
const PG_TPL_CACHE_KEY = 'catalog_pg_templates_v2';

// Pre-compiled RegExps for hot text formatting
const RE_TSV_WS = /[\t\r\n]+/g;
const RE_MULTI_WS = /\s+/g;
const RE_TITLE_CODE = /^([A-Z][A-Z0-9]*-|[A-Z]{1,3})(\d+)(?:[\.\s:：、]+|$)(.*)$/;
const RE_ERA_PREFIX = /^【[^】]{1,18}】\s*/;
const RE_SONY_OEM = /^Sony\s+OEM\s+/i;
const RE_JA_PARENS = /（[^）]*）/g;
const RE_EN_PARENS = /\([^)]*\)/g;
const RE_AMP = /\s*[＆&]\s*/;
const RE_QUOTES = /[「」『』]/g;
const RE_COMMAS = /[,，]/g;
const RE_SLUG_PREFIX = /^([a-z0-9]+-)/;

function fmtNum(v) {
  if (typeof v !== 'number' || !Number.isFinite(v)) return '0';
  const r = Math.round(v * 100) / 100;
  return Object.is(r, -0) || r === 0 ? '0' : String(r);
}

function fmtVec3(arr) {
  if (!Array.isArray(arr) || arr.length !== 3) return '-';
  return `${fmtNum(arr[0])},${fmtNum(arr[1])},${fmtNum(arr[2])}`;
}

function sanitizeTsv(str) {
  return String(str ?? '')
    .replace(RE_TSV_WS, ' ')
    .replace(RE_MULTI_WS, ' ')
    .trim();
}

function parseTitleCode(title) {
  const s = String(title ?? '').trim();
  const m = s.match(RE_TITLE_CODE);
  if (!m) return null;
  const prefix = m[1];
  const digits = m[2];
  const rest = (m[3] || '').trim();
  return {
    full: `${prefix}${digits}`,
    prefix,
    num: Number.parseInt(digits, 10),
    pad: digits.length,
    rest,
  };
}

function shortenJaName(title, maxLen = 14) {
  let s = sanitizeTsv(title);
  const parsed = parseTitleCode(s);
  if (parsed && parsed.rest) s = parsed.rest;
  s = s.replace(RE_ERA_PREFIX, '').replace(RE_SONY_OEM, 'OEM ');
  const noParens = s
    .replace(RE_JA_PARENS, '')
    .replace(RE_EN_PARENS, '')
    .replace(RE_MULTI_WS, ' ')
    .trim();
  if (noParens.length >= 4) s = noParens;

  const ampIdx = s.search(RE_AMP);
  if (ampIdx >= 6) s = s.slice(0, ampIdx).trim();

  s = s
    .replace(RE_QUOTES, '')
    .replace(RE_COMMAS, '・')
    .replace(RE_MULTI_WS, ' ')
    .trim();

  if (s.length > maxLen) {
    const minKeep = Math.max(7, maxLen - 5);
    let cutAt = -1;
    for (let i = maxLen; i >= minKeep; i--) {
      if (' ・／/＋+-'.includes(s[i])) {
        cutAt = i;
        break;
      }
    }
    s = (cutAt >= minKeep ? s.slice(0, cutAt) : s.slice(0, maxLen)).trim();
  }
  return s || sanitizeTsv(title).slice(0, maxLen);
}

function inferSlugPrefix(mode, parts) {
  if (COMPOSITE_MODES.has(mode)) return '-';
  const tail = parts.slice(Math.max(0, parts.length - 40));
  const counts = new Map();
  for (const p of tail) {
    const m = String(p.id || '').match(RE_SLUG_PREFIX);
    if (m) counts.set(m[1], (counts.get(m[1]) || 0) + 1);
  }
  let best = `${mode}-`;
  let bestCount = 0;
  for (const [pref, cnt] of counts.entries()) {
    if (cnt > bestCount) {
      best = pref;
      bestCount = cnt;
    }
  }
  return best;
}

function computeCodeRange(mode, parts) {
  if (COMPOSITE_MODES.has(mode)) {
    return { codeMin: '-', codeMax: '-', nextCode: '-', validPrefixes: new Set() };
  }
  const parsedList = [];
  const prefixCounts = new Map();
  for (let i = 0; i < parts.length; i++) {
    const parsed = parseTitleCode(parts[i].title);
    if (parsed) {
      parsedList.push({ idx: i, ...parsed });
      prefixCounts.set(parsed.prefix, (prefixCounts.get(parsed.prefix) || 0) + 1);
    }
  }
  const validPrefixes = new Set(
    Array.from(prefixCounts.entries())
      .filter(([, cnt]) => cnt >= 2)
      .map(([pref]) => pref)
  );
  const valid = parsedList.filter((item) => validPrefixes.has(item.prefix));
  if (valid.length === 0) {
    return { codeMin: '-', codeMax: '-', nextCode: `#${parts.length + 1}`, validPrefixes };
  }
  const first = valid[0];
  const lastPrefix = valid[valid.length - 1].prefix;
  let maxItem = valid[valid.length - 1];
  let maxPad = maxItem.pad;
  for (const item of valid) {
    if (item.prefix === lastPrefix) {
      if (item.num > maxItem.num) maxItem = item;
      if (item.pad > maxPad) maxPad = item.pad;
    }
  }
  const nextNum = maxItem.num + 1;
  const nextDigits = String(nextNum).padStart(Math.min(maxPad, 2), '0');
  return {
    codeMin: first.full,
    codeMax: maxItem.full,
    nextCode: `${lastPrefix}${nextDigits}`,
    validPrefixes,
  };
}

function inferCompositeSubsystem(partId) {
  const id = String(partId || '');
  if (id.startsWith('lens-')) return 'lens';
  if (id.startsWith('mount-')) return 'mount';
  if (id.startsWith('body-')) return 'body';
  if (id.startsWith('shutter-')) return 'shutter';
  if (id.startsWith('mb-')) return 'mainboard';
  if (id.startsWith('evf-')) return 'evf';
  if (id.startsWith('lcd-')) return 'lcd';
  if (id.startsWith('mi-')) return 'mishoe';
  return 'sensor';
}

function buildGroupAssigner(mode, parts) {
  if (mode === 'sensor_fab') return (p) => `Vol.${p.fabVolume ?? 0}`;
  if (mode === 'lens') {
    return (p) => {
      const sec = p.lensSection ?? 2;
      return sec === 1 ? 'Sec1:Rear' : sec === 3 ? 'Sec3:Front' : 'Sec2:Mid';
    };
  }
  if (COMPOSITE_MODES.has(mode)) return (p) => inferCompositeSubsystem(p.id);
  const uniqueGroups = new Set(parts.map((p) => p.groupKey).filter(Boolean));
  if (uniqueGroups.size >= 1 && uniqueGroups.size <= 12) {
    return (p) => sanitizeTsv(p.groupKey || 'all');
  }
  const blockSize = 30;
  return (_p, idx) => {
    const start = Math.floor(idx / blockSize) * blockSize + 1;
    const end = Math.min(parts.length, start + blockSize - 1);
    return `#${String(start).padStart(3, '0')}-${String(end).padStart(3, '0')}`;
  };
}

function parseRegistryEntries() {
  const abs = path.join(ROOT, REGISTRY_REL);
  const src = fs.readFileSync(abs, 'utf8');
  const entries = [];
  const re =
    /(\w+):\s*\{\s*unitId:\s*'([^']+)',\s*declaredPartCount:\s*(\d+),\s*loadMeta:\s*makeLazyJsonMetaLoader\('[^']+',\s*\(\)\s*=>\s*import\('\.\.\/data\/([^']+)'\)\),\s*load:\s*async\s*\(\)\s*=>\s*\(await import\('\.\/([^']+)'\)\)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const mode = m[2];
    entries.push({
      mode,
      kind: COMPOSITE_MODES.has(mode) ? 'composite' : 'individual',
      registryDeclaredCount: Number.parseInt(m[3], 10),
      dataFile: `src/data/${m[4]}`,
      unitFile: `src/units/${m[5]}.ts`,
      l1File: `catalog/names/${mode}.txt`,
      l2File: `catalog/spatial/${mode}.tsv`,
    });
  }
  if (entries.length === 0) throw new Error(`Failed to parse unit entries from ${REGISTRY_REL}`);
  return entries;
}

function syncRegistryPartCounts(entries) {
  const abs = path.join(ROOT, REGISTRY_REL);
  let src = fs.readFileSync(abs, 'utf8');
  let changed = 0;
  for (const e of entries) {
    const jsonData = JSON.parse(fs.readFileSync(path.join(ROOT, e.dataFile), 'utf8'));
    const actualCount = jsonData.parts.length;
    if (actualCount !== e.registryDeclaredCount) {
      const re = new RegExp(`(unitId:\\s*'${e.mode}',\\s*declaredPartCount:\\s*)\\d+`, 'g');
      src = src.replace(re, `$1${actualCount}`);
      console.log(`[SYNC] registry.ts ${e.mode}: declaredPartCount ${e.registryDeclaredCount} -> ${actualCount}`);
      e.registryDeclaredCount = actualCount;
      changed++;
    }
  }
  if (changed > 0) {
    fs.writeFileSync(abs, src, 'utf8');
    console.log(`[SYNC] Updated ${changed} entry(ies) in ${REGISTRY_REL}`);
  } else {
    console.log(`[SYNC] ${REGISTRY_REL} already in sync with all ${entries.length} JSON files.`);
  }
}

function computeUnitDepHash(e, coreHash, allAssembliesHash) {
  const deps = [e.unitFile, e.dataFile];
  if (COMPOSITE_MODES.has(e.mode)) {
    return computeFilesSha256(deps) + ':' + coreHash + ':' + allAssembliesHash;
  }
  const asmDir = `src/assemblies/${e.mode}`;
  if (fs.existsSync(path.join(ROOT, asmDir))) deps.push(asmDir);
  if (e.mode === 'micro_v2' && fs.existsSync(path.join(ROOT, 'src/assemblies/micro'))) deps.push('src/assemblies/micro');
  if (e.mode === 'bionz_v2' && fs.existsSync(path.join(ROOT, 'src/assemblies/bionz'))) deps.push('src/assemblies/bionz');
  if (e.mode === 'mishoe' && fs.existsSync(path.join(ROOT, 'src/assemblies/mi_shoe'))) deps.push('src/assemblies/mi_shoe');
  for (const shared of ['src/assemblies/types.ts', 'src/assemblies/materials.ts', 'src/assemblies/camera_macro_shared.ts']) {
    if (fs.existsSync(path.join(ROOT, shared))) deps.push(shared);
  }
  return computeFilesSha256(deps) + ':' + coreHash;
}

function runCatalogWorker(bundlePath, modes) {
  return new Promise((resolve, reject) => {
    const w = new Worker(path.join(ROOT, 'scripts/lib/catalog_worker.mjs'), {
      workerData: { bundlePath, modes },
    });
    let done = false;
    w.on('message', (msg) => {
      done = true;
      if (msg.ok) resolve(msg.out);
      else reject(new Error(msg.error));
    });
    w.on('error', (err) => {
      if (!done) {
        done = true;
        reject(err);
      }
    });
    w.on('exit', (code) => {
      if (!done) {
        done = true;
        reject(new Error(`catalog_worker exited unexpectedly (${code})`));
      }
    });
  });
}

async function extractSpatialAndMaterialInfo(entries) {
  const coreHash = computeFilesSha256([
    'src/core',
    'src/engine',
    'src/units/registry.ts',
    'scripts/lib/catalog_worker.mjs',
  ]);
  const allAssembliesHash = computeFilesSha256(['src/assemblies']);

  const prevCache = FORCE_FULL ? null : readCacheJson(SPATIAL_CACHE_KEY);
  const prevModes = prevCache?.version === 2 ? prevCache.modes || {} : {};
  const nextModes = { ...prevModes };

  const byMode = new Map();
  const modeHashes = new Map();
  const toBuild = [];

  for (const e of entries) {
    const h = computeUnitDepHash(e, coreHash, allAssembliesHash);
    modeHashes.set(e.mode, h);
    const hit = prevModes[e.mode];
    if (!FORCE_FULL && hit && hit.hash === h && hit.sizeEntries && hit.matEntries) {
      byMode.set(e.mode, {
        sizeByPartId: new Map(Object.entries(hit.sizeEntries)),
        matByPartId: new Map(Object.entries(hit.matEntries)),
      });
    } else {
      toBuild.push(e);
    }
  }

  if (toBuild.length > 0) {
    const bundlePath = ensureUnifiedV2RuntimeBundlePath();
    toBuild.sort((a, b) => b.registryDeclaredCount - a.registryDeclaredCount);
    const workerCount = Math.min(Math.max(1, os.cpus().length), toBuild.length);
    const buckets = Array.from({ length: workerCount }, () => ({ modes: [], load: 0 }));
    for (const e of toBuild) {
      buckets.sort((a, b) => a.load - b.load);
      buckets[0].modes.push(e.mode);
      buckets[0].load += e.registryDeclaredCount;
    }

    const workerOuts = await Promise.all(
      buckets.filter((b) => b.modes.length > 0).map((b) => runCatalogWorker(bundlePath, b.modes))
    );
    for (const outObj of workerOuts) {
      for (const [mode, data] of Object.entries(outObj)) {
        byMode.set(mode, {
          sizeByPartId: new Map(Object.entries(data.sizeEntries)),
          matByPartId: new Map(Object.entries(data.matEntries)),
        });
        nextModes[mode] = {
          hash: modeHashes.get(mode),
          sizeEntries: data.sizeEntries,
          matEntries: data.matEntries,
        };
      }
    }
    writeCacheJson(SPATIAL_CACHE_KEY, { version: 2, updatedAt: new Date().toISOString(), modes: nextModes });
  }

  return { byMode, rebuiltCount: toBuild.length, cachedCount: entries.length - toBuild.length };
}

function classifyPlaygroundRole(unitId, part) {
  const hay = `${part.id} ${part.title} ${part.subtitle} ${part.category}`.toLowerCase();
  if (unitId === 'welcome') return 'sculpture';
  if (unitId === 'lens') return 'lens';
  if (unitId === 'mount') return 'mount';
  if (unitId === 'shutter') return 'shutter';
  if (unitId === 'sensor' || unitId === 'micro' || unitId === 'micro_v2' || unitId === 'sensor_fab') {
    if (hay.includes('graphite') || hay.includes('copper') || hay.includes('sink') || hay.includes('tim') || hay.includes('放熱')) {
      return 'thermal_emi';
    }
    return 'sensor';
  }
  if (unitId === 'bionz' || unitId === 'bionz_v2') return 'bionz';
  if (unitId === 'mainboard') {
    if (hay.includes('vapor') || hay.includes('emi') || hay.includes('shield') || hay.includes('放熱') || hay.includes('シールド')) {
      return 'thermal_emi';
    }
    if (hay.includes('isp') || hay.includes('bionz') || hay.includes('npu') || hay.includes('die')) return 'bionz';
    if (hay.includes('cfexpress') || hay.includes('io') || hay.includes('slot') || hay.includes('port')) return 'storage';
    if (hay.includes('pmic') || hay.includes('power') || hay.includes('電源')) return 'battery';
    return 'mainboard';
  }
  if (unitId === 'battery') return 'battery';
  if (unitId === 'cfexpress') return 'storage';
  if (unitId === 'evf') return 'evf';
  if (unitId === 'lcd') return 'lcd';
  if (unitId === 'mic') return 'audio';
  if (unitId === 'mishoe') return 'mishoe';
  if (unitId === 'body') {
    const pid = String(part.id || '').toLowerCase();
    if (
      pid.includes('gasket') || pid.includes('seal') || pid.includes('heat') ||
      pid.includes('graphite') || pid.includes('thermal') || pid.includes('shield') || pid.includes('emi')
    ) {
      return 'thermal_emi';
    }
    if (pid.includes('mic') || pid.includes('speaker')) return 'audio';
    if (pid.includes('card') || pid.includes('usb') || pid.includes('hdmi') || pid.includes('slot')) return 'storage';
    return 'body';
  }
  return 'accessory';
}

async function main() {
  const t0 = Date.now();
  const entries = parseRegistryEntries();
  if (SYNC_REGISTRY) {
    syncRegistryPartCounts(entries);
  }

  fs.mkdirSync(NAMES_DIR, { recursive: true });
  fs.mkdirSync(SPATIAL_DIR, { recursive: true });
  fs.mkdirSync(PG_OUT_DIR, { recursive: true });

  console.log(`[CATALOG] Extracting exact Box3 sizes & PBR buckets for ${entries.length} modes (STD headless)...`);

  // Read all 22 JSONs in parallel while spatial workers run!
  const [spatialRes, jsonLoaded] = await Promise.all([
    extractSpatialAndMaterialInfo(entries),
    Promise.all(
      entries.map(async (e) => {
        const jsonAbs = path.join(ROOT, e.dataFile);
        const raw = await fsp.readFile(jsonAbs, 'utf8');
        return { mode: e.mode, jsonBytes: Buffer.byteLength(raw, 'utf8'), jsonData: JSON.parse(raw) };
      })
    ),
  ]);
  const spatialDataByMode = spatialRes.byMode;
  const jsonByMode = new Map(jsonLoaded.map((x) => [x.mode, x]));

  const indexRows = [
    'mode\tkind\tparts\tslug_prefix\tcode_min\tcode_max\tnext_code\tunit_file\tdata_file\tl1_file\tl2_file',
  ];
  const allIndividualL1Chunks = [];
  const pgUnits = [];
  const pgParts = [];

  let totalJsonBytesAll = 0;
  let totalJsonBytesIndiv = 0;
  let totalIndivParts = 0;
  let totalIndivModes = 0;
  let totalL1BytesAll = 0;
  let totalL2BytesAll = 0;
  const statsPerMode = [];
  const writePromises = [];

  for (const e of entries) {
    const { jsonBytes, jsonData } = jsonByMode.get(e.mode);
    const parts = jsonData.parts;

    totalJsonBytesAll += jsonBytes;
    if (e.kind === 'individual') {
      const uIdx = pgUnits.length;
      pgUnits.push([e.mode, jsonData.nameJa || e.mode, jsonData.nameEn || e.mode, parts.length]);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const ap = Array.isArray(p.assembledPos) ? p.assembledPos : [0, 0, 0];
        pgParts.push([
          uIdx,
          p.id,
          p.title || p.id,
          p.subtitle || '',
          p.category || '',
          p.swatchColor || '#64748b',
          Math.round((ap[0] || 0) * 100) / 100,
          Math.round((ap[1] || 0) * 100) / 100,
          Math.round((ap[2] || 0) * 100) / 100,
          classifyPlaygroundRole(e.mode, p),
        ]);
      }
      totalJsonBytesIndiv += jsonBytes;
      totalIndivParts += parts.length;
      totalIndivModes++;
    }

    const slugPrefix = inferSlugPrefix(e.mode, parts);
    const { codeMin, codeMax, nextCode, validPrefixes } = computeCodeRange(e.mode, parts);
    const getGroup = buildGroupAssigner(e.mode, parts);
    const extracted = spatialDataByMode.get(e.mode);

    indexRows.push(
      [
        e.mode, e.kind, String(parts.length), slugPrefix, codeMin, codeMax, nextCode,
        e.unitFile, e.dataFile, e.l1File, e.l2File,
      ].join('\t')
    );

    const groupOrder = [];
    const groupItems = new Map();
    const l2Rows = ['id\tcode\tname\tgroup\tpos\tsize\texp\tmat'];

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const grp = getGroup(p, i);
      const parsed = parseTitleCode(p.title);
      const code =
        parsed && (e.kind === 'composite' || validPrefixes.has(parsed.prefix))
          ? parsed.full
          : `#${String(i + 1).padStart(2, '0')}`;
      const l1Name = shortenJaName(p.title, 14);
      const l2Name = shortenJaName(p.title, 20);

      if (!groupItems.has(grp)) {
        groupOrder.push(grp);
        groupItems.set(grp, []);
      }
      groupItems.get(grp).push(`${code}:${l1Name}`);

      const posStr = fmtVec3(p.assembledPos);
      const sizeStr = extracted?.sizeByPartId.get(p.id) ?? '-';
      const expStr = fmtVec3(p.explodeOffset);
      const matStr = extracted?.matByPartId.get(p.id) ?? '-';

      l2Rows.push([sanitizeTsv(p.id), code, l2Name, grp, posStr, sizeStr, expStr, matStr].join('\t'));
    }

    const headerSuffix =
      e.kind === 'composite'
        ? `composite | unit: ${e.unitFile} | data: ${e.dataFile}`
        : `slug: ${slugPrefix}* | next: ${nextCode} | unit: ${e.unitFile} | data: ${e.dataFile}`;
    const l1Lines = [`# ${e.mode} (${parts.length}p | ${headerSuffix})`];
    for (const grp of groupOrder) {
      l1Lines.push(`[${grp}] ${groupItems.get(grp).join(', ')}`);
    }
    const l1Content = `${l1Lines.join('\n')}\n`;
    const l2Content = `${l2Rows.join('\n')}\n`;

    writePromises.push(fsp.writeFile(path.join(OUT_ROOT, e.l1File), l1Content, 'utf8'));
    writePromises.push(fsp.writeFile(path.join(OUT_ROOT, e.l2File), l2Content, 'utf8'));

    const l1Bytes = Buffer.byteLength(l1Content, 'utf8');
    const l2Bytes = Buffer.byteLength(l2Content, 'utf8');
    totalL1BytesAll += l1Bytes;
    totalL2BytesAll += l2Bytes;

    if (e.kind === 'individual') {
      allIndividualL1Chunks.push(l1Content.trimEnd());
    }

    statsPerMode.push({ mode: e.mode, kind: e.kind, parts: parts.length, jsonBytes, l1Bytes, l2Bytes });
  }

  indexRows.push(
    `# total_individual_modes=${totalIndivModes}\ttotal_individual_parts=${totalIndivParts}\ttotal_modes=${entries.length}`
  );
  const indexContent = `${indexRows.join('\n')}\n`;
  writePromises.push(fsp.writeFile(path.join(CATALOG_DIR, 'INDEX.tsv'), indexContent, 'utf8'));

  const allNamesContent = `# ALL INDIVIDUAL ASSEMBLIES (${totalIndivModes} modes | ${totalIndivParts} unique parts)\n\n${allIndividualL1Chunks.join('\n\n')}\n`;
  writePromises.push(fsp.writeFile(path.join(CATALOG_DIR, 'ALL_NAMES.txt'), allNamesContent, 'utf8'));

  const pgIndexPath = path.join(PG_OUT_DIR, 'playground_index.json');
  const pgIndexJson = JSON.stringify({ v: 2, units: pgUnits, parts: pgParts });
  // Must finish writing BEFORE PartGeometryExtractor.ts esbuild imports playground_index.json!
  await fsp.writeFile(pgIndexPath, pgIndexJson, 'utf8');
  const pgIndexBytes = Buffer.byteLength(pgIndexJson, 'utf8');

  // Play Ground pre-baked template blueprints (SHA-256 cached unless source units/extractor changed or --full!)
  const pgTplPath = path.join(PG_OUT_DIR, 'playground_templates.json');
  const pgTplRepoPath = path.join(ROOT, 'src', 'playground', 'playground_templates.json');
  let pgTplBytes = 0;
  let pgTplCount = 0;
  const tplDepHash = computeFilesSha256([
    'src/core',
    'src/engine',
    'src/playground/PartGeometryExtractor.ts',
    'src/units/registry.ts',
    'src/units/body.ts', 'src/units/mount.ts', 'src/units/lens.ts', 'src/units/shutter.ts',
    'src/units/sensor.ts', 'src/units/mainboard.ts', 'src/units/bionz.ts', 'src/units/battery.ts',
    'src/units/cfexpress.ts', 'src/units/evf.ts', 'src/units/lcd.ts', 'src/units/mi_shoe.ts',
    'src/units/mic.ts', 'src/units/welcome.ts',
    'src/assemblies',
  ]);
  const prevTplCache = FORCE_FULL ? null : readCacheJson(PG_TPL_CACHE_KEY);

  if (!FORCE_FULL && prevTplCache?.hash === tplDepHash && prevTplCache?.json) {
    writePromises.push(fsp.writeFile(pgTplPath, prevTplCache.json, 'utf8'));
    pgTplBytes = Buffer.byteLength(prevTplCache.json, 'utf8');
    pgTplCount = prevTplCache.count || 0;
  } else {
    if (!fs.existsSync(pgTplRepoPath)) {
      fs.writeFileSync(pgTplRepoPath, '{"v":1,"parts":{}}', 'utf8');
    }
    const extMod = await loadCachedTsModule('src/playground/PartGeometryExtractor.ts');
    const extractor = new extMod.PartGeometryExtractor();
    await extractor.ensureCatalogLoaded();
    const allEntries = extractor.getAllEntries();
    const pickKey = (unitId, hints) => {
      const list = allEntries.filter((e) => e.unitId === unitId);
      for (const h of hints) {
        const found = list.find((e) => `${e.partId} ${e.title}`.toLowerCase().includes(h.toLowerCase()));
        if (found) return found.key;
      }
      return list[0]?.key;
    };
    const byIdKey = (unitId, id, hints) => {
      const exact = allEntries.find((e) => e.unitId === unitId && e.partId === id);
      return exact ? exact.key : pickKey(unitId, hints);
    };
    const wIds = [
      'welcome-plinth-mg-chassis', 'welcome-plinth-top-datum-plate', 'welcome-plinth-bottom-weight',
      'welcome-plinth-usbc-pd-port', 'welcome-plinth-pmic-3rail-board', 'welcome-plinth-lifepo4-battery',
      'welcome-plinth-mainboard', 'welcome-plinth-cortex-m7-mcu', 'welcome-plinth-tof-presence-sensor',
      'welcome-plinth-ambient-lux-sensor', 'welcome-plinth-cinnabar-status-bar', 'welcome-plinth-welcome-speaker',
      'welcome-yo-cnc-chassis', 'welcome-yo-sapphire-diffuser-lens',
      'welcome-u-cnc-chassis', 'welcome-u-sapphire-diffuser-lens', 'welcome-u-crest-cnc-frame', 'welcome-u-quartz-support-post',
      'welcome-ko-cnc-chassis', 'welcome-ko-sapphire-diffuser-lens', 'welcome-ko-top-cnc-frame', 'welcome-ko-quartz-col-left', 'welcome-ko-quartz-col-right',
      'welcome-so-cnc-chassis', 'welcome-so-sapphire-diffuser-lens',
    ];
    const templateKeys = [
      byIdKey('body', 'body-mg-front-shell', ['mg-front', 'chassis']),
      byIdKey('body', 'body-top-deck', ['top-deck', 'トップ']),
      byIdKey('mount', 'mount-flange-ring', ['flange', 'bayonet']),
      byIdKey('lens', 'lens-front-cell-mount', ['front-cell', 'barrel']),
      byIdKey('lens', 'lens-front-xa', ['front-xa', '前玉']),
      byIdKey('shutter', 'shutter-curtain-1', ['curtain', '幕']),
      pickKey('sensor', ['stacked', 'cmos', 'photodiode']),
      byIdKey('mainboard', 'mb-vapor-chamber', ['vapor', 'graphite']),
      byIdKey('mainboard', 'mb-sigma-graphite', ['sigma', 'graphite', 'sheet']),
      pickKey('mainboard', ['hdi', 'pcb', 'substrate']),
      byIdKey('bionz', 'xr-nickel-cu-ihs', ['ihs', 'package']),
      byIdKey('battery', 'bat-outer-shell-front', ['outer-shell', 'cell']),
      byIdKey('cfexpress', 'cfe-top-metal-armor', ['top-metal', 'armor']),
      byIdKey('evf', 'evf-eyecup', ['eyecup', 'oled']),
      byIdKey('lcd', 'lcd-ips-panel', ['ips-panel', 'panel']),
      byIdKey('mishoe', 'mi-shoe-shell-plate', ['shell-plate', 'rail']),
      byIdKey('mic', 'mc-top-grille-holes', ['grille', 'capsule']),
      ...wIds.map((wid) => byIdKey('welcome', wid, [wid])),
    ].filter(Boolean);

    await extractor.extractPartsBatch(templateKeys, true);
    const encArr = (arr) => Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength).toString('base64');
    const encPack = (pk) => {
      if (!pk) return undefined;
      const g = pk.geometry;
      const idx = g.getIndex();
      return {
        cx: +pk.cx.toFixed(4),
        cy: +pk.cy.toFixed(4),
        cz: +pk.cz.toFixed(4),
        s: +pk.scale.toFixed(5),
        vc: pk.vertCount,
        ic: pk.indexCount,
        p: encArr(g.getAttribute('position').array),
        n: encArr(g.getAttribute('normal').array),
        c: encArr(g.getAttribute('color').array),
        i: encArr(idx.array),
        ...(idx.array instanceof Uint32Array ? { u32: 1 } : {}),
      };
    };
    const packedParts = {};
    for (const key of templateKeys) {
      const bp = extractor.getBlueprintSync(key);
      if (!bp) continue;
      packedParts[key] = {
        ns: [+bp.naturalSize.x.toFixed(3), +bp.naturalSize.y.toFixed(3), +bp.naturalSize.z.toFixed(3)],
        nc: [+bp.naturalCenter.x.toFixed(3), +bp.naturalCenter.y.toFixed(3), +bp.naturalCenter.z.toFixed(3)],
        he: [+bp.halfExtents.x.toFixed(3), +bp.halfExtents.y.toFixed(3), +bp.halfExtents.z.toFixed(3)],
        t: bp.triCount,
        ...(bp.opaque ? { o: encPack(bp.opaque) } : {}),
        ...(bp.glass ? { g: encPack(bp.glass) } : {}),
      };
      pgTplCount++;
    }
    extractor.dispose();
    const pgTplJson = JSON.stringify({ v: 1, parts: packedParts });
    writePromises.push(fsp.writeFile(pgTplPath, pgTplJson, 'utf8'));
    pgTplBytes = Buffer.byteLength(pgTplJson, 'utf8');
    writeCacheJson(PG_TPL_CACHE_KEY, { hash: tplDepHash, count: pgTplCount, json: pgTplJson });
  }

  await Promise.all(writePromises);

  const indexBytes = Buffer.byteLength(indexContent, 'utf8');
  const allNamesBytes = Buffer.byteLength(allNamesContent, 'utf8');
  const elapsedMs = Date.now() - t0;

  console.log(
    `\n[CATALOG] Generated L0/L1/L2 + Play Ground Index & Templates for ${entries.length} modes (${totalIndivParts} unique parts) in ${(elapsedMs / 1000).toFixed(2)}s (0 cache leaks | spatial: ${spatialRes.rebuiltCount} built, ${spatialRes.cachedCount} SHA-256 cached).`
  );
  console.log(`  L0 catalog/INDEX.tsv     : ${(indexBytes / 1024).toFixed(2)} kB`);
  console.log(`  PG src/playground/playground_index.json     : ${(pgIndexBytes / 1024).toFixed(2)} kB (${pgParts.length} parts, -${(100 * (1 - pgIndexBytes / totalJsonBytesIndiv)).toFixed(1)}% vs indiv JSONs)`);
  console.log(`  PG src/playground/playground_templates.json : ${(pgTplBytes / 1024).toFixed(2)} kB (${pgTplCount} pre-baked SNORM16/SNORM8 template blueprints)`);
  console.log(
    `  L1 catalog/ALL_NAMES.txt : ${(allNamesBytes / 1024).toFixed(2)} kB (vs ${(totalJsonBytesIndiv / 1024).toFixed(1)} kB indiv JSONs -> ${(100 * (1 - allNamesBytes / totalJsonBytesIndiv)).toFixed(2)}% reduction)`
  );
  console.log(
    `  L1 all 20 modes sum      : ${(totalL1BytesAll / 1024).toFixed(2)} kB (vs ${(totalJsonBytesAll / 1024).toFixed(1)} kB all JSONs -> ${(100 * (1 - totalL1BytesAll / totalJsonBytesAll)).toFixed(2)}% reduction)`
  );
  console.log(
    `  L2 all 20 modes sum      : ${(totalL2BytesAll / 1024).toFixed(2)} kB (vs ${(totalJsonBytesAll / 1024).toFixed(1)} kB all JSONs -> ${(100 * (1 - totalL2BytesAll / totalJsonBytesAll)).toFixed(2)}% reduction)`
  );
}

main().catch((err) => {
  console.error('[CATALOG ERROR]', err instanceof Error ? err.stack || err.message : err);
  process.exit(1);
});
