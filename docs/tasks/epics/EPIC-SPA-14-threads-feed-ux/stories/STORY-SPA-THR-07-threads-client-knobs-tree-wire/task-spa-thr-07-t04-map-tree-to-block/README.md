# SPA-THR-07-T04 — Map tree envelope → IssueThreadBlock

**Status:** Done  
**Story:** [`../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)  
**Decision Ref:** backlog THR-07 · OpenAPI tree envelope  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:30:38Z`
**Completed:** `2026-09-24T07:37:03Z`  
**Package:** `pkg-000083`

## Purpose

Map envelope → IssueThreadBlock status/comments; no demo fixture when live.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| `IssueThreadBlock` | `spa-app/src/components/threads/IssueThreadBlock.jsx` |
| Demo fixture | `spa-app/src/components/threads/thr02DemoFixture.js` (harness-only) |
| Map fields | `comment_id→id`, `body→label` (truncate), `parent_id`, `depth` |
| Status enum | `loading\|empty\|populated\|unavailable` |

## AC / DoD

- [x] (P0) Empty tree → `empty`; ≥1 comment → `populated`; error → `unavailable` + retry affordance
- [x] (P0) Demo comments **not** used as prod default when live path active
- [x] (P0) Fail-soft malformed/network → `unavailable`

## Where to change

- Mapper module (new) · `IssueThreadBlock.jsx` consumers
- Keep `thr02DemoFixture.js` harness-only

## Out of scope

Board/Issue page orchestration (T05) · invent HTTP

## Verification

```bash
cd spa-app && npm test -- --run src/components/threads
```
