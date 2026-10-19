# CT-11 — Composer icon chrome (structure Present · visual BLOCKED)

> **UTC:** 2026-10-19T12:15:05Z (P3) · P5 disposition `2026-10-19T12:18:01Z`  
> **Package:** `pkg-000169` · EPIC-SPA-24  
> **Code home:** `thread-mount/composer/ThreadComposer`  
> **Normative:** OP-UX residual §3 G-H2 · G-H6 · M152-B · M153 C/D  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Attach | paperclip via Present `/icons/next-feed/actions/attach.svg` · left / discoverable |
| Empty/first-send | yellow **circular** send · `send.svg` · `sendChrome=circle` when `status=empty` |
| Root/reply Post | labelled **Post comment** / **Post reply** + plane · `sendChrome=labelled` |
| Layout | Attach left · Post primary right |
| Markers | `data-lab-ct11` · `data-tm-send-chrome` · `tm-composer-attach-icon` · `tm-composer-send-icon` |

## Touchpoints

- `thread-mount/composer/{ThreadComposer}.{jsx,css}` · `ThreadMount` `sendChrome` wire
- Tests: `threadMount.ct11`

## OOS

Invent OP PASS · invent SVG bodies / emoji / Lucide · invent upload HTTP · inline reply (CT-12) · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **128**/128 · ct11 Present
- Path A shots 01–05 Present (story-root `screenshots/full-cycle/`)
