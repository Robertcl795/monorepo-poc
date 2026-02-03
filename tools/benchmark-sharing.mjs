import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const apps = ['shell', 'editor', 'conv', 'vs'];
const distRoot = 'dist';
const reportDir = 'reports';
const reportPath = join(reportDir, 'federation-benchmark.md');

const packageMatchers = [
  { name: '@angular', match: /node_modules\/(@angular\/[^/]+)/ },
  { name: 'rxjs', match: /node_modules\/(rxjs)(?:\/|$)/ },
  { name: '@ngrx/signals', match: /node_modules\/(@ngrx\/signals)(?:\/|$)/ },
];

const statsByApp = new Map();

for (const app of apps) {
  const statsPath = join(distRoot, app, 'stats.json');
  if (!existsSync(statsPath)) continue;
  const raw = JSON.parse(readFileSync(statsPath, 'utf-8'));
  const modules = Array.isArray(raw.modules) ? raw.modules : [];
  const moduleNames = modules.map((mod) => mod.name || mod.identifier || '').filter(Boolean);
  statsByApp.set(app, moduleNames);
}

if (!existsSync(reportDir)) {
  mkdirSync(reportDir, { recursive: true });
}

if (statsByApp.size === 0) {
  writeFileSync(
    reportPath,
    `# Federation Sharing Benchmark\n\n` +
      `No stats.json files were found. Run the following to generate them:\n\n` +
      `\
- pnpm ng build shell --stats-json\n` +
      `- pnpm ng build editor --stats-json\n` +
      `- pnpm ng build conv --stats-json\n` +
      `- pnpm ng build vs --stats-json\n\n` +
      `Then re-run: \`pnpm benchmark\` to generate the duplication report.\n`,
  );
  console.log(`Wrote placeholder benchmark report to ${reportPath}`);
  process.exit(0);
}

const rows = [];
for (const [app, modules] of statsByApp.entries()) {
  const row = { app };
  for (const matcher of packageMatchers) {
    const found = new Set();
    for (const name of modules) {
      const match = name.match(matcher.match);
      if (match) {
        found.add(match[1]);
      }
    }
    row[matcher.name] = found.size;
  }
  rows.push(row);
}

const header = `| App | ${packageMatchers.map((m) => m.name).join(' | ')} |`;
const divider = `| --- | ${packageMatchers.map(() => '---').join(' | ')} |`;
const tableRows = rows
  .map((row) => `| ${row.app} | ${packageMatchers.map((m) => row[m.name]).join(' | ')} |`)
  .join('\n');

writeFileSync(
  reportPath,
  `# Federation Sharing Benchmark\n\n` +
    `This report summarizes how many distinct framework packages are bundled per app build.\n\n` +
    `${header}\n${divider}\n${tableRows}\n\n` +
    `## Notes\n` +
    `- Lower counts across remotes indicate better sharing (fewer duplicated framework packages).\n` +
    `- To compare against an Nx baseline, run the same builds in that repo and compare this table.\n`,
);

console.log(`Wrote benchmark report to ${reportPath}`);
