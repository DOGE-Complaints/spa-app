# Threads feed mockups (SSOT)

> **Package intake:** [`docs/tasks/backlog-stories/threads-feed/`](../../tasks/backlog-stories/threads-feed/INDEX.md)  
> **Product lock:** [PRODUCT-BRIEF.md](../../tasks/backlog-stories/threads-feed/PRODUCT-BRIEF.md)  
> **UX prompts:** [UX-PROMPTS.md](../../tasks/backlog-stories/threads-feed/UX-PROMPTS.md)  
> **ADMIN-THR-02:** specs + PNG landed here as **M143–M148** (operator UX chat 2026-09-22). Do **not** rewrite [M132](../home/mockup-132-public-board-home-feed-state-sheet-spec.md).

## Canon routes

| Label / control | Target |
|-----------------|--------|
| Feed post slot | `/board` — primary product placement (D30 / AC-SPA-THR-04) |
| Issue detail + shared thread | `/issue/:id` — page not deleted (AC-SPA-THR-02) |
| Verify handoff | existing `/verify` + return to post/detail |
| PH chrome | reuse public-home header/footer/nav — out of this package |

## Mockup index

| Mockup | Artboard | Future story | Spec | PNG |
|--------|----------|--------------|------|-----|
| M143 | THR-P BoardIssuePost feed slot | THR-01 | [mockup-143-…-spec.md](mockup-143-board-issue-post-feed-slot-state-sheet-spec.md) | [mockup-143-…-spec.png](mockup-143-board-issue-post-feed-slot-state-sheet-spec.png) |
| M144 | THR-T Comment tree + composer + attachments | THR-02 | [mockup-144-…-spec.md](mockup-144-comment-tree-composer-attachments-state-sheet-spec.md) | [mockup-144-…-spec.png](mockup-144-comment-tree-composer-attachments-state-sheet-spec.png) |
| M145 | THR-R reactions.v1 strip + picker | THR-03 | [mockup-145-…-spec.md](mockup-145-reactions-v1-strip-picker-state-sheet-spec.md) | [mockup-145-…-spec.png](mockup-145-reactions-v1-strip-picker-state-sheet-spec.png) |
| M146 | THR-E Collaboration invitation stub | THR-04 | [mockup-146-…-spec.md](mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md) | [mockup-146-…-spec.png](mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.png) |
| M147 | THR-V Verify-before-write gate | THR-05 | [mockup-147-…-spec.md](mockup-147-verify-before-write-gate-state-sheet-spec.md) | [mockup-147-…-spec.png](mockup-147-verify-before-write-gate-state-sheet-spec.png) |
| M148 | THR-I Issue page shared thread mount | THR-01 | [mockup-148-…-spec.md](mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md) | [mockup-148-…-spec.png](mockup-148-issue-page-shared-thread-mount-state-sheet-spec.png) |

PNG basename = spec without `.md`. Spec markdown is Active SSOT for states/copy/locks; PNG is visual reference.

## Projected testids

- `board-issue-post` — outer feed-slot wrapper (M143)
- `issue-thread-block` — shared thread shell (M143 / M148)

## Stories

- [THR-01](../../tasks/backlog-stories/threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md) · [THR-02](../../tasks/backlog-stories/threads-feed/STORY-SPA-THR-02-comment-tree-composer-attachments.md) · [THR-03](../../tasks/backlog-stories/threads-feed/STORY-SPA-THR-03-reactions-v1-picker.md) · [THR-04](../../tasks/backlog-stories/threads-feed/STORY-SPA-THR-04-escalation-stub.md) · [THR-05](../../tasks/backlog-stories/threads-feed/STORY-SPA-THR-05-verify-write-gate.md)
