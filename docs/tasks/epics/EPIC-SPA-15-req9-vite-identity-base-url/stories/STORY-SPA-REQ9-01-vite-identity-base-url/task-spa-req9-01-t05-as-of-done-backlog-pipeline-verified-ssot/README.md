# SPA-REQ9-01-T05 — As-of-Done backlog/pipeline Verified + AC boxes (F1+F2)

**Status:** Done  
**Story:** [`../STORY-SPA-REQ9-01-vite-identity-base-url.md`](../STORY-SPA-REQ9-01-vite-identity-base-url.md)  
**Decision Ref:** audit F1+F2 · `audit-STORY-SPA-REQ9-01-execution-2026-09-26.md`  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-26T12:14:34Z`  
**Package:** `pkg-000086` (unchanged) · `run_mode=spa_req9_01_audit_2026_09_26`

## Purpose

Docs-only SSOT: rewrite backlog + pipeline §Verified current state as **As-of-Done / Historical (pre-REQ9-01)** (F1). Check backlog Target/AC boxes to match Meta Done + pipeline AC (F2).

## Code Facts (pre-P6)

| Claim | Evidence |
|-------|----------|
| Disk hard-cut Done | `resolveIdentityServiceUrl.js` · `.env.example` · scripts — audit PASS |
| Backlog Verified present-tense pre-P3 | backlog L51–61 |
| Pipeline Verified present-tense pre-P3 | pipeline L57–67 |
| Backlog AC still `[ ]` | backlog L65–71 |

## AC / DoD

- [x] (P0) Backlog §Verified → As-of-Done + Historical — **F1**
- [x] (P0) Pipeline §Verified → As-of-Done + Historical — **F1**
- [x] (P0) Backlog Target/AC checkboxes `[x]` — **F2**
- [x] (P0) No product code / env key reopen

## Where to change

- `spa-app/docs/tasks/backlog-stories/req9-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md`
- `spa-app/docs/tasks/epics/EPIC-SPA-15-req9-vite-identity-base-url/stories/STORY-SPA-REQ9-01-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md`

## Out of scope

REQ-18 AC (T06) · T01–T03 Code Facts (T07) · dual-read · Railway live UI · product source

## Verification

```bash
rg -n 'still old key|VITE_IDENTITY_BASE_URL.*0' spa-app/docs/tasks/backlog-stories/req9-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md spa-app/docs/tasks/epics/EPIC-SPA-15-req9-vite-identity-base-url/stories/STORY-SPA-REQ9-01-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md || true
rg -n '^- \[x\] \*\*AC-SPA-REQ901' spa-app/docs/tasks/backlog-stories/req9-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
