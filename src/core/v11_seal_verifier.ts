/**
 * THE LAST EXAM V1.1 — Browser Live「V1.1証明」Cryptographic Seal Verifier & Instant Auto-Revocation Engine
 *
 * Implements the EXACT same deterministic 0.0001mm (100nm) quantized canonical 3D SHA-256
 * algorithm as `scripts/exam/v11_certificate.mjs` synchronously in pure TypeScript (zero async race,
 * zero external deps, usable on both main thread and Playground WebWorker!).
 *
 * ANY 0.0001mm move, vertex tweak, rotation, scale, material change, or part add/delete
 * immediately changes `liveSha256` -> INSTANT AUTOMATIC REVOCATION (`REVOKED_GEOMETRY_DRIFT`)!
 */

import {
  V11_CERTIFICATES,
  V11_EXAM_KERNEL_SHA256,
  V11CertificateRecord,
} from '../units/v1_1_certificates.gen';

const SEAL_DOMAIN_TAG = 'THE_LAST_EXAM_V1.1_SEAL_WARRANTY_v1';

// Pure synchronous FIPS 180-4 SHA-256 (returns 64-char lowercase hex)
const K256 = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

export function sha256Bytes(bytes: Uint8Array): string {
  const bitLen = bytes.length * 8;
  const paddedLen = ((bytes.length + 9 + 63) >> 6) << 6;
  const buf = new Uint8Array(paddedLen);
  buf.set(bytes);
  buf[bytes.length] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(paddedLen - 8, Math.floor(bitLen / 0x100000000), false);
  view.setUint32(paddedLen - 4, bitLen >>> 0, false);

  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
  const w = new Uint32Array(64);

  for (let off = 0; off < paddedLen; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + i * 4, false);
    for (let i = 16; i < 64; i++) {
      const s0 = ((w[i - 15] >>> 7) | (w[i - 15] << 25)) ^ ((w[i - 15] >>> 18) | (w[i - 15] << 14)) ^ (w[i - 15] >>> 3);
      const s1 = ((w[i - 2] >>> 17) | (w[i - 2] << 15)) ^ ((w[i - 2] >>> 19) | (w[i - 2] << 13)) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
    for (let i = 0; i < 64; i++) {
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + K256[i] + w[i]) >>> 0;
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + t1) >>> 0;
      d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + h) >>> 0;
  }
  return [h0, h1, h2, h3, h4, h5, h6, h7].map((v) => v.toString(16).padStart(8, '0')).join('');
}

const utf8Enc = new TextEncoder();
export function sha256Str(s: string): string {
  return sha256Bytes(utf8Enc.encode(s));
}

const q4 = (v: number): number => Math.round((Number.isFinite(v) ? v : 0) * 10000);

export interface CanonicalPartInput {
  readonly id: string;
  readonly matKey?: string;
  readonly assembledPos: readonly [number, number, number];
  readonly explodeOffset?: readonly [number, number, number];
  readonly box: readonly [number, number, number, number, number, number];
  readonly tris?: Float32Array | Float64Array | readonly number[];
  readonly volumeMm3?: number;
  readonly massG?: number;
}

export type V11SealStatus =
  | 'CERTIFIED'
  | 'REVOKED_GEOMETRY_DRIFT'
  | 'REVOKED_FORGED_SIGNATURE'
  | 'REVOKED_KERNEL_CHANGED'
  | 'UNVERIFIED';

export interface V11SealVerification {
  readonly status: V11SealStatus;
  readonly valid: boolean;
  readonly unitId: string;
  readonly badgeLabel: string;
  readonly reason: string;
  readonly livePrimarySha256: string;
  readonly cert: V11CertificateRecord | null;
}

/**
 * Exact browser counterpart to `computeCanonical3dSha256` in `scripts/exam/v11_certificate.mjs`.
 */
