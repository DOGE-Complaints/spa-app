# SPA-PH-02-T08 — Story gate PH-02

**Status:** Done — P3 2026-08-04T09:57:03Z  
**Story:** [`../STORY-SPA-PH-02-account-logout-chrome.md`](../STORY-SPA-PH-02-account-logout-chrome.md)  
**Decision Ref:** backlog Acceptance Criteria (all)  
**Depends on:** T01–T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z

## Purpose
Story acceptance gate: verify all backlog AC + UI pipeline §UI (anchor T01) before Story Done. Template pattern: [story-acceptance-gate-template.md](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md).

## Risk
Declaring Done without live verify / screenshots pack.

## Code Facts (re-verify at execute)
- Package: `pkg-000046-…-ph-02-account-logout-chrome.yaml` (immutable).
- Gate file: [`acceptance-verification-spa-ph-02.md`](./acceptance-verification-spa-ph-02.md).

## AC / DoD
- [ ] (P0) All backlog AC checked with evidence paths.
- [ ] (P0) UI §: story-root screenshots README + live happy if ui_gate requires (spa UI pipeline).
- [ ] (P0) Gate `Date:` from `--print-utc-now` after live verify; Result PASS|FAIL.

## Where to change
- Fill `acceptance-verification-spa-ph-02.md` at P3 close
- Sync bullrun / backlog Status Done

## Out of scope
Implementing AccountControl (T01–T07); new FR.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run AccountControl publicHome
```

Gate: [`acceptance-verification-spa-ph-02.md`](./acceptance-verification-spa-ph-02.md)
