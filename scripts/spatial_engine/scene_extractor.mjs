/**
 * `sp` — Headless Multi-Unit Scene Extractor & SPB4 Binary Cache (/tmp/sp_cache)
 * Automatically resolves ALL registered units from src/units/registry.ts (23 units, incl. MiShoeUnit)
 * via the shared unified V2 runtime bundle (hyper_cache.mjs), mirrors exact WebGL compilation
 * (retessellatePrimitiveSagitta + meta.assembledPos normalization + subView partitioning),
 * captures TS-vs-JSON coordinate drift / double-offset / NaN / negative-scale telemetry,
 * and enforces a zero-extraction fail-safe so silent 0-part PASS is impossible.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import * as THREE from 'three';
import { computeSrcFingerprint, ensureUnifiedV2RuntimeBundlePath } from '../lib/hyper_cache.mjs';
import { buildFlatBvh, computeMeshSignedVolumeAndCentroid, createEmptyBox } from './exact_geometry.mjs';

const ROOT = process.cwd();
const CACHE_DIR = path.join(os.tmpdir(), 'sp_cache');
const CACHE_MAGIC = 'SPB4';

// Material density table (g / cm³) for realistic mass / CoG / tipping calculations
const MATERIAL_DENSITY_G_CM3 = {
  tungstenCopper: 15.6,
  goldPlating: 19.3,
  rfGoldCoax: 19.3,
  sinteredSilver: 10.5,
  silverElectrode: 10.5,
  solderBallSilver: 7.4,
  copperHeatSpreader: 8.96,
  copperCoil: 8.96,
  vaporChamberCopper: 8.96,
  coaxShieldCopper: 8.96,
  brassPrecision: 8.5,
  brassGear: 8.5,
  beCuSpring: 8.25,
  sinteredBronzeBushing: 8.0,
  stainlessMachined: 7.9,
  hardenedSteelHrc60: 7.85,
  midPlateSteel: 7.85,
  softIronYoke: 7.87,
  neodymiumMagnet: 7.5,
  emiShieldCan: 8.4,
  welcomeTitaniumFace: 4.43,
  titaniumRivet: 4.43,
  invarScaleBar: 8.1,
  welcomeCoreSlate: 2.7,
  welcomeCoreMid: 2.7,
  matteBlackAnodized: 2.7,
  welcomeMagRear: 1.81,
  magnesiumCast: 1.81,
  bodyMgShell: 1.81,
  welcomeOpticalEd: 2.52,
  quartzOlpf: 2.2,
  microlensGlass: 2.5,
  siliconSensorDie: 2.33,
  siliconBulk: 2.33,
  sensorPcb: 1.9,
  hdiMainboardPcb: 1.9,
  pcbEmeraldDark: 1.9,
  abfSubstrate: 1.85,
  polyimideFpc: 1.42,
  icEpoxy: 1.85,
  pztCeramic: 7.5,
  aluminaCeramic: 3.9,
  epdmGasket: 1.25,
  damperElastomer: 1.35,
  thermalPadTim: 2.6,
  pyroGraphite: 2.1,
  carbonFiberBlade: 1.6,
  ptfeCleanWhite: 2.2,
  pa66ThermalBreak: 1.35,
  bodyBatteryCell: 2.35,
};

// Built-in optical & RF sightline cone presets
export const RAY_PRESETS = Object.freeze({
  'welcome-tof': {
    name: 'WLK VL53L5CX ToF 63° Diagonal Sightline Cone',
    unitId: 'welcome',
    origin: [0, -16.55, 13.05],
    dir: [0, 0, 1],
    fovDeg: 63,
    rangeMm: 120,
    ignoreIds: ['welcome-plinth-tof-presence-sensor', 'welcome-plinth-front-glass-window', 'welcome-plinth-mg-chassis'],
    ignoreSubstrings: ['tof', 'window', 'lens', 'baffle'],
  },
  'welcome-lux': {
    name: 'WLK Ambient Lux VEML7700 ±45° Cone',
    unitId: 'welcome',
    origin: [12.0, -16.55, 13.05],
    dir: [0, 0, 1],
    fovDeg: 90,
    rangeMm: 120,
    ignoreIds: ['welcome-plinth-ambient-lux-sensor', 'welcome-plinth-front-glass-window', 'welcome-plinth-mg-chassis'],
    ignoreSubstrings: ['lux', 'ambient', 'window'],
  },
  'welcome-rf': {
    name: 'WLK Wi-Fi 6 / BLE Rear Radome 100° Emission Cone',
    unitId: 'welcome',
    origin: [36.0, -17.0, -13.05],
    dir: [0, 0, -1],
    fovDeg: 100,
    rangeMm: 120,
    ignoreIds: ['welcome-plinth-wifi-ble-module', 'welcome-plinth-rear-io-bezel', 'welcome-plinth-mg-chassis'],
    ignoreSubstrings: ['wifi', 'radome', 'antenna', 'rf'],
  },
  'riimos-cam-front': {
    name: 'RIIMOS E1 Front 120Hz OV7720/7725 75° Sightline Cone',
    unitId: 'original',
    origin: [0, 167.0, 69.6],
    dir: [0, 0, 1],
    fovDeg: 75,
    rangeMm: 220,
    ignoreIds: ['orig-e1-cam-front-glass', 'orig-e1-cam-front-ring', 'orig-e1-cam-front-lens'],
    ignoreSubstrings: ['cam-front-glass', 'cam-front-ring'],
  },
  'riimos-cam-rear': {
    name: 'RIIMOS E1 Rear 120Hz OV7720/7725 75° Sightline Cone',
    unitId: 'original',
    origin: [0, 167.0, -69.6],
    dir: [0, 0, -1],
    fovDeg: 75,
    rangeMm: 220,
    ignoreIds: ['orig-e1-cam-rear-glass', 'orig-e1-cam-rear-ring', 'orig-e1-cam-rear-lens'],
    ignoreSubstrings: ['cam-rear-glass', 'cam-rear-ring'],
  },
  'riimos-cam-top360': {
    name: 'RIIMOS E1 Top 360° Fisheye Surveillance Dome 120° Zenith Cone',
    unitId: 'original',
    origin: [-4.0, 260.2, 42.0],
    dir: [0, 1, 0],
    fovDeg: 120,
    rangeMm: 220,
    ignoreIds: ['orig-e1-cam-top-dome', 'orig-e1-cam-top-fisheye', 'orig-e1-cam-top-mast'],
    ignoreSubstrings: ['cam-top'],
  },
});

const MIRAI_SUBVIEW_LABELS = {
  1: 'FH01 SPAD/QIS Sensor',
  2: 'FH02 Perovskite OPF',
  3: 'FH08 Meta-Optics 50mm F1.4',
  4: 'FH32 Ultrasonic MEMS Cooler',
  5: 'FH25 Tandem Micro-OLED EVF',
  6: 'FH20 2nm GAA+BSPDN AI SoC',
  7: 'FH17 MagLev Earth-Rot IBIS',
  8: 'FH48 Dec2028 Flagship Machine',
};

const SENSOR_FAB_LABELS = {
  0: 'Vol.0 CZ Ingot & Wafer',
  1: 'Vol.1 Photodiode & FEOL',
  2: 'Vol.2 BEOL & Hybrid Bonding',
  3: 'Vol.3 Color Filter & Microlens',
  4: 'Vol.4 Packaging & Test',
  5: 'Vol.5 Wafer Fab Cleanroom',
};

/**
 * Enumerate physical assemblies & UI sub-views for a given unitId so multi-assembly units
 * (sensor_fab Vol.0..5, mirai_2028 FH01..FH48, lens All + Sec1/2/3 + Studio, original #01)
 * are audited cleanly without falsely overlapping independent origin-centered scenes.
 */
