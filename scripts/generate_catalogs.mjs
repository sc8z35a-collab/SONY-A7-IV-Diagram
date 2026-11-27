#!/usr/bin/env node
/**
 * Deterministic 3-Tier AI Part Catalog Generator (L0 / L1 / L2)
 * Single Source of Truth: `src/data/*.json` + `src/units/registry.ts` + Headless V2 STD Build.
 *
 * Outputs under `catalog/`:
 *   - L0: `catalog/INDEX.tsv`            — Global 20-mode overview map (counts, prefixes, next codes, file paths)
 *   - L1: `catalog/names/<mode>.txt`     — Ultra-compact grouped Japanese name list (~1.2-8 kB/mode)
 *   - L1: `catalog/ALL_NAMES.txt`        — Concatenated L1 roster of all 18 individual assemblies
 *   - L2: `catalog/spatial/<mode>.tsv`   — Per-part spatial coordinates, real Box3 size, explode vector, primary PBR bucket
 *
 * Optional flags:
 *   --sync-registry   Also synchronize `declaredPartCount` in `src/units/registry.ts` from `src/data/*.json`
 *                     (post-merge helper after parallel worker sprints).
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as THREE from 'three';
import { buildSync } from 'esbuild';

const ROOT = process.cwd();
const REGISTRY_REL = 'src/units/registry.ts';
const CATALOG_DIR = path.join(ROOT, 'catalog');
const NAMES_DIR = path.join(CATALOG_DIR, 'names');
const SPATIAL_DIR = path.join(CATALOG_DIR, 'spatial');
const COMPOSITE_MODES = new Set(['integrated', 'camera_body']);
const SYNC_REGISTRY = process.argv.includes('--sync-registry');

const _boxSize = new THREE.Vector3();

// -----------------------------------------------------------------------------
// Formatting & Text Compression Helpers
// -----------------------------------------------------------------------------

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
    .replace(/[\t\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parse a leading display code from a Japanese part title, e.g.:
 *   "SH180. 工場..." -> { full: "SH180", prefix: "SH", num: 180, pad: 3, rest: "工場..." }
 *   "X2-01. TSMC..." -> { full: "X2-01", prefix: "X2-", num: 1, pad: 2, rest: "TSMC..." }
 *   "F5-38 累計..."  -> { full: "F5-38", prefix: "F5-", num: 38, pad: 2, rest: "累計..." }
 */
