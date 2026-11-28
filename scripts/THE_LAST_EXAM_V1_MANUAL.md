# TLX1_MANUAL — THE LAST EXAM V1 (AI-AGENT MACHINE SPECIFICATION)
> VERSION=1.1 | CMD=`node scripts/exam.mjs` (alias: `npm run exam`, `npm run tlx`, `npm run sim20`)
> SCOPE=10_PILLARS|36_ENGINES(EX01..EX36)|530_FIXED_TESTS(T001..T530)|16_CROSS_LOCKS(X01..X16)|32_SOLVER_PROBES
> POLICY=EXAM_V1_ONLY_VERIFICATION|MANDATORY_FULL_32_TOOL_DOWNLOAD|MAX_LEVEL_UNSKIPPED|ZERO_FABRICATION|TAMPER_EVIDENT_RECEIPT

## 0. MANDATORY_AGENT_POLICY (ABSOLUTE IRON LAW)
- `VERIFY_SOLE_AUTHORITY`: ALL design/CAD/physics/EDA/thermal/CFD/optics/formal/BOM/visual verification MUST use **ONLY `THE LAST EXAM V1` (`node scripts/exam.mjs`)** at maximum level (all 36 engines, 530 fixed tests, all 4 quality tiers, 16 cross-solver conservation locks, Chrome `pp1.1` + OpenCV vision). Standalone `sp` / `validate_parts` / ad-hoc checks are FORBIDDEN as verification gates.
- `MANDATORY_FULL_DOWNLOAD`: On any fresh VM or environment, agents MUST run `node scripts/exam.mjs setup` BEFORE any verification to download & build **100% of all 16 external industrial toolchains (`32/32 READY`) + all 4 C++17 native harnesses**. Missing tools trigger `EXIT 5 (SOLVER_MISSING)`; skipping or approximating solvers is strictly forbidden.
- `MAX_LEVEL_FINAL_PROOF`: `--only=` is permitted only for rapid inner repair loops; final sign-off ALWAYS requires full unskipped `node scripts/exam.mjs --unit=<unitId>` exiting `0` with `TLX1-RECEIPT` + `X_SUM|ok=16/16`.
- `ACTIVE_21_PHASE_UNITS`: `welcome, original, mount, shutter, body, evf, lcd, lens, mainboard, sensor, camera_body, integrated, mishoe, battery, cfexpress, mic, drybox, bionz, bionz_v2, micro, micro_v2` (excluded: `mirai_2028` [FH], `sensor_fab` [semiconductor fab]).

## 1. COMMAND_MATRIX
| INTENT | EXACT_COMMAND |
|---|---|
| FULL_UNIT_EXAM | `node scripts/exam.mjs --unit=<unitId>` |
| ALL_23_UNITS | `node scripts/exam.mjs --all-units` |
| PLAYGROUND_BLUEPRINT | `node scripts/exam.mjs --playground=<path.tlx.json>` |
| PROVISION_16_SOLVERS | `node scripts/exam.mjs setup` |
| SELF_PROOF_ORACLE | `node scripts/exam.mjs selftest` |
| TARGETED_REVERIFY | `node scripts/exam.mjs --unit=<id> --only=EX01,EX02,EX15` |
| PILLAR_REVERIFY | `node scripts/exam.mjs --unit=<id> --pillar=P01,P05` |
| RESUME_CHECKPOINT | `node scripts/exam.mjs --unit=<id> --resume=<runId>` |
| QUERY_NDJSON_DB | `node scripts/exam.mjs query <runId> --status=FAIL [--engine=EX02|--test=T021|--part=<sub >]` |
| LIST_REGISTRY | `node scripts/exam.mjs list` |

## 2. EXIT_CODES
`0`=ALL_PASS(`TLX1-RECEIPT` issued iff full 36-engine unskipped run & 16/16 locks OK)
`1`=RUNTIME_ERROR
`2`=DEFECT_DETECTED(>=1 FAIL)
`3`=WARN_ONLY(0 FAIL, >=1 WARN)
`4`=CROSS_SOLVER_INVARIANT_MISMATCH(anti-cheat lock tripped)
`5`=SOLVER_MISSING(run `node scripts/exam.mjs setup`)

## 3. TLX1_WIRE_GRAMMAR (PIPE-DELIMITED, 1 RECORD PER LINE)
- `TLX1|u=<unit>|v=1|verdict=<PASS|FAIL|WARN|ERR|INVARIANT_FAIL|PARTIAL_PASS>|pass=<N>|fail=<N>|warn=<N>|err=<N>|skip=<N>|total=<N>|exp=<expanded>|zdp=<0..1>|dur_s=<sec>|ir=<sha12>|sv=<ready/total>|rcpt=<TLX1-RECEIPT|NONE>`
- `P|<P01..P10>|<CODE>|<pass/total>|fail=<N>|ms=<ms>`
- `E|<EX01..EX36>|<pass/total>|sv=<solvers>|ms=<ms>|<key=val,...>`
- `F|<T001..T530>|<EXxx>|sev=<CRIT|HIGH|MED>|cat=<CAT>|p=<partA[:partB]>|m=<metric>:<actual><op><limit>|xyz=<x,y,z>|n=<nx,ny,nz>|fix=<DIRECTIVE>|src=<file:line>|sv=<solvers>|ev=<ref>`
- `W|...` (WARN record, same schema as `F`) | `R|...` (ERR record, same schema as `F`)
- `X_SUM|ok=<N/M>` followed on mismatch by `X|<X01..X16>|a=<valA>|b=<valB>|rel=<pct>%|lim=<pct>%|ok=<0|1>`
- `S|run=<runId>|top_src=<file:count,...>|next=<exact_reverify_cmd>|db=<path_to_results.ndjson>`

