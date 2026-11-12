# STORY-SPA-CT-34-comment-attach-preview-residual — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-34-comment-attach-preview-residual.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-34-comment-attach-preview-residual.md)  
> **Status:** P5 APPLY Done · T01–T03 **Done** · gate **BLOCK** · `2026-10-24T10:59:43Z` · `pkg-000227` · activation **none** · Await **P8** · F1/F2 WAIVED · P6 skipped  
> **Package:** `pkg-000227` · component-thread · Interview **M11** · soft CT-31 residual · wave `OP-spa nf25-wave5-20261024`  
> **ui_scope:** thread-mount / CommentAttachmentPreview · **mixed** · Path A arch Present · Partial visual=**BLOCK** · NO BRIEF · no invent PASS  
> **Skill declared:** `react-expert`  
> **Depends:** CT-31 policy A · CT-22 preview host · tip after `pkg-000226`  
> **Runtime:** P5 disposition Present · OP eye Absent → **BLOCK** · Await **P8** · hold policy A · no invent PASS / CDN / policy B

## Purpose

Citizen sees **image preview** for comment attachments (local ready + published) — not sole «Selected image» / «Local preview · not published» text plate · hold CT-31 policy A · Vitest · OP eye.

## L1 — FR (backlog verbatim)

- **FR-CT-34.1** Citizen sees **image preview** for comment attachments (local ready + published) — not sole «Selected image» / «Local preview · not published» text plate.  
- **FR-CT-34.2** Hold CT-31 policy **A** (auth fetch+blob) · honesty when bytes deny.  
- **FR-CT-34.3** Local composer ready files: objectURL / thumb Present.  
- **FR-CT-34.4** Vitest · OP eye — no invent PASS · no invent CDN · no invent policy B/HTTP-09.

## Acceptance Criteria (backlog verbatim)

- [x] Preview image renders (local + published happy path) — structure · visual **BLOCK**  
- [x] Text-only plate gone on happy path — structure · visual **BLOCK**  
- [x] Vitest · OP eye Absent → **BLOCK**  

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-34-comment-attach-preview-residual.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-34-t01-local](task-spa-ct-34-t01-local/README.md) | Local ready thumb/objectURL | Done · BLOCK |
| T02 | [task-spa-ct-34-t02-published](task-spa-ct-34-t02-published/README.md) | Close CT-31 residual published path | Done · BLOCK |
| T03 | [task-spa-ct-34-t03-vitest](task-spa-ct-34-t03-vitest/README.md) | Markers | Done · BLOCK |

**Order:** t01 ‖ t02 → t03

## Out of scope (backlog verbatim)

Comment React UX (CT-35) · invent storage vendor

## DoD (backlog verbatim)

Preview image renders · text-only plate gone on happy path · Vitest · OP eye — no invent PASS · no invent CDN · no invent policy B/HTTP-09.

## @mockup handoff

```text
@mockup: spa-app/docs/architecture/component-thread/34-comment-attach-preview-residual.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave5-2026-10-24/11-comment-attach-selected-image-text.png
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md
@mockup: spa-app/docs/analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md
```
