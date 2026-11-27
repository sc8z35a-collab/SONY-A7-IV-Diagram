# AI Agent Workspace Directives — SONY-A7-IV-Diagram

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
