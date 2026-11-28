# THE LAST EXAM V1 & Play Ground PLYA V2 — Implementation Walkthrough

> [!IMPORTANT]
> **Branch**: `feat/feat-the-last-exam-v1` (pushed to `origin/feat/feat-the-last-exam-v1`)  
> **Gate Receipt**: `BG-RECEIPT:05d7fd32:origin/feat/feat-the-last-exam-v1:integrator:87a53adf` (`VERDICT=PASS`, `8/8`, `warn=0`, `fail=0`)

---

## 1. THE LAST EXAM V1 (`node scripts/exam.mjs`)

Built a single-command, strictly AI-optimized (`TLX1` wire protocol), zero-compromise multi-physics & manufacturing verification suite that upgrades the 24-engine `sim20` blueprint into **10 Pillars · 36 Engines (`EX01..EX36`) · 530 Fixed Atomic Tests (`T001..T530`) · 113,000–119,000+ Expanded Checks · 16 Independent External Industrial Toolchains (32/32 Verified) · 16 Cross-Solver Conservation Locks (`X01..X16`)**.

### Provisioned Real External Industrial Solvers & Native C++ Harnesses (`32/32 READY`)
- Setup & verification script: [exam_setup.sh](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam_setup.sh)
- **4 Compiled Native C++17 Harnesses** (`scripts/exam/native/src/`):
  - [cgal_geom_kernel.cpp](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/native/src/cgal_geom_kernel.cpp) — CGAL 5.6 Exact Kernel manifold, self-intersection, exact volume, inward ray-SDF wall thickness, 6-axis CNC cutter accessibility.
  - [fcl_ccd_router.cpp](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/native/src/fcl_ccd_router.cpp) — FCL 0.7 OBBRSS BVH exact clash, nearest surface distance/normals, Continuous Collision Detection (CCD) explode sweep, and 3D A* obstacle-avoiding harness router.
  - [bullet_ode_multibody.cpp](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/native/src/bullet_ode_multibody.cpp) — Dual independent 3D rigid-body multibody physics (Bullet 3.24 6-orientation gravity settling + 25° tilt + 2G vibration + 1.0m drop shock + independent ODE cross-check).
  - [occt_step_analyzer.cpp](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/native/src/occt_step_analyzer.cpp) — OpenCASCADE 7.6 + Eigen3 exact inertia tensor, principal axes, packing fill ratio, draft angle, slenderness.
- **External Industrial Toolchains Integrated**: CalculiX `ccx` 2.21, Gmsh 4.12 / TetGen / Netgen, OpenFOAM 1912 (`blockMesh` + `buoyantSimpleFoam`), Berkeley `ngspice` 42 + GNU `gnucap`, KiCad 7.0.11 (`kicad-cli` + `pcbnew` DRC), FreeFEM++ 4.13, Z3 SMT 4.8.12, COIN-OR CBC 2.10 / GLPK, Yosys 0.33 + Verilator 5.020 + Icarus Verilog, KLayout 0.28.16 + Magic + Netgen-LVS, Qhull, SciPy/NumPy/SymPy/NetworkX/OpenCV/scikit-image, plus Chrome `pp1.1`.

### Core Architecture & AI-Native Documentation
- CLI Entrypoint: [exam.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam.mjs) (registered in [package.json](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/package.json) as `exam`, `tlx`, `sim20` and documented in Section 6 of [AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md))
- AI-Only Specification & Manual: [THE_LAST_EXAM_V1_MANUAL.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/THE_LAST_EXAM_V1_MANUAL.md)
- Registry, IR Compiler, Material DB, DAG Scheduler & Wire Protocol:
  - [test_registry.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/test_registry.mjs) (10 pillars, 36 engines, 530 fixed atomic tests, 16 cross-solver locks)
  - [ir_compiler.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/ir_compiler.mjs) (deterministic `TLX-IR`, Float64 `TLXM` binary exporter, `src=file:line` reverse index, `--playground=<file.tlx.json>` loader)
  - [material_physics_db.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/shared/material_physics_db.mjs) (160+ real engineering materials mapped from `v2_material_catalog.ts`)
  - [scheduler.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/scheduler.mjs) (DAG dependency + `/proc/meminfo` RAM budget + atomic `checkpoint.ndjson` `--resume`)
  - [tlx1_protocol.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/tlx1_protocol.mjs) (machine-native `TLX1` wire format, `fix=SHIFT/ISOLATE/...` directives, tamper-evident `TLX1-RECEIPT`, queryable `/tmp/tlx_runs/<runId>/results.ndjson` DB)
  - [cross_solver_lock.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/engines/cross_solver_lock.mjs) & [selftest_oracle.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/engines/selftest_oracle.mjs) (anti-cheat self-proof oracle with 7 physical defect injections + strict per-engine test-ID alignment lock)

---

## 2. Play Ground PLYA V2 Overhaul (EXAM-Inherited Engine)

Completely replaced the legacy 8-tool Box3 heuristic pipeline with **PLYA V2**, inheriting THE LAST EXAM V1's real geometry and physics directly into the browser:

