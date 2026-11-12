# SPA-REQ9-01-T07 — As-of-Done T01–T03 Code Facts (F5)

**Status:** Done  
**Story:** [`../STORY-SPA-REQ9-01-vite-identity-base-url.md`](../STORY-SPA-REQ9-01-vite-identity-base-url.md)  
**Decision Ref:** audit F5 · `audit-STORY-SPA-REQ9-01-execution-2026-09-26.md`  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-26T12:14:34Z`  
**Package:** `pkg-000086` (unchanged) · `run_mode=spa_req9_01_audit_2026_09_26`

## Purpose

Docs-only: rewrite T01–T03 README «Code Facts (pre-P3)» present-tense old-key claims to **As-of-Done / Current** pointing at post-hard-cut paths (keep brief Historical if needed).

## Code Facts (pre-P6)

| Claim | Evidence |
|-------|----------|
| T01–T03 Status Done | task READMEs |
| Code Facts still pre-P3 old key | T01/T02/T03 «Code Facts (pre-P3)» tables |

## AC / DoD

- [x] (P0) T01 Code Facts As-of-Done — **F5**
- [x] (P0) T02 Code Facts As-of-Done — **F5**
- [x] (P0) T03 Code Facts As-of-Done — **F5**
- [x] (P0) No product code changes

## Where to change

- `task-spa-req9-01-t01-resolver-env-example-tests/README.md`
- `task-spa-req9-01-t02-scripts-bake-start/README.md`
- `task-spa-req9-01-t03-docs-railway-checklist/README.md`

## Out of scope

Backlog/pipeline (T05) · REQ-18 (T06) · reopen env hard cut

## Verification

```bash
rg -n 'Code Facts \(pre-P3\)|still old key|VITE_IDENTITY_SERVICE_URL' \
  spa-app/docs/tasks/epics/EPIC-SPA-15-req9-vite-identity-base-url/stories/STORY-SPA-REQ9-01-vite-identity-base-url/task-spa-req9-01-t01-resolver-env-example-tests/README.md \
  spa-app/docs/tasks/epics/EPIC-SPA-15-req9-vite-identity-base-url/stories/STORY-SPA-REQ9-01-vite-identity-base-url/task-spa-req9-01-t02-scripts-bake-start/README.md \
  spa-app/docs/tasks/epics/EPIC-SPA-15-req9-vite-identity-base-url/stories/STORY-SPA-REQ9-01-vite-identity-base-url/task-spa-req9-01-t03-docs-railway-checklist/README.md || true
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
