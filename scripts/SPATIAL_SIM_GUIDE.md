# `sp` — `0.001 mm` 自動空間マップ ＆ 事前衝突シミュレーションエンジン実践ガイド

> **実行コマンド**: `npm run sp -- <mode> [options]`（実装: [scripts/sp.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/sp.mjs) / `scripts/spatial_engine/*.mjs`）
> **精度保証**: `Float64`（`EPS = 1e-9 mm`）・`0.001 mm` 厳密三角形交差＋一般化巻数内包＋13 軸 TRI-SAT＋連続 SDF・全 22 登録ユニット対応・`SPB3` 高速バイナリキャッシュ（`/tmp/sp_cache`）

## 1. AI エージェント推奨 7 ステップ空間配置ワークフロー
1. `npm run sp -- selftest` で 20 項目数学オラクル（`0.001 mm`）を検証。
2. `npm run sp -- inspect --unit=<U> --ai` でグループ原点・パーツ数・総三角形数を把握。
3. `npm run sp -- map --unit=<U> --group=<G> --frame=local --res=0.5` で空き領域を俯瞰。
4. `npm run sp -- pockets --unit=<U> --group=<G> --fit=W,H,D --inside=<chassisId> --emit-ts` で `0.001 mm` 認証済の最大余裕座標を取得。
5. 候補 JSON を `npm run sp -- sim --unit=<U> --candidates=/tmp/cands.json --auto-fix --ray=welcome-tof,welcome-lux,welcome-rf` で事前衝突＋視界コーン検査。
6. 実装後に `npm run sp -- audit --unit=<U> --all-tiers --explode-steps=8 --check-floating --ai` で全 4 品質ティア（`LITE`/`STD`/`HIGH`/`ULTRA`）の静止干渉・弦落ち干渉・爆発貫通・浮遊を一括検証。
7. `npm run sp -- thermal-cog --unit=<U> --ai` および `npm run sp -- diff --unit=<U> --from-snapshot=/tmp/base.json` で重心・転倒角・質量差分を確認。

## 2. 全 10 モード早見表 ＆ 記号読解
| モード | 用途 | 主なオプション |
|---|---|---|
| `inspect` | ユニット・グループ構成確認 | `--unit=U`, `--list-units` |
| `map` | TRI-SAT 自動多層図 / `0.001 mm` SDF 拡大図 | `--zoom=x0..x1,y0..y1,z0..z1 --res=0.25 [--sdf] [--html=/tmp/m.html]` |
| `pockets` | 空きポケット自動探索＋TS コード生成 | `--fit=W,H,D --inside=ID --emit-ts` |
| `sim` | 候補配置の事前衝突・視界検証＋自動回避 | `--candidates=FILE --auto-fix --ray=welcome-tof` |
| `audit` | 全サブメッシュ厳密三角形・爆発・浮遊監査 | `--all-tiers --explode-steps=8 --check-floating` |
| `ray` | 光学 ToF / 照度 / RF 視界コーン遮蔽率検査 | `--preset=welcome-tof,welcome-lux,welcome-rf` |
| `thermal-cog` | 質量・体積・世界重心・4 方向転倒角・熱距離 | `--unit=U --ai` |
| `diff` | スナップショット保存・増量前後比較 | `--save-snapshot=PATH` / `--from-snapshot=PATH` |
| `bench` | Cold / Warm キャッシュ＆監査速度計測 | `--unit=U --quality=ultra` |
| `selftest` | 20 項目数学オラクル自己証明 | `--ai` / `--json` |

### 空間マップ記号の読み取り方
- **TRI-SAT モード**: `.` = 空き（FREE）、`░` = 1 パーツ、`▒` = 2 パーツ、`▓` = 3+ 密集、`★` = 無干渉候補、`✕` = 衝突
- **EXACT-SDF モード（`--sdf`）**: `#` = ソリッド内部（≤0 mm）、`!` = `<0.2 mm`、`:` = `<0.5 mm`、`·` = `<1.0 mm`、空白 = `≥1.0 mm`
- **終了コード**: `0=PASS`、`1=ERROR`、`2=FAIL（衝突・遮蔽あり）`、`3=WARN`
