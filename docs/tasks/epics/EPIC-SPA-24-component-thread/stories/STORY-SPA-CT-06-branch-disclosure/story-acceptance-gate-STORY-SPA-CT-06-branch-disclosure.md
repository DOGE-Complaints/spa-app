# Story acceptance gate — STORY-SPA-CT-06-branch-disclosure

- **Story:** Branch collapse / expand / error (local) (M153 branch)
- **Package:** `pkg-000164-20261018-epic-spa-24-ct-06-branch-disclosure.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T13:47:47Z
- **Note:** P3 structure Done · local branch disclosure sync/delayed/error · `data-tm-branch-fetch=false` · Path A shots 01–05 · vitest feed-lab+thread-mount **99/99** · OP eye **Absent** → Partial visual=**BLOCK** · no invent branch HTTP/OP PASS · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Collapse/expand on fixture tree | STRUCTURE | stands S/V/W · shots 01/03/05 · ct06 tests |
| Error stand without invent fetch | STRUCTURE | stand U · shot 04 · `data-tm-branch-fetch=false` |
| Vitest local disclosure | PASS | `threadMount.ct06` **6/6** · suite **99/99** |
| OP eye | **BLOCK** | shots Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
# 22 files · 99 tests passed
CT06_BASE=http://127.0.0.1:5179 node spa-app/scripts/tmp-ct06-capture.mjs
```

## Visual checklists

[`visual-checklists-branch.md`](./visual-checklists-branch.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
