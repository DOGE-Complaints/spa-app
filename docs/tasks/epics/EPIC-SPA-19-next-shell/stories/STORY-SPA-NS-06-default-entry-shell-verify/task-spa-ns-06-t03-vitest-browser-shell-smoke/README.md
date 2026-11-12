# SPA-NS-06-T03 — Vitest + browser-smoke shell chrome/routes

**Status:** ✅ Done · P3 (`2026-10-09T17:50:50Z`)  
**Story:** [`../STORY-SPA-NS-06-default-entry-shell-verify.md`](../STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md)  
**Depends on:** T01 flip · NS-01…05 chrome  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T17:35:01Z`  
**Package:** `pkg-000102`  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
**@shell-reuse:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)

## Purpose
Vitest + browser-smoke cover **shell** chrome/routes (extend/repair theme/shell tests); not full feed E2E — FR-NS-06.3.

## Code Facts (re-verify at execute)
- Existing: `test:ui:board-shell` · ns01…05 vitest suites
- Feed body E2E **not** required

## AC / DoD
- [x] (P0) Vitest shell scope pass (entry flip + chrome hosts)
- [x] (P0) browser-smoke shell pass (`test:ui:board-shell` exit 0 · NS-05 chrome selectors)
- [x] (P0) Feed body E2E not claimed

## Where to change
- `spa-app/src/**/__tests__/` · `spa-app/tests/puppeteer/` as needed

## Out of scope
Full feed product verify · invent CI beyond existing patterns

## Verification
```bash
cd spa-app && npx vitest run src/layout/__tests__/ src/components/AppShell/__tests__/ 2>&1 | tail -30
cd spa-app && npm run test:ui:board-shell 2>&1 | tail -20
```
