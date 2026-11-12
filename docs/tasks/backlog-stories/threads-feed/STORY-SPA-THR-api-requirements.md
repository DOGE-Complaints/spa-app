# Threads feed — требования к API doge-threads (FE → threads)

> **Audience:** doge-threads implementers + spa wire wave  
> **Источник FE:** chrome THR-01…06 · [`ThreadsSocialClient.js`](../../../../src/repositories/ThreadsSocialClient.js) · UI `src/components/threads/*` · [`reactionsV1Catalog.js`](../../../../src/components/threads/reactionsV1Catalog.js) · gate [`meIdentityVerified.js`](../../../../src/auth/meIdentityVerified.js)  
> **Источник domain (без HTTP):** [`ThreadWriteOrchestrator`](../../../../../doge-threads/src/core/application/write_orchestrator.py) · [`Comment`](../../../../../doge-threads/src/core/domain/comment.py) · [`ThreadKey`](../../../../../doge-threads/src/core/domain/thread_key.py) · [`ReactionMark`](../../../../../doge-threads/src/core/domain/reaction_mark.py) · [`AttachmentRef`](../../../../../doge-threads/src/core/domain/attachment_ref.py) · [`FixedThreadKnobs`](../../../../../doge-threads/src/core/domain/knobs.py)  
> **As-is public HTTP threads:** Closed inventory (Ops + W2 social) — [`API_REFERENCE.md`](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md) · [`openapi.yaml`](../../../../../doge-threads/docs/runtime-docs/api-reference/openapi.yaml) (HTTP-06). Spa wire = [THR-07…09](INDEX.md).  
> **Target tech arch:** [`public-social-http/00-overview.md`](../../../../../doge-threads/docs/architecture/public-social-http/00-overview.md) · handoff [`04-spa-consumer-handoff.md`](../../../../../doge-threads/docs/architecture/public-social-http/04-spa-consumer-handoff.md)  
> **Admin shell:** [ADMIN-THR-04](ADMIN-THR-04-api-requirements.md) · **REQ:** [17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md) · **Arch spa:** [02-clients](../../../architecture/threads-feed-ux/02-clients-and-write-gates.md)  
> **Образец формы:** [STORY-SPA-SSR-api-requirements.md](../semantic-schema-runtime/STORY-SPA-SSR-api-requirements.md)

**Легенда:** ✅ Closed / verified · ⚠️ spa wire gap · ❌ absent / OOS

**Verified pass:** Grep/Read 2026-09-24 vs [`openapi.yaml`](../../../../../doge-threads/docs/runtime-docs/api-reference/openapi.yaml) + [`API_REFERENCE.md`](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md) · `CLOSED_HTTP_INVENTORY` / `asgi_app.py` social routes

---

## Режим MVP

| Priority | Scope | Why |
|----------|-------|-----|
| **P0 (must)** | Tree read + comment create/reply + knobs (`max_depth`) | Discussion shell без этого не живой |
| **P1** | React (`reactions.v1`) + attach_ref | UI chrome уже есть; domain write уже есть |
| **OOS** | Escalate HTTP, blob upload, votes/hold/shadow (REQ8), Issues CRUD, invent gateway paths, cabinet metrics, rate-limit UX | ADMIN-04 / AC-SPA-THR-03/07 / stub |

**Правило:** семантика ops + fields = SSOT для spa. **Path strings** = target table below (N1 + K2). Do not use superseded `/threads/by-issue/…` in new docs or code.

**Close wave (W2):** knobs + tree + comments + reactions + attachment-refs Closed on threads (HTTP-06). Spa may wire all ops together in a **separate spa wave**.

Domain already implements write/list **in-process** (`ThreadWritePort` / `DiscussionStore`) — public HTTP должен **тонко** выставить то же, не плодить второй domain.

```text
Spa IssueThreadBlock / Composer / ReactionControls
  → ThreadsSocialClient (ops named; threads HTTP Closed; spa fetch still Unavailable)
  → [target paths] public HTTP on doge-threads
  → ThreadWriteOrchestrator / DiscussionStore / marks / refs
```

---

## §0. Сводка ops ↔ FE ↔ domain ↔ HTTP

| FE op (`SOCIAL_HTTP_CONTRACT`) | FE UI | Domain already | Target path | Public HTTP today | Priority |
|--------------------------------|-------|----------------|-------------|-------------------|----------|
| `knobs` / `getKnobs` | `maxDepth` boundary | `FixedThreadKnobs` | `GET /threads/knobs` | ✅ Closed | **P0** |
| `tree_read` / `getThreadTree` | `IssueThreadBlock` + `CommentTree` | `list_comments` | `GET /threads/issues/{issue_id}` | ✅ Closed | **P0** |
| `comment_create` / `createComment` | root composer | `write_comment(parent_id=None)` | `POST /threads/issues/{issue_id}/comments` | ✅ Closed | **P0** |
| `comment_reply` / `replyComment` | reply composer | `write_comment(parent_id=)` | same POST | ✅ Closed | **P0** |
| `react` | `ReactionControls` | `write_reaction` | `PUT /threads/issues/{issue_id}/reactions` | ✅ Closed | **P1** |
| `attach_ref` | attach chip | `write_attachment_ref` | `POST /threads/issues/{issue_id}/attachment-refs` | ✅ Closed | **P1** |
| escalate | stub | — | **N/A** | — | OOS |

