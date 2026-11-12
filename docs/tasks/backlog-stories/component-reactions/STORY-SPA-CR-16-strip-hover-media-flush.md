# STORY-SPA-CR-16 — Strip chip hover + media–strip flush

## Meta

- **Key:** `STORY-SPA-CR-16-strip-hover-media-flush`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P8 Done · TASKED=0 · gate **BLOCK** · `pkg-000152` · `2026-10-17T14:00:48Z` · **tip** · SHAs `e74f131`/`8c865ee`/`429798f` · OP eye Absent · push=no
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** CR-11…15 structure Present
- **Blocks:** CR-17 (soft — polish before people eye)
- **UX mirror:** [OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) §3
- **Code home:** `FeedPostActionStrip.css` · `FeedPostCard` / detail body layout · optional SummaryStrip React chrome

## Зачем

OP eye: hover React заливает всю колонку; между media и полоской слишком большой воздух. Chip-highlight + flush media→strip.

## UX SSOT

- Mirror §3.1–3.2 · M154 strip adjacency tone · M160 yellow accent (scale only)  
- AS-IS: full-cell hover in strip CSS · media inside `__body` padding  

## FR

- **FR-CR-16.1** React hover/selected/focus highlight is an **inner chip** (icon+label), not full grid cell fill.  
- **FR-CR-16.2** Chip has modest padding + rounded corners; no heavy full-column border on hover.  
- **FR-CR-16.3** Zone dividers remain; Comment/Share/Reactions rest chrome unchanged in intent.  
- **FR-CR-16.4** Card media bottom is flush with action strip top (no large body padding gap under image).  
- **FR-CR-16.5** Detail overlay / same card anatomy matches feed card spacing intent.  

## Вне scope

M155 people (CR-17…) · picker tiles · invent SVG · invent HTTP  

## Acceptance Criteria

- [x] Hover React = small rounded chip, not full-cell yellow slab (structure)  
- [x] Media sits immediately above strip on `#/lab/feed` (structure)  
- [x] Vitest/CSS attrs or snapshot-friendly class for chip hover Present  
- [x] Verify: `http://127.0.0.1:5173/#/lab/feed` (structure)  
- [ ] OP eye gate (Absent = BLOCK · no invent PASS)  

## Technical subtasks

> P1.3 activated `2026-10-17T13:55:57Z` · Skill: `react-expert` · **OP go** · pipeline [STORY-SPA-CR-16](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-16-strip-hover-media-flush/STORY-SPA-CR-16-strip-hover-media-flush.md) · `pkg-000152`

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-16-t01-react-chip-hover` | Done | Move hover/selected/focus paint to inner chip around icon+label; neutralize full-zone fill | `FeedPostActionStrip.css` · strip JSX chip wrapper if needed · SummaryStrip react button styles inside slot | 16.1–16.3 |
| `task-spa-cr-16-t02-media-strip-flush` | Done | Restructure card so media has no bottom body padding gap before strip (full-bleed media segment or zero bottom padding) | `FeedPostCard.jsx` + `.css` · `FeedIssueDetailBody` parity | 16.4–16.5 |
| `task-spa-cr-16-t03-vitest-polish` | Done | Assert chip hover class / layout marker; no full-cell hover regression | `feed-lab/__tests__/*` | AC |

### Constraints (all tasks)

- No invent HTTP / M155 / Lucide / SVG generate  
- Keep 4-zone strip grammar (CR-11)  
- Theme tokens only (CR-08)  

### Suggested P1.3 order

`t01` → `t02` → `t03`

## DoD

OP eye: React hover looks like a chip; strip hugs media.
