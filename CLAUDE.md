# CLAUDE.md — SONY-A7-IV-Diagram AI Instructions

> **重要指示**: UI・3D CAD・図説・解説・スマホ表示・Play Ground 1.1 の視覚確認が必要な時は、必ず専用の超高速画像キャプチャツール **`pp`**（`npm run pp -- ...`）を使用してください。詳細は `AGENTS.md` および `catalog/WORKER_RULE.md` を参照してください。

```bash
npm run pp -- --preset=audit --fast --out=/tmp/pp_audit
npm run pp -- --mode=ui|cad|diagram|explanation|full|custom --unit=welcome --quality=ultra --out=/tmp/pp_audit
npm run pp -- --preset=mobile --out=/tmp/pp_audit
npm run pp -- --preset=playground --out=/tmp/pp_audit
```

```bash
# Zero-Token AI開発パイプライン (dx) — 探索・外科読込・事前検証・1枚視覚シート
node scripts/dx.mjs brief --unit=evf --policy=worker
node scripts/dx.mjs find "evf-eyecup" && node scripts/dx.mjs read --head src/assemblies/types.ts
node scripts/dx.mjs preflight --unit=evf --ai && node scripts/dx.mjs check --changed --ai
node scripts/pp.mjs --preset=audit --fast --sheet --audit-metrics --ai --out=/tmp/pp_audit
```

