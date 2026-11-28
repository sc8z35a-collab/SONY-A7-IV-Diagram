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

## @UNIT_DEPENDENCY_DAG (21 EXAM TARGETS + 2 EXCLUDED)
- **Stage 1 — 19 Independent EXAM Units (parallel-safe)**: `welcome, original, mishoe, battery, cfexpress, mic, drybox, mount, shutter, body, evf, lcd, lens, mainboard, bionz, bionz_v2, sensor, micro, micro_v2`.
- **Stage 2 — 2 Composite EXAM Units (MUST run AFTER Stage 1)**: `camera_body` (231p, depends on 7 Stage-1 builders: `mount, body, evf, shutter, sensor[macroParts], mainboard, lcd`) and `integrated` (305p, depends on all 8 Stage-1 builders: `lens, mount, body, evf, shutter, sensor[macroParts], mainboard, lcd`) via shared `src/units/camera_macro_shared.ts`.
- **EXAM Excluded (`EXCLUDED_EXAM_UNITS`)**: `mirai_2028` (140p), `sensor_fab` (235p).
<!-- @FLOW_AUTO:UNIT_HEALTH_SUMMARY -->
- Live Health Baseline (SSOT `catalog/UNIT_HEALTH.tsv` + `verification/certificates/` + `src/units/*.pose.tsv`): **Certified=`0/21`** | **Full-Clean (0 clash & 0 EX02 >0.08mm gap)=`0/21`** (`none`) | **0-Clash/Explode=`2/21`** (`welcome, original`) | **Pose=`0` rows (0u)**.
- Spatial Totals (`sp ultra` + `explode-8` + `EX02 0.08mm BFS`): `clash=13816`, `ex02_gap08=381`, `sp_float4=0`, `smt=81`, `explode=5224` | Top clash: `lcd:3102, shutter:2194, cfexpress:1563, integrated:1029, battery:813` | Instant read (<150ms): `npm run flow -- status --raw`.
<!-- /@FLOW_AUTO:UNIT_HEALTH_SUMMARY -->

## @CODE_3LAYER
- Layer G (`src/units/<U>.pose.tsv`, `src/core/flow_pose_loader.ts`): `id\tdx,dy,dz\trx,ry,rz\tsx,sy,sz\texp_dx,dy,dz\tmat_override\tconstraints`. Identical across `CompiledV2Unit`, `mi_shoe.ts`, and `scene_extractor.mjs` (0.000mm parity).
- Layer M (pure geometry `src/assemblies/<U>/*.ts`, `src/core/cad_primitives.ts`, slim `src/assemblies/types.ts` + auto-gen `diagram_types.gen.ts`): top `@FLOW_MAP` header, 0 duplicate prose (`lazyExplanationStub(id)`).
- Layer L (`src/data/<U>.json`): compact 1-part-per-line JSON (196k -> ~3.6k lines, -98%).
- Indexes (`catalog/`): `INDEX.tsv`, `UNIT_HEALTH.tsv`, `names/<U>.txt`, `ALL_NAMES.txt`, `spatial/<U>.tsv`, `code/{MAP,SYMBOLS,GRAPH,MATERIALS,HELPERS,SCHEMATICS,CSS_INDEX,DEFECT_MAP}.tsv`.
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

### @EXAM_CERT_AND_PASS_CONTRACT (NO-SOURCE-LOOKUP THRESHOLDS & RUNTIME)
- **`V1.1証明`**: `fullRun=1`, 48e/1080t/28x/48sv READY, **`FAIL=0 & WARN=0 & ERR=0 & SKIP=0`** (1 WARN blocks). Auto-revokes on 0.0001mm 3D/pose/mat edit or kernel drift -> `verification/certificates/<U>.v1_1.cert.json` + `v1_1_certificates.gen.ts`.
- **Thresholds**:
  - P01(EX01-05): 4-tier clash=0, containment=0, SMT<=0.25mm, EX02 seat<=0.08mm, foot cop<=0.10mm FAIL(T055)/<=0.05mm WARN(T127), protrude=0, SMT poke=0(chassis XZ±1.5mm), CoG in hull, tip>=15°(lat>=20°) FAIL & >=26.6°(tan>=0.5) WARN(T139), cantilever<=1.0, cog_h<=0.55 WARN(T145), 6-view islands=1, CGAL manifold/0-self-int/0-inv, tris>=4/part.
  - P02-05(EX06-15,25-29): 16-step explode=0; fasteners & seals >=2 contacts(<=0.08mm), 0 air fasteners, thread>=1.5d; DFM(EX13) min wall: cnc>=0.50mm, cast>=0.80mm, glass>=0.30mm, elastomer/pcb/sheet>=0.04mm, razor>=0.15mm, cncAccess>=0.65, slender<=120/zeroDraft<=50 WARN; CalculiX f1>=80Hz/f2>=120Hz WARN, hasCompliant(elastomer clears T100/111/112), bow<=0.05mm/drop<=100G/slip<=2.5mm/fret<=0.25mm WARN, Miner<0.25; CFD T-limit & TIM<=0.08mm.
  - P06-12(EX16-24,30-48): ERC&DRC=0; cones occ=0%; Helmholtz 150..6000Hz, eig1>500Hz, dp<=15Pa, <=20dBA, panel_rattle=0, |fHelm-f1|/fHelm>=0.12 WARN(T423); galvanic >0.50V=0, Mg-Cu=0, >0.25V<=20 WARN(T460), dew>=5°C, MTBF>=50kh; Chrome+OpenCV 1 island, JSON==3D, tsc=0, docs/index.html(T510 WARN), 4-tier mono tris, GPU<=64MB; ADMesh 0 degen, Cp/Cpk>=1.33, Hertz SF>=1.5/p0<=1200MPa/wear<=2.5um, igraph 1-comp(<=0.12mm), screw_pierce=0.
