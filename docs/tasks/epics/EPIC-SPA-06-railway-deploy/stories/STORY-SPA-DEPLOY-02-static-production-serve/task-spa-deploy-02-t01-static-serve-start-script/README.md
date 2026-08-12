# SPA-DEPLOY-02-T01 — Static serve start script

**Status:** Done  
**Closed:** 2026-07-09T11:00:50Z
**Story:** [`../STORY-SPA-DEPLOY-02-static-production-serve.md`](../STORY-SPA-DEPLOY-02-static-production-serve.md)  
**Decision Ref:** [`../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md`](../../../../../../backlog-stories/railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) §Scope A  
**Depends on:** — (first task in wave)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-09T10:37:10Z

## Purpose
Закрыть Scope **A**: заменить `npm start` — `vite preview` → static serve `dist/` (`serve -s dist -l $PORT`).

## Risk
Без static serve prod остаётся на dev-server `vite preview` с Host-check (`preview.allowedHosts`).

## Code Facts (re-verify at execute)
- [`package.json:10`](../../../../../../../../package.json) — `"start": "vite preview --host 0.0.0.0 --port ${PORT:-4173}"`.
- [`package.json`](../../../../../../../../package.json) — нет `serve` / `sirv-cli` в dependencies.
- [`package.json:8`](../../../../../../../../package.json) — `"build": "vite build"` → `dist/`.

## AC / DoD
- [x] (P0) Scope A: `npm start` запускает static serve `dist/` (не `vite preview`).
- [x] (P0) `npm run build && PORT=4173 npm start` отдаёт `dist/index.html` (curl `id="root"`).
- [x] (P1) Traceability: story AC #1 (`npm start` без vite preview), AC #3 (custom domain без allowedHosts — static serve не проверяет Host whitelist).

## Where to change
- [`spa-app/package.json`](../../../../../../../../package.json) — `scripts.start`, add `serve` dependency
- Run: `cd spa-app && npm install serve`

## Out of scope
- Railway.toml (T02). Docs (T03). Vite config (T04). Smoke script (T05).

## Verification
```bash
cd spa-app && npm run build && PORT=4173 npm start
# separate terminal:
curl -s http://127.0.0.1:4173/ | head -20
```
