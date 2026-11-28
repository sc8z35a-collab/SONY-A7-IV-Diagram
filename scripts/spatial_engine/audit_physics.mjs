/**
 * `sp` — Pre-Collision Sim, Full 4-Tier Audit (incl. SMT_SOLDER_SEAT separation,
 * Explode-Trajectory Sweeps & Floating Detection), Sightline Cone Raycasting,
 * Thermal/CoG/Tipping Physics, Snapshot Diff & 20-Case Mathematical Oracle Selftest.
 */

import fs from 'node:fs';
import {
  PRECISION_MM,
  STRICT_PRECISION_MM,
  boxBoxMinDistSq,
  boxesOverlap,
  buildBoxMesh,
  buildCandidateMesh,
  buildCapsuleMesh,
  buildCylinderMesh,
  buildFlatBvh,
  buildSphereMesh,
  computeMeshSignedVolumeAndCentroid,
  exactMeshPairMinDistance,
  meshPairExactCheck,
  pointInMeshWinding,
  pointToMeshSignedDist,
  queryBvhBox,
  rayMeshHit,
  translateMesh,
} from './exact_geometry.mjs';
import { RAY_PRESETS } from './scene_extractor.mjs';
import { evaluateCandidateExact, getFrameOrigin, solveAutoFix } from './voxel_pockets.mjs';

export const SP_EXIT_PASS = 0;
export const SP_EXIT_ERROR = 1;
export const SP_EXIT_FAIL = 2;
export const SP_EXIT_WARN = 3;

function isSmtSolderSeatPair(partA, partB, penMm) {
  if (penMm > 0.25) return false;
  const rA = partA.role;
  const rB = partB.role;
  const isPcbSide = (r) => r === 'pcb';
  const isCompSide = (r) => r === 'smt_ic' || r === 'heat_source' || r === 'thermal_sensitive';
  return (isPcbSide(rA) && isCompSide(rB)) || (isPcbSide(rB) && isCompSide(rA));
}

function classifySeverity(penMm, isSmt) {
  if (isSmt) return 'SMT_SEAT';
  if (penMm >= 1.0) return 'S0_CRITICAL';
  if (penMm >= 0.1) return 'S1_MAJOR';
  if (penMm >= 0.01) return 'S2_MINOR';
  return 'S3_MICRO';
}

function partPairExactMinDist(scene, partA, partB, maxDist = Infinity) {
  const boxD2 = boxBoxMinDistSq(partA.box, partB.box);
  if (boxD2 >= maxDist * maxDist) return Infinity;
  let best = maxDist;
  for (let i = partA.meshStart; i < partA.meshStart + partA.meshCount; i++) {
    const mA = scene.meshes[i];
    for (let j = partB.meshStart; j < partB.meshStart + partB.meshCount; j++) {
      const mB = scene.meshes[j];
      const d = exactMeshPairMinDistance(mA, mB, best);
      if (d < best) {
        best = d;
        if (best <= 1e-7) return 0;
      }
    }
  }
  return best;
}

function isOuterShellCandidate(p) {
  const s = `${p.id} ${p.title || ''} ${p.category || ''}`.toLowerCase();
  if (/internal|inner|sub-frame|subframe|bracket|pcb|board|ic|chip|coil|motor|screw|bolt|pin|spring|gasket|seal|o-ring|damper|pad|shield-can|fpc|cable|harness|connector|led|sensor|blade/.test(s)) {
    return false;
  }
  if (p.role === 'chassis') return true;
  return /chassis|housing|shell|barrel|cabinet|enclosure|casing|monocoque|body-main|outer-frame|cover|case|bezel|door|hood|grip/.test(s);
}

function isInternalComponentCandidate(p) {
  const s = `${p.id} ${p.title || ''} ${p.category || ''}`.toLowerCase();
  if (isOuterShellCandidate(p)) return false;
  if (/pcb|smt_ic|heat_source|thermal_sensitive|elastomer|fastener/.test(p.role || '')) return true;
  return /inner|internal|pcb|ic|coil|motor|damper|spring|screw|bolt|baffle|board|chip|die|cell|actuator|magnet|fpc|ribbon|harness|heater|peltier|desiccant|fan|sensor|blade|mirror|prism|wafer|capacitor|resistor|inductor|gear|shaft|bearing/.test(s);
}

function isIntentionallyExposedExternal(p) {
  const s = `${p.id} ${p.title || ''} ${p.category || ''}`.toLowerCase();
  return /port|usb|hdmi|jack|terminal|button|dial|knob|wheel|switch|lever|foot|feet|pad-bottom|tripod|strap|eyelet|lug|mount-bayonet|bayonet|flange|hood|front-glass|front-element|eyecup|eyepiece|hotshoe|mi-shoe|shoe|antenna|radome|handle|latch|lock|hinge|window|display|screen|lcd|glass|grille|vent|speaker|mic-mesh|barrel-gun|muzzle|leg|paw|wheel-caster/.test(s);
}

function computeEnvelopeBox(shellParts) {
  const env = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  for (let i = 0; i < shellParts.length; i++) {
    const b = shellParts[i].box;
    if (!b || !Number.isFinite(b[0])) continue;
    if (b[0] < env[0]) env[0] = b[0];
    if (b[1] < env[1]) env[1] = b[1];
    if (b[2] < env[2]) env[2] = b[2];
    if (b[3] > env[3]) env[3] = b[3];
    if (b[4] > env[4]) env[4] = b[4];
    if (b[5] > env[5]) env[5] = b[5];
  }
  return Number.isFinite(env[0]) ? env : null;
}

function runProtrusionAudit(scene, activeParts, tolMm, nearestGapByPartId) {
  const shellParts = activeParts.filter((p) => p.meshCount > 0 && isOuterShellCandidate(p));
  const envelopeBox = computeEnvelopeBox(shellParts);
  const envelopeProtrusions = [];
  if (envelopeBox) {
    for (let i = 0; i < activeParts.length; i++) {
      const p = activeParts[i];
      if (p.meshCount === 0 || !isInternalComponentCandidate(p)) continue;
      const b = p.box;
      const axes = [];
      const dxNeg = envelopeBox[0] - b[0];
      const dxPos = b[3] - envelopeBox[3];
      const dyNeg = envelopeBox[1] - b[1];
      const dyPos = b[4] - envelopeBox[4];
      const dzNeg = envelopeBox[2] - b[2];
      const dzPos = b[5] - envelopeBox[5];
      if (dxNeg >= tolMm) axes.push({ axis: '-X', exceedMm: Number(dxNeg.toFixed(5)) });
      if (dxPos >= tolMm) axes.push({ axis: '+X', exceedMm: Number(dxPos.toFixed(5)) });
      if (dyNeg >= tolMm) axes.push({ axis: '-Y', exceedMm: Number(dyNeg.toFixed(5)) });
      if (dyPos >= tolMm) axes.push({ axis: '+Y', exceedMm: Number(dyPos.toFixed(5)) });
      if (dzNeg >= tolMm) axes.push({ axis: '-Z', exceedMm: Number(dzNeg.toFixed(5)) });
      if (dzPos >= tolMm) axes.push({ axis: '+Z', exceedMm: Number(dzPos.toFixed(5)) });
      if (axes.length > 0) {
        const maxExceedMm = Math.max(...axes.map((a) => a.exceedMm));
        envelopeProtrusions.push({
          part: `${p.code} (${p.id})`,
          partId: p.id,
          code: p.code,
          groupKey: p.groupKey,
          role: p.role,
          exposedExternalHint: isIntentionallyExposedExternal(p),
          maxExceedMm: Number(maxExceedMm.toFixed(5)),
          axes,
          partBox: b.map((v) => Number(v.toFixed(4))),
        });
      }
    }
    envelopeProtrusions.sort((a, b) => b.maxExceedMm - a.maxExceedMm);
  }

  // IQR-based spatial outlier detection (flags any part far detached from unit median center)
  const spatialOutliers = [];
  const validParts = activeParts.filter((p) => p.meshCount > 0 && Number.isFinite(p.box[0]));
  if (validParts.length >= 6) {
    const xs = validParts.map((p) => (p.box[0] + p.box[3]) * 0.5).sort((a, b) => a - b);
    const ys = validParts.map((p) => (p.box[1] + p.box[4]) * 0.5).sort((a, b) => a - b);
    const zs = validParts.map((p) => (p.box[2] + p.box[5]) * 0.5).sort((a, b) => a - b);
    const mid = Math.floor(validParts.length / 2);
    const med = [xs[mid], ys[mid], zs[mid]];
    const dists = validParts.map((p) => {
      const cx = (p.box[0] + p.box[3]) * 0.5;
      const cy = (p.box[1] + p.box[4]) * 0.5;
      const cz = (p.box[2] + p.box[5]) * 0.5;
      return { p, d: Math.hypot(cx - med[0], cy - med[1], cz - med[2]), c: [cx, cy, cz] };
    });
    const sortedD = dists.map((x) => x.d).sort((a, b) => a - b);
    const q1 = sortedD[Math.floor(sortedD.length * 0.25)];
    const q3 = sortedD[Math.floor(sortedD.length * 0.75)];
    const iqr = q3 - q1;
    const fence = q3 + 3.0 * Math.max(iqr, 5.0);
    for (const item of dists) {
      const gap = nearestGapByPartId?.get(item.p.id);
      if (item.d > fence && (gap === undefined || gap > 2.0)) {
        spatialOutliers.push({
          part: `${item.p.code} (${item.p.id})`,
          partId: item.p.id,
          groupKey: item.p.groupKey,
          distFromMedianMm: Number(item.d.toFixed(3)),
          iqrFenceMm: Number(fence.toFixed(3)),
          nearestGapMm: gap !== undefined ? Number(gap.toFixed(4)) : null,
          centerWorld: item.c.map((v) => Number(v.toFixed(3))),
        });
      }
    }
    spatialOutliers.sort((a, b) => b.distFromMedianMm - a.distFromMedianMm);
  }

  return {
    shellPartCount: shellParts.length,
    envelopeBox: envelopeBox ? envelopeBox.map((v) => Number(v.toFixed(4))) : null,
    envelopeProtrusions,
    spatialOutliers,
  };
}

