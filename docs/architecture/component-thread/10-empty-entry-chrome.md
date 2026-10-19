# CT-10 — Empty entry-only + speech icon (structure Present · visual BLOCKED)

> **UTC:** 2026-10-19T12:04:28Z (P3) · P5 disposition `2026-10-19T12:08:08Z`  
> **Package:** `pkg-000168` · EPIC-SPA-24  
> **Code home:** `thread-mount/ThreadMount` · `IssueThreadBlock` empty panel  
> **Normative:** OP-UX residual §3 G-H1 · G-M1 · M152 §8 / artboard B  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Empty first paint | `emptyEntry` · `Write a comment` pill · **not** full `ThreadComposer` |
| showComposer | `writeAllowed && expanded` only (no always-on empty composer) |
| Speech icon | `tm-thread-empty-icon` · `/icons/next-feed/actions/comment.svg` · lead/helper held |
| Entry activate | expands → composer opens · entry leaves first-paint path |
| Lab stand B | `initiallyExpanded: false` for entry-only Path A |
| Markers | `data-lab-ct10` · `data-tm-empty-entry` · `data-tm-composer-open` |

## Touchpoints

- `thread-mount/{ThreadMount,IssueThreadBlock}.{jsx,css}`
- `feed-lab/post/thread/FeedLabThreadMount.jsx` · `fixtures/labCt08Stands.js`
- Tests: `threadMount.ct10`

## OOS

Invent OP PASS · invent HTTP · composer icon glyphs (CT-11) · inline reply (CT-12) · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **123**/123 · ct10 Present
- Path A shots 01–05 Present (story-root `screenshots/full-cycle/`)
