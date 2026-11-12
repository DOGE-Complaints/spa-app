# STORY-SPA-CT-17-attachment-picker-path — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-17-attachment-picker-path.md)  
> **Status:** P6 T06 Done · gate **BLOCK** · `2026-10-20T12:08:05Z` · tip active · `run_mode=spa_ct17_p5_gap`  
> **Package:** `pkg-000175` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A M153a v1.1 · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-05 · CT-11 · CT-16  
> **Runtime:** P6 T06 Done · Await **P7/P8** · F1 OP eye held · no invent MIME/HTTP/OP PASS · NO BRIEF

## Purpose

Lab attach residual path: clean composer (zero chips) → native file picker only → local Ready/Denied `AttachmentRef` from real selection · family allow-list hook · omit Attach when unavailable · honesty local intent only. Does **not** invent M153a §18 MIME / denied-submit / upload-bind gates.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-17-t01-native-picker](task-spa-ct-17-t01-native-picker/README.md) | Wire Attach → native file input; remove synthetic seed path | **Done** |
| T02 | [task-spa-ct-17-t02-family-hook](task-spa-ct-17-t02-family-hook/README.md) | Family allow-list hook (images/PDF/Office) · MIME TBD placeholder | **Done** |
| T03 | [task-spa-ct-17-t03-ready-denied-from-pick](task-spa-ct-17-t03-ready-denied-from-pick/README.md) | Map selection → local Ready/Denied AttachmentRef + Remove | **Done** |
| T04 | [task-spa-ct-17-t04-attach-off](task-spa-ct-17-t04-attach-off/README.md) | Omit Attach when unavailable · no fake Denied | **Done** |
| T05 | [task-spa-ct-17-t05-vitest-picker](task-spa-ct-17-t05-vitest-picker/README.md) | Assert zero chips · picker present · no synthetic-only Ready | **Done** |
| T06 | [task-spa-ct-17-t06-screenshots-root-readme](task-spa-ct-17-t06-screenshots-root-readme/README.md) | Audit F2 story-root `screenshots/README.md` indexer | **Done** |

## Out of scope

Invent exact MIME/extensions · invent upload/bind HTTP · custom file manager · invent denied-submit product policy · chip paint tokens (CT-19) · dual-append (CT-16) · HOLD reactions · `#/next/feed`

## @mockup handoff

- Artboard: [M153a v1.1](../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md)
- Mirror: [OP-UX M153a/b gaps](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- Verify: `#/lab/feed` · panels A–F interaction · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-17-attachment-picker-path.md) · **BLOCK**
- Shots: [screenshots/README.md](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md) · md5 `3bda8d25590c` · `d839842d56f8` · `1895b4e24676` · `6b2c0f49d9d4` · `876f9a920fd3`
- Arch: [`docs/architecture/component-thread/17-attachment-picker-path.md`](../../../../../architecture/component-thread/17-attachment-picker-path.md)
- NO STORY-UX-MOCKUP-BRIEF
