# AI Agent Workspace Directives — SONY-A7-IV-Diagram

## 0. 作業消失・完了詐称ゼロ化のため必ず「ぶち切れ対策ツール v1 (`bg`)」を使うこと（絶対鉄則）
クラウド VM の突然死・再作成による未プッシュ作業の全消失、コンテキスト圧縮による記憶喪失、未検証の「完了報告」を構造的にゼロ化するため、**すべての AI エージェントは以下 5 鉄則を例外なく遵守すること**（詳細マニュアル: `scripts/BUCHIGIRE_GUARD_GUIDE.md`）。

1. **セッション開始 1 秒目に必ず `boot` を実行**:
   `npm run bg -- boot --ai`（終了コード `3` = 旧 VM の孤立 Vault 検出時は、新規作業前に `npm run bg -- recover --mode=three-way --with-artifacts` で復旧を確認すること）
2. **作業開始時は必ず最新 `origin/main` からフィーチャーブランチを作成**:
   `npm run bg -- start <slug> --goal="..." --next="..." --ai`（`main` 上に未コミット変更を長時間滞留させないこと）
3. **マイルストーン毎（目安 10–15 分または 1 モジュール完了毎）に必ずオフ VM 退避**:
   `npm run bg -- snap --completed="..." --next="..." --artifacts=<ARTIFACT_DIR> --ai`（または `npm run bg -- watch --interval=120` 常駐）
4. **ユーザー確認待ち・質問・ターン終了の直前に必ず強制封印（`seal`）**:
   `npm run bg -- seal --next="..." --artifacts=<ARTIFACT_DIR> --ai`（未退避 0 バイトをリモート `ls-remote` 裏取り確認してから待機に入ること）
5. **完了報告前に必ず `gate` を通過し、改ざん不能 `BG-RECEIPT` を報告へ明記すること（絶対禁止事項）**:
   `npm run bg -- gate --policy=worker|integrator --run-checks --require-checks --ai`
   - `exit 0` で発行される **`BG-RECEIPT:<tree8>:<remoteRef>:<policy>:<sig8>`** を取得・明記するまで「完了しました」と報告してはならない。
   - 危険な一括変更や Git 操作の前は必ず `npm run bg -- guard-exec -- <cmd>` で事前セーフティ網を張ること。

## 1. 検証絶対鉄則 — 検証は必ず「THE LAST EXAM V1 (`exam`)」のみを最大限利用し、全ツールを完全ダウンロードすること（絶対必須）
設計品質・3D CAD 幾何・衝突・浮遊・剛性 FEA・振動・CTE・公差・動力学・疲労・DFM/DFA・締結・密閉・CFD 熱流体・連成伝熱・SPICE 電源・KiCad EDA・3D 配線・FMEA・EMC・100k 光線光学・視界コーン・音響・Z3 フォーマル証明・RTL FSM・電食化学・MTBF 信頼性・Chrome 視覚シルエット・BOM 整合性・WebGL2 予算の**あらゆる検証を行うときは、必ず「THE LAST EXAM V1 (`node scripts/exam.mjs`)」のみを最大限利用すること**（AI 専用詳細仕様書: `scripts/THE_LAST_EXAM_V1_MANUAL.md`）。

### EXAM V1 絶対遵守 5 鉄則（例外・妥協・簡易代替は一切禁止）
1. **必ず全 16 系統外部産業ツール（32/32 READY）＋ 4 本 C++17 ネイティブハーネスを完全ダウンロード・ビルドすること**:
   - 新規環境・VM 再作成・初回検証前には**必ず `node scripts/exam.mjs setup`**（または `bash scripts/exam_setup.sh`）を実行し、CalculiX / Gmsh / TetGen / Netgen / OpenFOAM / Berkeley ngspice / GNU gnucap / KiCad 7.0 (`kicad-cli` + `pcbnew`) / FreeFEM++ / Z3 / COIN-OR CBC / GLPK / Bullet / ODE / FCL / CGAL / OpenCASCADE / Eigen3 / Qhull / Yosys / Verilator / Icarus Verilog / KLayout / Magic / Netgen-LVS / OpenCV / scikit-image / SciPy・NumPy・SymPy・NetworkX / Chrome `pp1.1` の **全 32/32 ツールを 100% 導入完了**させること。
   - ツール未導入時のスキップ・近似フォールバック・部分実行は厳禁（未導入時は `EXIT 5 = SOLVER_MISSING` で即停止する仕様）。
