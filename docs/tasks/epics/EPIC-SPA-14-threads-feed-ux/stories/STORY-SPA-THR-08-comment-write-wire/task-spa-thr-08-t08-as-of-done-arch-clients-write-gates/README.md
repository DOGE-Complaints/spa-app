# SPA-THR-08-T08 — Arch 02 clients/write-gates As-of-Done (F1)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** [audit-STORY-SPA-THR-08-execution-2026-09-24.md](../../../../../../analysis/audit-STORY-SPA-THR-08-execution-2026-09-24.md) §F1  
**Depends on:** SPA-THR-08-T07 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:02:02Z`  
**Completed:** `2026-09-24T08:03:23Z`  
**Package:** `pkg-000084` **unchanged** · wave `spa_thr_08_audit_2026_09_24`

## Purpose

Doc-only As-of-Done: update `02-clients-and-write-gates.md` As-is + Contracts — `comment_create`/`comment_reply` **Closed** (POST + Bearer · cite `ThreadsSocialClient` / THR-08); keep `react`/`attach_ref` **Open → Unavailable**.

## Gap

Audit **F1** Medium — **CLOSED** (P6).

## AC / DoD

- [x] (P0) As-is: social comment write Closed (not blanket Open → Unavailable)
- [x] (P0) Contracts: create/reply no longer «remain Open»; react/attach stay Open
- [x] (P0) Cite `ThreadsSocialClient.js` / THR-08 · no invent paths
- [x] (P0) No product `src/**` · pkg pointer unchanged · no git push

## Where changed

- `spa-app/docs/architecture/threads-feed-ux/02-clients-and-write-gates.md`

## Out of scope

F2 mount vitest (WAIVED `info-nonblocking`) · THR-09 · reopen T01–T07 product · immutable pkg rewrite

## Verification

```bash
rg -n 'comment_create|Closed|Open → Unavailable|THR-08' spa-app/docs/architecture/threads-feed-ux/02-clients-and-write-gates.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
