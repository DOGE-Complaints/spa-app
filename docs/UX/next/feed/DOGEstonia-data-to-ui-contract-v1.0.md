# DOGEstonia Data-to-UI Contract v1.0

**Scope:** public `/board`, Issue overlay, `/issue/:id`, user-story rail, Issue schema overlay, map, threads, comments, attachments, reactions and verification handoff  
**Target:** React.js data adapters, query layer, view models, Storybook fixtures and integration QA  
**Status:** implementation handoff · Phase 1 product locks recorded 2026-10-08 (`DUI-Q01`–`Q18`)  
**Contract date:** 2026-10-06  
**Phase 1 decisions:** [DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md](DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) — §31 open questions below remain historical; **selected behaviors for this release** live in the decision record (do not invent fields to close Unavailable rows).

## 1. Purpose

This document maps the approved DOGEstonia UI to the current runtime APIs without inventing fields, routes or behavior.

It distinguishes four classes of statements:

| Mark | Meaning |
|---|---|
| **Confirmed** | Explicit in the current API reference/OpenAPI on `dev` |
| **Derived** | Safely computed from confirmed response fields, without new backend semantics |
| **Unavailable** | Required by the approved UI but not supplied by the reviewed APIs |
| **Decision required** | More than one viable product/API behavior exists; no choice is made here |

The UI specification remains authoritative for presentation and interaction. The runtime API is authoritative for available data and write semantics. A mockup value is never evidence that a field exists.

## 2. Reviewed sources and version lock

### Gateway — Issues

- Repository: `DOGE-Complaints/doge-complaints-gateway`
- Branch: `dev`
- Reviewed branch head: `b53ee5ebe36b628c7940215b66d07f445f3668bf`
- `docs/runtime-docs/api-reference/API_REFERENCE.md`
  - blob: `ba5b8c37b2b98433ef086c51d68ef3d2a514b67f`
- `docs/runtime-docs/api-reference/openapi.yaml`
  - blob: `818024c23ad77d657a1b0692b934a3c09b1a16db`

### Threads — discussion and reactions

- Repository: `DOGE-Complaints/doge-threads`
- Branch: `dev`
- Reviewed branch head: `b291db1dd160b2961c2f21c9d9f58db4e6a76af4`
- `docs/runtime-docs/api-reference/API_REFERENCE.md`
  - blob: `8901cfc2ea23f43d3288152a83de9abbd5a466ec`
- `docs/runtime-docs/api-reference/openapi.yaml`
  - blob: `5c15420c37952b5b814312925f225403b442a72f`

Implementation files were inspected only to diagnose underspecified public contracts:

- `src/core/domain/reaction_catalog.py`
- `src/core/domain/knobs.py`
- `src/core/application/map_shell_knobs.py`
- `src/core/identity/me_client.py`
- `src/core/application/write_gate.py`
- `src/core/api/envelope.py`
- `src/core/api/social_handlers.py`
- `src/core/application/write_orchestrator.py`
- `src/core/domain/attachment_ref.py`

Implementation observations do not silently become public API guarantees. Any such reliance is explicitly called out.

## 3. Product entity map

| UI concept | Runtime source | Relationship |
|---|---|---|
| Feed post | Gateway Issue projection | One `Issue` renders one `BoardIssuePost` |
| Civic post body | `data.issues[]` or `data.issue` | Same civic identity in feed, overlay and route detail |
| Discussion root | Threads tree keyed by `issue_id` | One Issue may have one thread root in the active node |
| Comment | `data.comments[]` | Flat records reconstruct a visual tree via `parent_id` and `depth` |
| Root reactions | `data.thread_root_reactions` | Reactions to the Issue discussion root |
| Comment reactions | reaction fields on each comment | Reactions to an individual comment |
| Thread capability | `GET /threads/knobs` | Node-level, not Issue-specific |
| Current actor reaction selection | optional `selected[]` | Present only when tree GET carries valid Bearer |
| User's own stories | `GET /story-activity` | Authenticated cabinet data; not equivalent to Issues |
| Issue schema overlay | expected `issue.schema_card` | **Unavailable in reviewed Gateway contract** |
| Reaction people/distribution | expected reactor identities | **Unavailable in reviewed Threads contract** |
| Connect | future relationship concept | **No reviewed API** |
| Escalation invitation | current feedback-only stub | **No reviewed API** |

### Identity boundaries

- `Issue` civic identity is not a social author profile.
- A comment actor is not available in the current tree response.
- `Story` is not `Issue`; `/story-activity` must not be rendered as a public Issue feed without an explicit join/projection.
- `Issue`, `Early Signal`, `Emerging Signal` and `Story` remain separate product entities.

## 4. API inventory used by this UI

