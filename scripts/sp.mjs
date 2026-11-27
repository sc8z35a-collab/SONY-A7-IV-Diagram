#!/usr/bin/env node
/**
 * `sp` — 0.001 mm Certified Automatic Spatial Map & Pre-Collision Simulation Engine
 * 10 Modes: inspect | map | pockets | sim | audit | ray | thermal-cog | diff | bench | selftest
 * Exit Codes: 0=PASS, 1=ERROR, 2=FAIL, 3=WARN
 */

import fs from 'node:fs';
import {
  SP_EXIT_ERROR,
  SP_EXIT_FAIL,
  SP_EXIT_PASS,
  diffSnapshot,
  runCandidateSim,
  runRayConeCheck,
  runSpatialSelfTest,
  runThermalCogAnalysis,
  runUnitAudit,
  saveSnapshot,
} from './spatial_engine/audit_physics.mjs';
import {
  RAY_PRESETS,
  discoverRegisteredUnits,
  loadSpatialScene,
} from './spatial_engine/scene_extractor.mjs';
import {
  buildAutoMultiLayerMap,
  buildSpatialSlice,
  findCertifiedPockets,
  getFrameOrigin,
} from './spatial_engine/voxel_pockets.mjs';
import {
  emitThreeSnippet,
  renderSpatialSliceText,
  writeSpatialHtmlViewer,
} from './spatial_engine/renderers.mjs';

const HELP = `
sp — 0.001 mm Certified Automatic Spatial Map & Pre-Collision Simulation Engine
Usage: npm run sp -- <mode> [options]

Modes:
  inspect      Unit/group summary & bounds (--unit=U [--group=G] [--list-units])
  map          Auto multi-layer TRI-SAT or 0.001mm SDF zoom map (--zoom=x0..x1,y0..y1,z0..z1 --res=R [--sdf] [--html=PATH])
  pockets      0.001mm certified free-pocket search (--fit=W,H,D [--inside=ID] [--emit-ts])
  sim          Pre-collision candidate simulation (--candidates=JSON [--auto-fix] [--ray=PRESETS] [--inside=ID])
  audit        Full exact triangle audit ([--all-tiers] [--group=G] [--explode-steps=8] [--check-floating])
  ray          Optical/RF sightline cone raycasting (--preset=welcome-tof,welcome-lux,welcome-rf)
  thermal-cog  Mass, volume, world CoG, tipping angles & heat-source clearances
  diff         Save snapshot (--save-snapshot=PATH) or compare (--from-snapshot=PATH)
  bench        Cold/warm cache & exact SDF/audit speed benchmark
  selftest     20-case 0.001 mm mathematical oracle self-test
`;

function parseArgs(argv) {
  const mode = argv[0] || 'help';
  const flags = {};
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') flags.help = true;
    else if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq >= 0) flags[a.slice(2, eq)] = a.slice(eq + 1);
      else flags[a.slice(2)] = true;
    }
  }
  return { mode, flags };
}

function parseZoom(str) {
  const parts = String(str).split(',').map((seg) => seg.split('..').map(Number));
  if (parts.length !== 3 || parts.some((p) => p.length !== 2 || p.some(Number.isNaN))) {
    throw new Error(`Invalid --zoom='${str}'. Expected x0..x1,y0..y1,z0..z1`);
  }
  return {
    xMin: parts[0][0], xMax: parts[0][1],
    yMin: parts[1][0], yMax: parts[1][1],
    zMin: parts[2][0], zMax: parts[2][1],
  };
}

function outJson(obj) {
  process.stdout.write(JSON.stringify(obj, null, 2) + '\n');
}

