# SPA-ID-14-T09 — Desktop CTA horizontal M135 (F2)

**Status:** Done — P6 PASS 2026-08-07T20:28:21Z · F2  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** [audit-STORY-SPA-ID-14-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-ID-14-execution-2026-08-07.md) §F2 · M135 preferred horizontal CTA group  
**Depends on:** SPA-ID-14-T07  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T20:22:51Z  
**Package:** `pkg-000055` (unchanged) · `run_mode=spa_id_14_audit_2026_08_07`

@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png

## Purpose
На desktop привести Primary + Secondary success CTAs к **preferred horizontal** group (M135 preferred-delta Low); narrow (~390) остаётся вертикальный stack; tertiary Submit Another остаётся quiet / full-width below.

## Risk
Оставить stacked `fullWidth` на широком viewport → visual residual F2 vs artboard preference (AC FR не требуют pixel-horizontal, но quality-first P5 TASKED).

## Code Facts (closed)
- Desktop: `.story-handoff__cta-row` → row at `min-width: 640px` · [`StoryHandoff.css`](../../../../../../../src/components/StoryHandoff/StoryHandoff.css).
- Narrow: column stack on `.story-handoff__cta-row`.
- Markup: [`StoryHandoffPanels.jsx`](../../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) · `data-testid="story-handoff-cta-row"`.
- Destinations `/board`, `/profile`, GPT unchanged · vitest 13/13.

## AC / DoD
- [x] (P0) Desktop (≥~768 or story convention): Primary Go To Board + Secondary My Stories in one horizontal row (or equivalent preferred group per M135) → F2.
- [x] (P0) Narrow: CTAs remain stacked; no horizontal overflow; touch targets ≥44px preserved.
- [x] (P0) Tertiary GPT + hint remain below; hierarchy Primary > Secondary > Tertiary unchanged.
- [x] (P0) No change to submit success wiring / auto-navigate rules; no F1 doc work in this task.

## Where to change
- `spa-app/src/components/StoryHandoff/StoryHandoff.css` (+ panel markup only if needed)
- This task `acceptance-verification-spa-id-14-t09.md`
- Optional: refresh mock F desktop PNG under story screenshots (P6 if DOM changes)

## Out of scope
As-of-Done backlog rewrite (T08 / F1); State E dual spinner (F3 WAIVED); profile `submittedStoryId`; regenerate M128.

## Verification
```bash
rg -n "actions--stack|story-handoff-go-board|fullWidth" spa-app/src/components/StoryHandoff/
cd spa-app && npx vitest run src/pages/__tests__/StorySubmitPage.test.jsx --reporter=dot
```
