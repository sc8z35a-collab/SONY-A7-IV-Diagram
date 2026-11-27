# 実装計画書 — 「ぶち切れ対策ツール v1」（`bg` / Buchigire Guard v1）

> **目的**: クラウド VM の突然の破棄・再作成、未プッシュ作業の揮発、コンテキスト圧縮による記憶喪失、検証不足の「完了報告（フェイク完了）」、並列ブランチ競合、破壊的 Git 操作、シークレット誤流出といった **AI エージェント開発における致命的ストレス要因（ぶち切れ事象）を、精神論ではなく 36 の産業レベル機械的ガードレールで物理的・暗号学的に根絶する** 汎用 CLI エンジン **`bg`（ぶち切れ対策ツール v1）** と、AI エージェント向け実践マニュアル **`scripts/BUCHIGIRE_GUARD_GUIDE.md`** を設計・構築する。

---

## 1. 発生した事故のフォレンジック根本原因分析（再発率 0.00% への設計起点）

2026-11-27 に発生した作業全消失インシデントの物理的原因は以下の **5 重の欠陥連鎖** である：

1. **揮発領域への単一依存（Single Point of Volatile Storage）**: 数時間かけた 140 パーツ＋`sp` エンジンをローカル VM ディスク上に未コミット・未プッシュで滞留させた。
2. **アイドル待機前の強制退避（Flush-on-Idle）欠如**: 完了報告〜次指示までの 13 分間の待機中にクラウド VM が再作成（`11:02 UTC` に `origin/main` から新規クローン）され、ローカル変更・`/tmp`・ローカルアーティファクト領域が一括揮発した。
3. **「完了報告前ゲート（Pre-Claim Gate）」の不在**: オフ VM 永続化（GitHub リモートへの存在確認）を機械検証しないまま「完了しました」と報告してしまった。
4. **並列マージ追従の遅延**: 待機中に `origin/main` へ PR #51 がマージされたが、作業ブランチへの事前衝突チェック・自動追従が行われていなかった。
5. **セッション記憶のローカル孤立**: コンテキスト圧縮や VM 再作成時に、計画・進捗・既知の不具合修正履歴・アーティファクトをリモートから 1 秒で復元する「フライトレコーダー」が存在しなかった。

**「ぶち切れ対策ツール v1 (`bg`)」は、これら 5 欠陥だけでなく、AI コーディング全般で起こり得る全 6 領域・36 項目の事故パターンをゼロ依存・単一 CLI で構造的に封じ込める汎用インフラである。**

---

## 2. User Review Required / 設計上の重要確認事項

> [!IMPORTANT]
> **実行順序の提案（最優先で `bg` v1 を `main` へマージ）**
> 本計画をご承認いただいた場合、**まず「ぶち切れ対策ツール v1（`bg`）」自体を最速で実装・20 項目カオス自己テスト PASS・`main` へ PR マージ** した上で、すぐさま **`bg` の完全保護下（自動オフ VM 退避＋段階プッシュ＋ゲート検証）で `sp` エンジンおよび ようこそ装置 360 パーツ化を再構築・マージ** する順序を推奨します。これにより、以降の全作業で二度と 1 バイトも作業が失われません。

> [!WARNING]
> **リモート Vault 名前空間の二段フォールバック設計**
> オフ VM 退避先として、通常ブランチ一覧を一切汚さず GitHub Actions（`on: push: branches: [main]`）も誤発火させない **不可視カスタム Git Ref `refs/bg-vault/<branch-slug>`** を第一選択（Tier 1）とします。万一 GitHub 側のトークン権限やリポジトリ保護規則でカスタム `refs/bg-vault/*` への push が拒否された場合のみ、自動的に **孤立シャドウブランチ `refs/heads/bg-vault/<branch-slug>`**（Tier 2、同様に `HEAD`・ステージング・CI 非干渉）へフォールバックし、PR マージ時に `bg gc` で自動清掃します。

---

## 3. Open Questions（承認前に確認したい 2 点）

1. **完了報告時の `BG-RECEIPT` 強制規約**: [AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md) に「AI エージェントは `npm run bg -- gate` が発行する改ざん不能レシート（`BG-RECEIPT:<treeSha>:<remoteRef>:<gates>`）を取得・記載するまで『完了』と報告してはならない」という鉄則（Iron Law）を組み込んでよろしいでしょうか？（推奨: **組み込む**）
2. **デフォルト自動退避（Watchdog）間隔**: `bg watch` デーモンの自動オフ VM 退避間隔のデフォルト値は **120 秒（2 分）かつ差分検知時のみ push（変更ゼロなら 0 通信）** でよろしいでしょうか？（推奨: **120 秒**、CLI で `--interval=60` 等へ随時変更可能）