## 4. FIX_DIRECTIVE_GRAMMAR (MACHINE-ACTIONABLE PATCH COMMANDS)
- `SHIFT:<partId>:<dx,dy,dz>` — Translate part in world mm (0.001mm resolution) to eliminate float/clash
- `RESIZE:<partId>:<axis>:<delta_mm>` — Increase wall thickness or close structural skirt seam
- `THERM:<partId>:tim_gap<=0.04|seat_gap<=0.08` — Seat floating TIM/heatsink to remove air-gap k=0.026 W/mK
- `ISOLATE:<partA>:<partB>:galv_dV=<V>` — Insert dielectric/PTFE/plating barrier between incompatible metals
- `ROUTE:<net>:<pA>-><pB>` — Re-route 3D harness clear of solid metal walls
- `META:<file>:<key>:<val>` — Resolve BOM/JSON numeric contradiction

## 5. AI_CLOSED_LOOP_REPAIR_PROTOCOL
1. Run `node scripts/exam.mjs --unit=<U>` once; capture `runId`, `top_src`, and all `F|...|sev=CRIT` lines.
2. Group `F` records by `src=` file; apply exact geometric/material/wiring fixes dictated by `fix=` and `xyz=`.
3. Re-verify modified domains rapidly via `S|next=...` (`--only=EX..`).
4. Run full unskipped `node scripts/exam.mjs --unit=<U>` to obtain `TLX1-RECEIPT:<ir8>:<unit>:530/530:<exp>:<sig10>`.
5. Never report completion without `exit=0` and a valid `TLX1-RECEIPT` + `BG-RECEIPT`.

