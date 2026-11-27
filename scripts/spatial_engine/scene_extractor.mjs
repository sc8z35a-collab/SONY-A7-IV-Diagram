/**
 * `sp` — Headless Multi-Unit Scene Extractor & SPB3 Binary Cache (/tmp/sp_cache)
 * Automatically resolves ALL registered units from src/units/registry.ts (22+ units),
 * extracts Float64 world triangles per sub-mesh with zero WebGL/DOM overhead,
 * classifies semantic roles, physical densities, group local origins, and optical/RF ray presets.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import * as THREE from 'three';
import { buildFlatBvh, computeMeshSignedVolumeAndCentroid, createEmptyBox } from './exact_geometry.mjs';

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const CACHE_DIR = path.join(os.tmpdir(), 'sp_cache');
const CACHE_MAGIC = 'SPB3';

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
});

/**
 * Parse src/units/registry.ts dynamically so every newly added unit (e.g. mirai_2028) is discovered automatically.
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
  if (/pcb|board|mainboard|mcpcb|driver|mcu|pmic|charger|dac|amp|can|nfc|sensor|clock|tcxo|rtc|supercap|esd|shunt|flash|eeprom/.test(s)) {
    if (/board|pcb|mainboard|mcpcb/.test(s)) return 'pcb';
    if (/heatsink|heatpipe|fin|thermal|cooler|vapor/.test(s)) return 'thermal_source';
    if (/mcu|pmic|dac|amp|led|driver/.test(s)) return 'heat_source';
    if (/tcxo|rtc|coin|battery|cell|lifepo4|supercap|sensor|lux|tof/.test(s)) return 'thermal_sensitive';
    return 'smt_ic';
  }
  if (/heatsink|heatpipe|fin|radiator|cooler/.test(s)) return 'heat_source';
  if (/battery|cell|lifepo4|coin|rtc|tcxo|crystal/.test(s)) return 'thermal_sensitive';
  if (/chassis|frame|housing|shell|bezel|cover|plate|base/.test(s)) return 'chassis';
  if (/screw|bolt|washer|nut|pin|dowel|rivet|clip|spring|clamp|fastener/.test(s)) return 'fastener';
  if (/gasket|seal|oring|o-ring|pad|foam|damper|bushing|boot/.test(s)) return 'elastomer';
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

/**
 * Compute recursive source hash of relevant files for SPB3 cache invalidation.
 */
function computeUnitSourceHash(unitInfo, quality) {
  const hash = crypto.createHash('sha256');
  hash.update(`${CACHE_MAGIC}|${unitInfo.unitId}|${quality}|`);
  const candidates = [unitInfo.unitModulePath, unitInfo.jsonPath];
  const asmDir = path.join(ROOT, 'src/assemblies', unitInfo.unitId === 'mishoe' ? 'mi_shoe' : unitInfo.unitId);
  if (fs.existsSync(asmDir) && fs.statSync(asmDir).isDirectory()) {
    for (const f of fs.readdirSync(asmDir).sort()) {
      if (f.endsWith('.ts')) candidates.push(path.join(asmDir, f));
    }
  }
  // Fallback: hash mtimes+sizes of unit file & assemblies directory
  for (const fp of candidates) {
    if (!fs.existsSync(fp)) continue;
    const st = fs.statSync(fp);
    hash.update(`${fp}:${st.size}:${Math.floor(st.mtimeMs)}|`);
  }
  return hash.digest('hex').slice(0, 20);
}