---

## 4. 全 6 柱 × 36 産業レベル対策マトリクス（`BG-01`〜`BG-36`）

| 柱 | ID | 対策名称 | 機械的実装メカニズム | 防止するぶち切れ事象 |
|---|---|---|---|---|
| **柱 1: オフ VM 連続永続化** | `BG-01` | 非侵襲シャドウ Index スナップショット | 一時 `GIT_INDEX_FILE`＋`git write-tree`＋`git commit-tree` で変更・ステージ済・**未追跡新規ファイル全量**を `HEAD`・履歴無汚染で捕捉 | 未追跡新規ファイル（新モジュール群）の取りこぼし |
| | `BG-02` | 即時オフ VM リモート Vault Push | Tier 1 `refs/bg-vault/<slug>`（自動フォールバック `refs/heads/bg-vault/<slug>`）へ原子 push | クラウド VM 突然死・再作成による作業全消失 |
| | `BG-03` | バックグラウンド自動 Watchdog デーモン | `bg watch`（`IsDaemon` 対応・PID ロック・ツリーハッシュ差分監視）が 120 秒ごとに変更を自動オフ VM 退避 | 長時間作業中のコミット忘れ・セッション途中切断 |
| | `BG-04` | ローカル＋リモート二重原子ジャーナル | `.git/bg-vault/journal.jsonl` と Vault コミット内メタデータに時刻・VM ID・SHA-256 マニフェスト・push 結果を記録 | いつ何処まで保存されたか不明になる状態 |
| | `BG-05` | リモート Push リードバック検証 | `git push` の終了コード 0 を鵜呑みにせず、`git ls-remote origin <ref>` でリモート OID 完全一致を裏取り | 見かけ上の push 成功・サイレント同期漏れ |
| | `BG-06` | アイドル／応答終了前強制フラッシュ | `bg seal --next="..."` により、ユーザー確認待ち・質問・作業中断の直前に未退避 0 バイトを強制保証 | 今回と同一の「待機中の VM 回収による揮発」 |
| | `BG-07` | オフライン暗号検証 `.bgbundle` 出力 | `git bundle create`＋`.sha256` で単一自己完結アーカイブを生成可能 | GitHub 障害・認証失効時の最終避難経路確保 |
| **柱 2: 瞬時災害復旧 ＆ 記憶保全** | `BG-08` | 起動時孤立 Vault 自動検知 | `bg boot` が開始 1 秒で `origin` の `refs/bg-vault/*` を走査し、死んだ旧 VM の未マージ資産を即アラート（`exit 3`） | VM 再作成に気付かず初期化状態のまま上書き |
| | `BG-09` | 3 モード精密復旧エンジン | `bg recover --mode=inspect\|worktree\|three-way`（最新 `origin/main` への 3-way マージ復旧含む） | PR #51 のような並行マージ後の復旧コンフリクト |
| | `BG-10` | 復旧後 SHA-256 全ファイル照合 | 復元された全ファイルの SHA-256 を Vault 内 `MANIFEST.json` と 100% 突合 | 部分欠損・文字化け・0 バイト破損の見逃し |
| | `BG-11` | 圧縮／VM 死耐性 AI フライトレコーダー | 目標・計画・完了項目・検証結果・既知の罠・次手順を `_bg_meta/flight_recorder.json` としてリモート Vault コミット内へ同梱（PR 本体には一切混入させない） | コンテキスト圧縮・VM 再起動による AI の記憶喪失 |
| | `BG-12` | アーティファクト MD 自動ミラーリング | `--artifacts=<dir>` 指定で計画書・ウォークスルー等の `.md` 資産を `_bg_meta/artifacts/` へ同時オフ VM 退避＆復元 | `.gemini/jetski/brain` 消失による計画書ロスト |
| | `BG-13` | 多世代タイムマシン履歴チェーン | Vault コミットを親ポインタ連鎖で保存し、`bg recover --rev=N` で任意世代へ無損失タイムトラベル | 破壊的リファクタリング後の切り戻し不能 |
| **柱 3: 完了詐称防止ゲート** | `BG-14` | 8 不変条件 Pre-Claim 完了ゲート | `bg gate` が オフ VM 永続化・ブランチ安全性・上流鮮度・ゴミファイル・ビルド証跡・スコープ・コンフリクト記号・レシート発行を厳密判定（違反時 `exit 2`） | 未プッシュ・未検証・壊れた状態の「完了報告」 |
| | `BG-15` | 並列作業／統合ポリシー自動切換 | `.bgrc.json` で `worker`（共有ファイル保護）と `integrator`（`registry.ts`/`catalog`/`docs` 完全同期）を機械強制 | 並列ワーカー規約違反・共有ファイル誤破壊 |
| | `BG-16` | Git Tree SHA 紐付け鮮度検証レシート | ビルド・型検査・テスト証跡を正確な Git Tree SHA に紐付け。1 文字でも編集すると自動失効（`STALE_RECEIPT`） | 「修正前に通ったテスト結果」での誤完了報告 |
| | `BG-17` | 異常縮小・誤全削除ディフ監視 | ファイル 50% 超の急減、0 バイト化、JSON パーツ数減少を自動検知・警告 | 置換ミスやスクリプト暴走によるコード消失 |
| | `BG-18` | ゼロリーク・シークレット遮断スキャナ | Vault 退避・コミット前に `ghp_`/`gho_`/`github_pat_`/`AKIA`/秘密鍵/`.env`/トークンパスを全量スキャンし該当時は**強制中断** | 自動退避による認証情報の GitHub 誤公開 |
| | `BG-19` | 生成物同期チェッカー（汎用プラグイン） | `.bgrc.json` 定義のカスタム整合コマンド（本リポでは `validate_parts.mjs` / `catalog` / `docs` 鮮度）を統合ゲートへ自動連結 | JSON とカタログ・`docs/` ビルドの不整合マージ |
| **柱 4: 破壊操作インターロック** | `BG-20` | 危険コマンド実行前自動セーフティ網 | `bg guard-exec -- <cmd>` が実行直前にオフ VM 安全点を強制取得し、失敗時に 1 行ロールバック手順を提示 | `reset --hard`・一括置換・コード生成スクリプト事故 |
| | `BG-21` | チェーン保全ローカル Git フック管理 | `bg hooks install` で既存フックを壊さず `pre-commit`（秘密鍵・コンフリクト記号・巨大ファイル遮断）と `pre-push`（`main` force-push 遮断）を導入 | うっかりコミット・誤 force-push |
| | `BG-22` | 保護ブランチ強制上書きシールド | `main` / `master` / `release/*` への `--force`・未マージブランチ誤削除をブロック | 共有本線履歴の破壊 |
| | `BG-23` | 安全ブランチ自動ブートストラップ | `bg start <slug>` が `fetch` → 孤立 Vault 確認 → 最新 `origin/main` からブランチ作成 → 初回リモート登録まで原子実行 | 古い `main` からの分岐・`main` 直作業の放置 |
| | `BG-24` | 無破壊仮想マージ衝突予測 | Git 2.56 の `git merge-tree --write-tree HEAD origin/main` を用い、作業ツリーに 1 バイトも触れず将来コンフリクトファイルを事前特定 | マージ直前に発覚する大規模コンフリクト地獄 |
| | `BG-25` | 原子 PR 作成＆安全ランディング | `bg land` が `gate` → `merge-tree` 衝突検査 → `push`＋リードバック検証 → `BG-RECEIPT` 付 PR 作成 → 任意 `--merge-pr` → `gc` を一貫自動化 | 手順抜け・壊れた PR・マージ後ゴミ残存 |
| **柱 5: ゼロ依存・高性能・汎用性** | `BG-26` | Pure Node.js 22 ゼロ外部依存設計 | 標準モジュールのみで完結。`scripts/bg.mjs`＋`scripts/buchigire_guard/` を任意 Git リポへコピーするだけで即稼働 | 依存崩壊・他プロジェクトへの流用不能 |
| | `BG-27` | `.bgrc.json` 汎用設定＋自動言語検出 | 設定ファイル無しでも Node/Python/Go/Rust/Git デフォルトブランチを自動判別。`.bgrc.json` で高度カスタマイズ可能 | プロジェクト固有ハードコードによる汎用性欠如 |
| | `BG-28` | サブ秒差分ハッシュ＆無変更スキップ | ツリー指紋が前回リモート確認済 Vault と一致時は `< 40 ms` で無通信終了 | 頻繁チェックポイントによる遅延・履歴肥大 |
| | `BG-29` | 巨大ファイル／バイナリ肥大ガード | `> 25 MB`（設定可）や `node_modules/`・`dist/`・一時キャプチャの誤混入を自動除外／警告 | GitHub 100 MB push 拒否エラーによる停止 |
| | `BG-30` | 自動 Vault GC（期限・マージ済清掃） | `bg gc` でマージ済み／期限超過（既定 7 日）のローカル＆リモート Vault ref を安全に一括削除 | リモート ref・オブジェクト領域の無制限肥大 |
| | `BG-31` | 排他ロック＆原子ファイル書き込み | PID 生存検証付ロック（`.git/bg-vault/bg.lock`）＋`.tmp` 経由 `renameSync` でデーモンと手動コマンドの競合を完全排除 | 並行実行による index・ジャーナル破損 |
| **柱 6: AI 親和性 ＆ 自己証明** | `BG-32` | 決定論的終了コード契約 | `0=PASS/DURABLE`, `1=RUNTIME_ERR`, `2=BLOCKED/FAIL`, `3=WARN/RECOVERY_AVAILABLE` を全コマンドで厳密統一 | AI の判定誤読・エラー握りつぶし |
| | `BG-33` | `--ai` 省トークン ＆ `bg/v1` JSON 出力 | AI エージェントのコンテキストを圧迫しない 5 行要約出力（`--ai`）と CI 連携用構造化 JSON（`--json`）を全コマンド標準装備 | ログ長大化によるコンテキスト枯渇 |
| | `BG-34` | 対話型 HTML5 テレメトリダッシュボード | `bg status --html=/tmp/bg_dashboard.html` で耐久性スコア（0–100）・RPO 経過時間・世代タイムライン・1 クリック復旧コマンドを可視化 | 現在の安全状態の視覚的不透明さ |
| | `BG-35` | 20 項目カオス自己証明テストスイート | `bg selftest` が `/tmp/bg_selftest_*` に本物の bare リモート＋クローンを構築し、**実際の `rm -rf` VM 破壊→完全復旧**を含む 20 障害を自動検証 | 「動くつもり」の張りぼて安全装置 |
| | `BG-36` | AI 運用マニュアル ＆ `AGENTS.md` 鉄則化 | [BUCHIGIRE_GUARD_GUIDE.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/BUCHIGIRE_GUARD_GUIDE.md) と [AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md) へ使い方・定量的効果・必須手順を明文化 | 次セッションの AI がツール存在を忘却する問題 |

