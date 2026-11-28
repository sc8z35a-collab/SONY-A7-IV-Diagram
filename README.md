# @FLOW_BOOK 2: DOMAIN_SPEC (SONY-A7-IV-Diagram | FLOW-SPEC/v1.1)
> AUDIENCE=AI_AGENTS_ONLY | COMPANION=AGENTS.md (Book 1: ENV_OS) | QUERY: `npm run flow -- doc section 2 <@TAG>`

## @PROJECT_MAP
- App: Sony A7 IV Full-Frame Mirrorless Camera + Special Showcases (`welcome` WLK-435 CNC optical signboard, `original` Exhibit #01 RIIMOS E1 9,700 JPY quadruped, `mirai_2028` 2028 Frontier concepts, `sensor_fab` 6-vol semiconductor fab) 3D CAD WebGL2 Technical Anatomy + Play Ground 1.1 Studio (`PLYA V2.1`).
- Stack: TypeScript 5.8 strict + Three.js 0.174 + Vite 6.2 (`dist/` -> `docs/` GitHub Pages) + Capacitor 7.6 Android APK (`android/`).
- Scale: 23 modes (21 individual + 2 composite `integrated`, `camera_body`), 2,937 unique individual parts (3,473 entries incl. composites), 720x470 HD SVG schematics (`src/ui/schematicsRegistry.ts`), 60fps physics rigs.
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

## @EXAM_V11_DOMAIN (12 PILLARS / 48 ENGINES / 1,080 TESTS / 48 REAL SOLVERS / 28 CROSS-LOCKS)
- P01 Geom/Contact(120): EX01 4-tier 0.001mm clash/SMT(FCL+SP+CGAL), EX02 anti-levitation <=0.08mm(FCL+NX+SP), EX03 6-pose eq(Qhull+HiGHS+OCCT), EX04 6-dir silhouette(CGAL+OpenCV), EX05 manifold/tet(CGAL+Gmsh) + V1.1 deep checks (`T531..T804`).
- P02 FEA(122): EX06 C3D8 static(CCX), EX07 Lanczos modal 10-4000Hz(CCX), EX08 CTE -20/+85C(CCX), EX09 GD&T MILP/Z3/10k MC(CBC+Z3), EX10 30G shock/1m drop/buckle(CCX+Bullet).
- P03 Multibody/Fatigue(46): EX25 Bullet+ODE 3D dynamics, EX26 S-N/ISTA-3A/SAC305 Coffin-Manson.
- P04 DFM/DFA/Fasteners(136): EX11 CCD explode+Z3 DAG, EX12 fasteners >=2 contacts, EX13 CGAL SDF DFM, EX14 IP54-67 seal, EX27 VDI 2230 bolted joints, EX28 DFR/DFS/DFT.
- P05 Thermal/CFD(50): EX29 OpenFOAM 1912 buoyantSimpleFoam CFD, EX15 CCX heat transfer + TIM gap matrix.
- P06 Power/EDA/Wiring/FMEA(98): EX16 ngspice+gnucap PDN/UPS/MC, EX17 KiCad 7.0 ERC/DRC/Gerber/creepage, EX30 FCL 3D A* harness+FreeFEM Z_diff, EX31 ngspice fault inj+FTA.
- P07 EMC/Optics/Acoustics(90): EX18 FreeFEM EMC SE>=40dB, EX19 100k-ray Fresnel/TIR MC, EX20 sightline cones, EX21 Helmholtz acoustics+louver dP.
- P08 Formal/RTL(46): EX32 Z3 16-axiom proof, EX33 Yosys+Verilator+Icarus power/UPS FSM.
- P09 Chem/Rel(42): EX34 galvanic dE/Mg-Cu/dewpoint/outgas, EX35 MIL-HDBK-217F MTBF>=50kh + 5yr Arrhenius.
- P10 Vision/BOM/GPU/Domain(54): EX22 Chrome pp1.1+OpenCV floating islands, EX23 BOM/JSON/validate_parts, EX24 4-tier monotonicity/VRAM=0/build, EX36 KLayout/Netgen-LVS/mission.
- P11 Real-World Boot/Control/SI/ESD(138, `T805..T942`): EX37 cold-start -20C/+60C power-on inrush & brownout(ngspice+gnucap), EX38 closed-loop Bode/Nyquist/Routh control stability(Octave+Maxima), EX39 digital timing/CDC/FPGA place-route/VHDL(Yosys+nextpnr-ice40+Verilator+Icarus+GHDL), EX40 triple-SMT/SAT safety proof(Z3+CVC5+Boolector+MiniSat), EX41 3D PDN/SI/eye-diagram/FEM EM(Gmsh+GetDP+FreeFEM), EX42 IEC 61000-4-2 8kV/15kV ESD + surge + reverse-polarity(ngspice+KiCad+GetDP).
- P12 Mfg/Tribology/Kinematics/Cert(138, `T943..T1080`): EX43 articulated multibody inverse dynamics & torque(DART 6.13 C++17+Bullet+ODE+CVXOPT), EX44 transient thermal 30min burn-in + 1000-cycle CTE shock(CCX+OpenFOAM+SciPy), EX45 MIL-STD-810H random vibration PSD + FFT spectral EMI(FFTW3 C++17+GTS+CCX), EX46 triple-watertight CAD + Six-Sigma Cpk>=1.33 + 99.5% yield(CGAL+OCCT+ADMesh+GTS+R-tree+statsmodels), EX47 Hertz contact + Archard 10k-cycle wear + Pint SI + 100-digit mpmath(NLopt C++17+Pint+SymPy+Maxima+mpmath), EX48 Poka-Yoke assembly graph + EOL BIST + 0.0001mm cryptographic **`V1.1証明`** seal(igraph+NetworkX+VTK).
- 48 Real Solvers & 6 C++17 Harnesses: `fcl_collision_check`, `cgal_mesh_audit`, `bullet_ode_dynamics`, `occt_step_kernel`, `dart_kinematics_dynamics`, `spectral_gts_nlopt` + 42 verified industrial binaries/Python solvers.
- 28 Cross-Solver Conservation Locks `X01..X28`: X01..X16 (core V1 conservation) + X17(ngspice=gnucap inrush<=3%), X18(Octave=Maxima Routh=0), X19(Verilator=Icarus=GHDL RTL=0), X20(Z3=CVC5=Boolector=MiniSat UNSAT=0), X21(GetDP=FreeFEM EM/SI<=5%), X22(ngspice=GetDP ESD<=5%), X23(DART=Bullet=ODE torque<=3%), X24(CVXOPT=HiGHS LP<=1%), X25(CCX=OpenFOAM transient T<=8%), X26(FFTW3=SciPy PSD<=2%), X27(CGAL=OCCT=ADMesh=GTS vol<=2%), X28(Pint=SymPy=Maxima=mpmath SI<=0.01%).

## @PERF_AND_HISTORY
- V3 Baselines: Play Ground 1.1 `40.05x` avg speedup / `0.0 draws/s` idle; STD LITE v2 `14.45x` arith / `3.23x` geo, `welcome/lite=2dc/38.2k tris`, `integrated/lite=8dc/135.5k tris`, `maxLeakedCacheRefs=0`.
- History: P12-39 core 23 units -> PR#53-62 V3 Hyper-Opt, `dx`, `sp`, `pp1.1`, `sokutei`, RIIMOS E1, EXAM V1 -> PR#63 FLOW V1 OS (2-book AI OS, 12-layer security, `flow heal`, 3-layer code, parallel kernel, portable core) -> **V1.1 Upgrade** (THE LAST EXAM V1.1 12p/48e/1,080t/48sv/28x + cryptographic `V1.1証明` 0.0001mm instant revocation + `PLYA V2.1` 24s/256t Playground + `FLOW V1.1 OS` `flow auto` 14-30s DAGs / `flow macro` signed registry / `SEC-13` 36-attack oracle).