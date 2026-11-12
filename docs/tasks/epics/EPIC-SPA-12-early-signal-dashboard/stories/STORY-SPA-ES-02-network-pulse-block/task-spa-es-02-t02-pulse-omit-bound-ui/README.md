# SPA-ES-02-T02 — Pulse UI omit vs bound

**Status:** Done  
**Story:** [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) · FR-ES-02.2/02.3/02.5  
**Depends on:** T01 Pulse client; [ADMIN-ESD-06 ADR](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:02:15Z · **P3:** 2026-08-17T11:10:56Z  
**Package:** `pkg-000067`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
```

Path A spec: [`ui-mockup-spec.md`](./ui-mockup-spec.md)

## Purpose
Pulse UI ESD-P-omit vs ESD-P-bound (and ESD-P-narrow) in discovery slot `early-signal-slot-pulse`. Particle / density viz = CSS/component — not fake metrics.

## Risk
Empty fake KPI slots; client-fabricated counts (AC-SPA-ES-08); collapsing discovery to `board-empty`; Offers/Voices; `/dashboard`.

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L162 `showEmptyBoard`; L326 `<EarlySignalDiscovery />` — `board-empty` **absent**.
- [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L4–5 `early-signal-slot-pulse`; L16–45 titled placeholders — **no** Pulse HTTP / metric slots.
- M137 SSOT: [`mockup-137-network-pulse-block-state-sheet-spec.md`](../../../../../../../UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md) + `.png` **on disk**.
- API bind/omit: [STORY-SPA-ES-api-requirements.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) §2.2 / §7.
- spa Pulse consumers: **0** (`rg network-pulse spa-app/src`).

## AC / DoD
- [x] (P0) FR-ES-02.2 **ESD-P-bound:** render metric slots only for fields in api-req §2.2 bind map (Stories → `stories_collected`; Areas → `areas`; Languages → `languages`; Topics → `topics`; Activity/7d → `recent_stories_7d` only with honest label).
- [x] (P0) FR-ES-02.3 **ESD-P-omit:** on fetch failure / unavailable / intentional omit → copy-only canonical message; **no** empty fake KPI slots; **no** client-fabricated counts (AC-SPA-ES-08).
- [x] (P0) FR-ES-02.5 Particle / density viz = CSS/component (api-req §5) — not fake metrics.
- [x] (P0) UI Path A: @mockup M137 md+png on this ui_anchor task

## Where to change
- Pulse UI in `early-signal-slot-pulse` (e.g. `NetworkPulseBlock` under `spa-app/src/components/earlySignal/`)
- Related: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx), [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js)

## Out of scope
Voices / Contributors metrics. Invent fields. `/metrics`. Changing Issues list API. ES-03 Emerging HTTP.

## Verification
```bash
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
rg -n 'network-pulse|board-empty' spa-app/src || true
```
