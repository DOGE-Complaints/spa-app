# STORY-SPA-THR-09-reactions-attach-wire — Reactions + attachment-ref wire

## Meta (pipeline)

- **Key:** `STORY-SPA-THR-09-reactions-attach-wire`
- **Parent Epic:** [`../../EPIC-SPA-14-threads-feed-ux.md`](../../EPIC-SPA-14-threads-feed-ux.md)
- **Epic:** EPIC-SPA-14 Threads Feed UX · **Wave C** (wire)
- **Status:** Done (P3 · pkg-000085)
- **orientation:** tech_first
- **ui_scope:** `none` (reuse THR-03 picker + THR-02 attach chip)
- **source:** [`../../../../backlog-stories/threads-feed/STORY-SPA-THR-09-reactions-attach-wire.md`](../../../../backlog-stories/threads-feed/STORY-SPA-THR-09-reactions-attach-wire.md)
- **decision_ref:** backlog + [STORY-SPA-THR-api-requirements.md](../../../../backlog-stories/threads-feed/STORY-SPA-THR-api-requirements.md) §5/§6 + [API_REFERENCE.md](../../../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md) · OpenAPI `writeThreadReaction` · `createAttachmentRef`
- **Depends on:** THR-07 Done · THR-08 Done (Bearer + profile)
- **Blocked-on:** THR-07 knobs · THR-08 Bearer path (satisfied — THR-07/08 Done)
- **Parent REQ:** [17](../../../../../requirements/17-issue-thread-feed-ux-and-reactions.md)
- **Scaffolded:** `2026-09-24T08:07:05Z`
- **Package:** `pkg-000085`
- **Gate:** [acceptance-verification-spa-thr-09.md](task-spa-thr-09-t07-story-gate/acceptance-verification-spa-thr-09.md)

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

| Task | Slug | Title | Status |
|------|------|-------|--------|
| **T01** | `task-spa-thr-09-t01-close-react-client` | Close `react`; PUT + Bearer; parse ReactionData | **Done** |
| **T02** | `task-spa-thr-09-t02-wire-reaction-controls` | ReactionControls: persist toggle; apply `selected` / summary / aggregate | **Done** |
| **T03** | `task-spa-thr-09-t03-knobs-enable-capacity` | Apply knobs `reactions_enable` + `max_reactions_per_actor` to picker | **Done** |
| **T04** | `task-spa-thr-09-t04-close-attach-client` | Close `attach_ref`; POST refs only; map attach-denied | **Done** |
| **T05** | `task-spa-thr-09-t05-composer-attach-live` | CommentComposer attach uses live client + media allowlist from knobs | **Done** |
| **T06** | `task-spa-thr-09-t06-vitest-react-attach` | Vitest: add/remove mark; attach ok; attach-denied DOMAIN on 200 | **Done** |
| **T07** | `task-spa-thr-09-t07-story-gate` | Story gate THR-09 | **Done** |
| **T08** | `task-spa-thr-09-t08-as-of-done-arch-clients-write-gates` | Arch 02 As-of-Done — react+attach Closed | **Done** (P6 F1) |

## Acceptance Criteria

- [x] React add/remove hits Closed PUT; UI reflects `selected` + aggregates
- [x] Knobs disable/capacity respected; no invent catalog ids
- [x] Attach ref POST only (no blob); deny → attach-denied chrome
- [x] Bearer + verify gate reused from THR-08
- [x] Subtasks T01–T07 Done or waived with cite
- [x] Gap F1 CLOSED (T08) · F2 WAIVED `info-nonblocking`

## Точки в коде (targets)

- `src/repositories/ThreadsSocialClient.js`
- `src/components/threads/ReactionControls.jsx` · `reactionsV1Catalog.js`
- `src/components/threads/CommentComposer.jsx`

## Next

Full spa↔threads social loop Closed on FE. Product AC Done · P6 gap CLOSED · Skip P7. Do not invent paths.
