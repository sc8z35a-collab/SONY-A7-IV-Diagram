# 🛡️ ぶち切れ対策ツール v1（`bg` / Buchigire Guard v1）— AI エージェント向け完全運用・効果ガイド

> **対象読者**: 本リポジトリおよび任意の Git リポジトリで作業するすべての AI コーディングエージェント（および人間開発者）
> **実行エンジン**: [scripts/bg.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/bg.mjs) ＋ `scripts/buchigire_guard/*.mjs`（外部 npm 依存ゼロ・Pure Node.js 22・Git 2.38+）
> **鉄則**: **「ローカル VM のディスクはいつでも 1 秒後に消滅する揮発メモリである」**。未プッシュの成果物は存在しないものと見なせ。

---

## 1. なぜ「ぶち切れ対策ツール v1（`bg`）」が存在するのか

AI エージェント開発でユーザーを心の底から激怒させる致命的インシデントは、例外なく以下の **6 大構造欠陥** から発生する：

1. **クラウド VM 突然死・再作成による未プッシュ作業の全消失**
   アイドル待機中やコンテナ回収で VM が新規クローンへ入れ替わると、未コミット・未プッシュの新規ファイル・変更・`/tmp`・計画書アーティファクトが一瞬で全滅する。
2. **「完了しました」詐称（未プッシュ・未検証・古いテスト結果での報告）**
   オフ VM 永続化を裏取りせず、あるいは最終 1 行を編集した後にビルド／テストを再実行しないまま「完了」と報告してしまう。
3. **コンテキスト圧縮・VM リセットによる AI 記憶喪失**
   長い作業後にコンテキストが圧縮・リセットされると、計画・到達点・既知のバグ修正・次の手順が抜け落ち、同じ失敗を繰り返す。
4. **待機中の並行マージによる上流乖離・衝突地獄**
   別エージェントや開発者が `origin/main` へ PR をマージしたことに気付かず古い分岐で作業し、統合時に衝突・先祖返りを起こす。
5. **破壊的コマンド・一括置換・スクリプト暴走によるコード消失**
   `git reset --hard`、大規模正規表現置換、コード生成スクリプトの失敗で作業ツリーを戻せなくなる。
6. **自動退避やコミット時の秘密鍵・巨大バイナリ・一時ゴミ誤流出**
   バックアップのつもりがトークンや `.env`、100 MB 超バイナリ、ルート直下のテスト画像を GitHub へ送ってしまう。

**`bg` はこれら 6 大事故を「気合や注意」ではなく、36 の機械的・暗号学的ガードレール（`BG-01`〜`BG-36`）で物理的に発生不能にする汎用防御システムである。**

---

## 2. 定量的効果（導入前 vs 導入後ビフォーアフター）

| 指標・リスク領域 | 導入前（素の Git / AI 運用） | `bg` v1 導入後（機械的強制） | 効果・保証根拠 |
|---|---|---|---|
| **最大データ消失窓（RPO）** | **∞（数時間〜全滅）** | **≤ 120 秒（または 0 秒：`bg seal`）** | `BG-01`〜`BG-06` 非侵襲シャドウ Vault＋`ls-remote` 裏取り |
| **VM 全消失からの復旧時間（RTO）** | **数時間のゼロから再実装** | **< 2 秒（1 コマンド）** | `BG-08`〜`BG-10` `bg boot` 自動検知 → `bg recover`＋SHA-256 100% 照合 |
| **未プッシュ「完了報告」発生率** | 発生し得る | **0%（終了コード 2 で物理遮断）** | `BG-14` `bg gate`＋改ざん不能 `BG-RECEIPT` 記載義務 |
| **計画書・進捗の記憶喪失** | VM 死＋圧縮で全ロスト | **0%（リモート Vault 内自動携行）** | `BG-11` フライトレコーダー＋`BG-12` アーティファクト MD ミラー |
| **並行 PR マージ時の復旧衝突** | 手動マージ地獄・先祖返り | **自動 3-way 統合＆事前衝突予知** | `BG-09` `--mode=three-way`＋`BG-24` `git merge-tree` 無破壊予測 |
| **修正後の古いテスト証跡流用** | 見落とし発生 | **0%（1 バイト編集で自動失効）** | `BG-16` Git Tree SHA 紐付けレシート（`STALE_RECEIPT`） |
| **秘密鍵・トークン誤流出** | 自動バックアップで高リスク | **0%（リモート送信前に強制中断）** | `BG-18` ゼロリークスキャナ（PAT / AWS / PEM / `.env` 遮断） |
| **CI 誤発火・履歴汚染** | WIP ブランチ乱立で CI 暴走 | **0 回（`HEAD`/履歴/CI 非干渉）** | `BG-01`/`BG-02` 一時 `GIT_INDEX_FILE`＋不可視 `refs/bg-vault/*` |

