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

**Progress:** 2 Done · BUG-03 Moved · BUG-04 draft open |
