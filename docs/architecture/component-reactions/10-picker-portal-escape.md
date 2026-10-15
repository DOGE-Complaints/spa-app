# CR-10 — `#/lab/feed` picker portal escape (structure Present · visual BLOCKED)

> **UTC:** 2026-10-15T19:58:06Z  
> **Package:** `pkg-000146` · EPIC-SPA-23  
> **Code home:** `src/features/reactions-mount/`  
> **Normative:** OP-UX-MIRROR composition §3.3 · M154 tone  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Desktop popover | `createPortal` → `document.body` · `data-rm-portal=body` |
| Position | `position: fixed` from zone-1 / `reactions-mount-anchor` rect (`top=bottom+8`) |
| Sheet | `data-rm-portal=inline` · stays in-flow |
| Dismiss | CR-05 outside / Escape / icon-close · exclude strip anchor |
| Card overflow | `FeedPostCard` `overflow:hidden` **kept** (not primary fix) |
| Visual lock | `data-lab-visual-done=false` until OP eye |

## Touchpoints

- `ReactionPicker.jsx` / `.css` — portal + fixed z-index 1200
- `ReactionsMount.jsx` — `measurePopoverPosition` · scroll/resize
- Tests: `reactionsMount.cr10.test.jsx`
- Lab verify: `http://127.0.0.1:5173/#/lab/feed`

## OOS

Theme CR-08 · strip CR-09 · `#/next/feed` · M155 · invent HTTP · invent OP PASS · remove card overflow as sole fix

## Evidence

- Vitest `reactionsMount.cr10` **4/4** · reactions-mount+feed-lab **81**/81
- Path A shots md5: `8f535e1dc9e9` · `dfdb9ea31022` · `8dd280baa239` · `bddfac5ee5f7` · `bddfac5ee5f7`
- Capture meta: `card_overflow=hidden`
