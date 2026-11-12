# SPA-THR-06-T01 — Social client Closed-or-Unavailable

**Status:** Done  
**Story:** [`../STORY-SPA-THR-06-social-identity-clients-fail-soft.md`](../STORY-SPA-THR-06-social-identity-clients-fail-soft.md)  
**Decision Ref:** backlog · ADMIN-THR-04 · AC-SPA-THR-01  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-23T06:49:11Z`
**Completed:** `2026-09-23T06:52:00Z`  
**Package:** `pkg-000082`

## Purpose
Threads social client seam: Closed ops only when sibling names paths; else explicit Unavailable (ADMIN-04 Open).

## AC / DoD
- [x] (P0) Purpose delivered vs ADMIN-04 / arch 02+04
- [x] (P0) No invent production social URLs
- [x] (P0) identity_verified Me consumer (not phone alone)

## Where to change
- `src/repositories/` · `src/auth/` · `src/components/threads/verifyWriteGate.js` · tests

## Out of scope
Invent HTTP · ui_first chrome · mock feed data · THR-01…05 reopen
