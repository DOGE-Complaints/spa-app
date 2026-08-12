# Acceptance verification — STORY-SPA-BUG-01 (story gate)

- **Story:** Story submission unavailable (FE-HANDOFF-03)
- **Result:** PASS (P3) · **P6 T07:** FR/AC surface scope narrowed — F2/F4 CLOSED
- **Date:** 2026-08-07T11:18:08Z
- **Package:** `pkg-000053`

## Backlog AC / FR

| AC / FR | Status | Evidence |
|---------|--------|----------|
| FR-BUG-01.1 Evidence POST status | PASS | Pre: [`…201810Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-06T201810Z.md) status **503**; Post: [`…104447Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-07T104447Z.md) status **202** · T01 acceptance |
| FR-BUG-01.2 Root-cause pin | PASS | [`pin-…2026-08-06.md`](../../../../../../analysis/pin-STORY-SPA-BUG-01-root-cause-2026-08-06.md) · primary **gateway schema** · T02 |
| FR-BUG-01.3 Fix pinned layer | PASS | HTTP **202** + leave-handoff; **claimed surface** = handoff success ([T07 scope](../../../../../../analysis/evidence-STORY-SPA-BUG-01-surface-scope-t07-2026-08-07T111808Z.md)); board card N/A |
| FR-BUG-01.4 Publish once + consumed | PASS | [`consumed-…105148Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-consumed-2026-08-07T105148Z.md) · T04; profile consume → [BUG-03](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-03-post-submit-story-feedback.md) |
| FR-BUG-01.5 FE-HANDOFF-03 Pass | PASS | Live verified user → preview → Submit → **202** (not service_down) |

## FE-HANDOFF-03

**Pass** — 2026-08-07 live Railway SPA + gateway after DRAFT-07. P6 T07 documents DoD surface narrow (not reopen P0).

## Commands

```bash
curl -sS https://dogestonia-tallinn.up.railway.app/ready   # ready + schema true
cd spa-app && npx vitest run src/pages/__tests__/StorySubmitPage.test.jsx \
  src/services/__tests__/storyDraftService.handoff.test.js
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```
