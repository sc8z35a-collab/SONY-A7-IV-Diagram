# THE LAST EXAM V1.1 ＆「V1.1証明」刻印保証 ＆ PLYA V2.1 ＆ FLOW V1.1 OS ハイパー自動化 実装計画書

> [!NOTE]
> 本計画書は `/plan` モードの要件に従い、**リポジトリのファイルを 1 行も書き換えず**に全コードベース・Ubuntu 24.04 パッケージ・既存 EXAM V1 / Playground / FLOW V1 OS を徹底調査した上で策定した技術設計書です。ご承認後に Phase 0（`main` マージ）から順次実行します。

---

## 1. 全体ゴールと到達アーキテクチャ

本計画は、以下の **5 大ミッション** を相互に連動する単一エコシステムとして完成させます。

| # | ミッション | 現行（V1 / FLOW V1.0） | アップグレード後（V1.1 / FLOW V1.1） |
|---|---|---|---|
| **0** | **`main` 統合** | `feat/feat-flow-v1-os` (`ff33fdb`) | `main` へ完全マージ → 新規ブランチ `feat/exam-v1-1-flow-auto` 作成 |
| **1** | **THE LAST EXAM V1.1 刷新** | 10 柱 / 36 エンジン / 530 テスト / 32 外部ソルバー / 16 ロック | **12 柱 / 48 エンジン / 1,080 原子テスト / 48 実外部ソルバー（C++17 6 基）/ 28 クロスロック** — 実世界製造・100%正常組立時の **100%確実起動・正常動作保証水準** |
| **2** | **「V1.1証明」刻印 ＆ 即時剥奪** | レシート文字列のみ（3D データ非刻印） | 1,080/1,080 全項目 100% 合格時のみ、正規 3D ジオメトリ SHA-256（精度 `0.0001mm`）結合の **暗号「V1.1証明」を 3D データ＆UI へ刻印**。**1 頂点・`0.001mm`・材質・JSON を 1 ビットでも変更した瞬間に自動剥奪**し、再度の 100% 合格以外での再刻印を物理・暗号的に不可化 |
| **3** | **Playground 採点継承 (`PLYA V2.1`)** | 10 軸 / 16 ブラウザソルバー / 128 項目 | **12 柱 / 24 ブラウザソルバー / 256 原子項目 (`PG-T001..T256`)** へ倍増。実機起動・動作保証メーター、`.tlx11.json` 連携、およびリアルタイム **「V1.1証明」表示＆編集時即時剥奪** を内蔵 |
| **4** | **FLOW V1.1 OS ハイパー自動化** | 1 コマンド 5〜7 工程・固定スーパーコマンド | **1 コマンドで 12〜30+ 工程を並列 DAG・自己修復ループ実行する `flow auto`（6 大メガパイプライン）** ＋ **AI エージェント自身が安全な高効率自動化コマンドを正式登録・再利用できる `flow macro` システム** ＋ **`SEC-13` マクロ統治セキュリティ（36 攻撃レッドチーム）** |

```mermaid
flowchart TB
  subgraph P0["Phase 0: Git統合"]
    M["feat/feat-flow-v1-os -> main マージ"] --> B["feat/exam-v1-1-flow-auto 分岐"]
  end

  subgraph EXAM11["THE LAST EXAM V1.1 (実世界 100% 起動・動作保証)"]
    SV["48 実外部ソルバー (apt + C++17 6ハーネス)"]
    ENG["12柱 / 48エンジン (EX01..EX48) / 1,080 原子テスト"]
    XL["28 独立クロスソルバー保存則ロック (X01..X28)"]
    SV --> ENG --> XL
  end

  subgraph CERT["V1.1証明 暗号刻印・即時剥奪エンジン"]
    HASH["正規3D幾何・材質・Pose・BOM SHA-256 (0.0001mm量子化)"]
    GATE{"1,080/1,080 (100%)\nAND 28/28 Lock?"}
    STAMP["V1.1証明 刻印発行\n(.v1_1.cert.json + v1_1_certificates.gen.ts + 3D userData)"]
    WATCH["常時改ざん監視 (Browser UI / Playground / CLI / SEC-08)"]
    REVOKE["1ビット/0.0001mm変更検知 -> 即時剥奪 (REVOKED)"]
    HASH --> GATE
    XL --> GATE
    GATE -- YES --> STAMP --> WATCH
    WATCH -- "変更検知" --> REVOKE
    REVOKE -- "再100%合格のみ" --> GATE
  end

  subgraph PG["Playground PLYA V2.1"]
    PGS["12柱 / 24ブラウザソルバー / 256原子項目 (WebWorker)"]
    PGB["実機起動保証メーター + V1.1証明リアルタイム表示・編集時即時剥奪"]
    PGS --> PGB
    CERT -. "双方向 .tlx11.json / .v1_1.cert.json" .-> PG
  end

  subgraph AUTO["FLOW V1.1 OS ハイパー自動化カーネル"]
    DAG["flow auto (1コマンド=12〜30+工程並列DAG)\nbootstrap / research / dev / certify / fabricate / factory"]
    MAC["flow macro (AI自己登録・型検証・自動提案・共有レジストリ)"]
    SEC13["SEC-13 マクロ統治要塞 (shell:false / ホワイトリスト / チート不能 / 36攻撃オラクル)"]
    MAC --> SEC13 --> DAG
  end

  B --> EXAM11
  EXAM11 --> CERT
  EXAM11 --> PG
  AUTO --> EXAM11
```

---

## 2. ご確認いただきたい重要判断事項（User Review Required）

> [!IMPORTANT]
> 以下の 2 点について方針をご確認ください（未指定の場合はいずれも **(推奨)** で進行します）。

1. **既存 23 ユニットの CAD 座標変更の扱いについて**
   - **(推奨) オプション A**: 本タスクでは `THE LAST EXAM V1.1`・`V1.1証明`（刻印＆即時剥奪）・`PLYA V2.1`・`FLOW V1.1 OS (flow auto / flow macro)` の基盤構築と完全検証に集中し、既存 23 ユニットの 3D 形状は一切改変しない（`pp1.1` で無劣化 `SSIM=1.0000` を保証）。既存ユニットは正直に `V1.1 未刻印` として表示され、ゴールデン基準モデル＆合成 3D テストおよび Playground で **「100%合格→刻印」と「0.001mm変更→即時剥奪」** を実動証明する。完了後、次フェーズで `flow auto factory` を使って全 23 ユニットを順次 100% 認定・刻印していく。
   - **オプション B**: 基盤完成後、パイロット 1 ユニット（例: `mishoe` 等比較的小規模なユニット）に対して実際に `flow auto certify` を実行し、実ユニットへの初号「V1.1証明」刻印まで本タスク内で完了する（所要時間は追加で増加）。