| Method and path | Auth | UI use | State |
|---|---|---|---|
| `GET /node/issues` | Public | Board result set | Confirmed |
| `GET /node/issues/{issue_id}` | Public | Issue overlay and route detail | Confirmed |
| `GET /story-activity` | Browser Bearer | Left rail: own story activity | Confirmed, limited fields |
| `GET /threads/knobs` | Public | Tree depth, enabled reactions, max selection, media types | Confirmed |
| `GET /threads/issues/{issue_id}` | Public; optional Bearer | Thread tree and reaction summaries | Confirmed |
| `POST /threads/issues/{issue_id}/comments` | Bearer + verified write gate | Create root comment or reply | Confirmed |
| `PUT /threads/issues/{issue_id}/reactions` | Bearer + verified write gate | Add/remove root or comment reaction | Confirmed |
| `POST /threads/issues/{issue_id}/attachment-refs` | Bearer + verified write gate | Bind an existing ref to an existing comment | Confirmed |
| Existing `/verify` | Existing product route | Verification handoff | UI requirement; not defined by these two APIs |

No new route is implied by this table.

## 5. Shared envelope contract

### Success

```json
{
  "data": {},
  "trace_id": "..."
}
```

### Error

```json
{
  "error": {
    "code": "...",
    "type": "...",
    "message": "...",
    "details": {}
  },
  "trace_id": "..."
}
```

### Frontend parsing rule

The query layer must inspect the envelope body before treating an HTTP response as success.

This is mandatory for Threads because documented domain, value and infrastructure errors may return HTTP `200` with an `error` envelope. HTTP status alone is insufficient.

`trace_id` is diagnostic metadata. It may be included in a support/detail disclosure, but it is not primary user copy.

## 6. Issue list contract

### Request

`GET /node/issues` accepts these combinable filters:

| Query parameter | API type | UI source | Serialization |
|---|---|---|---|
| `status` | `string[]` | Status filter | repeated params |
| `type` | `string` | Type filter | single value |
| `labels` | `string[]` | Topic/label filter | repeated params |
| `institution` | `string` | Institution filter | single exact match |
| `created_after` | ISO date-time | Date range start | inclusive |
| `created_before` | ISO date-time | Date range end | inclusive |
| `geo_lat_min` | number | Map/bounds filter | single value |
| `geo_lat_max` | number | Map/bounds filter | single value |
| `geo_lon_min` | number | Map/bounds filter | single value |
| `geo_lon_max` | number | Map/bounds filter | single value |
| `geo_district` | `string[]` | District filter | repeated params |
| `geo_settlement` | `string[]` | Settlement filter | repeated params |
| `geo_region` | `string[]` | Region filter | repeated params |
| `geo_country` | `string[]` | Country filter | repeated params |
| `geo_postal_code` | `string[]` | Postal filter | repeated params |

Multi-value filters are OR within the named parameter. The API reference allows parameters to be combined; cross-parameter semantics are not described beyond that.

### Response

`data.issues` is the complete response array supplied by the endpoint. The reviewed contract exposes no cursor, page, limit, total, next token or sort metadata.

### Safe derived values

| UI value | Derivation | Condition |
|---|---|---|
| Results currently received | `data.issues.length` | Honest only as response-array length, not a server total |
| Pin-capable subset | Issues where `typeof geo.lat === "number"` and `typeof geo.lon === "number"` | Both coordinates required |
| Map eligibility | pin-capable subset length `>= 1` | Current result array only |
| Partial-map helper | `M of N`, where `M` is pin-capable length and `N` is array length | Valid while endpoint remains unpaginated/full-result |
| Civic-only overlay state | `schema_card` absent/empty | Current API always falls into this state because field is absent from schema |

Do not call response-array length a global total if the API later becomes paginated without adding authoritative total metadata.

## 7. Issue projection → UI mapping

### Canonical view model mapping

| UI region | Source path | Presence | Display rule |
|---|---|---|---|
| Issue identity/key | `issue.id` | Required | Route and query key; do not display as title |
| Status | `issue.status` | Required | `DRAFT` or `PUBLISHED`; product exposure question remains open |
| Type | `issue.type` | Required | `complaint`, `system_bug`, `observation`, `absurdity` |
| Labels | `issue.labels[]` | Required | Render canonical labels through localization/humanization |
| Title | `issue.title[locale]` | Required i18n object | Primary post heading |
| Summary | `issue.summary[locale]` | Required i18n object | Compact feed copy |
| Description | `issue.description[locale]` | Required i18n object | Detail/expanded post body |
| Institution | `issue.institution[locale]` | Optional/nullable | Omit region when absent |
| Created date | `issue.created_at` | Optional/nullable | Omit date when absent; never invent |
| Original-language indication | `issue.original_locale[]` | Optional | Current locale outside list may be shown as translated per approved localization UI |
| Geo snapshot | `issue.geo` | Optional/nullable | Never expose raw object |
| Public image source | `issue.image_txid`, `issue.image_hash` | Optional/nullable | **Insufficient for rendering without resolution contract** |
| Archive reference | `issue.arweave_txid` | Optional/nullable | Not civic primary content by default |
| Additional details | `issue.schema_card` | **Absent** | Blocked; no empty section chrome |

