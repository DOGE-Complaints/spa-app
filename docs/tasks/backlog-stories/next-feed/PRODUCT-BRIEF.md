# Next Feed — Product Brief (REQ-22 feed content slice · phase 2)

> **Locked intent:** operator 2026-10-09 — phase 2 = feed + Issues + reactions (visual + confirmed behavior) on `#/next/feed*`  
> **Status:** locked для ADMIN-NF-01…**05** (rework 2026-10-10 · no UX-PROMPTS layer) · **visual parity wave** NF-07…12 Materialized 2026-10-11  
> **Parent REQ:** [22-feed-visual-redesign-phase-1.md](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.1–15 (content), AC-01…12  
> **Arch:** [02-features-feed-composition.md](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) · [00-overview](../../../architecture/feed-visual-redesign-phase-1/00-overview.md) · [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md)  
> **Sibling shell ADMIN:** [next-shell](../next-shell/INDEX.md) (D2.1 host/chrome — not this package; prefer shell host before/with feed implement)  
> **Sibling threads:** [REQ-17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md) · [threads-feed](../threads-feed/INDEX.md) · arch [threads-feed-ux](../../../architecture/threads-feed-ux/00-overview.md)  
> **DUI locks:** [Q01–Q18](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) · Q12 Amendment 2026-10-11 (NF-12)

## One-liner

Визуальный + поведенческий **feed** на доме `#/next/feed*`: лента, Issue-as-post, map, thread/reactions/gates — в `features/feed/`, один data plane, без invent API.

## Locked decisions

| # | Theme | Decision |
|---|-------|----------|
| 1 | Home URLs | Claimable UI on `#/next/feed` + `#/next/feed/issue/:id` |
| 2 | Code home | `features/feed/` visual; reuse threads modules behind presentation |
| 3 | Shell | Provided by next-shell; this package fills **content** (arch D2.2) |
| 4 | Data | Confirmed slice + DUI only; fixtures OK with honesty |
| 5 | UX / icons | Artboards + icon-system **exist** — index only for UX; **promote icons in ADMIN-NF-02** |
| 6 | Runtime icons | `public/icons/next-feed/<group>/` on disk after ADMIN-NF-02; reuse `/icons/next-shell/…` for shared nav |
| 7 | Verify | Vitest + browser-smoke **feed** critical states (FR-22.16 feed part) |
| 8 | M155 people | OOS register row only — **no** story key |

## In scope

- M149 feed/toolbar/query (not PublicHeader/rails ownership)
- M150–M154, M156–M160 production claim matrix per REQ §5
- Mount parity; fail-soft; local reactions catalog; invite stub; write-gate UX
- Promote feed-specific icons; wire runtime URLs in stories

## Out of scope

- New shell / classic D2.3 / `/` flip (next-shell)
- Creating artboards/PNG/new SVG masters
- Cabinet redesign; people/Connect (M155); schema/media production; real invite send; invent HTTP / invent search param
- Retire classic; greenfield second SPA
- Treating PNG as API truth

## Visual parity wave (NF-07…12)

После Done NF-01…06 live≠artboard ([parity audit](../../../analysis/analysis-next-feed-live-artboard-parity-audit-2026-10-10.md)). Вторая волна в том же пакете: reskin mandatory + live↔artboard gate + FE `search` enable. Tip: `07→08→09→10→12→11`. **Status 2026-10-12:** NF-07…12 **Done** (gate PASS). SSOT: [INDEX](INDEX.md) · [ARCH-DELTA](ARCH-DELTA-visual-parity-wave-2026-10-11.md) · [proposal](../../../analysis/proposal-next-feed-visual-parity-stories-2026-10-10.md) · **[layouts/pages/components catalog](../../../UX/next/feed/DOGEstonia-next-feed-layouts-pages-components-catalog-v1.0.md)**. Runtime: `local-five-serve-and-health.sh`. Text search FE = **NF-12 Done**.

## Assets

| Class | SSOT | Runtime |
|-------|------|---------|
| UX | [`docs/UX/next/feed/artboards/`](../../../UX/next/feed/artboards/) M149–M160 + packs | docs only |
| Icons | [`dogestonia-icon-system-v1.0/`](../../../UX/next/feed/dogestonia-icon-system-v1.0/) | `public/icons/next-feed/<group>/` (+ reuse next-shell) |
| Logo | — | next-shell / existing assets (not this package) |

**Runtime URL example:** `/icons/next-feed/actions/react.svg` ← master `…/icon-system…/icons/actions/react.svg`.

## Planned product stories (ADMIN-NF-04 materializes files)

| Key | Surface |
|-----|---------|
| NF-01 | Feed list + toolbar filters + query states (M149 feed) |
| NF-02 | Civic Issue-as-post (M150) |
| NF-03 | List \| Map (M151) |
| NF-04 | Thread block + text tree/composer (M152–M153) |
| NF-05 | Reactions + invite stub + write gate (M154, M156, M157) |
| NF-06 | Mount parity + responsive/theme stress + feed verify (M158–M160) |
| NF-07…12 | Visual parity wave — see [INDEX](INDEX.md) (Materialized 2026-10-11) |
