# STORY-SPA-CT-11-composer-icon-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-11-composer-icon-chrome.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-19T12:15:05Z` · tip active  
> **Package:** `pkg-000169` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX residual §3 **G-H2 · G-H6** · M152-B · M153 C/D · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-04 ThreadComposer · CT-05 AttachmentRef  
> **Runtime:** P3 Done · Await **P4**

## Purpose

Composer icon chrome: paperclip Attach (`attach.svg`) · yellow circular send / labelled Post with plane (`send.svg`) · layout Attach left · Post right · AttachmentRef D/E unchanged · no invent SVG.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-11-t01-attach-paperclip](task-spa-ct-11-t01-attach-paperclip/README.md) | Wire Attach → `attach.svg` paperclip chrome | Done |
| T02 | [task-spa-ct-11-t02-circle-send-empty](task-spa-ct-11-t02-circle-send-empty/README.md) | Yellow circular send + `send.svg` empty/first-send | Done |
| T03 | [task-spa-ct-11-t03-post-plane-label](task-spa-ct-11-t03-post-plane-label/README.md) | Post comment/reply labelled + plane icon | Done |
| T04 | [task-spa-ct-11-t04-vitest-icons](task-spa-ct-11-t04-vitest-icons/README.md) | Vitest icon DOM · AttachmentRef held · Path A + gate | Done |

## Out of scope

Inline reply (CT-12) · empty entry-only (CT-10) · invent upload HTTP/OP PASS · invent SVG · `#/next/feed`

## @mockup handoff

- Mirror: [OP-UX residual §3 G-H2 · G-H6](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)
- Artboard: [M152-B](../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153 C/D](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` open composer · paperclip + send/plane · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-11-composer-icon-chrome.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
