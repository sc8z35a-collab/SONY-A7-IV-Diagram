# FLOW Security・文書自律化・EXAM 構造改善・4本柱高速化 — 完了検証レポート

- **対象ブランチ / コミット**: `feat/flow-security-speed` (`a4262c1`, pushed to `origin/feat/flow-security-speed`)
- **最終ゲート結果**: **100% PASS（キャッシュ完全無効・UNCACHED 実測）**
  - `FLOW-RECEIPT`: `FLOW-RECEIPT:e10908f4:d520765f:d96635b8:integrator:6b17b056c39c`
  - `BG-RECEIPT`: `BG-RECEIPT:f82f4124:origin/feat/flow-security-speed:integrator:990c0fa7`
  - `SEC-RECEIPT`: `SEC-RECEIPT:e10908f4:12/12:b4428dfb`
  - `Ed25519 Attestation`: `LOCAL_UNATTESTED`（ローカル VM には秘密鍵を絶対に置かない正直な設計。B-2 完了後に GitHub Actions 上で `CI_ATTESTED` 署名が付与されます）

---

## 1. Before / After 実測ベンチマーク（実行時間 & 消費トークン）

### 実行時間の高速化（Linux 6.18.57 / 2 vCPU 環境 実測値）

| 項目 | Before（改修前） | After（改修後・実測） | 改善率 / 備考 |
|---|---:|---:|---|
| 48 ソルバー＋6 C++17 ハーネス構築 (`exam setup`) | ~120s+（毎回 apt + 再ビルド） | **4.36s**（ソースハッシュキャッシュ全 6/6 HIT） / verify-only **193ms** | **約 28x 高速化**（`-fstack-protector-strong -D_FORTIFY_SOURCE=2 -Wl,-z,relro,-z,now` 硬化済み） |
| ビルド検証 4 ジョブ (`catalog`+`dx_atlas`+`tsc`+`validate_parts`) | 23.1s（直列） | **474ms**（`flow verify --parallel --suite=build --cached` 4/4 HIT） | **48.7x 高速化**（最終ゲート `FLOW_NO_CACHE=1` 時は強制無効） |
| セルフトテスト 4 ジョブ (`bg`+`dx`+`sp`+`flow`) | 12.33s（直列） | **23ms**（`flow verify --parallel --suite=selftest --cached` 4/4 HIT） / Cold 12.38s | **538x 高速化**（`FLOW_NO_CACHE=1 --cached` で `0/4 HIT / 12.68s` となりバイパス不能を実証） |
| `EXAM V1.1` フルセルフトテスト (`111/111`, 48 実ソルバー) | 35.66s（サンドボックスなし） | **35.24s** (`dur_s=35.02s`, 2ms Linux UserNS/NetNS サンドボックス常時 ON) | **速度低下ゼロ（-0.42s）**。`unshare --net` + loopback-only `lo`（外部通信 0）＋`NoNewPrivs=1`＋`prlimit`＋`env -i` |

### トークン削減・文書自律化（実測値）

| 対象 | Before | After | 削減率 / 保証 |
|---|---:|---:|---|
| [AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md)（毎ターン読込） | 4,368 tok | **1,844 tok** | **-57.8%**（フラグ詳細は `flow doc tool <name>` へオンデマンド移管、直接バイパス案内を全廃） |
| [README.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/README.md) | 4,562 tok（手書き乖離あり） | **4,110 tok** | **-9.9%** ＋ `@FLOW_AUTO:*` 3 ブロック完全自動同期（1 桁でもズレると `flow doc audit --strict` が `EXIT 2` で停止） |
| `flow auto research --target=mishoe`（14 ステップ並列） | ~1,800+ tok | **4 行 (~120 tok)** | **-93%**（PASS ステップを `PASS_SUM` 1 行に自動圧縮、`--verbose` で全展開） |
| `EXAM V1.1` PASS 出力 (`tlx1_protocol.mjs`) | ~1,400 tok（48 行 `E\|`） | **~70 tok**（`E_SUM`＋`DIFF` のみ） | **-95%**（FAIL/WARN/DIFF のみ出力、完全ログは `results.ndjson` へ無損失保存） |

---

## 2. 実装と検証の全体像

### A. FLOW Security（13 層要塞＋46 攻撃レッドチーム＋カーネル隔離）
- **Edit Permit Gate & 権限分離** ([permit_manager.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/permit_manager.mjs), [flow.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/flow.mjs)):
  - デフォルトロールを `worker` に引き下げ、`--policy=integrator` の自己昇格を `EXIT 6 (SELF_ELEVATION_BLOCKED)` で即時拒否。`integrator` は明示的な `--elevate-integrator --reason="<6文字以上>"` の Edit Permit 発行が必須。
  - スコープ外編集・改ざん・無許可編集時は自動隔離（Quarantine）＋ Permit 失効＋ `flow security recover` によるクリーン復帰フローを実装。
- **高速デュアルティア・ソルバー隔離** ([solver_sandbox.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/solver_sandbox.mjs), [Dockerfile.sandbox](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/Dockerfile.sandbox), [solver_exec.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/engines/solver_exec.mjs)):
  - 常時有効な 2ms Linux カーネル隔離（`unshare --user --map-root-user --net` で外部 NIC・デフォルトルート完全遮断、OpenMPI/GetDP 用に `lo` のみ有効化＋`setpriv --no-new-privs`＋`prlimit`＋`env -i` 汚染環境変数除去）と、1 ラン 1 コンテナ `:ro` マウント型 `SolverSandboxSession` を実装。
