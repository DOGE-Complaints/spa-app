---
generated_utc: 2026-08-09T13:01:43Z
builder_project: spa
spa_input_package: spa-app/docs/tasks/spa-active-packages/pkg-000061-20260809-epic-spa-10-hl-03-handoff-return-path.yaml
window_mode: flat_slice
artifact_kind: spa_cursor_build_window
pkg_schema_version: 1
---

# Spa Cursor build window

**Не SSOT.** Очередь и порядок задаёт только YAML-пакет в `spa_input_package`. Не менять список `@…README.md` вручную — перегенерируйте файл командой ниже.

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --write-build-window --window-flat-start 1 --window-flat-end 2
```

Исполнение: [`spa-story-execution-pipeline.md`](../../spa-story-execution-pipeline.md) + `@.cursor/commands/bullrun-start.md` / `run-task.md`.

## Плоский срез 1–2 (как в --list)
1. `@spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-03-handoff-return-path-tests/task-spa-hl-03-t01-unit-resolveHandoffReturnPath/README.md`
2. `@spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-03-handoff-return-path-tests/task-spa-hl-03-t02-story-gate-hl-03/README.md`

