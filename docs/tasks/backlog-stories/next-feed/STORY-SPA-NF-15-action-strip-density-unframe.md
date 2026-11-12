# STORY-SPA-NF-15 — Action strip density · React unframe

## Meta

- **Key:** `STORY-SPA-NF-15-action-strip-density-unframe`
- **Package:** [next-feed](INDEX.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §3 · **L2** tech subtasks
- **Status:** P1.3 activated · L1/L1.5/L2 Ready · **gen intake PASS** · `pkg-000191` · gate PENDING · Await P2 · Partial visual=BLOCK (OP eye)
- **Depends on:** NF-07 · CR-23 Live strip Present
- **Interview:** [INTERVIEW-NF-13-plus…](INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) **M3**
- **Artboard tip:** [M162 written](../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · [M162 PNG](../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png)
- **Intake:** [analysis-m161-m162…](../../../analysis/analysis-m161-m162-generation-intake-2026-10-21.md) **PASS**
- **Code home:** `FeedCivicPost.css` · `FeedReactionsMount.css` · `ReactionSummaryStrip.css` (`.rm-summary-strip__react`) · soft CR package

## Зачем

OP: too much whitespace; icons small; React bordered pill ≠ Comment/Share flat chrome.

## L1 — FR

- **FR-NF-15.1** React primary control in post strip has **no** decorative outer border/pill vs Comment/Share (neutralize `.rm-summary-strip__react` frame in this host — M162 §5).  
- **FR-NF-15.2** Primary action glyphs **24×24 CSS px** (tip lock · was 16) · reuse existing `/icons/next-feed/actions/{react,comment,share}.svg` — no new pack.  
- **FR-NF-15.3** Desktop density tip lock (M162 §3 · §6): padding **4v / 8h** · icon–label gap **6** · control min-height **44**.  
- **FR-NF-15.4** Narrow ~390 tip lock (M162 §7): icon **above** label · gap **4** · control min-height **56** (never below 44) · four zones retained. Exact breakpoint soft TBD — reuse existing feed narrow token if Present.  
- **FR-NF-15.5** Four-zone grammar held (NF-07) · CR-23 Live `FeedReactionsMount` remains Done host · no picker/aggregate redesign (M162 §8).  
- **FR-NF-15.6** Scope host: do not break comment-node React chrome if shared class — use post-strip density prop / host selector.  
- **FR-NF-15.7** Focus / pressed / selected indicators remain visible after unframe (M162 §5 · §11).  
- **FR-NF-15.8** Vitest / Path A: strip markers Present · no invent counts.

## Вне scope

Picker redesign · Comment/Share onClick wiring · invent OP PASS · reaction summary HOLD · new action SVG masters

## L1 — Acceptance Criteria

- [ ] React flat like Comment/Share on civic strip  
- [ ] Icons 24 CSS px  
- [ ] Desktop 4v/8h · gap 6 · min-height 44  
- [ ] Narrow stacked proposal applied or documented reuse of existing breakpoint  
- [ ] CR-23 host held  
- [ ] Focus chrome held  
- [ ] Vitest  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCH-DELTA §3](ARCH-DELTA-live-civic-residual-2026-10-21.md) · M162 tip SSOT. Icons locked at **24** (was “20–24 choose at Apply”).

## L2 — Technical subtasks

> Skill: `react-expert` · soft CR CSS ownership

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-15-t01-unframe` | Await | Remove React border/pill in post-strip host only | ReactionSummaryStrip / FeedReactionsMount CSS | 15.1 · 15.6 · 15.7 |
| `task-spa-nf-15-t02-density-desktop` | Await | 24px icons · 4v/8h · gap 6 · mh 44 | FeedCivicPost.css · icon rules | 15.2 · 15.3 |
| `task-spa-nf-15-t03-density-narrow` | Await | Stacked labels · mh 56 at narrow | FeedCivicPost.css media | 15.4 |
| `task-spa-nf-15-t04-vitest` | Await | Markers / honesty | tests | 15.5 · 15.8 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Civic strip denser per M162 tip lock; React chrome matches peers; CR-23 host unchanged.
