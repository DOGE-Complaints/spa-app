# CT-30 — Live ThreadMount attachment upload + tree map (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T13:13Z (P5 APPLY)  
> **Package:** `pkg-000193` · EPIC-SPA-24  
> **Code home:** `ThreadsSocialClient.uploadAttachment` · `LiveAdapter` · `mapThreadTreeToBlock` · `FeedThreadMount` · `#/next/feed`  
> **Normative:** [ARCHITECTURE §16](../../tasks/backlog-stories/component-thread/ARCHITECTURE.md) · HTTP-07/08 Done · Path A **code lock**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Upload | `uploadAttachment` → locked `POST /threads/issues/{issue_id}/attachments` multipart (`file` + `comment_id`) |
| Live post | After create/reply ok → upload Ready Files · soft-fail attach (body success held) |
| Tree map | `publishedUrl` ← `published_url` · null honesty · no invent CDN |
| Prefer | upload over synthetic `attachRef`-only for Live Ready files |
| Lab | FixtureAdapter unchanged · no `uploadAttachment` |
| Host | `commentWriteOwner=host` · `data-feed-ct30` · reload after upload |

## Touchpoints

- `ThreadsSocialClient.js` · `LiveAdapter.js` · `mapThreadTreeToBlock.js` · `FeedThreadMount.jsx`
- Tests: `feed.ct30` · `feedLab.ct30` · client/mapper · Path A `scripts/tmp-ct30-capture.mjs`

## OOS

Invent storage vendor · invent gateway proxy · invent CDN · invent OP PASS · `#/board` Done · mutate Lab Fixture · NF-13…16

## Evidence

- Path A shots 01–05 Present · CAPTURE-META `fails: []` · `visual_gate: BLOCK`
- vitest feed+feed-lab+thread-mount+reactions-mount+repositories+i18n **595/595** · feed.ct30 **2/2** · feedLab.ct30 **2/2**
- P5: F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none`
