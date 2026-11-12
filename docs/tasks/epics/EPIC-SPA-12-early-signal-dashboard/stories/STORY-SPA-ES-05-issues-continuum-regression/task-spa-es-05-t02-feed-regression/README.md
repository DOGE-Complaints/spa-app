# SPA-ES-05-T02 — Feed regression Issues ≥ 1

**Status:** Done  
**Story:** [`../STORY-SPA-ES-05-issues-continuum-regression.md`](../STORY-SPA-ES-05-issues-continuum-regression.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md) · FR-ES-05.1 · FR-ES-05.5 · AC-SPA-ES-05  
**Depends on:** T01 ui_anchor  
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
Prove Issues ≥ 1 still render the PH-04 feed (AC-SPA-ES-05). Filters / load-error / card → `/issue/:id` remain PH-04 contracts (FR-ES-05.5).

## Risk
Replacing feed with discovery-only; breaking SEARCH filters; inventing list API; `/dashboard`; mixing ES-01…04 empty path.

## Code Facts (As-of-Done P3 2026-08-17T13:10:12Z)
- Feed path: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) `showResults` · `data-testid="board-feed"` + `IssueCard` inside `board-continuum`.
- Empty discovery **separate**: `showEmptyBoard` → `<EarlySignalDiscovery />`.
- Load error / filtered empty: PH-04 `board-load-error` / `board-filtered-empty` unchanged.
- API: [api-req §1](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) existing `issueService`.

## AC / DoD
- [x] (P0) FR-ES-05.1 When `issues.length ≥ 1`, existing Issue cards/feed still render — regression on `BoardPage` list path (AC-SPA-ES-05).
- [x] (P0) FR-ES-05.5 Filters / load-error / card → `/issue/:id` remain PH-04 contracts.
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P1) Align with mockup M140 ESD-I-feed

## Where to change
- Vitest / BoardPage feed path — keep PH-04 contracts
- Related: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx)

## Out of scope
Residual compact slots (T03). Topic icons (T04). Product code this P1.

## Verification
```bash
rg -n 'showResults|board-feed|board-load-error|board-filtered-empty|IssueCard' spa-app/src/pages/BoardPage.jsx
```
