# STORY-SPA-NF-18-strip-react-density-residual — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-18-strip-react-density-residual.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-18-strip-react-density-residual.md)  
> **Status:** P5 APPLY Done · structure **Present** · gate **BLOCK** · `2026-10-21T19:24:36Z` · tip · activation **none** · Await **P8** · P6 not needed  
> **Package:** `pkg-000196` · next-feed · REQ-22 · M162 soft · ARCH-DELTA §6  
> **ui_scope:** `feed` · soft `reactions-mount` · **mixed** · Path A M162 soft · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** NF-17 structure Present · soft NF-15 unframe · **CR-23 host held**  
> **Runtime:** T01–T04 **Done** · vitest **542/542** · shots 01–05 Present · no invent OP PASS

## Purpose

After NF-17 OP still sees **double gray underlay** around React and glyphs too small vs Comment/Share. Flatten React chrome · tip glyphs **28** · single pad stack.

## L1 — FR (backlog verbatim)

- **FR-NF-18.1** React control on civic strip has **one** chrome layer — no nested gray pad/hover vs Comment/Share (flatten react-slot wrapper or neutralize inner/outer double background).  
- **FR-NF-18.2** Primary action glyphs tip **28×28 CSS px** (Comment/Share/React) · touch min-height **≥44** held.  
- **FR-NF-18.3** Single pad stack on React path (no 4×8 on both wrapper and `.rm-summary-strip__react`).  
- **FR-NF-18.4** Four-zone grammar + CR-23 Live host held · no picker redesign.  
- **FR-NF-18.5** Focus / pressed / selected remain visible.  
- **FR-NF-18.6** Vitest / CSS markers · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] No double gray underlay on React vs Comment/Share  
- [x] Glyphs tip ≥ 28 CSS px · touch ≥44  
- [x] Single pad level on React path  
- [x] CR-23 / four-zone held  
- [x] Focus chrome held  
- [x] Vitest / markers  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-18-strip-react-density-residual.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-18-t01-flatten-react](task-spa-nf-18-t01-flatten-react/README.md) | Remove nested gray pad/hover on react-slot | **Done** |
| T02 | [task-spa-nf-18-t02-icons-28](task-spa-nf-18-t02-icons-28/README.md) | Primary glyphs 28 · align CrReactionIcon size | **Done** |
| T03 | [task-spa-nf-18-t03-pad-stack](task-spa-nf-18-t03-pad-stack/README.md) | One pad level · mh ≥44 | **Done** |
| T04 | [task-spa-nf-18-t04-vitest](task-spa-nf-18-t04-vitest/README.md) | Markers / honesty | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Map (NF-19/20) · dark theme (NS-07 / CT-32) · CT-31 · invent OP PASS · reopen NF-17 structure Done · picker redesign

## DoD (backlog verbatim)

Civic strip React chrome matches Comment/Share flatness; glyphs tip 28; NF-17 structure held; no invent OP PASS.

## @mockup handoff

- Continuity: [M162](../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · [M162 PNG](../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.png) · [ARCH-DELTA §6](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · evidence [`01-react-double-underlay.png`](../../../../analysis/evidence/op-residual-wave2-2026-10-21/01-react-double-underlay.png)
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-strip-react-density-residual.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
