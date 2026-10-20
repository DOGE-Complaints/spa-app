# CT-19 — AttachmentRef Ready/Denied paint (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T12:43Z (P6 T05)  
> **Package:** `pkg-000177` · EPIC-SPA-24  
> **Code home:** `AttachmentRef` · `threadMountConfig` · `FixtureAdapter` · lab stand O  
> **Normative:** M153b §7 · M153a v1.1 C–E · OP-UX M153a/b CT-19  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Ready | Status/title `Ready to post` · tokens per M153b §7 · **no** green Ready wash |
| Denied fill | `#F7F6F2` · border 1px `#B54708` · title `#B54708` 600 · **no** pink/red wash |
| D type copy | Generic reject + allow-family helper · `denyReason=type` |
| E safety copy | Safety sentence only when safety decision known · `denyReason=safety` |
| Remove | Accent chrome `#B54708` · local-only |
| Honesty | Local intent · never published (when sheet requires) |

## Touchpoints

- `composer/AttachmentRef.css` · `AttachmentRef.jsx` · `config/threadMountConfig.js` · `adapters/FixtureAdapter.js` · lab stand O
- Tests: `threadMount.ct19` · Path A `scripts/tmp-ct19-capture.mjs`

## OOS

Invent MIME/extensions · invent publish/upload HTTP · invent OP PASS · picker behavior (CT-17) · depth-2 A–D (CT-18) · `#/next/feed`

## Evidence

- Vitest thread-mount **87**/87 · ct19 Present  
- Path A shots 01–05 Present · Partial=**BLOCK**
