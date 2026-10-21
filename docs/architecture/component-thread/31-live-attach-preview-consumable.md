# CT-31 — Live attach preview consumable · policy A (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T18:10Z (P5 APPLY)  
> **Package:** `pkg-000195` · EPIC-SPA-24  
> **Code home:** `fetchPublishedAttachmentObjectUrl` · `CommentAttachmentPreview` · `FeedThreadMount` · `#/next/feed`  
> **Normative:** [ARCHITECTURE §17](../../tasks/backlog-stories/component-thread/ARCHITECTURE.md) · policy **A** · HTTP-07/08 Done · **no** HTTP-09 · Path A **code lock**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Symptom | Bearer-required GET · bare `<img src={publishedUrl}>` → 401 |
| **A (locked)** | SPA authenticated `fetch` → blob → objectURL in `CommentAttachmentPreview` |
| **B / HTTP-09** | not chosen · name ≠ create |
| Lifecycle | loading / ready / error honesty · revoke on unmount/change |
| Lab | FixtureAdapter omit `getAccessToken` · bare/local CT-22 path held |
| Host | `FeedThreadMount` → `getThreadsAccessToken` → `ThreadMount.getAccessToken` · `data-feed-ct31` |

## Touchpoints

- `attachments/fetchPublishedAttachmentObjectUrl.js` · `CommentAttachmentPreview.jsx` · `ThreadMount` / tree wire · `FeedThreadMount.jsx`
- Tests: `threadMount.ct31` · `feed.ct31` · CT-22 Lab bare path held · Path A `scripts/tmp-ct31-capture.mjs`

## OOS

Invent CDN · invent gateway proxy · invent B / HTTP-09 · invent OP PASS · `#/board` Done · mutate Lab Fixture · NF-17 chrome

## Evidence

- Path A shots 01–05 Present · CAPTURE-META `fails: []` · `visual_gate: BLOCK`
- vitest feed+feed-lab+thread-mount+reactions-mount+repositories+i18n **604/604** · ct31 **6/6** · feed.ct31 **1/1**
- P5: F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none`
