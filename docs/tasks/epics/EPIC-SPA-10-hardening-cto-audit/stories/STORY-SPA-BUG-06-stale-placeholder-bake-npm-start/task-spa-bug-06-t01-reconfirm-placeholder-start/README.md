# SPA-BUG-06-T01 — Reconfirm placeholder `npm start` + board/login symptoms

**Status:** Done — P3 PASS 2026-08-18T10:18:16Z  

**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) FR-BUG-06.1 · Diagnostic playbook A  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:06:59Z  
**Package:** `pkg-000071`

## Purpose
Короткий **reconfirm**: `npm start` against current placeholder-or-public `dist` still fails local board/login **or** note «superseded by investigation 2026-08-18». Не полный rediscovery H1–H7.

## Risk
P3 без reconfirm/superseded-note чинит не тот слой (UI / CORS / HL-02).

## Code Facts (re-verify at execute)

**As-of-Done / Current** (T03 `2026-08-18T10:18:16Z`):
- `start` wrapper: [`package.json`](../../../../../../../package.json) L10 `"start": "node scripts/start-spa.mjs"` (refuse placeholder/unknown; spawn `serve` only after allow).
- `dev` reads `.env`: same file L7 `vite`.

**Historical** (pre-T03 / T01 reconfirm 2026-08-18):
- `start` served static `dist` blindly: L10 `serve -s dist -l tcp://0.0.0.0:${PORT:-4173}`.
- Pre-satisfied diagnosis: [`investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md`](../../../../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) H6 CONFIRMED.
- Optional needles: `rg 'gateway.example.invalid|project.supabase.co' dist/assets/*.js`.

## AC / DoD
- [x] (P0) Evidence / reconfirm note (или явная ссылка на investigation 2026-08-18) существует → FR-BUG-06.1 · backlog AC #1. Note: [`../../../../../../../run-reports/reconfirm-spa-bug-06-placeholder-start-2026-08-18.md`](../../../../../../../run-reports/reconfirm-spa-bug-06-placeholder-start-2026-08-18.md)
- [x] (P0) Do **not** dump `USER_PASSWORD` / anon JWT into notes.

## Where to change
- Evidence note under `spa-app/docs/analysis/` or `spa-app/docs/tasks/run-reports/` (local start / superseded cite)
- No product code

## Out of scope
Full rediscovery H1–H7; product fix (T03); dump secrets.

## Verification
```bash
cd spa-app
# If dist still has placeholder bake (pre-fix):
# npm start
# Browser :4173 #/board → board-load-error
# rg 'gateway.example.invalid|project.supabase.co' dist/assets/*.js
# Control: curl http://127.0.0.1:8000/tallinn/issues → 200 (gateway up)
# Or cite investigation 2026-08-18 as superseded reconfirm.
```
