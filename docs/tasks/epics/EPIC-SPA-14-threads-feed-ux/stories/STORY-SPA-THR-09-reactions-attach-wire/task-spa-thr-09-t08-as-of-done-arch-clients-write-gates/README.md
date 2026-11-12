# SPA-THR-09-T08 — Arch 02 clients/write-gates As-of-Done (F1)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-09-reactions-attach-wire.md`](../STORY-SPA-THR-09-reactions-attach-wire.md)  
**Decision Ref:** [audit-STORY-SPA-THR-09-execution-2026-09-24.md](../../../../../../analysis/audit-STORY-SPA-THR-09-execution-2026-09-24.md) §F1  
**Depends on:** SPA-THR-09-T07 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:21:05Z`  
**Completed:** `2026-09-24T08:21:53Z`  
**Package:** `pkg-000085` **unchanged** · wave `spa_thr_09_audit_2026_09_24`

## Purpose

Doc-only As-of-Done: update `02-clients-and-write-gates.md` As-is + Contracts — `react`/`attach_ref` **Closed** (PUT reactions · POST attachment-refs + Bearer · cite `ThreadsSocialClient` / THR-09); social write loop Closed on FE.

## Gap

Audit **F1** Medium — **CLOSED** (P6).

## AC / DoD

- [x] (P0) As-is: react + attach_ref Closed (not Open → Unavailable until THR-09)
- [x] (P0) Contracts: no «Still Open: react + attach-ref»; cite Closed paths / THR-09
- [x] (P0) Write-gate text: react/attach Closed when verified
- [x] (P0) Cite `ThreadsSocialClient.js` / THR-09 · no invent paths
- [x] (P0) No product `src/**` · pkg pointer unchanged · no git push

## Where changed

- `spa-app/docs/architecture/threads-feed-ux/02-clients-and-write-gates.md`

## Out of scope

F2 UI vitest (WAIVED `info-nonblocking`) · reopen T01–T07 product · immutable pkg rewrite · multipart · invent catalog ids

## Verification

```bash
rg -n 'react|attach_ref|Closed|Open → Unavailable|THR-09' spa-app/docs/architecture/threads-feed-ux/02-clients-and-write-gates.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
