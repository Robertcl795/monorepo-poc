# Verification Guide

## Local commands

```bash
pnpm install
pnpm -w dev
pnpm -w lint
pnpm -w test
pnpm -w build
pnpm -w e2e
pnpm -w benchmark
```

## Expected URLs/ports

- Shell: http://localhost:4200
- Editor remote: http://localhost:4201
- Conv remote: http://localhost:4202
- VS remote: http://localhost:4203

## Common failure modes + fixes

- **Monaco workers fail in shell**: confirm `apps/remotes/editor` builds include `/assets/monaco` and that the editor remote is running on port 4201. The editor remote resolves workers from its own origin using `import.meta.url`.
- **Remote routes 404 on manual entry**: ensure `apps/shell/src/federation.manifest.json` matches the remote ports and that the shell built routes from `remote-registry.ts`.
- **Playwright e2e fails to start**: ensure `pnpm -w dev` starts all remotes and the shell on port 4200; Playwright uses the running dev server.
