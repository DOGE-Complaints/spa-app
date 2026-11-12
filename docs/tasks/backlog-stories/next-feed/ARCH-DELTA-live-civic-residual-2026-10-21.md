# ARCH-DELTA — live civic residual (NF-13…16) · 2026-10-21

> **L1.5** for NF-13…24 · Interview [INTERVIEW-NF-13-plus…](INTERVIEW-NF-13-plus-live-civic-residual-2026-10-21.md) · [INTERVIEW-NF-17-plus…](INTERVIEW-NF-17-plus-op-residual-chrome-attach-2026-10-21.md) · [INTERVIEW-NF-18-plus…](INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) · [INTERVIEW-NF-21-plus…](INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) · [INTERVIEW-NF-24-plus…](INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md)  
> **Intake:** [analysis-m161-m162…](../../../analysis/analysis-m161-m162-generation-intake-2026-10-21.md) **PASS** · [OP residual](../../../analysis/analysis-next-feed-op-residual-after-apply-2026-10-21.md) · [wave2 evidence](../../../analysis/evidence/op-residual-wave2-2026-10-21/) · [wave3 evidence](../../../analysis/evidence/op-residual-wave3-2026-10-22/) · [wave4 evidence](../../../analysis/evidence/op-residual-wave4-2026-10-23/)  
> **Wave:** Markstack docs (§5–§8 NF-17…20 structure Present · §9–§11 NF-21…23 structure Present · §12 NF-24 Await Apply) · [wave3 validation](../../../analysis/analysis-markstack-wave3-code-validation-2026-10-23.md)  
> Prior: [ARCH-DELTA-visual-parity-wave-2026-10-11.md](ARCH-DELTA-visual-parity-wave-2026-10-11.md) holds except where superseded below.

---

## §1 Issue-type identity icon (NF-13) · M161

| Rule | Owner |
|------|-------|
| Slot | `IssueTypeIcon` **48×48** · r**12** · glyph **24×24** centered |
| Bind | Exact map `issue.type` → `/icons/next-feed/types/ic-issue-type-{key}.svg` |
| Keys | `INCIDENT` · `complaint` · `system_bug` · `observation` · `absurdity` (case-sensitive) |
| Assets | **Present** masters + runtime (intake promote) |
| Unknown | Omit honesty (`omit-catalog-gap`) · no invent glyph |
| SSOT | [M161](../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md) |

---

## §2 Card hit-target (NF-14)

| Rule | Owner |
|------|-------|
| Retire | Dedicated Open issue `Link` on list (supersedes NF-02/07 open affordance Done) |
| Hit | Header/meta/title/summary/labels **+** media → issue route |
| Exclude | Four-zone action strip from navigate hit |
| Detail | No open link (unchanged) |
| A11y | Named hit region · keyboard · strip focus held |

---

## §3 Action strip density (NF-15) · M162

| Rule | Owner |
|------|-------|
| Unframe | React primary = Comment/Share flat (no bordered pill) |
| Icons | **24 CSS px** · reuse existing action SVGs |
| Desktop | pad **4v/8h** · gap **6** · min-height **44** |
| Narrow ~390 | stacked icon/label · gap **4** · min-height **56** |
| Host | CR-23 Live `FeedReactionsMount` remains · no picker redesign |
| SSOT | [M162](../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) |

---

## §4 More menu deferred (NF-16)

| Rule | Owner |
|------|-------|
| UI | More (⋮) **not** shown on civic header |
| Code | Gate/comment-out + `TODO(NF-16 / INTERVIEW-NF-13-plus M4)` |
| Asset | Keep `more.svg` · catalog deferred note |
| Future | New story when product defines overflow actions |

---

## §5 Civic chrome residual (NF-17) · OP residual 2026-10-21

> Source: [INTERVIEW-NF-17-plus…](INTERVIEW-NF-17-plus-op-residual-chrome-attach-2026-10-21.md) · [analysis residual](../../../analysis/analysis-next-feed-op-residual-after-apply-2026-10-21.md)  
> §§1–4 hold for structure. **Supersedes** §3 tip eye where OP residual rejects (hairline · reaction-mark size · strip pad · summary rem).

| Rule | Owner |
|------|-------|
| Hairline | No `.feed-civic-post-actions` `border-top` under media |
| Primary icons | **24 CSS px** held (NF-15 / M162) |
| Reaction marks | tip **20 CSS px** (was 14) |
| Strip vertical | tip `padding-top` **4** · `margin-top` **0** · min-height **≥44** |
| Summary | tip **1rem** on `.feed-civic-post-summary` |
| Host | CR-23 Live strip host held · no picker redesign |
| SSOT | Interview C1–C3 · C5 · soft M162 density intent |

---

