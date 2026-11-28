/**
 * PLYA V2 — EXAM-INHERITED MULTI-PHYSICS VERIFICATION PIPELINE
 *
 * Completely overhauls the Play Ground 1.1 grading engine by inheriting THE LAST EXAM V1's
 * authentic physics architecture directly into the browser:
 *   - Real 3D Triangle BVH clash & nearest surface distance (replacing legacy Box3 heuristics)
 *   - Real signed-volume × real material density mass, 3D CoG & 2D Convex-Hull tipping polygon
 *   - Anti-Levitation grounded contact graph + minimum shift repair vectors (1-click auto-fix!)
 *   - 3D Structural Static FEA [K]{u}={F} + Eigenvalue Modal + CTE & GD&T Cpk
 *   - Real Contact Air-Gap 3D Coupled Thermal Matrix (floating heatsinks genuinely overheat!)
 *   - MNA SPICE Power-Path IR Drop, Burst Droop & 3.3V Brownout Margin
 *   - 3D Raycast Obstacle-Aware Wiring, FMEA Fault Safety, EMC λ/20 & IP65 Seal
 *   - 2,000-Ray Real 3D BVH Monte-Carlo Optics, Helmholtz Acoustics, Galvanic ΔE° & Arrhenius MTBF
 *   - 16 Industrial Solvers / 128 Atomic Assertions (PG-T001..PG-T128)
 *   - Direct 4-Format Industrial Export: KiCad (.kicad_sch), ngspice (.cir), CalculiX (.inp),
 *     and THE LAST EXAM V1 full workspace (.tlx.json -> `node scripts/exam.mjs --playground=<file>`)!
 */

import {
  CameraDesignProfile,
  CameraEngineeringReport,
  evaluateCustomCamera,
  GraderCategoryResult,
  PartDiagnosticFlag,
  PlacedPartSnapshot,
} from './CameraEngineeringGrader';
import {
  ExamStrictnessMode,
  PgAssertionRecord,
  PgDeepPhysicsReport,
  PgSolverSummary,
  PlyaV2SolverId,
  runExamInheritedPlaygroundGrader,
  SerializedPgPart,
} from './exam_core/BrowserPhysicsSolvers';
import {
  getLocalMeshSummary,
  transformLocalTrisToWorld,
} from './exam_core/ExactMeshBvh';
import { resolvePlaygroundMaterial } from './exam_core/MaterialPhysicsDb';

export type { ExamStrictnessMode, PgAssertionRecord, PgDeepPhysicsReport, PgSolverSummary, PlyaV2SolverId };

export type PlyaToolId = PlyaV2SolverId;

export interface PlyaToolResult {
  readonly id: PlyaToolId;
  readonly examSource: string;
  readonly toolName: string;
  readonly domainJa: string;
  readonly status: 'pass' | 'warn' | 'fail';
  readonly score: number;
  readonly metricBadge: string;
  readonly plainVerdict: string;
  readonly fixHint: string;
  readonly flaggedUids: readonly string[];
  readonly assertions: readonly PgAssertionRecord[];
  readonly durationMs: number;
}

export interface PlyaWebContext {
  readonly isOnline: boolean;
  readonly webgl2: boolean;
  readonly totalTriangles: number;
}

export interface PlyaIndustrialMetrics {
  readonly mode: 'camera' | 'wlk220_optical' | 'robotics' | 'custom_mech';
  readonly socJunctionC: number;
  readonly chassisSurfaceC: number;
  readonly spiceIrDropMv: number;
  readonly spiceMcu3v3MinV: number;
  readonly feaSafetyFactor: number;
  readonly tippingAngleDeg: number;
  readonly maxDeflectionUm: number;
  readonly modalF1Hz: number;
  readonly maxSeatGapMm: number;
  readonly maxWiringRouteMm: number;
  readonly galvanicSevereCount: number;
  readonly mtbfHours: number;
}

