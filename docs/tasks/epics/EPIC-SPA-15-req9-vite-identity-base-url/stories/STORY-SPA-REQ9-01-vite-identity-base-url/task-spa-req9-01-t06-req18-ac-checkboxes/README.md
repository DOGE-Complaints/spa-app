# SPA-REQ9-01-T06 — REQ-18 §5 AC checkboxes (F3)

**Status:** Done  
**Story:** [`../STORY-SPA-REQ9-01-vite-identity-base-url.md`](../STORY-SPA-REQ9-01-vite-identity-base-url.md)  
**Decision Ref:** audit F3 · `audit-STORY-SPA-REQ9-01-execution-2026-09-26.md`  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-26T12:14:34Z`  
**Package:** `pkg-000086` (unchanged) · `run_mode=spa_req9_01_audit_2026_09_26`

## Purpose

Docs-only: check REQ-18 §5 Acceptance criteria boxes (R3 / no service_role / G10) to match Status Done · P3.

## Code Facts (pre-P6)

| Claim | Evidence |
|-------|----------|
| REQ-18 Status Done · P3 | `spa-app/docs/requirements/18-req9-vite-identity-base-url.md` L8 |
| §5 AC still `[ ]` | same file L37–39 (audit) |

## AC / DoD

- [x] (P0) REQ-18 §5 three AC boxes `[x]` — **F3**
- [x] (P0) Do not invent new AC text; no product code

## Where to change

- `spa-app/docs/requirements/18-req9-vite-identity-base-url.md`

## Out of scope

Backlog/pipeline Verified (T05) · T01–T03 facts (T07) · erase Historical rename narrative (F4 WAIVED)

## Verification

```bash
rg -n '^- \[x\]' spa-app/docs/requirements/18-req9-vite-identity-base-url.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
