# SPA-PH-08-T06 — As-of-Done T01 Code Facts (F2)

**Status:** Done — P6 PASS 2026-08-09T08:26:29Z · F2  
**Story:** [`../STORY-SPA-PH-08-how-it-works-first-class-page.md`](../STORY-SPA-PH-08-how-it-works-first-class-page.md)  
**Decision Ref:** [audit-STORY-SPA-PH-08-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-PH-08-execution-2026-08-09.md) §F2  
**Depends on:** SPA-PH-08-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T08:20:49Z  
**Package:** `pkg-000058` (unchanged) · `run_mode=spa_ph_08_audit_2026_08_09`

## Purpose

Убрать present-tense SSOT drift в T01 README Code Facts: после T02 steps уже transparent separators, не «Step cards · CSS L45–50».

## Risk

Post-audit readers think step marketing cards still present.

## Code Facts (closed)

1. T01 README Code Facts split **Current** / **Historical** (As-of-Done).
2. Current: transparent steps · [`HowItWorksPage.css`](../../../../../../../src/pages/HowItWorksPage.css) L51–58.
3. Historical: pre-T02 filled step cards claim retired from present-tense.

## Gap

Info F2 — As-of-Done doc → **CLOSED**.

## AC / DoD

- [x] (P0) T01 README Code Facts split **Current** / **Historical**.
- [x] (P0) No claim that filled step cards remain on disk.
- [x] (P0) Doc-only — no product JSX/CSS change.

## Where to change

- [`../task-spa-ph-08-t01-composition-audit-m133/README.md`](../task-spa-ph-08-t01-composition-audit-m133/README.md)
- [`acceptance-verification-spa-ph-08-t06.md`](./acceptance-verification-spa-ph-08-t06.md)

## Out of scope

F1 screenshots (T05); F3 vitest describe (T07).

## Verification

```bash
rg -n "Step cards|transparent|Historical|Current|As-of-Done" spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/task-spa-ph-08-t01-composition-audit-m133/README.md
```
