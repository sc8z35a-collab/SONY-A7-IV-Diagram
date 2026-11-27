/**
 * sokutei — Statistical Rigor & Before/After Speedup Analysis Engine
 * Zero external dependencies. Computes exact descriptive statistics, Student-t 95% CI,
 * IQR outlier counts, CV% noise flags, Welch's t-test significance, and geometric-mean speedup.
 */

// Two-tailed Student-t critical values for 95% CI (alpha = 0.05) indexed by df = 1..30
const T_CRIT_95 = [
  0,
  12.706, 4.303, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262, 2.228,
  2.201, 2.179, 2.160, 2.145, 2.131, 2.120, 2.110, 2.101, 2.093, 2.086,
  2.080, 2.074, 2.069, 2.064, 2.060, 2.056, 2.052, 2.048, 2.045, 2.042,
];

function tCritical95(df) {
  if (df <= 0) return 0;
  const k = Math.max(1, Math.round(df));
  return k < T_CRIT_95.length ? T_CRIT_95[k] : 1.96;
}

export function roundNum(v, decimals = 3) {
  if (typeof v !== 'number' || !Number.isFinite(v)) return 0;
  const f = 10 ** decimals;
  return Math.round(v * f) / f;
}

export function quantileSorted(sorted, q) {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

/**
 * Compute full statistical summary over raw numeric samples.
 */
export function summarizeSamples(rawValues, unit = 'ms', decimals = 3) {
  const vals = rawValues.filter((v) => typeof v === 'number' && Number.isFinite(v));
  const n = vals.length;
  if (n === 0) {
    return {
      n: 0,
      unit,
      min: 0,
      max: 0,
      mean: 0,
      median: 0,
      p50: 0,
      p95: 0,
      p99: 0,
      stddev: 0,
      cvPct: 0,
      ci95: [0, 0],
      outliers: 0,
      noisy: false,
      samples: [],
    };
  }

  const sorted = [...vals].sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < n; i++) sum += sorted[i];
  const mean = sum / n;

  let varSum = 0;
  for (let i = 0; i < n; i++) {
    const d = sorted[i] - mean;
    varSum += d * d;
  }
  const variance = n > 1 ? varSum / (n - 1) : 0;
  const stddev = Math.sqrt(variance);
  const cvPct = mean > 1e-12 ? (stddev / Math.abs(mean)) * 100 : 0;

  const q25 = quantileSorted(sorted, 0.25);
  const median = quantileSorted(sorted, 0.5);
  const q75 = quantileSorted(sorted, 0.75);
  const p95 = quantileSorted(sorted, 0.95);
  const p99 = quantileSorted(sorted, 0.99);

  const iqr = q75 - q25;
  const loFence = q25 - 1.5 * iqr;
  const hiFence = q75 + 1.5 * iqr;
  let outliers = 0;
  if (n >= 4 && iqr > 0) {
    for (let i = 0; i < n; i++) {
      if (sorted[i] < loFence || sorted[i] > hiFence) outliers++;
    }
  }

  const se = n > 1 ? stddev / Math.sqrt(n) : 0;
  const halfCi = n > 1 ? tCritical95(n - 1) * se : 0;

  return {
    n,
    unit,
    min: roundNum(sorted[0], decimals),
    max: roundNum(sorted[n - 1], decimals),
    mean: roundNum(mean, decimals),
    median: roundNum(median, decimals),
    p50: roundNum(median, decimals),
    p95: roundNum(p95, decimals),
    p99: roundNum(p99, decimals),
    stddev: roundNum(stddev, decimals),
    cvPct: roundNum(cvPct, 2),
    ci95: [roundNum(mean - halfCi, decimals), roundNum(mean + halfCi, decimals)],
    outliers,
    noisy: n >= 2 && cvPct > 10.0,
    samples: vals.map((v) => roundNum(v, decimals)),
  };
}

/**
 * Compare two statistical summaries (Before vs After).
 * For latency metrics (`lowerIsBetter = true`), speedupX = before / after (>1 = faster).
 * For throughput metrics (`lowerIsBetter = false`), speedupX = after / before (>1 = faster).
 */
