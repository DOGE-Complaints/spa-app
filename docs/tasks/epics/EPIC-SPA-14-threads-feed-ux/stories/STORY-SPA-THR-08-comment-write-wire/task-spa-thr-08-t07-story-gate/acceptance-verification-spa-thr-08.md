# Acceptance verification — STORY-SPA-THR-08

**Story:** STORY-SPA-THR-08-comment-write-wire  
**Package:** pkg-000084  
**Status:** PASS  
**Date:** 2026-09-24T07:57:18Z  

## AC checklist

- [x] Root + reply posts hit Closed POST path with Bearer
- [x] Unverified users never send POST (gate first)
- [x] Soft-fail matches api-req §8 (incl. domain-on-200)
- [x] Success updates discussion UI without demo fixture
- [x] Subtasks T01–T07 Done or waived with cite

## Evidence

| AC | Evidence path | Notes |
|----|---------------|-------|
| Closed POST + Bearer | `src/repositories/ThreadsSocialClient.js` · `CLOSED_SOCIAL_PATHS.comment_write` · `__tests__/ThreadsSocialClient.test.js` THR-08 | `POST /threads/issues/{id}/comments` only |
| Gate first | `LiveIssueThreadMount.onSubmitComment` + `CommentComposer` + `canWriteThreadsWithMe` | no POST when unverified |
| §8 soft-fail | `classifyCommentWriteResponse` · tests 401/403→verify · 200 DOMAIN depth→max_depth · 422→post_fail | |
| Success refresh | `LiveIssueThreadMount.onPostSuccess` → `load()` tree refetch | no demo default |
| T01–T07 | task READMEs Status Done · this gate | |

## Commands

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test
# vitest 632 passed | 2 skipped (2026-09-24T07:57:18Z)
```

## STOP

STOP before P4 (OP → Validator). No invent HTTP. No THR-09 this packet. No git push. ui_scope none.
