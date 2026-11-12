# STORY-SPA-NF-17 — Civic chrome residual (OP marks 1 · 2 · 3 · 5)

## Meta

- **Key:** `STORY-SPA-NF-17-civic-chrome-residual`
- **Package:** [next-feed](INDEX.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §5 · **L2** tech subtasks
- **Status:** P5 APPLY Done · structure **Done** · visual **BLOCK** · gate **BLOCK** · `pkg-000194` · activation **none** · Await **P8** · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-17-civic-chrome-residual/STORY-SPA-NF-17-civic-chrome-residual.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-17-2026-10-21.md)
- **Depends on:** NF-15 structure Present (Partial visual) · soft NF-07 four-zone
- **Interview:** [INTERVIEW-NF-17-plus…](INTERVIEW-NF-17-plus-op-residual-chrome-attach-2026-10-21.md) **C1–C3 · C5**
- **Evidence:** [analysis-next-feed-op-residual…](../../../analysis/analysis-next-feed-op-residual-after-apply-2026-10-21.md)
- **Artboard tip:** [M162](../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) (density intent; OP eye supersedes tip where residual rejects)
- **Code home:** `FeedCivicPost.css` · soft `FeedReactionsMount.css` / reaction mark host

## Зачем

После Apply NF-13…16 OP всё ещё видит hairline под media, мелкие reaction marks, лишний вертикальный воздух в strip и слишком мелкий summary.

## L1 — FR

- **FR-NF-17.1** No decorative hairline between civic media and action strip — neutralize `.feed-civic-post-actions` `border-top` (or equivalent under-media rule).  
- **FR-NF-17.2** Primary action glyphs remain **24×24 CSS px**; **reaction-mark** glyphs tip **20×20 CSS px** (was 14).  
- **FR-NF-17.3** Strip vertical density tip: actions `padding-top` **4** · `margin-top` **0** · control min-height **≥44** held · four-zone grammar held.  
- **FR-NF-17.4** Summary text tip **1rem** on `.feed-civic-post-summary` (was 0.875rem).  
- **FR-NF-17.5** Focus / pressed / selected indicators remain visible after chrome tighten.  
- **FR-NF-17.6** Vitest / CSS markers Present · Path A / OP eye on `#/next/feed` — no invent PASS.

## Вне scope

Attach preview auth (**CT-31**) · Discussion unavailable HOLD · picker redesign · Comment/Share onClick wiring · invent OP PASS · reopen NF-13/14/16 structure · new SVG masters

## L1 — Acceptance Criteria

- [ ] No actions `border-top` hairline under media on civic card  
- [ ] Reaction marks ≥ tip 20 CSS px · primary 24 held  
- [ ] Strip pad/margin tip applied · touch ≥44  
- [ ] Summary ≥ tip 1rem  
- [ ] Focus chrome held  
- [ ] Vitest / markers  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCH-DELTA §5](ARCH-DELTA-live-civic-residual-2026-10-21.md). **Supersedes** NF-15 tip eye where OP residual rejects (border-top · mark size · pad · summary rem). M162 density intent held; numeric tip locks in §5.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-17-t01-border-top` | Await | Remove/neutralize actions border-top under media | FeedCivicPost.css | 17.1 |
| `task-spa-nf-17-t02-reaction-marks` | Await | Reaction-mark size tip 20 | FeedCivicPost.css · host mark rule | 17.2 |
| `task-spa-nf-17-t03-density-pad` | Await | pad-top 4 · margin-top 0 · mh ≥44 | FeedCivicPost.css | 17.3 · 17.5 |
| `task-spa-nf-17-t04-summary-rem` | Await | summary font-size 1rem | FeedCivicPost.css | 17.4 |
| `task-spa-nf-17-t05-vitest` | Await | Markers / honesty | tests | 17.6 |

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Civic card chrome matches OP residual locks C1–C3 · C5 on `#/next/feed`; NF-15 structure host held; no invent OP PASS.
