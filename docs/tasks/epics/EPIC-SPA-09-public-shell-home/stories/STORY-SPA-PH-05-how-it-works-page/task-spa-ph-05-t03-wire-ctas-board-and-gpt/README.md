# SPA-PH-05-T03 — Wire CTAs /board + env GPT URL

**Status:** Done — P3 2026-08-04T13:22:05Z
**Story:** [`../STORY-SPA-PH-05-how-it-works-page.md`](../STORY-SPA-PH-05-how-it-works-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) FR-PH-05.3–05.5  
**Depends on:** T01…T02  
**extends ui-mockup:** [`../task-spa-ph-05-t02-four-step-layout/ui-mockup-spec.md`](../task-spa-ph-05-t02-four-step-layout/ui-mockup-spec.md)  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z  
**Package:** `pkg-000050`

## Purpose
CTA row: **Go to Dashboard** → internal `/board`; **Submit a story** → external `VITE_STORY_GPT_URL` (same pattern as Header). Step-2 `inlineAction` same as dashboard CTA. External handoff explicit in copy + a11y (`submitAccessibleLabel` / `externalHandoff`).

## Risk
Hardcoded ChatGPT URL; in-app compose route; soft-blocking on unfinished PH-06 helper.

## Code Facts (re-verify at execute)
- Header already: `const STORY_GPT_URL = String(import.meta.env.VITE_STORY_GPT_URL ?? '').trim()` ([`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx)).
- Env documented in `.env.example`; StorySubmitPage same pattern.
- PH-06 will later extract shared helper and rewire (FR-PH-06.2) — **not** a hard Depends for this task.
- Missing/empty env: calm failure (no crash; no silent production GPT hardcode) — align with Header / api-req §3.3 intent.

## AC / DoD
- [x] (P0) Dashboard CTA → `/board` (FR-PH-05.3 / FR-PH-05.4) → backlog AC #3.
- [x] (P0) Submit → env GPT URL external; handoff explicit (FR-PH-05.5) → AC #3.
- [x] (P0) Product names / routes untranslated: `DOGEstonia GPT`, `/board` (FR-PH-05.6).
- [x] (P0) No in-app story editor.

## Where to change
- `spa-app/src/pages/HowItWorksPage.jsx`
- Possibly small shared util only if extracted in this wave without stealing PH-06 scope

## Out of scope
PH-06 board hardcode removal; shared helper mandatory extraction; icons (T04).

## Verification
```bash
rg -n 'VITE_STORY_GPT_URL|/board|submitAccessibleLabel' spa-app/src/pages/HowItWorksPage.jsx spa-app/src/components/AppShell/Header.jsx
cd spa-app && npm test -- --run HowItWorks
```