export interface PlyaPipelineReport {
  readonly version: 'PLYA-V2-EXAM';
  readonly strictness: ExamStrictnessMode;
  readonly executedAt: string;
  readonly totalDurationMs: number;
  readonly tools: readonly PlyaToolResult[];
  readonly passCount: number;
  readonly warnCount: number;
  readonly failCount: number;
  readonly assertionPassCount: number;
  readonly assertionWarnCount: number;
  readonly assertionFailCount: number;
  readonly assertionTotalCount: number;
  readonly simpleHeadline: string;
  readonly quickFixes: readonly string[];
  readonly engineeringReport: CameraEngineeringReport;
  readonly visualFlags: ReadonlyMap<string, PartDiagnosticFlag>;
  readonly industrialMetrics: PlyaIndustrialMetrics;
  readonly deepReport: PgDeepPhysicsReport;
}

/**
 * Serialize PlacedPartSnapshots (with decoded real 3D world triangles!) into WebWorker-ready payload.
 */
export function serializeSnapshotsForExamEngine(parts: readonly PlacedPartSnapshot[]): SerializedPgPart[] {
  const out: SerializedPgPart[] = new Array(parts.length);
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const wb = p.worldBox;
    const box: [number, number, number, number, number, number] = [
      wb.min.x, wb.min.y, wb.min.z, wb.max.x, wb.max.y, wb.max.z,
    ];
    let tris: Float32Array;
    let volumeMm3: number;
    let areaMm2: number;
    let nonFiniteCount = 0;
    let degenerateCount = 0;

    if (p.blueprint && p.worldMatrixElements) {
      const local = getLocalMeshSummary(p.blueprint);
      tris = transformLocalTrisToWorld(local.localTris, p.worldMatrixElements);
      const sx = Math.abs(p.scale.x), sy = Math.abs(p.scale.y), sz = Math.abs(p.scale.z);
      volumeMm3 = local.signedVolumeMm3 * sx * sy * sz;
      const sAvg = (sx + sy + sz) / 3;
      areaMm2 = local.surfaceAreaMm2 * sAvg * sAvg;
      nonFiniteCount = local.nonFiniteCount;
      degenerateCount = local.degenerateCount;
    } else {
      // Fallback 12-triangle box mesh when snapshot came from unit test without GPU blueprint
      const [x0, y0, z0, x1, y1, z1] = box;
      tris = new Float32Array([
        x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y0, z1, x1, y1, z1, x0, y1, z1,
        x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y0, z0, x0, y1, z0, x1, y1, z0,
        x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y0, z0, x0, y1, z1, x0, y1, z0,
        x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y0, z1, x1, y1, z0, x1, y1, z1,
        x0, y1, z1, x1, y1, z1, x1, y1, z0, x0, y1, z1, x1, y1, z0, x0, y1, z0,
        x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z0, x1, y0, z1, x0, y0, z1,
      ]);
      const dx = Math.max(0.5, x1 - x0), dy = Math.max(0.5, y1 - y0), dz = Math.max(0.5, z1 - z0);
      volumeMm3 = dx * dy * dz * 0.6;
      areaMm2 = 2 * (dx * dy + dy * dz + dz * dx);
    }

    out[i] = {
      uid: p.uid,
      entry: p.entry,
      box,
      center: [p.worldCenter.x, p.worldCenter.y, p.worldCenter.z],
      size: [p.worldSize.x, p.worldSize.y, p.worldSize.z],
      position: [p.position.x, p.position.y, p.position.z],
      scale: [p.scale.x, p.scale.y, p.scale.z],
      tris,
      volumeMm3,
      areaMm2,
      nonFiniteCount,
      degenerateCount,
    };
  }
  return out;
}

/**
 * Assemble a complete PlyaPipelineReport from a PgDeepPhysicsReport + base camera metadata.
 * Shared identically by both synchronous evaluation and asynchronous WebWorker completion!
 */
