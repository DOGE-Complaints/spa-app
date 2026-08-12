# SPA-G10-T10 — Migrate board Filters and public-home CTAs

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T09  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.8 Wave 3: Board/Issue retry+back+GPT CTA; Filters controls; public-home header/account/footer CTAs with EPIC-SPA-09. Filters chips may keep toggle semantics with shared styles or documented exception.

## Risk
Board/PH invent new button CSS; EPIC-SPA-09 diverges.

## Code Facts (re-verify at execute)
- `board-retry-button`, `issue-retry-button`, `issue-back-button` classes exist (backlog).
- **PH chrome N/A:** no `PublicHome*` / public-home routes under `src/pages` (2026-08-03); surface = EPIC-SPA-09. New PH CTAs must use `Button`.

## AC / DoD
- [x] (P0) Board/Issue + Filters + PH chrome CTAs migrated or exception documented for chips.
- [x] (P0) No new page-specific button styling on these surfaces.
- [x] (P0) **PH chrome N/A** documented when PublicHome surface absent (SPA-G10-T15).

## Where to change
- EDIT BoardPage/IssuePage/Filters* as present; PH chrome N/A until EPIC-SPA-09

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n 'board-retry-button|issue-retry-button|issue-back-button' spa-app/src | head
rg -n 'PH chrome N/A' spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/task-spa-g10-t10-migrate-board-filters-public-home-ctas/
```

Gate: [`acceptance-verification-spa-g10-t10.md`](./acceptance-verification-spa-g10-t10.md)
