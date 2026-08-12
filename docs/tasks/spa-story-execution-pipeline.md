# Spa — Story execution pipeline

> **Профиль Builder Queue:** `spa`  
> **Операторский маршрут:** [`docs/methodology/Zeya888-builder-queue/core/workflow.md`](../../../docs/methodology/Zeya888-builder-queue/core/workflow.md)  
> **Runtime plan:** [`.cursor/plans/Spa_builder.plan.md`](../../../.cursor/plans/Spa_builder.plan.md)

## SSOT

| Слой | Источник |
|------|----------|
| Doc-gap backlog stories | `docs/tasks/backlog-stories/STORY-SPA-*.md` + [`INDEX.md`](backlog-stories/INDEX.md) |
| Gap analysis | [`docs/analysis/spa-app-doc-code-gap-report.md`](../analysis/spa-app-doc-code-gap-report.md) |
| Requirements (инкременты) | `docs/requirements/` |
| UX / design | `docs/UX/`, `docs/i18n-architecture.md` |
| Очередь исполнения | immutable `spa-active-packages/pkg-*.yaml` |
| Статусы волн | [`bullrun-launch-index.md`](bullrun-launch-index.md) |
| Progress snapshot | [`spa-backlog-dashboard.md`](spa-backlog-dashboard.md) |
| Operator contract | [`spa-operator-contract.md`](../../../docs/methodology/Zeya888-builder-queue/contracts/spa-operator-contract.md) |

## Треки в индексе

| Трек | Содержание | Статус |
|------|------------|--------|
| **Legacy** | `EPIC-DASH-01` — DASH-P0..P2 (dashboard cutover) | Частично Done |
| **Primary** | Doc-gap packages (`design-foundation`, `search-and-filters`, …) | Bootstrap → P1.3 |
| **Bugs** | [`backlog-stories/bugs/`](backlog-stories/bugs/INDEX.md) — [bug-intake-workflow](../../../docs/methodology/Zeya888-builder-queue/workflow/bug-intake-workflow.md) | Inbox |

Новые волны Builder Queue — **primary** (backlog stories). Legacy DASH tasks завершаются по старому индексу или отдельным pkg. Bugs — отдельный intake, не смешивать с G-track без решения оператора.

## Sync после task/story (обязательно)

После каждого закрытого task или story gate:

1. `bullrun-launch-index.md` + `backlog-stories/INDEX.md`
2. Package `INDEX.md` (если есть)
3. [`spa-backlog-dashboard.md`](spa-backlog-dashboard.md) — [maintenance guide](../../../docs/methodology/Zeya888-builder-queue/workflow/backlog-dashboard-maintenance.md)

## Перед batch-run (обязательно)

1. [`bullrun-launch-index.md`](bullrun-launch-index.md) §«Актуальная точка».
2. [`spa-active-package.current.yaml`](spa-active-package.current.yaml) → `package_file`.
3. `python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify`  
   **До первого P1:** ожидаемо `FAIL` (bootstrap pkg) — не начинать P3; сначала **P1.3** backlog intake.
4. Backlog story без pipeline epic → **P1.3** (`input_mode=backlog_story`), не P3 Execute.
5. Оператор указал **один** `input_mode` на сессию (contract §4).

## Gate: Story AC (backlog / pipeline)

После **последнего** task README в story:

- AC из backlog-файла (`STORY-SPA-*`) или pipeline story в `epics/…/stories/…`.
- §Documentation touchpoints в backlog story — обновить перечисленные docs; снять gap в [`spa-app-doc-code-gap-report.md`](../analysis/spa-app-doc-code-gap-report.md).

## Gate: Epic AC

Если story входит в materialized `EPIC-SPA-*` — после всех stories эпика проверить Goal и AC в файле эпика.

## Build window