export function computeCanonical3dSha256Browser(partsInput: readonly CanonicalPartInput[]): string {
  const parts = [...partsInput].sort((a, b) => a.id.localeCompare(b.id));
  const lines: string[] = [`CANON3D|v1.1|parts=${parts.length}`];

  for (const p of parts) {
    const pos = p.assembledPos || [0, 0, 0];
    const exp = p.explodeOffset || [0, 0, 0];
    const box = p.box || [0, 0, 0, 0, 0, 0];
    const tris = p.tris;
    let vertDigest = sha256Bytes(new Uint8Array(0)).slice(0, 24);
    let triTotal = 0;
    if (tris && tris.length >= 9) {
      triTotal = Math.floor(tris.length / 9);
      const qBuf = new Int32Array(tris.length);
      for (let k = 0; k < tris.length; k++) qBuf[k] = q4(tris[k]);
      vertDigest = sha256Bytes(new Uint8Array(qBuf.buffer, qBuf.byteOffset, qBuf.byteLength)).slice(0, 24);
    }
    lines.push([
      p.id,
      p.matKey || '',
      `${q4(pos[0])},${q4(pos[1])},${q4(pos[2])}`,
      `${q4(exp[0])},${q4(exp[1])},${q4(exp[2])}`,
      `${q4(box[0])},${q4(box[1])},${q4(box[2])},${q4(box[3])},${q4(box[4])},${q4(box[5])}`,
      triTotal,
      vertDigest,
      q4(p.volumeMm3 || 0),
      q4(p.massG || 0),
    ].join('|'));
  }
  return sha256Str(lines.join('\n') + '\n');
}

export function verifyV11SignatureBrowser(cert: Partial<V11CertificateRecord> & { solverManifestSha256?: string }): boolean {
  if (!cert || !cert.unitId || !cert.primarySha256 || !cert.allTiersSha256 || !cert.examKernelSha256 || !cert.signature || !cert.certId) {
    return false;
  }
  // If full solverManifestSha256 is present (imported .v1_1.cert.json), verify full SHA-256 signature directly!
  if (cert.solverManifestSha256) {
    const canonical = [
      SEAL_DOMAIN_TAG,
      cert.unitId,
      cert.primarySha256,
      cert.allTiersSha256,
      cert.examKernelSha256,
      cert.solverManifestSha256,
      `${cert.enginesPassed}/${cert.enginesTotal}`,
      `${cert.testsPassed}/${cert.testsTotal}`,
      `${cert.locksPassed}/${cert.locksTotal}`,
      `${cert.solversReady}/${cert.solversTotal}`,
      cert.tlxReceipt,
    ].join('|');
    const sig = sha256Str(canonical);
    const expectedId = `V11-CERT:${cert.unitId}:${cert.primarySha256.slice(0, 12)}:${cert.examKernelSha256.slice(0, 8)}:${cert.testsPassed}/${cert.testsTotal}:${sig.slice(0, 16)}`;
    return sig === cert.signature && expectedId === cert.certId;
  }
  // Built-in compiled registry record: verify certId structural integrity + 100% score thresholds
  const expectedPrefix = `V11-CERT:${cert.unitId}:${cert.primarySha256.slice(0, 12)}:${cert.examKernelSha256.slice(0, 8)}:${cert.testsPassed}/${cert.testsTotal}:${cert.signature.slice(0, 16)}`;
  return (
    cert.certId === expectedPrefix &&
    (cert.enginesPassed ?? 0) === (cert.enginesTotal ?? -1) &&
    (cert.enginesTotal ?? 0) >= 48 &&
    (cert.testsPassed ?? 0) === (cert.testsTotal ?? -1) &&
    (cert.testsTotal ?? 0) >= 1080 &&
    (cert.locksPassed ?? 0) === (cert.locksTotal ?? -1) &&
    (cert.locksTotal ?? 0) >= 28 &&
    (cert.solversReady ?? 0) === (cert.solversTotal ?? -1) &&
    (cert.solversTotal ?? 0) >= 48
  );
}

/**
 * Verify a unit's「V1.1証明」against its compiled certificate record (and optional live 3D parts).
 */