### Prohibited UI sources

The Issue UI must not display or infer:

- story submitter identifiers;
- raw intake narrative or privacy flags;
- service auth data;
- cluster/story IDs from operator create payload;
- raw JSON dumps;
- archive hash/transaction values as human civic labels;
- location data beyond the approved public presentation.

## 8. Localization mapping

The Issue projection contract defines `title`, `summary`, `description` as `{ et, ru, en }`. `institution` is nullable but uses the same i18n shape when present.

Rules:

1. Use the active UI locale key.
2. Do not generate missing translations in the frontend.
3. `original_locale[]` indicates known submitter narrative languages; it does not identify one authoritative source text when multiple stories formed the Issue.
4. Canonical label keys require the existing localization/humanization layer.
5. A translation fallback policy for malformed payloads belongs in the Accessibility & Localization Pack; the API contract itself requires all three keys for primary fields.

## 9. Geo → map and public callout mapping

| Public UI label | API source |
|---|---|
| District | `issue.geo.admin_district` |
| Settlement | `issue.geo.admin_settlement` |
| Region | `issue.geo.admin_region` |
| Country | `issue.geo.admin_country` |
| Postal code | `issue.geo.admin_postal_code` |
| Pin latitude | `issue.geo.lat` |
| Pin longitude | `issue.geo.lon` |

The `admin_*` identifiers are source paths, not visible labels. UI copy uses public names such as District and Region.

Confirmed limitations:

- no public `geo.label` field exists in the reviewed Issue projection;
- no precision/privacy indicator exists;
- no geometry, viewport, bounds or cluster data exists;
- no map provider is specified;
- list and map are driven from the same Issue result array, but the API has no server total.

## 10. Board list/map behavior supported by data

| State | Data predicate | Result |
|---|---|---|
| `SSR-M-list` | successful non-empty `issues[]` | Render all received Issues |
| `SSR-M-map` | at least one Issue has numeric lat and lon | Render only eligible pins |
| `SSR-M-ineligible` | zero eligible Issues | Hide/disable Map and show honest helper |
| `SSR-M-partial` | `0 < eligible < issues.length` | Map is visibly a subset; list remains full |
| `SSR-M-filtered` | one or more supported API filters active | Same serialized query feeds both modes |
| `SSR-M-narrow` | viewport state | Same data predicates; presentation only changes |

Text search is not supported by the reviewed endpoint. A search field must not pretend to filter server data unless a separate confirmed client-side or server-side policy is approved.

## 11. Issue detail and overlay loading

`GET /node/issues/{issue_id}` returns `data.issue` with the same `IssueProjection` schema as the list.

Rules:

- feed-opened overlay may reuse a list item immediately, then request canonical detail;
- direct `/issue/:id` requires the detail request;
- Issue detail and thread requests are independent;
- thread failure never removes a successfully loaded Issue;
- documented not-found response is HTTP `404`, but the example error code is `INTERNAL_ERROR`; route behavior should key on HTTP `404` until the backend clarifies the error code.

## 12. Issue schema overlay (`SSR-C`)

The approved UI expects optional `issue.schema_card` flat dotted-path leaves. Neither the reviewed Gateway OpenAPI nor API reference contains `schema_card`, `card_fields` or `structured_payload` on `IssueProjection`.

Current implementable behavior:

- render civic Issue card/detail;
- render no empty `Additional details` chrome.

Blocked behavior:

- compact overlay rows;
- detail overlay rows;
- many-leaf truncation/progressive disclosure;
- production label lookup through `schemaRuntime.cardField.<path>`.

This is an API gap, not a frontend permission to inspect arbitrary payload fields.

## 13. Thread knobs contract

`GET /threads/knobs` returns:

| Field | Type | UI use |
|---|---|---|
| `max_depth` | integer | Determine whether Reply affordance is available for a comment depth |
| `max_reactions_per_actor` | integer | Capacity hint and picker enforcement |
| `reactions_enable` | object of id-like keys to booleans | Show only enabled reaction ids after validation against catalog |
| `media_allowed_types` | string array | Attachment type capability |

Rules:

- load once per active node/session, then refresh under the application's configuration policy;
- knobs are node-level, not Issue-specific;
- missing/error knobs must not be replaced with fake permissive defaults;
- if capability cannot be established, writes depending on that capability remain unavailable with honest copy;
- the implementation factory currently documents a default max of 3, but UI should consume the response value rather than hard-code it.

