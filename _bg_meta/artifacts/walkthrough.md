# 完了ウォークスルー: 左上ボタン無反応・フリーズ根絶 / 実在バグ 70 件修正 / 「ようこそ (`welcome`)」0.001 mm 100% 完璧化

## 1. 総合達成サマリ

承認済み計画書（[implementation_plan.md](file:///home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/implementation_plan.md)）の全 68 件に加え、最終実ブラウザ E2E 検証で検出した追加の 2 件（**BUG-69**: ビルド中断時オーバーレイ未解放 VRAM リーク / **BUG-70**: Play Ground 共有レンダラーの VRAM ベースライン誤差）を含む **計 70 件の実在バグを重大度順に全件修正** し、**「ようこそ (`welcome`)」全 435 パーツを全 4 品質ティアにおいて 0.001 mm 完全無干渉・爆発無衝突・浮遊/突出ゼロの 100% 完璧状態** へ仕上げました。

| 検証項目 | 修正前（実測） | 修正後（実測） | 判定 |
|---|---|---|---|
| **左上パレット起動・応答速度** | 最大 **> 9,000 ms 完全フリーズ** (`CDP TIMEOUT`) | **`35.1 ms`**（ポータル固定配置・即応） | **PASS** |
| **横向きスマホ (844×390) パレット選択** | 40px 枠内に完全クリップ (`itemActuallyClickable: false`) | `popoverH: 333px`・**`itemActuallyClickable: true`** | **PASS** |
| **縦向きスマホ (390×844) 左上 4 ボタン** | 2 行折り返し（トップバー高 121px 肥大） | **1 行収容**（`minTop=7, maxTop=8`） | **PASS** |
| **連続 10 ユニット切替＋モーダル排他＋Esc** | VRAM リーク警告 **22 回連続**・モーダル重なり固着 | **10/10 PASS**・コンソール/ページエラー **0**・VRAM リーク **0** | **PASS** |
| **`welcome` 全 4 ティア 0.001 mm 空間監査** | 干渉 **1,037〜1,087 件** / SMT **10** / 爆発衝突 **70** | **全 4 ティア 干渉 0 / SMT 0 / kiss 0 / 浮遊 0 / 爆発衝突 0** | **PASS** |
| **`welcome` 光学/RF 視界コーン (`sp ray`)** | 3 コーン検証 | **ToF 63° / Lux 90° / RF 100° 全 3/3 PASS (0% 遮蔽)** | **PASS** |
| **`welcome` 熱・重心・転倒安定性 (`sp thermal-cog`)** | 転倒角 `38.247°` / 最小熱離隔 `0.287 mm` | **`52.239°`** (+14.0°) / 最小熱離隔 **`0.560 mm`** (約 2 倍) | **PASS** |
| **`welcome` 目視外観・突出/浮遊検査 (`pp1.1`)** | 浮遊プリズム枠・突出ミラー・分離ハネ・浮遊爪・リング突出 | **10 系統の視覚的不具合を全数回収・突出 0 件** | **PASS** |
| **公式 CI 全ゲート (`catalog` + `tsc` + `validate_parts` + `build`)** | — | **10/10 PASS / tsc 0 errors / 23 ユニット 0 リーク** | **PASS** |

---

## 2. 左上ボタン無反応・フリーズ根絶 & 実在バグ 70 件修正一覧

### S0: 致命的 — 左上ボタン無反応・ブラウザ完全フリーズ・無限ループ（14 件）

- **BUG-01** ([ZeroTextControls.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts), [main.css](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/styles/main.css)): `.assembly-palette-popover` を `#app` 直下の `position: fixed` ポータル（`z-index: 70`）へ分離し、トリガー矩形から動的位置計算することで、横向き/低身長（`844×390`）での `overflow-x: auto` クリップを完全解消。
- **BUG-02** ([main.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/main.ts)): `window` の `pointerdown` capture で発火していた強制自動フルスクリーン (`ensureAutoFullscreenOnTap`) を撤廃し、左上ボタン押下時の `click` 消滅・リサイズ連鎖を根絶（フルスクリーンは `F` キー等の明示操作のみ）。
- **BUG-03** ([unit_v2_runtime.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/unit_v2_runtime.ts)): `ULTRA` 切替時はまず `ULTRA` 本体をフレーム分割ビルドして即描画・即操作可能にし、`STD LITE` / `FAST` モーションプロキシは描画後のアイドル時間へキャンセル可能なバックグラウンド構築へ分離。9 秒超フリーズを完全解消。
- **BUG-04** ([FastCadGeometry.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/FastCadGeometry.ts)): `nextCap < needed` 成長ループに `65535` 上限脱出ガードを導入し無限ループを防止。
- **BUG-05** ([unit_v2_runtime.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/unit_v2_runtime.ts)): `gl.getError()` 排出ループに最大 32 回＆`isContextLost()` ガードを追加。
- **BUG-06** ([v2_unit_compiler.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/v2_unit_compiler.ts), [FastCadGeometry.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/FastCadGeometry.ts)): 2 の冪成長ループの 32bit 左シフト超過・`NaN` 無限ループを乗算＋`1 << 28` 上限で根絶。
- **BUG-07** ([FastCadGeometry.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/FastCadGeometry.ts), [v2_unit_compiler.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/v2_unit_compiler.ts)): 全 7 箇所のオープンアドレスハッシュ `while (true)` にテーブルサイズ上限プローブガードを導入。
- **BUG-08** ([main.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/main.ts), [ExplanationDrawer.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ExplanationDrawer.ts)): 遅延 `import()` Promise キャッシュ全 5 箇所に `.catch()` 自己リセットを追加し一時失敗後の永久無反応を根絶。
- **BUG-09** ([CadViewport.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/CadViewport.ts)): `setMode()` が未完了/失敗状態では同一モード再選択を許可するよう修正。
- **BUG-10** ([unit_v2_runtime.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/unit_v2_runtime.ts)): `inflightActivation` / `inflightProxyBuild` の直列終了待機を導入し、連打切替時の 203 参照リークと GPU 競合を根絶。
- **BUG-11 / BUG-12** ([main.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/main.ts)): `closeOtherOverlays(except)` 相互排他と `playgroundOpening` 二重起動防止ロックを導入。
- **BUG-13** ([MiraiLibraryStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/MiraiLibraryStudio.ts)): `openSeq` キャンセルトークンで非同期ロード中 `close()` 時の DOM 復活・`null` 例外を防止。
- **BUG-14** ([CadPlaygroundStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/CadPlaygroundStudio.ts)): `openSessionToken` による全 `await` 境界でのキャンセル検証を徹底。

### S1: 重大 — 空間干渉・GPU/メモリリーク・境界破壊・セキュリティ（22 件: BUG-15〜34 + BUG-69, 70）

- **BUG-15〜17** (`src/assemblies/welcome/*`): 「ようこそ (`welcome`)」全 435 パーツの 0.001 mm 完全無干渉・爆発無衝突・視覚的突出/浮遊ゼロ化（詳細は第 3 節）。
- **BUG-18 / BUG-19** ([CadViewport.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/CadViewport.ts)): `miraiSubView` 上限を `5 → 8` (`MIRAI_SUBVIEW_MAX = 8`) へ修正、および `welcome` 専用断面範囲（X:`[-96, 96]`, Y:`[-24, 28]`）を追加。
- **BUG-20 / BUG-21** ([raycast_engine.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/raycast_engine.ts), [kine_culling_engine.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/kine_culling_engine.ts)): 固定長 128 BVH スタックの境界チェックと安全フォールバックを導入。
- **BUG-22** ([FastCadGeometry.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/FastCadGeometry.ts)): `Uint16` 頂点溶接ページの 65535 折り返し防止ガードを追加。
- **BUG-23 / BUG-59** ([unit_v2_runtime.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/unit_v2_runtime.ts), [ZeroTextControls.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts)): `registry` 登録パーツ数の即時表示＋`.is-loading` 状態通知を実装。
- **BUG-24〜26 / BUG-29** ([CadPlaygroundStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/CadPlaygroundStudio.ts)): `historyBusy` Undo/Redo 直列ロック、JSON Import 厳密サニタイザ（件数上限・有限数クランプ・一意 `uid`）、`escapeHtml()` による XSS 対策、`toastTimer` と `overlayLines.material` 確実解放。
- **BUG-27** ([ZeroTextControls.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts), [LensOpticsStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/LensOpticsStudio.ts)): 動的 `innerHTML` 補間の全数エスケープ／安全 DOM 構築化。
- **BUG-28 / BUG-33** ([CadViewport.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/CadViewport.ts)): `dispose()` での 6 種ポインタ/ホイール/タッチリスナー全解除、`scroll` 時 `cachedDomRect` 無効化と押下時最新矩形取得。
- **BUG-30 / BUG-31** ([unit_v2_runtime.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/unit_v2_runtime.ts), [ultra_post_pipeline.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/ultra_post_pipeline.ts)): `readPixels` / `renderUltraStationary` への `try ... finally` 復帰保証（`setRenderTarget` / `clearViewOffset`）。
- **BUG-32 / BUG-34** ([dispose.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/dispose.ts), [main.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/main.ts)): 汎用 `[Unit V2 VRAM Leak Detector]` ラベル統一、および `#app`/`#viewport` 明示検証。
- **BUG-69（追加発見・修正）** ([v2_unit_compiler.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/v2_unit_compiler.ts)): `CompiledV2Unit.build()` の Step 6 前にビルド中断が発生した場合に未採用の `rawBuild.overlayGroup` / `rawBuild.explodeGuides` がリークする欠陥を、全 6 中断経路へ `disposeUnadoptedOverlays()` を追加して完全解消。
- **BUG-70（追加発見・修正）** ([dispose.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/dispose.ts), [unit_v2_runtime.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/unit_v2_runtime.ts), [CadViewport.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/CadViewport.ts)): Play Ground が共有 `WebGLRenderer` 上に保持するワークスペース用 GPU リソース差分を `setCustomSceneRenderer()` 終了時に `adjustExternalVramBaseline()` で正確計上し、後続ユニット切替時の誤検知 VRAM リーク警告を完全解消。

### S2〜S3: UI 競合・キーボード暴発・数値境界・CSS/PWA・統計バグ（34 件: BUG-35〜68）

- **BUG-35 / BUG-36** ([main.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/main.ts), [ExplanationDrawer.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ExplanationDrawer.ts), [ZeroTextControls.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts)): 入力要素フォーカス時のショートカット除外、および `Escape` の最前面 1 層単独クローズ化。
- **BUG-37 / BUG-38 / BUG-57 / BUG-58** ([main.css](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/styles/main.css)): 390px 縦スマホでの左上 4 ボタン 1 行収容、`z-index` 階層整理（drawer 30 < topbar 34 < palette 70）、重複トップレベル CSS セレクタ全組統合、`#app.is-zen-fullscreen` の現行 HUD セレクタ同期。
- **BUG-39〜42 / BUG-60〜62** ([ExplanationDrawer.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ExplanationDrawer.ts), [LensOpticsStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/LensOpticsStudio.ts), [MiraiLibraryStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/MiraiLibraryStudio.ts), [OriginalBlueprintStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/OriginalBlueprintStudio.ts), [ZeroTextControls.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts)): リスナー/タイマー/rAF の完全追跡と `dispose()`、`aria-hidden` 同期、スライダー `Number.isFinite` 保護。
- **BUG-43 / BUG-44** ([lensOpticalSim.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/lens/lensOpticalSim.ts)): `dt <= 0` ゼロ除算防止および Secant 法発散クランプ。
- **BUG-45 / BUG-46 / BUG-66 / BUG-67** ([CadPlaygroundStudio.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/CadPlaygroundStudio.ts), [PartGeometryExtractor.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/PartGeometryExtractor.ts), [CameraEngineeringGrader.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/CameraEngineeringGrader.ts), [PlyaVerificationPipeline.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/PlyaVerificationPipeline.ts)): ダウンロード `URL.revokeObjectURL` 1500ms 遅延化、プリベイク失敗ログ、正規化・SPICE ネットリストのゼロ除算・空ワークスペース保護。
- **BUG-47〜54 / BUG-63〜65 / BUG-68** ([unit_v2_runtime.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/unit_v2_runtime.ts), [CadViewport.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/CadViewport.ts), [capture_bridge.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/capture_bridge.ts), [fast_proxy_builder.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/fast_proxy_builder.ts), [resource_cache.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/resource_cache.ts), [GpuOptimizer.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/engine/GpuOptimizer.ts), [perf_hud.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/perf_hud.ts), [main.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/main.ts)): 品質切替トークン・進行中 `subView`/`sectionActive` 反映、未処理 Promise 保護、タブ非表示時 `rAF` 停止、`gpuExplodeTex` 独立解放、2D canvas フォールバック、`texturesOptimized` 計数修正、HUD `NaN` 防止、撮影前モーダル自動閉鎖。
- **BUG-55 / BUG-56** ([index.html](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/index.html), [manifest.webmanifest](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/public/manifest.webmanifest)): 現行 23 ユニット構成へのタイトル・マニフェスト更新およびズームアクセシビリティ制限解除。

---

## 3. 「ようこそ (`welcome`)」全 435 パーツ 0.001 mm 100% 完璧化

### 3.1 `sp` 厳密幾何監査ビフォー／アフター（全 4 品質ティア）

`npm run sp -- selftest --ai`（**20/20 PASS, `precision=0.001mm`**）および `npm run sp -- audit --unit=welcome --all-tiers --explode-steps=8 --check-floating --ai` の実測結果：

| 品質ティア | パーツ数 | 三角形数 | ソリッド干渉 (Before → After) | SMT 着座異常 | 接触/kiss | 浮遊部品 | 爆発軌道衝突 | 総合判定 |
|---|---|---|---|---|---|---|---|---|
| `standard_lite` | 435 | 44,260 | 1,037 → **0** | 9 → **0** | 22 → **0** | **0** | 68 → **0** | **PASS (exit 0)** |
| `standard` | 435 | 86,223 | 1,058 → **0** | 10 → **0** | 35 → **0** | **0** | 70 → **0** | **PASS (exit 0)** |
| `high` | 435 | 148,878 | 1,087 → **0** | 10 → **0** | 45 → **0** | **0** | 61 → **0** | **PASS (exit 0)** |
| `ultra` | 435 | 214,599 | 1,087 → **0** | 10 → **0** | 59 → **0** | **0** | 61 → **0** | **PASS (exit 0)** |

- **光学/RF 視界コーン (`sp ray`)**:
  - `WLK VL53L5CX ToF 63°` (`149 rays`): **occluded = 0 (0%) PASS**
  - `WLK Ambient Lux VEML7700 ±45°` (`107 rays`): **occluded = 0 (0%) PASS**
  - `WLK Wi-Fi 6 / BLE Rear Radome 100°` (`107 rays`): **occluded = 0 (0%) PASS**
- **熱・重心・転倒解析 (`sp thermal-cog`)**:
  - `VERDICT=PASS | mass=154.032g | CoG_WORLD=(-1.21, -15.304, -0.354)mm | minTip=52.239°`（修正前 `38.247°` から大幅改善）
  - 最小熱離隔：`0.287 mm → 0.560 mm`
  - ゴム足底面 (`Y = -25.10 mm`) より下への突出：**0 件**、右端キャップ (`X_max = 96.95 mm`) からの突出：**0 件**

### 3.2 主な空間・構造・外観完璧化の修正内容

1. **ティア不変ベベル補正＆中空 CNC 構造化** ([welcomeGeometry.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeGeometry.ts), [welcomeParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeParts.ts)):
   - `W173` マグネシウム台座シャーシを中実ブロックから前面・背面・側面 I/O 窓および分割フロア構造を持つ真正中空 CNC フレームへ再設計。
   - `W174` 上面データム板（4 ドック開口＋6 ダボ穴）および底面ウェイト（コンプライアンスポケット＋16 箇所 M3 座ぐり穴）を実加工カットアウト化。
   - 4 文字全層の Z スタック・内部電子ベイ・中空石英柱・アポセム補正 O リング・5 面中空スピーカー箱・純軸単調爆発軌道を構築。
2. **`pp1.1` 全方位接写目視監査で捕捉した浮遊・突出パーツ 10 系統を全数根絶** ([welcomeGeometry.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeGeometry.ts), [welcomeParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeParts.ts), [welcomeGlyphPrecisionParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeGlyphPrecisionParts.ts), [welcomeGlyphMetrologyParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomeGlyphMetrologyParts.ts), [welcomePlinthInstrumentationParts.ts](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/assemblies/welcome/welcomePlinthInstrumentationParts.ts)):
   - **`W334`**（「そ」プリズム固定真鍮ブロック）：5.63 mm 宙に浮いていた 2 ブロックを `so_z2` 前面角リムへ密着配置。
   - **`W234`**（「そ」銀ミラー裏打ちクリップ）：左斜め外へ突き出していた腕を `so_z2` 背面内側へ完全収納。
   - **`W119`/`W120`**（「こ」上画ハネ部・プリズム）：右石英柱横に浮遊していた独立カプセルを `ko_top` 直下へ自然連続配置。
   - **`W121`〜`W126`**（「こ」左右透明石英柱）：上端・右柱下端の 1.5 mm 隙間を解消し `ko_top` / `ko_bot` へピタリと着座。
   - **`W221`**（「よ」セラミック断熱スリーブ）：右下ハネ下に浮遊していた白円盤を主幹背面根元へ密着配置。
   - **`W318`**（「よ」横枝 BeCu 保持ばね）：横棒の上下に浮いていた 2 本のロッドを横棒上下リムへ密着。
   - **`W319`/`W323`/`W330`**（「よ」「う」「こ」サファイア保持爪群）：実描画ストローク (`RENDER_STROKE_MAP`) に追従させ、外周へ浮遊していた黒点・爪片を全数解消。
   - **`W316`**（「よ」タッププリズム）＆**`W163`**（「そ」第 1 コーナープリズム）：外周への張り出し・浮きを解消し密着配置。
   - **`W357`**（ロータリーダイヤル蓄光リング）：右端キャップ外へ `0.68 mm` 突出していたリング径を `5.85 → 5.22 mm` に適正化し、端面内 (`X_max = 96.94 <= 96.95 mm`) へ完全収容。

---

## 4. `pp1.1` 視覚確認ビフォー／アフター & UI 検証結果

````carousel
![修正前: welcome ULTRA 6面正射影（背面突出・浮遊爪・浮遊プリズムブロック・中実台座）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/welcome_ortho_before.png)
<!-- slide -->
![修正後: welcome ULTRA 6面正射影（全4ティア0.001mm無干渉・浮遊/突出ゼロ・中空CNC台座窓）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/welcome_ortho_after.png)
<!-- slide -->
![修正後: welcome ULTRA 正面フル解像度（浮遊部品・隙間・突出ゼロ）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/welcome_front_after.png)
<!-- slide -->
![修正後: welcome ULTRA 背面フル解像度（全ヒートシンク・I/O・銀ミラー完全着座）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/welcome_back_after.png)
<!-- slide -->
![修正後: welcome ULTRA 上面フル解像度（右ロータリーダイヤル蓄光リング端面内収容）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/welcome_top_after.png)
<!-- slide -->
![修正後: welcome ULTRA 8方向ターンテーブル](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/welcome_turntable_after.png)
<!-- slide -->
![修正後: welcome 爆発分解ビュー（全8ステップ衝突 0 件）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/welcome_exploded_after.png)
<!-- slide -->
![修正後: スマホ縦 390×844 トップバー（1行整列・HUD重なりゼロ）](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/mobile_after.png)
<!-- slide -->
![修正後: スマホ縦 390×844 図説・解説ドロワー階層](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/6d32aa21-f31d-40ab-820a-80e4bf9886fc/mobile_drawer_after.png)
````

---

## 5. 実ブラウザ Chrome CDP 自動 E2E 回帰テスト（10/10 PASS）

```text
[PASS] Desktop initial load responsive & no auto-fullscreen — buttons=4 trigger="ようこそ 3D立体435p"
[PASS] Desktop top-left palette opens in portal, clickable, no fullscreen — click=35.1ms {"open":true,"inPortal":true,"itemClickable":true,"fullscreen":false}
[PASS] Unit switch via top-left palette without freeze — elapsed=914.2ms label="50mm F1.2 GM128p"
[PASS] Rapid 10-unit switch stress test (0 freezes, 0 VRAM leaks) — total=26293.1ms final="ようこそ 3D立体435p" vramLeaks=0
[PASS] Modal mutual exclusion (Original auto-closes when Play Ground opens) — origBefore=true after={"origOpen":false,"pgOpen":true}
[PASS] Escape closes Play Ground cleanly — pgOpen=false
[PASS] Mirai 2028 sub-bar & Library modal responsive + Escape closes — subBtns=11 libOpen=true
[PASS] Portrait Mobile (390x844): 4 top-left buttons fit on 1 row without wrapping — {"count":4,"minTop":7,"maxTop":8,"maxRight":454.40625,"vw":390}
[PASS] Landscape Mobile (844x390): top-left palette unclipped & itemActuallyClickable=true — {"open":true,"popoverH":333,"itemActuallyClickable":true}
[PASS] Zero console errors, zero uncaught page errors, zero VRAM leaks across full E2E run — {"consoleErrors":[],"pageErrors":[],"vramLeaks":[]}

=== CDP E2E SUMMARY: 10/10 PASS ===
```
