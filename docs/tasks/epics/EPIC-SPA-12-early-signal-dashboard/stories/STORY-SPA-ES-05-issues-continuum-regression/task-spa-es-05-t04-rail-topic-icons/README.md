# SPA-ES-05-T04 — Rail/topic icons from catalog

**Status:** Done  
**Story:** [`../STORY-SPA-ES-05-issues-continuum-regression.md`](../STORY-SPA-ES-05-issues-continuum-regression.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md) · FR-ES-05.6  
**Depends on:** T01 / T03 residual chrome  
**ui_scope:** `logic`  
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
Wire continuum rail + Issue topic icons from catalog (ON DISK 2026-08-17). Topic icons on Issue cards **only if** product maps real issue labels — do not invent category taxonomy beyond catalog paths (FR-ES-05.6). No `ic-issue-topic-*.png` glob.

| Функция | Runtime | Disk |
|---------|---------|------|
| Topic transit | `/icons/early-signal-dashboard/ic-issue-topic-transit.png` | `public/icons/early-signal-dashboard/ic-issue-topic-transit.png` |
| Topic greenspace | `/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` | `public/icons/early-signal-dashboard/ic-issue-topic-greenspace.png` |
| Topic lighting | `/icons/early-signal-dashboard/ic-issue-topic-lighting.png` | `public/icons/early-signal-dashboard/ic-issue-topic-lighting.png` |
| Topic waste | `/icons/early-signal-dashboard/ic-issue-topic-waste.png` | `public/icons/early-signal-dashboard/ic-issue-topic-waste.png` |
| Topic housing | `/icons/early-signal-dashboard/ic-issue-topic-housing.png` | `public/icons/early-signal-dashboard/ic-issue-topic-housing.png` |
| Rail Emerging | `/icons/early-signal-dashboard/ic-emerging-marker.png` | `public/icons/early-signal-dashboard/ic-emerging-marker.png` |
| Rail Missing | `/icons/early-signal-dashboard/ic-rail-missing.png` | `public/icons/early-signal-dashboard/ic-rail-missing.png` |
| Rail Help | `/icons/early-signal-dashboard/ic-help-share.png` | `public/icons/early-signal-dashboard/ic-help-share.png` |
| Submit | `/icons/public-home/ic-external-link.png` | `public/icons/public-home/ic-external-link.png` |
| Feed error | `/icons/story-handoff/ic-cloud-error.png` | `public/icons/story-handoff/ic-cloud-error.png` |
| Try again | `/icons/story-handoff/ic-auto-resubmit.png` | `public/icons/story-handoff/ic-auto-resubmit.png` |
| Issue crest | `/assets/DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` |

## Risk
Inventing taxonomy / globbing topic icons; using handoff `ic-field-category`; Offers; `/dashboard`.

## Code Facts (As-of-Done P3 2026-08-17T13:10:12Z)
- Explicit map: [`issueTopicIcons.js`](../../../../../../../src/i18n/issueTopicIcons.js) — transit/greenspace/lighting/waste/housing only (no glob).
- [`IssueCard.jsx`](../../../../../../../src/components/IssueCard/IssueCard.jsx) shows topic PNG iff `topicIconForLabel(label)`.
- Rail icons: [`ContinuumResidual.jsx`](../../../../../../../src/components/earlySignal/ContinuumResidual.jsx) `CONTINUUM_RAIL_ICONS`.

## AC / DoD
- [x] (P0) FR-ES-05.6 Topic icons on Issue cards only if product maps real issue labels — do not invent category taxonomy beyond catalog paths.
- [x] (P0) Wire exact runtime paths from table above (no `ic-issue-topic-*` glob)
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P1) Align with mockup M140

## Where to change
- Rail icons on `ContinuumResidual.jsx`; topic icons on Issue cards **only** with real label map
- Related: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx)

## Out of scope
Invented categories. Product code this P1. ES-01…04 icon AC.

## Verification
```bash
test -f spa-app/public/icons/early-signal-dashboard/ic-issue-topic-transit.png
test -f spa-app/public/icons/early-signal-dashboard/ic-issue-topic-greenspace.png
test -f spa-app/public/icons/early-signal-dashboard/ic-issue-topic-lighting.png
test -f spa-app/public/icons/early-signal-dashboard/ic-issue-topic-waste.png
test -f spa-app/public/icons/early-signal-dashboard/ic-issue-topic-housing.png
test -f spa-app/public/icons/early-signal-dashboard/ic-emerging-marker.png
test -f spa-app/public/icons/early-signal-dashboard/ic-rail-missing.png
test -f spa-app/public/icons/early-signal-dashboard/ic-help-share.png
test -f spa-app/public/icons/public-home/ic-external-link.png
test -f spa-app/public/icons/story-handoff/ic-cloud-error.png
test -f spa-app/public/icons/story-handoff/ic-auto-resubmit.png
test -f spa-app/public/assets/DOGEstonia-logo-big.png
```
