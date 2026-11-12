# ADMIN-THR-04 — API requirements (FE needs)

## Meta

- **Key:** `ADMIN-THR-04-api-requirements`
- **Status:** Done — threads social HTTP **Closed** (HTTP-06); spa wire = **THR-07…09 Todo**
- **Depends on:** BRIEF; [threads-feed-ux](../../../architecture/threads-feed-ux/00-overview.md); threads [`02-public-social-http`](../../../../../doge-threads/docs/tasks/backlog-stories/02-public-social-http/INDEX.md)
- **Blocks:** wire stories cite this + [api-req](STORY-SPA-THR-api-requirements.md)
- **Skill:** FE contract curation
- **Verified pass:** 2026-09-22 · OpenAPI sync **2026-09-24**

## Цель

Таблица FE needs vs Closed threads HTTP + spa wire gaps. SSOT: [`STORY-SPA-THR-api-requirements.md`](STORY-SPA-THR-api-requirements.md).

## Needs (reconciled)

| Need | Consumer | Path/fields | Status | Evidence |
|------|----------|-------------|--------|----------|
| Issues list/detail | THR-01 | gateway `GET …/node/issues` | **Verified** | `GatewayIssueRepository.js` |
| Tree read | THR-07 | `GET /threads/issues/{id}` | **Closed** · spa ⚠️ | [API_REFERENCE](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md) |
| Knobs | THR-07 | `GET /threads/knobs` | **Closed** · spa ⚠️ | separate GET; spa cache |
| Comment create/reply | THR-08 | `POST /threads/issues/{id}/comments` | **Closed** · spa ⚠️ | Bearer |
| React | THR-09 | `PUT /threads/issues/{id}/reactions` | **Closed** · spa ⚠️ | U2 ReactionData |
| Attachment ref | THR-09 | `POST /threads/issues/{id}/attachment-refs` | **Closed** · spa ⚠️ | attach-denied |
| Pack type + integration | THR-05 | unnamed | **Open** | civic L10N only |
| `identity_verified` | THR-05/06/08 | `GET /me` | **Verified** · page prop ⚠️ | helpers Done; mounts THR-08 |
| Escalate | THR-04 | — | **N/A** | stub |

## §SPA today (2026-09-24)

| Surface | SPA |
|---------|-----|
| Issues + Me + gate helpers | ✅ |
| Live tree / knobs / writes | ⚠️ THR-07…09 |
| Threads HTTP sibling | ✅ HTTP-06 |

## Consumer locks

| Consumer | Lock |
|----------|------|
| THR-07…09 | Wire only Closed OpenAPI paths; domain errors often HTTP **200** + `DOMAIN_ERROR` |
| THR-05 V-D | Pack keys Open → omit / civic line |

## Acceptance

- [x] Needs vs OpenAPI 2026-09-24
- [x] THR-07…09 named in INDEX
- [x] api-req envelopes/errors synced

## Как выполнять

Docs Done. Runtime: execute THR-07 → 08 → 09 after OP go-ahead.
