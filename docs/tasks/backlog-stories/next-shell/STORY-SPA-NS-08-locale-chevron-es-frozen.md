# STORY-SPA-NS-08 — Locale chevron + ES frozen

## Meta

- **Key:** `STORY-SPA-NS-08-locale-chevron-es-frozen`
- **Package:** [next-shell](INDEX.md)
- **Layers:** L1 · L1.5 soft · L2
- **Status:** P8 local close · T01–T03 **Done** · structure **Present** · visual **BLOCKED** (OP eye) OK · gate **BLOCK** · `pkg-000201` closed · `activation: none` · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-08-locale-chevron-es-frozen/STORY-SPA-NS-08-locale-chevron-es-frozen.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NS-08-2026-10-22.md)
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **L1**
- **Code home:** `LocaleSelector.jsx` · `i18n/core.js`

## L1 — FR

- **FR-NS-08.1** Trailing control uses chevron **icon** (not literal `v`/`^`).  
- **FR-NS-08.2** Menu lists et / ru / en as today + **es** row **frozen** (not selectable).  
- **FR-NS-08.3** Hover/focus on frozen ES shows tooltip: request language / we can add (copy tip lock in i18n).  
- **FR-NS-08.4** Vitest · OP eye — no invent PASS · no full ES dictionary.

## OOS

Rail · logo UX · invent ES translations

## AC

- [ ] Chevron icon Present  
- [ ] ES frozen + tooltip  
- [ ] Active locales unchanged  
- [ ] Vitest · OP eye  

## L2 — Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ns-08-t01-chevron` | **Done** | Replace v/^ with ShellChromeIcon chevron | LocaleSelector.jsx | 08.1 |
| `task-spa-ns-08-t02-es-frozen` | **Done** | Add es option disabled + tooltip | core.js · LocaleSelector | 08.2 · 08.3 |
| `task-spa-ns-08-t03-vitest` | **Done** | Markers | tests | 08.4 |

### Order

`t01` → `t02` → `t03` · skill `react-expert`
