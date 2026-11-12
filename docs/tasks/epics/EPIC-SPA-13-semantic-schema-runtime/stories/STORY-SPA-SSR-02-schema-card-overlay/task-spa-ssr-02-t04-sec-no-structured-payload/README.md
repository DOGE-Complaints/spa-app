# SPA-SSR-02-T04 — SEC: never render structured_payload

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-02-schema-card-overlay.md`](../STORY-SPA-SSR-02-schema-card-overlay.md)  
**Decision Ref:** FR-SSR-02.6 · AC-SPA-REQ3-03 · SEC-004  
**ui_scope:** `none`  
**Skill declared:** `secure-code-guardian`  
**Done:** 2026-09-02T20:06:33Z  
**Gate:** [acceptance-verification-spa-ssr-02-t04.md](./acceptance-verification-spa-ssr-02-t04.md)

## Purpose
Guarantee overlay/UI never renders `structured_payload`.

## AC / DoD
- [x] (P0) No `structured_payload` render path in overlay modules
- [x] (P0) Only keys present on `schema_card` object are shown