function parseTitleCode(title) {
  const s = String(title ?? '').trim();
  const m = s.match(/^([A-Z][A-Z0-9]*-|[A-Z]{1,3})(\d+)(?:[\.\s:：、]+|$)(.*)$/);
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
  if (parsed && parsed.rest) {
    s = parsed.rest;
  }
  // Remove leading announcement/era/OEM prefixes to keep core part noun crisp
  s = s
    .replace(/^【[^】]{1,18}】\s*/, '')
    .replace(/^Sony\s+OEM\s+/i, 'OEM ');
  // Strip parenthetical English / secondary explanations
  const noParens = s
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (noParens.length >= 4) s = noParens;

  // Prefer the concise primary clause before '＆' when already descriptive
  const ampIdx = s.search(/\s*[＆&]\s*/);
  if (ampIdx >= 6) {
    s = s.slice(0, ampIdx).trim();
  }

  // Strip surrounding quotation marks and normalize commas so L1 comma-lists stay clean
  s = s
    .replace(/[「」『』]/g, '')
    .replace(/[,，]/g, '・')
    .replace(/\s+/g, ' ')
    .trim();

  if (s.length > maxLen) {
    // Prefer cutting at a natural delimiter inside [minKeep, maxLen] to avoid mid-word katakana splits
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

/**
 * Infer the modern kebab-case slug prefix from the unit's parts (preferring recent tail parts).
 */
function inferSlugPrefix(mode, parts) {
  if (COMPOSITE_MODES.has(mode)) return '-';
  const tail = parts.slice(Math.max(0, parts.length - 40));
  const counts = new Map();
  for (const p of tail) {
    const m = String(p.id || '').match(/^([a-z0-9]+-)/);
    if (m) {
      counts.set(m[1], (counts.get(m[1]) || 0) + 1);
    }
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

/**
 * Compute code_min, code_max, next_code across a unit's parts.
 * Handles multi-volume prefixes (e.g., sensor_fab F0-01..F5-38 -> next F5-39).
 */
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
  // Keep prefixes appearing >= 2 times (avoids accidental matches like "ISO100")
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
  // Active prefix for next_code = prefix of the last coded part (handles Vol.0..Vol.5 naturally)
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
  if (mode === 'sensor_fab') {
    return (p) => `Vol.${p.fabVolume ?? 0}`;
  }
  if (mode === 'lens') {
    return (p) => {
      const sec = p.lensSection ?? 2;
      return sec === 1 ? 'Sec1:Rear' : sec === 3 ? 'Sec3:Front' : 'Sec2:Mid';
    };
  }
  if (COMPOSITE_MODES.has(mode)) {
    return (p) => inferCompositeSubsystem(p.id);
  }
  const uniqueGroups = new Set(parts.map((p) => p.groupKey).filter(Boolean));
  if (uniqueGroups.size >= 1 && uniqueGroups.size <= 12) {
    return (p) => sanitizeTsv(p.groupKey || 'all');
  }
  // Fallback for ~1:1 groupKey units: balanced 30-part sequential blocks
  const blockSize = 30;
  return (_p, idx) => {
    const start = Math.floor(idx / blockSize) * blockSize + 1;
    const end = Math.min(parts.length, start + blockSize - 1);
    return `#${String(start).padStart(3, '0')}-${String(end).padStart(3, '0')}`;
  };
}

// -----------------------------------------------------------------------------
// Registry Parser & Optional --sync-registry Helper
// -----------------------------------------------------------------------------

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
  if (entries.length === 0) {
    throw new Error(`Failed to parse unit entries from ${REGISTRY_REL}`);
  }
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
      const re = new RegExp(
        `(unitId:\\s*'${e.mode}',\\s*declaredPartCount:\\s*)\\d+`,
        'g'
      );
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

// -----------------------------------------------------------------------------
// Headless V2 STD Spatial & Material Extractor (Zero-Leak Verified!)
// -----------------------------------------------------------------------------

async function bundleTsModuleForNode(entryRel) {
  const result = buildSync({
    entryPoints: [path.join(ROOT, entryRel)],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    external: ['three', 'three/*'],
  });
  const tmpDir = path.join(ROOT, 'node_modules', '.cache', 'generate-catalogs');
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmpFile = path.join(
    tmpDir,
    `${path.basename(entryRel, '.ts')}.${process.pid}.${Math.random().toString(36).slice(2, 8)}.mjs`
  );
  fs.writeFileSync(tmpFile, result.outputFiles[0].text, 'utf8');
  try {
    return await import(pathToFileURL(tmpFile).href);
  } finally {
    fs.rmSync(tmpFile, { force: true });
  }
}

async function extractSpatialAndMaterialInfo(entries) {
  const [regMod, cacheMod] = await Promise.all([
    bundleTsModuleForNode('src/units/registry.ts'),
    bundleTsModuleForNode('src/core/resource_cache.ts'),
  ]);
  const cache = new cacheMod.ResourceCache();
  const byMode = new Map();

  for (const e of entries) {
    const unit = await regMod.loadRegisteredUnit(e.mode);
    const built = await unit.build('standard', cache, {
      synchronous: true,
      integratedMode: COMPOSITE_MODES.has(e.mode),
    });

    const sizeByPartId = new Map();
    for (const [partId, pb] of built.raycastIndex.partBoundsById.entries()) {
      if (pb.localBox && !pb.localBox.isEmpty()) {
        pb.localBox.getSize(_boxSize);
        sizeByPartId.set(partId, `${fmtNum(_boxSize.x)},${fmtNum(_boxSize.y)},${fmtNum(_boxSize.z)}`);
      } else {
        sizeByPartId.set(partId, '-');
      }
    }

    // Tally primary ResourceCache PBR material bucket per part from raycast bindings
    const matTallies = new Map(); // partId -> Map<bucket, weight>
    const addTally = (partId, bucket, weight) => {
      if (!partId || !bucket) return;
      let m = matTallies.get(partId);
      if (!m) {
        m = new Map();
        matTallies.set(partId, m);
      }
      m.set(bucket, (m.get(bucket) || 0) + weight);
    };

    const _tmpBox = new THREE.Box3();
    for (const binding of built.raycastIndex.bindings) {
      const mat = binding.mesh?.material;
      const bucket = mat?.userData?.__materialBucket || null;
      if (!bucket) continue;
      if (binding.kind === 'batched') {
        const bm = binding.mesh;
        for (let bi = 0; bi < binding.batchIdToPartId.length; bi++) {
          const pid = binding.batchIdToPartId[bi];
          if (!pid) continue;
          let weight = 2;
          try {
            if (typeof bm.getGeometryIdAt === 'function' && typeof bm.getBoundingBoxAt === 'function') {
              const gid = bm.getGeometryIdAt(bi);
              if (bm.getBoundingBoxAt(gid, _tmpBox) && !_tmpBox.isEmpty()) {
                _tmpBox.getSize(_boxSize);
                weight = Math.max(0.5, _boxSize.x + _boxSize.y + _boxSize.z);
              }
            }
          } catch {
            weight = 2;
          }
          addTally(pid, bucket, weight);
        }
      } else if (binding.kind === 'instanced') {
        const geo = binding.mesh?.geometry;
        let instW = 0.8;
        if (geo) {
          if (!geo.boundingBox) geo.computeBoundingBox();
          if (geo.boundingBox && !geo.boundingBox.isEmpty()) {
            geo.boundingBox.getSize(_boxSize);
            instW = Math.max(0.25, (_boxSize.x + _boxSize.y + _boxSize.z) * 0.5);
          }
        }
        for (const pid of binding.instanceIdToPartId) {
          addTally(pid, bucket, instW);
        }
      }
    }

    const matByPartId = new Map();
    for (const [partId, tally] of matTallies.entries()) {
      let bestBucket = '-';
      let bestW = -1;
      for (const [bucket, w] of tally.entries()) {
        if (w > bestW || (w === bestW && bucket < bestBucket)) {
          bestBucket = bucket;
          bestW = w;
        }
      }
      matByPartId.set(partId, bestBucket);
    }

    unit.dispose(cache);
    const post = cache.getStats();
    if (post.totalRefs !== 0 || post.materials !== 0 || post.geometries !== 0 || post.textures !== 0) {
      throw new Error(`Zero-leak violation during catalog build of '${e.mode}': ${JSON.stringify(post)}`);
    }

    byMode.set(e.mode, { sizeByPartId, matByPartId });
  }

  return byMode;
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
    if (hay.includes('isp') || hay.includes('bionz') || hay.includes('npu') || hay.includes('die')) {
      return 'bionz';
    }
    if (hay.includes('cfexpress') || hay.includes('io') || hay.includes('slot') || hay.includes('port')) {
      return 'storage';
    }
    if (hay.includes('pmic') || hay.includes('power') || hay.includes('電源')) {
      return 'battery';
    }
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
      pid.includes('gasket') ||
      pid.includes('seal') ||
      pid.includes('heat') ||
      pid.includes('graphite') ||
      pid.includes('thermal') ||
      pid.includes('shield') ||
      pid.includes('emi')
    ) {
      return 'thermal_emi';
    }
    if (pid.includes('mic') || pid.includes('speaker')) return 'audio';
    if (pid.includes('card') || pid.includes('usb') || pid.includes('hdmi') || pid.includes('slot')) return 'storage';
    return 'body';
  }
  return 'accessory';
}

// -----------------------------------------------------------------------------
// Main Generation Pipeline
// -----------------------------------------------------------------------------

async function main() {
  const t0 = Date.now();
  const entries = parseRegistryEntries();
  if (SYNC_REGISTRY) {
    syncRegistryPartCounts(entries);
  }

  fs.mkdirSync(NAMES_DIR, { recursive: true });
  fs.mkdirSync(SPATIAL_DIR, { recursive: true });

  console.log(`[CATALOG] Extracting exact Box3 sizes & PBR buckets for ${entries.length} modes (STD headless)...`);
  const spatialDataByMode = await extractSpatialAndMaterialInfo(entries);

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

  for (const e of entries) {
    const jsonAbs = path.join(ROOT, e.dataFile);
    const jsonBytes = fs.statSync(jsonAbs).size;
    const jsonData = JSON.parse(fs.readFileSync(jsonAbs, 'utf8'));
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

    // Build L0 row
    indexRows.push(
      [
        e.mode,
        e.kind,
        String(parts.length),
        slugPrefix,
        codeMin,
        codeMax,
        nextCode,
        e.unitFile,
        e.dataFile,
        e.l1File,
        e.l2File,
      ].join('\t')
    );

    // Build L1 grouped ultra-compact name roster + L2 spatial TSV
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

      l2Rows.push(
        [
          sanitizeTsv(p.id),
          code,
          l2Name,
          grp,
          posStr,
          sizeStr,
          expStr,
          matStr,
        ].join('\t')
      );
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

    const l1Abs = path.join(ROOT, e.l1File);
    const l2Abs = path.join(ROOT, e.l2File);
    fs.writeFileSync(l1Abs, l1Content, 'utf8');
    fs.writeFileSync(l2Abs, l2Content, 'utf8');

    const l1Bytes = Buffer.byteLength(l1Content, 'utf8');
    const l2Bytes = Buffer.byteLength(l2Content, 'utf8');
    totalL1BytesAll += l1Bytes;
    totalL2BytesAll += l2Bytes;

    if (e.kind === 'individual') {
      allIndividualL1Chunks.push(l1Content.trimEnd());
    }

    statsPerMode.push({
      mode: e.mode,
      kind: e.kind,
      parts: parts.length,
      jsonBytes,
      l1Bytes,
      l2Bytes,
    });
  }

  indexRows.push(
    `# total_individual_modes=${totalIndivModes}\ttotal_individual_parts=${totalIndivParts}\ttotal_modes=${entries.length}`
  );
  const indexContent = `${indexRows.join('\n')}\n`;
  fs.writeFileSync(path.join(CATALOG_DIR, 'INDEX.tsv'), indexContent, 'utf8');

  const allNamesContent = `# ALL INDIVIDUAL ASSEMBLIES (${totalIndivModes} modes | ${totalIndivParts} unique parts)\n\n${allIndividualL1Chunks.join('\n\n')}\n`;
  fs.writeFileSync(path.join(CATALOG_DIR, 'ALL_NAMES.txt'), allNamesContent, 'utf8');

  // Compact columnar Play Ground catalog index (stored outside src/data/ to preserve validate_parts 2-1!)
  const pgIndexPath = path.join(ROOT, 'src', 'playground', 'playground_index.json');
  const pgIndexJson = JSON.stringify({ v: 2, units: pgUnits, parts: pgParts });
  fs.writeFileSync(pgIndexPath, pgIndexJson, 'utf8');
  const pgIndexBytes = Buffer.byteLength(pgIndexJson, 'utf8');

  // Pre-bake quantized SNORM16/SNORM8/RGBA8/Uint16 blueprints for all 42 Play Ground starter template parts
  // (`a7iv`, `zve1`, `fx3`, `wlk220`) -> cold Play Ground launch skips compiling 12 camera units (>300x faster!)
  const pgTplPath = path.join(ROOT, 'src', 'playground', 'playground_templates.json');
  let pgTplBytes = 0;
  let pgTplCount = 0;
  {
    // Ensure placeholder exists before bundling PartGeometryExtractor (which imports playground_templates.json)
    if (!fs.existsSync(pgTplPath)) {
      fs.writeFileSync(pgTplPath, '{"v":1,"parts":{}}', 'utf8');
    }
    const extMod = await bundleTsModuleForNode('src/playground/PartGeometryExtractor.ts');
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
    fs.writeFileSync(pgTplPath, pgTplJson, 'utf8');
    pgTplBytes = Buffer.byteLength(pgTplJson, 'utf8');
  }

  const indexBytes = Buffer.byteLength(indexContent, 'utf8');
  const allNamesBytes = Buffer.byteLength(allNamesContent, 'utf8');
  const elapsedMs = Date.now() - t0;

  console.log(`\n[CATALOG] Generated L0/L1/L2 + Play Ground Index & Templates for ${entries.length} modes (${totalIndivParts} unique parts) in ${(elapsedMs / 1000).toFixed(2)}s (0 cache leaks).`);
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

  for (const rep of ['shutter', 'sensor_fab', 'integrated']) {
    const s = statsPerMode.find((x) => x.mode === rep);
    if (s) {
      const r1 = (100 * (1 - s.l1Bytes / s.jsonBytes)).toFixed(2);
      const r2 = (100 * (1 - s.l2Bytes / s.jsonBytes)).toFixed(2);
      const r12 = (100 * (1 - (s.l1Bytes + s.l2Bytes) / s.jsonBytes)).toFixed(2);
      console.log(
        `  Rep ${rep.padEnd(11)}: JSON ${(s.jsonBytes / 1024).toFixed(1)}kB -> L1 ${(s.l1Bytes / 1024).toFixed(2)}kB (-${r1}%) | L2 ${(s.l2Bytes / 1024).toFixed(2)}kB (-${r2}%) | L1+L2 -${r12}%`
      );
    }
  }
}

main().catch((err) => {
  console.error('[CATALOG ERROR]', err instanceof Error ? err.stack || err.message : err);
  process.exit(1);
});