---

## 5. システムアーキテクチャ ＆ データフロー

### 5.1 非侵襲シャドウ Vault ＆ オフ VM 永続化パイプライン

```mermaid
flowchart LR
    WT["Working Tree\n(Modified + Staged + Untracked)"] --> SCAN["Safety Scanners\nBG-18 Secret / BG-29 Bloat\nBG-17 Shrinkage"]
    ART["Artifacts + Flight Recorder\n(_bg_meta/*.json, *.md)"] --> IDX
    SCAN -->|PASS| IDX["Temp GIT_INDEX_FILE\n(HEAD/Index Zero-Mutation)"]
    SCAN -->|SECRET LEAK| ABORT["HARD ABORT (exit=2)\nZero Bytes Pushed"]
    IDX --> TREE["git write-tree +\ngit commit-tree (Chained Parent)"]
    TREE --> DEDUP{"Tree SHA ==\nLast Verified?"}
    DEDUP -->|Yes| FAST["NO-OP PASS (<40ms)"]
    DEDUP -->|No| PUSH["Push Off-VM Vault\nTier1: refs/bg-vault/<slug>\nTier2: refs/heads/bg-vault/<slug>"]
    PUSH --> VERIFY["git ls-remote Read-Back\nOID == Local Commit SHA?"]
    VERIFY -->|Match| JRN["Atomic Journal Write\nDURABLE=REMOTE_VERIFIED"]
    VERIFY -->|Fail| FALLBACK["Local .bgbundle + Retry\nStatus=LOCAL_ONLY (exit=2)"]
```