2. **検証の合否判定には必ず EXAM V1 のみを最大限利用すること**:
   - 旧来の `sp` 単体実行・`validate_parts.mjs` 単体実行・独自検証スクリプトのみで「検証完了」と報告してはならない（それらはすべて `exam.mjs` の 36 エンジン内部へ完全統合されている）。
   - 本番検証・完了報告前には `--only=` や `--skip-chrome` による省略を一切行わず、**単一コマンド `node scripts/exam.mjs --unit=<mode>` を最大レベル（全 10 柱・全 36 エンジン・全 530 固定テスト・全 4 品質ティア・16/16 クロスソルバ物理保存則・実 Chrome `pp1.1` + OpenCV 視覚監査）で無省略完走**させること。
3. **外科的再確認（`--only=` / `--resume=`）は修正ループ中のみ許可**:
   - 修復途中の高速イテレーションには `--only=EX01,EX02,...` や `query` を使ってよいが、最終合否は必ず無省略実行で発行される改ざん不能 **`TLX1-RECEIPT`** (`exit 0`, `530/530 PASS`, `X_SUM|ok=16/16`) のみで証明すること。
4. **アンチチート自己証明オラクル (`selftest`) の常時維持**:
   - `exam` / 物理エンジン関連の変更時は必ず `node scripts/exam.mjs selftest`（**`75/75 PASS`：7 大実物理欠陥注入が確実に FAIL する数学的証明**）を通過させること。物理閾値の緩和やテスト無効化による見かけ上の合格化は絶対禁止。
5. **単一コマンド体系**:
```bash
# 1. 初回・新規VMで絶対必須：全16系統外部産業ツール完全ダウンロード＋4本C++ハーネスビルド＋32/32検証
node scripts/exam.mjs setup
node scripts/exam.mjs setup --verify-only

# 2. 全36エンジン・16クロスソルバ保存則・7大欠陥注入アンチチート自己証明オラクル (75/75 PASS)
node scripts/exam.mjs selftest

# 3. 唯一の正規検証コマンド（最大レベル・無省略・全36エンジン・530固定テスト・完全AI向けTLX1出力）
node scripts/exam.mjs --unit=welcome
node scripts/exam.mjs --playground=/tmp/exported.tlx.json

# 4. 修復ループ中の外科的再確認・チェックポイント再開・詳細証跡クエリ
node scripts/exam.mjs --unit=welcome --only=EX01,EX02,EX15
node scripts/exam.mjs --unit=welcome --resume=<runId>
node scripts/exam.mjs query <runId> --status=FAIL
```
- 終了コード: `0=ALL PASS (TLX1-RECEIPT発行)` / `1=ERR` / `2=FAIL` / `3=WARN` / `4=CROSS_SOLVER_INVARIANT_MISMATCH` / `5=SOLVER_MISSING`。
- 全 36 エンジン無省略完走＆16/16 クロスソルバ保存則一致で発行される **`TLX1-RECEIPT`** なしに「検証済」「製造欠陥 0%」と報告してはならない。

## 2. 視覚撮影・スクリーンショット取得には必ず超高速 6-DoF キャプチャツール `pp1.1` を使うこと（必須）
UI、3D CAD モデル、図説（SVG）、解説ドロワー、スマホ画面表示（390×844）、Play Ground 1.1、品質ティア比較、断面カット、パーツ単体拡大の**視覚撮影**を行う際は、手動ブラウザ操作や独自スクショスクリプトを書かず、必ず `pp1.1` を使用すること（詳細: `scripts/PP1_1_MANUAL.md`。※ 検証合否の判定自体は Section 1 の `EXAM V1` (`EX22`) で一元実施すること）：

