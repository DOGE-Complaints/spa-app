# STORY-SPA-THR-08 — Comment create / reply wire

## Meta

- **Key:** `STORY-SPA-THR-08-comment-write-wire`
- **orientation:** tech_first
- **ui_scope:** none (reuse THR-02/05 composer + verify gate)
- **Status:** Done (P3 · pkg-000084)
- **Package:** [threads-feed/](INDEX.md)
- **Depends on:** [THR-07](STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) · THR-05 verify gate · [api-req §3/§8](STORY-SPA-THR-api-requirements.md)
- **Blocked-on:** THR-07 client base URL + tree refresh path
- **SSOT:** [`API_REFERENCE` POST comments](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md) · OpenAPI `createThreadComment`

## Зачем

Живой post/reply: Bearer + `identity_verified` pre-gate → `POST /threads/issues/{issue_id}/comments`; soft-fail UX; refresh tree.

## Scope

- Close `comment_create` / `comment_reply` in `ThreadsSocialClient`
- Request `{ body, parent_id }` (`null` = root); Auth `Authorization: Bearer` from session (same pattern as identity)
- Pass Me `profile` / `identityVerified` into `CommentComposer` from Board/Issue (end page wire gap)
- Map errors per api-req §8: 401/403 → verify handoff; **200 + `DOMAIN_ERROR`** (depth) → max-depth / post-fail; 422 → post-fail
- On success: append or refetch tree; clear draft
- Respect knobs `max_depth` (no reply affordance beyond depth)
- Tests with fixture envelopes from OpenAPI

## Out of scope

- Reactions / attach-ref → THR-09  
- Escalate, blob upload, invent paths

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-thr-08-t01-close-comment-client` | Close create/reply ops; POST + Bearer; parse CommentItem envelope |
| **T02** | `task-spa-thr-08-t02-session-bearer` | Resolve access token for social writes (reuse identity session store) |
| **T03** | `task-spa-thr-08-t03-composer-profile-props` | Board/Issue pass `profile` / gate into CommentComposer |
| **T04** | `task-spa-thr-08-t04-error-soft-fail` | Map 401/403/200-DOMAIN/422 → verify / post-fail / max-depth |
| **T05** | `task-spa-thr-08-t05-post-success-refresh` | After create/reply: refresh tree or optimistic insert matching CommentItem |
| **T06** | `task-spa-thr-08-t06-vitest-write` | Vitest: verified happy path; deny; depth DOMAIN_ERROR on 200 |
| **T07** | `task-spa-thr-08-t07-story-gate` | Story gate THR-08 |

## Acceptance Criteria

- [x] Root + reply posts hit Closed POST path with Bearer
- [x] Unverified users never send POST (gate first)
- [x] Soft-fail matches api-req §8 (incl. domain-on-200)
- [x] Success updates discussion UI without demo fixture
- [x] Subtasks T01–T07 Done or waived with cite

## Точки в коде (targets)

- `src/repositories/ThreadsSocialClient.js`
- `src/components/threads/CommentComposer.jsx` · `CommentTree.jsx`
- `src/auth/meIdentityVerified.js` · identity session token source
- `src/pages/BoardPage.jsx` · `IssuePage.jsx`

## Next

→ [THR-09](STORY-SPA-THR-09-reactions-attach-wire.md)
