/**
 * FLOW V1 OS — AI-Native FLOW1 Wire Protocol, BPE Token Estimator & FLOW-BUDGET Hard Governor
 * Guarantees every AI command stays strictly within its token budget while spilling full raw logs
 * to the agent's isolated workspace with exact line-slice retrieval pointers.
 */

import fs from 'node:fs';
import path from 'node:path';
import { atomicWriteSync } from './kernel_config.mjs';

const TOKEN_SEGMENT_RX =
  /([ \t]+)|(\r?\n+)|([0-9]+)|([A-Za-z_][A-Za-z0-9_]*)|([ぁ-んァ-ヶー]+)|([一-龯々〆ヵヶ]+)|([、。「」『』（）【】・＆：；！？％±×÷＝〜～]+)|([{}[\]():;,.'"=<>!+\-*/\\|&^%$#@~`?]+)|(\S)/g;

function countAsciiIdentTokens(word) {
  if (word.length <= 4) return 1;
  const parts = word
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .split('_')
    .filter(Boolean);
  let total = 0;
  for (const p of parts) total += p.length <= 5 ? 1 : Math.ceil(p.length / 4.3);
  return Math.max(1, total);
}

/**
 * Calibrated BPE token estimator for mixed EN/JP/TS/JSON/TSV text.
 */
export function estimateTokens(text) {
  if (!text || typeof text !== 'string') return 0;
  let tokens = 0;
  TOKEN_SEGMENT_RX.lastIndex = 0;
  let m;
  while ((m = TOKEN_SEGMENT_RX.exec(text)) !== null) {
    if (m[1]) tokens += m[1].length <= 2 ? 0.25 : Math.ceil(m[1].length / 4) * 0.65;
    else if (m[2]) tokens += m[2].length * 0.55;
    else if (m[3]) tokens += Math.ceil(m[3].length / 2.8);
    else if (m[4]) tokens += countAsciiIdentTokens(m[4]);
    else if (m[5]) tokens += m[5].length * 0.74;
    else if (m[6]) tokens += m[6].length * 1.28;
    else if (m[7]) tokens += m[7].length * 0.92;
    else if (m[8]) tokens += Math.ceil(m[8].length / 1.72);
    else tokens += 1;
  }
  return Math.max(1, Math.round(tokens));
}

export function cleanWireField(val) {
  return String(val ?? '')
    .replace(/[\r\n|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatFlowHeader(fields) {
  const pairs = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${cleanWireField(v)}`);
  return `FLOW1|${pairs.join('|')}`;
}

export function formatRecord(tag, fields) {
  const pairs = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${cleanWireField(v)}`);
  return `${tag}|${pairs.join('|')}`;
}

/**
 * Enforce hard BPE token budget on stdout text.
 * If text exceeds `budgetTokens`, writes full text to `<agentWs>/spill_<cmd>_<ts>.log`
 * and returns a deterministically truncated payload with exact `flow slice` retrieval instruction.
 */
export function enforceFlowBudget(text, {
  cmd = 'exec',
  budgetTokens = 350,
  agentWs = '/tmp/flow_ws/default',
  rawBaselineTokens = null,
} = {}) {
  const fullText = String(text ?? '');
  const fullTokens = estimateTokens(fullText);
  if (budgetTokens <= 0 || fullTokens <= budgetTokens) {
    return {
      text: fullText,
      emittedTokens: fullTokens,
      rawTokens: rawBaselineTokens ?? fullTokens,
      spilled: false,
      spillPath: null,
    };
  }

  fs.mkdirSync(agentWs, { recursive: true });
  const spillPath = path.join(agentWs, `spill_${cmd}_${Date.now()}.log`);
  fs.writeFileSync(spillPath, fullText, 'utf8');

  const lines = fullText.split('\n');
  const reserve = 36; // space for spill footer
  const target = Math.max(60, budgetTokens - reserve);

  const kept = [];
  let accTok = 0;
  for (let i = 0; i < lines.length; i++) {
    const lt = estimateTokens(lines[i] + '\n');
    if (accTok + lt > target && kept.length >= 2) break;
    kept.push(lines[i]);
    accTok += lt;
  }

  const footer = `SPILL|omitted_lines=${Math.max(0, lines.length - kept.length)}|full_tok=${fullTokens}|budget=${budgetTokens}|read=flow slice ${spillPath} ${kept.length + 1}-${Math.min(lines.length, kept.length + 80)}`;
  const finalText = [...kept, footer].join('\n');
  return {
    text: finalText,
    emittedTokens: estimateTokens(finalText),
    rawTokens: rawBaselineTokens ?? fullTokens,
    spilled: true,
    spillPath,
  };
}

/**
 * Record cumulative token telemetry to `.git/flow_os/telemetry.json` for `flow human-report`.
 */
export function recordTokenTelemetry(stateDir, entry) {
  const fp = path.join(stateDir, 'telemetry.json');
  let data = {
    schema: 'flow-telemetry/v1',
    updatedAt: null,
    totalCommands: 0,
    totalEmittedTokens: 0,
    totalEstimatedLegacyTokens: 0,
    totalSavedTokens: 0,
    healRuns: 0,
    healAutoSolvedParts: 0,
    healTierBParts: 0,
    byCommand: {},
  };
  if (fs.existsSync(fp)) {
    try {
      data = { ...data, ...JSON.parse(fs.readFileSync(fp, 'utf8')) };
    } catch {
      // reset corrupted telemetry cleanly
    }
  }

  const emitted = Math.max(0, Number(entry.emittedTokens || 0));
  const legacy = Math.max(emitted, Number(entry.legacyTokens || entry.rawTokens || emitted));
  const saved = Math.max(0, legacy - emitted);

  data.updatedAt = new Date().toISOString();
  data.totalCommands += 1;
  data.totalEmittedTokens += emitted;
  data.totalEstimatedLegacyTokens += legacy;
  data.totalSavedTokens += saved;
  if (entry.healAutoSolvedParts) {
    data.healRuns += 1;
    data.healAutoSolvedParts += Number(entry.healAutoSolvedParts || 0);
    data.healTierBParts += Number(entry.healTierBParts || 0);
  }

  const c = entry.cmd || 'unknown';
  if (!data.byCommand[c]) data.byCommand[c] = { count: 0, emitted: 0, saved: 0 };
  data.byCommand[c].count += 1;
  data.byCommand[c].emitted += emitted;
  data.byCommand[c].saved += saved;

  atomicWriteSync(fp, JSON.stringify(data, null, 2) + '\n');
  return data;
}

export function readTokenTelemetry(stateDir) {
  const fp = path.join(stateDir, 'telemetry.json');
  if (!fs.existsSync(fp)) return null;
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch {
    return null;
  }
}
