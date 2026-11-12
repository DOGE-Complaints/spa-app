# SPA-NS-10-T03 — Dark theme continuous surface

**Status:** Done  
**Done:** `2026-10-22T13:32:42Z`  
**Note:** P3 · dark SVG continuous · no inset tile · same 44px geometry  
**Story:** [`../STORY-SPA-NS-10-header-logo-light-scale.md`](../STORY-SPA-NS-10-header-logo-light-scale.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:22:37Z`  
**Package:** `pkg-000203`  
**Path A:** M165 · Interview H8

## Purpose

FR-NS-10.4: Dark theme — same geometry · readable light DOGE + orange stonia · continuous dark header · no inset dark tile.

## Code Facts (verify)

- TO-BE: `DOGEstonia-logo-horizontal-dark.svg` on `data-theme=dark` · transparent plate · header chrome continuous

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent mascot

## AC / DoD

- [x] Dark continuous · readable (structure)
- [x] No inset dark tile (structure)
- [ ] Visual Done not claimed without OP eye

## Where changed

`Header.jsx` · `Header.css` · `public/assets/DOGEstonia-logo-horizontal-dark.svg`

## Verification

```bash
rg -n "data-theme|logo|brand|dark|ns10" spa-app/src/components/AppShell/Header.jsx spa-app/src/components/AppShell/Header.css
```
