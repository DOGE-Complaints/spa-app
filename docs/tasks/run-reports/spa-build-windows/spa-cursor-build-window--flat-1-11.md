---
generated_utc: 2026-08-02T12:32:44Z
builder_project: spa
spa_input_package: spa-app/docs/tasks/spa-active-packages/pkg-000043-20260802-epic-spa-08-g11-brand-token-adoption-glue.yaml
window_mode: flat_slice
artifact_kind: spa_cursor_build_window
pkg_schema_version: 1
---

# Spa Cursor build window

**Не SSOT.** Очередь и порядок задаёт только YAML-пакет в `spa_input_package`. Не менять список `@…README.md` вручную — перегенерируйте файл командой ниже.

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --write-build-window --window-flat-start 1 --window-flat-end 11
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

Anchor task: @spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t07-statusbadge-hex-to-surface-tokens/README.md
Story-anchor: anchor несёт UI-0..UI-1; dependent visual tasks — extends ui-mockup от anchor; story gate — §UI + post-implement PNG.

UI-0 (anchor, MCP primary): npm run dev → MCP user-puppeteer → ui-baseline/ (1536x1024) ДО кода
UI-1: ui-mockup-spec.md + human gate (принято) ДО UI-2
UI-2: run-task + react-expert
UI-3: npm test + npm run test:ui:board-shell + acceptance §UI

STOP: Story Done без story-gate acceptance §UI запрещён.
SSOT: docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md; spa-story-execution-pipeline.md §UI task hard gates
```

## Плоский срез 1–11 (как в --list)
1. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t01-sync-g9-backlog-historical-wording/README.md`
2. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t02-sync-g4-g9-scope-done/README.md`
3. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t03-color-palette-implemented-touchpoint/README.md`
4. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t04-cta-accent-hover-and-ink-unify/README.md`
5. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t05-soft-accent-fills-and-alias/README.md`
6. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t06-text-warm-spot-and-ds-note/README.md`
7. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t07-statusbadge-hex-to-surface-tokens/README.md`
8. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t08-rgba-pack-cabinet/README.md`
9. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t09-rgba-pack-auth-identity/README.md`
10. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t10-rgba-pack-board-chrome/README.md`
11. `@spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/task-spa-g11-t11-story-gate-g11/README.md`

