/**
 * `dx` Component 2B — Deterministic AST Knowledge Graph & Blast-Radius Atlas Builder
 *
 * Parses the entire TypeScript/CSS/Schematic/Material codebase in <0.5s using
 * the already-installed `typescript` AST compiler API (zero new dependencies)
 * and emits 7 deterministic, timestamp-free, sorted TSV indices under `catalog/code/`:
 *   1. catalog/code/MAP.tsv
 *   2. catalog/code/SYMBOLS.tsv
 *   3. catalog/code/GRAPH.tsv
 *   4. catalog/code/MATERIALS.tsv
 *   5. catalog/code/HELPERS.tsv
 *   6. catalog/code/SCHEMATICS.tsv
 *   7. catalog/code/CSS_INDEX.tsv
 */

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function cleanTsv(str, maxLen = 120) {
  const s = String(str ?? '')
    .replace(/[\t\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s.length > maxLen ? s.slice(0, maxLen - 1) + '…' : s;
}

function walkFiles(dirAbs, rootAbs, filterFn, out = []) {
  if (!fs.existsSync(dirAbs)) return out;
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true }).sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
  for (const ent of entries) {
    const abs = path.join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.git' || ent.name === 'dist' || ent.name === 'docs') continue;
      walkFiles(abs, rootAbs, filterFn, out);
    } else if (ent.isFile()) {
      const rel = toPosix(path.relative(rootAbs, abs));
      if (!filterFn || filterFn(rel, abs)) out.push(rel);
    }
  }
  return out;
}

function getLineSpan(sf, node) {
  const start = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const end = sf.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
  return { start, end };
}

function hasExportModifier(node) {
  if (!node.modifiers) return false;
  return node.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}

function formatSignature(sf, node) {
  const startPos = node.getStart(sf);
  const full = sf.text.slice(startPos, Math.min(node.getEnd(), startPos + 240));
  const firstBrace = full.indexOf('{');
  const firstEq = full.indexOf('=');
  if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
    const head = firstBrace >= 0 ? full.slice(0, firstBrace) : full.split('\n')[0];
    return cleanTsv(head, 110);
  }
  if (ts.isClassDeclaration(node)) {
    const head = firstBrace >= 0 ? full.slice(0, firstBrace) : full.split('\n')[0];
    return cleanTsv(head, 110);
  }
  if (ts.isInterfaceDeclaration(node)) {
    const head = firstBrace >= 0 ? full.slice(0, firstBrace) : full.split('\n')[0];
    return cleanTsv(head, 110);
  }
  if (ts.isTypeAliasDeclaration(node)) {
    if (ts.isUnionTypeNode(node.type) && node.type.types.length > 8) {
      return cleanTsv(
        `type ${node.name.text} = union(${node.type.types.length} members)`,
        110
      );
    }
    return cleanTsv(full.split('\n')[0], 110);
  }
  if (firstEq >= 0 && firstEq < 110) {
    return cleanTsv(full.slice(0, Math.min(full.length, firstEq + 36)), 110);
  }
  return cleanTsv(full.split('\n')[0], 110);
}