## 14. Thread tree contract

### Request

`GET /threads/issues/{issue_id}` is public. Supplying a valid Bearer enriches reaction summaries with current actor `selected[]`.

### Response

```text
data.issue_id
data.comments[]
  comment_id
  parent_id
  depth
  body
  summary_marks[] { reaction_id, count }
  aggregate_count
  selected[]?          // authenticated read only
data.thread_root_reactions
  summary_marks[] { reaction_id, count }
  aggregate_count
  selected[]?          // authenticated read only
```

### UI mapping

| UI element | Source | Status |
|---|---|---|
| Empty thread | `comments.length === 0` | Derived |
| Comment count | `comments.length` | Derived if response is complete |
| Parent-child relation | `parent_id` | Confirmed |
| Indentation/limit | `depth` compared with `knobs.max_depth` | Confirmed + derived |
| Comment body | `body` | Confirmed |
| Comment reaction aggregate | `summary_marks`, `aggregate_count` | Confirmed |
| Current actor marks | `selected[]` | Confirmed only on authenticated GET |
| Root reaction aggregate | `thread_root_reactions` | Confirmed |
| Comment author/name/avatar | none | Unavailable |
| Comment created/edited time | none | Unavailable |
| Comment attachments | none | Unavailable on read |
| Moderation/deleted/tombstone state | none | Unavailable |
| Per-comment reply count | derive from parent links | Derived |

### Tree reconstruction

The client may construct adjacency from `comment_id` and `parent_id`, using `depth` as a validation/display input. The API does not document comment ordering; the client must not silently claim chronological, relevant or newest-first ordering.

Orphans, cycles and inconsistent depths are malformed contract states. The safe UI is to preserve readable bodies in a flat fallback and report diagnostics, not to invent parents.

## 15. BoardIssuePost and thread state mapping

| UI state | API/query predicate |
|---|---|
| `THR-P-A` loading | tree request pending; Issue already available |
| `THR-P-B` empty | successful tree, `comments=[]`, aggregates empty/zero |
| `THR-P-C` populated | successful tree, at least one comment or authoritative aggregate |
| `THR-P-D` unavailable | error envelope, transport failure or invalid payload; Issue remains intact |
| `THR-P-E` narrow | same data state under narrow layout |

No demo comment or count is allowed during loading or failure.

## 16. Comment write contract

### Create/reply

`POST /threads/issues/{issue_id}/comments`

Request:

```json
{
  "body": "...",
  "parent_id": null
}
```

`parent_id=null` creates a root comment. A non-null value requests a reply.

Success data:

```text
comment_id, parent_id, depth, body
```

### UI rules supported by contract

- Require a Bearer before committing.
- Preserve the local draft until a success envelope is confirmed.
- Prevent duplicate in-flight submission from the same composer.
- On success, merge the returned comment shape, then reconcile with a tree refetch.
- At `depth >= max_depth`, remove/disable deeper Reply affordance.
- On error, keep the draft and reply context visible.

### Limitations

- no documented idempotency key;
- no author or timestamp returned;
- no edit/delete routes;
- no authoritative order position returned;
- no explicit field-length constraints in the reviewed public contract;
- no atomic comment-plus-attachments operation.

An ambiguous network failure cannot be automatically retried without duplicate risk unless backend idempotency is added or confirmed.

## 17. Attachment reference contract

`POST /threads/issues/{issue_id}/attachment-refs`

Request fields:

| Field | Required | Meaning |
|---|---|---|
| `ref_id` | yes | Pointer to bytes stored elsewhere |
| `media_type` | yes | Type checked against node allowlist |
| `comment_id` | yes | Existing comment receiving the ref |
| `floor_class` | no; default `ok` | Legal/safety classification metadata |

Success repeats `ref_id`, `media_type`, `comment_id`, `floor_class`.

Denial is an error envelope with `code=DOMAIN_ERROR` and `details.reason=attach-denied`. It may arrive with HTTP `200`.

### Supported UI behavior

- use `media_allowed_types` to determine whether an attachment affordance is eligible;
- show a scoped, honest denial when `details.reason=attach-denied`;
- never expose a floor-bypass control;
- never send blob bytes to this route.

### Missing contract

- no upload/ref-creation endpoint is documented;
- no read/list attachment refs in the tree response;
- no download/preview URL or metadata contract;
- no delete/unbind route;
- no atomic transaction with comment creation;
- `floor_class` is accepted from the request, but the trust boundary for who computes it is not described in the API reference.

Therefore the approved comment-image display and pre-submit attachment composer cannot be completed from these APIs alone.

## 18. Reaction catalog contract

The public API states catalog version `reactions.v1`, but does not return catalog version, layers, localized labels or icons.

