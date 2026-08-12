# SPA-PH-08-T01 — Composition audit vs M133 / current CSS

**Status:** Done — P3 PASS 2026-08-09T07:43:48Z  
**Story:** [`../STORY-SPA-PH-08-how-it-works-first-class-page.md`](../STORY-SPA-PH-08-how-it-works-first-class-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-08-how-it-works-first-class-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-08-how-it-works-first-class-page.md) · inbound How-It-Works-First-Class  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T07:36:09Z  
**Package:** `pkg-000058`

## Purpose

Зафиксировать nested frames (`board-workspace` + bordered `.how-it-works-step`) vs M133 first-class target, чтобы T02 менял только согласованные швы.

## Risk

Blind CSS churn без списка рамок → регрессия PH-05 content или PH-09 sidebar.

## Code Facts (closed · As-of-Done)

**Current (post-T02 / PH-08 Done):**

1. Page wraps `AppShell` · [`HowItWorksPage.jsx`](../../../../../../../src/pages/HowItWorksPage.jsx) · `showSidebar={PUBLIC_SHELL_SHOW_SIDEBAR}` OOS (FR-PH-08.5).
2. Children in `section.board-workspace` · [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx).
3. Steps: transparent separators — `.how-it-works-step` `background: transparent` · hairline `border-bottom` · [`HowItWorksPage.css`](../../../../../../../src/pages/HowItWorksPage.css) L51–58 (not filled marketing cards).
4. Audit note (seam list at T01 time) · [`composition-audit.md`](./composition-audit.md).

**Historical (pre-T02 / audit baseline):**

- Bordered / filled step cards · CSS previously ~L45–50 (present-tense claim retired after T02).

## Gap

Doc-only audit → **CLOSED** (feeds T02).

## AC / DoD

- [x] (P0) [`composition-audit.md`](./composition-audit.md) lists nesting stack + recommended CSS/markup changes → FR-PH-08.1/08.3.
- [x] (P0) Explicit OOS: sidebar / `PUBLIC_SHELL_SHOW_SIDEBAR` (FR-PH-08.5).
- [x] (P0) No product JSX/CSS change in T01.

## Where to change

- [`composition-audit.md`](./composition-audit.md)
- [`acceptance-verification-spa-ph-08-t01.md`](./acceptance-verification-spa-ph-08-t01.md)

## Out of scope

- Implement layout (T02)
- PH-09 sidebar display
- GPT/submit logic

## Verification

```bash
test -f spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/task-spa-ph-08-t01-composition-audit-m133/composition-audit.md
```
