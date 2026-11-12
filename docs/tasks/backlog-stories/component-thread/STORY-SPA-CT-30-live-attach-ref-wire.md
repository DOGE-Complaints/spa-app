# STORY-SPA-CT-30 — Live ThreadMount attachment upload + tree map

## Meta

- **Key:** `STORY-SPA-CT-30-live-attach-ref-wire`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §16](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY Done · gate **BLOCK** · `pkg-000193` · Await **P8** · deps HTTP-08 + HTTP-07 **Done** · TASKED=0

- **Parent:** spa REQ-17 · threads [REQ-05](../../../../../doge-threads/docs/requirements/05-comment-attachment-refs-in-tree-read.md) (expanded · bytes)
- **Depends on:** CT-17/19/22/25 Present · CT-28 Live Present · **THREADS-HTTP-08** · **THREADS-HTTP-07**
- **Interview:** [INTERVIEW-NF-13-plus…](../next-feed/INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) **M5** · **W2 superseded** (blob in REQ-05)
- **Code home:** `LiveAdapter.js` · `ThreadsSocialClient.uploadAttachment` · `mapThreadTreeToBlock.js` · `CommentAttachmentPreview` · `ThreadMount.jsx`

## Зачем

Composer accepts files; Live post drops them; no blob route → after submit file vanishes. Wire **upload bytes** then map tree `attachments[].published_url` into CT-22 preview.

**Supersedes** earlier CT-30 draft that OOS’d blob / attachRef-only.

## Locked API / client names (REQ-05 §3)

| SPA | HTTP |
|-----|------|
| `ThreadsSocialClient.uploadAttachment({ issueId, commentId, file, mediaType? })` | `POST /threads/issues/{issue_id}/attachments` (multipart `file` + `comment_id`) |
| `ThreadsSocialClient.attachRef(…)` | `POST …/attachment-refs` — keep for non-byte / seed; **not** primary Live path |
| Tree load (existing) | `GET /threads/issues/{issue_id}` → `comments[].attachments[]` |

## L1 — FR

- **FR-CT-30.1** After successful create/reply, LiveAdapter calls **`uploadAttachment`** for each Ready attachment intent (File), using returned `comment_id`.  
- **FR-CT-30.2** Client method hits exact path `POST /threads/issues/{issue_id}/attachments` (multipart) — no invent alternate upload URL.  
- **FR-CT-30.3** `mapThreadTreeToBlock` maps `attachments[]` → comment model for CT-22 (`publishedUrl` ← `published_url`).  
- **FR-CT-30.4** When `published_url` is null: CT-22 honesty / type cue — **not** invent CDN.  
- **FR-CT-30.5** Floor/deny errors: soft-fail attach without wiping comment body success.  
- **FR-CT-30.6** Lab FixtureAdapter path unchanged.  
- **FR-CT-30.7** Vitest: LiveAdapter calls `uploadAttachment` · mapper includes attachments when tree has them.  
- **FR-CT-30.8** Supersedes CT-28.6 / prior CT-30 «no invent upload» for this Closed upload path.  
- **FR-CT-30.9** Prefer upload over synthetic `attachRef`-only for Live `#/next/feed` Ready files.

## Вне scope

Invent storage vendor · invent gateway proxy · NF-13…16 · invent OP PASS · `#/board` as Done claim · changing HTTP path names

## L1 — Acceptance Criteria

- [x] Live post Ready files use `uploadAttachment` → locked POST path  
- [x] Tree map surfaces `published_url` to CommentAttachmentPreview  
- [x] Honesty when url null  
- [x] Lab held  
- [x] Vitest  
- [ ] OP eye on `#/next/feed` after HTTP-08 + HTTP-07 + Apply

## L2 — Technical subtasks

> Skill: `react-expert` · soft client types · **blocked** until HTTP-08 route + HTTP-07 tree shape locked

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-30-t01-client-upload` | Done | Add `uploadAttachment` multipart client | ThreadsSocialClient.js | 30.2 |
| `task-spa-ct-30-t02-live-upload` | Done | postComment ok → upload Ready Files | LiveAdapter.js | 30.1 · 30.5 · 30.9 |
| `task-spa-ct-30-t03-map-tree` | Done | Map `attachments` → comment.attachments / publishedUrl | mapThreadTreeToBlock.js | 30.3 · 30.4 |
| `task-spa-ct-30-t04-host-merge` | Done | Reload / optimistic honesty with host owner | ThreadMount · FeedThreadMount | 30.4 |
| `task-spa-ct-30-t05-vitest` | Done | upload + mapper tests | `__tests__` | 30.6 · 30.7 |

### Order

HTTP-08 → HTTP-07 → `t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Posted comment with Ready attach maps `published_url` after reload on Live next/feed (vendor behind threads remains Open).

> **E2E residual (2026-10-21):** bare `<img src={publishedUrl}>` vs Bearer GET → **Gap** — follow-up [CT-31](STORY-SPA-CT-31-live-attach-preview-consumable.md) (supersedes this DoD for painted preview).
