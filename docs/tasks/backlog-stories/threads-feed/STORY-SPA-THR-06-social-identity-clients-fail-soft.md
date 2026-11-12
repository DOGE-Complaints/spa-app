# STORY-SPA-THR-06 — Social + identity clients (fail-soft)

## Meta

- **Key:** `STORY-SPA-THR-06-social-identity-clients-fail-soft`
- **orientation:** tech_first
- **ui_scope:** none
- **Status:** Done (P3 `pkg-000082` · STOP before P4)
- **Package:** [threads-feed/](INDEX.md) · pipeline [EPIC-SPA-14 THR-06](../../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-06-social-identity-clients-fail-soft/STORY-SPA-THR-06-social-identity-clients-fail-soft.md)
- **Architecture:** [02-clients-and-write-gates](../../../architecture/threads-feed-ux/02-clients-and-write-gates.md) · [04-verify-and-fail-soft](../../../architecture/threads-feed-ux/04-verify-and-fail-soft.md)
- **Parent REQ:** AC-SPA-THR-01; §6 Open Q; interview Q2/Q8
- **Depends on:** [ADMIN-THR-04](ADMIN-THR-04-api-requirements.md) **Done (partial Open)**; sibling Closed contracts for social paths; optional separate wave after materialize
- **Blocked-on:** sibling Closed social HTTP (Unavailable until then) · FE `identity_verified` cutover **Done** this wave

## Зачем простыми словами

Без новой visual composition: typed clients для threads social ops (когда path Closed) + чтение `identity_verified`; progressive fail-soft; Issues list не regress.

## Scope

- Repository/service seams for social read/write **only** with named Closed paths (else Unavailable)
- Identity Me consumer for write gate (`identity_verified`)
- Fail-soft: empty/error states for thread data without breaking `getIssues`
- Tests: unit/contract against fixtures; no invented production URLs

## Verified state (cite [ADMIN-THR-04](ADMIN-THR-04-api-requirements.md))

| Fact | Status | Evidence |
|------|--------|----------|
| Issues list/detail | **Verified** | `GatewayIssueRepository.js` `GET {base}/node/issues` + `/:id` |
| Me fetch | **Verified** | `identityService.js` `GET /me` |
| Wire key `identity_verified` | **Verified sibling** | Identity TECH-ARCH on `/me` |
| SPA gates on `identity_verified` | **Closed** (THR-05/06) | `verifyWriteGate` + `meIdentityVerified.js` |
| Thread tree / comment / react / attach / knobs / pack keys | **Unknown / Open** | ADMIN-04 needs table — no invent |
| Escalate HTTP | **N/A** | stub only (THR-04) |
| Thread social client in spa | **On disk (Unavailable)** | `ThreadsSocialClient.js` — Open ops → Unavailable |

## Out of scope

- Invent HTTP paths/fields; mock feed data; ui_first chrome (THR-01…05)  
- **AC-SPA-THR-03** / REQ8: cabinet / votes / hold-shadow  
- **AC-SPA-THR-07:** rate-limit / near-dup UX  
- Spawn full api-req STORY before siblings Close social paths  
- Create epic folders this layer (ADMIN-06)

## Субтаски

> Projected pipeline IDs — folders **not** created (ADMIN-THR-06). Arch: [02-clients](../../../architecture/threads-feed-ux/02-clients-and-write-gates.md) · [04-fail-soft](../../../architecture/threads-feed-ux/04-verify-and-fail-soft.md). Cite [ADMIN-THR-04](ADMIN-THR-04-api-requirements.md). **No invent HTTP.**

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-thr-06-t01-social-client-closed-or-unavailable` | Threads social client seam: Closed ops only; else explicit Unavailable |
| **T02** | `task-spa-thr-06-t02-me-identity-verified-cutover` | Me consumer: gate on `identity_verified` (not sole `phone_verified`) |
| **T03** | `task-spa-thr-06-t03-fail-soft-issues-regress` | Thread fail-soft must not break `getIssues` / Issues list |
| **T04** | `task-spa-thr-06-t04-vitest-fixtures-no-invent-urls` | Vitest fixtures; no invented production URLs |
| **T05** | `task-spa-thr-06-t05-story-gate-thr-06` | Story gate THR-06 |

## Acceptance Criteria

- [x] No new mandated HTTP path in spa docs beyond siblings (AC-SPA-THR-01)
- [x] Social calls gated on Closed contract; otherwise explicit unavailable
- [x] Issues gateway path unchanged / regression-covered
- [x] Write gate reads `identity_verified` (cutover from `phone_verified`)
- [x] ADMIN-04 needs table cited; Unknowns listed (this story)

## Точки в коде (targets)

- `src/repositories/GatewayIssueRepository.js` (reuse)
- `src/auth/meIdentityVerified.js` + `identityService.js` Me consumer
- `src/repositories/ThreadsSocialClient.js` — Unavailable while ADMIN-04 Open (no invent)

## Next (process)

P3 Done · fail-soft seam shipped. **Wire Closed HTTP:** [THR-07](STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) → [THR-08](STORY-SPA-THR-08-comment-write-wire.md) → [THR-09](STORY-SPA-THR-09-reactions-attach-wire.md).
