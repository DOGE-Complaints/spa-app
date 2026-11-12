# SPA-REQ21-04-T02 — ThemeToggle component

**Status:** Done · P3 `2026-10-06T20:27:07Z`  
**Story:** [`../STORY-SPA-REQ21-04-theme-toggle-header.md`](../STORY-SPA-REQ21-04-theme-toggle-header.md)  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T20:21:56Z`  
**Done:** `2026-10-06T20:27:07Z`  
**Package:** `pkg-000095`  
**@mockup:** [`../../../../../../../UX/mockups/home/mockup-150-public-header-theme-toggle-spec.md`](../../../../../../../UX/mockups/home/mockup-150-public-header-theme-toggle-spec.md)

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | ThemeToggle Present | [`ThemeToggle.jsx`](../../../../../../../src/components/ThemeToggle/ThemeToggle.jsx) |
| 2 | Persist on toggle | `setThemeAttribute(..., { persist: true })` |
| 3 | a11y | `aria-pressed` · `aria-label` · `data-testid=public-header-theme-toggle` |

## AC / DoD

- [x] (P0) Switches light/dark
- [x] (P0) a11y minimum
- [x] (P0) Persists via storage helper
- [x] (P0) mockup-150 wired
