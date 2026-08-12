# STORY-SPA-HL-03 — Handoff return-path automated tests

## Meta
- **Key:** `STORY-SPA-HL-03-handoff-return-path-tests`
- **Epic:** [`EPIC-SPA-10-hardening-cto-audit`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** [hardening-cto-audit-2026-08/](README.md) · builder pkg **`pkg-000061`**
- **Status:** Done — P3 gate PASS 2026-08-09T13:08:31Z (`pkg-000061`) · **P4 Ready** 2026-08-09T13:15:03Z ([audit](../../../analysis/audit-STORY-SPA-HL-03-execution-2026-08-09.md) · F1 Low parent INDEX)
- **Severity:** 🔴 High (fix-before-launch)
- **Source:** [audit §F2 / S5 Partial](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** [`resolveHandoffReturnPath`](../../../../src/auth/storyHandoffFlowState.js); Login `next`/`redirect` ([LoginPage.jsx](../../../../src/pages/LoginPage.jsx))
- **Out of scope for this file:** смена правил allowlist путей; полный e2e pentest open-redirect

## Зачем простыми словами

После логина SPA возвращает пользователя по query `next` / `redirect` (критично для GPT draft handoff: вернуться на `/story/submit?draft_id=…`). Логика отсекает опасные варианты (`//…`, не-`/`), но **автотестов на функцию нет** — регрессия open-redirect может пройти незаметно.

Нужен фиксированный набор проверок «разрешено / запрещено → fallback `/board`».

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done** | Dedicated vitest 9/9 · [gate](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-03-handoff-return-path-tests/task-spa-hl-03-t02-story-gate-hl-03/acceptance-verification-spa-hl-03.md) PASS 2026-08-09T13:08:31Z |
| **Historical** (audit) | `rg resolveHandoffReturnPath` in `__tests__` empty · S5 Partial |
| Helper | `storyHandoffFlowState.js:75–84` |
| Login читает `next` и `redirect` | `LoginPage.jsx` + audit F2 |
| Handoff login loop | `buildHandoffLoginPath` → `next=` |

## Функциональные требования (первый слой)

- **FR-HL-03.1** Существуют автоматизированные тесты на return-path helper (или эквивалентный контракт Login), покрывающие как минимум: валидный internal path; path с query (`draft_id`); пустой/absent → `/board`; `//…` → `/board`; absolute URL / non-`/` → `/board`.
- **FR-HL-03.2** Тесты входят в обычный CI/`verify:security` (или `vitest run`) без ручного шага.
- **FR-HL-03.3** Criterion S5 аудита может быть переоценен в Pass при re-audit с evidence тестов.

## Acceptance Criteria (problem-level)

- [x] Dedicated tests существуют и зелёные.
- [x] Опасные candidates стабильно режутся в тестах.
- [x] Handoff happy `next=/story/submit?draft_id=…` остаётся разрешённым.


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-03-handoff-return-path-tests`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-03-handoff-return-path-tests/STORY-SPA-HL-03-handoff-return-path-tests.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-03-t01-unit-resolveHandoffReturnPath`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-03-handoff-return-path-tests/task-spa-hl-03-t01-unit-resolveHandoffReturnPath/README.md) | Done |
| T02 | [`task-spa-hl-03-t02-story-gate-hl-03`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-03-handoff-return-path-tests/task-spa-hl-03-t02-story-gate-hl-03/README.md) | Done |

> **P3 Done** 2026-08-09T13:08:31Z · `pkg-000061` · [run-summary](../../run-reports/run-summary-20260809-1308-spa-hl-03-p3.md).

## Вне scope

- Изменение product redirect UX.
- Puppeteer full handoff (отдельные runners уже есть).
- OAuth GPT bridge return URL (другой контур — HL-08).

## Швы

- `storyHandoffFlowState.js` · `LoginPage.jsx` · vitest · ID-12 handoff

## Next (process)

1. ~~PA.3 / P1.3 / P3~~ — Done · `pkg-000061`.
2. ~~P4 hard-audit~~ — Done · **Ready** ([audit](../../../analysis/audit-STORY-SPA-HL-03-execution-2026-08-09.md)).
3. Optional P5: WAIVE F2–F4.
4. Next ship blocker: HL-04 · Commits — только по явной команде.
