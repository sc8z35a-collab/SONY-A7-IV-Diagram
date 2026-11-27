import * as THREE from 'three';
import { CatalogPartEntry, EngineeringRole } from './PartGeometryExtractor';

export type CameraDesignProfile =
  | 'auto'
  | 'mirrorless'
  | 'compact'
  | 'cinema'
  | 'action'
  | 'custom';

export const CAMERA_PROFILE_LABELS: Record<CameraDesignProfile, string> = {
  auto: '自動最適判定',
  mirrorless: '一眼ミラーレス',
  compact: '高級コンパクト',
  cinema: 'シネマ / FX',
  action: 'VLOG / アクション',
  custom: '自由実験設計',
};

export interface PlacedPartSnapshot {
  readonly uid: string;
  readonly entry: CatalogPartEntry;
  readonly worldBox: THREE.Box3;
  readonly worldCenter: THREE.Vector3;
  readonly worldSize: THREE.Vector3;
  readonly position: THREE.Vector3;
  readonly rotationEuler: THREE.Euler;
  readonly scale: THREE.Vector3;
}

export interface GraderCategoryResult {
  readonly id: string;
  readonly nameJa: string;
  readonly shortLabel: string;
  readonly score: number;
  readonly maxScore: number;
  readonly status: 'pass' | 'warn' | 'fail';
  readonly finding: string;
  readonly advice: string;
}

export interface PartDiagnosticFlag {
  readonly uid: string;
  readonly severity: 'ok' | 'warn' | 'error';
  readonly reason: string;
}

export interface CameraPhysicalTelemetry {
  readonly estimatedMassG: number;
  readonly centerOfGravityMm: readonly [number, number, number];
  readonly peakPowerW: number;
  readonly estimatedBatteryShots: number;
  readonly thermal4k60pMin: number;
  readonly vignettingPct: number;
  readonly disconnectedClusters: number;
}

