# STORY-SPA-CT-33-composer-dark-residual — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-33-composer-dark-residual.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-33-composer-dark-residual.md)  
> **Status:** P8 local close · T01–T04 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-22T14:53:58Z` · tip · `activation: none`  
> **Package:** `pkg-000207` · component-thread · Interview **T5–6** · ARCHITECTURE **§19** · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `thread-mount` / composer · soft CommentAttachmentPreview · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CT-32 structure Present (Partial eye leftover) · tip after `pkg-000206` NF-23 P8  
> **Runtime:** textarea/attach/post themed · ShellChromeIcon Attach · vitest · Path A shots · no invent OP PASS · no invent CDN

## Purpose

Composer textarea / AttachmentRef / Post label / Attach control still hardcode light fills after CT-32. Need theme-safe dark residual · light held · Vitest · OP eye.

## L1 — FR (backlog verbatim)

- **FR-CT-33.1** Composer textarea background + typed text contrast readable in dark (no white field + white text).  
- **FR-CT-33.2** Attachment chips / “Selected image” / local preview plates theme-safe (no fixed cream `#fffdf8` as only fill).  
- **FR-CT-33.3** Post button label contrast: dark text on accent (icon already black) — readable.  
- **FR-CT-33.4** Attach control readable on dark (not lost into background).  
- **FR-CT-33.5** Light theme held.  
- **FR-CT-33.6** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Dark composer text visible (structure)  
- [x] Attach plates themed (structure)  
- [x] Post label + Attach readable (structure)  
- [ ] Light held · Vitest · OP eye — Vitest green · OP Absent → **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-33-composer-dark-residual.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-33-t01-textarea](task-spa-ct-33-t01-textarea/README.md) | Tokenize composer input colors | **Done** |
| T02 | [task-spa-ct-33-t02-attach](task-spa-ct-33-t02-attach/README.md) | AttachmentRef / preview fills | **Done** |
| T03 | [task-spa-ct-33-t03-post](task-spa-ct-33-t03-post/README.md) | Post label contrast | **Done** |
| T04 | [task-spa-ct-33-t04-vitest](task-spa-ct-33-t04-vitest/README.md) | Markers | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

CR-24 React · invent CDN · CT-31 policy

## DoD (backlog verbatim)

Dark composer text visible · Attach plates themed · Post label + Attach readable · Light held · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **T5–6** · [ARCHITECTURE §19](../../../../backlog-stories/component-thread/ARCHITECTURE.md) · wave3 evidence · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-composer-dark-residual.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