export function buildPlyaReportFromDeepPhysics(
  parts: readonly PlacedPartSnapshot[],
  profile: CameraDesignProfile,
  deep: PgDeepPhysicsReport
): PlyaPipelineReport {
  const base = evaluateCustomCamera(parts, profile);
  const visualFlags = new Map<string, PartDiagnosticFlag>();
  for (const [uid, diag] of Object.entries(deep.overlays.partDiagnostics)) {
    visualFlags.set(uid, { uid, severity: diag.severity, reason: diag.reason });
  }

  const tools: PlyaToolResult[] = deep.solvers.map((s) => ({
    id: s.id,
    examSource: s.examSource,
    toolName: s.toolName,
    domainJa: s.domainJa,
    status: s.status,
    score: s.score,
    metricBadge: s.metricBadge,
    plainVerdict: s.plainVerdict,
    fixHint: s.fixHint,
    flaggedUids: s.flaggedUids,
    assertions: s.assertions,
    durationMs: s.durationMs,
  }));

  const sById = new Map(deep.solvers.map((s) => [s.id, s]));
  const sc = (id: PlyaV2SolverId) => sById.get(id)?.score ?? 0;
  const st = (id: PlyaV2SolverId) => sById.get(id)?.status ?? 'fail';
  const fd = (id: PlyaV2SolverId) => sById.get(id)?.plainVerdict ?? '';
  const ad = (id: PlyaV2SolverId) => sById.get(id)?.fixHint ?? '';

  // Map the 16 EXAM-inherited solvers onto the 10-Axis Engineering Radar categories cleanly
  const categories: GraderCategoryResult[] = [
    { id: 'optics', nameJa: '1. 3D光線追跡・結像 (EX19/20)', shortLabel: '光学MC', score: sc('pg_optics_mc'), maxScore: 100, status: st('pg_optics_mc'), finding: fd('pg_optics_mc'), advice: ad('pg_optics_mc') },
    { id: 'clash', nameJa: '2. 実3D三角形BVH干渉 (EX01/05)', shortLabel: '3D干渉', score: sc('pg_mesh_clash'), maxScore: 100, status: st('pg_mesh_clash'), finding: fd('pg_mesh_clash'), advice: ad('pg_mesh_clash') },
    { id: 'float', nameJa: '3. 浮きゼロ接地連結 (EX02)', shortLabel: '接地', score: sc('pg_zero_float'), maxScore: 100, status: st('pg_zero_float'), finding: fd('pg_zero_float'), advice: ad('pg_zero_float') },
    { id: 'fea', nameJa: '4. 構造FEA・固有振動 (EX06/07)', shortLabel: 'FEA', score: Math.round((sc('pg_fea_static') + sc('pg_modal_vib')) * 0.5), maxScore: 100, status: st('pg_fea_static'), finding: fd('pg_fea_static'), advice: ad('pg_fea_static') },
    { id: 'power', nameJa: '5. MNA SPICE・FMEA (EX16/31)', shortLabel: '電源', score: Math.round((sc('pg_mna_spice') + sc('pg_fmea_safety')) * 0.5), maxScore: 100, status: st('pg_mna_spice'), finding: fd('pg_mna_spice'), advice: ad('pg_mna_spice') },
    { id: 'wiring', nameJa: '6. 3D配線・KiCad ERC (EX17/30)', shortLabel: '3D配線', score: sc('pg_wiring_3d'), maxScore: 100, status: st('pg_wiring_3d'), finding: fd('pg_wiring_3d'), advice: ad('pg_wiring_3d') },
    { id: 'thermal', nameJa: '7. 接触熱回路網 (EX15/29)', shortLabel: '熱解析', score: sc('pg_thermal_net'), maxScore: 100, status: st('pg_thermal_net'), finding: fd('pg_thermal_net'), advice: ad('pg_thermal_net') },
    { id: 'dfm', nameJa: '8. DFM加工・DFA逆組立 (EX11-13)', shortLabel: 'DFM/A', score: Math.round((sc('pg_dfm_dfa') + sc('pg_cte_tolerance')) * 0.5), maxScore: 100, status: st('pg_dfm_dfa'), finding: fd('pg_dfm_dfa'), advice: ad('pg_dfm_dfa') },
    { id: 'emc', nameJa: '9. EMC遮蔽・IP・音響 (EX14/18/21)', shortLabel: 'EMC/IP', score: Math.round((sc('pg_emc_ip') + sc('pg_acoustics')) * 0.5), maxScore: 100, status: st('pg_emc_ip'), finding: fd('pg_emc_ip'), advice: ad('pg_emc_ip') },
    { id: 'life', nameJa: '10. 重心転倒・電食・MTBF (EX03/34/35)', shortLabel: '安定/寿命', score: Math.round((sc('pg_gravity_tip') + sc('pg_galvanic_life')) * 0.5), maxScore: 100, status: st('pg_gravity_tip'), finding: fd('pg_gravity_tip'), advice: ad('pg_gravity_tip') },
  ];

  const profileLabel =
    deep.domainMode === 'wlk_optical'
      ? 'WLK 光学キネティック装置 (EXAM基準)'
      : deep.domainMode === 'robotics'
        ? 'RIIMOS ロボティクス機構 (EXAM基準)'
        : `${base.resolvedProfileLabel} (${deep.strictness === 'exam_strict' ? 'EXAM極限' : '標準設計'})`;

  const engineeringReport: CameraEngineeringReport = {
    ...base,
    resolvedProfileLabel: profileLabel,
    totalScore: deep.totalScore,
    rank: deep.rank,
    operationalVerdict: deep.operationalVerdict,
    canOperate: deep.canOperate,
    engineerSummary: deep.simpleHeadline,
    categories,
    metrics: {
      ...base.metrics,
      partCount: parts.length,
      flangeDistanceMm: deep.telemetry.flangeDistanceMm,
      opticalEccentricityMm: deep.telemetry.opticalEccentricityMm,
      severeCollisionCount: deep.telemetry.severeCollisionCount,
      floatingPartCount: deep.telemetry.floatingPartCount,
    },
    telemetry: {
      estimatedMassG: deep.telemetry.estimatedMassG,
      centerOfGravityMm: deep.telemetry.centerOfGravityMm,
      peakPowerW: deep.telemetry.peakPowerW,
      estimatedBatteryShots: deep.telemetry.estimatedBatteryShots,
      thermal4k60pMin: deep.telemetry.thermal4k60pMin,
      vignettingPct: deep.telemetry.vignettingPct,
      disconnectedClusters: deep.telemetry.disconnectedClusters,
    },
    topActions: deep.quickFixes,
    partDiagnostics: visualFlags,
  };

  return {
    version: 'PLYA-V2-EXAM',
    strictness: deep.strictness,
    executedAt: new Date().toISOString(),
    totalDurationMs: deep.totalDurationMs,
    tools,
    passCount: deep.solverPassCount,
    warnCount: deep.solverWarnCount,
    failCount: deep.solverFailCount,
    assertionPassCount: deep.assertionPassCount,
    assertionWarnCount: deep.assertionWarnCount,
    assertionFailCount: deep.assertionFailCount,
    assertionTotalCount: deep.assertions.length,
    simpleHeadline: deep.simpleHeadline,
    quickFixes: deep.quickFixes,
    engineeringReport,
    visualFlags,
    industrialMetrics: {
      mode: deep.domainMode === 'wlk_optical' ? 'wlk220_optical' : deep.domainMode,
      socJunctionC: deep.telemetry.socJunctionC,
      chassisSurfaceC: deep.telemetry.chassisSurfaceC,
      spiceIrDropMv: deep.telemetry.spiceIrDropMv,
      spiceMcu3v3MinV: deep.telemetry.spiceMcu3v3MinV,
      feaSafetyFactor: deep.telemetry.feaSafetyFactor,
      tippingAngleDeg: deep.telemetry.tippingAngleDeg,
      maxDeflectionUm: deep.telemetry.maxDeflectionUm,
      modalF1Hz: deep.telemetry.modalF1Hz,
      maxSeatGapMm: deep.telemetry.maxSeatGapMm,
      maxWiringRouteMm: deep.telemetry.maxWiringRouteMm,
      galvanicSevereCount: deep.telemetry.galvanicSevereCount,
      mtbfHours: deep.telemetry.mtbfHours,
    },
    deepReport: deep,
  };
}