export interface CameraEngineeringReport {
  readonly version: '1.1';
  readonly requestedProfile: CameraDesignProfile;
  readonly resolvedProfile: Exclude<CameraDesignProfile, 'auto'>;
  readonly resolvedProfileLabel: string;
  readonly totalScore: number; // 0 - 1000
  readonly maxScore: 1000;
  readonly rank: 'S+' | 'S' | 'A' | 'B' | 'C' | 'F';
  readonly operationalVerdict:
    | '撮影動作可能（量産設計水準）'
    | '撮影動作可能（実写成立）'
    | '条件付きで動作可能'
    | '設計改修が必要'
    | '撮影動作不可';
  readonly canOperate: boolean;
  readonly engineerSummary: string;
  readonly categories: readonly GraderCategoryResult[];
  readonly metrics: {
    readonly partCount: number;
    readonly uniqueSubsystems: number;
    readonly flangeDistanceMm: number | null;
    readonly opticalEccentricityMm: number | null;
    readonly severeCollisionCount: number;
    readonly floatingPartCount: number;
    readonly envelopeMm: readonly [number, number, number];
  };
  readonly telemetry: CameraPhysicalTelemetry;
  readonly topActions: readonly string[];
  readonly partDiagnostics: ReadonlyMap<string, PartDiagnosticFlag>;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function boxDistance(a: THREE.Box3, b: THREE.Box3): number {
  const dx = Math.max(0, Math.max(a.min.x - b.max.x, b.min.x - a.max.x));
  const dy = Math.max(0, Math.max(a.min.y - b.max.y, b.min.y - a.max.y));
  const dz = Math.max(0, Math.max(a.min.z - b.max.z, b.min.z - a.max.z));
  return Math.hypot(dx, dy, dz);
}

/** Realistic single-module baseline mass (grams) used for 3D CoG and mass telemetry */
const ROLE_BASE_MASS_G: Record<EngineeringRole, number> = {
  lens: 175,
  mount: 48,
  shutter: 38,
  sensor: 66,
  mainboard: 44,
  bionz: 18,
  battery: 83,
  storage: 14,
  evf: 42,
  lcd: 74,
  body: 165,
  audio: 26,
  thermal_emi: 28,
  mishoe: 22,
  accessory: 30,
  sculpture: 24,
};

function estimatePartMassG(p: PlacedPartSnapshot): number {
  const base = ROLE_BASE_MASS_G[p.entry.role] ?? 30;
  const scaleAvg = (p.scale.x + p.scale.y + p.scale.z) / 3;
  const volFactor = clamp(Math.pow(scaleAvg, 2.2), 0.25, 4.0);
  return base * volFactor;
}

/**
 * Resolve the fairest camera design profile when user selects 'auto', so creative
 * cameras (EVF-less FX3/ZV-E1 cinema/VLOG rigs, fixed-lens compacts, global-shutter
 * electronic cameras, or hybrid rigs) are graded accurately without false penalties!
 */
function resolveAutoProfile(
  parts: readonly PlacedPartSnapshot[],
  envSize: THREE.Vector3
): Exclude<CameraDesignProfile, 'auto'> {
  const hasMount = parts.some((p) => p.entry.role === 'mount');
  const hasEvf = parts.some((p) => p.entry.role === 'evf');
  const hasShutter = parts.some((p) => p.entry.role === 'shutter');
  const hasAudioOrShoe = parts.some((p) => p.entry.role === 'audio' || p.entry.role === 'mishoe');
  const hasThermal = parts.some((p) => p.entry.role === 'thermal_emi');
  const hasWelcome = parts.some((p) => p.entry.unitId === 'welcome');
  const maxDim = Math.max(envSize.x, envSize.y, envSize.z);

  if (hasWelcome && parts.filter((p) => p.entry.unitId === 'welcome').length >= parts.length * 0.4) {
    return 'custom';
  }
  if (!hasMount && maxDim > 0 && maxDim <= 145) {
    return 'compact';
  }
  if (!hasEvf && hasAudioOrShoe && (hasThermal || !hasShutter)) {
    return 'cinema';
  }
  if (!hasEvf && !hasShutter && maxDim > 0 && maxDim <= 135) {
    return 'action';
  }
  return 'mirrorless';
}

/**
 * Play Ground 1.1 Chief Camera Systems Engineer 1,000-Point Operational Grader.
 *
 * Major 1.1 upgrades over 1.0:
 *  - 6 Camera Design Profiles (`auto` / `mirrorless` / `compact` / `cinema` / `action` / `custom`)
 *    for both higher engineering precision AND higher creative design freedom.
 *  - True 3D Optical Cone Vignetting / Obstruction Ray-Corridor verification (Lens -> Mount -> 36x24mm Sensor).
 *  - BFS Structural Connectivity Graph detecting genuinely disconnected floating sub-assemblies.
 *  - Core-Box 0.78× Solid Interference check eliminating false-positive contact warnings.
 *  - Real-World Physical Telemetry Simulation: Total Mass (g), Mass-Weighted 3D Center of Gravity (mm),
 *    Peak Power (W), Estimated CIPA Shots, Continuous 4K60p Thermal Limit (min), Vignetting %.
 */
export function evaluateCustomCamera(
  parts: readonly PlacedPartSnapshot[],
  requestedProfile: CameraDesignProfile = 'auto'
): CameraEngineeringReport {
  const partDiagnostics = new Map<string, PartDiagnosticFlag>();
  const markPart = (uid: string, severity: 'ok' | 'warn' | 'error', reason: string) => {
    const prev = partDiagnostics.get(uid);
    const rank = { ok: 0, warn: 1, error: 2 };
    if (!prev || rank[severity] > rank[prev.severity]) {
      partDiagnostics.set(uid, { uid, severity, reason });
    }
  };

  for (const p of parts) {
    partDiagnostics.set(p.uid, { uid: p.uid, severity: 'ok', reason: '正常配置' });
  }

  const byRole = (role: EngineeringRole): PlacedPartSnapshot[] =>
    parts.filter((p) => p.entry.role === role);

  const lenses = byRole('lens');
  const mounts = byRole('mount');
  const shutters = byRole('shutter');
  const sensors = byRole('sensor');
  const mainboards = byRole('mainboard');
  const bionzs = byRole('bionz');
  const batteries = byRole('battery');
  const storages = byRole('storage');
  const evfs = byRole('evf');
  const lcds = byRole('lcd');
  const bodies = byRole('body');
  const audios = byRole('audio');
  const thermals = byRole('thermal_emi');
  const mishoes = byRole('mishoe');

  const computeGroupCenter = (list: PlacedPartSnapshot[]): THREE.Vector3 | null => {
    if (list.length === 0) return null;
    const acc = new THREE.Vector3();
    for (const p of list) acc.add(p.worldCenter);
    acc.divideScalar(list.length);
    return acc;
  };

  const unionBox = new THREE.Box3();
  for (const p of parts) unionBox.union(p.worldBox);
  const envSize = unionBox.isEmpty() ? new THREE.Vector3() : unionBox.getSize(new THREE.Vector3());

  const resolvedProfile: Exclude<CameraDesignProfile, 'auto'> =
    requestedProfile === 'auto' ? resolveAutoProfile(parts, envSize) : requestedProfile;
  const resolvedProfileLabel = CAMERA_PROFILE_LABELS[resolvedProfile];

  const lensC = computeGroupCenter(lenses);
  const mountC = computeGroupCenter(mounts);
  const shutterC = computeGroupCenter(shutters);
  const sensorC = computeGroupCenter(sensors);
  const procList = [...mainboards, ...bionzs];
  const procC = computeGroupCenter(procList);
  const batC = computeGroupCenter(batteries);

  // Reference optical axis XY (priority: Mount -> Sensor -> Lens -> Origin)
  const axisRef = mountC ?? sensorC ?? lensC ?? new THREE.Vector3(0, 0, 0);

  let flangeDistanceMm: number | null = null;
  let opticalEccentricityMm: number | null = null;

  // =========================================================================
  // PHYSICAL SIMULATION: Mass, 3D Center of Gravity (CoG), Power, Shots, Thermal
  // =========================================================================
  let totalMassG = 0;
  const cogAcc = new THREE.Vector3();
  for (const p of parts) {
    const m = estimatePartMassG(p);
    totalMassG += m;
    cogAcc.addScaledVector(p.worldCenter, m);
  }
  const cogVec = totalMassG > 0 ? cogAcc.divideScalar(totalMassG) : new THREE.Vector3(0, 0, 0);

  const peakPowerW =
    parts.length === 0
      ? 0
      : Number(
          (
            (sensors.length > 0 ? 1.85 : 0) +
            (bionzs.length > 0 ? 2.4 : mainboards.length > 0 ? 1.6 : 0) +
            (evfs.length > 0 ? 0.95 : 0) +
            (lcds.length > 0 ? 1.15 : 0) +
            (storages.length > 0 ? 0.85 : 0) +
            (audios.length > 0 || mishoes.length > 0 ? 0.45 : 0) +
            (lenses.length > 0 ? 0.65 : 0)
          ).toFixed(2)
        );
  const batteryWh = batteries.length * 16.4; // NP-FZ100 7.2V 2280mAh = 16.4Wh per module
  const estimatedBatteryShots =
    batteries.length > 0 && peakPowerW > 0
      ? Math.round((batteryWh / Math.max(2.2, peakPowerW)) * 245)
      : 0;
  const baseThermalMin =
    procList.length === 0
      ? 0
      : 26 +
        thermals.length * 38 +
        (bodies.length > 0 ? 22 : 0) +
        (procC && batC && procC.distanceTo(batC) >= 22 ? 16 : 0) +
        (resolvedProfile === 'cinema' ? 18 : 0);
  const thermal4k60pMin = clamp(Math.round(baseThermalMin), 0, 180);

  // =========================================================================
  // TRUE 3D OPTICAL CONE VIGNETTING / OBSTRUCTION CHECK (Lens -> Sensor frustum)
  // =========================================================================
  let vignettingPct = 0;
  let primaryBlockerTitle = '';
  if (sensorC && (lensC || mountC)) {
    const zStart = sensorC.z + 2.5;
    const zEnd = (lensC ? lensC.z : mountC!.z) - 2.0;
    if (zEnd > zStart + 1.5) {
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const r = p.entry.role;
        if (
          r !== 'battery' &&
          r !== 'mainboard' &&
          r !== 'bionz' &&
          r !== 'lcd' &&
          r !== 'storage' &&
          r !== 'audio'
        ) {
          continue;
        }
        const wb = p.worldBox;
        const bcx = 0.5 * (wb.min.x + wb.max.x);
        const bcy = 0.5 * (wb.min.y + wb.max.y);
        const bcz = 0.5 * (wb.min.z + wb.max.z);
        const bhx = 0.43 * (wb.max.x - wb.min.x);
        const bhy = 0.43 * (wb.max.y - wb.min.y);
        const bhz = 0.43 * (wb.max.z - wb.min.z);
        const zLo = Math.max(bcz - bhz, zStart);
        const zHi = Math.min(bcz + bhz, zEnd);
        if (zHi <= zLo) continue;
        const zMid = 0.5 * (zLo + zHi);
        const t = clamp((zMid - sensorC.z) / Math.max(1, zEnd - sensorC.z), 0, 1);
        // Frustum radius tapers from 36x24mm sensor half-diagonal (16mm effective) to E-mount/lens aperture (22mm)
        const coneR = 16.0 + t * 6.5;
        // Closest point in XY box to optical axis
        const cx = clamp(axisRef.x, bcx - bhx, bcx + bhx);
        const cy = clamp(axisRef.y, bcy - bhy, bcy + bhy);
        const distToAxis = Math.hypot(cx - axisRef.x, cy - axisRef.y);
        if (distToAxis < coneR) {
          const intrusion = clamp((coneR - distToAxis) / coneR, 0, 1);
          const obsPct = Math.round(intrusion * 100);
          if (obsPct > vignettingPct) {
            vignettingPct = obsPct;
            primaryBlockerTitle = p.entry.title;
          }
          markPart(
            p.uid,
            obsPct >= 30 ? 'error' : 'warn',
            `光束コーン遮蔽（ケラレ推定 ${obsPct}%）：センサー〜レンズ間の光路へ侵入しています`
          );
        }
      }
    }
  }

