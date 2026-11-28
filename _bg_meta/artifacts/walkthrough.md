# Walkthrough — PR#67: AI 1発環境把握・0ソース読み・8,000 tok 完全説明書改革 ＆ EXAM 重大バグ修正

- **Pull Request**: https://github.com/sc8z35a-collab/SONY-A7-IV-Diagram/pull/67
- **Merged Commit (`main`)**: `835ba1f8de`（Squash & Merge、作業ブランチ `feat/instant-comprehension-os` 削除済み）
- **GitHub Actions CI**: `FLOW Security Gate` **PASS（1m 29s）**（48 攻撃オラクル・13 層監査・厳格 2 冊 SSOT・非キャッシュビルド・Keyless OIDC + Sigstore 署名検証）
- **FLOW-RECEIPT**: `FLOW-RECEIPT:84ff0a44:151bcbd8:d96635b8:integrator:e559a1f037bc`（`BG-RECEIPT:f766d70c:origin/feat/instant-comprehension-os:integrator:1fded457` + `SEC-RECEIPT:84ff0a44:12/12:a5c09274`）

---

## 1. 実装した改革内容（18 ファイル変更）

### ① Book 1（[AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md)：`2,812 / 2,850 tok`）＆ テンプレート
- **`I00 NO_INFRA_DIVE`** を `@IRON_LAWS` 最上部に新設：`/plan`・ユニット実装・**EXAM FAIL デバッグのいずれにおいても** `scripts/flow_os/*`, `scripts/exam/*`, `scripts/buchigire_guard/*`, `scripts/spatial_engine/*`, `src/core/*`, `.github/workflows/*` のソース読み込みと 21 ユニット生 `sp audit` ループを明示禁止。
- **`@CONTRACTS_QUICKREF`** を新設：Permit（`SEC-10`）・`SEC-08` 数値上限（`3.0mm / 0.6mm / 5.0%`・不変コア）・`flow heal` Tier-A/B 仕様・`flow auto` 6 種 DAG・Sandbox / Keyless OIDC / CI 仕様をソース逆引き不要で完結記載。
- ポータブルテンプレート [AGENTS.tmpl.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/templates/AGENTS.tmpl.md) および [.flowrc.json](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/.flowrc.json) / [kernel_config.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/kernel_config.mjs) を更新（`maxEnvTokens: 2850`, `maxDomainTokens: 8000`, `budgets.status: 450`, `requiredEnvTokens` に `NO_INFRA_DIVE`, `flow status` 追加）。

### ② Book 2（[README.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/README.md)：`7,892 / 8,000 tok` — 完全ゼロ逆引き説明書）
- **`@UNIT_DEPENDENCY_DAG`**：Stage 1（独立 19 ユニット・並列可）→ Stage 2（コンポジット 2 ユニット `camera_body` [7 依存]・`integrated` [8 依存] via `camera_macro_shared.ts`）・EXAM 除外 2 ユニット（`mirai_2028`, `sensor_fab`）。
- **`<!-- @FLOW_AUTO:UNIT_HEALTH_SUMMARY -->`**：[doc_sync.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/doc_sync.mjs) により `catalog/UNIT_HEALTH.tsv` + `verification/certificates/` + `src/units/*.pose.tsv` から SSOT 自動生成（ドリフト時は `EXIT 2`）。
- **`@EXAM_CERT_AND_PASS_CONTRACT`**：`V1.1証明` の厳格発行条件（`FAIL=0 & WARN=0 & ERR=0 & SKIP=0`、`0.0001mm` 自動失効）・全 12 柱/48 エンジンの数値閾値・VM 所要時間目安。
- **`@EXAM_IR_FLAGS_AND_MATERIAL_DB`**：全 10 種 `PART_FLAGS` 正規表現・`powerW` 規定値・`matKey` 解決順・金属/絶縁体プリセット物性表（`rho/E/sy/eGalv/mfgClass`）・ガルバニック腐食 `dV` ルール。
- **`@EXAM_DEBUG_PLAYBOOK`**：7 枚のスクショで AI が 8 分以上ソースを掘りに行った全 9 カテゴリの修正レシピを網羅（`EX02 <=0.08mm` 200 項目連鎖法則、CalculiX `hasCompliant`、`EX13` DFM 肉厚、`EX22-36` GPU `<=64MB`、`EX47` Hertz `minYieldMpa` 罠、`EX48` screw pierce AABB 重複＆`igraph` 1 連結成分、`exam query` デバッグ手順）。

### ③ `<180ms`・`371 tok` スピル 0 の `flow status` ＆ `catalog/UNIT_HEALTH.tsv`
- [unit_health.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_adapters/sony_a7iv_cad/unit_health.mjs) ＆ [UNIT_HEALTH.tsv](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/catalog/UNIT_HEALTH.tsv)（全 23 モード初回計測済み）を新設。
- [flow.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/flow.mjs) / [adapter.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_adapters/sony_a7iv_cad/adapter.mjs) / [doc_compiler.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/doc_compiler.mjs) / [solver_sandbox.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/solver_sandbox.mjs) / [tool_specs.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/tool_specs.mjs) / [test_cache.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/test_cache.mjs) を統合：
  - `flow status`：**内部 `166〜179ms` / `371 tok`（予算 450 以内・スピル 0）** で Git・Permit・OIDC・Sandbox・Books・VM・Chrome・48 ソルバー・6/6 プリビルドキャッシュ・認証数・DAG・全 21 ユニットの正確な衝突/`EX02 >0.08mm` 未接地/SMT/展開干渉を一撃出力。
  - `flow wake --brief` に対応。
  - `flow heal --apply` / `flow ship` 時の `catalog/UNIT_HEALTH.tsv` 自動更新＋`doc sync` は **`integrator` 実行時のみ** 発火（`SEC-10` の `worker` パス隔離を厳守）。