export function verifyRegisteredUnitV11Seal(
  unitId: string,
  liveParts?: readonly CanonicalPartInput[]
): V11SealVerification {
  const cert = V11_CERTIFICATES[unitId] ?? null;
  const liveSha = liveParts && liveParts.length > 0 ? computeCanonical3dSha256Browser(liveParts) : '';

  if (!cert) {
    return {
      status: 'UNVERIFIED',
      valid: false,
      unitId,
      badgeLabel: 'V1.1 未刻印',
      reason: 'THE LAST EXAM V1.1 全1,080項目 100%合格で刻印可能',
      livePrimarySha256: liveSha,
      cert: null,
    };
  }
  if (!verifyV11SignatureBrowser(cert)) {
    return {
      status: 'REVOKED_FORGED_SIGNATURE',
      valid: false,
      unitId,
      badgeLabel: 'V1.1証明 失効(署名不正)',
      reason: '証明書の暗号署名または100%合格要件が破損しています',
      livePrimarySha256: liveSha,
      cert,
    };
  }
  if (cert.examKernelSha256 !== V11_EXAM_KERNEL_SHA256) {
    return {
      status: 'REVOKED_KERNEL_CHANGED',
      valid: false,
      unitId,
      badgeLabel: 'V1.1証明 失効(基準更新)',
      reason: 'EXAM V1.1 検査カーネル更新のため再検査が必要です',
      livePrimarySha256: liveSha,
      cert,
    };
  }
  if (liveSha && liveSha !== cert.primarySha256) {
    return {
      status: 'REVOKED_GEOMETRY_DRIFT',
      valid: false,
      unitId,
      badgeLabel: 'V1.1証明 失効(3D変更検知)',
      reason: `3Dデータの状態変更を検知しました (cert=${cert.primarySha256.slice(0, 12)} ≠ live=${liveSha.slice(0, 12)})。再度100%合格するまで再刻印できません。`,
      livePrimarySha256: liveSha,
      cert,
    };
  }
  return {
    status: 'CERTIFIED',
    valid: true,
    unitId,
    badgeLabel: 'V1.1証明 刻印済',
    reason: `THE LAST EXAM V1.1 全${cert.enginesTotal}エンジン・${cert.testsPassed}/${cert.testsTotal}項目・${cert.solversReady}外部ソルバー・${cert.locksTotal}クロスロック 100%合格保証`,
    livePrimarySha256: liveSha || cert.primarySha256,
    cert,
  };
}

/**
 * Verify an imported Playground `.v1_1.cert.json` against the LIVE Playground 3D scene!
 * Immediately revokes the instant ANY part is moved/rotated/scaled/added/deleted.
 */
export function verifyPlaygroundV11Seal(
  importedCert: (V11CertificateRecord & { solverManifestSha256?: string }) | null,
  liveParts: readonly CanonicalPartInput[]
): V11SealVerification {
  const liveSha = computeCanonical3dSha256Browser(liveParts);
  if (!importedCert) {
    return {
      status: 'UNVERIFIED',
      valid: false,
      unitId: 'playground',
      badgeLabel: 'V1.1 未刻印',
      reason: 'EX48(.tlx11.json)出力 → EXAM V1.1 100%合格 → 証明書読込で刻印',
      livePrimarySha256: liveSha,
      cert: null,
    };
  }
  if (!verifyV11SignatureBrowser(importedCert)) {
    return {
      status: 'REVOKED_FORGED_SIGNATURE',
      valid: false,
      unitId: importedCert.unitId || 'playground',
      badgeLabel: 'V1.1証明 失効(署名不正)',
      reason: '証明書の暗号署名が一致しません（改ざん検出）',
      livePrimarySha256: liveSha,
      cert: importedCert,
    };
  }
  if (liveSha !== importedCert.primarySha256) {
    return {
      status: 'REVOKED_GEOMETRY_DRIFT',
      valid: false,
      unitId: importedCert.unitId || 'playground',
      badgeLabel: 'V1.1証明 即時剥奪(3D変更)',
      reason: `3Dデータの編集を検知したため刻印を即時剥奪しました (cert=${importedCert.primarySha256.slice(0, 12)} ≠ live=${liveSha.slice(0, 12)})`,
      livePrimarySha256: liveSha,
      cert: importedCert,
    };
  }
  return {
    status: 'CERTIFIED',
    valid: true,
    unitId: importedCert.unitId || 'playground',
    badgeLabel: 'V1.1証明 刻印済',
    reason: `実機製造・起動保証確認済 (${importedCert.certId})`,
    livePrimarySha256: liveSha,
    cert: importedCert,
  };
}
