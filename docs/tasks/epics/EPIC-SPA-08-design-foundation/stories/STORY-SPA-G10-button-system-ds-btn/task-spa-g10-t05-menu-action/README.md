# SPA-G10-T05 — Implement MenuAction

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.1: `<MenuAction />` (Profile / Log out patterns — PH-02 ready).

## Risk
PH-02 / account menu invent page-local menu buttons.

## Code Facts (re-verify at execute)
- `MenuAction` — 0 files.
- Spec MenuAction — design-system-buttons-spec.md.

## AC / DoD
- [x] (P0) `MenuAction` ships per spec.
- [x] (P0) Ready for Profile / Log out patterns (PH-02).

## Where to change
- NEW MenuAction in `spa-app/src/components/Button/`

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n 'MenuAction' spa-app/src/components/Button/ | head
```

Gate: [`acceptance-verification-spa-g10-t05.md`](./acceptance-verification-spa-g10-t05.md)
