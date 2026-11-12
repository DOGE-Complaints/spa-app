# STORY-SPA-CR-15 — Lab visual wire (`#/lab/reactions` + `#/lab/feed`)

## Meta

- **Key:** `STORY-SPA-CR-15-lab-visual-wire`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P8 Done · TASKED=0 · gate **BLOCK** · `pkg-000151` · `2026-10-16T11:17:35Z` · **tip** · SHAs `c1d7cd3`/`95a1dff`/`66926b3` · OP eye Absent · Gap v2 residual · push=no
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-11](STORY-SPA-CR-11-strip-four-zone-chrome.md) · [CR-12](STORY-SPA-CR-12-react-always-aggregate-row.md) · [CR-13](STORY-SPA-CR-13-picker-tile-grid-chrome.md) · [CR-14](STORY-SPA-CR-14-mark-accent-tokens.md) · CR-icon Gap v2 promote
- **Blocks:** —
- **UX mirror:** [OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)
- **Code home:** `ReactionsLabCanvas` · `FeedLabPage` / feed-lab post · `ReactionsMount`

## Зачем

Склеить CR-11…14 в оба lab-хоста, чтобы OP валидировал полоску+пикер end-to-end без production cutover.

## FR

- **FR-CR-15.1** `#/lab/reactions` stands show tile picker + accents + React-always strip chrome where applicable.  
- **FR-CR-15.2** `#/lab/feed` cards/detail show 4-zone strip + aggregate row + tile picker (portal).  
- **FR-CR-15.3** Stress controls (CR-08) still drive theme/locale/viewport for visual eye.  
- **FR-CR-15.4** No dual live planes; no invent HTTP; FixtureAdapter default.  
- **FR-CR-15.5** Tests/smoke updated for both routes.  

## Вне scope

`#/next/feed` · M155 · SVG generate (Gap v2 = prior promote) · pkg tip move unless OP asks  

## Acceptance Criteria

- [x] Verify `http://127.0.0.1:5173/#/lab/reactions` — tiles + accents (structure)  
- [x] Verify `http://127.0.0.1:5173/#/lab/feed` — 4-zone strip + aggregate + picker (structure)  
- [x] Light/dark stress on feed still works (structure)  
- [x] Vitest green for updated lab suites  
- [ ] OP eye gate (Absent = BLOCK · no invent PASS)  

## Technical subtasks

> P1.3 activated `2026-10-16T11:09:16Z` · Skill: `react-expert` · **OP go** · pipeline [STORY-SPA-CR-15](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-15-lab-visual-wire/STORY-SPA-CR-15-lab-visual-wire.md) · `pkg-000151`

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-15-t01-lab-reactions-wire` | Done | Ensure stands use CR-11…14 surfaces | `ReactionsLabCanvas.jsx` · lab page | 15.1 |
| `task-spa-cr-15-t02-lab-feed-wire` | Done | Card/detail strip+aggregate+picker path | `FeedPostCard` · detail · `FeedLabReactionsMount` | 15.2–15.3 |
| `task-spa-cr-15-t03-stress-regression` | Done | Theme/locale/320 still exercise new chrome | FeedLabPage · ReactionsLabCanvas | 15.3 |
| `task-spa-cr-15-t04-vitest-lab-both` | Done | Cross-lab smoke for visual composition | feed-lab + reactions-mount tests | 15.4–15.5 |

### Constraints (all tasks)

- Runtime only after OP «делай» / P3  
- No invent HTTP / M155 / `#/next/feed`  
- Gap v2 glyphs must be promoted before visual PASS claims  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

Both labs demonstrate M154/M160 strip+picker fidelity for OP eye.