function runAlignmentAudit(scene, activeParts, tolMm) {
  const coordDrifts = [];
  const doubleOffsetSuspects = [];
  const meshHealthIssues = [];

  for (let i = 0; i < activeParts.length; i++) {
    const p = activeParts[i];
    const ca = p.coordAudit;
    if (p.meshCount === 0) {
      meshHealthIssues.push({
        type: 'EMPTY_MESH',
        part: `${p.code} (${p.id})`,
        partId: p.id,
        groupKey: p.groupKey,
      });
    }
    if (!ca) continue;
    if (ca.nanTris > 0) {
      meshHealthIssues.push({
        type: 'NAN_TRIANGLES',
        part: `${p.code} (${p.id})`,
        partId: p.id,
        nanTris: ca.nanTris,
      });
    }
    if (ca.hasNegativeScale) {
      meshHealthIssues.push({
        type: 'NEGATIVE_SCALE_MATRIX',
        part: `${p.code} (${p.id})`,
        partId: p.id,
      });
    }
    if (
      ca.assembledPosDriftMm >= tolMm ||
      ca.groupPosDriftMm >= tolMm ||
      ca.rawGroupRotNonZero ||
      ca.rawGroupScaleNonUnit
    ) {
      coordDrifts.push({
        part: `${p.code} (${p.id})`,
        partId: p.id,
        groupKey: p.groupKey,
        metaAssembledPos: p.assembledPos.map((v) => Number(v.toFixed(5))),
        rawAssembledPos: ca.rawAssembledPos,
        rawGroupPos: ca.rawGroupPos,
        assembledPosDriftMm: ca.assembledPosDriftMm,
        groupPosDriftMm: ca.groupPosDriftMm,
        rawGroupRotNonZero: ca.rawGroupRotNonZero,
        rawGroupScaleNonUnit: ca.rawGroupScaleNonUnit,
      });
    }
    const apMag = Math.hypot(p.assembledPos[0], p.assembledPos[1], p.assembledPos[2]);
    if (ca.localOriginEccMm > 1.0 && apMag > 0.5) {
      const dot =
        (ca.localCenter[0] * p.assembledPos[0] +
          ca.localCenter[1] * p.assembledPos[1] +
          ca.localCenter[2] * p.assembledPos[2]) /
        (ca.localOriginEccMm * apMag);
      doubleOffsetSuspects.push({
        part: `${p.code} (${p.id})`,
        partId: p.id,
        groupKey: p.groupKey,
        risk: dot > 0.75 ? 'DOUBLE_OFFSET_HIGH_RISK' : 'ECCENTRIC_LOCAL_ORIGIN',
        assembledPos: p.assembledPos.map((v) => Number(v.toFixed(4))),
        localCenter: ca.localCenter,
        localOriginEccMm: ca.localOriginEccMm,
        alignmentCos: Number(dot.toFixed(3)),
      });
    }
  }
  coordDrifts.sort((a, b) => Math.max(b.assembledPosDriftMm, b.groupPosDriftMm) - Math.max(a.assembledPosDriftMm, a.groupPosDriftMm));
  doubleOffsetSuspects.sort((a, b) => b.localOriginEccMm - a.localOriginEccMm);

  // Optical concentricity check for optical units (lens, mount, sensor, evf, integrated, camera_body, mirai FH08/FH25)
  const opticalConcentricity = [];
  const opticalUnits = new Set(['lens', 'mount', 'sensor', 'evf', 'integrated', 'camera_body']);
  const isMiraiOptical = scene.unitId === 'mirai_2028' && (scene.subView === 3 || scene.subView === 5);
  if (opticalUnits.has(scene.unitId) || isMiraiOptical) {
    const optRx = /lens|element|glass|aspheric|xa|ed-glass|aperture|iris|baffle|hood|barrel|bayonet|mount-ring|flange|olpf|filter|eyepiece|diopter|oled-panel|pancake|meta-lens|metalens/i;
    const opticalParts = activeParts.filter(
      (p) => p.meshCount > 0 && optRx.test(`${p.id} ${p.title || ''}`) && !/screw|bolt|pin|motor|rail|coil|pcb|fpc|cable|contact|switch|button|lever|ring-gear|pinion|actuator|sensor-pcb/i.test(p.id)
    );
    if (opticalParts.length >= 2) {
      // Reference optical axis (median X, Y of optical elements in the same optical train)
      const isEvfPart = (p) => p.id.startsWith('evf-') || scene.unitId === 'evf' || (scene.unitId === 'mirai_2028' && scene.subView === 5);
      const trains = [
        { name: 'main_optical_axis', items: opticalParts.filter((p) => !isEvfPart(p)) },
        { name: 'evf_optical_axis', items: opticalParts.filter((p) => isEvfPart(p)) },
      ];
      for (const tr of trains) {
        if (tr.items.length < 2) continue;
        const cxs = tr.items.map((p) => (p.box[0] + p.box[3]) * 0.5).sort((a, b) => a - b);
        const cys = tr.items.map((p) => (p.box[1] + p.box[4]) * 0.5).sort((a, b) => a - b);
        const refX = cxs[Math.floor(cxs.length / 2)];
        const refY = cys[Math.floor(cys.length / 2)];
        for (const p of tr.items) {
          const cx = (p.box[0] + p.box[3]) * 0.5;
          const cy = (p.box[1] + p.box[4]) * 0.5;
          const radial = Math.hypot(cx - refX, cy - refY);
          if (radial > 0.05) {
            opticalConcentricity.push({
              train: tr.name,
              part: `${p.code} (${p.id})`,
              partId: p.id,
              centerXY: [Number(cx.toFixed(4)), Number(cy.toFixed(4))],
              refXY: [Number(refX.toFixed(4)), Number(refY.toFixed(4))],
              radialOffsetMm: Number(radial.toFixed(4)),
            });
          }
        }
      }
      opticalConcentricity.sort((a, b) => b.radialOffsetMm - a.radialOffsetMm);
    }
  }

  // Left/Right mirror symmetry check
  const symmetryIssues = [];
  const byId = new Map(activeParts.map((p) => [p.id, p]));
  const seenSym = new Set();
  const lrPatterns = [
    [/(-|_)left($|-|_)/, '$1right$2'],
    [/(-|_)l($|-|_)/, '$1r$2'],
    [/Left/, 'Right'],
  ];
  for (const pL of activeParts) {
    if (pL.meshCount === 0) continue;
    for (const [rx, rep] of lrPatterns) {
      if (!rx.test(pL.id)) continue;
      const rId = pL.id.replace(rx, rep);
      if (rId === pL.id || seenSym.has(`${pL.id}|${rId}`)) continue;
      const pR = byId.get(rId);
      if (!pR || pR.meshCount === 0) continue;
      seenSym.add(`${pL.id}|${rId}`);
      const cLx = (pL.box[0] + pL.box[3]) * 0.5, cLy = (pL.box[1] + pL.box[4]) * 0.5, cLz = (pL.box[2] + pL.box[5]) * 0.5;
      const cRx = (pR.box[0] + pR.box[3]) * 0.5, cRy = (pR.box[1] + pR.box[4]) * 0.5, cRz = (pR.box[2] + pR.box[5]) * 0.5;
      const xMirrorErr = Math.abs(cLx + cRx);
      const yErr = Math.abs(cLy - cRy);
      const zErr = Math.abs(cLz - cRz);
      const sLx = pL.box[3] - pL.box[0], sLy = pL.box[4] - pL.box[1], sLz = pL.box[5] - pL.box[2];
      const sRx = pR.box[3] - pR.box[0], sRy = pR.box[4] - pR.box[1], sRz = pR.box[5] - pR.box[2];
      const sizeErr = Math.max(Math.abs(sLx - sRx), Math.abs(sLy - sRy), Math.abs(sLz - sRz));
      const maxErr = Math.max(xMirrorErr, yErr, zErr, sizeErr);
      if (maxErr > 0.05) {
        symmetryIssues.push({
          partL: `${pL.code} (${pL.id})`,
          partR: `${pR.code} (${pR.id})`,
          xMirrorErrMm: Number(xMirrorErr.toFixed(4)),
          yErrMm: Number(yErr.toFixed(4)),
          zErrMm: Number(zErr.toFixed(4)),
          sizeErrMm: Number(sizeErr.toFixed(4)),
          maxErrMm: Number(maxErr.toFixed(4)),
        });
      }
      break;
    }
  }
  symmetryIssues.sort((a, b) => b.maxErrMm - a.maxErrMm);

  // Composite subsystem mating & E-mount 18.0 mm flange focal distance check (integrated / camera_body)
  let compositeMating = null;
  if (scene.unitId === 'integrated' || scene.unitId === 'camera_body') {
    const subBoxes = {};
    for (const p of activeParts) {
      if (p.meshCount === 0) continue;
      const prefix = p.id.split('-')[0];
      const sub = prefix === 'mb' ? 'mainboard' : prefix;
      if (!subBoxes[sub]) subBoxes[sub] = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
      const sb = subBoxes[sub];
      for (let k = 0; k < 3; k++) {
        if (p.box[k] < sb[k]) sb[k] = p.box[k];
        if (p.box[k + 3] > sb[k + 3]) sb[k + 3] = p.box[k + 3];
      }
    }
    const mountRing = activeParts.find((p) => /mount-.*(bayonet|flange|stainless-ring|front-ring)/i.test(p.id)) ||
      activeParts.find((p) => p.id.startsWith('mount-'));
    const sensorDie = activeParts.find((p) => /sensor-.*(cmos|silicon-die|imaging-die|die|photodiode)/i.test(p.id)) ||
      activeParts.find((p) => p.id.startsWith('sensor-'));
    let flangeBackCheck = null;
    if (mountRing && sensorDie) {
      const mountFrontZ = mountRing.box[5];
      const sensorFrontZ = sensorDie.box[5];
      const measuredMm = mountFrontZ - sensorFrontZ;
      flangeBackCheck = {
        mountPart: mountRing.id,
        sensorPart: sensorDie.id,
        mountFrontZ: Number(mountFrontZ.toFixed(4)),
        sensorFrontZ: Number(sensorFrontZ.toFixed(4)),
        measuredFlangeBackMm: Number(measuredMm.toFixed(4)),
        nominalE_MountMm: 18.0,
        deltaMm: Number((measuredMm - 18.0).toFixed(4)),
      };
    }
    const subOrder = Object.keys(subBoxes).sort();
    const subsystemBounds = {};
    for (const k of subOrder) subsystemBounds[k] = subBoxes[k].map((v) => Number(v.toFixed(3)));
    compositeMating = { flangeBackCheck, subsystemBounds };
  }

  return {
    coordDrifts,
    doubleOffsetSuspects,
    meshHealthIssues,
    opticalConcentricity,
    symmetryIssues,
    compositeMating,
  };
}

