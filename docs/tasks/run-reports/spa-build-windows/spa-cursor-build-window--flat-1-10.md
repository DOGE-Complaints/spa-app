---
generated_utc: 2026-07-05T08:11:49Z
builder_project: spa
spa_input_package: spa-app/docs/tasks/spa-active-packages/pkg-000026-20260705-epic-spa-04-id12-story-draft-handoff-submit.yaml
window_mode: flat_slice
artifact_kind: spa_cursor_build_window
pkg_schema_version: 1
---

# Spa Cursor build window

**Не SSOT.** Очередь и порядок задаёт только YAML-пакет в `spa_input_package`. Не менять список `@…README.md` вручную — перегенерируйте файл командой ниже.

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --write-build-window --window-flat-start 1 --window-flat-end 10
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

Anchor task: @spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t01-story-draft-service-gateway-routes/README.md
Story-anchor: anchor несёт UI-0..UI-1; dependent visual tasks — extends ui-mockup от anchor; story gate — §UI + post-implement PNG.

UI-0 (anchor, MCP primary): npm run dev → MCP user-puppeteer → ui-baseline/ (1536x1024) ДО кода
UI-1: ui-mockup-spec.md + human gate (принято) ДО UI-2
UI-2: run-task + react-expert
UI-3: npm test + npm run test:ui:board-shell + acceptance §UI

STOP: Story Done без story-gate acceptance §UI запрещён.
SSOT: docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md; spa-story-execution-pipeline.md §UI task hard gates
```

## Плоский срез 1–10 (как в --list)
1. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t01-story-draft-service-gateway-routes/README.md`
2. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t02-draft-preview-dto-mapper/README.md`
3. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t03-story-handoff-i18n-dictionary/README.md`
4. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t04-route-rename-story-submit-cutover/README.md`
5. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t05-login-draft-id-session-storage/README.md`
6. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t06-story-submit-page-state-machine/README.md`
7. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t07-verify-interpose-auto-resubmit/README.md`
8. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t08-ui-anchor-m128-icons/README.md`
9. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t09-tests-handoff-flow-m128/README.md`
10. `@spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-12-story-draft-handoff-submit/task-spa-id-12-t10-story-gate-id-12/README.md`

