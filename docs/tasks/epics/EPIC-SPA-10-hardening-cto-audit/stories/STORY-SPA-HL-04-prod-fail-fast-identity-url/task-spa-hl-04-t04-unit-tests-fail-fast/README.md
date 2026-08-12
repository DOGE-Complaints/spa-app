# SPA-HL-04-T04 — Unit tests PROD vs DEV fail-fast

**Status:** Done — 2026-08-09T13:35:01Z  
**Story:** [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) §FR-HL-04.1/04.3 · AC#1/#3  
**Depends on:** [T02](../task-spa-hl-04-t02-apply-fail-fast-clients/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T13:24:26Z  
**Package:** `pkg-000062`

## Purpose

Автотесты: missing identity URL in PROD-like mode fails (no silent localhost); DEV still allows localhost.

## Risk

Регрессия вернёт localhost fallback unnoticed.

## Code Facts (As-of-Done)

1. SUT: [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js)
2. New [`resolveIdentityServiceUrl.test.js`](../../../../../../../src/auth/__tests__/resolveIdentityServiceUrl.test.js) — 4/4 PASS
3. Existing identity/oauth tests still green with explicit localhost base

## AC / DoD

- [x] (P0) Tests cover missing URL in PROD-like mode → fail / no localhost call (AC#1).
- [x] (P0) DEV/non-PROD still ok with localhost (AC#3 · FR-HL-04.3).
- [x] (P0) Green under `npx vitest run` for new/updated files.

## Where to change

- `src/auth/__tests__/resolveIdentityServiceUrl.test.js`

## Out of scope

E2E / Puppeteer; full `verify:security` suite repair (OOS unless caused by T02).

## Verification

```bash
npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js
# Test Files 1 passed · Tests 4 passed
```
