# SPA-G10-T03 — Implement IconButton

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.1: `<IconButton />` per spec.

## Risk
Icon-only CTAs останутся page-local.

## Code Facts (re-verify at execute)
- `IconButton` — 0 files under `src/components/`.
- Spec IconButton API — design-system-buttons-spec.md.

## AC / DoD
- [x] (P0) `IconButton` ships per spec (sizes, a11y label required, hierarchies as applicable).
- [x] (P0) Package under `src/components/Button/`.

## Where to change
- NEW IconButton in `spa-app/src/components/Button/`

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n 'IconButton' spa-app/src/components/Button/ | head
```

Gate: [`acceptance-verification-spa-g10-t03.md`](./acceptance-verification-spa-g10-t03.md)
