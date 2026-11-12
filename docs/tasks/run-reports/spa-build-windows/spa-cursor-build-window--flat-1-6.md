---
generated_utc: 2026-10-06T20:49:21Z
builder_project: spa
spa_input_package: spa-app/docs/tasks/spa-active-packages/pkg-000096-20261006-epic-spa-18-req21-05-board-features-extract.yaml
window_mode: flat_slice
artifact_kind: spa_cursor_build_window
pkg_schema_version: 1
---

# Spa Cursor build window

**Не SSOT.** Очередь и порядок задаёт только YAML-пакет в `spa_input_package`. Не менять список `@…README.md` вручную — перегенерируйте файл командой ниже.

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --write-build-window --window-flat-start 1 --window-flat-end 6
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
  cd spa-app && npm run test:ui:board-shell
Стоп при FAIL 0b — до UI-2. Chrome: spa-app/docs/runtime-docs/frontend-run-and-environment.md §8.

--- UI Visual Pipeline (spa; story-anchor) ---
ui_gate: auto
@mockup: spa-app/docs/UX/mockups/mockup-01-dashboard-main-spec.md

Anchor task: @spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/task-spa-req21-05-t01-slice-boardpage-jsx/README.md
Story-anchor: anchor несёт UI-0..UI-1; dependent visual tasks — extends ui-mockup от anchor; story gate — §UI + post-implement PNG.

UI-0 (anchor, MCP primary): npm run dev → MCP user-puppeteer → ui-baseline/ (1536x1024) ДО кода
UI-1: ui-mockup-spec.md + human gate (принято) ДО UI-2
UI-2: run-task + react-expert
UI-3: npm test + npm run test:ui:board-shell + acceptance §UI

STOP: Story Done без story-gate acceptance §UI запрещён.
SSOT: docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md; spa-story-execution-pipeline.md §UI task hard gates
```

## Плоский срез 1–6 (как в --list)
1. `@spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/task-spa-req21-05-t01-slice-boardpage-jsx/README.md`
2. `@spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/task-spa-req21-05-t02-create-features-modules/README.md`
3. `@spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/task-spa-req21-05-t03-preserve-data-plane/README.md`
4. `@spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/task-spa-req21-05-t04-map-threads-parity/README.md`
5. `@spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/task-spa-req21-05-t05-vitest-board/README.md`
6. `@spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-05-board-features-extract/task-spa-req21-05-t06-story-gate/README.md`

