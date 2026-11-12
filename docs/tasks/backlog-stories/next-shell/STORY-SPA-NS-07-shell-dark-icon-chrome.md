# STORY-SPA-NS-07 — Shell dark icon chrome (OP mark 5 shell)

## Meta

- **Key:** `STORY-SPA-NS-07-shell-dark-icon-chrome`
- **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** soft BRIEF / icon catalog · **L2** tech subtasks
- **Status:** P5 APPLY Done · T01–T04 **Done** · structure **Present** · visual **BLOCK** · gate **BLOCK** · `pkg-000199` · activation **none** · Await **P8** · P6 not needed · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-07-shell-dark-icon-chrome/STORY-SPA-NS-07-shell-dark-icon-chrome.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NS-07-2026-10-21.md)
- **Depends on:** NS-02…06 Done · REQ21-03 theme tokens Present
- **Interview:** [INTERVIEW-NF-18-plus…](../next-feed/INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) **D5**
- **Evidence:** [evidence/op-residual-wave2…](../../../analysis/evidence/op-residual-wave2-2026-10-21/) `05-…` · `06-…`
- **Code home:** `src/components/AppShell/Header.jsx` · `AccountControl` · `MobileBottomNav` · soft `ThemeToggle` · `public/icons/next-shell/`

## Зачем

В dark mode shell-иконки (search · language · bell · account · rail · mobile nav) остаются чёрными на тёмном фоне — `<img src=*.svg>` с `currentColor` не наследует цвет кнопки.

## L1 — FR

- **FR-NS-07.1** Header chrome icons (search · language chevron · notifications · account) are readable on dark surfaces.  
- **FR-NS-07.2** Profile rail / shelter nav icons readable on dark.  
- **FR-NS-07.3** Mobile bottom nav icons readable on dark.  
- **FR-NS-07.4** Pattern tip: mask / `currentColor` (reuse [CrReactionIcon](../../../../src/features/reactions-mount/icons/CrReactionIcon.jsx) approach) — not invent per-file black SVG masters unless needed.  
- **FR-NS-07.5** Light theme icons remain readable (no invert-only hack that breaks light).  
- **FR-NS-07.6** Vitest / Path A · OP eye — no invent PASS.

## Вне scope

Thread bubbles (**CT-32**) · feed civic strip (**NF-18**) · map · invent OP PASS · new icon artboards

## L1 — Acceptance Criteria

- [x] Header icons readable on dark  
- [x] Rail / shelter icons readable on dark  
- [x] Mobile nav icons readable on dark  
- [x] Theme-safe pattern (mask/currentColor or locked equivalent)  
- [x] Light theme held  
- [x] Vitest / Path A  
- [ ] OP eye

## L1.5 — Arch locks

Shell glyphs follow theme text/icon token color. Ownership: AppShell components · icon catalog [STORY-SPA-NS-icon-assets.md](STORY-SPA-NS-icon-assets.md) soft note. Sibling feed type/close → **CT-32**.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ns-07-t01-header-icons` | Done | Theme-safe header glyphs | Header.jsx · Header.css | 07.1 · 07.4 |
| `task-spa-ns-07-t02-rail-mobile` | Done | Rail + mobile nav glyphs | AccountControl · MobileBottomNav · soft ProfileRail | 07.2 · 07.3 |
| `task-spa-ns-07-t03-light-hold` | Done | Verify light theme not broken | ThemeToggle soft · CSS | 07.5 |
| `task-spa-ns-07-t04-vitest` | Done | Markers / honesty | tests | 07.6 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Shell chrome icons readable in dark and light on `#/next/feed` host; no invent OP PASS.