Current implementation source enumerates these ids:

| Layer | Current implementation ids |
|---|---|
| Emotional | `acknowledge`, `support`, `empathy`, `concern`, `hopeful`, `sad`, `outraged_situation`, `amused` |
| Epistemic | `agree`, `disagree`, `useful_fact`, `insightful`, `needs_evidence` |
| Moderation | `off_topic`, `aggressive` |

Current implementation also defines `agree` and `disagree` as mutually exclusive.

These observations match the approved UX direction, but the API does not expose this metadata as a versioned response. Frontend use therefore requires an explicitly approved local catalog artifact or an API catalog contract. This document does not choose between them.

## 19. Reaction read/write mapping

### Read

Each root/comment target exposes:

- `summary_marks[] { reaction_id, count }`;
- `aggregate_count`;
- optional actor `selected[]` when Bearer is valid.

### Write

`PUT /threads/issues/{issue_id}/reactions`

```json
{
  "target_kind": "thread_root | comment",
  "comment_id": null,
  "reaction_id": "...",
  "op": "add | remove"
}
```

Success returns the confirmed target, operation, actor selection, per-id counts and aggregate count.

### UI mapping

| UI | API field |
|---|---|
| Compact aggregate number | `aggregate_count` |
| Top marks | ordered/presentation-selected subset of `summary_marks` |
| Selected state | `selected.includes(reaction_id)` |
| Capacity | `knobs.max_reactions_per_actor` |
| Enabled ids | truthy entries in `knobs.reactions_enable`, intersected with approved catalog |
| Add/remove | `op` |

The API count array is sorted by reaction id in current implementation, not by popularity. UI top-mark ordering must not assume the response order is popularity order; it can derive descending count with a deterministic tie-break if that presentation rule is approved.

### Root versus comment

- `target_kind=thread_root` requires `comment_id=null` in the intended model.
- `target_kind=comment` identifies the target with `comment_id`.
- Approved UX prohibits moderation reactions on the thread root.
- The reviewed OpenAPI does not describe per-target enabled ids or a root moderation error shape.

## 20. Reaction distribution and people

The approved reaction distribution views require:

- people who reacted;
- actor identity/display name/avatar;
- actor-to-reaction mapping;
- all/type filtering;
- self identification;
- optional Connect eligibility.

The reviewed Threads API returns aggregates only. It exposes no reactor list and no public actor data.

Therefore:

- compact aggregate strip is implementable;
- full people distribution, per-type people tabs, `You` rows and `Connect` rows are blocked;
- counts must not be expanded into invented people.

## 21. Verification-before-write contract

Threads write routes require Bearer and enforce opaque `identity_verified is True` via Identity `/me`.

| Result | Confirmed signal | UI interpretation boundary |
|---|---|---|
| Missing/invalid Bearer | HTTP `401`, `UNAUTHORIZED` | Authentication required |
| Write denied | HTTP `403`, `FORBIDDEN` | Write not permitted |
| Request schema invalid | HTTP `422` default FastAPI body | Correct client request; do not treat as verification |
| Domain/infrastructure failure | possibly HTTP `200` error envelope | Scoped write failure, not verification success |

The current write gate fails closed for `identity_verified=false`, missing/invalid verification data and Identity service failure. The public response does not provide a stable reason discriminator or `verify_url`.

Consequently, automatically redirecting every Threads `403` to `/verify` is not contract-safe. The approved `/verify` handoff needs an explicit decision/API discriminator before implementation can distinguish an unverified user from a verification-service failure.

After successful verification, the UI may return to the saved feed/post context and retry only through explicit user action. No verification method is displayed.

## 22. User's own stories in the left rail

`GET /story-activity` is authenticated and scoped to the current user's stories.

Response fields:

```text
data.metrics { submitted, published, under_review }
data.stories[] { story_id, status, created_at }
```

Supported UI:

- link to the existing profile/cabinet destination;
- compact metrics for submitted, published and under review;
- minimal recent activity rows using status/date if desired.

Not supported by this response:

- story title or excerpt;
- associated `issue_id` or Issue link;
- story image;
- pagination;
- edit/write actions.

The left rail must not fabricate post-like Story cards from `story_id`, status and date alone.

## 23. Right rail data boundary

The reviewed APIs do not provide a dedicated right-rail model. Potential modules from other approved product layers must be contracted separately.

Do not fill the rail with invented trending counts, people, organizations, engagement ranks or administrative workflow. The rail may remain absent/reserved until a real data source is chosen.

## 24. Loading and fail-soft ownership

