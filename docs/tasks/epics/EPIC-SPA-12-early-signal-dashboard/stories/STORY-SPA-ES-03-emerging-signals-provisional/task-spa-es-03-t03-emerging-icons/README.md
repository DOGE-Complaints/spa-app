# SPA-ES-03-T03 — Emerging marker/empty icons

**Status:** Done  
**Story:** [`../STORY-SPA-ES-03-emerging-signals-provisional.md`](../STORY-SPA-ES-03-emerging-signals-provisional.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md) · icon catalog  
**Depends on:** T02 Emerging UI  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md`](../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:30:36Z · **P3:** 2026-08-17T11:36:37Z  
**Package:** `pkg-000068`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
```

## Purpose
Wire Emerging card/empty/ladder icons from catalog (ON DISK 2026-08-17). Issue crest = brand logo, not a new crest. Density = CSS, not `ic-*`.

> Источник: [STORY-SPA-ES-icon-assets.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md).

| Функция | Runtime | Disk | Note |
|---------|---------|------|------|
| Card leading marker | `/icons/early-signal-dashboard/ic-emerging-marker.png` | `public/icons/early-signal-dashboard/ic-emerging-marker.png` | provisional L2 chrome |
| Empty state | `/icons/early-signal-dashboard/ic-emerging-empty.png` | `public/icons/early-signal-dashboard/ic-emerging-empty.png` | ESD-E-empty |
| Story ladder | `/icons/early-signal-dashboard/ic-pulse-stories.png` | `public/icons/early-signal-dashboard/ic-pulse-stories.png` | Story ≠ Issue |
| Issue L3 crest | `/assets/DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` | brand mark — do not invent Issue crest |
| Density clusters | — | — | CSS — **not** `ic-*` |

## Risk
Inventing Issue crest PNG; basename-only / glob `ic-emerging-*`; wiring Pulse-only icons as Issue identity.

## Code Facts (As-of-Done P3 2026-08-17T11:36:37Z)
- Disk: `spa-app/public/icons/early-signal-dashboard/ic-emerging-{marker,empty}.png` · `ic-pulse-stories.png` · `spa-app/public/assets/DOGEstonia-logo-big.png`.
- Runtime: `EMERGING_ICONS` in [`EmergingSignalsBlock.jsx`](../../../../../../../src/components/earlySignal/EmergingSignalsBlock.jsx) — marker/empty/stories wired; `issueCrest` catalogued, **not** rendered on L2 cards.

## AC / DoD
- [x] (P0) Wire exact runtime paths from table above (no basename-only, no `ic-emerging-*` glob)
- [x] (P0) No invented Issue crest PNG
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change

## Where to change
- `spa-app/src/components/earlySignal/` Emerging block (or Emerging slot)

## Out of scope
Icon PNG generation. Voices. ES-04/05. Reopening Pulse AC.

## Verification
```bash
test -f spa-app/public/icons/early-signal-dashboard/ic-emerging-marker.png
test -f spa-app/public/icons/early-signal-dashboard/ic-emerging-empty.png
test -f spa-app/public/icons/early-signal-dashboard/ic-pulse-stories.png
test -f spa-app/public/assets/DOGEstonia-logo-big.png
```