/**
 * Full 7-axis exact triangle-level static, explode-trajectory, floating/island,
 * envelope-protrusion & coordinate/optical alignment audit on a loaded scene.
 */
export function runUnitAudit(scene, opts = {}) {
  const t0 = performance.now();
  const group = opts.group || null;
  const strict = Boolean(opts.strict);
  const tolMm = opts.tolMm !== undefined ? Number(opts.tolMm) : (strict ? STRICT_PRECISION_MM : 0.002);
  const includeSmtAsFail = Boolean(opts.includeSmtAsFail);
  const nearMissMm = Number(opts.nearMissMm ?? 0.15);
  const explodeSteps = Math.max(0, Number(opts.explodeSteps ?? 0));
  const explodeTolMm = opts.explodeTolMm !== undefined ? Number(opts.explodeTolMm) : (strict ? tolMm : 0.05);
  const checkFloating = Boolean(opts.checkFloating);
  const floatTolMm = opts.floatTolMm !== undefined ? Number(opts.floatTolMm) : (strict ? 0.05 : 4.0);
  const connectTolMm = Number(opts.connectTolMm ?? 0.10);
  const checkProtrusion = Boolean(opts.checkProtrusion);
  const checkAlignment = Boolean(opts.checkAlignment);

  // Filter parts & meshes by group if specified
  const partMask = new Set();
  const activeParts = [];
  for (let i = 0; i < scene.parts.length; i++) {
    if (!group || scene.parts[i].groupKey === group) {
      partMask.add(i);
      activeParts.push(scene.parts[i]);
    }
  }
  const activeMeshes = scene.meshes.filter((m) => partMask.has(m.partIdx));
  const activeBvh = buildFlatBvh(activeMeshes.map((m) => m.box), 6);

  // Axis 1: Full sub-mesh pair aggregation (NEVER early-drop after first sub-mesh pair!)
  const pairStats = new Map();
  const nearMissCandidates = new Map();

  for (let i = 0; i < activeMeshes.length; i++) {
    const mA = activeMeshes[i];
    const hits = queryBvhBox(activeBvh, mA.box, nearMissMm, []);
    for (let k = 0; k < hits.length; k++) {
      const j = hits[k];
      if (j <= i) continue;
      const mB = activeMeshes[j];
      if (mA.partIdx === mB.partIdx) continue;

      const pLow = Math.min(mA.partIdx, mB.partIdx);
      const pHigh = Math.max(mA.partIdx, mB.partIdx);
      const pairKey = `${pLow}:${pHigh}`;

      if (boxesOverlap(mA.box, mB.box, 0)) {
        const res = meshPairExactCheck(mA, mB, { computeMinDist: false });
        if (res.intersects) {
          let st = pairStats.get(pairKey);
          if (!st) {
            st = {
              pLow,
              pHigh,
              maxPenMm: 0,
              subMeshHits: 0,
              totalVolMm3: 0,
              worstCause: 'SOLID_PENETRATION',
              worstContactType: res.contactType || 'COPLANAR_FLUSH',
              worstCentroid: res.centroid,
              coplanarSubHits: 0,
            };
            pairStats.set(pairKey, st);
          }
          if (res.penMm >= tolMm) {
            st.subMeshHits++;
            st.totalVolMm3 += res.volMm3 || 0;
          } else {
            st.coplanarSubHits++;
          }
          if (res.penMm > st.maxPenMm || (st.maxPenMm === 0 && res.penMm === 0 && !st.worstCentroid)) {
            st.maxPenMm = res.penMm;
            st.worstCause = res.contained ? `CONTAINMENT_${res.contained}` : 'SOLID_PENETRATION';
            st.worstContactType = res.contactType || 'PENETRATION';
            st.worstCentroid = res.centroid;
          }
          continue;
        }
      }

      if (!pairStats.has(pairKey) && nearMissCandidates.size < 120 && !nearMissCandidates.has(pairKey)) {
        const d = exactMeshPairMinDistance(mA, mB, nearMissMm);
        if (d > tolMm && d < nearMissMm) {
          nearMissCandidates.set(pairKey, { pLow, pHigh, gapMm: Number(d.toFixed(5)) });
        }
      }
    }
  }

  const collisions = [];
  const mechanicalCollisions = [];
  const smtSeating = [];
  let coplanarFlushCount = 0;
  let subTolGrazeCount = 0;
  const staticCollisionPairs = new Set();
  const staticTouchOrOverlapPairs = new Set();
  const severityCounts = { S0_CRITICAL: 0, S1_MAJOR: 0, S2_MINOR: 0, S3_MICRO: 0, SMT_SEAT: 0 };

  for (const [pairKey, st] of pairStats.entries()) {
    staticTouchOrOverlapPairs.add(pairKey);
    const pA = scene.parts[st.pLow];
    const pB = scene.parts[st.pHigh];

    if (st.maxPenMm < tolMm) {
      if (st.maxPenMm <= 1e-6) coplanarFlushCount++;
      else subTolGrazeCount++;
      continue;
    }

    staticCollisionPairs.add(pairKey);
    const isSmt = isSmtSolderSeatPair(pA, pB, st.maxPenMm);
    const severity = classifySeverity(st.maxPenMm, isSmt);
    severityCounts[severity]++;

    const record = {
      cause: isSmt ? 'SMT_SOLDER_SEAT' : st.worstCause,
      category: isSmt ? 'SMT_SOLDER_SEAT' : 'MECHANICAL_OPTICAL',
      severity,
      partA: `${pA.code} (${pA.id})`,
      partB: `${pB.code} (${pB.id})`,
      partIdA: pA.id,
      partIdB: pB.id,
      groupA: pA.groupKey,
      groupB: pB.groupKey,
      penMm: Number(st.maxPenMm.toFixed(5)),
      volMm3: Number(st.totalVolMm3.toFixed(4)),
      subMeshHits: st.subMeshHits,
      centroidWorld: st.worstCentroid,
      centroidLocal: st.worstCentroid,
    };

    if (isSmt) {
      smtSeating.push(record);
      if (includeSmtAsFail) collisions.push(record);
    } else {
      mechanicalCollisions.push(record);
      collisions.push(record);
    }
  }

  const nearMisses = [];
  for (const [pairKey, nm] of nearMissCandidates.entries()) {
    if (staticTouchOrOverlapPairs.has(pairKey)) continue;
    const pA = scene.parts[nm.pLow];
    const pB = scene.parts[nm.pHigh];
    nearMisses.push({
      partA: `${pA.code} (${pA.id})`,
      partB: `${pB.code} (${pB.id})`,
      gapMm: nm.gapMm,
    });
  }
  nearMisses.sort((a, b) => a.gapMm - b.gapMm);

  // Axis 3: Exact nearest-neighbor gap & Union-Find disconnected floating islands
  const floating = [];
  const floatingDetails = [];
  const disconnectedIslands = [];
  const nearestGapByPartId = new Map();

  if (checkFloating && activeParts.length > 1) {
    const validIdx = [];
    for (let i = 0; i < activeParts.length; i++) {
      if (activeParts[i].meshCount > 0) validIdx.push(i);
    }
    const partIndexInScene = activeParts.map((p) => scene.parts.indexOf(p));

    // Exact nearest-neighbor surface gap for every valid part (0 mm short-circuit via staticTouchOrOverlapPairs)
    for (let ii = 0; ii < validIdx.length; ii++) {
      const i = validIdx[ii];
      const pA = activeParts[i];
      const sIdxA = partIndexInScene[i];
      let bestDist = Infinity;
      let nearestPart = null;

      // Fast check: if already touching/intersecting another active part -> gap is exact 0 mm
      for (let jj = 0; jj < validIdx.length; jj++) {
        if (jj === ii) continue;
        const j = validIdx[jj];
        const sIdxB = partIndexInScene[j];
        const pk = `${Math.min(sIdxA, sIdxB)}:${Math.max(sIdxA, sIdxB)}`;
        if (staticTouchOrOverlapPairs.has(pk)) {
          bestDist = 0;
          nearestPart = activeParts[j];
          break;
        }
      }

      if (bestDist > 0) {
        const order = [];
        for (let jj = 0; jj < validIdx.length; jj++) {
          if (jj === ii) continue;
          const j = validIdx[jj];
          const pB = activeParts[j];
          order.push({ j, lb: Math.sqrt(boxBoxMinDistSq(pA.box, pB.box)) });
        }
        order.sort((a, b) => a.lb - b.lb);

        for (let k = 0; k < order.length; k++) {
          if (order[k].lb >= bestDist) break;
          const pB = activeParts[order[k].j];
          const d = partPairExactMinDist(scene, pA, pB, bestDist);
          if (d < bestDist) {
            bestDist = d;
            nearestPart = pB;
            if (bestDist <= 1e-7) break;
          }
        }
      }

      nearestGapByPartId.set(pA.id, bestDist);
      if (bestDist > floatTolMm) {
        const band = bestDist > 4.0 ? 'MACRO_FLOAT' : bestDist > 1.0 ? 'MID_FLOAT' : 'MICRO_FLOAT';
        floating.push(`${pA.code} (${pA.id})`);
        floatingDetails.push({
          part: `${pA.code} (${pA.id})`,
          partId: pA.id,
          code: pA.code,
          groupKey: pA.groupKey,
          role: pA.role,
          nearestPart: nearestPart ? `${nearestPart.code} (${nearestPart.id})` : null,
          nearestPartId: nearestPart ? nearestPart.id : null,
          nearestGapMm: Number(bestDist.toFixed(4)),
          band,
          box: pA.box.map((v) => Number(v.toFixed(3))),
        });
      }
    }
    floatingDetails.sort((a, b) => b.nearestGapMm - a.nearestGapMm);

    // Union-Find connected components at surface gap <= connectTolMm (detects multi-part floating islands!)
    const nValid = validIdx.length;
    const parent = new Int32Array(nValid);
    for (let i = 0; i < nValid; i++) parent[i] = i;
    const find = (x) => {
      let r = x;
      while (parent[r] !== r) r = parent[r];
      while (parent[x] !== r) { const nx = parent[x]; parent[x] = r; x = nx; }
      return r;
    };
    const unite = (a, b) => {
      const ra = find(a), rb = find(b);
      if (ra !== rb) parent[ra] = rb;
    };

    const validBoxes = validIdx.map((idx) => activeParts[idx].box);
    const vBvh = buildFlatBvh(validBoxes, 6);
    for (let ii = 0; ii < nValid; ii++) {
      const pA = activeParts[validIdx[ii]];
      const sIdxA = partIndexInScene[validIdx[ii]];
      const nearby = queryBvhBox(vBvh, pA.box, connectTolMm, []);
      for (let k = 0; k < nearby.length; k++) {
        const jj = nearby[k];
        if (jj <= ii) continue;
        if (find(ii) === find(jj)) continue;
        const pB = activeParts[validIdx[jj]];
        const sIdxB = partIndexInScene[validIdx[jj]];
        const pk = `${Math.min(sIdxA, sIdxB)}:${Math.max(sIdxA, sIdxB)}`;
        if (staticTouchOrOverlapPairs.has(pk)) {
          unite(ii, jj);
        } else {
          const d = partPairExactMinDist(scene, pA, pB, connectTolMm + 1e-6);
          if (d <= connectTolMm) unite(ii, jj);
        }
      }
    }

    const compMap = new Map();
    for (let ii = 0; ii < nValid; ii++) {
      const r = find(ii);
      if (!compMap.has(r)) compMap.set(r, []);
      compMap.get(r).push(validIdx[ii]);
    }
    const comps = [...compMap.values()].sort((a, b) => b.length - a.length);
    if (comps.length > 1) {
      const mainComp = comps[0];
      for (let ci = 1; ci < comps.length; ci++) {
        const island = comps[ci];
        // Compute exact minimum gap from this island to the main component
        let minGapToMain = Infinity;
        let nearestMainPartId = null;
        let cx = 0, cy = 0, cz = 0;
        for (const pIdx of island) {
          const pI = activeParts[pIdx];
          cx += (pI.box[0] + pI.box[3]) * 0.5;
          cy += (pI.box[1] + pI.box[4]) * 0.5;
          cz += (pI.box[2] + pI.box[5]) * 0.5;
          for (const mIdx of mainComp) {
            const pM = activeParts[mIdx];
            const lb = Math.sqrt(boxBoxMinDistSq(pI.box, pM.box));
            if (lb >= minGapToMain) continue;
            const d = partPairExactMinDist(scene, pI, pM, minGapToMain);
            if (d < minGapToMain) {
              minGapToMain = d;
              nearestMainPartId = pM.id;
            }
          }
        }
        disconnectedIslands.push({
          islandIdx: ci,
          size: island.length,
          isMultiPartIsland: island.length >= 2,
          partIds: island.map((idx) => activeParts[idx].id),
          parts: island.map((idx) => `${activeParts[idx].code} (${activeParts[idx].id})`),
          minGapToMainMm: Number(minGapToMain.toFixed(4)),
          nearestMainPartId,
          centroidWorld: [
            Number((cx / island.length).toFixed(3)),
            Number((cy / island.length).toFixed(3)),
            Number((cz / island.length).toFixed(3)),
          ],
        });
      }
      disconnectedIslands.sort((a, b) => b.size - a.size || b.minGapToMainMm - a.minGapToMainMm);
    }
  }

  // Axis 2: Explode-trajectory collision sweep (t = 1/N .. 1.0)
  const explodeCollisions = [];
  const explodeResidualAtT1 = [];
  if (explodeSteps > 0) {
    const expMap = new Map();
    for (let s = 1; s <= explodeSteps; s++) {
      const t = s / explodeSteps;
      const movedMeshes = activeMeshes.map((m) => {
        const e = scene.parts[m.partIdx].explodeOffset;
        return translateMesh(m, e[0] * t, e[1] * t, e[2] * t);
      });
      const mBvh = buildFlatBvh(movedMeshes.map((m) => m.box), 6);
      const stepHitPairs = new Map();

      for (let i = 0; i < movedMeshes.length; i++) {
        const mA = movedMeshes[i];
        const hits = queryBvhBox(mBvh, mA.box, 0, []);
        for (let k = 0; k < hits.length; k++) {
          const j = hits[k];
          if (j <= i) continue;
          const mB = movedMeshes[j];
          if (mA.partIdx === mB.partIdx) continue;
          const pLow = Math.min(mA.partIdx, mB.partIdx);
          const pHigh = Math.max(mA.partIdx, mB.partIdx);
          const pairKey = `${pLow}:${pHigh}`;
          const res = meshPairExactCheck(mA, mB, { computeMinDist: false });
          if (res.intersects && res.penMm >= explodeTolMm) {
            const prev = stepHitPairs.get(pairKey);
            if (!prev || res.penMm > prev.penMm) {
              stepHitPairs.set(pairKey, { pLow, pHigh, penMm: res.penMm });
            }
          }
        }
      }

      for (const [pairKey, hit] of stepHitPairs.entries()) {
        const isStatic = staticCollisionPairs.has(pairKey);
        if (s === explodeSteps) {
          const pA = scene.parts[hit.pLow];
          const pB = scene.parts[hit.pHigh];
          explodeResidualAtT1.push({
            partA: `${pA.code} (${pA.id})`,
            partB: `${pB.code} (${pB.id})`,
            partIdA: pA.id,
            partIdB: pB.id,
            penMm: Number(hit.penMm.toFixed(5)),
            wasStaticCollision: isStatic,
          });
        }
        if (isStatic) continue; // Separate new mid-flight crossing hits from pre-existing static collisions
        let rec = expMap.get(pairKey);
        if (!rec) {
          const pA = scene.parts[hit.pLow];
          const pB = scene.parts[hit.pHigh];
          rec = {
            partA: `${pA.code} (${pA.id})`,
            partB: `${pB.code} (${pB.id})`,
            partIdA: pA.id,
            partIdB: pB.id,
            t: Number(t.toFixed(4)),
            tFirst: Number(t.toFixed(4)),
            tWorst: Number(t.toFixed(4)),
            penMm: Number(hit.penMm.toFixed(5)),
            stillCollidingAtT1: s === explodeSteps,
          };
          expMap.set(pairKey, rec);
        } else {
          if (hit.penMm > rec.penMm) {
            rec.penMm = Number(hit.penMm.toFixed(5));
            rec.tWorst = Number(t.toFixed(4));
          }
          if (s === explodeSteps) rec.stillCollidingAtT1 = true;
        }
      }
    }
    for (const rec of expMap.values()) explodeCollisions.push(rec);
    explodeCollisions.sort((a, b) => b.penMm - a.penMm);
    explodeResidualAtT1.sort((a, b) => b.penMm - a.penMm);
  }

  // Axis 4: Outer-shell envelope protrusion & IQR spatial outliers
  const protrusion = checkProtrusion
    ? runProtrusionAudit(scene, activeParts, tolMm, nearestGapByPartId)
    : null;

  // Axis 5 & 6: Coordinate drift, double-offset, mesh health, optical concentricity, symmetry, composite mating
  const alignment = checkAlignment
    ? runAlignmentAudit(scene, activeParts, tolMm)
    : null;

  collisions.sort((a, b) => b.penMm - a.penMm);
  mechanicalCollisions.sort((a, b) => b.penMm - a.penMm);
  smtSeating.sort((a, b) => b.penMm - a.penMm);

  const multiPartIslands = disconnectedIslands.filter((is) => is.isMultiPartIsland);
  const nonExposedProtrusions = protrusion
    ? protrusion.envelopeProtrusions.filter((p) => !p.exposedExternalHint)
    : [];

  const failed =
    collisions.length > 0 ||
    explodeCollisions.length > 0 ||
    floating.length > 0 ||
    (strict && disconnectedIslands.length > 0) ||
    nonExposedProtrusions.length > 0 ||
    (alignment && alignment.meshHealthIssues.length > 0);

  const elapsedMs = Number((performance.now() - t0).toFixed(1));

  return {
    verdict: failed ? 'FAIL' : 'PASS',
    exitCode: failed ? SP_EXIT_FAIL : SP_EXIT_PASS,
    unitId: scene.unitId,
    subView: scene.subView ?? null,
    subViewTag: scene.subViewTag || 'all',
    quality: scene.quality,
    partCount: activeParts.length,
    meshCount: activeMeshes.length,
    triCount: scene.totalTris,
    precisionMm: tolMm,
    strict,
    extractionAudit: scene.extractionAudit || null,
    collisions,
    mechanicalCollisionCount: mechanicalCollisions.length,
    smtSeating,
    smtSeatingCount: smtSeating.length,
    severityCounts,
    coplanarFlushCount,
    subTolGrazeCount,
    kissingCount: coplanarFlushCount + subTolGrazeCount,
    nearMisses: nearMisses.slice(0, 60),
    nearMissTotal: nearMisses.length,
    floating,
    floatingDetails,
    disconnectedIslands,
    multiPartIslandCount: multiPartIslands.length,
    explodeCollisions,
    explodeResidualAtT1,
    protrusion,
    alignment,
    elapsedMs,
  };
}

