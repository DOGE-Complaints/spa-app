# Story acceptance gate — STORY-SPA-THR-07-threads-client-knobs-tree-wire

- **Story:** Threads client + knobs + tree wire
- **Package:** `pkg-000083-20260924-epic-spa-14-thr-07-threads-client-knobs-tree-wire.yaml`
- **Result:** **PASS**
- **Date:** `2026-09-24T07:37:03Z`
- **ui_scope:** none · console clean (NOT p3Ux · no screenshots)

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| `.env.example` documents `VITE_THREADS_BASE_URL` (local `http://127.0.0.1:8001`) | PASS | `spa-app/.env.example` · `publicEnv.js` `getThreadsBaseUrl` / `assertThreadsBaseUrl` |
| Client uses **only** Closed paths from OpenAPI (not superseded `/threads/by-issue`) | PASS | `ThreadsSocialClient.js` `CLOSED_SOCIAL_PATHS` · vitest asserts URLs |
| Knobs loaded/cached before tree drives `maxDepth` | PASS | `threadsKnobsCache.js` · `LiveIssueThreadMount.jsx` order knobs→tree |
| Empty tree → `empty`; ≥1 comment → `populated`; error → `unavailable` + retry | PASS | `mapThreadTreeToBlock.js` · mount `onRetry` |
| Demo comments not used as prod default on board/issue mounts | PASS | `IssueThreadBlock` defaults `comments=[]` · pages use `LiveIssueThreadMount` |
| Gateway Issues path regression covered | PASS | vitest fail-soft Issues → `/node/issues` |
| Subtasks T01–T07 Done or waived with cite | PASS | T01–T07 README Status Done |

## Commands (live verification 2026-09-24T07:37:03Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run
```

- `--verify`: **ok 7 paths** · pkg-000083  
- `--verify --check-dates`: **ok date-check**  
- Vitest: **625** passed / 2 skipped  

## Guards

- No invent production social URLs · no `/threads/by-issue` fetch  
- Do not start THR-08/09 this packet · do not mix BUG/SSR · no git push · **STOP before P4** (OP → Validator)
