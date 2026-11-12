# STORY-SPA-CT-22-comment-attachment-preview — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md)  
> **Status:** P5 APPLY · gate **BLOCK** · `2026-10-20T15:07:32Z` · activation **none** · T01–T05 Done  
> **Package:** `pkg-000180` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A M153/M153a AttachmentRef continuity · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-05 · CT-17 · CT-19  
> **Runtime:** P5 disposition Present · TASKED=0 · no invent HTTP/OP PASS · NO BRIEF · Await **P8** (OP eye)

## Purpose

Posted comments show attachment previews (local-first) including `.md` family — CommentNode image/local preview · type-honest non-image cues · M153/M153a AttachmentRef continuity.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-22-t01-persist-intents](task-spa-ct-22-t01-persist-intents/README.md) | Persist attachment intents on post into comment model (lab host) | **Done** |
| T02 | [task-spa-ct-22-t02-md-family](task-spa-ct-22-t02-md-family/README.md) | Add `.md` to family allow-list hook | **Done** |
| T03 | [task-spa-ct-22-t03-node-preview](task-spa-ct-22-t03-node-preview/README.md) | Render image/local + non-image cues in CommentNode | **Done** |
| T04 | [task-spa-ct-22-t04-revoke-lifecycle](task-spa-ct-22-t04-revoke-lifecycle/README.md) | Safe object URL lifecycle (create/revoke) · no leak | **Done** |
| T05 | [task-spa-ct-22-t05-vitest](task-spa-ct-22-t05-vitest/README.md) | Image preview + md allow + honesty | **Done** |

## Out of scope

Invent upload/bind HTTP · invent CDN · invent gallery lightbox · Share · preview budget (CT-21) · invent MIME beyond family+`.md` · invent OP PASS

## @mockup handoff

- Continuity: [M153a v1.1](../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · [M153b §7 AttachmentRef](../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · no invent new M-number
- Interview: [INTERVIEW-CT-21-plus…](../../../../backlog-stories/component-thread/INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md) B5 · B6
- Arch: [§13.2](../../../../backlog-stories/component-thread/ARCHITECTURE.md)
- Verify: `#/lab/feed` · Attach image + Post → node preview · local if no URL · `.md` allow · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-22-comment-attachment-preview.md) · **PENDING**
- Shots: [visual-checklists](./visual-checklists-comment-attachment-preview.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- NO STORY-UX-MOCKUP-BRIEF
