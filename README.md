# @FLOW_BOOK 2: DOMAIN_SPEC (SONY-A7-IV-Diagram | FLOW-SPEC/v1.1)
> AUDIENCE=AI_AGENTS_ONLY | COMPANION=AGENTS.md (Book 1: ENV_OS) | QUERY: `npm run flow -- doc section 2 <@TAG>`

## @PROJECT_MAP
- App: Sony A7 IV Full-Frame Mirrorless Camera + Special Showcases (`welcome` WLK-435 CNC optical signboard, `original` Exhibit #01 RIIMOS E1 9,700 JPY quadruped, `mirai_2028` 2028 Frontier concepts, `sensor_fab` 6-vol semiconductor fab) 3D CAD WebGL2 Technical Anatomy + Play Ground 1.1 Studio (`PLYA V2.1`).
<!-- @FLOW_AUTO:PROJECT_METRICS -->
- Stack: TypeScript 5.8.2 + Three.js 0.174.0 + Vite 6.2.0 (`dist/` -> `docs/`) + Capacitor 7.6.10 (`android/`).
- Scale: 23 modes (21 individual + 2 composite), 2,937 unique individual parts (3,473 total entries incl. composites), PLYA V2.1 (24 browser solvers / 256 assertions).
<!-- /@FLOW_AUTO:PROJECT_METRICS -->
- Schematics & Rigs: 720x470 HD SVG schematics (`src/ui/schematicsRegistry.ts`), 60fps physics rigs.
- Protected Content Assets (NOT operational manuals): `reports/fh_mirai_2028/*.md` (compiled by `scripts/build_mirai_content.mjs`) and `blueprints/riimos_e1/` (RIIMOS E1 MJCF/Colab/blueprint assets).

## @RENDER_V2_V3_AND_PLYA_V21
- Universal V2 (`src/core/v2_unit_compiler.ts`): All units except bespoke `src/units/mi_shoe.ts` compile via `CompiledV2Unit` -> `ResourceCache` 38 PBR buckets (`src/core/resource_cache.ts`, 0 raw materials), `InstancedMesh`/`BatchedMesh`, flat TypedArray AABB-BVH (`bvhNodes`, stride 8) O(log N) 0-GC raycast, GPU shader explode, `disposeObject3D` VRAM leak=0, plus live cryptographic **`V1.1証明`** verifier (`src/core/v11_seal_verifier.ts`, `src/units/v1_1_certificates.gen.ts`) & clickable HUD warranty modal (`src/ui/ZeroTextControls.ts`).
- 4 Quality Tiers: `standard_lite` (Dual-Atlas Single-Bucket Fusion, ~2-8 draw calls, 16-bit Uint16 IBOs <=65k verts, Fresnel rim, spatial-hash weld); `standard`/`high`/`ultra` (progressive radial segments, 9k/18k/32k batched CAD edges, PMREM IBL, ULTRA zero-jaggy AA).
- Play Ground 1.1 + **`PLYA V2.1 (THE LAST EXAM V1.1 Inherited)`**: `src/playground/CadPlaygroundStudio.ts`, `PlyaVerificationPipeline.ts`, `exam_core/BrowserPhysicsSolvers.ts`, `exam_core/V11BrowserSolversExt.ts`. **12 Pillars / 24 Browser Solvers / 256 Atomic Assertions (`PG-T001..PG-T256`)**, Real-World Boot Readiness % & Six-Sigma Manufacturing Yield % meters, `.tlx11.json` export (`TLX11-PLAYGROUND-BLUEPRINT-V1.1`, bit-exact 0.0001mm canonical 3D SHA-256 parity with `ir_compiler.mjs`), `.v1_1.cert.json` import + **instant automatic V1.1証明 revocation on ANY 3D edit**.
- V3 10 Pillars: Play Ground 1.1 Hyper-Engine (40.05x avg speedup, 0.0 idle draws/s); STD LITE v2 (14.45x arith / 3.23x geo, 0.00% black-crush); ULTRA zero-jaggy AA; Adaptive `FAST<->LITE<->ULTRA` & `PG_FAST<->PG_LITE<->PG_SHARP`; `KINE` 3-layer 0-GC occlusion culling; 16x macro zoom; Load-guarded F1.2 bokeh (`auto`); Vivid electric-blue selection (`CAD_SELECT_SENTINEL`); Mobile 390x844@2 landscape UI & 90-deg lightbox; Locked camera angle in detail view.

## @UNIT_REGISTRY (23 MODES: mode | kind | parts | slug | codes | exam | entry | data)
- `welcome` | indiv | 435 | `welcome-` | W01..W435 | YES | `src/units/welcome.ts` | `src/data/welcome.json`
- `original` | indiv | 128 | `orig-` | OR01..OR128 | YES | `src/units/original.ts` | `src/data/original.json`
- `mishoe` | indiv | 99 | `mi-` | MI01..MI99 | YES | `src/units/mi_shoe.ts`* | `src/data/mi_shoe.json`
- `battery` | indiv | 130 | `bat-` | P01..P130 | YES | `src/units/battery.ts` | `src/data/battery.json`
- `cfexpress` | indiv | 170 | `cfe-` | C01..C170 | YES | `src/units/cfexpress.ts` | `src/data/cfexpress.json`
- `mic` | indiv | 150 | `mc-` | MC01..MC150 | YES | `src/units/mic.ts` | `src/data/mic.json`
- `drybox` | indiv | 186 | `db-` | DB01..DB186 | YES | `src/units/drybox.ts` | `src/data/drybox.json`
- `mount` | indiv | 100 | `mount-` | M22..M100 | YES | `src/units/mount.ts` | `src/data/mount.json`
- `shutter` | indiv | 180 | `shutter-` | SH34..SH180 | YES | `src/units/shutter.ts` | `src/data/shutter.json`
- `body` | indiv | 116 | `body-` | B01..B116 | YES | `src/units/body.ts` | `src/data/body.json`
- `evf` | indiv | 105 | `evf-` | E26..E105 | YES | `src/units/evf.ts` | `src/data/evf.json`
- `lcd` | indiv | 150 | `lcd-` | D01..D150 | YES | `src/units/lcd.ts` | `src/data/lcd.json`
- `lens` | indiv | 128 | `lens-` | L01..L128 | YES | `src/units/lens.ts` | `src/data/lens.json`
- `mainboard` | indiv | 60 | `mb-` | M17..M60 | YES | `src/units/mainboard.ts` | `src/data/mainboard.json`
- `bionz` | indiv | 70 | `xr-` | XR01..XR70 | YES | `src/units/bionz.ts` | `src/data/bionz.json`
- `bionz_v2` | indiv | 105 | `xv2-` | X2-01..X2-105 | YES | `src/units/bionz_v2.ts` | `src/data/bionz_v2.json`
- `sensor` | indiv | 120 | `sensor-` | S35..S120 | YES | `src/units/sensor.ts` | `src/data/sensor.json`
- `micro` | indiv | 75 | `micro-` | M12..M75 | YES | `src/units/micro.ts` | `src/data/micro.json`
- `micro_v2` | indiv | 55 | `pv2-` | P2-01..P2-55 | YES | `src/units/micro_v2.ts` | `src/data/micro_v2.json`
- `sensor_fab` | indiv | 235 | `fab5-` | F0-01..F5-38 | EXCL | `src/units/sensor_fab.ts` | `src/data/sensor_fab.json`
- `mirai_2028` | indiv | 140 | `mirai-` | FH01-01..FH48-18 | EXCL | `src/units/mirai_2028.ts` | `src/data/mirai_2028.json`
- `integrated` | comp | 305 | - | - | YES | `src/units/integrated.ts` | `src/data/integrated.json`
- `camera_body` | comp | 231 | - | - | YES | `src/units/camera_body.ts` | `src/data/camera_body.json`
- Note `*`: `mi_shoe.ts` implements `OptimizedUnit` directly, calls `applyUnitPoseTable()`, and attaches `v11Certification` for 23/23 parity.
- Sub-views: `lensSection=1..3`, `fabVolume=0..5`, `miraiSubView=1..5` (`beginner|expert`), `original` RIIMOS E1 (128p, 9,700 JPY BOM, 0.135J 8-barrel quadruped, L4 MJCF).

## @CODE_3LAYER
- Layer G (`src/units/<U>.pose.tsv`, `src/core/flow_pose_loader.ts`): `id\tdx,dy,dz\trx,ry,rz\tsx,sy,sz\texp_dx,dy,dz\tmat_override\tconstraints`. Identical across `CompiledV2Unit`, `mi_shoe.ts`, and `scene_extractor.mjs` (0.000mm parity).
- Layer M (pure geometry `src/assemblies/<U>/*.ts`, `src/core/cad_primitives.ts`, slim `src/assemblies/types.ts` + auto-gen `diagram_types.gen.ts`): top `@FLOW_MAP` header, 0 duplicate prose (`lazyExplanationStub(id)`).
- Layer L (`src/data/<U>.json`): compact 1-part-per-line JSON (196k -> ~3.6k lines, -98%).
- Indexes (`catalog/`): `INDEX.tsv`, `names/<U>.txt`, `ALL_NAMES.txt`, `spatial/<U>.tsv`, `code/{MAP,SYMBOLS,GRAPH,MATERIALS,HELPERS,SCHEMATICS,CSS_INDEX,DEFECT_MAP}.tsv`.
- Coordinates: Right-handed Y-up, 1 unit = 1 mm; grounded feet near global `minY`; optical axis `+Z`.

## @EXAM_V11_DOMAIN (SSOT Auto-Synced from `scripts/exam/test_registry.mjs`)
<!-- @FLOW_AUTO:EXAM_METRICS -->
- Live Totals (SSOT `test_registry.mjs`): **12 Pillars / 48 Engines / 1080 Fixed Tests (`T001..T1080`) / 48 Real Solvers / 28 Cross-Locks (`X01..X28`)**.
- Per-Pillar Counts: `P01:112t(5e) P02:114t(5e) P03:44t(2e) P04:136t(6e) P05:49t(2e) P06:96t(4e) P07:90t(4e) P08:44t(2e) P09:40t(2e) P10:79t(4e) P11:138t(6e) P12:138t(6e)`.
- C++17 Native Harnesses (6): `bullet_ode_multibody`, `cgal_geom_kernel`, `dart_kinematics_dynamics`, `fcl_ccd_router`, `occt_step_analyzer`, `spectral_gts_nlopt`.
- Wire Protocol: `TLX1|u=...|v=1.1|mode=CAD_PROXY|REAL_ARTIFACT|...|rcpt=TLX11-RECEIPT:...|v11_cert=...`, `V11_SEAL|unit=...|status=...|attest=CI_ATTESTED|LOCAL_UNATTESTED`.
<!-- /@FLOW_AUTO:EXAM_METRICS -->
- Pillars Overview: P01 Geom/Contact (EX01-05), P02 FEA (EX06-10), P03 Multibody/Fatigue (EX25-26), P04 DFM/DFA/Fasteners (EX11-14, EX27-28), P05 Thermal/CFD (EX29, EX15), P06 Power/EDA/Wiring/FMEA (EX16-17, EX30-31), P07 EMC/Optics/Acoustics (EX18-21), P08 Formal/RTL (EX32-33), P09 Chem/Rel (EX34-35), P10 Vision/BOM/GPU/Domain (EX22-24, EX36), P11 Real-World Boot/Control/SI/ESD (EX37-42), P12 Mfg/Tribology/Kinematics/Cert (EX43-48).
- Execution Modes: `MODE=CAD_PROXY` (3D CAD model verification) vs `MODE=REAL_ARTIFACT` (`--project=<exam.project.json>` real STEP/KiCad/SPICE/RTL/BOM; missing artifacts fail honestly as `MISSING_REAL_ARTIFACT`, ZERO fabrication). Verification vs Validation boundary is explicitly displayed in certificates and UI modal.
- 28 Cross-Solver Conservation Locks `X01..X28`: X01..X16 (core conservation) + X17(ngspice=gnucap inrush<=3%), X18(Octave=Maxima Routh=0), X19(Verilator=Icarus=GHDL RTL=0), X20(Z3=CVC5=Boolector=MiniSat UNSAT=0), X21(GetDP=FreeFEM EM/SI<=5%), X22(ngspice=GetDP ESD<=5%), X23(DART=Bullet=ODE torque<=3%), X24(CVXOPT=HiGHS LP<=1%), X25(CCX=OpenFOAM transient T<=8%), X26(FFTW3=SciPy PSD<=2%), X27(CGAL=OCCT=ADMesh=GTS vol<=2%), X28(Pint=SymPy=Maxima=mpmath SI<=0.01%).

## @PERF_AND_HISTORY
- V3 Baselines: Play Ground 1.1 `40.05x` avg speedup / `0.0 draws/s` idle; STD LITE v2 `14.45x` arith / `3.23x` geo, `welcome/lite=2dc/38.2k tris`, `integrated/lite=8dc/135.5k tris`, `maxLeakedCacheRefs=0`.
- History: P12-39 core 23 units -> PR#53-62 V3 Hyper-Opt, `dx`, `sp`, `pp1.1`, `sokutei`, RIIMOS E1, EXAM V1 -> PR#63 FLOW V1 OS -> PR#64 V1.1 Upgrade (THE LAST EXAM V1.1 + `V1.1証明` + `PLYA V2.1` + `flow auto`/`flow macro`) -> **PR#65 FLOW Security & Speedup Hardening + Keyless OIDC/Sigstore** (Edit Permit Gate, 2ms UserNS/NetNS + 1-container Docker `:ro` sandbox, Keyless GitHub Actions OIDC + Sigstore Fulcio/Rekor attestation [zero static keys] + optional Ed25519, 48-attack Red-Team oracle, transitive kernel closure, Salami drift & core deletion locks, `@FLOW_AUTO` SSOT docs + -58% slim `AGENTS.md`, real-artifact pipeline, 4-pillar prebuild/test-cache/incremental/parallel speedup).