export function listUnitAuditTargets(unitId, opts = {}) {
  const includeUiSubViews = opts.includeUiSubViews !== false;
  if (unitId === 'sensor_fab') {
    return [0, 1, 2, 3, 4, 5].map((sv) => ({
      unitId,
      subView: sv,
      subViewTag: `sv${sv}`,
      label: SENSOR_FAB_LABELS[sv] || `Vol.${sv}`,
      physicalAssembly: true,
    }));
  }
  if (unitId === 'mirai_2028') {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((sv) => ({
      unitId,
      subView: sv,
      subViewTag: `sv${sv}`,
      label: MIRAI_SUBVIEW_LABELS[sv] || `FH#${sv}`,
      physicalAssembly: true,
    }));
  }
  if (unitId === 'lens') {
    const targets = [
      { unitId, subView: 'all', subViewTag: 'all', label: 'Full Barrel (128p)', physicalAssembly: true },
    ];
    if (includeUiSubViews) {
      targets.push(
        { unitId, subView: 1, subViewTag: 'sv1', label: 'Sec1 Rear', physicalAssembly: false, uiSubView: true },
        { unitId, subView: 2, subViewTag: 'sv2', label: 'Sec2 Mid', physicalAssembly: false, uiSubView: true },
        { unitId, subView: 3, subViewTag: 'sv3', label: 'Sec3 Front', physicalAssembly: false, uiSubView: true },
        { unitId, subView: -1, subViewTag: 'svm1', label: 'Optics Studio', physicalAssembly: false, uiSubView: true },
      );
    }
    return targets;
  }
  if (unitId === 'original') {
    return [
      { unitId, subView: 1, subViewTag: 'sv1', label: '#01 RIIMOS E1', physicalAssembly: true },
    ];
  }
  return [
    { unitId, subView: null, subViewTag: 'all', label: 'Full Assembly', physicalAssembly: true },
  ];
}

export function listAllNonWelcomeAuditTargets(opts = {}) {
  const units = discoverRegisteredUnits(ROOT).filter((u) => u.unitId !== 'welcome');
  const out = [];
  for (const u of units) {
    out.push(...listUnitAuditTargets(u.unitId, opts));
  }
  return out;
}

/**
 * Parse src/units/registry.ts dynamically so every newly added unit is discovered automatically.
 */
