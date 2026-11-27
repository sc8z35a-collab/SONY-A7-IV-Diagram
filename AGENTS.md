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

## 1. 視覚確認・成果物検証には必ず高速専用キャプチャツール `pp` を使うこと（必須）
UI、3D CADモデル、図説（SVG）、解説ドロワー、スマホ画面表示（390×844）、Play Ground 1.1、品質ティア比較（`LITE` / `STD` / `HIGH` / `ULTRA`）の見た目やレイアウトを確認・監査する必要がある時は、**手動のブラウザ操作や独自スクリーンショットスクリプトを書かず、必ず専用の超高速画像キャプチャエンジン `pp` を使用すること**。

### `pp` クイックコマンド集（全6モード対応）
事前に `npm run build`（`docs/` 更新）を実行した上で以下を使用する：

```bash
# 1. 全6モード一括高速監査パック（welcome / ui / cad / diagram / explanation）
npm run pp -- --preset=audit --out=./captures

# 2. 単体モード指定（ui | cad | diagram | explanation | full | custom）
npm run pp -- --mode=cad --unit=welcome --quality=ultra --out=./captures
npm run pp -- --mode=ui --unit=integrated --quality=standard_lite --out=./captures
npm run pp -- --mode=diagram --unit=integrated --part=lens-front-xa --out=./captures
npm run pp -- --mode=explanation --unit=integrated --part=lens-front-xa --out=./captures
npm run pp -- --mode=full --unit=welcome --quality=high --explode=0.65 --out=./captures

# 3. スマホ画面（390×844, DPR 2）＆ 図説90°横向き全画面ライトボックス検証
npm run pp -- --preset=mobile --out=./captures
npm run pp -- --mode=diagram --mobile --lightbox --rotate --unit=integrated --out=./captures

# 4. Play Ground 1.1 ＆ PLYA全8ツール一括検証・1000点採点レポート検証
npm run pp -- --preset=playground --out=./captures

# 5. 超高速イテレーションモード（WebP q=90 + ユニット再利用パイプライン）
npm run pp -- --preset=audit --fast --out=./captures

# 6. カスタマイズモード＆JSONバッチ実行
npm run pp -- --mode=custom --custom='{"unit":"welcome","quality":"ultra","explode":0.7,"showCad":true,"showUi":false}' --out=./captures
npm run pp -- --batch=jobs.json --out=./captures --manifest
```

### `pp` 運用ルール
- 複数ショットを撮る時は単発実行を繰り返さず、`--modes=...` / `--preset=...` / `--batch=...` で **1つのウォームChromeセッション＆スマートグルーピング** を活用して最速化すること。
- リポジトリルート直下に一時キャプチャ画像を残してコミットしないこと（`--out=/tmp/pp_out` や専用アーティファクト領域へ出力すること）。

## 2. パーツカタログ・V2品質規約
- 並列パーツ追加・編集時は必ず `catalog/WORKER_RULE.md` を遵守すること。
- 完了前には `npm run catalog && npx tsc --noEmit && node scripts/validate_parts.mjs && npm run build` の全ゲート（10/10 PASS）を確認すること。
