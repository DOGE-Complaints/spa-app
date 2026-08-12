# SPA-ID-14-T07 — Story gate ID-14

**Status:** Done — P3 execute 2026-08-07T19:56:17Z  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** backlog §Acceptance Criteria · all FR-ID-14.*  
**Depends on:** SPA-ID-14-T01 … T06  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T19:36:12Z  
**Package:** `pkg-000055`

@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png

## Purpose
Закрыть story AC: заполнить acceptance-verification по gate template; desktop + narrow screenshots vs **M135**; Status → Done; BUG-01 / ID-12 remain Done.

## Risk
Partial Done без viewport proof vs M135.

## Code Facts (re-verify at execute)
- Gate template: [`docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)
- Gate file: [`acceptance-verification-spa-id-14.md`](./acceptance-verification-spa-id-14.md)
- Screenshots dir: [`../screenshots/`](../screenshots/)
- Artifact dates: `--print-utc-now` before Gate Date; `--verify --check-dates` before Done

## AC / DoD
- [x] (P0) All story AC PASS with evidence from T01–T06.
- [x] (P0) Desktop + narrow screenshots vs **M135** Path A → AC #7.
- [x] (P0) BUG-01 / ID-12 remain Done → AC #8.
- [x] (P0) Fill gate; Story Status → Done; Gate Date from `--print-utc-now`.
- [x] (P0) `npm test` (scoped) + board-shell smoke green as applicable.

## Where to change
- This gate + `acceptance-verification-spa-id-14.md`
- `../screenshots/`
- Story/backlog Meta Status at close

## Out of scope
Profile consume; reopen BUG-01; regenerate M128.

## Verification
```bash
cd /Users/eslinko/Development/DOGEstonia
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --print-utc-now
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
ls spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/screenshots/
```

Gate: [`acceptance-verification-spa-id-14.md`](./acceptance-verification-spa-id-14.md)
