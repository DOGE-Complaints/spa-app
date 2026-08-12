# SPA-ID-13-T06 — Story gate ID-13

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** backlog §Acceptance Criteria; FR-ID13.1–7  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T19:28:37Z

## Purpose
Закрыть story AC: live `npm test`/`test:run` + `test:ui:board-shell`; заполнить acceptance-verification по gate template; Status → Done без необоснованных правок runtime policy/repository.

## Risk
Частичный Done (unit без smoke/docs) оставит M-5 spa-половину открытой в bullrun.

## Code Facts (re-verify at execute)
- Gate template: [`docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)
- Gate file: [`acceptance-verification.md`](./acceptance-verification.md)
- Story AC verbatim in pipeline story §Acceptance Criteria
- Artifact dates: `--print-utc-now` before Gate Date; `--verify --check-dates` before Done

## AC / DoD
- [ ] (P0) All story AC (FR-ID13.1–6 + suite green + FR-ID13.7) PASS with evidence from T01–T05.
- [ ] (P0) `cd spa-app && npm test` (or `test:run`) green; `npm run test:ui:board-shell` green.
- [ ] (P0) No unjustified edits to `sessionRoutePolicy.js` / `GatewayIssueRepository.js` without fail-first.
- [ ] (P0) Fill [`acceptance-verification.md`](./acceptance-verification.md); Story Status → Done; Gate Date from `--print-utc-now`.

## Where to change
- This gate file + `acceptance-verification.md`; story/backlog Meta Status at close
- Docs via T05

## Out of scope
- Gateway GW-PUBLIC-01; mandatory `verify:railway:live`; public-home UX.

## Verification
```bash
cd /Users/eslinko/Development/DOGEstonia
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --print-utc-now
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test && npm run test:ui:board-shell
```

Gate: [`acceptance-verification.md`](./acceptance-verification.md)
