# Interview SSOT — OP residual wave 2 (chrome · map · dark)

- **Дата:** 2026-10-21  
- **Тип:** Markstack intake · post-NF-17 Apply residual + map + dark mode  
- **Evidence:** [evidence/op-residual-wave2-2026-10-21/](../../../analysis/evidence/op-residual-wave2-2026-10-21/)  
- **Пакеты:** [next-feed](INDEX.md) · [next-shell](../next-shell/INDEX.md) · [component-thread](../component-thread/INDEX.md)  
- **Prior:** [INTERVIEW-NF-17-plus…](INTERVIEW-NF-17-plus-op-residual-chrome-attach-2026-10-21.md) — NF-17 Apply holds for border-top / summary / marks; **not** React double pad  
- **Слои:** **L1** FR/AC · **L1.5** ARCH / ARCH-DELTA · **L2** tech subtasks  
- **Wave delivery lock:** **1A** — docs only. **No** product Apply this wave.  
- **Method:** [markstack.md](../../../../../docs/methodology/Zeya888-builder-queue/guides/markstack.md)

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| W1 | Delivery | Docs Markstack only (**1A**) · Apply / P1.3 отдельно |
| R1 | React double gray (mark 1) | React zone = **single** flat chrome like Comment/Share — no nested gray pad/hover |
| R2 | Icons / pad (mark 2) | One pad level in strip · primary glyphs tip **28 CSS px** · touch **≥44** |
| M3 | Map light (mark 3) | Light theme → Carto **positron** · dark → **dark-matter** · bind `data-theme` + remount/`setStyle` |
| M4 | Cluster 12 → one issue (mark 4) | Cluster of N → citizen reaches **all N** · default Apply: `getClusterLeaves` → list/sheet |
| D5 | Dark icons feed+shell (mark 5) | Theme-safe glyphs (mask / `currentColor` · reuse CrReactionIcon pattern) |
| D6 | Dark thread (mark 6) | Bubble/quote/composer token fills · show-more readable · type icon + close readable |
| OOS | — | CT-31 attach · invent OP PASS · invent CDN · empty pipelines · Discussion unavailable HOLD |

## Факты из кода (не обсуждаемо)

1. NF-17 Apply: actions `border-top: none` · summary `1rem` · reaction marks `20` — Present.  
2. React: wrapper `.feed-civic-post-action` + inner `.rm-summary-strip__react` both pad/hover — Partial double underlay.  
3. `CrReactionIcon size={18}` + CSS `24 !important` on `.rm-icon` — Partial vs OP still-small.  
4. `MapLibreMap` default = Carto dark-matter only · no theme→`styleUrl` · mount-once ignores style change.  
5. Cluster click = `getClusterExpansionZoom` only · **Absent** `getClusterLeaves` / spiderfy · pin uses `features[0]`.  
6. Feed/shell icons = `<img src=*.svg>` · SVG `currentColor` paints black on dark.  
7. Thread bubbles `--tm-bubble-fill: #f7f6f2` fixed · `--color-text-primary` white in dark → invisible quote/body · `--color-text-link` Absent → `#175cd3`.

## Story allocation

| Gap | Artifact | Package |
|-----|----------|---------|
| Marks 1–2 strip React density | **NF-18** | next-feed |
| Mark 3 map basemap theme | **NF-19** | next-feed |
| Mark 4 cluster leaves | **NF-20** | next-feed |
| Mark 5 shell icons | **NS-07** | next-shell |
| Marks 5–6 thread + type + close | **CT-32** | component-thread |

**Order tip:** NF-18 ‖ NS-07 ‖ CT-32 · **NF-19 → NF-20**.  
**Apply:** separate OP go-ahead (lock W1).

## Explicit non-goals

Product JSX this wave · invent OP PASS · invent CDN · reopen NF-17 as rewrite · CT-31 · HTTP-09 · empty epic pipeline folders · UX gen sheets

## Sufficiency

| Need | Verdict |
|------|---------|
| UX gen | **No** — CSS / token / map locks |
| Sibling REQ | **No** new REQ (REQ-21 noted basemap later — FR in NF-19) |
| CSS/code lock | **Yes** |
