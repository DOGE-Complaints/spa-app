# SPA-NF-13-T01 — Register 5 type icons in NF-icon-assets + disk count

**Status:** Done  
**Story:** [`../STORY-SPA-NF-13-issue-type-identity-icon.md`](../STORY-SPA-NF-13-issue-type-identity-icon.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:28:13Z`  
**Done:** `2026-10-21T11:33:57Z`  
**Package:** `pkg-000189`  
**Path A:** [M161](../../../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md)

## Purpose

FR-NF-13.8: Register 5 type icons in NF-icon-assets + disk count (intake already promoted files).

## Code Facts (verify)

- Types SVG ×5 · **Present** under `public/icons/next-feed/types/`
- [STORY-SPA-NF-icon-assets.md](../../../../../backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md) M161 table · **Present** · P3 stamp Match
- Intake M161/M162 · **PASS**

## Constraints

- Path A M161 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent SVG / HTTP / OP PASS · docs rows only if gap vs disk

## AC / DoD

- [x] Icon catalog docs updated for `types/*`
- [x] Disk count Match (5 files)
- [x] Visual Done not claimed without OP eye

## Where changed

`STORY-SPA-NF-icon-assets.md` P3 verify stamp · disk count **5**

## Verification

```bash
ls spa-app/public/icons/next-feed/types/ic-issue-type-*.svg | wc -l
```
