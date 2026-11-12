# STORY-SPA-CT-19-attachment-ref-token-paint — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md)  
> **Status:** P6 T05 Done · gate **BLOCK** (OP eye Absent) · `2026-10-20T12:43:47Z` · `run_mode=spa_ct19_p5_gap`  
> **Package:** `pkg-000177` · component-thread · REQ-22 FR-22.4 · **unchanged**  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A M153b §7 + M153a v1.1 C–E · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-05 · CT-17 · soft CT-18  
> **Runtime:** P6 T05 Done · F2 CLOSED · Await **P7/P8** · F1 WAIVED operator held · no invent MIME/HTTP/OP PASS

## Purpose

Implement AttachmentRef Ready/Denied **paint + copy** after CT-17 picker origin. Reject green Ready / pink-red Denied wash. Paint SSOT = M153b §7; panels/copy = M153a v1.1 C–E.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-19-t01-ready-tokens](task-spa-ct-19-t01-ready-tokens/README.md) | Apply Ready chip tokens + `Ready to post` | **Done** |
| T02 | [task-spa-ct-19-t02-denied-tokens](task-spa-ct-19-t02-denied-tokens/README.md) | Apply Denied fill/border/title · no wash | **Done** |
| T03 | [task-spa-ct-19-t03-copy-honesty](task-spa-ct-19-t03-copy-honesty/README.md) | D/E copy + honesty + Remove accent | **Done** |
| T04 | [task-spa-ct-19-t04-style-audit](task-spa-ct-19-t04-style-audit/README.md) | computedStyle / visual assert vs M153b §7 | **Done** |
| T05 | [task-spa-ct-19-t05-screenshots-root-readme](task-spa-ct-19-t05-screenshots-root-readme/README.md) | Audit F2 story-root `screenshots/README.md` indexer | **Done** |

## Out of scope

Picker behavior (CT-17) · invent MIME · invent publish/upload claims · dual-append · HOLD reactions · A–D bubble/spine (CT-18) · `#/next/feed`

## @mockup handoff

- Artboard paint SSOT: [M153b v1.0 §7](../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md)
- Panels/copy: [M153a v1.1 C–E](../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md)
- Mirror: [OP-UX M153a/b gaps](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- Verify: `#/lab/feed` · Ready/Denied chips · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-19-attachment-ref-token-paint.md) · **BLOCK** (OP Absent)
- Shots: [visual-checklists](./visual-checklists-attachment-ref-token-paint.md) · [screenshots/README.md](./screenshots/README.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- Disposition: [p5-disposition-STORY-SPA-CT-19-2026-10-20.md](../../../../analysis/p5-disposition-STORY-SPA-CT-19-2026-10-20.md)
- NO STORY-UX-MOCKUP-BRIEF
