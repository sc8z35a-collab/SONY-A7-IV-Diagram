# `sokutei` — AI Agent Operations Manual (Automated Benchmark & Load Profiler)

> **Purpose**: Zero-dependency, statistically rigorous benchmark & system load profiler (`scripts/sokutei.mjs`) measuring **all 10 repository domains (55+ metrics)** with a single command — OR targeting any specific domain, 3D unit, quality tier, custom JSON profile, or arbitrary shell command.
> **Hygiene Rule (STRICT)**: Write reports to `--out=/tmp/...` and `--md=/tmp/...`. All internal temp workspaces live under `/tmp/sokutei-*` and auto-clean on exit.

---

## 1. AI Quick Decision Matrix (Full Auto vs Custom Target)

| AI Intent | Single Command |
|---|---|
| **Full 10-domain auto-benchmark (1 command!)** | `npm run sokutei` |
| **Full 10-domain fast smoke check** (`runs=1, warmup=0`) | `npm run sokutei -- --quick --json` |
| **Full 10-domain rigorous publication run** (`runs=3, warmup=1`) | `npm run sokutei -- --rigorous --out=/tmp/after.json --md=/tmp/after.md` |
| **Save untouched baseline before optimizing** | `npm run sokutei -- --all --save-baseline=/tmp/sokutei_before.json --md=/tmp/sokutei_before.md` |
| **Before/After statistical comparison + speedup gate** | `npm run sokutei -- --all --compare=/tmp/sokutei_before.json --assert-speedup=6.0 --out=/tmp/after.json --md=/tmp/after.md` |
| **Measure ONLY specific domain(s)** | `npm run sokutei -- --target=pp,validate,sim_app --compare=/tmp/sokutei_before.json` |
| **Measure ONLY specific 3D unit(s) & tier(s)** | `npm run sokutei -- --target=v2_unit --units=welcome,evf,lens --tiers=high,ultra --runs=3` |
| **Measure ALL 22 V2 units across all 4 tiers** | `npm run sokutei -- --target=v2_unit --units=all --tiers=standard_lite,standard,high,ultra --runs=1` |
| **Measure ONLY specific `pp1.1` preset(s)** | `npm run sokutei -- --target=pp --pp-presets=audit,ui_only --runs=2` |
| **Custom JSON benchmark specification** | `npm run sokutei -- --custom='{"targets":["v2_unit","sim_app"],"units":["evf"],"tiers":["ultra"],"runs":3,"warmup":1}' --json` |
| **Profile ANY arbitrary shell command** | `npm run sokutei -- --cmd="node scripts/validate_parts.mjs --full" --runs=2 --warmup=1 --json` |
| **List all 10 domains & 55+ metrics (0 cost)** | `npm run sokutei -- --list` |

---

## 2. All 10 Measurable Domains & Metric Inventory

| Domain ID (`--target=`) | Target System / Location | Primary Speed Metrics | Load & Health Telemetry |
|---|---|---|---|
| `build` | TypeScript (`tsc --noEmit`) + Vite production build (isolated `/tmp` outDir) | `tsc_ms`, `vite_build_ms` | `bundle_total_kb`, `bundle_max_chunk_kb`, `bundle_gzip_kb`, Peak RSS, chunk count |
| `v2_unit` | Headless Universal V2 3D Engine (`src/core/v2_unit_compiler.ts`, `raycast_engine.ts`) | `build_total_ms`, `build_avg_ms`, `explode_us_per_op`, `visual_state_us_per_op`, `raycast_click_us_per_op` | `dispose_total_ms`, `maxLeakedCacheRefs` (must be `0`), per-unit draw calls & triangles |
| `webgl` | Real Headless Chrome WebGL2 / CDP render (`docs/` static bundle) | `page_load_ms`, `first_ready_ms`, `frame_high_ms`, `frame_lite_ms`, `unit_switch_ms`, `mobile_frame_ms` | `js_heap_mb`, DOM nodes, layout/script duration, shader warmup ms, VRAM zero-leak check |
| `pp` | `pp1.1` Visual Capture Engine (`scripts/pp.mjs` — warm daemon + transparent cold ref) | `audit_total_ms`, `welcome_total_ms`, `mobile_total_ms`, `ui_only_total_ms`, `single_cad_total_ms` | `*_ms_per_shot`, `auditColdMs`, Peak RSS, CPU%, output KB |
| `validate` | CI Guardrail (`scripts/validate_parts.mjs` — `--full` & incremental) | `validate_full_ms`, `validate_incr_ms` | `validate_peak_rss_mb`, CPU%, parallel efficiency % |
| `catalog` | 3-Tier Part Catalog Generator (`scripts/generate_catalogs.mjs` — `--full` & incremental) | `catalog_full_ms`, `catalog_incr_ms` | `catalog_peak_rss_mb`, isolated `--out-dir` verification |
| `mirai` | FH MIRAI 2028 Content Compiler (`scripts/build_mirai_content.mjs`) | `mirai_full_ms`, `mirai_incr_ms` | Peak RSS |
| `wlk220` | WLK-220 Industrial Verification Suite (`scripts/verify_wlk220_industrial.mjs`) | `wlk220_dfm3d_ms` | Peak RSS, 220-part DFM collision check |
| `sim_app` | In-App Engineering & Optical Simulators (`CameraEngineeringGrader`, `PlyaVerificationPipeline`, `LensOpticalSim`) | `grader_n220_ms`, `plya_n220_ms`, `lens_chief_ray_us`, `lens_5scenarios_ms` | Verified 1000-pt PLYA score parity |
| `bg_bench` | Buchigire Guard v1 (`scripts/bg.mjs` `status` + 20-case chaos `selftest`) | `bg_status_ms`, `bg_selftest_ms` | Selftest Peak RSS, 20/20 chaos oracle PASS |

