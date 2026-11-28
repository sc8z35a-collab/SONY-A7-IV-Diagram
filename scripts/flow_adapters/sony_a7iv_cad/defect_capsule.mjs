/**
 * FLOW V1 OS — Tier-B Surgical Defect Capsule Generator (`<= 250 tokens`)
 * For the ~5-15% of defects that require genuine shape/topology redesign (non-manifold holes,
 * trapped rigid brackets, thin walls), generates a dense machine-readable capsule:
 *   - Exact AABB, volume, clash/float vector & neighbors
 *   - 2D ASCII voxel cross-section slice around the defect center
 *   - Comment- and Japanese-prose-stripped 15-line AST slice of ONLY the failing geometry builder
 */

import fs from 'node:fs';
import path from 'node:path';
import { estimateTokens } from '../../flow_os/wire_protocol.mjs';
import { loadSpatialScene } from '../../spatial_engine/scene_extractor.mjs';

const PROSE_FIELD_RX = /^\s*(?:title|subtitle|category|plainAnalogy|summary|nextGenInnovation|references|opticsAndPhysics)\s*:/;

function findPartSourceSpan(repoRoot, unitId, partId) {
  const unitHint = unitId === 'mishoe' ? 'mishoe' : unitId === 'sensor_fab' ? 'sensorFab' : unitId === 'mirai_2028' ? 'mirai2028' : unitId;
  const dirs = [path.join(repoRoot, 'src/units'), path.join(repoRoot, 'src/assemblies', unitHint)];
  const files = [];
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      if (f.endsWith('.ts')) files.push(path.join(d, f));
    }
  }
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const needle = new RegExp(`['"\`]${esc(partId)}['"\`]`);
  const partsSplit = partId.split('-');
  const suffixNeedle = partsSplit.length >= 3
    ? new RegExp(`${esc('-' + partsSplit.slice(-2).join('-'))}['"\`]`)
    : null;

  const extractAt = (fp, lines, i) => {
    const rel = path.relative(repoRoot, fp);
    const picked = [];
    let skippingArray = false;
    for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 70) && picked.length < 15; j++) {
      const raw = lines[j];
      const tr = raw.trim();
      if (!tr || tr.startsWith('//') || tr.startsWith('*') || tr.startsWith('/*')) continue;
      if (PROSE_FIELD_RX.test(raw)) {
        if (tr.endsWith('[')) skippingArray = true;
        continue;
      }
      if (skippingArray) {
        if (tr.startsWith(']')) skippingArray = false;
        continue;
      }
      const compact = tr.replace(/['"`][^'"`]*[ぁ-んァ-ヶ一-龯][^'"`]*['"`]/g, '"<JA>"');
      picked.push(`L${j + 1}: ${compact.slice(0, 96)}`);
    }
    return { file: rel, line: i + 1, snippet: picked };
  };

  for (const fp of files) {
    const lines = fs.readFileSync(fp, 'utf8').split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      if (needle.test(lines[i])) return extractAt(fp, lines, i);
    }
  }
  if (suffixNeedle) {
    for (const fp of files) {
      const lines = fs.readFileSync(fp, 'utf8').split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        if (suffixNeedle.test(lines[i])) return extractAt(fp, lines, i);
      }
    }
  }
  return { file: '-', line: 0, snippet: [] };
}

function renderAsciiSlice(scene, targetPart, otherPart) {
  const b = targetPart.box;
  const cx = 0.5 * (b[0] + b[3]);
  const cy = 0.5 * (b[1] + b[4]);
  const cz = 0.5 * (b[2] + b[5]);
  const spanX = Math.max(4, (b[3] - b[0]) * 1.4);
  const spanY = Math.max(4, (b[4] - b[1]) * 1.4);
  const cols = 16;
  const rows = 5;
  const grid = [];
  for (let r = rows - 1; r >= 0; r--) {
    let line = '';
    const y = cy - spanY * 0.5 + ((r + 0.5) / rows) * spanY;
    for (let c = 0; c < cols; c++) {
      const x = cx - spanX * 0.5 + ((c + 0.5) / cols) * spanX;
      const inT = x >= b[0] && x <= b[3] && y >= b[1] && y <= b[4] && cz >= b[2] && cz <= b[5];
      let inO = false;
      if (otherPart) {
        const ob = otherPart.box;
        inO = x >= ob[0] && x <= ob[3] && y >= ob[1] && y <= ob[4] && cz >= ob[2] && cz <= ob[5];
      }
      line += inT && inO ? 'X' : inT ? '!' : inO ? '#' : '.';
    }
    grid.push(line);
  }
  return `SLICE_XY(z=${cz.toFixed(1)},.=free,!=target,#=other,X=clash): ${grid.join('/')}`;
}

export function formatTierBCapsuleFromScene(repoRoot, scene, unitId, defect) {
  const target = scene.parts.find((p) => p.id === defect.partId);
  const other = defect.otherId ? scene.parts.find((p) => p.id === defect.otherId) : null;
  const src = findPartSourceSpan(repoRoot, unitId, defect.partId);

  const lines = [
    `FLOW_DEFECT|id=${defect.partId}|tier=B|kind=${defect.kind || 'SHAPE'}|reason=${defect.reason || 'REDESIGN'}|src=${src.file}:${src.line}`,
  ];
  if (target) {
    const b = target.box.map((n) => Number(n).toFixed(2));
    lines.push(`GEOM|aabb=[${b.slice(0, 3).join(',')}..${b.slice(3, 6).join(',')}]|vol=${target.volumeMm3}mm3|tris=${target.meshCount}m`);
    lines.push(renderAsciiSlice(scene, target, other));
  }
  if (defect.otherId || defect.residualMm) {
    lines.push(`CONFLICT|vs=${defect.otherId || '-'}|res_mm=${defect.residualMm ?? '-'}|open_edges=${defect.openEdges ?? 0}|self_x=${defect.selfIntersections ?? 0}`);
  }
  for (const s of src.snippet.slice(0, 8)) lines.push(`AST|${s}`);

  // Guarantee <= 250 tokens strictly
  let out = [...lines];
  while (out.length > 4 && estimateTokens(out.join('\n')) > 245) out.pop();
  return {
    ok: true,
    tokens: estimateTokens(out.join('\n')),
    lines: out,
  };
}

export async function buildDefectCapsule(ctx, { partId, unitId = 'welcome' }) {
  const scene = await loadSpatialScene(unitId, { quality: 'high' });
  const target = scene.parts.find((p) => p.id === partId);
  if (!target) {
    return { ok: false, lines: [`FLOW_DEFECT|id=${partId}|status=NOT_FOUND|unit=${unitId}`] };
  }
  // Find closest neighbor for visual slice context
  let closest = null;
  let bestD = Infinity;
  for (const p of scene.parts) {
    if (p.id === partId) continue;
    const d = Math.hypot(
      Math.max(0, target.box[0] - p.box[3], p.box[0] - target.box[3]),
      Math.max(0, target.box[1] - p.box[4], p.box[1] - target.box[4]),
      Math.max(0, target.box[2] - p.box[5], p.box[2] - target.box[5])
    );
    if (d < bestD) { bestD = d; closest = p; }
  }
  return formatTierBCapsuleFromScene(ctx.repoRoot, scene, unitId, {
    partId,
    otherId: closest?.id || '-',
    kind: bestD <= 0.001 ? 'CLASH_OR_CONTACT' : bestD > 0.08 ? 'FLOAT_GAP' : 'SEATED',
    residualMm: Number(bestD.toFixed(4)),
    reason: 'SURGICAL_INSPECT',
  });
}
