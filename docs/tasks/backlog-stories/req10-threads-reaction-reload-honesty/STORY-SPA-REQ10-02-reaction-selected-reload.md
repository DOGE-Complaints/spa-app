# STORY-SPA-REQ10-02 — Actor `selected` on reload (H5 client · Option A)

## Meta
- **Key:** `STORY-SPA-REQ10-02-reaction-selected-reload`
- **Пакет:** [`req10-threads-reaction-reload-honesty/`](./INDEX.md)
- **Status:** Done · P3 `pkg-000088` (2026-09-28T18:22:01Z) · [pipeline](../../epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-02-reaction-selected-reload/STORY-SPA-REQ10-02-reaction-selected-reload.md) · gate PASS · **Unblocked** (threads REQ10-05 Done)
- **Тип:** tech_first wiring / mapper + props (non-UI ADMIN)
- **Parent REQ:** [`19-req10-threads-reaction-reload-honesty.md`](../../../requirements/19-req10-threads-reaction-reload-honesty.md)
- **Parent product:** REQ10 §3.5 Option A, §3.7, §6.2, §7.1 H5(client), §7.2 H7 Keep
- **Siblings:**
  - threads [`03-req10-…`](../../../../../doge-threads/docs/requirements/03-req10-tree-marks-read-and-contract.md)
  - threads story [`STORY-THREADS-REQ10-05-actor-selected-server`](../../../../../doge-threads/docs/tasks/backlog-stories/req10-tree-marks-read-and-contract/STORY-THREADS-REQ10-05-actor-selected-server.md) (Option A server)
  - gateway 54 — none for reactions UI
  - Related Done: THR-09 write-path `selected` / `summary_marks`
- **Skill declared (future P3):** `react-expert`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/react-expert/SKILL.md`  
  Soft: `javascript-pro` @ `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`
- **Зависит от:** threads REQ10-05 Option A landed; Prefer REQ10-01 merged first (cleanup), not a semantic blocker for H5
- **Blocked-on (historical):** threads [`STORY-THREADS-REQ10-05`](../../../../../doge-threads/docs/tasks/backlog-stories/req10-tree-marks-read-and-contract/STORY-THREADS-REQ10-05-actor-selected-server.md) — **Done**; unblock 2026-09-28T18:17:14Z
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)
- **Operator locks:**
  - **Option A** — consume optional Bearer tree `selected[]`; **no** Option B path invent
  - **`selected` for thread-root + comments** (both levels)

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
| Mapper Option A `selected[]` on root + comments | `mapThreadTreeToBlock.js` `mapActorSelected` / `mapReactionSummaryPayload` |
| Mount carries `selected`; passes `threadRootSelected` | `LiveIssueThreadMount.jsx` |
| Root picker `initialSelected` (empty + populated) | `IssueThreadBlock.jsx` |
| Comment picker `initialSelected={node.selected ?? []}` | `CommentTree.jsx` |
| Counts from `summary_marks` / `aggregate_count` | mapper + mount/block/CommentTree |
| Keep empty strip | `ReactionControls.jsx` (`marks = marksState \|\| []`) |
| PUT U2 write applies `data.selected` / `summary_marks` | `ReactionControls.jsx` |
| Closed paths unchanged (no invent) | `ThreadsSocialClient.js` `CLOSED_SOCIAL_PATHS` |
| Persist smoke exists | `tests/puppeteer/threads-comment-reaction-persist.mjs` |
| Server Option A | threads REQ10-05 **Done** |

**Historical (pre-REQ10-02):** Mapper/mount/CommentTree had summaries only — no `selected` / `initialSelected` wire.

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
- Tree GET Bearer pass-through only if already present for Closed calls — **no new path** (`ThreadsSocialClient.js`)

## Dependencies

- Parent §3.5 Option A / §6.2; threads REQ10-05 server half; REQ-17 shell context Done (THR-09 write path).