  // =========================================================================
  // 1. 光学系・結像・フランジバック成立性 (100点)
  // =========================================================================
  let cat1 = 0;
  let cat1Finding = '';
  let cat1Advice = '';
  const mountOptional =
    resolvedProfile === 'compact' || resolvedProfile === 'action' || resolvedProfile === 'custom';

  if (lenses.length === 0 && mounts.length === 0) {
    cat1 = 0;
    cat1Finding = 'レンズ光学系およびマウントが未配置。被写体光を撮像面へ結像できません。';
    cat1Advice = 'レンズ（lens）とEマウント（mount）を光軸Z上へ配置してください。';
  } else {
    if (lenses.length > 0) cat1 += mountOptional ? 46 : 32;
    if (mounts.length > 0) cat1 += mountOptional ? 14 : 26;
    else if (mountOptional && lenses.length > 0) cat1 += 10; // Fixed-lens integrated optics credit!
    if (lenses.length >= 2) cat1 += 6;

    // Coaxial optical alignment (radial error in XY plane)
    const opticalChain = [
      ...(lensC ? [{ name: 'レンズ', c: lensC, list: lenses }] : []),
      ...(mountC ? [{ name: 'マウント', c: mountC, list: mounts }] : []),
      ...(sensorC ? [{ name: 'センサー', c: sensorC, list: sensors }] : []),
    ];
    if (opticalChain.length >= 2) {
      let maxEcc = 0;
      for (const item of opticalChain) {
        const ecc = Math.hypot(item.c.x - axisRef.x, item.c.y - axisRef.y);
        if (ecc > maxEcc) maxEcc = ecc;
        if (ecc > 10) {
          for (const p of item.list) {
            markPart(p.uid, 'warn', `光軸偏心 ${ecc.toFixed(1)}mm（片ボケ・周辺減光の原因）`);
          }
        }
      }
      opticalEccentricityMm = maxEcc;
      const alignPts = maxEcc <= 2.5 ? 20 : maxEcc <= 6.5 ? 16 : maxEcc <= 14 ? 9 : 2;
      cat1 += alignPts;
    }

    // Flange focal distance verification
    if (mountC && sensorC) {
      const ffd = mountC.z - sensorC.z;
      flangeDistanceMm = ffd;
      const err = Math.abs(ffd - 18.0);
      if (ffd > 4 && err <= 6.0) {
        cat1 += 18;
      } else if (ffd > 2 && err <= 16.0) {
        cat1 += 13;
      } else if (ffd > 0) {
        cat1 += 6;
        for (const m of mounts) {
          markPart(m.uid, 'warn', `フランジバック誤差 (${ffd.toFixed(1)}mm / Eマウント基準18.0mm)`);
        }
      } else {
        for (const m of mounts) markPart(m.uid, 'error', 'マウントがセンサーより後方に配置されています');
      }
    } else if (lensC && sensorC && lensC.z > sensorC.z + 6) {
      // Fixed-lens back-focal distance
      flangeDistanceMm = lensC.z - sensorC.z;
      cat1 += mountOptional ? 18 : 11;
    }

    // Front-to-back physical order check: Lens Z > Mount Z
    if (lensC && mountC && lensC.z < mountC.z - 2) {
      cat1 = Math.max(10, cat1 - 18);
      for (const l of lenses) markPart(l.uid, 'error', 'レンズがマウントより後方に逆転配置されています');
    }

    // Vignetting penalty
    if (vignettingPct >= 30) {
      cat1 = Math.max(15, cat1 - Math.round(vignettingPct * 0.35));
    }

    cat1 = clamp(Math.round(cat1), 0, 100);
    cat1Finding =
      `レンズ${lenses.length}点・マウント${mounts.length}点` +
      (flangeDistanceMm !== null
        ? ` / ${mounts.length > 0 ? 'フランジ距離' : 'バックフォーカス'} ${flangeDistanceMm.toFixed(1)}mm`
        : '') +
      (opticalEccentricityMm !== null ? ` / 光軸偏心 ${opticalEccentricityMm.toFixed(1)}mm` : '') +
      (vignettingPct > 0 ? ` / 光束ケラレ ${vignettingPct}%` : ' / 光束クリア 100%');
    cat1Advice =
      cat1 >= 88
        ? `${resolvedProfileLabel}として理想的な光軸同心度・結像幾何条件を達成しています。`
        : vignettingPct > 0
          ? `光束コーンを塞ぐ「${primaryBlockerTitle}」を光軸外へ退避させてください。`
          : 'インスペクターの「18mmフランジ自動整列」を使うと光学系を一発で最適配置できます。';
  }

