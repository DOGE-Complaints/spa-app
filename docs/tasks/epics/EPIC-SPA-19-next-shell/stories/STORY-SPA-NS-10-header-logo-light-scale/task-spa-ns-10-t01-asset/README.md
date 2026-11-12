# SPA-NS-10-T01 — SVG horizontal brand asset · wire Header

**Status:** Done  
**Done:** `2026-10-22T13:32:42Z`  
**Note:** P3 structure Pass · gate BLOCK · Path A fails:[] · light/dark SVG wired  
**Story:** [`../STORY-SPA-NS-10-header-logo-light-scale.md`](../STORY-SPA-NS-10-header-logo-light-scale.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:22:37Z`  
**Package:** `pkg-000203`  
**Path A:** M165 · Interview H8

## Purpose

FR-NS-10.1 · 10.3: Promote/prepare SVG horizontal brand · wire Header light source — not PNG dark-backed master · placeholder fallback ≠ production dog+wordmark.

## Code Facts (verify)

- AS-IS: Header used `DOGEstonia-logo-horizontal.png` (navy plate)
- TO-BE: `DOGEstonia-logo-horizontal-light.svg` / `-dark.svg` (prepared from horizontal PNG · plate removed · theme ink) · `Header.jsx` theme-aware · fallback placeholder held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent mascot · no invent CDN · no crop artboard PNG as master

## AC / DoD

- [x] SVG brand wired for light
- [x] No dark plate as light source
- [ ] Visual Done not claimed without OP eye

## Where changed

`public/assets/DOGEstonia-logo-horizontal-{light,dark}.{svg,png}` · `Header.jsx`

## Verification

```bash
rg -n "logo|brand|svg|fallback|ns10" spa-app/src/components/AppShell/Header.jsx spa-app/public/assets
```