2. **`main` マージ方式について**
   - **(推奨)**: GitHub 上で `feat/feat-flow-v1-os` → `main` の正式 PR を作成し、`gh pr merge --merge`（履歴保持）で統合した上で `origin/main` から新ブランチ `feat/exam-v1-1-flow-auto` を切る。

---

## 3. 詳細設計：Phase 別実装計画

---

### Phase 0: `feat/feat-flow-v1-os` → `main` マージ ＆ 作業ブランチ分岐

1. `gh pr create` で `feat/feat-flow-v1-os` → `main` の PR を作成し、FLOW V1 OS の実測結果と `FLOW-RECEIPT:c28166e8:10016428:d96635b8:integrator:c9406665d3e7` を記載。
2. `gh pr merge --merge` により `main` へマージ、`git checkout main && git pull --ff-only origin main` でローカル同期を確認。
3. 鉄則 `I02` に従い、`npm run flow -- wake exam-v1-1-flow-auto --role=integrator --goal="THE LAST EXAM V1.1, V1.1 Seal, PLYA V2.1 & FLOW V1.1 Hyper-Automation"` で新規ブランチ `feat/exam-v1-1-flow-auto` を作成。

---

### Phase 1: THE LAST EXAM V1.1 — 48 外部ソルバー ＆ 6 C++17 ネイティブハーネス

#### 1.1 外部ソルバー拡張（32 → **48 実外部ソルバー**、すべて Ubuntu 24.04 実在パッケージ確認済・モック 0）

既存の 32 ソルバーに加え、以下の **16 種の真正産業用外部ソルバー** を [`scripts/exam_setup.sh`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam_setup.sh) へ追加し、`/tmp/tlx_env_manifest.json` で **48/48 READY** を厳格検証（1 つでも欠落すれば `EXIT 5`）。

| # | 新規ソルバー ID | 実ツール / パッケージ（Ubuntu 24.04 確認済） | 役割・現実世界保証への寄与 |
|---:|---|---|---|
| 33 | `getdp` | `getdp` (3.2.0) | Gmsh 連成の独立 FEM PDE ソルバー（FreeFEM++ の電磁界・静電界・ESD・高速 SI を独立クロス検証） |
| 34 | `cvc5` | `cvc5` (1.1.2) | Stanford/Iowa 製 独立 SMT 定理証明器（Z3 との 2 重 SMT クロスロックで形式証明の誤陽性を排除） |
| 35 | `minisat` | `minisat` (2.2.1) | 産業用 SAT ソルバー（安全故障木 FTA の最小カットセット網羅証明） |
| 36 | `boolector` | `boolector` (1.5.118) | ビットベクトル専用 SMT ソルバー（ADC/PMIC/I2C/SPI レジスタ幅・オーバーフロー厳密証明） |
| 37 | `ghdl` | `ghdl` (4.1.0) | IEEE VHDL シミュレータ（Verilator/Icarus に加わる第 3 の独立 HDL 実行系で起動シーケンス検証） |
| 38 | `nextpnr_ice40` | `nextpnr-ice40` (0.6) | FPGA 配置配線＆静的タイミング解析（STA セットアップ/ホールド余裕・CDC メタスタビリティ検証） |
| 39 | `octave` | `octave` (8.4.0) | GNU Octave 数値制御・LTI・Bode/Nyquist・状態空間解析（DC-DC/IBIS/VCM/サーボの閉ループ安定性証明） |
| 40 | `maxima` | `maxima` (5.46.0) | 記号数式処理系 CAS（SymPy と独立に光学結像・熱力学・ヘルツ接触保存式を二重検算） |
| 41 | `admesh` | `admesh` (0.98.5) | 独立 STL/メッシュ水密・法線反転・体積・造形性検証（CGAL/OCCT との 3 重形状クロスロック） |
| 42 | **`native_dart`** | **`libdart-dev` (6.13.2) → C++17 ハーネス #5 `dart_kinematics_dynamics`** | **第 3 の多体物理・関節ロボティクスエンジン**（逆動力学・アクチュエータトルク余裕・可動域干渉・バックラッシュ・ZMP 検証） |
| 43 | **`native_spectral_gts`** | **`libfftw3-dev` + `libgts-dev` + `libnlopt-dev` → C++17 ハーネス #6 `spectral_gts_nlopt`** | **C++17 FFTW3 ランダム振動 PSD / EMI 高調波スペクトル解析 ＋ GTS 曲率/表面品質 ＋ NLopt 非線形最適化** |
| 44 | `py_cvxopt` | `python3-cvxopt` (1.3.0) | 内点法 凸/SOCP 最適化器（摩擦円錐力閉包・締結荷重配分を SciPy/CBC と独立クロス検証） |
| 45 | `py_rtree` | `python3-rtree` (1.2.0) | libspatialindex 3D R-tree 空間索引（PCB 沿面/空間距離・配線障害の独立広域空間検証） |
| 46 | `py_igraph` | `python3-igraph` (0.11.4) | C 実装高速グラフ理論エンジン（二重連結性・最小カット・電源木冗長性を NetworkX と独立クロス検証） |
| 47 | `py_pint` | `python3-pint` (0.19.2) | 厳格物理次元解析器（BOM・仕様・計算式での mm/m・W/mW・V/mV 単位系不整合を 0 に証明） |
| 48 | `py_statsmodels` | `python3-statsmodels` (0.14.1) + `python3-mpmath` (1.2.1) + `python3-vtk9` (9.1.0) | 統計的工程管理 Six-Sigma Cp/Cpk・ワイブル初期故障率・100 桁任意精度検算・VTK 3D 場検証 |

#### [MODIFY] `scripts/exam_setup.sh`
- 上記 apt パッケージ追加＋新設 C++17 ハーネス 2 基（`dart_kinematics_dynamics`, `spectral_gts_nlopt`）の `-O3 -std=c++17` ビルド追加＋48 ソルバー全件検証マニフェスト出力。

