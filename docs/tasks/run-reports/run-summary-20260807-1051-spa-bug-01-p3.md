# Run summary — spa BUG-01 P3 Execute

- **Date:** 2026-08-07T10:51:56Z
- **builder_project:** spa
- **Package:** `pkg-000053` (immutable)
- **Story:** STORY-SPA-BUG-01 / FE-HANDOFF-03
- **Result:** WAVE COMPLETE — T01–T05 Done · gate PASS

## Tasks

| Task | Result |
|------|--------|
| T01 reproduce HTTP | Done (prior) — pre-fix POST **503** |
| T02 root-cause pin | Done (prior) — gateway schema / missing `story_labels` |
| T03 fix pinned layer | Done — ops via **GW-DRAFT-07** + live retest POST **202** (SPA FE unchanged) |
| T04 regression | Done — publish 202; consumed GET **404** / expired; vitest 19/19 |
| T05 story gate | Done — all FR-BUG-01.* PASS |

## Live evidence

- `/ready`: `db.ready=true`, `checks.schema=true`
- Submit: [`../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-07T104447Z.md`](../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-07T104447Z.md)
- Consumed: [`../../analysis/evidence-STORY-SPA-BUG-01-consumed-2026-08-07T105148Z.md`](../../analysis/evidence-STORY-SPA-BUG-01-consumed-2026-08-07T105148Z.md)
- Gate: [`../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t05-story-gate-bug-01/acceptance-verification-spa-bug-01.md`](../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t05-story-gate-bug-01/acceptance-verification-spa-bug-01.md)

## Note

Primary fix was backend hosted schema (DRAFT-07), not spa-app product code. No spa commit required for T03.
