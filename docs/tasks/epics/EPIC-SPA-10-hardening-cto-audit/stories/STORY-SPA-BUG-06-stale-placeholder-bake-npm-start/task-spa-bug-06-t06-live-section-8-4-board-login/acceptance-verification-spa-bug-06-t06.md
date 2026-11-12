# Task acceptance — SPA-BUG-06-T06 Live §8.4 board/login

- **Task:** T06 · F1
- **Package:** `pkg-000071` **unchanged** · `run_mode=spa_bug_06_audit_2026_08_18`
- **Result:** BLOCKED · F1 still **OPEN**
- **Date:** 2026-08-18T10:33:43Z
- **Scaffolded:** 2026-08-18T10:30:56Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Stop if gateway `:8000` down — do not invent 200 | PASS (stop path) | `curl http://127.0.0.1:8000/tallinn/issues` connect fail · http_code **000** |
| `#/board` without `board-load-error` | OPEN | not captured — gateway down |
| Live issues **200** | OPEN | not invented |
| Login host ≠ `project.supabase.co` | OPEN | not probed |
| HL-02 / railway.toml intact | PASS | `FORBIDDEN_LOCALHOST` L7–14 · `buildCommand` L7 |
| No BUG-05/07/08 mix | PASS | this task docs only |

## BLOCKED facts (live `2026-08-18T10:33:43Z`)

| Fact | Value |
|------|-------|
| Gateway `:8000` | **down** · curl fail 7 · http_code 000 |
| Identity `:8100/me` | **401** (listener up) |
| Leftover `:4173` | `node` PID 61790 LISTEN `*:4173` — **not** spawned by this probe |
| `make dev` (gateway cwd) | last_exit_code **130** (stopped) |

F1 / FR-BUG-06.8e / backlog AC #9 remain open until operator starts gateway `:8000`, then intended local lane.

## Commands

```bash
curl -sS -o /dev/null -w '%{http_code}\n' --connect-timeout 3 http://127.0.0.1:8000/tallinn/issues
curl -sS -o /dev/null -w '%{http_code}\n' --connect-timeout 3 http://127.0.0.1:8100/me
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
```