| Region | Authoritative request | Failure scope |
|---|---|---|
| Feed | Issues list | Feed result region |
| Civic Issue in overlay/detail | Issue detail | Civic body only |
| Thread shell | Thread tree | Discussion block only; Issue survives |
| Capabilities | Thread knobs | Dependent write controls only |
| Comment submit | Comment POST | Active composer/draft |
| Reaction submit | Reaction PUT | Selected target strip/picker |
| Attachment bind | Attachment POST | Affected attachment item/composer |
| Own stories | Story activity | Left-rail module only |

Independent requests must not collapse into one page-level error.

## 25. Query keys and cache ownership

Logical query identities for React implementation:

| Query | Key inputs | Cache notes |
|---|---|---|
| Issue list | active node + normalized supported filters | List/map share one result |
| Issue detail | active node + `issue_id` | May seed from list, then reconcile |
| Thread knobs | active node | Node-level shared capability |
| Thread tree | active node + `issue_id` + auth visibility class | Authenticated data includes `selected[]`; anonymous cache must not masquerade as actor state |
| Story activity | authenticated actor/session | Private; clear on sign-out/actor change |

Do not key the thread only by `issue_id` across nodes: server thread identity also uses `DOGESTONIA_SCHEMA_ID`.

## 26. Mutation and reconciliation rules

### Comment

- local pending state belongs to the composer;
- merge only a confirmed success envelope;
- refetch tree to obtain authoritative placement/aggregates;
- no silent automatic retry after unknown outcome.

### Reaction

- a temporary selected state may be shown as pending;
- confirmed response replaces target `selected`, `summary_marks` and `aggregate_count` atomically;
- failure restores last confirmed values;
- mutual exclusion behavior must come from approved catalog logic, not guessed server behavior.

### Attachment ref

- retain pending selection locally;
- bind only after a `comment_id` exists under the current API;
- `attach-denied` removes/marks only the affected attachment intent;
- do not present attachment as published until confirmed and subsequently readable under an approved read contract.

No reviewed mutation supplies ETag, revision, idempotency token or conflict version.

## 27. Error-to-UI matrix

| Source | Signal | UI state | Automatic action |
|---|---|---|---|
| Gateway Issue list | transport/`500` error envelope | Feed unavailable/retry | none |
| Gateway Issue detail | HTTP `404` | Issue not found | none |
| Threads tree | body contains `error` | Discussion unavailable; Issue intact | optional scoped retry |
| Threads write | `401 UNAUTHORIZED` | Sign-in/auth required | no silent retry |
| Threads write | `403 FORBIDDEN` | Write blocked; reason unresolved | no automatic verify redirect until discriminator is agreed |
| Threads write | HTTP `422` | Client/validation error | preserve draft; log contract mismatch |
| Threads write | `DOMAIN_ERROR` | Scoped domain failure | preserve intent where safe |
| Attachment | `details.reason=attach-denied` | Honest legal/capability denial | never bypass |
| Threads | `INFRASTRUCTURE_ERROR` | Social temporarily unavailable | Issue remains readable |
| Any | malformed envelope | Contract error | fail soft in affected region; diagnostic report |

User copy should be localized product copy mapped from stable signals. Raw backend messages are diagnostic and must not automatically be shown.

## 28. Feed request topology and performance boundary

The current APIs have no batch thread-summary endpoint and Issues do not embed social summary.

To show authoritative comment/reaction summaries for every visible post, the client would need one tree request per Issue in addition to the Issue list request. This creates an N+1 request pattern.

The contract supports progressive, lazy thread chrome, but the product/API team must decide the long-term feed-summary strategy. No decision is made here.

## 29. Confirmed implementation-ready slice

The following can be implemented from the reviewed contracts:

- public Issue list using supported filters;
- civic Issue card, overlay and route detail;
- client-derived list/map eligibility and eligible pins;
- node-level thread knobs;
- public empty/populated/unavailable thread shell;
- flat-to-nested comment tree using parent/depth;
- text-only comment and reply creation;
- aggregate reaction strip and current actor selected ids;
- enabled-reaction filtering when paired with an approved local catalog;
- verified-gated reaction/comment writes at the HTTP permission level;
- attachment-ref bind and denial handling for externally created refs;
- minimal own-story metrics/activity;
- fail-soft separation between civic Issue and social data.

## 30. UI features blocked or only partially supported

| UI feature | Status | Missing contract |
|---|---|---|
| `schema_card` overlay | Blocked | field, leaf/value schema, labels/runtime mapping |
| Issue image rendering | Partial | resolvable public media URL and presentation metadata |
| Search toolbar | Blocked server-side | text query semantics |
| Large feed pagination | Blocked | cursor/page/limit/total/sort |
| Comment author/avatar/time | Blocked | actor and timestamp fields |
| Comment media display | Blocked | attachment refs on read + preview/download resolution |
| Pre-submit attachment UX | Partial | ref creation and atomic/sequenced behavior |
| Relevant/newest comment sorting | Blocked | ordering contract/timestamps |
| Reaction picker labels/layers | Partial | versioned public catalog/localization contract |
| Reaction people lists | Blocked | reactor identities and per-person marks |
| `Connect` | Blocked | relationship/profile API and eligibility |
| Escalation handoff | Stub only | product/API integration |
| Safe verify redirect from Threads `403` | Blocked | stable reason/verification URL discriminator |
| Full own-story cards/links | Blocked | title/excerpt/related Issue id |
| Right rail | Unspecified | chosen module and data source |

