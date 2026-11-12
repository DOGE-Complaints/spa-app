# Bugs — backlog package

Process SSOT: [bug-intake-workflow.md](../../../../docs/methodology/Zeya888-builder-queue/workflow/bug-intake-workflow.md)  
**Bug-story schema (после triage):** [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md) · образец **[BUG-01](STORY-SPA-BUG-01-story-submission-unavailable.md)**  
**Epic (UAT inbound):** [EPIC-SPA-11](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md)

| Location | Purpose |
|----------|---------|
| [inbox/](inbox/) | New bug reports (untriaged) |
| `attachments/` | Screenshots per bug ID |
| [../inbound/](../inbound/README.md) | External UAT inputs (triaged → stories below) |
| [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md) | Canonical sections + evidence YAML for `STORY-SPA-BUG-*` |

## Product / bug stories

| Order | Story | Severity | Status | Pipeline |
|-------|-------|----------|--------|----------|
| 1 | [BUG-01 story submission unavailable](STORY-SPA-BUG-01-story-submission-unavailable.md) | P0 | **Done** · **P7 WAVE COMPLETE** | [EPIC](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/STORY-SPA-BUG-01-story-submission-unavailable.md) · T01–T07 Done · [audit](../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md) · [reaudit](../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md) |
| 2 | [BUG-02 logo background mismatch](STORY-SPA-BUG-02-logo-background-mismatch.md) | Major visual · fix-before-demo | **Done** · **P7 WAVE COMPLETE** | [EPIC](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/STORY-SPA-BUG-02-logo-background-mismatch.md) · T01–T07 Done · `pkg-000054` · `run_mode` **retired** · [audit](../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md) · [reaudit](../../../analysis/reaudit-STORY-SPA-BUG-02-gap-closure-2026-08-07.md) |
| 3 | [BUG-03 → ID-14 post-submit path choice](STORY-SPA-BUG-03-post-submit-story-feedback.md) | — | **Moved** → [ID-14](../identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md) | identity-auth · M135 · stub only |
| 4 | [BUG-04 horizontal logo transparent pad](STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md) | Low visual · optional | **Todo · draft** (PH-10 F4) | _(none — P5 draft)_ |
| 5 | [BUG-05 Railway env-bake × identity localhost fallback](STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) | **P0** ship / Railway build | **In Progress** · P1.3 `pkg-000065` | [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) · T01–T05 Todo |
| 6 | [BUG-06 stale placeholder bake × `npm start`](STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) | **P0** local DX / bake contract | **In Progress** · P6 `pkg-000071` · T01–T05 Done · T06 BLOCKED F1 OPEN · T07/T08 Done · §8.4 PENDING | [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) · [investigation 2026-08-18](../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) |
| 7 | [BUG-07 start vs preview docs drift](STORY-SPA-BUG-07-start-preview-docs-drift.md) | **P2** docs / three lanes | **Done** · P3 `pkg-000072` · P6 T06–T08 F1–F3 CLOSED | [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/STORY-SPA-BUG-07-start-preview-docs-drift.md) · [gate](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/task-spa-bug-07-t05-story-gate-bug-07/acceptance-verification-spa-bug-07.md) · [P6](../../run-reports/run-summary-20260818-1059-spa-bug-07-p6.md) · sibling BUG-06 |
| 8 | [BUG-08 Vite public-env normalize seam](STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) | **P2** config seam | **Done** · P3 `pkg-000073` · P6 T06–T07 F1–F2 CLOSED | [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-08-vite-public-env-normalize-seam/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) · T01–T07 Done · [gate](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-08-vite-public-env-normalize-seam/task-spa-bug-08-t05-story-gate-bug-08/acceptance-verification-spa-bug-08.md) · [P6](../../run-reports/run-summary-20260818-1123-spa-bug-08-p6.md) · sibling BUG-06 |
| 9 | [BUG-09 board map pins not rendered](STORY-SPA-BUG-09-board-map-pins-not-rendered.md) | **P1** map rendering | **Done** · P3 `pkg-000090` · P6 gap F1–F3 CLOSED | [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-BUG-09-board-map-pins-not-rendered/STORY-SPA-BUG-09-board-map-pins-not-rendered.md) · T01–T10 Done · [P6](../../run-reports/run-summary-20261003-1525-spa-bug-09-p6.md) · [gate](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-BUG-09-board-map-pins-not-rendered/task-spa-bug-09-t07-story-gate/acceptance-verification-spa-bug-09.md) · [audit](../../../analysis/audit-STORY-SPA-BUG-09-execution-2026-10-03.md) |

**Progress:** 5 Done (BUG-01 · BUG-02 · BUG-07 · BUG-08 · **BUG-09**) · 2 In Progress (BUG-05 · BUG-06 `pkg-000071`) · BUG-03 Moved · BUG-04 draft excl. |
