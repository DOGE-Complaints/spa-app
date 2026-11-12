# Task acceptance gate — SPA-BUG-08-T06 (F1)

- **Story:** STORY-SPA-BUG-08-vite-public-env-normalize-seam
- **Package:** `pkg-000073-20260818-epic-spa-10-bug-08-public-env-normalize.yaml` **unchanged**
- **Result:** PASS
- **Date:** 2026-08-18T11:22:22Z
- **Wave:** `spa_bug_08_audit_2026_08_18`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Backlog Meta Surface / Repro / Env → As-of-Done current + Historical pre-T03 | PASS | [`STORY-SPA-BUG-08-….md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) L16–18 |
| Doc-only; HL-04 fallback not moved into `publicEnv`; no BUG-05/06/07 mix; `start` unchanged | PASS | [`publicEnv.js`](../../../../../../../src/config/publicEnv.js) L10/L20/L30 · fallback still [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L8–10 · no product edit this task |
| Do not rewrite `pkg-000073`; Gate Date from `--print-utc-now` | PASS | pkg immutable · Date this file |

## Commands (live verification 2026-08-18T11:22:22Z)

```bash
rg -n 'Surface|Repro|Env|publicEnv.js|Historical|As-of-Done' spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md
test -f spa-app/src/config/publicEnv.js && echo 'publicEnv.js exists'
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