---

## 3. AI エージェント必須 5 ステップ標準ワークフロー

AI エージェントは **すべてのセッション・すべてのタスク** で以下の 5 ステップを機械的に実行すること。

### Step 1: セッション開始 1 秒目の生存確認（`boot`）
```bash
npm run bg -- boot --ai
```
- **終了コード `0`**: クリーン開始可能。
- **終了コード `3`（`RECOVERY_AVAILABLE`）**: **死んだ旧 VM の未マージ成果物がリモートに残存！** 新規作業を始める前に必ず以下で中身を確認・復旧すること：
```bash
npm run bg -- recover --mode=inspect --ai
npm run bg -- recover --mode=three-way --with-artifacts --artifacts=<ARTIFACT_DIR> --ai
```

### Step 2: 最新 `origin/main` からの安全ブランチ起動（`start`）
```bash
npm run bg -- start feat-my-task --goal="実装目標を1行で記載" --next="最初の工程" --ai
```
- 最新 `origin/main` からブランチを切り、初回からリモートへ追跡ブランチと初期 Vault を即時登録する。
- 長時間実装に入る場合はバックグラウンド自動退避デーモンを常駐させてもよい（`IsDaemon: true`）：
```bash
npm run bg -- watch --interval=120 --artifacts=<ARTIFACT_DIR>
```

### Step 3: マイルストーンごとのオフ VM 退避（`snap`）＆ 危険操作ラップ（`guard-exec`）
まとまった実装・修正が完了するたびに（目安 10〜15 分または 1 モジュール単位で）実行：
```bash
npm run bg -- snap \
  --completed="W221-W265 実装完了" \
  --next="W266-W315 着手" \
  --artifacts=<ARTIFACT_DIR> \
  --ai
```
- `HEAD`・ステージング・コミット履歴・通常ブランチ一覧を **一切汚さず**、追跡変更＋未追跡新規ファイル＋計画書 MD＋フライトレコーダーをリモート Vault へ原子 push し、`git ls-remote` で OID 完全一致を裏取りする。
- 大規模一括置換・コード生成・rebase 等の危険操作を行う直前は必ずラップする：
```bash
npm run bg -- guard-exec -- node scripts/bulk_refactor.mjs
```

### Step 4: ユーザー確認待ち・質問・ターン終了前の強制封印（`seal`）
**ユーザーに質問する前・計画承認を待つ前・作業を一旦止める前は必ず実行（絶対鉄則）：**
```bash
npm run bg -- seal \
  --next="承認後にフェーズ2実装へ移行" \
  --artifacts=<ARTIFACT_DIR> \
  --ai
```
- リモート裏取りが失敗した場合は `exit 2` で停止し、ローカルへ暗号検証済 `.bgbundle` を自動退避する。

### Step 5: 完了報告前ゲート通過（`gate`）＆ 安全ランディング（`land`）
「完了しました」とユーザーへ報告する直前に **必ず実行** する：
```bash
# 並列ワーカー作業時（共有ファイル保護有効）
npm run bg -- gate --policy=worker --run-checks --require-checks --ai

# 最終統合・マージ時（全整合チェック有効）
npm run bg -- gate --policy=integrator --run-checks --require-checks --ai
```
- **8 不変条件すべてが PASS（`exit 0`）した時だけ発行される改ざん不能レシート**:
  `RECEIPT: BG-RECEIPT:<tree8>:<remoteRef>:<policy>:<sig8>`
- **AI エージェントは、この `BG-RECEIPT:...` を完了報告メッセージへ明記しなければならない。** レシート未取得のまま「完了」と報告することは厳禁である。
- PR 作成〜マージまで一貫して行う場合：
```bash
npm run bg -- land --policy=integrator --title="feat: ..." --body="..." --merge-pr --ai
```