### 5.2 AI エージェント必須ライフサイクル（開始〜マージ／災害復旧）

```mermaid
flowchart TD
    S0["Session Start / Resume"] --> BOOT["npm run bg -- boot --ai"]
    BOOT --> CHK{"Orphaned Vault\non origin?"}
    CHK -->|"YES (exit=3)"| REC["npm run bg -- recover\n(--mode=three-way --with-artifacts)\n+ SHA-256 Verify"]
    CHK -->|"NO (exit=0)"| START["npm run bg -- start <slug>"]
    REC --> WORK
    START --> WATCH["Optional: bg watch (Daemon)\n120s Auto Off-VM Flush"]
    WATCH --> WORK["Implement / Test / Edit"]
    WORK --> SNAP["Milestone: npm run bg -- snap\n(Off-VM Vault + Flight Recorder)"]
    WORK --> GEXEC["Risky Op: bg guard-exec -- <cmd>"]
    SNAP --> WORK
    WORK --> PAUSE{"Pause / Ask User /\nTurn End?"}
    PAUSE -->|Yes| SEAL["MANDATORY: npm run bg -- seal\n--next='...' --artifacts=..."]
    PAUSE -->|Done| GATE["MANDATORY: npm run bg -- gate\n(--policy=worker|integrator)"]
    GATE -->|"FAIL (exit=2)"| FIX["Fix Issue & Re-Run Gate"]
    FIX --> GATE
    GATE -->|"PASS (exit=0)\nBG-RECEIPT Issued"| LAND["Optional: npm run bg -- land\n(--merge-pr) + bg gc"]
    LAND --> REPORT["Report Done to User\n(Cite BG-RECEIPT!)"]
```

