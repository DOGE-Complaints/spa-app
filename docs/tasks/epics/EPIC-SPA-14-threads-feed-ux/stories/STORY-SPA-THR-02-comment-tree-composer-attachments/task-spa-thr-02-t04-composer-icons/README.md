# SPA-THR-02-T04 — Wire §Иконки paths (reply/attach/remove/retry)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../STORY-SPA-THR-02-comment-tree-composer-attachments.md)  
**Decision Ref:** story §Иконки · M144  
**Depends on:** SPA-THR-02-T01…T03  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T21:00:23Z
**Done:** 2026-09-22T21:05:21Z  
**Package:** `pkg-000078`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.png
```

## Purpose
Wire Runtime `<img src>` paths from story §Иконки (reply/attach/remove/react/doc chip/retry/warning). Do not show `ic-*` filenames to resident. Assets ON DISK.

## Risk
Broken paths; Facebook assets; inventing new icon files.

## Code Facts (re-verify at execute)
- `public/icons/threads-feed/ic-{reply,attach,remove-attachment,react}.png` ON DISK
- `public/icons/story-handoff/ic-{doc-new,auto-resubmit,warning-triangle,info}.png` ON DISK

## AC / DoD
- [x] (P0) All §Иконки Runtime paths used where affordances exist
- [x] (P0) No `ic-*` literal filenames in visible resident copy
- [x] (P0) No new invent icon assets this task

## Where to change
- Thread/composer JSX img src attributes

## Out of scope
L10N (T05) · invent HTTP

## Verification
```bash
rg -n 'ic-reply|ic-attach|ic-remove-attachment|ic-doc-new|ic-auto-resubmit|ic-warning-triangle' spa-app/src/components/threads
ls spa-app/public/icons/threads-feed/ spa-app/public/icons/story-handoff/ic-doc-new.png spa-app/public/icons/story-handoff/ic-auto-resubmit.png spa-app/public/icons/story-handoff/ic-warning-triangle.png
```