#### [NEW] `scripts/exam/native/src/dart_kinematics_dynamics.cpp`
- `.tlxm` バイナリを直接読み込み、DART 6.13 の `World` / `Skeleton` を構築して、関節可動域（シャッター幕・IBIS・鏡筒ヘリコイド・バリアングルヒンジ・電池蓋・脚関節）の逆動力学トルク・エンドストップ干渉・バックラッシュ・剛体質量/慣性モーメントを JSON 出力。

#### [NEW] `scripts/exam/native/src/spectral_gts_nlopt.cpp`
- `.tlxm` バイナリを読み込み、FFTW3 で MIL-STD-810H / ISTA-3A ランダム振動 PSD 応答と EMI スイッチング高調波スペクトルを厳密計算し、GTS で表面曲率・鋭角エッジ・閉曲面品質、NLopt で最悪ケース熱暴走/ヘルツ接触圧を算出。

---

### Phase 2: THE LAST EXAM V1.1 — 12 柱 / 48 エンジン / 1,080 原子テスト / 28 クロスロック

「現実世界で製造・100%正常組立した際に **100% 確実に起動して正常動作する**」を科学的に閉じるため、既存の 10 柱 / 36 エンジンを深化させつつ、**2 つの新柱 (`P11`, `P12`) と 12 の新産業エンジン (`EX37`..`EX48`)** を追加します。

#### 2.1 新規 2 柱・12 エンジン設計 (`EX37`..`EX48`)

| 柱 | Engine | 名称 | 使用外部ソルバー | 現実世界の起動・動作を保証する具体的物理検証 | テスト数 |
|---|---|---|---|---|---:|
| **P11** | **`EX37`** | **コールドブート電源シーケンス・突入電流・ブラウンアウト耐性** | `NGSPICE` + `GNUCAP` + `OCTAVE` | $-20^\circ\text{C}/25^\circ\text{C}/60^\circ\text{C}$ での $0 \to V_{\text{bus}} \to 5\text{V} \to 3.3\text{V} \to 1.8\text{V} \to 1.1\text{V}$ 単調立上り、突入電流 $I_{\text{inrush}}$ vs FET SOA/ヒューズ $I^2t$、PG シーケンス順序、リセット解除遅延、無給電ドメイン逆流（バックフィード）ゼロ | 24 |
| **P11** | **`EX38`** | **閉ループ電源・アクチュエータ制御安定性 (Bode/Nyquist/Routh)** | `OCTAVE` + `SCIPY` + `SYMPY` + `MAXIMA` | Buck/LDO レギュレータ・IBIS 5 軸 VCM・AF リニアモータ・冷却 PWM 制御の位相余裕 $\ge 45^\circ$、ゲイン余裕 $\ge 10\text{ dB}$、Routh-Hurwitz 全極 $\text{Re}(s)<0$、ステップ応答オーバーシュート $<15\%$、リミットサイクル振動ゼロ | 22 |
| **P11** | **`EX39`** | **3重HDL起動シーケンサ・バス調停・FPGA静的タイミング収束** | `YOSYS` + `NEXTPNR_ICE40` + `VERILATOR` + `IVERILOG` + `GHDL` | POR/PMIC/I2C/SPI/MIPI-CSI/USB-PD 起動 FSM を **Verilog 2系＋VHDL 1系の3独立シミュレータ**で完全一致検証＋`nextpnr` 静的タイミング（Setup/Hold Slack $>0$、CDC 違反 0、コールド起動 $\le 500\text{ms}$ 以内 `OPERATIONAL_READY` 到達証明） | 24 |
| **P11** | **`EX40`** | **二重SMT・ビット厳密レジスタ/ピン配置/バスアドレス衝突証明** | `Z3` + `CVC5` + `BOOLECTOR` + `MINISAT` | I2C アドレス衝突 0、電圧ドメイン誤接続 0（1.8V ピンへ 3.3V 直結禁止）、ピンマルチプレクス競合 0、ADC/カウンタ飽和オーバーフロー 0、起動依存 DAG デッドロック 0、MiniSat 安全故障木最小カットセット $\ge 2$ | 24 |
| **P11** | **`EX41`** | **高速信号整合性 (SI)・特性インピーダンス・スキュー・PDN Z(f)** | `GETDP` + `FREEFEM` + `NGSPICE` + `FFTW3` | MIPI CSI-2 / USB 3.2 / PCIe / DDR / CFexpress 差動インピーダンス $90/100\Omega \pm 10\%$（GetDP 独立 FEM 検証）、アイ開口余裕、ペア内スキュー、GND リターンパス分断ゼロ、$10\text{kHz}$–$1\text{GHz}$ PDN 目標インピーダンス達成 | 22 |
| **P11** | **`EX42`** | **ESD (±8kV接触/±15kV気中)・サージ・EFT・IEC 62368-1 感電安全** | `NGSPICE` + `GETDP` + `KICAD` | 外部金属ポート（USB-C/HDMI/MIシュー/マウント/三脚穴）への IEC 61000-4-2 ESD 印加過渡シミュレーション、TVS クランプ後 IC ピン電圧 $< V_{\text{abs\_max}}$、沿面/空間アーク 0、人体接触電流 $< 0.25\text{mA}$ | 22 |
| **P12** | **`EX43`** | **DART 関節動力学・アクチュエータトルク余裕・機構ジャムゼロ証明** | `NATIVE_DART` + `BULLET` + `ODE` + `CVXOPT` | 第 3 多体エンジン DART による可動機構全ストローク掃引：エンドストップ干渉/噛み込み 0、駆動トルク余裕 $\ge 1.5\times$、特異姿勢 0、バックラッシュ精度内、CVXOPT 摩擦円錐力閉包 | 24 |
| **P12** | **`EX44`** | **過渡熱衝撃・低温起動 (-20℃)・熱暴走伝播・低温火傷安全** | `OPENFOAM` + `CCX` + `OCTAVE` + `SCIPY` | $-20^\circ\text{C}$ 電池 ESR 上昇時の起動維持、4K60p/8K 連続録画熱過渡ランプ（スロットリング到達時間・グリップ表面温度 EN 563 $\le 48^\circ\text{C}$）、セル間熱暴走伝播障壁、$-20^\circ\text{C}\leftrightarrow +60^\circ\text{C}$ 結露マージン | 22 |
| **P12** | **`EX45`** | **MIL-STD-810H ランダム振動 PSD・ISTA-3A 輸送衝撃・光学ドリフト** | `NATIVE_SPECTRAL_GTS` + `CCX` + `FFTW3` + `NLOPT` | FFTW3 による輸送 PSD 3$\sigma$ RMS 応答、BGA はんだボール疲労剪断ゼロ、輸送後光学偏心 $\le 5\,\mu\text{m}$・チルト $\le 0.01^\circ$、ねじ振動緩みゼロ | 22 |
| **P12** | **`EX46`** | **精密量産実製造性・Six-Sigma 歩留り (Cpk)・3重水密形状検証** | `ADMESH` + `CGAL` + `OCCT` + `GMSH` + `STATSMODELS` + `RTREE` | CGAL/OCCT/ADMesh 3重体積・水密検証、statsmodels Six-Sigma (`Cp >= 1.33`, `Cpk >= 1.33`, 歩留り $\ge 99.73\%$)、CNC エンドミル隅 R・金型抜き勾配/アンダーカット・板金 K 係数・閉塞ポケットゼロ | 24 |
| **P12** | **`EX47`** | **トライボロジー (ヘルツ接触・1万回挿抜摩耗)・厳格単位系保存則** | `NATIVE_SPECTRAL_GTS` + `PINT` + `SYMPY` + `MAXIMA` + `MPMATH` | マウント爪・三脚ねじ・シャッターレール・ポゴピンのヘルツ接触応力と 10,000 回挿抜摩耗深さ（金めっき厚内）、`pint` 全仕様・BOM 単位系矛盾 0、SymPy/Maxima/100桁 mpmath 保存式検算 | 22 |
| **P12** | **`EX48`** | **ポカヨケ組立誤組防止・工場 EOL テスト網羅・V1.1証明ゲート** | `IGRAPH` + `NX` + `Z3` + `CVC5` + `VTK` | 異長ねじ誤挿入による基板/電池貫通防止、コネクタ逆挿防止キーイング、工場 EOL 全電源レール/クロック/SWD テストポイント到達率 100%、igraph vs NetworkX 二重連結構造、VTK 断面検証、**V1.1証明 暗号刻印ゲート** | 24 |