---

## 6. Proposed Changes（ファイル別設計詳細）

### コアエンジン群（Zero External Dependencies / Pure Node.js 22）

#### [NEW] `scripts/bg.mjs`
統合 14 コマンド CLI エントリポイント（`chmod +x`、終了コード `0/1/2/3` 厳密管理、共通オプション `--ai` / `--json` / `--policy=` / `--artifacts=` / `--remote=` / `--html=` 対応）：
- `boot` / `start` / `snap` (`checkpoint`) / `watch` / `seal` / `recover` / `gate` / `guard-exec` / `sync` / `land` / `status` / `hooks` / `gc` / `selftest`

#### [NEW] `scripts/buchigire_guard/git_plumbing.mjs`
Git 2.38+ 低レベル配管・原子 IO カーネル：
- `createShadowSnapshotCommit({ repoRoot, parentOid, files, metaEntries, message })`: 一時 `GIT_INDEX_FILE` 上で `git read-tree` / `git update-index --add --cacheinfo` / `git hash-object -w` を組み合わせ、**作業ツリーと通常の `.git/index` を一切変更せずに** 追跡・未追跡ファイル＋`_bg_meta/`（`MANIFEST.json`, `flight_recorder.json`, ミラー済アーティファクト MD）を単一の改ざん不能 Git コミットへ結晶化。
- `pushVaultWithReadback({ remote, localOid, slug, preferredNamespace })`: Tier 1（`refs/bg-vault/<slug>`）への push を試行し、リモートポリシー拒否時のみ Tier 2（`refs/heads/bg-vault/<slug>`）へ自動フォールバック。成功後、必ず `git ls-remote <remote> <ref>` で返却 OID が `localOid` と厳密一致することを裏取り検証。
- `simulateVirtualMerge(headRef, targetRef)`: `git merge-tree --write-tree` による無破壊インメモリマージ検証（衝突ファイル一覧をミリ秒単位で取得）。
- `acquireLock()` / `releaseLock()` / `atomicWriteFileSync()`: PID 生存チェック付きロックと `.tmp` → `renameSync` 原子書込。

#### [NEW] `scripts/buchigire_guard/safety_scanners.mjs`
静的・動的リスク遮断スキャナ群：
- **Secret Leak Scanner (`BG-18`)**: GitHub PAT (`ghp_`, `gho_`, `github_pat_`), AWS (`AKIA`), OpenAI/GCP/Stripe キー、PEM 秘密鍵ヘッダ、`/opt/antigravity/tokens` 参照文字列、高エントロピー `.env` 値を正規表現＋行コンテキスト解析で検出（テスト用擬似パターン除外設定対応、本番時は即時 `exit 2` 遮断）。
- **Conflict Marker & Debug Guard (`BG-14`)**: `<<<<<<<`, `=======`, `>>>>>>>`, 誤残置の巨大バイナリ（`> maxFileMb`）、0 バイトソース、異常縮小（`> 50%` 削除警告）を検出。
- **Worktree Hygiene & Scope Policy (`BG-15`)**: `.bgrc.json` に定義された `worker`（禁止共有パス `src/units/registry.ts`, `catalog/*`, `docs/*`, `src/core/*` 等への誤編集ブロック）と `integrator`（全同期検証）を切り替え判定。ルート直下の一時画像・キャプチャ残置（`*.png`, `*.webp`, `captures/` 等）も自動検出。

