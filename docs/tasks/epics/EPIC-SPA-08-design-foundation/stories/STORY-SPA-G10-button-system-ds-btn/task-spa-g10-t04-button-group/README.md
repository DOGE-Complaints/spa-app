# SPA-G10-T04 — Implement ButtonGroup

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.1: `<ButtonGroup />` responsive per spec.

## Risk
Segmented CTA rows останутся ad-hoc CSS.

## Code Facts (re-verify at execute)
- `ButtonGroup` — 0 files.
- Spec ButtonGroup — design-system-buttons-spec.md.

## AC / DoD
- [x] (P0) `ButtonGroup` ships per spec (responsive).
- [x] (P0) Works with `Button` children / documented composition.

## Where to change
- NEW ButtonGroup in `spa-app/src/components/Button/`

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n 'ButtonGroup' spa-app/src/components/Button/ | head
```

Gate: [`acceptance-verification-spa-g10-t04.md`](./acceptance-verification-spa-g10-t04.md)