```bash
# 1. 全6モード一括高速監査パック（ウォームデーモンで超高速・品質100%無劣化）
npm run pp -- --warm --preset=audit --out=/tmp/pp_out

# 2. 単体モード指定（ui | cad | diagram | explanation | full | custom）
npm run pp -- --warm --mode=cad --unit=welcome --quality=ultra --out=/tmp/pp_out
npm run pp -- --warm --preset=playground --out=/tmp/pp_out
npm run pp -- --warm --preset=mobile --out=/tmp/pp_out

# 3. 6-DoF カメラ・自動パーツフィット・断面カット・デーモン停止（終了時必須）
npm run pp -- --warm --mode=cad --unit=evf --quality=ultra --az=35 --el=22 --fov=24 --section=x:0.52 --ssaa=2 --annotate=8 --out=/tmp/pp_out
npm run pp -- --daemon=stop
```
- 複数ショットは `--warm` で一括実行し、終了時に必ず `npm run pp -- --daemon=stop` を実行すること。
- リポジトリルート直下に一時キャプチャ画像を残してコミットしないこと（必ず `--out=/tmp/...` や専用アーティファクト領域へ出力すること）。

## 3. 処理負荷・処理速度のベンチマーク測定には必ず `sokutei` を使うこと（必須）
ビルド、V2 3D エンジン、実ブラウザ WebGL、キャプチャ (`pp1.1`)、CI 検証、カタログ生成、MIRAI コンパイラ、アプリ内シミュレータ、`bg v1` の**速度・負荷ベンチマーク（Wall/p50/p95/95%CI/CV%/CPU%/Peak RSS/GPU Frame/JSHeap）**を測定するときは必ず **`sokutei`** を使用すること（詳細: `scripts/SOKUTEI_MANUAL.md`）：
```bash
npm run sokutei
npm run sokutei -- --target=v2_unit,sim_app,pp --runs=2 --warmup=1 --json
npm run sokutei -- --all --save-baseline=/tmp/sokutei_before.json
npm run sokutei -- --all --compare=/tmp/sokutei_before.json --assert-speedup=6.0 --out=/tmp/sokutei_after.json
```

## 4. 空間マップ補助ツール `sp`（座標設計補助専用・検証合否には EXAM V1 のみ使用）
`sp` は空間マップ生成（`sp map`）の設計補助ツールおよび `EXAM V1` の内部モジュールである。**衝突・浮遊・光線・熱などの検証合否判定は `sp` 単体で行わず、必ず Section 1 の `THE LAST EXAM V1 (node scripts/exam.mjs)` のみを最大限利用すること**（マップ生成参照: `scripts/SPATIAL_SIM_GUIDE.md`）。

## 5. パーツカタログ・V2品質規約
- 並列パーツ追加・編集時は必ず `catalog/WORKER_RULE.md`（1.5 kB 以内厳守）を遵守すること。
- ビルド成果物更新時には `npm run catalog && npx tsc --noEmit && node scripts/validate_parts.mjs && npm run build` を実行し、そのうえで最終検証は必ず Section 1 の **`node scripts/exam.mjs --unit=<mode>`**（最大レベル）で確定させること。

## 6. Zero-Token 開発パイプライン（`dx`）
巨大 JSON・`docs/`・`types.ts`・冗長 CLI ログによるトークン浪費を防ぐため、探索・読込・DSL 編集には **`node scripts/dx.mjs`** を優先使用すること（検証の最終判定は Section 1 の `EXAM V1` に一元化）：
- **文脈構築・横断検索**: `node scripts/dx.mjs brief --unit=<mode> --policy=worker` / `node scripts/dx.mjs find "<query>"` / `node scripts/dx.mjs resume`
- **外科的読込・バッチ**: `node scripts/dx.mjs read <file>#<Symbol> | --head <file> | --part=<id> | --schematic=<type> | --css="<sel>"` / `node scripts/dx.mjs tx --ops='...'`
- **3大 Micro-DSL コンパイラ（デフォルト `--dry-run`、`--apply` で書込）**: `dx part upsert` / `dx cad compile` / `dx svg compile`
- **圧縮出力ラッパ・自己監査**: `node scripts/dx.mjs run -- <cmd>` / `node scripts/dx.mjs budget --ai` / `node scripts/dx.mjs selftest --ai`



