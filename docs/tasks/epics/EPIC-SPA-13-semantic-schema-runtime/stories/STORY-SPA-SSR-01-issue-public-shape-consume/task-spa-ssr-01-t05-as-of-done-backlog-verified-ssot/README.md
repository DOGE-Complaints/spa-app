# SPA-SSR-01-T05 — As-of-Done backlog verified SSOT (F1)

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-01-issue-public-shape-consume.md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)  
**Decision Ref:** [audit-STORY-SPA-SSR-01-execution-2026-09-02.md](../../../../../../analysis/audit-STORY-SPA-SSR-01-execution-2026-09-02.md) §F1  
**Depends on:** SPA-SSR-01-T04 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-02T19:42:56Z  
**Done:** 2026-09-02T19:46:06Z  
**Package:** `pkg-000074` **unchanged** · wave `spa_ssr_01_audit_2026_09_02`  
**Gate:** [acceptance-verification-spa-ssr-01-t05.md](./acceptance-verification-spa-ssr-01-t05.md)

## Purpose
Doc-only: backlog §«Текущее состояние (verified)» and §«Зачем» still present-tense pre-P3. Disk: `schema_card`/`geo` typedef + `passThroughPublicIssue`. Meta/AC already Done — do not reopen product AC.

## Risk
Readers treat pre-T01 verified table as current. Reopening product code / SSR-02/03. Mixing BUG pkgs.

## Code Facts (re-verify at execute)
- Typedef + validators: [`types.js`](../../../../../../../src/domain/types.js) `IssueSchemaCard` / `IssueGeo` / optional on `Issue`
- Pass-through: [`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js) `passThroughPublicIssue`
- Backlog As-of-Done + Historical: [`STORY-SPA-SSR-01-….md`](../../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md)
- Audit: [`audit-STORY-SPA-SSR-01-execution-2026-09-02.md`](../../../../../../analysis/audit-STORY-SPA-SSR-01-execution-2026-09-02.md) §F1

## Gap
Audit F1 Medium — backlog verified/«Зачем» SSOT lag vs Done code → **CLOSED**

## AC / DoD
- [x] (P0) §Текущее состояние → As-of-Done table (`schema_card`+`geo` on Issue; pass-through) + Historical (pre-T01)
- [x] (P0) Soften §Зачем present-tense to past/current vs Done foundation
- [x] (P0) Meta Status Done + AC `[x]` unchanged; doc-only; no product `src/` edits

## Where to change
- `spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md`

## Out of scope
Product code · F2 package INDEX · F3 epic/bullrun · SSR-02/03 · git push

## Verification
```bash
rg -n 'Текущее состояние|As-of-Done|Historical|schema_card|passThroughPublicIssue' spa-app/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md
```
