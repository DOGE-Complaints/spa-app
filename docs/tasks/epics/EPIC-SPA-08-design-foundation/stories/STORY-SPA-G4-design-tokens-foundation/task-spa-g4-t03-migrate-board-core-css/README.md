# SPA-G4-T03 — Migrate board-core CSS to var(--…)

**Status:** Done  
**Story:** [`../STORY-SPA-G4-design-tokens-foundation.md`](../STORY-SPA-G4-design-tokens-foundation.md)  
**Decision Ref:** backlog §FR-G4.3, T03, D-G4-2 (board subset first)  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T16:01:20Z
**Completed:** 2026-07-28T16:20:38Z

## Purpose
Заменить hex на `var(--color-*)` (и связанные токены) в board-ядре: `index.css`, `Filters.css`, `IssueCard.css`, `StatusBadge.css`, `EmptyState.css`.

## Risk
Частичная миграция оставит drift в самом частом CSS (`index.css` ~45 hex).

## Code Facts (re-verify at execute)
- Targets: [`src/index.css`](../../../../../../../src/index.css), [`Filters.css`](../../../../../../../src/components/Filters/Filters.css), [`IssueCard.css`](../../../../../../../src/components/IssueCard/IssueCard.css), [`StatusBadge.css`](../../../../../../../src/components/StatusBadge.css), EmptyState CSS.
- `App.css` dead — **exclude**.

## AC / DoD
- [ ] (P0) Primary colors in the five files use `var(--color-*)` per mapping.
- [ ] (P0) Remaining literals only if intentional (shadows / one-offs documented).
- [ ] (P1) No new hardcoded yellow/bg/text drift introduced.

## Where to change
- The five CSS files listed above.

## Out of scope
- Identity/cabinet files (T04). Spacing px→space (deferred). Visual screenshots (T06).

## Verification
```bash
rg -n '#[0-9a-fA-F]{3,8}' spa-app/src/index.css spa-app/src/components/Filters/Filters.css spa-app/src/components/IssueCard/IssueCard.css spa-app/src/components/StatusBadge.css
cd spa-app && npm test -- --run
```

Gate: [`acceptance-verification-spa-g4-t03.md`](./acceptance-verification-spa-g4-t03.md)
