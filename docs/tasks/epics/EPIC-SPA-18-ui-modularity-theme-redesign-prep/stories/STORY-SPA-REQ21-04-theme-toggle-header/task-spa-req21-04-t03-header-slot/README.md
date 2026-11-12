# SPA-REQ21-04-T03 — Header slot (locale → theme → account)

**Status:** Done · P3 `2026-10-06T20:27:07Z`  
**Story:** [`../STORY-SPA-REQ21-04-theme-toggle-header.md`](../STORY-SPA-REQ21-04-theme-toggle-header.md)  
**ui_scope:** `mixed` · **ui_anchor**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T20:21:56Z`  
**Done:** `2026-10-06T20:27:07Z`  
**Package:** `pkg-000095`  
**@mockup:** [`../../../../../../../UX/mockups/home/mockup-150-public-header-theme-toggle-spec.md`](../../../../../../../UX/mockups/home/mockup-150-public-header-theme-toggle-spec.md)

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Order locale → theme → account | [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) |
| 2 | ThemeToggle mounted | `data-testid=public-header-theme-toggle` |

## AC / DoD

- [x] (P0) Mounted in Header cluster order
- [x] (P0) No Header redesign beyond slot
- [x] (P0) ui_anchor
