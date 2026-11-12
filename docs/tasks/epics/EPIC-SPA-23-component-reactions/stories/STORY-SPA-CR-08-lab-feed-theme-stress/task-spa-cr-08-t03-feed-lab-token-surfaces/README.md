# SPA-CR-08-T03 — Feed-lab surfaces → theme tokens

**Status:** Done  
**Story:** [`../STORY-SPA-CR-08-lab-feed-theme-stress.md`](../STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:27:28Z`  
**Package:** `pkg-000144`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.1

## Purpose
FR-08.3 / FR-08.4: feed card / strip / discussion chrome readable under both themes — replace hardcoded light hex with semantic `--color-*` so tokenized strip/picker are not light islands in dark.

## Code Facts (verified at scaffold)
- Strip/picker CSS already use `--color-surface-elevated` / `--color-text-*` / `--color-border-*` (do not primary-touch)
- Feed-lab post CSS (e.g. `FeedPostCard.css`, strip/identity/discussion) — hardcoded light hex per backlog

## Implement notes
- Map surfaces to existing theme tokens; no invent DS amend
- Keep greenfield bans (ReactionChrome / Controls.css)
- OOS: CR-09 strip composition · CR-10 portal · invent new token names without need

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Do not treat ReactionPicker*.css / ReactionSummaryStrip.css as primary change surface

## AC / DoD
- [x] Feed-lab chrome uses `--color-*` (no hard-coded navy/cream islands under dark)
- [x] Strip/picker remain token-driven; card readable light+dark

## Where to change
`spa-app/src/features/feed-lab/post/FeedPostCard.css` · `FeedPostActionStrip.css` · identity/discussion CSS as needed

## Verification
```bash
rg -n "#[0-9a-fA-F]{3,8}|--color-" spa-app/src/features/feed-lab/post --glob '*.css' | head -40
```