export function discoverRegisteredUnits(repoRoot = ROOT) {
  const regPath = path.join(repoRoot, 'src/units/registry.ts');
  const src = fs.readFileSync(regPath, 'utf8');
  const units = [];
  const entryRx = /([a-zA-Z0-9_]+)\s*:\s*\{\s*unitId:\s*['"]([^'"]+)['"],\s*declaredPartCount:\s*(\d+),[\s\S]*?import\(['"]([^'"]+)['"]\)[\s\S]*?import\(['"]([^'"]+)['"]\)\)\.([a-zA-Z0-9_]+)\(/g;
  let m;
  while ((m = entryRx.exec(src)) !== null) {
    units.push({
      unitId: m[2],
      declaredPartCount: Number(m[3]),
      jsonPath: path.resolve(path.dirname(regPath), m[4]),
      unitModulePath: path.resolve(path.dirname(regPath), m[5] + '.ts'),
      factoryName: m[6],
    });
  }
  return units;
}

function classifyRole(id, title = '', category = '') {
  const s = `${id} ${title} ${category}`.toLowerCase();
  if (/pcb|board|mainboard|mcpcb|driver|mcu|pmic|charger|dac|amp|can|nfc|sensor|clock|tcxo|rtc|supercap|esd|shunt|flash|eeprom|ic|soc|chip|bga|sram|dram|nand|mosfet|ldo|tvs|resistor|capacitor|inductor|choke|diode|oscillator|crystal|regulator|mux|isolator|shifter/.test(s)) {
    if (/board|pcb|mainboard|mcpcb|flex-board|substrate/.test(s)) return 'pcb';
    if (/heatsink|heatpipe|fin|thermal|cooler|vapor/.test(s)) return 'thermal_source';
    if (/mcu|pmic|dac|amp|led|driver|soc|bionz|mosfet|ldo|regulator/.test(s)) return 'heat_source';
    if (/tcxo|rtc|coin|battery|cell|lifepo4|supercap|sensor|lux|tof|crystal|oscillator/.test(s)) return 'thermal_sensitive';
    return 'smt_ic';
  }
  if (/heatsink|heatpipe|fin|radiator|cooler/.test(s)) return 'heat_source';
  if (/battery|cell|lifepo4|coin|rtc|tcxo|crystal/.test(s)) return 'thermal_sensitive';
  if (/chassis|frame|housing|shell|bezel|cover|plate|base|barrel|case|cabinet|body|door|cap/.test(s)) return 'chassis';
  if (/screw|bolt|washer|nut|pin|dowel|rivet|clip|spring|clamp|fastener/.test(s)) return 'fastener';
  if (/gasket|seal|oring|o-ring|pad|foam|damper|bushing|boot|skirt|rubber/.test(s)) return 'elastomer';
  return 'mechanical';
}

function inferMaterialKey(mat) {
  if (!mat) return 'welcomeCoreSlate';
  if (mat.name && MATERIAL_DENSITY_G_CM3[mat.name]) return mat.name;
  if (mat.userData?.v2Tag?.key) return mat.userData.v2Tag.key;
  if (mat.userData?.catalogKey) return mat.userData.catalogKey;
  return 'welcomeCoreSlate';
}

function createMaterialProxy() {
  const cache = new Map();
  return new Proxy(
    {},
    {
      get(_t, prop) {
        if (typeof prop !== 'string') return undefined;
        if (cache.has(prop)) return cache.get(prop);
        const m = new THREE.MeshStandardMaterial({ name: prop });
        m.userData = { catalogKey: prop };
        cache.set(prop, m);
        return m;
      },
    }
  );
}

let _unifiedRuntimePromise = null;
async function getUnifiedV2Runtime() {
  if (!_unifiedRuntimePromise) {
    const bundlePath = ensureUnifiedV2RuntimeBundlePath();
    _unifiedRuntimePromise = import(pathToFileURL(bundlePath).href);
  }
  return _unifiedRuntimePromise;
}

function normalizeSubViewTag(subView) {
  if (subView === undefined || subView === null || subView === 'all') return 'all';
  const n = Number(subView);
  if (Number.isNaN(n)) return 'all';
  return n < 0 ? `svm${Math.abs(n)}` : `sv${n}`;
}

function computeCacheHash(unitId, subViewTag, quality) {
  const srcFp = computeSrcFingerprint();
  return crypto
    .createHash('sha256')
    .update(`${CACHE_MAGIC}|${unitId}|${subViewTag}|${quality}|${srcFp}`)
    .digest('hex')
    .slice(0, 20);
}

function writeSpb4Cache(cachePath, sceneData) {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  const metaParts = sceneData.parts.map((p) => ({
    id: p.id,
    code: p.code,
    order: p.order,
    groupKey: p.groupKey,
    subsystem: p.subsystem,
    category: p.category,
    title: p.title,
    role: p.role,
    assembledPos: p.assembledPos,
    explodeOffset: p.explodeOffset,
    box: p.box,
    localBox: p.localBox,
    volumeMm3: p.volumeMm3,
    massG: p.massG,
    cog: p.cog,
    meshStart: p.meshStart,
    meshCount: p.meshCount,
    coordAudit: p.coordAudit,
  }));
  const metaMeshes = sceneData.meshes.map((m) => ({
    partIdx: m.partIdx,
    partId: m.partId,
    code: m.code,
    groupKey: m.groupKey,
    role: m.role,
    matKey: m.matKey,
    box: m.box,
    triFloats: m.tris.length,
  }));

  const headerObj = {
    unitId: sceneData.unitId,
    subView: sceneData.subView,
    subViewTag: sceneData.subViewTag,
    quality: sceneData.quality,
    groupOrigins: sceneData.groupOrigins,
    extractionAudit: sceneData.extractionAudit,
    parts: metaParts,
    meshes: metaMeshes,
    totalTris: sceneData.totalTris,
  };
  const headerBuf = Buffer.from(JSON.stringify(headerObj), 'utf8');
  let totalFloats = 0;
  for (const m of sceneData.meshes) totalFloats += m.tris.length;

  const outBuf = Buffer.allocUnsafe(8 + headerBuf.length + totalFloats * 8);
  outBuf.write(CACHE_MAGIC, 0, 4, 'ascii');
  outBuf.writeUInt32LE(headerBuf.length, 4);
  headerBuf.copy(outBuf, 8);

  let byteOff = 8 + headerBuf.length;
  for (const m of sceneData.meshes) {
    const srcBytes = Buffer.from(m.tris.buffer, m.tris.byteOffset, m.tris.byteLength);
    srcBytes.copy(outBuf, byteOff);
    byteOff += srcBytes.length;
  }
  const tmp = `${cachePath}.${process.pid}.${Math.random().toString(36).slice(2, 7)}.tmp`;
  fs.writeFileSync(tmp, outBuf);
  fs.renameSync(tmp, cachePath);
}

function readSpb4Cache(cachePath) {
  if (!fs.existsSync(cachePath)) return null;
  try {
    const buf = fs.readFileSync(cachePath);
    if (buf.length < 8 || buf.subarray(0, 4).toString('ascii') !== CACHE_MAGIC) return null;
    const hLen = buf.readUInt32LE(4);
    const header = JSON.parse(buf.subarray(8, 8 + hLen).toString('utf8'));
    let byteOff = 8 + hLen;
    const meshes = new Array(header.meshes.length);
    for (let i = 0; i < header.meshes.length; i++) {
      const mm = header.meshes[i];
      const byteLen = mm.triFloats * 8;
      const tris = new Float64Array(mm.triFloats);
      Buffer.from(tris.buffer).set(buf.subarray(byteOff, byteOff + byteLen));
      byteOff += byteLen;
      meshes[i] = { ...mm, tris, _triBvh: null };
    }
    const sceneBvh = buildFlatBvh(meshes.map((m) => m.box), 6);
    return {
      ...header,
      meshes,
      sceneBvh,
      fromCache: true,
    };
  } catch {
    return null;
  }
}

/**
 * Extract Float64 world-space triangles for any BufferGeometry + world Matrix4,
 * also tracking NaN/Infinity vertices for geometry-health audits.
 */
function extractGeometryWorldTris(geo, worldMatrix, statsOut = null) {
  const pos = geo?.attributes?.position;
  if (!pos || pos.count < 3) return new Float64Array(0);
  const idx = geo.index;
  const nVerts = idx ? idx.count : pos.count;
  const nTris = Math.floor(nVerts / 3);
  const out = new Float64Array(nTris * 9);
  const e = worldMatrix.elements;
  const m0 = e[0], m1 = e[1], m2 = e[2];
  const m4 = e[4], m5 = e[5], m6 = e[6];
  const m8 = e[8], m9 = e[9], m10 = e[10];
  const m12 = e[12], m13 = e[13], m14 = e[14];

  let written = 0;
  for (let t = 0; t < nTris; t++) {
    const base = t * 3;
    let bad = false;
    const tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let k = 0; k < 3; k++) {
      const vi = idx ? idx.getX(base + k) : base + k;
      const x = pos.getX(vi);
      const y = pos.getY(vi);
      const z = pos.getZ(vi);
      const wx = m0 * x + m4 * y + m8 * z + m12;
      const wy = m1 * x + m5 * y + m9 * z + m13;
      const wz = m2 * x + m6 * y + m10 * z + m14;
      if (!Number.isFinite(wx) || !Number.isFinite(wy) || !Number.isFinite(wz)) {
        bad = true;
        break;
      }
      tmp[k * 3] = wx;
      tmp[k * 3 + 1] = wy;
      tmp[k * 3 + 2] = wz;
    }
    if (bad) {
      if (statsOut) statsOut.nanTris++;
      continue;
    }
    const off = written * 9;
    for (let j = 0; j < 9; j++) out[off + j] = tmp[j];
    written++;
  }
  return written === nTris ? out : out.subarray(0, written * 9);
}

