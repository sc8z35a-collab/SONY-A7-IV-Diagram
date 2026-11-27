# Walkthrough — `bg` v1（PR #52）・`sp` `0.001 mm` 空間解析エンジン・ようこそ装置 `WLK-360`（+140 パーツ・最終統合マージ PR #57）完了報告

> [!IMPORTANT]
> - **Phase 0 マージ済 PR**: [PR #52](https://github.com/sc8z35a-collab/SONY-A7-IV-Diagram/pull/52)（`bg` v1 — `BG-RECEIPT:1d00a0b2:origin/feat/buchigire-guard-v1:default:b39c4f30`）
> - **Phase 1 & 2 最終統合マージ済 PR**: [PR #57](https://github.com/sc8z35a-collab/SONY-A7-IV-Diagram/pull/57)（`sp` + `WLK-360` + `registry.ts`/`catalog`/`docs` 統合）
> - **最終統合改ざん不能レシート**: `BG-RECEIPT:6d42c046:origin/feat/sp-engine-and-welcome-360:integrator:cd679427`

すべての承認済みフェーズ（**Phase 0: ぶち切れ対策ツール v1 `bg`**、**Phase 1: `0.001 mm` 空間マップ＆事前衝突シミュレーションエンジン `sp`**、**Phase 2: ようこそ装置 `WLK-220 → WLK-360`（+140 パーツ `W221`–`W360`）＆最新 `origin/main`（PR #53–#56: V3 LITE v2 / `dx` / MIRAI Wave 3）との完全最終統合・カタログ/ビルド更新・`pp` 視覚検証・`main` マージ**）を完了しました。

---

## Phase 0: ぶち切れ対策ツール v1（`bg` / Buchigire Guard v1）— `main` マージ済（PR #52）

クラウド VM 突然死・未プッシュ作業消失・コンテキスト圧縮による記憶喪失・未検証完了報告を構造的にゼロ化するため、**6 柱・36 防護機構・14 コマンド** の汎用ツールを構築し、先行して `main` へマージしました。

- **マージ済 PR**: [PR #52](https://github.com/sc8z35a-collab/SONY-A7-IV-Diagram/pull/52)（`origin/main` コミット `75d4cc2`）
- **発行レシート**: `BG-RECEIPT:1d00a0b2:origin/feat/buchigire-guard-v1:default:b39c4f30`
- **主要成果物**:
  - [.bgrc.json](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/.bgrc.json)（`worker` / `integrator` ポリシー定義）
  - [scripts/bg.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/bg.mjs) ＋ `scripts/buchigire_guard/` 6 モジュール（Git Plumbing、安全スキャナ、Tier 1 不可視リモート Vault `refs/bg-vault/*` ＋ `ls-remote` OID 裏取り、Gate/Receipt/Land、Renderers、20 件カオス `selftest`）
  - [scripts/BUCHIGIRE_GUARD_GUIDE.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/BUCHIGIRE_GUARD_GUIDE.md)（AI エージェント向け運用マニュアル）
  - [AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md) Section 0（5 鉄則の恒久ルール化）
- **検証結果**: `node scripts/bg.mjs selftest --ai` → **`20/20 PASS`**、実 GitHub `refs/bg-vault/*` 退避＆ `ls-remote` 裏取り確認済、ローカル `pre-commit` / `pre-push` フック稼働済。

---

## Phase 1: `sp` `0.001 mm` 自動空間マップ ＆ 事前衝突シミュレーションエンジン

### 作成・更新ファイル
- [scripts/sp.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/sp.mjs): 統合 10 モード CLI（`inspect` / `map` / `pockets` / `sim` / `audit` / `ray` / `thermal-cog` / `diff` / `bench` / `selftest`）＋決定論的終了コード（`0=PASS, 2=FAIL, 3=WARN, 1=ERROR`）
- [scripts/spatial_engine/exact_geometry.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/spatial_engine/exact_geometry.mjs): `Float64`（`EPS = 1e-9 mm`）厳密幾何カーネル（BVH、Möller＋共平面 2D SAT、13 軸三角形-箱交差、Ericson Voronoi 距離、一般化巻数、連続 SDF、発散定理体積）
- [scripts/spatial_engine/scene_extractor.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/spatial_engine/scene_extractor.mjs): 全 22 登録ユニット自動解決、`SPB3` コンテンツハッシュ・バイナリキャッシュ（`src/core/geometry_quality.ts` 変更時の自動キャッシュ無効化を含む）、光学/RF 視界コーンプリセット
- [scripts/spatial_engine/voxel_pockets.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/spatial_engine/voxel_pockets.mjs): `TRI-SAT` 自動多層マップ、`0.001 mm` SDF 拡大図、`--fit` / `--pack` ポケット探索、26 方向＋11 段階二分探索 `--auto-fix`
- [scripts/spatial_engine/audit_physics.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/spatial_engine/audit_physics.mjs): `sim` / `audit --all-tiers --explode-steps=8 --check-floating` / `ray` / `thermal-cog` / `diff` / 20 項目数学オラクル `selftest`
- [scripts/spatial_engine/renderers.mjs](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/spatial_engine/renderers.mjs): UTF-8/ASCII 空間マップ、`--ai` 省トークン出力、`--emit-ts`、`sp/v1` JSON、単一ファイル HTML5 ビューア
- [scripts/SPATIAL_SIM_GUIDE.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/SPATIAL_SIM_GUIDE.md) / [package.json](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/package.json) / [AGENTS.md](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md): マニュアル整備・`npm run sp` 登録・最新 `dx`（PR #54）共存統合

### `sp` 検証サマリー
- **`node scripts/sp.mjs selftest --ai`**: **`20/20 PASS`（`precision=0.001mm` / `132–203 ms`）**
- **`node scripts/sp.mjs bench --unit=welcome --ai`（360 パーツ ULTRA）**: Cold `2,861.5 ms` → Warm Cache **`455.3 ms`（6.28× 高速化）**、`sp map` キャッシュ読込 **`108.3 ms`**。

---

## Phase 2: ようこそ装置 `WLK-360`（`220 → 360` パーツ、+140 精密部品）＆ 最終統合

最新 `origin/main` の 4 大アップデート（**PR #53** STD LITE v2＋PG Hyper-Engine、**PR #54** `dx` Zero-Token パイプライン＋`pp --sheet --audit-metrics`、**PR #55** V3 超最適化・KINE カリング・ZERO-JAGGY ULTRA AA・F1.2 ボケ、**PR #56** `mirai_2028` Wave 3 FH20/FH17/FH48＝140p）を完全に統合した上で、`WLK-360` の全 140 パーツおよび共有統合ファイル・カタログ・本番ビルド（`docs/`）を完成させました。

### 1. 実装・統合ファイル一覧

| ファイル | 役割・内容 |
|---|---|
| [welcomeGlyphPrecisionParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeGlyphPrecisionParts.ts) | **Wave 0 文字精密化（+17 パーツ: `W221`–`W237`）＋共通ビルダー** — ジルコニア断熱スリーブ、FVMQ 上部応力緩和カラー、0402 NTC 温度診断小基板、IP68 ePTFE 呼吸ベント＋3A デシカント、C 型分割石英ダストブーツ＆同軸フェルール、タングステン銅カウンターウェイトほか |
| [welcomePlinthPrecisionParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomePlinthPrecisionParts.ts) | **Wave 0 光学ベンチ台座精密化（+28 パーツ: `W238`–`W265`）** — USB-C TVS 保護、LiFePO4 シャント、PMIC 低 ESR MLCC バンク、4 分割 Kapton® 絶縁バリア（中央ノックピン逃げ＆ポゴ開口対応）、TCXO/FRAM/QSPI/セキュアエレメント、光学エンコーダ円盤＆ルビーデテント、PEM スタンドオフほか |
| [welcomeGlyphUltraDetailParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeGlyphUltraDetailParts.ts) | **Wave A 文字超高精細（+16 パーツ: `W266`–`W281`）** — BeCu EMI 接地フィンガー、曲線追従 Alanod MIRO-SILVER® 98% PVD 銀エンドミラー、Schnorr® ロックワッシャ＆ヘリコイル、GORE® VE8 ベント、C 型分割石英光チョーク＆PTFE スリーブ、Hirose DF57 背面端子対、W80Cu20＋Sorbothane® TMD ダンパほか |
| [welcomePlinthUltraDetailParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomePlinthUltraDetailParts.ts) | **Wave A 光学ベンチ台座超高精細（+34 パーツ: `W282`–`W315`）** — ヒートパイプ定圧クランプ＆PTM7950 TIM、軸方向スーパーキャパシタ保持バンク、ToF/照度光学フレーム、USB-C E-Marker/リリーフ/防塵キャップ、SMA 金メッキ RF 隔壁端子、Kensington スロット、底部 CLD 制振層・HIC 湿度カード・ISO17025 QR 銘板ほか |
| [welcomeGlyphMetrologyParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeGlyphMetrologyParts.ts) | **Wave B 文字計量・信頼性（+20 パーツ: `W316`–`W335`）** — 溶融石英 3.47% フレネル帰還プリズム、Turcite® B 耐摩耗ストリップ＆真鍮逆挿防止キー、BeCu ウェーブ保持ばね、光学アンチニュートンリング（`W325`）、曲線追従エンドミラー（`W328` / `W332`）、Z 字積層銅サーマルシャント、540 Hz 2 次曲げ先端 TMD（`W335`）ほか |
| [welcomePlinthInstrumentationParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomePlinthInstrumentationParts.ts) | **Wave B 光学ベンチ計測・サービス（+25 パーツ: `W336`–`W360`）** — 精密気泡管水準器（`W336`）、レーザー刻印インバー尺（`W337`）、合成ルビー CMM 基準球 3 点ネスト（`W338`）、NFC チタン／シナバーハロー（`W340`）、背面診断ライトパイプ＆シリアル銘板、底部保守ハッチ（`W352`）・展開キックスタンド（`W353`）・蓄光ダイヤルリング（`W357`）ほか |
| [welcome.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/units/welcome.ts) / [welcome.json](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/data/welcome.json) | 全 7 ビルダー結線・`360` パーツ（`よ` 57 + `う` 56 + `こ` 56 + `そ` 56 + `光学ベンチ台座` 135 = **360 パーツ**、`version: "3.5.0"`、`declaredPartCount: 360`）完全同期 |
| [registry.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/units/registry.ts) / [ZeroTextControls.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts) / [welcomeHdSchematics.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/welcomeHdSchematics.ts) | `welcome.declaredPartCount: 360`、`360パーツ実動作CNC光学装置` ラベル、`WLK-08` 光学ベンチマスター系統図の 360p 内訳更新（`mirai_2028: 140p` とも完全共存） |
| `catalog/**` / `src/playground/playground_index.json` / `docs/**` | `npm run catalog && npm run build` により全 22 ユニット（`2,734` 固有 ID）の L0/L1/L2 カタログ・Code Atlas（7 TSV）・Play Ground インデックス・本番 `docs/` を完全再生成 |

---

### 2. `0.001 mm` 空間解析 ＆ V3 LITE v2 全品質ティア検証結果

#### 2.1 コールドキャッシュ全 4 ティア横断 `sp audit --all-tiers --explode-steps=8 --check-floating`
新規追加 **140 パーツ（`W221`–`W360`）** すべてに対し、V3 `LITE v2`（`minRadialSegments: 4`）を含む全 4 品質ティアで静止干渉・8 段階爆発軌道貫通・浮遊の完全ゼロを達成しました。

| 品質ティア | 総パーツ | 三角形数（`sp` 実測） | 新規静止衝突 (`W221`–`W360`) | 新規爆発貫通 (8 steps) | 新規浮遊 | 判定 |
|---|---:|---:|---:|---:|---:|---|
| `standard_lite` (V3 LITE v2) | 360 | 34,312 | **0** | **0** | **0** | **PASS** |
| `standard` | 360 | 69,357 | **0** | **0** | **0** | **PASS** |
| `high` | 360 | 130,548 | **0** | **0** | **0** | **PASS** |
| `ultra` | 360 | 201,565 | **0** | **0** | **0** | **PASS** |

> [!TIP]
> PR #55 の `LITE v2`（`minRadialSegments: 4`）統合後のコールドキャッシュ再監査で、`W357`（蓄光ダイヤルリング）の 4 角形弦落ちによる `W217` ダイヤル接触（`0.5196 mm`）を自動検出し、`Math.max(12, qRadialSegs(24, 12))` 固定により全ティア完全無干渉へ収束させました。また `scene_extractor.mjs` の `SPB3` ハッシュ対象へ `src/core/geometry_quality.ts` を追加し、今後のテッセレーション変更時も自動キャッシュ無効化されるよう強化しました。

#### 2.2 光学・RF 視界コーン / 重心・転倒角 / 差分（`sp ray`, `sp thermal-cog`, `sp diff`）
- **`sp ray`**:
  - VL53L5CX ToF 63°（149 rays）: **`0% occluded` PASS**
  - VEML7700 Ambient Lux ±45°（107 rays）: **`0% occluded` PASS**
  - Wi-Fi 6 / BLE Rear Radome 100°（107 rays）: **`0% occluded` PASS**
- **`sp thermal-cog`**: **PASS** — 質量 **`356.64 g`**（体積 `98.706 cm³`）、世界重心 **`(+0.481, -8.493, +0.046) mm`**、最小転倒角 **`38.169°`**（220p の `37.898°` からさらに安定化）。
- **`sp diff`（`220p → 360p`）**: `Δparts = +140`, `Δtris = +26,243`, `Δmass = +7.457 g`, `Δvol = +1.603 cm³`, `ΔCoG = (-0.037, -0.088, -0.058) mm`。

#### 2.3 全 22 ユニット V2/V3 ゲート ＆ `dx` 健全性
- **`node scripts/validate_parts.mjs`（全 22 ユニット横断）**: **ALL CHECKS PASSED（10/10 checks, 0 failures）**
  - `welcome`: `LITE: 2dc / 31,940 tris | STD: 50dc / 49,484 tris | HIGH: 50dc / 76,456 tris | ULTRA: 50dc / 202,642 tris | Refs: 0`
  - ライブ V3 Perf HUD（ULTRA 実測）: **`51 / 100 Draw Calls`**、`202,268 Triangles`、`22 Inst(1820) · 27 Batch(644)`、`Parts (JSON=3D): 360 / 360`、`KINE Culling: ON`、Frame Time `avg 7.57 ms`。
- **`node scripts/dx.mjs preflight --unit=welcome --policy=integrator --ai`**: **`8/8 PASS` (`316 ms`)**
- **`node scripts/dx.mjs budget --ai`**: **`SCORE=100/100 (Grade S), alarms=0`**

---

### 3. `pp` 視覚キャプチャ監査（`docs/` 対象・初回 9 ショット＋詳細 5 ショット＋外観改善後 4 ショット）

初回および側面クローズアップ監査で発見した 3 点の視覚的微調整（① `W222` の前面突出を上部ステム沿いの極薄黒色カラーへ密着整形、② `W318` ばねリテーナを横棒ベゼルへ 0.05 mm 密着配置、③ `W325` アンチニュートンマスクを半透明極細リングへ洗練＆背面 Schnorr/TMD スタックを 0.4 mm 縮小密着）を実施し、再度 4 ティア `sp audit` `0/0/0` ＋ `docs/` 再ビルド ＋ `pp` 撮影で完全解消を確認しました。

````carousel
![ULTRA 等角フルビュー＆ライブ V3 Perf HUD（360/360パーツ・51 Draw Calls・KINE ON）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/ea483248-b818-42af-b225-1d8a257a8eea/w360_ultra_iso_full.webp)
<!-- slide -->
![ULTRA 背面ビュー（曲線追従エンドミラー・精密放熱フィン・SMA/接地ラグ・診断ライトパイプ・シリアル銘板）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/ea483248-b818-42af-b225-1d8a257a8eea/w360_ultra_back_cad.webp)
<!-- slide -->
![ULTRA 側面ビュー（突出・浮遊ゼロの完全密着 Z 軸積層シルエット）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/ea483248-b818-42af-b225-1d8a257a8eea/w360_ultra_side_cad.webp)
<!-- slide -->
![ULTRA 全360パーツ分解ビュー（explode=0.72・無干渉層別展開）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/ea483248-b818-42af-b225-1d8a257a8eea/w360_ultra_exploded.webp)
<!-- slide -->
![WLK-360 光学ベンチ基準定盤＆全360パーツ実動作システム系統図（W338 選択時）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/ea483248-b818-42af-b225-1d8a257a8eea/w360_diagram_w338_plinth.webp)
<!-- slide -->
![新規追加パーツ解説ドロワー検証（W335 上部Z字片持ち先端 TMD・数式＆技術解説）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/ea483248-b818-42af-b225-1d8a257a8eea/w360_explanation_w335_tmd.webp)
````
