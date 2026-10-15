# CR-08 — `#/lab/feed` M160 theme + stress (structure Present · visual BLOCKED)

> **UTC:** 2026-10-15T19:39:31Z  
> **Package:** `pkg-000144` · EPIC-SPA-23  
> **Code home:** `src/pages/FeedLabPage.*` · `src/features/feed-lab/`  
> **Normative:** OP-UX-MIRROR composition §3.1 · M160 tone  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Stress host | `rm-lab-stress-controls` on `#/lab/feed` · ET/RU/EN × light/dark × 320 × 200% |
| Theme | `setThemeAttribute(theme, document, { persist: false })` — no lab theme localStorage |
| Locale → mount | `makeLabFeedT(locale)` → `FeedPostCard` / `FeedLabReactionsMount` `t` |
| Tokens | feed-lab post/discussion CSS → semantic `--color-*` (hex only as fallbacks) |
| Visual lock | `data-lab-visual-done=false` until OP eye |

## Touchpoints

- `FeedLabPage.jsx` / `.css` — M160 stress chrome + attrs
- `labI18n.js` — `makeT` / `makeLabFeedT`
- `FeedLabReactionsMount.jsx` — locale-aware `t` + remount key
- Pass-down: `FeedPostCard` → discussion → comment nodes
- Tests: `feedLab.cr08.test.jsx`
- Lab verify: `http://127.0.0.1:5173/#/lab/feed`

## OOS

CR-09 strip A+C+B · CR-10 portal · `#/next/feed` · M155 · invent HTTP · invent OP PASS

## Evidence

- Vitest `feedLab.cr08` **5/5** · feed-lab suite green
- Path A shots md5: `ad015abf8b67` · `4a7c0c2e3781` · `0bc91cb67108` · `bb5130b459a5` · `f35877f84316`
- P6: F2 story-root screenshots README CLOSED · F1 OP eye remains WAIVED operator
