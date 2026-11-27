# `pp1.1` — AI Agent Operations Manual (Hyper-Accelerated Lossless Visual Capture Engine)

> **Purpose**: Zero-dependency, 100%-lossless visual capture & 6-DoF studio camera CLI (`scripts/pp.mjs`).
> **Prerequisite**: Run `npm run build` after editing `src/` so `docs/` is current.
> **Hygiene Rule (STRICT)**: Always output to `--out=/tmp/...` (or artifact dir). NEVER leave PNG/WebP files in repository root. Stop warm daemon (`--daemon=stop`) when finished.

---

## 1. AI Quick Decision Matrix (Task → Single Command)

| Goal | Recommended Command |
|---|---|
| **Full 6-shot QA audit** (welcome/UI/CAD/diagram/explanation) | `npm run pp -- --warm --preset=audit --out=/tmp/pp_audit` |
| **Ultra-fast iterative check** (WebP q=90 + warm daemon) | `npm run pp -- --warm --preset=audit --fast --out=/tmp/pp_fast` |
| **Lossless pixel regression proof vs baseline** (SSIM/PSNR/RMSE) | `npm run pp -- --warm --preset=audit --diff=/tmp/pp_before_ref --json --out=/tmp/pp_diff` |
| **Single part close-up (exact AABB auto-fit + 2× SSAA)** | `npm run pp -- --warm --mode=cad --unit=evf --quality=ultra --fit-part=evf-oled-panel --ssaa=2 --out=/tmp/pp_part` |
| **Internal inspection (cross-section + callout labels)** | `npm run pp -- --warm --mode=cad --unit=evf --quality=ultra --az=35 --el=22 --fov=24 --section=x:0.52 --annotate=8 --out=/tmp/pp_sec` |
| **6-view orthographic engineering sheet + stitched grid** | `npm run pp -- --warm --mode=cad --unit=welcome --quality=high --ortho-pack --contact-sheet=3 --out=/tmp/pp_ortho` |
| **360° turntable orbit (N angles) + contact sheet** | `npm run pp -- --warm --mode=cad --unit=lens --quality=high --turntable=8 --contact-sheet=4 --out=/tmp/pp_spin` |
| **Multi-stage explode strip** | `npm run pp -- --warm --mode=cad --unit=welcome --quality=ultra --explode-sweep=0,0.35,0.7,1.0 --contact-sheet=2 --out=/tmp/pp_exp` |
| **Mobile (390×844 DPR 2) + 90° rotated schematic lightbox** | `npm run pp -- --warm --preset=mobile --out=/tmp/pp_mob` |
| **Play Ground 1.1 + 1000-pt PLYA report** | `npm run pp -- --warm --preset=playground --out=/tmp/pp_pg` |
| **4-Tier quality visual matrix** (`LITE/STD/HIGH/ULTRA`) | `npm run pp -- --warm --preset=tiers --contact-sheet=2 --out=/tmp/pp_tiers` |
| **Instant 0-Chrome unit / part ID discovery** | `npm run pp -- --list-units --json` / `npm run pp -- --list-parts=evf --json` |
| **Stop persistent warm Chrome daemon** | `npm run pp -- --daemon=stop` |

---

## 2. Capture Modes & Built-in Packs

### 6 Modes (`--mode=<m>` or `--modes=m1,m2,...`)
| Mode | Output Content | WebGL Pipeline |
|---|---|---|
| `ui` | App HUD / sidebar / dock only (0-WebGL meta tab) | Skipped (`0-GL`, ~180ms warm) |
| `cad` | Clean 3D WebGL CAD viewport only (UI hidden, zero ghosting) | Full V2 3D |
| `diagram` | Selected part SVG technical schematic only | Skipped (`0-GL`, ~65ms warm) |
| `explanation` | Selected part engineering explanation drawer only | Skipped (`0-GL`, ~105ms warm) |
| `full` | Full composite application view (3D CAD + HUD) | Full V2 3D |
| `custom` | Arbitrary `CaptureCustomOptions` JSON via `--custom='{...}'` | Auto |

