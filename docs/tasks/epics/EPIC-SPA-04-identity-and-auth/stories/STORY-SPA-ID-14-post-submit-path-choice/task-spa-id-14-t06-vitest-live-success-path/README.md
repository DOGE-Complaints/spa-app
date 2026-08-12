# SPA-ID-14-T06 — Vitest live success path

**Status:** Done — P3 execute 2026-08-07T19:56:17Z  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** FR-ID-14.6 · AC live success / no profile-state navigate  
**Depends on:** SPA-ID-14-T02 · SPA-ID-14-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T19:36:12Z  
**Package:** `pkg-000055`

## Purpose
Vitest: live success path (mock 202 → SUBMITTED + success panel **без** auto `navigate('/profile', { submittedStoryId })`); CTA destinations; not only `devPhase`.

## Risk
Regress to auto-profile navigate without CI catch.

## Code Facts (re-verify at execute)
- Existing StoryHandoff / StorySubmit tests under `src/**/__tests__/`.
- Live path previously skipped State F (T01 pin).

## AC / DoD
- [x] (P0) Test covers success after submit **without** relying only on `devPhase` → FR-ID-14.6.
- [x] (P0) Assert no default `navigate('/profile', { state: { submittedStoryId } })` on success.
- [x] (P0) CTA destinations covered (board / profile / GPT URL) at handler or panel level.
- [x] (P0) No secrets in evidence / test fixtures.

## Where to change
- `spa-app/src/pages/__tests__/` or StoryHandoff `__tests__/` (extend or add)
- This task acceptance

## Out of scope
Puppeteer screenshots (T07); gateway live submit.

## Verification
```bash
cd spa-app && npx vitest run src/pages src/components/StoryHandoff --reporter=dot
```