  // =========================================================================
  // 2. 撮像センサー・光電変換システム (100点)
  // =========================================================================
  let cat2 = 0;
  let cat2Finding = '';
  let cat2Advice = '';
  if (sensors.length === 0) {
    cat2 = 0;
    cat2Finding = 'CMOSイメージセンサーが未搭載。光信号を電気信号へ変換できず撮影不能です。';
    cat2Advice = 'センサー（sensor）のCMOSまたはIBISモジュールをZ=0付近の光軸へ配置してください。';
  } else {
    cat2 += 56;
    if (sensors.length >= 2) cat2 += 12;
    let tiltBad = false;
    for (const s of sensors) {
      const rx = Math.abs(THREE.MathUtils.radToDeg(s.rotationEuler.x)) % 360;
      const ry = Math.abs(THREE.MathUtils.radToDeg(s.rotationEuler.y)) % 360;
      const normRx = rx > 180 ? 360 - rx : rx;
      const normRy = ry > 180 ? 360 - ry : ry;
      if (normRx > 20 || normRy > 20) {
        tiltBad = true;
        markPart(s.uid, 'warn', `撮像面チルト過大 (Rx:${normRx.toFixed(0)}° Ry:${normRy.toFixed(0)}°)`);
      }
    }
    cat2 += tiltBad ? 5 : 18;
    cat2 += vignettingPct >= 25 ? 0 : vignettingPct > 0 ? 7 : 14;
    cat2 = clamp(Math.round(cat2), 0, 100);
    cat2Finding =
      vignettingPct >= 25
        ? `CMOS ${sensors.length}点搭載済ですが「${primaryBlockerTitle}」が前方光束を${vignettingPct}%遮蔽！`
        : `CMOS撮像系 ${sensors.length}点搭載 / 撮像面垂直度${tiltBad ? '要調整' : '良好'} / 光束遮蔽 ${vignettingPct}%`;
    cat2Advice =
      vignettingPct >= 25
        ? `光路内の「${primaryBlockerTitle}」をセンサー後方（Zマイナス）または側面へ移動してください。`
        : cat2 >= 85
          ? '撮像面アライメントおよび光束クリアランスともに実写基準をクリアしています。'
          : 'センサーの回転角度を0°付近へ水平調整し、IBIS・ローパス構成を加えるとさらに高評価になります。';
  }

  // =========================================================================
  // 3. 露光・シャッター機構 (100点) — Profile-aware Electronic / Mechanical Shutter!
  // =========================================================================
  let cat3 = 0;
  let cat3Finding = '';
  let cat3Advice = '';
  const electronicShutterFriendly =
    resolvedProfile === 'compact' ||
    resolvedProfile === 'cinema' ||
    resolvedProfile === 'action' ||
    resolvedProfile === 'custom';

  if (shutters.length === 0) {
    if (sensors.length > 0) {
      cat3 = electronicShutterFriendly ? 82 : 58;
      cat3Finding = electronicShutterFriendly
        ? `グローバル／高速CMOS電子シャッター専用構成（${resolvedProfileLabel}設計として${cat3}点評価・無音連写対応）。`
        : 'メカシャッター未搭載（CMOS電子シャッター動作で58点評価）。ストロボ高速同調やローリング歪み耐性に制限あり。';
      cat3Advice = electronicShutterFriendly
        ? '高速電子シャッター構成として成立しています。フラッシュ同調を強化したい場合はメカシャッター追加も可能です。'
        : 'フォーカルプレーンシャッター（shutter）をマウント〜センサー間（Z=+10mm付近）に配置すると満点に近づきます。';
    } else {
      cat3 = 0;
      cat3Finding = 'シャッター機構・撮像センサーともに未搭載のため露光制御が成立しません。';
      cat3Advice = '撮像センサーおよびシャッターを光軸上に配置してください。';
    }
  } else {
    cat3 += 60;
    if (shutters.length >= 2) cat3 += 10;
    let orderOk = true;
    if (shutterC && sensorC && shutterC.z <= sensorC.z - 2) {
      orderOk = false;
      for (const sh of shutters) markPart(sh.uid, 'error', 'シャッターがセンサーより後方に配置されています');
    }
    if (shutterC && mountC && shutterC.z > mountC.z + 6) {
      orderOk = false;
      for (const sh of shutters) markPart(sh.uid, 'warn', 'シャッターがマウントより前方に飛び出しています');
    }
    const shEcc = shutterC ? Math.hypot(shutterC.x - axisRef.x, shutterC.y - axisRef.y) : 0;
    cat3 += orderOk ? 18 : 4;
    cat3 += shEcc <= 10 ? 12 : shEcc <= 20 ? 6 : 0;
    cat3 = clamp(Math.round(cat3), 0, 100);
    cat3Finding = `フォーカルプレーンシャッター ${shutters.length}点 / 配置${orderOk ? '正常（マウント〜センサー間）' : '前後順序異常'} / 偏心${shEcc.toFixed(1)}mm`;
    cat3Advice =
      cat3 >= 85
        ? 'シャッター幕が撮像面直前の最適クリアランス（Z≈+10mm）に収まっています。'
        : 'シャッターをセンサー直前（Z +6〜+14mm）の光軸中心へ配置してください。';
  }

  // =========================================================================
  // 4. 画像処理・BIONZ演算エンジン (100点)
  // =========================================================================
  let cat4 = 0;
  let cat4Finding = '';
  let cat4Advice = '';
  if (procList.length === 0) {
    cat4 = 0;
    cat4Finding = 'メイン基板（mainboard）およびBIONZ XR画像処理エンジンが未搭載。RAW現像・AF演算が不能です。';
    cat4Advice = 'メイン基板（mainboard）またはBIONZ XR（bionz）をセンサー背面側へ配置してください。';
  } else {
    if (mainboards.length > 0) cat4 += 48;
    if (bionzs.length > 0) cat4 += 36;
    if (mainboards.length > 0 && bionzs.length > 0) cat4 += 6;
    else if (procList.length >= 2) cat4 += 18;
    else if (resolvedProfile === 'compact' || resolvedProfile === 'action') cat4 += 24; // Single SoC PCB credit

    if (procC && sensorC) {
      const mipiDist = procC.distanceTo(sensorC);
      if (mipiDist <= 44) cat4 += 16;
      else if (mipiDist <= 78) cat4 += 10;
      else {
        cat4 += 3;
        for (const p of procList) {
          markPart(p.uid, 'warn', `センサーからのSLVS-EC / MIPI配線長過大 (${mipiDist.toFixed(0)}mm)`);
        }
      }
      cat4Finding = `演算系 ${procList.length}点（基板:${mainboards.length} / BIONZ:${bionzs.length}） / センサー間伝送距離 ${mipiDist.toFixed(1)}mm`;
    } else {
      cat4 += 10;
      cat4Finding = `演算系 ${procList.length}点（基板:${mainboards.length} / BIONZ:${bionzs.length}）`;
    }
    cat4 = clamp(Math.round(cat4), 0, 100);
    cat4Advice =
      cat4 >= 85
        ? '高速SLVS-EC / MIPI配線長が短く、低ノイズ・高速AF/RAW演算パイプラインが成立します。'
        : 'メイン基板とBIONZ XRをセンサー後方35mm以内に近接配置すると信号品質が飛躍的に向上します。';
  }

