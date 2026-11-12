# STORY-SPA-CT-20 — Lab audit fixtures + Puppeteer residual

## Meta

- **Key:** `STORY-SPA-CT-20-lab-audit-fixtures`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P5 APPLY · gate BLOCK · TASKED=0 · activation none · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-20-lab-audit-fixtures/STORY-SPA-CT-20-lab-audit-fixtures.md) · `pkg-000178` · `2026-10-20T13:18:05Z`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-15 · CT-16 · CT-17
- **Blocks:** OP eye residual lab completeness · harness green
- **UX mirror:** [OP-UX M153a/b gaps 10-20](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- **Analysis:** [puppeteer gaps](../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md) LAB-1…4 · BUG-1 regression
- **Artboard:** M152 A–E · M153 F/G · M153a F (coverage, not new gen)
- **Code home:** `FeedLabThreadMount.jsx` · feed-lab fixtures · `tests/puppeteer/lab-feed-thread-*.mjs`

## Зачем

Default five fixtures leave M152 loading/empty/unavailable, M153 post-fail, attach-off, and max-depth≥3 Reply block **unreachable** on `#/lab/feed` (LAB-1…4). After CT-16/17 land, harness must assert dual-append fixed and real picker path (no synthetic-only Ready).

## FR

- **FR-CT-20.1** Lab stands (or always-on demos) reach `loading` / `empty` / `unavailable` without inventing new SSOT states.  
- **FR-CT-20.2** `forcePostFail` / adapter fail-next-post reachable for M153 post-fail (THR-T-F).  
- **FR-CT-20.3** Stand with `attachmentsAvailable=false` reachable (M153a F / attach-off).  
- **FR-CT-20.4** Fixture with depth ≥ `maxDepth` so Reply block is exercisable.  
- **FR-CT-20.5** Puppeteer harness: dual-append asserts green (depends CT-16) · picker present · no synthetic-only Ready path (depends CT-17).  
- **FR-CT-20.6** Any LAB item not closed in-wave is OP-WAIVED with explicit note — no silent drop.

## Вне scope

Invent new artboard states beyond M152/M153/M153a · invent HTTP · invent OP PASS · product CSS tokens (CT-18/19) · HOLD reactions

## Acceptance Criteria

- [x] loading / empty / unavailable reachable on lab  
- [x] post-fail stand reachable  
- [x] attach-off stand reachable  
- [x] max-depth Reply block reachable  
- [x] Expanded puppeteer suite exit 0 on covered asserts (or WAIVED listed)  
- [x] LAB-1…4 closed or OP-WAIVED  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§12](ARCHITECTURE.md) · P3 Done `2026-10-20T13:13:37Z`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-20-t01-status-stands` | Done | Wire loading/empty/unavailable stands on feed lab | fixtures · FeedLab | 20.1 |
| `task-spa-ct-20-t02-fail-attach-depth` | Done | forcePostFail · attach-off · depth≥maxDepth fixtures | fixtures · host props | 20.2–20.4 |
| `task-spa-ct-20-t03-harness-expand` | Done | Assert dual-append + picker + no synthetic-only Ready | puppeteer scripts | 20.5 |
| `task-spa-ct-20-t04-lab-waiver-log` | Done | Document closed vs OP-WAIVED LAB items | analysis / story notes | 20.6 |

### Constraints

- No invent SSOT panels  
- Depends CT-16/17 for green asserts  
- Soft CT-18/19 paint not required for fixture reachability

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Lab residual states from Puppeteer LAB-1…4 are reachable; harness covers dual-append + picker path without inventing states.