## 31. Open questions — decisions required

**Update 2026-10-08:** Phase 1 answers for `DUI-Q01`–`Q18` are locked in [DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md](DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md). The tables below stay as the original question register (history). Implementing Phase 1 must follow the **decision record**, not invent API to match deferred mockup panels. `DUI-Q19`–`Q24` (P2) remain open.

### P0 — blocks an approved core state

| ID | Question | Why it matters | Decision/API owner |
|---|---|---|---|
| `DUI-Q01` | Must the public board request always force `status=PUBLISHED`, or must Gateway itself guarantee that anonymous list/get never exposes DRAFT? | Current public endpoint schema includes both statuses and no default exposure rule is documented. | Product + Gateway |
| `DUI-Q02` | Where will `schema_card` be delivered: directly on Issue projection, through a second gateway resource, or not in this release? | SSR-C cannot render from current API. | Product + Gateway/schema runtime |
| `DUI-Q03` | What converts `image_txid`/`image_hash` into a public renderable asset, and what metadata is safe to display? | Feed image area has no usable URL/alt/aspect contract. | Gateway + media/security |
| `DUI-Q04` | Which public author fields and timestamps must each comment return? | Approved Facebook-like discussion rows require identity and time. | Threads + Identity + Privacy |
| `DUI-Q05` | How are accepted attachment refs returned when reading a thread, and how are their previews/downloads resolved? | Existing writes cannot produce persistent visible comment media. | Threads + media/security |
| `DUI-Q06` | Is comment creation followed by attachment binding the intended non-atomic flow, or is an atomic/transactional contract required? | Current composer may publish text while attachment bind fails. | Product + Threads |
| `DUI-Q07` | What stable Threads error discriminator identifies `identity_verified=false` separately from Identity outage/malformed `/me`? Should it include an existing `/verify` return target? | Redirecting all `403` responses is unsafe. | Threads + Identity + Product |
| `DUI-Q08` | Will reaction distribution expose people? If yes, what endpoint/fields and privacy policy govern actor id, name, avatar, mark and self? | Full reactions dialogs and `Connect` are otherwise impossible. | Product + Threads + Identity/Privacy |
| `DUI-Q09` | What is the versioned client contract for `reactions.v1`: local shipped catalog or API-delivered catalog? | API currently names the version but does not return layers/labels/version. | Product + Threads + Localization |
| `DUI-Q10` | What ordering and pagination semantics apply to comments? | Current tree has no documented order, timestamps or pagination. | Product + Threads |

### P1 — needed for scale or full approved dashboard

| ID | Question | Why it matters | Decision/API owner |
|---|---|---|---|
| `DUI-Q11` | Should the feed receive a batch social-summary projection, embed summaries in Issues, or lazy-load each tree? | Current design produces an N+1 request pattern. | Architecture + Threads + Gateway |
| `DUI-Q12` | What are the board text-search semantics and authoritative query parameter? | Search panel is visible but Issues API has no text search. | Product + Gateway |
| `DUI-Q13` | What pagination/sort contract should `/node/issues` expose, including total/next cursor? | Current full array does not scale and `N of M` can become misleading. | Product + Gateway |
| `DUI-Q14` | Is a public geo `label` required, and what precision/privacy policy applies to coordinates and postal data? | Map callout requirement includes `label`; current projection exposes only `admin_*` plus coordinates. | Product + Gateway + Privacy |
| `DUI-Q15` | Should own Story activity include title and linked `issue_id`, or remain metrics/status only? | Left rail cannot show meaningful own-story cards or link to published Issues. | Product + Gateway |
| `DUI-Q16` | What right-rail module is approved, and which existing API owns it? | No current right-rail data contract exists. | Product |
| `DUI-Q17` | Is `Connect` only a future affordance stub or should reaction people rows wait until a relationship API exists? | Avoids implying that a relationship was created. | Product + Identity/relationships |
| `DUI-Q18` | When escalation becomes connected, what outcome and data boundary should the invitation represent? | Current UI must remain a non-dead stub without inventing a workflow. | Product |

### P2 — contract hardening

