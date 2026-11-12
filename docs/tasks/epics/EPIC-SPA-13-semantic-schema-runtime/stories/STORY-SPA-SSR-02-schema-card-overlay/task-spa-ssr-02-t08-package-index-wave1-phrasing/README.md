# SPA-SSR-02-T08 — Package INDEX Wave 1 phrasing (F3)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-02-schema-card-overlay.md`](../STORY-SPA-SSR-02-schema-card-overlay.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-02-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-02-execution-2026-09-02.md) §F3  
**Depends on:** SPA-SSR-02-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02T20:13:25Z  
**Done:** 2026-09-02T20:30:25Z  
**Package:** `pkg-000075` **unchanged** · wave `spa_ssr_02_audit_2026_09_02`

## Purpose
Doc-only: package INDEX ADMIN-SSR-05 Next and execute tip still imply SSR-02 Todo / Wave 0 only while product SSR-02 **Done**.

## Risk
Marking EPIC Done; rewriting pkg-000075; product code edits.

## Code Facts (re-verify at execute)
- Stale: [`semantic-schema-runtime/INDEX.md`](../../../../../backlog-stories/semantic-schema-runtime/INDEX.md) L15 / L18
- Already correct: L5 product **2 Done / 1 Todo** · L25 SSR-02 **Done**

## Gap
Audit F3 Low — INDEX phrasing lag.

## AC / DoD
- [x] (P0) ADMIN-SSR-05 Next: Wave 1 Done · SSR-03 Todo
- [x] (P0) Execute tip mentions Wave 1 SSR-02 Done `pkg-000075`
- [x] (P0) Doc-only; do not rewrite `pkg-000075`

## Where to change
- `spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/INDEX.md`

## Out of scope
Product code · F1/F2 · SSR-03 implement · git push

## Verification
```bash
rg -n 'ADMIN-SSR-05|Wave 1|SSR-02/03 Todo|pkg-000075' spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/INDEX.md
```
