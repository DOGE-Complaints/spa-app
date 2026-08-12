# STORY-SPA-PH-09-public-sidebar-display-mode — Public sidebar display mode (reversible)

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-09-public-sidebar-display-mode`
- **Parent Epic:** [`../../EPIC-SPA-11-uat-inbound-2026-08.md`](../../EPIC-SPA-11-uat-inbound-2026-08.md)
- **Epic:** EPIC-SPA-11 UAT inbound 2026-08 · Demo shell
- **Пакет:** `public-home/` · **Package:** `pkg-000057`
- **Status:** Done — P3 gate PASS 2026-08-08T09:04:55Z (`pkg-000057`) · **P4 Ready** · **P6 T06 Done** · **P7 WAVE COMPLETE** 2026-08-08T09:43:05Z ([reaudit](../../../../analysis/reaudit-STORY-SPA-PH-09-gap-closure-2026-08-08.md) · F1 CLOSED · F2 WAIVED · `run_mode` retired)
- **Severity:** Fix-before-demo
- **Wave:** Demo polish
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-09-public-sidebar-display-mode.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-09-public-sidebar-display-mode.md)
- **decision_ref:** UAT inbound 2026-08-06 + [`../../../../backlog-stories/inbound/DOGEstonia-Story-Public-Pages-Without-Left-Sidebar.md`](../../../../backlog-stories/inbound/DOGEstonia-Story-Public-Pages-Without-Left-Sidebar.md)
- **ui_scope:** `chrome` (T02 ui_anchor)
- **Scaffolded:** 2026-08-08T08:52:31Z · **P3 Done:** 2026-08-08T09:04:55Z
- **Related:** ≠ [PH-08 HIW composition](../../../../backlog-stories/public-home/STORY-SPA-PH-08-how-it-works-first-class-page.md)

## Зачем простыми словами

Левая WORKSPACE-колонка на public занимает ширину и выглядит как admin shell. Нужен режим вывода (выкл по умолчанию на public), а не hard-delete — чтобы вернуть колонку при расширении функционала.

**As-of-Done:** public board/issue/HIW используют `PUBLIC_SHELL_SHOW_SIDEBAR=false` → нет `<aside>`; cabinet/protected оставляют default `showSidebar=true`. Restore = flip constant to `true`.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **Current** AppShell prop | `showSidebar` default true; false → no aside · [`AppShell.jsx`](../../../../../../src/components/AppShell/AppShell.jsx) |
| **Current** public SSOT | [`publicShell.js`](../../../../../../src/config/publicShell.js) `PUBLIC_SHELL_SHOW_SIDEBAR=false` · Board/HIW/Issue wired |
| **Current** grid | `.board-main--no-sidebar` → `1fr` · [`index.css`](../../../../../../src/index.css) |
| **Historical** pre-PH-09 | aside always rendered; public always passed Sidebar; grid `272px 1fr` only |
| Cabinet/protected | AppShellLayout default shell keeps sidebar |

## Contract (display mode)

| Symbol | Default | Public SSOT | Restore path |
|--------|---------|-------------|--------------|
| `showSidebar` prop on `AppShell` | `true` | callers pass `PUBLIC_SHELL_SHOW_SIDEBAR` | flip constant → `true` |
| `PUBLIC_SHELL_SHOW_SIDEBAR` | — | **`false`** for board / issue / how-it-works | set to `true` in [`publicShell.js`](../../../../../../src/config/publicShell.js) |

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

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | demo | [task-spa-ph-09-t01-sidebar-display-contract](./task-spa-ph-09-t01-sidebar-display-contract/README.md) | **Done** · Contract |
| **T02** | demo | [task-spa-ph-09-t02-appshell-css-showSidebar](./task-spa-ph-09-t02-appshell-css-showSidebar/README.md) | **Done** · ui_anchor |
| **T03** | demo | [task-spa-ph-09-t03-wire-public-pages-constant](./task-spa-ph-09-t03-wire-public-pages-constant/README.md) | **Done** · Wire pages |
| **T04** | demo | [task-spa-ph-09-t04-cabinet-sidebar-regression](./task-spa-ph-09-t04-cabinet-sidebar-regression/README.md) | **Done** · Cabinet regression |
| **T05** | demo | [task-spa-ph-09-t05-story-gate-ph-09](./task-spa-ph-09-t05-story-gate-ph-09/README.md) | **Done** · gate PASS 09:04:55Z |
| **T06** | post-audit | [task-spa-ph-09-t06-screenshots-pack-hygiene](./task-spa-ph-09-t06-screenshots-pack-hygiene/README.md) | **Done** · F1 **P7 CLOSED** · P6 09:41:23Z |

## Вне scope

- HIW step/card redesign (PH-08)
- Cabinet redesign
- Content/copy changes
- Hard-delete Sidebar component
- F2 Sidebar JSX conditional (WAIVED info-nonblocking)

## Швы (указатели)

AppShell.jsx · index.css board-main · BoardPage · HowItWorksPage · IssuePage · Sidebar.jsx · publicShell.js

## Notes

- PH-08 and PH-09 must not be merged: composition ≠ sidebar display mode.
- Gate: [`task-spa-ph-09-t05-story-gate-ph-09/acceptance-verification-spa-ph-09.md`](./task-spa-ph-09-t05-story-gate-ph-09/acceptance-verification-spa-ph-09.md)
- P5 disposition: F1 **CLOSED** (T06 · P7 verified) · F2 **WAIVED** info-nonblocking · Product Done · actionable gap-list **empty** · `run_mode=spa_ph_09_audit_2026_08_08` **retired**.
- Screenshots: [`screenshots/`](./screenshots/)
- Audit: [`../../../../analysis/audit-STORY-SPA-PH-09-execution-2026-08-08.md`](../../../../analysis/audit-STORY-SPA-PH-09-execution-2026-08-08.md)
