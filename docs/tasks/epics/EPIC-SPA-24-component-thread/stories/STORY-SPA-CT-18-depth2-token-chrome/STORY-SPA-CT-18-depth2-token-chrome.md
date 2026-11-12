# STORY-SPA-CT-18-depth2-token-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-18-depth2-token-chrome.md)  
> **Status:** P6 T06 Done · gate **BLOCK** · `2026-10-20T12:27:40Z` · tip active · `run_mode=spa_ct18_p5_gap`  
> **Package:** `pkg-000176` · component-thread · REQ-22 FR-22.4 · **unchanged**  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A M153b A–D · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-13 · CT-14  
> **Runtime:** P6 T06 Done · Await **P7/P8** · F1 OP eye held · no invent hex/OP PASS · NO BRIEF

## Purpose

Re-target Depth 2.0 visual tokens A–D (bubble, spine/L-elbow, React/Reply ≥44px shared group, selected reply parent) to M153b §§3–6 · §8. CT-13/CT-14 structure Present; AS-IS lab chrome superseded. Implement sizes in **px**, not rem-as-16.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-18-t01-bubble](task-spa-ct-18-t01-bubble/README.md) | Apply M153b §3 bubble tokens in px | **Done** |
| T02 | [task-spa-ct-18-t02-spine](task-spa-ct-18-t02-spine/README.md) | Apply M153b §4 spine / L-elbow | **Done** |
| T03 | [task-spa-ct-18-t03-pills-44](task-spa-ct-18-t03-pills-44/README.md) | Shared React/Reply group ≥44px · locked palette | **Done** |
| T04 | [task-spa-ct-18-t04-reply-parent](task-spa-ct-18-t04-reply-parent/README.md) | Selected reply parent marker §6 | **Done** |
| T05 | [task-spa-ct-18-t05-depth2-audit](task-spa-ct-18-t05-depth2-audit/README.md) | Re-run Depth 2.0 computedStyle A–D PASS | **Done** |
| T06 | [task-spa-ct-18-t06-screenshots-root-readme](task-spa-ct-18-t06-screenshots-root-readme/README.md) | Audit F2 story-root `screenshots/README.md` indexer | **Done** |

## Out of scope

Attach picker (CT-17) · AttachmentRef Ready/Denied paint (CT-19 · §7) · dual-append (CT-16) · comment reaction summary HOLD · invent hex outside M153b · `#/next/feed`

## @mockup handoff

- Artboard: [M153b v1.0 §§3–6 · §8](../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md)
- Mirror: [OP-UX M153a/b gaps](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- Verify: `#/lab/feed` · Depth 2.0 A–D · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-18-depth2-token-chrome.md) · **BLOCK** (OP Absent)
- Shots: [screenshots/README.md](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md) · md5 `038c0c15b72e` · `923915bee67c` · `7dc35d9bd31d` · `4cb87448f3e3` · `133ecf58c616`
- Disposition: [p5-disposition-STORY-SPA-CT-18-2026-10-20.md](../../../../analysis/p5-disposition-STORY-SPA-CT-18-2026-10-20.md) · F2 CLOSED
- NO STORY-UX-MOCKUP-BRIEF
