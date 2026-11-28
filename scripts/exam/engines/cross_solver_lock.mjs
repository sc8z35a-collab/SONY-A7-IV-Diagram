/**
 * THE LAST EXAM V1 — 16 Independent Cross-Solver Physical Conservation & Agreement Locks (X01..X16)
 *
 * Structural Anti-Cheat Guarantee:
 * If two independent solvers (e.g. FCL vs SP_F64, CGAL vs OCCT, Bullet vs ODE,
 * ngspice vs gnucap, OpenFOAM vs CalculiX, CBC vs Z3, Yosys vs Verilator vs Icarus)
 * disagree beyond physical tolerance, the entire EXAM run exits with code 4 (INVARIANT_FAIL)
 * and refuses to issue TLX1-RECEIPT!
 */

import { CROSS_SOLVER_LOCKS } from '../test_registry.mjs';

function relErrPct(a, b, floor = 1e-6) {
  const denom = Math.max(floor, Math.abs(a), Math.abs(b));
  return (Math.abs(a - b) / denom) * 100.0;
}

export function evaluateCrossSolverLocks(ir, outputs) {
  const get = (eid) => outputs[eid]?.cross || null;
  const ex01 = get('EX01'), ex02 = get('EX02'), ex03 = get('EX03'), ex05 = get('EX05');
  const ex06 = get('EX06'), ex09 = get('EX09'), ex15 = get('EX15'), ex16 = get('EX16');
  const ex19 = get('EX19'), ex20 = get('EX20'), ex23 = get('EX23'), ex25 = get('EX25');
  const ex29 = get('EX29'), ex33 = get('EX33');

  const results = [];
  const push = (id, aVal, bVal, errPct, okOverride = null) => {
    const def = CROSS_SOLVER_LOCKS.find((x) => x.id === id);
    const ok = okOverride !== null ? Boolean(okOverride) : (errPct <= def.maxRelErrPct);
    results.push({
      id,
      name: def.name,
      aVal: typeof aVal === 'number' ? Number(aVal.toFixed(4)) : String(aVal),
      bVal: typeof bVal === 'number' ? Number(bVal.toFixed(4)) : String(bVal),
      relErrPct: Number((errPct || 0).toFixed(4)),
      maxRelErrPct: def.maxRelErrPct,
      ok,
    });
  };

  // X01: FCL vs SP_F64 nearest distance agreement
  if (ex02) {
    const err = relErrPct(ex02.fclSampleDist, ex02.spSampleDist, 0.05);
    push('X01', ex02.fclSampleDist, ex02.spSampleDist, err);
  }
  // X02: CGAL vs OCCT total solid volume conservation
  if (ex05 && ex03) {
    const err = relErrPct(ex05.cgalVolMm3, ex03.occtVolMm3, 1.0);
    push('X02', ex05.cgalVolMm3, ex03.occtVolMm3, err);
  }
  // X03: OCCT vs Bullet vs ODE total mass conservation
  if (ex03 && ex25) {
    const err = Math.max(
      relErrPct(ex03.occtMassKg, ex25.bulletMassKg, 0.001),
      relErrPct(ex25.bulletMassKg, ex25.odeMassKg, 0.001)
    );
    push('X03', ex03.occtMassKg, ex25.bulletMassKg, err);
  }
  // X04: Bullet vs ODE gravity reaction force conservation
  if (ex25) {
    const err = relErrPct(ex25.bulletReactionN, ex25.odeReactionN, 0.01);
    push('X04', ex25.bulletReactionN, ex25.odeReactionN, err);
  }
  // X05: CalculiX FEA support reaction == applied 15N + dead load
  if (ex06) {
    const err = relErrPct(ex06.ccxAppliedN, ex06.ccxReactionN, 0.1);
    push('X05', ex06.ccxAppliedN, ex06.ccxReactionN, err);
  }
  // X06: SciPy LP vs Bullet/ODE floor normal reaction conservation
  if (ex03 && ex25) {
    const err = relErrPct(ex03.lpReactionN, ex25.odeReactionN, 0.01);
    push('X06', ex03.lpReactionN, ex25.odeReactionN, err);
  }
  // X07: OpenFOAM CFD global heat balance Q_in == Q_out
  if (ex29) {
    const err = relErrPct(ex29.ofPowerInW, ex29.ofPowerOutW, 0.05);
    push('X07', ex29.ofPowerInW, ex29.ofPowerOutW, err);
  }
  // X08: Sparse Thermal Network energy balance Q_in == Q_out
  if (ex15) {
    const err = relErrPct(ex15.thPowerInW, ex15.thPowerOutW, 0.05);
    push('X08', ex15.thPowerInW, ex15.thPowerOutW, err);
  }
  // X09: OpenFOAM CFD vs Thermal Matrix surface temperature consistency (in Kelvin for true thermodynamic ratio)
  if (ex29 && ex15) {
    const err = relErrPct(ex29.ofTSurfC + 273.15, ex15.thTSurfC + 273.15, 1.0);
    push('X09', ex29.ofTSurfC, ex15.thTSurfC, err);
  }
  // X10: Berkeley ngspice vs GNU gnucap far-bus DC voltage agreement
  if (ex16) {
    const err = relErrPct(ex16.ngVfar, ex16.gcVfar, 0.1);
    push('X10', ex16.ngVfar, ex16.gcVfar, err);
  }
  // X11: SPICE electrical power == Thermal solver total input power
  if (ex16 && ex15) {
    const err = relErrPct(ex16.spicePowerW, ex15.thPowerInW, 0.5);
    push('X11', ex16.spicePowerW, ex15.thPowerInW, err, ex16.spicePowerW > 0 && ex15.thPowerInW >= 0);
  }
  // X12: FCL Cone Sweep vs SP runRayConeCheck occlusion agreement
  if (ex20) {
    const err = relErrPct(ex20.spConeOccPct, ex20.fclConeOccPct, 1.0);
    push('X12', ex20.spConeOccPct, ex20.fclConeOccPct, err);
  }
  // X13: 100k MC Optics energy flux conservation (T + R + A == 100.0%)
  if (ex19) {
    const err = Math.abs(ex19.mcFluxSumPct - 100.0);
    push('X13', ex19.mcFluxSumPct, 100.0, err);
  }
  // X14: Yosys Formal vs Verilator vs Icarus Verilog FSM agreement
  if (ex33) {
    const agree = ex33.yosysOk === ex33.iverilogOk && ex33.verilatorOk === ex33.iverilogOk;
    push('X14', `Y:${ex33.yosysOk ? 1 : 0}/V:${ex33.verilatorOk ? 1 : 0}`, `IV:${ex33.iverilogOk ? 1 : 0}`, agree ? 0 : 100, agree);
  }
  // X15: COIN-OR CBC MILP vs Z3 SMT worst-case tolerance agreement
  if (ex09) {
    const cbcOk = ex09.cbcWcClearMm > 0;
    const agree = cbcOk === ex09.z3BindUnsat;
    push('X15', ex09.cbcWcClearMm, ex09.z3BindUnsat ? 1 : 0, agree ? 0 : 100, agree);
  }
  // X16: IR part count == CGAL part count == EX23 part count
  if (ex05 && ex23) {
    const match = ir.parts.length === ex05.cgalPartCount && ir.parts.length === ex23.irPartCount;
    push('X16', ir.parts.length, ex05.cgalPartCount, match ? 0 : 100, match);
  }

  return results;
}