/**
 * Extract Float64 world-space triangles from a Three.js r174 BatchedMesh sub-geometry slot
 * (handles both indexed STD-LITE Int16-quantized and non-indexed STD/HIGH/ULTRA BatchedMeshes).
 */
function extractBatchedSubGeometryWorldTris(geo, gInfo, worldMatrix, statsOut = null) {
  const pos = geo?.attributes?.position;
  if (!pos || !gInfo) return new Float64Array(0);
  const idx = geo.index;
  const useIndex = Boolean(idx && gInfo.indexCount > 0 && gInfo.indexStart >= 0);
  const start = useIndex ? gInfo.indexStart : gInfo.vertexStart;
  const count = useIndex ? gInfo.indexCount : gInfo.vertexCount;
  if (start < 0 || count < 3) return new Float64Array(0);

  const nTris = Math.floor(count / 3);
  const out = new Float64Array(nTris * 9);
  const e = worldMatrix.elements;
  const m0 = e[0], m1 = e[1], m2 = e[2];
  const m4 = e[4], m5 = e[5], m6 = e[6];
  const m8 = e[8], m9 = e[9], m10 = e[10];
  const m12 = e[12], m13 = e[13], m14 = e[14];

  let written = 0;
  for (let t = 0; t < nTris; t++) {
    const base = start + t * 3;
    let bad = false;
    const tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let k = 0; k < 3; k++) {
      const vi = useIndex ? idx.getX(base + k) : base + k;
      const x = pos.getX(vi);
      const y = pos.getY(vi);
      const z = pos.getZ(vi);
      const wx = m0 * x + m4 * y + m8 * z + m12;
      const wy = m1 * x + m5 * y + m9 * z + m13;
      const wz = m2 * x + m6 * y + m10 * z + m14;
      if (!Number.isFinite(wx) || !Number.isFinite(wy) || !Number.isFinite(wz)) {
        bad = true;
        break;
      }
      tmp[k * 3] = wx;
      tmp[k * 3 + 1] = wy;
      tmp[k * 3 + 2] = wz;
    }
    if (bad) {
      if (statsOut) statsOut.nanTris++;
      continue;
    }
    const off = written * 9;
    for (let j = 0; j < 9; j++) out[off + j] = tmp[j];
    written++;
  }
  return written === nTris ? out : out.subarray(0, written * 9);
}

function inferCodeFromTitle(title, order) {
  const m = String(title || '').match(/^([A-Z0-9]+[-_]?[A-Z]*\d+)\./);
  return m ? m[1] : `P${order}`;
}

function expandBoxWithTris(tris, targetBox) {
  for (let i = 0; i < tris.length; i += 3) {
    const x = tris[i], y = tris[i + 1], z = tris[i + 2];
    if (x < targetBox[0]) targetBox[0] = x;
    if (y < targetBox[1]) targetBox[1] = y;
    if (z < targetBox[2]) targetBox[2] = z;
    if (x > targetBox[3]) targetBox[3] = x;
    if (y > targetBox[4]) targetBox[4] = y;
    if (z > targetBox[5]) targetBox[5] = z;
  }
}

