# STORY-SPA-HL-05-orphan-protected-route-redirect — Orphan ProtectedRouteRedirect cleanup / wire

## Meta (pipeline)

- **Key:** `STORY-SPA-HL-05-orphan-protected-route-redirect`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000063`
- **Status:** Done — P3 gate PASS · **P7 WAVE COMPLETE** 2026-08-10T10:07:35Z (`pkg-000063`/`000064`) · F1–F4+F6 CLOSED · F5 WAIVED
- **Severity:** Medium — fix-before-launch
- **Wave:** Fix-before-launch
- **Finding:** F3 / A7 ([audit](../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md))
- **source:** [`../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md`](../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md)
- **decision_ref:** backlog STORY-SPA-HL-05 + audit §F3/A7 · HEAD `eaec8bb` (audit-time)
- **ui_scope:** `none` (docs/code cleanup; no UX page; HL-06 owns overlay→unmount)
- **P1.3:** 2026-08-10T09:35:22Z · **P3 Done:** 2026-08-10T09:42:36Z · **P5:** 2026-08-10T09:55:04Z · **P6:** 2026-08-10T10:04:21Z · **P7:** 2026-08-10T10:07:35Z

## Зачем простыми словами

**Historical:** в коде был неиспользуемый экспорт `ProtectedRouteRedirect` → `/profile` рядом с реальной защитой через **overlay** на protected routes — две ментальные модели («редирект» vs «overlay»).

**As-of-Done:** orphan удалён (decision **delete** · commit `16b4473`); каноничный guard = **overlay** (`isProtectedPath` + `SessionShellOverlay`). HL-06 владеет сменой overlay→unmount.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done / Current:** `ProtectedRouteRedirect` **ABSENT** in `spa-app/src` | `rg ProtectedRouteRedirect spa-app/src` → ABSENT · [`AppShellLayout.jsx`](../../../../../src/layout/AppShellLayout.jsx) ends at `ProtectedProfilePage` · commit `16b4473` |
| **As-of-Done / Current:** guard = `SessionShellOverlay` + `isProtectedPath` | `AppShellLayout.jsx` L28–41 · [`sessionRoutePolicy.js`](../../../../../src/router/sessionRoutePolicy.js) |
| `App.jsx` не использует Navigate-to-login для protected | audit S4 note · [`App.jsx`](../../../../../src/App.jsx) |
| **Historical (pre-T02 / audit F3):** orphan export L56–58 + unused `Navigate` import | CTO audit §F3 · `git show` pre-`16b4473` |

## Функциональные требования (первый слой)

- **FR-HL-05.1** В кодовой базе нет «висящего» публичного API redirect-helper без использования **или** он реально участвует в маршрутизации.
- **FR-HL-05.2** Документированная модель защиты protected routes совпадает с кодом (overlay и/или redirect — явно).
- **FR-HL-05.3** Решение не ломает текущие AC session shell / cabinet overlay (регрессия vitest + smoke).

## Acceptance Criteria (problem-level)

- [x] Orphan export устранён **или** wired с тестом/маршрутом.
- [x] Короткий note в analysis/backlog: какая модель guard канонична сейчас.
- [x] `verify:security` / релевантные session tests зелёные.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-hl-05-t01-…](./task-spa-hl-05-t01-decision-delete-vs-wire/README.md) | **Done** · Decision delete |
| **T02** | [task-spa-hl-05-t02-…](./task-spa-hl-05-t02-execute-decision/README.md) | **Done** · Execute delete |
| **T03** | [task-spa-hl-05-t03-…](./task-spa-hl-05-t03-story-gate-hl-05/README.md) | **Done** · Story gate HL-05 |
| **T04** | [task-spa-hl-05-t04-…](./task-spa-hl-05-t04-commit-orphan-delete/README.md) | **Done** · P6 · F1 CLOSED · `16b4473` |
| **T05** | [task-spa-hl-05-t05-…](./task-spa-hl-05-t05-as-of-done-pipeline-problema/README.md) | **Done** · P6 · F2 CLOSED |
| **T06** | [task-spa-hl-05-t06-…](./task-spa-hl-05-t06-as-of-done-t01-code-facts/README.md) | **Done** · P6 · F3 CLOSED |
| **T07** | [task-spa-hl-05-t07-…](./task-spa-hl-05-t07-dashboard-parent-index-hl-05-done/README.md) | **Done** · P6 · F4 CLOSED |
| **T08** | [task-spa-hl-05-t08-…](./task-spa-hl-05-t08-historical-zachem-narrative/README.md) | **Done** · P6 · F6 CLOSED |

## Вне scope

- Смена overlay → unmount (HL-06).
- Новые protected prefixes.

## Швы (указатели)

- `AppShellLayout.jsx` · `App.jsx` · `sessionRoutePolicy.js` · session shell tests

## Notes

- Gate: [`task-spa-hl-05-t03-story-gate-hl-05/acceptance-verification-spa-hl-05.md`](./task-spa-hl-05-t03-story-gate-hl-05/acceptance-verification-spa-hl-05.md)
- Prefer FR/AC from backlog file as story gate source of truth.

### Decision (T01) — confirmed P3 2026-08-10T09:41:49Z

| Rule | Choice |
|------|--------|
| **Decision** | **delete** unused `ProtectedRouteRedirect` |
| Evidence | `rg ProtectedRouteRedirect spa-app/src` → **ABSENT** (As-of-Done); **Historical:** sole hit L56–58 pre-T02 |
| Canonical guard model (AC#2 / FR-HL-05.2) | **overlay** on protected paths: `isProtectedPath` + `SessionShellOverlay` via `shouldShowSessionShellOverlay` — **not** Navigate redirect |
| T02 | Remove export + unused `Navigate` import from `AppShellLayout.jsx` |
