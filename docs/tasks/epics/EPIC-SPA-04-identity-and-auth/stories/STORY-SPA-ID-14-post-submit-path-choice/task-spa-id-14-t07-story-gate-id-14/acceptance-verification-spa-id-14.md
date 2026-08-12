# Acceptance verification — STORY-SPA-ID-14 (story gate)

- **Story:** Post-submit path choice (M135 State F)
- **Result:** PASS
- **Date:** 2026-08-07T19:56:17Z
- **Package:** `pkg-000055`

> Template: `docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md`

## Backlog AC / FR

| AC / FR | Status | Evidence |
|---------|--------|----------|
| FR-ID-14.1 State F after 202 | PASS | T02 · live `01-happy-live-submit-state-f-m135` |
| FR-ID-14.2 No auto-navigate | PASS | T01 pin + T02 wire · vitest |
| FR-ID-14.3 Path choice CTAs | PASS | T05 · Board/My Stories/GPT |
| FR-ID-14.4 Draft cleared / calm success | PASS | T02/T05 |
| FR-ID-14.5 No empty success flash | PASS | T02 invalid id → SERVICE_DOWN |
| FR-ID-14.6 Vitest live path | PASS | T06 13/13 |
| FR-ID-14.7 Icons wired | PASS | T03 |
| FR-ID-14.L10N gap keys | PASS | T04 |
| AC screenshots desktop+narrow vs M135 | PASS | [`../screenshots/`](../screenshots/) · §UI below |
| AC BUG-01 / ID-12 remain Done | PASS | backlog Meta unchanged Done |

## UI (story-gate)

Canonical evidence = **story-root** `screenshots/full-cycle/` (not only task `ui-baseline/`).

| Item | Path |
|------|------|
| Indexer | [`../screenshots/README.md`](../screenshots/README.md) |
| Live happy | [`../screenshots/full-cycle/01-happy-live-submit-state-f-m135-1536x1024.png`](../screenshots/full-cycle/01-happy-live-submit-state-f-m135-1536x1024.png) |
| Mock F + narrow | `02-…`, `03-…` under `full-cycle/` |
| Anchor mockup | [`../task-spa-id-14-t05-panel-parity-m135/ui-mockup-spec.md`](../task-spa-id-14-t05-panel-parity-m135/ui-mockup-spec.md) |
| Anchor post-implement | [`../task-spa-id-14-t05-panel-parity-m135/ui-baseline/post-implement/`](../task-spa-id-14-t05-panel-parity-m135/ui-baseline/post-implement/) |

## Commands

```bash
cd spa-app && npx vitest run src/pages/__tests__/StorySubmitPage.test.jsx --reporter=dot
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:story-submit-m135-full
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
ls spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/screenshots/full-cycle/01-happy-live-submit-state-f-m135-1536x1024.png
```