function disposeTempTree(parts) {
  if (!Array.isArray(parts)) return;
  for (let i = 0; i < parts.length; i++) {
    const grp = parts[i]?.group;
    if (!grp) continue;
    grp.traverse((obj) => {
      const geo = obj.geometry;
      if (geo && !geo.userData?.__pooled) {
        try { geo.dispose(); } catch {}
      }
    });
  }
}

/**
 * Headlessly load & extract exact Float64 triangle scene for ANY registered unit, quality tier & subView.
 */
export async function loadSpatialScene(unitId, opts = {}) {
  const quality = opts.quality || 'ultra';
  const subView = opts.subView === undefined ? null : opts.subView;
  const subViewTag = normalizeSubViewTag(subView);
  const useCache = opts.noCache ? false : true;
  const t0 = performance.now();

  const rt = await getUnifiedV2Runtime();
  if (!rt.hasRegisteredUnit(unitId)) {
    const allIds = rt.listRegisteredUnits().map((u) => u.unitId).join(', ');
    throw new Error(`Unknown unit '${unitId}'. Registered units: ${allIds}`);
  }

  const hash = computeCacheHash(unitId, subViewTag, quality);
  const cachePath = path.join(CACHE_DIR, `${unitId}_${subViewTag}_${quality}_${hash}.spbin`);
  if (useCache) {
    const cached = readSpb4Cache(cachePath);
    if (cached) {
      cached.loadMs = Number((performance.now() - t0).toFixed(1));
      return cached;
    }
  }

  const unit = await rt.loadRegisteredUnit(unitId);
  const unitMeta = unit.getMeta();
  const allMetaParts = unitMeta.parts || [];
  const metaById = new Map(allMetaParts.map((p) => [p.id, p]));
  const isComposite = unitId === 'integrated' || unitId === 'camera_body';
  const isCompiledV2 = Boolean(unit.cfg && typeof unit.cfg.buildRaw === 'function');

  const meshes = [];
  const parts = [];
  const groupOriginAcc = new Map();
  let totalTris = 0;
  let expectedActiveParts = allMetaParts;
  const unregisteredRawPartIds = [];
  const zeroMeshPartIds = [];

  if (isCompiledV2) {
    const filterBySubView =
      subView !== null &&
      subView !== 'all' &&
      typeof unit.cfg.isPartInSubView === 'function';
    const numericSubView = filterBySubView
      ? Number(subView)
      : unitId === 'lens'
        ? 1
        : unitId === 'mirai_2028' || unitId === 'original'
          ? 1
          : 0;

    if (filterBySubView) {
      expectedActiveParts = allMetaParts.filter((m) => unit.cfg.isPartInSubView(m, numericSubView));
    }
    const expectedIdSet = new Set(expectedActiveParts.map((m) => m.id));

    const matProxy = createMaterialProxy();
    const dryboxProxy = createMaterialProxy();
    rt.setActiveBuildQuality(quality);
    let rawBuilt;
    try {
      rawBuilt = await unit.cfg.buildRaw(matProxy, quality, {
        integratedMode: isComposite,
        integrated: isComposite,
        subView: numericSubView,
        clippingPlanes: [],
        dryboxPalette: dryboxProxy,
        yieldChunk: async () => {},
      });
    } finally {
      rt.setActiveBuildQuality(null);
    }

    const rawParts = rawBuilt?.parts || [];
    const retessTol =
      quality === 'standard_lite' ? 1.35 : quality === 'standard' ? 0.40 : quality === 'high' ? 0.22 : 0;
    const retessMap = new Map();
    const tempRetessGeos = new Set();
    const resolveGeoForTier = (rawGeo) => {
      if (retessTol <= 0) return rawGeo;
      const existing = retessMap.get(rawGeo);
      if (existing) return existing;
      const next = rt.retessellatePrimitiveSagitta(rawGeo, retessTol);
      retessMap.set(rawGeo, next);
      if (next !== rawGeo && !next.userData?.__pooled) tempRetessGeos.add(next);
      return next;
    };

    const invRoot = new THREE.Matrix4();
    const translateMat = new THREE.Matrix4();
    const localMat = new THREE.Matrix4();
    const instMat = new THREE.Matrix4();
    const instLocalMat = new THREE.Matrix4();
    const worldMat = new THREE.Matrix4();

    const seenPartIds = new Set();

    for (let rpi = 0; rpi < rawParts.length; rpi++) {
      const rp = rawParts[rpi];
      if (!expectedIdSet.has(rp.id)) {
        if (!metaById.has(rp.id)) unregisteredRawPartIds.push(rp.id);
        continue;
      }
      if (seenPartIds.has(rp.id)) continue;
      seenPartIds.add(rp.id);

      const jm = metaById.get(rp.id);
      const pi = parts.length;
      const groupKey = jm.groupKey || rp.groupKey || rp.subsystem || unitId;
      const subsystem = rp.subsystem || (unitId === 'integrated' || unitId === 'camera_body' ? rp.id.split('-')[0] : unitId);
      const order = jm.order ?? rp.order ?? pi + 1;
      const title = jm.title || rp.explanation?.title || rp.id;
      const category = jm.category || rp.explanation?.category || '';
      const code = inferCodeFromTitle(title, order);
      const role = classifyRole(rp.id, title, category);

      const metaAssembledPos = jm.assembledPos
        ? [jm.assembledPos[0], jm.assembledPos[1], jm.assembledPos[2]]
        : rp.assembledPos
          ? [rp.assembledPos.x, rp.assembledPos.y, rp.assembledPos.z]
          : [0, 0, 0];

      const expArr = isComposite && jm.integratedExplodeOffset
        ? jm.integratedExplodeOffset
        : jm.explodeOffset
          ? jm.explodeOffset
          : rp.explodeOffset
            ? [rp.explodeOffset.x, rp.explodeOffset.y, rp.explodeOffset.z]
            : [0, 0, 0];
      const exp = [expArr[0], expArr[1], expArr[2]];

      // Capture raw TS coordinates BEFORE v2_unit_compiler normalization (Axis 5 drift detection)
      const rawGroupPos = rp.group
        ? [rp.group.position.x, rp.group.position.y, rp.group.position.z]
        : [0, 0, 0];
      const rawGroupRot = rp.group
        ? [rp.group.rotation.x, rp.group.rotation.y, rp.group.rotation.z]
        : [0, 0, 0];
      const rawGroupScale = rp.group
        ? [rp.group.scale.x, rp.group.scale.y, rp.group.scale.z]
        : [1, 1, 1];
      const rawAssembledPos = rp.assembledPos
        ? [rp.assembledPos.x, rp.assembledPos.y, rp.assembledPos.z]
        : null;

      const assembledPosDriftMm = rawAssembledPos
        ? Math.hypot(
            rawAssembledPos[0] - metaAssembledPos[0],
            rawAssembledPos[1] - metaAssembledPos[1],
            rawAssembledPos[2] - metaAssembledPos[2]
          )
        : 0;
      const groupPosDriftMm = Math.hypot(
        rawGroupPos[0] - metaAssembledPos[0],
        rawGroupPos[1] - metaAssembledPos[1],
        rawGroupPos[2] - metaAssembledPos[2]
      );
      const rawGroupRotNonZero = Math.hypot(rawGroupRot[0], rawGroupRot[1], rawGroupRot[2]) > 1e-6;
      const rawGroupScaleNonUnit = Math.hypot(rawGroupScale[0] - 1, rawGroupScale[1] - 1, rawGroupScale[2] - 1) > 1e-6;

      if (!groupOriginAcc.has(groupKey)) groupOriginAcc.set(groupKey, metaAssembledPos);

      const meshStart = meshes.length;
      const partBox = createEmptyBox();
      const localBox = createEmptyBox();
      let partVol = 0;
      let partMass = 0;
      let cogX = 0, cogY = 0, cogZ = 0;
      const healthStats = { nanTris: 0 };
      let hasNegativeScale = false;

      if (rp.group) {
        // Exact mirror of v2_unit_compiler.ts lines 2101-2103 & 2135/2200:
        // zero rp.group.position -> extract local matrix relative to rp.group -> translate by meta.assembledPos
        rp.group.position.set(0, 0, 0);
        rp.group.updateMatrixWorld(true);
        invRoot.copy(rp.group.matrixWorld).invert();
        translateMat.makeTranslation(metaAssembledPos[0], metaAssembledPos[1], metaAssembledPos[2]);

        rp.group.traverse((obj) => {
          if (!obj.isMesh && !obj.isInstancedMesh) return;
          if (!obj.geometry) return;
          const geo = resolveGeoForTier(obj.geometry);
          const matKey = inferMaterialKey(Array.isArray(obj.material) ? obj.material[0] : obj.material);
          const density = MATERIAL_DENSITY_G_CM3[matKey] ?? 2.7;

          const pushTris = (tris, lMat) => {
            if (lMat.determinant() < -1e-9) hasNegativeScale = true;
            if (tris.length < 9) return;
            const mBox = createEmptyBox();
            expandBoxWithTris(tris, mBox);
            for (let k = 0; k < 3; k++) {
              if (mBox[k] < partBox[k]) partBox[k] = mBox[k];
              if (mBox[k + 3] > partBox[k + 3]) partBox[k + 3] = mBox[k + 3];
              const lMin = mBox[k] - metaAssembledPos[k];
              const lMax = mBox[k + 3] - metaAssembledPos[k];
              if (lMin < localBox[k]) localBox[k] = lMin;
              if (lMax > localBox[k + 3]) localBox[k + 3] = lMax;
            }
            const { volumeMm3, centroid } = computeMeshSignedVolumeAndCentroid(tris);
            const mMass = (volumeMm3 / 1000) * density;
            partVol += volumeMm3;
            partMass += mMass;
            cogX += centroid[0] * mMass;
            cogY += centroid[1] * mMass;
            cogZ += centroid[2] * mMass;
            totalTris += tris.length / 9;

            meshes.push({
              partIdx: pi,
              partId: rp.id,
              code,
              groupKey,
              role,
              matKey,
              box: mBox,
              tris,
              _triBvh: null,
            });
          };

          localMat.multiplyMatrices(invRoot, obj.matrixWorld);
          if (obj.isInstancedMesh) {
            for (let c = 0; c < obj.count; c++) {
              obj.getMatrixAt(c, instMat);
              instLocalMat.multiplyMatrices(localMat, instMat);
              worldMat.multiplyMatrices(translateMat, instLocalMat);
              pushTris(extractGeometryWorldTris(geo, worldMat, healthStats), instLocalMat);
            }
          } else {
            worldMat.multiplyMatrices(translateMat, localMat);
            pushTris(extractGeometryWorldTris(geo, worldMat, healthStats), localMat);
          }
        });
      }

      const meshCount = meshes.length - meshStart;
      if (meshCount === 0) zeroMeshPartIds.push(rp.id);

      const hasValidBox = Number.isFinite(partBox[0]) && Number.isFinite(partBox[3]);
      const safePartBox = hasValidBox
        ? partBox
        : [metaAssembledPos[0], metaAssembledPos[1], metaAssembledPos[2], metaAssembledPos[0], metaAssembledPos[1], metaAssembledPos[2]];
      const safeLocalBox = Number.isFinite(localBox[0]) ? localBox : [0, 0, 0, 0, 0, 0];
      const localCenter = [
        (safeLocalBox[0] + safeLocalBox[3]) * 0.5,
        (safeLocalBox[1] + safeLocalBox[4]) * 0.5,
        (safeLocalBox[2] + safeLocalBox[5]) * 0.5,
      ];
      const localOriginEccMm = Math.hypot(localCenter[0], localCenter[1], localCenter[2]);

      const cog = partMass > 1e-9
        ? [cogX / partMass, cogY / partMass, cogZ / partMass]
        : [
            (safePartBox[0] + safePartBox[3]) * 0.5,
            (safePartBox[1] + safePartBox[4]) * 0.5,
            (safePartBox[2] + safePartBox[5]) * 0.5,
          ];

      parts.push({
        id: rp.id,
        code,
        order,
        groupKey,
        subsystem,
        category,
        title,
        role,
        assembledPos: metaAssembledPos,
        explodeOffset: exp,
        box: safePartBox,
        localBox: safeLocalBox,
        volumeMm3: Number(partVol.toFixed(3)),
        massG: Number(partMass.toFixed(4)),
        cog,
        meshStart,
        meshCount,
        coordAudit: {
          rawGroupPos: rawGroupPos.map((v) => Number(v.toFixed(5))),
          rawAssembledPos: rawAssembledPos ? rawAssembledPos.map((v) => Number(v.toFixed(5))) : null,
          assembledPosDriftMm: Number(assembledPosDriftMm.toFixed(5)),
          groupPosDriftMm: Number(groupPosDriftMm.toFixed(5)),
          rawGroupRotNonZero,
          rawGroupScaleNonUnit,
          localCenter: localCenter.map((v) => Number(v.toFixed(4))),
          localOriginEccMm: Number(localOriginEccMm.toFixed(4)),
          nanTris: healthStats.nanTris,
          hasNegativeScale,
        },
      });
    }

    for (const g of tempRetessGeos) {
      try { g.dispose(); } catch {}
    }
    disposeTempTree(rawParts);
  } else {
    // Standalone OptimizedUnit implementation (e.g., MiShoeUnit):
    // Build directly via unit.build() and extract Float64 world triangles from InstancedMesh & BatchedMesh bindings
    const cache = new rt.ResourceCache();
    let built;
    try {
      built = await unit.build(quality, cache, {
        synchronous: true,
        skipEdges: true,
        clippingPlanes: [],
      });
      built.rootGroup.updateMatrixWorld(true);

      const partEntriesById = new Map();
      for (let i = 0; i < allMetaParts.length; i++) {
        const jm = allMetaParts[i];
        const code = inferCodeFromTitle(jm.title, jm.order ?? i + 1);
        const role = classifyRole(jm.id, jm.title, jm.category || '');
        const assembledPos = jm.assembledPos ? [...jm.assembledPos] : [0, 0, 0];
        const explodeOffset = jm.explodeOffset ? [...jm.explodeOffset] : [0, 0, 0];
        if (!groupOriginAcc.has(jm.groupKey)) groupOriginAcc.set(jm.groupKey, assembledPos);
        partEntriesById.set(jm.id, {
          jm,
          code,
          role,
          assembledPos,
          explodeOffset,
          subMeshes: [],
          nanTris: 0,
          hasNegativeScale: false,
        });
      }

      const im = new THREE.Matrix4();
      const wm = new THREE.Matrix4();
      const bindings = built.raycastIndex?.bindings || [];

      for (let bi = 0; bi < bindings.length; bi++) {
        const binding = bindings[bi];
        if (binding.kind === 'instanced') {
          const mesh = binding.mesh;
          mesh.updateMatrixWorld(true);
          const matKey = inferMaterialKey(Array.isArray(mesh.material) ? mesh.material[0] : mesh.material);
          for (let i = 0; i < mesh.count; i++) {
            const partId = binding.instanceIdToPartId[i];
            const entry = partEntriesById.get(partId);
            if (!entry) continue;
            mesh.getMatrixAt(i, im);
            wm.multiplyMatrices(mesh.matrixWorld, im);
            const det = wm.determinant();
            if (Math.abs(det) < 1e-12) continue;
            if (det < -1e-9) entry.hasNegativeScale = true;
            const st = { nanTris: 0 };
            const tris = extractGeometryWorldTris(mesh.geometry, wm, st);
            entry.nanTris += st.nanTris;
            if (tris.length >= 9) entry.subMeshes.push({ matKey, tris });
          }
        } else if (binding.kind === 'batched') {
          const mesh = binding.mesh;
          mesh.updateMatrixWorld(true);
          const matKey = inferMaterialKey(Array.isArray(mesh.material) ? mesh.material[0] : mesh.material);
          const bTable = binding.batchIdToPartId || [];
          const instInfos = mesh._instanceInfo || [];
          const geoInfos = mesh._geometryInfo || [];
          for (let bId = 0; bId < bTable.length; bId++) {
            const partId = bTable[bId];
            if (!partId) continue;
            const entry = partEntriesById.get(partId);
            if (!entry) continue;
            const iInfo = instInfos[bId];
            if (iInfo && (!iInfo.active || !iInfo.visible)) continue;
            const gIdx = typeof mesh.getGeometryIdAt === 'function' ? mesh.getGeometryIdAt(bId) : iInfo?.geometryIndex;
            const gInfo = geoInfos[gIdx];
            if (!gInfo || !gInfo.active) continue;
            mesh.getMatrixAt(bId, im);
            wm.multiplyMatrices(mesh.matrixWorld, im);
            const det = wm.determinant();
            if (Math.abs(det) < 1e-12) continue;
            if (det < -1e-9) entry.hasNegativeScale = true;
            const st = { nanTris: 0 };
            const tris = extractBatchedSubGeometryWorldTris(mesh.geometry, gInfo, wm, st);
            entry.nanTris += st.nanTris;
            if (tris.length >= 9) entry.subMeshes.push({ matKey, tris });
          }
        }
      }

      for (let i = 0; i < allMetaParts.length; i++) {
        const jm = allMetaParts[i];
        const entry = partEntriesById.get(jm.id);
        const pi = parts.length;
        const meshStart = meshes.length;
        const partBox = createEmptyBox();
        const localBox = createEmptyBox();
        let partVol = 0;
        let partMass = 0;
        let cogX = 0, cogY = 0, cogZ = 0;

        for (let si = 0; si < entry.subMeshes.length; si++) {
          const { matKey, tris } = entry.subMeshes[si];
          const density = MATERIAL_DENSITY_G_CM3[matKey] ?? 2.7;
          const mBox = createEmptyBox();
          expandBoxWithTris(tris, mBox);
          for (let k = 0; k < 3; k++) {
            if (mBox[k] < partBox[k]) partBox[k] = mBox[k];
            if (mBox[k + 3] > partBox[k + 3]) partBox[k + 3] = mBox[k + 3];
            const lMin = mBox[k] - entry.assembledPos[k];
            const lMax = mBox[k + 3] - entry.assembledPos[k];
            if (lMin < localBox[k]) localBox[k] = lMin;
            if (lMax > localBox[k + 3]) localBox[k + 3] = lMax;
          }
          const { volumeMm3, centroid } = computeMeshSignedVolumeAndCentroid(tris);
          const mMass = (volumeMm3 / 1000) * density;
          partVol += volumeMm3;
          partMass += mMass;
          cogX += centroid[0] * mMass;
          cogY += centroid[1] * mMass;
          cogZ += centroid[2] * mMass;
          totalTris += tris.length / 9;

          meshes.push({
            partIdx: pi,
            partId: jm.id,
            code: entry.code,
            groupKey: jm.groupKey,
            role: entry.role,
            matKey,
            box: mBox,
            tris,
            _triBvh: null,
          });
        }

        const meshCount = meshes.length - meshStart;
        if (meshCount === 0) zeroMeshPartIds.push(jm.id);

        const safePartBox = Number.isFinite(partBox[0])
          ? partBox
          : [entry.assembledPos[0], entry.assembledPos[1], entry.assembledPos[2], entry.assembledPos[0], entry.assembledPos[1], entry.assembledPos[2]];
        const safeLocalBox = Number.isFinite(localBox[0]) ? localBox : [0, 0, 0, 0, 0, 0];
        const localCenter = [
          (safeLocalBox[0] + safeLocalBox[3]) * 0.5,
          (safeLocalBox[1] + safeLocalBox[4]) * 0.5,
          (safeLocalBox[2] + safeLocalBox[5]) * 0.5,
        ];
        const localOriginEccMm = Math.hypot(localCenter[0], localCenter[1], localCenter[2]);

        const cog = partMass > 1e-9
          ? [cogX / partMass, cogY / partMass, cogZ / partMass]
          : [
              (safePartBox[0] + safePartBox[3]) * 0.5,
              (safePartBox[1] + safePartBox[4]) * 0.5,
              (safePartBox[2] + safePartBox[5]) * 0.5,
            ];

        parts.push({
          id: jm.id,
          code: entry.code,
          order: jm.order ?? i + 1,
          groupKey: jm.groupKey,
          subsystem: unitId,
          category: jm.category || '',
          title: jm.title || jm.id,
          role: entry.role,
          assembledPos: entry.assembledPos,
          explodeOffset: entry.explodeOffset,
          box: safePartBox,
          localBox: safeLocalBox,
          volumeMm3: Number(partVol.toFixed(3)),
          massG: Number(partMass.toFixed(4)),
          cog,
          meshStart,
          meshCount,
          coordAudit: {
            rawGroupPos: entry.assembledPos.map((v) => Number(v.toFixed(5))),
            rawAssembledPos: entry.assembledPos.map((v) => Number(v.toFixed(5))),
            assembledPosDriftMm: 0,
            groupPosDriftMm: 0,
            rawGroupRotNonZero: false,
            rawGroupScaleNonUnit: false,
            localCenter: localCenter.map((v) => Number(v.toFixed(4))),
            localOriginEccMm: Number(localOriginEccMm.toFixed(4)),
            nanTris: entry.nanTris,
            hasNegativeScale: entry.hasNegativeScale,
          },
        });
      }
    } finally {
      try { unit.dispose(cache); } catch {}
      try { cache.disposeAll?.(); } catch {}
    }
  }

  // Zero-extraction fail-safe: physically block silent 0-part or partial-part false PASS!
  if (parts.length !== expectedActiveParts.length || parts.length === 0) {
    const gotSet = new Set(parts.map((p) => p.id));
    const missing = expectedActiveParts.filter((m) => !gotSet.has(m.id)).map((m) => m.id);
    throw new Error(
      `Extraction integrity mismatch for ${unitId} (subView=${subViewTag}, quality=${quality}): ` +
      `extracted=${parts.length} vs expected=${expectedActiveParts.length}` +
      (missing.length > 0 ? ` | missing=[${missing.slice(0, 10).join(', ')}${missing.length > 10 ? ', ...' : ''}]` : '')
    );
  }

  const groupOrigins = Object.fromEntries(groupOriginAcc.entries());
  const sceneBvh = buildFlatBvh(meshes.map((m) => m.box), 6);
  const extractionAudit = {
    expectedActiveParts: expectedActiveParts.length,
    extractedParts: parts.length,
    zeroMeshParts: zeroMeshPartIds,
    unregisteredRawPartIds,
  };

  const sceneData = {
    unitId,
    subView,
    subViewTag,
    quality,
    groupOrigins,
    extractionAudit,
    parts,
    meshes,
    sceneBvh,
    totalTris,
    fromCache: false,
    loadMs: Number((performance.now() - t0).toFixed(1)),
  };

  if (useCache) {
    try {
      writeSpb4Cache(cachePath, sceneData);
    } catch {
      // non-fatal cache write error
    }
  }
  return sceneData;
}
