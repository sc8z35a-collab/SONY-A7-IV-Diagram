# @FLOW_BOOK 2: DOMAIN_SPEC (SONY-A7-IV-Diagram | FLOW-SPEC/v1)
> AUDIENCE=AI_AGENTS_ONLY | COMPANION=AGENTS.md (Book 1: ENV_OS) | QUERY: `npm run flow -- doc section 2 <@TAG>`

## @PROJECT_MAP
- App: Sony A7 IV Full-Frame Mirrorless Camera + Special Showcases (`welcome` WLK-435 CNC optical signboard, `original` Exhibit #01 RIIMOS E1 9,700 JPY quadruped, `mirai_2028` 2028 Frontier concepts, `sensor_fab` 6-vol semiconductor fab) 3D CAD WebGL2 Technical Anatomy + Play Ground 1.1 Studio.
- Stack: TypeScript 5.8 strict + Three.js 0.174 + Vite 6.2 (`dist/` -> `docs/` GitHub Pages) + Capacitor 7.6 Android APK (`android/`).
- Scale: 23 modes (21 individual + 2 composite `integrated`, `camera_body`), 2,937 unique individual parts (3,473 entries incl. composites), 720x470 HD SVG schematics (`src/ui/schematicsRegistry.ts`), 60fps physics rigs.
- Protected Content Assets (NOT operational manuals): `reports/fh_mirai_2028/*.md` (compiled by `scripts/build_mirai_content.mjs`) and `blueprints/riimos_e1/` (RIIMOS E1 MJCF/Colab/blueprint assets).

## @RENDER_V2_V3
- Universal V2 (`src/core/v2_unit_compiler.ts`): All units except bespoke `src/units/mi_shoe.ts` compile via `CompiledV2Unit` -> `ResourceCache` 38 PBR buckets (`src/core/resource_cache.ts`, 0 raw materials), `InstancedMesh`/`BatchedMesh`, flat TypedArray AABB-BVH (`bvhNodes`, stride 8) O(log N) 0-GC raycast, GPU shader explode, `disposeObject3D` VRAM leak=0.
- 4 Quality Tiers: `standard_lite` (Dual-Atlas Single-Bucket Fusion collapses 32 opaque buckets into 1 `metal_hero` + 1 glass bucket, ~2-8 draw calls, 16-bit Uint16 IBOs <=65k verts, Fresnel rim replaces edges, spatial-hash vertex weld); `standard`/`high`/`ultra` (progressive radial segments, 9k/18k/32k batched CAD edges, PMREM IBL, ULTRA zero-jaggy AA).
- V3 10 Pillars: (1) Play Ground 1.1 Hyper-Engine (`src/playground/CadPlaygroundStudio.ts`, 40.05x avg speedup, 0.0 idle draws/s, selective `onlyPartIds`, 1000-pt PLYA grader, `.tlx.json` export); (2) STD LITE v2 (14.45x arith / 3.23x geo speedup, 0.00% black-crush); (3) ULTRA zero-jaggy AA; (4) Adaptive `FAST<->LITE<->ULTRA` & `PG_FAST<->PG_LITE<->PG_SHARP`; (5) `KINE` 3-layer 0-GC occlusion culling; (6) 16x macro zoom; (7) Load-guarded F1.2 bokeh (`auto`); (8) Vivid electric-blue selection (`CAD_SELECT_SENTINEL`); (9) Mobile 390x844@2 landscape UI & 90-deg schematic lightbox; (10) Locked camera angle in detail view.

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
- Note `*`: `mi_shoe.ts` implements `OptimizedUnit` directly and calls `applyUnitPoseTable()` so all 23/23 units share Layer G parity.
- Sub-views: `lensSection=1..3`, `fabVolume=0..5`, `miraiSubView=1..5` (`beginner|expert`), `original` RIIMOS E1 (128p, 9,700 JPY BOM, 0.135J 8-barrel quadruped, L4 MJCF).

## @CODE_3LAYER
- Layer G (`src/units/<U>.pose.tsv`, loaded by `src/core/flow_pose_loader.ts`): `id\tdx,dy,dz\trx,ry,rz\tsx,sy,sz\texp_dx,dy,dz\tmat_override\tconstraints` (`seat:<parent>:<axis>:<gap>;clear:<other>:<min>;cone:<preset>`). Applied identically across `CompiledV2Unit`, `mi_shoe.ts`, and `scene_extractor.mjs` (0.000mm parity).
- Layer M (pure geometry `src/assemblies/<U>/*.ts`, `src/core/cad_primitives.ts`, slim `src/assemblies/types.ts` + auto-generated `src/assemblies/diagram_types.gen.ts`): top `@FLOW_MAP` header, 0 duplicate prose (`lazyExplanationStub(id)`).
- Layer L (`src/data/<U>.json`): compact 1-part-per-line standard JSON (196k lines -> ~3.6k lines, -98%, 100% Vite static JSON import compatible).
- Indexes (`catalog/`): `INDEX.tsv`, `names/<U>.txt`, `ALL_NAMES.txt`, `spatial/<U>.tsv`, `code/{MAP,SYMBOLS,GRAPH,MATERIALS,HELPERS,SCHEMATICS,CSS_INDEX,DEFECT_MAP}.tsv`.
- Coordinates: Right-handed Y-up, 1 unit = 1 mm; grounded feet near global `minY`; optical axis `+Z` (front `+Z`, EVF/LCD `-Z`).

## @EXAM_DOMAIN (10 PILLARS / 36 ENGINES / 530 TESTS / 16 CROSS-LOCKS)
- P01 Geom/Contact(72): EX01 4-tier 0.001mm clash/SMT(FCL+SP+CGAL), EX02 anti-levitation <=0.08mm(FCL+NX+SP), EX03 6-pose equilibrium(Qhull+HiGHS+OCCT), EX04 6-dir silhouette(CGAL+OpenCV), EX05 exact manifold/tet(CGAL+Gmsh).
- P02 FEA(74): EX06 C3D8 static(CCX), EX07 Lanczos modal 10-4000Hz(CCX), EX08 CTE -20/+85C(CCX), EX09 GD&T MILP/Z3/10k MC(CBC+Z3), EX10 30G shock/1m drop/buckle(CCX+Bullet).
- P03 Multibody/Fatigue(30): EX25 Bullet+ODE 3D dynamics, EX26 S-N/ISTA-3A/SAC305 Coffin-Manson.
- P04 DFM/DFA/Fasteners(90): EX11 CCD explode+Z3 DAG, EX12 fasteners >=2 contacts/tool access, EX13 CGAL SDF wall/draft DFM, EX14 IP54-67 seal loop, EX27 VDI 2230 bolted joints, EX28 DFR/DFS/DFT.
- P05 Thermal/CFD(34): EX29 OpenFOAM 1912 buoyantSimpleFoam CFD, EX15 CCX heat transfer + TIM gap matrix.
- P06 Power/EDA/Wiring/FMEA(66): EX16 ngspice+gnucap PDN/UPS/MC, EX17 KiCad 7.0 ERC/DRC/Gerber/creepage, EX30 FCL 3D A* harness+FreeFEM Z_diff, EX31 ngspice fault inj+FTA.
- P07 EMC/Optics/Acoustics(58): EX18 FreeFEM EMC SE>=40dB/EMI gnd, EX19 100k-ray Fresnel/TIR MC, EX20 sightline cones (`welcome-tof/lux/rf`, `riimos-cam-*`), EX21 Helmholtz acoustics+louver dP.
- P08 Formal/RTL(30): EX32 Z3 16-axiom proof, EX33 Yosys+Verilator+Icarus power/UPS FSM.
- P09 Chem/Rel(26): EX34 galvanic dE/Mg-Cu/dewpoint/outgas, EX35 MIL-HDBK-217F MTBF>=50kh + 5yr Arrhenius.
- P10 Vision/BOM/GPU/Domain(50): EX22 Chrome pp1.1+OpenCV floating islands, EX23 BOM/JSON/validate_parts, EX24 4-tier monotonicity/VRAM=0/build, EX36 KLayout/Netgen-LVS/mission.
- Cross-Locks X01..X16: FCL=SP(2%), CGAL=OCCT_vol(3%), OCCT=Bullet=ODE_mass(1%), Bullet=ODE_react(1.5%), CCX_RF=Load(2%), LP=ODE_react(1.5%), OF_Qin=Qout(5%), Th_Qin=Qout(1%), OF_T=Th_T(12%), ngspice=gnucap(2%), SPICE_P=Th_P(1%), FCL=SP_cone(1%), MC_sum=100%(0.1%), Yosys=Verilator=Icarus(0%), CBC=Z3_tol(1%), IR=CGAL=BOM_N(0%).

## @PERF_AND_HISTORY
- V3 Baselines: Play Ground 1.1 `40.05x` avg speedup / `0.0 draws/s` idle; STD LITE v2 `14.45x` arith / `3.23x` geo, `welcome/lite=2dc/38.2k tris`, `integrated/lite=8dc/135.5k tris`, `maxLeakedCacheRefs=0`.
- History: P12-21 core 9 subsystems+Adreno/APK (627p) -> P27-39 BIONZ/MIShoe/Mic/SensorFab/Mount/LCD/Shutter (2,001p+) -> PR#53-55 V3 Hyper-Opt + `dx` -> PR#56-62 MIRAI Trio, `sp`, `pp1.1`+`sokutei`, WLK-435 0-clash, RIIMOS E1 (128p), THE LAST EXAM V1 -> FLOW V1 OS (2-book AI OS, 12-layer security, `flow heal` 0-token solver, 3-layer codebase, parallel kernel, portable core, `flow human-report`).