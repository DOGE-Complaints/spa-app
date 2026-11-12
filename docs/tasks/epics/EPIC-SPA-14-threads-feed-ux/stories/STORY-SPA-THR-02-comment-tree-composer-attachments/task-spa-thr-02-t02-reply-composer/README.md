# SPA-THR-02-T02 — Reply composer (placeholder, post, cancel)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../STORY-SPA-THR-02-comment-tree-composer-attachments.md)  
**Decision Ref:** FR-THR-02.3 / FR-THR-02.4 · M144 THR-T-C  
**Depends on:** SPA-THR-02-T01  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T21:00:23Z
**Done:** 2026-09-22T21:05:21Z  
**Package:** `pkg-000078`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.png
```

## Purpose
Root composer placeholder `Write a comment`; reply composer identifies parent (`Replying to …`) with text, attach slot, cancel, post reply. Soft-fail post UI (THR-T-F) may land here or T03 — preserve draft. No invent write HTTP — local soft-fail / Unavailable when Open.

## Risk
Modal detached from parent; invent POST paths; silent draft clear.

## Code Facts (re-verify at execute)
- Existing empty/populated composer slot in `IssueThreadBlock`
- Comment create/reply: **Open** (ADMIN-04)

## AC / DoD
- [x] (P0) Root placeholder Write a comment (FR-THR-02.3)
- [x] (P0) Reply composer: parent context + text + cancel + post (FR-THR-02.4)
- [x] (P0) THR-T-F soft-fail visible recovery preserves draft (or shared with T03)
- [x] (P0) No invent HTTP

## Where to change
- `src/components/threads/` composer components

## Out of scope
Attach chip/denied detail (T03) · icons wiring (T04) · invent HTTP

## Verification
```bash
rg -n 'replyingTo|postReply|issue-thread-composer|keepEditing' spa-app/src/components/threads || true
```