---

## 2. 調査過程で発見・同時修正した重大バグ（欠点・やばい点 4 件）

1. **[ir_compiler.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/ir_compiler.mjs#L262) ＆ [scene_extractor.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/spatial_engine/scene_extractor.mjs#L177) — 全 23 実 CAD ユニットの `matKey` サイレント欠落バグ**
   - `scene_extractor.mjs` は `matKey` を出力していたのに、`ir_compiler.mjs` が `firstMesh?.materialKey || ''` を参照していたため、全 23 ユニットで PBR カタログ材質が 100% 捨てられていた（`selftest_oracle.mjs` は合成メッシュで `materialKey` を渡していたためテストをすり抜けていた）。
   - さらに `scene_extractor.mjs` の `inferMaterialKey` が未タグ材質を誤って `'welcomeCoreSlate'`（アルミ `a6061_t6`）扱いしていた点も同時修正。
   - **修正後実証**：`original` で `0 -> 128/128 (100%)`、`battery` で `0 -> 91/130` の実 PBR `matKey` 伝搬を確認。
2. **[ir_compiler.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/ir_compiler.mjs#L104) — `buildSourceLineMap` のディレクトリ解決バグ**
   - `mishoe` を存在しない `src/assemblies/mi_shoe` にマップし、`sensor_fab` / `mirai_2028` / `micro` / `micro_v2` / `camera_body` / `integrated` のソース行解決が欠落していた問題を修正。
3. **`sp_float (>4.0mm)` と `EX02 (<=0.08mm)` の盲点解消**
   - 従来の `sp` 監査だけでは `welcome` と `original` が「clean（0 欠陥）」に見えながら EXAM `EX02` で 200+ 件連鎖 FAIL する罠があった。
   - `unit_health.mjs` に `EX02` 準拠の `<=0.08mm` 接地 BFS 計測（`ex02_gap08`）を追加し、`welcome:207g`・`original:104g`・`bionz_v2:54g`・`micro_v2:11g` を `flow status` と `UNIT_HEALTH.tsv` で即可視化。
4. **[exam_setup.sh](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam_setup.sh#L24) — `--verify-only` 直接実行時の `apt-get` 暴発バグ**
   - `bash scripts/exam_setup.sh --verify-only` を直接叩くと `--verify-only` が無視されて 66 パッケージの `apt-get` と C++ ビルドが走る不具合を修正（`3.8s` で `48/48 READY` 検証のみ実行）。

---

## 3. 検証結果サマリー（全件非キャッシュ PASS）

| 検証項目 | コマンド | 結果 |
|---|---|---|
| `flow status` 速度・容量 | `npm run flow -- status` | **PASS**（内部 `166〜179ms`, **`371 tok <= 450`**, スピル 0） |
| 2 冊 SSOT 厳格監査 | `FLOW_NO_CACHE=1 npm run flow -- doc audit --strict --raw` | **PASS**（`2/2`, `auto_blocks=4`, `AGENTS.md=2812`, `README.md=7892`） |
| FLOW OS 完全セルフテスト | `FLOW_NO_CACHE=1 npm run flow -- selftest --raw` | **PASS**（`sec13=48/48`, `permit=6/6`, `sandbox=3/3`, `oidc=4/4`, `swarm=8/8`, `macro=12/12`, `books=2/2`） |
| 13 層セキュリティフル監査 | `FLOW_NO_CACHE=1 npm run flow -- security audit --full --raw` | **PASS**（`12/12`, `findings=0`） |
| 空間エンジン数学オラクル | `FLOW_NO_CACHE=1 npm run flow -- exec sp selftest --raw` | **PASS**（`20/20`） |
| EXAM V1.1 111/111 セルフテスト | `FLOW_NO_CACHE=1 npm run flow -- exec exam selftest --raw` | **PASS**（`111/111`, `48e/1080t/28x/48sv`, `32.31s`） |
| `exam_setup.sh --verify-only` | `bash scripts/exam_setup.sh --verify-only` | **PASS**（`48/48 READY`, `3.82s`） |
| カタログ・型・整合・ビルド | `catalog` + `tsc --noEmit` + `validate_parts` + `npm run build` | **PASS**（`UNIT_HEALTH.tsv` 保持確認済み） |
| ポータブルテンプレート互換 | `export-template /tmp/flow_ic_test` → 空リポジトリ `selftest` + `status` | **PASS**（`48/48` + `40ms status`） |
| `flow wake --brief` | `npm run flow -- wake --brief --raw` | **PASS**（`CLEAN_READY`, `HEALTH` 行統合出力） |
| GitHub Actions CI + OIDC/Sigstore | PR #67 `FLOW Security Gate` | **PASS**（`1m 29s`） |
