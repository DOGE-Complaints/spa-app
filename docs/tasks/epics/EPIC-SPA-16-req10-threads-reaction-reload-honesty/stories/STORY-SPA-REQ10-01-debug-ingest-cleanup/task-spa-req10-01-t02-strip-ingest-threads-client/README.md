# SPA-REQ10-01-T02 — Strip Cursor ingest from ThreadsSocialClient

**Status:** Done  
**Story:** [`../STORY-SPA-REQ10-01-debug-ingest-cleanup.md`](../STORY-SPA-REQ10-01-debug-ingest-cleanup.md)  
**Decision Ref:** backlog `STORY-SPA-REQ10-01-debug-ingest-cleanup.md` · REQ-19 · REQ10 §7.1 H1  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-28T18:02:36Z`  
**Done:** `2026-09-28T18:05:35Z`  
**Package:** `pkg-000087`

## Purpose

Remove all `fetch('http://127.0.0.1:7840/ingest/…')` (and equivalents) from `ThreadsSocialClient.js` (create / Closed GET / Bearer write paths). Keep Closed HTTP paths and fail-soft classification unchanged except removal of ingest side-effects.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Zero ingest in client | `rg 7840/ingest spa-app/src/repositories/ThreadsSocialClient.js` → 0 |
| Closed GET / Bearer write returns unchanged | same early-return / classify / writeFail paths without ingest |
| Client tests | `__tests__/ThreadsSocialClient.test.js` **25/25** |

**Historical (pre-P3):** 8 ingest hits at create / runClosedGet / runClosedBearerWrite.

## AC / DoD

- [x] (P0) Zero `7840/ingest` in `ThreadsSocialClient.js` — **AC-SPA-REQ1001-01**
- [x] (P0) No new invented threads HTTP path as side-effect — **AC-SPA-REQ1001-02**
- [x] (P0) Closed GET / Bearer write / create behavior unchanged except ingest removal — **AC-SPA-REQ1001-03**

## Where to change

- `spa-app/src/repositories/ThreadsSocialClient.js`

## Out of scope

`LiveIssueThreadMount.jsx` (T01) · full `rg` + vitest smoke (T03) · story gate (T04) · REQ10-02 · invent endpoints / multipart

## Verification

```bash
rg -n '7840/ingest' spa-app/src/repositories/ThreadsSocialClient.js || true
# → 0 (2026-09-28T18:05:35Z)
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
