# SPA-CT-06-T03 — Vitest branch · Path A + gate

**Status:** Done  
**Story:** [`../STORY-SPA-CT-06-branch-disclosure.md`](../STORY-SPA-CT-06-branch-disclosure.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-06-branch-disclosure.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:44:33Z`  
**Package:** `pkg-000164`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.2 · [M153](../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · final task · depends T01–T02 · `2026-10-18T13:47:47Z`

## Purpose

AC: Vitest local disclosure · no network invent · Path A shots · gate BLOCK until OP eye · no invent PASS.

## Constraints

- No invent HTTP · OP PASS  
- Partial visual = BLOCK  
- story-root `screenshots/full-cycle/` mandatory at P3

## AC / DoD

- [x] Vitest local disclosure Present (`threadMount.ct06` 6/6 · suite 99/99)
- [x] Path A shots + gate Result filled (BLOCK until OP eye)

## Where to change

`src/features/thread-mount/__tests__/threadMount.ct06.test.jsx` · capture script · gate/checklist

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
