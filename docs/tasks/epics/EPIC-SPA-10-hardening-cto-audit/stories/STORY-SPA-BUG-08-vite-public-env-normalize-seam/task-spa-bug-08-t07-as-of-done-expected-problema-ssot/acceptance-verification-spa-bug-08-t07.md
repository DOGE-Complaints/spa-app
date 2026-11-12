# Task acceptance gate — SPA-BUG-08-T07 (F2)

- **Story:** STORY-SPA-BUG-08-vite-public-env-normalize-seam
- **Package:** `pkg-000073-20260818-epic-spa-10-bug-08-public-env-normalize.yaml` **unchanged**
- **Result:** PASS
- **Date:** 2026-08-18T11:23:15Z
- **Wave:** `spa_bug_08_audit_2026_08_18`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Label Expected vs Actual **Historical** on pipeline + backlog | PASS | backlog L34–38 · pipeline L27–31 |
| Pipeline §Проблема inventory → Historical; As-of-Done current seam | PASS | pipeline L41–45 · backlog L61–65 |
| Symptom «Итог: нет единого reader» Historical / As-of-Done | PASS | backlog L32 · pipeline L25 |
| Doc-only; T01/T02 not reworked; HL-04 fallback not in `publicEnv` | PASS | T01 README still Historical/As-of-Done split · fallback resolver L8–10 |
| Do not rewrite `pkg-000073`; Gate Date from `--print-utc-now` | PASS | pkg immutable · Date this file |

## Commands (live verification 2026-08-18T11:23:15Z)

```bash
rg -n 'Expected vs Actual|Проблема|Historical|As-of-Done|Нет файла' spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-08-vite-public-env-normalize-seam/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md
test -f spa-app/src/config/publicEnv.js && echo 'publicEnv.js exists'
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
