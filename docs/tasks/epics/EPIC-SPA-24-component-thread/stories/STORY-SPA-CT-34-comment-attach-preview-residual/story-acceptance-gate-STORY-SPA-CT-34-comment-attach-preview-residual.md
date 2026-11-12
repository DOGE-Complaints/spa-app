# Story acceptance gate — STORY-SPA-CT-34-comment-attach-preview-residual

- **Story:** Comment attach preview residual (Selected image)
- **Package:** `pkg-000227-20261024-epic-spa-24-ct-34-comment-attach-preview-residual.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-24T10:57:23Z
- **Note:** P3 structure Pass · local objectURL + published img Present · Live File/`published_url` merge · policy A held · Path A capture Present · OP eye **Absent** → Partial visual=**BLOCK** · **no invent PASS / CDN / policy B** · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Preview image renders (local + published happy path) | structure Pass · visual **BLOCK** | T01–T02 · shots 01–02 · vitest CT-34 |
| Text-only plate gone on happy path | structure Pass · visual **BLOCK** | CAPTURE-META probes · no sole «Selected image» plate |
| Vitest · OP eye | Vitest Pass · OP eye **Absent** → **BLOCK** | `threadMount.ct34.test.jsx` · CAPTURE-META `op_eye: Absent` |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount/__tests__/threadMount.ct34.test.jsx
cd spa-app && node scripts/tmp-ct34-capture.mjs
```

## Visual checklists

[`visual-checklists-comment-attach-preview-residual.md`](./visual-checklists-comment-attach-preview-residual.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
