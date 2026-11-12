# STORY-SPA-NF-17-civic-chrome-residual — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-17-civic-chrome-residual.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-17-civic-chrome-residual.md)  
> **Status:** P5 APPLY Done · gate **BLOCK** · `2026-10-21T17:53:09Z` · tip · activation **none** · Await **P8**  
> **Package:** `pkg-000194` · next-feed · REQ-22 · M162 · ARCH-DELTA §5  
> **ui_scope:** `feed` · **mixed** · Path A M162 ready-artboard · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert` · soft CR CSS ownership  
> **Depends:** NF-15 structure Present (Partial visual) · soft NF-07 four-zone · CR-23 Live strip Present  
> **Runtime:** T01–T05 **Done** · vitest **533/533** · shots 01–05 Present · P5 TASKED=0 · P6 skip · no invent OP PASS

## Purpose

After Apply NF-13…16 OP still sees hairline under media, small reaction marks, excess strip vertical air, and too-small summary.

## L1 — FR (backlog verbatim)

- **FR-NF-17.1** No decorative hairline between civic media and action strip — neutralize `.feed-civic-post-actions` `border-top` (or equivalent under-media rule).  
- **FR-NF-17.2** Primary action glyphs remain **24×24 CSS px**; **reaction-mark** glyphs tip **20×20 CSS px** (was 14).  
- **FR-NF-17.3** Strip vertical density tip: actions `padding-top` **4** · `margin-top` **0** · control min-height **≥44** held · four-zone grammar held.  
- **FR-NF-17.4** Summary text tip **1rem** on `.feed-civic-post-summary` (was 0.875rem).  
- **FR-NF-17.5** Focus / pressed / selected indicators remain visible after chrome tighten.  
- **FR-NF-17.6** Vitest / CSS markers Present · Path A / OP eye on `#/next/feed` — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] No actions `border-top` hairline under media on civic card  
- [x] Reaction marks ≥ tip 20 CSS px · primary 24 held  
- [x] Strip pad/margin tip applied · touch ≥44  
- [x] Summary ≥ tip 1rem  
- [x] Focus chrome held  
- [x] Vitest / markers  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-17-civic-chrome-residual.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-17-t01-border-top](task-spa-nf-17-t01-border-top/README.md) | Remove/neutralize actions border-top under media | **Done** |
| T02 | [task-spa-nf-17-t02-reaction-marks](task-spa-nf-17-t02-reaction-marks/README.md) | Reaction-mark size tip 20 | **Done** |
| T03 | [task-spa-nf-17-t03-density-pad](task-spa-nf-17-t03-density-pad/README.md) | pad-top 4 · margin-top 0 · mh ≥44 | **Done** |
| T04 | [task-spa-nf-17-t04-summary-rem](task-spa-nf-17-t04-summary-rem/README.md) | summary font-size 1rem | **Done** |
| T05 | [task-spa-nf-17-t05-vitest](task-spa-nf-17-t05-vitest/README.md) | Markers / honesty | **Done** |

**Order:** t01 → t02 → t03 → t04 → t05

## Out of scope (backlog verbatim)

Attach preview auth (**CT-31**) · Discussion unavailable HOLD · picker redesign · Comment/Share onClick wiring · invent OP PASS · reopen NF-13/14/16 structure · new SVG masters

## DoD (backlog verbatim)

Civic card chrome matches OP residual locks C1–C3 · C5 on `#/next/feed`; NF-15 structure host held; no invent OP PASS.

## @mockup handoff

- Continuity: [M162](../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · [M162 PNG](../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png) · [ARCH-DELTA §5](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · OP residual supersedes NF-15 tip eye where rejects
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-civic-chrome-residual.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- `@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md`
- `@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png`
