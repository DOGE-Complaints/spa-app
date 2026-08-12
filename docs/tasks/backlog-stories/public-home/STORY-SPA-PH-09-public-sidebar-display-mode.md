# STORY-SPA-PH-09 — Public sidebar display mode (reversible)

## Meta
- **Key:** `STORY-SPA-PH-09-public-sidebar-display-mode`
- **Epic:** [`EPIC-SPA-11-uat-inbound-2026-08`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md)
- **Pipeline:** [`pipeline`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/STORY-SPA-PH-09-public-sidebar-display-mode.md)
- **Package:** [public-home/](README.md) · **`pkg-000057`**
- **Status:** Done — P3 gate PASS 2026-08-08T09:04:55Z (`pkg-000057`) · **P7 WAVE COMPLETE** ([reaudit](../../../analysis/reaudit-STORY-SPA-PH-09-gap-closure-2026-08-08.md) · F1 CLOSED · F2 WAIVED)
- **Severity:** Fix-before-demo
- **Wave:** Demo polish
- **Source inbound:** [`../inbound/DOGEstonia-Story-Public-Pages-Without-Left-Sidebar.md`](../inbound/DOGEstonia-Story-Public-Pages-Without-Left-Sidebar.md)
- **decision_ref:** UAT inbound 2026-08-06

## Зачем простыми словами

Левая WORKSPACE-колонка на public занимает ширину и выглядит как admin shell. Нужен режим вывода (выкл по умолчанию на public), а не hard-delete — чтобы вернуть колонку при расширении функционала.

**As-of-Done:** public routes use `PUBLIC_SHELL_SHOW_SIDEBAR=false` (no WORKSPACE column); cabinet keeps sidebar; restore = flip constant to `true` in [`publicShell.js`](../../../../src/config/publicShell.js).

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **Current** AppShell | `showSidebar` default true; false → no aside · [`AppShell.jsx`](../../../../src/components/AppShell/AppShell.jsx) |
| **Current** public SSOT | [`publicShell.js`](../../../../src/config/publicShell.js) `=false` · Board/HIW/Issue wired |
| **Current** grid | `.board-main--no-sidebar` → `1fr` |
| **Historical** pre-PH-09 | aside always rendered; public always passed Sidebar |
| Product decision | showSidebar prop default true; PUBLIC_SHELL_SHOW_SIDEBAR=false for public |

## Функциональные требования

- **FR-PH-09.1** AppShell поддерживает `showSidebar` (default true); при false `<aside>` не рендерится, main full-width.
- **FR-PH-09.2** Public SSOT constant `PUBLIC_SHELL_SHOW_SIDEBAR` (или эквивалент) — один flip возвращает колонку.
- **FR-PH-09.3** Public routes board/issue/how-it-works используют constant=false; cabinet/protected сохраняют sidebar.
- **FR-PH-09.4** Nav через header остаётся достаточным; нет потерянных обязательных public actions.
- **FR-PH-09.5** Не redesign How it works composition (PH-08).

## Acceptance Criteria

- [x] Public: нет постоянной WORKSPACE-колонки при default constant.
- [x] Cabinet: sidebar на месте.
- [x] Constant flip documented → restore path.
- [x] Narrow без пустой зависимости от удалённой колонки.

## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-PH-09-public-sidebar-display-mode`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/STORY-SPA-PH-09-public-sidebar-display-mode.md)
- **Epic:** [`EPIC-SPA-11`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-ph-09-t01-sidebar-display-contract`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/task-spa-ph-09-t01-sidebar-display-contract/README.md) | Done |
| T02 | [`task-spa-ph-09-t02-appshell-css-showSidebar`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/task-spa-ph-09-t02-appshell-css-showSidebar/README.md) | Done · ui_anchor |
| T03 | [`task-spa-ph-09-t03-wire-public-pages-constant`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/task-spa-ph-09-t03-wire-public-pages-constant/README.md) | Done |
| T04 | [`task-spa-ph-09-t04-cabinet-sidebar-regression`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/task-spa-ph-09-t04-cabinet-sidebar-regression/README.md) | Done |
| T05 | [`task-spa-ph-09-t05-story-gate-ph-09`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/task-spa-ph-09-t05-story-gate-ph-09/README.md) | Done · gate PASS |
| T06 | [`task-spa-ph-09-t06-screenshots-pack-hygiene`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/task-spa-ph-09-t06-screenshots-pack-hygiene/README.md) | Done · **P7 CLOSED F1** |

## Вне scope

- HIW step/card redesign (PH-08)
- Cabinet redesign
- Content/copy changes
- Hard-delete Sidebar component
- F2 Sidebar JSX conditional (WAIVED info-nonblocking)

## Швы (указатели)

AppShell.jsx · index.css board-main · BoardPage · HowItWorksPage · IssuePage · Sidebar.jsx · publicShell.js

## Next (process)

1. ~~P1.3 / P2 / P3~~ — Done 2026-08-08T09:04:55Z (`pkg-000057`).
2. ~~P4 audit~~ — Ready 2026-08-08T09:08:04Z.
3. ~~P5 scaffold~~ — 2026-08-08T09:38:26Z · F1→T06 · F2 WAIVED.
4. ~~P6~~ — T06 Done 2026-08-08T09:41:23Z · F1 CLOSED · actionable empty.
5. ~~P7~~ — WAVE COMPLETE 2026-08-08T09:43:05Z · `run_mode` retired.
6. Next demo story: PH-08. Commits — только по явной команде.
