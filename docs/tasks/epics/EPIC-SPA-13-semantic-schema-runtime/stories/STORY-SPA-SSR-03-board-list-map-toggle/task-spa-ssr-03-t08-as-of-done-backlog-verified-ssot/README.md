# SPA-SSR-03-T08 — As-of-Done backlog verified SSOT (F2)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-03-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-03-execution-2026-09-02.md) §F2  
**Depends on:** SPA-SSR-03-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02T20:47:38Z  
**Closed:** 2026-09-02T21:11:01Z  
**Package:** `pkg-000076` **unchanged** · wave `spa_ssr_03_audit_2026_09_02`

## Purpose
Doc-only: backlog §«Текущее состояние» still claims Map UI/deps **0** and geo not consumed — contradicts Meta **Done** and disk MapLibre stack.

## Risk
Reopening product AC; rewriting pkg-000076; inventing fields.

## Code Facts (re-verify at execute)
- Updated: [`STORY-SPA-SSR-03-….md`](../../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md) §Текущее состояние → As-of-Done + Historical
- Disk: `maplibre-gl` in `package.json` · `ListMapToggle` / `BoardIssuesMap` · Meta Status **Done**

## Gap
Audit F2 Medium — backlog verified SSOT lag. **CLOSED**

## AC / DoD
- [x] (P0) §Текущее состояние → As-of-Done (MapLibre + toggle/pins) + Historical (pre-map)
- [x] (P0) Soften §Зачем if still future-tense vs Done (optional)
- [x] (P0) Meta Status Done + AC `[x]` unchanged; doc-only

## Where changed
- `spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md`

## Out of scope
Product code · F1 harness · F3 Architecture · git push

## Verification
```bash
rg -n 'Текущее состояние|As-of-Done|Historical|maplibre|Map UI' spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-03-board-list-map-toggle.md
```
