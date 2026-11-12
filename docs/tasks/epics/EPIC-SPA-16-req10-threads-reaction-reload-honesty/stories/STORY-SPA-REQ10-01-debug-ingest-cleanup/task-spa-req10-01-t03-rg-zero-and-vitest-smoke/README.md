# SPA-REQ10-01-T03 — Confirm rg→0 + ThreadsSocialClient vitest smoke

**Status:** Done  
**Story:** [`../STORY-SPA-REQ10-01-debug-ingest-cleanup.md`](../STORY-SPA-REQ10-01-debug-ingest-cleanup.md)  
**Decision Ref:** backlog `STORY-SPA-REQ10-01-debug-ingest-cleanup.md` · REQ-19 · REQ10 §7.1 H1  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-28T18:02:36Z`  
**Done:** `2026-09-28T18:05:35Z`  
**Package:** `pkg-000087`

## Purpose

After T01–T02, prove `rg '7840/ingest' spa-app/src` → **0** and run existing `ThreadsSocialClient` vitest smoke so Closed paths were not invented/broken by cleanup.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Tree-wide ingest | `rg '7840/ingest' spa-app/src` → **0** |
| Vitest smoke | `ThreadsSocialClient.test.js` **25 passed** (2026-09-28T18:05:35Z) |
| No invent paths | diff = ingest region removal only |

**Historical (pre-P3):** **2 files / 10 matches**.

## AC / DoD

- [x] (P0) `rg '7840/ingest' spa-app/src` → **0** — **AC-SPA-REQ1001-01**
- [x] (P0) No new invented threads HTTP path visible in diff of T01–T02 — **AC-SPA-REQ1001-02**
- [x] (P0) `ThreadsSocialClient.test.js` passes (smoke Closed behavior) — **AC-SPA-REQ1001-03**

## Where to change

- Evidence only — no new product endpoints

## Out of scope

Product strip (T01–T02) · story gate fill Date (T04) · REQ10-02 · H9 puppeteer

## Verification

```bash
rg -n '7840/ingest' spa-app/src || true
# → 0
cd spa-app && npx vitest run src/repositories/__tests__/ThreadsSocialClient.test.js
# 25 passed
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
