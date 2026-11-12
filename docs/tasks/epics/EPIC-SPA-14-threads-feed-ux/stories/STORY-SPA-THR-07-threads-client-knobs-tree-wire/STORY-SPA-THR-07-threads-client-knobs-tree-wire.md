# STORY-SPA-THR-07-threads-client-knobs-tree-wire — Threads client + knobs + tree wire

## Meta (pipeline)

- **Key:** `STORY-SPA-THR-07-threads-client-knobs-tree-wire`
- **Parent Epic:** [`../../EPIC-SPA-14-threads-feed-ux.md`](../../EPIC-SPA-14-threads-feed-ux.md)
- **Epic:** EPIC-SPA-14 Threads Feed UX · **Wave C** (wire)
- **Status:** Done (P3 · Product AC Done · STOP before P4)
- **orientation:** tech_first
- **ui_scope:** `none` (reuse THR-01/02 chrome; no new artboard)
- **source:** [`../../../../backlog-stories/threads-feed/STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../../../../backlog-stories/threads-feed/STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)
- **decision_ref:** backlog + [STORY-SPA-THR-api-requirements.md](../../../../backlog-stories/threads-feed/STORY-SPA-THR-api-requirements.md) + [ADMIN-THR-04](../../../../backlog-stories/threads-feed/ADMIN-THR-04-api-requirements.md) + [API_REFERENCE.md](../../../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md) + [04-spa-consumer-handoff.md](../../../../../../../doge-threads/docs/architecture/public-social-http/04-spa-consumer-handoff.md)
- **Depends on:** THR-01…06 Done · threads HTTP-06 Closed
- **Blocked-on:** none (backend Closed)
- **Parent REQ:** [17](../../../../../requirements/17-issue-thread-feed-ux-and-reactions.md)
- **Scaffolded:** `2026-09-24T07:30:38Z`
- **Completed:** `2026-09-24T07:37:03Z`
- **Package:** `pkg-000083`
- **Gate:** [acceptance-verification-spa-thr-07.md](task-spa-thr-07-t07-story-gate/acceptance-verification-spa-thr-07.md)
- **Run summary P3:** [run-summary-20260924-0737-spa-thr-07-p3.md](../../../../run-reports/run-summary-20260924-0737-spa-thr-07-p3.md)

## Зачем

Закрыть spa seam: base URL + `ThreadsSocialClient` fetch по Closed routes; knobs cache; tree → `IssueThreadBlock` на `/board` и `/issue/:id` без demo fixture в prod path.

## Scope

- Document + read `VITE_THREADS_BASE_URL` (`.env.example`; normalize via [`publicEnv.js`](../../../../../../src/config/publicEnv.js))
- Close `SOCIAL_HTTP_CONTRACT` for `knobs` + `tree_read`; implement `getKnobs` / `getThreadTree` with real `fetch`
- Knobs: init + cache + refresh-on-focus (handoff) — **before** tree-driven reply affordance
- Map tree → status `loading|empty|populated|unavailable`; comments `comment_id→id`, `body→label` (truncate), `parent_id`, `depth`
- Pass `issueId` + `maxDepth` from knobs into `IssueThreadBlock`; stop defaulting prod to `THR02_DEMO_COMMENTS`
- Fail-soft: malformed / network → `unavailable` + retry; Issues gateway unchanged
- Tests: unit/contract against fixtures matching OpenAPI envelopes; **no** `/threads/by-issue`

## Out of scope

- Comment POST / reactions / attachment-refs → THR-08 / THR-09  
- Escalate, REQ8, invent paths, epic folder materialize (unless OP P1.3)  
- Blob upload

## Субтаски

| Task | Slug | Title | Status |
|------|------|-------|--------|
| **T01** | `task-spa-thr-07-t01-vite-threads-base-url` | Add `VITE_THREADS_BASE_URL` to `.env.example` + resolve helper (`getVitePublicUrl` / assert required when social enabled) | **Done** |
| **T02** | `task-spa-thr-07-t02-close-knobs-tree-client` | Close `knobs`+`tree_read` in `ThreadsSocialClient`; `GET /threads/knobs` + `GET /threads/issues/{issue_id}` | **Done** |
| **T03** | `task-spa-thr-07-t03-knobs-cache` | Knobs cache module: load once, refresh on window focus; expose `max_depth` | **Done** |
| **T04** | `task-spa-thr-07-t04-map-tree-to-block` | Map envelope → IssueThreadBlock status/comments; no demo fixture when live | **Done** |
| **T05** | `task-spa-thr-07-t05-board-issue-mounts` | Wire BoardPage + IssuePage: `issueId`, load knobs→tree, `onRetry` | **Done** |
| **T06** | `task-spa-thr-07-t06-vitest-contract` | Vitest: success empty/populated, network fail → unavailable; assert Closed URLs | **Done** |
| **T07** | `task-spa-thr-07-t07-story-gate` | Story gate THR-07 | **Done** |
| **T08** | `task-spa-thr-07-t08-as-of-done-epic-index-wave-ssot` | Epic/INDEX/wave As-of-Done SSOT (F1) | **Done** · P6 |

## Acceptance Criteria

- [x] `.env.example` documents `VITE_THREADS_BASE_URL` (local `http://127.0.0.1:8001`)
- [x] Client uses **only** Closed paths from OpenAPI (not superseded `/threads/by-issue`)
- [x] Knobs loaded/cached before tree drives `maxDepth`
- [x] Empty tree → `empty`; ≥1 comment → `populated`; error → `unavailable` + retry
- [x] Demo comments not used as prod default on board/issue mounts
- [x] Gateway Issues path regression covered
- [x] Subtasks T01–T07 Done or waived with cite

## Точки в коде (targets)

- `src/repositories/ThreadsSocialClient.js`
- `src/config/publicEnv.js` · `spa-app/.env.example`
- `src/components/threads/IssueThreadBlock.jsx` · `thr02DemoFixture.js` (harness-only)
- `src/pages/BoardPage.jsx` · `IssuePage.jsx`

## Next

→ [THR-08](../../../../backlog-stories/threads-feed/STORY-SPA-THR-08-comment-write-wire.md) (writes) — **not** this packet · **STOP before P4**
