# STORY-SPA-HL-06 — Protected-route guard model (overlay vs unmount)

## Meta
- **Key:** `STORY-SPA-HL-06-protected-route-guard-model`
- **Epic (target):** TBD / EPIC-SPA-05 adjacent · session shell
- **Package:** [hardening-cto-audit-2026-08/](README.md)
- **Status:** Todo — tech decomp Ready (pipeline scaffolded; not executed) · **Post-MVP**
- **Severity:** 🟠 Medium (architecture / product)
- **Source:** [audit §F5](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** текущий overlay guard ([AppShellLayout](../../../../src/layout/AppShellLayout.jsx), [sessionShellState](../../../../src/auth/sessionShellState.js)); HL-05 (канон docs) желателен до/параллельно
- **Out of scope for this file:** pixel redesign sidebar; полная замена identity session model

## Зачем простыми словами

Сейчас protected страницы **монтируются** под оверлеем Sign In. Это может давать краткую отрисовку/эффекты до/сквозь guard. Для MVP loop это принято; для ужесточённой модели безопасности/UX нужно **явное продуктовое решение**: оставить overlay-only или перейти к unmount / redirect-to-login с `next=`.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| `Outlet` рендерится вместе с overlay | `AppShellLayout.jsx:38–42` |
| Overlay включается для logged_out на protected | `shouldShowSessionShellOverlay` |
| Нет Navigate-to-login как единственного guard | audit S4 / F5 |
| Риск: paint / child effects — зависит от страницы | audit F5 |

## Функциональные требования (первый слой)

- **FR-HL-06.1** Принято и записано решение: **A** overlay-only (as-is, documented) **или** **B** unmount/redirect until authenticated.
- **FR-HL-06.2** Если B — protected content не активен (нет смыслового UI/effect happy-path) до валидной сессии; return path через `next` сохранён для handoff.
- **FR-HL-06.3** Public routes (`/board`, `/issue/*`, …) остаются без ложного login wall (FR-02.2 / ID-13 intent).
- **FR-HL-06.4** Cabinet in-page error states (CAB-07) не ломаются выбранной моделью без явного waive.

## Acceptance Criteria (problem-level)

- [ ] ADR/backlog note с выбором A/B и why.
- [ ] Код и docs совпадают с выбором.
- [ ] Public browsing + handoff login return проверены на уровне AC стори.


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-06-protected-route-guard-model`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-06-protected-route-guard-model/STORY-SPA-HL-06-protected-route-guard-model.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-06-t01-product-decision-overlay-vs-unmount`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-06-protected-route-guard-model/task-spa-hl-06-t01-product-decision-overlay-vs-unmount/README.md) | Todo |
| T02 | [`task-spa-hl-06-t02-implement-chosen-model`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-06-protected-route-guard-model/task-spa-hl-06-t02-implement-chosen-model/README.md) | Todo |
| T03 | [`task-spa-hl-06-t03-public-path-regression`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-06-protected-route-guard-model/task-spa-hl-06-t03-public-path-regression/README.md) | Todo |
| T04 | [`task-spa-hl-06-t04-story-gate-hl-06`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-06-protected-route-guard-model/task-spa-hl-06-t04-story-gate-hl-06/README.md) | Todo |

> Tech decomposition Ready. Execute only after pkg activation / P3.

## Вне scope

- HL-05 orphan cleanup alone.
- Visual chrome taste (UAT addendum).

## Швы

- AppShellLayout · sessionShellState · Login next= · ID-13 public path policy

## Next (process)

1. PA.3 — wave confirmation if needed.
2. P3 / pkg activation — then execute Nested tasks in order.
3. Story-gate task closes FR/AC; set Status Done only after gate.
