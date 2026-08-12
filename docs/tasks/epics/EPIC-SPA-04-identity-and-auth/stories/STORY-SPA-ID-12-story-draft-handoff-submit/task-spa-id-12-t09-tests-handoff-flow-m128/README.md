# SPA-ID-12-T09 — tests handoff flow + puppeteer M128

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T01–T08  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Vitest coverage: preview 200, expired 404, no-session 401→redirect, submit 202, verify interpose 403→auto-resubmit, service-down 503, empty no draft_id. Add `test:ui:story-handoff-m128` puppeteer script capturing M128 states to anchor `ui-baseline/post-implement/`.

## Risk
Missing auto-resubmit test leaves AC #3 unverified. Puppeteer without Chrome fails UI gate.

## Code Facts (re-verify at execute)
- [`StoryComposePage.test.jsx`](../../../../../../../src/pages/__tests__/StoryComposePage.test.jsx) — legacy compose tests to replace.
- ID-08 reference: `test:ui:gpt-bridge-m120` in package.json + puppeteer script.

## AC / DoD
- [ ] (P0) Vitest: GET 200 preview, 404 expired, 401 redirect, submit 202, 403→verify→resubmit, 503 retry, E0 empty.
- [ ] (P0) `npm run test:ui:story-handoff-m128` saves 9 state PNGs 1536×1024 to T08 ui-baseline.
- [ ] (P1) `npm run test:run` green; no browser `POST /story-drafts` calls in tests.

## Where to change
- `../../../../../../../src/pages/__tests__/StorySubmitPage.test.jsx`
- `../../../../../../../src/services/__tests__/storyDraftService.handoff.test.js`
- New: `spa-app/tests/puppeteer/story-handoff-m128-screenshot.mjs`
- [`package.json`](../../../../../../../package.json) — script entry

## Out of scope
Story gate evidence (T10).

## Verification
```bash
cd spa-app && npm run test:run
cd spa-app && npm run test:ui:story-handoff-m128
```
