# Acceptance verification — SPA-THR-07-T08 (F1)

- **Date:** 2026-09-24T07:44:04Z
- **Package:** `pkg-000083` **unchanged**
- **Wave:** `spa_thr_07_audit_2026_09_24`
- **Result:** **PASS**
- **ui_scope:** none

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| EPIC header THR-07 Done not scaffolded | PASS | `EPIC-SPA-14-threads-feed-ux.md` L3 |
| Wave-order P3 Done not P1.3 active | PASS | same file §Порядок волн |
| INDEX footnote pipeline Done | PASS | `threads-feed/INDEX.md` L42 |
| No product src / pkg unchanged | PASS | pointer still `pkg-000083` · `--verify` ok 7 |

## Commands

```bash
rg -n 'scaffold|P1\.3 active' spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/EPIC-SPA-14-threads-feed-ux.md spa-app/docs/tasks/backlog-stories/threads-feed/INDEX.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```
