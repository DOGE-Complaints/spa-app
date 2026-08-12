# STORY-SPA-HL-07 — Main bundle size / split outcome

## Meta
- **Key:** `STORY-SPA-HL-07-bundle-size-split`
- **Epic (target):** TBD · design-foundation / perf adjacent
- **Package:** [hardening-cto-audit-2026-08/](README.md)
- **Status:** Todo — tech decomp Ready (pipeline scaffolded; not executed) · **Post-MVP**
- **Severity:** ⚪ Info → perf debt
- **Source:** [audit §F7 / C7](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** текущий Vite build warning (>500 kB); крупные словари (`identityDictionary.js` и др.)
- **Out of scope for this file:** конкретная стратегия chunking; удаление i18n

## Зачем простыми словами

Production-сборка предупреждает, что главный JS-чанк **> 500 kB**. Для MVP это не ломает loop, но ухудшает first load на слабых сетях и усложняет будущие фичи.

Нужен outcome: измеримо уменьшить риск монолитного main chunk (без требования «идеальной» цифры в этом intake).

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| Vite warning: chunk larger than 500 kB; ~662 kB JS gzip ~185 kB | audit build log / F7 |
| Крупные файлы: identityDictionary ~1818 lines, LoginPage ~516, BoardPage ~367 | audit C7 |
| TODO/FIXME в product src почти нет — долг структурный | audit F9 |

## Функциональные требования (первый слой)

- **FR-HL-07.1** Есть целевой outcome по bundle (например: main chunk под лимитом **или** явный split routes/dictionaries с измерением до/после).
- **FR-HL-07.2** Изменения не ломают i18n EN/ET/RU на критических экранах (login, board, cabinet, handoff).
- **FR-HL-07.3** `verify:security` / build остаются зелёными; SEC-01 bundle guard не ослабляется.

## Acceptance Criteria (problem-level)

- [ ] Зафиксирована целевая метрика и baseline (из audit или свежий build).
- [ ] Достигнуто улучшение **или** явный waive post-MVP с причиной.
- [ ] Регрессии критических flows закрыты тестами/smoke.


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-07-bundle-size-split`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-07-bundle-size-split/STORY-SPA-HL-07-bundle-size-split.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-07-t01-baseline-chunk-metrics`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-07-bundle-size-split/task-spa-hl-07-t01-baseline-chunk-metrics/README.md) | Todo |
| T02 | [`task-spa-hl-07-t02-split-outcome-plan`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-07-bundle-size-split/task-spa-hl-07-t02-split-outcome-plan/README.md) | Todo |
| T03 | [`task-spa-hl-07-t03-implement-split`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-07-bundle-size-split/task-spa-hl-07-t03-implement-split/README.md) | Todo |
| T04 | [`task-spa-hl-07-t04-verify-i18n-security`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-07-bundle-size-split/task-spa-hl-07-t04-verify-i18n-security/README.md) | Todo |
| T05 | [`task-spa-hl-07-t05-story-gate-hl-07`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-07-bundle-size-split/task-spa-hl-07-t05-story-gate-hl-07/README.md) | Todo |

> Tech decomposition Ready. Execute only after pkg activation / P3.

## Вне scope

- CDN / HTTP caching infra.
- Удаление локалей.

## Швы

- Vite build · `src/i18n/*Dictionary.js` · route-level code split · verify:security

## Next (process)

1. PA.3 — wave confirmation if needed.
2. P3 / pkg activation — then execute Nested tasks in order.
3. Story-gate task closes FR/AC; set Status Done only after gate.
