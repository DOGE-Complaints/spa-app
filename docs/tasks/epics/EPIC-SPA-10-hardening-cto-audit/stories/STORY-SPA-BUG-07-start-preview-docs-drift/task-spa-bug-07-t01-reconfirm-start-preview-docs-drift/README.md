# SPA-BUG-07-T01 — Reproduce: grep/example vs `package.json`

**Status:** Done — P3 PASS 2026-08-18T10:47:00Z  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) FR-BUG-07.1 · Diagnostic playbook  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:43:15Z  
**Package:** `pkg-000072`

## Purpose
Reproduce: `.env.example` / runtime-docs still document `start` as `vite preview` while disk `package.json` `start` is not `vite preview`. File compare / `rg` only — not runtime rediscovery.

## Risk
P3 without reconfirm pins the wrong layer (product `start` / HL-02).

## Code Facts (re-verify at execute)

**As-of-Done / Current** (T03 `2026-08-18T10:48:03Z`):
- Three-lane hosting block: [`.env.example`](../../../../../../../.env.example) L54–61 Lane A/B/C; `"start"` = `node scripts/start-spa.mjs` → `serve`.
- Runtime table: [`frontend-run-and-environment.md`](../../../../../../runtime-docs/frontend-run-and-environment.md) L42 `start-spa.mjs` + **Не** `vite preview`; sverka **2026-08-18**.
- Disk `start`: [`package.json`](../../../../../../../package.json) L10 `"start": "node scripts/start-spa.mjs"`.
- Disk `preview` / `dev`: L9 `vite preview` · L7 `vite`.

**Historical** (T01 reconfirm `2026-08-18T10:47:00Z`, pre-T03):
- Example `start` = `vite preview`: same `.env.example` L56–57 (then).
- Example cited `preview.allowedHosts`: L63 (then).
- Runtime manual stale L42 `npm run start` = `vite preview`.
- Evidence: [`reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md`](../../../../../run-reports/reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md) (keep present-tense snapshot).

## AC / DoD
- [x] (P0) Evidence note: example/runtime-docs ≠ disk `start` → FR-BUG-07.1 · backlog AC #1 (pin note evidence). Note: [`../../../../../run-reports/reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md`](../../../../../run-reports/reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md)
- [x] (P0) Do **not** treat D3 as root (BUG-06 H6 remains root). Do not dump secrets.

## Where to change
- Short reconfirm note under `spa-app/docs/tasks/run-reports/` or cite investigation §8.5 + this grep.
- No product code. No docs fix (T03).

## Out of scope
Rediscover D3 as root; dump secrets; T03 rewrite; BUG-05/06/08 product.

## Verification
```bash
cd spa-app
rg -n 'start.*vite preview|"start": vite preview' .env.example docs/runtime-docs/frontend-run-and-environment.md
rg -n '"start"' package.json
```
