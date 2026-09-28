# 19. REQ10 — threads reaction reload honesty (+ debug cleanup)

Parent: docs/requirements backlog/REQ10-DOGEstonia-Threads-Board-Architecture-Hardening.md §3.1, §3.5, §3.7, §6.2, §7.1 H1/H5(client), §7.2 H7/H9  
Parent-id: dogestonia-threads-board-architecture-hardening  
Siblings:  
- doge-threads/docs/requirements/03-req10-tree-marks-read-and-contract.md (contract: tree summaries + **Option A** optional Bearer `selected[]` — spa must not invent HTTP path) · story [`STORY-THREADS-REQ10-05`](../../../doge-threads/docs/tasks/backlog-stories/req10-tree-marks-read-and-contract/STORY-THREADS-REQ10-05-actor-selected-server.md)  
- doge-complaints-gateway/docs/requirements/54-req10-lifecycle-status-normalize.md (contract: none for reactions UI)  
Status: **Done (H1 wave)** · REQ10-01 P3 Done `pkg-000087` (2026-09-28T18:05:35Z) · REQ10-02 / H5 still **Blocked** (threads REQ10-05)  
Justification: docs/analysis/audit-threads-board-persist-clean-vs-hack-2026-09-27.md §§7–9  
Дата: 2026-09-28 · materialized: 2026-09-28T11:05:54Z · backlog: 2026-09-28T13:38:42Z · H1 As-of-Done SSOT: 2026-09-28T18:12:58Z  
Backlog: [req10-threads-reaction-reload-honesty/INDEX.md](../tasks/backlog-stories/req10-threads-reaction-reload-honesty/INDEX.md) · [REQ10-01](../tasks/backlog-stories/req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-01-debug-ingest-cleanup.md) · [REQ10-02](../tasks/backlog-stories/req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-02-reaction-selected-reload.md)  
Operator locks: **Option A** · `selected` for thread-root **+** comments · REQ10-01 independent of H5  
Related: docs/requirements/17-issue-thread-feed-ux-and-reactions.md (REQ7 shell — not reopened)

---

## 1) Goal

Убрать debug ingest из spa; после reload показывать не только counts, но и **мои** `selected` реакции (когда threads отдаст их); сохранить Keep «нет fake strip»; опционально подчистить sync и smoke.

## 2) Scope / Out of scope

**In:**  
- Remove `127.0.0.1:7840/ingest/…` from production spa modules (H1 spa).  
- Map/propagate actor `selected` into `ReactionControls` (`initialSelected` / equivalent) for thread-root + comments when server provides it (H5 client).  
- Keep empty-state thread-root reaction slot if still present (SPA-10-05 / audit).  
- Optional: reduce `useEffect` prop sync smell (H7); optional harden persist puppeteer (H9 stretch).  

**Out:** Inventing new threads endpoints; gateway lifecycle; REQ8; changing `/node/*` pulse paths (already clean per audit §2).

## 3) Verified current state

**As-of-Done / Current** (REQ10-01 P3 `2026-09-28T18:05:35Z` · P6 SSOT `2026-09-28T18:12:58Z`):

| Fact | Evidence |
|------|----------|
| Literal `7840/ingest` under `spa-app/src` | **0** (`rg`; mount+client ingest regions removed) |
| Mount / client control flow without ingest | `LiveIssueThreadMount.jsx` · `ThreadsSocialClient.js` |
| Closed path set unchanged | `ThreadsSocialClient.js` `CLOSED_SOCIAL_PATHS` |
| Tree mapper has `threadRootReactions` / per-comment marks | `mapThreadTreeToBlock.js` |
| Mount passes summaryMarks/aggregateCount, not selected | `LiveIssueThreadMount.jsx` → `IssueThreadBlock` (H5 → REQ10-02) |
| `ReactionControls` has `initialSelected` + `useEffect` on summaryMarks | `ReactionControls.jsx` |
| Fake `enabled.slice(0,3)` removed (`marks = marksState \|\| []`) | `ReactionControls.jsx` |
| Persist smoke script exists | `tests/puppeteer/threads-comment-reaction-persist.mjs` (per audit) |

**Historical (pre-REQ10-01):** Debug ingest present in `ThreadsSocialClient.js` + `LiveIssueThreadMount.jsx` (10× `7840/ingest`).

## 4) Target behavior

1. No Cursor ingest in spa `src`.  
2. When authenticated and threads returns `selected` (per sibling lock), reload restores pressed state for thread-root and comments.  
3. Counts continue from tree summaries.  
4. Empty marks → empty strip (Keep).  
5. Write-response path still updates selection from PUT U2 (`selected` / `summary_marks`).

## 5) Acceptance criteria

- [x] H1 (spa): `rg` over `spa-app/src` — no `7840/ingest`  
- [ ] H5 client: after reload (auth), thread-root + comment pickers reflect server `selected` once sibling delivers it  
- [ ] H7 Keep: no fake catalog strip when marks empty  
- [ ] No invented HTTP path in spa client  
- [ ] H9 stretch optional — not Pass blocker

## 6) Open questions

1. ~~Blocked on threads Option A vs B~~ — **Locked Option A** (operator 2026-09-28); spa consumes tree `selected`, no Option B invent.
2. ~~selected per comment vs only thread_root~~ — **Locked both** thread-root + comments.

## 7) Dependencies

Parent §3.1, §3.5, §3.7, §6.2; sibling threads `03-…` (must land server half before spa H5 green); REQ7 spa `17-…` (shell context, no product reopen).