### 6 Built-in Packs (`--preset=<pack>`)
- `audit`: 6 shots (`pp_welcome_full`, `pp_welcome_cad_exploded`, `pp_ui_only`, `pp_cad_integrated_lite`, `pp_diagram_only`, `pp_explanation_only`)
- `welcome`: 3 shots (`ultra` full, `ultra` exploded `0.72`, mobile `high`)
- `mobile`: 3 shots (mobile welcome, mobile diagram drawer, mobile 90° landscape lightbox)
- `playground`: 2 shots (Play Ground 1.1 studio + 1000-point Chief Engineer report)
- `tiers`: 4 shots (`standard_lite`, `standard`, `high`, `ultra` on `integrated`)
- `ortho`: 6 shots (`front`, `back`, `left`, `right`, `top`, `iso` on `welcome`)

---

## 3. Free-Form 6-DoF Camera Work Cookbook

### A. 12 Named Camera Presets (`--cam=<name>`)
`iso` · `front` · `side` · `back` · `top` · `bottom` · `left` · `right` · `iso_back` · `iso_top` · `iso_low` · `hero_macro`

### B. Spherical & Relative Orbit Control
| Flag | Meaning | Example |
|---|---|---|
| `--az=<deg>` / `--el=<deg>` | Absolute azimuth (deg) & elevation (`-89..89` deg) | `--az=42 --el=26` |
| `--d-az=<deg>` / `--d-el=<deg>` | Delta offset from `--cam` preset | `--cam=iso --d-az=-18 --d-el=12` |
| `--dist=<mm>` / `--zoom=<x>` | Absolute distance (mm) or zoom factor (`>1` closer) | `--zoom=1.65` |
| `--fov=<deg>` / `--roll=<deg>` | Vertical FOV (`5..120` deg; tele=`22`, wide=`55`) & roll | `--fov=24 --roll=-5` |
| `--pan=dx,dy` | Camera-local screen-space pan offset (mm) | `--pan=12,-4` |

### C. Direct 6-DoF World Coordinates
- `--cam-pos=x,y,z` — Exact camera world position (mm)
- `--cam-target=x,y,z` — Exact `lookAt` world target (mm)
- `--cam-up=x,y,z` — Custom up vector (default `0,1,0`)

### D. Exact Analytical Bounding-Box Auto-Fit (No Trial-and-Error!)
- `--fit-part=<partId>` — Fits camera frustum analytically to a single part's live 3D AABB
- `--fit-parts=<id1,id2,...>` — Fits union AABB of multiple parts (ideal for clearance/interface inspection)
- `--fit-pad=<ratio>` — Framing safety margin multiplier (default `1.18`; use `1.05` for tight macro)
- Combine freely with `--az/--el/--fov/--explode/--section`:
  ```bash
  npm run pp -- --warm --mode=cad --unit=welcome --quality=high --fit-parts=welcome-yo-cnc-chassis,welcome-yo-quartz-prism --az=30 --el=18 --fit-pad=1.15 --out=/tmp/pp_fit
  ```

### E. Multi-Angle Sweeps & Custom Shot Arrays
- `--turntable=<N>` — Generates `N` evenly spaced 360° azimuth shots around current target
- `--ortho-pack` — Generates 6 CAD standard views (`front/back/left/right/top/iso`)
- `--explode-sweep=0,0.4,0.8,1.0` — Generates exploded progression sequence
- `--angles='[{"name":"a","az":20,"el":15,"fov":28},{"name":"b","az":110,"el":40,"explode":0.6}]'` — Arbitrary per-shot overrides in 1 batch

---

## 4. Studio, Sectioning, Part Visibility & App Sub-Views

| Category | Flags | Notes |
|---|---|---|
| **Unit & Render** | `--unit=<id>` `--quality=standard_lite\|standard\|high\|ultra` `--render=solid\|xray\|cad` `--explode=0..1` | 22 registered units (`--list-units`) |
| **Section Cut** | `--section=x:0.52` (`x\|y\|z:<0..1>\|off`) · `--clip-plane=nx,ny,nz,d` | Real WebGL local/world clipping |
| **Part Visibility** | `--part=<id>` `--isolate` `--only=id1,id2` `--hide=id1,id2` `--no-drawer` | Isolate or mask any subset of parts |
| **Studio & Callouts** | `--bg=#0f172a` or `--bg=transparent` · `--annotate[=N]` (default 12) | 2D screen-projected part callout pins |
| **Lens / Fab / Optics** | `--lens-section=1\|2\|3` · `--fab-vol=0..5` `--fab-stage=<id>` · `--optics-studio` `--optics-scenario=<id>` | Direct sub-module state jumps |
| **FH MIRAI 2028** | `--mirai-subview=1..5` `--mirai-edition=beginner\|expert` `--mirai-studio=reports\|matrix\|glossary` | Structure & library studio |
| **Play Ground / Lightbox** | `--playground` `--report` · `--lightbox` `--rotate` · `--physics` `--physics-time=<sec>` · `--perf` | Deterministic state capture |