FE client today: all ops → `{ status: 'unavailable', reason: 'social_http_open', op }` — **no fetch** (wire = **separate spa wave** after HTTP-06).

Issues list/detail remain gateway (`GET {base}/node/issues`) — **not** threads.

---

## §1. Subject / ThreadKey

```text
ThreadKey { node, entity_type, entity_id }
CIVIC_FIRST_ENTITY_TYPE = "Issue"
```

| Field | Source | Client sends? |
|-------|--------|---------------|
| `entity_id` | civic Issue id | **yes** — as `issue_id` in path |
| `entity_type` | fixed `"Issue"` | **no** — server fills |
| `node` | `DOGESTONIA_SCHEMA_ID` on threads process | **no** — server env (tech-arch M1/S1) |

Also on threads env for cross-service parity: `DOGESTONIA_SCHEMA_VERSION` (not part of `ThreadKey.node`).

---

## §2. P0 — Tree read

### FE presentation → API fields

| FE presentation | API / domain field | Notes |
|-----------------|--------------------|-------|
| `id` | `comment_id` | domain `Comment` |
| `parentId` | `parent_id` | `null` = root |
| `depth` | `depth` | enforce vs cached `knobs.max_depth` |
| `label` (preview) | derive from **`body`** | no separate `label` field |

### FE status mapping (spa)

| API outcome | `IssueThreadBlock` status |
|-------------|---------------------------|
| 200 + `comments.length === 0` | `empty` |
| 200 + ≥1 comment | `populated` |
| network / 5xx / malformed | `unavailable` (+ retry) |
| loading | `loading` (client-side) |

### Target route

| | |
|--|--|
| Method / path | `GET /threads/issues/{issue_id}` |
| Auth | public read OK |
| Success `data` | see §2.1 (**no** `knobs` in body — T1) |
| Envelope | `{ data, trace_id }` |

### §2.1 Success `data` (minimum)

```json
{
  "issue_id": "<string>",
  "comments": [
    {
      "comment_id": "<string>",
      "parent_id": null,
      "depth": 0,
      "body": "<string>"
    }
  ]
}
```

Spa must load **knobs** via §4 (cache) **before** relying on `max_depth` for reply affordance.

---

## §3. P0 — Comment create / reply

### Target route

| | |
|--|--|
| Method / path | `POST /threads/issues/{issue_id}/comments` |
| Auth | **Required** `Authorization: Bearer <access_token>` |
| Request body | `{ "body": "<string>", "parent_id": null \| "<comment_id>" }` |
| Success `data` | `comment_id`, `parent_id`, `depth`, `body` |

| HTTP / error | FE UX |
|--------------|-------|
| 401 / 403 / auth deny | Verify gate / `/verify` |
| depth exceeded | max-depth chrome |
| validation / domain | composer `post-fail` |
| floor / media on attach | §6 |

Root vs reply = same route; `parent_id` null vs set.

---

## §4. P0 — Knobs (separate GET + spa cache)

| Field | FE need |
|-------|---------|
| `max_depth` | **Must** |
| `max_reactions_per_actor` | **P1** — FE default 3; server knobs SSOT (align at implement — arch U1) |
| `reactions_enable` | **P1** |
| `media_allowed_types` | **P1** |

### Target route

| | |
|--|--|
| Method / path | `GET /threads/knobs` |
| Auth | public read OK |
| Success `data` | `{ "max_depth", "max_reactions_per_actor", "reactions_enable", "media_allowed_types" }` |

**Spa:** init + cache + periodic/focus refresh. Do **not** expect knobs inside tree response.  
**Superseded:** embed-in-tree; `GET /threads/by-issue/{id}/knobs`.

---

## §5. P1 — Reactions (`reactions.v1`) — ✅ Closed

Catalog ids unchanged (FE SSOT — do not invent). OpenAPI `writeThreadReaction`.

| | |
|--|--|
| Method / path | `PUT /threads/issues/{issue_id}/reactions` |
| Auth | Bearer required |
| Request body | `{ "target_kind": "thread_root" \| "comment", "comment_id": null \| "<id>", "reaction_id": "<id>", "op": "add" \| "remove" }` |
| Success `data` (U2 / `ReactionData`) | `{ issue_id, target_kind, comment_id, reaction_id, op, selected: string[], summary_marks: [{ reaction_id, count }], aggregate_count }` |

