# STORY-SPA-CR-21 — People affordance residual (anchor · chip · OP eye)

## Meta

- **Key:** `STORY-SPA-CR-21-people-affordance-residual`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P3 Done · gate BLOCK · `2026-10-18T12:15:16Z` · `pkg-000157` · Await P4
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-17](STORY-SPA-CR-17-reactors-popover.md)…[CR-19](STORY-SPA-CR-19-people-sheet-lab-wire.md) structure Present · [CR-20](STORY-SPA-CR-20-gap-v2-icon-generate.md) for strip visual PASS
- **Blocks:** CR-17…19 visual gate soft reopen
- **UX mirror:** [OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md](OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) §4  
- **Analysis:** [analysis-component-reactions-missing…2026-10-18.md](../../../analysis/analysis-component-reactions-missing-reactions-icon-and-people-ux-2026-10-18.md) §2  
- **Artboard:** [M155](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) Panel A triggers  
- **Code home:** `ReactionsMount` · `ReactorsPopover` · `FeedPostActionStrip` · `FeedPostCard` zone wire

## Зачем

People path **structure Present** (CR-17…19), но OP eye: «нет действия» + broken Reactions glyph. Residual: popover якорится к React-слоту слева; chip hover на Reactions не паритетен React; visual/OP AC не закрыты. Нужен affordance-pass, не новый people HTTP.

## UX SSOT

- Mirror §4 · M155 A trigger grammar · CR-16 chip grammar extended to Reactions  
- Hold: React → picker · Reactions/aggregate → people · FixtureAdapter only

## FR

- **FR-CR-21.1** Click strip **Reactions** opens people surface (popover desktop / sheet narrow) and does **not** open `ReactionPicker`.  
- **FR-CR-21.2** People popover position anchors to the **Reactions zone** (or opening trigger), not the React slot alone.  
- **FR-CR-21.3** Aggregate activate on populated fixture opens the same people path.  
- **FR-CR-21.4** Reactions zone hover/focus uses **inner chip** (icon+label), not full 56px cell fill (parity with CR-16 React).  
- **FR-CR-21.5** Lab fixtures show people list (ready) · loading/error fixtures still reachable without inventing Live names.  
- **FR-CR-21.6** Dual-circle glyph Present after CR-20 (visual strip PASS dependency).  
- **FR-CR-21.7** Escape / outside dismiss held; focus return to Reactions trigger when feasible.  

## Вне scope

Invent Live people HTTP · Connect real workflow · new dialog tabs model · Gap SVG bodies (CR-20) · media flush (CR-22) · `#/next/feed`

## Acceptance Criteria

- [x] `#/lab/feed`: click Reactions → people open · picker closed (structure + OP eye)  
- [x] Popover visually near Reactions control (not only under React)  
- [x] Reactions hover = chip, not full-cell slab  
- [x] Populated aggregate → people  
- [x] Vitest: activateAggregate / zone reactions ≠ picker; optional anchor/testid  
- [ ] Verify labs light/dark · OP eye (Absent = BLOCK)

## Technical subtasks

> Handoff-ready · Skill: `react-expert` · Await **P1.3** OP go · soft-block visual PASS on CR-20

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-21-t01-people-anchor-reactions` | Todo | Measure/position people popover from Reactions zone trigger ref (apiRef/open path) | `ReactionsMount.jsx` · `FeedPostActionStrip` / card zone · `measurePopoverPosition` | 21.2 · 21.7 |
| `task-spa-cr-21-t02-reactions-chip-hover` | Todo | Inner chip hover/focus chrome for Reactions (and parity Comment/Share if needed) | `FeedPostActionStrip.css` · optional chip wrapper | 21.4 |
| `task-spa-cr-21-t03-click-path-verify` | Todo | Ensure zone `reactions` → `activateAggregate` → people; document fixture `…-002` aggregate path | `FeedPostCard.jsx` · FixtureAdapter · lab fixtures | 21.1 · 21.3 · 21.5 |
| `task-spa-cr-21-t04-vitest-people-affordance` | Todo | Reactions≠picker · people open markers · chip/anchor smoke | `reactions-mount` + `feed-lab` tests | AC |

### Constraints (all tasks)

- No invent people HTTP / fabricate Live from counts  
- No reopen picker-on-Reactions  
- No invent SVG here (consume CR-20)  
- No invent OP PASS  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

OP can click Reactions and clearly see people near that control; chip hover matches strip polish; CR-17…19 visual residual unblocked pending OP eye.
