# EPIC-SPA-11 — UAT inbound 2026-08 (demo wave)

> **Статус:** 🟢 Demo wave product Done · **PH-08 Done** (`pkg-000058` gate 2026-08-09T07:46:54Z) · PH-09 Done · BUG-01/02 Done  
> **Создан:** 2026-08-06  
> **Источник:** [inbound/](../../backlog-stories/inbound/README.md) UAT 2026-08-06

## Назначение

Закрыть UAT inbound wave до публичного demo: **P0 submit**, logo surface, How it works first-class composition, public sidebar **display mode** (reversible).

**Не** смешивать PH-08 (HIW composition) с PH-09 (sidebar setting).  
**Не** размывать Done [EPIC-SPA-09](../EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md).

## Состав

| Order | Story | Wave | Tasks | Pkg |
|-------|-------|------|-------|-----|
| 1 | [BUG-01](stories/STORY-SPA-BUG-01-story-submission-unavailable/STORY-SPA-BUG-01-story-submission-unavailable.md) | P0 demo blocker | T01–T07 | `pkg-000053` Done · P7 |
| 2 | [PH-09](stories/STORY-SPA-PH-09-public-sidebar-display-mode/STORY-SPA-PH-09-public-sidebar-display-mode.md) | Demo shell | T01–T05 | **`pkg-000057` Done** · P7 |
| 3 | [PH-08](stories/STORY-SPA-PH-08-how-it-works-first-class-page/STORY-SPA-PH-08-how-it-works-first-class-page.md) | Demo polish | T01–T04 | **`pkg-000058` Done** · gate 2026-08-09T07:46:54Z |
| 4 | [BUG-02](stories/STORY-SPA-BUG-02-logo-background-mismatch/STORY-SPA-BUG-02-logo-background-mismatch.md) | Demo polish | T01–T05 | **`pkg-000054` Done** |

**Execute order:** BUG-01/02 Done → PH-09 Done → **PH-08 Done**.

## Связь

- Inbound: [README](../../backlog-stories/inbound/README.md)  
- Adjacent: EPIC-SPA-04 · EPIC-SPA-09 · EPIC-SPA-08
- Active pointer: [`spa-active-package.current.yaml`](../../spa-active-package.current.yaml) → `pkg-000058` (wave closed; next P1 may re-point)
