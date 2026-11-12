# Acceptance verification — STORY-SPA-THR-09

**Story:** STORY-SPA-THR-09-reactions-attach-wire  
**Package:** pkg-000085  
**Status:** PASS  
**Date:** 2026-09-24T08:13:29Z  

## AC checklist

- [x] React add/remove hits Closed PUT; UI reflects `selected` + aggregates
- [x] Knobs disable/capacity respected; no invent catalog ids
- [x] Attach ref POST only (no blob); deny → attach-denied chrome
- [x] Bearer + verify gate reused from THR-08
- [x] Subtasks T01–T07 Done or waived with cite

## Evidence

| AC | Evidence path | Notes |
|----|---------------|-------|
| Closed PUT + selected/aggregates | `ThreadsSocialClient.react` · `CLOSED_SOCIAL_PATHS.reactions` · `ReactionControls` onReact · tests THR-09 | `PUT /threads/issues/{id}/reactions` only |
| Knobs enable/capacity | `listReactionsV1({ reactionsEnable })` · `maxReactions` → `toggleReactionSelection` · LiveIssueThreadMount knobs | no invent ids |
| Attach ref + deny | `attachRef` · `classifyAttachRefResponse` · CommentComposer onAttachRef · DOMAIN `attach-denied` on 200 | no multipart |
| Bearer + verify | `getThreadsAccessToken` · `canWriteThreadsWithMe` before react/attach | reuse THR-08 |
| T01–T07 | task READMEs Status Done · this gate | |

## Commands

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test
# vitest 638 passed | 2 skipped (2026-09-24T08:13:29Z)
```

## STOP

STOP before P4 (OP → Validator). No invent HTTP. No multipart blob. No git push. ui_scope none.
