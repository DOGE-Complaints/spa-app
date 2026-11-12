# STORY-SPA-CT-04-thread-composer — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-04-thread-composer.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-04-thread-composer.md)  
> **Status:** P3 structure Done · gate **BLOCK** · `2026-10-18T13:30:17Z` · tip active  
> **Package:** `pkg-000162` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.2 T-C/T-root/T-draft/T-F/T-G · M153 C/F/G · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-03 structure Present  
> **Runtime:** P3 Execute Done · Await **P4**

## Purpose

ThreadComposer: root/reply modes, draft survival, post-fail F chrome, mobile keyboard-open — fixture write only, no invent HTTP.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-04-t01-thread-composer](task-spa-ct-04-t01-thread-composer/README.md) | Root/reply UI · excerpt · Cancel · Post | Done |
| T02 | [task-spa-ct-04-t02-draft-state](task-spa-ct-04-t02-draft-state/README.md) | Draft+target state · no silent clear | Done |
| T03 | [task-spa-ct-04-t03-post-fail](task-spa-ct-04-t03-post-fail/README.md) | Inline F · retry/keep | Done |
| T04 | [task-spa-ct-04-t04-mobile-keyboard](task-spa-ct-04-t04-mobile-keyboard/README.md) | 390 sticky composer chrome | Done |
| T05 | [task-spa-ct-04-t05-vitest-composer](task-spa-ct-04-t05-vitest-composer/README.md) | Vitest · Path A + gate | Done |

## Out of scope

Attachments (CT-05) · verify gate (CT-07) · invent HTTP · invent OP PASS

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.2 T-C/T-root/T-draft/T-F/T-G](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Artboard: [M153](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- Verify: `#/lab/thread` composer · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-04-thread-composer.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