---

## 4. 全 14 コマンド早見表 ＆ 終了コード契約

| コマンド | 主用途 | 典型的な AI 実行例 |
|---|---|---|
| `boot` | 起動時の上流取得＆旧 VM 孤立 Vault 検出 | `npm run bg -- boot --ai` |
| `start <slug>` | 最新 `origin/main` から安全ブランチ起動＆初回 push | `npm run bg -- start my-feature --goal="..." --ai` |
| `snap` / `checkpoint` | 非侵襲オフ VM 退避＋フライトレコーダー更新 | `npm run bg -- snap --next="..." --artifacts=... --ai` |
| `seal` | アイドル／応答終了前の必須リモート封印（`require-remote`） | `npm run bg -- seal --next="..." --ai` |
| `watch` | 120 秒間隔バックグラウンド自動オフ VM 退避デーモン | `npm run bg -- watch --interval=120` |
| `recover` | 3 モード災害復旧（`inspect` / `worktree` / `three-way`） | `npm run bg -- recover --mode=three-way --with-artifacts` |
| `gate` | 8 不変条件完了ゲート＆`BG-RECEIPT` 発行 | `npm run bg -- gate --policy=integrator --run-checks --ai` |
| `record-check` | 任意検査コマンドの PASS 証跡を現 Tree SHA へ紐付け | `npm run bg -- record-check --name=tsc -- npx tsc --noEmit` |
| `guard-exec` | 危険コマンド直前の安全退避＋失敗時 1 行ロールバック提示 | `npm run bg -- guard-exec -- <risky-cmd>` |
| `sync` | `git merge-tree` 無破壊仮想マージ衝突予測 | `npm run bg -- sync --ai` |
| `land` | push 裏取り → gate → `gh pr create` → 任意 `--merge-pr` → `gc` | `npm run bg -- land --title="..." --merge-pr --ai` |
| `status` | 耐久性スコア（0–100）・RPO・HTML5 ダッシュボード生成 | `npm run bg -- status --html=/tmp/bg_dashboard.html --ai` |
| `hooks` | ローカル `pre-commit` / `pre-push` 安全フック管理 | `npm run bg -- hooks install` |
| `gc` | マージ済／期限超過のローカル＆リモート Vault 清掃 | `npm run bg -- gc --dry-run` |
| `selftest` | 20 項目カオス自己証明テスト（実 `rm -rf` VM 破壊含む） | `npm run bg -- selftest` |

### 決定論的終了コード契約（`BG-32`）
- **`0` (`EXIT_OK`)**: PASS / オフ VM 永続化確認済 / 安全
- **`1` (`EXIT_ERROR`)**: 構文・環境・ランタイムエラー
- **`2` (`EXIT_BLOCKED`)**: **ハード遮断（未プッシュ・シークレット検知・コンフリクト記号・保護パス違反・証跡失効・衝突予測）— 完了報告／push 絶対禁止**
- **`3` (`EXIT_WARN`)**: 警告／旧 VM の未復旧 Vault 発見（`RECOVERY_AVAILABLE`）／上流先行（`BEHIND_UPSTREAM_CLEAN`）

---

## 5. 全 36 産業レベル対策一覧（`BG-01`〜`BG-36`）

