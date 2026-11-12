# STORY-SPA-THR-09 — Reactions + attachment-ref wire

## Meta

- **Key:** `STORY-SPA-THR-09-reactions-attach-wire`
- **orientation:** tech_first
- **ui_scope:** none (reuse THR-03 picker + THR-02 attach chip)
- **Status:** Done (P3 · `pkg-000085`)
- **Package:** [threads-feed/](INDEX.md)
- **Depends on:** [THR-07](STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) · [THR-08](STORY-SPA-THR-08-comment-write-wire.md) (Bearer + profile) · [api-req §5/§6](STORY-SPA-THR-api-requirements.md)
- **Blocked-on:** THR-07 knobs (`max_reactions_per_actor`, `reactions_enable`, `media_allowed_types`) · THR-08 Bearer path
- **SSOT:** OpenAPI `writeThreadReaction` · `createAttachmentRef` · [API_REFERENCE §6](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md)

## Зачем

Persist `reactions.v1` marks and attachment refs through Closed HTTP; map U2 reaction data + attach-denied soft-fail.

## Scope

- Close `react` + `attach_ref` in `ThreadsSocialClient`
- `PUT …/reactions` body `{ target_kind, comment_id, reaction_id, op }`; map response `selected` / `summary_marks` / `aggregate_count` into `ReactionControls`
- Enforce FE catalog + knobs enables/capacity; server is SSOT on deny
- `POST …/attachment-refs` body `{ ref_id, media_type, comment_id }` (+ optional `floor_class`); **no** multipart
- Deny: `DOMAIN_ERROR` + `details.reason=attach-denied` (often HTTP **200**) → composer attach-denied
- Thread-root: no moderation layer (existing FE rule)
- Tests against OpenAPI fixtures

## Out of scope

- Blob / bytes upload API  
- Escalate HTTP  
- Invent reaction ids outside `reactionsV1Catalog.js`

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-thr-09-t01-close-react-client` | Close `react`; PUT + Bearer; parse ReactionData |
| **T02** | `task-spa-thr-09-t02-wire-reaction-controls` | ReactionControls: persist toggle; apply `selected` / summary / aggregate |
| **T03** | `task-spa-thr-09-t03-knobs-enable-capacity` | Apply knobs `reactions_enable` + `max_reactions_per_actor` to picker |
| **T04** | `task-spa-thr-09-t04-close-attach-client` | Close `attach_ref`; POST refs only; map attach-denied |
| **T05** | `task-spa-thr-09-t05-composer-attach-live` | CommentComposer attach uses live client + media allowlist from knobs |
| **T06** | `task-spa-thr-09-t06-vitest-react-attach` | Vitest: add/remove mark; attach ok; attach-denied DOMAIN on 200 |
| **T07** | `task-spa-thr-09-t07-story-gate` | Story gate THR-09 |

## Acceptance Criteria

- [x] React add/remove hits Closed PUT; UI reflects `selected` + aggregates
- [x] Knobs disable/capacity respected; no invent catalog ids
- [x] Attach ref POST only (no blob); deny → attach-denied chrome
- [x] Bearer + verify gate reused from THR-08
- [x] Subtasks T01–T07 Done or waived with cite

## Точки в коде (targets)

- `src/repositories/ThreadsSocialClient.js`
- `src/components/threads/ReactionControls.jsx` · `reactionsV1Catalog.js`
- `src/components/threads/CommentComposer.jsx`

## Next

Full spa↔threads social loop Closed on FE. OP → P1.3 epic materialize if desired (EPIC-SPA-14 extension or new package).
