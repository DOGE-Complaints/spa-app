# Task acceptance — SPA-G8-T05

- **Story:** STORY-SPA-G8 — AppShell refactor
- **Package:** `pkg-000040-20260729-epic-spa-08-g8-app-shell-refactor.yaml`
- **Result:** PASS
- **Date:** 2026-07-29T08:27:15Z
- **Scaffolded:** 2026-07-29T08:03:20Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Board + issue screenshots shell parity | PASS | `ui-baseline/pre-implement/` + `post-implement/` + story-root `../screenshots/` (1536×1024) |
| No material layout regressions | PASS | Board pre/post PNG **byte-identical** (`cmp` exit 0); issue probe: app-shell + header-locale + back |
| test:ui:board-shell | PASS | exit 0 |

## §UI notes

- No `@mockup:` artboard — SSOT = pre-refactor Board/Issue chrome + design-system §4.1/4.2
- See `ui-mockup-spec.md` (parity-only)

Gate Date: 2026-07-29T08:27:15Z.