/**
 * Synchronous PLYA V2 entrypoint (used for immediate evaluation, tests, and fallback).
 */
export function runPlyaVerificationPipeline(
  parts: readonly PlacedPartSnapshot[],
  profile: CameraDesignProfile = 'auto',
  webCtx?: Partial<PlyaWebContext>,
  strictness: ExamStrictnessMode = 'design'
): PlyaPipelineReport {
  const serialized = serializeSnapshotsForExamEngine(parts);
  const deep = runExamInheritedPlaygroundGrader(serialized, strictness, webCtx);
  return buildPlyaReportFromDeepPhysics(parts, profile, deep);
}

/**
 * 1. Real KiCad 7.0 `.kicad_sch` schematic exporter synthesized from the current 3D assembly.
 */
export function generatePlaygroundKiCadSchematic(
  parts: readonly PlacedPartSnapshot[],
  plya: PlyaPipelineReport
): string {
  const esc = (s: string) => s.replace(/["\\]/g, '_');
  const uuidOf = (seed: number) =>
    `00000000-0000-4000-8000-${String(100000000000 + seed).slice(0, 12)}`;
  const rootUuid = uuidOf(1);
  const busV = plya.industrialMetrics.mode === 'wlk220_optical' ? '+12V_BUS' : '+7V2_VBAT';

  const elecParts = parts.filter((p) =>
    ['battery', 'mainboard', 'bionz', 'sensor', 'storage', 'evf', 'lcd', 'audio', 'mishoe', 'sculpture'].includes(p.entry.role)
  );
  const chosen = (elecParts.length > 0 ? elecParts : parts).slice(0, 24);
  const symbols: string[] = [];
  const wires: string[] = [];
  const labels: string[] = [];

  chosen.forEach((p, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const x = 40.64 + col * 63.5;
    const y = 38.1 + row * 33.02;
    const ref = `U${idx + 1}`;
    const val = esc(p.entry.partId);
    const sigNet =
      p.entry.role === 'sensor' ? 'MIPI_CSI2'
      : p.entry.role === 'storage' ? 'PCIE_GEN3'
      : p.entry.role === 'audio' ? 'I2S_AUD'
      : p.entry.role === 'evf' || p.entry.role === 'lcd' ? 'MIPI_DSI'
      : 'SYS_BUS';

    symbols.push(
      `  (symbol (lib_id "PG:MODULE") (at ${x.toFixed(2)} ${y.toFixed(2)} 0) (unit 1)\n` +
      `    (in_bom yes) (on_board yes) (dnp no)\n` +
      `    (uuid "${uuidOf(100 + idx * 10)}")\n` +
      `    (property "Reference" "${ref}" (at ${x.toFixed(2)} ${(y - 7.62).toFixed(2)} 0) (effects (font (size 1.27 1.27))))\n` +
      `    (property "Value" "${val}" (at ${x.toFixed(2)} ${(y + 7.62).toFixed(2)} 0) (effects (font (size 1.0 1.0))))\n` +
      `    (property "Footprint" "PG:MOD_3D" (at ${x.toFixed(2)} ${y.toFixed(2)} 0) (effects (font (size 1.0 1.0)) hide))\n` +
      `    (property "Datasheet" "" (at ${x.toFixed(2)} ${y.toFixed(2)} 0) (effects (font (size 1.0 1.0)) hide))\n` +
      `    (pin "1" (uuid "${uuidOf(101 + idx * 10)}"))\n` +
      `    (pin "2" (uuid "${uuidOf(102 + idx * 10)}"))\n` +
      `    (pin "3" (uuid "${uuidOf(103 + idx * 10)}"))\n` +
      `    (instances (project "playground_v2_exam" (path "/${rootUuid}" (reference "${ref}") (unit 1))))\n` +
      `  )`
    );
    const p1x = x - 12.7, p1y = y - 2.54, p2y = y + 2.54, p3x = x + 12.7;
    wires.push(
      `  (wire (pts (xy ${p1x.toFixed(2)} ${p1y.toFixed(2)}) (xy ${(p1x - 5.08).toFixed(2)} ${p1y.toFixed(2)})) (stroke (width 0) (type default)) (uuid "${uuidOf(500 + idx * 3)}"))`,
      `  (wire (pts (xy ${p1x.toFixed(2)} ${p2y.toFixed(2)}) (xy ${(p1x - 5.08).toFixed(2)} ${p2y.toFixed(2)})) (stroke (width 0) (type default)) (uuid "${uuidOf(501 + idx * 3)}"))`,
      `  (wire (pts (xy ${p3x.toFixed(2)} ${y.toFixed(2)}) (xy ${(p3x + 5.08).toFixed(2)} ${y.toFixed(2)})) (stroke (width 0) (type default)) (uuid "${uuidOf(502 + idx * 3)}"))`
    );
    labels.push(
      `  (global_label "${busV}" (shape bidirectional) (at ${(p1x - 5.08).toFixed(2)} ${p1y.toFixed(2)} 180) (effects (font (size 1.0 1.0)) (justify right)) (uuid "${uuidOf(800 + idx * 3)}"))`,
      `  (global_label "GND" (shape bidirectional) (at ${(p1x - 5.08).toFixed(2)} ${p2y.toFixed(2)} 180) (effects (font (size 1.0 1.0)) (justify right)) (uuid "${uuidOf(801 + idx * 3)}"))`,
      `  (global_label "${sigNet}" (shape bidirectional) (at ${(p3x + 5.08).toFixed(2)} ${y.toFixed(2)} 0) (effects (font (size 1.0 1.0)) (justify left)) (uuid "${uuidOf(802 + idx * 3)}"))`
    );
  });

  return `(kicad_sch (version 20230121) (generator playground_plya_v2_exam)
  (uuid "${rootUuid}")
  (paper "A3")
  (title_block (title "PLYA V2 EXAM-Inherited Assembly — ${plya.engineeringReport.totalScore}/1000 (${plya.engineeringReport.rank}) · ${plya.assertionPassCount}/${plya.assertionTotalCount} PASS") (rev "2.0"))
  (lib_symbols
    (symbol "PG:MODULE" (in_bom yes) (on_board yes)
      (property "Reference" "U" (at 0 2.54 0) (effects (font (size 1.27 1.27))))
      (property "Value" "MODULE" (at 0 -2.54 0) (effects (font (size 1.27 1.27))))
      (property "Footprint" "" (at 0 0 0) (effects (font (size 1.27 1.27)) hide))
      (property "Datasheet" "" (at 0 0 0) (effects (font (size 1.27 1.27)) hide))
      (symbol "MODULE_0_1" (rectangle (start -10.16 5.08) (end 10.16 -5.08) (stroke (width 0.254) (type default)) (fill (type background))))
      (symbol "MODULE_1_1"
        (pin bidirectional line (at -12.70 2.54 0) (length 2.54) (name "PWR" (effects (font (size 1.0 1.0)))) (number "1" (effects (font (size 1.0 1.0)))))
        (pin bidirectional line (at -12.70 -2.54 0) (length 2.54) (name "GND" (effects (font (size 1.0 1.0)))) (number "2" (effects (font (size 1.0 1.0)))))
        (pin bidirectional line (at 12.70 0.00 180) (length 2.54) (name "BUS" (effects (font (size 1.0 1.0)))) (number "3" (effects (font (size 1.0 1.0)))))
      )
    )
  )
${symbols.join('\n')}
${wires.join('\n')}
${labels.join('\n')}
  (sheet_instances (path "/" (page "1")))
)
`;
}

/**
 * 2. Real Berkeley `ngspice` `.cir` deck synthesized from PLYA V2 MNA + Contact Thermal results.
 */
export function generatePlaygroundNgspiceNetlist(
  parts: readonly PlacedPartSnapshot[],
  plya: PlyaPipelineReport
): string {
  const m = plya.industrialMetrics;
  const busV = m.mode === 'wlk220_optical' ? 12.0 : 7.2;
  const loadW = Math.max(1.5, plya.engineeringReport.telemetry.peakPowerW || 3.5);
  const iLoad = loadW / busV;
  const rPath = Math.max(0.018, (m.spiceIrDropMv / 1000) / Math.max(0.2, iLoad));
  const rThSc = Math.max(0.5, (m.socJunctionC - m.chassisSurfaceC) / Math.max(0.5, loadW * 0.7));
  const rThCa = Math.max(0.5, (m.chassisSurfaceC - 25.0) / Math.max(0.5, loadW));

  return `* PLYA V2 (EXAM-INHERITED) AUTO-SYNTHESIZED NGSPICE POWER & ELECTRO-THERMAL DECK
* Parts: ${parts.length} | Score: ${plya.engineeringReport.totalScore}/1000 (${plya.engineeringReport.rank}) | Assertions: ${plya.assertionPassCount}/${plya.assertionTotalCount}
* Real Predicted: IR=${m.spiceIrDropMv}mV | 3.3V_Min=${m.spiceMcu3v3MinV}V | Tj=${m.socJunctionC}C | Tsurf=${m.chassisSurfaceC}C

V_SRC v_src 0 DC ${busV.toFixed(2)}
R_PATH v_src v_bus ${rPath.toFixed(5)}
C_BULK v_bus c_esr 470u IC=${busV.toFixed(2)}
R_ESR c_esr 0 0.015
I_LOAD v_bus 0 PULSE(${iLoad.toFixed(3)} ${(iLoad * 1.4).toFixed(3)} 2m 20u 20u 1m 4m)
B_LDO ldo_int 0 V = min(3.30, max(0, v(v_bus) - 0.65))
R_LDO ldo_int v_3v3 0.04
C_LDO v_3v3 0 47u IC=3.30
R_MCU v_3v3 0 11.0

* Coupled Electro-Thermal Network (derived from real 3D contact graph)
V_AMB t_amb 0 DC 25.0
I_Q_SOC 0 t_soc DC ${(loadW * 0.7).toFixed(2)}
R_TH_SC t_soc t_chassis ${rThSc.toFixed(3)}
R_TH_CA t_chassis t_amb ${rThCa.toFixed(3)}

.control
set noaskquit
tran 10u 6m uic
meas tran v_bus_min MIN v(v_bus) FROM=0.5m TO=6m
meas tran v_3v3_min MIN v(v_3v3) FROM=0.5m TO=6m
meas tran t_soc_c AVG v(t_soc) FROM=4m TO=6m
meas tran t_surf_c AVG v(t_chassis) FROM=4m TO=6m
echo "PLYA_V2_V_BUS_MIN=$&v_bus_min"
echo "PLYA_V2_V_3V3_MIN=$&v_3v3_min"
echo "PLYA_V2_T_SOC_C=$&t_soc_c"
echo "PLYA_V2_T_SURF_C=$&t_surf_c"
quit
.endc
.end
`;
}

/**
 * 3. Real CalculiX `ccx` 3D C3D8 structural FEA `.inp` deck synthesized from current 3D assembly envelope & mass!
 */
export function generatePlaygroundCalculiXDeck(
  parts: readonly PlacedPartSnapshot[],
  plya: PlyaPipelineReport
): string {
  const env = plya.engineeringReport.metrics.envelopeMm;
  const L = Math.max(20, env[0] || 130);
  const H = Math.max(8, Math.min(35, (env[1] || 40) * 0.35));
  const W = Math.max(15, env[2] || 60);
  const deadN = Math.max(0.5, (plya.engineeringReport.telemetry.estimatedMassG / 1000) * 9.80665);
  const lines = [
    '*HEADING',
    `PLYA V2 EXAM-Inherited CalculiX 3D C3D8 Static FEA (${parts.length} parts, ${plya.engineeringReport.telemetry.estimatedMassG}g)`,
    '*NODE',
    `1, 0.0, 0.0, 0.0`, `2, ${(L * 0.5).toFixed(2)}, 0.0, 0.0`, `3, ${L.toFixed(2)}, 0.0, 0.0`,
    `4, 0.0, ${H.toFixed(2)}, 0.0`, `5, ${(L * 0.5).toFixed(2)}, ${H.toFixed(2)}, 0.0`, `6, ${L.toFixed(2)}, ${H.toFixed(2)}, 0.0`,
    `7, 0.0, 0.0, ${W.toFixed(2)}`, `8, ${(L * 0.5).toFixed(2)}, 0.0, ${W.toFixed(2)}`, `9, ${L.toFixed(2)}, 0.0, ${W.toFixed(2)}`,
    `10, 0.0, ${H.toFixed(2)}, ${W.toFixed(2)}`, `11, ${(L * 0.5).toFixed(2)}, ${H.toFixed(2)}, ${W.toFixed(2)}`, `12, ${L.toFixed(2)}, ${H.toFixed(2)}, ${W.toFixed(2)}`,
    '*ELEMENT, TYPE=C3D8, ELSET=EALL',
    '1, 1, 2, 5, 4, 7, 8, 11, 10',
    '2, 2, 3, 6, 5, 8, 9, 12, 11',
    '*MATERIAL, NAME=AZ91D_MG',
    '*ELASTIC', '45000.0, 0.35',
    '*SOLID SECTION, ELSET=EALL, MATERIAL=AZ91D_MG',
    '*STEP', '*STATIC', '*BOUNDARY',
    '1, 1, 3, 0.0', '3, 1, 3, 0.0', '7, 1, 3, 0.0', '9, 1, 3, 0.0',
    '*CLOAD',
    `5, 2, ${(-(deadN + 15.0) * 0.5).toFixed(4)}`,
    `11, 2, ${(-(deadN + 15.0) * 0.5).toFixed(4)}`,
    '*NODE PRINT, NSET=NALL', 'U',
    '*EL PRINT, ELSET=EALL', 'S',
    '*END STEP',
  ];
  return lines.join('\n') + '\n';
}

/**
 * 4. Real THE LAST EXAM V1 `.tlx.json` workspace exporter!
 * Pass the exported file directly to: `node scripts/exam.mjs --playground=<file.tlx.json>`
 * to run ALL 36 external industrial engines (CalculiX, OpenFOAM, Bullet+ODE, ngspice, KiCad, Z3, CGAL, FCL)
 * and 530 fixed tests on the user's custom Play Ground 3D build!
 */
export function generatePlaygroundExamWorkspaceJson(
  parts: readonly PlacedPartSnapshot[],
  plya: PlyaPipelineReport
): string {
  const serialized = serializeSnapshotsForExamEngine(parts);
  const payload = {
    schema: 'TLX1-PLAYGROUND-BLUEPRINT-V1',
    exportedAt: new Date().toISOString(),
    name: `pg_${plya.industrialMetrics.mode}`,
    busVoltageV: plya.industrialMetrics.mode === 'wlk220_optical' ? 12.0 : 7.2,
    plyaV2Score: plya.engineeringReport.totalScore,
    plyaV2Rank: plya.engineeringReport.rank,
    plyaV2Assertions: `${plya.assertionPassCount}/${plya.assertionTotalCount}`,
    parts: serialized.map((s) => {
      const mat = resolvePlaygroundMaterial(s.entry);
      return {
        id: `${s.entry.partId}_${s.uid.slice(-4)}`,
        partId: s.entry.partId,
        unitId: s.entry.unitId,
        title: s.entry.title,
        subtitle: s.entry.subtitle,
        role: s.entry.role,
        materialKey: mat.preset,
        box: s.box,
        pos: s.position,
        cog: s.center,
        volumeMm3: Number(s.volumeMm3.toFixed(3)),
        massG: Number(((s.volumeMm3 / 1000) * mat.rho).toFixed(3)),
        tris: Array.from(s.tris).map((v) => Number(v.toFixed(3))),
      };
    }),
  };
  return JSON.stringify(payload, null, 2);
}
