# STORY-SPA-CR-25 — Hydrate actor selected reactions after reload

## Meta

- **Key:** `STORY-SPA-CR-25-reaction-selected-hydrate-persist`
- **Package:** [component-reactions](INDEX.md) · soft next-feed hosts
- **Layers:** L1 · L1.5 soft ARCH · L2
- **Status:** P8 local close · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000209` closed · `activation: none`
- **OP residual:** OP eye Absent · Partial visual held (structure hydrate Present)
- **Analysis:** [analysis-reaction-persist-reload-gap-2026-10-22.md](../../../analysis/analysis-reaction-persist-reload-gap-2026-10-22.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-CR-25-2026-10-22.md) · [p7](../../../analysis/reaudit-STORY-SPA-CR-25-p7-2026-10-22.md) · [arch](../../../architecture/component-reactions/25-reaction-selected-hydrate-persist.md)
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **Rp12**
- **Depends on:** CR-23 Live Present · soft CR-24 visual · mapThreadTreeToBlock selected mapper Present
- **Code home:** `FeedReactionsMount.jsx` · `FeedCivicPost.jsx` · `FeedThreadMount.jsx` · tree LiveAdapter load

## L1 — FR

- **FR-CR-25.1** On mount / tree load, Live strip shows actor `selected[]` from authenticated tree (`thread_root_reactions` / comment) — not empty after successful prior PUT.  
- **FR-CR-25.2** Same for comment-node plugs (`target=comment`) — hydrate per `commentId`.  
- **FR-CR-25.3** `summary_marks` / `aggregate_count` hydrate from tree (not only post-PUT local write snapshot).  
- **FR-CR-25.4** After PUT ok, local state and next tree reload stay consistent (no silent drop).  
- **FR-CR-25.5** Anonymous: omit selected honesty held · Vitest · OP eye — no invent PASS · no invent people API.

## OOS

CR-24 underlay/own-icons visual · invent gateway schema · invent CDN

## AC

- [x] Analysis cited  
- [x] Post + comment selected survive reload (Bearer) — structure Present · OP eye Absent  
- [x] Summaries hydrate — structure Present · OP eye Absent  
- [ ] Vitest · OP eye — Vitest green · OP Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-cr-25-t01-props` | Done | FeedReactionsMount initialSelected/summary props + sync | 25.1 · 25.3 |
| `task-spa-cr-25-t02-hosts` | Done | FeedCivicPost + FeedThreadMount pass tree mapped fields | 25.1 · 25.2 |
| `task-spa-cr-25-t03-reload` | Done | After write → reload path keeps selected | 25.4 |
| `task-spa-cr-25-t04-vitest` | Done | Markers | 25.5 |

### Order

`t01` → `t02` → `t03` → `t04` · skill `react-expert`
