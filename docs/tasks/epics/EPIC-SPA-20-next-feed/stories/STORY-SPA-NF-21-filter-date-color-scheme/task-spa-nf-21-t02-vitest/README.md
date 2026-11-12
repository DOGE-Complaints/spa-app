# SPA-NF-21-T02 — CSS assert · Vitest markers

**Status:** Done  
**Done:** `2026-10-22T13:58:44Z`  
**Note:** P3 · Filters suite **26/26** · nf21 **2/2** · Path A fails:[]  
**Story:** [`../STORY-SPA-NF-21-filter-date-color-scheme.md`](../STORY-SPA-NF-21-filter-date-color-scheme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-21-filter-date-color-scheme.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-21-filter-date-color-scheme.md)  
**ui_scope:** `feed` / filters · soft `#/next/feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:43:45Z`  
**Package:** `pkg-000204`  
**Path A:** Interview F3 · ARCH-DELTA §9 · p13UxReady

## Purpose

FR-NF-21.3: Vitest / CSS markers for theme-bound `color-scheme` · Path A capture at P3 · OP eye not invent PASS.

## Code Facts (verify)

- TO-BE: `Filters.nf21.test.jsx` · light/dark scheme asserts · sole dark retired

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent custom calendar

## AC / DoD

- [x] Vitest green for NF-21 claims
- [ ] Visual Done not claimed without OP eye

## Where changed

`Filters/__tests__/Filters.nf21.test.jsx` · soft `scripts/tmp-nf21-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/components/Filters
```