function extractSymbolsAndImports(sf, relFile, isHelperFile) {
  const symbols = [];
  const rawImports = [];

  function addSym(symbol, kind, node, sig) {
    const { start, end } = getLineSpan(sf, node);
    symbols.push({
      file: relFile,
      symbol,
      kind,
      start,
      end,
      signature: sig || formatSignature(sf, node),
    });
  }

  function visitTop(node) {
    // Static imports & re-exports
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      rawImports.push(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      rawImports.push(node.moduleSpecifier.text);
    }

    const exported = hasExportModifier(node);

    if (ts.isFunctionDeclaration(node) && node.name && (exported || isHelperFile)) {
      addSym(node.name.text, 'func', node);
    } else if (ts.isClassDeclaration(node) && node.name && exported) {
      addSym(node.name.text, 'class', node);
      for (const mem of node.members) {
        if ((ts.isMethodDeclaration(mem) || ts.isGetAccessorDeclaration(mem)) && mem.name) {
          const mName = mem.name.getText(sf);
          addSym(`${node.name.text}.${mName}`, 'method', mem);
        }
      }
    } else if (ts.isInterfaceDeclaration(node) && exported) {
      let sig = formatSignature(sf, node);
      // Annotate PartExplanation giant diagramType union count
      for (const mem of node.members) {
        if (
          ts.isPropertySignature(mem) &&
          mem.name &&
          mem.name.getText(sf) === 'diagramType' &&
          mem.type &&
          ts.isUnionTypeNode(mem.type)
        ) {
          sig = `${sig} [diagramType:${mem.type.types.length} members]`;
        }
      }
      addSym(node.name.text, 'interface', node, sig);
    } else if (ts.isTypeAliasDeclaration(node) && exported) {
      addSym(node.name.text, 'type', node);
    } else if (ts.isEnumDeclaration(node) && exported) {
      addSym(node.name.text, 'enum', node);
    } else if (ts.isVariableStatement(node) && exported) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          const isArrowFn =
            decl.initializer &&
            (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer));
          const kind = isArrowFn ? 'func' : 'const';
          const { start, end } = getLineSpan(sf, node);
          const declText = cleanTsv(decl.getText(sf).split('{')[0], 110);
          symbols.push({
            file: relFile,
            symbol: decl.name.text,
            kind,
            start,
            end,
            signature: declText,
          });
        }
      }
    }
  }

  // Collect dynamic `import('...')` anywhere in file
  function collectDynamicImports(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length >= 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      rawImports.push(node.arguments[0].text);
    }
    ts.forEachChild(node, collectDynamicImports);
  }

  for (const stmt of sf.statements) {
    visitTop(stmt);
  }
  collectDynamicImports(sf);

  return { symbols, rawImports };
}

function resolveImportPath(fromRel, spec, allFileSet) {
  if (!spec.startsWith('.')) return null;
  const baseDir = path.posix.dirname(fromRel);
  const joined = path.posix.normalize(path.posix.join(baseDir, spec));
  const candidates = [
    joined,
    `${joined}.ts`,
    `${joined}.tsx`,
    `${joined}.json`,
    `${joined}/index.ts`,
    joined.replace(/\.js$/, '.ts'),
  ];
  for (const c of candidates) {
    if (allFileSet.has(c)) return c;
  }
  return null;
}

function parseRegistryUnits(rootAbs) {
  const regPath = path.join(rootAbs, 'src/units/registry.ts');
  const unitFileToMode = new Map();
  const dataFileToMode = new Map();
  const allModes = [];
  if (!fs.existsSync(regPath)) return { unitFileToMode, dataFileToMode, allModes };

  const src = fs.readFileSync(regPath, 'utf8');
  const re =
    /unitId:\s*'([^']+)',\s*declaredPartCount:\s*(\d+),\s*loadMeta:\s*makeLazyJsonMetaLoader\('[^']+',\s*\(\)\s*=>\s*import\('\.\.\/data\/([^']+)'\)\),\s*load:\s*async\s*\(\)\s*=>\s*\(await import\('\.\/([^']+)'\)\)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const mode = m[1];
    const dataRel = `src/data/${m[3]}`;
    const unitRel = `src/units/${m[4]}.ts`;
    allModes.push(mode);
    unitFileToMode.set(unitRel, mode);
    dataFileToMode.set(dataRel, mode);
  }
  allModes.sort();
  return { unitFileToMode, dataFileToMode, allModes };
}

