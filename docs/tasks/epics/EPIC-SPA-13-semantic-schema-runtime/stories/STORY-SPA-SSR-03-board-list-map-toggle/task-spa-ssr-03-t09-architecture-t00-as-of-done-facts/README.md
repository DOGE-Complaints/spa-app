# SPA-SSR-03-T09 — Architecture / T00 As-of-Done facts (F3)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-03-board-list-map-toggle.md`](../STORY-SPA-SSR-03-board-list-map-toggle.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-03-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-03-execution-2026-09-02.md) §F3  
**Depends on:** SPA-SSR-03-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02T20:47:38Z  
**Closed:** 2026-09-02T21:11:01Z  
**Package:** `pkg-000076` **unchanged** · wave `spa_ssr_03_audit_2026_09_02`

## Purpose
Doc-only: ARCHITECTURE header still «map UI not in spa src yet»; T00 Code Facts still «No map deps in package.json today».

## Risk
Re-interview ADR; product code edits; rewriting pkg YAML.

## Code Facts (re-verify at execute)
- Updated: [`ARCHITECTURE-SSR-03-board-map-pins.md`](../../../../../backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md) As-of-Done
- Updated: T00 README Code Facts → `maplibre-gl` present + Historical
- Disk: `maplibre-gl` ^4.7.1 · spike notes record style/cluster

## Gap
Audit F3 Low — architecture/T00 phrasing lag. **CLOSED**

## AC / DoD
- [x] (P0) Architecture status → As-of-Done implemented in spa `src/`
- [x] (P0) T00 Code Facts reflect `maplibre-gl` present (keep Historical note optional)
- [x] (P0) Doc-only; do not rewrite `pkg-000076`

## Where changed
- `ARCHITECTURE-SSR-03-board-map-pins.md`
- `task-spa-ssr-03-t00-maplibre-adr-spike/README.md` Code Facts only

## Out of scope
Product code · F1/F2 · git push

## Verification
```bash
rg -n 'not in spa|maplibre-gl|As-of-Done' spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/ARCHITECTURE-SSR-03-board-map-pins.md spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/task-spa-ssr-03-t00-maplibre-adr-spike/README.md
```
