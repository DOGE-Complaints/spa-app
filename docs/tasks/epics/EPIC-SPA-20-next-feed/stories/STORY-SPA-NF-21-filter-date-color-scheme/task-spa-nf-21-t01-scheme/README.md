# SPA-NF-21-T01 — Theme-bound color-scheme

**Status:** Done  
**Done:** `2026-10-22T13:58:44Z`  
**Note:** P3 structure Pass · gate BLOCK · Path A fails:[] · light/dark scheme wired  
**Story:** [`../STORY-SPA-NF-21-filter-date-color-scheme.md`](../STORY-SPA-NF-21-filter-date-color-scheme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-21-filter-date-color-scheme.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-21-filter-date-color-scheme.md)  
**ui_scope:** `feed` / filters · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:43:45Z`  
**Package:** `pkg-000204`  
**Path A:** Interview F3 · ARCH-DELTA §9 · p13UxReady

## Purpose

FR-NF-21.1 · 21.2: Bind `.board-filter-date-native` `color-scheme` to `data-theme` (light→light, dark→dark). Retire hardcoded `color-scheme: dark` as sole rule.

## Code Facts (verify)

- AS-IS: hardcoded `color-scheme: dark` on base selector
- TO-BE: `[data-theme=light|dark] .board-filter-date-native` · base selector without sole dark

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent custom calendar · NF-22 OOS

## AC / DoD

- [x] Light→light · dark→dark Present
- [x] Hardcoded sole `dark` retired
- [ ] Visual Done not claimed without OP eye

## Where changed

`Filters.css`

## Verification

```bash
rg -n "board-filter-date-native|color-scheme" spa-app/src/components/Filters/Filters.css
```
