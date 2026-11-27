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

## 1. 視覚確認・成果物検証には必ず超高速 6-DoF キャプチャツール `pp1.1` を使うこと（必須）
UI、3D CADモデル、図説（SVG）、解説ドロワー、スマホ画面表示（390×844）、Play Ground 1.1、品質ティア比較（`LITE` / `STD` / `HIGH` / `ULTRA`）、断面カット、パーツ単体拡大検証を行う際は、**手動ブラウザ操作や独自スクショスクリプトを書かず、必ず `pp1.1` を使用すること**（AI専用詳細マニュアル: `scripts/PP1_1_MANUAL.md`）。

### `pp1.1` クイックコマンド集（全6モード + 自由自在 6-DoF カメラワーク + 永続ウォームデーモン）
事前に `npm run build`（`docs/` 更新）を実行した上で使用する（連続撮影時は `--warm` 推奨、完了時に `--daemon=stop`）：

```bash
# 1. 全6モード一括高速監査パック（ウォームデーモンで超高速・品質100%無劣化）
npm run pp -- --warm --preset=audit --out=/tmp/pp_out

# 2. 単体モード指定（ui | cad | diagram | explanation | full | custom）
npm run pp -- --warm --mode=cad --unit=welcome --quality=ultra --out=/tmp/pp_out
npm run pp -- --warm --mode=ui --unit=integrated --quality=standard_lite --out=/tmp/pp_out
npm run pp -- --warm --mode=diagram --unit=integrated --part=lens-front-xa --out=/tmp/pp_out
npm run pp -- --warm --mode=explanation --unit=integrated --part=lens-front-xa --out=/tmp/pp_out

# 3. 自由自在 6-DoF / 球面カメラ・自動パーツフィット・断面カット・2×SSAA・コールアウト注釈
npm run pp -- --warm --mode=cad --unit=evf --quality=ultra --az=35 --el=22 --fov=24 --section=x:0.52 --ssaa=2 --annotate=8 --out=/tmp/pp_out
npm run pp -- --warm --mode=cad --unit=welcome --quality=high --fit-part=welcome-yo-cnc-chassis --ortho-pack --contact-sheet=3 --out=/tmp/pp_out
npm run pp -- --warm --mode=cad --unit=lens --quality=high --turntable=8 --contact-sheet=4 --out=/tmp/pp_out

# 4. スマホ（390×844 DPR 2）・Play Ground 1.1・品質完全一致証明（--diff SSIM/PSNR/RMSE）
npm run pp -- --warm --preset=mobile --out=/tmp/pp_out
npm run pp -- --warm --preset=playground --out=/tmp/pp_out
npm run pp -- --warm --preset=audit --diff=/tmp/pp_before_ref --json --out=/tmp/pp_diff

# 5. 高速イテレーション（WebP q=90）＆ 0-Chrome ユニット/パーツID検索 ＆ デーモン停止
npm run pp -- --warm --preset=audit --fast --out=/tmp/pp_fast
npm run pp -- --list-units --json
npm run pp -- --daemon=stop
```

### `pp1.1` 運用ルール
- 複数ショットは `--warm` と `--preset` / `--modes` / `--ortho-pack` / `--turntable` / `--batch` で一括実行し、終了時に必ず `npm run pp -- --daemon=stop` を実行すること。
- リポジトリルート直下に一時キャプチャ画像を残してコミットしないこと（必ず `--out=/tmp/...` や専用アーティファクト領域へ出力すること）。

## 2. 処理負荷・処理速度のベンチマーク測定には必ず `sokutei` を使うこと（必須）
ビルド、V2 3D エンジン、実ブラウザ WebGL、キャプチャ (`pp1.1`)、CI 検証、カタログ生成、MIRAI コンパイラ、WLK-220 DFM、アプリ内光学/工学シミュレータ、`bg v1` の**全10領域（55+項目）の速度・負荷（Wall/p50/p95/95%CI/CV%/CPU%/Peak RSS/GPU Frame/JSHeap）**を統計的に自動測定する時は、必ず **`sokutei`** を使用すること（AI専用詳細マニュアル: `scripts/SOKUTEI_MANUAL.md`）。

```bash
# 1. ワンコマンド全10領域自動測定（全項目）
npm run sokutei

# 2. カスタム領域・ユニット・ティア・任意コマンド指定測定
npm run sokutei -- --list
npm run sokutei -- --target=v2_unit,sim_app,pp --runs=2 --warmup=1 --json
npm run sokutei -- --target=v2_unit --units=welcome,evf --tiers=high,ultra --runs=3
npm run sokutei -- --cmd="node scripts/validate_parts.mjs --full" --runs=2 --warmup=1

# 3. Before / After 統計比較・スピードアップ検証ゲート
npm run sokutei -- --all --save-baseline=/tmp/sokutei_before.json
npm run sokutei -- --all --compare=/tmp/sokutei_before.json --assert-speedup=6.0 --out=/tmp/sokutei_after.json --md=/tmp/sokutei_after.md
```

## 3. 空間マップ生成・事前衝突シミュレーションには必ず `sp` を使うこと（必須）
パーツ追加・配置調整・4 品質ティア横断干渉検査・爆発軌道貫通検査・光学/RF 視界コーン検証には、独自スクリプトを書かず **`0.001 mm` 厳密空間解析エンジン `sp`** を使用すること（詳細: `scripts/SPATIAL_SIM_GUIDE.md`）：
```bash
npm run sp -- selftest
npm run sp -- map --unit=welcome --group=optical_plinth --frame=local --res=0.5
npm run sp -- audit --unit=welcome --all-tiers --explode-steps=8 --check-floating --ai
npm run sp -- ray --unit=welcome --preset=welcome-tof,welcome-lux,welcome-rf --ai
npm run sp -- thermal-cog --unit=welcome --ai
```

## 4. パーツカタログ・V2品質規約
- 並列パーツ追加・編集時は必ず `catalog/WORKER_RULE.md`（1.5 kB 以内厳守）を遵守すること。
- 完了前には `npm run catalog && npx tsc --noEmit && node scripts/validate_parts.mjs && npm run build` の全ゲート（10/10 PASS）を確認すること。

## 5. Zero-Token 開発パイプライン（`dx`）
巨大 JSON・`docs/`・`types.ts`・冗長 CLI ログによるトークン浪費を防ぐため、探索・読込・DSL 生成・事前検証は **`node scripts/dx.mjs`**（直接実行で `npm notice` もゼロ化）を優先使用すること：
- **文脈構築・横断検索**: `node scripts/dx.mjs brief --unit=<mode> --policy=worker` / `node scripts/dx.mjs find "<query>"` / `node scripts/dx.mjs resume`
- **外科的読込・バッチ**: `node scripts/dx.mjs read <file>#<Symbol> | --head <file> | --part=<id> | --schematic=<type> | --css="<sel>"` / `node scripts/dx.mjs tx --ops='...'`
- **3大 Micro-DSL コンパイラ（デフォルト `--dry-run`、`--apply` で書込）**: `dx part upsert` / `dx cad compile` / `dx svg compile`
- **瞬間検証・差分ゲート・視覚プリジャッジ**: `node scripts/dx.mjs preflight --unit=<mode> --ai` / `node scripts/dx.mjs check --changed --ai` / `node scripts/pp.mjs --preset=audit --fast --sheet --audit-metrics --ai --out=/tmp/pp_out`
- **圧縮出力ラッパ・自己監査**: `node scripts/dx.mjs run -- <cmd>` / `node scripts/dx.mjs budget --ai` / `node scripts/dx.mjs selftest --ai`