## §6 Strip React density residual (NF-18) · OP wave 2

> Source: [INTERVIEW-NF-18-plus…](INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) **R1 · R2**  
> §§1–5 hold for prior Apply. **Supersedes** §5 tip eye for React nested pad / glyph size where OP residual rejects.

| Rule | Owner |
|------|-------|
| React chrome | Single flat layer like Comment/Share — no nested gray pad/hover |
| Primary glyphs | tip **28 CSS px** |
| Pad stack | One pad level on React path · min-height **≥44** |
| Host | CR-23 Live strip held · no picker redesign |
| SSOT | Interview R1 · R2 |

---

## §7 Map basemap follows theme (NF-19) · OP wave 2

| Rule | Owner |
|------|-------|
| Light | Carto **positron** (tip free URL) when `data-theme=light` |
| Dark | Carto **dark-matter** when `data-theme=dark` |
| Switch | Theme change updates style (`setStyle` / remount) — mount-once ignore not Done |
| Owner file | `MapLibreMap.jsx` · hosts do not hardcode dark-only |
| SSOT | Interview **M3** |

---

## §8 Map cluster leaves reachable (NF-20) · OP wave 2

| Rule | Owner |
|------|-------|
| Outcome | Cluster of N → citizen reaches all N issues |
| Default path | `getClusterLeaves` → list/sheet → open issue |
| Layers | Circle + count share affordance |
| Co-located | N>1 after max zoom still multi-path |
| Supersedes | “Cluster tap = zoom only” as Done for multi-issue |
| Owner file | `BoardIssuesMap.jsx` |
| SSOT | Interview **M4** |

---

## §9 Filter date color-scheme follows theme (NF-21) · OP wave 3

> Source: [INTERVIEW-NF-21-plus…](INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **F3** · [wave3 evidence](../../../analysis/evidence/op-residual-wave3-2026-10-22/)

| Rule | Owner |
|------|-------|
| Bind | `.board-filter-date-native` `color-scheme` follows `data-theme` (light→light, dark→dark) |
| Retire | Hardcoded `color-scheme: dark` as sole rule |
| Owner file | `Filters.css` · soft `LocalizedDateInput` |
| SSOT | Interview **F3** |

---

## §10 Reset Filters actionable + cursor (NF-22) · OP wave 3

> Source: Interview **F4**

| Rule | Owner |
|------|-------|
| Reset scope | Clears applied filters **and** pending panel dirty when actionable |
| Cursor | Pointer whenever actionable (dirty and/or hasActiveFilters) — not dead non-pointer gray |
| Disabled | Only when neither dirty nor active |
| Owner file | `ResetFiltersControl.jsx` · toolbar/filter hooks |
| SSOT | Interview **F4** |

---

## §11 Board deprecate → next/feed (NF-23) · OP wave 3

> Source: Interview **B11** · [analysis board deprecate](../../../analysis/analysis-next-feed-board-deprecate-architecture-2026-10-22.md)

| Rule | Owner |
|------|-------|
| Redirect | `#/board` → `#/next/feed` (replace) |
| CTAs | Public `/board` links retarget `/next/feed` |
| Purge | Inventory first · delete only zero-importer board-only files |
| Shared | Keep map/filters/boardQuery used by next-feed |
| SSOT | Interview **B11** · analysis |

---

## §12 Map leaves sheet / pin popup theme (NF-24) · OP wave 4

> Source: [INTERVIEW-NF-24-plus…](INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **M1** · [wave4 evidence](../../../analysis/evidence/op-residual-wave4-2026-10-23/)  
> §§1–11 hold. **Supersedes** hardcoded dark navy leaves/popup as Done for light theme.

| Rule | Owner |
|------|-------|
| Leaves sheet | `.board-issues-map-leaves` follows `data-theme` light/dark tokens |
| Pin popup | `.board-issues-map-popup` same |
| Soft preview | `MapIssuePreview` no dark-only fallback on light |
| Naming | Pin atom `IssueMapPin` · cluster UI = leaves sheet |
| SSOT | Interview **M1** |

---

## Story → arch map

| Story | § | Artboard |
|-------|---|----------|
| NF-13 | §1 | M161 |
| NF-14 | §2 | — |
| NF-15 | §3 | M162 |
| NF-16 | §4 | — |
| NF-17 | §5 | M162 soft · OP residual |
| NF-18 | §6 | OP wave 2 strip |
| NF-19 | §7 | OP wave 2 map theme |
| NF-20 | §8 | OP wave 2 cluster |
| NF-21 | §9 | OP wave 3 date scheme |
| NF-22 | §10 | OP wave 3 reset |
| NF-23 | §11 | OP wave 3 board deprecate |
| NF-24 | §12 | OP wave 4 map sheet theme |