#### 2.2 全 1,080 原子テスト構成（`T0001`..`T1080`）
- **既存 36 エンジン (`EX01`..`EX36`) の強化拡張**: 現行 530 テスト → **804 テスト**（+274 実世界製造・組立・起動テスト：各エンジンに境界条件・最悪ケース公差・端子接触抵抗・ねじ山有効係合長・実装リフロー反り・光軸偏心・防塵防滴段差等の厳格項目を追加）
- **新規 12 エンジン (`EX37`..`EX48`)**: **276 テスト**
- **合計**: **12 柱 / 48 エンジン / 1,080 固定原子テスト (`T0001`..`T1080`)**（展開チェック総数 `2,500–5,000+`）

#### 2.3 独立クロスソルバー保存則ロック拡張（16 → **28 クロスロック `X01`..`X28`**）
既存の `X01`..`X16` に加え、新たに **12 本の独立クロスロック (`X17`..`X28`)** を [`scripts/exam/engines/cross_solver_lock.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/engines/cross_solver_lock.mjs) に追加（1 本でも不一致なら即 `EXIT 4 INVARIANT_FAIL`、証明発行拒否）：
- `X17`: **Z3 vs CVC5**（独立 2 大 SMT 証明器の形式検証判定完全一致）
- `X18`: **FreeFEM++ vs GetDP**（独立 2 大 FEM PDE ソルバーの差動インピーダンス・EMC 遮蔽効果一致）
- `X19`: **Bullet vs ODE vs DART**（3 重独立 3D 多体物理エンジンの総質量・重心・重力反力一致）
- `X20`: **CGAL vs OCCT vs ADMesh**（3 重独立幾何カーネルの総体積・水密判定一致）
- `X21`: **Verilator vs Icarus Verilog vs GHDL (VHDL)**（3 重独立 HDL シミュレータのコールドブート起動状態遷移完全一致）
- `X22`: **NetworkX vs igraph**（独立グラフ理論エンジンの連結成分数・関節点・二重連結性一致）
- `X23`: **SciPy HiGHS vs CVXOPT**（独立凸最適化ソルバーの支持反力・摩擦円錐力閉包一致）
- `X24`: **SymPy vs Maxima vs mpmath(100桁)**（3 重記号/高精度解析による光学・熱・ヘルツ接触式の保存則一致）
- `X25`: **Octave Bode 制御安定性 vs ngspice 過渡ステップ応答**（位相余裕と過渡オーバーシュート整合）
- `X26`: **CalculiX 固有振動数 $f_1$ vs FFTW3 PSD 応答ピーク周波数**（共振点一致）
- `X27`: **FCL 広域距離 vs R-tree 3D 空間索引**（近接候補対完全包含一致）
- `X28`: **正規 3D ジオメトリ SHA-256（Node IR 算出）vs 証明書ハッシュ（EX48 V1.1 ゲート）**（改ざんゼロ一致）

#### 2.4 ファイル変更一覧（Phase 2）
- **[MODIFY]** [`scripts/exam.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam.mjs) — `THE LAST EXAM V1.1` へ昇格（48 エンジン登録、`TLX11` プロトコル、100% 合格時の自動「V1.1証明」刻印、変更検知時の自動剥奪フック、`--cert-verify` / `--cert-status` サブコマンド追加）。
- **[MODIFY]** [`scripts/exam/test_registry.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/test_registry.mjs) — 12 柱・48 エンジン・1,080 固定原子テスト (`T0001`..`T1080`)・28 クロスロック (`X01`..`X28`) 定義。
- **[MODIFY]** [`scripts/exam/tlx1_protocol.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/tlx1_protocol.mjs) — `TLX11` ヘッダ（互換パース維持）・`TLX11-RECEIPT`・`V11-CERT` 連携出力。
- **[MODIFY]** [`scripts/exam/engines/solver_exec.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/engines/solver_exec.mjs) — 48/48 外部ソルバー厳格検証＆6 C++17 ネイティブバイナリ管理。
- **[MODIFY]** [`scripts/exam/engines/cross_solver_lock.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/engines/cross_solver_lock.mjs) — 28 クロスロック実装。
- **[MODIFY]** `scripts/exam/engines/p01_geometry_contact.mjs` 〜 `p06_formal_fsm_chem_visual.mjs` — 既存 36 エンジンの追加 274 項目実装。
- **[NEW]** `scripts/exam/engines/p07_power_boot_control.mjs` — `EX37`..`EX42` (Pillar 11) ランナー。
- **[NEW]** `scripts/exam/engines/p08_mfg_reliability_cert.mjs` — `EX43`..`EX48` (Pillar 12) ランナー。
- **[NEW]** `scripts/exam/engines/py_boot_control_si_esd.py` — `ngspice`/`gnucap`/`octave`/`getdp`/`cvc5`/`boolector`/`minisat`/`ghdl`/`nextpnr` ブリッジ。
- **[NEW]** `scripts/exam/engines/py_mfg_tribology_cert.py` — `admesh`/`cvxopt`/`rtree`/`igraph`/`pint`/`statsmodels`/`maxima`/`mpmath`/`vtk` ブリッジ。
- **[MODIFY]** [`scripts/exam/engines/selftest_oracle.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/engines/selftest_oracle.mjs) — 75 チェック → **125+ チェック**へ拡張（ゴールデン健全アセンブリでの **48/48 エンジン・1,080/1,080 テスト・28/28 ロック・V1.1証明発行** ＋ **12 種の現実欠陥注入検出**［既設 7 種＋新設 5 種：起動ブラウンアウト/電源逆順、I2C/電圧ドメイン衝突、制御不安定極、機構ジャム/トルク不足、0.001mm 改ざんによる V1.1証明 即時剥奪］）。

---

### Phase 3: 改ざん検知・即時自動剥奪機能付き「V1.1証明」刻印保証システム

#### 3.1 暗号設計（抜け道ゼロの「実質的保証書」）

「3D データの状態を少しでも変えたら即座に剥奪され、再度 100% 合格しない限り刻印できない」を数学的に保証するため、**Node（EXAM V1.1）とブラウザ（Three.js / Playground）で完全同一の正規ハッシュ** を算出します。

1. **正規 3D データ指紋 `canonical3dSha256`**（精度 `0.0001mm` = 100 nm 量子化）：
   ```ts
   // パーツ ID 昇順ソート後、全パーツについて以下を確定フォーマットで SHA-256 連結
   // 1頂点・0.0001mm の座標移動、1回転/拡大縮小、1材質変更、1部品質量/仕様変更でも即不一致！
   partRecord = [
     part.id,
     part.matKey,
     q4(assembledPos[0..2]),     // Math.round(v * 10000)
     q4(explodeOffset[0..2]),
     q4(bbox[0..5]),
     part.triCount,
     quantizedVertexStreamSha256, // 全三角形頂点を 0.0001mm 整数化して SHA-256
     q4(volumeMm3),
     q4(massG),
   ].join('|');
   ```
   さらに CLI 側では以下もバインドします：
   - `allTiersSha256`: `standard_lite` / `standard` / `high` / `ultra` 全 4 ティアの `canonical3dSha256` 結合ハッシュ
   - `sourceBundleSha256`: `src/units/<U>.ts` + `src/units/<U>.pose.tsv` + `src/data/<U>.json` + `src/assemblies/<U>/**` の全ソースハッシュ
   - `examKernelSha256`: `scripts/exam/**`（テストレジストリ・クロスロック・全エンジンコード）のハッシュ（テスト基準の緩和・改変があれば旧証明書も自動失効！）
   - `solverManifestSha256`: 48/48 外部ソルバー構成ハッシュ

2. **刻印発行条件（100.0000% 厳格ゲート）**:
   - `fullRun === true`（48/48 エンジン無省略）
   - `passCount === 1080 && failCount === 0 && warnCount === 0 && errCount === 0 && skipCount === 0`
   - `crossLocksOk === 28/28`
   - `solversReady === 48/48`
   - 上記すべてを満たした場合のみ、`scripts/exam/v11_certificate.mjs` が以下を刻印：
     - `verification/certificates/<unitId>.v1_1.cert.json`（署名付き保証書 JSON：`V11-CERT:<unitId>:<geomSha12>:<kernelSha8>:1080/1080:<sig16>`）
     - `src/units/v1_1_certificates.gen.ts`（ブラウザ＆CLI 共用の自動生成レジストリ）
     - `userData.v11Certification`（Three.js 3D データ本体への刻印メタデータ）
     - 監査台帳 `.git/flow_os/flow_audit.jsonl` へ SHA-256 連鎖記録

3. **即時自動剥奪メカニズム（4 重防御ライン）**:
   - **防御 1 — 3D ビューア実行時検証 ([`src/core/v11_seal_verifier.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/v11_seal_verifier.ts))**: ユニット読込完了時に Three.js シーンから live `canonical3dSha256` を算出して `v1_1_certificates.gen.ts` と照合。1 ビットでも不一致なら `userData.v11Certification` を即座に破棄し、UI バッジを **`V1.1証明 失効（形状変更検知）`** へ即時切替。
   - **防御 2 — Playground 編集時即時剥奪 ([`src/playground/CadPlaygroundStudio.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/CadPlaygroundStudio.ts))**: 部品の移動・回転・拡縮・追加・削除・材質変更が 1 回でも発生した瞬間（`sceneEpoch` 更新時）、刻印中の `V1.1証明` を **ミリ秒単位で即時剥奪** し、トースト通知＋バッジ剥奪を実行。再刻印は最新状態の `.tlx11.json` で EXAM V1.1 100% 合格証明書を再取得しない限り不可能。
   - **防御 3 — CLI / ビルド時自動剥奪**: `flow inspect` / `flow ship` / `flow finish` / `validate_parts.mjs` / `exam.mjs --cert-verify` が全証明書と実 3D データを照合し、ドリフト検知時は自動的に `v1_1_certificates.gen.ts` から刻印を剥奪・ステータスを `REVOKED_DRIFT` へ更新。
   - **防御 4 — `SEC-08` 偽造ブロック**: `verification/certificates/*.v1_1.cert.json` や `v1_1_certificates.gen.ts` を手動編集して刻印を偽造した場合、暗号署名・`examKernelSha256`・監査台帳照合により `EXIT 6 (SEC_BLOCK)` で即座に遮断。

#### 3.2 ファイル変更一覧（Phase 3）
- **[NEW]** `scripts/exam/v11_certificate.mjs` — 正規 3D SHA-256 算出・刻印発行・検証・自動剥奪・`v1_1_certificates.gen.ts` 生成器。
- **[NEW]** `src/core/v11_seal_verifier.ts` — ブラウザ側 WebCrypto/純 JS 同期 SHA-256 による正規 3D 指紋算出＆即時剥奪検証器。
- **[NEW]** `src/units/v1_1_certificates.gen.ts` — 刻印済み保証書レジストリ（初期状態は空＝全既存ユニットは正直に `UNVERIFIED`、テスト/認定時に刻印登録）。
- **[MODIFY]** [`src/core/v2_unit_compiler.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/core/v2_unit_compiler.ts) & [`src/units/mi_shoe.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/units/mi_shoe.ts) — 構築 3D グループの `userData.v11Certification` へリアルタイム検証結果を付与。
- **[MODIFY]** [`src/ui/ZeroTextControls.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/ui/ZeroTextControls.ts) & [`src/main.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/main.ts) & [`src/styles/main.css`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/styles/main.css) — トップバー横へ省スペース高品位な **「V1.1証明」刻印ピル**（金/エメラルド=刻印済・赤=変更により剥奪・灰=未刻印）とクリックで開く **「V1.1 実機製造・動作保証書モーダル」** を追加。

---

### Phase 4: Playground 採点システム刷新 — `PLYA V2.1`（THE LAST EXAM V1.1 完全継承）

現行の `PLYA V2`（16 ソルバー / 128 項目）を、THE LAST EXAM V1.1 の全 12 柱・起動保証技術・V1.1証明体系を継承した **`PLYA V2.1 (THE LAST EXAM V1.1 Inherited)`** へアップグレードします。

#### 4.1 ブラウザ内マルチフィジックス倍増（16 → **24 ソルバー**、128 → **256 原子テスト `PG-T001`..`PG-T256`**）
既存 16 ソルバー (`BrowserPhysicsSolvers.ts`) に加え、新モジュール `src/playground/exam_core/V11BrowserSolversExt.ts` にて **8 つの新 V1.1 継承ブラウザソルバー（計 +128 項目）** を WebWorker 非同期実行（UI フリーズ 0ms）で追加：
1. `pg_power_on_boot` (`EX37` 継承): コールドスタート突入電流・電源レール立上り順序・ブラウンアウト余裕・リセット解除タイミング
2. `pg_control_stability` (`EX38` 継承): 閉ループ DC-DC/IBIS/AF アクチュエータの位相余裕・ゲイン余裕・オーバーシュート推定
3. `pg_digital_timing_fsm` (`EX39/40` 継承): 起動 FSM 到達性・I2C/SPI アドレス競合・電圧ドメイン不整合・ピン衝突検出
4. `pg_si_pdn_integrity` (`EX41` 継承): 高速差動配線インピーダンス・スキュー・リターンパス連続性・PDN 目標インピーダンス
5. `pg_esd_safety` (`EX42` 継承): 外部露出金属ポート ESD ±8kV/±15kV クランプ経路・沿面/空間距離・IEC 62368-1 接触安全
6. `pg_kinematics_actuators` (`EX43` 継承): 可動部ストローク干渉/ジャム検出・アクチュエータトルク余裕・バックラッシュ
7. `pg_transient_thermal_psd` (`EX44/45` 継承): 4K60p/低温(-20℃) 過渡熱応答・火傷温度安全性・輸送ランダム振動 PSD 疲労
8. `pg_pokayoke_cert_v11` (`EX46/47/48` 継承): Six-Sigma Cpk 歩留り推定・ヘルツ接触摩耗・ポカヨケ誤組防止 ＋ **リアルタイム `V1.1証明` 刻印検証＆編集時即時剥奪**

#### 4.2 Playground UI ＆ CLI 双方向認証ブリッジ
- **「実機起動・動作保証メーター」**: 採点ヘッダー＆詳細モーダルに `起動確実性 (%)` / `量産歩留り予測 (%)` / `V1.1証明ステータス` を表示。
- **双方向 `.tlx11.json` ⇄ `.v1_1.cert.json` ワークフロー**:
  1. Playground から `THE LAST EXAM V1.1 (.tlx11.json)` を出力（正規 3D SHA-256 込み）。
  2. CLI で `npm run flow -- auto certify --playground=<file>.tlx11.json` を実行 → 全 48 エンジン / 1,080 テスト / 48 ソルバー 100% 合格で `<file>.v1_1.cert.json` 発行。
  3. Playground へ「V1.1証明を読込」ボタンでインポート → 現在の 3D シーンと SHA-256 一致時のみ **`V1.1証明 刻印済`** を点灯！
  4. **直後に 1 パーツでも移動・拡大・回転・削除すると即座に剥奪** され、再刻印不可となる動作を実画面で体験・検証可能！

#### 4.3 ファイル変更一覧（Phase 4）
- **[NEW]** `src/playground/exam_core/V11BrowserSolversExt.ts` — 8 新ブラウザソルバー (+128 原子項目 `PG-T129..PG-T256`)。
- **[MODIFY]** [`src/playground/exam_core/BrowserPhysicsSolvers.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/exam_core/BrowserPhysicsSolvers.ts) — 24 ソルバー / 256 原子テスト・12 柱統合・起動保証指標算出。
- **[MODIFY]** [`src/playground/PlyaVerificationPipeline.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/PlyaVerificationPipeline.ts) — `PLYA-V2.1-EXAM11` レポート型、12 柱レーダー、`.tlx11.json` 出力、`v11CertState` 統合。
- **[MODIFY]** [`src/playground/CadPlaygroundStudio.ts`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/src/playground/CadPlaygroundStudio.ts) — 24 ソルバー / 256 項目 UI、実機起動保証メーター、「V1.1証明」インポート＆編集時即時剥奪ロジック。
- **[MODIFY]** [`scripts/exam/ir_compiler.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/exam/ir_compiler.mjs) — `.tlx11.json` 読込＋正規 3D SHA-256 互換計算＋Playground 用 `.v1_1.cert.json` 出力対応。

---

### Phase 5: FLOW V1.1 OS ハイパー自動化カーネル (`flow auto` + `flow macro` + `SEC-13`)

「AI が 1 コマンドずつ手動入力→待機→出力読解→次コマンド入力」という古典的ループを OS 全体から根絶し、**1 コマンドで 10〜30 以上の複合工程を並列 DAG・自動分岐・自己修復実行** し、さらに **AI エージェント自身が安全に新規自動コマンドを正式登録できる自己進化型 OS** へアップグレードします。

#### 5.1 汎用並列 DAG 実行エンジン (`scripts/flow_os/macro_engine.mjs`)
- **宣言型 DAG マクロ仕様 (`.flow/macros/*.macro.json`)**:
  - 各ステップは `id`, `action`（厳格ホワイトリスト済み FLOW プリミティブのみ）, `args`, `deps`（並列実行依存辺）, `when`（前段結果による条件分岐）, `onFail`（`abort | continue | heal_and_retry | capsule`）, `timeoutSec` を持つ。
  - **独立ステップは自動並列実行**（例：研究フェーズで AST・空間解析・熱重心・BOM・証明書状態・Git 履歴を同時並列実行し、実行時間を 3〜5 倍短縮）。
  - **10〜30 工程の全結果を単一の超圧縮 `FLOW1_DAG` レポート（`<= 400〜550 tok`）に集約**（生ログは `/tmp/flow_ws/<id>/dag_<runId>.log` へ自動退避）。
  - 変更系ステップ前には自動で `bg snap` トランザクション保護を挟み、致命失敗時は安全状態へ復帰可能。

#### 5.2 標準搭載 6 大メガパイプライン (`flow auto <name>`)

| コマンド | 自動実行工程数 | 1 コマンドで完結する自動化フロー |
|---|---:|---|
| **`flow auto bootstrap`** | **16 工程** | Git/依存確認 → 48外部ソルバー＋6 C++17ハーネス構築 → 48/48 READY確認 → `bg boot`＆フック → `catalog` → `dx atlas` → `flow/heal/exam/bg/dx/sp` 全セルフテスト → `security audit --full` → 初期ベースライン保存 |
| **`flow auto research --target=<U\|q>`** | **14 並列工程** | ASTシンボル・依存グラフ・Layer G/M/L統計・欠陥マップ・`sp inspect`・`sp thermal-cog`・V1.1証明状態・BOM/仕様・Git履歴・SOKUTEI指標を同時並列収集し **1 通（`<=550 tok`）の研究ドシエ** へ圧縮 |
| **`flow auto dev --unit=<U> --goal="..."`** | **18 工程** | `wake`＋ブランチ/リース → `bg snap` → `tsc` → `validate_parts` → `catalog`＋`atlas` → 必要時 `flow heal` → `npm run build` → `pp1.1` Before/After SSIM 回帰比較 → `security audit` → `bg snap` → `park` |
| **`flow auto certify --unit=<U>`** | **24 工程** | 48/48 ソルバー確認 → `flow heal --apply` 連成自動修復 → `catalog`/`atlas`/`tsc`/`validate`/`build` → **THE LAST EXAM V1.1 フル実行（48エンジン/1,080テスト/28ロック）** → 100%合格時 **「V1.1証明」自動刻印**＋`docs/`再ビルド＋`pp1.1`証跡＋`security`＋`FLOW-RECEIPT`（不合格時は残余 Tier-B カプセルのみ最小抽出） |
| **`flow auto fabricate --unit=<id>`** | **22 工程** | Layer G(`.pose.tsv`) / Layer M(`src/assemblies/<id>/`) / Layer L(`src/data/<id>.json`) / `src/units/<id>.ts` 一括スキャフォールド → `registry.ts` 登録 → `JSON==3D` 検証 → `flow heal --apply` 自動着座 → `catalog`/`atlas`/`tsc`/`build` → `pp1.1` 6面図＋ターンテーブル撮影 → EXAM V1.1 初回監査 → `bg snap` |
| **`flow auto factory --units=<all\|list>`** | **30+ 工程** | LPT 負荷分散計画 → ユニット別アトミックリース → 隔離ワークスペース並列ワーカーでの一括 `certify` → `SEC-10` 影響範囲検疫 → 認定済み `.pose.tsv` / `v1_1_certificates.gen.ts` 安全統合 → 全体ビルド＆最終 `FLOW-RECEIPT` |

#### 5.3 AI 自己登録型マクロレジストリ (`flow macro`) ＆ `SEC-13` セキュリティ要塞強化
- **コマンド体系**:
  - `flow macro register --file=<spec.json>` — AI が作成したカスタム複合自動化コマンドを、DAG 非巡回証明・`SEC-13` 監査・`--dry-run` 検証・SHA-256 署名付きで `.flow/macros/` へ正式登録！
  - `flow macro run <name> [--var=val...]` — 登録済みマクロを 1 コマンドで実行。
  - `flow macro suggest` — 監査台帳 `.git/flow_os/flow_audit.jsonl` から反復している 3 連以上のコマンド列を 0 LLM トークンで自動検出し、新規マクロ雛型 JSON を自動提案！
  - `flow macro list` / `inspect <name>` / `verify <name>` / `remove <name>` / `selftest`
- **`SEC-13` マクロ統治セキュリティ（セキュリティ要塞 12 層 → **13 層**、レッドチームオラクル 30 → **36 攻撃**）**:
  - **ATK31**: マクロ内の任意シェルコマンド注入 (`sh -c`, `rm -rf`, `curl|bash`) を即遮断 (`EXIT 6`)。
  - **ATK32**: マクロ内での EXAM V1.1 スキップフラグ (`--skip-*`) や閾値緩和を即遮断。
  - **ATK33**: マクロ内からの `human-report` 自律呼び出し（鉄則 `I10` 違反）を即遮断。
  - **ATK34**: 登録済み `.macro.json` ファイルの無断書き換え（SHA-256 署名不一致）を実行前に検知・遮断。
  - **ATK35**: 循環依存 DAG / ステップ上限超過 (`>40`) / パス脱出 (`../`) を即遮断。
  - **ATK36**: 偽造 `V1.1証明`（`.v1_1.cert.json` 手動改ざん・旧ジオメトリ流用）を `SEC-08/13` で即遮断。
- **汎用テンプレートへの完全移植**: `flow auto` / `flow macro` / `SEC-13` はリポジトリ非依存コア (`scripts/flow_os/`) に配置し、`flow export-template` / `flow init` で他リポジトリへも 30 秒でそのまま流用可能にします。

#### 5.4 ファイル変更一覧（Phase 5）
- **[NEW]** `scripts/flow_os/macro_engine.mjs` — 並列 DAG 実行・条件分岐・自己修復ループ・トークン集約エンジン。
- **[NEW]** `scripts/flow_os/macro_registry.mjs` — `flow macro register/run/list/inspect/verify/suggest/remove/selftest` 管理＆SHA-256 署名検証。
- **[NEW]** `scripts/flow_os/builtin_pipelines.mjs` — 6 大ビルトインメガパイプライン (`bootstrap`, `research`, `dev`, `certify`, `fabricate`, `factory`) 定義。
- **[MODIFY]** [`scripts/flow_os/flow.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/flow.mjs) — `auto` / `macro` / `cert` サブコマンド統合。
- **[MODIFY]** [`scripts/flow_os/security_fortress.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/security_fortress.mjs) & [`scripts/flow_os/security_selftest.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/security_selftest.mjs) — **13 層目 `SEC-13`**（マクロ統治＋`V1.1証明` 偽造ブロック）＆ **36 攻撃レッドチームオラクル**。
- **[MODIFY]** [`scripts/flow_os/receipt_chain.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/receipt_chain.mjs) & [`scripts/flow_os/template_exporter.mjs`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/scripts/flow_os/template_exporter.mjs) — `TLX11-RECEIPT` / `V11-CERT` チェーン結合＆汎用テンプレート対応。
- **[MODIFY]** [`AGENTS.md`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/AGENTS.md) & [`README.md`](file:///home/antigravity/sc8z35a-collab/SONY-A7-IV-Diagram/README.md) — **厳格 2 冊体制を維持**しつつ V1.1（12 柱/48 エンジン/1,080 テスト/48 ソルバー/28 ロック）、`V1.1証明`、`PLYA V2.1`、`flow auto` / `flow macro`、`SEC-13` を AI 最適記法で最新化（トークン予算上限厳守）。

---

## 4. 検証計画（Verification Plan）

### 自動検証コマンド群（すべて無省略 100% PASS 必須）

1. **48 実外部ソルバー ＆ 6 C++17 ハーネス構築検証**:
   ```bash
   node scripts/exam.mjs setup
   # 期待結果: MANIFEST ready=48/48 (C++17 ネイティブハーネス 6/6 コンパイル＆実行成功)
   ```
2. **THE LAST EXAM V1.1 自己証明・欠陥注入オラクル**:
   ```bash
   node scripts/exam.mjs selftest
   # 期待結果: TLX11_SELFTEST|verdict=PASS|pass=125/125|engines=48/48|tests=1080/1080|locks=28/28|sv=48/48
   # ゴールデン 3D で V1.1証明 刻印成功 + 0.001mm 改変で V1.1証明 即時剥奪成功を含む 12 種欠陥全検出！
   ```
3. **「V1.1証明」刻印・0.001mm 改ざん即時剥奪・偽造阻止テスト**:
   ```bash
   node scripts/exam/v11_certificate.mjs selftest
   # 100%合格→刻印発行 → 0.001mm変更→即時剥奪(REVOKED_DRIFT) → 不合格状態での再刻印拒否 → 手動JSON偽造をSEC-08遮断
   ```
4. **FLOW V1.1 OS・マクロエンジン・13 層セキュリティ (36 攻撃)・汎用移植検証**:
   ```bash
   npm run flow -- selftest --raw
   npm run flow -- macro selftest --raw
   npm run flow -- security audit --full --raw
   npm run flow -- heal selftest --raw
   npm run flow -- doc audit --strict --raw
   # 別ディレクトリ /tmp/flow_v11_portable へ export-template → init → selftest 完走も実証
   ```
5. **ビルド・型検査・既存全ツール互換性・視覚回帰監査**:
   ```bash
   npm run catalog && node scripts/dx.mjs atlas && npx tsc --noEmit && node scripts/validate_parts.mjs --ai && npm run build
   npm run bg -- selftest --ai && node scripts/dx.mjs selftest --ai && npm run sp -- selftest --ai
   ```
6. **実ブラウザ Chrome (`pp1.1`) による UI ＆ Playground `PLYA V2.1` 実写確認**:
   - 3D ビューア上での `V1.1証明` バッジ・保証書モーダル表示確認、および Playground (`PLYA V2.1` 24 ソルバー / 256 項目・実機起動保証メーター・編集時即時剥奪) の headless Chrome 実動確認＆スクリーンショット保存。
   - 既存ユニット 3D 描画の `pp1.1` Before/After `SSIM=1.0000`（無劣化）維持確認。
7. **最終暗号署名ゲート**:
   ```bash
   npm run flow -- park --next="..." --artifacts=<ARTIFACT_DIR>
   npm run flow -- finish --policy=integrator
   ```
   → 最新の **`FLOW-RECEIPT`**（`BG-RECEIPT` + `SEC-RECEIPT` 12/12 監査層 + `Tree-SHA` + `Kernel-SHA` 結合）を取得して完了報告。

---

## 5. 実行ロードマップ

| Phase | 作業内容 | 主な成果物・完了ゲート |
|---|---|---|
| **Phase 0** | `feat/feat-flow-v1-os` → `main` マージ → 新ブランチ作成 | `origin/main` 統合済、`feat/exam-v1-1-flow-auto` 稼働 |
| **Phase 1** | 48 実外部ソルバー導入 ＆ C++17 新ハーネス 2 基ビルド | `/tmp/tlx_env_manifest.json` **48/48 READY** |
| **Phase 2** | **THE LAST EXAM V1.1**（12 柱 / 48 エンジン / 1,080 テスト / 28 ロック）実装 | `exam.mjs selftest` **100% PASS (48/48, 1,080/1,080, 28/28)** |
| **Phase 3** | **「V1.1証明」** 暗号刻印・即時自動剥奪（CLI + 3D ビューア UI） | 刻印・0.001mm 剥奪・偽造阻止全検証 PASS |
| **Phase 4** | **Playground `PLYA V2.1`**（24 ソルバー / 256 項目 / 起動保証 / 刻印＆剥奪） | `tsc` 0 エラー・WebWorker 実動・`.tlx11.json` 往復検証 PASS |
| **Phase 5** | **FLOW V1.1 OS** (`flow auto` 6 大パイプライン / `flow macro` / `SEC-13` 36 攻撃) ＋ 2 冊説明書更新 | `flow selftest` (`sec=36/36`), `macro selftest`, 汎用移植テスト PASS |
| **Phase 6** | 全体ビルド・`pp1.1` 視覚監査・`SOKUTEI` 計測・`flow finish`・ウォークスルー報告 | 全スイート 100% PASS ＋ **`FLOW-RECEIPT`** 取得 |
