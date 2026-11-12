# SPA-SSR-01-T02 — Repository pass-through sidecars

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-01-issue-public-shape-consume.md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)  
**Decision Ref:** backlog FR-SSR-01.3 / FR-SSR-01.4 / FR-SSR-01.5  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** 2026-09-02  
**Done:** 2026-09-02T19:36:26Z

## Purpose
`GatewayIssueRepository` (and any normalizer) MUST NOT strip `schema_card` / `geo` from `envelope.data.issues[]` / detail `issue`.

## Risk
Silent field drop; adding pack.json / schema-metadata fetches; renaming public keys.

## Code Facts (As-of-Done)
- [`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js) — `passThroughPublicIssue` on list/detail; HTTP still only `/node/issues`
- No `structured_payload` / pack.json fetch in repositories

## AC / DoD
- [x] (P0) Sidecar keys preserved from envelope without mutation
- [x] (P0) No new HTTP; no `structured_payload` handling
- [x] (P0) No invent `admin_*` rename on Issue objects

## Where to change
- `spa-app/src/repositories/GatewayIssueRepository.js` (+ normalizers if present)

## Out of scope
UI · typedef-only (T01) · pack.json browser

## Verification
```bash
rg -n 'schema_card|structured_payload|pack\.json' spa-app/src/repositories || true
```