export function compareStats(before, after, lowerIsBetter = true) {
  const bMed = typeof before === 'number' ? before : before?.median ?? before?.mean ?? 0;
  const aMed = typeof after === 'number' ? after : after?.median ?? after?.mean ?? 0;
  const bMean = typeof before === 'number' ? before : before?.mean ?? bMed;
  const aMean = typeof after === 'number' ? after : after?.mean ?? aMed;

  const safeDiv = (num, den) => (den > 1e-9 ? num / den : num > 0 ? 999 : 1);
  const speedupMedianX = lowerIsBetter ? safeDiv(bMed, aMed) : safeDiv(aMed, bMed);
  const speedupMeanX = lowerIsBetter ? safeDiv(bMean, aMean) : safeDiv(aMean, bMean);
  const delta = aMed - bMed;
  const deltaPct = Math.abs(bMed) > 1e-9 ? ((aMed - bMed) / Math.abs(bMed)) * 100 : 0;

  // Welch's t-test when both sides have n >= 2 and non-zero variance
  let welchT = null;
  let significant = null;
  const n1 = before?.n ?? 1;
  const n2 = after?.n ?? 1;
  const s1 = before?.stddev ?? 0;
  const s2 = after?.stddev ?? 0;
  if (n1 >= 2 && n2 >= 2) {
    const v1 = (s1 * s1) / n1;
    const v2 = (s2 * s2) / n2;
    const se = Math.sqrt(v1 + v2);
    if (se > 1e-12) {
      welchT = Math.abs(bMean - aMean) / se;
      const df = (v1 + v2) ** 2 / ((v1 * v1) / (n1 - 1) + (v2 * v2) / (n2 - 1));
      significant = welchT >= tCritical95(df);
    } else {
      significant = Math.abs(bMean - aMean) > 1e-9;
    }
  }

  return {
    unit: after?.unit || before?.unit || 'ms',
    beforeMedian: roundNum(bMed, 3),
    afterMedian: roundNum(aMed, 3),
    beforeMean: roundNum(bMean, 3),
    afterMean: roundNum(aMean, 3),
    speedupMedianX: roundNum(speedupMedianX, 2),
    speedupMeanX: roundNum(speedupMeanX, 2),
    delta: roundNum(delta, 3),
    deltaPct: roundNum(deltaPct, 2),
    welchT: welchT === null ? null : roundNum(welchT, 2),
    significant,
  };
}

export function geometricMean(values) {
  const valid = values.filter((v) => typeof v === 'number' && Number.isFinite(v) && v > 0);
  if (valid.length === 0) return 1.0;
  let logSum = 0;
  for (let i = 0; i < valid.length; i++) logSum += Math.log(valid[i]);
  return roundNum(Math.exp(logSum / valid.length), 3);
}

/**
 * Flatten domain metrics into comparable key -> stat entries for automatic diffing.
 */
export function extractComparableMetrics(report) {
  const out = new Map();
  const domains = report?.domains || {};
  for (const [domId, domData] of Object.entries(domains)) {
    if (!domData || domData.skipped || domData.error) continue;
    const metrics = domData.metrics || {};
    for (const [mKey, mVal] of Object.entries(metrics)) {
      if (mVal && typeof mVal === 'object' && typeof mVal.median === 'number' && mVal.n > 0) {
        out.set(`${domId}.${mKey}`, {
          domain: domId,
          metric: mKey,
          lowerIsBetter: mVal.lowerIsBetter !== false,
          primarySpeedMetric: mVal.primarySpeedMetric !== false,
          stat: mVal,
        });
      }
    }
  }
  return out;
}

export function buildComparisonReport(beforeReport, afterReport) {
  const bMap = extractComparableMetrics(beforeReport);
  const aMap = extractComparableMetrics(afterReport);

  const rows = [];
  const byDomain = {};
  const primarySpeedups = [];
  const allSpeedups = [];

  for (const [fullKey, aEntry] of aMap.entries()) {
    const bEntry = bMap.get(fullKey);
    if (!bEntry) continue;
    const cmp = compareStats(bEntry.stat, aEntry.stat, aEntry.lowerIsBetter);
    const row = {
      key: fullKey,
      domain: aEntry.domain,
      metric: aEntry.metric,
      primarySpeedMetric: aEntry.primarySpeedMetric,
      ...cmp,
    };
    rows.push(row);
    if (!byDomain[aEntry.domain]) byDomain[aEntry.domain] = [];
    byDomain[aEntry.domain].push(row);
    if (cmp.speedupMedianX > 0) {
      allSpeedups.push(cmp.speedupMedianX);
      if (aEntry.primarySpeedMetric) primarySpeedups.push(cmp.speedupMedianX);
    }
  }

  const domainSummary = {};
  for (const [dom, domRows] of Object.entries(byDomain)) {
    const pri = domRows.filter((r) => r.primarySpeedMetric).map((r) => r.speedupMedianX);
    const use = pri.length > 0 ? pri : domRows.map((r) => r.speedupMedianX);
    domainSummary[dom] = {
      count: domRows.length,
      geoMeanSpeedupX: geometricMean(use),
      maxSpeedupX: roundNum(Math.max(...use, 0), 2),
      minSpeedupX: roundNum(Math.min(...use, 0), 2),
    };
  }

  const speedList = primarySpeedups.length > 0 ? primarySpeedups : allSpeedups;
  const domainGeos = Object.values(domainSummary).map((d) => d.geoMeanSpeedupX).filter((v) => v > 0);
  const geoMeanSpeedupX = geometricMean(speedList);
  const domainBalancedGeoMeanX = geometricMean(domainGeos);
  const maxSpeedupX = speedList.length > 0 ? roundNum(Math.max(...speedList), 2) : 0;
  const minSpeedupX = speedList.length > 0 ? roundNum(Math.min(...speedList), 2) : 0;
  const countOver6x = speedList.filter((v) => v >= 6.0).length;
  const countOver10x = speedList.filter((v) => v >= 10.0).length;

  return {
    comparedMetrics: rows.length,
    geoMeanSpeedupX,
    domainBalancedGeoMeanX,
    maxSpeedupX,
    minSpeedupX,
    countOver6x,
    countOver10x,
    domainSummary,
    rows,
  };
}

