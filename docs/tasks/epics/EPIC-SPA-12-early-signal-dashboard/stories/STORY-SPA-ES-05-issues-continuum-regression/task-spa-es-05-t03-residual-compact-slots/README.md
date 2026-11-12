# SPA-ES-05-T03 — Residual compact Pulse/Emerging/Missing

**Status:** Done  
**Story:** [`../STORY-SPA-ES-05-issues-continuum-regression.md`](../STORY-SPA-ES-05-issues-continuum-regression.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md) · FR-ES-05.2  
**Depends on:** T01 layout; ES-02/03/04 clients (reuse compact, do not reopen AC)  
**ui_scope:** `visual`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md`](../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T12:26:25Z · **P3:** 2026-08-17T13:10:12Z  
**Package:** `pkg-000070`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png
```

## Purpose
Optional residual discovery chrome (M140 §15): compact Pulse / Emerging / Missing where data allows. **Omit** blocks without data (PRODUCT-BRIEF #7). Do not render all five empty-board discovery blocks.

## Risk
Re-implementing full ES-02/03/04 empty-board UI on continuum; inventing counts; showing slots with no data; Offers; `/dashboard`.

## Code Facts (As-of-Done P3 2026-08-17T13:10:12Z)
- Compact host: [`ContinuumResidual.jsx`](../../../../../../../src/components/earlySignal/ContinuumResidual.jsx) — Pulse/Emerging omit without data; Missing qualitative compact; Help CTA PH-06.
- Empty-board Pulse/Emerging/Missing **unchanged** on [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx).
- API: Pulse/Emerging same §2/§3 clients; no new continuum endpoint.

## AC / DoD
- [x] (P0) FR-ES-05.2 Optional residual discovery rail/chrome (M140) where data allows — Pulse/Emerging/Missing compact; omit blocks without data (PRODUCT-BRIEF #7).
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P1) Align with mockup M140 ESD-I-residual

## Where to change
- Compact slots inside `ContinuumResidual.jsx` (reuse ES-02/03/04 clients; omit if no data)
- Related: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx)

## Out of scope
Layout host (T01). Topic icons (T04). Reopening ES-02/03/04 empty-discovery AC. Product code this P1.

## Verification
```bash
rg -n 'ContinuumResidual|NetworkPulseBlock|EmergingSignalsBlock|WhatsMissingBlock' spa-app/src/components/earlySignal spa-app/src/pages/BoardPage.jsx || true
```
