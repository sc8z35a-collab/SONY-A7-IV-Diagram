/**
 * FLOW Security — Ed25519 Asymmetric Attestation & Key Custody Engine (`crypto_attestation.mjs`)
 *
 * Zero Security Theater Contract:
 *   - Protected Asset: Official「V1.1証明」certificates & CI-issued `FLOW-RECEIPT` attestations.
 *   - Threat Model: Offline forgery by a local/compromised VM agent holding write access to the repo.
 *   - Key Custody:
 *       * Private key (`FLOW_ED25519_PRIVATE_KEY_PEM`) MUST NEVER exist on the dev VM or in git;
 *         it lives exclusively inside GitHub Actions Secrets / external KMS.
 *       * Public key is pinned in git at `verification/keys/flow_v11_pub.pem`.
 *   - Honest Local Mode: When no CI private key is present (normal dev VM), certificates & receipts
 *     are explicitly tagged `attestation: "LOCAL_UNATTESTED"` — NEVER forged with a local dummy key!
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { EXIT_OK, EXIT_SECURITY_BLOCKED } from './kernel_config.mjs';

export const PUB_KEY_REL = 'verification/keys/flow_v11_pub.pem';
const ATTEST_DOMAIN = 'FLOW_SECURITY_ED25519_ATTESTATION_V1.1';

export function canonicalizeAttestPayload(kind, payload) {
  const keys = Object.keys(payload || {}).sort();
  const body = {};
  for (const k of keys) {
    if (k === 'ed25519Signature' || k === 'attestation' || k === 'attested' || k === 'attestedAt' || k === 'attestedBy') continue;
    body[k] = payload[k];
  }
  return Buffer.from(`${ATTEST_DOMAIN}|${kind}|${JSON.stringify(body)}`, 'utf8');
}

export function loadPinnedPublicKey(repoRoot) {
  const abs = path.join(repoRoot, PUB_KEY_REL);
  if (!fs.existsSync(abs)) return null;
  try {
    return fs.readFileSync(abs, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Sign a payload using an external CI/KMS Ed25519 private key injected ONLY via environment secret.
 * Returns `{ attested: false, attestation: 'LOCAL_UNATTESTED' }` when running on a local dev VM.
 */
export function signWithExternalEd25519(kind, payload, opts = {}) {
  const privPem = opts.privateKeyPem || process.env.FLOW_ED25519_PRIVATE_KEY_PEM || '';
  if (!privPem || !privPem.includes('BEGIN PRIVATE KEY')) {
    return {
      attested: false,
      attestation: 'LOCAL_UNATTESTED',
      ed25519Signature: null,
      attestedBy: 'local_vm_unattested',
      attestedAt: null,
    };
  }
  const msg = canonicalizeAttestPayload(kind, payload);
  const sig = crypto.sign(null, msg, privPem).toString('base64');
  return {
    attested: true,
    attestation: 'CI_ATTESTED',
    ed25519Signature: sig,
    attestedBy: process.env.GITHUB_WORKFLOW ? `github-actions:${process.env.GITHUB_RUN_ID || 'run'}` : 'external-kms',
    attestedAt: new Date().toISOString(),
  };
}

/**
 * Verify an Ed25519 attestation against the repository-pinned public key (or provided pubPem).
 */
export function verifyEd25519Attestation(kind, payload, { repoRoot, publicKeyPem = null } = {}) {
  const sigB64 = payload?.ed25519Signature;
  if (!sigB64) {
    return {
      ok: true,
      attested: false,
      status: 'LOCAL_UNATTESTED',
      reason: 'No external Ed25519 CI signature attached (local dev verification only)',
    };
  }
  const pubPem = publicKeyPem || (repoRoot ? loadPinnedPublicKey(repoRoot) : null);
  if (!pubPem) {
    return {
      ok: false,
      attested: false,
      status: 'MISSING_PUBLIC_KEY',
      reason: `Signature present but pinned public key missing at ${PUB_KEY_REL}`,
    };
  }
  try {
    const msg = canonicalizeAttestPayload(kind, payload);
    const sigBuf = Buffer.from(sigB64, 'base64');
    const valid = crypto.verify(null, msg, pubPem, sigBuf);
    if (!valid) {
      return {
        ok: false,
        attested: false,
        status: 'FORGED_SIGNATURE',
        reason: 'Ed25519 cryptographic signature verification FAILED',
      };
    }
    return {
      ok: true,
      attested: true,
      status: 'CI_ATTESTED',
      reason: 'Verified against pinned Ed25519 external CI/KMS public key',
    };
  } catch (err) {
    return {
      ok: false,
      attested: false,
      status: 'FORGED_SIGNATURE',
      reason: `Malformed Ed25519 signature: ${err.message}`,
    };
  }
}

export function runCryptoAttestSelftest() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  const sample = { unitId: 'golden_v11', primarySha256: 'a'.repeat(64), testsPassed: 1080, testsTotal: 1080 };

  // 1. Local unattested (no private key) -> honestly LOCAL_UNATTESTED
  const localAtt = signWithExternalEd25519('V11_CERT', sample, { privateKeyPem: '' });
  const localVer = verifyEd25519Attestation('V11_CERT', { ...sample, ...localAtt }, { publicKeyPem: publicKey });

  // 2. External CI key signed -> CI_ATTESTED
  const ciAtt = signWithExternalEd25519('V11_CERT', sample, { privateKeyPem: privateKey });
  const signedObj = { ...sample, ...ciAtt };
  const ciVer = verifyEd25519Attestation('V11_CERT', signedObj, { publicKeyPem: publicKey });

  // 3. 1-byte tamper -> FORGED_SIGNATURE
  const tampered = { ...signedObj, testsPassed: 1079 };
  const tamVer = verifyEd25519Attestation('V11_CERT', tampered, { publicKeyPem: publicKey });

  const ok =
    localAtt.attestation === 'LOCAL_UNATTESTED' &&
    localVer.status === 'LOCAL_UNATTESTED' &&
    ciAtt.attestation === 'CI_ATTESTED' &&
    ciVer.ok && ciVer.status === 'CI_ATTESTED' &&
    !tamVer.ok && tamVer.status === 'FORGED_SIGNATURE';

  return {
    ok,
    exitCode: ok ? EXIT_OK : EXIT_SECURITY_BLOCKED,
    local: localVer.status,
    ci: ciVer.status,
    tampered: tamVer.status,
  };
}
