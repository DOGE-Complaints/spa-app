# SPA-CR-16-T01 — React chip hover (not full-cell)

**Status:** Done · `2026-10-17T13:58:39Z`  
**P3 note:** chip CSS + slot SummaryStrip chip · data-lab-react-chip · full-cell hover neutralized  
**Story:** [`../STORY-SPA-CR-16-strip-hover-media-flush.md`](../STORY-SPA-CR-16-strip-hover-media-flush.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md)  
**ui_scope:** `feed-lab` · **visual**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-17T13:55:57Z`  
**Package:** `pkg-000152`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §3 (chip hover + media flush)  
**Runtime:** OP go (queueSpec) — story Await «делай» superseded for this wave

## Purpose
FR-16.1–16.3: Move hover/selected/focus paint to inner chip around icon+label; neutralize full-zone fill.

## Code Facts (verified at scaffold)
- AS-IS: full-cell hover in FeedPostActionStrip.css `.zone--slot:hover` / React state → full min-height 56px background
- CR-11…15 structure Present · Partial visual BLOCK until OP eye

## Implement notes
- Chip wrapper if needed · modest padding + radius · soft yellow tint · zone dividers held · Comment/Share/Reactions rest unchanged
- OOS: invent HTTP · M155 people · invent SVG · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Chip hover not full-cell · media–strip flush
- Keep 4-zone strip (CR-11) · theme tokens only (CR-08)
- No invent HTTP · no M155 · no invent SVG

## AC / DoD
- [x] Structure for FR 16.1–16.3 Present
- [ ] Visual Done not claimed without OP eye

## Where to change
`FeedPostActionStrip.css` · strip JSX · optional SummaryStrip react button in slot

## Verification
```bash
rg -n "chip|zone--slot:hover|rm-react-state" spa-app/src/features/feed-lab/post/FeedPostActionStrip.css spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx
```
