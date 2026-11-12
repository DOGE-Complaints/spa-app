# STORY-SPA-CT-30-live-attach-ref-wire — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-30-live-attach-ref-wire.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-30-live-attach-ref-wire.md)  
> **Status:** P5 APPLY Done · gate **BLOCK** · `2026-10-21T13:13:07Z` · tip · activation **none** · Await **P8**  
> **Package:** `pkg-000193` · component-thread · REQ-17 · REQ-05 bytes · ARCH §16  
> **ui_scope:** `thread-mount` / `feed` · **mixed** · Path A **code lock** · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CT-17/19/22/25 Present · CT-28 Live Present · **THREADS-HTTP-07 Done** · **THREADS-HTTP-08 Done** (`pkg-000045`/`046`)  
> **Runtime:** T01–T05 **Done** · vitest **595/595** · shots 01–05 Present · P5 TASKED=0 · P6 skip · no invent URL/CDN/OP PASS

## Purpose

Live post Ready files via `uploadAttachment` (locked multipart POST) then map tree `attachments[].published_url` into CT-22 preview. Lab FixtureAdapter unchanged. Supersedes prior CT-30 attachRef-only / no-upload draft.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-30-live-attach-ref-wire.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-30-t01-client-upload](task-spa-ct-30-t01-client-upload/README.md) | Add `uploadAttachment` multipart client | **Done** |
| T02 | [task-spa-ct-30-t02-live-upload](task-spa-ct-30-t02-live-upload/README.md) | postComment ok → upload Ready Files | **Done** |
| T03 | [task-spa-ct-30-t03-map-tree](task-spa-ct-30-t03-map-tree/README.md) | Map `attachments` → comment.attachments / publishedUrl | **Done** |
| T04 | [task-spa-ct-30-t04-host-merge](task-spa-ct-30-t04-host-merge/README.md) | Reload / optimistic honesty with host owner | **Done** |
| T05 | [task-spa-ct-30-t05-vitest](task-spa-ct-30-t05-vitest/README.md) | upload + mapper tests | **Done** |

## Out of scope

Invent storage vendor · invent gateway proxy · invent CDN URL · NF-13…16 · invent OP PASS · `#/board` Done claim · change HTTP path names · mutate Lab FixtureAdapter

## @mockup handoff

- Continuity: Arch [§16](../../../../backlog-stories/component-thread/ARCHITECTURE.md) · CT-22 preview Present · HTTP-07/08 Done
- Path A: [ui-mockup-spec](./ui-mockup-spec.md)
- Shots: [visual-checklists](./visual-checklists-live-attach-ref-wire.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- NO STORY-UX-MOCKUP-BRIEF · no UX gen required
