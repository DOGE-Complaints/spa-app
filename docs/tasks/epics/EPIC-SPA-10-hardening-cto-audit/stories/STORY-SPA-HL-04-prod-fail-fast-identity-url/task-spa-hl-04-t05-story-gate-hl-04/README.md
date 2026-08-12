# SPA-HL-04-T05 — Story gate HL-04

**Status:** Done — 2026-08-09T13:36:28Z  
**Story:** [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) §FR/AC  
**Depends on:** [T04](../task-spa-hl-04-t04-unit-tests-fail-fast/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T13:24:26Z  
**Package:** `pkg-000062`

## Purpose

Story acceptance gate: FR-HL-04.1–04.3 + problem-level AC PASS with evidence from T01–T04. Set Status Done only after this gate PASS.

## Risk

False Done without fail-fast on all clients or without docs/tests.

## Code Facts (As-of-Done)

1. T01–T04 Done with evidence.
2. Gate [`acceptance-verification-spa-hl-04.md`](./acceptance-verification-spa-hl-04.md) Result PASS · Date 2026-08-09T13:36:28Z.

## AC / DoD

- [x] (P0) FR-HL-04.1–04.3 closed with evidence.
- [x] (P0) Problem AC checklist all PASS.
- [x] (P0) [`acceptance-verification-spa-hl-04.md`](./acceptance-verification-spa-hl-04.md) Result PASS + live Date (not TBD).

## Where to change

- [`acceptance-verification-spa-hl-04.md`](./acceptance-verification-spa-hl-04.md)
- Pipeline + backlog Status → Done

## Out of scope

HL-02 bake strip; SEC-02; invent UX page.

## Verification

```bash
npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js
# 4/4 PASS · 2026-08-09T13:36:28Z
```

Gate artifact: [`acceptance-verification-spa-hl-04.md`](./acceptance-verification-spa-hl-04.md).
