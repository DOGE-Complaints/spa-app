# SPA-ES-03-T02 — Cards + empty/omit

**Status:** Done  
**Story:** [`../STORY-SPA-ES-03-emerging-signals-provisional.md`](../STORY-SPA-ES-03-emerging-signals-provisional.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md) · FR-ES-03.2/03.3/03.4/03.5 · FR-ES-03.L10N  
**Depends on:** T01 Emerging client; [ADMIN-ESD-06 ADR](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:30:36Z · **P3:** 2026-08-17T11:36:37Z  
**Package:** `pkg-000068`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
```

Path A spec: [`ui-mockup-spec.md`](./ui-mockup-spec.md)

## Purpose
Emerging UI ESD-E-empty vs ESD-E-cards (and weaken/disappear) in discovery slot `early-signal-slot-emerging`. Cards bind `label` / `axis` / `story_count` only. Density viz = CSS — not fake metrics.

## Risk
Issue cards / Issue ids as primary identity (AC-SPA-ES-02); fabricated provisional rows (AC-SPA-ES-08); «N Stories until Issue» (AC-SPA-ES-03); collapsing discovery to `board-empty`; Offers/Voices; `/dashboard`.

## Code Facts (As-of-Done P3 2026-08-17T11:36:37Z)
- [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L44 `<EmergingSignalsBlock />` in `early-signal-slot-emerging`.
- [`EmergingSignalsBlock.jsx`](../../../../../../../src/components/earlySignal/EmergingSignalsBlock.jsx) empty → `emerging-signals-empty`; cards → `emerging-signals` / `emerging-signal-card`.
- L10N: [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js) `earlySignal.emerging.*` (title/badge/helper/empty/storyCount/weaken).
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L326 `<EarlySignalDiscovery />` — `board-empty` **absent**.

## AC / DoD
- [x] (P0) FR-ES-03.2 Cards bind `label` / `axis` / `story_count` only; language = topic/label / provisional — **never** Issue cards or Issue ids as primary identity (AC-SPA-ES-02).
- [x] (P0) FR-ES-03.3 `signals: []` or fetch failure → ESD-E-empty / omit section — **no** fabricated provisional rows (AC-SPA-ES-08).
- [x] (P0) FR-ES-03.4 No «N Stories until Issue» / unlock / confidence score (AC-SPA-ES-03).
- [x] (P0) FR-ES-03.5 Density viz = CSS (api-req §5); marker icon for card chrome only.
- [x] (P0) FR-ES-03.L10N `earlySignal.emerging.*`.
- [x] (P0) UI Path A: @mockup M138 md+png on this ui_anchor task

## Where to change
- Emerging UI in `early-signal-slot-emerging` (e.g. `EmergingSignalsBlock` under `spa-app/src/components/earlySignal/`)
- Related: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx), [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js)

## Out of scope
Persistent `EmergingSignal` entity. Issues-shaped list. Voices. Promotion gates. ES-04/05. Reopening Pulse AC.

## Verification
```bash
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
rg -n 'emerging-signals|board-empty' spa-app/src || true
```
