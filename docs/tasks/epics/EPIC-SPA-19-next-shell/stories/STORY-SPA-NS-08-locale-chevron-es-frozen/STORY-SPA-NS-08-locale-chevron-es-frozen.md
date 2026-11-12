# STORY-SPA-NS-08-locale-chevron-es-frozen — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md)  
> **Status:** P8 local close · structure **Present** · gate **BLOCK** · `2026-10-22T13:04:05Z` · tip · `activation: none` · Story **BLOCKED** (OP eye) OK · NO PUSH  
> **Package:** `pkg-000201` · next-shell · Interview L1 · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `shell` · soft `#/next/feed` host · **mixed** · Path A code lock · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NS-07 ShellChromeIcon Present · LocaleSelector + i18n registry Present  
> **Runtime:** T01–T03 **Done** · LocaleSelector+i18n **74/74** · ns08 **3/3** · Path A 01–05 Present · [disposition](../../../../../analysis/p5-disposition-STORY-SPA-NS-08-2026-10-22.md) F1 WAIVED operator · F2 WAIVED info · TASKED=**0** · P6 not needed · no invent OP PASS · no full ES dictionary

## Purpose

Locale trigger trailing control uses literal `v`/`^`. Menu lists et/ru/en only. Need chevron **icon** + **es** row frozen (not selectable) with hover/focus tooltip (request language) — copy tip lock in i18n.

## L1 — FR (backlog verbatim)

- **FR-NS-08.1** Trailing control uses chevron **icon** (not literal `v`/`^`).  
- **FR-NS-08.2** Menu lists et / ru / en as today + **es** row **frozen** (not selectable).  
- **FR-NS-08.3** Hover/focus on frozen ES shows tooltip: request language / we can add (copy tip lock in i18n).  
- **FR-NS-08.4** Vitest · OP eye — no invent PASS · no full ES dictionary.

## Acceptance Criteria (backlog verbatim)

- [x] Chevron icon Present (structure)  
- [x] ES frozen + tooltip (structure)  
- [x] Active locales unchanged (structure)  
- [x] Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-08-locale-chevron-es-frozen.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-08-t01-chevron](task-spa-ns-08-t01-chevron/README.md) | Replace v/^ with ShellChromeIcon chevron | **Done** |
| T02 | [task-spa-ns-08-t02-es-frozen](task-spa-ns-08-t02-es-frozen/README.md) | Add es option disabled + tooltip | **Done** |
| T03 | [task-spa-ns-08-t03-vitest](task-spa-ns-08-t03-vitest/README.md) | Markers | **Done** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

Rail · logo UX · invent ES translations

## DoD (backlog verbatim)

Chevron icon Present · ES frozen + tooltip · active locales unchanged · Vitest / Path A · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **L1** · soft NS-07 ShellChromeIcon · Path A code lock  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-locale-chevron-es-frozen.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
