# CLAUDE.md — SONY-A7-IV-Diagram AI Instructions

> **重要指示**:
> 1. **作業保護 (`bg v1`)**: 必ず `AGENTS.md` §0 の 5 鉄則（`boot` → `start` → `snap` → `seal` → `gate` + `BG-RECEIPT`）を遵守すること。
> 2. **視覚確認 (`pp1.1`)**: UI・3D CAD・図説・解説・スマホ表示・Play Ground 1.1・6-DoF カメラ/断面検証は必ず **`pp1.1`**（`npm run pp -- ...`、詳細: `scripts/PP1_1_MANUAL.md`）を使用すること。
> 3. **性能・負荷計測 (`sokutei`)**: 全10領域/55+項目の一括またはカスタムベンチマーク測定は必ず **`sokutei`**（`npm run sokutei -- ...`、詳細: `scripts/SOKUTEI_MANUAL.md`）を使用すること。
> 4. **パーツ作業規約**: `catalog/WORKER_RULE.md` を厳守すること。

```bash
# pp1.1 (終了時は --daemon=stop)
npm run pp -- --warm --preset=audit --out=/tmp/pp_audit
npm run pp -- --warm --mode=cad --unit=evf --quality=ultra --az=35 --el=22 --section=x:0.52 --ssaa=2 --out=/tmp/pp_audit
npm run pp -- --daemon=stop

# sokutei (全項目 or カスタム項目)
npm run sokutei -- --all --out=/tmp/sokutei.json --md=/tmp/sokutei.md
npm run sokutei -- --target=v2_unit,pp,sim_app --compare=/tmp/sokutei_before.json
```

```bash
# Zero-Token AI開発パイプライン (dx) — 探索・外科読込・事前検証・1枚視覚シート
node scripts/dx.mjs brief --unit=evf --policy=worker
node scripts/dx.mjs find "evf-eyecup" && node scripts/dx.mjs read --head src/assemblies/types.ts
node scripts/dx.mjs preflight --unit=evf --ai && node scripts/dx.mjs check --changed --ai
node scripts/pp.mjs --preset=audit --fast --sheet --audit-metrics --ai --out=/tmp/pp_audit
```