- [ExactMeshBvh.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/exam_core/ExactMeshBvh.ts) — Decodes each placed part's real `QuantizedGeoPack` triangles, computes signed volume/surface area, builds Flat BVHs, performs dual-BVH exact triangle-triangle clash + Jordan ray-parity solid containment + exact nearest surface distance & normals + exact ray-BVH intersections.
- [MaterialPhysicsDb.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/exam_core/MaterialPhysicsDb.ts) — Synchronized browser material physics table ($\rho, E, \sigma_y, k, \alpha_{\text{CTE}}, E^\circ_{\text{galv}}$).
- [BrowserPhysicsSolvers.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/exam_core/BrowserPhysicsSolvers.ts) — **16 browser multi-physics solvers / 128 atomic assertions (`PG-T001..PG-T128`)** including grounded contact graph + minimum `repairShiftsMm`, 2D convex-hull tipping polygon, `[K]{u}={F}` static FEA + modal `f1`, air-gap thermal matrix `[G]{T}={P}` (floating heatsinks genuinely overheat!), MNA SPICE IR drop / 3.3V brownout, 3D raycast wiring, 2,000-ray BVH Monte-Carlo optics, Helmholtz acoustics, galvanic $\Delta E^\circ$, and Arrhenius MTBF.
- [ExamPlaygroundWorker.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/exam_core/ExamPlaygroundWorker.ts) — Dedicated Vite Module WebWorker for non-blocking background evaluation during 3D part drags.
- [PlyaVerificationPipeline.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/PlyaVerificationPipeline.ts) — 16-solver / 128-assertion pipeline + **4 real industrial exporters**: KiCad (`.kicad_sch`), ngspice (`.cir`), CalculiX FEA (`.inp`), and **THE LAST EXAM V1 workspace (`.tlx.json`)** for direct `node scripts/exam.mjs --playground=<file>` handoff.
- [CadPlaygroundStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/CadPlaygroundStudio.ts) & [main.css](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/styles/main.css) — Wired real mesh `blueprint` + `worldMatrixElements`, topbar `EXAM` strictness selector (`標準` / `極限`), 3D overlays (emerald 2D convex-hull support polygon, CoG plumb line, cyan 3D repair shift vectors), **1-click `⚡ EXAM自動修復`** button (`applyExamAutoRepair`), refreshed 16-solver / 128-assertion expandable report modal, and 4-format export controls.

### Visual Verification (`pp1.1 --preset=playground`)

````carousel
![Play Ground 1.1 Studio with PLYA V2 topbar, EXAM strictness selector, 2D convex-hull support polygon, CoG plumb line, and cyan 3D repair vectors](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/1503785f-bfeb-42ad-8868-21c62addc467/pp_playground_studio.png)
<!-- slide -->
![PLYA V2 Report Modal showing 16 EXAM-inherited solvers, 128 atomic assertions, 1-click EXAM Auto-Repair button, 10-axis radar, and expanded physical telemetry](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/1503785f-bfeb-42ad-8868-21c62addc467/pp_playground_1000pt_report.png)
````

---

## 3. Verified Execution & Gate Results

| Verification Suite | Command / Target | Real Verified Result |
|---|---|---|
| **EXAM V1 Anti-Cheat Selftest Oracle** | `node scripts/exam.mjs selftest` | **PASS `75/75`** (`36/36` healthy engines + `16/16` conservation locks + `23/23` defect injections + 1-to-1 engine test-ID alignment, `19.62s`, `sv=32/32`) |
| **Full Real Unit: `welcome` (435 parts)** | `node scripts/exam.mjs --unit=welcome --progress` | **All 36 engines / 530 tests / 119,438 expanded checks** in `56.86s`, **`err=0`**, **`X_SUM|ok=16/16`**, accurately flagged `welcome`'s real floating parts, galvanic Mg-Cu contacts, open shells, & 2-island OpenCV silhouettes (`query` & `--resume` also verified) |
| **Full Real Unit: `original` (RIIMOS E1)** | `node scripts/exam.mjs --unit=original --progress` | **All 36 engines / 530 tests / 113,213 expanded checks** in `29.22s`, **`err=0`**, **`X_SUM|ok=16/16`** |
| **PLYA V2 Physics & Industrial Bridge** | Scratch suite on `PlyaVerificationPipeline.ts` | **14/14 PASS** (`51.5ms`, floating heatsink genuinely overheats `25°C -> 154°C`, 1-click auto-repair restores `0` float & `25°C`, Jordan containment catches nested clash, real `ngspice` + `ccx` solved exported decks, and `exam.mjs --playground=.tlx.json` passed **`148/148`, `zdp=1.0000`**) |
| **Catalog, TypeScript, Validator & Build** | `npm run catalog && npx tsc --noEmit && node scripts/validate_parts.mjs && npm run build` | **EXIT 0** (0 TS errors, 2,937 parts / 23 modes validated, `ExamPlaygroundWorker` bundled cleanly into `docs/`) |
| **Visual Capture (`pp1.1`)** | `npm run pp -- --warm --preset=playground` & `--preset=audit --fast` & `--daemon=stop` | **PASS** (1366px topbar fit verified, PLYA V2 16-solver modal & 3D overlays inspected, daemon stopped cleanly) |
| **Integrator Completion Gate (`bg`)** | `npm run bg -- gate --policy=integrator --run-checks --require-checks --ai` | **`VERDICT=PASS (8/8)`** · **`BG-RECEIPT:05d7fd32:origin/feat/feat-the-last-exam-v1:integrator:87a53adf`** |
