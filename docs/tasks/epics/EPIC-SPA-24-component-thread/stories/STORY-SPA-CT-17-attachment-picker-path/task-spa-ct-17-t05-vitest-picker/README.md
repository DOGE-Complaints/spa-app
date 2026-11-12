# SPA-CT-17-T05 — Vitest picker path

**Status:** Done  
**Story:** [`../STORY-SPA-CT-17-attachment-picker-path.md`](../STORY-SPA-CT-17-attachment-picker-path.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T11:54:18Z`  
**Package:** `pkg-000175`
**Runtime:** P3 Done · `2026-10-20T12:00:47Z`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · FR 17.1–17.6

## Purpose

FR-CT-17.1–17.6: Assert zero chips on first paint · native picker present · no synthetic-only Ready · Cancel honesty · Attach omitted when unavailable · family hook documented without inventing MIME.

## Constraints

- No invent MIME/HTTP/OP PASS  
- §18 remain explicit blockers in tests/docs  
- Partial visual=**BLOCK** until OP eye

## AC / DoD

- [x] Vitest covers zero chips · picker · no synthetic-only Ready · attach-off
- [ ] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/__tests__/` · `src/features/feed-lab/__tests__/` (as needed)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
