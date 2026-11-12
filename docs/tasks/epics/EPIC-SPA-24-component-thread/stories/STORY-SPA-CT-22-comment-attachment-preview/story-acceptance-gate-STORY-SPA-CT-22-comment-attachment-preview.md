# Story acceptance gate — STORY-SPA-CT-22-comment-attachment-preview

- **Story:** Comment attachment preview (+ `.md` family)
- **Package:** `pkg-000180-20261020-epic-spa-24-ct-22-comment-attachment-preview.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T15:04:03Z
- **Note:** P3 Execute · T01–T05 Done · Path A shots Present · no invent HTTP/OP PASS · vitest ct22 8/8

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Lab Attach image + Post → comment «yyy»-class node shows image preview | Match | stand F + shot 07 · `tm-comment-attachments` |
| Local preview when no published URL · honesty Present | Match | stand A · blob: objectURL · shot 01 · `ATTACH_NODE_LOCAL_PREVIEW_COPY` |
| PDF/Office/`.md` show type-honest cue in node | Match | stands C/D · shots 03/04 |
| `.md` in allow-list hook | Match | `ATTACHMENT_FAMILY_ALLOWLIST` + `inferAttachmentFamily` · T02 |
| Vitest coverage | Match | `threadMount.ct22` + `feedLab.ct22` · 8/8 |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
CT22_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct22-capture.mjs
```

## Visual checklists

[`visual-checklists-comment-attachment-preview.md`](./visual-checklists-comment-attachment-preview.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