async function main() {
  const { mode, flags } = parseArgs(process.argv.slice(2));
  if (mode === 'help' || flags.help) {
    process.stdout.write(HELP.trimStart() + '\n');
    process.exit(SP_EXIT_PASS);
  }

  try {
    if (mode === 'selftest') {
      const res = runSpatialSelfTest();
      if (flags.json) outJson(res);
      else {
        console.log(`[sp selftest] VERDICT=${res.verdict} (${res.passed}/${res.total} PASS) | precision=${res.precisionMm}mm | ${res.elapsedMs}ms`);
        if (!flags.ai || res.verdict !== 'PASS') {
          for (const c of res.cases) {
            console.log(`  [${c.ok ? 'PASS' : 'FAIL'}] ${c.id} ${c.name} (${c.ms}ms)${c.ok ? '' : ` — ${c.error}`}`);
          }
        }
      }
      process.exit(res.exitCode);
    }

    if (mode === 'inspect' && flags['list-units']) {
      const units = discoverRegisteredUnits();
      if (flags.json) outJson({ units });
      else {
        console.log(`[sp inspect] Registered units (${units.length}):`);
        for (const u of units) console.log(`  - ${u.unitId.padEnd(14)} declared=${u.declaredPartCount}p`);
      }
      process.exit(SP_EXIT_PASS);
    }

    const unitId = flags.unit || 'welcome';
    const quality = flags.quality || 'ultra';
    const noCache = Boolean(flags['no-cache']);

    if (mode === 'bench') {
      const sCold = await loadSpatialScene(unitId, { quality, noCache: true });
      const sWarm = await loadSpatialScene(unitId, { quality, noCache: false });
      const aRes = runUnitAudit(sWarm, { group: flags.group || null });
      const out = {
        verdict: 'PASS',
        unitId, quality,
        parts: sWarm.parts.length,
        meshes: sWarm.meshes.length,
        tris: sWarm.totalTris,
        coldMs: sCold.loadMs,
        warmMs: sWarm.loadMs,
        auditMs: aRes.elapsedMs,
      };
      if (flags.json) outJson(out);
      else {
        console.log(
          `[sp bench] unit=${unitId} (${quality}) | parts=${out.parts} meshes=${out.meshes} tris=${out.tris.toLocaleString()} | cold=${out.coldMs}ms warm=${out.warmMs}ms audit=${out.auditMs}ms`
        );
      }
      process.exit(SP_EXIT_PASS);
    }

    if (mode === 'audit' && flags['all-tiers']) {
      const tiers = ['standard_lite', 'standard', 'high', 'ultra'];
      const results = [];
      for (const q of tiers) {
        const sc = await loadSpatialScene(unitId, { quality: q, noCache });
        results.push(
          runUnitAudit(sc, {
            group: flags.group || null,
            explodeSteps: Number(flags['explode-steps'] || 0),
            checkFloating: Boolean(flags['check-floating']),
          })
        );
      }
      const allPass = results.every((r) => r.exitCode === SP_EXIT_PASS);
      if (flags.json) {
        outJson({ verdict: allPass ? 'PASS' : 'FAIL', unitId, tiers: results });
      } else {
        console.log(`[sp audit --all-tiers] unit=${unitId} | VERDICT=${allPass ? 'PASS' : 'FAIL'}`);
        for (const r of results) {
          console.log(
            `[sp audit] VERDICT=${r.verdict} (exit=${r.exitCode}) | unit=${r.unitId} (${r.quality}) | parts=${r.partCount} tris=${r.triCount.toLocaleString()} | precision=${r.precisionMm}mm | collisions=${r.collisions.length} | smtSeat=${r.smtSeatingCount} | nearMiss=${r.nearMissTotal} | kiss=${r.kissingCount} | floating=${r.floating.length} | explodeHits=${r.explodeCollisions.length} | ${r.elapsedMs}ms`
          );
          if (!flags.ai) {
            for (const c of r.collisions.slice(0, 12)) console.log(`  COL: ${c.partA} <-> ${c.partB} pen=${c.penMm}mm at=${JSON.stringify(c.centroidLocal)}`);
            for (const e of r.explodeCollisions.slice(0, 8)) console.log(`  EXP: ${e.partA} <-> ${e.partB} t=${e.t} pen=${e.penMm}mm`);
          }
        }
      }
      process.exit(allPass ? SP_EXIT_PASS : SP_EXIT_FAIL);
    }

    const scene = await loadSpatialScene(unitId, { quality, noCache });

    if (mode === 'inspect') {
      const groups = {};
      for (const p of scene.parts) {
        if (!groups[p.groupKey]) groups[p.groupKey] = { count: 0, origin: scene.groupOrigins[p.groupKey] };
        groups[p.groupKey].count++;
      }
      if (flags.json) {
        outJson({ unitId, quality, parts: scene.parts.length, meshes: scene.meshes.length, tris: scene.totalTris, groups, loadMs: scene.loadMs });
      } else {
        console.log(`[sp inspect] unit=${unitId} (${quality}) | parts=${scene.parts.length} meshes=${scene.meshes.length} tris=${scene.totalTris.toLocaleString()} | load=${scene.loadMs}ms (${scene.fromCache ? 'CACHE' : 'COLD'})`);
        for (const [gk, g] of Object.entries(groups)) {
          console.log(`  group=${gk.padEnd(18)} parts=${g.count} origin=${JSON.stringify(g.origin)}`);
        }
      }
      process.exit(SP_EXIT_PASS);
    }

    if (mode === 'map') {
      const origin = getFrameOrigin(scene, { frame: flags.frame, group: flags.group });
      const candidates = flags.candidates ? JSON.parse(fs.readFileSync(flags.candidates, 'utf8')) : [];
      let slices;
      if (flags.zoom) {
        const zb = parseZoom(flags.zoom);
        slices = [
          buildSpatialSlice(scene, {
            name: `ZOOM_${flags.res || 0.25}mm`,
            origin,
            ...zb,
            res: Number(flags.res || 0.25),
            group: flags.group || null,
            sdfMode: Boolean(flags.sdf),
            candidates,
          }),
        ];
      } else {
        slices = buildAutoMultiLayerMap(scene, {
          group: flags.group || null,
          frame: flags.frame,
          layers: flags.layers,
          res: flags.res,
          candidates,
        });
      }
      if (flags.html) writeSpatialHtmlViewer(unitId, slices, flags.html);
      if (flags.json) {
        outJson({ unitId, quality, slices: slices.map((s) => ({ ...s, grid: undefined, sdfGrid: undefined })) });
      } else {
        console.log(`[sp map] unit=${unitId} (${quality}) | load=${scene.loadMs}ms (${scene.fromCache ? 'CACHE' : 'COLD'}) | slices=${slices.length}`);
        for (const s of slices) console.log(renderSpatialSliceText(s, Boolean(flags.ascii)));
      }
      process.exit(SP_EXIT_PASS);
    }

    if (mode === 'pockets') {
      const fitSize = flags.fit ? String(flags.fit).split(',').map(Number) : [8, 2, 4];
      const pockets = findCertifiedPockets(scene, {
        fitSize,
        group: flags.group || null,
        insidePartId: flags.inside || null,
        minClearance: Number(flags.clearance ?? 0.25),
        topK: Number(flags.top || 6),
      });
      if (flags.json) outJson({ unitId, fitSize, pockets });
      else {
        console.log(`[sp pockets] unit=${unitId} fit=${fitSize.join('x')}mm | found=${pockets.length}`);
        pockets.forEach((p, i) => console.log(`  #${i + 1} local=${JSON.stringify(p.posLocal)} minGap=${p.minGapMm}mm nearest=${p.nearestPart}`));
        if (flags['emit-ts'] && pockets.length > 0) console.log('\n' + emitThreeSnippet(pockets));
      }
      process.exit(pockets.length > 0 ? SP_EXIT_PASS : SP_EXIT_FAIL);
    }

    if (mode === 'sim') {
      if (!flags.candidates) throw new Error('sim requires --candidates=<file.json> or inline JSON');
      const raw = fs.existsSync(flags.candidates) ? fs.readFileSync(flags.candidates, 'utf8') : flags.candidates;
      const cands = JSON.parse(raw);
      const list = Array.isArray(cands) ? cands : [cands];
      const res = runCandidateSim(scene, list, {
        group: flags.group || null,
        frame: flags.frame,
        minClearance: Number(flags.clearance ?? 0.2),
        insidePartId: flags.inside || null,
        autoFix: Boolean(flags['auto-fix']),
        rayPresets: flags.ray ? String(flags.ray).split(',') : [],
      });
      if (flags.json) outJson(res);
      else {
        console.log(`[sp sim] VERDICT=${res.verdict} (exit=${res.exitCode}) | candidates=${res.results.length} | ${res.elapsedMs}ms`);
        for (const r of res.results) {
          console.log(`  [${r.verdict}] ${r.id} minGap=${r.minGapMm}mm nearest=${r.nearestPart || 'none'} hits=${r.hits.length} outside=${r.outsideShell}`);
          if (r.autoFix) console.log(`    AUTO-FIX: newPosLocal=${JSON.stringify(r.autoFix.newPosLocal)} shift=${r.autoFix.shiftMm}mm gap=${r.autoFix.minGapMm}mm`);
        }
      }
      process.exit(res.exitCode);
    }

    if (mode === 'audit') {
      const r = runUnitAudit(scene, {
        group: flags.group || null,
        explodeSteps: Number(flags['explode-steps'] || 0),
        checkFloating: Boolean(flags['check-floating']),
      });
      if (flags.json) outJson(r);
      else {
        console.log(
          `[sp audit] VERDICT=${r.verdict} (exit=${r.exitCode}) | unit=${r.unitId} (${r.quality}) | parts=${r.partCount} tris=${r.triCount.toLocaleString()} | precision=${r.precisionMm}mm | collisions=${r.collisions.length} | smtSeat=${r.smtSeatingCount} | nearMiss=${r.nearMissTotal} | kiss=${r.kissingCount} | floating=${r.floating.length} | explodeHits=${r.explodeCollisions.length} | ${r.elapsedMs}ms`
        );
        if (!flags.ai) {
          for (const c of r.collisions.slice(0, 20)) console.log(`  COL: ${c.partA} <-> ${c.partB} pen=${c.penMm}mm`);
          for (const e of r.explodeCollisions.slice(0, 10)) console.log(`  EXP: ${e.partA} <-> ${e.partB} t=${e.t} pen=${e.penMm}mm`);
        }
      }
      process.exit(r.exitCode);
    }

    if (mode === 'ray') {
      const presetNames = String(flags.preset || 'welcome-tof').split(',').map((s) => s.trim()).filter(Boolean);
      const results = presetNames.map((pn) => {
        const spec = RAY_PRESETS[pn];
        if (!spec) throw new Error(`Unknown ray preset '${pn}'. Available: ${Object.keys(RAY_PRESETS).join(', ')}`);
        return runRayConeCheck(scene, spec);
      });
      const allPass = results.every((r) => r.exitCode === SP_EXIT_PASS);
      if (flags.json) outJson({ verdict: allPass ? 'PASS' : 'FAIL', results });
      else {
        for (const r of results) {
          console.log(`[sp ray] ${r.verdict} | ${r.name} | fov=${r.fovDeg}° rays=${r.rayCount} occluded=${r.occludedCount} (${r.occludedPct}%) | ${r.elapsedMs}ms`);
          for (const oc of r.occluders) console.log(`  OCCLUDER: ${oc.part} (${oc.count} rays)`);
        }
      }
      process.exit(allPass ? SP_EXIT_PASS : SP_EXIT_FAIL);
    }

    if (mode === 'thermal-cog') {
      const tc = runThermalCogAnalysis(scene);
      if (flags.json) outJson(tc);
      else {
        console.log(
          `[sp thermal-cog] VERDICT=${tc.verdict} | unit=${tc.unitId} | mass=${tc.massG}g | vol=${tc.volumeCm3}cm³ | CoG_WORLD=(${tc.cogWorld.join(',')})mm | minTip=${tc.tippingDeg.min}° | ${tc.elapsedMs}ms`
        );
        console.log(
          `  Tipping Angles: front=${tc.tippingDeg.front}° rear=${tc.tippingDeg.rear}° left=${tc.tippingDeg.left}° right=${tc.tippingDeg.right}° (h_CoG=${tc.hCogMm}mm)`
        );
        for (const p of tc.thermalPairs) {
          console.log(`    [${p.status.padEnd(13)}] ${p.distMm.toFixed(3)}mm | ${p.source} <-> ${p.sensitive}`);
        }
      }
      process.exit(tc.exitCode);
    }

    if (mode === 'diff') {
      if (flags['save-snapshot']) {
        const snap = saveSnapshot(scene, flags['save-snapshot']);
        console.log(`[sp diff] Saved snapshot: ${flags['save-snapshot']} (${snap.unitId} ${snap.partCount}p ${snap.massG}g)`);
        process.exit(SP_EXIT_PASS);
      }
      if (flags['from-snapshot']) {
        const d = diffSnapshot(scene, flags['from-snapshot']);
        if (flags.json) outJson(d);
        else {
          console.log(
            `[sp diff] ${d.from} -> ${d.to} | Δparts=${d.deltaParts >= 0 ? '+' : ''}${d.deltaParts} Δtris=${d.deltaTris} Δmass=${d.deltaMassG}g Δvol=${d.deltaVolCm3}cm³ ΔCoG=(${d.deltaCog.join(',')})mm`
          );
        }
        process.exit(SP_EXIT_PASS);
      }
      throw new Error('diff requires --save-snapshot=<path> or --from-snapshot=<path>');
    }

    throw new Error(`Unknown sp mode '${mode}'. Run 'npm run sp -- --help'.`);
  } catch (err) {
    process.stderr.write(`[sp ${mode} ERROR] ${err.message}\n`);
    process.exit(SP_EXIT_ERROR);
  }
}

main();