  // =========================================================================
  // 5. 電源・バッテリー電力供給設計 (100点)
  // =========================================================================
  let cat5 = 0;
  let cat5Finding = '';
  let cat5Advice = '';
  if (batteries.length === 0) {
    cat5 = 0;
    cat5Finding = 'バッテリー・電源モジュールが未搭載。カメラの通電・起動ができません。';
    cat5Advice = 'バッテリー（battery）をグリップ位置（X -45〜-60mm付近）へ配置してください。';
  } else {
    cat5 += 62;
    if (batteries.length >= 2) cat5 += 10;
    const batEcc = batC ? Math.hypot(batC.x - axisRef.x, batC.y - axisRef.y) : 30;
    if (batEcc >= 18) cat5 += 16;
    else {
      cat5 += 4;
      for (const b of batteries) {
        markPart(b.uid, 'warn', 'バッテリーが光軸に近接しすぎています（グリップ側へ退避推奨）');
      }
    }
    if (batC && procC) {
      const pwrDist = batC.distanceTo(procC);
      cat5 += pwrDist <= 90 ? 12 : 6;
      cat5Finding = `電源系 ${batteries.length}点 / 消費予測 ${peakPowerW.toFixed(1)}W / 推定撮影約${estimatedBatteryShots}枚 / 給電距離 ${pwrDist.toFixed(0)}mm`;
    } else {
      cat5 += 8;
      cat5Finding = `電源系 ${batteries.length}点 / 推定撮影約${estimatedBatteryShots}枚`;
    }
    cat5 = clamp(Math.round(cat5), 0, 100);
    cat5Advice =
      cat5 >= 85
        ? `電力供給経路・光軸回避レイアウト良好（推定 ${estimatedBatteryShots} 枚撮影可能）。`
        : 'バッテリーを光軸から20mm以上外側かつメイン基板近傍へ配置してください。';
  }

  // =========================================================================
  // 6. 記録メディア・高速I/O (100点)
  // =========================================================================
  let cat6 = 0;
  let cat6Finding = '';
  let cat6Advice = '';
  if (storages.length === 0 && mishoes.length === 0) {
    cat6 = 0;
    cat6Finding = 'CFexpress記録メディアおよび高速I/Oが未搭載。撮影データを保存できません。';
    cat6Advice = 'CFexpress Type A（cfexpress）やMIシューをボディ側面・上部へ追加してください。';
  } else {
    if (storages.length > 0) cat6 += 68;
    if (mishoes.length > 0) cat6 += 20;
    if (storages.length >= 1) cat6 += 12;
    cat6 = clamp(Math.round(cat6), 0, 100);
    cat6Finding = `記録メディア ${storages.length}点 / MIシューデジタルI/O ${mishoes.length}点搭載。`;
    cat6Advice =
      cat6 >= 80
        ? 'PCIe Gen4高速連写バッファ排出およびデジタルI/O拡張性が確保されています。'
        : 'CFexpress Type Aとマルチインターフェースシューを併用すると実戦的なI/O構成になります。';
  }

  // =========================================================================
  // 7. ファインダー・モニター視認性 (100点) — Profile-aware EVF optional for Cinema/VLOG/Compact!
  // =========================================================================
  let cat7 = 0;
  let cat7Finding = '';
  let cat7Advice = '';
  const evfOptional =
    resolvedProfile === 'cinema' ||
    resolvedProfile === 'action' ||
    resolvedProfile === 'compact' ||
    resolvedProfile === 'custom';

  if (evfs.length === 0 && lcds.length === 0) {
    cat7 = 0;
    cat7Finding = 'EVFファインダーおよび背面液晶モニターが未搭載。フレーミング確認が困難です。';
    cat7Advice = '背面液晶（lcd）をZ後方へ、必要に応じてEVF（evf）を上部（+Y）へ配置してください。';
  } else {
    if (lcds.length > 0) cat7 += evfOptional ? 76 : 48;
    if (evfs.length > 0) cat7 += evfOptional ? 16 : 36;
    let ergoBonus = 0;
    if (evfs.length > 0) {
      const evfC = computeGroupCenter(evfs)!;
      if (evfC.y >= axisRef.y + 8) ergoBonus += 8;
      else markPart(evfs[0].uid, 'warn', 'EVF位置が低すぎます（ボディ上部Y+側が標準）');
    }
    if (lcds.length > 0) {
      const lcdC = computeGroupCenter(lcds)!;
      const refZ = sensorC ? sensorC.z : 0;
      if (lcdC.z <= refZ - 2) ergoBonus += evfOptional ? 14 : 8;
      else markPart(lcds[0].uid, 'warn', '背面モニターが前方寄りです（カメラ背面Z-側推奨）');
    }
    cat7 = clamp(Math.round(cat7 + ergoBonus), 0, 100);
    cat7Finding =
      `EVF ${evfs.length}点・背面LCD ${lcds.length}点（${evfOptional && evfs.length === 0 ? `${resolvedProfileLabel}仕様: EVFレス満点評価` : `人間工学ボーナス +${ergoBonus}点`}）`;
    cat7Advice =
      cat7 >= 85
        ? `${resolvedProfileLabel}として優れた視認・フレーミング設計です。`
        : '背面LCDをカメラ背面（-Z）へ、一眼構成ではEVFを上部（+Y）へ配置してください。';
  }

  // =========================================================================
  // 8. 筐体剛性・3D構造干渉解析 & BFS連結性グラフ (100点)
  // =========================================================================
  let severeCollisionCount = 0;
  const collidingPairs: string[] = [];
  const nParts = parts.length;
  const coreCoords = new Float32Array(nParts * 6);
  const coreVols = new Float32Array(nParts);
  for (let i = 0; i < nParts; i++) {
    const wb = parts[i].worldBox;
    const cx = 0.5 * (wb.min.x + wb.max.x);
    const cy = 0.5 * (wb.min.y + wb.max.y);
    const cz = 0.5 * (wb.min.z + wb.max.z);
    const hx = 0.39 * (wb.max.x - wb.min.x); // 0.5 * 0.78
    const hy = 0.39 * (wb.max.y - wb.min.y);
    const hz = 0.39 * (wb.max.z - wb.min.z);
    const o = i * 6;
    coreCoords[o] = cx - hx;
    coreCoords[o + 1] = cy - hy;
    coreCoords[o + 2] = cz - hz;
    coreCoords[o + 3] = cx + hx;
    coreCoords[o + 4] = cy + hy;
    coreCoords[o + 5] = cz + hz;
    coreVols[i] = Math.max(0.2, 2 * hx) * Math.max(0.2, 2 * hy) * Math.max(0.2, 2 * hz);
  }

