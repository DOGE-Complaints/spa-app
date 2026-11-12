# SPA-ES-04-T01 — What's Missing abstract categories

**Status:** Done  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) · FR-ES-04.1 / optional FR-ES-04.2  
**Depends on:** ES-01 discovery slot `early-signal-slot-missing`; [ADMIN-ESD-06 ADR](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:54:44Z · **P3:** 2026-08-17T12:02:25Z  
**Package:** `pkg-000069`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
```

Path A spec: [`ui-mockup-spec.md`](./ui-mockup-spec.md)

## Purpose
What's Missing abstract/qualitative categories (Areas / Languages / Groups / Themes) in slot `early-signal-slot-missing`. **No** coverage % / gap score / «N more Stories» (FR-ES-04.1 · AC-SPA-ES-03). Optional Pulse keys as **labels only** (FR-ES-04.2).

## Risk
Inventing coverage HTTP/DTO; fabricating gap counts; Offers/Voices; `/dashboard`; reopening ES-02/03 AC; mixing ES-05.

## Code Facts (re-verify at execute)
- Slot titled only: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L10 `early-signal-slot-missing` — **no** `WhatsMissingBlock` child.
- Host: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L162 `showEmptyBoard` → L326 `<EarlySignalDiscovery />`.
- L10N title exists: [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js) `earlySignal.missing.title`; intro/areas/languages/groups/themes **not** in dictionary yet.
- Pulse/Emerging **wired** (do not reopen): Pulse child L43 · Emerging child L44.
- API: [api-req §4](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) — no coverage path.

## AC / DoD
- [x] (P0) FR-ES-04.1 What's Missing: qualitative categories (Areas / Languages / Groups / Themes) as framing — **no** coverage % / gap score / «N more Stories» (AC-SPA-ES-03).
- [x] (P0) FR-ES-04.2 Optional: if Pulse data available, reuse `areas`/`languages`/`topics` **keys as labels only** — never invent gap counts (api-req §4.2).
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P0) UI Path A: @mockup M139 md+png on this ui_anchor task

## Where to change
- New `WhatsMissingBlock.jsx` in `spa-app/src/components/earlySignal/` mounted in `early-signal-slot-missing`
- Related: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx), [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js)

## Out of scope
Coverage DTO / %. Help CTA (T02). Picture Forming viz (T03). ES-05. Product code this P1.

## Verification
```bash
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
rg -n 'WhatsMissingBlock|early-signal-slot-missing|coverage' spa-app/src || true
```
