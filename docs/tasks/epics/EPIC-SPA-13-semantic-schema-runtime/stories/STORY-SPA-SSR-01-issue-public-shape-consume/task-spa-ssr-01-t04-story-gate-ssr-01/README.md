# SPA-SSR-01-T04 — Story gate SSR-01

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-01-issue-public-shape-consume.md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)  
**Decision Ref:** backlog Acceptance Criteria  
**Depends on:** T01–T03  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02  
**Done:** 2026-09-02T19:37:42Z

## Purpose
Close SSR-01: AC checklist, backlog/pipeline as-of notes, no UI leak.

## Risk
Marking Done while strip still exists; shipping overlay in this story.

## AC / DoD
- [x] (P0) All SSR-01 AC checked
- [x] (P0) Aligns with api-req §5 (consume `/node/issues` only)
- [x] (P0) grep: no `structured_payload` consumer added

## Out of scope
SSR-02 / SSR-03 implementation · pkg activate

## Gate
[acceptance-verification-spa-ssr-01.md](./acceptance-verification-spa-ssr-01.md)

## Verification
```bash
rg -n 'structured_payload|schema_card' spa-app/src || true
```
