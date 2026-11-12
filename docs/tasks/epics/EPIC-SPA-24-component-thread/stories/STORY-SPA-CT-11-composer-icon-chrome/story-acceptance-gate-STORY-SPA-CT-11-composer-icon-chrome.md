# Story acceptance gate — STORY-SPA-CT-11-composer-icon-chrome

- **Story:** Composer icon chrome (G-H2 · G-H6)
- **Package:** `pkg-000169-20261019-epic-spa-24-ct-11-composer-icon-chrome.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-19T12:15:05Z
- **Note:** P3 structure Done · attach.svg paperclip · circle send empty · labelled Post+plane · Path A shots 01–05 · vitest feed-lab+thread-mount **128/128** · OP eye **Absent** → Partial visual=**BLOCK** · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Open composer: paperclip Attach · Post has send/plane chrome | STRUCTURE | shot 01–03 · `tm-composer-attach-icon` / `tm-composer-send-icon` |
| Empty send path uses circular yellow send (after CT-10 entry) | STRUCTURE | shot 01 · `data-tm-send-chrome=circle` |
| Vitest/DOM markers for icon presence · attach still works | PASS | `threadMount.ct11` · suite **128/128** |
| OP eye | **BLOCK** | shots Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
# 28 files · 128 tests passed
CT11_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-ct11-capture.mjs
```

## Visual checklists

[`visual-checklists-composer-icons.md`](./visual-checklists-composer-icons.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
