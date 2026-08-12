# SPA-HL-04-T03 — env.example + deploy-guide note

**Status:** Done — 2026-08-09T13:35:01Z  
**Story:** [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) §FR-HL-04.2 · AC#2  
**Depends on:** [T02](../task-spa-hl-04-t02-apply-fail-fast-clients/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T13:24:26Z  
**Package:** `pkg-000062`

## Purpose

Документировать обязательность `VITE_IDENTITY_SERVICE_URL` в prod и ожидаемое поведение misconfig (fail-fast, не silent localhost).

## Risk

Оператор не знает fail mode после T02.

## Code Facts (As-of-Done)

1. [`.env.example`](../../../../../../../.env.example) — HL-04 fail-fast comment on identity URL.
2. [`docs/deploy-guide.md`](../../../../../../../docs/deploy-guide.md) — Variables table + HL-04 note under `VITE_IDENTITY_SERVICE_URL`.

## AC / DoD

- [x] (P0) Warning/note: prod requires public identity URL; missing → fail-fast (AC#2 · FR-HL-04.2).
- [x] (P0) Dev localhost still documented as ok for local (FR-HL-04.3 · AC#3).
- [x] (P0) No secrets committed.

## Where to change

- `.env.example`
- `docs/deploy-guide.md`

## Out of scope

Client code (T02); unit tests (T04).

## Verification

```bash
rg -n "VITE_IDENTITY_SERVICE_URL|fail-fast|localhost:8100|identity URL" \
  spa-app/.env.example spa-app/docs/deploy-guide.md
```
