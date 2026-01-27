// Remove codicon.ttf references to avoid esbuild font loader issues in federation builds.
const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'node_modules',
  'monaco-editor',
  'esm',
  'vs',
  'base',
  'browser',
  'ui',
  'codicons',
  'codicon',
  'codicon.css',
);

if (!fs.existsSync(target)) {
  console.log('[patch-monaco-font] codicon.css not found, skipping');
  process.exit(0);
}

const original = fs.readFileSync(target, 'utf8');
const patched = original.replace(
  /src:\s*url\(.*codicon\.ttf\).*;/,
  '/* codicon font handled via assets */',
);

if (patched !== original) {
  fs.writeFileSync(target, patched, 'utf8');
  console.log('[patch-monaco-font] patched codicon font reference');
} else {
  console.log('[patch-monaco-font] no changes needed');
}
