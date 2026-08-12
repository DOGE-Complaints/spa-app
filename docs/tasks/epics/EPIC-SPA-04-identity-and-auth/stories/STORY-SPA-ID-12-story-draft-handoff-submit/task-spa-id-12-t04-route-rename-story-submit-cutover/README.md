# SPA-ID-12-T04 — route rename /story/submit + cutover redirect

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Rename route `/story/compose` → `/story/submit` in `App.jsx`; update `PROTECTED_PREFIXES`; add temporary redirect `/story/compose` → `/story/submit` for GPT cutover (R1). Wire «create story» CTAs to `VITE_STORY_GPT_URL` (board/shell/empty-state seams).

## Risk
Missing cutover redirect breaks GPT inbound until GPT-SUBMIT-01 updates (R1 HIGH). Stale `/story/compose` links strand users.

## Code Facts (re-verify at execute)
- [`App.jsx`](../../../../../../../src/App.jsx):24 — `Route path="/story/compose"`.
- [`sessionRoutePolicy.js`](../../../../../../../src/router/sessionRoutePolicy.js):3 — `PROTECTED_PREFIXES` includes `/story/compose`, not `/story/submit`.
- grep `story/compose` in [`spa-app/src/`](../../../../../../../src/) — App, sessionRoutePolicy, tests.

## AC / DoD
- [ ] (P0) Primary route `/story/submit` registered; `PROTECTED_PREFIXES` updated (AC #7, Scope G).
- [ ] (P0) Temporary redirect `/story/compose` → `/story/submit` (Scope G, R1).
- [ ] (P0) «Create story» links use `VITE_STORY_GPT_URL` where applicable (AC #6, Scope F).
- [ ] (P1) Router/policy tests updated.

## Where to change
- [`App.jsx`](../../../../../../../src/App.jsx)
- [`sessionRoutePolicy.js`](../../../../../../../src/router/sessionRoutePolicy.js)
- [`router/__tests__/sessionRoutePolicy.test.js`](../../../../../../../src/router/__tests__/sessionRoutePolicy.test.js)
- Shell/board links (grep `compose|STORY_GPT`)

## Out of scope
StorySubmitPage component rename (T06). GPT redirect coordination (cross-system).

## Verification
```bash
cd spa-app && npm run test:run -- src/router/__tests__/sessionRoutePolicy.test.js
```
