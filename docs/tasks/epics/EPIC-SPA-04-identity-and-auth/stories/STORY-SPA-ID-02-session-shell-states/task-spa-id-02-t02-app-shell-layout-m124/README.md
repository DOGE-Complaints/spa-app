# SPA-ID-02-T02 — App shell layout M124

**Story:** [`../STORY-SPA-ID-02-session-shell-states.md`](../STORY-SPA-ID-02-session-shell-states.md)  
**Decision Ref:** [mockup-124 §6 Application Shell Requirements](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md); [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) existing shell tokens  
**Depends on:** — (parallel with T01; no resolver dependency for layout scaffold)  
**ui_scope:** `visual` · **ui_anchor:** true · **ui_complexity:** `standard`  
**Skill declared:** `react-expert`

## Purpose
Shared `AppShell` component: logo, sidebar slot, header, footer/status area per M124 §6 (FR-02.6). Stable shell containers for all session states.

## Risk
Layout collapse or white screen if shell not shared before state overlays (story AC #2).

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — inline header/sidebar/footer; no shared `AppShell` component.
- [`App.jsx`](../../../../../../../../src/App.jsx) — flat routes, no shell wrapper.
- M124 PNG: [`mockup-124-session-shell-state-sheet-spec.png`](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.png)

## AC / DoD
- [ ] `AppShell` preserves logo/sidebar/header/footer slots (FR-02.6; story AC #2).
- [ ] `ui-mockup-spec.md` in this task folder (UI-1 gate from M124).
- [ ] `data-testid` / layout hooks for shell regions.
- [ ] Reuse board CSS tokens where applicable (no full redesign).

## Where to change
- New: `spa-app/src/components/AppShell/AppShell.jsx`, `AppShell.css`
- This task folder: `ui-mockup-spec.md`, `ui-baseline/` (UI-0 at P3 execute)

## Out of scope
- Session state panels (T03–T04). Resolver (T01). BoardPage refactor to consume shell — T05.

## Verification
```bash
cd spa-app && npm run dev
# /#/board — shell regions visible; compare to M124 ui-mockup-spec
```