| ID | Question | Why it matters | Decision/API owner |
|---|---|---|---|
| `DUI-Q19` | Should Issue not-found use a stable `NOT_FOUND` code instead of the documented `INTERNAL_ERROR` body? | UI currently must rely on HTTP status over body code. | Gateway |
| `DUI-Q20` | Should Threads domain/infrastructure errors continue to use HTTP `200`, and what retryability discriminator should UI consume? | Body-first parsing works, but retry policy remains coarse. | Threads + Architecture |
| `DUI-Q21` | What idempotency contract applies to comment, reaction and attachment writes? | Unknown outcomes cannot be safely auto-retried. | Threads |
| `DUI-Q22` | What validation limits apply to comment body and attachment counts/sizes? | Composer cannot give accurate preventive feedback. | Threads + Product |
| `DUI-Q23` | Is moderation-on-root rejected by server with a stable reason, or enforced only by the UI/catalog? | Approved UX requires the prohibition to be durable. | Threads + Product |
| `DUI-Q24` | Is `floor_class` supplied by a trusted media service, and should browser clients ever send it directly? | Current request accepts the field but trust ownership is undocumented. | Security + Threads + media |

## 32. Decision-record template

When an open question is resolved, record it without rewriting history:

| Field | Value |
|---|---|
| Decision ID | `DUI-Qxx` |
| Selected behavior | Exact product/API rule |
| Owner | Product/API/security owner |
| Date | ISO date |
| Contract change | Endpoint/schema/version or explicit frontend-only rule |
| Affected states | SSR/THR/state ids |
| Migration | Cache, fixture and compatibility impact |

## 33. Fixture contract for development

Fixtures must be derived from real shapes and separately label API gaps.

### Required confirmed fixtures

- Issue with all required civic fields;
- Issue without institution/date/geo/media metadata;
- Issue with full geo;
- mixed Issue list with and without coordinates;
- empty Issue list;
- empty thread;
- nested comments within max depth;
- max-depth comment;
- root and comment reaction aggregates;
- authenticated tree with `selected[]`;
- anonymous tree without `selected`;
- attachment accepted response;
- attachment denied error envelope;
- `401`, `403`, `422`, domain-200-error, infrastructure-200-error and `500` states;
- own story activity metrics and rows.

### Gap fixtures

Author/profile, comment media, reactor people and `schema_card` fixtures may be used only as explicitly marked future-contract prototypes. They must not be connected to production adapters until their APIs are approved.

## 34. Runtime validation requirements

At adapter boundaries validate:

- envelope is exactly success or error, not both;
- required Issue fields and i18n objects exist;
- coordinate eligibility requires two finite numbers;
- comment ids are unique;
- parent references do not create cycles;
- `depth` is a non-negative integer and does not silently override capability rules;
- counts are non-negative integers;
- selected ids and summary ids belong to the approved catalog before display;
- enabled reaction keys unknown to the client are omitted and diagnostically reported;
- private authenticated caches are cleared on actor/session change.

Validation failure produces scoped fail-soft UI and diagnostics. It does not create substitute civic/social facts.

## 35. Acceptance checklist

- [ ] Feed posts are backed only by Gateway Issue projections.
- [ ] List and map share the same normalized Issue query/result.
- [ ] Only Issues with numeric lat and lon become pins.
- [ ] Unsupported search is not presented as authoritative server search.
- [ ] Civic Issue remains visible when Threads fails.
- [ ] Threads body is inspected for error envelopes even on HTTP 200.
- [ ] Anonymous and authenticated thread caches cannot leak `selected[]` state.
- [ ] Comment tree uses `parent_id`/`depth` without inventing author/time/order.
- [ ] Write drafts survive recoverable failures.
- [ ] No automatic retry can duplicate a comment.
- [ ] Attachment denial is scoped and cannot be bypassed.
- [ ] No comment attachment is shown without a read/resolution contract.
- [ ] Reaction strip uses authoritative aggregates.
- [ ] Reaction people/Connect views remain blocked until actor data exists.
- [ ] Moderation reactions never appear on root in approved UI.
- [ ] Verification result remains method-opaque.
- [ ] A generic Threads `403` is not silently assumed to mean “go verify”.
- [ ] `schema_card` is not reconstructed from raw or unrelated payloads.
- [ ] Own Stories remains distinct from public Issues.
- [ ] Every unresolved product/API choice is tracked by `DUI-Qxx`.

## 36. Handoff conclusion

The present APIs support the civic Issue continuum, list/map derivation, basic text discussions, aggregate reactions, node capability knobs and fail-soft verified writes.

They do not yet support several already-designed social surfaces: authored/timestamped comments, readable comment attachments, reactor people lists, Connect, schema overlays, server search/pagination, or a safe verification-specific redirect signal.

Implementation should proceed on the confirmed slice while treating the open-question register as a contract gate, not as permission for frontend invention.