  // Build adjacency graph (surface-to-surface gap <= 28mm OR enclosed inside body shell)
  const adj: number[][] = Array.from({ length: nParts }, () => []);

  for (let i = 0; i < nParts; i++) {
    const a = parts[i];
    const oa = i * 6;
    const ax0 = coreCoords[oa], ay0 = coreCoords[oa + 1], az0 = coreCoords[oa + 2];
    const ax1 = coreCoords[oa + 3], ay1 = coreCoords[oa + 4], az1 = coreCoords[oa + 5];
    const volA = coreVols[i];
    const aRole = a.entry.role;
    const aIsBody = aRole === 'body';

    for (let j = i + 1; j < nParts; j++) {
      const b = parts[j];
      const d = boxDistance(a.worldBox, b.worldBox);
      if (d <= 28) {
        adj[i].push(j);
        adj[j].push(i);
      }

      // Skip housing enclosure pairs & concentric optical pairs (lens-mount-shutter) & same-unit sub-parts
      const bRole = b.entry.role;
      const isHousingPair = aIsBody || bRole === 'body';
      const isSameUnit = a.entry.unitId === b.entry.unitId;
      const isOpticalRingPair =
        (aRole === 'lens' && bRole === 'mount') ||
        (aRole === 'mount' && bRole === 'lens');

      if (!isHousingPair && !isSameUnit && !isOpticalRingPair) {
        const ob = j * 6;
        const ox = Math.min(ax1, coreCoords[ob + 3]) - Math.max(ax0, coreCoords[ob]);
        if (ox > 0.6) {
          const oy = Math.min(ay1, coreCoords[ob + 4]) - Math.max(ay0, coreCoords[ob + 1]);
          if (oy > 0.6) {
            const oz = Math.min(az1, coreCoords[ob + 5]) - Math.max(az0, coreCoords[ob + 2]);
            if (oz > 0.6) {
              const ov = ox * oy * oz;
              const minVol = volA < coreVols[j] ? volA : coreVols[j];
              const ratio = ov / Math.max(1, minVol);
              if (ratio > 0.24) {
                severeCollisionCount++;
                collidingPairs.push(`${a.entry.partId} ✕ ${b.entry.partId}`);
                markPart(a.uid, 'error', `3Dコア干渉: ${b.entry.title} と体積比${Math.round(ratio * 100)}%重なり`);
                markPart(b.uid, 'error', `3Dコア干渉: ${a.entry.title} と体積比${Math.round(ratio * 100)}%重なり`);
              }
            }
          }
        }
      }
    }
  }

  // BFS Connected Components to find truly floating/disconnected sub-assemblies!
  const visited = new Uint8Array(nParts);
  const bfsQueue = new Int32Array(nParts);
  const clusters: number[][] = [];
  for (let i = 0; i < nParts; i++) {
    if (visited[i]) continue;
    const comp: number[] = [];
    let qHead = 0;
    let qTail = 0;
    bfsQueue[qTail++] = i;
    visited[i] = 1;
    while (qHead < qTail) {
      const u = bfsQueue[qHead++];
      comp.push(u);
      const neighbors = adj[u];
      for (let k = 0; k < neighbors.length; k++) {
        const v = neighbors[k];
        if (!visited[v]) {
          visited[v] = 1;
          bfsQueue[qTail++] = v;
        }
      }
    }
    clusters.push(comp);
  }

  // Pick main cluster (largest, tie-break by containing body/sensor/mount)
  clusters.sort((cA, cB) => {
    const scoreCluster = (c: number[]) =>
      c.length * 10 +
      c.reduce(
        (s, idx) =>
          s +
          (parts[idx].entry.role === 'body' || parts[idx].entry.role === 'sensor' ? 5 : 0),
        0
      );
    return scoreCluster(cB) - scoreCluster(cA);
  });

  const disconnectedClusters = Math.max(0, clusters.length - 1);
  let floatingPartCount = 0;
  for (let c = 1; c < clusters.length; c++) {
    for (const idx of clusters[c]) {
      floatingPartCount++;
      markPart(
        parts[idx].uid,
        'warn',
        'メイン構造クラスターから機械的に分離（空中浮遊）しています。隣接スナップで締結してください'
      );
    }
  }

  let cat8 = 0;
  if (parts.length > 0) {
    cat8 = bodies.length > 0 ? 55 : resolvedProfile === 'custom' ? 42 : 24;
    if (bodies.length >= 2) cat8 += 10;
    cat8 += severeCollisionCount === 0 ? 22 : Math.max(0, 22 - severeCollisionCount * 9);
    cat8 += floatingPartCount === 0 ? 13 : Math.max(0, 13 - floatingPartCount * 4);
    cat8 = clamp(Math.round(cat8), 0, 100);
  }
  const cat8Finding =
    `筐体 ${bodies.length}点 / 3Dコア干渉 ${severeCollisionCount}件` +
    (collidingPairs.length > 0 ? ` (${collidingPairs.slice(0, 2).join(', ')})` : '') +
    ` / 未結合浮遊 ${floatingPartCount}点（分離群:${disconnectedClusters}）`;
  const cat8Advice =
    severeCollisionCount > 0
      ? `赤色干渉枠（${collidingPairs[0]} 等）をギズモで移動または「隣接スナップ」でクリアランス確保してください。`
      : floatingPartCount > 0
        ? '分離している浮遊パーツを本体へ近づけて機械的連結を成立させてください。'
        : bodies.length === 0
          ? 'マグネシウム外装フレーム（body）を追加すると構造剛性が量産水準に達します。'
          : '3Dコア干渉ゼロ・全パーツ機械連結達成のクリーンな工業CAD実装です。';

