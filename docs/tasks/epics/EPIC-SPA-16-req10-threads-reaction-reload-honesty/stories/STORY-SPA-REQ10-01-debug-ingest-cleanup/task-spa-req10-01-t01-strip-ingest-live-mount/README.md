# SPA-REQ10-01-T01 — Strip Cursor ingest from LiveIssueThreadMount

**Status:** Done  
**Story:** [`../STORY-SPA-REQ10-01-debug-ingest-cleanup.md`](../STORY-SPA-REQ10-01-debug-ingest-cleanup.md)  
**Decision Ref:** backlog `STORY-SPA-REQ10-01-debug-ingest-cleanup.md` · REQ-19 · REQ10 §7.1 H1  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-28T18:02:36Z`  
**Done:** `2026-09-28T18:05:35Z`  
**Package:** `pkg-000087`

## Purpose

Remove all `fetch('http://127.0.0.1:7840/ingest/…')` (and equivalents) from `LiveIssueThreadMount.jsx` so production mount path has no Cursor debug ingest side-effects. Do not change knobs/tree load / Closed HTTP behavior beyond ingest removal.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Zero ingest in mount | `rg 7840/ingest spa-app/src/components/threads/LiveIssueThreadMount.jsx` → 0 |
| Knobs-null → unavailable unchanged | `LiveIssueThreadMount.jsx` — `setStatus('unavailable'); return` after `!knobs` |
| Tree map → setComments unchanged | same file — `mapThreadTreeToBlock` → `setComments` / `setStatus` |

**Historical (pre-P3):** ingest at `:64` (knobs null) and `:84` (tree_mapped).

## AC / DoD

- [x] (P0) Zero `7840/ingest` (and equivalent ingest fetch) in `LiveIssueThreadMount.jsx` — **AC-SPA-REQ1001-01**
- [x] (P0) No change to Closed knobs/tree call shape beyond removing ingest — **AC-SPA-REQ1001-03**
- [x] (P0) No new threads HTTP path invented in this file — **AC-SPA-REQ1001-02**

## Where to change

- `spa-app/src/components/threads/LiveIssueThreadMount.jsx`

## Out of scope

`ThreadsSocialClient.js` (T02) · full-tree `rg` + vitest smoke (T03) · story gate (T04) · REQ10-02 `selected` · invent endpoints

## Verification

```bash
rg -n '7840/ingest' spa-app/src/components/threads/LiveIssueThreadMount.jsx || true
# → 0 (2026-09-28T18:05:35Z)
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
