# UX Prompts — Issue-type identity icons · action-strip density (NF-13 · NF-15)

> **Package:** [next-feed](INDEX.md)  
> **Interview:** [INTERVIEW-NF-13-plus…](INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) M1 · M3  
> **Recorded:** 2026-10-21  
> **Scope:** generative prompts **only** · no product code · analysis.mdc  
> **Wave:** docs **1A** · gen **landed** · Apply later  
> **Intake:** [analysis-m161-m162…](../../../analysis/analysis-m161-m162-generation-intake-2026-10-21.md) **PASS** · artboards **M161** · **M162**

---

## Sufficiency

| Check | Result |
|-------|--------|
| `IssueTypeIcon` 48×48 with type SVG | Assets **Present** · bind Await NF-13 · **M161 PASS** |
| Catalog keys for live `issue.type` + DUI enum | Five exact keys mapped · unknown omit · **PASS** |
| React strip unframed + larger action icons | **M162 PASS** · tip lock 24 / 4v8h · Await NF-15 Apply |
| Open-issue / more | **No gen** — NF-14 / NF-16 code locks |

---

## Global constraints

```text
DOGEstonia SPA #/next/feed FeedCivicPost · light civic feed.
Identity slot = IssueTypeIcon 48×48 · NOT author avatar.
Do not invent HTTP · do not invent OP PASS · no product code in UX output.
If type not in catalog: honest omit (grey slot OK) — annotate TBD.
Reuse next-feed stroke language (16–24 line icons) where possible.
```

---

## Prompt 1 — Issue-type identity icon pack (NF-13)

### State matrix

| State | Must show |
|-------|-----------|
| Known type (e.g. INCIDENT) | 48×48 icon in identity slot · readable at 2× |
| Other known types | Same grammar · distinct silhouette per type |
| Unknown / missing type | Omit catalog gap (current grey) · no fake icon |
| Narrow 390 | Icon remains 48 or documented scale-down TBD |

### Paste-ready EN prompt

```text
Design a hi-fi icon catalog sheet for DOGEstonia SPA civic issue identity slot (FeedCivicPost IssueTypeIcon · 48×48 CSS px · rounded 12).

Context: live #/next/feed now shows real issues. Operator mark #1: replace the empty grey square next to the issue id with an icon that matches issue.type (example on screen: INCIDENT badge in metadata). This is NOT a user avatar.

Deliver:
A — Master grid of issue-type icons at 48×48 and 24×24 preview
B — Icons for wire types observed/known: INCIDENT plus DUI contract set complaint, system_bug, observation, absurdity (label each tile with exact type key)
C — One tile “unknown/omit” showing honest empty slot (no invent glyph)
D — In-context crop: civic card header with INCIDENT icon + id + PUBLISHED chip (light warm card · no invent author)

Style: flat civic stroke · light feed · match existing /icons/next-feed/actions line weight if possible · no purple glow · no emoji as final masters.

Constraints: export-ready SVG naming convention propose as ic-issue-type-{key}.svg under public/icons/next-feed/types/ (path proposal only — do not claim files Present). No product code. Mark TBD if a type silhouette is unclear — do not invent extra types beyond the listed keys.
```

### Acceptance for intake (after gen)

- [x] Sheet Present as **M161** written+PNG  
- [x] Keys listed match interview M1  
- [x] Omit state Present  
- [x] NF-13 L1 cites M161 · SVG promoted  

---

## Prompt 2 — Action strip density · React unframe (NF-15)

### Paste-ready EN prompt

```text
Design a residual state sheet for DOGEstonia SPA FeedCivicPost four-zone action strip on #/next/feed (React | Comment | Share | Reactions).

Operator mark #3: too much empty space; icons too small; React currently sits in a bordered pill while Comment/Share are flat — React must match Comment/Share (no frame).

Panels:
A — Current problem crop (bordered React) annotated
B — Target: all primary actions flat · larger icons (propose 20–24 CSS px) · tighter vertical padding · retain min touch 44
C — Narrow 390 strip
D — Reactions aggregate zone remains fourth slot (do not redesign picker)

Constraints: light civic · reuse existing react/comment/share SVG masters · no invent new brand pack · no product code · CR-23 Live ReactionsMount host stays — only chrome density/unframe.
```

### Sufficiency note

Prompt 2 **executed** · intake **PASS** as **M162**. NF-15 Apply uses tip-locked density register (not CSS-only skip).