function extractMaterials(rootAbs) {
  const rows = [];

  // 1. ALL_MATERIAL_BUCKETS from src/core/resource_cache.ts
  const rcPath = path.join(rootAbs, 'src/core/resource_cache.ts');
  if (fs.existsSync(rcPath)) {
    const text = fs.readFileSync(rcPath, 'utf8');
    const sf = ts.createSourceFile('src/core/resource_cache.ts', text, ts.ScriptTarget.Latest, true);
    function findBuckets(node) {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === 'ALL_MATERIAL_BUCKETS' &&
        node.initializer &&
        ts.isArrayLiteralExpression(node.initializer)
      ) {
        for (const el of node.initializer.elements) {
          if (ts.isStringLiteral(el)) {
            const line = sf.getLineAndCharacterOfPosition(el.getStart(sf)).line + 1;
            rows.push({ kind: 'bucket', key: el.text, bucket: el.text, tint: '-', line });
          }
        }
      }
      ts.forEachChild(node, findBuckets);
    }
    findBuckets(sf);
  }

  // 2. CORE_MATERIAL_CATALOG & any material binding maps in src/core/v2_material_catalog.ts
  const mcPath = path.join(rootAbs, 'src/core/v2_material_catalog.ts');
  if (fs.existsSync(mcPath)) {
    const text = fs.readFileSync(mcPath, 'utf8');
    const sf = ts.createSourceFile('src/core/v2_material_catalog.ts', text, ts.ScriptTarget.Latest, true);
    const seen = new Set();
    function findCatalogProps(node) {
      if (
        ts.isPropertyAssignment(node) &&
        node.initializer &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        let bucket = null;
        let tint = '-';
        for (const p of node.initializer.properties) {
          if (!ts.isPropertyAssignment(p) || !p.name) continue;
          const pName = p.name.getText(sf);
          if (pName === 'bucket' && ts.isStringLiteral(p.initializer)) {
            bucket = p.initializer.text;
          } else if (pName === 'tint') {
            tint = cleanTsv(p.initializer.getText(sf), 24);
          }
        }
        if (bucket) {
          const key = node.name.getText(sf).replace(/^['"]|['"]$/g, '');
          if (!seen.has(key)) {
            seen.add(key);
            const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
            rows.push({ kind: 'mat', key, bucket, tint, line });
          }
        }
      }
      ts.forEachChild(node, findCatalogProps);
    }
    findCatalogProps(sf);
  }

  rows.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'bucket' ? -1 : 1;
    return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
  });
  return rows;
}

