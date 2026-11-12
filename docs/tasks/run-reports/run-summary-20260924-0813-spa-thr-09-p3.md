# Run summary — SPA-THR-09 P3

**Date:** 2026-09-24T08:13:29Z  
**Package:** pkg-000085  
**Story:** STORY-SPA-THR-09-reactions-attach-wire  
**Phase:** P3 Execute (clean · ui_scope none)  
**Result:** Product AC Done · T01–T07 Done · gate PASS

## Facts

- Closed `react` → `PUT /threads/issues/{issue_id}/reactions` + Bearer; parse `selected` / `summary_marks` / `aggregate_count`
- Closed `attach_ref` → `POST /threads/issues/{issue_id}/attachment-refs` (refs only); DOMAIN `attach-denied` on 200 → composer chrome
- Knobs `reactions_enable` + `max_reactions_per_actor` + `media_allowed_types` wired via LiveIssueThreadMount
- Catalog ids only (`isReactionsV1Id`) — unknown id rejected without fetch
- vitest **638 passed** | 2 skipped
- No invent paths · no multipart blob · no escalate · no git push

## Gate

[acceptance-verification-spa-thr-09.md](../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-09-reactions-attach-wire/task-spa-thr-09-t07-story-gate/acceptance-verification-spa-thr-09.md) PASS