Из корня workspace `DOGEstonia/`:

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --list
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --write-build-window --window-flat-start 1 --window-flat-end N
```

`N` — из `--list`. Типично `default_input_kind: task_list_linear` (flat slice, как GPT).

## Run-task hard gates

- [`run-task.md`](../../../.cursor/commands/run-task.md) — фазы, checkpoints, acceptance-verification.
- Тесты: `cd spa-app && npm test` (`profiles.yaml` → `test_command`).
- Skill в task README: `javascript-pro` / `react-expert`.

## UI task hard gates

SSOT деталей фаз UI-0..UI-3, рубрика `ui_scope` / `ui_complexity` — [`guides/spa-ui-visual-pipeline.md`](../../../docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md). **Copy-paste P3 с UI-блоком:** [`workflow.md`](../../../docs/methodology/Zeya888-builder-queue/core/workflow.md) §P3 — Execute (spa UI appendix) (`ui_gate`, `@mockup:`).

### Когда включать

| Условие | Pipeline |
|---------|----------|
| `ui_scope: none` или `ui_gate: off` в P3 | **Skip** — только Vitest + run-task |
| `ui_scope: visual` \| `mixed` и `ui_complexity: trivial` + `extends mockup-NN` | UI-0 + UI-1 path C + UI-3 (см. guide §UI-1) |
| `ui_scope: visual` \| `mixed` и `ui_complexity` ≥ `standard` | **Full:** UI-0 → UI-1 (gate) → UI-2 → UI-3 |
| Поля в README отсутствуют | Эвристика по Scope или `ui_gate: auto` (см. guide §Классификация) |

### Обязательные артефакты (visual / mixed, до Done)

См. guide §Per-task артефакты: `ui-baseline/` + `ui-mockup-spec.md` + `acceptance-verification-*.md` §UI verification.

### Порядок (hard gate)

1. **UI-0 (anchor only)** — baseline screenshot **до** правок (MCP primary). Dependent: UI-0 skip, `extends ui-mockup` от anchor.
2. **UI-1 (anchor)** — target mockup + human gate **до** кода (paths A/B/C — guide §UI-1).
3. **UI-2** — implement (`react-expert`, run-task фазы).
4. **UI-3** — `npm test` + **`npm run <puppeteer_gate>` обязательно**; post-screenshot в `ui-baseline/post-implement/`.

Puppeteer gates: `npm run test:ui:board-shell`, `test:ui:filters`, … — guide §UI-3 + §Puppeteer smoke ownership.

### P3 attach checklist (spa visual)

Перед P3 Execute для pkg с visual/mixed tasks:

- [ ] Build window содержит UI appendix (auto от `builder_resolve_queue.py --write-build-window`; grep `ui_gate` в window md)
- [ ] Pre-flight шаг 0b: `cd spa-app && npx puppeteer browsers install chrome` (once per machine; [frontend-run-and-environment.md](../runtime-docs/frontend-run-and-environment.md) §8)
- [ ] `cd spa-app && npm run <puppeteer_gate>` green **до** UI-2 visual implement
- [ ] Anchor task: `ui-baseline/` + `ui-mockup-spec.md` + operator gate «принято»
- [ ] Story gate: `acceptance-verification` §UI + anchor `ui-baseline/post-implement/*.png`

**Стоп:** dev server недоступен, селекторы из Scope отсутствуют в DOM, operator не approved `ui-mockup-spec.md` (path B), story Done без §UI — не переходить к Done.

## Run Summary

Реестр: [`run-reports/`](run-reports/) + §Run Reports Registry в bullrun index.  
Metadata key: `spa_input_package`.

## Bootstrap (первый pkg)

1. Опционально **PA.3** — workflow §PA.3 + `@docs/tasks/backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`
2. **P1.3** — materialize `EPIC-SPA-01-*`, task README, `pkg-000001-*.yaml`, update `spa-active-package.current.yaml`
3. `--verify` → `ok N paths`
4. P2 build window → P3 с `@Spa_builder.plan.md`
