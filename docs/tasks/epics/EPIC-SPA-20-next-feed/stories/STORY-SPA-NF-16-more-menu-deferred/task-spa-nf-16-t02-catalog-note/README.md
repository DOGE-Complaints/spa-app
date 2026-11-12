# SPA-NF-16-T02 — Catalog note: more deferred on civic header

**Status:** Done  
**Story:** [`../STORY-SPA-NF-16-more-menu-deferred.md`](../STORY-SPA-NF-16-more-menu-deferred.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T12:46:48Z`  
**Done:** `2026-10-21T12:53:22Z`  
**Package:** `pkg-000192`  
**Path A:** code lock · [ARCH-DELTA §4](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-16.4 · 16.5: NF-icon-assets — more = deferred on civic header · asset kept.

## Code Facts (verify)

- `public/icons/next-feed/actions/more.svg` **Present** · **kept**
- Catalog row reinforced: **NF-16 deferred** · unused DOM · P3 held
- ARCH-DELTA §4 SSOT restore held

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Do not delete more.svg · no invent OP PASS

## AC / DoD

- [x] Catalog note deferred / unused on civic header held
- [x] more.svg not deleted
- [x] ARCH-DELTA §4 held
- [x] Visual Done not claimed without OP eye

## Where changed

`spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md`

## Verification

```bash
test -f spa-app/public/icons/next-feed/actions/more.svg
rg -n 'NF-16 deferred|more\.svg' spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md
```