#### [NEW] `scripts/buchigire_guard/vault_engine.mjs`
オフ VM 永続化・フライトレコーダー・災害復旧・デーモン監視エンジン：
- **Flight Recorder (`BG-11`)**: 構造化 JSON（`schema: "bg-flight/v1"`, `sessionId`, `goal`, `completed[]`, `verifiedGates[]`, `knownPitfalls[]`, `nextStep`, `updatedAt`, `vmHost`, `baseSha`）をローカル `.git/bg-vault/flight_recorder.json` とリモート Vault コミット内 `_bg_meta/flight_recorder.json` の双方へ同期。
- **Artifact Mirror (`BG-12`)**: `--artifacts=<dir>`（または環境自動検出パス）内の `.md` 計画書・ウォークスルー（サイズ上限管理付き）を `_bg_meta/artifacts/` に自動ミラーし、`recover --with-artifacts` で即復元。
- **3-Mode Recovery (`BG-09` + `BG-10`)**:
  - `inspect`: リモート Vault のファイル一覧・差分統計・フライトレコーダー内容を安全プレビュー。
  - `worktree`: `_bg_meta/` を除外した全作業ファイルを展開し、全ファイルの SHA-256 を `MANIFEST.json` と照合。既存変更がある場合は復旧前に自動でローカル安全退避を作成。
  - `three-way`: 旧ベースコミットと Vault スナップショット間の差分を最新 `origin/main` に対して 3-way 適用（並行マージ済みの新機能 PR を壊さず完全復元！）。
- **Watchdog Daemon (`BG-03`)**: `bg watch --interval=120` — 差分ハッシュが変化し未退避状態が続いた時だけ自動 `snap` を実行し、ログを `/tmp/bg_watch_<repoHash>.log` へ出力（リポ直下を汚さない）。
- **Vault GC (`BG-30`)**: マージ済みブランチや保持日数超過のローカル／リモート `refs/bg-vault/*` を安全清掃（`--dry-run` デフォルト確認オプション対応）。

#### [NEW] `scripts/buchigire_guard/gate_and_land.mjs`
完了ゲート・コマンド証跡・危険操作保護・PR ランディング：
- **8-Invariant Pre-Claim Gate (`BG-14`)** ＆ **Tamper-Evident Receipt**:
  - 全 8 検査項目を実行し、1 つでも失敗すれば `exit 2` で完了報告をブロック。
  - 全 PASS 時のみ、現在の Tree SHA・検証済リモート Ref・通過ゲート一覧・タイムスタンプの SHA-256 短縮ダイジェストを含む **`BG-RECEIPT:<tree8>:<remoteRef>:<sig8>`** を発行。
- **Tree-SHA-Bound Command Receipts (`BG-16`)**: `bg gate --run-checks` または `bg record-check --name=tsc -- npx tsc --noEmit` で成功証跡を現 Tree SHA に紐付けて記録。ファイルが 1 バイトでも変わると自動失効。
- **Destructive-Op Interlock (`BG-20`)**: `bg guard-exec -- <command...>` が実行前オフ VM スナップショットを強制確保してからコマンドを実行し、非 0 終了時に即時復元コマンドを提示。
- **Git Hooks Manager (`BG-21`)**: `pre-commit`・`pre-push`・`post-merge` を既存フック保持（チェーン実行）付きで着脱可能。
- **Atomic Landing (`BG-25`)**: `bg land --title="..." --body="..." [--merge-pr]` が統合ゲート→仮想マージ検証→push＆リードバック→`gh pr create`（`BG-RECEIPT` 自動挿入）→任意マージ→Vault GC まで一貫実行。

#### [NEW] `scripts/buchigire_guard/renderers.mjs`
AI 省トークン出力（`--ai`）、`bg/v1` JSON（`--json`）、および単一ファイル対話型 HTML5 ダッシュボード（`bg status --html=/tmp/bg_dashboard.html` — 耐久性スコアゲージ、RPO タイマー、リモート検証済スナップショット年表、フライトレコーダー表示、コピー可能復旧コマンド）。

