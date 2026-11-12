# SPA-NF-22-T03 — Behavior tests

**Status:** Done  
**Done:** `2026-10-22T14:14:42Z`  
**Note:** P3 · Filters **29/29** · nf22 **2/2** · Path A fails:[]  
**Story:** [`../STORY-SPA-NF-22-reset-filters-actionable.md`](../STORY-SPA-NF-22-reset-filters-actionable.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md)  
**ui_scope:** `feed` / filters · soft `#/next/feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:08:08Z`  
**Package:** `pkg-000205`  
**Path A:** Interview F4 · ARCH-DELTA §10 · p13UxReady

## Purpose

FR-NF-22.4: Vitest for dirty∨active enablement · disabled only when neither · cursor CSS markers · Path A capture · OP eye not invent PASS.

## Code Facts (verify)

- TO-BE: `Filters.nf22.test.jsx` · updated `ResetFiltersControl.test.jsx` · `scripts/tmp-nf22-capture.mjs`

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent new filter fields

## AC / DoD

- [x] Vitest green for NF-22 claims
- [ ] Visual Done not claimed without OP eye

## Where changed

`Filters/__tests__/Filters.nf22.test.jsx` · `ResetFiltersControl.test.jsx` · `scripts/tmp-nf22-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/components/Filters
```
