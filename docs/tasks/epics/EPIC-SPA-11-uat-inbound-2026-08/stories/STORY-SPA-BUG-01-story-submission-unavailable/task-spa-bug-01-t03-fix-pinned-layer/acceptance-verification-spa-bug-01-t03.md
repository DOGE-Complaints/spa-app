# Acceptance verification — SPA-BUG-01-T03

- **Task:** Fix on pinned layer only (gateway schema / ops)
- **Result:** PASS
- **Date:** 2026-08-07T10:51:48Z
- **Package:** `pkg-000053`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Fix limited to T02 primary layer | PASS | Ops via [GW-DRAFT-07](../../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/story-draft-handoff/STORY-GW-DRAFT-07-hosted-schema-blocks-browser-submit.md) Done; **no SPA FE code change** |
| New draft publishes (ops + retest) | PASS | Live POST submit **202** + `story_id` — [`evidence-…104447Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-07T104447Z.md) |
| No secrets; Where-to-change from pin | PASS | Pin gateway schema; DRAFT-07 applied + GW redeploy (operator) |

## Live verify

```bash
curl -sS https://dogestonia-tallinn.up.railway.app/ready
# db.ready true, checks.schema true (2026-08-07T10:43Z+)
```

Pre-fix: POST 503 (`…201810Z`). Post-fix: POST 202 (`…104447Z`).