/**
 * Sightline & RF Emission Cone Raycasting (BG/SP Ray Mode).
 */
export function runRayConeCheck(scene, coneSpec, extraMeshes = []) {
  const t0 = performance.now();
  const [ox, oy, oz] = coneSpec.origin;
  const dLen = Math.hypot(coneSpec.dir[0], coneSpec.dir[1], coneSpec.dir[2]) || 1;
  const dx0 = coneSpec.dir[0] / dLen, dy0 = coneSpec.dir[1] / dLen, dz0 = coneSpec.dir[2] / dLen;
  const halfAngleRad = ((coneSpec.fovDeg || 60) * 0.5 * Math.PI) / 180;
  const rangeMm = coneSpec.rangeMm || 120;

  // Orthonormal basis (u, v, d)
  const up = Math.abs(dy0) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  let ux = up[1] * dz0 - up[2] * dy0;
  let uy = up[2] * dx0 - up[0] * dz0;
  let uz = up[0] * dy0 - up[1] * dx0;
  const uLen = Math.hypot(ux, uy, uz) || 1;
  ux /= uLen; uy /= uLen; uz /= uLen;
  const vx = dy0 * uz - dz0 * uy;
  const vy = dz0 * ux - dx0 * uz;
  const vz = dx0 * uy - dy0 * ux;

  // Build uniform Fibonacci / concentric-ring ray fan inside the cone
  const rays = [[dx0, dy0, dz0]];
  const rings = coneSpec.fovDeg <= 70 ? 6 : 5;
  for (let r = 1; r <= rings; r++) {
    const theta = (r / rings) * halfAngleRad;
    const sinT = Math.sin(theta), cosT = Math.cos(theta);
    const nAz = Math.max(8, Math.round(r * 7));
    for (let a = 0; a < nAz; a++) {
      const phi = (a / nAz) * Math.PI * 2;
      const cP = Math.cos(phi), sP = Math.sin(phi);
      rays.push([
        dx0 * cosT + (ux * cP + vx * sP) * sinT,
        dy0 * cosT + (uy * cP + vy * sP) * sinT,
        dz0 * cosT + (uz * cP + vz * sP) * sinT,
      ]);
    }
  }

  const ignoreIds = new Set(coneSpec.ignoreIds || []);
  const ignoreSubs = (coneSpec.ignoreSubstrings || []).map((s) => s.toLowerCase());
  const isIgnored = (m) => {
    if (ignoreIds.has(m.partId)) return true;
    const low = m.partId.toLowerCase();
    return ignoreSubs.some((s) => low.includes(s));
  };

  const occluders = new Map();
  let occludedCount = 0;

  for (const [rx, ry, rz] of rays) {
    let hitPart = null;
    let bestT = rangeMm;
    for (let i = 0; i < scene.meshes.length; i++) {
      const m = scene.meshes[i];
      if (isIgnored(m)) continue;
      const t = rayMeshHit(m, ox, oy, oz, rx, ry, rz, 0.2, bestT);
      if (t !== null && t < bestT) {
        bestT = t;
        hitPart = `${m.code} (${m.partId})`;
      }
    }
    for (const em of extraMeshes) {
      const t = rayMeshHit(em, ox, oy, oz, rx, ry, rz, 0.2, bestT);
      if (t !== null && t < bestT) {
        bestT = t;
        hitPart = `${em.code || 'CAND'} (${em.partId || 'candidate'})`;
      }
    }
    if (hitPart) {
      occludedCount++;
      occluders.set(hitPart, (occluders.get(hitPart) || 0) + 1);
    }
  }

  const pct = Number(((occludedCount / rays.length) * 100).toFixed(3));
  return {
    verdict: occludedCount === 0 ? 'PASS' : 'FAIL',
    exitCode: occludedCount === 0 ? SP_EXIT_PASS : SP_EXIT_FAIL,
    name: coneSpec.name || 'Custom Cone',
    fovDeg: coneSpec.fovDeg,
    rayCount: rays.length,
    occludedCount,
    occludedPct: pct,
    occluders: [...occluders.entries()].map(([part, count]) => ({ part, count })),
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
  };
}

