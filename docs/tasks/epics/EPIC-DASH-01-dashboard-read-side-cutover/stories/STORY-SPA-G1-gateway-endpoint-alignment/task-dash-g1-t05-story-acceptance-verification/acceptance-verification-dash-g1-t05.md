# Acceptance verification — DASH-G1-T05 (STORY-SPA-G1 gate)

**Story:** STORY-SPA-G1-gateway-endpoint-alignment  
**Task:** task-dash-g1-t05-story-acceptance-verification  
**Status:** Done (2026-06-12)

## Story AC checklist

- [x] AC #1: `GatewayIssueRepository` → `/tallinn/issues` + `/tallinn/issues/{id}` relative to `VITE_GATEWAY_BASE_URL` — `GatewayIssueRepository.js:51,59`
- [x] AC #2: Unit tests pass with new path — `GatewayIssueRepository.test.js:29,44`; 4/4 repo tests green
- [x] AC #3: Documentation touchpoints updated; G1 pending notes removed — t04 artifacts
- [x] AC #4: `npm test` in spa-app — green (71 passed)

## Commands run

```bash
cd spa-app && npm run test:run
# Test Files  15 passed (15)
# Tests  71 passed (71)

python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# ok 5 paths (pkg-000001)
```

## Evidence

| Area | Path / result |
|------|----------------|
| Repository paths | `spa-app/src/repositories/GatewayIssueRepository.js` |
| Tests | `spa-app/src/repositories/__tests__/GatewayIssueRepository.test.js` |
| Env contract | t03 acceptance-verification-dash-g1-t03.md |
| Docs | t04 touchpoints + backlog INDEX G1 Done |
| Pipeline story AC | all `[x]` |
| Backlog story | Status Done (pkg-000001) |

## Nested tasks

| Task | Status |
|------|--------|
| DASH-G1-T01 | Done |
| DASH-G1-T02 | Done |
| DASH-G1-T03 | Done |
| DASH-G1-T04 | Done |
| DASH-G1-T05 | Done |
