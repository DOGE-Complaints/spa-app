---
generated_utc: 2026-10-24T11:15:36Z
builder_project: spa
spa_input_package: spa-app/docs/tasks/spa-active-packages/pkg-000229-20261024-epic-spa-20-nf-25-filters-popover-ux-redesign.yaml
window_mode: story_key
artifact_kind: spa_cursor_build_window
pkg_schema_version: 1
---

# Spa Cursor build window

**Не SSOT.** Очередь и порядок задаёт только YAML-пакет в `spa_input_package`. Не менять список `@…README.md` вручную — перегенерируйте файл командой ниже.

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --write-build-window --story-key STORY-SPA-NF-25-filters-popover-ux-redesign
```

Исполнение: [`spa-story-execution-pipeline.md`](../../spa-story-execution-pipeline.md) + `@.cursor/commands/bullrun-start.md` / `run-task.md`.

## P3 Execute — spa UI appendix (auto-injected)

См. также [workflow.md §P3 spa UI appendix](../../../../../docs/methodology/Zeya888-builder-queue/core/workflow.md).

```text
@.cursor/skills/builder-session/SKILL.md
@.cursor/rules/builder-operator-habits.mdc
@.cursor/rules/analysis.mdc

P3 Execute. builder_project: spa. @.cursor/plans/Spa_builder.plan.md + @<this-build-window-file>
По skill/rule: шаг 0 — python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify; при FAIL — стоп.
Шаг 0b (после verify):
  cd spa-app && npx puppeteer browsers install chrome   # если Could not find Chrome
  cd spa-app && npm run test:ui:filters
Стоп при FAIL 0b — до UI-2. Chrome: spa-app/docs/runtime-docs/frontend-run-and-environment.md §8.

--- UI Visual Pipeline (spa; story-anchor) ---
ui_gate: auto
@mockup: spa-app/docs/UX/mockups/mockup-01-dashboard-main-spec.md

Anchor task: @spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-25-filters-popover-ux-redesign/task-spa-nf-25-t02-layout/README.md
Story-anchor: anchor несёт UI-0..UI-1; dependent visual tasks — extends ui-mockup от anchor; story gate — §UI + post-implement PNG.

UI-0 (anchor, MCP primary): npm run dev → MCP user-puppeteer → ui-baseline/ (1536x1024) ДО кода
UI-1: ui-mockup-spec.md + human gate (принято) ДО UI-2
UI-2: run-task + react-expert
UI-3: npm test + npm run test:ui:filters + acceptance §UI

STOP: Story Done без story-gate acceptance §UI запрещён.
SSOT: docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md; spa-story-execution-pipeline.md §UI task hard gates
```

## STORY-SPA-NF-25-filters-popover-ux-redesign
1. `@spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-25-filters-popover-ux-redesign/task-spa-nf-25-t01-ux/README.md`
2. `@spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-25-filters-popover-ux-redesign/task-spa-nf-25-t02-layout/README.md`
3. `@spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-25-filters-popover-ux-redesign/task-spa-nf-25-t03-actions/README.md`
4. `@spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-25-filters-popover-ux-redesign/task-spa-nf-25-t04-vitest/README.md`

