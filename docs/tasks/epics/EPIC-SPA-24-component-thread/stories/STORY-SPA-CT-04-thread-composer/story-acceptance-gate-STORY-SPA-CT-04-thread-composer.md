# Story acceptance gate — STORY-SPA-CT-04-thread-composer

- **Story:** ThreadComposer · draft · fail · mobile (M153 C/F/G)
- **Package:** `pkg-000162-20261018-epic-spa-24-ct-04-thread-composer.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T13:30:17Z
- **Note:** P3 structure Done · ThreadComposer root/reply · draft survival · post-fail F · mobile sticky 390 · Path A shots 01–05 · vitest feed-lab+thread-mount **87/87** · OP eye **Absent** → Partial visual=**BLOCK** · no invent HTTP/OP PASS · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Reply context + draft fixture | STRUCTURE | shots 02/03 · stands K · excerpt + M153 draft |
| Fail F recoverable | STRUCTURE | shot 04 · stand L · Try again / Keep editing · draft kept |
| Vitest draft survival | PASS | `threadMount.ct04` **6/6** · suite **87/87** |
| OP eye / mobile stress | **BLOCK** | shot 05 Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
# 20 files · 87 tests passed
cd spa-app && npm run test:ui:board-shell
CT04_BASE=http://127.0.0.1:5177 node spa-app/scripts/tmp-ct04-capture.mjs
```

## Visual checklists

[`visual-checklists-composer.md`](./visual-checklists-composer.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