  // =========================================================================
  // 9. 熱設計・EMIシールド・防塵防滴 (100点)
  // =========================================================================
  let cat9 = 0;
  if (parts.length > 0) {
    if (thermals.length > 0) cat9 += 44;
    if (bodies.length > 0) cat9 += 22;
    if (mounts.length > 0 || resolvedProfile === 'compact') cat9 += 10;
    if (procC && batC) {
      const dist = procC.distanceTo(batC);
      cat9 += dist >= 18 ? 14 : 6;
    } else if (procList.length > 0) {
      cat9 += 8;
    }
    if (thermals.length >= 2 || thermal4k60pMin >= 90) cat9 += 10;
    cat9 = clamp(Math.round(cat9), 0, 100);
  }
  const cat9Finding = `放熱・EMI・封止 ${thermals.length}点 / 推定4K60p連続録画 ${thermal4k60pMin >= 120 ? '120分+ (無制限級)' : `${thermal4k60pMin}分`}`;
  const cat9Advice =
    cat9 >= 80
      ? 'BIONZ XRとセンサーの熱分離および連続動画収録の熱マージンが極めて優秀です。'
      : 'ベイパーチャンバー・Σ型グラファイト・EMIシールドを追加すると4K60p連続録画時間が大幅延伸します。';

  // =========================================================================
  // 10. システム統合・重心バランス・エルゴノミクス (100点)
  // =========================================================================
  const distinctSubsystems = new Set(parts.map((p) => p.entry.unitId)).size;
  let cat10 = 0;
  if (parts.length > 0) {
    cat10 += Math.min(40, distinctSubsystems * 6);
    if (audios.length > 0 || mishoes.length > 0) cat10 += 20;
    else if (resolvedProfile === 'compact') cat10 += 12;
    if (parts.length >= 6) cat10 += 10;
    // Envelope realism + CoG balance check
    const maxDim = Math.max(envSize.x, envSize.y, envSize.z);
    if (maxDim >= 50 && maxDim <= 285) cat10 += 18;
    else if (maxDim >= 28 && maxDim <= 380) cat10 += 10;
    else cat10 += 4;
    // CoG centrality bonus (not wildly lopsided > 38mm off optical axis X/Y)
    const cogOffAxis = Math.hypot(cogVec.x - axisRef.x, cogVec.y - axisRef.y);
    cat10 += cogOffAxis <= 24 ? 12 : cogOffAxis <= 42 ? 7 : 2;
    cat10 = clamp(Math.round(cat10), 0, 100);
  }
  const cat10Finding =
    `統合${distinctSubsystems}系 / 推定質量 ${Math.round(totalMassG)}g / 重心(${cogVec.x.toFixed(0)}, ${cogVec.y.toFixed(0)}, ${cogVec.z.toFixed(0)})mm / 外形 ${envSize.x.toFixed(0)}×${envSize.y.toFixed(0)}×${envSize.z.toFixed(0)}mm`;
  const cat10Advice =
    cat10 >= 82
      ? `総質量 ${Math.round(totalMassG)}g・重心バランス良好。ホールディング性に優れた工業デザインです。`
      : 'ECMマイクやMIシューを追加し、重心が光軸付近に収まるよう左右重量バランスを整えてください。';

  const categories: GraderCategoryResult[] = [
    { id: 'optics', nameJa: '1. 光学系・フランジバック', shortLabel: '光学', score: cat1, maxScore: 100, status: cat1 >= 75 ? 'pass' : cat1 >= 45 ? 'warn' : 'fail', finding: cat1Finding, advice: cat1Advice },
    { id: 'sensor', nameJa: '2. 撮像センサー・光束検査', shortLabel: '撮像', score: cat2, maxScore: 100, status: cat2 >= 75 ? 'pass' : cat2 >= 45 ? 'warn' : 'fail', finding: cat2Finding, advice: cat2Advice },
    { id: 'shutter', nameJa: '3. 露光・シャッター制御', shortLabel: '露光', score: cat3, maxScore: 100, status: cat3 >= 75 ? 'pass' : cat3 >= 45 ? 'warn' : 'fail', finding: cat3Finding, advice: cat3Advice },
    { id: 'processor', nameJa: '4. 画像処理・BIONZ演算', shortLabel: '演算', score: cat4, maxScore: 100, status: cat4 >= 75 ? 'pass' : cat4 >= 45 ? 'warn' : 'fail', finding: cat4Finding, advice: cat4Advice },
    { id: 'power', nameJa: '5. 電源・バッテリー供給', shortLabel: '電源', score: cat5, maxScore: 100, status: cat5 >= 75 ? 'pass' : cat5 >= 45 ? 'warn' : 'fail', finding: cat5Finding, advice: cat5Advice },
    { id: 'storage', nameJa: '6. 記録メディア・高速I/O', shortLabel: '記録', score: cat6, maxScore: 100, status: cat6 >= 75 ? 'pass' : cat6 >= 45 ? 'warn' : 'fail', finding: cat6Finding, advice: cat6Advice },
    { id: 'viewfinder', nameJa: '7. EVF・背面LCD視認性', shortLabel: '視認', score: cat7, maxScore: 100, status: cat7 >= 75 ? 'pass' : cat7 >= 45 ? 'warn' : 'fail', finding: cat7Finding, advice: cat7Advice },
    { id: 'structure', nameJa: '8. 筐体剛性・3D干渉＆連結', shortLabel: '構造', score: cat8, maxScore: 100, status: cat8 >= 75 ? 'pass' : cat8 >= 45 ? 'warn' : 'fail', finding: cat8Finding, advice: cat8Advice },
    { id: 'thermal', nameJa: '9. 熱設計・EMI・防塵防滴', shortLabel: '熱設計', score: cat9, maxScore: 100, status: cat9 >= 75 ? 'pass' : cat9 >= 45 ? 'warn' : 'fail', finding: cat9Finding, advice: cat9Advice },
    { id: 'integration', nameJa: '10. 重心・統合エルゴノミクス', shortLabel: '統合', score: cat10, maxScore: 100, status: cat10 >= 75 ? 'pass' : cat10 >= 45 ? 'warn' : 'fail', finding: cat10Finding, advice: cat10Advice },
  ];

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);

  const hasCoreOperationalChain =
    lenses.length > 0 &&
    sensors.length > 0 &&
    procList.length > 0 &&
    batteries.length > 0 &&
    (storages.length > 0 || mishoes.length > 0) &&
    cat1 >= 42 &&
    cat2 >= 50 &&
    vignettingPct < 55 &&
    severeCollisionCount <= 2;

  const canOperate = hasCoreOperationalChain && totalScore >= 550;

  let rank: CameraEngineeringReport['rank'];
  let operationalVerdict: CameraEngineeringReport['operationalVerdict'];
  if (canOperate && totalScore >= 900) {
    rank = 'S+';
    operationalVerdict = '撮影動作可能（量産設計水準）';
  } else if (canOperate && totalScore >= 800) {
    rank = 'S';
    operationalVerdict = '撮影動作可能（実写成立）';
  } else if (canOperate && totalScore >= 680) {
    rank = 'A';
    operationalVerdict = '撮影動作可能（実写成立）';
  } else if (canOperate) {
    rank = 'B';
    operationalVerdict = '条件付きで動作可能';
  } else if (totalScore >= 350) {
    rank = 'C';
    operationalVerdict = '設計改修が必要';
  } else {
    rank = 'F';
    operationalVerdict = '撮影動作不可';
  }

  const missingCore: string[] = [];
  if (lenses.length === 0) missingCore.push('レンズ光学系');
  if (sensors.length === 0) missingCore.push('CMOSセンサー');
  if (procList.length === 0) missingCore.push('BIONZ/メイン基板');
  if (batteries.length === 0) missingCore.push('バッテリー電源');
  if (storages.length === 0 && mishoes.length === 0) missingCore.push('記録メディア');

  const engineerSummary =
    parts.length === 0
      ? 'ワークスペースにパーツが未配置です。上部テンプレート（α7 IV / ZV-E1 / FX3）または左の2,200+パーツライブラリから設計を開始してください。'
      : canOperate
        ? `【主任設計技師 講評｜${resolvedProfileLabel}】総合 ${totalScore} / 1000点（ランク ${rank}）。推定総質量 ${Math.round(totalMassG)}g・消費電力 ${peakPowerW.toFixed(1)}W・推定撮影 ${estimatedBatteryShots}枚・4K60p連続 ${thermal4k60pMin >= 120 ? '120分+' : `${thermal4k60pMin}分`}。光束ケラレ${vignettingPct}%・干渉${severeCollisionCount}件で実写動作が完全に成立します。`
        : `【主任設計技師 講評｜${resolvedProfileLabel}】総合 ${totalScore} / 1000点（ランク ${rank}）。現構成では実機撮影動作が成立しません。${missingCore.length > 0 ? `必須欠落：${missingCore.join('・')}。` : ''}${vignettingPct >= 55 ? `光束コーンが${vignettingPct}%遮蔽されています。` : ''}${severeCollisionCount > 2 ? `3Dコア干渉が${severeCollisionCount}件検出。` : ''}下の優先改修アクションに従って調整してください。`;

  const topActions = categories
    .filter((c) => c.score < 82)
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map((c) => `【${c.nameJa} (${c.score}/100)】${c.advice}`);

  return {
    version: '1.1',
    requestedProfile,
    resolvedProfile,
    resolvedProfileLabel,
    totalScore,
    maxScore: 1000,
    rank,
    operationalVerdict,
    canOperate,
    engineerSummary,
    categories,
    metrics: {
      partCount: parts.length,
      uniqueSubsystems: distinctSubsystems,
      flangeDistanceMm,
      opticalEccentricityMm,
      severeCollisionCount,
      floatingPartCount,
      envelopeMm: [envSize.x, envSize.y, envSize.z],
    },
    telemetry: {
      estimatedMassG: Math.round(totalMassG),
      centerOfGravityMm: [
        Number(cogVec.x.toFixed(1)),
        Number(cogVec.y.toFixed(1)),
        Number(cogVec.z.toFixed(1)),
      ],
      peakPowerW,
      estimatedBatteryShots,
      thermal4k60pMin,
      vignettingPct,
      disconnectedClusters,
    },
    topActions,
    partDiagnostics,
  };
}

