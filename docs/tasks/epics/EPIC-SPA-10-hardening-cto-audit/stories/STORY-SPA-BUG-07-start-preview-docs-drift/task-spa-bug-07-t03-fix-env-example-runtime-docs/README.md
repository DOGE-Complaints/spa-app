# SPA-BUG-07-T03 — Fix `.env.example` + runtime-docs (three lanes)

**Status:** Done — P3 PASS 2026-08-18T10:48:03Z  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) FR-BUG-07.2 / 07.3 / 07.4 / 07.6  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:43:15Z  
**Package:** `pkg-000072`

## Purpose
Fix pinned docs: `.env.example` hosting block three-lane SSOT; runtime-docs command table matches `package.json`; optional one-line investigation §8.5. Do **not** invent a fourth runbook. Do **not** rewrite deploy-guide as a second truth.

## Risk
Fourth operator bible; claiming `start` = `vite preview`; weakening HL-02 so docs say local `start` after bake gate.

## Code Facts (re-verify at execute)
- Hosting block three-lane: [`.env.example`](../../../../../../../.env.example) Lane A/B/C; `"start"` = `node scripts/start-spa.mjs`.
- Runtime table: [`frontend-run-and-environment.md`](../../../../../../runtime-docs/frontend-run-and-environment.md) matches disk; sverka **2026-08-18**.
- Disk `start` unchanged: [`package.json`](../../../../../../../package.json) L10 `node scripts/start-spa.mjs`.
- Investigation §8.5 Docs drift **addressed** (one-line).
- Deploy-guide not rewritten.

## AC / DoD
- [x] (P0) `.env.example` three-lane block present; L56–63 match `serve` / `preview` split → FR-BUG-07.2/07.3 · backlog AC #2.
- [x] (P0) `frontend-run-and-environment.md` L38–42 (or successor table) matches `package.json` · refresh sverka date → FR-BUG-07.4 · backlog AC #3.
- [x] (P0) Investigation §8.5 one-line cross-link (no duplicate essay) → FR-BUG-07.6.
- [x] (P0) Docs match disk L10 wrapper + spawn `serve`; do not invent a fourth lane. Do not rewrite deploy-guide. Do not change `start-spa.mjs` / classifier (BUG-06).

## Where to change
- `spa-app/.env.example` hosting block
- `spa-app/docs/runtime-docs/frontend-run-and-environment.md` command table + sverka date
- Optional one-line in investigation §8.5

## Out of scope
Fourth runbook; rewrite deploy-guide; BUG-06/08 product; weaken HL-02; `railway.toml` `buildCommand`.

## Verification
```bash
rg -n 'vite preview|allowedHosts|npm run dev|verify:build:env-bake|start-spa.mjs|serve -s dist' spa-app/.env.example spa-app/docs/runtime-docs/frontend-run-and-environment.md
rg -n '"start"' spa-app/package.json
```
