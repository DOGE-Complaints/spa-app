# CT-17 — M153a attachment picker path (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T12:01Z (P3)  
> **Package:** `pkg-000175` · EPIC-SPA-24  
> **Code home:** `ThreadComposer` · `ThreadMount` · `threadMountConfig` family hook  
> **Normative:** M153a v1.1 · OP-UX M153a/b CT-17  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| First paint | Zero attachment chips unless `initialAttachments` |
| Attach | Opens native `input[type=file]` only · no custom file manager · no synthetic seed |
| Cancel | No `change` → draft/selection unchanged |
| Family hook | `ATTACHMENT_FAMILY_ALLOWLIST` = images · pdf · office · `ATTACHMENT_MIME_TABLE_TBD=null` |
| Classify | `image/*` → Ready · else fail-closed Denied until §18 MIME table |
| Chip | Local pending intent · `data-tm-attach-published="false"` · origin=picker |
| F | `attachmentsAvailable=false` omits Attach + file input · no fake Denied |
| Glyphs | Reuse Present `attach.svg` / `send.svg` |

## Touchpoints

- `composer/ThreadComposer.jsx` · `ThreadMount.jsx` · `config/threadMountConfig.js`
- Tests: `threadMount.ct17` · Path A `scripts/tmp-ct17-capture.mjs`

## OOS

Invent exact MIME/extensions · invent upload/bind HTTP · invent denied-submit policy · chip paint (CT-19) · invent OP PASS · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **164**/164 · ct17 Present
- Path A shots 01–05 Present · Partial=**BLOCK**
