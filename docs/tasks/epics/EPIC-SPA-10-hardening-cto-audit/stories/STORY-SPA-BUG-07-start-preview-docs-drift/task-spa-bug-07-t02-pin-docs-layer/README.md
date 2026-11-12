# SPA-BUG-07-T02 — Pin: docs layer (not product runtime)

**Status:** Done — P3 PASS 2026-08-18T10:47:00Z  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) FR-BUG-07.1 · Pin rules  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:43:15Z  
**Package:** `pkg-000072`

## Purpose
Formalize pin = docs/example vs `package.json` `start` (D1/D2 CONFIRMED). Not product runtime, not CORS, not LoginPage. Anti-pattern: switching `package.json` `start` back to `vite preview`.

## Risk
Fix on product `start` / HL-02 breaks DEPLOY-02 / BUG-06 / Railway.

## Code Facts (re-verify at execute)

**As-of-Done / Current** (T03 `2026-08-18T10:48:03Z`):
- Pin files current: [`.env.example`](../../../../../../../.env.example) L54–61 three-lane · [`frontend-run-and-environment.md`](../../../../../../runtime-docs/frontend-run-and-environment.md) L42 `start-spa.mjs`.
- Vite preview: [`vite.config.js`](../../../../../../../vite.config.js) L7–8 `host` only — **no** `allowedHosts`.
- Deploy guide already `serve`: [`deploy-guide.md`](../../../../../../deploy-guide.md) L94 · L231 · L287 (troubleshooting «do not use preview in prod»).
- `railway.toml` L3 already «not vite preview».
- Disk `package.json` L10 `node scripts/start-spa.mjs` (do **not** revert to `vite preview`).

**Historical** (T02 pin `2026-08-18T10:47:00Z`, pre-T03):
- Pin files were stale L56–57 / L42 (`start` documented as `vite preview`).

## Pin note (FR-BUG-07.1)

Pinned layer = **docs / `.env.example` + runtime-docs** vs disk `package.json` `"start"`. Not Login/Board, not CORS, not HL-02, not BUG-06 wrapper rewrite. Anti-pattern: `package.json` `start` → `vite preview` **forbidden**.

## AC / DoD
- [x] (P0) Pin note in task README / gate: docs layer vs `package.json` L10 → backlog AC #1 · FR-BUG-07.1.
- [x] (P0) Do **not** switch `package.json` `start` to `vite preview`. Do not pin UI/CORS.

## Where to change
- Pin note in this README / T05 gate stub.
- No product code. No docs rewrite (T03).

## Out of scope
Pin UI / CORS; rollback DEPLOY-02; weaken `FORBIDDEN_LOCALHOST`; BUG-06/08 product.

## Verification
```bash
rg -n 'allowedHosts' spa-app/vite.config.js
rg -n 'serve -s dist' spa-app/package.json spa-app/railway.toml spa-app/docs/deploy-guide.md
rg -n '"start"' spa-app/package.json
```
