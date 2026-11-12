# STORY-SPA-NF-26-filters-mobile-scroll-lock — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-26-filters-mobile-scroll-lock.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-26-filters-mobile-scroll-lock.md)  
> **Status:** P8 local close · T01–T03 **Done·BLOCK** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-25T10:52:30Z` · `pkg-000233` · **activation: none** · SHAs feat `60878ef` · test `e9a07b5` · docs `09cd217` · NO PUSH · [disposition](../../../../run-reports/p5-disposition-STORY-SPA-NF-26-2026-10-25.md) · [p7](../../../../../analysis/reaudit-STORY-SPA-NF-26-p7-2026-10-25.md)  
> **Package:** `pkg-000233` · next-feed · Interview **M2** · clean P1.3 (no UX tip) · evidence PNG Present · NF-25 M175 held · wave `OP-spa nf26-wave6-20261025`  
> **ui_scope:** next-feed / Filters · **mixed** · arch Present · Partial visual=**BLOCK** · **NO BRIEF** · no invent PASS · no invent filter keys  
> **Skill declared:** `react-expert`  
> **Depends:** NF-25 M175 panel Present · tip after `pkg-000232`  
> **Runtime:** sheet scroll + body lock · Vitest nf26 **4/4** · CAPTURE-META `fails: []` · OP eye Absent → **BLOCK** · no invent PASS · invent filter keys OOS · burger OOS

## Purpose

Filters mobile sheet: body scrolls through all rows; lock document scroll while open; hold NF-25 layout/width/dates; Vitest · OP eye.

## L1 — FR (backlog verbatim)

- **FR-NF-26.1** On mobile, filter sheet body scrolls through all rows (Type…Country · dates · actions reachable).  
- **FR-NF-26.2** While sheet open: lock background document scroll (body/overflow) · optional `touch-action` honesty.  
- **FR-NF-26.3** NF-25 layout/width/date affordance held · no invent filter keys.  
- **FR-NF-26.4** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Sheet body scrolls on mobile (structure; visual **BLOCK**)  
- [x] Background scroll locked while open (structure; visual **BLOCK**)  
- [x] Vitest · OP eye Absent → **BLOCK**  

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-26-filters-mobile-scroll-lock.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-26-t01-scroll](task-spa-nf-26-t01-scroll/README.md) | Panel body overflow / height | **Done·BLOCK** |
| T02 | [task-spa-nf-26-t02-lock](task-spa-nf-26-t02-lock/README.md) | Body scroll lock on open/close | **Done·BLOCK** |
| T03 | [task-spa-nf-26-t03-vitest](task-spa-nf-26-t03-vitest/README.md) | Markers · Vitest · gate | **Done·BLOCK** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

Mobile burger (NS-17) · invent custom calendar

## DoD (backlog verbatim)

Sheet scroll · body lock · Vitest · OP eye — no invent PASS · no invent filter keys · NF-25 M175 held.

## @mockup handoff

```text
@mockup: spa-app/docs/architecture/next-feed-vl/26-filters-mobile-scroll-lock.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave6-mobile-2026-10-25/02-filters-scroll-bottom-nav.png
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md
```
