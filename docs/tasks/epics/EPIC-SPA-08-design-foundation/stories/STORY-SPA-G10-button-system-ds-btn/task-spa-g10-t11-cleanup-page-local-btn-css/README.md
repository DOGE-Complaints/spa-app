# SPA-G10-T11 — Cleanup page-local button CSS

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T10  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
D-G10-5: remove duplicate `*-btn` CSS; ban new page-local button styles; inventory → 0 product raw CTAs (chips exception documented).

## Risk
Миграция без cleanup оставляет dual styling.

## Code Facts (re-verify at execute)
- Refresh `rg '<button'` inventory at execute.
- Exit criterion per backlog D-G10-5 / FR-G10.8.

## AC / DoD
- [x] (P0) Duplicate page-local button CSS removed; inventory criterion met (chips exception documented if any).
- [x] (P0) No **new** page-specific button styling pattern remains as default.

## Where to change
- EDIT/DELETE leftover `*-btn` CSS across migrated surfaces; docs exception note if needed

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n '<button' spa-app/src --glob '*.jsx' | wc -l; rg -n '__btn|--btn|retry-button' spa-app/src --glob '*.css' | head
```

Gate: [`acceptance-verification-spa-g10-t11.md`](./acceptance-verification-spa-g10-t11.md)
