# WORKER_RULE (並列作業規約)

## 1. 読込順（コンテキスト節約）
1. `catalog/INDEX.tsv`(L0): `slug_prefix`・`next_code`確認。
2. `catalog/names/<mode>.txt`(L1): 既存把握（横断は `ALL_NAMES.txt`）。
3. `catalog/spatial/<mode>.tsv`(L2): `id`/`pos`/`size`/`exp`/`mat`で干渉回避。
* 巨大JSON丸読み禁止。書式確認は先頭/末尾20行のみ。

## 2. 並列衝突防止（厳守）
* **既存詳細化**: 担当 `src/units/<mode>.ts`・`src/data/<mode>.json`・`src/assemblies/<mode>/*`(新規分割推奨)のみ編集可。共有(`registry.ts`/`types.ts`/`src/core/*`/`integrated.json`/`camera_body.json`/UI/`catalog/*`)編集禁止。微細増量は原則 `standaloneOnly:true`、既存 `diagramType`・`mats.*` 再利用。
* **新規フェーズ**: 新規ファイルのみ作成。未登録ID型不一致は `// TODO: wire mode` 暫定キャスト。

## 3. V2品質＆検証 (`pp1.1` / `sokutei`)
* `id`=`slug_prefix`+一意kebab、番号=`next_code`連番、JSON数=3D数。
* `ResourceCache`38バケット(`new THREE.Mesh*Material`0)・`InstancedMesh`/`BatchedMesh`・`matrixAutoUpdate=false`・0GC・Solid **100dc以下**・完全解放。
* **視覚確認は `pp1.1` (`npm run pp -- --warm ...`)、性能測定は `sokutei` (`npm run sokutei`) を使用**（詳細 `AGENTS.md`）。

## 4. 完了条件
* `npx tsc --noEmit` 0エラー確認後、追加数・コード範囲・主要部位を報告終了。
