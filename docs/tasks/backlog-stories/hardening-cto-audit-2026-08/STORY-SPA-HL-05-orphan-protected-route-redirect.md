# STORY-SPA-HL-05 — Orphan ProtectedRouteRedirect cleanup / wire

## Meta
- **Key:** `STORY-SPA-HL-05-orphan-protected-route-redirect`
- **Epic:** [`EPIC-SPA-10-hardening-cto-audit`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** [hardening-cto-audit-2026-08/](README.md) · builder pkg **`pkg-000063`**
- **Status:** Done — P3 gate PASS · **P7 WAVE COMPLETE** 2026-08-10T10:07:35Z (`pkg-000063`/`000064`) · F1–F4+F6 CLOSED · F5 WAIVED
- **Severity:** 🟠 Medium (fix-before-launch)
- **Source:** [audit §F3 / A7](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** overlay guard in [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx) (`isProtectedPath` + `SessionShellOverlay`); orphan `ProtectedRouteRedirect` removed on P3
- **Out of scope for this file:** redesign всей session-shell модели (см. HL-06)
- **Canonical guard (AC#2):** **overlay** — not Navigate redirect (decision **delete**, T01 2026-08-10T09:41:49Z)

## Зачем простыми словами

**Historical:** в коде был неиспользуемый экспорт `ProtectedRouteRedirect` → `/profile` рядом с реальной защитой через **overlay** — две ментальные модели («редирект» vs «overlay»).

**As-of-Done:** orphan удалён (decision **delete**); каноничный guard = **overlay** (`isProtectedPath` + `SessionShellOverlay`). См. Canonical guard Meta.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| `ProtectedRouteRedirect` только определён, импортов в `src` нет | audit F3 · **As-of-Done:** export **removed** P3 |
| Фактический guard = `SessionShellOverlay` + `isProtectedPath` | `AppShellLayout.jsx` · `sessionRoutePolicy.js` |
| `App.jsx` не использует Navigate-to-login для protected | audit S4 note |

## Функциональные требования (первый слой)

- **FR-HL-05.1** В кодовой базе нет «висящего» публичного API redirect-helper без использования **или** он реально участвует в маршрутизации.
- **FR-HL-05.2** Документированная модель защиты protected routes совпадает с кодом (overlay и/или redirect — явно).
- **FR-HL-05.3** Решение не ломает текущие AC session shell / cabinet overlay (регрессия vitest + smoke).

## Acceptance Criteria (problem-level)

- [x] Orphan export устранён **или** wired с тестом/маршрутом.
- [x] Короткий note в analysis/backlog: какая модель guard канонична сейчас.
- [x] `verify:security` / релевантные session tests зелёные.


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-05-orphan-protected-route-redirect`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/STORY-SPA-HL-05-orphan-protected-route-redirect.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-05-t01-decision-delete-vs-wire`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t01-decision-delete-vs-wire/README.md) | Done |
| T02 | [`task-spa-hl-05-t02-execute-decision`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t02-execute-decision/README.md) | Done |
| T03 | [`task-spa-hl-05-t03-story-gate-hl-05`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t03-story-gate-hl-05/README.md) | Done |
| T04 | [`task-spa-hl-05-t04-commit-orphan-delete`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t04-commit-orphan-delete/README.md) | Done · P6 · F1 CLOSED |
| T05 | [`task-spa-hl-05-t05-as-of-done-pipeline-problema`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t05-as-of-done-pipeline-problema/README.md) | Done · P6 · F2 CLOSED |
| T06 | [`task-spa-hl-05-t06-as-of-done-t01-code-facts`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t06-as-of-done-t01-code-facts/README.md) | Done · P6 · F3 CLOSED |
| T07 | [`task-spa-hl-05-t07-dashboard-parent-index-hl-05-done`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t07-dashboard-parent-index-hl-05-done/README.md) | Done · P6 · F4 CLOSED |
| T08 | [`task-spa-hl-05-t08-historical-zachem-narrative`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/task-spa-hl-05-t08-historical-zachem-narrative/README.md) | Done · P6 · F6 CLOSED |

> P3 Done · P6 CLOSED 2026-08-10T10:04:21Z · `pkg-000064` · F1–F4+F6 CLOSED · F5 WAIVED.

## Вне scope

- Смена overlay → unmount (HL-06).
- Новые protected prefixes.

## Швы

- `AppShellLayout.jsx` · `App.jsx` · `sessionRoutePolicy.js` · session shell tests

## Next (process)

1. ~~PA.3 / P1.3 / P3 / P4 / P5 / P6 / P7~~ — Done · WAVE COMPLETE.
2. Commits only on explicit ask · next ship blocker HL-06.
