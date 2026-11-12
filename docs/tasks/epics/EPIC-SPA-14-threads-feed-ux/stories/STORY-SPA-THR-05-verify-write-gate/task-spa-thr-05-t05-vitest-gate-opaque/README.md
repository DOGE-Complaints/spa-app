# SPA-THR-05-T05 — Vitest gate + opaque + draft preserve

**Status:** Done  
**Story:** [`../STORY-SPA-THR-05-verify-write-gate.md`](../STORY-SPA-THR-05-verify-write-gate.md)  
**Decision Ref:** backlog + M147 · AC-SPA-THR-05  
**ui_scope:** `visual`  
**Skill declared:** `test-master`  
**Scaffolded:** `2026-09-22T21:53:24Z`
**Completed:** `2026-09-22T21:56:59Z`  
**Package:** `pkg-000081`



## Purpose
Vitest: unverified blocks post; phone alone insufficient; opaque Verified; draft not auto-submit.

## AC / DoD
- [x] (P0) Purpose delivered vs M147 / FR
- [x] (P0) Gate on identity_verified — not phone_verified alone
- [x] (P0) No invent pack JSON keys / verify HTTP

## Where to change
- `src/components/threads/` · `src/i18n/threadsFeedDictionary.js` · tests

## Out of scope
THR-06 · invent pack keys · redesign VerifyPage body
