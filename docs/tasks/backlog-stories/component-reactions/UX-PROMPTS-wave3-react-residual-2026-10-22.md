# UX Prompts — React strip residual (wave3 mark 7 → CR-24)

> **Package:** [component-reactions](INDEX.md) · soft [next-feed](../next-feed/INDEX.md)  
> **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **Rx7**  
> **Cite:** [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · M155 people (soft) · lab aggregate **below**  
> **Wave:** docs 1A · gen Await · no product code · no invent OP PASS

## Sufficiency

| Check | Result |
|-------|--------|
| Wide React underlay (not nested double) | **UX** — NF-18 flattened too far · tip needed |
| React → own picker · aggregate → people | **UX** + code · clarify surfaces |
| Placement below when own marks | Cite lab `aggregatePlacement="below"` · tip artboard |

---

## Global constraints

```text
DOGEstonia SPA #/next/feed civic action strip · React | Comment | Share | Reactions.
Reuse M154 grammar: aggregate ≠ picker; people = M155; no invent reaction catalog.
Light + dark readable. Touch ≥44. No invent OP PASS / HTTP.
```

---

## Prompt 1 — React control chrome (wide underlay)

### State matrix

| State | Must show |
|-------|-----------|
| Default | Single **wide** soft underlay behind React (peer-width with Comment/Share row density) — not a second nested pill |
| Hover / focus | One chrome layer · focus ring visible |
| Selected (own marks) | Same underlay family · not broken linearity |

### Prompt body

```text
Artboard: DOGEstonia M163-feed-civic-react-underlay-residual (tip name).
Show FeedCivicPost action strip under media. React control has ONE wide light-gray
rounded underlay matching the horizontal span of the React zone (not a skinny inner pill
inside another gray). Comment and Share stay flat/transparent like current peers.
Annotate: "wide underlay kept · no double nest". Include focus ring callout.
Desktop + ~390. DO NOT invent new icons.
```

---

## Prompt 2 — Own reactions vs people · below placement

### State matrix

| Affordance | Opens |
|------------|-------|
| React control | Actor’s own picker / selection (mine) |
| Aggregate marks + count | People who reacted (M155) — honesty if list unavailable |
| Layout | When own marks Present, aggregate row **below** strip (lab below) — not inline crushing React |

### Prompt body

```text
Artboard: DOGEstonia M164-feed-react-own-vs-people-below (tip name).
Frame A: empty reactions — React wide underlay; aggregate empty/honest.
Frame B: actor has selected marks — show own selection affordance on React;
aggregate stack+count on a SECOND row BELOW the four-zone strip (not inline
beside React). Frame C: tap aggregate → people sheet (or honesty "People list
unavailable" + Try again) — do not open picker. Cite M154/M155. No invent people.
```

---

## Out of gen

CSS-only NF-21/22 · shell logo · invent reaction meanings · invent OP PASS
