# STORY-SPA-REQ10-02 — Actor `selected` on reload (H5 client · Option A)

## Meta (pipeline)

- **Key:** `STORY-SPA-REQ10-02-reaction-selected-reload`
- **Parent Epic:** [`../../EPIC-SPA-16-req10-threads-reaction-reload-honesty.md`](../../EPIC-SPA-16-req10-threads-reaction-reload-honesty.md)
- **Package:** `pkg-000088`
- **Status:** Done · P3 `2026-09-28T18:22:01Z` · T01–T08 Done · gate PASS · **P6 gap CLOSED** `2026-09-28T18:27:35Z`
- **Тип:** tech_first wiring / mapper + props (non-UI ADMIN)
- **ui_scope:** `none`
- **source:** [`../../../../backlog-stories/req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-02-reaction-selected-reload.md`](../../../../backlog-stories/req10-threads-reaction-reload-honesty/STORY-SPA-REQ10-02-reaction-selected-reload.md)
- **decision_ref:** backlog STORY-SPA-REQ10-02 + [`19-req10-threads-reaction-reload-honesty.md`](../../../../../requirements/19-req10-threads-reaction-reload-honesty.md) + REQ10 §3.5 Option A, §3.7, §6.2, §7.1 H5(client), §7.2 H7 Keep
- **Parent REQ:** [`19-req10-threads-reaction-reload-honesty.md`](../../../../../requirements/19-req10-threads-reaction-reload-honesty.md)
- **Siblings:** threads REQ10-05 **Done** (Option A server); gateway 54 — none; THR-09 write-path Done
- **Skill declared:** `react-expert`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/react-expert/SKILL.md`  
  Soft: `javascript-pro`
- **Unblock:** threads [`STORY-THREADS-REQ10-05`](../../../../../../../doge-threads/docs/tasks/backlog-stories/req10-tree-marks-read-and-contract/STORY-THREADS-REQ10-05-actor-selected-server.md) Status **Done** on disk (spa backlog Meta Blocked = stale)
- **Operator locks:** Option A only · `selected` thread-root **+** comments · no Option B invent
- **Scaffolded:** `2026-09-28T18:17:14Z`
- **Gate:** [acceptance-verification-spa-req10-02.md](task-spa-req10-02-t05-story-gate/acceptance-verification-spa-req10-02.md) · PASS `2026-09-28T18:22:01Z`

---

## Зачем простыми словами

После reload (auth) picker должен показывать **мои** нажатые реакции на корне треда и на комментариях, если threads отдал `selected` на tree; counts — из summaries; пустые marks → пустой strip.

---

## Scope

1. Map/propagate actor `selected` from tree Option A payload into `ReactionControls` via `initialSelected` (или эквивалент) for **thread-root** and **comments**.
2. Counts continue from tree `summary_marks` / `aggregate_count`.
3. Keep empty-state thread-root reaction slot; Keep `marks = marksState || []` (no fake strip).
4. Preserve write-response path: PUT U2 already updates `selected` / `summary_marks` (THR-09) — не ломать.
5. No invented HTTP path; consume only Option A tree shape from threads REQ10-05.

## Out of scope

- Choosing / implementing Option B
- Inventing GET path or field names beyond sibling lock
- Gateway lifecycle
- Optional `useEffect` prop-sync smell cleanup (REQ §2 optional — not Pass)
- H9 puppeteer harden (stretch — not Pass blocker)
- Reopening REQ-17 product chrome / ADMIN layers / mockups

---

## Verified current state

**As-of-Done / Current** (REQ10-02 P3 `2026-09-28T18:22:01Z` · P6 SSOT `2026-09-28T18:27:35Z`):

| Fact | Path |
|------|------|
| Mapper Option A `selected[]` on root + comments | `mapThreadTreeToBlock.js` `mapActorSelected` / `mapReactionSummaryPayload` / `mapApiCommentToNode` |
| Mount carries `selected`; passes `threadRootSelected` | `LiveIssueThreadMount.jsx` |
| Root picker `initialSelected` (empty + populated) | `IssueThreadBlock.jsx` |
| Comment picker `initialSelected={node.selected ?? []}` | `CommentTree.jsx` |
| Counts from `summary_marks` / `aggregate_count` | mapper + mount/block/CommentTree |
| Keep empty strip · PUT U2 write apply | `ReactionControls.jsx` |
| Server Option A | threads REQ10-05 **Done** |

**Historical (pre-REQ10-02):** Mapper/mount/CommentTree summaries only — no `selected` / `initialSelected` wire.

---

## Target / AC

- [x] **AC-SPA-REQ1002-01 (H5):** after reload (auth), thread-root **and** comment pickers reflect server `selected` once Option A tree delivers it
- [x] **AC-SPA-REQ1002-02:** counts still from tree summaries / aggregates
- [x] **AC-SPA-REQ1002-03 (H7 Keep):** empty marks → empty strip (no fake catalog strip)
- [x] **AC-SPA-REQ1002-04:** no invented HTTP path in spa client (Option A only)
- [x] **AC-SPA-REQ1002-05:** PUT U2 write-response still updates selection from `selected` / `summary_marks`
- [x] **AC-SPA-REQ1002-06 (H9):** stretch optional — **not** Pass blocker

---

## Точки в коде

- `src/repositories/mapThreadTreeToBlock.js`
- `src/components/threads/LiveIssueThreadMount.jsx`
- `src/components/threads/IssueThreadBlock.jsx`
- `src/components/threads/CommentTree.jsx`
- `src/components/threads/ReactionControls.jsx`
- Tree GET Bearer pass-through only if already present — **no new path** (`ThreadsSocialClient.js`)

## Dependencies

- Parent §3.5 Option A / §6.2; threads REQ10-05 server half **Done**; REQ-17 shell / THR-09 write path Done.

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-req10-02-t01-mapper-selected-option-a](task-spa-req10-02-t01-mapper-selected-option-a/README.md) | Done |
| T02 | [task-spa-req10-02-t02-mount-root-initial-selected](task-spa-req10-02-t02-mount-root-initial-selected/README.md) | Done |
| T03 | [task-spa-req10-02-t03-comment-tree-initial-selected](task-spa-req10-02-t03-comment-tree-initial-selected/README.md) | Done |
| T04 | [task-spa-req10-02-t04-vitest-keep-write-no-invent](task-spa-req10-02-t04-vitest-keep-write-no-invent/README.md) | Done |
| T05 | [task-spa-req10-02-t05-story-gate](task-spa-req10-02-t05-story-gate/README.md) | Done |
| T06 | [task-spa-req10-02-t06-verified-as-of-done-ssot](task-spa-req10-02-t06-verified-as-of-done-ssot/README.md) | Done · P6 F1 |
| T07 | [task-spa-req10-02-t07-req19-h5-as-of-done-ssot](task-spa-req10-02-t07-req19-h5-as-of-done-ssot/README.md) | Done · P6 F2 |
| T08 | [task-spa-req10-02-t08-t01-t03-code-facts-as-of-done](task-spa-req10-02-t08-t01-t03-code-facts-as-of-done/README.md) | Done · P6 F3 |
