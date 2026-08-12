# SPA-PH-06-T03 — Wire PH-05 Submit CTAs

**Status:** Done — P3 2026-08-05T10:31:01Z  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) FR-PH-06.2 · FR-PH-06.L10N  
**Depends on:** T01; PH-05 Done  
**ui_scope:** `visual`  
**ui_anchor:** false · extends T02 / M133  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z  
**Package:** `pkg-000051`

**UI gate (Path A):**
- `@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md`
- `@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md`
- `@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-estonia.png`
- `extends ui-mockup:` T02 / story-root after T02 UI-1 if needed

## Purpose
HowItWorks final Submit CTA (and any step-4 submit affordance) uses T01 helper. Reuse `howItWorks.cta.submit*` / `externalHandoff` — no new marketing keys.

## Risk
Breaking Dashboard internal `/board` CTAs; inventing copy; dropping existing `submitAccessibleLabel`.

## Code Facts (re-verify at execute)
- [`HowItWorksPage.jsx`](../../../../../../../src/pages/HowItWorksPage.jsx):6 — inline `STORY_GPT_URL`; CTA already has `ariaLabel={t('howItWorks.cta.submitAccessibleLabel')}` and `externalHandoff`.
- Switch to shared helper; keep L10N keys owned by PH-05.

## AC / DoD
- [x] (P0) HowItWorks Submit uses helper → FR-PH-06.2; AC #1.
- [x] (P0) a11y / external handoff keys retained → FR-PH-06.5 · FR-PH-06.L10N; AC #3/#5.
- [x] (P0) No in-app compose implied.

## Where to change
- `spa-app/src/pages/HowItWorksPage.jsx`
- `spa-app/src/pages/__tests__/HowItWorksPage.test.jsx`

## Out of scope
Dashboard `/board` buttons. Nav (T02). Board legacy URL (T04).

## Verification
```bash
cd spa-app && npm test -- --run HowItWorks
rg -n "getStoryGptUrl|VITE_STORY_GPT|chatgpt.com/g/" spa-app/src/pages/HowItWorksPage.jsx
```
