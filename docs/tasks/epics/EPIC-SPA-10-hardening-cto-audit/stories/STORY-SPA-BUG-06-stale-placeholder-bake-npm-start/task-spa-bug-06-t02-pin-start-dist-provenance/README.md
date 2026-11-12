# SPA-BUG-06-T02 — Pin start × dist provenance (H6)

**Status:** Done — P3 PASS 2026-08-18T10:18:16Z  

**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) FR-BUG-06.2 · Diagnostic playbook B  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:06:59Z  
**Package:** `pkg-000071`

## Purpose
Formalize pin = SPA start / dist provenance. H6 already CONFIRMED — write pin note in task README / gate (не CORS, не LoginPage, не gateway).

## Risk
Fix на неверном слое (weaken `FORBIDDEN_LOCALHOST` / patch Login/Board) ломает HL-02 / BUG-05 / Railway.

## Code Facts (re-verify at execute)

**As-of-Done / Current** (T03 `2026-08-18T10:18:16Z`):
- `start` wrapper: [`package.json`](../../../../../../../package.json) L10 `"start": "node scripts/start-spa.mjs"`.

**Historical** (pre-T03):
- Blind `start`: same L10 `serve -s dist`.

- HL-02 needles unchanged: [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) L7–14 `FORBIDDEN_LOCALHOST`.
- Login mapping is correct as written: [`mapAuthError.js`](../../../../../../../src/auth/mapAuthError.js) L15–20 · [`LoginPage.jsx`](../../../../../../../src/pages/LoginPage.jsx) L184–198.
- Board mapping is correct as written: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L87–112 · L300 `data-testid="board-load-error"`.
- H6 CONFIRMED: [`investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md`](../../../../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md).

## AC / DoD
- [x] (P0) Pin layer = SPA start / dist provenance (зафиксирован в gate note) → FR-BUG-06.2 · backlog AC #2.
- [x] (P0) Pin rules recorded: do not disable bake gate; do not weaken `FORBIDDEN_LOCALHOST`; do not patch Login/Board as the login fix.

## Pin (write at execute)

| Observation | Pin layer | Fix direction |
|-------------|-----------|---------------|
| `serve` + placeholder/public bake + operator `.env` localhost | **SPA start / dist provenance** | Fail-fast on incompatible bake; write bake metadata from the **artifact** |
| Patch LoginPage / BoardPage / CORS for `.example.invalid` | **UI / network anti-pattern** | **Forbidden** |
| Disable HL-02 / shrink `FORBIDDEN_LOCALHOST` | **Deploy config anti-pattern** | **Forbidden** (BUG-05 / Railway) |

H6 CONFIRMED (investigation + T01). H1–H5, H7 not root.

## Where to change
- Pin note in this README and/or T05 gate (docs only)
- No product code in T02

## Out of scope
Pin UI / CORS; weaken `FORBIDDEN_LOCALHOST`; product scripts (T03).

## Verification
```bash
rg -n '"start"' spa-app/package.json
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
```
