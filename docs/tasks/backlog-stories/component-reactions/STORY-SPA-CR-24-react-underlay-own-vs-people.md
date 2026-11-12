# STORY-SPA-CR-24 — React wide underlay · own vs people (M163/M164)

## Meta

- **Key:** `STORY-SPA-CR-24-react-underlay-own-vs-people`
- **Package:** [component-reactions](INDEX.md) · soft next-feed host
- **Layers:** L1 · L1.5 [ARCHITECTURE §2](ARCHITECTURE.md) · L2
- **Status:** P8 local close · structure Present · **visual tip PASS** (intake) · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000208` closed · `activation: none`
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **Rx7** (M164 supersession)
- **UX tip:** [M163](../../../UX/next/feed/artboards/DOGEstonia-M163-feed-civic-react-underlay-spec-v1.0.md) · [M164](../../../UX/next/feed/artboards/DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.md) · [intake](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md)
- **Depends on:** CR-23 Live Present · soft NF-18 · soft CR-25 hydrate
- **Code home:** `ReactionSummaryStrip` · `FeedReactionsMount` · `FeedCivicPost`

## L1 — FR

- **FR-CR-24.1** React control has **one wide** underlay spanning its zone — no double nest / inner pill (M163).  
- **FR-CR-24.2** Tap React → own M154 picker — not people.  
- **FR-CR-24.3** Tap rightmost `Reactions` text → M155 people path (honesty if unavailable) — not picker · no glyph stack on right.  
- **FR-CR-24.4** Own selected icons render **inside** React underlay (lower row) · outer React geometry **stable** for 0/1/2/3 · default max 3 · **no** page-wide aggregate row below strip (M164 supersedes draft “below”).  
- **FR-CR-24.5** Zero-selected: entry thumb **above** `React` label · peer-aligned with Comment/Share.  
- **FR-CR-24.6** Comment/Share stay flat · Vitest · OP eye — no invent PASS · no invent people.

## OOS

CR-25 hydrate/persist · CT-33 · invent CDN · invent M163 PNG

## AC

- [x] M163/M164 + intake cited  
- [x] Wide underlay · React≠people · Reactions≠picker (structure)  
- [x] Own icons in-zone · stable geometry · no below-row (structure)  
- [ ] Vitest · OP eye — Vitest green · OP Absent → **BLOCK**

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-cr-24-t01-underlay` | Done | Wide single underlay CSS (M163) | 24.1 · 24.6 |
| `task-spa-cr-24-t02-wire` | Done | React→picker · Reactions→people | 24.2 · 24.3 |
| `task-spa-cr-24-t03-own-in-zone` | Done | Own icons inside React · stable box · zero layout | 24.4 · 24.5 |
| `task-spa-cr-24-t04-vitest` | Done | Markers | 24.6 |

### Order

Intake PASS → `t01` → `t02` → `t03` → `t04` · skill `react-expert`
