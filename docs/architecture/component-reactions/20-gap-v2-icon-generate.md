# CR-20 — Gap v2 icon generate (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T12:07:24Z (P3) · P5 APPLY `2026-10-18T12:09:58Z`  
> **Package:** `pkg-000156` · EPIC-SPA-23  
> **Code home:** `public/icons/next-feed/actions/{react,reactions}.svg` · master `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/` · `FeedPostActionStrip` URLs  
> **Normative:** OP-UX-MIRROR-gap-v2-people-media-residual §3 · CR-icon Gap v2→Reuse · ICON #10  
> **Status:** structure **Present** · Gap v2 files **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| `reactions.svg` | NEW dual overlapping circles · viewBox 24 · stroke 2 · `currentColor` |
| `react.svg` | REPLACE thumbs-up outline · not smiley |
| Master → runtime | promote both · master≡runtime SHA |
| Manifest / SHA | icon-system manifest + SHA256SUMS · Gap v2 closed → Reuse |
| Strip wire | `FEED_POST_ACTION_ICON_URLS` both Present |
| Tests | cr17 `existsSync===true` · cr20 · suite Present |
| People / media residual | CR-21 / CR-22 OOS |

## Touchpoints

- `public/icons/next-feed/actions/{react,reactions}.svg`
- `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/{react,reactions}.svg`
- `DOGEstonia-icon-manifest-v1.0.md` · `SHA256SUMS.txt`
- `feed-lab/post/FeedPostActionStrip.{jsx,css}`
- Tests: `reactionsMount.cr17` · `reactionsMount.cr20`
- Lab verify: `#/lab/feed` Reactions zone · no broken img

## OOS

Invent OP PASS · multicolor marks · Lucide · invent people HTTP · CR-21 people affordance · CR-22 media flush · `#/next/feed`

## Evidence

- Vitest reactions-mount+feed-lab **136**/136 · cr20 Present
- SHA `react` `ec4922ba…` · `reactions` `02d35604…`
- Path A shots md5: `41ec692f4c28` · `dc0e5b205e0b` · `f8ece5e9790c` · `cb1aa4b84a11` · `bc732f9da4b4`
- P5: TASKED=0 · F1 WAIVED operator (OP eye) · F2–F4 WAIVED info · activation none
