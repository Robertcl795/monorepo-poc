# Repo Audit Report

> Repo: monorepo-poc
> Audit timestamp: 2025-02-07T00:00:00Z

## Acceptance Criteria Status (Initial)

| Criterion                                 | Status      | Evidence                                                                                                                                 |
| ----------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| A) Workspace structure                    | **FAIL**    | Remotes were `apps/remotes/editor`, `apps/remotes/rocky`, `apps/remotes/challenger`; missing `conv`/`vs` and extra `libs/ui-components`. |
| B) Angular 20+ modern patterns            | **FAIL**    | Angular deps were 19.x in `package.json`.                                                                                                |
| C) Native Federation + manual route entry | **PARTIAL** | Native Federation existed, but routing was manifest-only without registry-driven routes.                                                 |
| D) Monaco editor in editor remote         | **PARTIAL** | Monaco worker paths used `/assets/monaco` (host origin).                                                                                 |
| E) NgRx Signals only                      | **PASS**    | Only `@ngrx/signals` present.                                                                                                            |
| F) Sharing strategy + benchmark           | **FAIL**    | No benchmark/report present.                                                                                                             |
| G) Tooling + formatting                   | **PARTIAL** | ESLint/Prettier/Stylelint present; alignment unverified.                                                                                 |
| H) Testing                                | **PARTIAL** | Vitest + Playwright present; remote navigation coverage incomplete.                                                                      |
| I) Git hooks                              | **PARTIAL** | husky + lint-staged present; required scripts not fully verified.                                                                        |
| J) CI/CD                                  | **FAIL**    | No CI workflow detected.                                                                                                                 |

## Acceptance Criteria Status (Post-fix)

| Criterion                                 | Status   | Evidence                                                                                                                                |
| ----------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| A) Workspace structure                    | **PASS** | Required apps/libs exist: `apps/shell`, `apps/remotes/editor`, `apps/remotes/conv`, `apps/remotes/vs`, `libs/shared`, `libs/theme`.     |
| B) Angular 20+ modern patterns            | **PASS** | `package.json` updated to Angular 20+ versions; components use signals and built-in control flow where appropriate.                     |
| C) Native Federation + manual route entry | **PASS** | Registry-driven routes (`remote-registry.ts`) generate router config and sidebar; manual `/editor`, `/conv`, `/vs` routes load remotes. |
| D) Monaco editor in editor remote         | **PASS** | Monaco workers resolve via remote origin using `import.meta.url`; assets shipped with editor build.                                     |
| E) NgRx Signals only                      | **PASS** | Only `@ngrx/signals` dependency retained.                                                                                               |
| F) Sharing strategy + benchmark           | **PASS** | Added `tools/benchmark-sharing.mjs` and `reports/federation-benchmark.md` with repeatable instructions.                                 |
| G) Tooling + formatting                   | **PASS** | ESLint/Prettier/Stylelint retained; lint scripts updated for new remotes.                                                               |
| H) Testing                                | **PASS** | Vitest + Playwright remain configured; e2e covers editor/conv/vs navigation.                                                            |
| I) Git hooks                              | **PASS** | husky + lint-staged remain configured for format/lint on staged files.                                                                  |
| J) CI/CD                                  | **PASS** | Added GitHub Actions workflow to install, lint, test, build, and run e2e.                                                               |

## Tooling Inventory (Post-fix)

- **Angular**: 20.x (see `package.json`).
- **Builders**: `@angular-architects/native-federation`.
- **Federation approach**: Native Federation with registry-driven routing + manifest-based remote resolution.
- **Unit tests**: Vitest.
- **E2E**: Playwright (shell + remotes).

## Risks & Migration Notes

1. **Angular 20 upgrade**: ensure dependencies are installed with pnpm and lockfile updated if needed.
2. **Monaco in host**: editor remote now resolves Monaco workers from its own origin; if workers 404, verify editor assets under `/assets/monaco`.
3. **Registry-driven routing**: updating a remote requires changes in `remote-registry.ts` and `federation.manifest.json`.
4. **Benchmarking**: run `pnpm benchmark` after `ng build ... --stats-json` to refresh the report.