- **柱 1 — ゼロロス連続オフ VM 永続化**: `BG-01` シャドウ Index 非侵襲スナップショット / `BG-02` 二段名前空間オフ VM Push（`refs/bg-vault/*` → `refs/heads/bg-vault/*` 自動フォールバック）/ `BG-03` 自動 Watchdog デーモン / `BG-04` 二重原子ジャーナル / `BG-05` `ls-remote` OID リードバック検証 / `BG-06` アイドル前強制封印 `seal` / `BG-07` オフライン `.bgbundle`＋SHA-256 出力
- **柱 2 — 瞬時災害復旧＆記憶保全**: `BG-08` 起動時孤立 Vault 検出 / `BG-09` 3 モード復旧（`inspect` / `worktree` / `three-way`）/ `BG-10` 復旧後全ファイル SHA-256 照合 / `BG-11` AI フライトレコーダー / `BG-12` アーティファクト MD 自動ミラー / `BG-13` 多世代タイムマシン履歴（`--rev=N`）
- **柱 3 — 完了詐称防止ゲート**: `BG-14` 8 不変条件 Pre-Claim ゲート＆`BG-RECEIPT` / `BG-15` `worker` vs `integrator` スコープ保護 / `BG-16` Tree-SHA 紐付け鮮度検証レシート / `BG-17` 異常縮小・JSON パーツ減少検知 / `BG-18` ゼロリーク秘密鍵遮断スキャナ / `BG-19` 生成物同期プラグイン
- **柱 4 — 破壊操作インターロック**: `BG-20` `guard-exec` 事前退避＆ロールバック / `BG-21` チェーン保全 Git フック管理 / `BG-22` 保護ブランチ force-push シールド / `BG-23` 安全ブランチ起動 `start` / `BG-24` `git merge-tree` 無破壊仮想マージ衝突予測 / `BG-25` 原子 PR ランディング `land`
- **柱 5 — ゼロ依存・高性能・汎用性**: `BG-26` Pure Node.js 22 ゼロ外部依存 / `BG-27` `.bgrc.json` 汎用設定＋自動言語検出 / `BG-28` サブ秒差分 No-Op スキップ / `BG-29` 巨大バイナリ＆ルートゴミ遮断 / `BG-30` 自動 Vault GC / `BG-31` PID 検証排他ロック＆原子書込
- **柱 6 — AI 親和性＆自己証明**: `BG-32` 決定論的終了コード / `BG-33` `--ai` 省トークン＆`bg/v1` JSON / `BG-34` 単一ファイル対話型 HTML5 ダッシュボード / `BG-35` 20 項目カオス自己テスト `selftest` / `BG-36` 本マニュアル＆`AGENTS.md` 鉄則統合

---

## 6. 緊急災害復旧プレイブック

### シナリオ A: クラウド VM が突然リセット・再クローンされた
```bash
npm run bg -- boot --ai                       # 孤立 Vault の slug・VM名・次手順を確認
npm run bg -- recover --mode=inspect --ai     # 世代履歴とフライトレコーダー確認
npm run bg -- start feat-recovered --ignore-orphans
npm run bg -- recover --slug=<OLD_SLUG> --mode=three-way --with-artifacts --artifacts=<ARTIFACT_DIR>
```
> `three-way` は待機中に `origin/main` へ入った新規 PR の変更をすべて保持したまま、死んだ VM の変更＋未追跡ファイル＋計画書 MD を SHA-256 100% 検証付きで統合復元する。

### シナリオ B: スクリプト暴走・一括置換ミスでファイルを壊した
```bash
npm run bg -- recover --mode=inspect          # ~0, ~1, ~2 の世代一覧を確認
npm run bg -- recover --mode=worktree --rev=1 # 壊す直前の世代へ無損失復元
```

### シナリオ C: `gate` が `exit 2` で止まった
- `1_OFF_VM_DURABLE` FAIL → `npm run bg -- seal --ai`（または `git push`）
- `3_ZERO_SECRETS` FAIL → 該当行から秘密鍵・PAT を削除（意図的ダミーテスト文字列のみ `# bg-ignore-secret`）
- `5_HYGIENE_AND_BLOAT` FAIL → リポ直下の一時画像等を `/tmp/` へ移動または削除
- `7_UPSTREAM_MERGE` FAIL → `npm run bg -- sync` で衝突ファイルを確認し `origin/main` を取り込む
- `8_VERIFICATION_RECEIPTS` FAIL → 編集後に `npm run bg -- gate --run-checks --require-checks` を再実行

---

## 7. 他プロジェクトへの汎用移植手順（30 秒導入）

`bg` は外部依存ゼロのため、任意の Git リポジトリ（Node / Python / Go / Rust / 汎用）へ以下だけで移植できる：
1. `scripts/bg.mjs` と `scripts/buchigire_guard/` を対象リポジトリへコピー。
2. 任意で `.bgrc.json` を配置（無くても `defaultBranch`・言語別検証コマンドを自動検出）。
3. `node scripts/bg.mjs selftest` で `20/20 PASS` を確認して運用開始。
