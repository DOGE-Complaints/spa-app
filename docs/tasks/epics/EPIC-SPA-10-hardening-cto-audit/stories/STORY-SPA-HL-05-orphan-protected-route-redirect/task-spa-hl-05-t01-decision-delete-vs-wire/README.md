# SPA-HL-05-T01 — Decision: delete (default) vs wire

**Status:** Done — 2026-08-10T09:41:49Z  
**Story:** [`../STORY-SPA-HL-05-orphan-protected-route-redirect.md`](../STORY-SPA-HL-05-orphan-protected-route-redirect.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md) §FR-HL-05.1–05.2 · audit §F3  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-10T09:35:22Z  
**Package:** `pkg-000063`

## Purpose

Зафиксировать решение delete|wire и короткий note каноничной модели guard (overlay). Default lean: **delete** — overlay is SSOT. Без реализации (T02).

## Risk

Две модели guard путают аудиторов; выполнение без decision размазывает T02.

## Code Facts (As-of-Done)

1. **As-of-Done:** `rg ProtectedRouteRedirect spa-app/src` → **ABSENT** · overlay guard at [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx) L28–41 (`isProtectedPath` + `SessionShellOverlay`).
2. Decision **delete** recorded in pipeline Notes + backlog Canonical guard note.
3. **Historical (pre-T02):** sole hit definition L56–58 + unused `Navigate` import (audit F3 / P3 T01 re-verify).

## AC / DoD

- [x] (P0) Written decision **delete** in pipeline Notes.
- [x] (P0) Canonical guard note: overlay / `isProtectedPath` (FR-HL-05.2 · AC#2).
- [x] (P0) No product code change in this task (T02 owns impl).

## Where to change

- Pipeline Notes · backlog Meta Canonical guard
- This README Status → Done

## Out of scope

Implement delete/wire (T02); HL-06; new protected prefixes.

## Verification

```bash
rg -n "Decision|delete|overlay|Canonical guard" \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-05-orphan-protected-route-redirect/STORY-SPA-HL-05-orphan-protected-route-redirect.md \
  spa-app/docs/tasks/backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-05-orphan-protected-route-redirect.md
```
