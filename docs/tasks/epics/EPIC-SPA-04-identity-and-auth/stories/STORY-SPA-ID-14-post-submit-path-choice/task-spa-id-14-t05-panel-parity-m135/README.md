# SPA-ID-14-T05 — Panel parity M135 (ui_anchor)

**Status:** Done — P3 execute 2026-08-07T19:56:17Z  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** FR-ID-14.3 · FR-ID-14.4 · AC CTAs/hint · D14-6 M135  
**Depends on:** SPA-ID-14-T02 · SPA-ID-14-T03 · SPA-ID-14-T04  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T19:36:12Z  
**Package:** `pkg-000055`

@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png

## Purpose
Довести `StoryHandoffSuccessPanel` до parity M135: CTA hierarchy (Primary Board · Secondary My Stories · Tertiary GPT), GPT hint, no-auto-redirect chrome; destinations `/board`, `/profile`, `VITE_STORY_GPT_URL`.

## Risk
Behavior wired but UI hierarchy/hint wrong → gate fails visual Path A.

## Code Facts (re-verify at execute)
- [`StoryHandoffPanels.jsx`](../../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) + CSS.
- M135 state sheet SSOT (paths above).
- Destinations: Board `/board` · My Stories `/profile` · Submit Another `VITE_STORY_GPT_URL`.

## AC / DoD
- [x] (P0) Three CTAs work with correct destinations → FR-ID-14.3 · AC #3.
- [x] (P0) Tertiary GPT hint / external affordance per M135 → AC #3.
- [x] (P0) No-auto-redirect chrome uses L10N key (T04) → FR-ID-14.2 · M135 §14.
- [x] (P0) Calm one-shot success layout vs M135 (no invent new states).
- [x] (P0) P3 Path A: follow `@mockup` M135; brief skip.

## Where to change
- `spa-app/src/components/StoryHandoff/StoryHandoffPanels.jsx` (+ CSS)
- Possibly `StorySubmitPage.jsx` CTA handlers only if not already correct
- This task acceptance

## Out of scope
Vitest (T06); story gate screenshots (T07); profile consume `submittedStoryId`.

## Verification
```bash
rg -n "go-board|my-stories|submit-another|VITE_STORY_GPT|noAutoRedirect|submitAnotherHint" spa-app/src/components/StoryHandoff/
```
