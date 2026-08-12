# SPA-PH-08-T07 — Vitest describe PH-08 label (F3)

**Status:** Done — P6 PASS 2026-08-09T08:27:05Z · F3  
**Story:** [`../STORY-SPA-PH-08-how-it-works-first-class-page.md`](../STORY-SPA-PH-08-how-it-works-first-class-page.md)  
**Decision Ref:** [audit-STORY-SPA-PH-08-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-PH-08-execution-2026-08-09.md) §F3  
**Depends on:** SPA-PH-08-T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T08:20:49Z  
**Package:** `pkg-000058` (unchanged) · `run_mode=spa_ph_08_audit_2026_08_09`

## Purpose

Переименовать `describe('HowItWorksPage PH-05')` так, чтобы label отражал PH-08 asserts в том же suite (hygiene only).

## Risk

Operators misread suite as PH-05-only after PH-08 composition tests landed.

## Code Facts (closed)

1. [`HowItWorksPage.test.jsx`](../../../../../../../src/pages/__tests__/HowItWorksPage.test.jsx) L30: `describe('HowItWorksPage PH-05/PH-08', () => {`.
2. Assertion bodies unchanged; vitest 6/6 PASS.

## Gap

Info F3 — describe label → **CLOSED**.

## AC / DoD

- [x] (P0) `describe` string includes PH-08 (`HowItWorksPage PH-05/PH-08`).
- [x] (P0) Assertion bodies unchanged (rename only).
- [x] (P0) `npx vitest run src/pages/__tests__/HowItWorksPage.test.jsx` PASS (6/6).

## Where to change

- [`src/pages/__tests__/HowItWorksPage.test.jsx`](../../../../../../../src/pages/__tests__/HowItWorksPage.test.jsx)
- [`acceptance-verification-spa-ph-08-t07.md`](./acceptance-verification-spa-ph-08-t07.md)

## Out of scope

F1 screenshots (T05); F2 T01 Code Facts (T06); product CSS/JSX.

## Verification

```bash
cd spa-app && npx vitest run src/pages/__tests__/HowItWorksPage.test.jsx
rg -n "describe\\(" spa-app/src/pages/__tests__/HowItWorksPage.test.jsx
```
