# SPA-NS-01-T03 — Add `nextShell.wip.*` en/et/ru keys

**Status:** Done · P3 `2026-10-09T15:09:58Z`  
**Story:** [`../STORY-SPA-NS-01-next-routes-shell-host.md`](../STORY-SPA-NS-01-next-routes-shell-host.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-01-next-routes-shell-host.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-01-next-routes-shell-host.md)  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T15:02:39Z`  
**Done:** `2026-10-09T15:09:58Z`  
**Package:** `pkg-000097`

## Purpose
Add `nextShell.wip.title` / `nextShell.wip.body` for en / et / ru.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Dictionary Present | [`nextShellDictionary.js`](../../../../../../../src/i18n/nextShellDictionary.js) |
| 2 | Wired into UI_DICTIONARY | [`dictionaries.js`](../../../../../../../src/i18n/dictionaries.js) |
| 3 | Flat keys tested | `src/i18n/__tests__/nextShellDictionary.test.js` |

## AC / DoD

- [x] `nextShell.wip.title` + `nextShell.wip.body` Present en/et/ru
- [x] Placeholder consumes `t()` keys
