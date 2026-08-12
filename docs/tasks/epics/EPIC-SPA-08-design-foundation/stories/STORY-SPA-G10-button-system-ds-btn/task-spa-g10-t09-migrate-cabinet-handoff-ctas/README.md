# SPA-G10-T09 — Migrate cabinet and handoff CTAs

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T08  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.8 Wave 2: migrate StoryHandoff / StorySubmit + AppErrorState + Civic/Story/Wallet/Contribution CTAs.

## Risk
Cabinet/handoff page-local `*-btn` classes остаются SSOT визуала.

## Code Facts (re-verify at execute)
- Legacy classes: `story-handoff__btn*`, `wallet-status-card__btn*`, `contrib-card__btn`.
- Surfaces listed in backlog §анализ B.

## AC / DoD
- [x] (P0) Listed CTAs use shared Button system.
- [x] (P0) Legacy `*-btn` classes removed or reduced toward T11 cleanup.

## Where to change
- EDIT StoryHandoff*, StorySubmit*, AppErrorState*, Civic*, StoryActivity*, Wallet*, Contribution* JSX+CSS

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n 'story-handoff__btn|wallet-status-card__btn|contrib-card__btn' spa-app/src --glob '*.css' | head
```

Gate: [`acceptance-verification-spa-g10-t09.md`](./acceptance-verification-spa-g10-t09.md)
