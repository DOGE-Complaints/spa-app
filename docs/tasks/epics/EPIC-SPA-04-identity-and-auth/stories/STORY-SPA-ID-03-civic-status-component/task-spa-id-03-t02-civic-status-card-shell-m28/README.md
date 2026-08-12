# SPA-ID-03-T02 — Civic status card shell M28

**Story:** [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)  
**Decision Ref:** [mockup-28 §2–§4](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md); [`BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) layout tokens  
**Depends on:** — (parallel with T01)  
**ui_scope:** `visual` · **ui_anchor:** true · **ui_complexity:** `standard`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:45:56Z

## Purpose
Shared `CivicStatusCard` shell: icon → title → description → primary action → metadata (FR-03.4). Single component entry point for all five runtime states (FR-03.1 partial).

## Risk
Separate per-context cards violate FR-03.6 and duplicate trust UI.

## Code Facts (re-verify at execute)
- M28 PNG: [`mockup-28-civic-status-state-sheet-spec.png`](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png)
- grep `CivicStatusCard` in `spa-app/src/` → 0 at intake.
- [`AppShell.jsx`](../../../../../../../../src/components/AppShell/AppShell.jsx) — existing shell patterns for card spacing.

## AC / DoD
- [ ] (P0) `CivicStatusCard` renders shell regions in M28 hierarchy (FR-03.4; story AC #1 partial).
- [ ] (P0) `ui-mockup-spec.md` in this task folder (UI-1 gate from M28).
- [ ] (P0) `data-testid` / `data-civic-status-card` root hook.
- [ ] (P1) Trust tone — no trophy/green-badge gamification styling (story AC #4).

## Where to change
- New: `spa-app/src/components/CivicStatus/CivicStatusCard.jsx`, `CivicStatus.css`, `index.js`
- This task folder: `ui-mockup-spec.md`, `ui-baseline/` (UI-0 at P3 execute)

## Out of scope
- State-specific copy/panels (T03–T04). Derivation logic (T01). Route wiring (T05).

## Verification
```bash
cd spa-app && npm run dev
# /#/dashboard (after T05) — shell regions visible; compare to ui-mockup-spec
```
