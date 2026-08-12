# SPA-PH-06-T01 — Env GPT URL helper

**Status:** Done — P3 2026-08-05T10:31:01Z  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) FR-PH-06.1 · FR-PH-06.6  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z  
**Package:** `pkg-000051`

## Purpose
Introduce shared `getStoryGptUrl()` / `openStoryGpt()` (or equivalent) reading `import.meta.env.VITE_STORY_GPT_URL`. Empty env → calm fail (no crash; **no** hardcoded production GPT fallback). Optional: adopt helper in `StorySubmitPage` for parity.

## Risk
Silent fallback to hardcoded ChatGPT URL; inventing new API; breaking StorySubmitPage empty-state `#` behavior without documenting.

## Code Facts (re-verify at execute)
- No shared helper today — inline trim of `VITE_STORY_GPT_URL` in [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx):8, [`HowItWorksPage.jsx`](../../../../../../../src/pages/HowItWorksPage.jsx):6, [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx):30.
- Env documented in [`spa-app/.env.example`](../../../../../../../.env.example).
- api-req §3.3 — FE env only; not HTTP.
- Login/Verify `chatgpt.com/mock-oauth-callback` are **out of scope** (not Submit CTA paths).

## AC / DoD
- [x] (P0) Helper reads `VITE_STORY_GPT_URL` → FR-PH-06.1.
- [x] (P0) Empty/missing env: calm failure; no hardcoded `chatgpt.com/g/…` fallback → FR-PH-06.6; backlog AC #1/#5.
- [x] (P1) StorySubmitPage may call helper (parity) without changing compose/submit API.

## Where to change
- New util e.g. `spa-app/src/config/storyGptUrl.js` (or `src/lib/…`) — name at execute
- Optionally `spa-app/src/pages/StorySubmitPage.jsx`
- `spa-app/.env.example` (docs only if needed)

## Out of scope
Wiring Header/HowItWorks/Board (T02–T04). Icons (T05). In-app compose. Gateway.

## Verification
```bash
rg -n "getStoryGptUrl|openStoryGpt|VITE_STORY_GPT_URL" spa-app/src
cd spa-app && npm test -- --run storyGpt
```
