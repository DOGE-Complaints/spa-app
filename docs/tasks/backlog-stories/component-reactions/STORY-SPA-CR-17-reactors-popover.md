# STORY-SPA-CR-17 — ReactorsPopover + Reactions≠picker (M155 A)

## Meta

- **Key:** `STORY-SPA-CR-17-reactors-popover`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P8 Done · gate **BLOCK** · `pkg-000153` · `2026-10-18T10:42:46Z` · residual OP/Gap
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-16](STORY-SPA-CR-16-strip-hover-media-flush.md) · [CR-icon Gap v2](STORY-SPA-CR-icon-assets.md) (`reactions.svg`) · CR-12 hosts
- **Blocks:** CR-18
- **UX mirror:** [OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) §4.1–4.3 · §4.6  
- **Artboard:** [M155](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) Panel A / A1 / A2 / D  
- **Code home:** `reactions-mount/` people/ · `ReactionsMount` · `FixtureAdapter` · strip Reactions zone

## Зачем

Зона Reactions и aggregate должны открывать **людей**, не пикер. Compact `ReactorsPopover` по M155 A. Lab fixtures only.

**Supersedes:** CR-12 «M155 OOS» · `activateAggregate` → `handleOpen()` picker path.

## Data / icons

- FixtureAdapter: illustrative people list (Member A… / You) · label fixture · **never** invent Live people from counts.  
- LiveAdapter: people unavailable / fail-closed.  
- Strip glyph: `/icons/next-feed/actions/reactions.svg` after Gap v2 promote.  
- Badges: CR-icon mark §Reuse · close: NS `close`.

## FR

- **FR-CR-17.1** Strip Reactions click opens people popover (desktop) — **does not** open `ReactionPicker`.  
- **FR-CR-17.2** Aggregate activate opens the same people path (not picker).  
- **FR-CR-17.3** `ReactorsPopover`: header «People who reacted» · combined list · avatar+badge · **no Connect** · scroll bound.  
- **FR-CR-17.4** Loading / error states A1/A2 without inventing names.  
- **FR-CR-17.5** Dark theme parity for compact popover (tokens).  
- **FR-CR-17.6** Reactions zone shows dual-circle icon when Gap v2 Present.  
- **FR-CR-17.7** Outside click / Escape closes popover; focus returns to trigger.  

## Вне scope

Full dialog tabs/Connect (CR-18) · mobile sheet (CR-19) · invent people HTTP · `#/next/feed`  

## Acceptance Criteria

- [x] Reactions zone / aggregate → popover people, picker stays closed  
- [x] Popover matches M155 A structure (header, rows, no Connect)  
- [x] Loading/error fixtures covered  
- [ ] Broken reactions icon gone after Gap promote · Gap Absent (URL wired)  
- [x] Vitest: activateAggregate does not open picker; popover testids  
- [x] Verify labs under light/dark · OP eye Absent → visual BLOCK  

## Technical subtasks

> P1.3 activated `2026-10-17T14:01:53Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-17](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-17-reactors-popover/STORY-SPA-CR-17-reactors-popover.md) · `pkg-000153`

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-17-t01-stop-picker-on-aggregate` | Done | Split people open from picker open; Reactions/`activateAggregate` → people only | `ReactionsMount.jsx` · card/lab `onZone` | 17.1–17.2 |
| `task-spa-cr-17-t02-reactors-popover-ui` | Done | New `ReactorsPopover` (portal/fixed ok) · rows avatar+badge · close · scroll | `reactions-mount/people/` | 17.3 · 17.7 |
| `task-spa-cr-17-t03-fixture-list-reactors` | Done | FixtureAdapter `listReactors` / people fixture states ready/loading/error · Live fail-closed | `FixtureAdapter.js` · `LiveAdapter.js` | 17.4 · data boundary |
| `task-spa-cr-17-t04-reactions-icon-wire` | Done | Wire Gap v2 `reactions.svg` in strip; remove broken-img acceptance | `FeedPostActionStrip.jsx` · CR-icon promote note | 17.6 |
| `task-spa-cr-17-t05-vitest-popover` | Done | No picker on Reactions; A/A1/A2 · dark attr smoke | reactions-mount + feed-lab tests | AC |

### Constraints (all tasks)

- No invent people HTTP · no fabricate Live people from counts  
- No Connect in compact popover  
- No Lucide / invent SVG bodies in this story (Gap promote separate/prior)  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Desktop compact people path works on lab; Reactions ≠ React picker.
