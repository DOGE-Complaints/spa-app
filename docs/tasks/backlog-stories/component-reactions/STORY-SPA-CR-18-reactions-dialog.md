# STORY-SPA-CR-18 — ReactionsDialog (M155 B)

## Meta

- **Key:** `STORY-SPA-CR-18-reactions-dialog`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P3 Done · gate **BLOCK** · `pkg-000154` · `2026-10-18T10:47:25Z` · **tip**
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-17](STORY-SPA-CR-17-reactors-popover.md)
- **Blocks:** CR-19
- **UX mirror:** [OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) §4.4  
- **Artboard:** [M155](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) Panel B / B1 / B2 / B3  
- **Code home:** `reactions-mount/people/` · FixtureAdapter people · portal host

## Зачем

Полный distribution dialog: tabs All + types · Connect stub · You · empty/loading/error. Lab fixtures only.

## UX SSOT

- M155 §5 written contract · popover remains entry; dialog = full path (e.g. «see all» / dedicated open from aggregate when product requires — wire: open dialog from popover footer or direct full open on desktop wide; document chosen path in implement notes without invent API).  
- **Default wire (locked for lab):** aggregate / Reactions opens **popover** first (CR-17); explicit control in popover («View all» / equivalent) opens **dialog**. Wide desktop may open dialog directly if mirror AC still holds — prefer popover→dialog for progressive disclosure.

## FR

- **FR-CR-18.1** `ReactionsDialog` ~560px · header Reactions · close · focus trap · Escape.  
- **FR-CR-18.2** Tabs: All + enabled catalog types with counts from fixture · active underline.  
- **FR-CR-18.3** Rows: avatar+badge · name · Connect stub **or** You **or** Connection unavailable.  
- **FR-CR-18.4** Connect activate → honest unavailable message · no relationship create.  
- **FR-CR-18.5** Empty type / loading / error states B2/B3.  
- **FR-CR-18.6** No reaction picker catalog inside dialog.  
- **FR-CR-18.7** Self row never shows actionable Connect.  

## Вне scope

Mobile sheet (CR-19) · invent people HTTP · real Connect product · `#/next/feed`  

## Acceptance Criteria

- [x] Dialog tabs filter fixture people honestly  
- [x] Connect stub feedback Present  
- [x] You without Connect  
- [x] Empty/loading/error covered  
- [x] Vitest B* states  
- [x] Verify on `#/lab/feed` · OP eye Absent → visual BLOCK  

## Technical subtasks

> P1.3 activated `2026-10-18T10:44:10Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-18](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-18-reactions-dialog/STORY-SPA-CR-18-reactions-dialog.md) · `pkg-000154`

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-18-t01-reactions-dialog-shell` | Done | Dialog shell portal · header/close · focus trap · Escape | `reactions-mount/people/ReactionsDialog.*` | 18.1 |
| `task-spa-cr-18-t02-tabs-filter` | Done | All + type tabs · filter fixture rows · a11y tablist | same + FixtureAdapter marks | 18.2 · 18.5 |
| `task-spa-cr-18-t03-row-connect-stub` | Done | Row variants Connect/You/unavailable · stub message | dialog rows · L10N keys | 18.3–18.4 · 18.7 |
| `task-spa-cr-18-t04-popover-to-dialog` | Done | Wire «View all» (or equivalent) from popover → dialog | ReactorsPopover · ReactionsMount | default wire |
| `task-spa-cr-18-t05-vitest-dialog` | Done | Tabs · Connect stub · empty/loading/error | tests | AC |

### Constraints (all tasks)

- Lab fixtures only · Live fail-closed  
- No invent HTTP · no fabricate counts→people  
- Connect stub only  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Full M155 B available from lab people path after popover.
