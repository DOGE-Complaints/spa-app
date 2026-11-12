# SPA-REQ21-03-T03 — Boot default dark (no preference)

**Status:** Done · P3 `2026-10-06T20:14:06Z`  
**Story:** [`../STORY-SPA-REQ21-03-theme-tokens-data-theme.md`](../STORY-SPA-REQ21-03-theme-tokens-data-theme.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-03 · AC-SPA-REQ2103-03 · persistence OOS→04  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T20:08:53Z`  
**Done:** `2026-10-06T20:14:06Z`  
**Package:** `pkg-000094`

## Purpose

Early-set `data-theme="dark"` before paint when unset. **No** `localStorage` `dogestonia.theme` persistence (REQ21-04).

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Inline FOUC guard in `index.html` | `spa-app/index.html` head script |
| 2 | Module reinforce | [`src/theme/bootTheme.js`](../../../../../../../src/theme/bootTheme.js) · import [`main.jsx`](../../../../../../../src/main.jsx) |
| 3 | Storage key reserved only | `THEME_STORAGE_KEY` · no read/write |

## AC / DoD

- [x] (P0) Default first paint = dark when no preference (AC-SPA-REQ2103-03)
- [x] (P0) No OS theme source
- [x] (P0) No invent of `dogestonia.theme` persistence

## Where changed

- `spa-app/index.html`
- `src/theme/bootTheme.js` (NEW)
- `src/main.jsx`

## Out of scope

ThemeToggle UI · reading/writing `dogestonia.theme` · account sync

## Verification

```bash
rg -n "applyDefaultTheme|data-theme" spa-app/src/main.jsx spa-app/src/theme/bootTheme.js spa-app/index.html
```
