# STORY-SPA-CT-22 — Comment attachment preview (+ `.md` family)

## Meta

- **Key:** `STORY-SPA-CT-22-comment-attachment-preview`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §13.2](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P1.3 activated · gate PENDING · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-22-comment-attachment-preview/STORY-SPA-CT-22-comment-attachment-preview.md) · `pkg-000180` · `2026-10-20T14:58:07Z`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-05 · CT-17 · CT-19
- **Blocks:** OP eye «yyy» image after Attach+Post
- **Interview:** [INTERVIEW-CT-21-plus…](INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md) B5 · B6
- **Artboard:** M153 / M153a continuity for AttachmentRef · node preview chrome Await OP eye vs existing tokens (no invent new M-number)

## Зачем

AS-IS: Attach+Post keeps chip only in composer; `CommentNode` shows `body` only; FeedLab comment object omits attachments. OP: show attachment in the posted comment — **local preview** if no published URL; all allow-list types + **`.md`**.

## L1 — FR

- **FR-CT-22.1** On successful post/reply, comment model carries attachment intents (at least lab/fixture path) — not body-only.  
- **FR-CT-22.2** `CommentNode` renders attachments for the node: image → visual preview; non-image allow-list → honest file/type cue (name/kind) without inventing gallery.  
- **FR-CT-22.3** If published media URL Absent: use **local** preview (object URL / retained local intent) with honesty that it is not published.  
- **FR-CT-22.4** If published URL Present: prefer it for display; still no false «uploaded» claims beyond what data confirms.  
- **FR-CT-22.5** Allow-list families extend with **Markdown `.md`** (family hook + extension; exact MIME TBD — no invent full MIME table).  
- **FR-CT-22.6** Denied intents are not shown as successful media in the node (composer Denied stays composer-side).  
- **FR-CT-22.7** Vitest / lab: post with image → node shows preview; `.md` accepted as allow-list family.

## Вне scope

Invent upload/bind HTTP · invent CDN · invent gallery lightbox product · Share · preview budget (CT-21) · invent MIME beyond family+`.md`

## L1 — Acceptance Criteria

- [ ] Lab Attach image + Post → comment «yyy»-class node shows image preview  
- [ ] Local preview when no published URL · honesty Present  
- [ ] PDF/Office/`.md` show type-honest cue in node  
- [ ] `.md` in allow-list hook  
- [ ] Vitest coverage  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§13.2](ARCHITECTURE.md) · P1.3 APPLY `2026-10-20T14:58:07Z`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-22-t01-persist-intents` | Todo | Persist attachment intents on post into comment model (lab host) | FeedLabThreadMount · ThreadMount | 22.1 |
| `task-spa-ct-22-t02-md-family` | Todo | Add `.md` to family allow-list hook | `threadMountConfig.js` | 22.5 |
| `task-spa-ct-22-t03-node-preview` | Todo | Render image/local + non-image cues in CommentNode | CommentNode.jsx · CSS | 22.2–22.4 · 22.6 |
| `task-spa-ct-22-t04-revoke-lifecycle` | Todo | Safe object URL lifecycle (create/revoke) · no leak | CommentNode / host | 22.3 |
| `task-spa-ct-22-t05-vitest` | Todo | Image preview + md allow + honesty | `__tests__` | 22.7 |

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Posted comments show attachment previews (local-first) including `.md` family; «yyy» image case closed in lab.