function extractSchematicsIndex(rootAbs, uiTsFiles) {
  // Map diagramType -> unit(s) from src/data/*.json
  const diagramToUnits = new Map();
  const dataDir = path.join(rootAbs, 'src/data');
  if (fs.existsSync(dataDir)) {
    for (const f of fs.readdirSync(dataDir).sort()) {
      if (!f.endsWith('.json')) continue;
      try {
        const j = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));
        const uid = j.unitId || f.replace(/\.json$/, '');
        if (!Array.isArray(j.parts)) continue;
        for (const p of j.parts) {
          if (!p.diagramType) continue;
          if (!diagramToUnits.has(p.diagramType)) diagramToUnits.set(p.diagramType, new Set());
          if (uid !== 'integrated' && uid !== 'camera_body') {
            diagramToUnits.get(p.diagramType).add(uid);
          } else if (diagramToUnits.get(p.diagramType).size === 0) {
            diagramToUnits.get(p.diagramType).add(uid);
          }
        }
      } catch {
        // ignore non-unit JSON
      }
    }
  }

  // Extract all declared diagramType union literals from diagram_types.gen.ts (or legacy types.ts)
  const declaredTypes = new Map(); // diagramType -> line
  const genTypesPath = path.join(rootAbs, 'src/assemblies/diagram_types.gen.ts');
  const typesPath = fs.existsSync(genTypesPath) ? genTypesPath : path.join(rootAbs, 'src/assemblies/types.ts');
  if (fs.existsSync(typesPath)) {
    const text = fs.readFileSync(typesPath, 'utf8');
    const sf = ts.createSourceFile(path.basename(typesPath), text, ts.ScriptTarget.Latest, true);
    const collectUnion = (uNode) => {
      for (const member of uNode.types) {
        if (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal)) {
          const line = sf.getLineAndCharacterOfPosition(member.getStart(sf)).line + 1;
          declaredTypes.set(member.literal.text, line);
        }
      }
    };
    function findDiagramUnion(node) {
      if (ts.isTypeAliasDeclaration(node) && node.name.text === 'DiagramType' && ts.isUnionTypeNode(node.type)) {
        collectUnion(node.type);
      } else if (
        ts.isPropertySignature(node) &&
        node.name &&
        node.name.getText(sf) === 'diagramType' &&
        node.type &&
        ts.isUnionTypeNode(node.type)
      ) {
        collectUnion(node.type);
      }
      ts.forEachChild(node, findDiagramUnion);
    }
    findDiagramUnion(sf);
  }

  // Scan all schematic TS files under src/ui/
  const implByDiagram = new Map(); // diagramType -> { file, func, start, end }
  const schematicFiles = uiTsFiles.filter(
    (rel) =>
      rel.includes('Schematic') ||
      rel.includes('schematic') ||
      rel.includes('HdSchematics')
  );

  for (const rel of schematicFiles) {
    const abs = path.join(rootAbs, rel);
    const text = fs.readFileSync(abs, 'utf8');
    const sf = ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true);

    function visit(node, currentFunc) {
      let fnName = currentFunc;
      if (ts.isFunctionDeclaration(node) && node.name) {
        fnName = node.name.text;
      } else if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer &&
        (ts.isArrowFunction(node.initializer) ||
          ts.isFunctionExpression(node.initializer) ||
          ts.isObjectLiteralExpression(node.initializer))
      ) {
        fnName = node.name.text;
      }

      if (ts.isCaseClause(node) && ts.isStringLiteral(node.expression)) {
        const dt = node.expression.text;
        const { start, end } = getLineSpan(sf, node);
        // Prefer specific schematic file over schematicsRegistry.ts fallback
        const existing = implByDiagram.get(dt);
        if (!existing || existing.file === 'src/ui/schematicsRegistry.ts') {
          implByDiagram.set(dt, { file: rel, func: fnName || '-', start, end });
        }
      } else if (
        ts.isPropertyAssignment(node) &&
        (ts.isStringLiteral(node.name) || ts.isIdentifier(node.name))
      ) {
        const key = ts.isStringLiteral(node.name) ? node.name.text : node.name.text;
        if (declaredTypes.has(key) || diagramToUnits.has(key)) {
          const { start, end } = getLineSpan(sf, node);
          const existing = implByDiagram.get(key);
          if (!existing || existing.file === 'src/ui/schematicsRegistry.ts') {
            implByDiagram.set(key, { file: rel, func: fnName || '-', start, end });
          }
        }
      } else if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken
      ) {
        let lit = null;
        if (ts.isStringLiteral(node.right)) lit = node.right.text;
        else if (ts.isStringLiteral(node.left)) lit = node.left.text;
        if (lit && (declaredTypes.has(lit) || diagramToUnits.has(lit))) {
          const parentStmt = node.parent && ts.isIfStatement(node.parent) ? node.parent : node;
          const { start, end } = getLineSpan(sf, parentStmt);
          if (!implByDiagram.has(lit)) {
            implByDiagram.set(lit, { file: rel, func: fnName || '-', start, end });
          }
        }
      }

      ts.forEachChild(node, (child) => visit(child, fnName));
    }

    visit(sf, '-');
  }

  const allDiagramTypes = new Set([
    ...declaredTypes.keys(),
    ...implByDiagram.keys(),
    ...diagramToUnits.keys(),
  ]);

  const rows = [];
  for (const dt of [...allDiagramTypes].sort()) {
    const impl = implByDiagram.get(dt);
    const units = diagramToUnits.get(dt);
    const unitHint = units && units.size > 0 ? [...units].sort().join(',') : '-';
    const typeLine = declaredTypes.get(dt) || 0;
    rows.push({
      diagram_type: dt,
      file: impl ? impl.file : `UNMAPPED(types.ts:${typeLine})`,
      func: impl ? impl.func : '-',
      start: impl ? impl.start : typeLine,
      end: impl ? impl.end : typeLine,
      unit_hint: unitHint,
    });
  }
  return rows;
}

