# SPA-NS-06-T07 — spa-url-page-map §8 checklist home flip (F2)

**Status:** ✅ Done · P6 `2026-10-09T17:58:56Z`  
**Story:** [`../STORY-SPA-NS-06-default-entry-shell-verify.md`](../STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Decision Ref:** [audit-STORY-SPA-NS-06-execution-2026-10-09.md](../../../../../../analysis/audit-STORY-SPA-NS-06-execution-2026-10-09.md) · F2 Medium  
**ui_scope:** `none` (docs SSOT only)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T17:56:50Z`  
**Done:** `2026-10-09T17:58:56Z`  
**Package:** `pkg-000102` (unchanged · `run_mode=spa_ns_06_audit_2026_10_09`)  
**Gaps:** F2 → **CLOSED**  
**acceptance:** [`acceptance-verification-spa-ns-06-t07.md`](./acceptance-verification-spa-ns-06-t07.md)

## Purpose

Update `spa-url-page-map.md` §8 checklist — «Public home / feed» still `/#/board` while route table already flipped to `/next/feed`. Align checklist (+ residual handoff `/board` defaults if present in same file). Docs only.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Route table flipped | [`spa-url-page-map.md`](../../../../../../spa-url-page-map.md) §2 `/` · `*` → `/next/feed` |
| 2 | §8 checklist aligned | Public home → `/#/next/feed` · classic shelter `/#/board` |
| 3 | Handoff residual annotated | Default return `/board` still code-true · labeled residual |

## AC / DoD

- [x] (P0) §8 Public home / feed → `/#/next/feed` (classic `/#/board` documented as shelter residual)
- [x] (P0) Scan same file for residual «home → `/board`» defaults; fix or annotate honestly
- [x] (P0) Gap F2 CLOSED in audit/bullrun wave note

## Where to change

- `spa-app/docs/spa-url-page-map.md` only (docs)

## Out of scope

App.jsx changes · BoardFeed invent · permanent classic retire · invent CI

## Verification

```bash
rg -n 'Public home|/next/feed|/#/board' spa-app/docs/spa-url-page-map.md | head -40
```
