# SPA-HL-04-T07 — env-configuration resolve URL (F2)

**Status:** Done — P6 PASS 2026-08-09T14:38:40Z · F2 CLOSED  
**Story:** [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md)  
**Decision Ref:** [audit-STORY-SPA-HL-04-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-HL-04-execution-2026-08-09.md) §F2  
**Depends on:** [T06](../task-spa-hl-04-t06-as-of-done-backlog-pipeline-ssot/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T14:03:30Z  
**Package:** `pkg-000062` (unchanged) · `run_mode=spa_hl_04_audit_2026_08_09`

## Purpose

Обновить persistent requirements snippet: [`04-env-configuration.md`](../../../../../../../docs/requirements/04-env-configuration.md) всё ещё показывает `?? 'http://localhost:8100'` и неверный path `src/services/identityService.js`.

## Risk

Операторы копируют устаревший паттерн; SSOT requirements противоречит HL-04 Done.

## Code Facts (closed)

1. Snippet uses `resolveIdentityServiceUrl()` · path `src/auth/` · PROD throw note.
2. `src/services/identityService.js` ABSENT from doc.
3. Audit F2 Low → **CLOSED**.

## Gap

Low F2 — env requirements doc pattern → **CLOSED**.

## AC / DoD

- [x] (P0) Snippet uses `resolveIdentityServiceUrl()` · path under `src/auth/`.
- [x] (P0) Note PROD missing/blank → throw.
- [x] (P0) Doc-only.

## Where to change

- [`../../../../../../../docs/requirements/04-env-configuration.md`](../../../../../../../docs/requirements/04-env-configuration.md)
- [`acceptance-verification-spa-hl-04-t07.md`](./acceptance-verification-spa-hl-04-t07.md)

## Out of scope

F1 (T06); F5 (T08); product JS.

## Verification

PASS 2026-08-09T14:38:40Z.
