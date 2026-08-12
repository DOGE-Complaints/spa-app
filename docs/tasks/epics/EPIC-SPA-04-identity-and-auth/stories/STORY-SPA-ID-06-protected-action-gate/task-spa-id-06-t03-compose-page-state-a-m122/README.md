# SPA-ID-06-T03 — Compose page state A (M122)

**Story:** [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)  
**Decision Ref:** [mockup-122-story-compose-verification-gate-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md) state A; [`ui-mockup-spec.md`](./ui-mockup-spec.md)  
**Depends on:** T01  
**ui_scope:** `visual` (ui_anchor)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T18:55:30Z

## Purpose
Replace `ProtectedStoryComposePage` placeholder with `StoryComposePage` M122 state A: title/summary/content fields, Submit / Save Draft / Discard actions. No verify prompt on load. Produce `ui-mockup-spec.md` as P3 UI SSOT for M122 compose surface.

## Risk
Leaving placeholder blocks entire Wave 3 gate. Hardcoded EN copy violates FR-06.9.

## Code Facts (re-verify at execute)
- [`AppShellLayout.jsx`](../../../../../../../../src/layout/AppShellLayout.jsx) L48-50 — `ProtectedStoryComposePage` EN placeholder.
- [`App.jsx`](../../../../../../../../src/App.jsx) L24 — route `/story/compose` → placeholder export.
- [`sessionRoutePolicy.js`](../../../../../../../../src/router/sessionRoutePolicy.js) — `/story/compose` protected prefix.
- M122 state A — compose editor without verification gate visible.

## AC / DoD
- [ ] (P0) `StoryComposePage` renders title/summary/content fields; all labels via `t('storyGate.compose.*')` (FR-06.1, AC #6).
- [ ] (P0) Submit / Save Draft / Discard CTAs present; **no** verify UI on initial compose (FR-06.1, AC #1).
- [ ] (P0) Route `/story/compose` wired to real page (replaces placeholder).
- [ ] (P0) `ui-mockup-spec.md` documents M122 A hierarchy + `data-testid` hooks.
- [ ] (P1) Stable `data-testid` for compose form regions.

## Where to change
- New: `spa-app/src/pages/StoryComposePage.jsx` (+ CSS)
- `spa-app/src/layout/AppShellLayout.jsx` — export real page or re-export from pages
- `spa-app/src/App.jsx` — import `StoryComposePage`
- This task: `ui-mockup-spec.md`

## Out of scope
- Gate panels B/C (T04). Verify embed + submit orchestration (T05). Gateway save on Submit (T04).

## Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/StoryComposePage.test.jsx
cd spa-app && npm run dev
# UI-0: MCP baseline /story/compose before further states (P3 appendix)
```
