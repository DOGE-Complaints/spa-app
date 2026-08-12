# ui-mockup-spec — G4 design tokens (visual parity)

**extends mockup:** [mockup-01-dashboard-main-spec.md](../../../../../../../../UX/mockups/mockup-01-dashboard-main-spec.md) (board shell structure only)  
**SSOT design tokens:** [design-system.md §2](../../../../../../../../UX/design-system.md)  
**Baseline:** [ui-baseline/pre-implement/](./ui-baseline/pre-implement/)

## Target delta

**None.** G4 migrates hex → `var(--color-*)` with D-G4-1 drift collapse. Acceptable: negligible anti-alias / sub-pixel color shifts from collapsed near-duplicates (e.g. `#f5c542`→`#f5c518`). Rejected: layout shift, missing shell regions, wrong column count, broken cabinet slots.

## States to smoke

| Surface | Route | Gate |
|---------|-------|------|
| Board | `/#/board` | `.board-shell` + 3 columns |
| Issue details | from board card | details content visible |
| Cabinet | `/#/profile` | page renders (mock identity ok) |

## Human gate

Parity-only story (no artboard redesign). Target = baseline. Proceed to UI-2 without palette interview.
