# SPA-NS-10-T02 — ~44px visible brand band

**Status:** Done  
**Done:** `2026-10-22T13:32:42Z`  
**Note:** P3 · `height: 44px` · probe heightPx=44 · band 40–48 held  
**Story:** [`../STORY-SPA-NS-10-header-logo-light-scale.md`](../STORY-SPA-NS-10-header-logo-light-scale.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:22:37Z`  
**Package:** `pkg-000203`  
**Path A:** M165 · Interview H8

## Purpose

FR-NS-10.2: Visible brand band ~**44 CSS px** (M165 within 40–48) measured on artwork, not padded canvas alone.

## Code Facts (verify)

- AS-IS / TO-BE: `.public-header .header-brand-logo { height: 44px; max-height: 44px; }` in `Header.css`

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS

## AC / DoD

- [x] Visible band ~44px Present
- [ ] Visual Done not claimed without OP eye

## Where changed

`Header.css`

## Verification

```bash
rg -n "logo|brand|height|44" spa-app/src/components/AppShell/Header.css
```