- **VM (2vCPU/8GB)**: `exam setup` cold ~3-5m / warm <5s / `--verify-only` <0.3s; `exam --unit=<U>` ~15-45s/unit (`scheduler.mjs` resume).

### @EXAM_IR_FLAGS_AND_MATERIAL_DB (EXACT COMPILER RULES — ZERO SOURCE LOOKUP)
- **`PART_FLAGS` Regexes** (lowercase `id+title+subtitle+category+role`):
  - GROUNDED(1<<0): minY<=sceneMinY+1.2mm, or `rubber-feet|foot|feet|base-pad|tripod-socket|bottom-weight|leveling` within minY+2.5mm.
  - CHASSIS(1<<1): `chassis|frame|housing|shell|bezel|cover|plate|base|plinth|bulkhead|barrel|mount|cradle|endcap|beam|backplate|dock|socket|bracket|carrier`.
  - FASTENER(1<<2): `screw|bolt|washer|nut|pin|dowel|rivet|clip|spring|clamp|fastener|collar|dovetail|retainer|shim|snap`.
  - PCB(1<<3): `pcb|board|mainboard|mcpcb|substrate|fpc|flex` (not `shield|can`).
  - HEAT_SOURCE(1<<4): `led-array|led|bionz|isp|npu|mcu|cortex|pmic|charger|amp|dac|driver|sensor-die|cmos|laser|heater|motor|servo`. powerW: isp/bionz/npu/soc=3.2, cmos=1.4, servo/motor=1.2, pmic/charger=0.9, oled/lcd=0.7, led=0.5, else=0.15 (welcome: led-array=1.55, pmic=0.85, mcu=0.65, driver=0.25, amp=0.20, else=0.12).
  - ELASTOMER(1<<5): `gasket|seal|oring|o-ring|rubber|boot|damper|foam|elastomer|tim|thermal-pad|foot|feet|eyecup|grip` (hasCompliant=true).
  - OPTICAL(1<<6): `lens|glass|quartz|sapphire|prism|lgp|diffuser|window|filter|olpf|mirror|bef|polarizer|optical|ed-|xa-|led-array`.
  - CONDUCTOR(1<<7): `busbar|harness|wire|cable|coax|pogo|contact|terminal|trace|copper|fpc|antenna|wifi|ble|nfc|usbc|usb-c|hdmi|connector|canfd|fuse|inductor|supercap|battery|lifepo4|cell`.
  - MOVABLE(1<<8): `shutter-blade|dial|ring|hinge|tilt|lever|button|switch|toggle|leg|joint|servo|rotor|gear|focus-group|ibis-stage|actuator`.
  - SMT(1<<9): `ic|mcu|pmic|canfd|dac|amp|sensor|tof|lux|tcxo|rtc|eeprom|flash|esd|tvs|shunt|fuse|mlcc|inductor|resistor|capacitor|diode|mosfet|regulator|ferrite|transceiver` (if not PCB/CHASSIS).
- **Material Lookup**: `mesh.matKey` -> `CATALOG_KEY_TO_PRESET`; untagged -> `partId+title` regex -> default `a6061_t6`.
- **Presets (rho, E_GPa, sy_MPa, eGalv, mfgClass)**:
  - Metals: a6061_t6(2.7,69,276,-0.76V,cnc), ti6al4v(4.43,114,880,-0.05V,cnc), az91d_mg(1.81,45,160,-1.60V,cast), sus304(7.93,193,215,-0.08V,cnc), steel_hrc60(7.85,210,1200,-0.45V,cnc), invar36(8.1,141,275,-0.20V,cnc), copper_c1100(8.96,117,220,+0.18V,cnc), brass_c3604(8.5,97,310,-0.15V,cnc), becu_c17200(8.25,131,1000,-0.10V,sheet), w80cu20(15.6,260,550,+0.10V,cnc), gold_au(19.3,79,200,+0.35V,sheet), nickel_silver_emi(8.7,130,320,-0.12V,sheet), ndfeb_n52(7.5,160,80,-0.50V,sinter), sac305_solder(7.4,51,35,-0.45V,solder).
  - Insulators (eGalv=null, 0 galvanic risk): pa66_gf30(1.36,8.5,140,polymer), epdm_gasket(1.25,0.015,12,elastomer), tim_silicone_pad(2.6,0.008,3,elastomer), ptfe_washer(2.2,0.5,23,polymer), fr4_hdi_pcb(1.9,22,260,pcb), polyimide_fpc(1.42,3.2,110,pcb), ic_emc_epoxy(1.85,20,90,polymer), alumina_ceramic(3.9,370,300,ceramic), bk7/silica/sapphire(optical_glass), pmma_lgp(polymer), silicon_die(semi). Composites: cfrp_blade(+0.15V), pyro_graphite(+0.20V), lifepo4_cell(-0.80V).
  - Galvanic (EX34): dV=|eGalvA-eGalvB|; >0.50V FAIL (az91d_mg vs Cu/SUS/Ti/Au -> isolate with pa66_gf30/epdm_gasket/ptfe_washer or match alloy).

