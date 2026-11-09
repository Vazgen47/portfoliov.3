// Dependency-free sanity check:  npm run check
//  - every relative import resolves to a file
//  - every bare import is declared in package.json
//  - every "/assets/..." path referenced in src/ exists in public/
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const declared = new Set([...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})]);
const builtins = new Set(['node:fs', 'node:path', 'node:url']);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const files = walk(join(root, 'src')).filter((f) => /\.(js|jsx)$/.test(f));
const errors = [];
const importRe = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g;

for (const file of files) {
  // ignore comments so documentation examples are not treated as real references
  const src = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  let m;
  while ((m = importRe.exec(src))) {
    const spec = m[1] || m[2] || m[3];
    if (spec.startsWith('.')) {
      if (!existsSync(resolve(dirname(file), spec))) errors.push(`${file.replace(root, '')}: unresolved import ${spec}`);
    } else if (!builtins.has(spec)) {
      const name = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
      if (!declared.has(name)) errors.push(`${file.replace(root, '')}: "${name}" is not in package.json`);
    }
  }
  const assetRe = /['"`](\/assets\/[^'"`\s]+)['"`]/g;
  while ((m = assetRe.exec(src))) {
    if (!existsSync(join(root, 'public', m[1]))) errors.push(`${file.replace(root, '')}: missing asset ${m[1]}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK — ${files.length} source files checked.`);