/**
 * Render a razor-sharp 10-Axis Engineering Radar Chart SVG for the Play Ground 1.1
 * 1,000-Point Chief Engineer Evaluation Report!
 */
export function renderEngineeringRadarSvg(report: CameraEngineeringReport): string {
  const cx = 138;
  const cy = 132;
  const maxR = 86;
  const n = report.categories.length;
  const accent = report.canOperate ? '#0d5bd9' : '#dc2626';
  const fillCol = report.canOperate ? 'rgba(13, 91, 217, 0.22)' : 'rgba(220, 38, 38, 0.20)';

  const pt = (idx: number, frac: number): [number, number] => {
    const a = -Math.PI / 2 + (idx / n) * Math.PI * 2;
    return [cx + Math.cos(a) * maxR * frac, cy + Math.sin(a) * maxR * frac];
  };

  const rings = [0.25, 0.5, 0.75, 1.0]
    .map((f) => {
      const coords = Array.from({ length: n }, (_, i) => pt(i, f).map((v) => v.toFixed(1)).join(',')).join(' ');
      return `<polygon points="${coords}" fill="none" stroke="${f === 1 ? '#94a3b8' : '#dbe3ee'}" stroke-width="${f === 1 ? 1.2 : 0.9}" ${f < 1 ? 'stroke-dasharray="3 2"' : ''}/>`;
    })
    .join('');

  const spokes = report.categories
    .map((cat, i) => {
      const [x2, y2] = pt(i, 1.0);
      const [lx, ly] = pt(i, 1.22);
      const anchor = lx < cx - 10 ? 'end' : lx > cx + 10 ? 'start' : 'middle';
      const lblCol = cat.status === 'fail' ? '#dc2626' : cat.status === 'warn' ? '#b45309' : '#1e293b';
      return `
        <line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#e2e8f0" stroke-width="0.9"/>
        <text x="${lx.toFixed(1)}" y="${(ly + 3.5).toFixed(1)}" text-anchor="${anchor}" font-size="9.5" font-weight="700" fill="${lblCol}">${cat.shortLabel}</text>
      `;
    })
    .join('');

  const dataCoords = report.categories
    .map((cat, i) => pt(i, clamp(cat.score / 100, 0.04, 1.0)))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  const dots = report.categories
    .map((cat, i) => {
      const [x, y] = pt(i, clamp(cat.score / 100, 0.04, 1.0));
      const dotCol = cat.status === 'fail' ? '#dc2626' : cat.status === 'warn' ? '#d97706' : '#0d5bd9';
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="${dotCol}" stroke="#ffffff" stroke-width="1.2"/>`;
    })
    .join('');

  return `<svg class="pg-radar-svg" viewBox="0 0 276 264" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="10分野技術評価レーダーチャート">
    ${rings}
    ${spokes}
    <polygon points="${dataCoords}" fill="${fillCol}" stroke="${accent}" stroke-width="2" stroke-linejoin="round"/>
    ${dots}
    <text x="${cx}" y="${cy - maxR * 0.5 - 3}" text-anchor="middle" font-size="7.5" fill="#94a3b8" font-family="ui-monospace, monospace">50</text>
    <text x="${cx}" y="${cy - maxR - 4}" text-anchor="middle" font-size="7.5" fill="#64748b" font-family="ui-monospace, monospace">100</text>
  </svg>`;
}
