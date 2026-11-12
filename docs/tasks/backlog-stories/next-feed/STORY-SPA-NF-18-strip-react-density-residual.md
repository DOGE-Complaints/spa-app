# STORY-SPA-NF-18 — Strip React density residual (OP marks 1–2)

## Meta

- **Key:** `STORY-SPA-NF-18-strip-react-density-residual`
- **Package:** [next-feed](INDEX.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §6 · **L2** tech subtasks
- **Status:** P5 APPLY · structure **Present** · visual **BLOCK** · gate **BLOCK** · `pkg-000196` · activation **none** · Await **P8** · F1/F2 WAIVED · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-18-strip-react-density-residual/STORY-SPA-NF-18-strip-react-density-residual.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-18-2026-10-21.md)
- **Depends on:** NF-17 structure Present (Apply) · soft NF-15 unframe · CR-23 host
- **Interview:** [INTERVIEW-NF-18-plus…](INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) **R1 · R2**
- **Evidence:** [evidence/op-residual-wave2…](../../../analysis/evidence/op-residual-wave2-2026-10-21/) `01-…`
- **Code home:** `FeedCivicPost.css` / `.jsx` · `FeedReactionsMount.css` · soft `ReactionSummaryStrip`

## Зачем

После NF-17 OP всё ещё видит **двойную серую подложку** вокруг React и слишком мелкие иконки / лишний pad относительно Comment/Share.

## L1 — FR

- **FR-NF-18.1** React control on civic strip has **one** chrome layer — no nested gray pad/hover vs Comment/Share (flatten react-slot wrapper or neutralize inner/outer double background).  
- **FR-NF-18.2** Primary action glyphs tip **28×28 CSS px** (Comment/Share/React) · touch min-height **≥44** held.  
- **FR-NF-18.3** Single pad stack on React path (no 4×8 on both wrapper and `.rm-summary-strip__react`).  
- **FR-NF-18.4** Four-zone grammar + CR-23 Live host held · no picker redesign.  
- **FR-NF-18.5** Focus / pressed / selected remain visible.  
- **FR-NF-18.6** Vitest / CSS markers · OP eye — no invent PASS.

## Вне scope

Map (NF-19/20) · dark theme (NS-07 / CT-32) · CT-31 · invent OP PASS · reopen NF-17 structure Done

## L1 — Acceptance Criteria

- [ ] No double gray underlay on React vs Comment/Share  
- [ ] Glyphs tip ≥ 28 CSS px · touch ≥44  
- [ ] Single pad level on React path  
- [ ] CR-23 / four-zone held  
- [ ] Focus chrome held  
- [ ] Vitest / markers  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCH-DELTA §6](ARCH-DELTA-live-civic-residual-2026-10-21.md). **Supersedes** NF-17 tip eye for React pad/glyph size where OP residual rejects.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-18-t01-flatten-react` | Done | Remove nested gray pad/hover on react-slot | FeedCivicPost · FeedReactionsMount CSS | 18.1 · 18.3 |
| `task-spa-nf-18-t02-icons-28` | Done | Primary glyphs 28 · align CrReactionIcon size | FeedCivicPost.css · soft ReactionSummaryStrip | 18.2 |
| `task-spa-nf-18-t03-pad-stack` | Done | One pad level · mh ≥44 | same | 18.3 · 18.5 |
| `task-spa-nf-18-t04-vitest` | Done | Markers / honesty | tests | 18.4 · 18.6 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Civic strip React chrome matches Comment/Share flatness; glyphs tip 28; NF-17 structure held; no invent OP PASS.
