# SPA-HL-04-T06 — As-of-Done backlog + pipeline SSOT (F1)

**Status:** Done — P6 PASS 2026-08-09T14:38:01Z · F1 CLOSED  
**Story:** [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md)  
**Decision Ref:** [audit-STORY-SPA-HL-04-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-HL-04-execution-2026-08-09.md) §F1  
**Depends on:** SPA-HL-04-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T14:03:30Z  
**Package:** `pkg-000062` (unchanged) · `run_mode=spa_hl_04_audit_2026_08_09`

## Purpose

Убрать present-tense SSOT drift в backlog + pipeline §Проблема: всё ещё «`?? 'http://localhost:8100'` / runtime fallback остаётся» при disk shared `resolveIdentityServiceUrl` + 3 clients без product `??`.

## Risk

Оператор/аудит читают pre-fix как текущее состояние; product Done AC противоречит Verified facts.

## Code Facts (closed)

1. Backlog + pipeline §Проблема: **As-of-Done / Current** shared resolver · 3 clients · **Historical** F8 `?? localhost`.
2. Disk unchanged by T06: [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js).
3. Audit F1 Medium → **CLOSED** (this task).

## Gap

Medium F1 — backlog/pipeline As-of-Done → **CLOSED**.

## AC / DoD

- [x] (P0) Backlog §Проблема: **As-of-Done / Current** / **Historical**.
- [x] (P0) Pipeline §Проблема aligned the same way.
- [x] (P0) Doc-only — no resolver / client / vitest change in T06.

## Where to change

- Backlog + pipeline §Проблема
- [`acceptance-verification-spa-hl-04-t06.md`](./acceptance-verification-spa-hl-04-t06.md)

## Out of scope

F2 env-doc (T07); F5 T01 facts (T08); F4; product code.

## Verification

PASS 2026-08-09T14:38:01Z — As-of-Done/Historical present; no present-tense «fallback остаётся» as current.
