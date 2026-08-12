# SPA-PH-06-T06 — Vitest: env used; no hardcoded Submit URL

**Status:** Done — P3 2026-08-05T10:31:01Z  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) FR-PH-06.3 · AC #1/#2  
**Depends on:** T01–T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z  
**Package:** `pkg-000051`

## Purpose
Automated checks: Submit surfaces use env/helper; product Submit paths must not contain `g-RkVU9xLWN` / hardcoded production GPT URL. Empty env calm behavior covered where practical.

## Risk
Over-broad ban of all `chatgpt.com` strings (oauth mocks in Login/Verify are out of scope).

## Code Facts (re-verify at execute)
- HowItWorks test already asserts no `g-RkVU9xLWN` in page source — extend pattern to Board/Header/helper.
- Scope grep: Header, HowItWorks, BoardPage, storyGpt helper — **not** LoginPage/VerifyPage mock-oauth.

## AC / DoD
- [x] (P0) Vitest (or source assertion) proves helper/env used on Submit paths → AC #1.
- [x] (P0) No `g-RkVU9xLWN` in Board/Header/HowItWorks Submit product code → AC #2 · FR-PH-06.3.
- [x] (P1) Empty-env calm case for helper unit-tested.

## Where to change
- `spa-app/src/**/__tests__/` (helper + Header/Board/HowItWorks as needed)

## Out of scope
Puppeteer full UI pack (optional). OAuth mock URLs.

## Verification
```bash
cd spa-app && npm test -- --run storyGpt Header.publicNav HowItWorks Board
rg -n "g-RkVU9xLWN" spa-app/src/pages/BoardPage.jsx spa-app/src/components/AppShell/Header.jsx spa-app/src/pages/HowItWorksPage.jsx
```
