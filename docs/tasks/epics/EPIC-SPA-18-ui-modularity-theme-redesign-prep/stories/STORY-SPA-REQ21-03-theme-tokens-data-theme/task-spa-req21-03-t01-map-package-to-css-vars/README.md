# SPA-REQ21-03-T01 — Map tokens package to CSS vars

**Status:** Done · P3 `2026-10-06T20:14:06Z`  
**Story:** [`../STORY-SPA-REQ21-03-theme-tokens-data-theme.md`](../STORY-SPA-REQ21-03-theme-tokens-data-theme.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-03 · tokens package §3.4/§4.1 · arch `02-tokens-theme-css.md` §2  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T20:08:53Z`  
**Done:** `2026-10-06T20:14:06Z`  
**Package:** `pkg-000094`

## Purpose

Map design-tokens package Light/Dark (§3.4 Night + §4.1) into CSS variables; bridge legacy `--color-*` / `--doge-*` / `--button-*` to semantic scheme values (no dual consumer APIs in components).

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Dark Night column on `:root` + `[data-theme=dark]` | [`src/styles/tokens.css`](../../../../../../../src/styles/tokens.css) |
| 2 | Light §4.1 bridged to same legacy var names | same · `#F5C542` civic-yellow · `#F7F6F2` page |
| 3 | No hex invent beyond package | Light/Dark values from package §4.1 / §3.4 |

## AC / DoD

- [x] (P0) Light + Dark scheme values projected from package
- [x] (P0) Legacy bridge `--color-*` / `--doge-*` / `--button-*`
- [x] (P0) No dual hardcoding invent in JSX

## Where changed

- `src/styles/tokens.css`

## Out of scope

ThemeToggle · `dogestonia.theme` persistence · OS theme · MapLibre · redesign invent

## Verification

```bash
rg -n "data-theme|--color-bg-primary|#F5C542" spa-app/src/styles/tokens.css
```