---

## 3. CLI Flags & Precision Profiles

### Selection Flags
- `--all` — Measure all 10 domains (default when neither `--target` nor `--cmd` is supplied)
- `--target=<d1,d2,...>` (alias `--targets=`) — Comma-separated subset of domain IDs (or `all`)
- `--units=<u1,u2,...|all>` — Unit filter for `v2_unit` (default: `welcome,evf,integrated`)
- `--tiers=<t1,t2,...>` — Tier filter for `v2_unit` (default: `standard_lite,high,ultra`)
- `--pp-presets=<p1,p2,...>` — Preset filter for `pp` (default: `audit,welcome,mobile,ui_only,single_cad`)
- `--custom='<json>'` — Structured override: `{"targets":[...],"units":[...],"tiers":[...],"ppPresets":[...],"runs":3,"warmup":1,"cmd":"...","quick":false,"rigorous":false}`
- `--cmd="<shell command>"` — Measure any arbitrary command (wall time, CPU%, parallel efficiency%, Peak RSS, exit code)
- `--list` — Print all 10 domains and metric keys without running benchmarks

### Sampling & Statistical Rigor Flags
| Profile / Flag | Warmup | Timed Runs | Use Case |
|---|---:|---:|---|
| `--quick` | `0` | `1` | Fast smoke check during active editing |
| Default (`standard`) | `0` | `2` | Everyday development comparison |
| `--rigorous` | `1` | `3` | High-confidence Before/After verification |
| `--warmup=N --runs=M` | `N` | `M` | Custom sample budget |

Every metric automatically computes: `n`, `min`, `max`, `mean`, `median` (`p50`), `p95`, `p99`, `stddev`, `cvPct` (flags `noisy: true` when `CV > 10%`), Student-t `ci95` (`[lo, hi]`), IQR `outliers`, and raw `samples`.

### Output, Comparison & Regression Gate Flags
- `--save-baseline=<path.json>` / `--out=<path.json>` — Write full JSON report
- `--md=<path.md>` — Write Markdown report (with Before/After tables when `--compare` is set)
- `--compare=<baseline.json>` — Computes per-metric `speedupMedianX`, `deltaPct`, Welch's t-test `significant`, per-domain `geoMeanSpeedupX`, overall `geoMeanSpeedupX`, `domainBalancedGeoMeanX`, `maxSpeedupX`, `countOver6x`, `countOver10x`
- `--assert-speedup=<X>` — Exits with code `2` if `geoMeanSpeedupX < X` (CI performance gate!)
- `--json` — Emit pure JSON to stdout for direct AI consumption

---

## 4. Machine-Readable JSON Output Schema

```json
{
  "schema": "sokutei/v1",
  "timestamp": "2026-11-27T14:30:00.000Z",
  "env": { "cpuModel": "...", "cpuCores": 2, "totalMemGb": 7.8, "nodeVersion": "v22.23.5", "gitSha": "...", "gitBranch": "..." },
  "config": { "profile": "rigorous", "targets": ["..."], "runs": 3, "warmup": 1 },
  "totalWallMs": 12450.2,
  "domains": {
    "sim_app": {
      "wallMs": 412.5,
      "metrics": {
        "grader_n220_ms": { "n": 3, "unit": "ms", "median": 0.283, "mean": 0.285, "p95": 0.295, "cvPct": 1.4, "ci95": [0.275, 0.295], "noisy": false }
      },
      "load": { "syntheticParts": 220, "verifiedPlyaScore": 912 }
    }
  },
  "comparison": {
    "comparedMetrics": 26,
    "geoMeanSpeedupX": 7.42,
    "domainBalancedGeoMeanX": 6.85,
    "maxSpeedupX": 42.8,
    "countOver6x": 16,
    "countOver10x": 10
  }
}
```

### Exit Codes
- `0` — All selected domains succeeded (and `--assert-speedup` passed if specified)
- `1` — Runtime / domain error
- `2` — Performance regression gate failed (`--assert-speedup` threshold not met)

---

## 5. Recommended AI Optimization Workflow

1. **Record untouched baseline**: `npm run sokutei -- --target=<domain> --runs=2 --warmup=1 --save-baseline=/tmp/base.json`
2. **Implement lossless optimization** (verify exact output parity via `pp1.1 --diff`, `diff -rq`, or numerical bit-exact test)
3. **Rebuild if `src/` changed**: `npm run build`
4. **Verify speedup quantitatively**: `npm run sokutei -- --target=<domain> --runs=2 --warmup=1 --compare=/tmp/base.json --md=/tmp/diff.md`
