# STORY-SPA-CT-10-empty-entry-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-10-empty-entry-chrome.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-19T12:04:28Z` · tip active  
> **Package:** `pkg-000168` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX residual §3 **G-H1 · G-M1** · M152 §8 / artboard B empty · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-01 IssueThreadBlock empty  
> **Runtime:** P3 Done · Await **P4**

## Purpose

Empty first paint = entry-only (`Write a comment` pill) · not full `ThreadComposer` · large speech-bubble empty icon Present (artboard B) + lead/helper · entry activate opens composer chrome (CT-11) without always-on empty.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-10-t01-empty-entry-only](task-spa-ct-10-t01-empty-entry-only/README.md) | Split `showComposer` vs `composerEntry`: empty first paint = entry only | Done |
| T02 | [task-spa-ct-10-t02-empty-speech-icon](task-spa-ct-10-t02-empty-speech-icon/README.md) | Artboard B speech-bubble empty icon + lead/helper | Done |
| T03 | [task-spa-ct-10-t03-entry-activate](task-spa-ct-10-t03-entry-activate/README.md) | Entry activate opens composer without always-on empty | Done |
| T04 | [task-spa-ct-10-t04-vitest-empty](task-spa-ct-10-t04-vitest-empty/README.md) | Vitest empty ≠ full composer · Path A + gate | Done |

## Out of scope

Composer icon glyphs (CT-11) · inline reply (CT-12) · invent HTTP/OP PASS · `#/next/feed`

## @mockup handoff

- Mirror: [OP-UX residual §3 G-H1 · G-M1](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)
- Artboard: [M152 §8 / B empty](../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` empty stand · entry only · speech icon · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-10-empty-entry-chrome.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
