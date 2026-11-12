# OP-spa.process — REQ15-01

**Working plan:** [.cursor/plans/OP-spa-req15-01-20261105.plan.md](../../../../../.cursor/plans/OP-spa-req15-01-20261105.plan.md)  
**Session:** [OP-spa.session.yaml](./OP-spa.session.yaml)  
**Wave:** [wave-20261105-req15-01.md](../operator-waves/wave-20261105-req15-01.md)  
**Updated:** 2026-11-05T12:30:00Z · QUEUE EXHAUSTED · DONE 1 · BLOCKED 0

## Model

- Delivery: **subagent** — exactly two agents (BLD-spa + VAL-spa).
- OP orchestrates only: no product code, no invent AC, no push unless operator ordered.
- Claims: Read/Glob only ([analysis.mdc](../../../../../.cursor/rules/analysis.mdc)).
- Fences: verbatim from workflow-console / workflow.md. No operator paste.
- Agent ids: **only** in session.yaml — never in `.cursor/plans/*`.

## Overnight

| Rule | Behavior |
|------|----------|
| Stop | only `стоп` / `stop` / `pause` / `halt` |
| P1.3a→b / P5a→b | auto-approve |
| After P8 / DONE / BLOCKED | next QUEUED immediately |
| P8 | local commits, **no push** |

## Constants (spa)

| Var | Value |
|-----|-------|
| `$builderProject` | `spa` |
| `workspace_root` | `/Users/eslinko/Development/DOGEstonia` |
| `$tasksRoot` | `spa-app/docs/tasks` |
| `focus_folder` | `spa-app` |
| `$planFile` | `.cursor/plans/Spa_builder.plan.md` |
| `pipeline_doc` | `spa-app/docs/tasks/spa-story-execution-pipeline.md` |
| `$verifyCmd` | `python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify` |
| contract | `docs/methodology/Zeya888-builder-queue/contracts/spa-operator-contract.md` |
| dashboard | `spa-app/docs/tasks/spa-backlog-dashboard.md` |
| skill | story override `javascript-pro` |
| hasUxPipeline | true · **this story verify-only** → clean **p13** / **p3** / **p4** |

## Queue (exact B · 1 story)

1. REQ15-01 · `…/req15-story-submit-handoff-continuity-verify/STORY-SPA-REQ15-01-story-submit-handoff-continuity-verify.md` · NEW epic (pipeline ABSENT)

Soft deps GW-59 / live draft_id — Unknown live → no invent PASS. Default Pass = no SPA redesign if continuity holds.

## Plan-sim + ROLE_LOCK

Variant 1: P1.3a/b · P5a/b. ROLE_LOCK on every Task (reference §4.2 / §5).

## Phase script

```text
P1.3a → auto → P1.3b → P2 shell → P3 → P4
→ [gaps] P5a → auto → P5b → P6 → P7
→ P8 (no push) → next story
```