function writeSpb3Cache(cachePath, sceneData) {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  const metaParts = sceneData.parts.map((p) => ({
    id: p.id,
    code: p.code,
    order: p.order,
    groupKey: p.groupKey,
    title: p.title,
    role: p.role,
    assembledPos: p.assembledPos,
    explodeOffset: p.explodeOffset,
    box: p.box,
    volumeMm3: p.volumeMm3,
    massG: p.massG,
    cog: p.cog,
    meshStart: p.meshStart,
    meshCount: p.meshCount,
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
    quality: sceneData.quality,
    groupOrigins: sceneData.groupOrigins,
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
  const tmp = `${cachePath}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, outBuf);
  fs.renameSync(tmp, cachePath);
}

function readSpb3Cache(cachePath) {
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
 * Extract Float64 world-space triangles for any BufferGeometry + world Matrix4.
 */
function extractGeometryWorldTris(geo, worldMatrix) {
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

  for (let t = 0; t < nTris; t++) {
    const base = t * 3;
    const outOff = t * 9;
    for (let k = 0; k < 3; k++) {
      const vi = idx ? idx.getX(base + k) : base + k;
      const x = pos.getX(vi);
      const y = pos.getY(vi);
      const z = pos.getZ(vi);
      out[outOff + k * 3] = m0 * x + m4 * y + m8 * z + m12;
      out[outOff + k * 3 + 1] = m1 * x + m5 * y + m9 * z + m13;
      out[outOff + k * 3 + 2] = m2 * x + m6 * y + m10 * z + m14;
    }
  }
  return out;
}

/**
 * Headlessly load & extract exact Float64 triangle scene for any registered unit & quality tier.
 */
export async function loadSpatialScene(unitId, opts = {}) {
  const quality = opts.quality || 'ultra';
  const useCache = opts.noCache ? false : true;
  const t0 = performance.now();

  const units = discoverRegisteredUnits(ROOT);
  const unitInfo = units.find((u) => u.unitId === unitId);
  if (!unitInfo) {
    throw new Error(`Unknown unit '${unitId}'. Registered units: ${units.map((u) => u.unitId).join(', ')}`);
  }

  const hash = computeUnitSourceHash(unitInfo, quality);
  const cachePath = path.join(CACHE_DIR, `${unitId}_${quality}_${hash}.spbin`);
  if (useCache) {
    const cached = readSpb3Cache(cachePath);
    if (cached) {
      cached.loadMs = Number((performance.now() - t0).toFixed(1));
      return cached;
    }
  }

  // Bundle unit TS dynamically via esbuild with lightweight v2_unit_compiler stub
  const esbuild = require('esbuild');
  const stubPlugin = {
    name: 'sp-v2-stub',
    setup(build) {
      build.onResolve({ filter: /v2_unit_compiler$/ }, () => ({
        path: 'sp-v2-stub',
        namespace: 'sp-stub',
      }));
      build.onLoad({ filter: /.*/, namespace: 'sp-stub' }, () => ({
        contents: `
          export class CompiledV2Unit {
            constructor(cfg) { this.cfg = cfg; }
            __spBuildRaw(mats) { return this.cfg.buildRaw(mats); }
          }
        `,
        loader: 'js',
      }));
    },
  };

  const relUnit = './' + path.relative(ROOT, unitInfo.unitModulePath).replace(/\\/g, '/').replace(/\.ts$/, '');
  const bundled = await esbuild.build({
    stdin: {
      contents: `
        import { ${unitInfo.factoryName} } from '${relUnit}';
        import { setActiveBuildQuality } from './src/core/geometry_quality';
        export { ${unitInfo.factoryName} as createUnit, setActiveBuildQuality };
      `,
      resolveDir: ROOT,
      loader: 'ts',
    },
    bundle: true,
    platform: 'node',
    format: 'cjs',
    external: ['three'],
    plugins: [stubPlugin],
    write: false,
  });

  const mod = { exports: {} };
  const fn = new Function('require', 'module', 'exports', bundled.outputFiles[0].text);
  fn(require, mod, mod.exports);
  const { createUnit, setActiveBuildQuality } = mod.exports;

  // Read JSON metadata for groupKey & code mapping
  const jsonMeta = fs.existsSync(unitInfo.jsonPath)
    ? JSON.parse(fs.readFileSync(unitInfo.jsonPath, 'utf8'))
    : { parts: [] };
  const metaById = new Map((jsonMeta.parts || []).map((p) => [p.id, p]));

  setActiveBuildQuality(quality);
  let rawBuilt;
  try {
    const unit = createUnit();
    rawBuilt = unit.__spBuildRaw(createMaterialProxy());
  } finally {
    setActiveBuildQuality(null);
  }

  const rawParts = rawBuilt.parts || [];
  const meshes = [];
  const parts = [];
  const groupOriginAcc = new Map();
  let totalTris = 0;

  for (let pi = 0; pi < rawParts.length; pi++) {
    const rp = rawParts[pi];
    const jm = metaById.get(rp.id) || {};
    const groupKey = jm.groupKey || rp.groupKey || rp.subsystem || unitId;
    const order = rp.order || jm.order || pi + 1;
    const title = rp.explanation?.title || jm.explanation?.title || rp.id;
    const codeMatch = String(title).match(/^([A-Z]+\d+)\./);
    const code = codeMatch ? codeMatch[1] : `P${order}`;
    const role = classifyRole(rp.id, title, rp.explanation?.category || '');

    const pos = rp.assembledPos
      ? [rp.assembledPos.x, rp.assembledPos.y, rp.assembledPos.z]
      : jm.assembledPos || [0, 0, 0];
    const exp = rp.explodeOffset
      ? [rp.explodeOffset.x, rp.explodeOffset.y, rp.explodeOffset.z]
      : jm.explodeOffset || [0, 0, 0];

    // Track group origin (first assembledPos seen per groupKey)
    if (!groupOriginAcc.has(groupKey)) groupOriginAcc.set(groupKey, pos);

    const meshStart = meshes.length;
    const partBox = createEmptyBox();
    let partVol = 0;
    let partMass = 0;
    let cogX = 0, cogY = 0, cogZ = 0;

    if (rp.group) {
      rp.group.updateMatrixWorld(true);
      rp.group.traverse((obj) => {
        if (!obj.isMesh && !obj.isInstancedMesh) return;
        if (!obj.geometry) return;
        const matKey = inferMaterialKey(Array.isArray(obj.material) ? obj.material[0] : obj.material);
        const density = MATERIAL_DENSITY_G_CM3[matKey] ?? 2.7;

        const pushTris = (tris) => {
          if (tris.length < 9) return;
          const mBox = createEmptyBox();
          for (let i = 0; i < tris.length; i += 3) {
            const x = tris[i], y = tris[i + 1], z = tris[i + 2];
            if (x < mBox[0]) mBox[0] = x;
            if (y < mBox[1]) mBox[1] = y;
            if (z < mBox[2]) mBox[2] = z;
            if (x > mBox[3]) mBox[3] = x;
            if (y > mBox[4]) mBox[4] = y;
            if (z > mBox[5]) mBox[5] = z;
          }
          for (let k = 0; k < 3; k++) {
            if (mBox[k] < partBox[k]) partBox[k] = mBox[k];
            if (mBox[k + 3] > partBox[k + 3]) partBox[k + 3] = mBox[k + 3];
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

        if (obj.isInstancedMesh) {
          const im = new THREE.Matrix4();
          const wm = new THREE.Matrix4();
          for (let c = 0; c < obj.count; c++) {
            obj.getMatrixAt(c, im);
            wm.multiplyMatrices(obj.matrixWorld, im);
            pushTris(extractGeometryWorldTris(obj.geometry, wm));
          }
        } else {
          pushTris(extractGeometryWorldTris(obj.geometry, obj.matrixWorld));
        }
      });
    }

    const cog = partMass > 1e-9
      ? [cogX / partMass, cogY / partMass, cogZ / partMass]
      : [(partBox[0] + partBox[3]) * 0.5 || 0, (partBox[1] + partBox[4]) * 0.5 || 0, (partBox[2] + partBox[5]) * 0.5 || 0];

    parts.push({
      id: rp.id,
      code,
      order,
      groupKey,
      title,
      role,
      assembledPos: pos,
      explodeOffset: exp,
      box: partBox,
      volumeMm3: Number(partVol.toFixed(3)),
      massG: Number(partMass.toFixed(4)),
      cog,
      meshStart,
      meshCount: meshes.length - meshStart,
    });
  }

  const groupOrigins = Object.fromEntries(groupOriginAcc.entries());
  const sceneBvh = buildFlatBvh(meshes.map((m) => m.box), 6);
  const sceneData = {
    unitId,
    quality,
    groupOrigins,
    parts,
    meshes,
    sceneBvh,
    totalTris,
    fromCache: false,
    loadMs: Number((performance.now() - t0).toFixed(1)),
  };

  if (useCache) {
    try {
      writeSpb3Cache(cachePath, sceneData);
    } catch {
      // non-fatal cache write error
    }
  }
  return sceneData;
}