/**
 * Candidate Pre-Collision Simulation (sim) + optional Sightline Cone + --auto-fix solver.
 */
export function runCandidateSim(scene, candidates, opts = {}) {
  const t0 = performance.now();
  const origin = getFrameOrigin(scene, opts);
  const minClear = Number(opts.minClearance ?? 0.2);
  const conePresets = (opts.rayPresets || []).map((k) => RAY_PRESETS[k]).filter(Boolean);
  const results = [];
  let anyFail = false;

  for (const cand of candidates) {
    const candMesh = buildCandidateMesh(cand, origin);
    const ev = evaluateCandidateExact(scene, candMesh, {
      group: opts.group,
      minClearance: minClear,
      searchPad: 6.0,
      insidePartId: opts.insidePartId,
      ignoreIds: cand.ignoreIds || [],
    });

    const rayFailures = [];
    for (const preset of conePresets) {
      const rc = runRayConeCheck(scene, preset, [candMesh]);
      if (rc.occludedCount > 0) rayFailures.push(rc);
    }

    const ok = ev.collisionFree && ev.minGapMm >= minClear && rayFailures.length === 0;
    let autoFix = null;
    if (!ok && opts.autoFix) {
      autoFix = solveAutoFix(scene, cand, {
        group: opts.group,
        minClearance: minClear,
        insidePartId: opts.insidePartId,
        ignoreIds: cand.ignoreIds || [],
        rayGuard:
          conePresets.length > 0
            ? (movedMesh) => conePresets.every((pr) => runRayConeCheck(scene, pr, [movedMesh]).occludedCount === 0)
            : null,
      });
    }
    if (!ok) anyFail = true;
    results.push({
      id: cand.id || 'candidate',
      verdict: ok ? 'PASS' : 'FAIL',
      minGapMm: ev.minGapMm,
      nearestPart: ev.nearestPart,
      hits: ev.hits,
      outsideShell: ev.outsideShell,
      rayFailures,
      autoFix,
    });
  }

  return {
    verdict: anyFail ? 'FAIL' : 'PASS',
    exitCode: anyFail ? SP_EXIT_FAIL : SP_EXIT_PASS,
    results,
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
  };
}

