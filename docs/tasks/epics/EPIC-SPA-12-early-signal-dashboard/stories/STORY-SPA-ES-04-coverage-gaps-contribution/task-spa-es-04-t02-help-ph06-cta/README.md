# SPA-ES-04-T02 — Help + PH-06 VITE_STORY_GPT_URL CTA

**Status:** Done  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) · FR-ES-04.3 · FR-ES-04.5  
**Depends on:** T01 ui_anchor; ES-01 slot `early-signal-slot-help`; PH-06 helper  
**ui_scope:** `visual`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md`](../task-spa-es-04-t01-whats-missing-abstract/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:54:44Z · **P3:** 2026-08-17T12:02:25Z  
**Package:** `pkg-000069`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
```

## Purpose
Help Complete CTA in `early-signal-slot-help` using existing PH-06 [`getStoryGptUrl`](../../../../../../../src/config/storyGptUrl.js) / `VITE_STORY_GPT_URL`. No new GPT URL hardcode. No Offers (AC-SPA-ES-06).

## Risk
Hardcoding ChatGPT GPT-id; inventing coverage API; Offers; `/dashboard`; mixing ES-05.

## Code Facts (re-verify at execute)
- Slot titled only: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L11 `early-signal-slot-help` — **no** `HelpCompleteBlock` child.
- Helper exists: [`storyGptUrl.js`](../../../../../../../src/config/storyGptUrl.js) L9 `getStoryGptUrl` · L17 `getStoryGptHref` (`#` when unset).
- L10N title exists: `earlySignal.help.title`; `help.message` / `help.submit` / `help.submitAccessible` **not** in dictionary yet.
- API: [api-req §4.1](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) env GPT — no new gateway path.

## AC / DoD
- [x] (P0) FR-ES-04.3 Help Complete: CTA = existing PH-06 Submit → GPT external; optional `ic-external-link` / lock reuse.
- [x] (P0) FR-ES-04.5 No Offers (AC-SPA-ES-06).
- [x] (P0) No invented gateway path; no Voices; no `/dashboard` change
- [x] (P1) Align with mockup M139 ESD-C-cta

## Where to change
- New `HelpCompleteBlock.jsx` mounted in `early-signal-slot-help`
- Reuse [`storyGptUrl.js`](../../../../../../../src/config/storyGptUrl.js) — do not duplicate env read

## Out of scope
Coverage % (T01). Picture Forming viz (T03). New GPT URL constant. Product code this P1.

## Verification
```bash
rg -n 'getStoryGptUrl|VITE_STORY_GPT_URL|HelpCompleteBlock|early-signal-slot-help' spa-app/src
```
