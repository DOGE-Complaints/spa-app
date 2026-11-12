# Story acceptance gate — STORY-SPA-CT-01-issue-thread-block-states

- **Story:** IssueThreadBlock states (M152 A–E)
- **Package:** `pkg-000159-20261018-epic-spa-24-ct-01-issue-thread-block-states.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T13:01:37Z
- **Note:** P3 structure Done · ThreadMount + IssueThreadBlock A–E Present · FixtureAdapter · `#/lab/thread` · Path A shots 01–05 · vitest thread-mount **9/9** · OP eye **Absent** → Partial visual=**BLOCK** · no invent HTTP/Identity/OP PASS · civic Open issue interactive held

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Fixture stands cover A/B/C/D (+ E stress) | STRUCTURE | `#/lab/thread` stands A–E · FixtureAdapter |
| Literal bodies in C · skeletons only in A | STRUCTURE | shots 01/03 · cr01 tests · M152 bodies |
| Vitest status → chrome markers | PASS | `threadMount.ct01` **9/9** |
| Verify lab after CT-08 · OP eye | **BLOCK** | Lab matrix on `#/lab/thread` (feed cutover CT-08) · OP eye Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
# 1 file · 9 tests passed
CT01_BASE=http://127.0.0.1:5174 node spa-app/scripts/tmp-ct01-capture.mjs
```

## Visual checklists

[`visual-checklists-m152-states.md`](./visual-checklists-m152-states.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
