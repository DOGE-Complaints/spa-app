# SPA-SSR-01-T07 — Epic + bullrun Wave 0 phrasing (F3)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-01-issue-public-shape-consume.md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-01-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-01-execution-2026-09-02.md) §F3  
**Depends on:** SPA-SSR-01-T04 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02T19:42:56Z  
**Done:** 2026-09-02T19:46:06Z  
**Package:** `pkg-000074` **unchanged** · wave `spa_ssr_01_audit_2026_09_02`  
**Gate:** [acceptance-verification-spa-ssr-01-t07.md](./acceptance-verification-spa-ssr-01-t07.md)

## Purpose
Doc-only: epic header still «Scaffolded / Ready for P1.3»; bullrun Epic Registry still «SSR-01 … P1.3» while story/task rows and §Актуальная точка already P3 Done. Epic remains **In Progress** (SSR-02/03 open) — phrasing only.

## Risk
Treating epic as not started. Closing entire EPIC-SPA-13 incorrectly. Product code edits.

## Code Facts (re-verify at execute)
- Epic header: [`EPIC-SPA-13-semantic-schema-runtime.md`](../../../EPIC-SPA-13-semantic-schema-runtime.md) L3 — In Progress · Wave 0 Done
- Bullrun epic row: [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md) Epic Registry `EPIC-SPA-13` — **P3 Done**
- Story/task Done rows already present (T01–T04)
- Audit: [`audit-STORY-SPA-SSR-01-execution-2026-09-02.md`](../../../../../../analysis/audit-STORY-SPA-SSR-01-execution-2026-09-02.md) §F3

## Gap
Audit F3 Low — epic + bullrun Wave 0 / P1.3 phrasing lag → **CLOSED**

## AC / DoD
- [x] (P0) Epic status: In Progress · Wave 0 SSR-01 **Done** `pkg-000074` (not «Ready for P1.3»)
- [x] (P0) Bullrun Epic Registry: «P3 Done» not «P1.3»; epic stays In Progress for SSR-02/03
- [x] (P0) Doc-only; do not mark EPIC Done; do not rewrite `pkg-000074`

## Where to change
- `spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md`
- `spa-app/docs/tasks/bullrun-launch-index.md` (Epic Registry row only + tip if needed)

## Out of scope
Product code · F1/F2 · closing SSR-02/03 · git push

## Verification
```bash
rg -n 'Scaffolded|Ready for P1.3|P3 Done|Wave 0|pkg-000074' spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md spa-app/docs/tasks/bullrun-launch-index.md | head -40
```