---

## 5. Resolution, Quality Proof & Performance Controls

| Flag | Effect |
|---|---|
| `--res=720p\|1080p\|1440p\|4k\|mobile\|tablet\|square` | Resolution presets (`--mobile` = `390x844 @ DPR 2`) |
| `--viewport=WxH` `--dpr=N` | Custom CSS viewport & device pixel ratio |
| `--ssaa=2` | 2×2 supersampled render + lossless box-filter downsample (ultra-crisp edges, 0 aliasing) |
| `--format=png\|webp\|jpeg` `--q=1..100` `--fast` | Default `png` (100% lossless); `--fast` = WebP q=90 |
| `--direct-gl` | Zero-compositor direct WebGL canvas PNG readback for pure `cad` |
| `--contact-sheet[=cols]` | Auto-stitches all captured images into `pp_contact_sheet.png` (labeled grid) |
| `--diff=<baselineDir>` | Pure-Node lossless PNG decoder computing exact **RMSE, PSNR (dB), SSIM, changedPct%** + auto-writes `pp_manifest.json` |
| `--warm` / `--daemon=status\|stop` / `--daemon-ttl=180` | Persistent 1-Chrome multi-tab warm daemon (eliminates cold Chrome boot; auto-exits after TTL) |
| `--workers=auto\|N` `--fresh-cache` `--batch=jobs.json` | Tab pool cap, PMREM cache bypass, JSON batch runner |
| `--manifest` `--json` `--prefix=<p>` `--dir=<dist>` | Machine-readable manifest/stdout for AI parsers |

---

## 6. JSON Output & Manifest Schema (`--json` / `pp_manifest.json`)

```json
{
  "engine": "pp1.1",
  "outDir": "/tmp/pp_audit",
  "count": 6,
  "totalMs": 5360,
  "tabsUsed": 2,
  "warmDaemon": true,
  "shots": [
    {
      "name": "pp_welcome_full",
      "file": "/tmp/pp_audit/pp_welcome_full.png",
      "mode": "full",
      "unit": "welcome",
      "quality": "high",
      "viewport": "1366x820@1",
      "bytes": 156400,
      "ms": 620,
      "metaOnly": false,
      "renderCount": 1
    }
  ],
  "contactSheet": "/tmp/pp_audit/pp_contact_sheet.png",
  "diffSummary": {
    "baselineDir": "/tmp/pp_before_ref",
    "comparedCount": 6,
    "avgSsim": 0.997945,
    "maxRmse": 1.42,
    "entries": [{ "name": "pp_diagram_only", "ssim": 1, "psnrDb": 999, "rmse": 0, "changedPct": 0 }]
  }
}
```

---

## 7. AI Troubleshooting Table

| Symptom | Cause | Fix |
|---|---|---|
| Shot shows stale code | `docs/` was not rebuilt after `src/` edit | Run `npm run build`, then `npm run pp -- --daemon=stop` before re-running `--warm` |
| `Unit metadata JSON not found` | Typo in `--unit` | Run `npm run pp -- --list-units` to see exact IDs |
| `--fit-part` didn't frame target | Part ID doesn't belong to `--unit` | Run `npm run pp -- --list-parts=<unit>` to verify exact part ID |
| Transparent background looks white | `--warm` skips alpha override | Omit `--warm` when using `--bg=transparent` (auto-handled by `pp1.1`) |
| Orphan Chrome process | Forgot to stop warm daemon | Run `npm run pp -- --daemon=stop` (or wait for `--daemon-ttl`, default 180s) |