- **Ed25519 非対称署名と正直なローカル未署名表示** ([crypto_attestation.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/crypto_attestation.mjs)):
  - 秘密鍵を VM/Git に一切置かず、外部環境変数 `FLOW_ED25519_PRIVATE_KEY_PEM` のみから署名。ローカル実行時は正直に `LOCAL_UNATTESTED` を明示。
- **全バイパス経路・動的コード評価の根絶**:
  - `--no-exam` / `--no-checks` / `--skip-build` / `--no-snap` / `--ignore-orphans` / `allowSecretsUnsafe` / インライン `bg-ignore-secret` & `flow-sec-allow:*` を全廃。
  - `flow exec` の引数ホワイトリスト検査（`--only`, `--force`, `--allow-main` 等を `EXIT 6` 遮断）。
  - [scene_extractor.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/spatial_engine/scene_extractor.mjs) と [domains.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/sokutei_core/domains.mjs) から `new Function` を完全撤去（インライン例外コメント 0 件で `SEC-07` 全件合格）。
  - 推移的 EXAM カーネル閉包 ([kernel_closure.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/kernel_closure.mjs))、サラミ累積ドリフト検知 (`SEC-08`)、不変コア削除ロック ([core_immutable_manifest.json](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/core_immutable_manifest.json) — 既存コア・`T001..T1080`・組込パイプライン削除は `EXIT 6`、AI 作成の `ai-*` マクロのみ削除可)、`.git/config` 危険ディレクティブ監査、6 バイナリ SHA-256 検証、`0o600` spill ログ自動消去を実装。
- **外部 CI ゲート** ([flow-security.yml](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/.github/workflows/flow-security.yml)): PR / `main` push 時に 46 攻撃テスト・13 層監査・`@FLOW_AUTO` ドリフト検査・非キャッシュビルド・Ed25519 CI 署名を自動実行。

### B. EXAM 構造改善（実製造成果物ダイレクト経路＋Verification/Validation 境界明示）
- [real_artifact_loader.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/real_artifact_loader.mjs) & [exam.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam.mjs): `--project=<exam.project.json>` (`schema: "tlx11-real-project/v1"`) により本物の STEP / KiCad / SPICE / Verilog / BOM を外部ソルバーへ直接入力。不足ドメインは捏造せず正直に `MISSING_REAL_ARTIFACT` (`EXIT 2`) を返却することを実テストで確認済み。
- [v11_certificate.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/v11_certificate.mjs) & [ZeroTextControls.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts): 証明書および UI 保証モーダルに `CAD_PROXY` vs `REAL_ARTIFACT` および「ソフトウェア事前検証 (Verification) であり、実機量産出荷には別途実機計測・法規認証 (Validation) が必要」である境界を明記。

### C. 全自動検証スイート実測結果
- `npm run flow -- selftest --raw`: **`PASS | sec13=46/46 | permit=6/6 | sandbox=3/3 | swarm=8/8 | macro=12/12 | books=2/2(5954tok)`**
- `npm run flow -- security audit --full --raw --role=integrator`: **`PASS | layers=12/12 | findings=0`**
- `node scripts/exam.mjs selftest`: **`PASS | pass=111/111 | engines=48 | tests=1080 | locks=28 | dur_s=35.02 | sv=48/48`**
- `node scripts/exam/v11_certificate.mjs selftest`: **`PASS | refuse99=NOT_ELIGIBLE | intact=CERTIFIED | drift001mm=REVOKED_GEOMETRY_DRIFT | forged=REVOKED_FORGED_SIGNATURE`**
- `npm run bg -- selftest --ai`: **`20/20 PASS`** / `node scripts/dx.mjs selftest --ai`: **`22/22 PASS`** / `npm run sp -- selftest --ai`: **`20/20 PASS`**
- 汎用ポータブル出力 (`flow export-template` -> 新規空リポジトリで実行): **`PASS | sec13=46/46 | permit=6/6 | sandbox=3/3 | swarm=8/8 | macro=12/12 | books=2/2(1744tok)`**
- `@FLOW_AUTO` 負のドリフトテスト（`2937` -> `2936` の 1 桁改変）: **`EXIT 2 (DOC_DRIFT:AGENTS.md:ENV_HEADER)`** を検出し、`flow doc sync` で自動復旧を確認。
- 非キャッシュ本番ビルド (`catalog` + `tsc --noEmit` + `validate_parts` + `npm run build`): **`PASS`（0 エラー）**

---

## 3. 境界の明確化（VM 内完結 vs 人間側外部インフラ設定）

| 区分 | 項目 | 現状と到達レベル |
|---|---|---|
| **A. VM 内完結（本 PR で 100% 実装・実証済み）** | Edit Permit Gate / デフォルト `worker` / 2ms カーネル隔離 (UserNS/NetNS/NoNewPrivs/prlimit/env -i) / 1-container Docker `:ro` セッション / 46 攻撃 Red-Team / Salami & コア削除ロック / `@FLOW_AUTO` 自動同期 / Real-Artifact 経路 / 4 本柱高速化 | **Class B（ローカル強制・誤操作＆プロンプトインジェクション抑止）達成済み**。ローカル VM では `sudo`/`git` 権限上、完全な強制境界ではない点を正直に明記。 |
| **B. 人間側・外部インフラ設定（真の Class C 境界）** | **B-1**: GitHub `main` Branch Protection（`flow-security-gate` 必須化・force push 禁止）<br>**B-2**: Ed25519 秘密鍵の GitHub Actions Secrets 登録＋公開鍵の `verification/keys/flow_v11_pub.pem` 配置 | PR マージ後、人間側の最短操作（約 2 分）で **Class C（VM 侵害下でも破れない外部暗号・ブランチ保護境界）** が完成します。 |
