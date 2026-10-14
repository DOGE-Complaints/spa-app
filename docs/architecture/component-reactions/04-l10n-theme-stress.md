# component-reactions — L10N + theme stress (CR-04)

> Package: REQ-24 · EPIC-SPA-23 · **structure Present · visual BLOCKED** (OP eye Absent)  
> Route: `#/lab/reactions` · M160 stress matrix  
> Code: `ReactionsLabCanvas` stress controls · `CrReactionIcon`  
> Recorded: 2026-10-14T12:27:11Z · P8 docs · P5 TASKED=0

## Present

| Piece | Role |
|-------|------|
| Lab stress controls | ET/RU/EN × light/dark × 320 / 200% |
| `CrReactionIcon` | CSS mask + `currentColor` (theme-safe) |
| Dictionaries | reuse `threadsFeed.reactions.*` en/et/ru |
| FixtureAdapter | lab default only · no new API |

## Locks

- Partial visual = **BLOCK** until OP eye — do not invent PASS  
- M155 people OOS · `#/next/feed` cutover OOS  
- hopeful/amused never selectable (`CR_OMIT_SELECTABLE_IDS`)
