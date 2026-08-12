# Task acceptance — SPA-G4-T06

- **Story:** STORY-SPA-G4 — Design tokens foundation
- **Package:** `pkg-000038-20260728-epic-spa-08-g4-design-tokens-foundation.yaml`
- **Result:** PASS
- **Date:** 2026-07-28T16:20:38Z
- **ui_anchor:** true

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Visual smoke board/issue/cabinet | PASS | pre/post PNG under `ui-baseline/`; story-root `screenshots/` |
| Before/after parity | PASS | layout/shell/columns intact; accent drift collapse only |
| npm test green | PASS | Vitest 419 passed / 2 skipped |
| test:ui:board-shell | PASS | exit 0 |
| test:ui:details | SKIP/ENV | pre-existing: `#/issue/DE-001` → not-found under default gateway feed (UUID board cards work); not G4 CSS regression |

## §UI verification

- Baseline: `ui-baseline/pre-implement/01-board.png` … `03-cabinet-profile.png`
- Target: [ui-mockup-spec.md](./ui-mockup-spec.md) (parity-only)
- Post: `ui-baseline/post-implement/` + `../screenshots/`
