# SPA-CR-20-T04 — Manifest + CR-icon Gap v2 → Reuse

**Status:** Done · `2026-10-18T12:07:24Z`
**P3 note:** Gap v2 Write+promote applied  
**Story:** [`../STORY-SPA-CR-20-gap-v2-icon-generate.md`](../STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**ui_scope:** docs / icon catalog · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:04:08Z`  
**Package:** `pkg-000156`  
**@mockup:** [CR-icon](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md) · residual mirror §3  
**extends:** T03 promote  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:07:24Z`

## Purpose
FR-20.6: Update SHA/manifest · CR-icon §Gap v2 → §Reuse · ICON #10 tip after promote.

## Code Facts (verified at scaffold)
- CR-icon §Gap v2 **open** · ICON #10 points Gap v2 → CR-20

## Implement notes
- Update `DOGEstonia-icon-manifest` / icon-system rows · `STORY-SPA-CR-icon-assets.md` · `ICON-GENERATION-INDEX.md`
- Do not invent OP PASS

## Constraints
- Catalog truth after disk Present · no invent SVG beyond Gap v2 pair

## AC / DoD
- [x] Gap v2 closed → Reuse on CR-icon
- [x] ICON #10 / manifest SHA tip updated

## Where to change
icon-system manifest · `STORY-SPA-CR-icon-assets.md` · `ICON-GENERATION-INDEX.md`

## Verification
```bash
rg -n "Gap v2|Reuse|CR-20" spa-app/docs/tasks/backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md spa-app/docs/tasks/backlog-stories/icons/ICON-GENERATION-INDEX.md | head
```
