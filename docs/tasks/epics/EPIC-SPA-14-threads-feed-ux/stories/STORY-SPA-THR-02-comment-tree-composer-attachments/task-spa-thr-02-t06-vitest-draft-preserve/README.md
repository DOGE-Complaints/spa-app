# SPA-THR-02-T06 — Vitest soft-fail preserves draft

**Status:** Done  
**Story:** [`../STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../STORY-SPA-THR-02-comment-tree-composer-attachments.md)  
**Decision Ref:** FR-THR-02.7 / FR-THR-02.8 · M144 THR-T-E/F  
**Depends on:** SPA-THR-02-T03 · T05  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-22T21:00:23Z
**Done:** 2026-09-22T21:05:21Z  
**Package:** `pkg-000078`

## Purpose
Vitest: attach denied and/or post soft-fail keep draft text; denied attach not shown as success; max-depth boundary has no deeper Reply. No mock invent HTTP clients.

## Risk
Fake fetch mocks inventing endpoints; brittle DOM without testids.

## Code Facts (re-verify at execute)
- Existing pattern: `IssueThreadBlock.test.jsx` (renderToStaticMarkup / RTL as used)

## AC / DoD
- [x] (P0) Draft preserved on attach denied
- [x] (P0) Draft preserved on post soft-fail
- [x] (P0) Max-depth has no deeper reply affordance
- [x] (P0) No invent HTTP mocks

## Where to change
- `src/components/threads/__tests__/*`

## Out of scope
Story gate (T07) · invent HTTP

## Verification
```bash
cd spa-app && npx vitest run src/components/threads --reporter=dot
```
