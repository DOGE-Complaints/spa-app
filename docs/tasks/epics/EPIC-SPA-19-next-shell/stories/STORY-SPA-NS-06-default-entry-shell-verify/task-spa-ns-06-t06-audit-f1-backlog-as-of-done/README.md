# SPA-NS-06-T06 — Backlog Historical vs As-of-Done (F1)

**Status:** ✅ Done · P6 `2026-10-09T17:58:56Z`  
**Story:** [`../STORY-SPA-NS-06-default-entry-shell-verify.md`](../STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Decision Ref:** [audit-STORY-SPA-NS-06-execution-2026-10-09.md](../../../../../../analysis/audit-STORY-SPA-NS-06-execution-2026-10-09.md) · F1 Medium  
**ui_scope:** `none` (docs SSOT only)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T17:56:50Z`  
**Done:** `2026-10-09T17:58:56Z`  
**Package:** `pkg-000102` (unchanged · `run_mode=spa_ns_06_audit_2026_10_09`)  
**Gaps:** F1 → **CLOSED**  
**acceptance:** [`acceptance-verification-spa-ns-06-t06.md`](./acceptance-verification-spa-ns-06-t06.md)

## Purpose

Fix backlog §«Текущее состояние (verified)» — still claims `/` → `/board` and icons «may be Absent» vs As-of-Done code (P3 flip + NS-02 promote). Split **Historical** vs **As-of-Done** SSOT. No product `src/` rewrite.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | `/` + `*` → `/next/feed` | [`spa-app/src/App.jsx`](../../../../../../../src/App.jsx) |
| 2 | Icons Present | `spa-app/public/icons/next-shell/navigation/*.svg` |
| 3 | Backlog SSOT updated | [`backlog …/STORY-SPA-NS-06-….md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md) Historical + As-of-Done |

## AC / DoD

- [x] (P0) Backlog §Текущее состояние: Historical (pre-flip) + As-of-Done (`/` → `/next/feed` · icons Present)
- [x] (P0) No invent BoardFeed / no classic retire
- [x] (P0) Gap F1 CLOSED in audit/bullrun wave note

## Where to change

- `spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md` only (docs)

## Out of scope

Product route rewrite · feed body · icon re-promote · live vitest (F3 WAIVED)

## Verification

```bash
rg -n "Текущее состояние|As-of-Done|/next/feed|/board" spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md | head -30
rg -n 'Navigate to="/next/feed"' spa-app/src/App.jsx
```
