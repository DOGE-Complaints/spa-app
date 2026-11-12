# SPA-ES-04-T03 — Picture Forming CSS/SVG viz

**Status:** Done  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) · FR-ES-04.4 · D7  
**Depends on:** ES-01 slot `early-signal-slot-forming`; T01 ui_anchor  
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
Picture Forming block = viz/CSS only (api-req §5) — **no** fake relationship metrics, **not** `ic-*` (FR-ES-04.4). Picture Forming ≠ Emerging Signals (M139).

## Risk
Fake metrics / coverage %; inventing GW fields; mixing Emerging density AC; `/dashboard`.

## Code Facts (re-verify at execute)
- Slot titled only: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L8 `early-signal-slot-forming` — **no** `PictureFormingBlock` child.
- L10N title exists: `earlySignal.forming.title`; `forming.message` **not** in dictionary yet.
- Emerging density already CSS in ES-03 — do not reopen Emerging AC.
- API: [api-req §5](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) viz / out of catalog.

## AC / DoD
- [x] (P0) FR-ES-04.4 Picture Forming block: viz/CSS only — no fake relationship metrics.
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P1) Align with mockup M139 Picture Forming (≠ Emerging)

## Where to change
- New `PictureFormingBlock.jsx` + CSS mounted in `early-signal-slot-forming`

## Out of scope
Missing categories (T01). Help CTA (T02). Coverage DTO. Product code this P1.

## Verification
```bash
rg -n 'PictureFormingBlock|early-signal-slot-forming' spa-app/src || true
```
