# SPA-BUG-07-T04 — Regression grep (FR-BUG-07.7)

**Status:** Done — P3 PASS 2026-08-18T10:48:03Z  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) FR-BUG-07.7  
**Depends on:** T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:43:15Z  
**Package:** `pkg-000072`

## Purpose
Regression: in `spa-app/.env.example` and `spa-app/docs/**/*.md`, `npm start` / `"start"` is **not** documented as `vite preview` except historical analysis/audit quotes and explicit «do not use preview in prod» troubleshooting.

## Risk
Failing the gate on historical analysis quotes or deploy-guide troubleshooting lines.

## Code Facts (re-verify at execute)
- `.env.example`: no `start` = `vite preview` (three-lane block).
- Runtime-docs L42: `start` = `start-spa.mjs` · **Не** `vite preview` (negation, not normative start=preview).
- Allowed leftovers: analysis/audit historical · deploy-guide L287 «do not use preview in prod» · railway.toml L3 «not vite preview».
- Disk `"start"` still `node scripts/start-spa.mjs`.

## AC / DoD
- [x] (P0) No remaining **normative** `start` = `vite preview` in `.env.example` or runtime-docs → FR-BUG-07.7 · backlog AC #4.
- [x] (P0) Do **not** fail on historical analysis/audit quotes or explicit prod-troubleshooting «do not use preview».

## Where to change
- Evidence in T05 gate (`rg` commands). Fix leftover normative hits in T03 files if grep finds them.

## Out of scope
Fail on historical quotes; fail on deploy-guide troubleshooting; product scripts.

## Verification
```bash
rg -n 'start.*vite preview|"start": vite preview|npm run start.*vite preview' spa-app/.env.example spa-app/docs/runtime-docs/frontend-run-and-environment.md
rg -n 'serve -s dist' spa-app/package.json spa-app/railway.toml spa-app/docs/deploy-guide.md
```
