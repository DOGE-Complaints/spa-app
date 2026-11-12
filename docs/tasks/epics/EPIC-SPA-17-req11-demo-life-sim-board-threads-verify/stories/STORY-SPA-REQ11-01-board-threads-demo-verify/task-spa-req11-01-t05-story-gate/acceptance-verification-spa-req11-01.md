# Story acceptance gate — STORY-SPA-REQ11-01-board-threads-demo-verify

- **Story:** Demo verify board + threads on profile SPA URL
- **Package:** `pkg-000089-20260929-epic-spa-17-req11-01-board-threads-demo-verify.yaml`
- **Result:** **BLOCKED**
- **Date:** 2026-09-29T13:42:10Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| AC-SPA-REQ1101-01 (S1 / X-11-01) | **BLOCKED** | [EVIDENCE-board-x1101.md](../task-spa-req11-01-t02-board-x1101-nonempty-checklist/EVIDENCE-board-x1101.md) — no live wipe+replay |
| AC-SPA-REQ1101-02 (S2) | **BLOCKED** | [EVIDENCE-issue-reactions.md](../task-spa-req11-01-t03-issue-thread-reactions-checklist/EVIDENCE-issue-reactions.md) — seed/replay incomplete |
| AC-SPA-REQ1101-03 (S3) | **DOCUMENTED** | Pass constraints: no CI/screenshot required — [EVIDENCE-pass-constraints.md](../task-spa-req11-01-t04-pass-constraints-anonymous-no-invent/EVIDENCE-pass-constraints.md) (runtime Pass N/A until AC-01/02) |
| AC-SPA-REQ1101-04 (K1 / 2A) | **DOCUMENTED** | anonymous Pass rule recorded same Evidence |
| AC-SPA-REQ1101-05 | **DOCUMENTED** | no new spa HTTP/chrome this P3; default no `src/` change |

## Blocker facts (P3 Grep 2026-09-29T13:42:10Z · P6 F2 `2026-09-29T13:49:14Z` · **P6 F5 `2026-09-29T13:54:03Z`**)

| Sibling | Status |
|---------|--------|
| STORY-GW-REQ11-01 | **Done (Awaiting Commits)** |
| STORY-GW-REQ11-02…04 | **Todo** |
| STORY-THREADS-REQ11-01 | **Done** |
| STORY-THREADS-REQ11-02 | **Done** |
| STORY-THREADS-REQ11-03…04 | **Todo** |

Do **not** invent Pass. Re-open P3 Evidence after wipe+replay on named profile. Gate Result remains **BLOCKED** (F1 runtime).

## Commands (live verification 2026-09-29T13:42:10Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# ok 5 paths · pkg-000089
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