#### [NEW] `scripts/buchigire_guard/selftest.mjs`
**20 項目アドバーサリアル・カオス自己証明テストスイート（`npm run bg -- selftest`）**:
`/tmp/bg_selftest_<pid>/` に本物の bare リモートリポジトリと複数クローンを生成し、以下 20 シナリオすべてが 100% 期待どおり動作することを機械証明する：
1. 追跡ファイル変更＋未追跡新規ファイル＋サブディレクトリを `HEAD`/ステージング無汚染でシャドウ退避
2. リモート bare への push ＆ `ls-remote` OID リードバック一致検証
3. **実 VM 破壊シミュレーション（`rm -rf` → 完全新規クローン）からの `boot` 孤立 Vault 自動検出（`exit 3`）**
4. 新規クローンでの `recover --mode=worktree` ＆ 全ファイル SHA-256 100% 一致証明
5. **並行上流マージ衝突回避テスト**: 待機中に `origin/main` へ別コミットが追加された状態で `recover --mode=three-way` が上流変更を保持しつつ作業を完全復元
6. AI フライトレコーダー（`goal` / `completed` / `nextStep`）のリモート往復復元
7. アーティファクト MD ミラーリング（`--artifacts`）の VM 破壊越え完全復元
8. 多世代履歴タイムトラベル（`rev ~2` / `rev ~1` / latest への任意巻き戻し）
9. 無変更時の No-Op 高速スキップ（`< 40 ms`、重複コミット生成 0）
10. Tier 1 カスタム ref 拒否リモート（`pre-receive` フックで模擬）に対する Tier 2 `refs/heads/bg-vault/*` 自動フォールバック
11. シークレット漏洩（疑似 `ghp_...` / `-----BEGIN RSA PRIVATE KEY-----`）のハードブロック（`exit 2`、リモート到達 0 バイト証明）
12. コンフリクトマーカー（`<<<<<<<`）残置時の `gate` ブロック（`exit 2`）
13. 巨大ファイル（`> maxFileMb`）およびルートゴミファイル（`debug.png`）の検知・ブロック
14. ファイル異常縮小（`> 50%` 削除）の検知警告
15. Tree-SHA 紐付けコマンド証跡の 1 バイト編集による自動失効（`STALE_RECEIPT`）
16. 未プッシュ状態での `gate` ハードブロック（`exit 2`）→ `seal` 後の `gate` PASS（`exit 0`）＆ `BG-RECEIPT` 発行
17. `worker` ポリシーによる保護共有ファイル（`registry.ts` 等）誤編集ブロック vs `integrator` ポリシー許可
18. `sync` 仮想マージ（`git merge-tree`）による作業ツリー無変更での事前コンフリクトファイル特定
19. `guard-exec` 失敗コマンド実行後の 1 コマンド完全ロールバック復元
20. オフライン `.bgbundle` 書き出し＋SHA-256 検証＋別リポ復元 ＆ `gc` による古いリモート Vault 自動清掃

---

### リポジトリ設定・AI マニュアル・規約統合

#### [NEW] `.bgrc.json`
汎用スキーマに基づく本リポジトリ用プロファイル（他リポでは省略しても自動検出で動作）：
```json
{
  "schema": "bg-config/v1",
  "defaultBranch": "main",
  "remote": "origin",
  "vaultNamespace": "refs/bg-vault",
  "vaultFallbackNamespace": "refs/heads/bg-vault",
  "watchIntervalSec": 120,
  "retentionDays": 7,
  "maxFileMb": 25,
  "forbidRootGlobs": ["*.png", "*.webp", "*.jpg", "captures/**", "tmp_*"],
  "policies": {
    "worker": {
      "protectedPaths": ["src/units/registry.ts", "src/assemblies/types.ts", "src/core/**", "src/ui/**", "catalog/**", "docs/**"],
      "checks": ["npx tsc --noEmit"]
    },
    "integrator": {
      "protectedPaths": [],
      "checks": ["npm run catalog", "npx tsc --noEmit", "node scripts/validate_parts.mjs", "npm run build"]
    }
  }
}
```

