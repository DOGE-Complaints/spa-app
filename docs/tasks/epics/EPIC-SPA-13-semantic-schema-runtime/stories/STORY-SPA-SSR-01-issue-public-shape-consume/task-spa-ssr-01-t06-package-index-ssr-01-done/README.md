# SPA-SSR-01-T06 — Package INDEX SSR-01 Done sync (F2)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-01-issue-public-shape-consume.md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-01-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-01-execution-2026-09-02.md) §F2  
**Depends on:** SPA-SSR-01-T04 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02T19:42:56Z  
**Done:** 2026-09-02T19:46:06Z  
**Package:** `pkg-000074` **unchanged** · wave `spa_ssr_01_audit_2026_09_02`  
**Gate:** [acceptance-verification-spa-ssr-01-t06.md](./acceptance-verification-spa-ssr-01-t06.md)

## Purpose
Doc-only: package `semantic-schema-runtime/INDEX.md` still says product **3 Todo** and SSR-01 **Todo**, contradicting pipeline/backlog Meta Done and parent INDEX.

## Risk
Operators pick SSR-01 again as Todo intake. Changing product code. Mixing BUG pkgs.

## Code Facts (re-verify at execute)
- Package INDEX synced: [`semantic-schema-runtime/INDEX.md`](../../../../../backlog-stories/semantic-schema-runtime/INDEX.md) · **1 Done / 2 Todo** · SSR-01 **Done**
- Parent INDEX SSR-01 Done: [`backlog-stories/INDEX.md`](../../../../../backlog-stories/INDEX.md)
- Pipeline Meta Done: [`STORY-SPA-SSR-01-….md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)
- Audit: [`audit-STORY-SPA-SSR-01-execution-2026-09-02.md`](../../../../../../analysis/audit-STORY-SPA-SSR-01-execution-2026-09-02.md) §F2

## Gap
Audit F2 Medium — package INDEX product status lag → **CLOSED**

## AC / DoD
- [x] (P0) Product stories: SSR-01 **Done**; product **1 Done / 2 Todo** (SSR-02/03)
- [x] (P0) Header режим line matches; ADMIN-SSR-05 Next notes Wave 0 Done · SSR-02/03 Todo
- [x] (P0) Doc-only; do not rewrite `pkg-000074`

## Where to change
- `spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/INDEX.md`

## Out of scope
Product code · F1 backlog verified · F3 epic · SSR-02/03 implement · git push

## Verification
```bash
rg -n 'SSR-01|3 Todo|1 Done|Wave 0' spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/INDEX.md
```
