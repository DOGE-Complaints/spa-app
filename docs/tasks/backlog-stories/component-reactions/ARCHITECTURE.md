# Architecture — component-reactions / `reactions-mount` (Phase 1.5 cuts)

> **UTC:** 2026-10-22 (rev · §2 CR-24 underlay residual · §1 CR-23 cutover)  
> **Package:** [INDEX.md](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)  
> **Interview tip:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) · [INTERVIEW-CT-28-plus…](../component-thread/INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md)  
> **Gap:** [analysis-next-feed-thread-reactions-cutover…](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · [wave3 evidence](../../../analysis/evidence/op-residual-wave3-2026-10-22/)  
> **Sibling thread:** [component-thread ARCHITECTURE §15](../component-thread/ARCHITECTURE.md)  
> **Status:** CR-01…23 lab/Live Present · **CR-24** tip PASS (M163/M164) · **CR-25** hydrate Ready (docs · Await Apply)

---

## 1. `#/next/feed` ReactionsMount Live cutover (CR-23) — L1.5

| Rule | Owner |
|------|-------|
| Host | `#/next/feed*` civic strip + comment plugs (with CT-28) |
| Presentation Done | `reactions-mount` LiveAdapter |
| Data | Closed `ThreadsSocialClient.react` / knobs only · no invent paths |
| Retire Done | `FeedReactionsStrip` / classic `ReactionChrome` ≠ Done on next/feed |
| People Live | Fail-closed until API |
| Lab | `#/lab/feed` · `#/lab/reactions` Fixture path **unchanged** |

### 1.1 Story map

| Story | Arch § |
|-------|--------|
| CR-23 | §1 |

---

## 2. React wide underlay · own vs people (CR-24) — L1.5 · 2026-10-22

> Source: Interview **Rx7** · [M163](../../../UX/next/feed/artboards/DOGEstonia-M163-feed-civic-react-underlay-spec-v1.0.md) · [M164](../../../UX/next/feed/artboards/DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.md) · [intake](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) · soft M154/M155 · soft NF-18  
> §1 holds. **Supersedes** bare React slot · **supersedes** draft “aggregate below strip” (M164 OP accept).

| Rule | Owner |
|------|-------|
| Underlay | One **wide** React surface — no double nest / inner pill (M163) |
| React tap | Own M154 picker — not people |
| Reactions tap | Text `Reactions` → M155 people (honesty if unavailable) — not picker · no right glyph stack |
| Own marks | Icons **inside** React zone · outer geometry stable 0/1/2/3 · default max 3 · **no** page-wide row below |
| Zero state | Thumb above `React` · peer-aligned |
| Visual tip | Intake **PASS** (M163 PNG soft Absent) |
| SSOT | M163 · M164 · Interview **Rx7** |

### 2.1 Story map

| Story | Arch § |
|-------|--------|
| CR-24 | §2 |
| CR-23 | §1 (host held) |
| CR-25 | hydrate/persist (soft sibling · not this §) |

---

## 3. Actor selected hydrate after reload (CR-25) — L1.5 · 2026-10-22

> Source: Interview **Rp12** · [analysis-reaction-persist…](../../../analysis/analysis-reaction-persist-reload-gap-2026-10-22.md)

| Rule | Owner |
|------|-------|
| Hydrate | Live `FeedReactionsMount` inits from tree `selected` / `summary_marks` (Bearer) |
| Hosts | Post strip + comment plugs |
| Write | PUT path held · local + reload consistent |
| SSOT | Analysis · CR-25 |

### 3.1 Story map

| Story | Arch § |
|-------|--------|
| CR-25 | §3 |
