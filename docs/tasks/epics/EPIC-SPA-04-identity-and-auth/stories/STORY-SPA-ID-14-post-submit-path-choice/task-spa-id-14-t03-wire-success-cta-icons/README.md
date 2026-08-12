# SPA-ID-14-T03 — Wire success CTA leading/trailing icons

**Status:** Done — P3 execute 2026-08-07T19:56:17Z  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** FR-ID-14.7 · AC icons · backlog §Иконки  
**Depends on:** SPA-ID-14-T02  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T19:36:12Z  
**Package:** `pkg-000055`

## Purpose
Wire ON DISK CTA leading icons (`ic-go-to-board`, `ic-my-stories`) + trailing external (`ic-external-link`); copy control a11y-labeled (keys may land in T04).

## Risk
State F без leading icons = visual gap vs M135.

## Code Facts (re-verify at execute)
- Disk: `public/icons/story-handoff/ic-go-to-board.png`, `ic-my-stories.png`; `public/icons/public-home/ic-external-link.png`.
- [`StoryHandoffSuccessPanel`](../../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) — wire img src / aria.
- Catalog conventions: [STORY-SPA-ID-12-icon-assets.md](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md).

## AC / DoD
- [x] (P0) Leading icons wired at fixed runtime URLs for Board + My Stories → FR-ID-14.7 · AC #5.
- [x] (P0) Tertiary trailing external reuses `/icons/public-home/ic-external-link.png`.
- [x] (P0) Copy control a11y-labeled (key or interim label until T04).
- [x] (P0) Do **not** regenerate M128 / folk border assets.

## Where to change
- `spa-app/src/components/StoryHandoff/StoryHandoffPanels.jsx` (+ CSS if needed)
- This task acceptance

## Out of scope
Generate new Lucide PNGs (already ON DISK); L10N gap keys (T04); panel layout parity (T05).

## Verification
```bash
ls spa-app/public/icons/story-handoff/ic-go-to-board.png spa-app/public/icons/story-handoff/ic-my-stories.png
rg -n "ic-go-to-board|ic-my-stories|ic-external-link|story-handoff-success" spa-app/src/components/StoryHandoff/
```