## 6. ENGINE_AND_SOLVER_INDEX (36 ENGINES / 530 FIXED TESTS / 16 EXTERNAL TOOLCHAINS)
| ENG | PIL | TESTS | REAL_EXTERNAL_SOLVERS | DOMAIN |
|---|---|---:|---|---|
| EX01 | P01 | T001-T018 (18) | FCL 0.7 + SP_F64 + CGAL 5.6 | 4-Tier 0.001mm Clash, Containment, SMT Seat |
| EX02 | P01 | T019-T034 (16) | FCL 0.7 + NetworkX + SP_F64 | Anti-Levitation Grounded Contact Graph (<=0.08mm) |
| EX03 | P01 | T035-T048 (14) | Qhull + SciPy HiGHS LP + OCCT 7.6 | 6-Pose Gravity Static Equilibrium & Support Hull |
| EX04 | P01 | T049-T060 (12) | CGAL + OpenCV 4.6 | 6-Direction Silhouette Seam & Depth Islands |
| EX05 | P01 | T061-T072 (12) | CGAL 5.6 Exact + Gmsh 4.12 | Rational Manifold, Self-Intersection, Volume & Tet Quality |
| EX06 | P02 | T073-T090 (18) | Gmsh + TetGen + CalculiX ccx 2.21 | 3D C3D8 Static Structural FEA (Dead/15N/30N) |
| EX07 | P02 | T091-T104 (14) | CalculiX ccx 2.21 Lanczos | 3D Eigenvalue Modal Vibration (10-4000Hz) & Q |
| EX08 | P02 | T105-T118 (14) | CalculiX ccx 2.21 Thermo-Mech | Coupled CTE Mismatch Stress FEA (-20°C / +85°C) |
| EX09 | P02 | T119-T132 (14) | COIN-OR CBC + Z3 4.8 + NumPy 10k | GD&T Worst-Case MILP, Formal Z3 Bound, RSS Cpk & 10k MC |
| EX10 | P02 | T133-T146 (14) | CalculiX *BUCKLE + Bullet 3.24 | 30G Shock, 1m Drop, Tipping & Linear Buckling |
| EX25 | P03 | T147-T162 (16) | Bullet 3.24 (C++) + ODE (C++) | Dual 3D Rigid-Body Multibody 6-Pose/Tilt25/Vib2G/Drop1m |
| EX26 | P03 | T163-T176 (14) | CalculiX + SciPy | S-N Fatigue, ISTA-3A PSD Miner & SAC305 Coffin-Manson |
| EX11 | P04 | T177-T192 (16) | FCL CCD + Z3 4.8 + SP_F64 | Continuous Collision Detection Explode & Z3 Assembly DAG |
| EX12 | P04 | T193-T206 (14) | FCL + CGAL + OCCT | Fastener/Dowel/Dovetail Engagement & Tool Access |
| EX13 | P04 | T207-T222 (16) | CGAL SDF + OCCT + Gmsh | CNC/Cast/Sheet/Glass DFM Wall Thickness, Draft & Access |
| EX14 | P04 | T223-T234 (12) | CGAL + NetworkX | IP54/IP65/IP67 Continuous Closed-Loop Seal Compression |
| EX27 | P04 | T235-T250 (16) | CalculiX + VDI 2230 | Bolted Joint Preload, Strip, Bearing & Thermal Loosening |
| EX28 | P04 | T251-T266 (16) | FCL + NetworkX + Z3 | DFR/DFS/DFT Repairability, ICT Probe & Labeling |
| EX29 | P05 | T329-T346 (18) | OpenFOAM 1912 buoyantSimpleFoam | 3D Natural Convection CFD, Plume, Louver dP & Real h_eff |
| EX15 | P05 | T267-T282 (16) | CalculiX *HEAT TRANSFER + SciPy | 3D Conduction FEA + Air-Gap Thermal Matrix (CFD-Coupled) |
| EX16 | P06 | T283-T300 (18) | Berkeley ngspice 42 + GNU gnucap | Dual SPICE PDN, IR Drop, 0ms UPS, 32kHz Ripple & 100x MC |
| EX17 | P06 | T301-T314 (14) | KiCad 7.0 kicad-cli + CGAL | Real Schematic ERC, PCB DRC, Gerber & IEC 62368-1 Creepage |
| EX30 | P06 | T347-T364 (18) | FCL 3D A* + KiCad + FreeFEM++ | Collision-Free 3D Harness Routing, Bend-R & Diff Z_diff PDE |
| EX31 | P06 | T365-T380 (16) | ngspice Fault Inj + NetworkX FTA | 20V OVP, 10mΩ Short, Reverse Polarity, I²t & SPOF Cut-Sets |
| EX18 | P07 | T315-T328 (14) | FreeFEM++ 4.13 + NetworkX | Quasi-Static EMC Shielding, λ/20 Slot & RF Clearance |
| EX19 | P07 | T381-T398 (18) | NumPy/SciPy 100k Ray MC | 100,000-Ray 3D Fresnel/TIR Optics, LGP Uniformity & Flux |
| EX20 | P07 | T399-T410 (12) | FCL + sp RayCone | ToF / Lux / Camera / RF 3D Sightline Cone 0% Occlusion |
| EX21 | P07 | T411-T424 (14) | FreeFEM++ Helmholtz + OpenFOAM | Acoustic Cavity Eigenvalue PDE & Louver Backpressure |
| EX32 | P08 | T465-T480 (16) | Microsoft Z3 SMT 4.8.12 | 16-Axiom Formal Mathematical Proof (Zero Contradiction) |
| EX33 | P08 | T481-T494 (14) | Yosys 0.33 + Verilator 5.020 + Icarus | Control/Power-Seq/UPS/Failsafe RTL Synthesis, Lint & Sim |
| EX34 | P09 | T495-T508 (14) | Contact Electrochem + SciPy | Galvanic ΔE°, Dewpoint Psychrometrics & ASTM E595 Outgas |
| EX35 | P09 | T509-T520 (12) | SciPy Reliability | MIL-HDBK-217F MTBF & Arrhenius 5-Yr Accelerated Life |
| EX22 | P10 | T425-T438 (14) | Chrome pp1.1 + OpenCV + skimage | 6-View WebGL2 Render + Connected-Component Floating Islands |
| EX23 | P10 | T439-T452 (14) | Z3 + validate_parts.mjs | BOM, IDs, Metadata, Spec Consistency & Catalog Sync |
| EX24 | P10 | T453-T464 (12) | pp1.1 + tsc + vite | 4-Tier Triangle Monotonicity, GPU Budget & Build Gate |
| EX36 | P10 | T521-T530 (10) | KLayout 0.28 + Netgen-LVS + Domain | Semiconductor/Layout DRC/LVS & Mission Physics |

## 7. CROSS_SOLVER_INVARIANT_LOCKS (X01..X16)
`X01`:FCL=SP_dist(2%) `X02`:CGAL=OCCT_vol(3%) `X03`:OCCT=Bullet=ODE_mass(1%) `X04`:Bullet=ODE_react(1.5%)
`X05`:CCX_RF=Load(2%) `X06`:LP=ODE_react(1.5%) `X07`:OF_Qin=Qout(5%) `X08`:Th_Qin=Qout(1%)
`X09`:OF_T=Th_T(12%) `X10`:ngspice=gnucap_V(2%) `X11`:SPICE_P=Th_P(1%) `X12`:FCL=SP_cone(1%)
`X13`:MC_T+R+A=100%(0.1%) `X14`:Yosys=Verilator=Icarus(0%) `X15`:CBC=Z3_tol(1%) `X16`:IR=CGAL=BOM_N(0%)