function extractCssIndex(rootAbs) {
  const cssRel = 'src/styles/main.css';
  const abs = path.join(rootAbs, cssRel);
  if (!fs.existsSync(abs)) return [];
  const text = fs.readFileSync(abs, 'utf8');
  const rules = [];

  let i = 0;
  const len = text.length;
  let line = 1;
  const atStack = []; // { kind, header, depth }
  let depth = 0;

  let selBuf = '';
  let selStartLine = 1;
  let inRule = false;
  let ruleSelector = '';
  let ruleMedia = '-';
  let ruleStart = 1;
  let ruleDepth = 0;
  let ruleSemiCount = 0;

  while (i < len) {
    const ch = text[i];
    const next = text[i + 1];

    // Skip /* ... */ comments
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < len && !(text[i] === '*' && text[i + 1] === '/')) {
        if (text[i] === '\n') line++;
        i++;
      }
      i += 2;
      continue;
    }

    // Skip strings
    if (ch === '"' || ch === "'") {
      const q = ch;
      if (!inRule) selBuf += ch;
      i++;
      while (i < len && text[i] !== q) {
        if (text[i] === '\\') {
          if (!inRule) selBuf += text[i] + (text[i + 1] || '');
          if (text[i + 1] === '\n') line++;
          i += 2;
          continue;
        }
        if (text[i] === '\n') line++;
        if (!inRule) selBuf += text[i];
        i++;
      }
      if (i < len) {
        if (!inRule) selBuf += text[i];
        i++;
      }
      continue;
    }

    if (ch === '\n') {
      line++;
      if (!inRule) selBuf += ' ';
      i++;
      continue;
    }

    if (ch === '{') {
      depth++;
      const header = selBuf.replace(/\s+/g, ' ').trim();
      if (!inRule) {
        if (header.startsWith('@media') || header.startsWith('@supports') || header.startsWith('@container')) {
          atStack.push({ header, depth });
        } else if (header.startsWith('@keyframes') || header.startsWith('@-webkit-keyframes')) {
          inRule = true;
          ruleSelector = header;
          ruleMedia = atStack.length > 0 ? atStack.map((a) => a.header).join(' & ') : '-';
          ruleStart = selStartLine;
          ruleDepth = depth;
          ruleSemiCount = 0;
        } else if (header.length > 0) {
          inRule = true;
          ruleSelector = header;
          ruleMedia = atStack.length > 0 ? atStack.map((a) => a.header).join(' & ') : '-';
          ruleStart = selStartLine;
          ruleDepth = depth;
          ruleSemiCount = 0;
        }
      }
      selBuf = '';
      selStartLine = line;
      i++;
      continue;
    }

    if (ch === '}') {
      if (inRule && depth === ruleDepth) {
        rules.push({
          selector: cleanTsv(ruleSelector, 140),
          media: cleanTsv(ruleMedia, 90),
          start: ruleStart,
          end: line,
          props_count: Math.max(1, ruleSemiCount),
        });
        inRule = false;
      } else if (atStack.length > 0 && atStack[atStack.length - 1].depth === depth) {
        atStack.pop();
      }
      depth = Math.max(0, depth - 1);
      selBuf = '';
      selStartLine = line;
      i++;
      continue;
    }

    if (ch === ';') {
      if (inRule) {
        ruleSemiCount++;
      } else {
        // top-level @import / @charset etc.
        selBuf = '';
        selStartLine = line;
      }
      i++;
      continue;
    }

    if (!inRule) {
      if (selBuf.trim().length === 0 && !/\s/.test(ch)) {
        selStartLine = line;
      }
      selBuf += ch;
    }
    i++;
  }

  return rules;
}