### @EXAM_DEBUG_PLAYBOOK (ZERO-SOURCE-READ FIX RECIPES)
1. **Entry**: Run `flow exec exam query <runId> --status=FAIL` (`--status=WARN`) + `flow inspect <id> --defect --unit=<U>` for exact metric/parts/src=file:line. NEVER open `scripts/exam/**`!
2. **GOLDEN RULE — Fix EX02 (<=0.08mm) Cascade FIRST**: `sp` only flags >4.0mm; EX02 requires 1 connected component at <=0.08mm (incl. internal multi-mesh submeshes). Any >0.08mm gap cascades FAIL across **200+ downstream tests** (EX03/06/07/09/12/14-19/21/25/32/35/36/44/48). Fix EX01 clashes + `ex02_gap08` (`flow status` + `flow heal --apply`) FIRST!
3. **EX03-05/46**: Align GROUNDED feet minY<=0.05mm, no dips below sceneMinY-0.05mm, non-optical SMT inside chassis XZ±1.5mm, cog_h<=0.55, widen stance for tipMin>=26.6°; no zero-thickness/neg-scale/open/degenerate meshes.
4. **EX06-10 CalculiX**: Models largest XZ-footprint CHASSIS (L x W, H>=3mm, its E/nu/sy/rho). Thicken/stiffen primary chassis if f1<80Hz/f2<120Hz; keep >=1 ELASTOMER part for hasCompliant=true.
5. **EX11-14**: Distinct explode dirs; fasteners & seals need >=2 contacts <=0.08mm; avoid cnc_metal/cast_metal on <0.50/0.80mm CHASSIS trim.
6. **EX15/29/21 CFD/Acoustics**: heat_flux=totalPowerW/envelopeArea -> avoid HEAT_SOURCE keywords on passive parts; TIM gap<=0.08mm; keep fHelm >=12% off f1.
7. **EX22-24/36 GPU<=64MB**: Keep ultra tris <~1.3M (avoid multi-hole beveled ExtrudeGeometry frames; use thin perimeter walls); run `npm run build` for `docs/index.html`.
8. **EX47 Hertz Trap**: `spectral_gts_nlopt` uses `minYieldMpa = min(sy>20MPa)` across ALL CHASSIS|FASTENER parts (`hertzSf=1.6*minYieldMpa/hertzMaxMpa>=1.5`). NEVER put low-yield ptfe/pa66/sac305/ndfeb on a CHASSIS or FASTENER part!
9. **EX48 Screw Pierce & igraph**: Fails if ANY FASTENER AABB overlaps ANY PCB AABB >0.1mm in X & Z while Y overlaps `[pcb.minY-0.05, pcb.maxY+0.05]`. Mount PCB screws on perimeter bosses outside PCB AABB; ensure igraph <=0.12mm graph has 1 component.

## @PERF_AND_HISTORY
- V3 Baselines: Play Ground 1.1 `40.05x` avg speedup / `0.0 draws/s` idle; STD LITE v2 `14.45x` arith / `3.23x` geo, `welcome/lite=2dc/38.2k tris`, `integrated/lite=8dc/135.5k tris`, `maxLeakedCacheRefs=0`.
- History: P12-39 core 23u -> PR#53-62 V3, dx/sp/pp1.1/sokutei, RIIMOS E1, EXAM V1 -> PR#63 FLOW V1 OS -> PR#64 EXAM V1.1 + `V1.1証明` + PLYA V2.1 + auto/macro -> PR#65-66 Security Fortress (Permit, UserNS/NetNS+Docker, Keyless OIDC/Sigstore, 48-attack oracle, SSOT docs, 4-pillar speedup) -> **PR#67 Instant Comprehension Cold-Start OS & EXAM Parity Fixes** (`I00 NO_INFRA_DIVE` plan+debug, `@CONTRACTS_QUICKREF`, 8k-tok `README.md`, `catalog/UNIT_HEALTH.tsv` incl. `ex02_gap08`, `<150ms`/`<=450tok` zero-spill `flow status`, `wake --brief`, `@FLOW_AUTO:UNIT_HEALTH_SUMMARY`, `ir_compiler.mjs`/`scene_extractor.mjs` `matKey` & `buildSourceLineMap` fixes, `exam_setup.sh --verify-only`).