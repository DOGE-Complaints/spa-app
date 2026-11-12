# STORY-SPA-CT-05-attachments-max-config — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-05-attachments-max-config.md)  
> **Status:** P3 structure Done · gate **BLOCK** · `2026-10-18T13:39:15Z` · tip active  
> **Package:** `pkg-000163` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.2 T-D/T-E/T-maxA · M153 D/E · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-04 structure Present  
> **Runtime:** P3 Execute Done · Await **P4**

## Purpose

AttachmentRef + configurable `maxAttachments`: ready/denied chips, Attach control honesty, fixture local-intent only — no invent upload HTTP.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-05-t01-max-attachments-config](task-spa-ct-05-t01-max-attachments-config/README.md) | DEFAULT_MAX_ATTACHMENTS · resolve · clamp | Done |
| T02 | [task-spa-ct-05-t02-attachment-ref](task-spa-ct-05-t02-attachment-ref/README.md) | Chip D/E · Remove | Done |
| T03 | [task-spa-ct-05-t03-composer-wire](task-spa-ct-05-t03-composer-wire/README.md) | Attach · max + mediaAllowedTypes | Done |
| T04 | [task-spa-ct-05-t04-vitest-clamp](task-spa-ct-05-t04-vitest-clamp/README.md) | Vitest · Path A + gate | Done |

## Out of scope

Real media upload API · gallery · safety bypass · classifier UI · invent HTTP · invent OP PASS

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.2 T-D/T-E/T-maxA](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Artboard: [M153](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) D/E
- Verify: `#/lab/thread` attachments · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-05-attachments-max-config.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
