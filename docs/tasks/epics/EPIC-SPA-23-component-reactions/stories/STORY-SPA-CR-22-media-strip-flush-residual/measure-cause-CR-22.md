# CR-22 T01 measure cause — media↔strip

> **UTC:** 2026-10-18T12:23:23Z · `#/lab/feed` · card `DOGEstonia-UusVeerenni-002`  
> **Tool:** `spa-app/scripts/tmp-cr22-measure.mjs` · Puppeteer geometry + PNG row sample  
> **Before any T02 CSS change**

## Geometry (desktop 1536×1024 · light)

| Metric | Value |
|--------|-------|
| `strip.top − media.bottom` | **0** |
| `strip.top − img.bottom` | **0** |
| `strip.top − wrap.bottom` | **0** |
| letterbox top/bottom (media − img) | **0 / 0** |
| wrap/media/img height | all **313.875** |
| wrap/media margin+padding | **0** |
| media `aspect-ratio` | `16 / 9` |
| img `object-fit` | `cover` |
| media `border-radius` (in card) | `0` |
| strip `border-top` / `margin-top` | `1px` / `0` |
| nextSibling of media wrap | `feed-post-action-strip` |

## Asset sample (natural 1600×900)

| Row | avg RGB |
|-----|---------|
| y0 (top) | 143,179,188 |
| y810 (~90%) | 146,126,65 |
| y899 (bottom) | 122,133,60 (not white) |

Strip computed `background` = transparent · card surface = `rgb(255, 253, 248)`.

## Cause (fact)

1. **Not** body padding / layout gap — CR-16 full-bleed structure already yields **0px** between media bottom and strip top.  
2. **Not** 16:9 letterbox — img fills media box (`object-fit: cover`, heights equal).  
3. **Not** PNG white footer — bottom row is olive/green, not cream.  
4. **Verified residual contributor:** `.feed-post-media` default **plate background** `rgb(231, 228, 220)` (border-token) can read as a light band at edges / load / subpixel against cream card + transparent strip; OP “white band” aligns with surface contrast, not a measurable layout spacer.

## T02 action (verified cause only)

- In card + detail media hosts: set `.feed-post-media` **background transparent** (remove light plate).  
- Hold flush locks (0 margin/pad · radius 0 · strip margin-top 0).  
- Hold CR-16 chip hover.  
- No invent SVG/HTTP/OP PASS · no asset replace.