export function renderMarkdownReport(report, comparison = null) {
  const lines = [];
  const env = report.env || {};
  lines.push(`# sokutei 高精度ベンチマーク & 処理負荷測定レポート`);
  lines.push('');
  lines.push(`- **計測日時**: \`${report.timestamp}\``);
  lines.push(`- **Git Commit**: \`${env.gitSha || 'unknown'}\` (${env.gitBranch || 'unknown'}${env.gitDirty ? ', dirty' : ''})`);
  lines.push(`- **ハードウェア**: ${env.cpuModel || 'unknown'} (${env.cpuCores || '?'} cores, ${env.totalMemGb || '?'} GB RAM) | Node ${env.nodeVersion || '?'}`);
  lines.push(`- **計測設定**: mode=\`${report.config?.profile || 'standard'}\`, warmup=\`${report.config?.warmup ?? 0}\`, runs=\`${report.config?.runs ?? 1}\`, totalWall=\`${report.totalWallMs} ms\``);
  lines.push('');

  if (comparison) {
    lines.push('## Before / After 統計スピードアップ総括');
    lines.push('');
    lines.push(`| 指標 | 実測値 |`);
    lines.push(`|---|---:|`);
    lines.push(`| 比較対象メトリクス数 | **${comparison.comparedMetrics}** |`);
    lines.push(`| 全指標 幾何平均スピードアップ | **${comparison.geoMeanSpeedupX}×** |`);
    lines.push(`| ドメイン均等 幾何平均スピードアップ | **${comparison.domainBalancedGeoMeanX}×** |`);
    lines.push(`| 最大（部分）スピードアップ | **${comparison.maxSpeedupX}×** |`);
    lines.push(`| 6×以上達成項目数 / 10×以上達成項目数 | **${comparison.countOver6x}** / **${comparison.countOver10x}** |`);
    lines.push('');

    lines.push('### ドメイン別スピードアップ要約');
    lines.push('');
    lines.push('| ドメイン | 項目数 | 幾何平均倍率 | 最大倍率 | 最小倍率 |');
    lines.push('|---|---:|---:|---:|---:|');
    for (const [dom, ds] of Object.entries(comparison.domainSummary)) {
      lines.push(`| \`${dom}\` | ${ds.count} | **${ds.geoMeanSpeedupX}×** | **${ds.maxSpeedupX}×** | ${ds.minSpeedupX}× |`);
    }
    lines.push('');

    lines.push('### 全項目 Before / After 詳細比較');
    lines.push('');
    lines.push('| 項目 | Before (p50) | After (p50) | 倍率 | 変化率 | 有意差 |');
    lines.push('|---|---:|---:|---:|---:|:---:|');
    for (const r of comparison.rows) {
      const sig = r.significant === null ? '-' : r.significant ? 'YES' : 'no';
      lines.push(
        `| \`${r.key}\` | ${r.beforeMedian} ${r.unit} | ${r.afterMedian} ${r.unit} | **${r.speedupMedianX}×** | ${r.deltaPct >= 0 ? '+' : ''}${r.deltaPct}% | ${sig} |`
      );
    }
    lines.push('');
  }

  lines.push('## ドメイン別 詳細計測結果');
  lines.push('');
  for (const [domId, dom] of Object.entries(report.domains || {})) {
    lines.push(`### \`${domId}\` (${dom.wallMs ?? 0} ms)`);
    if (dom.skipped) {
      lines.push(`- *Skipped*: ${dom.reason || 'unavailable'}`);
      lines.push('');
      continue;
    }
    if (dom.error) {
      lines.push(`- **Error**: \`${dom.error}\``);
      lines.push('');
      continue;
    }
    const metrics = dom.metrics || {};
    const mKeys = Object.keys(metrics);
    if (mKeys.length > 0) {
      lines.push('| 指標 | p50 (中央値) | 平均 | p95 | 最小〜最大 | CV% | 95% CI |');
      lines.push('|---|---:|---:|---:|---:|---:|---:|');
      for (const k of mKeys) {
        const m = metrics[k];
        if (!m || typeof m !== 'object' || typeof m.median !== 'number') continue;
        const warn = m.noisy ? ' (!)' : '';
        lines.push(
          `| \`${k}\` | **${m.median} ${m.unit}** | ${m.mean} | ${m.p95} | ${m.min}–${m.max} | ${m.cvPct}%${warn} | [${m.ci95?.[0]}, ${m.ci95?.[1]}] |`
        );
      }
      lines.push('');
    }
    if (dom.load && Object.keys(dom.load).length > 0) {
      lines.push(`- **負荷メトリクス**: \`${JSON.stringify(dom.load)}\``);
      lines.push('');
    }
  }
  return `${lines.join('\n')}\n`;
}