Map to FE: `selected` → actor selection; `summary_marks` / `aggregate_count` → strip props.

---

## §6. P1 — Attachment ref — ✅ Closed

OpenAPI `createAttachmentRef`.

| | |
|--|--|
| Method / path | `POST /threads/issues/{issue_id}/attachment-refs` |
| Auth | Bearer required |
| Request body | `{ "ref_id", "media_type", "comment_id" }` (+ optional `floor_class`, default `ok`) |
| Success `data` | `{ ref_id, media_type, comment_id, floor_class }` |
| Deny / floor | error envelope `DOMAIN_ERROR` + `details.reason=attach-denied` → FE `attach-denied` |
| **OOS** | multipart / bytes API |

---

## §7. Closed routes (summary)

| Priority | Method | Path | Op |
|----------|--------|------|-----|
| P0 | `GET` | `/threads/knobs` | knobs (cache on spa) — ✅ Closed |
| P0 | `GET` | `/threads/issues/{issue_id}` | tree (comments only) — ✅ Closed |
| P0 | `POST` | `/threads/issues/{issue_id}/comments` | create / reply — ✅ Closed |
| P1 | `PUT` | `/threads/issues/{issue_id}/reactions` | add/remove mark — ✅ Closed |
| P1 | `POST` | `/threads/issues/{issue_id}/attachment-refs` | attach ref — ✅ Closed |
| — | `GET` | `/health`, `/ready` | ✅ Ops Closed |

Local base: `http://127.0.0.1:8001`. Spa later: `VITE_THREADS_BASE_URL` (named only until wire wave).

### Superseded paths (do not use)

`/threads/by-issue/**` (any).

---

## §8. Auth / envelopes / errors (as-is)

SSOT: [API_REFERENCE §4](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md).

| Concern | As-is |
|---------|--------|
| Success | `{ data, trace_id }` |
| Error | `{ error: { code, type, message, details }, trace_id }` |
| Write auth | Bearer → `product_write_bearer` / Me `identity_verified` |
| FE pre-gate | spa `identity_verified` before call |
| CORS | `allow_origins=["*"]`; methods GET/POST/PUT/OPTIONS; headers `x-trace-id`, `authorization` |
| Trace | optional `x-trace-id` |

**HTTP status mapping (spa must handle):**

| Case | HTTP | Envelope |
|------|------|----------|
| Missing/invalid Bearer | **401** | `UNAUTHORIZED` |
| Write denied / not verified | **403** | `FORBIDDEN` |
| Domain (depth, attach-denied, mark rules, …) | **200** | `DOMAIN_ERROR` (+ `details`; attach → `reason=attach-denied`) |
| Body validation (Pydantic) | **422** | Starlette default (not remapped) |
| Config / unexpected | **500** | `VALIDATION_ERROR` / `INTERNAL_ERROR` |

Do **not** assume all failures are non-2xx — check `error` key on 200 for domain soft-fail UX.

---

## §9. FE wiring gaps → spa stories

Threads HTTP **Closed**. Spa wire:

| Gap | Story |
|-----|-------|
| `VITE_THREADS_BASE_URL` + Close `ThreadsSocialClient` + knobs cache + tree → mounts | [THR-07](STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) |
| Comment create/reply + Bearer + profile prop | [THR-08](STORY-SPA-THR-08-comment-write-wire.md) |
| Reactions + attachment-refs | [THR-09](STORY-SPA-THR-09-reactions-attach-wire.md) |

Handoff order: [`04-spa-consumer-handoff.md`](../../../../../doge-threads/docs/architecture/public-social-http/04-spa-consumer-handoff.md).

---

## §10. Out of scope

Escalate HTTP, REQ8, blob upload, invent gateway Issues, pack JSON keys, rate-limit UX, Facebook assets, new identity paths.

---

## Threads implement package

| Package | Role |
|---------|------|
| [`02-public-social-http`](../../../../../doge-threads/docs/tasks/backlog-stories/02-public-social-http/INDEX.md) | HTTP-01…06 **Done** (HTTP-06 Close) |
| [`api-reference`](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md) | Runtime SSOT |
| [`public-social-http` arch](../../../../../doge-threads/docs/architecture/public-social-http/00-overview.md) | Target tech arch |

## Acceptance (this artifact)

- [x] FE ops + UI fields cited
- [x] Domain types aligned
- [x] P0 / P1 / OOS separated
- [x] Paths = Closed inventory (`/threads/knobs`, `/threads/issues/{id}/…`) — not `/threads/by-issue`
- [x] Knobs = separate GET; tree without knobs; reaction/attach envelopes match OpenAPI
- [x] Error HTTP mapping cited for spa soft-fail
- [x] Spa wire stories THR-07…09 linked
