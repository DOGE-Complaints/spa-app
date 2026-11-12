# STORY-SPA-CR-19 — People mobile sheet + lab wire (M155 C)

## Meta

- **Key:** `STORY-SPA-CR-19-people-sheet-lab-wire`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P3 Done · `pkg-000155` · gate **BLOCK** (OP eye · Gap v2) · structure Present
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-17](STORY-SPA-CR-17-reactors-popover.md) · [CR-18](STORY-SPA-CR-18-reactions-dialog.md) · CR-08 stress · CR-15 labs Present
- **Blocks:** —
- **UX mirror:** [OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) §4.5  
- **Artboard:** [M155](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) Panel C  
- **Code home:** people sheet · `ReactionsLabCanvas` · `FeedLabPage` / card aggregate+Reactions

## Зачем

Mobile/narrow: people as bottom sheet (≤88dvh). Wire both labs so OP validates M155 end-to-end with fixtures.

## FR

- **FR-CR-19.1** Narrow / sheet surface: people full-distribution UI as bottom sheet (tabs + list + Connect stub semantics from CR-18).  
- **FR-CR-19.2** System Back / Escape dismisses topmost sheet; focus returns to trigger.  
- **FR-CR-19.3** `#/lab/reactions` stands demonstrate people open from Reactions/aggregate.  
- **FR-CR-19.4** `#/lab/feed` cards/detail: same triggers · CR-16 polish held.  
- **FR-CR-19.5** Stress theme/locale still works; dark popover parity exercised.  
- **FR-CR-19.6** No invent HTTP; FixtureAdapter default; Live people fail-closed.  

## Вне scope

Production Live people API · `#/next/feed` · invent SVG · real Connect  

## Acceptance Criteria

- [ ] Sheet usable at ~390 width / lab 320 stress  
- [ ] Both lab URLs open people without opening picker from Reactions  
- [ ] Vitest cross-lab smoke  
- [ ] Verify: `http://127.0.0.1:5173/#/lab/reactions` · `#/lab/feed`  

## Technical subtasks

> Handoff-ready · Skill: `react-expert` · P1.3 APPLY `2026-10-18T10:51:53Z` · OP queueSpec forces runtime · Await **P2** before P3

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-19-t01-people-sheet-surface` | Todo | Sheet presentation for narrow (`resolvePeopleSurface`) · ≤88dvh · safe-area | `reactions-mount/people/` | 19.1–19.2 |
| `task-spa-cr-19-t02-lab-reactions-people-wire` | Todo | Lab stands: Reactions/aggregate → people fixtures | `ReactionsLabCanvas.jsx` | 19.3 · 19.5 |
| `task-spa-cr-19-t03-lab-feed-people-wire` | Todo | Feed card/detail same triggers · polish held | `FeedPostCard` · detail · strip | 19.4 |
| `task-spa-cr-19-t04-vitest-lab-people` | Todo | Both labs · Reactions≠picker · sheet/popover smoke | feed-lab + reactions-mount tests | 19.6 · AC |

### Constraints (all tasks)

- No invent HTTP / Live people fabricate  
- No dual picker+people on same Reactions click  
- Gap v2 icon required for visual PASS on strip  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

OP can full-cycle M155 people on both labs with fixtures; strip polish + people triggers coherent.