/**
 * Build all 7 deterministic code atlas TSVs under `catalog/code/`.
 */
export function buildCodeAtlas(opts = {}) {
  const t0 = performance.now();
  const rootAbs = path.resolve(opts.root || process.cwd());
  const codeDir = path.join(rootAbs, 'catalog', 'code');
  fs.mkdirSync(codeDir, { recursive: true });

  const srcTsFiles = walkFiles(path.join(rootAbs, 'src'), rootAbs, (rel) => rel.endsWith('.ts'));
  const srcJsonFiles = walkFiles(path.join(rootAbs, 'src'), rootAbs, (rel) => rel.endsWith('.json'));
  const srcCssFiles = walkFiles(path.join(rootAbs, 'src'), rootAbs, (rel) => rel.endsWith('.css'));
  const scriptFiles = walkFiles(path.join(rootAbs, 'scripts'), rootAbs, (rel) =>
    rel.endsWith('.mjs') || rel.endsWith('.js')
  );

  const allResolvable = new Set([...srcTsFiles, ...srcJsonFiles, ...srcCssFiles]);
  const helperFileSet = new Set([
    'src/engine/CadHelpers.ts',
    'src/engine/FastCadGeometry.ts',
    'src/engine/UltraDetailBuilders.ts',
    'src/core/geometry_quality.ts',
  ]);

  const { unitFileToMode, dataFileToMode, allModes } = parseRegistryUnits(rootAbs);

  const allSymbols = [];
  const helperSymbols = [];
  const forwardDeps = new Map(); // file -> Set<depFile>
  const reverseDeps = new Map(); // file -> Set<importerFile>
  const dirStats = new Map(); // dir -> { files, lines, bytes, names }

  const recordDirStat = (rel, text, bytes) => {
    const dir = path.posix.dirname(rel);
    const area = rel.startsWith('scripts/')
      ? 'scripts'
      : rel.startsWith('src/assemblies/')
        ? 'assemblies'
        : rel.startsWith('src/ui/')
          ? 'ui'
          : rel.startsWith('src/core/')
            ? 'core'
            : rel.startsWith('src/engine/')
              ? 'engine'
              : rel.startsWith('src/units/')
                ? 'units'
                : rel.startsWith('src/data/')
                  ? 'data'
                  : rel.startsWith('src/playground/')
                    ? 'playground'
                    : rel.startsWith('src/styles/')
                      ? 'styles'
                      : 'app';
    const key = `${area}\t${dir}`;
    let st = dirStats.get(key);
    if (!st) {
      st = { area, dir, files: 0, lines: 0, bytes: 0, sample: [] };
      dirStats.set(key, st);
    }
    st.files++;
    st.lines += text ? text.split('\n').length : 0;
    st.bytes += bytes;
    if (st.sample.length < 4) st.sample.push(path.posix.basename(rel));
  };

  for (const rel of srcTsFiles) {
    const abs = path.join(rootAbs, rel);
    const text = fs.readFileSync(abs, 'utf8');
    recordDirStat(rel, text, Buffer.byteLength(text, 'utf8'));

    const sf = ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true);
    const isHelper = helperFileSet.has(rel);
    const { symbols, rawImports } = extractSymbolsAndImports(sf, rel, isHelper);

    for (const s of symbols) {
      allSymbols.push(s);
      if (isHelper) helperSymbols.push(s);
    }

    const deps = new Set();
    for (const spec of rawImports) {
      const resolved = resolveImportPath(rel, spec, allResolvable);
      if (resolved && resolved !== rel) {
        deps.add(resolved);
        if (!reverseDeps.has(resolved)) reverseDeps.set(resolved, new Set());
        reverseDeps.get(resolved).add(rel);
      }
    }
    forwardDeps.set(rel, deps);
  }

  for (const rel of [...srcJsonFiles, ...srcCssFiles, ...scriptFiles]) {
    const abs = path.join(rootAbs, rel);
    const stat = fs.statSync(abs);
    // Avoid reading huge minified JSONs line-by-line unnecessarily
    let lineCountText = '';
    if (stat.size < 2_000_000) {
      lineCountText = fs.readFileSync(abs, 'utf8');
    }
    recordDirStat(rel, lineCountText, stat.size);
  }

  // Compute transitive affected units for every file via reverse BFS
  const allGraphNodes = [...new Set([...srcTsFiles, ...srcJsonFiles])].sort();
  const graphRows = [];
  for (const rel of allGraphNodes) {
    const visited = new Set([rel]);
    const queue = [rel];
    const affected = new Set();

    while (queue.length > 0) {
      const cur = queue.shift();
      if (unitFileToMode.has(cur)) affected.add(unitFileToMode.get(cur));
      if (dataFileToMode.has(cur)) affected.add(dataFileToMode.get(cur));
      const importers = reverseDeps.get(cur);
      if (importers) {
        for (const imp of importers) {
          // Do not propagate upward through registry.ts (it references all units lazily)
          if (imp === 'src/units/registry.ts') continue;
          if (!visited.has(imp)) {
            visited.add(imp);
            queue.push(imp);
          }
        }
      }
    }

    const importsList = [...(forwardDeps.get(rel) || [])].sort();
    const importersList = [...(reverseDeps.get(rel) || [])].sort();
    const affectedList = [...affected].sort();
    const affectedStr =
      affectedList.length === 0
        ? '-'
        : affectedList.length >= allModes.length && allModes.length > 0
          ? `*ALL(${allModes.length})`
          : affectedList.join(',');

    graphRows.push(
      [
        rel,
        importsList.length > 0 ? importsList.join(',') : '-',
        importersList.length > 0 ? importersList.join(',') : '-',
        affectedStr,
      ].join('\t')
    );
  }

  // 1. MAP.tsv
  const mapRows = ['area\tdir\tfiles\tlines\tbytes\tkey_files'];
  for (const st of [...dirStats.values()].sort((a, b) =>
    a.area !== b.area ? (a.area < b.area ? -1 : 1) : a.dir < b.dir ? -1 : 1
  )) {
    mapRows.push(
      [st.area, st.dir, st.files, st.lines, st.bytes, st.sample.join(',')].join('\t')
    );
  }

  // 2. SYMBOLS.tsv
  allSymbols.sort((a, b) =>
    a.file !== b.file
      ? a.file < b.file
        ? -1
        : 1
      : a.start !== b.start
        ? a.start - b.start
        : a.symbol < b.symbol
          ? -1
          : 1
  );
  const symbolRows = ['file\tsymbol\tkind\tstart\tend\tsignature'];
  for (const s of allSymbols) {
    symbolRows.push([s.file, s.symbol, s.kind, s.start, s.end, s.signature].join('\t'));
  }

  // 3. GRAPH.tsv
  const graphContent = `file\timports\timporters\taffected_units\n${graphRows.join('\n')}\n`;

  // 4. MATERIALS.tsv
  const materials = extractMaterials(rootAbs);
  const matRows = ['kind\tkey\tbucket\ttint\tline'];
  for (const m of materials) {
    matRows.push([m.kind, m.key, m.bucket, m.tint, m.line].join('\t'));
  }

  // 5. HELPERS.tsv
  helperSymbols.sort((a, b) =>
    a.file !== b.file ? (a.file < b.file ? -1 : 1) : a.start - b.start
  );
  const helperRows = ['file\tsymbol\tkind\tstart\tend\tsignature'];
  for (const h of helperSymbols) {
    helperRows.push([h.file, h.symbol, h.kind, h.start, h.end, h.signature].join('\t'));
  }

  // 6. SCHEMATICS.tsv
  const uiTsFiles = srcTsFiles.filter((r) => r.startsWith('src/ui/'));
  const schematics = extractSchematicsIndex(rootAbs, uiTsFiles);
  const schemRows = ['diagram_type\tfile\tfunc\tstart\tend\tunit_hint'];
  for (const sc of schematics) {
    schemRows.push(
      [sc.diagram_type, sc.file, sc.func, sc.start, sc.end, sc.unit_hint].join('\t')
    );
  }

  // 7. CSS_INDEX.tsv
  const cssRules = extractCssIndex(rootAbs);
  const cssRows = ['selector\tmedia\tstart\tend\tprops_count'];
  for (const r of cssRules) {
    cssRows.push([r.selector, r.media, r.start, r.end, r.props_count].join('\t'));
  }

  // 8. DEFECT_MAP.tsv (O(1) partId -> unit, json_line, pose_file for FLOW V1 OS)
  const defectRows = ['part_id\tunit\tcode\tjson_loc\tpose_file'];
  const dataDirAbs = path.join(rootAbs, 'src/data');
  if (fs.existsSync(dataDirAbs)) {
    const jsonFiles = fs.readdirSync(dataDirAbs).filter((f) => f.endsWith('.json')).sort();
    for (const jf of jsonFiles) {
      const abs = path.join(dataDirAbs, jf);
      const raw = fs.readFileSync(abs, 'utf8');
      let parsed;
      try { parsed = JSON.parse(raw); } catch { continue; }
      if (!parsed?.unitId || !Array.isArray(parsed.parts)) continue;
      const lines = raw.split('\n');
      const lineById = new Map();
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/"id"\s*:\s*"([^"]+)"/);
        if (m && !lineById.has(m[1])) lineById.set(m[1], i + 1);
      }
      const poseRel = `src/units/${parsed.unitId}.pose.tsv`;
      const hasPose = fs.existsSync(path.join(rootAbs, poseRel));
      for (const p of parsed.parts) {
        const ln = lineById.get(p.id) || 1;
        const codeM = String(p.title || '').match(/^([A-Z0-9-]+)\./);
        defectRows.push([p.id, parsed.unitId, codeM ? codeM[1] : '-', `src/data/${jf}:${ln}`, hasPose ? poseRel : '-'].join('\t'));
      }
    }
  }

  const outputs = [
    ['MAP.tsv', `${mapRows.join('\n')}\n`],
    ['SYMBOLS.tsv', `${symbolRows.join('\n')}\n`],
    ['GRAPH.tsv', graphContent],
    ['MATERIALS.tsv', `${matRows.join('\n')}\n`],
    ['HELPERS.tsv', `${helperRows.join('\n')}\n`],
    ['SCHEMATICS.tsv', `${schemRows.join('\n')}\n`],
    ['CSS_INDEX.tsv', `${cssRows.join('\n')}\n`],
    ['DEFECT_MAP.tsv', `${defectRows.join('\n')}\n`],
  ];

  const fileStats = {};
  let totalBytes = 0;
  for (const [name, content] of outputs) {
    const abs = path.join(codeDir, name);
    fs.writeFileSync(abs, content, 'utf8');
    const b = Buffer.byteLength(content, 'utf8');
    totalBytes += b;
    fileStats[name] = {
      bytes: b,
      rows: content.trim().split('\n').length - 1,
    };
  }

  const elapsedMs = Math.round(performance.now() - t0);
  return {
    elapsedMs,
    totalBytes,
    tsFiles: srcTsFiles.length,
    symbols: allSymbols.length,
    graphNodes: allGraphNodes.length,
    materials: materials.length,
    buckets: materials.filter((m) => m.kind === 'bucket').length,
    matKeys: materials.filter((m) => m.kind === 'mat').length,
    helpers: helperSymbols.length,
    schematics: schematics.length,
    mappedSchematics: schematics.filter((s) => !s.file.startsWith('UNMAPPED')).length,
    cssRules: cssRules.length,
    files: fileStats,
  };
}