#### [NEW] `scripts/BUCHIGIRE_GUARD_GUIDE.md`
AI エージェント向けに特化した完全運用・効果解説マニュアル：
- **第 1 章: なぜ「ぶち切れ対策ツール v1 (`bg`)」が必要か**（2026-11-27 事故の教訓と 6 大ぶち切れパターンの構造分析）
- **第 2 章: 定量的効果・導入前後ビフォーアフター比較表**（RPO `∞ → ≤120秒`、VM 消失復旧時間 `数時間やり直し → <2秒`、未プッシュ完了報告率 `発生 → 0%（ゲート遮断）`、秘密鍵誤プッシュ `防御なし → 100% 事前遮断`、コンテキスト圧縮後再開ロス `大 → 0（フライトレコーダー復元）`）
- **第 3 章: 全 36 対策（`BG-01`〜`BG-36`）詳細リファレンス**
- **第 4 章: AI エージェント 5 ステップ必須ワークフロー（コピペ即実行レシピ）**（`boot` → `start` → `watch`/`snap` → `seal` → `gate`＋`BG-RECEIPT` → `land`）
- **第 5 章: 緊急災害復旧プレイブック**（VM リセット時・並行 PR 競合時・破壊操作ミス時・計画書ロスト時）
- **第 6 章: 終了コード・`--ai` 出力・`BG-RECEIPT`・HTML ダッシュボードの読み方**
- **第 7 章: 他プロジェクトへの持ち出し汎用利用ガイド（Zero-Dep 移植手順＆`.bgrc.json` リファレンス）**

#### [MODIFY] `package.json`
`bin.bg`（`./scripts/bg.mjs`）と `scripts.bg`（`node scripts/bg.mjs`）を追加登録（既存 `pp` 等は一切変更なし）。

#### [MODIFY] `AGENTS.md`
最優先セクションとして **「0. 作業消失・完了詐称ゼロ化のため必ず『ぶち切れ対策ツール v1 (`bg`)』を使うこと（絶対鉄則）」** を追加：
- セッション開始時の `npm run bg -- boot --ai` 必須実行
- 作業開始時の `npm run bg -- start <slug>` ＆ マイルストーンごとの `npm run bg -- snap`（または `watch` 常駐）
- ユーザー確認待ち・質問・ターン終了前の `npm run bg -- seal` 必須実行（未退避 0 バイト保証）
- 完了報告前の `npm run bg -- gate` 通過＆ **`BG-RECEIPT` 記載の絶対義務化**

---

## 7. Verification Plan（検証計画）

### Automated Tests（自動検証ゲート）
1. **構文検査**: `node --check scripts/bg.mjs scripts/buchigire_guard/*.mjs`（全ファイル exit 0）
2. **20 項目カオス自己テスト**: `npm run bg -- selftest`（**`20/20 PASS`** 必須 — 実 VM 破壊→復旧・3-way 並行マージ・秘密鍵遮断・フォールバック・レシート失効を含む全 20 シナリオ）
3. **実リモート `origin` 疎通＆リードバック実戦テスト**:
   - `feat/buchigire-guard-v1` ブランチ上で `npm run bg -- snap --artifacts=... --ai` を実実行し、Tier 1（`refs/bg-vault/...`）または Tier 2 自動フォールバックへのオフ VM 永続化＋`ls-remote` OID リードバック一致を確認。
   - `npm run bg -- status --html=/tmp/bg_dashboard.html --ai` の正常出力とスコア 100 確認。
   - `npm run bg -- sync --ai` の無破壊仮想マージ確認。
4. **既存リポジトリ全ゲート非破壊確認**:
   - `npx tsc --noEmit`（0 エラー）
   - `node scripts/validate_parts.mjs`（全ゲート PASS）
   - `npm run bg -- gate --policy=integrator --ai`（**`VERDICT=PASS`** ＆ `BG-RECEIPT` 発行確認）
5. **PR 作成 ＆ マージ後の後始末確認**:
   - `npm run bg -- land --merge-pr` で `main` へ安全マージし、`bg gc` で作業用 Vault ref が綺麗に残滓なく整理されることを確認。

### Manual Verification（ユーザー確認）
- 生成された [scripts/BUCHIGIRE_GUARD_GUIDE.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/BUCHIGIRE_GUARD_GUIDE.md) と [AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md) の AI 鉄則および操作手順の確認。
- マージ完了後、ただちに **`bg` v1 フル稼働状態**で `sp` エンジン＆ようこそ装置 360 パーツ化の再実装・マージへ進行可能であることを確認。
