# SPA-CT-17-T02 — Family allow-list hook

**Status:** Done  
**Story:** [`../STORY-SPA-CT-17-attachment-picker-path.md`](../STORY-SPA-CT-17-attachment-picker-path.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T11:54:18Z`  
**Package:** `pkg-000175`
**Runtime:** P3 Done · `2026-10-20T12:00:47Z` · ui_anchor  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · families §5

## Purpose

FR-CT-17.4: Family allow-list hook for images · PDF · Microsoft Office (Word/Excel/PowerPoint). Exact MIME/extensions remain **TBD** — config/placeholder only; **no invent** concrete MIME list.

## Constraints

- No invent MIME strings / extensions  
- No invent HTTP · OP PASS  
- Fail-closed until §18 MIME policy resolved  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Family hook Present (images/PDF/Office)
- [x] Exact MIME documented as TBD · not invented
- [ ] Visual Done not claimed without OP eye

## Where to change

config / composer allow-list hook · `ThreadComposer` / `ThreadMount` attachment decision path

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
