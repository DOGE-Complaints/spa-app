# SPA-PH-06-T04 — Replace Board hardcoded GPT URL

**Status:** Done — P3 2026-08-05T10:31:01Z  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) FR-PH-06.3 · AC board  
**Depends on:** T01  
**ui_scope:** `visual`  
**ui_anchor:** false · extends T02  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z  
**Package:** `pkg-000051`

**UI gate:** Board Submit entry — reuse M129 Submit semantics; no new artboard required.  
- `@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md` (Submit affordance)

## Purpose
Remove Board legacy hardcoded ChatGPT GPT id URL; wire Submit via T01 helper. Replace label `createIssue` with `publicHome.nav.submitStory` (FR-PH-06.L10N).

## Risk
Leaving `g-RkVU9xLWN` elsewhere in Board tree; keeping `createIssue` marketing label.

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx):273–280 — `href="https://chatgpt.com/g/g-RkVU9xLWN-dogestonia"` + `{t('createIssue')}`.
- Primary FE gap for FR-PH-06.3 / backlog AC #2.

## AC / DoD
- [x] (P0) Board Submit path uses env helper — hardcoded URL **gone** → FR-PH-06.3; AC #1/#2.
- [x] (P0) Label uses `publicHome.nav.submitStory` (not `createIssue`) → FR-PH-06.L10N.
- [x] (P0) External open + calm empty-env behavior consistent with T01/T02.
- [x] (P0) No in-app compose implied → AC #5.

## Where to change
- `spa-app/src/pages/BoardPage.jsx`
- Related Board tests if present

## Out of scope
Filter/feed layout (PH-04 Done). Nav/HowItWorks (T02/T03).

## Verification
```bash
rg -n "g-RkVU9xLWN|chatgpt.com/g/" spa-app/src/pages/BoardPage.jsx
cd spa-app && npm test -- --run Board
```
