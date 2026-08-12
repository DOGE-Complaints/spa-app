# SPA-PH-06-T02 — Wire PH-01 nav Submit

**Status:** Done — P3 2026-08-05T10:31:01Z  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) FR-PH-06.2 · FR-PH-06.4 · FR-PH-06.5  
**Depends on:** T01  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z  
**Package:** `pkg-000051`

**UI gate (Path A):**
- `@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md`
- `@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec-estonia.png`

## Purpose
Header «Submit a story» uses T01 helper: external open, clear affordance, accessible name for GPT handoff. Label stays `publicHome.nav.submitStory`.

## Risk
Losing `data-testid="public-nav-submit"`; opening in-app route; omitting `rel`/`target` when URL present.

## Code Facts (re-verify at execute)
- [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx):69–78 — `<a href={STORY_GPT_URL || '#'}>` already env-backed; **not** shared helper; no a11y GPT handoff label yet.
- Tests: [`Header.publicNav.test.jsx`](../../../../../../../src/components/AppShell/__tests__/Header.publicNav.test.jsx).

## AC / DoD
- [x] (P0) Nav Submit uses helper / env URL → FR-PH-06.2; backlog AC #1.
- [x] (P0) External open + affordance → FR-PH-06.4.
- [x] (P0) Accessible name communicates external DOGEstonia GPT handoff → FR-PH-06.5; AC #3.
- [x] (P0) Empty env: calm (`#` or disabled pattern from T01) — no hardcoded GPT.

## Where to change
- `spa-app/src/components/AppShell/Header.jsx`
- Header public-nav tests

## Out of scope
Board hardcode (T04). HowItWorks CTA body (T03). Icon asset swap (T05 may add icon).

## Verification
```bash
cd spa-app && npm test -- --run Header.publicNav
rg -n "public-nav-submit|getStoryGptUrl|VITE_STORY_GPT" spa-app/src/components/AppShell/Header.jsx
```
