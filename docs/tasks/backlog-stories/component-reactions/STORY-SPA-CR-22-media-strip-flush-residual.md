# STORY-SPA-CR-22 — Media–strip flush residual (OP eye)

## Meta

- **Key:** `STORY-SPA-CR-22-media-strip-flush-residual`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P3 Done · gate BLOCK · `2026-10-18T12:25:27Z` · `pkg-000158` · Await P4 · **tip**
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-16](STORY-SPA-CR-16-strip-hover-media-flush.md) structure Present · soft after [CR-20](STORY-SPA-CR-20-gap-v2-icon-generate.md) / [CR-21](STORY-SPA-CR-21-people-affordance-residual.md) eye
- **Blocks:** —
- **UX mirror:** [OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md](OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) §5  
- **Analysis:** [analysis-component-reactions-missing…2026-10-18.md](../../../analysis/analysis-component-reactions-missing-reactions-icon-and-people-ux-2026-10-18.md) §4  
- **Code home:** `FeedPostCard` / `FeedPostMedia` / `FeedIssueDetailBody` · strip adjacency CSS

## Зачем

CR-16 закрыл structure flush (media вне padded body · strip `border-top`). OP eye 2026-10-18 всё ещё видит заметный белый зазор между низом иллюстрации и полоской. Нужен **measure-then-fix** residual pass — не новый card redesign.

## UX SSOT

- Mirror §5 · CR-16 §3.2 intent · M154 strip adjacency  
- Identity/title keep side padding; media full-bleed above strip

## FR

- **FR-CR-22.1** On `#/lab/feed` post card, no large empty band between media content bottom and action-strip top border.  
- **FR-CR-22.2** Root cause documented from measurement (layout gap vs aspect letterbox vs asset edge) before CSS change.  
- **FR-CR-22.3** Fix applies only to verified cause; CR-16 chip hover held.  
- **FR-CR-22.4** Detail overlay / issue body media–strip adjacency matches feed card intent.  
- **FR-CR-22.5** Markers (`data-lab-media-flush`) remain honest for tests.  

## Вне scope

Gap SVG (CR-20) · people affordance (CR-21) · carousel · invent HTTP · new hero chrome · `#/next/feed`

## Acceptance Criteria

- [x] Documented cause note in story pipeline / disposition (measure)  
- [x] OP eye: strip hugs media on lab feed card  
- [x] Detail parity if same anatomy  
- [x] Vitest/layout marker still Present; no full-cell hover regression  
- [x] Verify: `http://127.0.0.1:5173/#/lab/feed`  
- [ ] OP eye gate (Absent = BLOCK · no invent PASS)

## Technical subtasks

> Handoff-ready · Skill: `react-expert` · Await **P1.3** OP go · tip of residual wave

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-22-t01-measure-gap` | Todo | Measure media box vs img vs strip top; record cause (padding / aspect / asset) | lab card DOM · `FeedPostMedia.css` · screenshots | 22.2 |
| `task-spa-cr-22-t02-flush-fix` | Todo | Apply minimal CSS/DOM fix for verified cause only | `FeedPostCard.css` · `FeedPostMedia` · detail body parity | 22.1 · 22.3–22.4 |
| `task-spa-cr-22-t03-vitest-flush` | Todo | Keep flush markers; assert no pad regression if testable | `feed-lab/__tests__/*` | 22.5 · AC |

### Constraints (all tasks)

- Fact-first: no blind padding nuke without measure  
- No invent HTTP / SVG / OP PASS  
- Hold 4-zone strip · CR-16 chip grammar  

### Suggested P1.3 order

`t01` → `t02` → `t03`

## DoD

OP eye: media and strip read as one flush stack; cause recorded; CR-16 intent actually visible.