/**
 * Thermal Proximity, Mass, Volume, Center of Gravity & Tipping Angle Analysis.
 */
export function runThermalCogAnalysis(scene) {
  const t0 = performance.now();
  let totalVolMm3 = 0;
  let totalMassG = 0;
  let cx = 0, cy = 0, cz = 0;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, minZ = Infinity, maxZ = -Infinity;

  for (const p of scene.parts) {
    totalVolMm3 += p.volumeMm3 || 0;
    totalMassG += p.massG || 0;
    cx += (p.cog?.[0] || 0) * (p.massG || 0);
    cy += (p.cog?.[1] || 0) * (p.massG || 0);
    cz += (p.cog?.[2] || 0) * (p.massG || 0);
    if (p.box[1] < minY) minY = p.box[1];
  }

  // Footprint polygon from lowest 3 mm band (feet / baseplate)
  for (const p of scene.parts) {
    if (p.box[1] <= minY + 3.0) {
      if (p.box[0] < minX) minX = p.box[0];
      if (p.box[3] > maxX) maxX = p.box[3];
      if (p.box[2] < minZ) minZ = p.box[2];
      if (p.box[5] > maxZ) maxZ = p.box[5];
    }
  }

  const cogWorld = totalMassG > 1e-9 ? [cx / totalMassG, cy / totalMassG, cz / totalMassG] : [0, 0, 0];
  const hCog = Math.max(0.1, cogWorld[1] - minY);
  const radToDeg = 180 / Math.PI;
  const tipFront = Math.atan2(Math.max(0, maxZ - cogWorld[2]), hCog) * radToDeg;
  const tipRear = Math.atan2(Math.max(0, cogWorld[2] - minZ), hCog) * radToDeg;
  const tipLeft = Math.atan2(Math.max(0, cogWorld[0] - minX), hCog) * radToDeg;
  const tipRight = Math.atan2(Math.max(0, maxX - cogWorld[0]), hCog) * radToDeg;
  const minTip = Math.min(tipFront, tipRear, tipLeft, tipRight);

  // Closest heat-source <-> thermal-sensitive exact distances
  const sources = scene.parts.filter((p) => p.role === 'heat_source' || p.role === 'thermal_source');
  const sensitives = scene.parts.filter((p) => p.role === 'thermal_sensitive');
  const thermalPairs = [];
  for (const hs of sources) {
    for (const sp of sensitives) {
      if (hs.id === sp.id) continue;
      if (boxBoxMinDistSq(hs.box, sp.box) > 100) continue; // > 10mm skip
      let minD = Infinity;
      for (let i = hs.meshStart; i < hs.meshStart + hs.meshCount; i++) {
        for (let j = sp.meshStart; j < sp.meshStart + sp.meshCount; j++) {
          const d = exactMeshPairMinDistance(scene.meshes[i], scene.meshes[j], minD);
          if (d < minD) minD = d;
        }
      }
      if (Number.isFinite(minD)) {
        thermalPairs.push({
          distMm: Number(minD.toFixed(3)),
          status: minD < 2.0 ? 'TIGHT_THERMAL' : 'OK',
          source: `${hs.code} (${hs.id})`,
          sensitive: `${sp.code} (${sp.id})`,
        });
      }
    }
  }
  thermalPairs.sort((a, b) => a.distMm - b.distMm);

  return {
    verdict: minTip >= 15 ? 'PASS' : 'WARN',
    exitCode: minTip >= 15 ? SP_EXIT_PASS : SP_EXIT_WARN,
    unitId: scene.unitId,
    massG: Number(totalMassG.toFixed(3)),
    volumeCm3: Number((totalVolMm3 / 1000).toFixed(3)),
    cogWorld: cogWorld.map((v) => Number(v.toFixed(3))),
    hCogMm: Number(hCog.toFixed(3)),
    tippingDeg: {
      front: Number(tipFront.toFixed(3)),
      rear: Number(tipRear.toFixed(3)),
      left: Number(tipLeft.toFixed(3)),
      right: Number(tipRight.toFixed(3)),
      min: Number(minTip.toFixed(3)),
    },
    thermalPairs: thermalPairs.slice(0, 8),
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
  };
}

export function saveSnapshot(scene, outPath) {
  const tc = runThermalCogAnalysis(scene);
  const snap = {
    schema: 'sp-snapshot/v1',
    unitId: scene.unitId,
    quality: scene.quality,
    partCount: scene.parts.length,
    triCount: scene.totalTris,
    massG: tc.massG,
    volumeCm3: tc.volumeCm3,
    cogWorld: tc.cogWorld,
    partIds: scene.parts.map((p) => p.id),
  };
  fs.writeFileSync(outPath, JSON.stringify(snap, null, 2));
  return snap;
}

export function diffSnapshot(scene, snapPath) {
  const base = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
  const cur = runThermalCogAnalysis(scene);
  return {
    verdict: 'PASS',
    exitCode: SP_EXIT_PASS,
    from: `${base.unitId}(${base.partCount}p)`,
    to: `${scene.unitId}(${scene.parts.length}p)`,
    deltaParts: scene.parts.length - base.partCount,
    deltaTris: scene.totalTris - base.triCount,
    deltaMassG: Number((cur.massG - base.massG).toFixed(3)),
    deltaVolCm3: Number((cur.volumeCm3 - base.volumeCm3).toFixed(3)),
    deltaCog: [
      Number((cur.cogWorld[0] - base.cogWorld[0]).toFixed(3)),
      Number((cur.cogWorld[1] - base.cogWorld[1]).toFixed(3)),
      Number((cur.cogWorld[2] - base.cogWorld[2]).toFixed(3)),
    ],
  };
}

/**
 * 20-Case Mathematical Oracle Self-Test Suite (0.001 mm certified).
 */
