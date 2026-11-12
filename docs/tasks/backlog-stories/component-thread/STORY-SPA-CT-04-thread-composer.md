# STORY-SPA-CT-04 — ThreadComposer · draft · fail · mobile (M153 C/F/G)

## Meta

- **Key:** `STORY-SPA-CT-04-thread-composer`
- **Package:** [component-thread](INDEX.md)
- **Status:** P3 structure Done · gate **BLOCK** · tip · `pkg-000162` · `2026-10-18T13:30:17Z` · Await P4
- **Depends on:** CT-03
- **Pipeline:** [STORY-SPA-CT-04-thread-composer](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-04-thread-composer/STORY-SPA-CT-04-thread-composer.md)
- **UX mirror:** §4.2 T-C/T-root/T-draft/T-F/T-G
- **Arch:** §4 composer · §6 state ownership

## FR

- **FR-CT-04.1** Root mode: Write a comment / Post comment.  
- **FR-CT-04.2** Reply mode: Replying to this comment · parent excerpt · Cancel reply.  
- **FR-CT-04.3** Draft survives cancel/target switch rules · no silent destroy.  
- **FR-CT-04.4** Post fail F: inline error · draft+target kept · Try again / Keep editing.  
- **FR-CT-04.5** No optimistic permanent comment before confirmed success.  
- **FR-CT-04.6** Mobile G: composer above keyboard · context retained · 390.  
- **FR-CT-04.7** Focus moves to composer on Reply · Cancel returns focus.

## Вне scope

Attachments (CT-05) · verify gate (CT-07) · invent HTTP

## Acceptance Criteria

- [ ] Reply context + draft fixture  
- [ ] Fail F recoverable  
- [ ] Vitest draft survival  
- [ ] OP eye / mobile stress  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-04-t01-thread-composer` | Todo | Root/reply UI · excerpt · Cancel · Post | `composer/ThreadComposer.jsx` | 04.1–04.2 · 04.7 |
| `task-spa-ct-04-t02-draft-state` | Todo | Draft+target state machine · no silent clear | ThreadComposer / ThreadMount | 04.3 · 04.5 |
| `task-spa-ct-04-t03-post-fail` | Todo | Inline F chrome · retry/keep | ThreadComposer | 04.4 |
| `task-spa-ct-04-t04-mobile-keyboard` | Todo | Lab/detail sticky composer chrome for keyboard | CSS · lab sheet | 04.6 |
| `task-spa-ct-04-t05-vitest-composer` | Todo | Modes · fail · focus | tests | AC |

## DoD

Composer matches M153 C/F/G without invent write APIs beyond fixture adapter.
