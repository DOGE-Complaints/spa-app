# SPA-G7-T03 — Migrate mono token (5 sites)

**Status:** ✅ Done  
**Story:** [`../STORY-SPA-G7-self-hosted-fonts.md`](../STORY-SPA-G7-self-hosted-fonts.md)  
**Decision Ref:** backlog §FR-G7.4, D-G7-3, T03  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T21:48:40Z

## Purpose
Заменить все 5 хардкод `ui-monospace,…` на `var(--font-family-mono)`.

## Risk
Частичная миграция оставит dangling token drift.

## Code Facts (re-verify at execute)
| File | Line (scaffold) |
|------|-----------------|
| `src/index.css` | ~458 `.issue-details-metadata-monospace` |
| `StoryHandoff.css` | ~149 |
| `AppErrorState.css` | ~46 |
| `ContributionLayer.css` | ~123 |
| `WalletStatus.css` | ~73 |

IssuePage already uses `.issue-details-metadata-monospace` on txid/hash fields.

## AC / DoD
- [ ] (P0) All 5 sites use `var(--font-family-mono)`.
- [ ] (P0) No remaining `ui-monospace` font-family stacks in those five files (unless intentional comment).

## Where to change
- The five CSS files listed above.

## Out of scope
- Font files / @font-face (T01–T02). Weight 700 (T04). Visual (T05).

## Verification
```bash
rg 'ui-monospace|font-family-mono' spa-app/src/index.css spa-app/src/components/StoryHandoff/StoryHandoff.css spa-app/src/components/AppErrorState/AppErrorState.css spa-app/src/components/ContributionLayer/ContributionLayer.css spa-app/src/components/WalletStatus/WalletStatus.css
```

Gate: [`acceptance-verification-spa-g7-t03.md`](./acceptance-verification-spa-g7-t03.md)