export function runSpatialSelfTest() {
  const t0 = performance.now();
  const cases = [];
  const assert = (c, m) => { if (!c) throw new Error(m); };
  const run = (id, name, fn) => {
    const s = performance.now();
    try {
      fn();
      cases.push({ id, name, ok: true, ms: Number((performance.now() - s).toFixed(2)) });
    } catch (e) {
      cases.push({ id, name, ok: false, ms: Number((performance.now() - s).toFixed(2)), error: e.message });
    }
  };

  run('M01', '0.001 mm exact separation PASS (no false positive)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10]);
    const b = buildBoxMesh([10.001, 0, 0], [10, 10, 10]);
    const r = meshPairExactCheck(a, b, { computeMinDist: true });
    assert(!r.intersects && Math.abs(r.minDistMm - 0.001) < 1e-6, `got ${JSON.stringify(r)}`);
  });

  run('M02', '0.001 mm exact penetration FAIL (no false negative)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10]);
    const b = buildBoxMesh([9.999, 0, 0], [10, 10, 10]);
    const r = meshPairExactCheck(a, b);
    assert(r.intersects && Math.abs(r.penMm - 0.001) < 0.0005, `got ${JSON.stringify(r)}`);
  });

  run('M03', '45° rotated prism exact clearance (0.6569 mm)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 45, 0]);
    const b = buildBoxMesh([12.728, 0, 0], [10, 10, 10]);
    const expected = 12.728 - 5 - 5 * Math.SQRT2;
    const r = meshPairExactCheck(a, b, { computeMinDist: true });
    assert(!r.intersects && Math.abs(r.minDistMm - expected) < 0.001, `got ${r.minDistMm} vs ${expected}`);
  });

  run('M04', 'Coplanar overlapping faces detected via 2D SAT', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10]);
    const b = buildBoxMesh([5, 0, 0], [10, 10, 10]);
    const r = meshPairExactCheck(a, b);
    assert(r.intersects, 'coplanar overlap missed');
  });

  run('M05', 'Strict full containment A inside B (Generalized Winding Number)', () => {
    const outer = buildBoxMesh([0, 0, 0], [20, 20, 20]);
    const inner = buildBoxMesh([0, 0, 0], [4, 4, 4]);
    const r = meshPairExactCheck(inner, outer);
    assert(r.intersects && r.contained === 'A_IN_B', `got ${JSON.stringify(r)}`);
  });

  run('M06', 'Strict full containment B inside A (symmetric)', () => {
    const outer = buildBoxMesh([0, 0, 0], [20, 20, 20]);
    const inner = buildBoxMesh([0, 0, 0], [4, 4, 4]);
    const r = meshPairExactCheck(outer, inner);
    assert(r.intersects && r.contained === 'B_IN_A', `got ${JSON.stringify(r)}`);
  });

  run('M07', 'Non-watertight mesh containment resilience (missing 1 face)', () => {
    const box = buildBoxMesh([0, 0, 0], [20, 20, 20]);
    const openMesh = { ...box, tris: box.tris.subarray(0, box.tris.length - 18), _triBvh: null };
    assert(pointInMeshWinding(openMesh, 0, 0, 0) === true, 'center should still be inside');
    assert(pointInMeshWinding(openMesh, 15, 0, 0) === false, 'exterior should be outside');
  });

  run('M08', 'Hollow cavity clearance PASS (part nested inside open frame)', () => {
    const wallL = buildBoxMesh([-10, 0, 0], [2, 20, 10]);
    const wallR = buildBoxMesh([10, 0, 0], [2, 20, 10]);
    const inner = buildBoxMesh([0, 0, 0], [10, 10, 4]);
    assert(!meshPairExactCheck(inner, wallL).intersects && !meshPairExactCheck(inner, wallR).intersects, 'false hit in cavity');
  });

  run('M09', 'Hollow cavity wall penetration by 0.001 mm FAIL', () => {
    const wallR = buildBoxMesh([10, 0, 0], [2, 20, 10]); // x in [9, 11]
    const inner = buildBoxMesh([4.001, 0, 0], [10, 10, 4]); // x max = 9.001
    const r = meshPairExactCheck(inner, wallR);
    assert(r.intersects, '0.001mm wall graze missed');
  });

  run('M10', 'Cylinder exact clearance & collision', () => {
    const c1 = buildCylinderMesh([0, 0, 0], 5, 10, 'y', [0, 0, 0], 48);
    const c2 = buildCylinderMesh([10.05, 0, 0], 5, 10, 'y', [0, 0, 0], 48);
    const c3 = buildCylinderMesh([9.9, 0, 0], 5, 10, 'y', [0, 0, 0], 48);
    assert(!meshPairExactCheck(c1, c2).intersects, 'separated cylinders collided');
    assert(meshPairExactCheck(c1, c3).intersects, 'overlapping cylinders missed');
  });

  run('M11', 'Sphere exact separation & overlap', () => {
    const s1 = buildSphereMesh([0, 0, 0], 5, 32);
    const s2 = buildSphereMesh([10.1, 0, 0], 5, 32);
    const s3 = buildSphereMesh([9.8, 0, 0], 5, 32);
    assert(!meshPairExactCheck(s1, s2).intersects && meshPairExactCheck(s1, s3).intersects, 'sphere check failed');
  });

  run('M12', 'Capsule exact separation & overlap', () => {
    const k1 = buildCapsuleMesh([0, 0, 0], 2, 10, 'x');
    const k2 = buildCapsuleMesh([0, 4.1, 0], 2, 10, 'x');
    const k3 = buildCapsuleMesh([0, 3.8, 0], 2, 10, 'x');
    assert(!meshPairExactCheck(k1, k2).intersects && meshPairExactCheck(k1, k3).intersects, 'capsule check failed');
  });

  run('M13', 'Continuous SDF sign & magnitude at ±0.005 mm across surface', () => {
    const b = buildBoxMesh([0, 0, 0], [10, 10, 10]); // x = ±5
    const sOut = pointToMeshSignedDist(b, 5.005, 0, 0);
    const sIn = pointToMeshSignedDist(b, 4.995, 0, 0);
    assert(Math.abs(sOut - 0.005) < 1e-5, `sOut=${sOut}`);
    assert(Math.abs(sIn + 0.005) < 1e-5, `sIn=${sIn}`);
  });

  run('M14', 'Divergence-theorem exact volume (10×20×30 = 6000.0000 mm³)', () => {
    const b = buildBoxMesh([3, -4, 5], [10, 20, 30]);
    const v = computeMeshSignedVolumeAndCentroid(b.tris);
    assert(Math.abs(v.volumeMm3 - 6000) < 1e-5, `vol=${v.volumeMm3}`);
    assert(Math.abs(v.centroid[0] - 3) < 1e-5 && Math.abs(v.centroid[1] + 4) < 1e-5, `cog=${v.centroid}`);
  });

  run('M15', 'Moller-Trumbore 63° sightline cone detects blocker & passes clear cone', () => {
    const blocker = buildBoxMesh([0, 0, 30], [4, 4, 2], [0, 0, 0], { partId: 'blk', code: 'BLK' });
    const mockScene = { meshes: [blocker] };
    const rHit = runRayConeCheck(mockScene, { name: 'test', origin: [0, 0, 0], dir: [0, 0, 1], fovDeg: 63, rangeMm: 80 });
    assert(rHit.occludedCount > 0, 'ray cone missed blocker');
    const rClr = runRayConeCheck({ meshes: [] }, { name: 'test', origin: [0, 0, 0], dir: [0, 0, 1], fovDeg: 63, rangeMm: 80 });
    assert(rClr.occludedCount === 0, 'empty cone occluded');
  });

  run('M16', '--auto-fix 26-dir binary search finds exact minimal escape displacement', () => {
    const obs = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 0, partId: 'obs', code: 'OBS', groupKey: 'g' });
    const mockScene = {
      meshes: [obs],
      parts: [{ id: 'obs', code: 'OBS', box: obs.box }],
      sceneBvh: buildFlatBvh([obs.box]),
      groupOrigins: { g: [0, 0, 0] },
    };
    const fix = solveAutoFix(mockScene, { shape: 'box', pos: [4, 0, 0], size: [4, 4, 4] }, { minClearance: 0.5, group: 'g' });
    assert(fix && Math.abs(fix.shiftMm - 3.5) < 0.05 && fix.minGapMm >= 0.49, `bad fix=${JSON.stringify(fix)}`);
  });

  run('M17', 'SMT_SOLDER_SEAT <= 0.25mm separated from solid collisions in audit', () => {
    const pcb = buildBoxMesh([0, 0, 0], [20, 1.6, 20], [0, 0, 0], { partIdx: 0, partId: 'p1', code: 'W1', groupKey: 'g', role: 'pcb' });
    const ic = buildBoxMesh([0, 1.25, 0], [4, 1.0, 4], [0, 0, 0], { partIdx: 1, partId: 'p2', code: 'W2', groupKey: 'g', role: 'smt_ic' }); // overlaps 0.05mm
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'p1', code: 'W1', groupKey: 'g', role: 'pcb', explodeOffset: [0, 0, 0], box: pcb.box, meshStart: 0, meshCount: 1 },
        { id: 'p2', code: 'W2', groupKey: 'g', role: 'smt_ic', explodeOffset: [0, 5, 0], box: ic.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [pcb, ic],
    };
    const a = runUnitAudit(mockScene);
    assert(a.collisions.length === 0 && a.smtSeatingCount === 1, `smt not separated: ${JSON.stringify(a)}`);
  });

  run('M18', 'Explode trajectory sweep catches mid-flight crossing collision', () => {
    const mA = buildBoxMesh([-5, 0, 0], [4, 4, 4], [0, 0, 0], { partIdx: 0, partId: 'a', code: 'A', groupKey: 'g', role: 'mechanical' });
    const mB = buildBoxMesh([5, 0, 0], [4, 4, 4], [0, 0, 0], { partIdx: 1, partId: 'b', code: 'B', groupKey: 'g', role: 'mechanical' });
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'a', code: 'A', groupKey: 'g', role: 'mechanical', explodeOffset: [20, 0, 0], box: mA.box, meshStart: 0, meshCount: 1 },
        { id: 'b', code: 'B', groupKey: 'g', role: 'mechanical', explodeOffset: [-20, 0, 0], box: mB.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [mA, mB],
    };
    const a = runUnitAudit(mockScene, { explodeSteps: 8 });
    assert(a.collisions.length === 0 && a.explodeCollisions.length === 1, `explode hit missed: ${JSON.stringify(a)}`);
  });

  run('M19', 'Floating part detector flags isolated part > 4 mm from neighbors', () => {
    const mA = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 0, partId: 'a', code: 'A', groupKey: 'g', role: 'chassis' });
    const mB = buildBoxMesh([30, 0, 0], [4, 4, 4], [0, 0, 0], { partIdx: 1, partId: 'b', code: 'B', groupKey: 'g', role: 'mechanical' });
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'a', code: 'A', groupKey: 'g', role: 'chassis', explodeOffset: [0, 0, 0], box: mA.box, meshStart: 0, meshCount: 1 },
        { id: 'b', code: 'B', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: mB.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [mA, mB],
    };
    const a = runUnitAudit(mockScene, { checkFloating: true });
    assert(a.floating.length === 2, `floating not detected: ${JSON.stringify(a.floating)}`);
  });

  run('M20', 'Outer-shell containment check catches protrusion outside envelope', () => {
    const shell = buildBoxMesh([0, 0, 0], [20, 20, 20], [0, 0, 0], { partIdx: 0, partId: 'shell', code: 'SH', groupKey: 'g' });
    const mockScene = {
      meshes: [],
      parts: [{ id: 'shell', code: 'SH', box: shell.box }],
      sceneBvh: buildFlatBvh([]),
    };
    const cand = buildBoxMesh([12, 0, 0], [4, 4, 4]);
    const ev = evaluateCandidateExact(mockScene, cand, { insidePartId: 'shell' });
    assert(ev.outsideShell === true && ev.collisionFree === false, `outside shell missed: ${JSON.stringify(ev)}`);
  });

  run('M21', '0.0001 mm (0.1 µm) exact penetration FAIL (zero false negative)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 0, partId: 'a', code: 'A', groupKey: 'g', role: 'mechanical' });
    const b = buildBoxMesh([9.9999, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 1, partId: 'b', code: 'B', groupKey: 'g', role: 'mechanical' });
    const r = meshPairExactCheck(a, b);
    assert(r.intersects && Math.abs(r.penMm - 0.0001) < 1e-5, `exactCheck got ${JSON.stringify(r)}`);
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'a', code: 'A', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: a.box, meshStart: 0, meshCount: 1 },
        { id: 'b', code: 'B', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: b.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [a, b],
    };
    const au = runUnitAudit(mockScene, { strict: true, tolMm: STRICT_PRECISION_MM });
    assert(au.verdict === 'FAIL' && au.collisions.length === 1 && Math.abs(au.collisions[0].penMm - 0.0001) < 2e-5, `audit got ${JSON.stringify(au)}`);
  });

  run('M22', '0.00009 mm exact separation PASS (zero false positive)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10]);
    const b = buildBoxMesh([10.00009, 0, 0], [10, 10, 10]);
    const r = meshPairExactCheck(a, b, { computeMinDist: true });
    assert(!r.intersects && Math.abs(r.minDistMm - 0.00009) < 1e-6, `got ${JSON.stringify(r)}`);
  });

  run('M23', '45° rotated boxes exact 0.0000 mm flush contact PASS (no aabbPen false positive)', () => {
    const c45 = Math.SQRT1_2;
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 45, 0], { partIdx: 0, partId: 'a', code: 'A', groupKey: 'g', role: 'mechanical' });
    // Exact flush contact along rotated +X face normal (cos45, 0, -sin45) at distance 10.0000 mm
    const bFlush = buildBoxMesh([10 * c45, 0, -10 * c45], [10, 10, 10], [0, 45, 0], { partIdx: 1, partId: 'b', code: 'B', groupKey: 'g', role: 'mechanical' });
    const rFlush = meshPairExactCheck(a, bFlush);
    assert(rFlush.penMm === 0 && rFlush.contactType === 'COPLANAR_FLUSH', `flush false positive: ${JSON.stringify(rFlush)}`);
    const mockFlush = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'a', code: 'A', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: a.box, meshStart: 0, meshCount: 1 },
        { id: 'b', code: 'B', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: bFlush.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [a, bFlush],
    };
    const auFlush = runUnitAudit(mockFlush, { strict: true, tolMm: STRICT_PRECISION_MM });
    assert(auFlush.collisions.length === 0 && auFlush.coplanarFlushCount === 1, `audit flush failed: ${JSON.stringify(auFlush)}`);
    // Verify 0.0001 mm overlap at 45° IS caught!
    const bPen = buildBoxMesh([9.9999 * c45, 0, -9.9999 * c45], [10, 10, 10], [0, 45, 0]);
    const rPen = meshPairExactCheck(a, bPen);
    assert(rPen.intersects && rPen.penMm >= 0.00009, `rotated 0.0001mm overlap missed: ${JSON.stringify(rPen)}`);
  });

  run('M24', 'Vertex-free orthogonal cross-bar piercing FAIL (edge/face penetration)', () => {
    const barX = buildBoxMesh([0, 0, 0], [20, 2, 2]);
    const barY = buildBoxMesh([0, 0, 0], [2, 20, 2]);
    const r = meshPairExactCheck(barX, barY);
    assert(r.intersects && r.penMm >= 0.99, `cross-bar missed: ${JSON.stringify(r)}`);
  });

  run('M25', '2-part touching cluster floating 1.5 mm from main body caught as floating island FAIL', () => {
    const m1 = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 0, partId: 'main1', code: 'M1', groupKey: 'g', role: 'chassis' });
    const m2 = buildBoxMesh([10, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 1, partId: 'main2', code: 'M2', groupKey: 'g', role: 'mechanical' });
    const m3 = buildBoxMesh([-10, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 2, partId: 'main3', code: 'M3', groupKey: 'g', role: 'mechanical' });
    // Floating 2-part island: touching each other at y = 0, but 1.5 mm above main body (y=5 -> y=6.5)
    const f1 = buildBoxMesh([0, 7.5, 0], [4, 2, 4], [0, 0, 0], { partIdx: 3, partId: 'isl1', code: 'I1', groupKey: 'g', role: 'mechanical' });
    const f2 = buildBoxMesh([4, 7.5, 0], [4, 2, 4], [0, 0, 0], { partIdx: 4, partId: 'isl2', code: 'I2', groupKey: 'g', role: 'mechanical' });
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 60,
      parts: [
        { id: 'main1', code: 'M1', groupKey: 'g', role: 'chassis', explodeOffset: [0, 0, 0], box: m1.box, meshStart: 0, meshCount: 1 },
        { id: 'main2', code: 'M2', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: m2.box, meshStart: 1, meshCount: 1 },
        { id: 'main3', code: 'M3', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: m3.box, meshStart: 2, meshCount: 1 },
        { id: 'isl1', code: 'I1', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: f1.box, meshStart: 3, meshCount: 1 },
        { id: 'isl2', code: 'I2', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: f2.box, meshStart: 4, meshCount: 1 },
      ],
      meshes: [m1, m2, m3, f1, f2],
    };
    const au = runUnitAudit(mockScene, { strict: true, checkFloating: true, floatTolMm: 0.05 });
    assert(
      au.verdict === 'FAIL' &&
      au.disconnectedIslands.length === 1 &&
      au.disconnectedIslands[0].isMultiPartIsland === true &&
      au.disconnectedIslands[0].size === 2 &&
      Math.abs(au.disconnectedIslands[0].minGapToMainMm - 1.5) < 0.01,
      `island missed: ${JSON.stringify(au.disconnectedIslands)}`
    );
  });

  run('M26', '0.2 mm micro-floating part caught under --float-tol=0.05 FAIL', () => {
    const base = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 0, partId: 'base', code: 'B1', groupKey: 'g', role: 'chassis' });
    const microFloat = buildBoxMesh([0, 6.2, 0], [4, 2, 4], [0, 0, 0], { partIdx: 1, partId: 'flt', code: 'F1', groupKey: 'g', role: 'mechanical' }); // gap = 0.2 mm
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'base', code: 'B1', groupKey: 'g', role: 'chassis', explodeOffset: [0, 0, 0], box: base.box, meshStart: 0, meshCount: 1 },
        { id: 'flt', code: 'F1', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: microFloat.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [base, microFloat],
    };
    const au = runUnitAudit(mockScene, { strict: true, checkFloating: true, floatTolMm: 0.05 });
    assert(
      au.verdict === 'FAIL' &&
      au.floatingDetails.length === 2 &&
      Math.abs(au.floatingDetails[0].nearestGapMm - 0.2) < 0.001 &&
      au.floatingDetails[0].band === 'MICRO_FLOAT',
      `micro-float missed: ${JSON.stringify(au.floatingDetails)}`
    );
  });

  run('M27', 'Internal component protruding 0.001 mm outside outer chassis shell caught FAIL', () => {
    const shell = buildBoxMesh([0, 0, 0], [20, 20, 20], [0, 0, 0], { partIdx: 0, partId: 'chassis-housing', code: 'CH', groupKey: 'g', role: 'chassis' });
    const pcb = buildBoxMesh([6.001, 0, 0], [8, 4, 4], [0, 0, 0], { partIdx: 1, partId: 'internal-pcb', code: 'PC', groupKey: 'g', role: 'pcb' }); // x max = 10.001 vs shell 10.000
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'chassis-housing', code: 'CH', title: 'Chassis Housing', groupKey: 'g', role: 'chassis', explodeOffset: [0, 0, 0], box: shell.box, meshStart: 0, meshCount: 1 },
        { id: 'internal-pcb', code: 'PC', title: 'Internal PCB', groupKey: 'g', role: 'pcb', explodeOffset: [0, 0, 0], box: pcb.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [shell, pcb],
    };
    const au = runUnitAudit(mockScene, { strict: true, tolMm: STRICT_PRECISION_MM, checkProtrusion: true });
    assert(
      au.verdict === 'FAIL' &&
      au.protrusion &&
      au.protrusion.envelopeProtrusions.length === 1 &&
      Math.abs(au.protrusion.envelopeProtrusions[0].maxExceedMm - 0.001) < 1e-4,
      `protrusion missed: ${JSON.stringify(au.protrusion)}`
    );
  });

  const passed = cases.filter((c) => c.ok).length;
  return {
    verdict: passed === cases.length ? 'PASS' : 'FAIL',
    exitCode: passed === cases.length ? SP_EXIT_PASS : SP_EXIT_FAIL,
    precisionMm: STRICT_PRECISION_MM,
    passed,
    total: cases.length,
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
    cases,
  };
}
