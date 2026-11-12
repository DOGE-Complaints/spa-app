# STORY-SPA-NF-15-action-strip-density-unframe — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md)  
> **Status:** P5 APPLY Done · gate **BLOCK** · `2026-10-21T12:42:55Z` · tip · activation **none** · Await **P8**  
> **Package:** `pkg-000191` · next-feed · REQ-22 · M162 · ARCH-DELTA §3  
> **ui_scope:** `feed` · **mixed** · Path A M162 ready-artboard · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert` · soft CR CSS ownership  
> **Depends:** NF-07 · CR-23 Live strip Present  
> **Runtime:** T01–T04 **Done** · vitest **525/525** · shots 01–05 Present · P5 TASKED=0 · P6 skip · no invent OP PASS

## Purpose

OP: too much whitespace; icons small; React bordered pill ≠ Comment/Share flat chrome.

## L1 — FR (backlog verbatim)

- **FR-NF-15.1** React primary control in post strip has **no** decorative outer border/pill vs Comment/Share (neutralize `.rm-summary-strip__react` frame in this host — M162 §5).  
- **FR-NF-15.2** Primary action glyphs **24×24 CSS px** (tip lock · was 16) · reuse existing `/icons/next-feed/actions/{react,comment,share}.svg` — no new pack.  
- **FR-NF-15.3** Desktop density tip lock (M162 §3 · §6): padding **4v / 8h** · icon–label gap **6** · control min-height **44**.  
- **FR-NF-15.4** Narrow ~390 tip lock (M162 §7): icon **above** label · gap **4** · control min-height **56** (never below 44) · four zones retained. Exact breakpoint soft TBD — reuse existing feed narrow token if Present.  
- **FR-NF-15.5** Four-zone grammar held (NF-07) · CR-23 Live `FeedReactionsMount` remains Done host · no picker/aggregate redesign (M162 §8).  
- **FR-NF-15.6** Scope host: do not break comment-node React chrome if shared class — use post-strip density prop / host selector.  
- **FR-NF-15.7** Focus / pressed / selected indicators remain visible after unframe (M162 §5 · §11).  
- **FR-NF-15.8** Vitest / Path A: strip markers Present · no invent counts.

## Acceptance Criteria (backlog verbatim)

- [x] React flat like Comment/Share on civic strip  
- [x] Icons 24 CSS px  
- [x] Desktop 4v/8h · gap 6 · min-height 44  
- [x] Narrow stacked proposal applied or documented reuse of existing breakpoint  
- [x] CR-23 host held  
- [x] Focus chrome held  
- [x] Vitest  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-15-action-strip-density-unframe.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-15-t01-unframe](task-spa-nf-15-t01-unframe/README.md) | Remove React border/pill in post-strip host only | **Done** |
| T02 | [task-spa-nf-15-t02-density-desktop](task-spa-nf-15-t02-density-desktop/README.md) | 24px icons · 4v/8h · gap 6 · mh 44 | **Done** |
| T03 | [task-spa-nf-15-t03-density-narrow](task-spa-nf-15-t03-density-narrow/README.md) | Stacked labels · mh 56 at narrow | **Done** |
| T04 | [task-spa-nf-15-t04-vitest](task-spa-nf-15-t04-vitest/README.md) | Markers / honesty | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Picker redesign · Comment/Share onClick wiring · invent OP PASS · reaction summary HOLD · new action SVG masters

## DoD (backlog verbatim)

Civic strip denser per M162 tip lock; React chrome matches peers; CR-23 host unchanged.

## @mockup handoff

- Continuity: [M162](../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · [M162 PNG](../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png) · [ARCH-DELTA §3](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · intake PASS
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-action-strip-density-unframe.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- `@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md`
- `@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png`
