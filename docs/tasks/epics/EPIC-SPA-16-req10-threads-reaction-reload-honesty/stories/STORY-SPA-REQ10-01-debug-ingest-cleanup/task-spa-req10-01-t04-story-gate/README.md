# SPA-REQ10-01-T04 — Story gate REQ10-01

**Status:** Done  
**Story:** [`../STORY-SPA-REQ10-01-debug-ingest-cleanup.md`](../STORY-SPA-REQ10-01-debug-ingest-cleanup.md)  
**Decision Ref:** backlog `STORY-SPA-REQ10-01-debug-ingest-cleanup.md` · REQ-19 · REQ10 §7.1 H1  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-28T18:02:36Z`  
**Done:** `2026-09-28T18:05:35Z`  
**Package:** `pkg-000087`

## Purpose

Story acceptance gate for REQ10-01. Fill `acceptance-verification-spa-req10-01.md` **after** live vitest + `--verify` in P3 (Date from live `--print-utc-now`). Confirm AC-01…03.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Gate PASS | [acceptance-verification-spa-req10-01.md](acceptance-verification-spa-req10-01.md) · Date `2026-09-28T18:05:35Z` |
| AC-01…03 | all PASS in gate table |

## AC / DoD

- [x] (P0) All AC-SPA-REQ1001-01…03 evidenced in gate file
- [x] (P0) `rg '7840/ingest' spa-app/src` → **0** — **AC-01**
- [x] (P0) No invented threads HTTP path as cleanup side-effect — **AC-02**
- [x] (P0) Closed knobs/tree/react behavior unchanged except ingest removal — **AC-03**
- [x] (P0) Gate `Date:` only after live P3 verify + `--print-utc-now`

## Where to change

- `acceptance-verification-spa-req10-01.md`

## Out of scope

P4 · P8 · UX screenshots (`ui_scope: none`) · product implementation (T01–T03)

## Verification

```bash
rg -n '7840/ingest' spa-app/src || true
cd spa-app && npx vitest run src/repositories/__tests__/ThreadsSocialClient.test.js
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
