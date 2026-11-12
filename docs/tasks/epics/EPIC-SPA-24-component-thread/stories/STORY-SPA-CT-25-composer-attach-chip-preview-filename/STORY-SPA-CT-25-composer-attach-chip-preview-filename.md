# STORY-SPA-CT-25-composer-attach-chip-preview-filename — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md)  
> **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · `2026-10-20T19:34:15Z` · tip · activation none  
> **Package:** `pkg-000183` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount`/`feed-lab` · **mixed** · Path A M153c (+ PNG) · Partial visual=**BLOCK** · NO BRIEF  
> **Skill declared:** `react-expert`  
> **Depends:** CT-17 · CT-19 · CT-22  
> **Runtime:** P5 APPLY · TASKED=0 · no invent HTTP/OP PASS · NO BRIEF · Await P8

## Purpose

Composer AttachmentRef Ready chips show real `fileName` + 48×48 image thumb (or clear icon) / non-image type cue — not family-only “Selected image” + ▣.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-25-composer-attach-chip-preview-filename.md) · **BLOCK** (OP eye Absent).

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-25-t01-filename](task-spa-ct-25-t01-filename/README.md) | Render `intent.fileName` · family above · middle ellipsis | **Done** |
| T02 | [task-spa-ct-25-t02-image-preview](task-spa-ct-25-t02-image-preview/README.md) | 48×48 thumb objectURL or image icon | **Done** |
| T03 | [task-spa-ct-25-t03-type-icons](task-spa-ct-25-t03-type-icons/README.md) | Non-image type cues + filename | **Done** |
| T04 | [task-spa-ct-25-t04-vitest](task-spa-ct-25-t04-vitest/README.md) | fileName · preview markers · revoke | **Done** |

## Out of scope

Node preview rewrite (CT-22) · density borderless (CT-26) · Share · invent MIME table invent · invent upload HTTP · invent mobile tap-to-open full-name modal

## @mockup handoff

- Continuity: [M153c v1.0](../../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.md) · [PNG](../../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.png) · keep M153b §7 paint
- Path A: [ui-mockup-spec](./ui-mockup-spec.md)
- Shots: [visual-checklists](./visual-checklists-composer-attach-chip-preview-filename.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md) · md5 `6d06e4502356` · `39fcf21c88f8` · `169b8a66a2ca` · `7b4ae08f0178` · `a978bec5ebf0`
- NO STORY-UX-MOCKUP-BRIEF
